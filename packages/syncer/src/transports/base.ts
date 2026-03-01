import type { StateRemoteOperate } from "../types";
import { EventEmitter, EventSubscriber } from "../utils/emitter";
import { isPromiseLike } from "../utils/isPromiseLike";
import { Heartbeat } from "../utils/heartbeat";
import { isStateRemoteOperate } from "../utils";

/**
 * 传输层事件类型
 */
export type TransportEvents = {
    /** 连接建立时触发 */
    connect: void;
    /** 连接断开时触发 */
    disconnect: void;
    /** 接收到远程操作时触发 */
    operate: StateRemoteOperate;
    /** 发生错误时触发 */
    error: Error;
    /** 心跳检测超时，连接可能已断开 */
    timeout: void;
};

export type AutoStoreSyncTransportReceiver = (operate: StateRemoteOperate) => void;

export type AutoStoreSyncTransportOptions = {
    debug?: boolean; // 启用时会在接收到每一条消息时触发operate事件
    autoConnect?: boolean; // 是否自动建立连接，默认为 false 以保持向后兼容
    heartbeat?: number; //是否启用心跳
};

/**
 * AutoStore 同步传输基类
 * 支持注册多个 receiver 来接收远程操作
 * 继承 EventEmitter 提供完整的事件系统
 */
export class AutoStoreSyncTransportBase<
    Options extends Record<string, any> = Record<string, any>,
> extends EventEmitter<TransportEvents> {
    protected receivers = new Map<string, AutoStoreSyncTransportReceiver>();
    protected stopCallbacks = new Map<string, () => void>();
    connected: boolean = false;
    options = {} as AutoStoreSyncTransportOptions & Options;
    static seq: number = 0;
    readonly id: number;
    // 心跳检测器
    heartbeat?: Heartbeat;

    constructor(options?: AutoStoreSyncTransportOptions & Options) {
        super();
        Object.assign(this.options, options);
        this.id = ++AutoStoreSyncTransportBase.seq;

        // 只有明确设置 autoConnect: true 时才自动建立连接
        if (this.options.autoConnect === true) {
            this.connect();
        }
    }

    /**
     * 添加 receiver
     * @param id 接收器唯一标识
     * @param callback 接收远程操作的回调函数
     */
    addReceiver(id: string | number, callback: AutoStoreSyncTransportReceiver): EventSubscriber {
        this.receivers.set(String(id), callback);
        return {
            off: () => this.receivers.delete(String(id)),
        };
    }

    /**
     * 移除 receiver
     * @param id 接收器的唯一标识
     */
    removeReceiver(id: string | number): void {
        this.receivers.delete(String(id));
    }
    /**
     * 供子类继承
     */
    protected _send(_operate: StateRemoteOperate) {
        if (!this.connected) throw new Error();
    }

    /**
     * 建立连接
     * 触发 connect 事件（使用 retain 保留消息，确保晚注册的监听器也能收到）
     */
    connect() {
        if (this.connected) {
            return;
        }
        const isConnect = this.onConnect();
        if (isPromiseLike(isConnect)) {
            return isConnect.then(
                () => {
                    this.connected = true;
                    // 清除之前的 disconnect 保留消息（不触发监听器），然后发送 connect 事件并保留
                    this.clearRetained("disconnect");
                    this.emit("connect", undefined, true); // retain=true 保留消息
                    // 连接成功后，启动心跳检测
                    this.startHeartbeat();
                },
                (error) => {
                    this.emit("error", error);
                    throw error;
                },
            );
        } else {
            this.connected = true;
            // 清除之前的 disconnect 保留消息（不触发监听器），然后发送 connect 事件并保留
            this.clearRetained("disconnect");
            this.emit("connect", undefined, true); // retain=true 保留消息
            // 连接成功后，启动心跳检测
            this.startHeartbeat();
        }
    }
    /**
     * 本方法供子类重载用于创建连接
     */
    protected onConnect(): boolean | Promise<boolean> {
        return true;
    }
    /**
     * 本方法供子类重载用于销毁连接
     */
    protected onDisconnect(): void {}

    /**
     * 启动心跳检测器
     * 当 heartbeat > 0 时创建 Heartbeat 实例并监听超时事件
     *
     */
    startHeartbeat() {
        if (this.options.heartbeat && this.options.heartbeat > 0) {
            // 如果心跳已经存在，则销毁重新创建
            if (this.heartbeat) this.stopHeartbeat();
            this.heartbeat = new Heartbeat(this, {
                interval: this.options.heartbeat,
            });
            // 监听心跳超时事件
            this.heartbeat.on("timeout", () => {
                this.disconnect();
                this.emit("timeout", undefined);
            });
        }
    }

    /**
     * 停止心跳检测器
     * 销毁 Heartbeat 实例并清理资源
     */
    stopHeartbeat() {
        if (this.heartbeat) {
            this.heartbeat.destroy();
            this.heartbeat = undefined;
        }
    }
    private _handlePing(operate: StateRemoteOperate) {
        if (typeof operate === "object" && operate.type === "$ping") {
            // 只有在连接状态下才自动回复 pong
            if (this.connected) {
                this.send({
                    type: "$pong",
                    value: operate.value,
                } as any);
            }
            return true;
        }
        return false;
    }
    /**
     * 本方法用于监听消息事件
     */
    protected onSendOperate(_operate: StateRemoteOperate): void {}
    /**
     * 本方法用于监听消息事件
     */
    protected onReceiveOperate(operate: StateRemoteOperate): boolean {
        // 当前如果没有开启主动心跳则需要回应PONG
        if (this._handlePing(operate)) return true;
        if (this.heartbeat) {
            if (this.heartbeat.onOperate(operate)) return false;
        }
        if (!isStateRemoteOperate(operate)) return false;
        // 通知所有注册的 receivers，让它们自己决定是否处理该消息
        for (const callback of this.receivers.values()) {
            try {
                callback(operate);
            } catch {}
        }
        return true;
    }
    send(operate: StateRemoteOperate) {
        if (!this.connected) {
            throw new Error("Transport is not connected");
        }
        this.onSendOperate(operate);
        if (this.options.debug) {
            this.emit("operate", operate);
        }
    }
    /**
     * 断开连接
     * 触发 disconnect 事件（使用 retain 保留消息，并清除 connect 的保留消息）
     */
    disconnect(): void {
        if (!this.connected) {
            return;
        }
        try {
            this.onDisconnect();
        } finally {
            this.connected = false;
            // 停止心跳检测器
            this.stopHeartbeat();
            // 清除 connect 保留消息（不触发监听器），然后发送 disconnect 事件并保留
            this.clearRetained("connect");
            this.emit("disconnect", undefined, true); // retain=true 保留消息
        }
    }
}
