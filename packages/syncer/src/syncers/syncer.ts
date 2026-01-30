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
    /**
     * 是否与对方进行首次同步，
     *
     * 默认情况下，根据mode值
     * - mode=pull  则在连接时向对方发送$pull，从对方拉取数据
     * - mode=push  则在连接时向对方发送$push，向对方推送数据
     *
     */
    private _synced: boolean = false;
    private _options: NormalizeAutoStoreSyncerOptions;
    peer?: AutoStoreSyncer;
    private _operateCache: StateRemoteOperate[] = []; // 本地操作缓存
    private _subscribers: EventSubscriber[] = [];
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
    get synced() {
        return this._synced;
    }
    /**
     * 连接成功后
     */
    private _onConnect() {
        try {
            const mode = this.options.mode;
            if (mode === "push") {
                this._pushStore(true);
            } else if (mode === "pull") {
                this._pullStore(true);
            }
        } finally {
            this.flush();
        }
    }
    private createRemoteOperate(operate: StateOperate) {
        return {
            id: this.id,
            type: operate.type,
            path: operate.path,
            parentPath: operate.parentPath,
            value: operate.value,
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
            this.syncing = true;
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
                    if (this.options.direction === "forward" && !operate.type.startsWith("$")) {
                        return;
                    }
                    if (!this.isPeer(operate)) {
                        return;
                    }
                    this._onReceiveFromRemote(operate);
                }),
            );
            // 当连接时自动发送缓存
            this._subscribers.push(this.transport.on("connect", this._onConnect.bind(this)));
            // 当连接断开时，停止同步
            this._subscribers.push(this.transport.on("disconnect", this.stop.bind(this)));
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
            this.syncing = false;
        }
    }

    private _onWatchStore(operate: StateOperate) {
        try {
            if (this._isPass(operate.path, operate.value) === false) return;
            // 如果 flags 的绝对值等于当前 syncer 的 seq，说明是来自自己写入的操作，不应该再转发
            if (Math.abs(operate.flags || 0) === this.seq) {
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

        if (typeof this._options.onSend === "function") {
            if (this._options.onSend.call(this, remoteOperate) === false) return;
        }
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
                if (indexs) arr.splice(indexs[0], 0, ...value);
            }, updateOpts);
        } else if (type === "remove") {
            store.update((state) => {
                const arr = getVal(state, toPath);
                if (indexs) {
                    arr.splice(indexs[0], indexs.length);
                }
            }, updateOpts);
        }
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
                        store.update(
                            (state) => {
                                setVal(state, [...this.localEntry, ...toPath], toValue);
                            },
                            {
                                flags,
                            },
                        );
                    }
                });
            } else {
                const toPath = [...this.localEntry, ...(operate.path || [])];
                store.update(
                    (state) => {
                        setVal(state, toPath, operate.value);
                    },
                    {
                        flags,
                    },
                );
            }
        } catch (e: any) {
            hasError = e;
            this.emit("error", e);
        } finally {
            if (this._synced === false) {
                this._synced = true; // 标识已完成一次初始化全量同步
                this.emit("synced", operate.id, true);
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
