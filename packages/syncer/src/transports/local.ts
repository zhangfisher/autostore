import type { StateRemoteOperate } from "../types";
import { AutoStoreSyncTransportBase, type AutoStoreSyncTransportOptions } from "./base";

/**
 * 本地同步传输器
 *
 * 特性：
 * - 继承 AutoStoreSyncTransportBase，支持完整的事件系统
 * - 通过 peer 函数获取对端 transport，实现直接通信
 * - 适用于同一进程内的多个 store 之间同步
 * - 支持 connect/disconnect 生命周期管理
 *
 * @example
 * ```typescript
 * // 创建两个 LocalTransport 实例，互相引用
 * let transport1: LocalTransport;
 * let transport2: LocalTransport;
 *
 * transport1 = new LocalTransport(() => transport2);
 * transport2 = new LocalTransport(() => transport1);
 *
 * // 或者启用 debug 模式
 * transport1 = new LocalTransport(() => transport2, { debug: true });
 * transport2 = new LocalTransport(() => transport1, { debug: true });
 *
 * // 分别连接
 * await transport1.connect();
 * await transport2.connect();
 * ```
 */
export class LocalTransport extends AutoStoreSyncTransportBase {
    private getPeer: () => LocalTransport;
    private _peer?: LocalTransport;

    /**
     * 构造函数
     * @param peer 获取对端 transport 的函数
     * @param options 可选配置项
     */
    constructor(peer: () => LocalTransport, options?: AutoStoreSyncTransportOptions) {
        super(options);
        this.getPeer = peer;
    }
    get peer() {
        if (!this._peer) {
            this._peer = this.getPeer();
        }
        return this._peer;
    }
    /**
     * 创建连接
     * 获取对端 transport
     */
    onConnect(): boolean {
        return !!this.peer;
    }

    /**
     * 销毁连接
     */
    onDisconnect() {}

    /**
     * 发送操作到对端
     * 调用对端的 receiveMessage 方法
     */
    onSendOperate(operate: StateRemoteOperate): void {
        if (!this.connected) {
            throw new Error("LocalTransport 未连接，无法发送消息");
        }
        if (!this.peer) {
            throw new Error("无法获取对端 transport");
        }
        this.peer.onReceiveOperate(operate);
    }
}
