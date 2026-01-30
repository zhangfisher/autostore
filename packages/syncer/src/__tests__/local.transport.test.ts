// oxlint-disable no-unused-vars
import { describe, expect, test, vi } from "vitest";
import { computed, AutoStore } from "../../../core/src";
import { AutoStoreSyncer } from "../syncers/syncer";
import { LocalTransport } from "../transports/local";

// 等待下一个异步循环的辅助函数
const delay = (n: number = 0) => new Promise((resolve) => setTimeout(resolve, n));

describe("LocalTransport 单元测试", () => {
    describe("基础功能", () => {
        test("应该创建传输器实例", () => {
            let transport1: LocalTransport;
            let transport2: LocalTransport;

            transport1 = new LocalTransport(() => transport2);

            transport2 = new LocalTransport(() => transport1);

            expect(transport1.id).toBeDefined();
            expect(transport2.id).toBeDefined();
            expect(transport1.connected).toBe(false);
            expect(transport2.connected).toBe(false);
        });

        test("应该使用自定义 id", () => {
            let transport1: LocalTransport;
            let transport2: LocalTransport;

            transport1 = new LocalTransport(() => transport2);

            transport2 = new LocalTransport(() => transport1);

            expect(transport1.id).toBeDefined();
            expect(transport2.id).toBeDefined();
            expect(transport1.id).not.toBe(transport2.id);
        });

        test("未连接时 connected 应该返回 false", () => {
            let transport1: LocalTransport;
            let transport2: LocalTransport;

            transport1 = new LocalTransport(() => transport2);

            transport2 = new LocalTransport(() => transport1);

            expect(transport1.connected).toBe(false);
            expect(transport2.connected).toBe(false);
        });
    });

    describe("连接管理", () => {
        test("connect 应该建立连接并触发 connect 事件", async () => {
            let transport1: LocalTransport;
            let transport2: LocalTransport;

            transport1 = new LocalTransport(() => transport2);

            transport2 = new LocalTransport(() => transport1);

            const connectSpy1 = vi.fn();
            const connectSpy2 = vi.fn();

            transport1.on("connect", connectSpy1);
            transport2.on("connect", connectSpy2);

            await transport1.connect();
            await transport2.connect();

            expect(transport1.connected).toBe(true);
            expect(transport2.connected).toBe(true);
            expect(connectSpy1).toHaveBeenCalledTimes(1);
            expect(connectSpy2).toHaveBeenCalledTimes(1);
        });

        test("disconnect 应该断开连接并触发 disconnect 事件", async () => {
            let transport1: LocalTransport;
            let transport2: LocalTransport;

            transport1 = new LocalTransport(() => transport2);

            transport2 = new LocalTransport(() => transport1);

            await transport1.connect();
            await transport2.connect();

            const disconnectSpy1 = vi.fn();
            const disconnectSpy2 = vi.fn();

            transport1.on("disconnect", disconnectSpy1);
            transport2.on("disconnect", disconnectSpy2);

            transport1.disconnect();

            expect(transport1.connected).toBe(false);
            expect(transport2.connected).toBe(true); // transport2 仍然连接
            expect(disconnectSpy1).toHaveBeenCalledTimes(1);
            expect(disconnectSpy2).not.toHaveBeenCalled();
        });

        test("重复调用 connect 不应该报错", async () => {
            let transport1: LocalTransport;
            let transport2: LocalTransport;

            transport1 = new LocalTransport(() => transport2);

            transport2 = new LocalTransport(() => transport1);

            await transport1.connect();
            await transport2.connect();

            expect(async () => {
                await transport1.disconnect();
                await transport1.connect();
                await transport1.connect();
            }).not.toThrow();
        });

        test("重复调用 disconnect 不应该报错", async () => {
            let transport1: LocalTransport;
            let transport2: LocalTransport;

            transport1 = new LocalTransport(() => transport2);

            transport2 = new LocalTransport(() => transport1);

            await transport1.connect();
            await transport2.connect();

            expect(() => {
                transport1.disconnect();
                transport1.disconnect();
                transport1.disconnect();
            }).not.toThrow();
        });
    });

    describe("消息收发", () => {
        test("应该能够发送和接收消息", async () => {
            let transport1: LocalTransport;
            let transport2: LocalTransport;

            transport1 = new LocalTransport(() => transport2);

            transport2 = new LocalTransport(() => transport1);

            await transport1.connect();
            await transport2.connect();

            const receiveCallback = vi.fn();
            // receiver id 需要与 operate.id 匹配
            transport2.addReceiver(transport1.id, receiveCallback);

            const mockOperate = {
                id: String(transport1.id),
                type: "set" as const,
                path: ["user", "name"],
                value: "张三",
                flags: 0,
            };

            transport1.send(mockOperate);

            expect(receiveCallback).toHaveBeenCalledTimes(1);
            expect(receiveCallback).toHaveBeenCalledWith(mockOperate);
        });

        test("未连接时发送消息应该触发错误", () => {
            let transport1: LocalTransport;
            let transport2: LocalTransport;

            transport1 = new LocalTransport(() => transport2);

            transport2 = new LocalTransport(() => transport1);

            const receiveCallback = vi.fn();
            transport2.addReceiver(transport1.id, receiveCallback);

            const mockOperate = {
                id: String(transport1.id),
                type: "set" as const,
                path: ["count"],
                value: 42,
                flags: 0,
            };

            // 未连接时发送应该抛出错误
            expect(() => {
                transport1.send(mockOperate);
            }).toThrow();

            expect(receiveCallback).not.toHaveBeenCalled();
        });

        test("应该支持双向通信", async () => {
            let transport1: LocalTransport;
            let transport2: LocalTransport;

            transport1 = new LocalTransport(() => transport2);

            transport2 = new LocalTransport(() => transport1);

            await transport1.connect();
            await transport2.connect();

            const messages1: any[] = [];
            const messages2: any[] = [];

            // receiver id 需要与 operate.id 匹配
            transport1.addReceiver(transport2.id, (msg) => messages1.push(msg));
            transport2.addReceiver(transport1.id, (msg) => messages2.push(msg));

            const message1 = {
                id: String(transport1.id),
                type: "set" as const,
                path: ["from", "1"],
                value: "hello",
                flags: 0,
            };

            transport1.send(message1);

            expect(messages2).toHaveLength(1);
            expect(messages2[0]).toEqual(message1);
            expect(messages1).toHaveLength(0);

            const message2 = {
                id: String(transport2.id),
                type: "set" as const,
                path: ["from", "2"],
                value: "world",
                flags: 0,
            };

            transport2.send(message2);

            expect(messages1).toHaveLength(1);
            expect(messages1[0]).toEqual(message2);
            expect(messages2).toHaveLength(1);
        });

        test("应该支持多个 receiver", async () => {
            let transport1: LocalTransport;
            let transport2: LocalTransport;

            transport1 = new LocalTransport(() => transport2);

            transport2 = new LocalTransport(() => transport1);

            await transport1.connect();
            await transport2.connect();

            const receiver1 = vi.fn();
            const receiver2 = vi.fn();
            const receiver3 = vi.fn();

            transport2.addReceiver("receiver-1", receiver1);
            transport2.addReceiver("receiver-2", receiver2);
            transport2.addReceiver("receiver-3", receiver3);

            const mockOperate = {
                id: "test-id",
                type: "set" as const,
                path: ["data"],
                value: "test",
                flags: 0,
            };

            // 发送操作，所有注册的 receivers 都会被调用
            transport1.send({ ...mockOperate, id: "receiver-2" });

            expect(receiver1).toHaveBeenCalledTimes(1);
            expect(receiver2).toHaveBeenCalledTimes(1);
            expect(receiver3).toHaveBeenCalledTimes(1);

            // 移除 receiver
            transport2.removeReceiver("receiver-2");

            transport1.send({ ...mockOperate, id: "receiver-2" });

            expect(receiver1).toHaveBeenCalledTimes(2); // 再次调用
            expect(receiver2).toHaveBeenCalledTimes(1); // 没有再次调用
            expect(receiver3).toHaveBeenCalledTimes(2); // 再次调用
        });
    });

    describe("事件系统", () => {
        test("应该支持 connect 事件", async () => {
            let transport1: LocalTransport;
            let transport2: LocalTransport;

            transport1 = new LocalTransport(() => transport2);

            transport2 = new LocalTransport(() => transport1);

            const connectSpy = vi.fn();
            transport1.on("connect", connectSpy);

            await transport1.connect();

            expect(connectSpy).toHaveBeenCalledTimes(1);
        });

        test("应该支持 disconnect 事件", async () => {
            let transport1: LocalTransport;
            let transport2: LocalTransport;

            transport1 = new LocalTransport(() => transport2);

            transport2 = new LocalTransport(() => transport1);

            await transport1.connect();

            const disconnectSpy = vi.fn();
            transport1.on("disconnect", disconnectSpy);

            transport1.disconnect();

            expect(disconnectSpy).toHaveBeenCalledTimes(1);
        });

        test("应该支持 operate 事件（debug 模式）", async () => {
            let transport1: LocalTransport;
            let transport2: LocalTransport;

            transport1 = new LocalTransport(() => transport2, { debug: true });

            transport2 = new LocalTransport(() => transport1);

            await transport1.connect();
            await transport2.connect();

            const operateSpy = vi.fn();
            transport1.on("operate", operateSpy);

            const mockOperate = {
                id: String(transport1.id),
                type: "set" as const,
                path: ["test"],
                value: "data",
                flags: 0,
            };

            transport1.send(mockOperate);

            expect(operateSpy).toHaveBeenCalledTimes(1);
            expect(operateSpy).toHaveBeenCalledWith(mockOperate);
        });

        test("应该能够移除事件监听器", async () => {
            let transport1: LocalTransport;
            let transport2: LocalTransport;

            transport1 = new LocalTransport(() => transport2);

            transport2 = new LocalTransport(() => transport1);

            const connectSpy = vi.fn();
            const { off } = transport1.on("connect", connectSpy);

            await transport1.connect();
            expect(connectSpy).toHaveBeenCalledTimes(1);

            off();

            transport1.disconnect();
            await transport1.connect();
            expect(connectSpy).toHaveBeenCalledTimes(1); // 没有再次调用
        });
    });
});

