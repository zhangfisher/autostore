/**
 * AutoStoreSyncManager - 用于在 SharedWorker 中管理一个 AutoStore 与多个浏览器页签之间的同步
 *
 * @example SharedWorker 代码
 * ```typescript
 * import { AutoStore } from 'autostore';
 * import { AutoStoreSyncManager } from '@autostorejs/syncer';
 *
 * const store = new AutoStore({
 *     count: 0,
 *     user: { name: 'Alice' }
 * });
 *
 * const syncManager = new AutoStoreSyncManager(store);
 *
 * // 处理来自页签的连接
 * self.addEventListener('connect', (event: any) => {
 *     const port = event.ports[0];
 *     // 创建 transport 并连接
 *     const transport = new WorkerTransport({ worker: port });
 *     syncManager.connect(transport);
 * });
 * ```
 *
 * @example 浏览器页签代码
 * ```typescript
 * import { AutoStore } from 'autostore';
 * import { AutoStoreSyncer } from '@autostorejs/syncer';
 * import { WorkerTransport } from '@autostorejs/syncer';
 *
 * const store = new AutoStore({
 *     count: 0,
 *     user: { name: 'Bob' }
 * });
 *
 * const sharedWorker = new SharedWorker('./shared-worker.js');
 * const transport = new WorkerTransport({
 *     worker: sharedWorker.port,
 *     id: 'tab-' + Math.random()
 * });
 *
 * // 启动端口
 * sharedWorker.port.start();
 *
 * const syncer = new AutoStoreSyncer(store, {
 *     transport,
 *     immediate: true  // 首次同步时从服务端拉取数据
 * });
 * ```
 */

import type { AutoStore, Watcher, StateOperate } from 'autostore';
import { AutoStoreSyncer } from './syncer';
import type {
    AutoStoreSyncManagerOptions,
    AutoStoreSyncerOptions,
    StateRemoteOperate,
} from './types';
import type { IAutoStoreSyncTransport } from './transports/base';

export class AutoStoreSyncManager {
    private _store: AutoStore<any>;
    private _options: Required<AutoStoreSyncManagerOptions>;
    // 客户端 ID 到 Syncer 的映射
    private _syncers: Map<string, AutoStoreSyncer> = new Map();
    // Transport 到客户端 ID 的映射
    private _transportToId: WeakMap<IAutoStoreSyncTransport, string> = new WeakMap();
    // 存储 watch 监听器
    private _watcher?: Watcher;
    // 客户端 ID 计数器
    private _clientIdCounter = 0;

    constructor(store: AutoStore<any>, options?: AutoStoreSyncManagerOptions) {
        this._store = store;
        this._options = Object.assign(
            {
                autoBroadcast: true,
                syncerOptions: {},
            },
            options,
        ) as Required<AutoStoreSyncManagerOptions>;

        // 启动自动广播
        if (this._options.autoBroadcast) {
            this._startBroadcast();
        }
    }

    get store(): AutoStore<any> {
        return this._store;
    }

    get options(): Required<AutoStoreSyncManagerOptions> {
        return this._options;
    }

    get syncers(): Map<string, AutoStoreSyncer> {
        return this._syncers;
    }

