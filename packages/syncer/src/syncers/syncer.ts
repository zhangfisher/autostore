import {
    type AutoStore,
    getVal,
    isAsyncComputedValue,
    PATH_DELIMITER,
    pathStartsWith,
    setVal,
    isFunction,
    forEachObject,
    type StateOperate,
} from "autostore";
import type { AutoStoreSyncerOptions, StateRemoteOperate } from "../types";
import { EventSubscriber } from "../utils/emitter";
import { AutoStoreSyncError } from "../errors";
import { AutoStoreSyncerBase } from "./base";
import { getSnap } from "../../../core/src/utils/getSnap";

type NormalizeAutoStoreSyncerOptions = Required<
    Omit<AutoStoreSyncerOptions, "local" | "remote"> & {
        local: string[];
        remote: string[];
    }
>;

export const SYNC_INIT_FLAG = -1;

// 重新导出基类
export { AutoStoreSyncerBase } from "./base";

export class AutoStoreSyncer extends AutoStoreSyncerBase {
    private seq: number; // 实例唯一标识
    private _options: NormalizeAutoStoreSyncerOptions;
    peer?: AutoStoreSyncer;
    private _operateCache: StateRemoteOperate[] = []; // 本地操作缓存
    private _subscribers: EventSubscriber[] = [];
    /**
     * 连接监听订阅（重连恢复的钩子）
     *
     * disconnect 触发的"暂停"不注销此订阅：保留对 connect 事件的监听，
     * transport 重连后 _onConnect 会自动恢复同步并 flush 缓存的离线操作。
     * 仅显式调用 stop() 时才注销。
     */
    private _connectSubscriber?: EventSubscriber;
    /**
     * 正在应用远程操作的写入路径集合（用于回声精确判定）
     *
     * 应用远程操作（_applyOperate/_updateStore）期间，syncer 通过 setVal 写入的目标路径
     * 会登记到此处；_onWatchStore 收到写入事件时，仅命中集合（含前缀匹配，覆盖后代广播
     * 派生的子路径）才判定为回声不转发。watch 监听器内的连锁写入（其它路径）正常转发，
     * 避免被误吞。窗口极短：应用完成后即清空。
     */
    private _remoteWritingPaths: Set<string> | null = null;

