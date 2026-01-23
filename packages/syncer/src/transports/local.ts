import type { StateRemoteOperate } from '../types';
import { AutoStoreSyncTransportBase } from './base';

/**
 * LocalTransport 配置选项
 */
export type LocalTransportOptions = {
    /**
     * 获取对端 transport 的函数
     * 用于建立两个 LocalTransport 之间的直接通信
     */
    getPeer: () => LocalTransport;
};

/**
 * 本地同步传输器
 *
 * 特性：
 * - 继承 AutoStoreSyncTransportBase，支持完整的事件系统
 * - 通过 getPeer 函数获取对端 transport，实现直接通信
 * - 适用于同一进程内的多个 store 之间同步
 * - 支持 connect/disconnect 生命周期管理
 *
 * @example
 * ```typescript
 * // 创建两个 LocalTransport 实例，互相引用
 * let transport1: LocalTransport;
 * let transport2: LocalTransport;
 *
 * transport1 = new LocalTransport({
 *     getPeer: () => transport2
 * });
 *
 * transport2 = new LocalTransport({
 *     getPeer: () => transport1
 * });
 *
 * // 分别连接
 * transport1.connect();
 * transport2.connect();
 * ```
 */
export class LocalTransport extends AutoStoreSyncTransportBase<LocalTransportOptions> {
    private peer?: LocalTransport;

    /**
     * 创建连接
     * 获取对端 transport
     */
    onCreateConnect(): boolean {
        this.peer = this.options.getPeer();
        return !!this.peer;
    }

    /**
     * 销毁连接
     */
    onDestoryConnect(): void {
        this.peer = undefined;
    }

    /**
     * 发送操作到对端
     * 调用对端的 receiveMessage 方法
     */
    onSendOperate(operate: StateRemoteOperate): void {
        if (!this.connected || !this.peer) {
            throw new Error('LocalTransport 未连接，无法发送消息');
        }
        this.peer.onReceiveOperate(operate);
    } 
}
