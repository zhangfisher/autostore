import type { AutoStore } from "autostore";
import { AutoStoreSyncer } from "./syncer";
import { BroadcastChannelTransport } from "../transports/broadcast-channel";
import type { AutoStoreSyncerOptions } from "../types";

/**
 * AutoStoreBroadcastChannelSyncer 配置选项
 *
 * 继承 AutoStoreSyncerOptions，但不需要指定 transport
 * 因为 transport 会自动从 channelName 创建
 */
export type AutoStoreBroadcastChannelSyncerOptions = Omit<AutoStoreSyncerOptions, "transport">;

/**
 * 基于 BroadcastChannel 的 AutoStore 同步器
 *
 * 简化了 BroadcastChannelTransport + AutoStoreSyncer 的使用
 * 自动处理 transport 创建，用于跨页面/标签页状态同步
 *
 * BroadcastChannel 是点对点通信，所有页面都是平等的，没有中心服务器。
 * 因此默认使用 `pull` 模式：
 * - 新打开的页面从已有页面拉取最新状态
 * - 避免状态覆盖问题（push 模式会导致后启动的页面覆盖已有状态）
 * - 后续的状态变更会自动同步到所有页面
 *
 * @example 基本使用
 * ```typescript
 * import { AutoStoreBroadcastChannelSyncer } from '@autostorejs/syncer';
 * import { AutoStore } from 'autostore';
 *
 * const store = new AutoStore({
 *     count: 0,
 *     user: { name: 'Alice' }
 * });
 *
 * const syncer = new AutoStoreBroadcastChannelSyncer(store, 'my-store-channel');
 *
 * // 状态会自动在所有打开的页面之间同步
 * store.state.count++;  // 会同步到其他页面
 * ```
 *
 * @example 使用配置选项
 * ```typescript
 * const syncer = new AutoStoreBroadcastChannelSyncer(store, 'my-store-channel', {
 *     mode: 'pull',              // 默认: pull，从已有页面拉取状态
 *     immediate: true,           // 默认: true，连接后立即拉取
 *     direction: 'both',         // 默认: both，双向同步
 *     peers: ['remote-store-id'], // 指定接受的 peer
 * });
 * ```
 *
 * @example 指定本地和远程路径
 * ```typescript
 * const syncer = new AutoStoreBroadcastChannelSyncer(
 *     store,
 *     'my-store-channel',
 *     {
 *         local: 'shared',      // 本地路径前缀
 *         remote: 'data',       // 远程路径前缀
 *     }
 * );
 * ```
 */
export class AutoStoreBroadcastChannelSyncer extends AutoStoreSyncer {
    /**
     * BroadcastChannel 传输器实例
     */
    get transport(): BroadcastChannelTransport {
        return super.transport as BroadcastChannelTransport;
    }

    /**
     * 创建 BroadcastChannel 同步器
     *
     * @param store AutoStore 实例
     * @param channelName 频道名称，同一频道的页面会互相通信
     * @param options 同步配置选项
     */
    constructor(
        store: AutoStore<any>,
        channelName: string,
        options: AutoStoreBroadcastChannelSyncerOptions = {},
    ) {
        // 创建 BroadcastChannelTransport
        const transport = new BroadcastChannelTransport({
            channelName,
        });

        // 调用父类构造函数
        // BroadcastChannel 是点对点通信，使用 pull 模式更合适
        // 新打开的页面从已有页面拉取最新状态，避免覆盖问题
        super(store, {
            mode: "pull",
            immediate: true,
            direction: "both",
            ...options,
            transport,
        });
    }
}
