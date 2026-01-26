import type { StateRemoteOperate } from '../types';
import { AutoStoreSyncTransportBase } from './base';
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
     * 调用 connect() 后会自动监听 worker 的 message 事件
     */
    worker?: IWorker;
};

/**
 * 基于 Web Worker 的同步传输器
 *
 * 特性：
 * - 兼容浏览器和 Node.js 的 Worker API
 * - 通过 postMessage 进行跨线程通信
 * - 自动处理消息序列化和反序列化
 * - 支持结构化克隆算法
 * - 继承 AutoStoreSyncTransportBase，支持完整的连接生命周期管理
 * - 支持 connect/disconnect 生命周期管理
 * - 支持自动监听和手动监听两种模式
 *
 * @example 主线程代码（自动监听模式 - 推荐）
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
 * // 连接 transport，会自动监听 worker 的 message 事件
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
 * @example 主线程代码（手动监听模式）
 * ```typescript
 * import { WorkerTransport } from '@autostorejs/syncer';
 * import { AutoStoreSyncer } from '@autostorejs/syncer';
 * import { AutoStore } from 'autostore';
 *
 * const worker = new Worker('./worker.js');
 *
 * const transport = new WorkerTransport({
 *     worker: worker,
 *     id: 'main-thread'
 * });
 *
 * // 手动监听消息，可以和其他消息类型共存
 * worker.addEventListener('message', (event: MessageEvent) => {
 *     if (transport.handleRemoteOperate(event)) {
 *         return; // 是状态操作消息，已被处理
 *     }
 *     // 处理其他类型的消息
 *     console.log('收到其他消息:', event.data);
 * });
 *
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
 * // 连接并自动监听
 * await transport.connect();
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
export class WorkerTransport extends AutoStoreSyncTransportBase<WorkerTransportOptions> {
    private worker?: IWorker;
    private messageHandler?: (event: MessageEvent) => void;

    /**
     * 创建连接
     * 绑定 Worker 的 message 事件监听器
     */
    protected onCreateConnect(): boolean {
        if (!this.options.worker) {
            console.warn(
                '[WorkerTransport] 没有配置 worker 实例，无法建立连接',
            );
            return false;
        }

        this.worker = this.options.worker;
        // 绑定消息监听器，保存引用以便后续移除
        this.messageHandler = (event: MessageEvent) => {
            if (isStateRemoteOperate(event.data)) {
                this.onReceiveOperate(event.data);
            }
        };
        this.worker.addEventListener('message', this.messageHandler);

        return true;
    }

    /**
     * 销毁连接
     * 移除 Worker 的 message 事件监听器
     */
    protected onDestoryConnect(): void {
        if (this.worker && this.messageHandler) {
            this.worker.removeEventListener('message', this.messageHandler);
            this.messageHandler = undefined;
        }
    }

    /**
     * 发送操作到 Worker
     */
    protected onSendOperate(operate: StateRemoteOperate): void {
        if (!this.worker) {
            console.warn(
                '[WorkerTransport] 没有配置 worker 实例，无法发送消息。请在外部直接调用 worker.postMessage(operate)',
            );
            return;
        }
        this.worker.postMessage(operate);
    }

    /**
     * 处理远程操作事件
     * 判断消息是否是 StateRemoteOperate，如果是则处理并返回 true
     * 如果不是则返回 false，让外部代码处理其他类型的消息
     *
     * 注意：如果已经通过 connect() 建立了连接，则会自动处理消息
     * 如果未建立连接，则需要手动调用此方法
     *
     * @param event MessageEvent 事件对象
     * @returns 如果是 StateRemoteOperate 返回 true，否则返回 false
     *
     * @example
     * ```typescript
     * // 方式1：使用 connect 自动监听（推荐）
     * transport.connect();
     *
     * // 方式2：手动监听并处理
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

        this.onReceiveOperate(event.data);
        return true;
    }
}
