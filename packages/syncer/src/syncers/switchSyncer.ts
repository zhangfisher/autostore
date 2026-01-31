/**
 * AutoStoreSwitchSyncer - 用于在 SharedWorker 中管理多个 AutoStore 之间的 N-N 同步
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 * 工作原理
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * 【架构图】
 *
 *     SharedWorker 端（使用 AutoStoreSwitchSyncer）
 *     ┌─────────────────────────────────────────────────────────────┐
 *     │  AutoStoreSwitchSyncer                                      │
 *     │  ┌─────────────────────────────────────────────────────┐    │
 *     │  │ Store1 (id: 'store1')                               │    │
 *     │  │   - watch 监听变化 → 广播到订阅了 'store1' 的 transports  │    │
 *     │  └─────────────────────────────────────────────────────┘    │
 *     │  ┌─────────────────────────────────────────────────────┐    │
 *     │  │ Store2 (id: 'store2')                               │    │
 *     │  │   - watch 监听变化 → 广播到订阅了 'store2' 的 transports  │    │
 *     │  └─────────────────────────────────────────────────────┘    │
 *     │  ┌─────────────────────────────────────────────────────┐    │
 *     │  │ Store3 (id: 'store3')                               │    │
 *     │  │   - watch 监听变化 → 广播到订阅了 'store3' 的 transports  │    │
 *     │  └─────────────────────────────────────────────────────┘    │
 *     │                                                             │
 *     │  Transport 映射:                                           │
 *     │  Transport1 → 订阅 ['store1', 'store2', 'store3']           │
 *     │  Transport2 → 订阅 ['store1', 'store2']                   │
 *     │  Transport3 → 订阅 ['store1']                             │
 *     └─────────────────────────────────────────────────────────────┘
 *                              ↕ (消息路由)
 *     浏览器页签端（使用 AutoStoreWorkerSyncer）
 *     ┌─────────────────────────────────────────────────────────────┐
 *     │  页签1                                                      │
 *     │  ├→ syncer1: peers=['store1'] ──→ SharedWorker的Store1     │
 *     │  ├→ syncer2: peers=['store2'] ──→ SharedWorker的Store2     │
 *     │  └→ syncer3: peers=['store3'] ──→ SharedWorker的Store3     │
 *     └─────────────────────────────────────────────────────────────┘
 *
 * 【核心机制：直接管理 Store 和 Transport 映射】
 *
 * 1. 不再使用 AutoStoreBroadcastSyncer，直接管理 stores 和 transports
 * 2. 维护 transport -> store.ids 的映射关系
 * 3. 维护 store.id -> transports 的反向映射，用于广播
 * 4. 使用 flags 标识操作来源（flags = transport.id），防止循环更新
 * 5. 当操作应用到 store 后，watch 触发，根据 flags 排除源端，广播到其他 transports
 *
 * 【使用场景】
 *
 * 适用于需要在 SharedWorker 中管理多个独立状态树的场景：
 * - 多租户应用（每个租户有独立的状态）
 * - 多标签页协同工作（每个标签页可以同步不同的状态）
 * - 复杂应用的状态分区（不同功能模块使用不同的 store）
 *
 * @example 在 SharedWorker 中使用
 * ```typescript
 * import { AutoStoreSwitchSyncer } from '@autostorejs/syncer';
 * import { WorkerTransport } from '@autostorejs/syncer';
 *
 * // 创建多个 store
 * const store1 = new AutoStore({ user: { name: 'Alice' } }, { id: 'store1' });
 * const store2 = new AutoStore({ products: [] }, { id: 'store2' });
 * const store3 = new AutoStore({ cart: [] }, { id: 'store3' });
 *
 * // 创建 switch syncer
 * const switchSyncer = new AutoStoreSwitchSyncer([store1, store2, store3]);
 *
 * // 动态添加新的 store
 * const store4 = new AutoStore({ orders: [] }, { id: 'store4' });
 * switchSyncer.add(store4);
 *
 * // 监听来自页签的连接
 * self.addEventListener('connect', (event) => {
 *     const port = event.ports[0];
 *     port.start();
 *
 *     const transport = new WorkerTransport({
 *         worker: port,
 *         autoConnect: true,
 *     });
 *
 *     // 添加传输器，switch 会自动路由消息到对应的 store
 *     switchSyncer.addTransport(transport);
 * });
 * ```
 *
 * @example 在浏览器页签中使用
 * ```typescript
 * import { AutoStoreWorkerSyncer } from '@autostorejs/syncer';
 * import { AutoStore } from 'autostore';
 *
 * const worker = new SharedWorker('./worker.js', { type: 'module' });
 *
 * // 创建本地 store
 * const storeA = new AutoStore({ user: { name: 'Bob' } }, { id: 'local-store-a' });
 * const storeB = new AutoStore({ products: [] }, { id: 'local-store-b' });
 *
 * // 创建 syncer1，与 SharedWorker 中的 store1 同步
 * const syncer1 = new AutoStoreWorkerSyncer(storeA, worker, {
 *     peers: ['store1'], // 指定要与 SharedWorker 中的 store1 同步
 * });
 *
 * // 创建 syncer2，与 SharedWorker 中的 store2 同步
 * const syncer2 = new AutoStoreWorkerSyncer(storeB, worker, {
 *     peers: ['store2'], // 指定要与 SharedWorker 中的 store2 同步
 * });
 * ```
 */