    /**
     * 连接一个新的客户端
     * 为指定的 transport 创建对应的 syncer
     *
     * @param transport 传输层对象
     * @param options 可选的 syncer 配置，会覆盖默认配置
     * @returns 创建的 syncer 实例
     */
    connect(
        transport: IAutoStoreSyncTransport,
        options?: Partial<AutoStoreSyncerOptions>,
    ): AutoStoreSyncer {
        // 生成客户端 ID（优先使用 transport 的 id，否则生成新的）
        const clientId =
            transport.id ||
            `client-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

        // 如果该客户端已存在，先断开
        if (this._syncers.has(clientId)) {
            this.disconnect(clientId);
        }

        // 合并 syncer 选项
        const syncerOptions: AutoStoreSyncerOptions = Object.assign(
            {},
            this._options.syncerOptions,
            {
                transport,
                id: clientId,
                // direction 使用默认的 'both'，允许双向通信
                autostart: true,
            },
            options,
            {
                // 确保 immediate 为 false，避免 manager 端主动推送
                immediate: false,
            },
        );

        // 创建 syncer
        const syncer = new AutoStoreSyncer(this._store, syncerOptions);

        // 保存映射关系
        this._syncers.set(clientId, syncer);
        this._transportToId.set(transport, clientId);

        // 注意：不在这里监听 onStop，而是在 syncer 停止时自动清理
        // 当 syncer 收到 $stop 消息时会调用 transport.onStop，我们在 disconnect 中处理

        return syncer;
    }

    /**
     * 断开指定客户端的连接
     *
     * @param clientId 客户端 ID
     */
    disconnect(clientId: string): void {
        const syncer = this._syncers.get(clientId);
        if (syncer) {
            syncer.stop(false); // 不发送 disconnect 消息，避免循环
            this._syncers.delete(clientId);
        }
    }

    /**
     * 根据 transport 断开连接
     *
     * @param transport 传输层对象
     */
    disconnectByTransport(transport: IAutoStoreSyncTransport): void {
        const clientId = this._transportToId.get(transport);
        if (clientId) {
            this.disconnect(clientId);
        }
    }

    /**
     * 获取指定客户端的 syncer
     *
     * @param clientId 客户端 ID
     * @returns syncer 实例，如果不存在则返回 undefined
     */
    getSyncer(clientId: string): AutoStoreSyncer | undefined {
        return this._syncers.get(clientId);
    }

    /**
     * 根据 transport 获取对应的 syncer
     *
     * @param transport 传输层对象
     * @returns syncer 实例，如果不存在则返回 undefined
     */
    getSyncerByTransport(transport: IAutoStoreSyncTransport): AutoStoreSyncer | undefined {
        const clientId = this._transportToId.get(transport);
        return clientId ? this._syncers.get(clientId) : undefined;
    }

    /**
     * 获取所有已连接的客户端 ID
     */
    getClientIds(): string[] {
        return Array.from(this._syncers.keys());
    }

    /**
     * 获取已连接的客户端数量
     */
    get clientCount(): number {
        return this._syncers.size;
    }

    /**
     * 向所有客户端广播操作
     *
     * @param operate 要广播的操作
     */
    broadcast(operate: StateRemoteOperate): void {
        this._syncers.forEach((syncer) => {
            // 通过 syncer 的 transport 直接发送操作
            if (syncer.transport?.ready) {
                syncer.transport.send(operate);
            }
        });
    }

    /**
     * 向指定客户端发送操作
     *
     * @param clientId 客户端 ID
     * @param operate 要发送的操作
     */
    sendTo(clientId: string, operate: StateRemoteOperate): void {
        const syncer = this._syncers.get(clientId);
        if (syncer && syncer.transport?.ready) {
            syncer.transport.send(operate);
        }
    }

    /**
     * 启动自动广播
     * 监听主 store 的变化，自动广播到所有客户端
     */
    private _startBroadcast(): void {
        this._watcher = this._store.watch((operate: StateOperate) => {
            // 跳过来自其他 syncer 的操作（通过 flags 判断）
            // 在 syncer 中，每个 syncer 都有唯一的 seq 标识
            // 如果操作是由某个 syncer 触发的，flags 会等于该 syncer 的 seq
            // 我们只需要广播 flags === 0 的操作（即非 syncer 触发的操作）
            if (operate.flags && operate.flags > 0) {
                return;
            }

            // 创建远程操作
            const remoteOperate: StateRemoteOperate = {
                id: 'manager',
                type: operate.type,
                path: operate.path,
                parentPath: operate.parentPath,
                value: operate.value,
                indexs: operate.indexs,
                flags: operate.flags || 0,
            };

            this.broadcast(remoteOperate);
        });
    }

    /**
     * 停止自动广播
     */
    private _stopBroadcast(): void {
        if (this._watcher) {
            this._watcher.off();
            this._watcher = undefined;
        }
    }

    /**
     * 销毁管理器，清理所有资源
     */
    destroy(): void {
        // 停止广播
        this._stopBroadcast();

        // 停止所有 syncer
        this._syncers.forEach((syncer) => {
            syncer.stop(false);
        });
        this._syncers.clear();
    }

    toString(): string {
        return `AutoStoreSyncManager(${this._store.id}, clients: ${this._syncers.size})`;
    }
}
