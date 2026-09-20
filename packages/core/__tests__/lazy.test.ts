import { describe, test, expect } from "bun:test";
import { AutoStore, computed } from "../";

/**
 * lazy 选项测试
 *
 * 当 lazy=true 时，所有计算属性（同步和异步）以及 watch 对象只有在读取时才会创建
 * 可以通过检查 store.computedObjects 和 store.watchObjects 来测试
 */

describe("lazy 选项", () => {
    test("lazy=false 时，同步计算属性在初始化时创建", () => {
        const store = new AutoStore(
            {
                firstName: "zhang",
                lastName: "san",
                fullName: (scope: any) => scope.firstName + scope.lastName,
            },
            { lazy: false },
        );

        // 计算对象应该已经被创建
        expect(store.computedObjects.size).toBe(1);
        expect(store.computedObjects.get("fullName")?.id).toBe("fullName");
    });

    test("lazy=true 时，同步计算属性在读取时才创建", () => {
        const store = new AutoStore(
            {
                firstName: "zhang",
                lastName: "san",
                fullName: (scope: any) => scope.firstName + scope.lastName,
            },
            { lazy: true },
        );

        // 初始时计算对象不应该被创建
        expect(store.computedObjects.size).toBe(0);

        // 读取计算属性后，计算对象应该被创建
        const fullName = store.state.fullName;
        expect(fullName).toBe("zhangsan");
        expect(store.computedObjects.size).toBe(1);
        expect(store.computedObjects.get("fullName")?.id).toBe("fullName");
    });

    test("lazy=true 时，多个同步计算属性按需创建", () => {
        const store = new AutoStore(
            {
                a: 1,
                b: 2,
                sum: (scope: any) => scope.a + scope.b,
                product: (scope: any) => scope.a * scope.b,
            },
            { lazy: true },
        );

        // 初始时不应该有计算对象
        expect(store.computedObjects.size).toBe(0);

        // 读取 sum，创建 sum 计算对象
        const sum = store.state.sum;
        expect(sum).toBe(3);
        expect(store.computedObjects.size).toBe(1);
        expect(store.computedObjects.get("sum")?.id).toBe("sum");

        // 读取 product，创建 product 计算对象
        const product = store.state.product;
        expect(product).toBe(2);
        expect(store.computedObjects.size).toBe(2);
        expect(store.computedObjects.get("product")?.id).toBe("product");
    });

    test("lazy=true 时，嵌套对象的计算属性按需创建", () => {
        const store = new AutoStore(
            {
                user: {
                    firstName: "zhang",
                    lastName: "san",
                    fullName: (scope: any) => scope.firstName + scope.lastName,
                },
                order: {
                    price: 100,
                    quantity: 2,
                    total: (scope: any) => scope.price * scope.quantity,
                },
            },
            { lazy: true },
        );

        // 初始时不应该有计算对象
        expect(store.computedObjects.size).toBe(0);

        // 读取 user.fullName
        const fullName = store.state.user.fullName;
        expect(fullName).toBe("zhangsan");
        expect(store.computedObjects.size).toBe(1);
        expect(store.computedObjects.get("user.fullName")?.id).toBe("user.fullName");

        // 读取 order.total
        const total = store.state.order.total;
        expect(total).toBe(200);
        expect(store.computedObjects.size).toBe(2);
        expect(store.computedObjects.get("order.total")?.id).toBe("order.total");
    });

    test.skip("lazy=true 时，异步计算属性在读取时才创建", async () => {
        let computeCount = 0;

        const store = new AutoStore(
            {
                count: 1,
                doubled: computed(
                    async (scope: any) => {
                        computeCount++;
                        return scope.count * 2;
                    },
                    ["count"],
                    { initial: 2 },
                ),
            },
            { lazy: true },
        );

        // 初始时不应该有计算对象
        expect(store.computedObjects.size).toBe(0);
        expect(computeCount).toBe(0);

        // 读取异步计算属性 
        // @ts-ignore
        const doubled = await store.get("doubled");
        expect(doubled).toBe(2);
        expect(store.computedObjects.size).toBe(1);
        expect(store.computedObjects.get("doubled")?.id).toBe("doubled");

        // 由于有 initial 值，第一次读取时不会执行计算
        expect(computeCount).toBe(0);
    });

    test.skip("lazy=true 时，异步计算属性无 initial 时也会延迟执行", async () => {
        let computeCount = 0;

        const store = new AutoStore(
            {
                count: 1,
                doubled: computed(
                    async (scope: any) => {
                        computeCount++;
                        await new Promise((resolve) => setTimeout(resolve, 10));
                        return scope.count * 2;
                    },
                    ["count"],
                ),
            },
            { lazy: true },
        );

        // 初始时不应该有计算对象
        expect(store.computedObjects.size).toBe(0);
        expect(computeCount).toBe(0);

        // 读取异步计算属性
             // @ts-ignore
        const promise = store.get("doubled");
        expect(store.computedObjects.size).toBe(1);
        const doubled = await promise;
        expect(store.computedObjects.get("doubled")?.id).toBe("doubled");

        // 等待异步计算完成
        await new Promise((resolve) => setTimeout(resolve, 20));
        expect(computeCount).toBeGreaterThanOrEqual(1);
    });

    test("lazy=true 时，computed() 包装的同步计算属性也延迟创建", () => {
        const store = new AutoStore(
            {
                a: 1,
                b: 2,
                sum: computed((scope: any) => scope.a + scope.b),
            },
            { lazy: true },
        );

        // 初始时不应该有计算对象
        expect(store.computedObjects.size).toBe(0);

        // 读取计算属性
        const sum = store.state.sum;
        expect(sum).toBe(3);
        expect(store.computedObjects.size).toBe(1);
    });

    test("lazy=true 时，不会触发 computed:created 事件直到读取", () => {
        let createdEventFired = false;
        const createdPaths: string[] = [];

        const store = new AutoStore(
            {
                a: 1,
                b: 2,
                sum: (scope: any) => scope.a + scope.b,
                product: (scope: any) => scope.a * scope.b,
            },
            {
                lazy: true,
                onObserverCreated({ observer: computedObject }) {
                    createdEventFired = true;
                    createdPaths.push(computedObject.path.join("."));
                },
            },
        );

        // 初始时不应触发事件
        expect(createdEventFired).toBe(false);
        expect(createdPaths.length).toBe(0);

        // 读取第一个计算属性
        store.state.sum;
        expect(createdEventFired).toBe(true);
        expect(createdPaths).toContain("sum");

        // 读取第二个计算属性
        store.state.product;
        expect(createdPaths).toContain("product");
        expect(createdPaths.length).toBe(2);
    });

    test("lazy=false (默认) 与 lazy=true 的行为对比", () => {
        // lazy=false (默认行为)
        const store1 = new AutoStore({
            a: 1,
            b: 2,
            sum: (scope: any) => scope.a + scope.b,
        });

        // 计算对象应该立即创建
        expect(store1.computedObjects.size).toBe(1);

        // lazy=true
        const store2 = new AutoStore(
            {
                a: 1,
                b: 2,
                sum: (scope: any) => scope.a + scope.b,
            },
            { lazy: true },
        );

        // 计算对象不应该立即创建
        expect(store2.computedObjects.size).toBe(0);

        // 读取后才创建
        store2.state.sum;
        expect(store2.computedObjects.size).toBe(1);
    });

   
});
