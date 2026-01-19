import type { StateRemoteOperate } from '../types';
import type { IAutoStoreSyncTransport } from './base';

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
 * EventEmitterTransport 配置选项
 */
export type EventEmitterTransportOptions = {
    /**
     * 传输器唯一标识
     */
    id?: string;
    /**
     * 事件发射器，所有 transport 共享同一个 emitter
     */
    emitter: IEventEmitter;
    /**
     * 接收事件名称，用于监听远程消息
     * @default 'autostore-sync'
     */
    eventName?: string;
    /**
     * 发送事件名称，用于向远程发送消息
     * 如果不指定，则使用 eventName（与接收使用相同的事件名称）
     */
    sendEventName?: string;
    /**
     * 是否就绪
     * @default true
     */
    ready?: boolean;
};

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
export class EventEmitterTransport implements IAutoStoreSyncTransport {
    id: string;
    ready: boolean;
    private emitter: IEventEmitter;
    private receiveEventName: string;
    private sendEventName: string;
    private receiveCallback?: (operate: StateRemoteOperate) => void;
    private eventListener: (...args: any[]) => void;

    constructor(options: EventEmitterTransportOptions) {
        this.id = options.id || `event-transport-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
        this.emitter = options.emitter;
        this.receiveEventName = options.eventName || 'autostore-sync';
        this.sendEventName = options.sendEventName || this.receiveEventName;
        this.ready = options.ready ?? true;

        // 绑定事件监听器，需要保存引用以便后续移除
        this.eventListener = this.handleEvent.bind(this);
        this.emitter.on(this.receiveEventName, this.eventListener);
    }

    /**
     * 发送操作到远程
     */
    send(operate: StateRemoteOperate): void {
        if (!this.ready) {
            return;
        }

        this.emitter.emit(this.sendEventName, operate);
    }

    /**
     * 注册接收回调
     */
    receive(callback: (operate: StateRemoteOperate) => void): void {
        this.receiveCallback = callback;
    }

    /**
     * 停止同步
     */
    onStop(): void {
        // 移除事件监听
        this.emitter.off(this.receiveEventName, this.eventListener);
    }

    /**
     * 内部方法：处理接收到的事件
     */
    private handleEvent(operate: StateRemoteOperate): void {
        if (this.receiveCallback) {
            this.receiveCallback(operate);
        }
    }

    /**
     * 销毁传输器，清理资源
     */
    destroy(): void {
        this.onStop();
        this.ready = false;
        this.receiveCallback = undefined;
    }
}
