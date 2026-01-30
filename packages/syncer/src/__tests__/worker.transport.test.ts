// oxlint-disable no-unused-vars
import { describe, expect, test, vi } from "vitest";
import { computed, AutoStore } from "../../../core/src";
import { AutoStoreSyncer } from "../syncers/syncer";
import { WorkerTransport } from "../transports/worker";
import type { IWorker } from "../transports/worker";
import type { StateRemoteOperate } from "../types";

/**
 * 模拟 Worker 实现，用于测试
 */
class MockWorker implements IWorker {
    private messageListeners: Set<(event: MessageEvent) => void> = new Set();
    private terminated: boolean = false;
    private bridgedWorkers: Set<MockWorker> = new Set();
    private isBridged: boolean = false;

    postMessage(message: any): void {
        if (this.terminated) {
            throw new Error("Worker has been terminated");
        }

        // 如果已经桥接，使用桥接逻辑
        if (this.isBridged && this.bridgedWorkers.size > 0) {
            // 触发桥接的 Worker 的监听器
            this.bridgedWorkers.forEach((bridgedWorker) => {
                setTimeout(() => {
                    const event = new MessageEvent("message", { data: message });
                    bridgedWorker.messageListeners.forEach((listener) => {
                        listener(event);
                    });
                }, 0);
            });
        } else {
            // 模拟异步消息传递
            setTimeout(() => {
                const event = new MessageEvent("message", { data: message });
                this.messageListeners.forEach((listener) => {
                    listener(event);
                });
            }, 0);
        }
    }

    addEventListener(type: string, listener: (event: MessageEvent) => void): void {
        if (type === "message") {
            this.messageListeners.add(listener);
        }
    }

    removeEventListener(type: string, listener: (event: MessageEvent) => void): void {
        if (type === "message") {
            this.messageListeners.delete(listener);
        }
    }

    terminate(): void {
        this.terminated = true;
        this.messageListeners.clear();
        this.bridgedWorkers.clear();
    }

    /**
     * 获取消息监听器数量
     */
    get listenerCount(): number {
        return this.messageListeners.size;
    }

    /**
     * 手动触发消息事件（用于测试）
     */
    dispatchMessage(message: any): void {
        const event = new MessageEvent("message", { data: message });
        this.messageListeners.forEach((listener) => {
            listener(event);
        });
    }

    /**
     * 连接到另一个 Worker，建立双向消息桥接
     * 用于模拟两个 Worker 之间的通信
     *
     * 注意：这个方法模拟真实的 Worker 通信：
     * - 当 worker1.postMessage() 被调用时，只有 worker2 收到消息
     * - 当 worker2.postMessage() 被调用时，只有 worker1 收到消息
     */
    connectTo(otherWorker: MockWorker): void {
        // 如果已经桥接，则跳过
        if (this.bridgedWorkers.has(otherWorker)) {
            return;
        }

        // 建立双向桥接
        this.bridgedWorkers.add(otherWorker);
        otherWorker.bridgedWorkers.add(this);

        // 标记为已桥接
        this.isBridged = true;
        otherWorker.isBridged = true;
    }
}