    constructor(
        public store: AutoStore<any>,
        options?: AutoStoreSyncerOptions,
    ) {
        super();
        this._options = Object.assign(
            {
                id: store.id,
                mode: "push",
                local: [],
                remote: [],
                autostart: true,
                maxCacheSize: 100,
                direction: "both",
                pathMap: {},
                peers: ["*"],
                debug: false,
            },
            options,
        ) as any;
        if (typeof this._options.local === "string")
            this._options.local = (this._options.local as string).split(PATH_DELIMITER);
        if (typeof this._options.remote === "string")
            this._options.remote = (this._options.remote as string).split(PATH_DELIMITER);
        this.seq = ++AutoStoreSyncer.seq;

        if (this._options.autostart) {
            this.start();
        }
    }
    get id() {
        return this._options.id;
    }
    get options() {
        return this._options;
    }
    get transport() {
        return this._options.transport!;
    }
    get localEntry() {
        return this._options.local;
    }
    get remoteEntry() {
        return this._options.remote;
    }
    /**
     * 连接成功后
     */
    private _onConnect() {
        // 断线暂停后重连：自动恢复同步（重新监听 watch/receiver），再执行初始推送/拉取与缓存 flush
        if (!this.syncing) {
            this._resume();
        }
        try {
            const direction = this.options.direction;
            const mode = this.options.mode;
            if (mode === "push" || mode == "both") {
                this._pushStore(true);
            }
            if (mode === "pull" || mode == "both") {
                this._pullStore(true);
            }
            // 如果是单向同步，则不会接收到对方的操作，所以直接就置为同步状态
            // 否则需要等待
            if (direction === "forward") {
                this._syncing = true;
            }
        } finally {
            // flush 延迟到微任务：对端 transport 的 connect（及其 receiver 恢复）可能尚未完成，
            // 同步 flush 会在对端未就绪时把缓存消息发出去而被丢弃（LocalTransport 同步直投场景尤甚）
            queueMicrotask(() => this.flush());
        }
    }
    /**
     * 暂停同步（disconnect/error/timeout 触发）
     *
     * 与 stop() 的区别：
     * - 保留 connect 事件监听（transport 重连后由 _onConnect 自动恢复）
     * - 保留 watch 转发——暂停期间的本地写入仍会走 _sendOperate，因 transport 未连接
     *   而进入离线操作缓存（_operateCache），重连后由 flush() 统一补发，不丢失离线修改
     * 仅注销 receiver（断线期间无法也不应接收远程操作）。
     */
    private _suspend() {
        if (!this.syncing) return;
        try {
            this._subscribers.forEach((subscriber) => subscriber.off());
            this._subscribers = [];
            // 暂停期间保持 watch：本地写入进缓存而非丢失
            this._subscribers.push(
                this.store.watch(this._onWatchStore.bind(this), {
                    operates: "write",
                }),
            );
        } finally {
            this.emit("stop", undefined, true);
            this._syncing = false;
        }
    }
    /**
     * 恢复同步（transport 重连后由 _onConnect 调用）
     *
     * 重新注册 receiver。watch 与 connect 监听在暂停期间保留，无需重复注册。
     */
    private _resume() {
        if (this.syncing) return;
        try {
            this._syncing = true;
            // 收到远程更新
            this._subscribers.push(
                this.transport.addReceiver(this.id, (operate) => {
                    // 过滤掉自己发送的事件，防止循环
                    if (operate.id === this.id) {
                        return;
                    }
                    // 以$开头的是同步指令
                    if (!operate.type.startsWith("$")) {
                        if (this.options.direction === "forward") {
                            return;
                        }
                        if (!this.isPeer(operate)) {
                            return;
                        }
                    }
                    this._onReceiveFromRemote(operate);
                }),
            );
        } catch (e: any) {
            this._syncing = false;
            this.emit("error", e as Error, true);
            throw e;
        } finally {
            if (this.syncing) {
                this.emit("start", undefined, true);
            }
        }
    }
    private createRemoteOperate(operate: StateOperate) {
        return {
            id: this.id,
            type: operate.type,
            path: operate.path,
            parentPath: operate.parentPath,
            value: getSnap(operate.value),
            indexs: operate.indexs,
            flags: operate.flags ?? 0,
        } as StateRemoteOperate;
    }

    /**
     * 判断是否应该处理来自指定 peer 的 operate
     * @param operate 远程操作
     * @returns true 表示应该处理，false 表示应该忽略
     */
    private isPeer(operate: StateRemoteOperate): boolean {
        const peers = this._options.peers;
        // '*' 表示接受所有来源
        if (peers.includes("*")) return true;
        // 检查 operate.id 是否在 peers 列表中
        return peers.includes(operate.id);
    }

    start() {
        if (this.syncing) return;
        let hasError: any;
        try {
            this._syncing = true;
            // 发送更新到了远程，只监听写操作
            this._subscribers.push(
                this.store.watch(this._onWatchStore.bind(this), {
                    operates: "write",
                }),
            );
            // 收到远程更新
            this._subscribers.push(
                this.transport.addReceiver(this.id, (operate) => {
                    // 过滤掉自己发送的事件，防止循环
                    if (operate.id === this.id) {
                        return;
                    }
                    // 以$开头的是同步指令
                    if (!operate.type.startsWith("$")) {
                        if (this.options.direction === "forward") {
                            return;
                        }
                        if (!this.isPeer(operate)) {
                            return;
                        }
                    }
                    this._onReceiveFromRemote(operate);
                }),
            );
            // 当连接时自动发送缓存并恢复同步（断线暂停后重连也走这里，订阅保存在 _connectSubscriber，暂停时不注销）
            this._connectSubscriber = this.transport.on("connect", this._onConnect.bind(this));
            // 当连接断开时，暂停同步（保留 connect 监听，等待重连恢复；不采用完全 stop——那会注销所有订阅导致重连后同步死亡）
            this._subscribers.push(this.transport.on("disconnect", () => this._suspend()));
            // 当连接出错时
            this._subscribers.push(this.transport.on("error", () => this._suspend()));
            // 当连接心跳超时
            this._subscribers.push(this.transport.on("timeout", () => this._suspend()));
            this.transport.connect();
        } catch (e) {
            hasError = e;
            this.stop();
            this.emit("error", e as Error, true);
            throw e;
        } finally {
            if (!hasError) {
                this.emit("start", undefined, true);
            }
        }
    }
    /**
     * 停止同步
     * @returns
     */
    stop() {
        if (!this.syncing) return;
        try {
            this._subscribers.forEach((subscriber) => subscriber.off());
            this._subscribers = [];
            // 显式停止：连重连监听也一并注销（区别于断线暂停 _suspend）
            this._connectSubscriber?.off();
            this._connectSubscriber = undefined;
            if (this._options.transport.connected) {
                // 向对方发送一个停止同步的信号
                this._options.transport.send({
                    id: this.id,
                    type: "$stop",
                    path: [],
                    value: undefined,
                    flags: 0,
                });
            }
        } finally {
            this.emit("stop", undefined, true);
            this._syncing = false;
        }
    }

