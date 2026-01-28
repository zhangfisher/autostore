/**
 * AutoStoreBroadcaster - 用于管理一个 AutoStore 与多个客户端 Store 之间的同步
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 * 工作原理
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * 【架构图】
 *
 *     Store1 ──→ Transport1 ═════ Transport11 ─┐
 *     Store2 ──→ Transport2 ═════ Transport22 ─┼─→ AutoStoreBroadcaster ─→ MainStore
 *     Store3 ──→ Transport3 ═════ Transport33 ─┘
 *
 * 【核心机制：flags 标记防止循环更新】
 *
 * 系统使用 operate.flags 字段（负数 transport.id）标记操作来源，在广播时排除源端，
 * 从而避免"Store变化 → 更新MainStore → 触发广播 → 回到Store"的循环。
 *
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 【场景1】客户端 Store 触发更新（避免循环）
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *
 * ① Store1 变化 → 通过 Transport1 发送到 Transport11
 * ② Transport11 更新 MainStore 时设置 operate.flags = -Transport11.id
 * ③ MainStore 触发 StateOperate 事件（包含 flags = -Transport11.id）
 * ④ AutoStoreBroadcaster 识别 flags，排除 Transport11，将操作转发给：
 *    - Transport22 → Store2
 *    - Transport33 → Store3
 *
 * ✓ 结果：Store1 的变化同步到其他 Store，但不会回传给自己
 *
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 【场景2】MainStore 本地变化（广播到所有客户端）
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *
 * ① MainStore 直接修改（不经过任何 Transport）
 * ② 触发的 StateOperate 中 operate.flags 不等于任何 -transport.id
 * ③ AutoStoreBroadcaster 将变化广播给所有 Transport：
 *    - Transport11 → Store1
 *    - Transport22 → Store2
 *    - Transport33 → Store3
 *
 * ✓ 结果：MainStore 的本地变化同步到所有客户端 Store
 *
 */

import type { AutoStore, Watcher, StateOperate } from "autostore";
import { getVal, setVal } from "autostore";
import type { AutoStoreBroadcasterOptions, StateRemoteOperate } from "./types";
import type { AutoStoreSyncTransportBase } from "./transports/base";

/**
 * AutoStore 广播器 - 管理主站与多个客户端之间的状态同步
 *
 * 【架构角色】
 * - MainStore：主站状态存储（_store）
 * - Transport：主站侧的传输端点（对应原理图中的 Transport11/22/33）
 * - 每个客户端都有一个对应的 Transport 连接到此广播器
 *
 * 【核心机制】
 * 使用 operate.flags（负数 transport.id）标记操作来源，广播时排除源端以防止循环更新。
 */
export class AutoStoreBroadcastSyncer {
    /**
     * 主站 Store（对应原理图中的 MainStore）
     * 所有客户端的状态最终同步到此 Store
     */
    private _store: AutoStore<any>;

    /** 广播器配置选项 */
    private _options: Required<AutoStoreBroadcasterOptions>;

    /**
     * Transport 注册表
     * Key: transport.id（唯一标识符）
     * Value: Transport 实例（对应原理图中的 Transport11/22/33）
     *
     * 每个 Transport 代表一个客户端到主站的连接点
     */
    transports: Map<number, AutoStoreSyncTransportBase> = new Map();

    /**
     * Transport 事件监听器清理函数映射
     * 用于在 Transport 断开连接时清理其事件监听器
     */
    private _transportCleanup: WeakMap<AutoStoreSyncTransportBase, () => void> = new WeakMap();

    /**
     * MainStore 的 watch 监听器
     * 用于监听主站状态变化并广播到所有客户端（对应原理场景2）
     */
    private _watcher?: Watcher;

