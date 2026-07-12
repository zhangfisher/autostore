/// <reference types="bun" />
import { describe, test, expect } from "bun:test";
import { AutoStore } from "autostore";
import { resetable } from "../resetable";

describe("resetable 插件", () => {
    test("启用后记录首次变化前的旧值，reset 可恢复", () => {
        const store = new AutoStore({
            count: 1,
            name: "tom",
        });
        resetable(store);
        store.resetable = true;

        store.state.count = 100;
        store.state.name = "jerry";

        expect(store.state.count).toBe(100);
        expect(store.state.name).toBe("jerry");

        const keys = Object.keys(store.updatedState!);
        expect(keys.length).toBe(2);
        expect(keys).toContain("count");
        expect(keys).toContain("name");

        store.reset();

        expect(store.state.count).toBe(1);
        expect(store.state.name).toBe("tom");
    });

    test("同一路径多次修改仅记录首次变化前的旧值", () => {
        const store = new AutoStore({ count: 1 });
        resetable(store);
        store.resetable = true;

        store.state.count = 2;
        store.state.count = 3;
        store.state.count = 4;

        store.reset();
        // 恢复到首次变化前的 1，而非中间值 2/3
        expect(store.state.count).toBe(1);
    });

    test("reset 可重复调用保持幂等", () => {
        const store = new AutoStore({ count: 1 });
        resetable(store);
        store.resetable = true;

        store.state.count = 100;
        store.reset();
        expect(store.state.count).toBe(1);

        // 再次 reset 不抛错且值不变
        expect(() => store.reset()).not.toThrow();
        expect(store.state.count).toBe(1);
    });

    test("reset(entry) 仅重置指定路径前缀下的变化", () => {
        const store = new AutoStore({
            user: { name: "tom", age: 18 },
            count: 1,
        });
        resetable(store);
        store.resetable = true;

        store.state.user.name = "jerry";
        store.state.user.age = 20;
        store.state.count = 100;

        store.reset("user");

        expect(store.state.user.name).toBe("tom");
        expect(store.state.user.age).toBe(18);
        // 不在 entry 前缀下的路径保持不变
        expect(store.state.count).toBe(100);
    });

    test("计算属性路径不被记录，reset 后自动重算", () => {
        const store = new AutoStore({
            price: 10,
            count: 2,
            total: (scope: any) => scope.price * scope.count,
        });
        resetable(store);
        store.resetable = true;

        expect(store.state.total).toBe(20);

        store.state.price = 20;
        expect(store.state.total).toBe(40);

        // 计算属性 observer 的内部路径以 # 开头，不应被记录
        const keys = Object.keys(store.updatedState!);
        expect(keys.every((k) => !k.startsWith("#"))).toBe(true);

        store.reset();
        expect(store.state.price).toBe(10);
        expect(store.state.total).toBe(20);
    });

    test("关闭 resetable 会清理侦听器并清空记录", () => {
        const store = new AutoStore({ count: 1 });
        resetable(store);
        store.resetable = true;

        store.state.count = 100;
        expect(Object.keys(store.updatedState!).length).toBe(1);

        store.resetable = false;
        expect(store.updatedState).toEqual({});

        // 关闭后再修改不再记录
        store.state.count = 200;
        expect(Object.keys(store.updatedState!).length).toBe(0);
    });

    test("默认 resetable = true ", () => {
        const store = new AutoStore({ count: 1 });
        resetable(store);
        // 未执行 store.resetable = true
        store.state.count = 100;

        expect(() => store.reset()).not.toThrow();
        expect(store.state.count).toBe(1);
    });

    test("resetable(store) 入口：options.resetable=true 时自动启用", () => {
        const store = new AutoStore({ count: 1 }, { resetable: true } as any);
        resetable(store);

        store.state.count = 100;
        store.reset();
        expect(store.state.count).toBe(1);
    });

    test("对同一个 store 重复调用 resetable(store) 安全", () => {
        const store = new AutoStore({ count: 1 });
        resetable(store);
        // 再次注入不应破坏已有能力
        expect(() => resetable(store)).not.toThrow();

        store.resetable = true;
        store.state.count = 100;
        store.reset();
        expect(store.state.count).toBe(1);
    });

    test("reset 事件在重置状态时触发", async () => {
        let resetEventFired = false;
        let resetPath: string | undefined;

        const store = new AutoStore(
            {
                user: {
                    name: "John",
                    age: 30,
                },
                count: 1,
            },
            {
                plugins: [resetable],
            },
        );

        store.on("reset", (path) => {
            resetEventFired = true;
            resetPath = path;
        });

        // 修改状态
        store.state.user.name = "Jane";
        store.state.count = 10;

        // 重置整个状态
        store.reset();
        expect(resetEventFired).toBe(true);
        expect(resetPath).toBeUndefined();
        expect(store.state.user.name).toBe("John");
        expect(store.state.count).toBe(1); // count 重置为初始值

        // 修改状态
        store.state.user.name = "Bob";
        store.state.count = 20;
        resetEventFired = false;

        // 重置特定路径
        store.reset("user");

        expect(resetEventFired).toBe(true);
        expect(resetPath).toBe("user");
        expect(store.state.user.name).toBe("John");
        expect(store.state.count).toBe(20); // count 未被重置
    });
});
