import { describe, test, expect } from "bun:test";
import { AutoStore, computed, CyleDependError } from "autostore";
import "../cycleDetect";

/**
 * cycleDetect 插件测试
 *
 * 验证循环依赖检测在以下场景中的行为：
 * - 同步静态计算属性构造期间循环
 * - 异步静态计算属性 getter 执行期间循环
 * - 混合同步/异步循环
 * - 无循环时正常工作
 * - 动态创建计算属性时的循环检测
 */

describe("cycleDetect 插件", () => {
    describe("同步静态计算属性-构造期间循环", () => {
        test("两个同步计算属性互相依赖时抛出 CyleDependError", () => {
            expect(() => {
                new AutoStore({
                    a: computed((scope: any) => scope.b, ["./b"]),
                    b: computed((scope: any) => scope.a, ["./a"]),
                });
            }).toThrow(CyleDependError);
        });

        test("三个同步计算属性形成环时抛出 CyleDependError", () => {
            expect(() => {
                new AutoStore({
                    a: computed((scope: any) => scope.b, ["./b"]),
                    b: computed((scope: any) => scope.c, ["./c"]),
                    c: computed((scope: any) => scope.a, ["./a"]),
                });
            }).toThrow(CyleDependError);
        });

        test("同步计算属性无循环时正常创建", () => {
            const store = new AutoStore({
                price: 10,
                count: 3,
                total: computed((scope: any) => scope.price * scope.count, [
                    "./price",
                    "./count",
                ]),
            });
            expect(store.state.total).toBe(30);
        });
    });

    describe("异步静态计算属性-getter 执行期间循环", () => {
        test("两个异步计算属性互相依赖时抛出 CyleDependError", () => {
            return new Promise<void>((resolve, reject) => {
                const store = new AutoStore(
                    {
                        a: computed(
                            async (scope: any) => scope.b?.value ?? 0,
                            ["./b"],
                        ),
                        b: computed(
                            async (scope: any) => scope.a?.value ?? 0,
                            ["./a"],
                        ),
                    },
                    {
                        onObserverError: ({ error }) => {
                            if (error instanceof CyleDependError) {
                                resolve();
                            }
                        },
                    },
                );
                // 触发 a 的 getter 执行
                void store.state.a;
                setTimeout(() => reject(new Error("未检测到循环依赖")), 2000);
            });
        });

        test("异步计算属性无循环时正常执行", () => {
            return new Promise<void>((resolve, reject) => {
                const store = new AutoStore(
                    {
                        price: 10,
                        count: 3,
                        total: computed(
                            async (scope: any) =>
                                scope.price * scope.count,
                            ["./price", "./count"],
                        ),
                    },
                    {
                        onObserverDone: ({ value, observer }) => {
                            if (observer.path.join(".") === "total") {
                                expect(value).toBe(30);
                                resolve();
                            }
                        },
                    },
                );
                setTimeout(() => reject(new Error("异步计算未完成")), 2000);
            });
        });
    });

    describe("混合同步/异步循环", () => {
        test("同步计算依赖异步计算，异步计算又依赖同步计算", () => {
            return new Promise<void>((resolve, reject) => {
                // a 是同步的，依赖 b（异步）
                // b 是异步的，依赖 a（同步）
                // 这种情况下，a 构造时 getter 执行会访问 b
                // b 此时还未创建（因为 a 的构造还没完成），所以不会触发循环检测
                // 但 b 构造后 run() 执行时访问 a，a 已存在，也不会触发循环
                // 所以这种情况不会被检测为循环（是安全的）
                const store = new AutoStore(
                    {
                        a: computed((scope: any) => scope.b?.value ?? 0, [
                            "./b",
                        ]),
                        b: computed(
                            async (scope: any) => scope.a ?? 0,
                            ["./a"],
                        ),
                    },
                    {
                        onObserverDone: ({ observer }) => {
                            if (observer.path.join(".") === "b") {
                                resolve();
                            }
                        },
                    },
                );
                setTimeout(() => reject(new Error("计算未完成")), 2000);
            });
        });
    });

    describe("正常场景", () => {
        test("多个独立计算属性正常工作", () => {
            const store = new AutoStore({
                price: 10,
                count: 3,
                discount: 0.8,
                total: computed(
                    (scope: any) => scope.price * scope.count,
                    ["./price", "./count"],
                ),
                finalPrice: computed(
                    (scope: any) => scope.total * scope.discount,
                    ["./total", "./discount"],
                ),
            });
            expect(store.state.total).toBe(30);
            expect(store.state.finalPrice).toBe(24);
        });

        test("链式依赖正常工作", () => {
            const store = new AutoStore({
                a: 1,
                b: computed((scope: any) => scope.a + 1, ["./a"]),
                c: computed((scope: any) => scope.b + 1, ["./b"]),
                d: computed((scope: any) => scope.c + 1, ["./c"]),
            });
            expect(store.state.b).toBe(2);
            expect(store.state.c).toBe(3);
            expect(store.state.d).toBe(4);
        });
    });

    describe("动态创建计算属性", () => {
        test("动态创建时检测循环依赖", () => {
            const store = new AutoStore({
                a: computed((scope: any) => scope.b, ["./b"]),
            });
            // 动态创建 b，依赖 a，形成循环
            expect(() => {
                store.computedObjects.create(
                    (scope: any) => scope.a,
                    ["./a"],
                    { anchor: { path: ["b"] } },
                );
            }).toThrow(CyleDependError);
        });
    });

    describe("watch 对象不参与循环检测", () => {
        test("watch 不应被检测为循环", () => {
            const store = new AutoStore({
                a: 1,
                b: 2,
            });
            // watch 不参与计算，不应触发循环检测
            expect(() => {
                store.watch((event: any) => {
                    // 监听 a 的变化
                }, { path: ["a"] });
            }).not.toThrow();
        });
    });

    describe("错误消息", () => {
        test("错误消息包含循环路径信息", () => {
            try {
                new AutoStore({
                    a: computed((scope: any) => scope.b, ["./b"]),
                    b: computed((scope: any) => scope.a, ["./a"]),
                });
                expect(true).toBe(false); // 不应执行到这里
            } catch (e) {
                expect(e).toBeInstanceOf(CyleDependError);
                expect((e as Error).message).toContain("circular dependency");
                expect((e as Error).message).toContain("a");
                expect((e as Error).message).toContain("b");
            }
        });
    });
});
