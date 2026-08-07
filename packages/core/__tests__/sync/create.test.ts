import { describe, test, expect } from "bun:test";
/**
 *
 *  动态参数的创建计算属性
 *
 *
 */

import { AutoStore, InvalidScopeError } from "../../src";

describe("动态创建同步择计算属性", () => {
    test("创建同步计算属性提供默认值", () => {
        return new Promise<void>((resolve) => {
            const store = new AutoStore({
                price: 2,
                count: 3,
            });
            const obj = store.computedObjects.create((state: any) => {
                return state.price * state.count;
            });
            expect(obj.value).toBe(6);
            resolve();
        });
    });
    test("创建同步计算属性时指定scope", () => {
        return new Promise<void>((resolve) => {
            const store = new AutoStore({
                order: {
                    price: 2,
                    count: 3,
                },
            });
            const obj = store.computedObjects.create(
                (order: any) => {
                    return order.price * order.count;
                },
                {
                    scope: "order",
                },
            );
            expect(obj.value).toBe(6);
            resolve();
        });
    });
    test("动态创建的同步计算对象-默认保存计算对象引用", () => {
        return new Promise<void>((resolve) => {
            const store = new AutoStore({
                price: 2,
                count: 3,
            });
            const obj = store.computedObjects.create<number>((state: any) => {
                return state.price * state.count;
            });
            expect(obj.value).toBe(6);
            expect(store.computedObjects.size).toBe(1);
            expect(store.computedObjects.has(obj.id)).toBe(true);
            resolve();
        });
    });
    test("动态创建的同步计算对象，保存计算对象引用", () => {
        return new Promise<void>((resolve) => {
            const store = new AutoStore({
                price: 2,
                count: 3,
            });
            const obj = store.computedObjects.create<number>(
                (state: any) => {
                    return state.price * state.count;
                },
                { id: "x" },
            );
            expect(obj.value).toBe(6);
            expect(store.computedObjects.size).toBe(1);
            expect(store.computedObjects.has(obj.id)).toBe(true);
            resolve();
        });
    });

    test("创建同步计算对象然后删除", () => {
        return new Promise<void>((resolve) => {
            const store = new AutoStore({
                price: 2,
                count: 3,
            });
            const obj = store.computedObjects.create((state: any) => {
                return state.price * state.count;
            });
            expect(obj.value).toBe(6);
            store.computedObjects.delete(obj.id);
            expect(store.computedObjects.size).toBe(0);
            expect(obj.associated).toBe(false);
            store.state.count = 4;
            expect(obj.value).toBe(6); // 当对象被删除后，不再计算
            resolve();
        });
    });

    test("动态计算属性依赖变化时自动更新", () => {
        return new Promise<void>((resolve) => {
            const store = new AutoStore({
                price: 2,
                count: 3,
            });
            const obj = store.computedObjects.create((state: any) => {
                return state.price * state.count;
            });
            expect(obj.value).toBe(6);
            store.state.count = 4;
            expect(obj.value).toBe(8);
            resolve();
        });
    });

    test("侦听动态计算属性的变更事件", () => {
        return new Promise<void>((resolve) => {
            const store = new AutoStore({
                price: 2,
                count: 3,
            });
            const obj = store.computedObjects.create((state: any) => {
                return state.price * state.count;
            });
            obj.watch(({ value }) => {
                expect(value).toBe(8);
                resolve();
            });
            store.state.count = 4;
        });
    });

    test("游离对象的值变更不进入state变更流(operates)", () => {
        return new Promise<void>((resolve) => {
            const store = new AutoStore({
                order: { price: 2, count: 3 },
            });
            const obj = store.computedObjects.create(
                (order: any) => order.price * order.count,
                { anchor: { path: ["order", "total"] } },
            );
            // 游离对象的值变化不应出现在 operates 总线上（ADR-0002）
            let starSawDetached = 0;
            let pathWatchGot = false;
            store.watch("*", (op) => {
                if (op.path.join(".") === "order.total") starSawDetached++;
            });
            store.watch("order.total", () => {
                pathWatchGot = true;
            });
            // 直接给游离对象赋值（走 observer:set:<id>，不进 operates）
            obj.value = 100;
            setTimeout(() => {
                expect(starSawDetached).toBe(0);
                expect(pathWatchGot).toBe(false);
                resolve();
            }, 50);
        });
    });
});

