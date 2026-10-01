/// <reference types="bun" />
import { describe, test, expect } from "bun:test";
import { AutoStore } from "autostore";

describe("resetable 插件", () => {
    test("启用后记录首次变化前的旧值，reset 可恢复", () => {
        const store = new AutoStore(
            {
                count: 1,
                name: "tom",
            },
            { resetable: true },
        );
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
        const store = new AutoStore({ count: 1 }, { resetable: true });

        store.resetable = true;

        store.state.count = 2;
        store.state.count = 3;
        store.state.count = 4;

        store.reset();
        // 恢复到首次变化前的 1，而非中间值 2/3
        expect(store.state.count).toBe(1);
    });

    test("reset 可重复调用保持幂等", () => {
        const store = new AutoStore({ count: 1 }, { resetable: true });

        store.resetable = true;

        store.state.count = 100;
        store.reset();
        expect(store.state.count).toBe(1);

        // 再次 reset 不抛错且值不变
        expect(() => store.reset()).not.toThrow();
        expect(store.state.count).toBe(1);
    });

    test("reset(entry) 仅重置指定路径前缀下的变化", () => {
        const store = new AutoStore(
            {
                user: { name: "tom", age: 18 },
                count: 1,
            },
            { resetable: true },
        );

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
        const store = new AutoStore(
            {
                price: 10,
                count: 2,
                total: (scope: any) => scope.price * scope.count,
            },
            { resetable: true },
        );

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
        const store = new AutoStore({ count: 1 }, { resetable: true });

        store.resetable = true;

        store.state.count = 100;
        expect(Object.keys(store.updatedState!).length).toBe(1);

        store.resetable = false;
        expect(store.updatedState).toEqual({});

        // 关闭后再修改不再记录
        store.state.count = 200;
        expect(Object.keys(store.updatedState!).length).toBe(0);
    });

    test("默认 resetable = false ", () => {
        const store = new AutoStore({ count: 1 }, { resetable: true });

        // 未执行 store.resetable = true
        store.state.count = 100;

        expect(() => store.reset()).not.toThrow();
        expect(store.state.count).toBe(1);
    });

    test("resetable(store) 入口：options.resetable=true 时自动启用", () => {
        const store = new AutoStore({ count: 1 }, { resetable: true } as any);

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
            { resetable: true },
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

describe("reset 基线模型：数组族操作", () => {
    /** 每个用例独立验证"数组还原为基线而非逆放操作" */
    const cases: [string, number[], (list: any) => void, number[]][] = [
        ["push", [1, 2, 3], (list) => list.push(4), [1, 2, 3]],
        ["pop", [1, 2, 3], (list) => list.pop(), [1, 2, 3]],
        ["shift", [1, 2, 3], (list) => list.shift(), [1, 2, 3]],
        ["unshift", [1, 2, 3], (list) => list.unshift(0), [1, 2, 3]],
        ["splice 删除", [1, 2, 3], (list) => list.splice(1, 1), [1, 2, 3]],
        ["splice 插入", [1, 2, 3], (list) => list.splice(1, 0, 9), [1, 2, 3]],
        ["splice 替换", [1, 2, 3], (list) => list.splice(1, 1, 9, 8), [1, 2, 3]],
        ["fill", [1, 2, 3], (list) => list.fill(0), [1, 2, 3]],
        ["单下标赋值", [1, 2, 3], (list) => (list[0] = 9), [1, 2, 3]],
        ["length 收缩", [1, 2, 3], (list) => (list.length = 1), [1, 2, 3]],
        ["length 扩张", [1, 2, 3], (list) => (list.length = 5), [1, 2, 3]],
        ["delete 下标", [1, 2, 3], (list) => delete list[1], [1, 2, 3]],
        ["sort", [3, 1, 2], (list) => list.sort(), [3, 1, 2]],
        ["reverse", [1, 2, 3], (list) => list.reverse(), [1, 2, 3]],
    ];

    for (const [name, initial, mutate, expected] of cases) {
        test(`${name} 后 reset 恢复基线数组`, () => {
            const store = new AutoStore({ list: [...initial] }, { resetable: true });

            mutate(store.state.list);
            expect(JSON.stringify(store.state.list)).not.toBe(JSON.stringify(expected));

            store.reset();

            expect(store.state.list).toEqual(expected);
        });
    }

    test("先改下标再 push，基线仍为最初的数组", () => {
        const store = new AutoStore({ list: [1, 2, 3] }, { resetable: true });

        store.state.list[0] = 9;
        store.state.list.push(4);

        // 只保留一条数组基线，不会因后续 push 而把已改动的数组当作基线
        expect(Object.keys(store.updatedState)).toEqual(["list"]);

        store.reset();
        expect(store.state.list).toEqual([1, 2, 3]);
    });

    test("数组元素被原地改后再 push，先还原元素再还原数组", () => {
        const store = new AutoStore({ list: [{ x: 1 }] }, { resetable: true });

        store.state.list.push({ x: 9 });
        store.state.list[0].x = 5;

        // 数组基线的元素表与活数组共享引用，故元素本身仍需单独记录
        expect(Object.keys(store.updatedState).sort()).toEqual(["list", "list.0.x"]);

        store.reset();
        expect(store.state.list).toEqual([{ x: 1 }]);
    });

    test("基线是变脏前的数组而非逆放操作：push 后 pop 回到原数组", () => {
        const store = new AutoStore({ list: [1, 2, 3] }, { resetable: true });

        store.state.list.push(4);
        store.state.list.pop();

        store.reset();
        expect(store.state.list).toEqual([1, 2, 3]);
    });
});

describe("reset 基线模型：键的存在性", () => {
    test("新增的键 reset 后消失", () => {
        const store = new AutoStore({ a: 1 } as any, { resetable: true });

        store.state.b = 99;
        expect(store.state.b).toBe(99);

        store.reset();

        expect("b" in store.state).toBe(false);
        expect(Object.keys(store.updatedState).length).toBe(0);
    });

    test("删除的键 reset 后恢复", () => {
        const store = new AutoStore({ a: 1, b: 2 }, { resetable: true });

        delete store.state.a;
        expect("a" in store.state).toBe(false);

        store.reset();

        expect(store.state.a).toBe(1);
    });

    test("键原本存在但值为 undefined，reset 后仍存在且为 undefined", () => {
        const store = new AutoStore({ a: undefined } as any, { resetable: true });

        store.state.a = 5;
        store.reset();

        expect("a" in store.state).toBe(true);
        expect(store.state.a).toBeUndefined();
    });

    test("原本不存在的父容器：赋值后再改子属性，reset 不抛异常且精确复原", () => {
        const store = new AutoStore({ a: 1 } as any, { resetable: true });

        store.state.user = { name: "x" };
        store.state.user.name = "y";
        store.state.user.age = 18;

        expect(() => store.reset()).not.toThrow();
        expect("user" in store.state).toBe(false);
        expect(store.state.a).toBe(1);
    });

    test("整体替换容器后 reset 恢复旧引用", () => {
        const store = new AutoStore({ user: { name: "tom" } }, { resetable: true });

        store.state.user = { name: "jerry" };
        store.reset();

        expect(store.state.user).toEqual({ name: "tom" });
    });

    test("含分隔符的 key：reset 不产生垃圾树", () => {
        const store = new AutoStore({ "a.b": { "c.d": 1 } } as any, { resetable: true });

        store.state["a.b"]["c.d"] = 9;
        store.reset();

        expect(store.state["a.b"]["c.d"]).toBe(1);
        // 不得凭空多出 "a" 这一层
        expect("a" in store.state).toBe(false);
        expect(Object.keys(store.state)).toEqual(["a.b"]);
    });
});

describe("reset：entry 匹配", () => {
    test("reset(entry) 命中整体替换的容器基线", () => {
        const store = new AutoStore({ count: 1 } as any, { resetable: true });

        store.state.user = { name: "x" };
        store.reset("user");

        expect("user" in store.state).toBe(false);
    });

    test("reset(entry) 不误伤同前缀的兄弟路径", () => {
        const store = new AutoStore({ username: "a", count: 1 }, { resetable: true });

        store.state.username = "b";
        store.state.count = 9;

        store.reset("user");

        expect(store.state.username).toBe("b");
        expect(store.state.count).toBe(9);
    });

    test("reset(entry) 未命中任何基线时静默无操作", () => {
        const store = new AutoStore({ count: 1 }, { resetable: true });

        store.state.count = 9;
        expect(() => store.reset("nothing.here")).not.toThrow();
        expect(store.state.count).toBe(9);
        // 未命中的 entry 不消费基线
        expect(Object.keys(store.updatedState)).toEqual(["count"]);
    });

    test("resetable 未启用时 reset 告警且不抛异常", () => {
        const store = new AutoStore({ count: 1 }, { resetable: false });

        store.state.count = 9;
        expect(() => store.reset()).not.toThrow();
        expect(store.state.count).toBe(9);
    });
});

describe("reset：计算属性不入表", () => {
    test("仅读取计算属性不产生基线", () => {
        const store = new AutoStore(
            { price: 10, total: (scope: any) => scope.price * 2 },
            { resetable: true },
        );

        store.state.price = 20;
        expect(store.state.total).toBe(40);

        // 计算属性每次重算都会写回，读一次即产生一次 set——不得因此变脏
        expect(Object.keys(store.updatedState)).toEqual(["price"]);
    });

    test("用户直接写计算属性路径不入表", () => {
        const store = new AutoStore(
            { price: 10, total: (scope: any) => scope.price * 2 },
            { resetable: true },
        );

        store.state.price = 20;
        store.state.total = 999;

        expect(Object.keys(store.updatedState)).toEqual(["price"]);

        store.reset();
        expect(store.state.price).toBe(10);
        expect(store.state.total).toBe(20);
    });
});

describe("resetable 生命周期", () => {
    test("resetable=false 完全不记录", () => {
        const store = new AutoStore({ count: 1 }, { resetable: false });

        store.state.count = 100;
        store.state.list = [1];

        expect(Object.keys(store.updatedState)).toEqual([]);
    });

    test("[] 与 false 等价：禁用", () => {
        const store = new AutoStore({ count: 1 }, { resetable: [] });

        store.state.count = 100;
        expect(Object.keys(store.updatedState)).toEqual([]);
        expect(() => store.reset()).not.toThrow();
        expect(store.state.count).toBe(100);
    });

    test("可从 false 重新启用（setter 双向生效）", () => {
        const store = new AutoStore({ count: 1 }, { resetable: false });

        store.state.count = 100;
        expect(Object.keys(store.updatedState)).toEqual([]);

        store.resetable = true;
        expect(store.resetable).toBe(true);

        store.state.count = 200;
        expect(Object.keys(store.updatedState)).toEqual(["count"]);

        store.reset();
        // 基线自启用那一刻起算——启用前的变更不在可还原范围内
        expect(store.state.count).toBe(100);
    });

    test("切换配置会清空已有基线（适用集已变）", () => {
        const store = new AutoStore({ a: 1, b: 2 }, { resetable: true });

        store.state.a = 9;
        expect(Object.keys(store.updatedState)).toEqual(["a"]);

        store.resetable = ["b"];
        expect(Object.keys(store.updatedState)).toEqual([]);

        store.state.a = 10;
        expect(Object.keys(store.updatedState)).toEqual([]);

        store.state.b = 20;
        expect(Object.keys(store.updatedState)).toEqual(["b"]);
    });

    test("resetable getter 返回规则副本，外部改动不绕过 configure", () => {
        const rules = ["!a"];
        const store = new AutoStore({ a: 1, b: 2 }, { resetable: rules });

        const got = store.resetable as string[];
        expect(got).toEqual(["!a"]);
        expect(got).not.toBe(rules);

        got.push("!b");
        store.state.b = 9;
        expect(Object.keys(store.updatedState)).toEqual(["b"]);
    });

    test("destroy 清空基线并解引用旧状态", () => {
        const store = new AutoStore({ user: { name: "tom" } }, { resetable: true });

        store.state.user = { name: "jerry" };
        expect(Object.keys(store.updatedState)).toEqual(["user"]);

        store.destroy();
        expect(Object.keys(store.updatedState)).toEqual([]);
    });

    test("reset 幂等：重复调用不抛错且状态不变", () => {
        const store = new AutoStore({ list: [1, 2] }, { resetable: true });

        store.state.list.push(3);
        store.reset();
        expect(store.state.list).toEqual([1, 2]);

        expect(() => store.reset()).not.toThrow();
        expect(store.state.list).toEqual([1, 2]);
    });
});

describe("重置范围规则", () => {
    test("true：全部路径可重置", () => {
        const store = new AutoStore({ a: 1, u: { b: 2 } }, { resetable: true });

        store.state.a = 9;
        store.state.u.b = 9;

        expect(Object.keys(store.updatedState).sort()).toEqual(["a", "u.b"]);
    });

    test("['!x']：只有排除规则，零命中默认可重置", () => {
        const store = new AutoStore(
            { user: { name: "t" }, orders: { total: 1, items: [1] } },
            { resetable: ["!orders.items"] },
        );

        store.state.user.name = "x";
        store.state.orders.total = 9;
        store.state.orders.items.push(2);

        expect(Object.keys(store.updatedState).sort()).toEqual([
            "orders.total",
            "user.name",
        ]);

        store.reset();
        expect(store.state.user.name).toBe("t");
        expect(store.state.orders.total).toBe(1);
        // 排除路径的变更不被还原
        expect(store.state.orders.items).toEqual([1, 2]);
    });

    test("['x']：存在纳入规则，零命中默认不可重置", () => {
        const store = new AutoStore(
            { user: { name: "t" }, orders: { total: 1, items: [1] } },
            { resetable: ["orders.items"] },
        );

        store.state.user.name = "x";
        store.state.orders.total = 9;
        store.state.orders.items.push(2);

        expect(Object.keys(store.updatedState)).toEqual(["orders.items"]);

        store.reset();
        expect(store.state.user.name).toBe("x");
        expect(store.state.orders.total).toBe(9);
        expect(store.state.orders.items).toEqual([1]);
    });

    test("首匹配即止：靠前的纳入规则遮蔽靠后的排除规则", () => {
        const store = new AutoStore(
            { orders: { total: 1, items: [1] } },
            { resetable: ["orders", "!orders.items"] },
        );

        store.state.orders.total = 9;
        store.state.orders.items.push(2);

        // 规则 2 是死代码：orders 整棵子树都先被规则 1 命中
        expect(Object.keys(store.updatedState).sort()).toEqual([
            "orders.items",
            "orders.total",
        ]);

        store.reset();
        expect(store.state.orders.total).toBe(1);
        expect(store.state.orders.items).toEqual([1]);
    });

    test("排除规则在前时排除生效", () => {
        const store = new AutoStore(
            { orders: { total: 1, items: [1] } },
            { resetable: ["!orders.items", "orders"] },
        );

        store.state.orders.total = 9;
        store.state.orders.items.push(2);

        expect(Object.keys(store.updatedState)).toEqual(["orders.total"]);

        store.reset();
        expect(store.state.orders.total).toBe(1);
        expect(store.state.orders.items).toEqual([1, 2]);
    });

    test("容器基线不得吞掉被判为不可重置的后代（恢复期复算）", () => {
        const store = new AutoStore(
            { orders: { total: 5 } },
            { resetable: ["!orders.items", "orders"] },
        );

        // 整体替换 orders → 捕获 orders 的旧引用基线
        store.state.orders = { total: 9, items: [7] };
        expect(Object.keys(store.updatedState)).toEqual(["orders"]);

        store.reset();

        // 可重置的后代被还原
        expect(store.state.orders.total).toBe(5);
        // 不可重置的后代不被还原，也**不被整体写回顺带还原**
        expect(store.state.orders.items).toEqual([7]);
    });

    test("['**'] 含根：排除整棵树", () => {
        const store = new AutoStore({ a: { b: 1 }, list: [1] }, { resetable: ["!**"] });

        store.state.a.b = 9;
        store.state.list.push(2);

        expect(Object.keys(store.updatedState)).toEqual([]);
    });

    test("['!*'] 匹配顶层键及其子树", () => {
        const store = new AutoStore({ a: { b: 1 }, c: 2 }, { resetable: ["!*"] });

        store.state.a.b = 9;
        store.state.c = 9;

        expect(Object.keys(store.updatedState)).toEqual([]);
    });

    test("排除规则覆盖任意深度后代", () => {
        const store = new AutoStore(
            { orders: { items: [{ sku: "a", qty: 1 }] } },
            { resetable: ["!orders.items"] },
        );

        store.state.orders.items[0].qty = 9;
        expect(Object.keys(store.updatedState)).toEqual([]);
    });

    test("规则变更后恢复期复算：以新规则为准", () => {
        const store = new AutoStore({ a: 1, b: 2 }, { resetable: true });

        store.state.a = 9;
        store.state.b = 9;
        expect(Object.keys(store.updatedState).sort()).toEqual(["a", "b"]);

        // 换成只允许 a —— configure 会清空基线，故先重新制造
        store.resetable = ["a"];
        store.state.a = 10;
        store.state.b = 10;
        store.reset();

        expect(store.state.a).toBe(9);
        expect(store.state.b).toBe(10);
    });
});

describe("reset 效率：折叠为节点级写回", () => {
    test("容器基线吸收其后代，基线条目数不随叶子数增长", () => {
        const store = new AutoStore({ user: { a: 1, b: 2, c: 3 } }, { resetable: true });

        store.state.user = { a: 9, b: 9, c: 9 };
        store.state.user.a = 100;
        store.state.user.b = 100;
        store.state.user.c = 100;

        // 4 次变更只留 1 条基线
        expect(Object.keys(store.updatedState)).toEqual(["user"]);
    });

    test("还原一个容器只产生一次节点级写回", () => {
        const store = new AutoStore({ user: { a: 1, b: 2, c: 3 } }, { resetable: true });

        store.state.user = { a: 9, b: 9, c: 9 };

        let hits = 0;
        store.watch("user", () => hits++);

        store.reset();

        expect(hits).toBe(1);
        expect(store.state.user).toEqual({ a: 1, b: 2, c: 3 });
    });

    test("reset 自身不会产生新的基线", () => {
        const store = new AutoStore({ count: 1 }, { resetable: true });

        store.state.count = 9;
        store.reset();
        expect(Object.keys(store.updatedState)).toEqual([]);

        store.state.count = 8;
        store.reset();
        // 若 reset 自身被记录，第二次会还原成 9
        expect(store.state.count).toBe(1);
    });
});