    constructor(store: AutoStore<any>, options?: AutoStoreBroadcasterOptions) {
        this._store = store;
        this._options = Object.assign(
            {
                autostart: true,
            },
            options,
        ) as Required<AutoStoreBroadcasterOptions>;

        // 启动自动广播
        if (this._options.autostart) {
            this._startBroadcast();
        }
    }

    get store(): AutoStore<any> {
        return this._store;
    }

    get options(): Required<AutoStoreBroadcasterOptions> {
        return this._options;
    }

    /**
     * 连接一个新的客户端
     * 直接监听 transport 的消息，不创建 AutoStoreSyncer
     *
     * @param transport 传输层对象
     * @returns 客户端 ID
     */
    addTransport(transport: AutoStoreSyncTransportBase) {
        const transportId = transport.id;
        // 如果该客户端已存在则返回
        if (this.transports.has(transportId)) {
            return;
        }
        // 保存映射关系
        this.transports.set(transportId, transport);

        // 直接监听 transport 的消息
        transport.addReceiver(this._store.id, (operate: StateRemoteOperate) => {
            this._onReceiveFromTransport(operate, transport);
        });

        // 监听 transport 的 disconnect 事件，自动清理
        const cleanup = transport.on("disconnect", () => {
            this.removeTransport(transportId);
        });
        this._transportCleanup.set(transport, cleanup.off);
    }

    /**
     * 断开指定客户端的连接
     *
     * @param id 客户端 ID
     */
    removeTransport(id: number): void {
        const transport = this.transports.get(id);
        if (transport) {
            // 清理 transport 事件监听器
            const cleanup = this._transportCleanup.get(transport);
            if (cleanup) {
                cleanup();
                this._transportCleanup.delete(transport);
            }

            this.transports.delete(id);
        }
    }

    /**
     * 广播操作到所有客户端（排除源端以防止循环更新）
     *
     * 【对应原理场景】
     * - 场景1：客户端触发更新时，flags = -transport.id，此时排除源端
     * - 场景2：MainStore 本地变化时，flags = 0，此时广播到所有客户端
     *
     * 【核心逻辑】
     * 1. 从 operate.flags 提取源 transport ID（值为负数时表示来自某个 Transport）
     * 2. 遍历所有 Transport，排除源端后发送操作
     * 3. 这样可以避免：Store → Transport → MainStore → broadcast → 回到 Store 的循环
     *
     * @param operate 要广播的操作（包含 flags 字段用于识别来源）
     */
    broadcast(operate: StateOperate): void {
        // 从 flags 中提取源 transport ID
        // flags < 0 表示操作来自某个 Transport（值为 -transport.id）
        // flags = 0 表示操作来自 MainStore 本地
        const flags = operate?.flags || 0;
        const sourceTransportId = flags < 0 ? -flags : 0;

        // 创建远程操作对象（flags 重置为 0，因为客户端不需要知道原始来源）
        const remoteOperate: StateRemoteOperate = {
            id: this._store.id,
            type: operate.type,
            path: operate.path,
            parentPath: operate.parentPath,
            value: operate.value,
            indexs: operate.indexs,
            flags: 0,
        };

        // 广播到所有 Transport，排除源端
        this.transports.forEach((transport) => {
            if (transport.id === sourceTransportId) return; // 排除源端，防止循环更新
            transport.send(remoteOperate);
        });
    }

    /**
     * 向指定客户端发送操作
     *
     * @param clientId 客户端 ID
     * @param operate 要发送的操作
     */
    sendTo(clientId: number, operate: StateRemoteOperate): void {
        const transport = this.transports.get(clientId);
        if (transport?.connected) {
            transport.send(operate);
        }
    }