import type { AutoStore, Watcher, StateOperate } from "autostore";
import { setVal, getVal } from "autostore";
import type { AutoStoreSyncTransportBase } from "../transports/base";
import type { StateRemoteOperate } from "../types";
import { AutoStoreSyncerBase } from "./base";

/**
 * AutoStoreSwitchSyncer 配置选项
 */
export type AutoStoreSwitchSyncerOptions = {
    /**
     * 是否自动启动所有 store 的 watch
     * @default true
     */
    autostart?: boolean;
};

/**
 * AutoStoreSwitchSyncer - 管理多个 AutoStore 的 N-N 同步
 *
 * 【核心职责】
 * 1. 直接管理多个 store，不通过 AutoStoreBroadcastSyncer
 * 2. 维护 transport <-> store.id 的双向映射
 * 3. 监听 transport 的消息，根据 operate.id 路由到对应的 store
 * 4. 使用 flags 机制防止循环更新
 */
export class AutoStoreSwitchSyncer extends AutoStoreSyncerBase {
    /**
     * Store 集合（用于快速访问）
     * Key: store.id
     * Value: AutoStore 实例
     */
    stores: Map<string, AutoStore<any>> = new Map();

    /**
     * Transport 到 Store IDs 的映射
     * Key: transport
     * Value: Set of store ids that this transport subscribes to
     *
     * 例如：Transport1 订阅了 ['store1', 'store2', 'store3']
     */
    private _transportStoreIds: WeakMap<AutoStoreSyncTransportBase, Set<string>> = new WeakMap();

    /**
     * Store ID 到 Transports 的反向映射（用于广播）
     * Key: store.id
     * Value: Set of transports that subscribe to this store
     *
     * 例如：'store1' -> [Transport1, Transport2, Transport3]
     */
    private _storeTransports: Map<string, Set<AutoStoreSyncTransportBase>> = new Map();

    /**
     * Store 的 Watcher 映射
     * Key: store.id
     * Value: Watcher 实例
     */
    private _watchers: Map<string, Watcher> = new Map();

    /**
     * 配置选项
     */
    private _options: Required<AutoStoreSwitchSyncerOptions>;

    /**
     * Transport 事件监听器清理函数映射
     * 用于在 Transport 断开连接或销毁时清理其事件监听器
     */
    private _transportCleanup: WeakMap<AutoStoreSyncTransportBase, () => void> = new WeakMap();

