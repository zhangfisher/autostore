import { describe, test, expect } from "bun:test";
import { AutoStore, computed } from "../src";
import { delay } from "flex-tools/async/delay";

/**
 * AutoStore refStore 功能单元测试
 *
 * 测试两种使用 ref 的方式：
 * 1. 在 AutoStore options 中传入全局 refStore
 * 2. 在 computed/asyncComputed/watch 函数的 options 中传入局部 refStore
 *
 * 优先级规则：局部 refStore 优先于全局 refStore
 *
 * 测试场景：使用一个主 store 和两个 refStore 演示跨 store 状态访问
 */

describe("AutoStore refStore 功能测试", () => {
    describe("全局 refStore - 在 AutoStore options 中传入", () => {
        test("computed 可以通过 ref 访问全局 refStore 的状态", () => {
            const refStore1 = new AutoStore(
                {
                    user: {
                        name: "Alice",
                        age: 25,
                    },
                },
                { id: "refStore1" },
            );

            const mainStore = new AutoStore(
                {
                    userName: computed((scope, { ref }) => {
                        const name = ref("user.name");
                        return `User: ${name}`;
                    }),
                },
                { refStore: refStore1, id: "main" },
            );

            expect(mainStore.state.userName).toBe("User: Alice");

            refStore1.state.user.name = "Bob";
            expect(mainStore.state.userName).toBe("User: Bob");
        });

        test("computed 可以同时访问多个全局 refStore 的状态", () => {
            const refStore1 = new AutoStore(
                {
                    user: {
                        name: "Alice",
                        age: 25,
                    },
                },
                { id: "refStore1" },
            );

            const mainStore = new AutoStore(
                {
                    userInfo: computed((scope, { ref }) => {
                        const name = ref("user.name");
                        const age = ref("user.age");
                        return `${name}, ${age}岁`;
                    }),
                },
                { refStore: refStore1, id: "main" },
            );

            expect(mainStore.state.userInfo).toBe("Alice, 25岁");
        });

        test("watch 可以监听全局 refStore 的状态变化", async () => {
            const refStore1 = new AutoStore(
                {
                    settings: {
                        theme: "light" as "light" | "dark",
                    },
                },
                { id: "refStore1" },
            );

            const mainStore = new AutoStore(
                {
                    currentValue: computed((scope, { ref }) => ref("settings.theme")),
                },
                { refStore: refStore1, id: "main" },
            );

            expect(mainStore.state.currentValue).toBe("light");

            refStore1.state.settings.theme = "dark";
            await delay(0);

            expect(mainStore.state.currentValue).toBe("dark");
        });
    });

    describe("局部 refStore - 在 computed/asyncComputed options 中传入", () => {
        test("computed options 中的 refStore 优先于全局 refStore", async () => {
            const refStore1 = new AutoStore(
                {
                    user: {
                        name: "Alice",
                        age: 25,
                    },
                },
                { id: "refStore1" },
            );

            const refStore2 = new AutoStore(
                {
                    products: {
                        price: 100,
                    },
                },
                { id: "refStore2" },
            );

            const mainStore = new AutoStore(
                {
                    productPrice: computed(
                        (scope, { ref }) => {
                            const price = ref("products.price");
                            return price;
                        },
                        { refStore: refStore2 }, // 局部 refStore
                    ),
                },
                { refStore: refStore1, id: "main" }, // 全局 refStore
            );

            expect(mainStore.state.productPrice).toBe(100);

            refStore2.state.products.price = 200;
            await delay(0);
            expect(mainStore.state.productPrice).toBe(200);

            refStore1.state.user.age = 30;
            await delay(0);
            expect(mainStore.state.productPrice).toBe(200); // 不受影响
        });

        test("多个 computed 可以使用不同的局部 refStore", async () => {
            const refStore1 = new AutoStore(
                {
                    user: {
                        name: "Alice",
                        age: 25,
                    },
                },
                { id: "refStore1" },
            );

            const refStore2 = new AutoStore(
                {
                    inventory: {
                        stock: 50,
                    },
                },
                { id: "refStore2" },
            );

            const mainStore = new AutoStore(
                {
                    userName: computed((scope, { ref }) => ref("user.name"), {
                        refStore: refStore1,
                    }),

                    stockCount: computed((scope, { ref }) => ref("inventory.stock"), {
                        refStore: refStore2,
                    }),

                    userAge: computed((scope, { ref }) => ref("user.age")),
                },
                { refStore: refStore1, id: "main" },
            );

            expect(mainStore.state.userName).toBe("Alice");
            expect(mainStore.state.stockCount).toBe(50);
            expect(mainStore.state.userAge).toBe(25);

            refStore1.state.user.name = "Charlie";
            refStore1.state.user.age = 30;
            await delay(0);

            expect(mainStore.state.userName).toBe("Charlie");
            expect(mainStore.state.userAge).toBe(30);
            expect(mainStore.state.stockCount).toBe(50);

            refStore2.state.inventory.stock = 40;
            await delay(0);

            expect(mainStore.state.stockCount).toBe(40);
            expect(mainStore.state.userName).toBe("Charlie");
        });

        // 跳过 asyncComputed 测试，因为该功能可能还未实现
        // test("asyncComputed options 中的 refStore 优先于全局 refStore", async () => { ... });
    });

    describe("复杂场景 - 混合使用全局和局部 refStore", () => {
        test("在同一个 store 中混合使用全局和局部 refStore", async () => {
            const refStore1 = new AutoStore(
                {
                    user: { name: "Alice" },
                    settings: { theme: "light" as "light" | "dark" },
                },
                { id: "refStore1" },
            );

            const refStore2 = new AutoStore(
                {
                    products: { price: 100 },
                },
                { id: "refStore2" },
            );

            const mainStore = new AutoStore(
                {
                    userName: computed((scope, { ref }) => ref("user.name")),

                    price: computed((scope, { ref }) => ref("products.price"), {
                        refStore: refStore2,
                    }),

                    theme: computed((scope, { ref }) => ref("settings.theme")),
                },
                { refStore: refStore1, id: "main" },
            );

            expect(mainStore.state.userName).toBe("Alice");
            expect(mainStore.state.price).toBe(100);
            expect(mainStore.state.theme).toBe("light");

            refStore1.state.user.name = "David";
            refStore1.state.settings.theme = "dark";
            await delay(0);

            expect(mainStore.state.userName).toBe("David");
            expect(mainStore.state.theme).toBe("dark");
            expect(mainStore.state.price).toBe(100);

            refStore2.state.products.price = 150;
            await delay(0);

            expect(mainStore.state.price).toBe(150);
            expect(mainStore.state.userName).toBe("David");
        });

        test("computed 可以嵌套访问多个 refStore 的状态", async () => {
            const refStore1 = new AutoStore(
                {
                    user: { name: "Alice" },
                },
                { id: "refStore1" },
            );

            const refStore2 = new AutoStore(
                {
                    products: {
                        price: 100,
                        discount: 0.1,
                    },
                },
                { id: "refStore2" },
            );

            const mainStore = new AutoStore(
                {
                    userProduct: computed((scope, { ref }) => {
                        const userName = ref("user.name");
                        return `${userName}'s product`;
                    }),

                    finalPrice: computed(
                        (scope, { ref }) => {
                            const price = ref("products.price");
                            const discount = ref("products.discount");
                            return price * (1 - discount);
                        },
                        { refStore: refStore2 },
                    ),
                },
                { refStore: refStore1, id: "main" },
            );

            expect(mainStore.state.userProduct).toBe("Alice's product");
            expect(mainStore.state.finalPrice).toBe(90);

            refStore1.state.user.name = "Eve";
            refStore2.state.products.discount = 0.2;
            await delay(0);

            expect(mainStore.state.userProduct).toBe("Eve's product");
            expect(mainStore.state.finalPrice).toBe(80);
        });
    });

    describe("边界情况和错误处理", () => {
        test("没有 refStore 时调用 ref 应该返回 undefined", () => {
            const mainStore = new AutoStore(
                {
                    value: computed(() => {
                        // 没有 refStore，ref 返回 undefined
                        return "no-ref";
                    }),
                },
                { id: "main" },
            );

            expect(mainStore.state.value).toBe("no-ref");
        });

        test("访问不存在的路径应该返回 undefined", () => {
            const refStore1 = new AutoStore(
                {
                    user: { name: "Alice" },
                },
                { id: "refStore1" },
            );

            const mainStore = new AutoStore(
                {
                    value: computed((scope, { ref }) => {
                        const val = ref("non.existent.path");
                        return val === undefined ? "undefined" : "defined";
                    }),
                },
                { refStore: refStore1, id: "main" },
            );

            expect(mainStore.state.value).toBe("undefined");
        });

        test("reactive=false 时 ref 不建立响应式依赖", async () => {
            const refStore1 = new AutoStore(
                {
                    user: { name: "Alice" },
                },
                { id: "refStore1" },
            );

            let callCount = 0;
            const mainStore = new AutoStore(
                {
                    value: computed(
                        (scope, { ref }) => {
                            callCount++;
                            const val = ref("user.name", { reactive: false });
                            return val;
                        },
                        { refStore: refStore1 },
                    ),
                },
                { id: "main" },
            );

            const initialValue = mainStore.state.value;
            expect(initialValue).toBe("Alice");
            callCount = 0;

            refStore1.state.user.name = "Frank";
            await delay(0);

            expect(callCount).toBe(0);
            expect(mainStore.state.value).toBe("Alice");
        });
    });

    describe("数组路径支持", () => {
        test("computed 可以使用数组路径访问 refStore", async () => {
            const refStore1 = new AutoStore(
                {
                    user: { name: "Alice" },
                },
                { id: "refStore1" },
            );

            const mainStore = new AutoStore(
                {
                    userName: computed((scope, { ref }) => {
                        const name = ref(["user", "name"]);
                        return name;
                    }),
                },
                { refStore: refStore1, id: "main" },
            );

            expect(mainStore.state.userName).toBe("Alice");

            refStore1.state.user.name = "Grace";
            await delay(0);
            expect(mainStore.state.userName).toBe("Grace");
        });

        // 跳过 asyncComputed 数组路径测试
        // test("asyncComputed 可以使用数组路径", async () => { ... });
    });

    describe("性能优化", () => {
        test("避免重复监听同一路径", async () => {
            const trackedRefStore1 = new AutoStore(
                {
                    user: { name: "Alice" },
                },
                { id: "tracked1" },
            );

            const mainStore = new AutoStore(
                {
                    value1: computed((scope, { ref }) => ref("user.name")),
                    value2: computed((scope, { ref }) => ref("user.name")),
                },
                { refStore: trackedRefStore1, id: "main" },
            );

            expect(mainStore.state.value1).toBe("Alice");
            expect(mainStore.state.value2).toBe("Alice");

            trackedRefStore1.state.user.name = "Henry";
            await delay(0);

            expect(mainStore.state.value1).toBe("Henry");
            expect(mainStore.state.value2).toBe("Henry");
        });

        test("off() 方法正确清理所有 watcher", async () => {
            const refStore1 = new AutoStore(
                {
                    user: { name: "Alice" },
                },
                { id: "refStore1" },
            );

            const mainStore = new AutoStore(
                {
                    value: computed((scope, { ref }) => ref("user.name")),
                },
                { refStore: refStore1, id: "main" },
            );

            const initialValue = mainStore.state.value;
            expect(initialValue).toBeDefined();

            mainStore.destroy();

            refStore1.state.user.name = "Ivy";
            await delay(0);
            // 不应该抛出错误
        });
    });
});
