/**
 * watch 的 depth 选项测试
 *
 * 验证：向后代钻取的三档语义（0 / 1 / ≥2）、回调 operate.path 为真实后代路径、
 * once / watchAll 叠加规则、多 paths 展开、数组索引捕获。详见 ADR-0003。
 */
import { describe, test, expect, beforeEach, mock } from "bun:test";

import { AutoStore } from "../../src";
import { deepClone } from "flex-tools/object/deepClone";
import type { StateOperate } from "../../src/store/types";

/** 收集 operate 的辅助：返回一个 [watcher, events] */
function collect(
    store: AutoStore<any>,
    path: string | string[],
    options?: { depth?: number; once?: boolean },
) {
    const events: StateOperate[] = [];
    const watcher = store.watch(path as any, (op: StateOperate) => events.push(op), options as any);
    return { watcher, events };
}

describe("watch depth 选项", () => {
    let store: AutoStore<any>;
    beforeEach(() => {
        store = new AutoStore(
            deepClone({
                order: {
                    price: 100,
                    count: 5,
                    address: {
                        city: "qx",
                    },
                },
                items: [1, 2, 3],
            }),
        );
    });

    describe("depth: 0（默认）", () => {
        test("后代变更不触发，仅自身被重新赋值时触发", () => {
            const { events } = collect(store, "order");
            // 后代变更：不应触发
            store.state.order.price = 200;
            store.state.order.address.city = "sh";
            expect(events).toHaveLength(0);
            // 自身重新赋值：触发
            store.state.order = { ...store.state.order, price: 300 };
            expect(events).toHaveLength(1);
            expect(events[0].path).toEqual(["order"]);
        });

        test("未传 depth 等价于 depth: 0", () => {
            const a = collect(store, "order");
            const b = collect(store, "order", { depth: 0 });
            store.state.order.price = 200;
            expect(a.events).toHaveLength(0);
            expect(b.events).toHaveLength(0);
        });
    });

    describe("depth: 1（自身 + 恰好一级后代）", () => {
        test("一级后代变更触发，且 operate.path 为真实后代路径", () => {
            const { events } = collect(store, "order", { depth: 1 });
            store.state.order.price = 200;
            expect(events).toHaveLength(1);
            // 关键：回调拿到的是真实后代路径，而非被监听的 ["order"]
            expect(events[0].path).toEqual(["order", "price"]);
            expect(events[0].value).toBe(200);
        });

        test("二级后代变更不触发", () => {
            const { events } = collect(store, "order", { depth: 1 });
            store.state.order.address.city = "sh";
            expect(events).toHaveLength(0);
        });

        test("自身被重新赋值时也触发", () => {
            const { events } = collect(store, "order", { depth: 1 });
            store.state.order = { ...store.state.order, price: 300 };
            // order 自身 + order.price（一级后代，因值变化）均可能触发
            expect(events.length).toBeGreaterThanOrEqual(1);
            const paths = events.map((e) => e.path.join("."));
            expect(paths).toContain("order");
        });
    });

    describe("depth ≥ 2（自身 + 全部后代）", () => {
        test("depth: 2 捕获二级后代", () => {
            const { events } = collect(store, "order", { depth: 2 });
            store.state.order.address.city = "sh";
            expect(events).toHaveLength(1);
            expect(events[0].path).toEqual(["order", "address", "city"]);
        });

        test("depth: 3 等价于 depth: 2（三档语义，非连续深度）", () => {
            const a = collect(store, "order", { depth: 2 });
            const b = collect(store, "order", { depth: 3 });
            store.state.order.address.city = "sh";
            store.state.order.price = 9;
            expect(a.events.map((e) => e.path.join("."))).toEqual(
                b.events.map((e) => e.path.join(".")),
            );
        });

        test("自身被重新赋值时触发（** 含自身）", () => {
            const { events } = collect(store, "order", { depth: 2 });
            store.state.order = { ...store.state.order, price: 1 };
            const paths = events.map((e) => e.path.join("."));
            expect(paths).toContain("order");
            // 通配符广播透传的 path 应为父级真实路径，而非含 ** 的字面模式路径
            expect(paths).not.toContain("order.**");
        });
    });

    describe("once 叠加", () => {
        test("once: true 时 depth 无效，静默降级为 0（后代变更不触发）", () => {
            // 关键：once 时 depth 被降级为 0，因此 order 的后代变更不应触发回调。
            // （此处只验证 depth 降级语义；fastevent once 在"后代变更经父节点"
            //   场景下的解绑时序属于独立既有行为，不在 depth 范围内。）
            const { events } = collect(store, "order", { depth: 2, once: true });
            store.state.order.price = 200;
            expect(events).toHaveLength(0);
        });
    });

    describe("watchAll 模式下 depth 静默忽略", () => {
        test("watch('*') 传 depth 不报错且不影响 onAny 全覆盖", () => {
            const cb = mock((_op: StateOperate) => {});
            store.watch("*", cb as any, { depth: 1 } as any);
            store.state.order.price = 200;
            store.state.order.address.city = "sh";
            // watchAll 已全覆盖，depth 无意义但仍正常收到后代事件
            expect(cb).toHaveBeenCalledTimes(2);
        });
    });

    describe("多 paths 各自展开", () => {
        test("数组中每个 path 按 depth 展开", () => {
            const { events } = collect(store, ["order", "items"], { depth: 1 });
            // order 的一级后代
            store.state.order.price = 200;
            // items 的一级后代（数组索引段）
            store.state.items[0] = 99;
            const paths = events.map((e) => e.path.join("."));
            expect(paths).toContain("order.price");
            expect(paths).toContain("items.0");
        });
    });

    describe("数组索引段被 depth 捕获", () => {
        test("depth: 1 捕获数组元素（数字索引段）", () => {
            const { events } = collect(store, "items", { depth: 1 });
            store.state.items[1] = 42;
            expect(events).toHaveLength(1);
            expect(events[0].path).toEqual(["items", "1"]);
        });
    });
});
