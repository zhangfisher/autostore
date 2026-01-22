import type { StateRemoteOperate } from '../types';
import type { IAutoStoreSyncTransport } from './base';
import { isStateRemoteOperate } from '../utils';

/**
 * Worker 接口定义
 * 兼容浏览器和 Node.js 的 Worker API
 */
export interface IWorker {
    /**
     * 发送消息到 Worker
     */
    postMessage(message: any, transfer?: any[]): void;
    /**
     * 添加消息事件监听器
     */
    addEventListener(
        type: string,
        listener: (event: MessageEvent) => void,
        options?: AddEventListenerOptions | boolean,
    ): void;
    /**
     * 移除消息事件监听器
     */
    removeEventListener(
        type: string,
        listener: (event: MessageEvent) => void,
        options?: EventListenerOptions | boolean,
    ): void;
    /**
     * 终止 Worker（可选）
     */
    terminate?: () => void;
}

/**
 * WorkerTransport 配置选项
 */
export type WorkerTransportOptions = {
    /**
     * 传输器唯一标识
     */
    id?: string;
    /**
     * Worker 实例（可选）
     * 如果提供，transport 会使用该 worker 发送消息
     * 但不会自动监听 worker 的 message 事件，需要外部手动监听
     */
    worker?: IWorker;
    /**
     * 是否就绪
     * @default true
     */
    ready?: boolean;
};

/**
 * 基于 Web Worker 的同步传输器
 *
 * 特性：
 * - 兼容浏览器和 Node.js 的 Worker API
 * - 通过 postMessage 进行跨线程通信
 * - 自动处理消息序列化和反序列化
 * - 支持结构化克隆算法
 * - 支持外部控制消息监听，避免事件监听器冲突
 *
 * @example 主线程代码（推荐用法）
 * ```typescript
 * import { WorkerTransport } from '@autostorejs/syncer';
 * import { AutoStoreSyncer } from '@autostorejs/syncer';
 * import { AutoStore } from 'autostore';
 *
 * // 创建 Worker
 * const worker = new Worker('./worker.js');
 *
 * // 创建 transport
 * const transport = new WorkerTransport({
 *     worker: worker,
 *     id: 'main-thread'
 * });
 *
 * // 外部监听消息，避免事件监听器冲突
 * worker.addEventListener('message', (event: MessageEvent) => {
 *     if (transport.handleRemoteOperate(event)) {
 *         return; // 是状态操作消息，已被处理
 *     }
 *     // 处理其他类型的消息
 *     console.log('收到其他消息:', event.data);
 * });
 *
 * // 创建 store 并同步
 * const store = new AutoStore({
 *     count: 0,
 *     user: { name: 'Alice' }
 * });
 *
 * new AutoStoreSyncer(store, { transport });
 * ```
 *
 * @example Worker 线程代码 (worker.js)
 * ```typescript
 * import { AutoStore } from 'autostore';
 * import { AutoStoreSyncer } from '@autostorejs/syncer';
 * import { WorkerTransport } from '@autostorejs/syncer';
 *
 * // 创建 transport（self 就是 Worker 全局对象）
 * const transport = new WorkerTransport({
 *     worker: self as any,
 *     id: 'worker-thread'
 * });
 *
 * // 监听 self 的消息事件
 * self.addEventListener('message', (event: MessageEvent) => {
 *     if (transport.handleRemoteOperate(event)) {
 *         return; // 是状态操作消息，已被处理
 *     }
 *     // 处理其他类型的消息
 *     console.log('收到其他消息:', event.data);
 * });
 *
 * // 创建 store 并同步
 * const store = new AutoStore({
 *     count: 0,
 *     user: { name: 'Alice' }
 * });
 *
 * new AutoStoreSyncer(store, { transport });
 * ```
 */
export class WorkerTransport implements IAutoStoreSyncTransport {
    id: string;
    ready: boolean;
    private worker?: IWorker;
    private receiveCallbacks: ((operate: StateRemoteOperate) => void)[] = [];

    constructor(options: WorkerTransportOptions) {
        this.id =
            options.id ||
            `worker-transport-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
        this.worker = options.worker;
        this.ready = options.ready ?? true;

        // 注意：不再自动绑定 worker 的 message 事件
        // 需要外部手动绑定，这样可以避免事件监听器冲突
    }

    /**
     * 发送操作到 Worker
     */
    send(operate: StateRemoteOperate): void {
        if (!this.ready) {
            return;
        }

        if (this.worker) {
            this.worker.postMessage(operate);
        } else {
            console.warn(
                '[WorkerTransport] 没有配置 worker 实例，无法发送消息。请在外部直接调用 worker.postMessage(operate)',
            );
        }
    }

    /**
     * 处理远程操作事件
     * 判断消息是否是 StateRemoteOperate，如果是则处理并返回 true
     * 如果不是则返回 false，让外部代码处理其他类型的消息
     *
     * @param event MessageEvent 事件对象
     * @returns 如果是 StateRemoteOperate 返回 true，否则返回 false
     *
     * @example
     * ```typescript
     * worker.addEventListener('message', (event: MessageEvent) => {
     *     if (transport.handleRemoteOperate(event)) {
     *         return; // 是状态操作消息，已被处理
     *     }
     *     // 处理其他类型的消息
     *     console.log('收到其他消息:', event.data);
     * });
     * ```
     */
    handleRemoteOperate(event: MessageEvent): boolean {
        if (!isStateRemoteOperate(event.data)) {
            return false;
        }

        // 调用内部处理方法
        this.handleMessage(event.data);
        return true;
    }

    /**
     * 内部方法：处理接收到的状态操作
     */
    private handleMessage(operate: StateRemoteOperate): void {
        // 调用所有注册的回调
        this.receiveCallbacks.forEach((callback) => {
            try {
                callback(operate);
            } catch (error) {
                console.error('[WorkerTransport] 回调执行出错:', error);
            }
        });
    }

    /**
     * 注册接收回调
     * 支持多个回调，每次调用都会添加新的回调
     */
    receive(callback: (operate: StateRemoteOperate) => void): void {
        this.receiveCallbacks.push(callback);
    }

    /**
     * 停止同步
     * 注意：需要在外部手动移除 worker 的消息监听器
     */
    onStop(): void {
        // 不再自动移除监听器，由外部控制
        this.receiveCallbacks = [];
    }

    /**
     * 销毁传输器，清理资源
     */
    destroy(): void {
        this.onStop();
        this.ready = false;
    }
}