describe("WorkerTransport 单元测试", () => {
    describe("MockWorker 连接测试", () => {
        test("connectTo 应该正确建立双向消息桥接", async () => {
            const worker1 = new MockWorker();
            const worker2 = new MockWorker();

            const messages1: any[] = [];
            const messages2: any[] = [];

            worker1.addEventListener("message", (e) => messages1.push(e.data));
            worker2.addEventListener("message", (e) => messages2.push(e.data));

            // 建立连接
            worker1.connectTo(worker2);

            // worker1 发送消息
            worker1.postMessage({ type: "test", value: 1 });
            await new Promise((resolve) => setTimeout(resolve, 10));

            // 只有 worker2 收到消息
            expect(messages1).toHaveLength(0);
            expect(messages2).toHaveLength(1);
            expect(messages2[0]).toEqual({ type: "test", value: 1 });

            // worker2 发送消息
            worker2.postMessage({ type: "test", value: 2 });
            await new Promise((resolve) => setTimeout(resolve, 10));

            // 只有 worker1 收到消息
            expect(messages1).toHaveLength(1);
            expect(messages2).toHaveLength(1);
            expect(messages1[0]).toEqual({ type: "test", value: 2 });
        });

        test("简单测试：消息只发送一次", async () => {
            const worker1 = new MockWorker();
            const worker2 = new MockWorker();

            worker1.connectTo(worker2);

            const transport1 = new WorkerTransport({
                worker: worker1 as any,
            });

            const transport2 = new WorkerTransport({
                worker: worker2 as any,
            });

            // 连接 transports（会自动绑定监听器）
            await transport1.connect();
            await transport2.connect();

            const messages1: any[] = [];
            const messages2: any[] = [];

            transport1.addReceiver("test1", (msg) => {
                messages1.push(msg);
            });
            transport2.addReceiver("test2", (msg) => {
                messages2.push(msg);
            });

            // 从 transport1 发送
            transport1.send({
                type: "set",
                value: 1,
                path: ["x"],
                flags: 0,
                id: "syncer-1",
            });
            await new Promise((resolve) => setTimeout(resolve, 20));

            // 只有 transport2 收到
            expect(messages1.length).toBe(0);
            expect(messages2.length).toBe(1);
        });

        test("测试 AutoStore push 操作触发的事件数量", async () => {
            const store = new AutoStore({
                items: [1, 2, 3],
            });

            let eventCount = 0;
            store.watch(() => {
                eventCount++;
            });

            store.state.items.push(4);
            expect(eventCount).toBe(1); // push 只应该触发一次事件
        });
    });

    describe("基础功能", () => {
        test("应该创建传输器实例", () => {
            const worker = new MockWorker();
            const transport = new WorkerTransport({
                worker: worker,
            });

            expect(transport.id).toBeDefined();
            expect(transport.connected).toBe(false);
        });

        test("应该支持 connect/disconnect", async () => {
            const worker = new MockWorker();
            const transport = new WorkerTransport({
                worker: worker,
            });

            expect(transport.connected).toBe(false);

            await transport.connect();
            expect(transport.connected).toBe(true);

            transport.disconnect();
            expect(transport.connected).toBe(false);
        });
    });

    describe("消息接收", () => {
        test("应该接收通过 worker 发送的消息", () => {
            const worker = new MockWorker();
            const transport = new WorkerTransport({
                worker: worker,
            });

            const receiveCallback = vi.fn();
            transport.addReceiver("test", receiveCallback);

            // 手动绑定消息监听
            worker.addEventListener("message", (event) => {
                transport.receiveRemoteOperate(event);
            });

            const mockOperate: StateRemoteOperate = {
                id: "test-id",
                type: "set",
                path: ["user", "name"],
                value: "张三",
                flags: 0,
            };

            worker.dispatchMessage(mockOperate);

            expect(receiveCallback).toHaveBeenCalledTimes(1);
            expect(receiveCallback).toHaveBeenCalledWith(mockOperate);
        });

        test("应该支持多次注册 receiver（所有回调都会被调用）", () => {
            const worker = new MockWorker();
            const transport = new WorkerTransport({
                worker: worker,
            });

            const firstCallback = vi.fn();
            const secondCallback = vi.fn();

            transport.addReceiver("test1", firstCallback);
            transport.addReceiver("test2", secondCallback);

            // 手动绑定消息监听
            worker.addEventListener("message", (event) => {
                transport.receiveRemoteOperate(event);
            });

            const mockOperate: StateRemoteOperate = {
                id: "test-id",
                type: "set",
                path: ["count"],
                value: 42,
                flags: 0,
            };

            worker.dispatchMessage(mockOperate);

            // 所有注册的回调都应该被调用
            expect(firstCallback).toHaveBeenCalledTimes(1);
            expect(firstCallback).toHaveBeenCalledWith(mockOperate);
            expect(secondCallback).toHaveBeenCalledTimes(1);
            expect(secondCallback).toHaveBeenCalledWith(mockOperate);
        });

        test("应该处理异步消息传递", async () => {
            const worker = new MockWorker();
            const transport = new WorkerTransport({
                worker: worker,
            });

            const receiveCallback = vi.fn();
            transport.addReceiver("test", receiveCallback);

            // 手动绑定消息监听
            worker.addEventListener("message", (event) => {
                transport.receiveRemoteOperate(event);
            });

            const mockOperate: StateRemoteOperate = {
                id: "test-id",
                type: "set",
                path: ["status"],
                value: "active",
                flags: 0,
            };

            // 使用 postMessage 发送（异步）
            worker.postMessage(mockOperate);

            // 等待异步消息传递
            await new Promise((resolve) => setTimeout(resolve, 10));

            expect(receiveCallback).toHaveBeenCalledTimes(1);
            expect(receiveCallback).toHaveBeenCalledWith(mockOperate);
        });

        test("handleRemoteOperate 应该正确返回布尔值", () => {
            const worker = new MockWorker();
            const transport = new WorkerTransport({
                worker: worker,
            });

            const receiveCallback = vi.fn();
            transport.addReceiver("test", receiveCallback);

            const mockOperate: StateRemoteOperate = {
                id: "test-id",
                type: "set",
                path: ["test"],
                value: 123,
                flags: 0,
            };

            const validEvent = new MessageEvent("message", { data: mockOperate });
            const invalidEvent = new MessageEvent("message", {
                data: { type: "other" },
            });

            // 有效的 StateRemoteOperate 应该返回 true
            expect(transport.receiveRemoteOperate(validEvent)).toBe(true);
            expect(receiveCallback).toHaveBeenCalledTimes(1);

            // 无效的消息应该返回 false
            expect(transport.receiveRemoteOperate(invalidEvent)).toBe(false);
            expect(receiveCallback).toHaveBeenCalledTimes(1); // 没有增加
        });
    });

    describe("消息发送", () => {
        test("应该发送消息到 worker", async () => {
            const worker = new MockWorker();
            const transport = new WorkerTransport({
                worker: worker,
            });

            await transport.connect();

            const receiveCallback = vi.fn();
            transport.addReceiver("test", receiveCallback);

            const mockOperate: StateRemoteOperate = {
                id: "test-id",
                type: "set",
                path: ["data"],
                value: { key: "value" },
                flags: 0,
            };

            transport.send(mockOperate);

            // 等待异步消息传递
            await new Promise((resolve) => setTimeout(resolve, 10));

            expect(receiveCallback).toHaveBeenCalledTimes(1);
            expect(receiveCallback).toHaveBeenCalledWith(mockOperate);
        });

        test("当未连接时不应该发送消息", () => {
            const worker = new MockWorker();
            const transport = new WorkerTransport({
                worker: worker,
            });

            const receiveCallback = vi.fn();
            transport.addReceiver("test", receiveCallback);

            const mockOperate: StateRemoteOperate = {
                id: "test-id",
                type: "set",
                path: ["test"],
                value: 123,
                flags: 0,
            };

            // 未连接时应该抛出错误
            expect(() => {
                transport.send(mockOperate);
            }).toThrow("Transport is not connected");
        });

        test("连接后应该能正常发送消息", async () => {
            const worker = new MockWorker();
            const transport = new WorkerTransport({
                worker: worker,
            });

            const receiveCallback = vi.fn();
            transport.addReceiver("test", receiveCallback);

            // 先连接
            await transport.connect();

            const mockOperate: StateRemoteOperate = {
                id: "test-id",
                type: "set",
                path: ["test"],
                value: 123,
                flags: 0,
            };

            transport.send(mockOperate);

            // 等待异步消息传递
            await new Promise((resolve) => setTimeout(resolve, 10));

            expect(receiveCallback).toHaveBeenCalledTimes(1);
        });
    });

    describe("双向通信", () => {
        test("应该支持两个 Worker 之间的双向通信", async () => {
            const worker1 = new MockWorker();
            const worker2 = new MockWorker();

            worker1.connectTo(worker2);

            const transport1 = new WorkerTransport({
                worker: worker1 as any,
            });

            const transport2 = new WorkerTransport({
                worker: worker2 as any,
            });

            await transport1.connect();
            await transport2.connect();

            // 模拟交叉接收
            const messages1: StateRemoteOperate[] = [];
            const messages2: StateRemoteOperate[] = [];

            transport1.addReceiver("test1", (msg) => messages1.push(msg));
            transport2.addReceiver("test2", (msg) => messages2.push(msg));

            // worker1 发送消息，worker2 接收
            const message1: StateRemoteOperate = {
                id: "syncer-1",
                type: "set",
                path: ["from", "1"],
                value: "hello",
                flags: 0,
            };
            transport1.send(message1);

            // 等待消息传递
            await new Promise((resolve) => setTimeout(resolve, 10));

            expect(messages2).toHaveLength(1);
            expect(messages2[0]).toEqual(message1);
            expect(messages1).toHaveLength(0);

            // worker2 发送消息，worker1 接收
            const message2: StateRemoteOperate = {
                id: "syncer-2",
                type: "set",
                path: ["from", "2"],
                value: "world",
                flags: 0,
            };
            transport2.send(message2);

            // 等待消息传递
            await new Promise((resolve) => setTimeout(resolve, 10));

            expect(messages1).toHaveLength(1);
            expect(messages1[0]).toEqual(message2);
            expect(messages2).toHaveLength(1);
        });
    });

    describe("生命周期管理", () => {
        test("disconnect 应该清理连接", async () => {
            const worker = new MockWorker();
            const transport = new WorkerTransport({
                worker: worker,
            });

            await transport.connect();

            const receiveCallback = vi.fn();
            transport.addReceiver("test", receiveCallback);

            // 发送消息应该能收到
            const mockOperate: StateRemoteOperate = {
                id: "test-id",
                type: "set",
                path: ["test"],
                value: 123,
                flags: 0,
            };
            transport.send(mockOperate);
            await new Promise((resolve) => setTimeout(resolve, 10));

            expect(receiveCallback).toHaveBeenCalledTimes(1);

            // disconnect 后
            transport.disconnect();

            // 尝试发送消息应该抛出错误
            expect(() => {
                transport.send({ ...mockOperate, value: 456 });
            }).toThrow("Transport is not connected");

            // 等待一下，确保没有其他消息被接收
            await new Promise((resolve) => setTimeout(resolve, 10));

            // 次数仍然是 1，没有增加
            expect(receiveCallback).toHaveBeenCalledTimes(1);
        });

        test("disconnect 应该清理所有资源", async () => {
            const worker = new MockWorker();
            const transport = new WorkerTransport({
                worker: worker,
            });

            await transport.connect();

            const receiveCallback = vi.fn();
            transport.addReceiver("test", receiveCallback);

            // 连接后发送消息应该能收到
            const mockOperate: StateRemoteOperate = {
                id: "test-id",
                type: "set",
                path: ["test"],
                value: 123,
                flags: 0,
            };
            transport.send(mockOperate);

            // 等待消息传递
            await new Promise((resolve) => setTimeout(resolve, 10));
            expect(receiveCallback).toHaveBeenCalledTimes(1);

            // disconnect 后
            transport.disconnect();
            expect(transport.connected).toBe(false);

            // 尝试发送消息应该抛出错误
            expect(() => {
                transport.send({ ...mockOperate, value: 456 });
            }).toThrow("Transport is not connected");

            // 等待一下，确保没有其他消息被接收
            await new Promise((resolve) => setTimeout(resolve, 10));

            // 次数仍然是 1，没有增加
            expect(receiveCallback).toHaveBeenCalledTimes(1);
        });

        test("多次调用 disconnect 不应该报错", () => {
            const worker = new MockWorker();
            const transport = new WorkerTransport({
                worker: worker,
            });

            expect(() => {
                transport.disconnect();
                transport.disconnect();
                transport.disconnect();
            }).not.toThrow();
        });

        test("terminate 后调用 postMessage 应该抛出错误", () => {
            const worker = new MockWorker();

            // 终止 worker
            worker.terminate();

            const mockOperate: StateRemoteOperate = {
                id: "test-id",
                type: "set",
                path: ["test"],
                value: 123,
                flags: 0,
            };

            expect(() => {
                worker.postMessage(mockOperate);
            }).toThrow("Worker has been terminated");
        });
    });

    describe("复杂场景", () => {
        test("应该正确处理 $stop 操作", () => {
            const worker = new MockWorker();
            const transport = new WorkerTransport({
                worker: worker,
            });

            const receiveCallback = vi.fn();
            transport.addReceiver("test", receiveCallback);

            // 手动绑定消息监听
            worker.addEventListener("message", (event) => {
                transport.receiveRemoteOperate(event);
            });

            const stopMessage: StateRemoteOperate = {
                id: "test-id",
                type: "$stop",
                path: [],
                value: undefined,
                flags: 0,
            };

            worker.dispatchMessage(stopMessage);

            expect(receiveCallback).toHaveBeenCalledWith(stopMessage);
        });

        test("应该处理包含复杂值的操作", () => {
            const worker = new MockWorker();
            const transport = new WorkerTransport({
                worker: worker,
            });

            const receiveCallback = vi.fn();
            transport.addReceiver("test", receiveCallback);

            // 手动绑定消息监听
            worker.addEventListener("message", (event) => {
                transport.receiveRemoteOperate(event);
            });

            const complexMessage: StateRemoteOperate = {
                id: "test-id",
                type: "set",
                path: ["user", "profile"],
                value: {
                    name: "张三",
                    age: 30,
                    hobbies: ["阅读", "编程"],
                    address: {
                        city: "北京",
                        district: "朝阳区",
                    },
                },
                flags: 0,
            };

            worker.dispatchMessage(complexMessage);

            expect(receiveCallback).toHaveBeenCalledWith(complexMessage);
        });

        test("应该处理大量消息", async () => {
            const worker = new MockWorker();
            const transport = new WorkerTransport({
                worker: worker,
            });

            await transport.connect();

            const receiveCallback = vi.fn();
            transport.addReceiver("test", receiveCallback);

            const messageCount = 100;
            for (let i = 0; i < messageCount; i++) {
                const message: StateRemoteOperate = {
                    id: `test-${i}`,
                    type: "set",
                    path: ["count"],
                    value: i,
                    flags: 0,
                };
                transport.send(message);
            }

            // 等待所有异步消息传递
            await new Promise((resolve) => setTimeout(resolve, 100));

            expect(receiveCallback).toHaveBeenCalledTimes(messageCount);
        });
    });

    describe("边界情况", () => {
        test("应该正确处理空对象", () => {
            const worker = new MockWorker();
            const transport = new WorkerTransport({
                worker: worker,
            });

            const receiveCallback = vi.fn();
            transport.addReceiver("test", receiveCallback);

            // 手动绑定消息监听
            worker.addEventListener("message", (event) => {
                transport.receiveRemoteOperate(event);
            });

            const emptyMessage: StateRemoteOperate = {
                id: "test-id",
                type: "set",
                path: [],
                value: {},
                flags: 0,
            };

            worker.dispatchMessage(emptyMessage);

            expect(receiveCallback).toHaveBeenCalledWith(emptyMessage);
        });

        test("应该正确处理 null 和 undefined 值", () => {
            const worker = new MockWorker();
            const transport = new WorkerTransport({
                worker: worker,
            });

            const receiveCallback = vi.fn();
            transport.addReceiver("test", receiveCallback);

            // 手动绑定消息监听
            worker.addEventListener("message", (event) => {
                transport.receiveRemoteOperate(event);
            });

            const nullMessage: StateRemoteOperate = {
                id: "test-id",
                type: "set",
                path: ["value"],
                value: null,
                flags: 0,
            };

            worker.dispatchMessage(nullMessage);

            expect(receiveCallback).toHaveBeenCalledWith(nullMessage);
            expect(receiveCallback).toHaveBeenCalledTimes(1);
        });

        test("receiver 在连接前时发送的消息应该被忽略", () => {
            const worker = new MockWorker();
            const transport = new WorkerTransport({
                worker: worker,
            });

            // 手动绑定消息监听
            worker.addEventListener("message", (event) => {
                transport.receiveRemoteOperate(event);
            });

            worker.dispatchMessage({
                id: "test-id",
                type: "set",
                path: ["early"],
                value: "message",
                flags: 0,
            });

            const receiveCallback = vi.fn();
            transport.addReceiver("test", receiveCallback);

            expect(receiveCallback).not.toHaveBeenCalled();
        });

        test("应该处理没有 data 字段的 MessageEvent", () => {
            const worker = new MockWorker();
            const transport = new WorkerTransport({
                worker: worker,
            });

            const receiveCallback = vi.fn();
            transport.addReceiver("test", receiveCallback);

            // 手动绑定消息监听
            worker.addEventListener("message", (event) => {
                transport.receiveRemoteOperate(event);
            });

            // 发送 data 为 null 的消息（直接传递 data）
            worker.dispatchMessage(null);

            // 不是有效的 StateRemoteOperate，handleRemoteOperate 返回 false
            const event = new MessageEvent("message", { data: null });
            expect(transport.receiveRemoteOperate(event)).toBe(false);

            // 回调不应该被调用
            expect(receiveCallback).not.toHaveBeenCalled();
        });
    });
});

