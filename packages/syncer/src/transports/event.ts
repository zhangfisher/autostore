import type { StateRemoteOperate } from "../types";
import { AutoStoreSyncTransportBase, type AutoStoreSyncTransportOptions } from "./base";

/**
 * EventEmitter 接口定义
 * 用于事件监听和触发的基本接口
 */
export interface IEventEmitter {
    on(event: string, listener: (...args: any[]) => void): this;
    off(event: string, listener: (...args: any[]) => void): this;
    emit(event: string, ...args: any[]): boolean;
}

/**
 * 基于 EventEmitter 的同步传输器
 *
 * 特性：
 * - 支持任意实现了 IEventEmitter 接口的事件发射器
 * - 所有 transport 共享同一个 emitter，通过不同的事件名称区分
 * - 支持自定义接收和发送事件名称
 * - 自动处理 $stop 操作
 *
 * @example
 * ```typescript
 * import { EventEmitter } from 'events';
 *
 * const emitter = new EventEmitter();
 *
 * // Store1 的 transport
 * const transport1 = new EventEmitterTransport({
 *     emitter: emitter,
 *     eventName: 'store2-channel',  // 监听 store2 的消息
 *     sendEventName: 'store1-channel'  // 发送到 store1-channel
 * });
 *
 * // Store2 的 transport
 * const transport2 = new EventEmitterTransport({
 *     emitter: emitter,
 *     eventName: 'store1-channel',  // 监听 store1 的消息
 *     sendEventName: 'store2-channel'  // 发送到 store2-channel
 * });
 * ```
 */
export type EventEmitterTransportOptions = {
    emitter: IEventEmitter;
    /**
     * 用于接收的本地订阅事件名称
     */
    localEventName?: string;
    /**
     * 远程发送事件名称
     */
    remoteEventName?: string;
    /**
     * 是否自动建立连接
     */
    autoConnect?: boolean;
};
export class EventEmitterTransport extends AutoStoreSyncTransportBase<EventEmitterTransportOptions> {
    private handleReceive: (operate: StateRemoteOperate) => void;

    constructor(options?: EventEmitterTransportOptions & { id?: string; debug?: boolean }) {
        super(options);
        // 绑定 this 上下文
        this.handleReceive = (operate: StateRemoteOperate) => {
            this.onReceiveOperate(operate);
        };
    }

    /**
     * 当调用connect时会调用onConnect，此时应创建连接
     * 连接成功应返回true
     */
    onConnect() {
        this.options.emitter.on(
            this.options.localEventName || "local-transport",
            this.handleReceive,
        );
        return true;
    }
    onDisconnect() {
        this.options.emitter.off(
            this.options.localEventName || "local-transport",
            this.handleReceive,
        );
    }
    onSendOperate(operate: StateRemoteOperate) {
        this.options.emitter.emit(this.options.remoteEventName || "remote-transport", operate);
    }
}
