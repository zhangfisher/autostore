/**
 * ConfigManager 的 source、load、save 和 reset 功能单元测试
 *
 * 测试核心功能：
 * - source.load 从外部存储加载配置
 * - source.save 保存配置到外部存储
 * - onUpdate 回调触发 save
 * - reset 恢复默认值
 * - 多个 AutoStore 实例共享 ConfigManager
 */
/** biome-ignore-all lint/correctness/noUnusedVariables: <explanation> */

import { describe, test, expect, beforeEach } from "bun:test";
import { AutoStore, ConfigManager, configurable } from "../src";

/**
 * 辅助函数：验证配置项是否正确注册到 ConfigManager
 * @param configManager ConfigManager 实例
 * @param store AutoStore 实例
 * @param paths 配置项路径数组，如 ["order.count", "user.name"]
 */
function assertConfigRegistered(
    configManager: ConfigManager,
    store: AutoStore<any>,
    paths: string[],
) {
    // 获取预期的 configKey 前缀
    // 如果 store.options.configKey 未定义，默认为 store.id
    // 如果 store.options.configKey 为空字符串，则不添加前缀
    const configKey = store.options.configKey || store.id;
    const prefix = configKey === "" ? "" : `${configKey}.`;

    for (const path of paths) {
        const fullPath = prefix + path;
        expect(fullPath in configManager.state).toBe(true);
        expect(configManager.state[fullPath]).toBeDefined();
    }
}

