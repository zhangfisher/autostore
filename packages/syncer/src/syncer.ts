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
    type Watcher,
    getSnapshot,
} from 'autostore';
import type { AutoStoreSyncerOptions, StateRemoteOperate } from './types';

type NormalizeAutoStoreSyncerOptions = Required<
    Omit<AutoStoreSyncerOptions, 'local' | 'remote'> & {
        local: string[];
        remote: string[];
    }
>;

export const SYNC_INIT_FLAG = -1;

export class AutoStoreSyncer {
    static seq = 0;
    private seq: number; // 实例唯一标识
    private _options: NormalizeAutoStoreSyncerOptions;
    syncing: boolean = false;
    peer?: AutoStoreSyncer;
    private _offReceiver?:()=>void
    private _watcher: Watcher | undefined;
    private _operateCache: StateRemoteOperate[] = []; // 本地操作缓存
    constructor(public store: AutoStore<any>, options?: AutoStoreSyncerOptions) {
        this._options = Object.assign(
            {
                id: store.id,
                mode: 'push',
                local: [],
                remote: [],
                autostart: true,
                maxCacheSize: 100,
                immediate: false,
                direction: 'both',
                pathMap: {},
                peers: ['*'],
            },
            options,
        ) as any;
        if (typeof this._options.local === 'string')
            this._options.local = (this._options.local as string).split(PATH_DELIMITER);
        if (typeof this._options.remote === 'string')
            this._options.remote = (this._options.remote as string).split(PATH_DELIMITER);
        this.seq = ++AutoStoreSyncer.seq;
        this._options.autostart && this.start();
        if (this.options.immediate && this._options.autostart) {
            if (this._options.mode === 'push') {
                this.push({ initial: true });
            } else {
                this.pull();
            }
        }
    }
    get id() {
        return this._options.id;
    }
    get options() {
        return this._options;
    }
    get transport() {
        return this._options.transport;
    }
    get localEntry() {
        return this._options.local;
    }
    get remoteEntry() {
        return this._options.remote;
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
        if (peers.includes('*')) return true;
        // 检查 operate.id 是否在 peers 列表中
        return peers.includes(operate.id);
    }

    async start() {
        if (this.syncing) return;
        try {
            await this.transport.connect()
            this.syncing = true;
            // 发送更新到了远程
            this._watcher = this.store.watch(this._onWatchStore.bind(this));
            // 收到远程更新
            this._offReceiver = this.transport.addReceiver(this.id,(operate) => {
                // 过滤掉自己发送的事件，防止循环
                if (operate.id === this.id) return;
                if (!this.isPeer(operate)) return;
                if (this.options.direction === 'forward' && !operate.type.startsWith('$')) return;
                this._onReceiveFromRemote(operate);
            });
            // 连接完成后，发送缓存的操作
            if (this._operateCache.length > 0) {
                this.flush();
            }
        } catch (e) {
            this.syncing = false;
            throw e;
        }
    }
    stop(disconnect: boolean = true) {
        if (!this.syncing) return;
        this._watcher?.off();
        this._offReceiver?.() 
        this.syncing = false;
        if (disconnect) this._disconnect();
    }

