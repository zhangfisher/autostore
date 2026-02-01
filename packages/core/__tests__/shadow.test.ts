import { describe, test, expect } from "bun:test";
import { AutoStore, computed, createShadow } from "../src";

const delay = (ms: number = 100) => new Promise((resolve) => setTimeout(resolve, ms));

describe("Shadow Store基本功能", () => {
    test("创建Shadow store的同步计算属性", () => {
        const store = new AutoStore({
            order: {
                price: 10,
                count: 3,
                total: computed((scope: any) => scope.price * scope.count),
            },
        });
        const shadowStore = createShadow(store, {
            orderTotal: computed((scope: any) => {
                return scope.order.price * scope.order.count;
            }),
        });
        expect(shadowStore.state.orderTotal).toBe(30);
        store.state.order.count = 4;
        expect(shadowStore.state.orderTotal).toBe(40);
    });

    test("通过store.shadow方法创建Shadow store", () => {
        const store = new AutoStore({
            price: 10,
            count: 3,
        });
        const shadowStore = store.shadow({
            total: computed((scope: any) => scope.price * scope.count),
        });
        expect(shadowStore.state.total).toBe(30);
        store.state.count = 4;
        expect(shadowStore.state.total).toBe(40);
    });

    test("Shadow store不会影响原store的状态", () => {
        const store = new AutoStore({
            price: 10,
            count: 3,
        });
        const shadowStore = store.shadow({
            total: computed((scope: any) => scope.price * scope.count),
        });
        expect(shadowStore.state.total).toBe(30);
        // shadowStore没有price和count属性
        expect("price" in shadowStore.state).toBe(false);
        expect("count" in shadowStore.state).toBe(false);
        // 原store不受影响
        expect(store.state.price).toBe(10);
        expect(store.state.count).toBe(3);
    });

    test("Shadow store的ID基于原store", () => {
        const store = new AutoStore({ price: 10 });
        const shadowStore = store.shadow({
            total: computed((scope: any) => scope.price * 2),
        });
        expect(shadowStore.id).toBe(`${store.id}_shadow`);
        expect(shadowStore.options.shadow).toBe(true);
    });

    test("可以创建多个独立的Shadow store", () => {
        const store = new AutoStore({
            price: 10,
            count: 3,
        });
        const shadowStore1 = store.shadow({
            total: computed((scope: any) => scope.price * scope.count),
        });
        const shadowStore2 = store.shadow({
            doublePrice: computed((scope: any) => scope.price * 2),
        });
        expect(shadowStore1.state.total).toBe(30);
        expect(shadowStore2.state.doublePrice).toBe(20);
        store.state.price = 20;
        expect(shadowStore1.state.total).toBe(60);
        expect(shadowStore2.state.doublePrice).toBe(40);
    });
});

describe("Shadow Store同步计算属性", () => {
    test("多个同步计算属性", () => {
        const store = new AutoStore({
            a: 1,
            b: 2,
            c: 3,
        });
        const shadowStore = store.shadow({
            sum: computed((scope: any) => scope.a + scope.b + scope.c),
            product: computed((scope: any) => scope.a * scope.b * scope.c),
            average: computed((scope: any) => (scope.a + scope.b + scope.c) / 3),
        });
        expect(shadowStore.state.sum).toBe(6);
        expect(shadowStore.state.product).toBe(6);
        expect(shadowStore.state.average).toBe(2);
        store.state.a = 2;
        expect(shadowStore.state.sum).toBe(7);
        expect(shadowStore.state.product).toBe(12);
        expect(shadowStore.state.average).toBeCloseTo(2.33, 2);
    });

    test("嵌套同步计算属性", () => {
        const store = new AutoStore({
            order: {
                price: 10,
                count: 3,
                discount: 0.9,
            },
        });
        const shadowStore = store.shadow({
            subtotal: computed((scope: any) => scope.order.price * scope.order.count),
            discountAmount: computed((scope: any) => {
                return scope.order.price * scope.order.count * (1 - scope.order.discount);
            }),
            final: computed((scope: any) => {
                const subtotal = scope.order.price * scope.order.count;
                return subtotal * scope.order.discount;
            }),
        });
        expect(shadowStore.state.subtotal).toBe(30);
        expect(shadowStore.state.discountAmount).toBeCloseTo(3, 5);
        expect(shadowStore.state.final).toBeCloseTo(27, 5);
        store.state.order.discount = 0.8;
        expect(shadowStore.state.final).toBe(24);
    });

    test("链式依赖的同步计算属性", () => {
        const store = new AutoStore({
            user: {
                firstName: "zhang",
                lastName: "fisher",
            },
        });
        // Shadow store的计算属性只能访问原store的状态
        // 不能像原store那样访问其他shadow store的计算属性
        const shadowStore = store.shadow({
            fullName: computed((scope: any) => `${scope.user.firstName} ${scope.user.lastName}`),
            greet: computed((scope: any) => `Hello, ${scope.user.firstName} ${scope.user.lastName}`),
            shout: computed((scope: any) => `Hello, ${scope.user.firstName} ${scope.user.lastName}!!!`),
        });
        expect(shadowStore.state.fullName).toBe("zhang fisher");
        expect(shadowStore.state.greet).toBe("Hello, zhang fisher");
        expect(shadowStore.state.shout).toBe("Hello, zhang fisher!!!");
        store.state.user.firstName = "li";
        expect(shadowStore.state.fullName).toBe("li fisher");
        expect(shadowStore.state.greet).toBe("Hello, li fisher");
        expect(shadowStore.state.shout).toBe("Hello, li fisher!!!");
    });

    test("同步计算属性的启用和禁用", () => {
        const store = new AutoStore({
            price: 10,
            count: 3,
        });
        const shadowStore = store.shadow({
            total: computed(
                (scope: any) => scope.price * scope.count,
                { id: "total", enable: false },
            ),
        });
        expect(shadowStore.state.total).toBe(30);
        store.state.count = 4;
        // 禁用状态下不会重新计算
        expect(shadowStore.state.total).toBe(30);
        // 启用后重新计算
        const computedObj = shadowStore.computedObjects.get("total")!;
        computedObj.enable = true;
        store.state.count = 5;
        expect(shadowStore.state.total).toBe(50);
    });

    test("Shadow store的计算属性可以访问原store的嵌套数据", () => {
        const store = new AutoStore({
            data: {
                users: [
                    { id: 1, name: "Alice", age: 25 },
                    { id: 2, name: "Bob", age: 30 },
                    { id: 3, name: "Charlie", age: 35 },
                ],
            },
        });
        const shadowStore = store.shadow({
            userCount: computed((scope: any) => scope.data.users.length),
            avgAge: computed((scope: any) => {
                const total = scope.data.users.reduce((sum: number, user: any) => sum + user.age, 0);
                return total / scope.data.users.length;
            }),
        });
        expect(shadowStore.state.userCount).toBe(3);
        expect(shadowStore.state.avgAge).toBe(30);
        store.state.data.users.push({ id: 4, name: "David", age: 40 });
        expect(shadowStore.state.userCount).toBe(4);
        expect(shadowStore.state.avgAge).toBe(32.5);
    });
});