    /**
     * 处理从 transport 接收到的远程操作
     * 直接更新 store，不通过 syncer
     *
     * @param operate 远程操作
     */
    private _onReceiveFromTransport(
        operate: StateRemoteOperate,
        transport: AutoStoreSyncTransportBase,
    ): void {
        // 根据操作类型应用更新
        if (operate.type === "$stop") {
            // 客户端请求断开连接
            return;
        } else if (operate.type === "$pull") {
            // 客户端请求拉取完整状态
            this._sendStoreToTransport(operate, transport);
        } else if (operate.type === "$update") {
            // 客户端发送完整状态更新
            this._applyStoreUpdate(operate, transport);
        } else {
            // 普通操作，直接应用到 store
            this._applyOperate(operate, transport);
        }
    }

    /**
     * 应用远程操作到 MainStore（设置 flags 标记来源）
     *
     * 【核心机制：flags 标记】
     * 使用负数 transport.id 作为 flags，标记此操作来自哪个 Transport。
     * 这样在 MainStore 触发 StateOperate 事件时，broadcast() 方法可以：
     * 1. 识别操作来源（flags < 0）
     * 2. 排除源 Transport，避免循环更新
     *
     * 【对应原理场景1】
     * Store1 → Transport1 → Transport11 → MainStore（设置 flags = -Transport11.id）
     * → MainStore 触发事件 → broadcast() 识别并排除 Transport11
     *
     * @param operate 远程操作
     * @param transport 发送此操作的 Transport
     */
    private _applyOperate(
        operate: StateRemoteOperate,
        transport: AutoStoreSyncTransportBase,
    ): void {
        const { type, value, indexs, path } = operate;

        // 应用操作到 MainStore，并设置 flags 标记来源
        this._store.update(
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
                    if (indexs) {
                        arr.splice(indexs[0], indexs.length);
                    }
                }
            },
            // ⚠️ 关键：使用负数 transport.id 作为 flags
            // 这样 broadcast() 方法就能识别并排除此 Transport，防止循环更新
            { flags: -transport.id },
        );
    }

    /**
     * 应用完整的状态更新
     *
     * @param operate 远程操作
     */
    private _applyStoreUpdate(
        operate: StateRemoteOperate,
        transport: AutoStoreSyncTransportBase,
    ): void {
        this._store.update(
            (state) => {
                Object.assign(state, operate.value);
            },
            { flags: -transport.id },
        );
    }

    /**
     * 发送完整 store 状态给客户端
     *
     * @param operate 远程操作
     */
    private _sendStoreToTransport(
        operate: StateRemoteOperate,
        transport: AutoStoreSyncTransportBase,
    ): void {
        // 发送完整状态快照（使用 getSnap() 获取可序列化的状态）
        const response: StateRemoteOperate = {
            id: this._store.id,
            type: "$update",
            path: [],
            value: this._store.getSnap(), // 使用 getSnap() 获取可序列化的状态快照
            flags: 0,
        };
        transport.send(response);
    }

    /**
     * 启动自动广播监听（对应原理场景2）
     *
     * 【监听目标】
     * 监听 MainStore 的状态变化，自动广播到所有客户端 Transport。
     *
     * 【对应原理场景2：MainStore 本地变化】
     * 1. MainStore 直接修改（不经过任何 Transport）
     * 2. 触发 StateOperate 事件，flags = 0（无来源标记）
     * 3. broadcast() 识别 flags = 0，广播到所有 Transport
     *
     * 【为什么监听 "write" 操作】
     * - 只监听写操作（set/update/delete/insert）
     * - 不监听读操作（get），避免不必要的广播
     */
    private _startBroadcast(): void {
        this._watcher = this._store.watch(
            (operate: StateOperate) => {
                this.broadcast(operate);
            },
            {
                operates: "write", // 只广播写操作，忽略读操作
            },
        );
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
        this.transports.forEach((transport) => {
            // 清理 transport 事件监听器
            const cleanup = this._transportCleanup.get(transport);
            if (cleanup) {
                cleanup();
            }
            transport.disconnect();
        });
        this.transports.clear();
    }

    toString(): string {
        return `AutoStoreBroadcaster(${this._store.id}, clients: ${this.transports.size})`;
    }
}
