/**
 * 
 *  
 * 
 */

import {
    AutoStore,
    SYNC_INIT_FLAG,
    SYNC_CYCLE_FLAG,
    getVal,
    isAsyncComputedValue,
    PATH_DELIMITER,
    pathStartsWith,
    setVal,
    StateOperate,
    Watcher
} from "autostore";
import { IAutoStoreSyncTransport, StateRemoteOperate } from "./transport";

export type AutoStoreSyncerOptions = {
    id?: string
    entry?: string[]
    remoteEntry?: string[]
    transport?: IAutoStoreSyncTransport
    autostart?: boolean
    // 发送到远程之前触发，可以在此修改operate，叠加自己的数据到了operate, 返回false可以阻止发送
    onSend?: (operate: StateRemoteOperate) => boolean | void
    // 发送到远程之前触发，可以在此修改operate，叠加自己的数据到了operate, 返回false可以阻止发送
    onReceive?: (operate: StateRemoteOperate) => boolean | void
    // 是否进行一次同步
    immediate?: boolean
    // 当启用缓存时，缓存的最大数量,超出部分会自动删除
    maxCacheSize?: number
}

export class AutoStoreSyncer {
    private _options: Required<AutoStoreSyncerOptions>
    syncing: boolean = false
    private _watcher: Watcher | undefined
    private _operateCache: StateRemoteOperate[] = []         // 本地操作缓存,
    constructor(public store: AutoStore<any>, options?: AutoStoreSyncerOptions) {
        this._options = Object.assign({
            id: store.id,
            entry: [],
            remoteEntry: [],
            autostart: true,
            maxCacheSize: 100,
            immediate: false
        }, options) as Required<AutoStoreSyncerOptions>
        this._options.autostart && this.start()
        if (this.options.immediate) this.update()
    }
    get id() { return this._options.id }
    get options() { return this._options }
    get transport() { return this._options.transport }
    get entry() { return this._options.entry }
    get remoteEntry() { return this._options.remoteEntry }

    private createRemoteOperate(operate: StateOperate) {
        return {
            type: operate.type,
            path: operate.path,
            value: operate.value,
            indexs: operate.indexs,
            flags: operate.flags
        } as StateRemoteOperate
    }

    start() {
        if (!(this.transport && this.transport.ready)) {
            throw new Error('AutoStore sync transport not ready')
        }
        if (this.syncing) return
        try {
            this.syncing = true
            // 发送更新到了远程
            this._watcher = this.store.watch((operate) => {
                this._sendToRemote(operate)
            }, {
                operates: 'write'
            })
            // 收到远程更新
            this._options.transport.receive((operate) => {
                this._onReceiveFromRemote(operate)
            })


        } catch (e) {
            this.syncing = false
            throw e
        }
    }

    private _sendToRemote(operate: StateOperate) {
        if ((operate.flags! & SYNC_CYCLE_FLAG) > 0) return
        const localEntry = this.options.entry
        const remoteEntry = this.options.remoteEntry

        if (!pathStartsWith(this._options.entry, operate.path)) return

        // 路径变换
        operate.path = [...remoteEntry, ...operate.path.slice(localEntry.length)]

        const remoteOperate = this.createRemoteOperate(operate)

        if (typeof (this._options.onSend) === 'function') {
            if (this._options.onSend.call(this, remoteOperate) === false) return
        }

        this._sendOperate(remoteOperate)
    }

    private _onReceiveFromRemote(operate: StateRemoteOperate) {
        if (typeof (this._options.onReceive) === 'function') {
            if (this._options.onReceive.call(this, operate) === false) return
        }
        if (operate.type === '$stop') {
            this.stop(false)
            this.transport.onStop && this.transport.onStop()
        } else if (operate.type === '$update') {
            this._sendStore(operate.path)
        } else {
            this._applyOperate(operate, SYNC_INIT_FLAG)
        }
    }
    /**
     * 向远程发送整个store
     */
    private _sendStore(path: string[]) {
        this.transport.send({
            type: 'set',
            path: [],
            value: this.store.getSnap({ entry: path.join(PATH_DELIMITER) }),
            flags: SYNC_INIT_FLAG
        })
    }

    private _applyOperate(operate: StateRemoteOperate, extraFlag: number = 0) {
        const { type, value, flags, indexs } = operate
        const toPath = [...this.entry, ...operate.path.slice(this.options.remoteEntry.length)]
        const silent = (flags & SYNC_CYCLE_FLAG) > 0
        const updateOpts = {
            flags: SYNC_CYCLE_FLAG + extraFlag,
            silent
        }
        if (type === 'set' || type === 'update') {
            this.store.update(state => {
                // getVal提供一个默认值，否则当目标路径不存在时会触发invalid state path error
                if (isAsyncComputedValue(getVal(state, toPath, true))) {
                    setVal(state, toPath.concat('value'), value)
                } else {
                    setVal(state, toPath, value)
                }
            }, updateOpts)
        } else if (type === 'delete') {
            this.store.update(state => {
                setVal(state, toPath, undefined)
            }, updateOpts)
        } else if (type === 'insert') {
            this.store.update(state => {
                const arr = getVal(state, operate.parentPath)
                if (indexs) arr.splice(indexs[0], 0, ...value)
            }, updateOpts)
        } else if (type === 'remove') {
            this.store.update(state => {
                const arr = getVal(state, toPath)
                if (indexs) {
                    arr.splice(indexs[0], indexs.length)
                }
            }, updateOpts)
        }
    }

    stop(disconnect: boolean = true) {
        if (!this.syncing) return
        this._watcher && this._watcher.off()
        this.syncing = false
        if (disconnect) this._disconnect()
    }

    private _disconnect() {
        // 向对方发送一个停止同步的信号
        this._options.transport.send({
            type: '$stop',
            path: [],
            value: undefined,
            flags: SYNC_CYCLE_FLAG
        })
        this.transport.onStop && this.transport.onStop()
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
        this._asertTransportReady()
        await Promise.all(this._operateCache.map(operate => {
            return this._options.transport.send(operate)
        })).finally(() => {
            this._operateCache = []
        })
    }
    private _asertTransportReady() {
        if (!this.transport.ready) {
            throw new Error('transport not ready')
        }
    }
    private _sendOperate(operate: StateRemoteOperate) {
        // 传输未准备好
        if (!this.transport || !this.transport.ready) {
            this._operateCache.push(operate)
            if (this._operateCache.length > this._options.maxCacheSize) {
                this._operateCache.shift()
            }
            return
        }
        this._options.transport.send(operate)
    }
    /**
     * 向对方请求一次全同步
     */
    update() {
        const operate = {
            type: '$update',
            path: this.options.remoteEntry,
            value: undefined,
            flags: SYNC_CYCLE_FLAG
        } as StateRemoteOperate
        this._sendOperate(operate)
    }
}