describe("动态创建计算属性-提供context支持相对路径", () => {
    test("提供context时默认scope为CURRENT指向容器且不回写状态树", () => {
        const store = new AutoStore({
            order: { price: 2, count: 3 },
        });
        const obj = store.computedObjects.create(
            (order: any) => order.price * order.count,
            { anchor: { path: ["order", "total"] } },
        );
        // 默认 CURRENT scope = parentPath(['order']) 指向的 order 对象
        expect(obj.value).toBe(6);
        // 游离：不关联状态树
        expect(obj.associated).toBe(false);
        // 不回写：state.order.total 不存在
        expect((store.state.order as any).total).toBeUndefined();
    });

    test("提供context时path为context.path且id为生成值(非路径)", () => {
        const store = new AutoStore({
            order: { price: 2, count: 3 },
        });
        const obj = store.computedObjects.create(
            (order: any) => order.price * order.count,
            { anchor: { path: ["order", "total"] } },
        );
        expect(obj.path).toEqual(["order", "total"]);
        // 游离对象 id 是自动生成的，不是路径字符串
        expect(obj.id).not.toBe("order.total");
    });

    test("提供context仅指定path时parentPath自动推导使CURRENT生效", () => {
        const store = new AutoStore({
            order: { price: 2, count: 3 },
        });
        // 仅提供 path，未提供 parentPath；CURRENT scope 必须依赖推导出的 parentPath
        const obj = store.computedObjects.create(
            (order: any) => order.price * order.count,
            { anchor: { path: ["order", "total"] } },
        );
        // 若 parentPath 未推导，CURRENT scope 会退化为根，order.price 为 undefined -> NaN
        expect(obj.value).toBe(6);
    });

    test("提供context时支持相对scope指向同级对象", () => {
        const store = new AutoStore({
            order: {
                goods: { price: 2, count: 3 },
            },
        });
        // context.path=['order','final'], scope='./goods' -> ['order','goods']
        const obj = store.computedObjects.create(
            (goods: any) => goods.price * goods.count,
            { anchor: { path: ["order", "final"] }, scope: "./goods" },
        );
        expect(obj.value).toBe(6);
    });

    test("提供context时支持相对scope../指向父级同级", () => {
        const store = new AutoStore({
            a: { b: { price: 2 }, c: { count: 3 } },
        });
        // context.path=['a','b','x'], scope='../c' -> ['a','c']
        const obj = store.computedObjects.create(
            (c: any) => c.count,
            { anchor: { path: ["a", "b", "x"] }, scope: "../c" },
        );
        expect(obj.value).toBe(3);
    });

    test("提供context时scope为PARENT指向父级对象", () => {
        const store = new AutoStore({
            a: { b: { price: 2 }, count: 3 },
        });
        // context.path=['a','b','x'], PARENT scope -> ['a']
        const obj = store.computedObjects.create(
            (a: any) => a.b.price * a.count,
            { anchor: { path: ["a", "b", "x"] }, scope: "PARENT" },
        );
        expect(obj.value).toBe(6);
    });

    test("提供context时显式相对depends能正确解析并触发重算", () => {
        const store = new AutoStore({
            order: { price: 2, count: 3 },
        });
        const obj = store.computedObjects.create(
            (order: any) => order.price * order.count,
            { anchor: { path: ["order", "total"] }, depends: ["./price", "./count"] },
        );
        expect(obj.value).toBe(6);
        // 相对 depends 已解析为绝对路径
        expect(obj.depends).toContainEqual(["order", "count"]);
        // 依赖变化触发重算
        store.state.order.count = 4;
        expect(obj.value).toBe(8);
    });

    test("提供context时依赖变化触发watch", () => {
        return new Promise<void>((resolve, reject) => {
            const store = new AutoStore({
                order: { price: 2, count: 3 },
            });
            const obj = store.computedObjects.create(
                (order: any) => order.price * order.count,
                { anchor: { path: ["order", "total"] } },
            );
            obj.watch(({ value }) => {
                expect(value).toBe(8);
                resolve();
            });
            store.state.order.count = 4;
            setTimeout(() => reject(new Error("watch 未触发")), 1000);
        });
    });

    test("无context时相对scope抛出InvalidScopeError(向后兼容)", () => {
        const store = new AutoStore({ order: { price: 2, count: 3 } });
        expect(() => {
            store.computedObjects.create((order: any) => order.price, {
                scope: "./price",
            });
        }).toThrow(InvalidScopeError);
    });

    test("提供context但缺path时抛出InvalidScopeError", () => {
        const store = new AutoStore({ order: { price: 2, count: 3 } });
        expect(() => {
            store.computedObjects.create((order: any) => order.price, {
                anchor: {} as any,
            });
        }).toThrow(InvalidScopeError);
    });
});
