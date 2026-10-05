import { describe, test, expect } from "bun:test";
import { AutoStore } from "../src";
import { shallow, isShallow } from "../src/decorators/shallow";
import { SHALLOW_PROXY_FLAG } from "../src/consts";
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
        expect(isShallow(shallow({ a: 1 }, 1))).toBe(true);
        expect(isShallow({ a: 1 })).toBe(false);
        expect(isShallow(null)).toBe(false);
        expect(isShallow(1)).toBe(false);
        // null/标量安全: 不挂标记, 原样返回
        expect(shallow(null as any)).toBe(null);
        expect(shallow(1 as any)).toBe(1);
        // 重复标记幂等
        const obj = shallow({ a: 1 });
        expect(isShallow(shallow(obj))).toBe(true);
        // 旧布尔标记(同页混布新旧副本场景)同样判别为浅响应, 标记值为归一化数字
        const legacy: any = { a: 1 };
        legacy[Symbol.for("__AS_SHALLOW_PROXY__")] = true;
        expect(isShallow(legacy)).toBe(true);
        expect((shallow({ a: 1 }) as any)[SHALLOW_PROXY_FLAG]).toBe(0);
        expect((shallow({ a: 1 }, 1) as any)[SHALLOW_PROXY_FLAG]).toBe(1);
    });

    test("deep=1: 成员获得浅代理, 孙级读出即 raw", () => {
        const store = new AutoStore({
            items: shallow([{ id: 1, meta: { x: 1 } }, { id: 2, meta: { x: 2 } }], 1),
        });
        const events: string[] = [];
        store.watch((e) => events.push(`${e.type}:${e.path.join(".")}`), { operates: "*" });

        // 成员属性读写: 有事件(成员是浅代理)
        expect(store.state.items[0].id).toBe(1);
        store.state.items[0].id = 11;
        expect(events).toContain("get:items.0.id");
        expect(events).toContain("set:items.0.id");

        // 孙级读出即原始引用: 内部修改静默
        const meta = store.state.items[0].meta;
        const before = events.length;
        meta.x = 100;
        expect(events.length).toBe(before);
        expect(store.state.items[0].meta.x).toBe(100);

        // 顶层数组操作照常
        store.state.items.push({ id: 3, meta: { x: 3 } });
        expect(events).toContain("insert:items");
    });

    test("deep=1: 动态加入的成员在首次读取时惰性纳管", () => {
        const store = new AutoStore({
            items: shallow([{ id: 1 }], 1),
        });
        const events: string[] = [];
        store.watch((e) => events.push(`${e.type}:${e.path.join(".")}`), { operates: "*" });

        // push 进来的新成员: 读取时同样获得浅代理
        store.state.items.push({ id: 2 });
        expect(store.state.items[1].id).toBe(2);
        store.state.items[1].id = 22;
        expect(events).toContain("set:items.1.id");
        // 惰性下戳已发生: 新成员被标记为 0(一层浅)
        expect((store.state.items[1] as any)[SHALLOW_PROXY_FLAG]).toBe(0);
        // 新成员的孙级依然 raw
        (store.state.items[1] as any).extra = { y: 1 };
        const rawExtra = (store.state.items[1] as any).extra; // get 事件在此发生
        const before = events.length;
        rawExtra.y = 100;
        expect(events.length).toBe(before);
    });

    test("deep=1: 成员级函数照常创建计算属性", () => {
        const store = new AutoStore({
            items: shallow(
                [
                    {
                        price: 10,
                        count: 2,
                        total: (scope: any) => scope.price * scope.count,
                    },
                ],
                1,
            ),
        });
        expect(store.state.items[0].total).toBe(20);
        store.state.items[0].price = 100;
        expect(store.state.items[0].total).toBe(200);
    });

    test("deep=1: 对象根与数组根行为对称", () => {
        const store = new AutoStore({
            a: shallow({ list: [{ id: 1 }] }, 1),
        });
        const events: string[] = [];
        store.watch((e) => events.push(e.path.join(".")), { operates: "*" });

        // 成员(数组)获得浅代理: 数组方法照常有事件
        store.state.a.list.push({ id: 2 });
        expect(events).toContain("a.list");
        // 数组的成员(孙级)读出即 raw: 内部修改静默
        const row = store.state.a.list[0];
        const before = events.length;
        (row as any).id = 100;
        expect(events.length).toBe(before);
        expect(store.state.a.list[0].id).toBe(100);
    });

    test("deep 运行时越界归一: deep>0 一律按 1", () => {
        const store = new AutoStore({
            items: (shallow as any)([{ id: 1 }], 2),
        });
        const events: string[] = [];
        store.watch((e) => events.push(e.path.join(".")), { operates: "*" });
        // 归一为 1: 成员可写可监听
        store.state.items[0].id = 11;
        expect(events).toContain("items.0.id");

        // 负数归一为 0: 成员读出即 raw
        const s2 = new AutoStore({ items: (shallow as any)([{ id: 1 }], -1) });
        const ev2: string[] = [];
        s2.watch((e) => ev2.push(e.path.join(".")), { operates: "*" });
        const row = s2.state.items[0];
        const before = ev2.length;
        (row as any).id = 100;
        expect(ev2.length).toBe(before);
    });

    test("双重身份: 标记与代理缓存均全局先到先得", () => {
        const shared = { v: 1 };
        const store = new AutoStore({
            shallowArr: shallow([shared], 1),
            normal: [shared],
        });
        const viaShallow = store.state.shallowArr[0];
        // 惰性下戳已发生: shared 被标记为 0
        expect((shared as any)[SHALLOW_PROXY_FLAG]).toBe(0);
        // 同一 raw 对象只有一份代理(proxyCache 按 target 缓存): 先到先得, 不因路径分裂
        expect(store.state.normal[0]).toBe(viaShallow);
    });

    // ==================== shallow(0)：对象成员操作 ====================
    describe("shallow(0) 对象：成员的修改与编辑(增删改)是否产生事件、能否被 watch", () => {
        test("直接属性：读取与修改均产生 get/set 事件，且可被路径 watch 捕获", () => {
            const store = new AutoStore({
                a: shallow({ b: 1 }),
            });
            const all: string[] = [];
            store.watch((e) => all.push(`${e.type}:${e.path.join(".")}`), { operates: "*" });
            const sub: string[] = [];
            store.watch("a.b", (e) => sub.push(`${e.type}:${e.path.join(".")}`), {
                operates: "*",
            });

            // 读取直接属性: 有事件
            expect(store.state.a.b).toBe(1);
            expect(all).toContain("get:a.b");
            expect(sub).toContain("get:a.b");

            // 修改直接属性: 有事件
            store.state.a.b = 2;
            expect(store.state.a.b).toBe(2);
            expect(all).toContain("set:a.b");
            expect(sub).toContain("set:a.b");
        });

        test("新增属性：产生 set 事件，且可被路径 watch 捕获", () => {
            const store = new AutoStore({
                a: shallow({ b: 1 }),
            });
            const all: string[] = [];
            store.watch((e) => all.push(`${e.type}:${e.path.join(".")}`), { operates: "*" });
            const sub: string[] = [];
            store.watch("a.d", (e) => sub.push(`${e.type}:${e.path.join(".")}`), {
                operates: "*",
            });

            // 编辑：新增属性（初始 state 中不存在该键，故以 any 访问模拟动态新增）
            (store.state.a as any).d = 5;
            expect((store.state.a as any).d).toBe(5);
            expect(all).toContain("set:a.d");
            expect(sub).toContain("set:a.d");
        });

        test("删除属性：产生 delete 事件，且可被路径 watch 捕获", () => {
            const store = new AutoStore({
                a: shallow({ b: 1, c: 2 }),
            });
            const all: string[] = [];
            store.watch((e) => all.push(`${e.type}:${e.path.join(".")}`), { operates: "*" });
            const sub: string[] = [];
            store.watch("a.c", (e) => sub.push(`${e.type}:${e.path.join(".")}`), {
                operates: "*",
            });

            // 编辑：删除属性
            delete (store.state.a as any).c;
            expect((store.state.a as any).c).toBeUndefined();
            expect(all).toContain("delete:a.c");
            expect(sub).toContain("delete:a.c");
        });

        test("嵌套子对象：内部修改(改/增/删)全部静默，路径 watch 也收不到", () => {
            const store = new AutoStore({
                a: shallow({
                    b: 1,
                    nested: { x: 1, list: [10, 20] },
                }),
            });
            const all: string[] = [];
            store.watch((e) => all.push(`${e.type}:${e.path.join(".")}`), { operates: "*" });
            const sub: string[] = [];
            store.watch("a.nested.x", (e) => sub.push(`${e.type}:${e.path.join(".")}`), {
                operates: "*",
            });

            // 读取 a.nested 有事件，但拿到的是原始引用
            const nested = store.state.a.nested;
            expect(all).toContain("get:a.nested");

            const before = all.length;
            // 修改
            nested.x = 100;
            // 增
            (nested as any).y = 2;
            // 删
            delete (nested as any).x;
            // 嵌套数组的改与增
            nested.list[0] = 11;
            nested.list.push(30);
            // 全部静默：不产生任何事件，路径 watch 也收不到
            expect(all.length).toBe(before);
            expect(sub.length).toBe(0);
            // 值确实变了（只是没有响应式通知）
            expect(store.state.a.nested.list[0]).toBe(11);
            expect(store.state.a.nested.list.length).toBe(3);
        });

        test("嵌套子对象整体替换：产生 set 事件，并广播唤醒已订阅的深层路径 watch", () => {
            const store = new AutoStore({
                a: shallow({ b: 1 }),
            });
            const all: string[] = [];
            store.watch((e) => all.push(`${e.type}:${e.path.join(".")}`), { operates: "*" });
            const sub: string[] = [];
            store.watch("a.d.d1", (e) => sub.push(`${e.type}:${e.path.join(".")}`), {
                operates: "*",
            });

            (store.state.a as any).d = { d1: 1 };
            expect(all).toContain("set:a.d");
            // 后代广播(ADR-0001)：已订阅的 a.d.d1 被唤醒
            expect(sub).toEqual(["set:a.d.d1"]);

            // 替换后读取出的 d 仍是原始引用，其内部修改静默
            const before = all.length;
            (store.state.a as any).d.d1 = 2;
            expect(all.slice(before)).toEqual(["get:a", "get:a.d"]);
            expect((store.state.a as any).d.d1).toBe(2);
        });
    });

    // ==================== shallow(0)：数组成员操作 ====================
    describe("shallow(0) 数组：成员的修改与编辑(增删改)是否产生事件、能否被 watch", () => {
        test("索引读取与赋值：产生 get/update 事件（数组索引写入为 update 而非 set）", () => {
            const store = new AutoStore({
                items: shallow([1, 2]),
            });
            const all: string[] = [];
            store.watch((e) => all.push(`${e.type}:${e.path.join(".")}`), { operates: "*" });
            const sub: string[] = [];
            store.watch("items.0", (e) => sub.push(`${e.type}:${e.path.join(".")}`), {
                operates: "*",
            });

            // 读取索引
            expect(store.state.items[0]).toBe(1);
            expect(all).toContain("get:items.0");
            expect(sub).toContain("get:items.0");

            // 修改索引：数组的 set 陷阱发出 update 事件
            store.state.items[0] = 9;
            expect(store.state.items[0]).toBe(9);
            expect(all).toContain("update:items.0");
            expect(sub).toContain("update:items.0");
        });

        test("length 读写：产生 get/update 事件", () => {
            const store = new AutoStore({
                items: shallow([1, 2, 3]),
            });
            const all: string[] = [];
            store.watch((e) => all.push(`${e.type}:${e.path.join(".")}`), { operates: "*" });

            expect(store.state.items.length).toBe(3);
            expect(all).toContain("get:items.length");
            store.state.items.length = 1;
            expect(store.state.items.length).toBe(1);
            expect(all).toContain("update:items.length");
        });

        test("增删方法：push/unshift 产生 insert，pop/shift/splice 产生 remove", () => {
            const store = new AutoStore({
                items: shallow([1, 2, 3]),
            });
            const all: string[] = [];
            store.watch((e) => all.push(`${e.type}:${e.path.join(".")}`), { operates: "*" });
            const sub: string[] = [];
            store.watch("items", (e) => sub.push(`${e.type}:${e.path.join(".")}`), {
                operates: "*",
            });

            // 增
            store.state.items.push(4);
            expect(all).toContain("insert:items");
            store.state.items.unshift(0);
            expect(all).toContain("insert:items");
            // 删
            store.state.items.pop();
            expect(all).toContain("remove:items");
            store.state.items.shift();
            expect(all).toContain("remove:items");
            // splice 同时产生 remove 与 insert
            const before = all.length;
            store.state.items.splice(0, 1, 99);
            expect(all.slice(before)).toEqual(["get:items", "remove:items", "insert:items"]);
            // 路径 watch 同样能收到
            expect(sub).toContain("insert:items");
            expect(sub).toContain("remove:items");
        });

        test("元素为对象：元素内部修改(改/增/删)与嵌套数组操作全部静默", () => {
            const store = new AutoStore({
                items: shallow([{ id: 1, meta: { x: 1 }, list: [1, 2] }]),
            });
            const all: string[] = [];
            store.watch((e) => all.push(`${e.type}:${e.path.join(".")}`), { operates: "*" });
            const sub: string[] = [];
            store.watch("items.0.meta.x", (e) => sub.push(`${e.type}:${e.path.join(".")}`), {
                operates: "*",
            });

            const el = store.state.items[0];
            const before = all.length;
            // 改（含孙级）
            el.id = 100;
            el.meta.x = 99;
            // 增
            (el.meta as any).y = 2;
            (el as any).extra = { v: 1 };
            // 删
            delete (el as any).id;
            // 嵌套数组的改与增
            el.list[0] = 9;
            el.list.push(3);
            // 全部静默
            expect(all.length).toBe(before);
            expect(sub.length).toBe(0);
            expect(store.state.items[0].list.length).toBe(3);
        });

        test("元素整体替换：产生 update 事件，并广播唤醒已订阅的深层路径 watch", () => {
            const store = new AutoStore({
                items: shallow([{ id: 1, meta: { x: 1 } }]),
            });
            const all: string[] = [];
            store.watch((e) => all.push(`${e.type}:${e.path.join(".")}`), { operates: "*" });
            const sub: string[] = [];
            store.watch("items.0.meta.x", (e) => sub.push(`${e.type}:${e.path.join(".")}`), {
                operates: "*",
            });

            store.state.items[0] = { id: 2, meta: { x: 7 } };
            expect(all).toContain("update:items.0");
            // 后代广播：新值中存在 meta.x 且与旧值不同 → 唤醒已订阅的 items.0.meta.x
            expect(sub).toEqual(["set:items.0.meta.x"]);
        });
    });

    // ==================== shallow(1)：对象成员操作 ====================
    describe("shallow(1) 对象：成员的修改与编辑(增删改)是否产生事件、能否被 watch", () => {
        test("成员直接属性：读取与修改均产生 get/set 事件，且可被路径 watch 捕获", () => {
            const store = new AutoStore({
                a: shallow({ child: { x: 1 } }, 1),
            });
            const all: string[] = [];
            store.watch((e) => all.push(`${e.type}:${e.path.join(".")}`), { operates: "*" });
            const sub: string[] = [];
            store.watch("a.child.x", (e) => sub.push(`${e.type}:${e.path.join(".")}`), {
                operates: "*",
            });

            const child = store.state.a.child;
            // 成员在首次读取时被下戳并获得浅代理
            expect((child as any)[SHALLOW_PROXY_FLAG]).toBe(0);

            expect(child.x).toBe(1);
            expect(all).toContain("get:a.child.x");
            expect(sub).toContain("get:a.child.x");

            child.x = 10;
            expect(all).toContain("set:a.child.x");
            expect(sub).toContain("set:a.child.x");
        });

        test("成员属性增删：产生 set/delete 事件，且可被路径 watch 捕获", () => {
            const store = new AutoStore({
                a: shallow({ child: { x: 1 } }, 1),
            });
            const all: string[] = [];
            store.watch((e) => all.push(`${e.type}:${e.path.join(".")}`), { operates: "*" });
            const added: string[] = [];
            store.watch("a.child.newv", (e) => added.push(`${e.type}:${e.path.join(".")}`), {
                operates: "*",
            });
            const deleted: string[] = [];
            store.watch("a.child.x", (e) => deleted.push(`${e.type}:${e.path.join(".")}`), {
                operates: "*",
            });

            // 增（初始 state 中不存在该键，故以 any 访问模拟动态新增）
            (store.state.a.child as any).newv = { deep: 1 };
            expect(all).toContain("set:a.child.newv");
            expect(added).toEqual(["set:a.child.newv"]);
            // 删
            delete (store.state.a.child as any).x;
            expect(all).toContain("delete:a.child.x");
            expect(deleted).toEqual(["delete:a.child.x"]);
        });

        test("成员孙级：修改(改/增/删)全部静默，路径 watch 也收不到", () => {
            const store = new AutoStore({
                a: shallow({ child: { x: 1, nested: { y: 1, list: [1] } } }, 1),
            });
            const all: string[] = [];
            store.watch((e) => all.push(`${e.type}:${e.path.join(".")}`), { operates: "*" });
            const sub: string[] = [];
            store.watch("a.child.nested.y", (e) => sub.push(`${e.type}:${e.path.join(".")}`), {
                operates: "*",
            });

            // 孙级读出即原始引用
            const nested = store.state.a.child.nested;
            expect(all).toContain("get:a.child.nested");

            const before = all.length;
            nested.y = 100;
            (nested as any).z = 2;
            delete (nested as any).y;
            nested.list[0] = 9;
            nested.list.push(2);
            // 全部静默
            expect(all.length).toBe(before);
            expect(sub.length).toBe(0);
            expect(store.state.a.child.nested.list.length).toBe(2);
        });

        test("成员整体替换：产生 set 事件，新成员成为浅代理后其直接属性可响应", () => {
            const store = new AutoStore({
                a: shallow({ child: { x: 1 } }, 1),
            });
            const all: string[] = [];
            store.watch((e) => all.push(`${e.type}:${e.path.join(".")}`), { operates: "*" });

            (store.state.a as any).child = { x: 5, m: { k: 1 } };
            expect(all).toContain("set:a.child");

            const before = all.length;
            // 新成员读取后成为浅代理：直接属性可写可监听
            store.state.a.child.x = 50;
            expect(all.slice(before)).toEqual(["get:a", "get:a.child", "set:a.child.x"]);
            // 其孙级依然静默
            const afterSet = all.length;
            (store.state.a.child as any).m.k = 10;
            expect(all.slice(afterSet)).toEqual(["get:a", "get:a.child", "get:a.child.m"]);
        });
    });

    // ==================== shallow(1)：数组成员操作 ====================
    describe("shallow(1) 数组：成员的修改与编辑(增删改)是否产生事件、能否被 watch", () => {
        test("元素直接属性：读取与修改均产生 get/set 事件，且可被路径 watch 捕获", () => {
            const store = new AutoStore({
                items: shallow([{ id: 1 }], 1),
            });
            const all: string[] = [];
            store.watch((e) => all.push(`${e.type}:${e.path.join(".")}`), { operates: "*" });
            const sub: string[] = [];
            store.watch("items.0.id", (e) => sub.push(`${e.type}:${e.path.join(".")}`), {
                operates: "*",
            });

            const el = store.state.items[0];
            expect((el as any)[SHALLOW_PROXY_FLAG]).toBe(0);

            expect(el.id).toBe(1);
            expect(all).toContain("get:items.0.id");
            expect(sub).toContain("get:items.0.id");

            el.id = 11;
            expect(all).toContain("set:items.0.id");
            expect(sub).toContain("set:items.0.id");
        });

        test("元素属性增删：产生 set/delete 事件，且可被路径 watch 捕获", () => {
            const store = new AutoStore({
                items: shallow([{ id: 1 }], 1),
            });
            const all: string[] = [];
            store.watch((e) => all.push(`${e.type}:${e.path.join(".")}`), { operates: "*" });
            const added: string[] = [];
            store.watch("items.0.extra", (e) => added.push(`${e.type}:${e.path.join(".")}`), {
                operates: "*",
            });
            const deleted: string[] = [];
            store.watch("items.0.id", (e) => deleted.push(`${e.type}:${e.path.join(".")}`), {
                operates: "*",
            });

            // 增（初始 state 中不存在该键，故以 any 访问模拟动态新增）
            (store.state.items[0] as any).extra = { v: 1 };
            expect(all).toContain("set:items.0.extra");
            expect(added).toEqual(["set:items.0.extra"]);
            // 删
            delete (store.state.items[0] as any).id;
            expect(all).toContain("delete:items.0.id");
            expect(deleted).toEqual(["delete:items.0.id"]);
        });

        test("元素孙级：修改(改/增/删)与嵌套数组操作全部静默", () => {
            const store = new AutoStore({
                items: shallow([{ id: 1, meta: { x: 1, list: [1] } }], 1),
            });
            const all: string[] = [];
            store.watch((e) => all.push(`${e.type}:${e.path.join(".")}`), { operates: "*" });
            const sub: string[] = [];
            store.watch("items.0.meta.x", (e) => sub.push(`${e.type}:${e.path.join(".")}`), {
                operates: "*",
            });

            const meta = store.state.items[0].meta;
            expect(all).toContain("get:items.0.meta");

            const before = all.length;
            meta.x = 99;
            (meta as any).y = 2;
            delete (meta as any).x;
            meta.list[0] = 9;
            meta.list.push(2);
            // 全部静默
            expect(all.length).toBe(before);
            expect(sub.length).toBe(0);
            expect(store.state.items[0].meta.list.length).toBe(2);
        });

        test("push/unshift/splice 新加入的元素：首次读取成为浅代理，直接属性可响应", () => {
            const store = new AutoStore({
                items: shallow([{ id: 1 }], 1),
            });
            const all: string[] = [];
            store.watch((e) => all.push(`${e.type}:${e.path.join(".")}`), { operates: "*" });
            let before = all.length;

            // push：顶层数组操作有事件（元素类型不一致，故以 any 传入）
            (store.state.items as any).push({ id: 2, meta: { m: 1 } });
            expect(all).toContain("insert:items");
            // 新元素首次读取被下戳为 0（惰性纳管跟随数据）
            const pushed = store.state.items[1];
            expect((pushed as any)[SHALLOW_PROXY_FLAG]).toBe(0);

            before = all.length;
            pushed.id = 22;
            expect(all.slice(before)).toEqual(["set:items.1.id"]);
            // 孙级静默：仅读取路径有事件，写入无事件
            before = all.length;
            (pushed as any).meta.m = 22;
            expect(all.slice(before)).toEqual(["get:items.1.meta"]);

            // unshift：新元素同样纳管
            (store.state.items as any).unshift({ id: 0 });
            expect(all).toContain("insert:items");
            const unshifted = store.state.items[0];
            expect((unshifted as any)[SHALLOW_PROXY_FLAG]).toBe(0);
            before = all.length;
            unshifted.id = 5;
            expect(all.slice(before)).toEqual(["set:items.0.id"]);

            // splice 插入：新元素同样纳管
            (store.state.items as any).splice(1, 0, { id: 9 });
            expect(all).toContain("insert:items");
            const inserted = store.state.items[1];
            expect((inserted as any)[SHALLOW_PROXY_FLAG]).toBe(0);
            before = all.length;
            inserted.id = 99;
            expect(all.slice(before)).toEqual(["set:items.1.id"]);
        });

        test("索引赋值替换元素：产生 update 事件，新元素成为浅代理后直接属性可响应", () => {
            const store = new AutoStore({
                items: shallow([{ id: 1, meta: { x: 1 } }], 1),
            });
            const all: string[] = [];
            store.watch((e) => all.push(`${e.type}:${e.path.join(".")}`), { operates: "*" });

            // 替换前的旧元素：孙级修改静默（仅读取路径有事件）
            const oldEl = store.state.items[0];
            let before = all.length;
            oldEl.meta.x = 5;
            expect(all.slice(before)).toEqual(["get:items.0.meta"]);

            // 整体替换
            store.state.items[0] = { id: 2, meta: { x: 10 } };
            expect(all).toContain("update:items.0");

            // 新元素读取后成为浅代理
            const newEl = store.state.items[0];
            expect((newEl as any)[SHALLOW_PROXY_FLAG]).toBe(0);
            before = all.length;
            newEl.id = 20;
            expect(all.slice(before)).toEqual(["set:items.0.id"]);
            // 孙级静默
            before = all.length;
            newEl.meta.x = 100;
            expect(all.slice(before)).toEqual(["get:items.0.meta"]);
        });

        test("超索引赋值 items[N]=obj：产生 update 事件，新元素成为浅代理", () => {
            const store = new AutoStore({
                items: shallow([1], 1),
            });
            const all: string[] = [];
            store.watch((e) => all.push(`${e.type}:${e.path.join(".")}`), { operates: "*" });
            const sub: string[] = [];
            store.watch("items.2.v", (e) => sub.push(`${e.type}:${e.path.join(".")}`), {
                operates: "*",
            });

            (store.state.items as any)[2] = { v: 1 };
            expect(all).toContain("update:items.2");
            expect(store.state.items.length).toBe(3);

            const el = store.state.items[2] as any;
            expect(el[SHALLOW_PROXY_FLAG]).toBe(0);
            expect(el.v).toBe(1);
            expect(sub).toContain("get:items.2.v");
            el.v = 2;
            expect(all).toContain("set:items.2.v");
            expect(sub).toContain("set:items.2.v");
        });

        test("顶层操作与元素直接属性可被同一个 watch 同时覆盖", () => {
            const store = new AutoStore({
                items: shallow([{ id: 1 }], 1),
            });
            const all: string[] = [];
            store.watch((e) => all.push(`${e.type}:${e.path.join(".")}`), { operates: "*" });

            store.state.items.push({ id: 2 });
            // 读取元素直接属性也应产生 get 事件
            expect(store.state.items[0].id).toBe(1);
            store.state.items[0].id = 10;
            store.state.items[1].id = 20;
            store.state.items.splice(0, 1);

            expect(all).toContain("insert:items");
            expect(all).toContain("get:items.0.id");
            expect(all).toContain("set:items.0.id");
            expect(all).toContain("set:items.1.id");
            expect(all).toContain("remove:items");
        });
    });
});
