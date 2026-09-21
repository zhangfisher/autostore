import { describe, test, expect } from "bun:test";
import { AutoStore } from "../src";
import { shallow, isShallow } from "../src/decorators/shallow";
import { markRaw } from "../src/utils/markRaw";

describe("shallow 浅响应", () => {
    test("标记对象的顶层与直接子值读取产生事件，嵌套子值不再代理", () => {
        const store = new AutoStore({
            a: shallow({
                b: 1,
                c: { c1: 1 },
            }),
            x: [1, 2, 3],
        });
        const events: string[] = [];
        store.watch((e) => events.push(e.path.join(".")), { operates: "*" });

        // 顶层读取: 有事件
        store.state.a;
        // 直接子值: 有事件(浅代理的 get 陷阱正常工作)
        const b = store.state.a.b;
        expect(b).toBe(1);
        // 嵌套子值: c 为原始引用, 不再代理
        const c = store.state.a.c;
        const eventsBefore = events.length;
        const c1 = c.c1;
        expect(c1).toBe(1);
        expect(events.length).toBe(eventsBefore); // 读 c.c1 无事件

        // 事件序列: a 与 a.b 均被捕获
        expect(events).toContain("a");
        expect(events).toContain("a.b");
        // 标记仅作用于被标记对象: 普通路径 x 深代理照常
        store.state.x[1];
        expect(events).toContain("x");
        expect(events).toContain("x.1");
    });

    test("浅对象的原始子对象修改静默，整体替换与数组操作正常通知", () => {
        const store = new AutoStore({
            a: shallow({
                c: { c1: 1 },
            }),
        });
        const events: string[] = [];
        store.watch((e) => events.push(`${e.type}:${e.path.join(".")}`), { operates: "*" });

        // 原始子对象的内部修改: 静默无事件(Q5 核心取舍)
        const rawC = store.state.a.c; // 读取路径的 get 事件在此发生
        const before = events.length;
        rawC.c1 = 100;
        expect(events.length).toBe(before); // 写入静默
        expect(store.state.a.c.c1).toBe(100);

        // 浅对象自身属性的整体替换: 写事件正常通知(内部可能伴随读取事件, 只验证写路径)
        store.state.a.c = { c1: 2 };
        const writeEvents = events.slice(before).filter((e) => e.startsWith("set"));
        expect(writeEvents).toEqual(["set:a.c"]);
        expect(store.state.a.c.c1).toBe(2);

        // 浅数组的方法操作: insert/remove 照常
        const arrStore = new AutoStore({ items: shallow([{ id: 1 }, { id: 2 }]) });
        const arrEvents: string[] = [];
        arrStore.watch((e) => arrEvents.push(`${e.type}:${e.path.join(".")}`), {
            operates: "*",
        });
        arrStore.state.items.push({ id: 3 });
        arrStore.state.items.splice(0, 1);
        expect(arrEvents).toContain("insert:items");
        expect(arrEvents).toContain("remove:items");
    });

    test("shallow 对象内的函数值按正常逻辑创建计算属性", () => {
        const store = new AutoStore({
            a: shallow({
                price: 10,
                count: 2,
                total: (scope: any) => scope.price * scope.count,
            }),
        });
        expect(store.state.a.total).toBe(20);
        store.state.a.price = 100;
        expect(store.state.a.total).toBe(200);
    });

    test("markRaw 与 shallow 的语义区分", () => {
        const store = new AutoStore({
            raw: markRaw({ b: 1 }),
            shallowObj: shallow({ b: 1 }),
        });
        const events: string[] = [];
        store.watch((e) => events.push(e.path.join(".")), { operates: "*" });

        // markRaw: 完全不代理, 子对象内部读取无事件(父层 raw 路径的 get 事件由父代理发出)
        store.state.raw;
        store.state.raw.b;
        // shallow: 顶层代理, 读取有事件
        store.state.shallowObj;
        store.state.shallowObj.b;
        expect(events).not.toContain("raw.b");
        expect(events).toContain("shallowObj");
        expect(events).toContain("shallowObj.b");
    });

    test("标记不泄漏进 JSON 序列化与键枚举", () => {
        const obj = shallow({ a: 1, c: { c1: 1 } });
        expect(JSON.stringify(obj)).toBe('{"a":1,"c":{"c1":1}}');
        expect(Object.keys(obj)).toEqual(["a", "c"]);
    });

    test("isShallow 判别与边界安全", () => {
        expect(isShallow(shallow({ a: 1 }))).toBe(true);
        expect(isShallow({ a: 1 })).toBe(false);
        expect(isShallow(null)).toBe(false);
        expect(isShallow(1)).toBe(false);
        // null/标量安全: 不挂标记, 原样返回
        expect(shallow(null as any)).toBe(null);
        expect(shallow(1 as any)).toBe(1);
        // 重复标记幂等
        const obj = shallow({ a: 1 });
        expect(isShallow(shallow(obj))).toBe(true);
    });
});