describe("Shadow Store异步计算属性", () => {
    test("创建异步计算属性", async () => {
        const store = new AutoStore({
            price: 10,
            count: 3,
        });
        const shadowStore = store.shadow({
            total: computed(
                async (scope: any) => {
                    await delay(50);
                    return scope.price * scope.count;
                },
                ["price", "count"],
            ),
        });
        await delay(100);
        expect(shadowStore.state.total.value).toBe(30);
        store.state.count = 4;
        await delay(100);
        expect(shadowStore.state.total.value).toBe(40);
    });

    test("异步计算属性的状态", async () => {
        let computeCount = 0;
        const store = new AutoStore({
            userId: 1,
        });
        const shadowStore = store.shadow({
            userInfo: computed(
                async (scope: any) => {
                    computeCount++;
                    await delay(50);
                    return { id: scope.userId, name: `User${scope.userId}` };
                },
                ["userId"],
            ),
        });
        // 初始状态
        expect(shadowStore.state.userInfo.value).toBeUndefined();
        await delay(100);
        expect(computeCount).toBe(1);
        expect(shadowStore.state.userInfo.value).toEqual({ id: 1, name: "User1" });
        store.state.userId = 2;
        await delay(100);
        expect(computeCount).toBe(2);
        expect(shadowStore.state.userInfo.value).toEqual({ id: 2, name: "User2" });
    });

    test("异步计算属性的immediate选项", async () => {
        let count = 0;
        const store = new AutoStore({
            price: 10,
        });
        const shadowStore = store.shadow({
            total: computed(
                async (scope: any) => {
                    count++;
                    await delay(50);
                    return scope.price * 2;
                },
                ["price"],
                { immediate: false },
            ),
        });
        await delay(100);
        // immediate为false时，不会立即执行
        expect(count).toBe(0);
        store.state.price = 20;
        await delay(100);
        // 依赖变化后执行
        expect(count).toBe(1);
        expect(shadowStore.state.total.value).toBe(40);
    });

    test("异步计算属性的initial值", async () => {
        let count = 0;
        const store = new AutoStore({
            price: 10,
        });
        const shadowStore = store.shadow({
            total: computed(
                async (scope: any) => {
                    count++;
                    await delay(50);
                    return scope.price * 2;
                },
                ["price"],
                { initial: 100 },
            ),
        });
        // 有initial值时，不会立即执行
        expect(shadowStore.state.total.value).toBe(100);
        await delay(100);
        expect(count).toBe(0);
        store.state.price = 20;
        await delay(100);
        expect(count).toBe(1);
        expect(shadowStore.state.total.value).toBe(40);
    });
});

