import { describe, expect, test, beforeEach } from "vitest";
import { AutoStore } from "../../../core/src";
import { AutoStoreBroadcastSyncer } from "../syncers/broadcastSyncer";
import { LocalTransport } from "../transports/local";
import type { StateRemoteOperate } from "../types";

const delay = (n: number = 0) => new Promise((resolve) => setTimeout(resolve, n));

describe("AutoStoreBroadcastSyncer 心跳测试", () => {
    let broadcaster: AutoStoreBroadcastSyncer;
    let mainStore: AutoStore<any>;
    let transport1: LocalTransport;
    let transport2: LocalTransport;

    beforeEach(() => {
        mainStore = new AutoStore({
            name: "main",
            users: [] as any[],
        });

        // 创建 broadcaster，启用心跳（100ms 间隔）
        broadcaster = new AutoStoreBroadcastSyncer(mainStore, {
            autostart: true,
            heartbeat: 100,
        });

        // 创建两个 transport，但不连接
        transport1 = new LocalTransport(() => null!);
        transport2 = new LocalTransport(() => null!);
    });

    test("应该为每个 transport 创建心跳检测器", async () => {
        broadcaster.addTransport(transport1);
        broadcaster.addTransport(transport2);

        // 检查心跳是否创建（新架构中 heartbeat 在 transport 上）
        expect(transport1.heartbeat).toBeDefined();
        expect(transport2.heartbeat).toBeDefined();
    });

    test("移除 transport 时应该销毁对应的心跳", async () => {
        broadcaster.addTransport(transport1);
        broadcaster.addTransport(transport2);

        // 移除 transport1
        broadcaster.removeTransport(transport1.id);

        // 检查心跳是否被销毁（新架构中 heartbeat 在 transport 上）
        expect(transport1.heartbeat).toBeUndefined();
        expect(transport2.heartbeat).toBeDefined();
    });

    test("heartbeat = 0 时不应该创建心跳检测器", async () => {
        const noHeartbeatBroadcaster = new AutoStoreBroadcastSyncer(mainStore, {
            autostart: true,
            heartbeat: 0,
        });

        noHeartbeatBroadcaster.addTransport(transport1);

        // 不应该创建心跳（新架构中 heartbeat 在 transport 上）
        expect(transport1.heartbeat).toBeUndefined();

        noHeartbeatBroadcaster.destroy();
    });

    test("destroy 时应该清理所有心跳", async () => {
        broadcaster.addTransport(transport1);
        broadcaster.addTransport(transport2);

        broadcaster.destroy();

        // 所有心跳应该被清理（新架构中 heartbeat 在 transport 上）
        expect(transport1.heartbeat).toBeUndefined();
        expect(transport2.heartbeat).toBeUndefined();
    });

    test("心跳超时时应该移除 transport", async () => {
        // 创建一个 mock transport，模拟心跳超时
        // 重写 onSendOperate 扩展点而非 send/connect/disconnect 公共方法：
        // - addTransport 直接调用 startHeartbeat，不经过 connect()，故 connect/disconnect 无需重写
        // - 构造时 connected=true 会被 Heartbeat 检测到并自动启动心跳
        class MockTransport extends LocalTransport {
            constructor() {
                super(() => null!);
                this.connected = true;
            }

            // 不发送任何消息，模拟超时（pong 不会回来）
            onSendOperate(_operate: StateRemoteOperate): void {}
        }

        const mockTransport = new MockTransport();
        broadcaster.addTransport(mockTransport);

        // 等待心跳超时（100ms * maxMissCount(5) = 500ms + 余量）
        await delay(700);

        // transport 应该被移除
        expect(broadcaster.transports.has(mockTransport.id)).toBe(false);
        expect(mockTransport.heartbeat).toBeUndefined();
    });
});