    /**
     * 创建 SwitchSyncer
     *
     * @param stores 要管理的 store 列表
     * @param options 配置选项
     */
    constructor(stores: AutoStore<any>[] = [], options?: AutoStoreSwitchSyncerOptions) {
        super();
        this._options = Object.assign(
            {
                autostart: true,
            },
            options,
        ) as Required<AutoStoreSwitchSyncerOptions>;

        // 初始化所有 stores（但不自动启动 watch）
        stores.forEach((store) => this.add(store));

        // 如果 autostart，则启动所有 watch
        if (this._options.autostart && stores.length > 0) {
            this.start();
        }
    }
    /**
     * 添加一个新的 store
     *
     * @param store 要添加的 store
     */
    add(store: AutoStore<any>): void {
        const storeId = store.id;

        // 如果该 store 已存在则返回
        if (this.stores.has(storeId)) {
            console.warn(
                `[AutoStoreSwitchSyncer] Store with id "${storeId}" already exists, skipping.`,
            );
            return;
        }

        // 保存 store
        this.stores.set(storeId, store);

        // 初始化 store 的 transports 集合
        this._storeTransports.set(storeId, new Set());

        // 如果正在同步中，则自动启动该 store 的 watch
        if (this.syncing) {
            this._startWatch(store);
        }
    }

    /**
     * 移除一个 store
     *
     * @param storeId store 的唯一标识符
     */
    remove(storeId: string): void {
        const store = this.stores.get(storeId);
        if (store) {
            // 停止 watch
            const watcher = this._watchers.get(storeId);
            if (watcher) {
                watcher.off();
                this._watchers.delete(storeId);
            }

            // 移除所有 transports 对该 store 的订阅
            const transports = this._storeTransports.get(storeId);
            if (transports) {
                transports.forEach((transport) => {
                    const storeIds = this._transportStoreIds.get(transport);
                    if (storeIds) {
                        storeIds.delete(storeId);
                    }
                });
            }

            this.stores.delete(storeId);
            this._storeTransports.delete(storeId);
        }
    }

    /**
     * 启动 store 的 watch
     *
     * @param store AutoStore 实例
     */
    private _startWatch(store: AutoStore<any>): void {
        const storeId = store.id;

        // 为该 store 设置 watch，监听变化并广播
        const watcher = store.watch(
            (operate: StateOperate) => {
                // 从 flags 中提取源 transport ID
                // flags < 0 表示操作来自某个 Transport（值为 -transport.id）
                // flags = 0 表示操作来自 store 本地
                const flags = operate?.flags || 0;
                const sourceTransportId = flags < 0 ? -flags : 0;

                // 获取订阅了该 store 的所有 transports
                const transports = this._storeTransports.get(storeId);
                if (!transports || transports.size === 0) {
                    return;
                }

                // 创建远程操作对象（flags 重置为 0，因为客户端不需要知道原始来源）
                const remoteOperate: StateRemoteOperate = {
                    id: storeId,
                    type: operate.type,
                    path: operate.path,
                    parentPath: operate.parentPath,
                    value: operate.value,
                    indexs: operate.indexs,
                    flags: 0,
                };

                // 广播到所有订阅了该 store 的 transports，排除源端
                transports.forEach((transport) => {
                    // 排除源端，防止循环更新
                    if (transport.id === sourceTransportId) {
                        return;
                    }

                    // 发送操作
                    transport.send(remoteOperate);
                });
            },
            {
                operates: "write", // 只广播写操作
            },
        );

        this._watchers.set(storeId, watcher);
    }

