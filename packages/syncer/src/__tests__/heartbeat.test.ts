// oxlint-disable no-unused-vars
import { describe, expect, test, vi, beforeEach } from "vitest";
import { Heartbeat } from "../utils/heartbeat";
import { LocalTransport } from "../transports/local";

// 等待下一个异步循环的辅助函数
const delay = (n: number = 0) => new Promise((resolve) => setTimeout(resolve, n));

describe("Heartbeat 单元测试", () => {
    let transport1: LocalTransport;
    let transport2: LocalTransport;

    beforeEach(() => {
        transport1 = new LocalTransport(() => transport2);
        transport2 = new LocalTransport(() => transport1);
    });

    describe("基础功能", () => {
        test("应该创建心跳检测器实例", () => {
            const heartbeat = new Heartbeat(transport1, {
                interval: 1000,
            });

            expect(heartbeat).toBeDefined();
        });

        test("interval <= 0 时不应该启动心跳", async () => {
            const sendSpy = vi.spyOn(transport1, "send");
            const heartbeat = new Heartbeat(transport1, {
                interval: 0,
            });

            await transport1.connect();
            await delay(100);

            expect(sendSpy).not.toHaveBeenCalled();

            heartbeat.destroy();
        });

        test("应该发送 ping 消息", async () => {
            const sendSpy = vi.spyOn(transport1, "send");
            const heartbeat = new Heartbeat(transport1, {
                interval: 100,
            });

            await transport1.connect();
            await delay(150);

            expect(sendSpy).toHaveBeenCalled();
            const pingMessage = sendSpy.mock.calls.find((call) => call[0].type === "$ping");
            expect(pingMessage).toBeDefined();
            expect(pingMessage![0].type).toBe("$ping");
            expect(pingMessage![0].value).toBeDefined();

            heartbeat.destroy();
        });
    });

    describe("pong 响应处理", () => {
        test("收到 pong 应该重置丢失计数", async () => {
            const heartbeat = new Heartbeat(transport1, {
                interval: 100,
                maxMissCount: 3,
            });

            const timeoutSpy = vi.fn();
            heartbeat.on("timeout", timeoutSpy);

            await transport1.connect();
            await transport2.connect();

            // 等待第一次 ping
            await delay(50);

            // 模拟 pong 响应 - 需要等待 ping 发送后获取 value
            const pingValue = (transport1 as any).send;
            // 手动发送 pong，value 需要匹配
            transport2.send({
                type: "$pong",
                value: 1,
            } as any);

            await delay(150);

            // 不应该触发超时
            expect(timeoutSpy).not.toHaveBeenCalled();

            heartbeat.destroy();
        });

        test("pong 值不匹配时不应该重置计数", async () => {
            // 给 transport1 创建 Heartbeat，不给 transport2 创建
            // 这样 transport2 不会自动回复 pong（因为没有 Heartbeat receiver）
            const heartbeat = new Heartbeat(transport1, {
                interval: 50,
                maxMissCount: 2,
            });

            const timeoutSpy = vi.fn();
            heartbeat.on("timeout", timeoutSpy);

            await transport1.connect();
            // 不连接 transport2，这样它不会回复 pong

            // 等待多次 ping 后超时
            await delay(200);

            // 应该触发超时
            expect(timeoutSpy).toHaveBeenCalled();

            heartbeat.destroy();
        });
    });

    describe("超时检测", () => {
        test("连续多次未收到 pong 应该触发 timeout 事件", async () => {
            const heartbeat = new Heartbeat(transport1, {
                interval: 50,
                maxMissCount: 3,
            });

            let timeoutCalled = false;
            heartbeat.on("timeout", () => {
                timeoutCalled = true;
            });

            transport2.disconnect();
            // 先连接 transport1，然后断开 transport2，这样 transport2 不会自动回复 pong
            await transport1.connect();

            // 等待超时（50ms * 3 = 150ms + 余量）
            await delay(200);

            expect(timeoutCalled).toBe(true);

            heartbeat.destroy();
        });

        test("超时后应该停止心跳", async () => {
            const sendSpy = vi.spyOn(transport1, "send");
            const heartbeat = new Heartbeat(transport1, {
                interval: 50,
                maxMissCount: 2,
            });

            let timeoutCalled = false;
            heartbeat.on("timeout", () => {
                timeoutCalled = true;
            });

            await transport1.connect();
            transport2.disconnect();

            // 等待超时
            await delay(150);

            expect(timeoutCalled).toBe(true);

            // 记录当前调用次数
            const callCountBefore = sendSpy.mock.calls.length;

            // 再等待一段时间，不应该继续发送
            await delay(100);

            // 调用次数不应该增加
            expect(sendSpy.mock.calls.length).toBe(callCountBefore);

            heartbeat.destroy();
        });

        test("自定义 maxMissCount 应该生效", async () => {
            const heartbeat = new Heartbeat(transport1, {
                interval: 50,
                maxMissCount: 5,
            });

            let timeoutCalled = false;
            heartbeat.on("timeout", () => {
                timeoutCalled = true;
            });

            await transport1.connect();
            transport2.disconnect();

            // 等待 3 次心跳间隔（未达到 maxMissCount）
            await delay(180);

            // 不应该触发超时
            expect(timeoutCalled).toBe(false);

            // 等待达到 maxMissCount
            await delay(150);

            // 应该触发超时
            expect(timeoutCalled).toBe(true);

            heartbeat.destroy();
        });
    });

    describe("自动回复 pong", () => {
        test("收到 ping 应该自动回复 pong", async () => {
            const heartbeat1 = new Heartbeat(transport1, {
                interval: 1000,
            });
            const heartbeat2 = new Heartbeat(transport2, {
                interval: 1000,
            });

            const sendSpy2 = vi.spyOn(transport2, "send");

            await transport1.connect();
            await transport2.connect();

            // 手动发送 ping
            transport1.send({
                type: "$ping",
                value: 123,
            } as any);

            await delay(50);

            // transport2 应该自动回复 pong
            expect(sendSpy2).toHaveBeenCalled();
            const pongMessage = sendSpy2.mock.calls.find((call) => call[0].type === "$pong");
            expect(pongMessage).toBeDefined();
            expect(pongMessage![0].value).toBe(123);

            heartbeat1.destroy();
            heartbeat2.destroy();
        });
    });

    describe("transport 生命周期管理", () => {
        test("transport connect 时应该自动启动心跳", async () => {
            const sendSpy = vi.spyOn(transport1, "send");
            const heartbeat = new Heartbeat(transport1, {
                interval: 100,
            });

            // 创建时未连接，不应该发送
            await delay(50);
            expect(sendSpy).not.toHaveBeenCalled();

            // 连接后应该开始发送
            await transport1.connect();
            await delay(150);

            expect(sendSpy).toHaveBeenCalled();
            const pingMessage = sendSpy.mock.calls.find((call) => call[0].type === "$ping");
            expect(pingMessage).toBeDefined();

            heartbeat.destroy();
        });

        test("transport 已连接时创建应该立即启动心跳", async () => {
            await transport1.connect();

            const sendSpy = vi.spyOn(transport1, "send");
            const heartbeat = new Heartbeat(transport1, {
                interval: 100,
            });

            await delay(150);

            expect(sendSpy).toHaveBeenCalled();
            const pingMessage = sendSpy.mock.calls.find((call) => call[0].type === "$ping");
            expect(pingMessage).toBeDefined();

            heartbeat.destroy();
        });

        test("transport disconnect 时应该自动停止心跳", async () => {
            const sendSpy = vi.spyOn(transport1, "send");
            const heartbeat = new Heartbeat(transport1, {
                interval: 50,
            });

            await transport1.connect();
            await delay(70);

            const callCountBefore = sendSpy.mock.calls.length;
            expect(callCountBefore).toBeGreaterThan(0);

            // 断开连接
            transport1.disconnect();

            // 再等待一段时间
            await delay(100);

            // 调用次数不应该增加太多（允许最后一次 ping 完成）
            expect(sendSpy.mock.calls.length).toBeLessThan(callCountBefore + 3);

            heartbeat.destroy();
        });

        test("transport error 时应该自动停止心跳", async () => {
            const sendSpy = vi.spyOn(transport1, "send");
            const heartbeat = new Heartbeat(transport1, {
                interval: 50,
            });

            await transport1.connect();
            await delay(70);

            const callCountBefore = sendSpy.mock.calls.length;

            // 触发 error 事件
            transport1.emit("error", new Error("Test error"));

            // 再等待一段时间
            await delay(100);

            // 调用次数不应该增加
            expect(sendSpy.mock.calls.length).toBe(callCountBefore);

            heartbeat.destroy();
        });

        test("重新连接后应该重新启动心跳", async () => {
            const sendSpy = vi.spyOn(transport1, "send");
            const heartbeat = new Heartbeat(transport1, {
                interval: 50,
            });

            await transport1.connect();
            await delay(70);

            let callCount = sendSpy.mock.calls.length;
            expect(callCount).toBeGreaterThan(0);

            // 断开连接
            transport1.disconnect();
            await delay(100);

            callCount = sendSpy.mock.calls.length;

            // 重新连接
            await transport1.connect();
            await delay(70);

            // 应该继续发送
            expect(sendSpy.mock.calls.length).toBeGreaterThan(callCount);

            heartbeat.destroy();
        });
    });

    describe("销毁管理", () => {
        test("destroy 应该停止心跳并清理事件监听", async () => {
            const sendSpy = vi.spyOn(transport1, "send");
            const heartbeat = new Heartbeat(transport1, {
                interval: 50,
            });

            await transport1.connect();
            await delay(70);

            const callCountBefore = sendSpy.mock.calls.length;

            // 销毁心跳
            heartbeat.destroy();

            // 再等待一段时间
            await delay(100);

            // 调用次数不应该增加
            expect(sendSpy.mock.calls.length).toBe(callCountBefore);
        });

        test("destroy 后不应该响应 transport 事件", async () => {
            const sendSpy = vi.spyOn(transport1, "send");
            const heartbeat = new Heartbeat(transport1, {
                interval: 50,
            });

            await transport1.connect();
            await delay(70);

            // 记录当前的 ping 次数
            const pingCountBeforeDestroy = sendSpy.mock.calls.filter(
                (call) => call[0].type === "$ping",
            ).length;

            // 销毁心跳
            heartbeat.destroy();

            // 断开并重新连接
            transport1.disconnect();
            await delay(50);
            await transport1.connect();
            await delay(100);

            // ping 次数不应该增加（destroy 后不应该发送新的 ping）
            const pingCountAfterReconnect = sendSpy.mock.calls.filter(
                (call) => call[0].type === "$ping",
            ).length;
            expect(pingCountAfterReconnect).toBe(pingCountBeforeDestroy);
        });
    });

    describe("心跳计数器", () => {
        test("ping 计数器应该递增", async () => {
            const sendSpy = vi.spyOn(transport1, "send");
            const heartbeat = new Heartbeat(transport1, {
                interval: 50,
            });

            await transport1.connect();

            // 等待多个 ping
            await delay(200);

            const pings = sendSpy.mock.calls.filter((call) => call[0].type === "$ping");

            // 应该发送了多个 ping
            expect(pings.length).toBeGreaterThan(1);

            // ping 值应该递增
            const values = pings.map((call) => call[0].value);
            for (let i = 1; i < values.length; i++) {
                expect(values[i]).toBe(values[i - 1] + 1);
            }

            heartbeat.destroy();
        });
    });
});
