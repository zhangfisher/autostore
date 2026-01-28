import type { StateRemoteOperate } from "../types";
import { AutoStoreSyncTransportBase, type AutoStoreSyncTransportOptions } from "./base";
import { isStateRemoteOperate } from "../utils";

/**
 * BroadcastChannelTransport 配置选项
 */
export type BroadcastChannelTransportOptions = {
    /**
     * 频道名称
     */
    channelName: string;
    /**
     * 是否自动建立连接，默认为 false 以保持向后兼容
     */
    autoConnect?: boolean;
    /**
     * 启用调试模式
     */
    debug?: boolean;
};

/**
 * 基于 BroadcastChannel API 的同步传输器
 *
 * 特性：
 * - 使用浏览器的 BroadcastChannel API 进行跨页面/标签页通信
 * - 同源的不同浏览上下文之间（如多个标签页、iframe、窗口）可以实现通信
 * - 自动处理消息序列化和反序列化
 * - 继承 AutoStoreSyncTransportBase，支持完整的连接生命周期管理
 * - 支持 connect/disconnect 生命周期管理
 *
 * @example 基本使用
 * ```typescript
 * import { BroadcastChannelTransport } from '@autostorejs/syncer';
 * import { AutoStoreSyncer } from '@autostorejs/syncer';
 * import { AutoStore } from 'autostore';
 *
 * // 创建 transport
 * const transport = new BroadcastChannelTransport({
 *     channelName: 'my-store-channel',
 * });
 *
 * // 连接 transport
 * await transport.connect();
 *
 * // 创建 store 并同步
 * const store = new AutoStore({
 *     count: 0,
 *     user: { name: 'Alice' }
 * });
 *
 * const syncer = new AutoStoreSyncer(store, { transport });
 *
 * // 断开连接时
 * syncer.stop();
 * transport.disconnect();
 * ```
 *
 * @example 多个页面同步
 * ```typescript
 * // 页面 A
 * const transportA = new BroadcastChannelTransport({
 *     channelName: 'shared-store',
 * });
 * await transportA.connect();
 * const storeA = new AutoStore({ count: 0 });
 * const syncerA = new AutoStoreSyncer(storeA, { transport: transportA });
 *
 * // 页面 B
 * const transportB = new BroadcastChannelTransport({
 *     channelName: 'shared-store',
 * });
 * await transportB.connect();
 * const storeB = new AutoStore({ count: 0 });
 * const syncerB = new AutoStoreSyncer(storeB, { transport: transportB });
 *
 * // 现在两个页面的状态会自动同步
 * ```
 */
export class BroadcastChannelTransport extends AutoStoreSyncTransportBase<BroadcastChannelTransportOptions> {
    private channel?: BroadcastChannel;
    private messageHandler?: (event: MessageEvent) => void;

    /**
     * 创建 BroadcastChannel 传输器
     * @param options 配置选项
     */
    constructor(options?: BroadcastChannelTransportOptions) {
        super(options as any);
    }

    /**
     * 创建连接
     * 创建 BroadcastChannel 并绑定 message 事件监听器
     */
    protected onConnect(): boolean {
        try {
            // 创建 BroadcastChannel
            this.channel = new BroadcastChannel(this.options.channelName);

            // 绑定消息监听器
            this.messageHandler = (event: MessageEvent) => {
                console.log('[BroadcastChannelTransport] 收到消息:', event.data);
                if (isStateRemoteOperate(event.data)) {
                    console.log('[BroadcastChannelTransport] 消息验证通过，调用 onReceiveOperate');
                    this.onReceiveOperate(event.data);
                } else {
                    console.log('[BroadcastChannelTransport] 消息验证失败');
                }
            };
            this.channel.addEventListener("message", this.messageHandler);

            return true;
        } catch (error) {
            console.error(
                `[BroadcastChannelTransport] 创建 BroadcastChannel 失败:`,
                error,
            );
            return false;
        }
    }

    /**
     * 销毁连接
     * 关闭 BroadcastChannel 并移除事件监听器
     */
    protected onDisconnect(): void {
        if (this.channel) {
            if (this.messageHandler) {
                this.channel.removeEventListener("message", this.messageHandler);
                this.messageHandler = undefined;
            }
            this.channel.close();
            this.channel = undefined;
        }
    }

    /**
     * 发送操作到 BroadcastChannel
     * 所有同频道的页面都会收到消息
     */
    protected onSendOperate(operate: StateRemoteOperate): void {
        console.log('[BroadcastChannelTransport] 准备发送消息:', operate);
        if (!this.channel) {
            console.warn(
                "[BroadcastChannelTransport] BroadcastChannel 未连接，无法发送消息",
            );
            return;
        }
        console.log('[BroadcastChannelTransport] 发送消息到频道:', this.options.channelName);
        this.channel.postMessage(operate);
        console.log('[BroadcastChannelTransport] 消息已发送');
    }
}
