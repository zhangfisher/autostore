/**
 * 后代广播（Descendant Broadcast）独立测试
 *
 * 验证：整体替换/删除结构化值（{} / Map / Array）时，子树内已订阅的后代监听器
 * 能收到独立派生的 operate。详见 ADR-0001。
 *
 * 覆盖范围（第一阶段）：set / delete / update(set 陷阱)。
 * 数组方法 insert/remove/fill 属第二阶段，不在本文件。
 */
import { describe, test, expect, beforeEach } from "bun:test";

import { AutoStore } from "../../src";
import { deepClone } from "flex-tools/object/deepClone";
import type { StateOperate } from "../../src/store/types";

/** 收集 operate 的辅助：返回一个 [watcher, events] */
function collect(store: AutoStore<any>, path: string) {
    const events: StateOperate[] = [];
    const watcher = store.watch(path, (op) => events.push(op));
    return { watcher, events };
}

describe("后代广播：整体替换结构化值", () => {
    let store: AutoStore<any>;
    beforeEach(() => {
        store = new AutoStore(
            deepClone({
                order: { count: 100, price: 0.8 },
                items: [1, 2],
                address: [
                    { city: "New York", street: "Wall Street" },
                    { city: "Los Angeles", street: "Hollywood Blvd" },
                ],
                m: new Map<string, number>(),
            }),
        );
    });

    describe("set 对象", () => {
        test("后代 watch 触发，type=set 且 value 为新值", () => {
            const c = collect(store, "order.count");
            const p = collect(store, "order.price");
            store.state.order = { count: 101, price: 1.8 };
            expect(c.events).toHaveLength(1);
            expect(c.events[0].type).toBe("set");
            expect(c.events[0].path).toEqual(["order", "count"]);
            expect(c.events[0].value).toBe(101);
            expect(c.events[0].oldValue).toBe(100);
            expect(c.events[0].broadcast).toBe(true);
            expect(p.events).toHaveLength(1);
            expect(p.events[0].value).toBe(1.8);
            expect(p.events[0].oldValue).toBe(0.8);
        });

        test("未变化的子路径被去重（不触发）", () => {
            const c = collect(store, "order.count");
            // count 保持 100 不变，仅改 price
            store.state.order = { count: 100, price: 1.8 };
            expect(c.events).toHaveLength(0);
        });

        test("新对象删掉某 key，该 key 的后代触发 delete", () => {
            const p = collect(store, "order.price");
            store.state.order = { count: 101 }; // price 被移除
            expect(p.events).toHaveLength(1);
            expect(p.events[0].type).toBe("delete");
            expect(p.events[0].value).toBeUndefined();
            expect(p.events[0].oldValue).toBe(0.8);
        });

        test("新对象新增 key，新后代触发 set 且 oldValue 为 undefined", () => {
            const n = collect(store, "order.name");
            store.state.order = { count: 101, price: 1.8, name: "foo" };
            expect(n.events).toHaveLength(1);
            expect(n.events[0].type).toBe("set");
            expect(n.events[0].value).toBe("foo");
            expect(n.events[0].oldValue).toBeUndefined();
        });

        test("父监听器仍收到原始 operate（未被改写、无 broadcast 标记）", () => {
            const o = collect(store, "order");
            store.state.order = { count: 101, price: 1.8 };
            expect(o.events).toHaveLength(1);
            expect(o.events[0].path).toEqual(["order"]);
            expect(o.events[0].value).toEqual({ count: 101, price: 1.8 });
            expect(o.events[0].broadcast).toBeUndefined();
        });

        test("通配符后代 watch('order.*') 被广播唤醒（一次通知，父级真实路径）", () => {
            const all = collect(store, "order.*");
            store.state.order = { count: 101, price: 1.8 };
            // 通配符是单个订阅节点，整体替换时仅通知一次；无法区分具体命中的子路径，
            // 故透传父级真实路径（params.path），而非含通配符的字面模式路径。
            expect(all.events).toHaveLength(1);
            expect(all.events[0].broadcast).toBe(true);
            expect(all.events[0].path).toEqual(["order"]);
        });
    });

    describe("delete 对象", () => {
        test("所有后代触发 delete，value=undefined、oldValue=旧值", () => {
            const c = collect(store, "order.count");
            const p = collect(store, "order.price");
            delete store.state.order;
            expect(c.events).toHaveLength(1);
            expect(c.events[0].type).toBe("delete");
            expect(c.events[0].value).toBeUndefined();
            expect(c.events[0].oldValue).toBe(100);
            expect(p.events).toHaveLength(1);
            expect(p.events[0].oldValue).toBe(0.8);
        });
    });

    describe("set 数组值", () => {
        test("新增索引的后代触发 set，未变索引被去重", () => {
            const i0 = collect(store, "items.0");
            const i2 = collect(store, "items.2");
            store.state.items = [1, 2, 3];
            expect(i0.events).toHaveLength(0); // 0 号未变
            expect(i2.events).toHaveLength(1); // 新增 2 号
            expect(i2.events[0].type).toBe("set");
            expect(i2.events[0].value).toBe(3);
            expect(i2.events[0].oldValue).toBeUndefined();
        });
    });

    describe("set Map 值", () => {
        test("Map 后代路径触发 set", () => {
            const k = collect(store, "m.k");
            store.state.m = new Map([["k", 1]]);
            expect(k.events).toHaveLength(1);
            expect(k.events[0].type).toBe("set");
            expect(k.events[0].value).toBe(1);
        });
    });

    describe("update（set 陷阱 arr[i]=对象）", () => {
        test("数组元素对象的后代触发 set", () => {
            const city = collect(store, "address.0.city");
            store.state.address[0] = { city: "QuanZhou", street: "TongYang" };
            expect(city.events).toHaveLength(1);
            expect(city.events[0].type).toBe("set");
            expect(city.events[0].value).toBe("QuanZhou");
            expect(city.events[0].oldValue).toBe("New York");
            expect(city.events[0].broadcast).toBe(true);
        });
    });

    describe("observer 后代跳过", () => {
        test("computed 后代不收到 broadcast 派生事件（由其自通知机制接管）", () => {
            const s = new AutoStore({
                order: { count: 1, double: (scope: any) => scope.count * 2 },
            });
            const d = collect(s, "order.double");
            // 整体替换 order（含同形 computed），double 不应收到 broadcast:true 事件
            // @ts-expect-error
            s.state.order = { count: 5, double: (scope: any) => scope.count * 2 };
            const broadcastEvents = d.events.filter((e) => e.broadcast === true);
            expect(broadcastEvents).toHaveLength(0);
            d.watcher.off();
        });
    });

    describe("批量更新中的后代广播", () => {
        test("batchUpdate 内替换对象，flush 时后代触发", () => {
            const c = collect(store, "order.count");
            store.batchUpdate((state) => {
                state.order = { count: 200, price: 2.5 };
            });
            // count 从 100 → 200，应收到 set
            const setEvents = c.events.filter((e) => e.type === "set" && e.path.join(".") === "order.count");
            expect(setEvents.length).toBeGreaterThanOrEqual(1);
            expect(setEvents.some((e) => e.value === 200)).toBe(true);
        });
    });
});
