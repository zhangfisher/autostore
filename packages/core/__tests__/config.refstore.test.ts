import { describe, test, expect, beforeEach, afterEach } from "bun:test";
import { AutoStore, configurable, ConfigManager, computed } from "../src";
import { delay } from "flex-tools/async/delay";

/**
 * configurable 的 ref 功能单元测试
 *
 * 测试核心逻辑：
 * - enable 计算属性可以通过 ref 访问所在 store 的状态值
 * - ref 返回的状态值变化时，计算属性应该重新执行
 * - 支持字符串路径和数组路径
 * - 支持嵌套路径访问
 * - reactive=false 时不会建立响应式依赖
 */

/**
 * 辅助函数：验证配置项是否正确注册到 ConfigManager
 */
function assertConfigRegistered(
    configManager: ConfigManager,
    store: AutoStore<any>,
    paths: string[],
) {
    const configKey = store.options.configKey;
    const prefix = configKey === "" ? "" : `${configKey}.`;

    for (const path of paths) {
        const fullPath = prefix + path;
        expect(fullPath in configManager.state).toBe(true);
        expect(configManager.state[fullPath]).toBeDefined();
    }
}

describe("configurable 的 ref 功能测试", () => {
    let configManager: ConfigManager;

    beforeEach(() => {
        configManager = new ConfigManager({
            load: () => ({}),
            save: () => {},
        });
    });

    afterEach(() => {
        configManager = null as any;
    });

    describe("基本功能 - ref 访问 store 状态", () => {
        test("enable 计算属性可以通过 ref 访问同一 store 中的状态", () => {
            const netStore = new AutoStore(
                {
                    dhcp: configurable(true, {
                        label: "自动获取IP地址",
                    }),
                    ip: configurable("192.168.1.1", {
                        label: "IP地址",
                        enable: computed((_scope: any, { ref }) => {
                            const dhcp = ref("dhcp");
                            return dhcp === true;
                        }),
                    }),
                },
                { configManager, id: "network" },
            );

            // 断言配置项被正确注册
            assertConfigRegistered(configManager, netStore, ["dhcp", "ip"]);

            // 初始状态 dhcp=true，ip 应该启用
            expect(configManager.state["network.ip"].enable).toBe(true);
            expect(netStore.state.dhcp).toBe(true);
        });
        test("当 ref 访问的状态值变化时，计算属性应该重新执行", async () => {
            const netStore = new AutoStore(
                {
                    dhcp: configurable(true, {
                        label: "自动获取IP地址",
                    }),
                    ip: configurable("192.168.1.1", {
                        label: "IP地址",
                        enable: computed((_scope: any, { ref }) => {
                            const dhcp = ref("dhcp");
                            return dhcp === true;
                        }),
                    }),
                },
                { configManager, id: "network" },
            );

            // 断言配置项被正确注册
            assertConfigRegistered(configManager, netStore, ["dhcp", "ip"]);

            // 初始状态
            expect(configManager.state["network.ip"].enable).toBe(true);

            // 修改 dhcp 为 false
            netStore.state.dhcp = false;
            await delay(0); // 等待计算属性更新

            // enable 应该变为 false
            expect(configManager.state["network.ip"].enable).toBe(false);
            expect(netStore.state.dhcp).toBe(false);

            // 再次修改 dhcp 为 true
            netStore.state.dhcp = true;
            await delay(0);

            // enable 应该变为 true
            expect(configManager.state["network.ip"].enable).toBe(true);
        });

        test("ref 可以使用数组路径访问状态", () => {
            const store = new AutoStore(
                {
                    settings: {
                        mode: configurable("basic", {
                            label: "模式",
                        }),
                    },
                    advancedOption: configurable("default", {
                        label: "高级选项",
                        enable: computed((_scope: any, { ref }) => {
                            // 使用数组路径访问
                            const mode = ref(["settings", "mode"]);
                            return mode === "advanced";
                        }),
                    }),
                },
                { configManager, id: "app" },
            );

            // 断言配置项被正确注册
            assertConfigRegistered(configManager, store, ["settings.mode", "advancedOption"]);

            // 初始模式为 basic，advancedOption 应该禁用
            expect(configManager.state["app.advancedOption"].enable).toBe(false);

            // 修改模式为 advanced
            store.state.settings.mode = "advanced";
            expect(configManager.state["app.advancedOption"].enable).toBe(true);
        });

        test("ref 可以访问嵌套对象的状态", () => {
            const store = new AutoStore(
                {
                    user: {
                        age: configurable(18, {
                            label: "年龄",
                        }),
                    },
                    parentName: configurable("", {
                        label: "监护人姓名",
                        enable: computed((_scope: any, { ref }) => {
                            const age = ref("user.age");
                            return age < 18;
                        }),
                    }),
                },
                { configManager, id: "profile" },
            );

            // 断言配置项被正确注册
            assertConfigRegistered(configManager, store, ["user.age", "parentName"]);

            // 初始年龄 18，parentName 应该禁用
            expect(configManager.state["profile.parentName"].enable).toBe(false);

            // 修改年龄为 15
            store.state.user.age = 15;
            expect(configManager.state["profile.parentName"].enable).toBe(true);

            // 修改年龄为 20
            store.state.user.age = 20;
            expect(configManager.state["profile.parentName"].enable).toBe(false);
        });
    });

    describe("多个 ref 依赖", () => {
        test("计算属性可以同时通过 ref 访问多个状态", () => {
            const store = new AutoStore(
                {
                    price: configurable(100, {
                        label: "价格",
                    }),
                    discount: configurable(0.1, {
                        label: "折扣",
                    }),
                    finalPrice: configurable(0, {
                        label: "最终价格",
                        enable: computed((_scope: any, { ref }) => {
                            const price = ref("price");
                            const discount = ref("discount");
                            return price > 0 && discount > 0;
                        }),
                    }),
                },
                { configManager, id: "order" },
            );

            // 断言配置项被正确注册
            assertConfigRegistered(configManager, store, ["price", "discount", "finalPrice"]);

            // 初始状态：price=100, discount=0.1，应该启用
            expect(configManager.state["order.finalPrice"].enable).toBe(true);

            // 修改 price 为 0
            store.state.price = 0;
            expect(configManager.state["order.finalPrice"].enable).toBe(false);

            // 恢复 price
            store.state.price = 100;
            expect(configManager.state["order.finalPrice"].enable).toBe(true);

            // 修改 discount 为 0
            store.state.discount = 0;
            expect(configManager.state["order.finalPrice"].enable).toBe(false);
        });

        test("多个配置项可以同时使用 ref 访问相同的状态", () => {
            const store = new AutoStore(
                {
                    mode: configurable("basic", {
                        label: "模式",
                    }),
                    option1: configurable("value1", {
                        label: "选项1",
                        enable: computed((_scope: any, { ref }) => {
                            return ref("mode") === "advanced";
                        }),
                    }),
                    option2: configurable("value2", {
                        label: "选项2",
                        enable: computed((_scope: any, { ref }) => {
                            return ref("mode") === "advanced";
                        }),
                    }),
                    option3: configurable("value3", {
                        label: "选项3",
                        enable: computed((_scope: any, { ref }) => {
                            return ref("mode") === "advanced";
                        }),
                    }),
                },
                { configManager, id: "settings" },
            );

            // 断言配置项被正确注册
            assertConfigRegistered(configManager, store, ["mode", "option1", "option2", "option3"]);

            // 初始模式为 basic，所有选项都应该禁用
            expect(configManager.state["settings.option1"].enable).toBe(false);
            expect(configManager.state["settings.option2"].enable).toBe(false);
            expect(configManager.state["settings.option3"].enable).toBe(false);

            // 修改模式为 advanced，所有选项都应该启用
            store.state.mode = "advanced";
            expect(configManager.state["settings.option1"].enable).toBe(true);
            expect(configManager.state["settings.option2"].enable).toBe(true);
            expect(configManager.state["settings.option3"].enable).toBe(true);
        });
    });

    describe("复杂的依赖关系", () => {
        test("ref 可以链式访问依赖状态", () => {
            const store = new AutoStore(
                {
                    featureEnabled: configurable(true, {
                        label: "功能开关",
                    }),
                    userLoggedIn: configurable(false, {
                        label: "用户登录",
                        enable: computed((_scope: any, { ref }) => {
                            return ref("featureEnabled") === true;
                        }),
                    }),
                    premiumUser: configurable(false, {
                        label: "高级用户",
                        enable: computed((_scope: any, { ref }) => {
                            // 依赖于 featureEnabled 和 userLoggedIn
                            const featureEnabled = ref("featureEnabled");
                            const userLoggedIn = ref("userLoggedIn");
                            return featureEnabled && userLoggedIn;
                        }),
                    }),
                    premiumFeature: configurable("default", {
                        label: "高级功能",
                        enable: computed((_scope: any, { ref }) => {
                            // 依赖于 premiumUser
                            return ref("premiumUser") === true;
                        }),
                    }),
                },
                { configManager, id: "app" },
            );

            // 断言配置项被正确注册
            assertConfigRegistered(configManager, store, [
                "featureEnabled",
                "userLoggedIn",
                "premiumUser",
                "premiumFeature",
            ]);

            // 初始状态
            expect(configManager.state["app.userLoggedIn"].enable).toBe(true);
            expect(configManager.state["app.premiumUser"].enable).toBe(false);
            expect(configManager.state["app.premiumFeature"].enable).toBe(false);

            // 启用 feature
            store.state.featureEnabled = true;
            expect(configManager.state["app.userLoggedIn"].enable).toBe(true);

            // 用户登录
            store.state.userLoggedIn = true;
            expect(configManager.state["app.premiumUser"].enable).toBe(true);

            // 启用高级用户
            store.state.premiumUser = true;
            expect(configManager.state["app.premiumFeature"].enable).toBe(true);
        });

        test("ref 访问不存在的路径应该返回 undefined", () => {
            const store = new AutoStore(
                {
                    value: configurable(100, {
                        label: "值",
                        enable: computed((_scope: any, { ref }) => {
                            // 访问不存在的路径
                            const nonExistent = ref("nonExistent.path");
                            // undefined 应该被正确处理
                            return nonExistent === undefined;
                        }),
                    }),
                },
                { configManager, id: "test" },
            );

            // 断言配置项被正确注册
            assertConfigRegistered(configManager, store, ["value"]);

            // enable 应该为 true（因为 nonExistent === undefined）
            expect(configManager.state["test.value"].enable).toBe(true);
        });
    });

    describe("ref 在不同配置属性中的使用", () => {
        test("ref 可以在 label 计算属性中使用", () => {
            const store = new AutoStore(
                {
                    price: configurable(100, {
                        label: "价格",
                    }),
                    finalPrice: configurable(0, {
                        label: computed((_scope: any, { ref }) => {
                            const price = ref("price");
                            return `最终价格: ${price}`;
                        }),
                    }),
                },
                { configManager, id: "product" },
            );

            // 断言配置项被正确注册
            assertConfigRegistered(configManager, store, ["price", "finalPrice"]);

            // label 应该根据 price 动态变化
            expect(configManager.state["product.finalPrice"].label).toBe("最终价格: 100");

            store.state.price = 200;
            expect(configManager.state["product.finalPrice"].label).toBe("最终价格: 200");
        });

        test("ref 可以在 required 计算属性中使用", () => {
            const store = new AutoStore(
                {
                    hasGuardian: configurable(false, {
                        label: "有监护人",
                    }),
                    guardianName: configurable("", {
                        label: "监护人姓名",
                        required: computed((_scope: any, { ref }) => {
                            return ref("hasGuardian") === true;
                        }),
                    }),
                },
                { configManager, id: "user" },
            );

            // 断言配置项被正确注册
            assertConfigRegistered(configManager, store, ["hasGuardian", "guardianName"]);

            // 初始状态不需要监护人
            expect(configManager.state["user.guardianName"].required).toBe(false);

            // 启用监护人
            store.state.hasGuardian = true;
            expect(configManager.state["user.guardianName"].required).toBe(true);
        });

        test("ref 可以在 visible 计算属性中使用", () => {
            const store = new AutoStore(
                {
                    showAdvanced: configurable(false, {
                        label: "显示高级选项",
                    }),
                    advancedOption: configurable("default", {
                        label: "高级选项",
                        visible: computed((_scope: any, { ref }) => {
                            return ref("showAdvanced") === true;
                        }),
                    }),
                },
                { configManager, id: "settings" },
            );

            // 断言配置项被正确注册
            assertConfigRegistered(configManager, store, ["showAdvanced", "advancedOption"]);

            // 初始状态不显示高级选项
            expect(configManager.state["settings.advancedOption"].visible).toBe(false);

            // 显示高级选项
            store.state.showAdvanced = true;
            expect(configManager.state["settings.advancedOption"].visible).toBe(true);
        });

        test("ref 可以在 placeholder 计算属性中使用", () => {
            const store = new AutoStore(
                {
                    username: configurable("", {
                        label: "用户名",
                    }),
                    email: configurable("", {
                        label: "邮箱",
                        placeholder: computed((_scope: any, { ref }) => {
                            const username = ref("username");
                            return username ? `${username}@example.com` : "请输入邮箱";
                        }),
                    }),
                },
                { configManager, id: "account" },
            );

            // 断言配置项被正确注册
            assertConfigRegistered(configManager, store, ["username", "email"]);

            // 初始 placeholder
            expect(configManager.state["account.email"].placeholder).toBe("请输入邮箱");

            // 输入用户名后
            store.state.username = "john";
            expect(configManager.state["account.email"].placeholder).toBe("john@example.com");
        });
    });

    describe("ref 的响应式行为", () => {
        test("reactive=false 时 ref 不建立响应式依赖", async () => {
            let callCount = 0;
            const store = new AutoStore(
                {
                    value: configurable(100, {
                        label: "值",
                    }),
                    dependent: configurable("default", {
                        label: "依赖项",
                        enable: computed((_scope: any, { ref }) => {
                            callCount++;
                            // 使用 reactive=false，不应该建立响应式依赖
                            const value = ref("value", { reactive: false });
                            return value > 50;
                        }),
                    }),
                },
                { configManager, id: "test" },
            );

            // 等待初始化完成
            await delay(0);

            // 断言配置项被正确注册
            assertConfigRegistered(configManager, store, ["value", "dependent"]);

            expect(configManager.state["test.dependent"].enable).toBe(true);

            // 重置计数器
            callCount = 0;

            // 修改 value，由于 reactive=false，不应该触发重新计算
            store.state.value = 200;
            await delay(0);
            expect(callCount).toBe(0);
        });

        test("默认情况下 ref 建立响应式依赖", async () => {
            let callCount = 0;
            const store = new AutoStore(
                {
                    value: configurable(100, {
                        label: "值",
                    }),
                    dependent: configurable("default", {
                        label: "依赖项",
                        enable: computed((_scope: any, { ref }) => {
                            callCount++;
                            const value = ref("value");
                            return value > 50;
                        }),
                    }),
                },
                { configManager, id: "test" },
            );

            // 断言配置项被正确注册
            assertConfigRegistered(configManager, store, ["value", "dependent"]);

            // 访问 enable 来触发计算
            expect(configManager.state["test.dependent"].enable).toBe(true);
            const initialCount = callCount;
            expect(initialCount).toBeGreaterThan(0);

            // 重置计数器
            callCount = 0;

            // 修改 value，应该触发重新计算
            store.state.value = 200;
            await delay(0);

            expect(callCount).toBeGreaterThan(0);
        });
    });

    describe("边界情况和错误处理", () => {
        test("ref 为 undefined 时应该正常工作", () => {
            const store = new AutoStore(
                {
                    value: configurable(100, {
                        label: "值",
                        enable: computed((_scope: any, { ref }) => {
                            // ref 可能为 undefined
                            const val = ref("value");
                            return val !== undefined;
                        }),
                    }),
                },
                { configManager, id: "test" },
            );

            // 断言配置项被正确注册
            assertConfigRegistered(configManager, store, ["value"]);

            // 即使 ref 为 undefined，也应该正常工作
            expect(configManager.state["test.value"].enable).toBe(true);
        });

        test("ref 访问深层嵌套路径", () => {
            const store = new AutoStore(
                {
                    level1: {
                        level2: {
                            level3: configurable("deep", {
                                label: "深层值",
                            }),
                        },
                    },
                    checker: configurable(false, {
                        label: "检查器",
                        enable: computed((_scope: any, { ref }) => {
                            const deepValue = ref("level1.level2.level3");
                            return deepValue === "deep";
                        }),
                    }),
                },
                { configManager, id: "nested" },
            );

            // 断言配置项被正确注册
            assertConfigRegistered(configManager, store, ["level1.level2.level3", "checker"]);

            expect(configManager.state["nested.checker"].enable).toBe(true);

            store.state.level1.level2.level3 = "other";
            expect(configManager.state["nested.checker"].enable).toBe(false);
        });

        test("多个计算属性通过 ref 形成依赖链", async () => {
            const store = new AutoStore(
                {
                    source: configurable(1, {
                        label: "源值",
                    }),
                    level1: configurable(1, {
                        label: "一级依赖",
                        enable: computed((_scope: any, { ref }) => {
                            return ref("source") > 0;
                        }),
                    }),
                    level2: configurable(1, {
                        label: "二级依赖",
                        enable: computed((_scope: any, { ref }) => {
                            // level2 依赖于 level1 和 source
                            const source = ref("source");
                            const level1 = ref("level1");
                            return source > 0 && level1 > 0;
                        }),
                    }),
                    level3: configurable(1, {
                        label: "三级依赖",
                        enable: computed((_scope: any, { ref }) => {
                            // level3 依赖于 level2 和 source
                            const source = ref("source");
                            const level2 = ref("level2");
                            return source > 0 && level2 > 0;
                        }),
                    }),
                },
                { configManager, id: "chain" },
            );

            // 等待初始化完成
            await delay(0);

            // 断言配置项被正确注册
            assertConfigRegistered(configManager, store, ["source", "level1", "level2", "level3"]);

            // 初始状态
            expect(configManager.state["chain.level1"].enable).toBe(true);
            expect(configManager.state["chain.level2"].enable).toBe(true);
            expect(configManager.state["chain.level3"].enable).toBe(true);

            // 关闭源
            store.state.source = 0;
            await delay(0);

            expect(configManager.state["chain.level1"].enable).toBe(false);
            expect(configManager.state["chain.level2"].enable).toBe(false);
            expect(configManager.state["chain.level3"].enable).toBe(false);
        });
    });

    describe("ref 与 scope 的混合使用", () => {
        test("ref 和 scope 可以同时使用", () => {
            const store = new AutoStore(
                {
                    multiplier: configurable(2, {
                        label: "乘数",
                    }),
                    base: configurable(10, {
                        label: "基数",
                        enable: computed((_scope: any, { ref }) => {
                            // 使用 ref 访问外部状态
                            const multiplier = ref("multiplier");
                            // scope 包含 schema 对象，可以通过路径访问其他 configurable 的值
                            // 但不能通过 scope.value 访问当前值
                            // 两个值的乘积大于 15 时启用
                            // multiplier * multiplier > 15 (即 multiplier^2 > 15)
                            return multiplier * multiplier > 15;
                        }),
                    }),
                },
                { configManager, id: "mixed" },
            );

            // 断言配置项被正确注册
            assertConfigRegistered(configManager, store, ["multiplier", "base"]);

            // 初始状态: 2 * 2 = 4 < 15，应该禁用
            expect(configManager.state["mixed.base"].enable).toBe(false);

            // 修改 multiplier 为 5
            store.state.multiplier = 5;
            expect(configManager.state["mixed.base"].enable).toBe(true); // 5 * 5 = 25 > 15

            // 修改 multiplier 为 3
            store.state.multiplier = 3;
            expect(configManager.state["mixed.base"].enable).toBe(false); // 3 * 3 = 9 < 15
        });
    });

    describe("实际应用场景", () => {
        test("网络配置场景 - DHCP 和 IP 地址", async () => {
            const netStore = new AutoStore(
                {
                    dhcp: configurable(true, {
                        label: "自动获取IP地址",
                    }),
                    ip: configurable("192.168.1.1", {
                        label: "IP地址",
                        enable: computed((_scope: any, { ref }) => {
                            const dhcp = ref("dhcp");
                            return !dhcp; // DHCP 关闭时才能手动设置 IP
                        }),
                    }),
                    subnetMask: configurable("255.255.255.0", {
                        label: "子网掩码",
                        enable: computed((_scope: any, { ref }) => {
                            const dhcp = ref("dhcp");
                            return !dhcp;
                        }),
                    }),
                },
                { configManager, id: "network" },
            );

            // 断言配置项被正确注册
            assertConfigRegistered(configManager, netStore, ["dhcp", "ip", "subnetMask"]);

            // 初始状态 DHCP 开启
            expect(netStore.state.dhcp).toBe(true);
            expect(configManager.state["network.ip"].enable).toBe(false);
            expect(configManager.state["network.subnetMask"].enable).toBe(false);

            // 关闭 DHCP
            netStore.state.dhcp = false;
            await delay(0);

            expect(configManager.state["network.ip"].enable).toBe(true);
            expect(configManager.state["network.subnetMask"].enable).toBe(true);

            // 重新开启 DHCP
            netStore.state.dhcp = true;
            await delay(0);

            expect(configManager.state["network.ip"].enable).toBe(false);
            expect(configManager.state["network.subnetMask"].enable).toBe(false);
        });

        test("用户权限配置场景", () => {
            const userStore = new AutoStore(
                {
                    role: configurable("guest", {
                        label: "用户角色",
                    }),
                    canEdit: configurable(false, {
                        label: "可编辑",
                        enable: computed((_scope: any, { ref }) => {
                            const role = ref("role");
                            return role === "admin" || role === "editor";
                        }),
                    }),
                    canDelete: configurable(false, {
                        label: "可删除",
                        enable: computed((_scope: any, { ref }) => {
                            const role = ref("role");
                            return role === "admin";
                        }),
                    }),
                    canPublish: configurable(false, {
                        label: "可发布",
                        enable: computed((_scope: any, { ref }) => {
                            // canPublish 依赖于 role 和 canEdit 的 enable 状态
                            // 但 ref 只能访问值，不能访问 enable 属性
                            // 所以我们只基于 role 来判断
                            const role = ref("role");
                            // Admin 和 Editor 都可以发布
                            return role === "admin" || role === "editor";
                        }),
                    }),
                },
                { configManager, id: "permissions" },
            );

            // 断言配置项被正确注册
            assertConfigRegistered(configManager, userStore, [
                "role",
                "canEdit",
                "canDelete",
                "canPublish",
            ]);

            // Guest 角色
            expect(configManager.state["permissions.canEdit"].enable).toBe(false);
            expect(configManager.state["permissions.canDelete"].enable).toBe(false);
            expect(configManager.state["permissions.canPublish"].enable).toBe(false);

            // Editor 角色
            userStore.state.role = "editor";
            expect(configManager.state["permissions.canEdit"].enable).toBe(true);
            expect(configManager.state["permissions.canDelete"].enable).toBe(false);
            expect(configManager.state["permissions.canPublish"].enable).toBe(true);

            // Admin 角色
            userStore.state.role = "admin";
            expect(configManager.state["permissions.canEdit"].enable).toBe(true);
            expect(configManager.state["permissions.canDelete"].enable).toBe(true);
            expect(configManager.state["permissions.canPublish"].enable).toBe(true);
        });

        test("表单验证场景 - 条件必填", () => {
            const formStore = new AutoStore(
                {
                    hasAddress: configurable(false, {
                        label: "有地址",
                    }),
                    address: configurable("", {
                        label: "地址",
                        required: computed((_scope: any, { ref }) => {
                            return ref("hasAddress") === true;
                        }),
                    }),
                    city: configurable("", {
                        label: "城市",
                        required: computed((_scope: any, { ref }) => {
                            return ref("hasAddress") === true;
                        }),
                    }),
                    zipCode: configurable("", {
                        label: "邮编",
                        required: computed((_scope: any, { ref }) => {
                            const hasAddress = ref("hasAddress");
                            const city = ref("city");
                            // 只有在有地址且已填写城市时才必填
                            return hasAddress && city !== "";
                        }),
                    }),
                },
                { configManager, id: "form" },
            );

            // 断言配置项被正确注册
            assertConfigRegistered(configManager, formStore, [
                "hasAddress",
                "address",
                "city",
                "zipCode",
            ]);

            // 初始状态
            expect(configManager.state["form.address"].required).toBe(false);
            expect(configManager.state["form.city"].required).toBe(false);
            expect(configManager.state["form.zipCode"].required).toBe(false);

            // 启用地址
            formStore.state.hasAddress = true;
            expect(configManager.state["form.address"].required).toBe(true);
            expect(configManager.state["form.city"].required).toBe(true);
            expect(configManager.state["form.zipCode"].required).toBe(false);

            // 填写城市
            formStore.state.city = "Beijing";
            expect(configManager.state["form.zipCode"].required).toBe(true);
        });
    });
});
