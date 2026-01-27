import mitt, { Emitter } from "mitt";
import { EventEmitterTransport } from "../transports/event";

/**
 * 小型事件发射器
 * 基于 mitt 实现，提供类型安全的事件系统
 *
 * @example
 * ```ts
 * type Events = {
 *   'user:login': { id: string; name: string }
 *   'user:logout': void
 * }
 *
 * const emitter = new SmallEventEmitter<Events>()
 *
 * // 监听事件并获取取消订阅函数
 * const subscription = emitter.on('user:login', (data) => {
 *   console.log(data.id, data.name)
 * })
 *
 * // 只监听一次事件
 * emitter.once('user:logout', () => {
 *   console.log('只执行一次')
 * })
 *
 * // 触发事件
 * emitter.emit('user:login', { id: '1', name: 'zhang' })
 *
 * // 取消订阅
 * subscription.off()
 * ```
 */
export type EventSubscriber = { off: () => void };
export type EventListener<Payload> = (payload: Payload) => void;
export type EventAnyListener<Events> = (type: keyof Events, payload: any) => void;
export class EventEmitter<Events extends Record<string, any> = Record<string, any>> {
    #mitt: Emitter<Events>;
    #retainedMessages: Map<keyof Events, Events[keyof Events]>;

    constructor() {
        this.#mitt = mitt<Events>();
        this.#retainedMessages = new Map();
    }

    /**
     * 监听事件
     * @param type - 事件名称
     * @param listener - 事件处理函数
     * @returns 取消订阅的函数
     */
    on<K extends keyof Events>(type: K, listener: EventListener<Events[K]>): EventSubscriber {
        // 如果有保留的消息，立即触发监听器
        const retainedMessage = this.#retainedMessages.get(type);
        if (retainedMessage !== undefined) {
            listener(retainedMessage);
        }

        this.#mitt.on(type, listener);
        return {
            off: () => this.#mitt.off(type, listener),
        };
    }

    /**
     * 监听事件（只执行一次）
     * @param type - 事件名称
     * @param listener - 事件处理函数
     * @returns 取消订阅的函数
     */
    once<K extends keyof Events>(type: K, listener: EventListener<Events[K]>): EventSubscriber {
        // 如果有保留的消息，立即触发监听器（不订阅后续事件）
        const retainedMessage = this.#retainedMessages.get(type);
        if (retainedMessage !== undefined) {
            listener(retainedMessage);
            // 返回空的 off 函数，因为已经触发过了
            return { off: () => {} };
        }

        // 包装处理函数，执行后自动退订
        const wrappedlistener = (event: Events[K]) => {
            listener(event);
            this.#mitt.off(type, wrappedlistener as any);
        };

        this.#mitt.on(type, wrappedlistener as any);
        return {
            off: () => this.#mitt.off(type, wrappedlistener as any),
        };
    }

    /**
     * 移除事件监听
     * @param type - 事件名称
     * @param listener - 事件处理函数
     */
    off<K extends keyof Events>(type: K, listener: EventListener<Events[K]>): void {
        this.#mitt.off(type, listener);
    }

    /**
     * 触发事件或清除保留消息
     * @param type - 事件名称
     * @param payload - 事件数据（不传时清除该事件的保留消息）
     * @param retain - 是否保留消息，true 时会将消息保存，后续 on/once 可立即收到
     */
    emit<K extends keyof Events>(type: K, payload: Events[K], retain?: boolean): void;
    emit<K extends keyof Events>(type: K): void;
    emit<K extends keyof Events>(type: K, payload?: Events[K], retain: boolean = false): void {
        // 只传 type 时，清除该事件的保留消息
        if (arguments.length === 1) {
            this.#retainedMessages.delete(type);
            return;
        }

        // event 此时一定存在（因为 arguments.length > 1）
        const eventData = payload!;

        // 如果 retain 为 true，保存消息
        if (retain) {
            this.#retainedMessages.set(type, eventData);
        }

        this.#mitt.emit(type, eventData);
    }

    /**
     * 异步等待事件触发
     * @param type - 事件名称
     * @param timeout - 超时时间（毫秒），大于 0 时启用超时控制
     * @returns Promise，解析为事件数据
     * @throws 超时时抛出错误
     *
     * @example
     * ```ts
     * // 等待事件（无超时）
     * const data = await emitter.wait('user:login')
     *
     * // 等待事件（带超时）
     * try {
     *   const data = await emitter.wait('user:login', 5000)
     * } catch (error) {
     *   console.error('等待超时')
     * }
     * ```
     */
    async wait<K extends keyof Events>(type: K, timeout?: number): Promise<Events[K]> {
        return new Promise((resolve, reject) => {
            // 使用 once 监听事件（自动退订）
            const subscriber = this.once(type, (event) => {
                // 事件触发时清除超时定时器
                if (timer !== undefined) {
                    clearTimeout(timer);
                }
                resolve(event);
            });

            // 设置超时定时器
            let timer: ReturnType<typeof setTimeout> | undefined;
            if (timeout && timeout > 0) {
                timer = setTimeout(() => {
                    subscriber.off();
                    reject(new Error(`等待事件 "${String(type)}" 超时 (${timeout}ms)`));
                }, timeout);
            }
        });
    }

    /**
     * 监听所有事件
     * @param listener - 事件处理函数
     * @returns 取消订阅的函数
     */
    onAny(listener: EventAnyListener<Events>): EventSubscriber {
        this.#mitt.on("*", listener as any);
        return {
            off: () => this.#mitt.off("*", listener as any),
        };
    }

    /**
     * 移除所有事件监听
     */
    clear(): void {
        this.#mitt.all.clear();
        this.#retainedMessages.clear();
    }

    /**
     * 清理指定类型的保留消息
     * @param type - 事件名称
     */
    clearRetained<K extends keyof Events>(type: K): void {
        this.#retainedMessages.delete(type);
    }

    /**
     * 获取指定类型的保留消息
     * @param type - 事件名称
     * @returns 保留的消息，如果不存在则返回 undefined
     */
    getRetained<K extends keyof Events>(type: K): Events[K] | undefined {
        return this.#retainedMessages.get(type);
    }

    /**
     * 获取所有事件监听器（用于调试）
     */
    get listeners() {
        return this.#mitt.all;
    }
}