    /**
     * 添加传输器
     *
     * 传输器会订阅所有的 stores，这样可以：
     * 1. 接收来自任何 store 的更新（用于广播）
     * 2. 根据 operate.id 将操作路由到正确的 store
     *
     * @param transport 传输层对象
     */
    addTransport(transport: AutoStoreSyncTransportBase): void {
        // 初始化该 transport 订阅的 store ids 集合
        const storeIds = new Set<string>();
        this._transportStoreIds.set(transport, storeIds);

        // 等待 transport 连接
        const onConnect = () => {
            // 订阅所有 stores
            this.stores.forEach((store, storeId) => {
                // 添加到 transport 的订阅列表
                storeIds.add(storeId);

                // 添加到 store 的 transports 列表
                const transports = this._storeTransports.get(storeId);
                if (transports) {
                    transports.add(transport);
                }
            });
        };

        // 如果已经连接，立即执行
        if (transport.connected) {
            onConnect();
        } else {
            // 否则等待连接事件
            transport.once("connect", onConnect);
        }

        // 注册消息接收器，根据 operate.id 路由到对应的 store
        transport.addReceiver("switch-router", (operate: StateRemoteOperate) => {
            const targetStoreId = operate.id;
            const store = this.stores.get(targetStoreId);

            if (!store) {
                console.warn(
                    `[AutoStoreSwitchSyncer] No store found for id "${targetStoreId}", dropping message.`,
                );
                return;
            }

            // 根据消息类型处理
            if (operate.type === "$pull") {
                // 客户端请求拉取完整状态
                this._handlePull(operate, transport, store);
            } else if (operate.type === "$update") {
                // 客户端发送完整状态更新
                this._handleUpdate(operate, transport, store);
            } else {
                // 常规操作（set/update/delete/insert/remove）
                this._handleOperate(operate, transport, store);
            }
        });

        // 监听 transport 的 disconnect 事件，清理资源
        const disconnectCleanup = transport.on("disconnect", () => {
            // 清理事件监听器
            const cleanup = this._transportCleanup.get(transport);
            if (cleanup) {
                cleanup();
                this._transportCleanup.delete(transport);
            }

            // 从所有 stores 的 transports 列表中移除
            storeIds.forEach((storeId) => {
                const transports = this._storeTransports.get(storeId);
                if (transports) {
                    transports.delete(transport);
                }
            });

            // 清理 transport 的映射
            this._transportStoreIds.delete(transport);
        });

        // 监听 transport 的 error 事件，出错时清理资源
        const errorCleanup = transport.on("error", (error: Error) => {
            this._emitError(error);
            // 清理事件监听器
            const cleanup = this._transportCleanup.get(transport);
            if (cleanup) {
                cleanup();
                this._transportCleanup.delete(transport);
            }

            // 从所有 stores 的 transports 列表中移除
            storeIds.forEach((storeId) => {
                const transports = this._storeTransports.get(storeId);
                if (transports) {
                    transports.delete(transport);
                }
            });

            // 清理 transport 的映射
            this._transportStoreIds.delete(transport);
        });

        // 保存清理函数，以便在销毁时调用
        this._transportCleanup.set(transport, () => {
            disconnectCleanup.off();
            errorCleanup.off();
        });
    }

    /**
     * 处理 $pull 请求
     *
     * @param operate 远程操作
     * @param transport 发送操作的 transport
     * @param store 目标 store
     */
    private _handlePull(
        operate: StateRemoteOperate,
        transport: AutoStoreSyncTransportBase,
        store: AutoStore<any>,
    ): void {
        // 发送完整状态快照
        const response: StateRemoteOperate = {
            id: store.id,
            type: "$update",
            path: [],
            value: store.getSnap(),
            flags: 0,
        };
        transport.send(response);
    }

    /**
     * 处理 $update 消息
     *
     * @param operate 远程操作
     * @param transport 发送操作的 transport
     * @param store 目标 store
     */
    private _handleUpdate(
        operate: StateRemoteOperate,
        transport: AutoStoreSyncTransportBase,
        store: AutoStore<any>,
    ): void {
        // 应用完整状态到 store
        // 使用负数 transport.id 作为 flags，标记操作来源
        store.update(
            (state) => {
                Object.assign(state, operate.value);
            },
            { flags: -transport.id },
        );
    }