    private _onWatchStore(operate: StateOperate) {
        try {
            if (this._isPass(operate.path, operate.value) === false) return;
            // 回声判定：flags 的绝对值等于当前 syncer 的 seq，说明是应用远程操作时产生的写入，不应再转发。
            // 在原有 flags 判定之上叠加路径精确判定：仅当写入路径命中"应用远程操作期间登记的目标路径"
            // （含前缀匹配，覆盖后代广播派生的子路径）才视为回声。watch 监听器内的连锁写入（其它路径）
            // 虽然继承了同一 flags，但属于本地衍生的新写入，应当正常转发到远程
            if (Math.abs(operate.flags || 0) === this.seq && this._isRemoteEcho(operate.path)) {
                return;
            }
            if (this.options.direction === "backward") {
                return;
            }
            this._sendToRemote(operate);
        } finally {
            if (this.options.debug === true) {
                this.emit("localOperate", operate);
            }
        }
    }

    /**
     * 判断写入路径是否属于应用远程操作期间的目标路径（回声）
     *
     * 后代广播（store._broadcastOperate）会为目标路径的子树派生独立的 set/delete operate，
     * 因此采用前缀匹配：写入路径以任一登记路径为前缀（或完全相等）即视为回声。
     * 登记路径为根（空串）时匹配一切路径（全量写入的回声）。
     * 记账窗口未开启时（不在应用远程操作的写入期间）返回 true，保持仅按 flags 判定的原行为
     */
    private _isRemoteEcho(path: string[]): boolean {
        if (!this._remoteWritingPaths) return true;
        const pathStr = path.join(PATH_DELIMITER);
        for (const registered of this._remoteWritingPaths) {
            if (
                registered === "" ||
                pathStr === registered ||
                pathStr.startsWith(registered + PATH_DELIMITER)
            ) {
                return true;
            }
        }
        return false;
    }

    private _isPass(path: string[], value: any) {
        if (isFunction(this._options.filter)) {
            return this._options.filter(path, value);
        }
        return true;
    }

    private _sendToRemote(operate: StateOperate) {
        const localEntry = this.options.local;
        const remoteEntry = this.options.remote;

        if (!pathStartsWith(this._options.local, operate.path)) {
            return;
        }

        // 路径变换
        if (typeof this._options.pathMap.toRemote === "function") {
            const toPath = this._options.pathMap.toRemote(
                operate.path.slice(this._options.local.length),
                operate.value,
            );
            if (toPath) {
                operate.path = [...remoteEntry, ...toPath];
            }
        } else {
            operate.path = [...remoteEntry, ...operate.path.slice(localEntry.length)];
        }

        const remoteOperate = this.createRemoteOperate(operate);
        this._sendOperate(remoteOperate);
    }