describe("ConfigManager - source、load、save 和 reset 功能", () => {
    let configManager: ConfigManager;
    let mockSource: {
        data: Record<string, any>;
        loadCallCount: number;
        saveCallCount: number;
        saveHistory: Record<string, any>[];
    };

    beforeEach(() => {
        // 初始化模拟的数据源
        mockSource = {
            data: {},
            loadCallCount: 0,
            saveCallCount: 0,
            saveHistory: [],
        };

        // 创建 ConfigManager，使用模拟的 source
        configManager = new ConfigManager({
            load: async () => {
                mockSource.loadCallCount++;
                return { ...mockSource.data };
            },
            save: async (values: Record<string, any>) => {
                mockSource.saveCallCount++;
                mockSource.saveHistory.push({ ...values });
                // 更新数据源
                Object.assign(mockSource.data, values);
            },
        });
    });

    describe("source.load - 从外部存储加载配置", () => {
        test("load 应该从 source 加载配置数据", async () => {
            // 先创建三个 Store
            const orderStore = new AutoStore(
                {
                    order: {
                        price: configurable(99.9, {
                            label: "订单价格",
                        }),
                    },
                },
                {
                    configManager,
                    configKey: "app1",
                },
            );

            const userStore = new AutoStore(
                {
                    user: {
                        name: configurable("Bob", {
                            label: "用户名",
                        }),
                    },
                },
                {
                    configManager,
                    configKey: "app2",
                },
            );

            const shopStore = new AutoStore(
                {
                    shop: {
                        discount: configurable(0.1, {
                            label: "折扣",
                        }),
                    },
                },
                {
                    configManager,
                    configKey: "app3",
                },
            );

            // 断言配置项被正确注册
            assertConfigRegistered(configManager, orderStore, ["order.price"]);
            assertConfigRegistered(configManager, userStore, ["user.name"]);
            assertConfigRegistered(configManager, shopStore, ["shop.discount"]);

            // 设置外部存储的数据（在创建 Store 之后）
            mockSource.data = {
                "app1.order.price": 199.9,
                "app2.user.name": "Alice",
                "app3.shop.discount": 0.2,
            };

            // 加载配置
            await configManager.load();

            // 验证 load 被调用
            expect(mockSource.loadCallCount).toBe(1);

            // 验证值被正确加载
            expect(orderStore.state.order.price).toBe(199.9);
            expect(userStore.state.user.name).toBe("Alice");
            expect(shopStore.state.shop.discount).toBe(0.2);
        });
        test("load方法在store创建前执行，应能自动更新配置数据", async () => {
            // 设置外部存储的数据（在创建 Store 之后）
            mockSource.data = {
                "app1.order.price": 199.9,
                "app2.user.name": "Alice",
                "app3.shop.discount": 0.2,
            };

            // 加载配置
            await configManager.load();
            // 先创建三个 Store
            const orderStore = new AutoStore(
                {
                    order: {
                        price: configurable(99.9, {
                            label: "订单价格",
                        }),
                    },
                },
                {
                    configManager,
                    configKey: "app1",
                },
            );

            const userStore = new AutoStore(
                {
                    user: {
                        name: configurable("Bob", {
                            label: "用户名",
                        }),
                    },
                },
                {
                    configManager,
                    configKey: "app2",
                },
            );

            const shopStore = new AutoStore(
                {
                    shop: {
                        discount: configurable(0.1, {
                            label: "折扣",
                        }),
                    },
                },
                {
                    configManager,
                    configKey: "app3",
                },
            );

            // 断言配置项被正确注册
            assertConfigRegistered(configManager, orderStore, ["order.price"]);
            assertConfigRegistered(configManager, userStore, ["user.name"]);
            assertConfigRegistered(configManager, shopStore, ["shop.discount"]);

            // 验证 load 被调用
            expect(mockSource.loadCallCount).toBe(1);

            // 验证值被正确加载
            expect(orderStore.state.order.price).toBe(199.9);
            expect(userStore.state.user.name).toBe("Alice");
            expect(shopStore.state.shop.discount).toBe(0.2);
        });
        test("load 应该只加载已注册的配置项", async () => {
            // 先创建 Store
            const orderStore = new AutoStore(
                {
                    order: {
                        price: configurable(99.9, {}),
                        quantity: configurable(10, {}),
                    },
                },
                {
                    configManager,
                    configKey: "app",
                },
            );

            // 断言配置项被正确注册
            assertConfigRegistered(configManager, orderStore, ["order.price", "order.quantity"]);

            // 外部存储有多个配置项
            mockSource.data = {
                "app.order.price": 199.9,
                "app.order.quantity": 50,
                "app.user.name": "Alice",
                "unknown.value": "should not load",
            };

            await configManager.load();

            // 验证只有已注册的配置项被加载
            expect(orderStore.state.order.price).toBe(199.9);
            expect(orderStore.state.order.quantity).toBe(50);

            // 未注册的配置项不应该出现在原始 Store 中
            // @ts-expect-error - 测试不存在的属性
            expect(orderStore.state.user).toBeUndefined();
        });

        test("多次调用 load 应该覆盖现有值", async () => {
            const orderStore = new AutoStore(
                {
                    order: {
                        price: configurable(99.9, {}),
                    },
                },
                {
                    configManager,
                    configKey: "app",
                },
            );

            // 断言配置项被正确注册
            assertConfigRegistered(configManager, orderStore, ["order.price"]);

            // 第一次加载
            mockSource.data = {
                "app.order.price": 100,
            };
            await configManager.load();
            expect(orderStore.state.order.price).toBe(100);

            // 修改外部存储数据
            mockSource.data["app.order.price"] = 299.9;

            // 第二次加载
            await configManager.load();
            expect(orderStore.state.order.price).toBe(299.9);
            expect(mockSource.loadCallCount).toBe(2);
        });

        test("load 应该处理空数据", async () => {
            mockSource.data = {};

            const orderStore = new AutoStore(
                {
                    order: {
                        price: configurable(99.9, {}),
                    },
                },
                {
                    configManager,
                    configKey: "app",
                },
            );

            // 断言配置项被正确注册
            assertConfigRegistered(configManager, orderStore, ["order.price"]);

            // 加载空数据不应该报错
            await configManager.load();

            // 值应该保持为默认值
            expect(orderStore.state.order.price).toBe(99.9);
        });

        test("load 应该支持异步加载", async () => {
            let loadResolved = false;

            // 使用异步 load
            configManager = new ConfigManager({
                load: async () => {
                    await new Promise((resolve) => setTimeout(resolve, 10));
                    loadResolved = true;
                    return { "app.order.price": 199.9 };
                },
                save: async (values: Record<string, any>) => {
                    Object.assign(mockSource.data, values);
                },
            });

            const orderStore = new AutoStore(
                {
                    order: {
                        price: configurable(99.9, {}),
                    },
                },
                {
                    configManager,
                    configKey: "app",
                },
            );

            // 断言配置项被正确注册
            assertConfigRegistered(configManager, orderStore, ["order.price"]);

            await configManager.load();

            // 验证异步加载完成
            expect(loadResolved).toBe(true);
            expect(orderStore.state.order.price).toBe(199.9);
        });
    });

    describe("source.save - 保存配置到外部存储", () => {
        test("修改配置项应该触发 source.save", async () => {
            const orderStore = new AutoStore(
                {
                    order: {
                        price: configurable(99.9, {}),
                    },
                },
                {
                    configManager,
                    configKey: "app",
                },
            );

            // 断言配置项被正确注册
            assertConfigRegistered(configManager, orderStore, ["order.price"]);

            // 修改配置项
            orderStore.state.order.price = 199.9;

            // 等待异步保存完成（onUpdate 使用 setTimeout）
            await new Promise((resolve) => setTimeout(resolve, 10));

            // 验证 save 被调用
            expect(mockSource.saveCallCount).toBeGreaterThan(0);
            expect(mockSource.data["app.order.price"]).toBe(199.9);
        });

        test("多个 Store 的变更应该分别保存", async () => {
            const orderStore = new AutoStore(
                {
                    order: {
                        price: configurable(99.9, {}),
                    },
                },
                {
                    configManager,
                    configKey: "app1",
                },
            );

            const userStore = new AutoStore(
                {
                    user: {
                        name: configurable("Bob", {}),
                    },
                },
                {
                    configManager,
                    configKey: "app2",
                },
            );

            const shopStore = new AutoStore(
                {
                    shop: {
                        discount: configurable(0.1, {}),
                    },
                },
                {
                    configManager,
                    configKey: "app3",
                },
            );

            // 断言配置项被正确注册
            assertConfigRegistered(configManager, orderStore, ["order.price"]);
            assertConfigRegistered(configManager, userStore, ["user.name"]);
            assertConfigRegistered(configManager, shopStore, ["shop.discount"]);

            // 修改各个 Store
            orderStore.state.order.price = 199.9;
            userStore.state.user.name = "Alice";
            shopStore.state.shop.discount = 0.2;

            // 等待异步保存
            await new Promise((resolve) => setTimeout(resolve, 10));

            // 验证所有值都被保存
            expect(mockSource.data["app1.order.price"]).toBe(199.9);
            expect(mockSource.data["app2.user.name"]).toBe("Alice");
            expect(mockSource.data["app3.shop.discount"]).toBe(0.2);
        });

        test("手动调用 save(all=true) 应该保存所有配置", async () => {
            const orderStore = new AutoStore(
                {
                    order: {
                        price: configurable(99.9, {}),
                        quantity: configurable(10, {}),
                    },
                },
                {
                    configManager,
                    configKey: "app",
                },
            );

            // 断言配置项被正确注册
            assertConfigRegistered(configManager, orderStore, ["order.price", "order.quantity"]);

            // 只修改一个配置项
            orderStore.state.order.price = 199.9;

            // 等待自动保存
            await new Promise((resolve) => setTimeout(resolve, 10));

            // 清空保存历史
            mockSource.saveHistory = [];
            mockSource.saveCallCount = 0;

            // 手动保存所有配置
            await configManager.save(true);

            // 验证所有配置都被保存
            expect(mockSource.saveCallCount).toBe(1);
            const savedData = mockSource.saveHistory[0];
            expect(savedData["app.order.price"]).toBeDefined();
            expect(savedData["app.order.quantity"]).toBeDefined(); // 未修改的也被保存
        });

        test("save 后 dirtyValues 应该被清空", async () => {
            const orderStore = new AutoStore(
                {
                    order: {
                        price: configurable(99.9, {}),
                    },
                },
                {
                    configManager,
                    configKey: "app",
                },
            );

            // 断言配置项被正确注册
            assertConfigRegistered(configManager, orderStore, ["order.price"]);

            // 修改配置项
            orderStore.state.order.price = 199.9;

            // 等待自动保存
            await new Promise((resolve) => setTimeout(resolve, 10));

            // 验证 dirtyValues 被清空（自动保存后会清空）
            expect(Object.keys(configManager.dirtyValues).length).toBe(0);
        });

        test("没有 save 方法时不应该报错", async () => {
            const configManagerWithoutSave = new ConfigManager({
                load: async () => ({}),
                // 没有 save 方法
            });

            const orderStore = new AutoStore(
                {
                    order: {
                        price: configurable(99.9, {}),
                    },
                },
                {
                    configManager: configManagerWithoutSave,
                    configKey: "app",
                },
            );

            // 断言配置项被正确注册
            assertConfigRegistered(configManagerWithoutSave, orderStore, ["order.price"]);

            // 修改配置项不应该报错
            orderStore.state.order.price = 199.9;

            // 等待一下确保没有异步错误
            await new Promise((resolve) => setTimeout(resolve, 10));

            expect(orderStore.state.order.price).toBe(199.9);
        });
    });

    describe("onUpdate - 配置变更时触发 save", () => {
        test("配置变更时应该调用 onUpdate", async () => {
            let onUpdateCallCount = 0;
            let lastConfigKey = "";
            let lastValue: any;

            // 创建带有 onUpdate 监听的 ConfigManager
            const trackingConfigManager = new ConfigManager({
                load: async () => ({}),
                save: async (values) => {
                    onUpdateCallCount++;
                    // 从 values 中提取配置键和值
                    const entries = Object.entries(values);
                    if (entries.length > 0) {
                        [lastConfigKey, lastValue] = entries[0];
                    }
                },
            });

            const orderStore = new AutoStore(
                {
                    order: {
                        price: configurable(99.9, {}),
                    },
                },
                {
                    configManager: trackingConfigManager,
                    configKey: "app",
                },
            );

            // 断言配置项被正确注册
            assertConfigRegistered(trackingConfigManager, orderStore, ["order.price"]);

            // 修改配置项
            orderStore.state.order.price = 199.9;

            // 等待保存（onUpdate 使用 setTimeout）
            await new Promise((resolve) => setTimeout(resolve, 10));

            // 验证 onUpdate 被调用
            expect(onUpdateCallCount).toBeGreaterThan(0);
            expect(lastConfigKey).toBe("app.order.price");
            expect(lastValue).toBe(199.9);
        });

        test("onUpdate 应该传递正确的配置键和值", async () => {
            const savedData: Record<string, any> = {};

            const trackingConfigManager = new ConfigManager({
                load: async () => ({}),
                save: async (values) => {
                    Object.assign(savedData, values);
                },
            });

            // 创建三个 Store
            const orderStore = new AutoStore(
                {
                    order: {
                        price: configurable(99.9, {}),
                    },
                },
                {
                    configManager: trackingConfigManager,
                    configKey: "app1",
                },
            );

            const userStore = new AutoStore(
                {
                    user: {
                        name: configurable("Bob", {}),
                    },
                },
                {
                    configManager: trackingConfigManager,
                    configKey: "app2",
                },
            );

            const shopStore = new AutoStore(
                {
                    shop: {
                        discount: configurable(0.1, {}),
                    },
                },
                {
                    configManager: trackingConfigManager,
                    configKey: "app3",
                },
            );

            // 断言配置项被正确注册
            assertConfigRegistered(trackingConfigManager, orderStore, ["order.price"]);
            assertConfigRegistered(trackingConfigManager, userStore, ["user.name"]);
            assertConfigRegistered(trackingConfigManager, shopStore, ["shop.discount"]);

            // 修改各个配置项
            orderStore.state.order.price = 199.9;
            userStore.state.user.name = "Alice";
            shopStore.state.shop.discount = 0.2;

            // 等待保存
            await new Promise((resolve) => setTimeout(resolve, 10));

            // 验证所有配置都被正确保存
            expect(savedData["app1.order.price"]).toBe(199.9);
            expect(savedData["app2.user.name"]).toBe("Alice");
            expect(savedData["app3.shop.discount"]).toBe(0.2);
        });
    });

    describe("reset - 恢复默认值", () => {
        test("reset 应该将所有配置恢复为默认值", () => {
            const orderStore = new AutoStore(
                {
                    order: {
                        price: configurable(99.9, {
                            label: "订单价格",
                        }),
                        quantity: configurable(10, {
                            label: "订单数量",
                        }),
                    },
                },
                {
                    configManager,
                    configKey: "app",
                },
            );

            // 断言配置项被正确注册
            assertConfigRegistered(configManager, orderStore, ["order.price", "order.quantity"]);

            // 修改配置项
            orderStore.state.order.price = 199.9;
            orderStore.state.order.quantity = 50;

            expect(orderStore.state.order.price).toBe(199.9);
            expect(orderStore.state.order.quantity).toBe(50);

            // 调用 reset
            configManager.reset();

            // 验证值恢复为默认值
            expect(orderStore.state.order.price).toBe(99.9);
            expect(orderStore.state.order.quantity).toBe(10);
        });

        test("reset 应该清空 dirtyValues", async () => {
            const orderStore = new AutoStore(
                {
                    order: {
                        price: configurable(99.9, {}),
                    },
                },
                {
                    configManager,
                    configKey: "app",
                },
            );

            // 断言配置项被正确注册
            assertConfigRegistered(configManager, orderStore, ["order.price"]);

            // 修改配置项
            orderStore.state.order.price = 199.9;

            // 等待保存
            await new Promise((resolve) => setTimeout(resolve, 10));

            // 手动添加 dirtyValues（模拟未保存的变更）
            configManager.dirtyValues["app.order.price"] = 299.9;

            // 调用 reset
            configManager.reset();

            // 验证 dirtyValues 被清空
            expect(Object.keys(configManager.dirtyValues).length).toBe(0);
        });

        test("reset 应该同时重置多个 Store 的配置", () => {
            const orderStore = new AutoStore(
                {
                    order: {
                        price: configurable(99.9, {}),
                    },
                },
                {
                    configManager,
                    configKey: "app1",
                },
            );

            const userStore = new AutoStore(
                {
                    user: {
                        name: configurable("Bob", {}),
                    },
                },
                {
                    configManager,
                    configKey: "app2",
                },
            );

            const shopStore = new AutoStore(
                {
                    shop: {
                        discount: configurable(0.1, {}),
                    },
                },
                {
                    configManager,
                    configKey: "app3",
                },
            );

            // 断言配置项被正确注册
            assertConfigRegistered(configManager, orderStore, ["order.price"]);
            assertConfigRegistered(configManager, userStore, ["user.name"]);
            assertConfigRegistered(configManager, shopStore, ["shop.discount"]);

            // 修改各个配置项
            orderStore.state.order.price = 199.9;
            userStore.state.user.name = "Alice";
            shopStore.state.shop.discount = 0.2;

            // 调用 reset
            configManager.reset();

            // 验证所有值都被重置
            expect(orderStore.state.order.price).toBe(99.9);
            expect(userStore.state.user.name).toBe("Bob");
            expect(shopStore.state.shop.discount).toBe(0.1);
        });

        test("reset 后修改配置项应该正常工作", () => {
            const orderStore = new AutoStore(
                {
                    order: {
                        price: configurable(99.9, {}),
                    },
                },
                {
                    configManager,
                    configKey: "app",
                },
            );

            // 断言配置项被正确注册
            assertConfigRegistered(configManager, orderStore, ["order.price"]);

            // 修改并重置
            orderStore.state.order.price = 199.9;
            configManager.reset();

            // 重置后应该可以正常修改
            orderStore.state.order.price = 299.9;
            expect(orderStore.state.order.price).toBe(299.9);
        });

        test("reset 不应该影响默认值属性", () => {
            const orderStore = new AutoStore(
                {
                    order: {
                        price: configurable(99.9, {
                            label: "订单价格",
                        }),
                    },
                },
                {
                    configManager,
                    configKey: "app",
                },
            );

            // 断言配置项被正确注册
            assertConfigRegistered(configManager, orderStore, ["order.price"]);

            // 修改配置项
            orderStore.state.order.price = 199.9;

            // 调用 reset
            configManager.reset();

            // 验证值恢复为默认值
            expect(orderStore.state.order.price).toBe(99.9);

            // Schema 属性应该保持不变
            const schema = configManager.state["app.order.price"] as any;
            expect(schema.label).toBe("订单价格");
        });
    });

    describe("多 Store 协同场景", () => {
        test("三个 Store (order、user、shop) 共享 ConfigManager", async () => {
            // 创建三个 Store
            const orderStore = new AutoStore(
                {
                    order: {
                        price: configurable(99.9, {
                            label: "订单价格",
                            validate: (value) => value > 0,
                        }),
                        quantity: configurable(10, {
                            label: "订单数量",
                            validate: (value) => value > 0,
                        }),
                    },
                },
                {
                    configManager,
                    configKey: "app1",
                },
            );

            const userStore = new AutoStore(
                {
                    user: {
                        name: configurable("Bob", {
                            label: "用户名",
                            validate: (value) => typeof value === "string" && value.length > 0,
                        }),
                        age: configurable(25, {
                            label: "年龄",
                            validate: (value) => value >= 0 && value <= 150,
                        }),
                    },
                },
                {
                    configManager,
                    configKey: "app2",
                },
            );

            const shopStore = new AutoStore(
                {
                    shop: {
                        discount: configurable(0.1, {
                            label: "折扣",
                            validate: (value) => value >= 0 && value < 1,
                        }),
                        tax: configurable(0.05, {
                            label: "税率",
                            validate: (value) => value >= 0 && value < 1,
                        }),
                    },
                },
                {
                    configManager,
                    configKey: "app3",
                },
            );

            // 断言配置项被正确注册
            assertConfigRegistered(configManager, orderStore, ["order.price", "order.quantity"]);
            assertConfigRegistered(configManager, userStore, ["user.name", "user.age"]);
            assertConfigRegistered(configManager, shopStore, ["shop.discount", "shop.tax"]);

            // 1. 测试加载配置
            mockSource.data = {
                "app1.order.price": 199.9,
                "app1.order.quantity": 50,
                "app2.user.name": "Alice",
                "app2.user.age": 30,
                "app3.shop.discount": 0.2,
                "app3.shop.tax": 0.1,
            };

            await configManager.load();
            expect(mockSource.loadCallCount).toBe(1);

            expect(orderStore.state.order.price).toBe(199.9);
            expect(orderStore.state.order.quantity).toBe(50);
            expect(userStore.state.user.name).toBe("Alice");
            expect(userStore.state.user.age).toBe(30);
            expect(shopStore.state.shop.discount).toBe(0.2);
            expect(shopStore.state.shop.tax).toBe(0.1);

            // 2. 测试修改配置触发 save
            orderStore.state.order.price = 299.9;
            userStore.state.user.name = "Charlie";
            shopStore.state.shop.discount = 0.3;

            await new Promise((resolve) => setTimeout(resolve, 10));

            expect(mockSource.saveCallCount).toBeGreaterThan(0);
            expect(mockSource.data["app1.order.price"]).toBe(299.9);
            expect(mockSource.data["app2.user.name"]).toBe("Charlie");
            expect(mockSource.data["app3.shop.discount"]).toBe(0.3);

            // 3. 测试 reset
            orderStore.state.order.price = 399.9;
            userStore.state.user.name = "David";
            shopStore.state.shop.discount = 0.5;

            configManager.reset();

            expect(orderStore.state.order.price).toBe(99.9);
            expect(orderStore.state.order.quantity).toBe(10);
            expect(userStore.state.user.name).toBe("Bob");
            expect(userStore.state.user.age).toBe(25);
            expect(shopStore.state.shop.discount).toBe(0.1);
            expect(shopStore.state.shop.tax).toBe(0.05);

            // 4. 验证 dirtyValues 被清空
            expect(Object.keys(configManager.dirtyValues).length).toBe(0);
        });

        test("不同 Store 的配置项应该独立校验", async () => {
            const orderStore = new AutoStore(
                {
                    order: {
                        price: configurable(99.9, {
                            validate: (value) => {
                                if (value <= 0) {
                                    throw new Error("价格必须大于0");
                                }
                                return true;
                            },
                        }),
                    },
                },
                {
                    configManager,
                    configKey: "app1",
                },
            );

            const userStore = new AutoStore(
                {
                    user: {
                        name: configurable("Bob", {
                            validate: (value) => {
                                if (value.length < 3) {
                                    throw new Error("用户名至少3个字符");
                                }
                                return true;
                            },
                        }),
                    },
                },
                {
                    configManager,
                    configKey: "app2",
                },
            );

            const shopStore = new AutoStore(
                {
                    shop: {
                        discount: configurable(0.1, {
                            validate: (value) => {
                                if (value < 0 || value >= 1) {
                                    throw new Error("折扣必须在0到1之间");
                                }
                                return true;
                            },
                        }),
                    },
                },
                {
                    configManager,
                    configKey: "app3",
                },
            );

            // 断言配置项被正确注册
            assertConfigRegistered(configManager, orderStore, ["order.price"]);
            assertConfigRegistered(configManager, userStore, ["user.name"]);
            assertConfigRegistered(configManager, shopStore, ["shop.discount"]);

            // 初始化外部数据并加载
            mockSource.data = {
                "app1.order.price": 199.9,
                "app2.user.name": "Alice",
                "app3.shop.discount": 0.2,
            };

            await configManager.load();

            // 验证各个配置项独立校验
            expect(() => {
                orderStore.state.order.price = -10;
            }).toThrow("价格必须大于0");

            expect(() => {
                userStore.state.user.name = "ab";
            }).toThrow("用户名至少3个字符");

            expect(() => {
                shopStore.state.shop.discount = 1.5;
            }).toThrow("折扣必须在0到1之间");

            // 一个配置项校验失败不应该影响其他配置项
            expect(orderStore.state.order.price).toBe(199.9);
            expect(userStore.state.user.name).toBe("Alice");
            expect(shopStore.state.shop.discount).toBe(0.2);
        });
    });

    describe("边界情况和错误处理", () => {
        test("load 不存在的配置项应该跳过", async () => {
            const orderStore = new AutoStore(
                {
                    order: {
                        price: configurable(99.9, {}),
                    },
                },
                {
                    configManager,
                    configKey: "app",
                },
            );

            // 断言配置项被正确注册
            assertConfigRegistered(configManager, orderStore, ["order.price"]);

            mockSource.data = {
                "app.order.price": 199.9,
                "nonexistent.value": "should be ignored",
            };

            // 不应该报错
            await configManager.load();

            expect(orderStore.state.order.price).toBe(199.9);
        });

        test("空 ConfigManager 调用 reset 不应该报错", () => {
            const emptyConfigManager = new ConfigManager({
                load: async () => ({}),
            });

            expect(() => {
                emptyConfigManager.reset();
            }).not.toThrow();
        });

        test("多次调用 reset 应该保持幂等性", () => {
            const orderStore = new AutoStore(
                {
                    order: {
                        price: configurable(99.9, {}),
                    },
                },
                {
                    configManager,
                    configKey: "app",
                },
            );

            // 断言配置项被正确注册
            assertConfigRegistered(configManager, orderStore, ["order.price"]);

            orderStore.state.order.price = 199.9;

            // 多次 reset
            configManager.reset();
            expect(orderStore.state.order.price).toBe(99.9);

            configManager.reset();
            expect(orderStore.state.order.price).toBe(99.9);

            configManager.reset();
            expect(orderStore.state.order.price).toBe(99.9);
        });

        test("ConfigManager.size 应该反映配置项数量", async () => {
            // 初始应该没有配置项
            expect(configManager.size).toBe(0);

            const orderStore = new AutoStore(
                {
                    order: {
                        price: configurable(99.9, {}),
                        quantity: configurable(10, {}),
                    },
                },
                {
                    configManager,
                    configKey: "app1",
                },
            );

            const userStore = new AutoStore(
                {
                    user: {
                        name: configurable("Bob", {}),
                    },
                },
                {
                    configManager,
                    configKey: "app2",
                },
            );

            // 断言配置项被正确注册
            assertConfigRegistered(configManager, orderStore, ["order.price", "order.quantity"]);
            assertConfigRegistered(configManager, userStore, ["user.name"]);

            // 应该有 3 个配置项
            expect(configManager.size).toBe(3);

            // 加载配置不应该改变配置项数量
            mockSource.data = {
                "app1.order.price": 199.9,
            };
            await configManager.load();

            expect(configManager.size).toBe(3);
        });
    });

    describe("AutoStoreOptions.configManager - boolean 类型", () => {
        test("configManager=false 应该不创建 ConfigManager", () => {
            const orderStore = new AutoStore(
                {
                    order: {
                        price: configurable(99.9, {}),
                    },
                },
                {
                    configManager: false,
                },
            );

            // 不应该创建 ConfigManager
            expect(orderStore.configManager).toBeUndefined();

            // 配置项应该仍然可以正常工作
            expect(orderStore.state.order.price).toBe(99.9);
            orderStore.state.order.price = 199.9;
            expect(orderStore.state.order.price).toBe(199.9);
        });

        test("configManager 未指定且不存在全局 ConfigManager 时应该不创建", () => {
            // 确保没有全局 ConfigManager
            // @ts-expect-error - 测试目的
            delete globalThis.AutoStoreConfigManager;

            const orderStore = new AutoStore({
                order: {
                    price: configurable(99.9, {
                        widget: "number",
                    }),
                },
            });

            // 不应该创建 ConfigManager
            expect(orderStore.configManager).toBeUndefined();
        });
    });
});