describe("Shadow Store的watch功能", () => {
    test("监听Shadow store的同步计算属性", () => {
        const store = new AutoStore({
            order: {
                price: 10,
                count: 3,
            },
        });
        const shadowStore = store.shadow({
            orderTotal: computed((scope) => {
                return scope.order.price * scope.order.count;
            }),
        });
        const values: any[] = [];
        shadowStore.watch("orderTotal", (operate) => {
            values.push(operate.value);
        });
        expect(shadowStore.state.orderTotal).toBe(30);
        store.state.order.count = 4;
        expect(shadowStore.state.orderTotal).toBe(40);
        expect(values).toEqual([40]);
    });

    test("监听原store的数据变化", () => {
        const store = new AutoStore({
            items: [1, 2, 3],
        });
        const shadowStore = store.shadow({
            itemCount: computed((scope: any) => scope.items.length),
            itemSum: computed((scope: any) => scope.items.reduce((a: number, b: number) => a + b, 0)),
        });
        const countChanges: number[] = [];
        const sumChanges: number[] = [];
        shadowStore.watch("itemCount", (op) => countChanges.push(op.value));
        shadowStore.watch("itemSum", (op) => sumChanges.push(op.value));
        expect(shadowStore.state.itemCount).toBe(3);
        expect(shadowStore.state.itemSum).toBe(6);
        store.state.items.push(4);
        expect(shadowStore.state.itemCount).toBe(4);
        expect(shadowStore.state.itemSum).toBe(10);
        expect(countChanges).toEqual([4]);
        expect(sumChanges).toEqual([10]);
    });

    test("Shadow store的watch可以监听原store的变化", () => {
        return new Promise<void>((resolve) => {
            const store = new AutoStore({
                user: {
                    name: "zhang",
                },
            });
            const shadowStore = store.shadow({
                displayName: computed((scope: any) => `User: ${scope.user.name}`),
            });
            const results: string[] = [];
            shadowStore.watch("displayName", (operate) => {
                results.push(operate.value);
                if (results.length === 2) {
                    expect(results).toEqual(["User: li", "User: wang"]);
                    resolve();
                }
            });
            // 初始化时也会触发一次
            expect(shadowStore.state.displayName).toBe("User: zhang");
            store.state.user.name = "li";
            expect(shadowStore.state.displayName).toBe("User: li");
            store.state.user.name = "wang";
            expect(shadowStore.state.displayName).toBe("User: wang");
        });
    });
});

describe("Shadow Store的复杂场景", () => {
    test("多个Shadow store可以同时监听原store", () => {
        const store = new AutoStore({
            price: 10,
            count: 3,
        });
        const shadowStore1 = store.shadow({
            total: computed((scope: any) => scope.price * scope.count),
        });
        const shadowStore2 = store.shadow({
            average: computed((scope: any) => (scope.price + scope.count) / 2),
        });
        const shadowStore3 = store.shadow({
            diff: computed((scope: any) => scope.price - scope.count),
        });
        expect(shadowStore1.state.total).toBe(30);
        expect(shadowStore2.state.average).toBe(6.5);
        expect(shadowStore3.state.diff).toBe(7);
        store.state.price = 20;
        store.state.count = 5;
        expect(shadowStore1.state.total).toBe(100);
        expect(shadowStore2.state.average).toBe(12.5);
        expect(shadowStore3.state.diff).toBe(15);
    });

    test("Shadow store的计算属性可以同时使用同步和异步", async () => {
        const store = new AutoStore({
            base: 10,
            rate: 1.5,
        });
        const shadowStore = store.shadow({
            syncValue: computed((scope: any) => scope.base * scope.rate),
            asyncValue: computed(
                async (scope: any) => {
                    await delay(50);
                    return scope.base * scope.rate * 2;
                },
                ["base", "rate"],
            ),
        });
        // 同步立即可用
        expect(shadowStore.state.syncValue).toBe(15);
        // 异步需要等待
        await delay(100);
        expect(shadowStore.state.asyncValue.value).toBe(30);
        store.state.base = 20;
        expect(shadowStore.state.syncValue).toBe(30);
        await delay(100);
        expect(shadowStore.state.asyncValue.value).toBe(60);
    });

    test("Shadow store和原store都可以有computed", () => {
        const store = new AutoStore({
            price: 10,
            count: 3,
            total: computed((scope: any) => scope.price * scope.count),
        });
        const shadowStore = store.shadow({
            discountedTotal: computed((scope: any) => scope.total * 0.9),
            tax: computed((scope: any) => scope.total * 0.1),
        });
        expect(store.state.total).toBe(30);
        expect(shadowStore.state.discountedTotal).toBe(27);
        expect(shadowStore.state.tax).toBe(3);
        store.state.price = 20;
        expect(store.state.total).toBe(60);
        expect(shadowStore.state.discountedTotal).toBe(54);
        expect(shadowStore.state.tax).toBe(6);
    });

    test("Shadow store可以使用update方法", () => {
        const store = new AutoStore({
            base: 10,
        });
        const shadowStore = store.shadow({
            doubled: computed((scope: any) => scope.base * 2),
            tripled: computed((scope: any) => scope.base * 3),
        });
        expect(shadowStore.state.doubled).toBe(20);
        expect(shadowStore.state.tripled).toBe(30);
        // 通过原store的update方法批量更新
        store.update((state) => {
            state.base = 20;
        });
        expect(shadowStore.state.doubled).toBe(40);
        expect(shadowStore.state.tripled).toBe(60);
    });
});