    private _onReceiveFromRemote(operate: StateRemoteOperate) {
        try {
            if (typeof this._options.onReceive === "function") {
                if (this._options.onReceive.call(this, operate) === false) return;
            }
            const type = operate.type;
            if (type === "$stop") {
                // 停止同步
                this.stop();
            } else if (type === "$push") {
                // 对方的推送命令
                this._updateStore(operate);
            } else if (type === "$pull") {
                // 对方的拉取命令
                this._sendStore(operate);
            } else if (type === "$update") {
                // 对pull的响应
                this._updateStore(operate);
            } else if (type === "$ping") {
                this._sendOperate({
                    type: "$pong",
                    value: operate.value,
                } as any);
            } else if (type === "$error") {
                const e = new AutoStoreSyncError();
                e.operate = operate;
                this.emit("error", e);
            } else {
                // 常规的更新操作
                this._applyOperate(operate);
            }
        } finally {
            if (this.options.debug === true) {
                this.emit("remoteOperate", operate);
            }
        }
    }

    private _applyOperate(operate: StateRemoteOperate) {
        const { type, value, indexs } = operate;
        const store = this.store;

        // 路径映射
        const newPath = this._mapPath(operate.path, operate.value, "toLocal");
        if (!newPath) {
            return;
        }
        operate.path = newPath;

        const toPath = [...this.localEntry, ...operate.path.slice(this.options.remote.length)];

        // 使用负数标记来自远程的操作，防止循环
        // 始终使用负数 flags，确保 _onWatchStore 不会再次转发此操作
        const updateOpts = {
            flags: -this.seq,
        };

        // 开启回声记账窗口：登记本次写入的目标路径，写入完成后关闭
        this._openRemoteWriting(toPath);
        try {
            if (type === "set" || type === "update") {
                store.update((state) => {
                    // getVal提供一个默认值，否则当目标路径不存在时会触发invalid state path error
                    if (isAsyncComputedValue(getVal(state, toPath, true))) {
                        setVal(state, toPath.concat("value"), value);
                    } else {
                        setVal(state, toPath, value);
                    }
                }, updateOpts);
            } else if (type === "delete") {
                store.update((state) => {
                    setVal(state, toPath, undefined);
                }, updateOpts);
            } else if (type === "insert") {
                store.update((state) => {
                    const arr = getVal(state, toPath);
                    if (Array.isArray(indexs)) arr.splice(indexs[0], 0, ...value);
                }, updateOpts);
            } else if (type === "remove") {
                store.update((state) => {
                    const arr = getVal(state, toPath);
                    if (Array.isArray(indexs)) {
                        if (indexs.length === 0) {
                            arr.splice(0); // 代表清空
                        } else {
                            arr.splice(indexs[0], indexs.length);
                        }
                    }
                }, updateOpts);
            }
        } finally {
            this._closeRemoteWriting();
        }
    }

    /**
     * 开启回声记账窗口：登记应用远程操作时将要写入的目标路径
     */
    private _openRemoteWriting(path: string[]) {
        if (!this._remoteWritingPaths) this._remoteWritingPaths = new Set();
        this._remoteWritingPaths.add(path.join(PATH_DELIMITER));
    }

    /**
     * 关闭回声记账窗口（应用完成后调用）
     *
     * 注意：不清理已登记的路径集合，下一次 _openRemoteWriting 会复用；
     * 窗口关闭后（_remoteWritingPaths=null 的反向标记不存在，这里置空集合开关）
     */
    private _closeRemoteWriting() {
        this._remoteWritingPaths = null;
    }
    /**
     *
     * 将本地操作缓存发送到远程
     *
     * 当Transport没有准备好时，如果有本地操作，则会缓存到本地操作缓存中，直到Transport准备好
     * 然后应该调用此方法，将本地操作缓存发送到远程
     *
     */
    flush() {
        if (!this.transport.connected) {
            return;
        }
        Promise.all(
            this._operateCache.map((operate) => {
                return this.transport.send(operate);
            }),
        ).finally(() => {
            this._operateCache = [];
        });
    }
    private _assertConnected(operate: StateRemoteOperate): boolean {
        if (!this.transport.connected) {
            this._operateCache.push(operate);
            if (this._operateCache.length > this._options.maxCacheSize) {
                this._operateCache.shift();
            }
            return false;
        }
        return true;
    }
    private _sendOperate(operate: StateRemoteOperate) {
        if (this._assertConnected(operate)) {
            // 在发送前调用 onSend 钩子，允许子类修改 operate（如修改 id）
            if (typeof this._options.onSend === "function") {
                if (this._options.onSend.call(this, operate) === false) return;
            }
            this._options.transport.send(operate);
        }
    }

