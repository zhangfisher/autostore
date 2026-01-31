import type { AutoStoreSyncTransportBase } from "../transports/base";
import type { StateRemoteOperate } from "../types";
import { EventSubscriber, EventEmitter } from "./emitter";

/**
 * 心跳检测事件类型
 */
export type HeartbeatEvents = {
    /** 心跳超时，连接已断开 */
    timeout: void;
};

/**
 * 心跳检测配置选项
 */
export interface HeartbeatOptions {
    /**
     * 心跳间隔（毫秒）
     */
    interval: number;
    /**
     * 最大 pong 丢失次数，超过此值则认为连接已断开
     * @default 3
     */
    maxMissCount?: number;
}

/**
 * 心跳检测器
 *
 * 用于检测连接是否存活，通过定期发送 ping 消息并等待 pong 响应来实现。
 * 如果连续多次未收到 pong 响应，则认为连接已断开。
 *
 * 自动监听 transport 的生命周期：
 * - 连接建立时自动启动心跳
 * - 连接断开或出错时自动停止心跳
 *
 * 继承 EventEmitter，在检测到心跳超时时触发 'timeout' 事件
 */
export class Heartbeat extends EventEmitter<HeartbeatEvents> {
    private _timer?: ReturnType<typeof setInterval>;
    private _pingCounter: number = 0;
    private _pongMissCount: number = 0;
    private _maxMissCount: number;
    private _pendingPingValue?: number;
    private _subscribers: EventSubscriber[] = [];
    private _destroyed: boolean = false;

    constructor(
        private transport: AutoStoreSyncTransportBase,
        private options: HeartbeatOptions,
    ) {
        super();
        this._maxMissCount = options.maxMissCount ?? 5;
        this._setupEventListeners();
    }

    /**
     * 设置事件监听器
     */
    private _setupEventListeners() {
        // 监听连接建立事件，启动心跳
        this._subscribers.push(
            this.transport.on("connect", () => {
                if (!this._destroyed) {
                    this._start();
                }
            }),
        );

        // 监听断开连接事件，停止心跳
        this._subscribers.push(
            this.transport.on("disconnect", () => {
                if (!this._destroyed) {
                    this._stop();
                }
            }),
        );

        // 监听错误事件，停止心跳
        this._subscribers.push(
            this.transport.on("error", () => {
                if (!this._destroyed) {
                    this._stop();
                }
            }),
        );

        // 如果已经连接，立即启动心跳
        if (this.transport.connected) {
            this._start();
        }
    }

    onOperate(operate: StateRemoteOperate): boolean {
        if (this._destroyed) return false;
        if (operate.type === "$pong") {
            this.onPong(operate);
            return true;
        } else if (operate.type === "$ping") {
            this.onPing(operate);
            return true;
        }
        return false;
    }
    /**
     * 启动心跳检测（内部方法）
     */
    private _start() {
        // 如果间隔小于等于0，禁用心跳检测
        if (this.options.interval <= 0) return;

        // 清除之前的定时器（如果有）
        this._stop();

        // 重置心跳状态
        this._pingCounter = 0;
        this._pongMissCount = 0;

        // 立即发送第一次 ping，然后启动定时心跳
        this._sendPing();
        this._timer = setInterval(() => {
            this._sendPing();
        }, this.options.interval);
    }

    /**
     * 停止心跳检测（内部方法）
     */
    private _stop() {
        if (this._timer) {
            clearInterval(this._timer);
            this._timer = undefined;
        }
        this._pingCounter = 0;
        this._pongMissCount = 0;
        this._pendingPingValue = undefined;
    }

    /**
     * 销毁心跳检测器，移除所有事件监听
     */
    destroy() {
        this._destroyed = true;
        this._stop();
        // 移除 receiver
        this.transport.removeReceiver("__heartbeat__");
        this._subscribers.forEach((subscriber) => subscriber.off());
        this._subscribers = [];
    }

    /**
     * 处理收到的 pong 响应
     * @param value pong 值（应该与之前发送的 ping 值匹配）
     */
    onPong(operate: StateRemoteOperate) {
        if (operate.type === "$pong") {
            // 验证 pong 值是否匹配待确认的 ping
            if (this._pendingPingValue !== undefined && operate.value === this._pendingPingValue) {
                // 收到正确的 pong 响应，重置丢失计数并清除待确认标记
                this._pongMissCount = 0;
                this._pendingPingValue = undefined;
            }
        }
    }
    onPing(operate: StateRemoteOperate) {
        if (this.transport.connected && operate.type === "$ping") {
            // 只有在连接状态下才自动回复 pong
            this.transport.send({
                type: "$pong",
                value: operate.value,
            } as any);
        }
    }

    /**
     * 发送心跳 ping
     */
    private _sendPing() {
        // 检查心跳是否已销毁
        if (this._destroyed) return;

        // 检查上一个 ping 是否还未收到 pong 响应
        if (this._pendingPingValue !== undefined) {
            // 上一个 ping 还没收到 pong，增加丢失计数
            this._pongMissCount++;
            if (this._pongMissCount >= this._maxMissCount) {
                // 连续多次未收到 pong，认为连接已断开
                this._stop();
                //触发超时事件
                this.emit("timeout", undefined);
                return;
            }
        }

        // 发送新的 ping
        this._pingCounter++;
        this._pendingPingValue = this._pingCounter;
        // 发送 ping 消息，如果 transport 未连接则忽略错误
        try {
            this.transport.send({
                type: "$ping",
                value: this._pingCounter,
            } as any);
        } catch {
            // transport 可能已断开连接，忽略错误
        }
    }
}
