import { describe, test, expect } from "bun:test";
/**
 * 动态创建异步计算属性 (computedObjects.create) 的测试
 *
 * 验证：动态创建的异步计算对象始终游离(associated=false、不回写状态树)，
 *       提供 context 后支持相对 depends 与 scope。
 */
import { AutoStore, InvalidDependsError } from "../../src";

describe("动态创建异步计算属性-提供context支持相对路径", () => {
    test("提供context时异步相对depends不抛错且正确计算", () => {
        return new Promise<void>((resolve, reject) => {
            const store = new AutoStore(
                { order: { price: 2, count: 3 } },
                {
                    onObserverDone: ({ value, observer }) => {
                        if (observer.async) {
                            expect(value).toBe(6);
                            resolve();
                        }
                    },
                },
            );
            store.computedObjects.create(
                async (order: any) => order.price * order.count,
                ["./price", "./count"],
                { anchor: { path: ["order", "total"] } },
            );
            setTimeout(() => reject(new Error("异步计算未完成")), 2000);
        });
    });

    test("提供context时异步计算对象保持游离不回写状态树", () => {
        return new Promise<void>((resolve, reject) => {
            const store = new AutoStore(
                { order: { price: 2, count: 3 } },
                {
                    onObserverDone: ({ observer }) => {
                        if (!observer.async) return;
                        // 游离：不关联状态树
                        expect(observer.associated).toBe(false);
                        // path 来自 context
                        expect(observer.path).toEqual(["order", "total"]);
                        // 异步计算结果为原始值(非 {value,loading,...} 结构)
                        expect(observer.value).toBe(6);
                        // 不回写：state.order.total 不存在
                        expect((store.state.order as any).total).toBeUndefined();
                        resolve();
                    },
                },
            );
            store.computedObjects.create(
                async (order: any) => order.price * order.count,
                ["./price", "./count"],
                { anchor: { path: ["order", "total"] } },
            );
            setTimeout(() => reject(new Error("异步计算未完成")), 2000);
        });
    });

    test("提供context时异步相对depends变化触发重算", () => {
        let doneCount = 0;
        return new Promise<void>((resolve, reject) => {
            const store = new AutoStore(
                { order: { price: 2, count: 3 } },
                {
                    onObserverDone: ({ value, observer }) => {
                        if (!observer.async) return;
                        doneCount++;
                        if (doneCount === 1) {
                            expect(value).toBe(6);
                            // 相对 depends 已解析为 order.price/order.count，变化触发重算
                            setTimeout(() => {
                                store.state.order.count = 4;
                            }, 10);
                        } else if (doneCount === 2) {
                            expect(value).toBe(8);
                            resolve();
                        }
                    },
                },
            );
            store.computedObjects.create(
                async (order: any) => order.price * order.count,
                ["./price", "./count"],
                { anchor: { path: ["order", "total"] } },
            );
            setTimeout(() => reject(new Error("重算未触发")), 3000);
        });
    });

    test("提供context时异步计算支持相对scope", () => {
        return new Promise<void>((resolve, reject) => {
            const store = new AutoStore(
                { order: { goods: { price: 2, count: 3 } } },
                {
                    onObserverDone: ({ value, observer }) => {
                        if (observer.async) {
                            // scope='./goods' -> ['order','goods']
                            expect(value).toBe(6);
                            resolve();
                        }
                    },
                },
            );
            store.computedObjects.create(
                async (goods: any) => goods.price * goods.count,
                ["./goods.price", "./goods.count"],
                { anchor: { path: ["order", "total"] }, scope: "./goods" },
            );
            setTimeout(() => reject(new Error("异步计算未完成")), 2000);
        });
    });

    test("提供context时异步计算默认scope为CURRENT指向容器", () => {
        return new Promise<void>((resolve, reject) => {
            const store = new AutoStore(
                { order: { price: 2, count: 3 } },
                {
                    onObserverDone: ({ value, observer }) => {
                        if (observer.async) {
                            // 未显式指定 scope，默认 CURRENT = parentPath(['order']) 指向的 order 对象
                            expect(value).toBe(6);
                            resolve();
                        }
                    },
                },
            );
            store.computedObjects.create(
                async (order: any) => order.price * order.count,
                ["./price", "./count"],
                { anchor: { path: ["order", "total"] } },
            );
            setTimeout(() => reject(new Error("异步计算未完成")), 2000);
        });
    });

    test("无context时异步相对depends抛出InvalidDependsError(向后兼容)", () => {
        const store = new AutoStore({ order: { price: 2, count: 3 } });
        expect(() => {
            store.computedObjects.create(
                async (order: any) => order.price * order.count,
                ["./price"],
            );
        }).toThrow(InvalidDependsError);
    });
});