describe("LocalTransport AutoStore 集成测试", () => {
    describe("基础同步功能", () => {
        test("应该支持双向同步", async () => {
            let transport1: LocalTransport;
            let transport2: LocalTransport;

            transport1 = new LocalTransport(() => transport2);

            transport2 = new LocalTransport(() => transport1);

            await transport1.connect();
            await transport2.connect();

            const store1 = new AutoStore({
                order: {
                    name: "fisher",
                    price: 2,
                    count: 3,
                    total: computed((order) => order.price * order.count),
                },
            });

            const store2 = new AutoStore<typeof store1.state>();

            // 使用 AutoStoreSyncer 创建同步
            const syncer1 = new AutoStoreSyncer(store1, {
                transport: transport1,
                immediate: false,
            });
            const syncer2 = new AutoStoreSyncer(store2, {
                transport: transport2,
                immediate: false,
            });

            // 等待同步建立
            await delay();

            // 手动触发初始同步
            syncer1.push({ initial: true });
            syncer2.push({ initial: true });

            // 验证初始状态
            expect(store2.state).toEqual(store1.state);

            // store1 修改 count
            store1.state.order.count = 5;
            expect(store2.state.order.count).toBe(5);
            expect(store2.state.order.total).toBe(10);

            // store2 修改 price
            store2.state.order.price = 3;
            expect(store1.state.order.price).toBe(3);
            expect(store1.state.order.total).toBe(15);
        });

        test("应该支持数组的双向同步", async () => {
            let transport1: LocalTransport;
            let transport2: LocalTransport;

            transport1 = new LocalTransport(() => transport2);

            transport2 = new LocalTransport(() => transport1);

            await transport1.connect();
            await transport2.connect();

            const store1 = new AutoStore(
                {
                    items: [1, 2, 3, 4, 5],
                },
                { id: "store1" },
            );

            // @ts-ignore
            const store2 = new AutoStore<typeof store1.state>({}, { id: "store2" });
            // @ts-ignore
            globalThis.store1 = store1;
            // @ts-ignore
            globalThis.store2 = store2;

            const syncer1 = new AutoStoreSyncer(store1, {
                transport: transport1,
                immediate: false,
            });
            const syncer2 = new AutoStoreSyncer(store2, {
                transport: transport2,
                immediate: false,
            });

            // 等待同步建立
            await delay();

            // 手动触发初始同步
            syncer1.push({ initial: true });
            await delay(); // 等待初始同步完成

            // 初始值应该相同
            expect(store2.state.items).toEqual([1, 2, 3, 4, 5]);
            // store1 添加元素
            store1.state.items.push(6);
            await delay(); // 等待同步完成
            expect(store2.state.items).toEqual([1, 2, 3, 4, 5, 6]);

            // store2 删除元素
            store2.state.items.splice(1, 2);
            await delay(); // 等待同步完成
            expect(store1.state.items).toEqual([1, 4, 5, 6]);

            // store1 修改元素值
            store1.state.items[0] = 10;
            await delay(); // 等待同步完成
            expect(store2.state.items[0]).toBe(10);
        });

        test("应该支持嵌套对象的同步", async () => {
            let transport1: LocalTransport;
            let transport2: LocalTransport;

            transport1 = new LocalTransport(() => transport2);

            transport2 = new LocalTransport(() => transport1);

            await transport1.connect();
            await transport2.connect();

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

            const syncer1 = new AutoStoreSyncer(store1, {
                transport: transport1,
                immediate: false,
            });
            const syncer2 = new AutoStoreSyncer(store2, {
                transport: transport2,
                immediate: false,
            });

            // 等待同步建立
            await delay();

            syncer1.push({ initial: true });
            syncer2.push({ initial: true });

            expect(store2.state).toEqual(store1.state);

            store1.state.user.profile.name = "李四";
            expect(store2.state.user.profile.name).toBe("李四");

            store2.state.user.address.city = "上海";
            expect(store1.state.user.address.city).toBe("上海");
        });

        test("应该支持计算属性的同步", async () => {
            let transport1: LocalTransport;
            let transport2: LocalTransport;

            transport1 = new LocalTransport(() => transport2);

            transport2 = new LocalTransport(() => transport1);

            await transport1.connect();
            await transport2.connect();

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

            const syncer1 = new AutoStoreSyncer(store1, {
                transport: transport1,
                immediate: false,
            });
            const syncer2 = new AutoStoreSyncer(store2, {
                transport: transport2,
                immediate: false,
            });

            // 等待同步建立
            await delay();

            // 初始状态，两个 store 的 total 应该都是 6
            expect(store1.state.order.total).toBe(6);
            expect(store2.state.order.total).toBe(6);

            // store1 修改 count
            store1.state.order.count = 5;
            expect(store1.state.order.total).toBe(10);
            expect(store2.state.order.total).toBe(10);

            // store2 修改 price
            store2.state.order.price = 3;
            expect(store2.state.order.total).toBe(15);
            expect(store1.state.order.total).toBe(15);
        });

        test("停止同步后应该不再接收更新", async () => {
            let transport1: LocalTransport;
            let transport2: LocalTransport;

            transport1 = new LocalTransport(() => transport2);

            transport2 = new LocalTransport(() => transport1);

            await transport1.connect();
            await transport2.connect();

            const store1 = new AutoStore({
                count: 0,
            });

            const store2 = new AutoStore<typeof store1.state>();

            const syncer1 = new AutoStoreSyncer(store1, {
                transport: transport1,
                immediate: false,
            });
            const syncer2 = new AutoStoreSyncer(store2, {
                transport: transport2,
                immediate: false,
            });

            // 等待同步建立
            await delay();

            syncer1.push({ initial: true });

            expect(store2.state.count).toBe(0);

            store1.state.count = 10;
            expect(store2.state.count).toBe(10);

            syncer1.stop();
            syncer2.stop();

            store1.state.count = 20;
            expect(store2.state.count).toBe(10); // 应该保持原值
        });

        test("断开 transport 连接后应该停止同步", async () => {
            let transport1: LocalTransport;
            let transport2: LocalTransport;

            transport1 = new LocalTransport(() => transport2);

            transport2 = new LocalTransport(() => transport1);

            await transport1.connect();
            await transport2.connect();

            const store1 = new AutoStore({
                value: "test",
            });

            const store2 = new AutoStore<typeof store1.state>();

            const syncer1 = new AutoStoreSyncer(store1, {
                transport: transport1,
                immediate: false,
            });
            const syncer2 = new AutoStoreSyncer(store2, {
                transport: transport2,
                immediate: false,
            });

            // 等待同步建立
            await delay();

            syncer1.push();
            syncer2.push();

            expect(store1.state.value).toBe("test");
            expect(store2.state.value).toBe("test");

            // 断开连接
            transport1.disconnect();

            store1.state.value = "updated";
            expect(store2.state.value).toBe("test"); // 应该保持原值
        });
    });

    describe("完整同步场景测试", () => {
        test("一对一完整对象同步", async () => {
            let transport1: LocalTransport;
            let transport2: LocalTransport;

            transport1 = new LocalTransport(() => transport2);

            transport2 = new LocalTransport(() => transport1);

            await transport1.connect();
            await transport2.connect();

            const store1 = new AutoStore({
                order: {
                    price: 100,
                    count: 2,
                    total: computed((order) => order.price * order.count),
                },
            });

            const store2 = new AutoStore({
                order: {
                    price: 100,
                    count: 2,
                    total: computed((order) => order.price * order.count),
                },
            });

            new AutoStoreSyncer(store1, { transport: transport1 });
            new AutoStoreSyncer(store2, { transport: transport2 });

            // 等待同步建立
            await delay();

            store1.state.order.count = 3;
            expect(store2.state).toEqual(store1.state);
        });

        test("初始化时执行一次完整对象同步", async () => {
            let transport1: LocalTransport;
            let transport2: LocalTransport;

            transport1 = new LocalTransport(() => transport2);

            transport2 = new LocalTransport(() => transport1);

            await transport1.connect();
            await transport2.connect();

            const store1 = new AutoStore(
                {
                    order: {
                        price: 100,
                        count: 2,
                        total: computed((order) => order.price * order.count),
                    },
                },
                { id: "store1" },
            );

            const store2 = new AutoStore({}, { id: "store2" });

            // 先创建并启动 syncer，等待同步建立
            new AutoStoreSyncer(store2, { transport: transport2 });
            await delay();

            // 再创建 syncer1 并使用 immediate 选项
            new AutoStoreSyncer(store1, { transport: transport1, immediate: true });

            // 等待 immediate 触发的 push 传播
            await delay();

            expect(store2.state).toEqual(store1.state);
        });

        test("同步对象成员到远程对象", async () => {
            let transport1: LocalTransport;
            let transport2: LocalTransport;

            transport1 = new LocalTransport(() => transport2);

            transport2 = new LocalTransport(() => transport1);

            await transport1.connect();
            await transport2.connect();

            const store1 = new AutoStore({
                order: {
                    price: 100,
                    count: 2,
                    total: computed((order) => order.price * order.count),
                },
            });

            const store2 = new AutoStore();

            new AutoStoreSyncer(store1, {
                transport: transport1,
                local: ["order"],
            });

            new AutoStoreSyncer(store2, { transport: transport2 });

            // 等待同步建立
            await delay();

            store1.state.order.count = 3;
            expect(store2.state.count).toBe(3);

            store2.state.count = 4;
            expect(store1.state.order.count).toBe(4);
        });

        test("同步对象成员到远程对象的指定路径", async () => {
            let transport1: LocalTransport;
            let transport2: LocalTransport;

            transport1 = new LocalTransport(() => transport2);

            transport2 = new LocalTransport(() => transport1);

            await transport1.connect();
            await transport2.connect();

            const store1 = new AutoStore({
                order: {
                    price: 100,
                    count: 2,
                    total: computed((order) => order.price * order.count),
                },
            });

            const store2 = new AutoStore({
                remoteOrder: {
                    count: 0,
                },
            });

            new AutoStoreSyncer(store1, {
                transport: transport1,
                local: ["order"],
                remote: ["remoteOrder"],
            });

            new AutoStoreSyncer(store2, { transport: transport2 });

            // 等待同步建立
            await delay();

            store1.state.order.count = 3;
            expect(store2.state.remoteOrder.count).toBe(3);

            store2.state.remoteOrder.count = 4;
            expect(store1.state.order.count).toBe(4);
        });

        test("停止同步时通知对方断开连接", async () => {
            let transport1: LocalTransport;
            let transport2: LocalTransport;

            transport1 = new LocalTransport(() => transport2);

            transport2 = new LocalTransport(() => transport1);

            await transport1.connect();
            await transport2.connect();

            const store1 = new AutoStore({
                order: {
                    price: 100,
                    count: 2,
                    total: computed((order) => order.price * order.count),
                },
            });

            const store2 = new AutoStore({
                order: {
                    price: 100,
                    count: 2,
                    total: computed((order) => order.price * order.count),
                },
            });

            const syncer1 = new AutoStoreSyncer(store1, { transport: transport1 });
            const syncer2 = new AutoStoreSyncer(store2, { transport: transport2 });

            // 等待同步建立
            await delay();

            store1.state.order.count = 3;
            expect(store2.state).toEqual(store1.state);

            syncer1.stop();
            // 只是停止同步并没有关闭连接
            expect(transport1.connected).toBe(true);
            expect(transport2.connected).toBe(true);

            store1.state.order.count = 4;
            expect(store2.state).not.toEqual(store1.state);
        });

        test("向对方请求一次全同步", async () => {
            let transport1: LocalTransport;
            let transport2: LocalTransport;

            transport1 = new LocalTransport(() => transport2);

            transport2 = new LocalTransport(() => transport1);

            await transport1.connect();
            await transport2.connect();

            const store1 = new AutoStore({
                order: {
                    price: 100,
                    count: 2,
                    total: computed((order) => order.price * order.count),
                },
            });

            const store2 = new AutoStore({});

            const syncer1 = new AutoStoreSyncer(store1, { transport: transport1 });
            const syncer2 = new AutoStoreSyncer(store2, { transport: transport2 });

            // 等待同步建立
            await delay();

            expect(store2.state).toEqual({});

            syncer2.pull();

            expect(store2.state).toEqual(store1.state);
        });

        test("部分路径同步时请求完整同步", async () => {
            let transport1: LocalTransport;
            let transport2: LocalTransport;

            transport1 = new LocalTransport(() => transport2);

            transport2 = new LocalTransport(() => transport1);

            await transport1.connect();
            await transport2.connect();

            const store1 = new AutoStore({
                order: {
                    price: 100,
                    count: 2,
                    total: computed((order) => order.price * order.count),
                },
            });

            const store2 = new AutoStore({
                x: {},
            });

            const syncer1 = new AutoStoreSyncer(store1, { transport: transport1 });
            const syncer2 = new AutoStoreSyncer(store2, {
                transport: transport2,
                local: ["x"],
            });

            // 等待同步建立
            await delay();

            expect(store2.state.x).toEqual({});

            syncer2.pull();

            expect(store2.state.x).toEqual(store1.state);
        });

        test("部分路径同步时成员间数据同步", async () => {
            let transport1: LocalTransport;
            let transport2: LocalTransport;

            transport1 = new LocalTransport(() => transport2);

            transport2 = new LocalTransport(() => transport1);

            await transport1.connect();
            await transport2.connect();

            const store1 = new AutoStore({
                order: {
                    price: 100,
                    count: 2,
                    total: computed((order) => order.price * order.count),
                },
            });

            const store2 = new AutoStore({
                x: {},
            });

            const syncer1 = new AutoStoreSyncer(store1, { transport: transport1 });
            const syncer2 = new AutoStoreSyncer(store2, {
                transport: transport2,
                local: ["x"],
            });

            // 等待同步建立
            await delay();

            expect(store2.state.x).toEqual({});

            syncer2.pull();

            expect(store2.state.x).toEqual(store1.state);

            store1.state.order.count = 3;
            // @ts-expect-error
            expect(store2.state.x.order.count).toBe(3);
        });

        test("部分路径同步到本地时请求完整同步", async () => {
            let transport1: LocalTransport;
            let transport2: LocalTransport;

            transport1 = new LocalTransport(() => transport2);

            transport2 = new LocalTransport(() => transport1);

            await transport1.connect();
            await transport2.connect();

            const store1 = new AutoStore({
                x: {
                    order: {
                        price: 100,
                        count: 2,
                        total: computed((order) => order.price * order.count),
                    },
                },
            });

            const store2 = new AutoStore({
                y: {},
            });

            const syncer1 = new AutoStoreSyncer(store1, { transport: transport1 });
            const syncer2 = new AutoStoreSyncer(store2, {
                transport: transport2,
                local: ["y"],
                remote: ["x"],
            });

            // 等待同步建立
            await delay();

            expect(store2.state.y).toEqual({});

            syncer2.pull();

            expect(store2.state.y).toEqual(store1.state.x);
        });

        test("三个Store之间的数据联动同步", async () => {
            // Store 1 <--> Store 2
            let transport12a: LocalTransport;
            let transport12b: LocalTransport;

            transport12a = new LocalTransport(() => transport12b);

            transport12b = new LocalTransport(() => transport12a);

            // Store 2 <--> Store 3
            let transport23a: LocalTransport;
            let transport23b: LocalTransport;

            transport23a = new LocalTransport(() => transport23b);

            transport23b = new LocalTransport(() => transport23a);

            // 连接所有 transport
            await transport12a.connect();
            await transport12b.connect();
            await transport23a.connect();
            await transport23b.connect();

            const store1 = new AutoStore(
                {
                    order: {
                        price: 100,
                        count: 2,
                        total: computed((order) => order.price * order.count),
                    },
                },
                { id: "store1" },
            );

            const store2 = new AutoStore(
                {
                    twoOrder: {
                        count: 0,
                    },
                },
                { id: "store2" },
            );

            const store3 = new AutoStore(
                {
                    threeOrder: {
                        count: 0,
                    },
                },
                { id: "store3" },
            );

            // store1 <--> store2
            new AutoStoreSyncer(store1, {
                id: "store1-store2",
                transport: transport12a,
                local: ["order"],
                remote: ["twoOrder"],
            });

            new AutoStoreSyncer(store2, {
                id: "store2-store1",
                transport: transport12b,
            });

            // store2 <--> store3
            new AutoStoreSyncer(store2, {
                id: "store2-store3",
                transport: transport23a,
                local: ["twoOrder"],
                remote: ["threeOrder"],
            });

            new AutoStoreSyncer(store3, {
                id: "store3-store2",
                transport: transport23b,
            });

            // 等待同步建立
            await delay();

            store1.state.order.count = 3;
            expect(store1.state.order.count).toBe(3);
            expect(store2.state.twoOrder.count).toBe(3);
            expect(store3.state.threeOrder.count).toBe(3);

            store2.state.twoOrder.count = 4;
            expect(store1.state.order.count).toBe(4);
            expect(store2.state.twoOrder.count).toBe(4);
            expect(store3.state.threeOrder.count).toBe(4);

            store3.state.threeOrder.count = 5;
            expect(store1.state.order.count).toBe(5);
            expect(store2.state.twoOrder.count).toBe(5);
            expect(store3.state.threeOrder.count).toBe(5);
        });

        test("单向同步模式下本地推送完整数据", async () => {
            let transport1: LocalTransport;
            let transport2: LocalTransport;

            transport1 = new LocalTransport(() => transport2);

            transport2 = new LocalTransport(() => transport1);

            await transport1.connect();
            await transport2.connect();

            const store1 = new AutoStore({
                x: {
                    order: {
                        price: 100,
                        count: 2,
                    },
                },
            });

            const store2 = new AutoStore();

            const syncer1 = new AutoStoreSyncer(store1, {
                transport: transport1,
                direction: "forward",
            });

            const syncer2 = new AutoStoreSyncer(store2, {
                transport: transport2,
                direction: "backward",
                pathMap: {
                    toLocal: (path, value) => {
                        if (["number", "boolean", "string"].includes(typeof value)) {
                            return [path.join(".")];
                        }
                    },
                },
            });

            // 等待同步建立
            await delay();

            syncer1.push();

            expect(store2.state).toEqual({
                "x.order.price": 100,
                "x.order.count": 2,
            });
        });

        test("单向同步模式下使用toRemote路径映射", async () => {
            let transport1: LocalTransport;
            let transport2: LocalTransport;

            transport1 = new LocalTransport(() => transport2);

            transport2 = new LocalTransport(() => transport1);

            await transport1.connect();
            await transport2.connect();

            const store1 = new AutoStore({
                x: {
                    order: {
                        price: 100,
                        count: 2,
                    },
                },
            });

            const store2 = new AutoStore();

            const syncer1 = new AutoStoreSyncer(store1, {
                transport: transport1,
                direction: "forward",
                pathMap: {
                    toRemote: (path, value) => {
                        if (["number", "boolean", "string"].includes(typeof value)) {
                            return [path.join(".")];
                        }
                    },
                },
            });

            const syncer2 = new AutoStoreSyncer(store2, {
                transport: transport2,
                direction: "backward",
            });

            // 等待同步建立
            await delay();

            store1.state.x.order.count = 3;

            expect(store1.state.x.order.count).toEqual(3);
            expect(store2.state).toEqual({
                "x.order.count": 3,
            });
        });

        test("完全单向同步指定进行from同步路径映射", async () => {
            let transport1: LocalTransport;
            let transport2: LocalTransport;

            transport1 = new LocalTransport(() => transport2);

            transport2 = new LocalTransport(() => transport1);

            await transport1.connect();
            await transport2.connect();

            const store1 = new AutoStore();

            const syncer1 = new AutoStoreSyncer(store1, {
                transport: transport1,
                direction: "backward",
                pathMap: {
                    toLocal: (path) => {
                        return [path.join(".")];
                    },
                },
            });

            const store2 = new AutoStore({
                x: {
                    order: {
                        price: 100,
                        count: 2,
                    },
                },
            });

            const syncer2 = new AutoStoreSyncer(store2, {
                transport: transport2,
                direction: "forward",
            });

            // 等待同步建立
            await delay();

            store2.state.x.order.count = 3;

            expect(store2.state.x.order.count).toEqual(3);
            expect(store1.state).toEqual({
                "x.order.count": 3,
            });
        });

        test("完全单向同且指定from同步路径映射时进行pull操作", async () => {
            let transport1: LocalTransport;
            let transport2: LocalTransport;

            transport1 = new LocalTransport(() => transport2);

            transport2 = new LocalTransport(() => transport1);

            await transport1.connect();
            await transport2.connect();

            const store1 = new AutoStore();

            const syncer1 = new AutoStoreSyncer(store1, {
                transport: transport1,
                direction: "backward",
                pathMap: {
                    toLocal: (path, value) => {
                        if (["number", "boolean", "string"].includes(typeof value)) {
                            return [path.join(".")];
                        }
                    },
                },
            });

            const store2 = new AutoStore({
                x: {
                    order: {
                        price: 100,
                        count: 2,
                    },
                },
            });

            const syncer2 = new AutoStoreSyncer(store2, {
                transport: transport2,
                direction: "forward",
            });

            // 等待同步建立
            await delay();

            syncer1.pull();

            expect(store1.state).toEqual({
                "x.order.count": 2,
                "x.order.price": 100,
            });
        });

        test("局部单向同步指定进行to同步路径映射", async () => {
            let transport1: LocalTransport;
            let transport2: LocalTransport;

            transport1 = new LocalTransport(() => transport2);

            transport2 = new LocalTransport(() => transport1);

            await transport1.connect();
            await transport2.connect();

            const store1 = new AutoStore({
                x: {
                    order: {
                        price: 100,
                        count: 2,
                    },
                },
            });

            const store2 = new AutoStore({
                y: {},
            });

            const syncer1 = new AutoStoreSyncer(store1, {
                transport: transport1,
                local: ["x"],
                remote: ["y"],
                direction: "forward",
                pathMap: {
                    toRemote: (path) => {
                        return [path.join(".")];
                    },
                },
            });

            const syncer2 = new AutoStoreSyncer(store2, {
                transport: transport2,
                direction: "backward",
            });

            // 等待同步建立
            await delay();

            store1.state.x.order.count = 3;

            expect(store1.state.x.order.count).toEqual(3);
            expect(store2.state.y).toEqual({
                "order.count": 3,
            });
        });
    });
});
