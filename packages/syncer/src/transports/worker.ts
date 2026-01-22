import type { StateRemoteOperate } from '../types';
import type { IAutoStoreSyncTransport } from './base';

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
     * Worker 实例
     */
    worker: IWorker;
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
 * - 自动处理 $stop 操作
 *
 * @example 主线程代码
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
 * // 创建 store 并同步
 * const store = new AutoStore({
 *     count: 0,
 *     user: { name: 'Alice' }
 * });
 *
 * new AutoStoreSyncer(store, { transport: transport });
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
 * // 创建 store 并同步
 * const store = new AutoStore({
 *     count: 0,
 *     user: { name: 'Alice' }
 * });
 *
 * new AutoStoreSyncer(store, { transport: transport });
 * ```
 */
export class WorkerTransport implements IAutoStoreSyncTransport {
    id: string;
    ready: boolean;
    private worker: IWorker;
    private receiveCallbacks: ((operate: StateRemoteOperate) => void)[] = [];
    private messageListener: (event: MessageEvent) => void;

    constructor(options: WorkerTransportOptions) {
        this.id =
            options.id ||
            `worker-transport-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
        this.worker = options.worker;
        this.ready = options.ready ?? true;

        // 绑定消息监听器，需要保存引用以便后续移除
        this.messageListener = this.handleMessage.bind(this);
        this.worker.addEventListener('message', this.messageListener);
    }

    /**
     * 发送操作到 Worker
     */
    send(operate: StateRemoteOperate): void {
        if (!this.ready) {
            return;
        }

        this.worker.postMessage(operate);
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
     */
    onStop(): void {
        // 移除消息监听器
        this.worker.removeEventListener('message', this.messageListener);
    }

    /**
     * 内部方法：处理接收到的消息
     */
    private handleMessage(event: MessageEvent): void {
        const operate = event.data as StateRemoteOperate;
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
     * 销毁传输器，清理资源
     */
    destroy(): void {
        this.onStop();
        this.ready = false;
        this.receiveCallbacks = [];

        // 可选：终止 Worker（如果需要完全关闭）
        // 注意：这会终止整个 Worker，请谨慎使用
        // if (this.worker.terminate) {
        //     this.worker.terminate();
        // }
    }
}