    /**
     * 处理常规操作（set/update/delete/insert/remove）
     *
     * @param operate 远程操作
     * @param transport 发送操作的 transport
     * @param store 目标 store
     */
    private _handleOperate(
        operate: StateRemoteOperate,
        transport: AutoStoreSyncTransportBase,
        store: AutoStore<any>,
    ): void {
        const { type, value, indexs, path } = operate;

        // 应用操作到 store
        // 使用负数 transport.id 作为 flags，标记操作来源
        store.update(
            (state) => {
                const targetPath = path;
                if (type === "set" || type === "update") {
                    setVal(state, targetPath, value);
                } else if (type === "delete") {
                    setVal(state, targetPath, undefined);
                } else if (type === "insert") {
                    const arr = getVal(state, targetPath);
                    if (Array.isArray(arr) && indexs) {
                        arr.splice(indexs[0], 0, ...value);
                    }
                } else if (type === "remove") {
                    const arr = getVal(state, targetPath);
                    if (Array.isArray(indexs)) {
                        if (indexs.length === 0) {
                            arr.splice(0);
                        } else {
                            arr.splice(indexs[0], indexs.length);
                        }
                    }
                }
            },
            { flags: -transport.id },
        );
    }

    /**
     * 移除传输器
     *
     * @param transportId 传输器 ID
     */
    removeTransport(transportId: number): void {
        // 找到对应的 transport
        for (const [store, transports] of this._storeTransports) {
            transports.forEach((transport) => {
                if (transport.id === transportId) {
                    // 清理 transport 的事件监听器
                    const cleanup = this._transportCleanup.get(transport);
                    if (cleanup) {
                        cleanup();
                        this._transportCleanup.delete(transport);
                    }

                    // 从该 store 的 transports 列表中移除
                    transports.delete(transport);

                    // 从 transport 的 store ids 中移除该 store
                    const storeIds = this._transportStoreIds.get(transport);
                    if (storeIds) {
                        storeIds.delete(store);
                    }
                }
            });
        }
    }

    /**
     * 获取指定 store
     *
     * @param storeId store 的唯一标识符
     * @returns AutoStore 实例，如果不存在则返回 undefined
     */
    getStore(storeId: string): AutoStore<any> | undefined {
        return this.stores.get(storeId);
    }

    /**
     * 获取所有管理的 stores
     *
     * @returns store id 列表
     */
    getStoreIds(): string[] {
        return Array.from(this.stores.keys());
    }

    /**
     * 启动同步器
     *
     * 为所有已添加的 stores 启动 watch 监听
     */
    start(): void {
        if (this.syncing) return;

        let hasError: any;
        try {
            this.syncing = true;
            // 为所有 stores 启动 watch
            this.stores.forEach((store) => {
                // 如果该 store 还没有 watcher，则启动
                if (!this._watchers.has(store.id)) {
                    this._startWatch(store);
                }
            });
        } catch (e: any) {
            hasError = e;
            this._emitError(e);
        } finally {
            if (!hasError) {
                this.emit("start", undefined, true);
            } else {
                this.syncing = false;
            }
        }
    }

    /**
     * 停止同步器
     *
     * 停止所有 stores 的 watch 监听，但保留 stores 和 transports
     */
    stop(): void {
        if (!this.syncing) return;

        try {
            // 停止所有 watchers
            this._watchers.forEach((watcher) => {
                watcher.off();
            });
            this._watchers.clear();
        } finally {
            this.emit("stop", undefined, true);
            this.syncing = false;
        }
    }

    /**
     * 销毁管理器，清理所有资源
     */
    destroy(): void {
        // 停止所有 watchers
        this._watchers.forEach((watcher) => {
            watcher.off();
        });
        this._watchers.clear();

        // 清理所有 transport 的事件监听器
        this._storeTransports.forEach((transports) => {
            transports.forEach((transport) => {
                const cleanup = this._transportCleanup.get(transport);
                if (cleanup) {
                    cleanup();
                }
            });
        });

        // 清理所有映射
        this.stores.clear();
        this._storeTransports.clear();
        this._transportStoreIds = new WeakMap();
        this._transportCleanup = new WeakMap();
    }

    toString(): string {
        const storeIds = Array.from(this.stores.keys()).join(", ");
        return `AutoStoreSwitchSyncer(stores: [${storeIds}], total: ${this.stores.size})`;
    }
}