    private _onWatchStore(operate: StateOperate) {
        if (this._isPass(operate.path, operate.value) === false) return;
        // 如果 flags 的绝对值等于当前 syncer 的 seq，说明是来自自己写入的操作，不应该再转发
        if (Math.abs(operate.flags || 0) === this.seq) return;
        if (this.options.direction === 'backward') return;

        console.log(`[syncer:${this.id}] _onWatchStore:`, {
            type: operate.type,
            path: operate.path,
            value: operate.value,
            indexs: operate.indexs,
            flags: operate.flags,
            currentItems: this.store.state.items,
        });

        this._sendToRemote(operate);
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

        if (!pathStartsWith(this._options.local, operate.path)) return;
        // 路径变换
        if (typeof this._options.pathMap.toRemote === 'function') {
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

        if (typeof this._options.onSend === 'function') {
            if (this._options.onSend.call(this, remoteOperate) === false) return;
        }
        this._sendOperate(remoteOperate);
    }

    private _onReceiveFromRemote(operate: StateRemoteOperate) {
        console.log(`[syncer:${this.id}] 收到事件:`, {
            type: operate.type,
            path: operate.path,
            value: operate.value,
            indexs: operate.indexs,
            flags: operate.flags,
        });
        if (typeof this._options.onReceive === 'function') {
            if (this._options.onReceive.call(this, operate) === false) return;
        }
        if (operate.type === '$stop') {
            this.stop(false);
            this.transport.disconnect();
        } else if (operate.type === '$push') {
            console.log(`[syncer:${this.id}] 处理 $push，当前 items =`, this.store.state.items);
            this._updateStore(operate);
            console.log(`[syncer:${this.id}] 处理 $push 后，当前 items =`, this.store.state.items);
        } else if (operate.type === '$pull-store') {
            this._sendStore(operate);
        } else if (operate.type === '$update-store') {
            this._updateStore(operate);
        } else {
            this._applyOperate(operate);
        }
    }

    private _applyOperate(operate: StateRemoteOperate) {
        const { type, value, indexs } = operate;
        const store = this.store;

        console.log(`[syncer:${this.id}] _applyOperate 开始:`, {
            type,
            path: operate.path,
            value,
            indexs,
            localEntry: this.localEntry,
            remoteEntry: this.options.remote,
            currentItems: store.state.items,
        });

        // 路径映射
        const newPath = this._mapPath(operate.path, operate.value, 'toLocal');
        if (!newPath) return;
        operate.path = newPath;

        const toPath = [...this.localEntry, ...operate.path.slice(this.options.remote.length)];

        console.log(`[syncer:${this.id}] 路径计算:`, {
            originalPath: operate.path,
            remoteLength: this.options.remote.length,
            slicedPath: operate.path.slice(this.options.remote.length),
            localEntry: this.localEntry,
            toPath,
        });

        // 使用负数标记来自远程的操作，防止循环
        // 如果是初始化同步（flags=-1），保持原值；否则取反
        const updateOpts = {
            flags: operate.flags === SYNC_INIT_FLAG ? SYNC_INIT_FLAG : -this.seq,
        };

        if (type === 'set' || type === 'update') {
            console.log(`[syncer:${this.id}] 处理 set 事件:`, {
                toPath,
                value,
                updateOpts,
                currentItems: store.state.items,
            });
            store.update((state) => {
                // getVal提供一个默认值，否则当目标路径不存在时会触发invalid state path error
                if (isAsyncComputedValue(getVal(state, toPath, true))) {
                    setVal(state, toPath.concat('value'), value);
                } else {
                    setVal(state, toPath, value);
                }
            }, updateOpts);
            console.log(`[syncer:${this.id}] 处理 set 事件后:`, {
                items: store.state.items,
            });
        } else if (type === 'delete') {
            store.update((state) => {
                setVal(state, toPath, undefined);
            }, updateOpts);
        } else if (type === 'insert') {
            console.log(`[syncer:${this.id}] 收到 insert 事件:`, {
                indexs,
                value,
                toPath,
                currentArray: store.state.items,
            });
            store.update((state) => {
                const arr = getVal(state, toPath);
                console.log(`[syncer:${this.id}] insert 前 arr =`, arr);
                if (indexs) {
                    // 使用数组展开而不是 splice，避免触发额外的 insert 事件
                    const insertIndex = indexs[0];
                    const newArr = [...arr.slice(0, insertIndex), ...value, ...arr.slice(insertIndex)];
                    console.log(`[syncer:${this.id}] insert 后 newArr =`, newArr);
                    setVal(state, toPath, newArr);
                }
            }, updateOpts);
        } else if (type === 'remove') {
            store.update((state) => {
                const arr = getVal(state, toPath);
                if (indexs) {
                    arr.splice(indexs[0], indexs.length);
                }
            }, updateOpts);
        }
    }


    private _disconnect() {
        // 向对方发送一个停止同步的信号
        this._options.transport.send({
            id: this.id,
            type: '$stop',
            path: [],
            value: undefined,
            flags: 0,
        });
        this.transport.disconnect();
    }
    /**
     *
     * 将本地操作缓存发送到远程
     *
     * 当Transport没有准备好时，如果有本地操作，则会缓存到本地操作缓存中，直到Transport准备好
     * 然后应该调用此方法，将本地操作缓存发送到远程
     *
     */
    async flush() {
        this._asertTransportConnected();
        await Promise.all(
            this._operateCache.map((operate) => {
                return this._options.transport.send(operate);
            }),
        ).finally(() => {
            this._operateCache = [];
        });
    }
    private _asertTransportConnected() {
        if (!this.transport.connected) {
            throw new Error('transport is not connected');
        }
    }
    private _sendOperate(operate: StateRemoteOperate) {
        // 传输未准备好
        if (!this.transport || !this.transport.connected) {
            this._operateCache.push(operate);
            if (this._operateCache.length > this._options.maxCacheSize) {
                this._operateCache.shift();
            }
            return;
        }
        this._options.transport.send(operate);
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
    push(options?: { initial?: boolean; includeSchemas?: boolean }) {
        const { initial } = Object.assign(
            {
                initial: false,
            },
            options,
        );
        this._pushStore(initial);
    }
    _pushStore(initial: boolean = false) {
        const localSnap = this._getLocalSnap(); //getVal(this.store.state, this._options.local.join(PATH_DELIMITER));
        if (typeof this._options.pathMap.toRemote === 'function') {
            const pathMap: Map<string, any> = new Map();
            forEachObject(localSnap, ({ value, path }) => {
                if (this._isPass(path, value) === false) return;
                const toValue = Array.isArray(value) ? [] : typeof value === 'object' ? {} : value;
                const toPath = this._mapPath(path, toValue, 'toRemote');
                if (toPath) {
                    pathMap.set(JSON.stringify(path), JSON.stringify(toPath));
                    const operate = {
                        type: 'set',
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
                type: '$push',
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
            type: '$update-store',
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
        const store = this.store;
        // 初始化同步使用 SYNC_INIT_FLAG，否则使用负数标记
        const flags = operate.flags === SYNC_INIT_FLAG ? SYNC_INIT_FLAG : -this.seq;

        console.log(`[syncer:${this.id}] _updateStore:`, {
            operateType: operate.type,
            path: operate.path,
            value: operate.value,
            flags,
            hasPathMap: typeof this._options.pathMap.toLocal === 'function',
        });

        if (typeof this._options.pathMap.toLocal === 'function') {
            forEachObject(operate.value, ({ value, path }) => {
                if (this._isPass(path, value) === false) return;
                const toValue = Array.isArray(value) ? [] : typeof value === 'object' ? {} : value;
                const toPath = this._mapPath(path, toValue, 'toLocal');
                if (toPath) {
                    console.log(`[syncer:${this.id}] forEachObject 设置:`, { path, toPath, toValue, flags });
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
            const toPath = [...this.localEntry, ...operate.path];
            console.log(`[syncer:${this.id}] 直接设置:`, { toPath, value: operate.value, flags });
            store.update(
                (state) => {
                    setVal(state, toPath, operate.value);
                },
                {
                    flags,
                },
            );
        }
    }
    private _pullStore() {
        this._sendOperate({
            id: this.id,
            type: '$pull-store',
            path: this.options.remote,
            value: undefined,
            flags: 0,
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
