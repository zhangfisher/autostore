import { describe, test, expect } from "bun:test";
import { AutoStore, computed, TimeoutError } from "../";

/**
 * AutoStore.get 方法单元测试
 *
 * get 根据路径读取状态值，包含以下分支：
 *  1. 普通路径：直接经 getVal 取值，路径不存在时返回 defaultValue
 *  2. 同步计算属性：返回 computedObject.getValue()（async === false，始终不走等待逻辑）
 *  3. 异步计算属性：
 *     - running=false 或 waitAsyncDone=false：直接返回当前值
 *     - running=true 且 waitAsyncDone=true：返回 Promise，等待计算完成后 resolve
 *     - 上述情况下指定 timeout：超时后 reject TimeoutError
 */

/**
 * 轮询等待条件成立，避免依赖固定延时带来的时序不稳定。
 */
function waitFor(cond: () => boolean, timeout = 1000, interval = 5): Promise<void> {
    return new Promise((resolve, reject) => {
        const start = Date.now();
        const tick = () => {
            try {
                if (cond()) return resolve();
            } catch (e) {
                return reject(e);
            }
            if (Date.now() - start > timeout) {
                return reject(new Error("waitFor 等待条件超时"));
            }
            setTimeout(tick, interval);
        };
        tick();
    });
}

describe("AutoStore.get 普通路径取值", () => {
    const store = new AutoStore({
        user: {
            name: "张三",
            age: 18,
            address: {
                city: "北京",
            },
        },
        list: [10, 20, 30],
        users: [
            { name: "张三", age: 18 },
            { name: "李四", age: 20 },
        ],
    });

    test("字符串路径读取顶层与嵌套值", () => {
        expect(store.get("user.name")).toBe("张三");
        expect(store.get("user.age")).toBe(18);
        expect(store.get("user.address.city")).toBe("北京");
    });

    test("数组路径与字符串路径读取结果一致", () => {
        expect(store.get("user.name")).toBe("张三");
        expect(store.get("user.address.city")).toBe("北京");
    });

    test("支持数组索引访问", () => {
        expect(store.get("list.0")).toBe(10);
        expect(store.get("list.2")).toBe(30);
        expect(store.get("users.1.name")).toBe("李四");
    });

    test("路径不存在时返回 undefined", () => {
        // @ts-ignore
        expect(store.get("user.notExist")).toBeUndefined();
        //@ts-ignore
        expect(store.get("a.b.c")).toBeUndefined();
    });

    test("路径不存在时返回 options.defaultValue", () => {
        //@ts-ignore
        expect(store.get("user.notExist", { defaultValue: "默认" })).toBe("默认");
        //@ts-ignore
        expect(store.get("a.b.c", { defaultValue: 0 })).toBe(0);
        // 中间路径段不存在时同样返回 defaultValue
        //@ts-ignore
        expect(store.get("x.y.z", { defaultValue: "兜底" })).toBe("兜底");
    });
});

describe("AutoStore.get 同步计算属性", () => {
    test("读取同步计算属性返回计算结果", () => {
        const store = new AutoStore({
            firstName: "zhang",
            lastName: "san",
            fullName: (scope: any) => scope.firstName + scope.lastName,
        });
        expect(store.get("fullName")).toBe("zhangsan");
    });

    test("读取嵌套对象的同步计算属性", () => {
        const store = new AutoStore({
            order: {
                price: 100,
                quantity: 2,
                total: (scope: any) => scope.price * scope.quantity,
            },
        });
        expect(store.get("order.total")).toBe(200);
    });

    test("waitAsyncDone 对同步计算属性无效，直接返回值", () => {
        const store = new AutoStore({
            a: 2,
            b: 3,
            sum: (scope: any) => scope.a + scope.b,
        });
        // 同步计算 async===false，始终走 getValue 分支，不会返回 Promise
        const result = store.get("sum", { waitAsyncDone: true });
        expect(result).toBe(5);
    });
});

describe("AutoStore.get 异步计算属性", () => {
    test("异步计算未运行时返回当前已计算的值", async () => {
        const store = new AutoStore({
            count: 3,
            // 默认 immediate=auto 且无 initial：创建后立即执行一次
            total: computed(async (scope) => scope.count * 2, ["count"], {
                id: "total",
            }),
        });

        // 等待首次异步计算完成
        await waitFor(() => store.get("total") === 6);

        const computedObject = store.computedObjects.find("total")!;
        expect(computedObject.async).toBe(true);
        expect(computedObject.running).toBe(false);
        expect(store.get("total")).toBe(6);
    });

    test("异步计算未运行时，即使 waitAsyncDone=true 也直接返回当前值", async () => {
        const store = new AutoStore({
            count: 3,
            total: computed(async (scope) => scope.count * 2, ["count"], {
                id: "total",
            }),
        });
        await waitFor(() => store.get("total") === 6);
        expect(store.computedObjects.find("total")!.running).toBe(false);

        // running=false：不会进入 Promise 分支
        const result = store.get("total", { waitAsyncDone: true });
        expect(result).toBe(6);
    });

    test("异步计算运行中，不带 waitAsyncDone 时立即返回当前值（不等待）", async () => {
        let resolveGate!: () => void;
        const gate = new Promise<void>((resolve) => {
            resolveGate = resolve;
        });
        let entered = false;

        const store = new AutoStore({
            count: 3,
            total: computed(
                async (scope) => {
                    entered = true;
                    await gate;
                    return scope.count * 2;
                },
                ["count"],
                { id: "total", initial: 0 },
            ),
        });

        // 提供 initial 后默认不会立即执行，改变依赖触发计算
        store.state.count = 4;
        await waitFor(() => entered);

        const computedObject = store.computedObjects.find("total")!;
        expect(computedObject.running).toBe(true);

        // 不等待：直接返回当前值（initial=0），不阻塞
        expect(store.get("total")).toBe(0);

        // 释放 gate，避免悬挂的计算影响后续用例
        resolveGate();
    });

    test("异步计算运行中，get(waitAsyncDone) 等待完成并返回最终值", async () => {
        let resolveGate!: () => void;
        const gate = new Promise<void>((resolve) => {
            resolveGate = resolve;
        });
        let entered = false;

        const store = new AutoStore({
            count: 3,
            total: computed(
                async (scope) => {
                    entered = true;
                    await gate;
                    return scope.count * 2;
                },
                ["count"],
                { id: "total", initial: 0 },
            ),
        });

        // count 由 3 变为 4 触发依赖变更，进而执行异步计算
        store.state.count = 4;
        await waitFor(() => entered);
        expect(store.computedObjects.find("total")!.running).toBe(true);

        // 先注册 watcher，再释放 gate，确保监听早于完成
        const pending = store.get("total", { waitAsyncDone: true }) as Promise<any>;
        expect(pending).toBeInstanceOf(Promise);

        resolveGate();
        await expect(pending).resolves.toBe(8);
    });

    test("异步计算运行中，get(waitAsyncDone, timeout) 超时抛出 TimeoutError", async () => {
        // 永不 resolve 的 gate，使计算一直处于 running
        const gate = new Promise<void>(() => {});
        let entered = false;

        const store = new AutoStore({
            count: 3,
            total: computed(
                async (scope) => {
                    entered = true;
                    await gate;
                    return scope.count * 2;
                },
                ["count"],
                { id: "total", initial: 0 },
            ),
        });

        store.state.count = 4;
        await waitFor(() => entered);
        expect(store.computedObjects.find("total")!.running).toBe(true);

        await expect(
            store.get("total", { waitAsyncDone: true, timeout: 50 }),
        ).rejects.toBeInstanceOf(TimeoutError);
    });
});