describe("WorkerTransport AutoStore 同步集成测试", () => {
    describe("基础同步功能", () => {
        test("应该支持主线程与 Worker 之间的双向同步", async () => {
            const worker1 = new MockWorker();
            const worker2 = new MockWorker();

            // 建立双向连接
            worker1.connectTo(worker2);

            const transport1 = new WorkerTransport({
                worker: worker1 as any,
            });

            const transport2 = new WorkerTransport({
                worker: worker2 as any,
            });

            const store1 = new AutoStore({
                order: {
                    name: "fisher",
                    price: 2,
                    count: 3,
                    total: computed((order) => order.price * order.count),
                },
            });

            const store2 = new AutoStore<typeof store1.state>();

            // 手动绑定消息监听
            worker1.addEventListener("message", (event) => {
                transport1.receiveRemoteOperate(event);
            });
            worker2.addEventListener("message", (event) => {
                transport2.receiveRemoteOperate(event);
            });

            // 创建同步器但不立即同步
            const syncer1 = new AutoStoreSyncer(store1, {
                transport: transport1,
                immediate: false,
            });
            const syncer2 = new AutoStoreSyncer(store2, {
                transport: transport2,
                immediate: false,
            });

            // 手动触发初始同步（模拟双向消息传递）
            syncer1.push();
            // 将 store1 的消息传递给 store2
            await new Promise((resolve) => setTimeout(resolve, 10));

            syncer2.push();
            await new Promise((resolve) => setTimeout(resolve, 10));

            // 验证初始同步
            expect(store2.state).toEqual(store1.state);

            // store1 修改，应该同步到 store2
            store1.state.order.count = 5;
            await new Promise((resolve) => setTimeout(resolve, 10));
            expect(store2.state.order.count).toBe(5);
            expect(store2.state.order.total).toBe(10);

            // store2 修改，应该同步到 store1
            store2.state.order.price = 3;
            await new Promise((resolve) => setTimeout(resolve, 10));
            expect(store1.state.order.price).toBe(3);
            expect(store1.state.order.total).toBe(15);
        });

        test("应该支持数组的同步", async () => {
            const worker1 = new MockWorker();
            const worker2 = new MockWorker();

            // 建立双向连接
            worker1.connectTo(worker2);

            const transport1 = new WorkerTransport({
                worker: worker1 as any,
            });

            const transport2 = new WorkerTransport({
                worker: worker2 as any,
            });

            const store1 = new AutoStore(
                {
                    items: [1, 2, 3, 4, 5],
                },
                { id: "store-1" },
            );

            const store2 = new AutoStore(
                {
                    items: [1, 2, 3, 4, 5],
                },
                { id: "store-2" },
            );

            const syncer1 = new AutoStoreSyncer(store1, {
                transport: transport1,
                immediate: true, // 改为 true，让 syncer 自动调用 transport.connect()
            });
            const syncer2 = new AutoStoreSyncer(store2, {
                transport: transport2,
                immediate: true,
            });

            // 初始同步
            syncer1.push();
            await new Promise((resolve) => setTimeout(resolve, 20));

            // 初始值相同
            expect(store2.state.items).toEqual([1, 2, 3, 4, 5]);

            // store1 添加元素
            store1.state.items.push(6);
            await new Promise((resolve) => setTimeout(resolve, 20));
            expect(store2.state.items).toEqual([1, 2, 3, 4, 5, 6]);

            // store2 删除元素
            store2.state.items.splice(1, 2);
            await new Promise((resolve) => setTimeout(resolve, 50));
            expect(store1.state.items).toEqual([1, 4, 5, 6]);

            // store1 修改元素值
            store1.state.items[0] = 10;
            await new Promise((resolve) => setTimeout(resolve, 20));
            expect(store2.state.items[0]).toBe(10);
        });

        test("应该支持嵌套对象的同步", async () => {
            const worker1 = new MockWorker();
            const worker2 = new MockWorker();

            // 建立双向连接
            worker1.connectTo(worker2);

            const transport1 = new WorkerTransport({
                worker: worker1 as any,
            });

            const transport2 = new WorkerTransport({
                worker: worker2 as any,
            });

            const store1 = new AutoStore({
                user: {
                    profile: {
                        name: "张三",
                        age: 30,
                    },
                    address: {
                        city: "北京",
                        district: "朝阳区",
                    },
                },
            });

            const store2 = new AutoStore<typeof store1.state>();

            // 手动绑定消息监听
            worker1.addEventListener("message", (event) => {
                transport1.receiveRemoteOperate(event);
            });
            worker2.addEventListener("message", (event) => {
                transport2.receiveRemoteOperate(event);
            });

            const syncer1 = new AutoStoreSyncer(store1, {
                transport: transport1,
                immediate: false,
            });
            const syncer2 = new AutoStoreSyncer(store2, {
                transport: transport2,
                immediate: false,
            });

            syncer1.push();
            await new Promise((resolve) => setTimeout(resolve, 10));

            expect(store2.state).toEqual(store1.state);

            // 测试深层嵌套属性的同步
            store1.state.user.profile.name = "李四";
            await new Promise((resolve) => setTimeout(resolve, 10));
            expect(store2.state.user.profile.name).toBe("李四");

            store2.state.user.address.city = "上海";
            await new Promise((resolve) => setTimeout(resolve, 10));
            expect(store1.state.user.address.city).toBe("上海");
        });
    });

    describe("生命周期管理", () => {
        test("停止同步后应该不再接收更新", async () => {
            const worker1 = new MockWorker();
            const worker2 = new MockWorker();

            // 建立双向连接
            worker1.connectTo(worker2);

            const transport1 = new WorkerTransport({
                worker: worker1 as any,
            });

            const transport2 = new WorkerTransport({
                worker: worker2 as any,
            });

            const store1 = new AutoStore({
                count: 0,
            });

            const store2 = new AutoStore<typeof store1.state>();

            // 手动绑定消息监听
            worker1.addEventListener("message", (event) => {
                transport1.receiveRemoteOperate(event);
            });
            worker2.addEventListener("message", (event) => {
                transport2.receiveRemoteOperate(event);
            });

            const syncer1 = new AutoStoreSyncer(store1, {
                transport: transport1,
                immediate: false,
            });
            const syncer2 = new AutoStoreSyncer(store2, {
                transport: transport2,
                immediate: false,
            });

            syncer1.push();
            await new Promise((resolve) => setTimeout(resolve, 10));

            expect(store2.state.count).toBe(0);

            // 正常同步
            store1.state.count = 10;
            await new Promise((resolve) => setTimeout(resolve, 10));
            expect(store2.state.count).toBe(10);

            // 停止同步
            syncer1.stop();
            syncer2.stop();

            // 停止后修改不应该同步
            store1.state.count = 20;
            await new Promise((resolve) => setTimeout(resolve, 10));
            expect(store2.state.count).toBe(10);
        });

        test("销毁 transport 后应该清理资源", () => {
            const worker1 = new MockWorker();
            const worker2 = new MockWorker();

            // 建立双向连接
            worker1.connectTo(worker2);

            const transport1 = new WorkerTransport({
                worker: worker1 as any,
            });

            const transport2 = new WorkerTransport({
                worker: worker2 as any,
            });

            const store1 = new AutoStore({
                value: "test",
            });

            const store2 = new AutoStore<typeof store1.state>();

            // 手动绑定消息监听
            worker1.addEventListener("message", (event) => {
                transport1.receiveRemoteOperate(event);
            });
            worker2.addEventListener("message", (event) => {
                transport2.receiveRemoteOperate(event);
            });

            new AutoStoreSyncer(store1, {
                transport: transport1,
                immediate: false,
            });
            new AutoStoreSyncer(store2, {
                transport: transport2,
                immediate: false,
            });

            // 销毁 transport
            transport1.disconnect();
            transport2.disconnect();

            expect(transport1.connected).toBe(false);
            expect(transport2.connected).toBe(false);
        });
    });

    describe("计算属性同步", () => {
        test("应该支持计算属性的同步", async () => {
            const worker1 = new MockWorker();
            const worker2 = new MockWorker();

            // 建立双向连接
            worker1.connectTo(worker2);

            const transport1 = new WorkerTransport({
                worker: worker1 as any,
            });

            const transport2 = new WorkerTransport({
                worker: worker2 as any,
            });

            const store1 = new AutoStore({
                order: {
                    name: "fisher",
                    price: 2,
                    count: 3,
                    total: computed((order) => order.price * order.count),
                },
            });

            const store2 = new AutoStore({
                order: {
                    name: "fisher",
                    price: 2,
                    count: 3,
                    total: computed((order) => order.price * order.count),
                },
            });

            // 手动绑定消息监听
            worker1.addEventListener("message", (event) => {
                transport1.receiveRemoteOperate(event);
            });
            worker2.addEventListener("message", (event) => {
                transport2.receiveRemoteOperate(event);
            });

            const syncer1 = new AutoStoreSyncer(store1, {
                transport: transport1,
                immediate: false,
            });
            const syncer2 = new AutoStoreSyncer(store2, {
                transport: transport2,
                immediate: false,
            });

            // 初始同步
            syncer1.push();
            await new Promise((resolve) => setTimeout(resolve, 10));

            // 初始状态
            expect(store1.state.order.total).toBe(6);
            expect(store2.state.order.total).toBe(6);

            // store1 修改 count
            store1.state.order.count = 5;
            await new Promise((resolve) => setTimeout(resolve, 10));
            expect(store1.state.order.total).toBe(10);
            expect(store2.state.order.total).toBe(10);

            // store2 修改 price
            store2.state.order.price = 3;
            await new Promise((resolve) => setTimeout(resolve, 10));
            expect(store2.state.order.total).toBe(15);
            expect(store1.state.order.total).toBe(15);
        });
    });

    describe("边界情况", () => {
        test("应该正确处理空对象的同步", async () => {
            const worker1 = new MockWorker();
            const worker2 = new MockWorker();

            // 建立双向连接
            worker1.connectTo(worker2);

            const transport1 = new WorkerTransport({
                worker: worker1 as any,
            });

            const transport2 = new WorkerTransport({
                worker: worker2 as any,
            });

            const store1 = new AutoStore<Record<string, any>>({});
            const store2 = new AutoStore<Record<string, any>>({});

            // 手动绑定消息监听
            worker1.addEventListener("message", (event) => {
                transport1.receiveRemoteOperate(event);
            });
            worker2.addEventListener("message", (event) => {
                transport2.receiveRemoteOperate(event);
            });

            const syncer1 = new AutoStoreSyncer(store1, {
                transport: transport1,
                immediate: false,
            });
            const syncer2 = new AutoStoreSyncer(store2, {
                transport: transport2,
                immediate: false,
            });

            syncer1.push();
            syncer2.push();
            await new Promise((resolve) => setTimeout(resolve, 10));

            // 添加新属性
            store1.state.newProp = "value";
            await new Promise((resolve) => setTimeout(resolve, 10));
            expect(store2.state.newProp).toBe("value");
        });

        test("应该正确处理 null 和 undefined 值", async () => {
            const worker1 = new MockWorker();
            const worker2 = new MockWorker();

            // 建立双向连接
            worker1.connectTo(worker2);

            const transport1 = new WorkerTransport({
                worker: worker1 as any,
            });

            const transport2 = new WorkerTransport({
                worker: worker2 as any,
            });

            const store1 = new AutoStore({
                value: "initial" as string | null,
                nullValue: null as null | undefined,
            });

            const store2 = new AutoStore<typeof store1.state>();

            // 手动绑定消息监听
            worker1.addEventListener("message", (event) => {
                transport1.receiveRemoteOperate(event);
            });
            worker2.addEventListener("message", (event) => {
                transport2.receiveRemoteOperate(event);
            });

            const syncer1 = new AutoStoreSyncer(store1, {
                transport: transport1,
                immediate: false,
            });
            const syncer2 = new AutoStoreSyncer(store2, {
                transport: transport2,
                immediate: false,
            });

            syncer1.push();
            await new Promise((resolve) => setTimeout(resolve, 10));

            // 设置为 null
            store1.state.value = null;
            await new Promise((resolve) => setTimeout(resolve, 10));
            expect(store2.state.value).toBeNull();

            // 设置为 undefined
            store1.state.nullValue = undefined;
            await new Promise((resolve) => setTimeout(resolve, 10));
            expect(store2.state.nullValue).toBeUndefined();
        });
    });
});
