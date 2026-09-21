import { describe, test, expect } from "bun:test";
import { AutoStore, computed, CyleDependError } from "autostore";
import "../cycleDetect";
/**
 * cycleDetect 插件测试
 *
 * 验证循环依赖检测在以下场景中的行为：
 * - 同步静态计算属性构造期间循环
 * - 混合同步/异步场景不误报
 * - 无循环时正常工作
 * - 动态创建计算属性时的循环检测
 *
 * 说明：
 * - 同步计算属性不需要显式声明依赖(自动收集)，直接使用裸函数声明；
 *   computed(fn, deps数组) 是异步计算的声明方式，传入数组依赖会被判定为异步计算
 * - 异步计算属性不参与循环依赖检测(core 的 _running 重入保护兜底)
 * - 循环检测错误记录在嵌套最深层 observer 的 error 属性上，不会中断 store 构造
 */
describe("cycleDetect 插件", () => {
    describe("同步静态计算属性-构造期间循环", () => {
        test("两个同步计算属性互相依赖时检测到 CyleDependError", () => {
            const store = new AutoStore({
                a: (scope: any) => scope.b,
                b: (scope: any) => scope.a,
            });
            // 嵌套创建链 a -> b -> a 命中构造期检测，
            // 错误被同步计算属性的错误处理捕获，记录在嵌套最深层的 b 上
            const b = store.computedObjects.get("b");
            expect(b?.error).toBeInstanceOf(CyleDependError);
        });

        test("三个同步计算属性形成环时检测到 CyleDependError", () => {
            const store = new AutoStore({
                a: (scope: any) => scope.b,
                b: (scope: any) => scope.c,
                c: (scope: any) => scope.a,
            });
            // 嵌套创建链 a -> b -> c -> a 命中检测，错误记录在 c 上
            const c = store.computedObjects.get("c");
            expect(c?.error).toBeInstanceOf(CyleDependError);
        });

        test("同步计算属性无循环时正常创建", () => {
            const store = new AutoStore({
                price: 10,
                count: 3,
                total: (scope: any) => scope.price * scope.count,
            });
            expect(store.state.total).toBe(30);
        });
    });

    describe("异步静态计算属性", () => {
        test("异步计算属性不参与循环检测，无循环时正常执行", () => {
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

        test("异步计算属性互相依赖时不检测为循环", () => {
            return new Promise<void>((resolve, reject) => {
                // 异步计算属性不参与循环依赖检测
                // 依赖变化触发的重算由 core 的重入保护(_running + cancel)兜底
                const store = new AutoStore({
                    a: computed(async (scope: any) => scope.b?.value ?? 0, ["./b"]),
                    b: computed(async (scope: any) => scope.a?.value ?? 0, ["./a"]),
                });
                // 触发 a 的 getter 执行，不应抛出 CyleDependError
                void store.state.a;
                setTimeout(() => resolve(), 100);
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
                        a: (scope: any) => scope.b?.value ?? 0,
                        b: computed(async (scope: any) => scope.a ?? 0, [
                            "./a",
                        ]),
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
                total: (scope: any) => scope.price * scope.count,
                finalPrice: (scope: any) => scope.total * scope.discount,
            });
            expect(store.state.total).toBe(30);
            expect(store.state.finalPrice).toBe(24);
        });

        test("链式依赖正常工作", () => {
            const store = new AutoStore({
                a: 1,
                b: (scope: any) => scope.a + 1,
                c: (scope: any) => scope.b + 1,
                d: (scope: any) => scope.c + 1,
            });
            expect(store.state.b).toBe(2);
            expect(store.state.c).toBe(3);
            expect(store.state.d).toBe(4);
        });
    });

    describe("动态创建计算属性", () => {
        test("动态创建时检测循环依赖", () => {
            // 动态写入的函数属性在首次读取时才创建 observer(构造期检测依赖嵌套创建)，
            // 需配合 lazy 选项阻止构造期间的首次遍历触发 a 的提前创建
            const store = new AutoStore(
                {
                    a: (scope: any) => scope.b,
                },
                { lazy: true },
            );
            // 动态写入 b，依赖 a，形成循环
            (store.state as any).b = (scope: any) => scope.a;
            // 读取 b 触发创建: b -> a -> b 嵌套，构造期检测命中，
            // 错误记录在嵌套内层的 a 上
            void (store.state as any).b;
            const a = store.computedObjects.get("a");
            expect(a?.error).toBeInstanceOf(CyleDependError);
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
                store.watch(["a"], (event: any) => {
                    // 监听 a 的变化
                });
            }).not.toThrow();
        });
    });

    describe("错误消息", () => {
        test("错误消息包含循环路径信息", () => {
            const store = new AutoStore({
                a: (scope: any) => scope.b,
                b: (scope: any) => scope.a,
            });
            const message = String(
                (store.computedObjects.get("b") as any)?.error?.message,
            );
            expect(message).toContain("circular dependency");
            expect(message).toContain("a");
            expect(message).toContain("b");
        });
    });
});