    private _getLocalSnap() {
        return this.store.getSnap({ entry: this._options.local.join(PATH_DELIMITER) });
    }
    /**
     * 将本地store推送到远程
     *
     * @param initial 是否是第一次同步
     *
     */
    push() {
        this._pushStore();
    }
    private _pushStore(initial: boolean = false) {
        const localSnap = this._getLocalSnap();
        if (typeof this._options.pathMap.toRemote === "function") {
            const pathMap: Map<string, any> = new Map();
            forEachObject(localSnap, ({ value, path }) => {
                if (this._isPass(path, value) === false) return;
                const toValue = Array.isArray(value) ? [] : typeof value === "object" ? {} : value;
                const toPath = this._mapPath(path, toValue, "toRemote");
                if (toPath) {
                    pathMap.set(JSON.stringify(path), JSON.stringify(toPath));
                    const operate = {
                        type: "set",
                        path: [...this.options.remote, ...toPath],
                        value: toValue,
                    } as StateRemoteOperate;
                    if (initial) operate.flags = SYNC_INIT_FLAG;
                    this._sendOperate(operate);
                }
            });
            return pathMap;
        } else {
            this._sendOperate({
                id: this.id,
                type: "$push",
                path: this.options.remote,
                value: localSnap,
                flags: initial ? SYNC_INIT_FLAG : 0,
            } as StateRemoteOperate);
        }
    }
    /**
     * 向远程发送整个store
     */
    private _sendStore(operate: StateRemoteOperate) {
        this._sendOperate({
            id: this.id,
            type: "$update",
            path: [],
            value: this.store.getSnap({ entry: operate.path.join(PATH_DELIMITER) }),
            flags: this.seq,
        });
    }
    /**
     * 响应$push时调用此方法
     * @param operate
     */
    private _updateStore(operate: StateRemoteOperate) {
        // oxlint-disable-next-line no-unused-vars
        let hasError: any;
        try {
            const store = this.store;
            // 始终使用负数 flags，确保 _onWatchStore 不会再次转发此操作
            const flags = -this.seq;
            if (typeof this._options.pathMap.toLocal === "function") {
                forEachObject(operate.value, ({ value, path }) => {
                    if (this._isPass(path, value) === false) return;
                    const toValue = Array.isArray(value)
                        ? []
                        : typeof value === "object"
                          ? {}
                          : value;
                    const toPath = this._mapPath(path, toValue, "toLocal");
                    if (toPath) {
                        // 开启回声记账窗口（详见 _openRemoteWriting）
                        this._openRemoteWriting([...this.localEntry, ...toPath]);
                        try {
                            store.update(
                                (state) => {
                                    setVal(state, [...this.localEntry, ...toPath], toValue);
                                },
                                {
                                    flags,
                                },
                            );
                        } finally {
                            this._closeRemoteWriting();
                        }
                    }
                });
            } else {
                const toPath = [...this.localEntry, ...(operate.path || [])];
                // 开启回声记账窗口（详见 _openRemoteWriting）
                this._openRemoteWriting(toPath);
                try {
                    store.update(
                        (state) => {
                            setVal(state, toPath, operate.value);
                        },
                        {
                            flags,
                        },
                    );
                } finally {
                    this._closeRemoteWriting();
                }
            }
        } catch (e: any) {
            hasError = e;
            this.emit("error", e);
        } finally {
            if (this._syncing === false) {
                this._syncing = true; // 标识已完成一次初始化全量同步
                this.emit("syncing", operate.id, true);
            }
        }
    }
    private _pullStore(initial: boolean = false) {
        this._sendOperate({
            id: this.id,
            type: "$pull",
            path: this.options.remote,
            value: undefined,
            flags: initial ? SYNC_INIT_FLAG : 0,
        } as StateRemoteOperate);
    }
    /**
     * 从远程store拉取数据
     */
    pull() {
        this._pullStore();
    }
    private _mapPath(path: string[], value: any, dir: string): string[] | undefined {
        if (this._options.pathMap && isFunction((this._options.pathMap as any)[dir])) {
            return (this._options.pathMap as any)[dir](path, value);
        } else {
            return path;
        }
    }

    toString() {
        return `AutoStoreSyncer(${this.id})`;
    }
}
