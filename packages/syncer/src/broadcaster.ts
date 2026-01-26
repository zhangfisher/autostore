/**
 * AutoStoreBroadcaster - 用于管理一个 AutoStore 与多个客户端 Store 之间的同步
 *
 * 主要职责：
 * - 作为中心化的状态广播器，运行在 Worker/SharedWorker 等独立线程中
 * - 接受多个客户端连接，每个客户端对应一个 AutoStoreSyncer 实例
 * - 自动广播本地状态变化到所有已连接的客户端
 * - 支持向特定客户端发送操作
 * - 监听 transport 断开事件，自动清理对应的 syncer
 *
 * @example SharedWorker 代码
 * ```typescript
 * import { AutoStore } from 'autostore';
 * import { AutoStoreBroadcaster } from '@autostorejs/syncer';
 * import { WorkerTransport } from '@autostorejs/syncer/transports/worker';
 *
 * const store = new AutoStore({
 *     count: 0,
 *     user: { name: 'Alice' }
 * });
 *
 * const broadcaster = new AutoStoreBroadcaster(store, {
 *     autoBroadcast: true  // 自动广播状态变化
 * });
 *
 * // 处理来自页签的连接
 * self.addEventListener('connect', (event: any) => {
 *     const port = event.ports[0];
 *     // 创建 transport 并连接
 *     const transport = new WorkerTransport({ worker: port });
 *     broadcaster.connect(transport);
 * });
 * ```
 *
 * @example 浏览器页签代码
 * ```typescript
 * import { AutoStore } from 'autostore';
 * import { AutoStoreSyncer } from '@autostorejs/syncer';
 * import { WorkerTransport } from '@autostorejs/syncer/transports/worker';
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
import { getVal, setVal } from 'autostore';
import type {
    AutoStoreBroadcasterOptions,
    StateRemoteOperate,
} from './types';
import { AutoStoreSyncTransportBase } from './transports/base';

export class AutoStoreBroadcaster {
    private _store: AutoStore<any>;
    private _options: Required<AutoStoreBroadcasterOptions>;
    // 客户端 ID 到 Transport 的映射
    private _transports: Map<string, AutoStoreSyncTransportBase> = new Map();
    // Transport 到客户端 ID 的映射
    private _transportToId: WeakMap<AutoStoreSyncTransportBase, string> = new WeakMap();
    // Transport 到事件监听器清理函数的映射
    private _transportCleanup: WeakMap<AutoStoreSyncTransportBase, () => void> = new WeakMap();
    // 记录当前正在处理的 operate 来源 transport
    private _currentSourceTransport: WeakMap<StateRemoteOperate, AutoStoreSyncTransportBase> = new WeakMap();
    // 存储 watch 监听器
    private _watcher?: Watcher;

    constructor(store: AutoStore<any>, options?: AutoStoreBroadcasterOptions) {
        this._store = store;
        this._options = Object.assign(
            {
                autoBroadcast: true,
            },
            options,
        ) as Required<AutoStoreBroadcasterOptions>;

        // 启动自动广播
        if (this._options.autoBroadcast) {
            this._startBroadcast();
        }
    }

    get store(): AutoStore<any> {
        return this._store;
    }

    get options(): Required<AutoStoreBroadcasterOptions> {
        return this._options;
    }

    get transports(): Map<string, AutoStoreSyncTransportBase> {
        return this._transports;
    }

    /**
     * 连接一个新的客户端
     * 直接监听 transport 的消息，不创建 AutoStoreSyncer
     *
     * @param transport 传输层对象
     * @returns 客户端 ID
     */
    connect(transport: AutoStoreSyncTransportBase): string {
        // 生成客户端 ID（优先使用 transport 的 id，否则生成新的）
        const clientId =
            transport.id ||
            `client-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

        // 如果该客户端已存在，先断开旧连接
        if (this._transports.has(clientId)) {
            this.disconnect(clientId);
        }

        // 保存映射关系
        this._transports.set(clientId, transport);
        this._transportToId.set(transport, clientId);

        // 直接监听 transport 的消息
        transport.addReceiver(this._store.id, (operate: StateRemoteOperate) => {
            // 记录消息来源 transport
            this._currentSourceTransport.set(operate, transport);
            this._onReceiveFromTransport(operate);
        });

        // 监听 transport 的 disconnect 事件，自动清理
        const cleanup = transport.on('disconnect', () => {
            this.disconnect(clientId);
        });
        this._transportCleanup.set(transport, cleanup.off);

        return clientId;
    }

    /**
     * 断开指定客户端的连接
     *
     * @param clientId 客户端 ID
     */
    disconnect(clientId: string): void {
        const transport = this._transports.get(clientId);
        if (transport) {
            // 清理 transport 事件监听器
            const cleanup = this._transportCleanup.get(transport);
            if (cleanup) {
                cleanup();
                this._transportCleanup.delete(transport);
            }

            // 清理映射关系
            this._transportToId.delete(transport);
            this._transports.delete(clientId);
        }
    }

    /**
     * 根据 transport 断开连接
     *
     * @param transport 传输层对象
     */
    disconnectByTransport(transport: AutoStoreSyncTransportBase): void {
        const clientId = this._transportToId.get(transport);
        if (clientId) {
            this.disconnect(clientId);
        }
    }

    /**
     * 获取指定客户端的 transport
     *
     * @param clientId 客户端 ID
     * @returns transport 实例，如果不存在则返回 undefined
     */
    getTransport(clientId: string): AutoStoreSyncTransportBase | undefined {
        return this._transports.get(clientId);
    }

    /**
     * 根据 transport 获取对应的客户端 ID
     *
     * @param transport 传输层对象
     * @returns 客户端 ID，如果不存在则返回 undefined
     */
    getClientIdByTransport(transport: AutoStoreSyncTransportBase): string | undefined {
        return this._transportToId.get(transport);
    }

    /**
     * 获取所有已连接的客户端 ID
     */
    getClientIds(): string[] {
        return Array.from(this._transports.keys());
    }

    /**
     * 获取已连接的客户端数量
     */
    get clientCount(): number {
        return this._transports.size;
    }

    /**
     * 向所有客户端广播操作（排除发送方）
     *
     * @param operate 要广播的操作
     */
    broadcast(operate: StateRemoteOperate): void {
        this._transports.forEach((transport) => {
            if (!transport.connected) return;

            // 检查 flags，如果匹配该 transport 的 hash，跳过
            if (operate.flags && operate.flags < 0) {
                const transportHash = this._hashTransportId(transport.id);
                if (-operate.flags === transportHash) {
                    return; // 跳过发送方
                }
            }

            transport.send(operate);
        });
    }

    /**
     * 向指定客户端发送操作
     *
     * @param clientId 客户端 ID
     * @param operate 要发送的操作
     */
    sendTo(clientId: string, operate: StateRemoteOperate): void {
        const transport = this._transports.get(clientId);
        if (transport && transport.connected) {
            transport.send(operate);
        }
    }

    /**
     * 处理从 transport 接收到的远程操作
     * 直接更新 store，不通过 syncer
     *
     * @param operate 远程操作
     */
    private _onReceiveFromTransport(operate: StateRemoteOperate): void {
        // 根据操作类型应用更新
        if (operate.type === '$stop') {
            // 客户端请求断开连接
            return;
        } else if (operate.type === '$pull-store') {
            // 客户端请求拉取完整状态
            this._sendStoreToTransport(operate);
        } else if (operate.type === '$update-store') {
            // 客户端发送完整状态更新
            this._applyStoreUpdate(operate);
        } else {
            // 普通操作，直接应用到 store
            this._applyOperate(operate);
        }
    }

    /**
     * 应用远程操作到 store
     *
     * @param operate 远程操作
     */
    private _applyOperate(operate: StateRemoteOperate): void {
        const { type, value, indexs, path } = operate;

        // 从 WeakMap 中获取源 transport
        const sourceTransport = this._currentSourceTransport.get(operate);
        if (!sourceTransport) {
            console.warn('[AutoStoreBroadcaster] 无法找到源 transport');
            return;
        }

        // 应用操作到 store（使用负数 transport.id 作为 flags，标记来源）
        this._store.update(
            (state) => {
                const targetPath = path;
                if (type === 'set' || type === 'update') {
                    setVal(state, targetPath, value);
                } else if (type === 'delete') {
                    setVal(state, targetPath, undefined);
                } else if (type === 'insert') {
                    const arr = getVal(state, targetPath);
                    if (Array.isArray(arr) && indexs) {
                        arr.splice(indexs[0], 0, ...value);
                    }
                }
            },
            { flags: -this._hashTransportId(sourceTransport.id) }, // 使用负数 hash 标记来源
        );

        // 清理 WeakMap 中的引用
        this._currentSourceTransport.delete(operate);
    }

    /**
     * 应用完整的状态更新
     *
     * @param operate 远程操作
     */
    private _applyStoreUpdate(operate: StateRemoteOperate): void {
        const sourceTransport = this._currentSourceTransport.get(operate);
        if (!sourceTransport) {
            console.warn('[AutoStoreBroadcaster] 无法找到源 transport');
            return;
        }

        this._store.update(
            (state) => {
                Object.assign(state, operate.value);
            },
            { flags: -this._hashTransportId(sourceTransport.id) },
        );

        // 清理 WeakMap 中的引用
        this._currentSourceTransport.delete(operate);
    }

    /**
     * 发送完整 store 状态给客户端
     *
     * @param operate 远程操作
     */
    private _sendStoreToTransport(operate: StateRemoteOperate): void {
        // 从 WeakMap 中获取源 transport
        const sourceTransport = this._currentSourceTransport.get(operate);
        if (!sourceTransport) {
            console.warn('[AutoStoreBroadcaster] 无法找到源 transport');
            return;
        }

        // 发送完整状态快照（使用 getSnap() 获取可序列化的状态）
        const response: StateRemoteOperate = {
            id: this._store.id,
            type: '$update-store',
            path: [],
            value: this._store.getSnap(), // 使用 getSnap() 获取可序列化的状态快照
            flags: 0,
        };
        sourceTransport.send(response);

        // 清理 WeakMap 中的引用
        this._currentSourceTransport.delete(operate);
    }

    /**
     * 将 transport.id 转换为数字 hash（用于 flags）
     */
    private _hashTransportId(id: string): number {
        // 简单的 hash 函数：将字符串转换为数字
        let hash = 0;
        for (let i = 0; i < id.length; i++) {
            const char = id.charCodeAt(i);
            hash = (hash << 5) - hash + char;
            hash = hash & hash; // 转换为 32 位整数
        }
        return Math.abs(hash) || 1; // 确保返回正数，至少为 1
    }

    /**
     * 启动自动广播
     * 监听主 store 的变化，自动广播到所有客户端
     */
    private _startBroadcast(): void {
        this._watcher = this._store.watch((operate: StateOperate) => {
            // 创建远程操作并广播
            const remoteOperate: StateRemoteOperate = {
                id: this._store.id, // 使用 store.id 而不是固定的 'manager'
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

        // 断开所有 transport 并清理事件监听器
        this._transports.forEach((transport) => {
            // 清理 transport 事件监听器
            const cleanup = this._transportCleanup.get(transport);
            if (cleanup) {
                cleanup();
            }
            // 断开 transport
            if (transport.connected) {
                transport.disconnect();
            }
        });
        this._transports.clear();
    }

    toString(): string {
        return `AutoStoreBroadcaster(${this._store.id}, clients: ${this._transports.size})`;
    }
}
