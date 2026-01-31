/**
 * AutoStoreSyncerBase - 所有 Syncer 的基类
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 * 职责
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * 1. 提供统一的事件系统（基于 EventEmitter）
 * 2. 管理序列号生成（static seq）
 * 3. 管理同步状态（syncing）
 * 4. 定义生命周期接口（start/stop）
 * 5. 提供标准错误处理
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 * 使用示例
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * ```typescript
 * class MySyncer extends AutoStoreSyncerBase {
 *     private _watcher?: Watcher;
 *
 *     constructor() {
 *         super();
 *     }
 *
 *     start() {
 *         if (this.syncing) return;
 *
 *         try {
 *             this.syncing = true;
 *             // 启动逻辑
 *             this._watcher = this.store.watch(...);
 *         } catch (error) {
 *             this.syncing = false;
 *             this._emitError(error as Error);
 *             throw error;
 *         } finally {
 *             if (this.syncing) {
 *                 this.emit("start", undefined, true);
 *             }
 *         }
 *     }
 *
 *     stop() {
 *         if (!this.syncing) return;
 *
 *         try {
 *             if (this._watcher) {
 *                 this._watcher.off();
 *                 this._watcher = undefined;
 *             }
 *         } finally {
 *             this.emit("stop", undefined, true);
 *             this.syncing = false;
 *         }
 *     }
 * }
 * ```
 */

import type { StateOperate } from "autostore";
import type { StateRemoteOperate } from "../types";
import { EventEmitter } from "../utils/emitter";

/**
 * AutoStoreSyncerBase - 所有 Syncer 的基类
 *
 * 【核心特性】
 * - 事件系统：继承 EventEmitter<AutoStoreSyncerEvents>
 * - 序列号：static seq = 99，用于生成唯一实例标识
 * - 同步状态：syncing 标记同步器是否正在运行
 * - 生命周期：定义 start() 和 stop() 方法接口
 * - 错误处理：提供统一的错误触发机制
 */
export abstract class AutoStoreSyncerBase extends EventEmitter<AutoStoreSyncerEvents> {
    /**
     * 序列号计数器
     * 用于为每个 syncer 实例生成唯一标识
     */
    static seq = 99;
    protected _syncing: boolean = false;

    /**
     * 同步状态
     * - true: 正在同步
     * - false: 已停止
     */
    get syncing() {
        return this._syncing;
    }

    /**
     * 启动同步器
     *
     * 【实现要求】
     * 1. 检查 this.syncing，如果已启动则直接返回
     * 2. 设置 this.syncing = true
     * 3. 使用 try-catch-finally 处理错误
     * 4. 在 finally 中：
     *    - 如果无错误：this.emit("start", undefined, true)
     *    - 如果有错误：this.syncing = false，this._emitError(error)
     *
     * 【错误处理示例】
     * ```typescript
     * start() {
     *     if (this.syncing) return;
     *     let hasError: any;
     *     try {
     *         this.syncing = true;
     *         // 启动逻辑
     *     } catch (e) {
     *         hasError = e;
     *         this._emitError(e as Error);
     *         throw e;
     *     } finally {
     *         if (!hasError) {
     *             this.emit("start", undefined, true);
     *         }
     *     }
     * }
     * ```
     */
    abstract start(): void;

    /**
     * 停止同步器
     *
     * 【实现要求】
     * 1. 检查 !this.syncing，如果已停止则直接返回
     * 2. 使用 try-finally 确保状态更新
     * 3. 在 finally 中：
     *    - this.emit("stop", undefined, true)
     *    - this.syncing = false
     *
     * 【实现示例】
     * ```typescript
     * stop() {
     *     if (!this.syncing) return;
     *     try {
     *         // 清理逻辑
     *     } finally {
     *         this.emit("stop", undefined, true);
     *         this.syncing = false;
     *     }
     * }
     * ```
     */
    abstract stop(): void;

    /**
     * 触发错误事件
     *
     * @param error 错误对象
     */
    protected _emitError(error: Error): void {
        this.emit("error", error, true);
    }

    /**
     * 向远程端推送本地状态
     *
     * 【默认行为】
     * 默认抛出错误，表示该 syncer 不支持 push 操作。
     * 子类可以重写此方法以实现具体的推送逻辑。
     *
     * 【子类实现示例】
     * ```typescript
     * push(options?: { initial?: boolean }): void {
     *     if (!this.syncing) {
     *         throw new Error('Syncer is not started');
     *     }
     *
     *     const { initial = false } = options || {};
     *
     *     // 发送 $push 消息到远程
     *     this.transport.send({
     *         id: this.id,
     *         type: '$push',
     *         path: this.options.remote,
     *         value: this._getLocalSnap(),
     *         flags: initial ? SYNC_INIT_FLAG : 0
     *     });
     * }
     * ```
     *
     * @param options 推送选项
     * @param options.initial 是否是首次推送（flags 将设置为 SYNC_INIT_FLAG）
     */
    push(_options?: { initial?: boolean }): void {
        throw new Error(
            `${this.constructor.name} does not support push() operation. ` +
                `Please use a syncer that implements this method, or override it in a subclass.`,
        );
    }

    /**
     * 从远程端拉取状态
     *
     * 【默认行为】
     * 默认抛出错误，表示该 syncer 不支持 pull 操作。
     * 子类可以重写此方法以实现具体的拉取逻辑。
     *
     * 【子类实现示例】
     * ```typescript
     * pull(): void {
     *     if (!this.syncing) {
     *         throw new Error('Syncer is not started');
     *     }
     *
     *     // 发送 $pull 消息到远程
     *     this.transport.send({
     *         id: this.id,
     *         type: '$pull',
     *         path: this.options.remote,
     *         value: undefined,
     *         flags: 0
     *     });
     * }
     * ```
     */
    pull(): void {
        throw new Error(
            `${this.constructor.name} does not support pull() operation. ` +
                `Please use a syncer that implements this method, or override it in a subclass.`,
        );
    }

    /**
     * 获取字符串表示
     *
     * 子类应该重写此方法以提供更有意义的描述
     *
     * @returns 字符串表示
     */
    abstract toString(): string;
}

export type AutoStoreSyncerEvents = {
    /**
     * 当同步器启动时
     */
    start: void;
    /**
     * 当同步器停止时
     */
    stop: void;
    /** 发生错误时触发 */
    error: Error;
    /**
     * 当从远程接收到操作时触发，用于调试
     * 仅debug=true时生效
     */
    remoteOperate: StateRemoteOperate;
    /**
     * 当从本地store接收到操作时触发，用于调试
     * 仅debug=true时生效
     */
    localOperate: StateOperate;
    /**
     * 当接收到对方的
     *  - $update
     *  - $push
     * 时触发此操作，代表两方已完成首次同步
     */
    syncing: string;
};
