/// <reference types="bun" />
import { describe, test, expect } from "bun:test";
import { AutoStore, computed, ComputedObject } from "../../src";
import { delay } from "flex-tools/async/delay";
import type { AsyncComputedObject } from "../../src/computed";

describe("[简单异步计算] 所有异步计算基础功能", () => {
    describe("[简单异步计算] 异步计算的基础功能", () => {
        test("[简单异步计算] 异步计算的默认值", () => {
            return new Promise<void>((resolve) => {
                const store = new AutoStore(
                    {
                        price: 2,
                        count: 3,
                        total: computed(
                            async (scope) => {
                                return scope.price * scope.count;
                            },
                            ["price", "count"],
                        ),
                    },
                    {
                        // 遍历对象，从而导致计算属性被读取而立刻创建
                        onComputedDone: () => {
                            // 计算完成时触发
                            expect(store.state.total).toEqual(6);
                            resolve();
                        },
                    },
                );
            });
        });

        test("[简单异步计算] 默认异步计算", () => {
            let count: number = 0;
            const results: number[] = [];
            return new Promise<void>((resolve) => {
                const store = new AutoStore(
                    {
                        price: 2,
                        count: 3,
                        total: computed(
                            async (scope) => {
                                count++;
                                return scope.price * scope.count;
                            },
                            ["price", "count"],
                        ),
                    },
                    {
                        // 遍历对象，从而导致计算属性被读取而立刻创建
                        onComputedDone: () => {
                            // 计算完成时触发
                            results.push(store.state.total);
                            if (results.length === 2) {
                                expect(count).toBe(2);
                                expect(results).toEqual([8, 8]);
                                resolve();
                            }
                        },
                    },
                );
                store.state.count = 4;
            });
        });

        test("[简单异步计算] 从异步对象实例读取计算值", () => {
            return new Promise<void>((resolve) => {
                const store = new AutoStore(
                    {
                        price: 2,
                        count: 3,
                        total: computed(
                            async (scope) => {
                                return scope.price * scope.count;
                            },
                            ["price", "count"],
                            { id: "x" },
                        ),
                    },
                    {
                        onComputedDone: () => {
                            const cobj = store.computedObjects.get("x")! as any;
                            expect(cobj.value).toBe(6);
                            resolve();
                        },
                    },
                );
            });
        });
        test("[简单异步计算] 当提供异步计算属性的默认值时不会触发初始计算", () => {
            let count: number = 0;
            return new Promise<void>((resolve) => {
                const store = new AutoStore({
                    price: 2,
                    count: 3,
                    total: computed(
                        async (scope) => {
                            count++;
                            return scope.price * scope.count;
                        },
                        ["price", "count"],
                        {
                            id: "x",
                            initial: 6,
                        },
                    ),
                });
                setTimeout(() => {
                    const cobj = store.computedObjects.get("x")! as any;
                    expect(cobj.value).toBe(6);
                    expect(count).toBe(0); // 提供转让
                    resolve();
                }, 0);
            });
        });
        test("[简单异步计算] 当提供异步计算属性的默认值并且显示指定immediate为true时总会触发初始计算", () => {
            let count: number = 0;
            return new Promise<void>((resolve) => {
                const store = new AutoStore(
                    {
                        price: 2,
                        count: 3,
                        total: computed(
                            async (scope) => {
                                count++;
                                return scope.price * scope.count;
                            },
                            ["price", "count"],
                            {
                                id: "x",
                                initial: 6,
                                immediate: true,
                            },
                        ),
                    },
                    {
                        onComputedDone: () => {
                            const cobj = store.computedObjects.get("x")! as any;
                            expect(cobj.value).toBe(6);
                            expect(count).toBe(1); // 提供转让
                            resolve();
                        },
                    },
                );
                expect(store.state.total).toBe(6);
            });
        });

        test("[简单异步计算] 创建计算对象实例", () => {
            return new Promise<void>((resolve) => {
                const store = new AutoStore(
                    {
                        price: 2,
                        count: 3,
                        total: computed(
                            async (scope) => {
                                return scope.price * scope.count;
                            },
                            ["price", "count"],
                            { id: "x" },
                        ),
                    },
                    {
                        onComputedCreated: (computedObject) => {
                            setTimeout(() => {
                                expect(store.computedObjects.has("x")).toBe(true);
                                expect(computedObject.id).toBe("x");
                                expect(computedObject).toBeInstanceOf(ComputedObject);
                                const obj = store.computedObjects.get("x")!;
                                expect(computedObject).toBe(obj);
                                expect(obj).toBeInstanceOf(ComputedObject);
                                expect(obj.id).toBe("x");
                                expect(obj.enable).toBe(true);
                                expect(obj.depends).toEqual([["price"], ["count"]]);
                                expect(obj.path).toEqual(["total"]);
                                resolve();
                            });
                        },
                    },
                );
            });
        });

        test("[简单异步计算] 全局控制启用与停止计算", () => {
            let count = 0;
            return new Promise<void>((resolve) => {
                const store = new AutoStore(
                    {
                        price: 2,
                        count: 3,
                        total: computed(
                            async (scope) => {
                                count++;
                                return scope.price * scope.count;
                            },
                            ["price", "count"],
                            { id: "x", initial: 6 },
                        ),
                    },
                    {
                        enableComputed: false,

                        onComputedDone: () => {
                            expect(count).toBe(1);
                            resolve();
                        },
                    },
                );
                store.state.count = 4;
                store.state.count = 5;
                store.state.count = 4;
                store.state.count = 5;
                store.computedObjects.enable = true;
                store.state.count = 100;
            });
        });
        test("[简单异步计算] 单独控制计算属性的启用与停止计算", () => {
            return new Promise<void>((resolve) => {
                const store = new AutoStore(
                    {
                        price: 2,
                        count: 3,
                        total1: computed(
                            async (scope) => {
                                return scope.price * scope.count;
                            },
                            ["price", "count"],
                            { id: "x", enable: false, initial: 100 },
                        ),
                        total2: computed(
                            async (scope) => {
                                return scope.price * scope.count;
                            },
                            ["price", "count"],
                            { id: "y", initial: 200 },
                        ),
                    },
                    {
                        onComputedDone: ({ path }) => {
                            expect(path).toStrictEqual(["total2"]);
                            expect(store.state.total1).toBe(100);
                            expect(store.state.total2).toBe(8);
                            resolve();
                        },
                    },
                );
                store.state.count = 4;
            });
        });
        test("[简单异步计算] 通过计算属性对象手动执行计算函数", () => {
            let count = 0;
            return new Promise<void>((resolve) => {
                const store = new AutoStore(
                    {
                        price: 2,
                        count: 3,
                        total: computed(
                            async (scope, { extras }) => {
                                if (extras !== undefined) expect(extras).toBe("hello");
                                return scope.price * scope.count;
                            },
                            ["price", "count"],
                            { id: "x" },
                        ),
                    },
                    {
                        onComputedDone: () => {
                            count++;
                            if (count === 2) {
                                // 第一次是创建时执行，第二次是手动执行
                                resolve();
                            }
                        },
                    },
                );
                store.computedObjects.get("x")!.run({ extras: "hello" });
            });
        });
        test("[简单异步计算] 异步计算属性的计算执行次数，初始化时执行一次", () => {
            return new Promise<void>((resolve) => {
                const store = new AutoStore(
                    {
                        price: 2,
                        count: 3,
                        total: computed(
                            async (scope) => {
                                return scope.price * scope.count;
                            },
                            ["price", "count"],
                            { id: "x" },
                        ),
                    },
                    {
                        onComputedDone: () => {
                            resolve();
                        },
                    },
                );
                store.state.total; // 创建计算属性时，会立即执行一次计算函数
            });
        });

        test("[简单异步计算] 手动执行异步计算属性的计算函数", () => {
            return new Promise<void>((resolve) => {
                const store = new AutoStore({
                    price: 2,
                    count: 3,
                    total: computed(
                        async (scope) => {
                            return scope.price * scope.count;
                        },
                        ["price", "count"],
                        { id: "x", immediate: false },
                    ),
                });
                const asyncObj = store.computedObjects.get("x")! as AsyncComputedObject;
                asyncObj.run().then(() => {
                    expect(store.state.total).toBe(6);
                    resolve();
                });
            });
        });
        test("[简单异步计算] 手动传参覆盖默认的异步计算属性参数，然后运行", () => {
            return new Promise<void>((resolve) => {
                const store = new AutoStore({
                    price: 2,
                    count: 3,
                    total: computed(
                        async (price) => {
                            expect(price).toBe(2);
                            return price * 100;
                        },
                        ["price", "count"],
                        { id: "x", immediate: false },
                    ),
                });
                const asyncObj = store.computedObjects.get("x")! as AsyncComputedObject;
                asyncObj.run({ scope: "price" }).then(() => {
                    //// 运行时修改的scope仅在本次运行中有效，不会影响到下次运行
                    // 默认的scope没有配置是undefined,指向的是当前对象,
                    expect(store.state.total).toBe(200);
                    // @ts-ignore
                    expect(store.computedObjects.get("x")!.options.scope).toBe(undefined);
                    resolve();
                });
            });
        });
    });

    describe("[简单异步计算] immediate 选项测试", () => {
        describe("[简单异步计算] immediate: true", () => {
            test("[简单异步计算] immediate为true时，创建异步计算后马上执行一次", () => {
                let count = 0;
                return new Promise<void>((resolve) => {
                    const store = new AutoStore(
                        {
                            price: 2,
                            count: 3,
                            total: computed(
                                async (scope) => {
                                    count++;
                                    return scope.price * scope.count;
                                },
                                ["price", "count"],
                                {
                                    id: "x",
                                    immediate: true,
                                },
                            ),
                        },
                        {
                            onComputedDone: () => {
                                expect(count).toBe(1);
                                expect(store.state.total).toBe(6);
                                resolve();
                            },
                        },
                    );
                });
            });

            test("[简单异步计算] immediate为true时，即使有initial值也会马上执行一次", () => {
                let count = 0;
                return new Promise<void>((resolve) => {
                    const store = new AutoStore(
                        {
                            price: 2,
                            count: 3,
                            total: computed(
                                async (scope) => {
                                    count++;
                                    return scope.price * scope.count;
                                },
                                ["price", "count"],
                                {
                                    id: "x",
                                    immediate: true,
                                    initial: 100,
                                },
                            ),
                        },
                        {
                            onComputedDone: () => {
                                expect(count).toBe(1);
                                expect(store.state.total).toBe(6);
                                resolve();
                            },
                        },
                    );
                });
            });
        });

        describe("[简单异步计算] immediate: false", () => {
            test("[简单异步计算] immediate为false时，创建异步计算后不马上执行", () => {
                let count = 0;
                return new Promise<void>((resolve) => {
                    const store = new AutoStore({
                        price: 2,
                        count: 3,
                        total: computed(
                            async (scope) => {
                                count++;
                                return scope.price * scope.count;
                            },
                            ["price", "count"],
                            {
                                id: "x",
                                immediate: false,
                            },
                        ),
                    });

                    setTimeout(() => {
                        expect(count).toBe(0);
                        expect(store.state.total).toBeUndefined();
                        resolve();
                    }, 10);
                });
            });

            test("[简单异步计算] immediate为false时，依赖变化后会执行计算", () => {
                let count = 0;
                return new Promise<void>((resolve) => {
                    const store = new AutoStore(
                        {
                            price: 2,
                            count: 3,
                            total: computed(
                                async (scope) => {
                                    count++;
                                    return scope.price * scope.count;
                                },
                                ["price", "count"],
                                {
                                    id: "x",
                                    immediate: false,
                                },
                            ),
                        },
                        {
                            onComputedDone: () => {
                                expect(count).toBe(1);
                                expect(store.state.total).toBe(8);
                                resolve();
                            },
                        },
                    );

                    // 触发依赖变化
                    store.state.count = 4;
                });
            });
        });

        describe("[简单异步计算] immediate: auto", () => {
            test("[简单异步计算] immediate为auto且没有initial值时，创建后马上执行一次", () => {
                let count = 0;
                return new Promise<void>((resolve) => {
                    const store = new AutoStore(
                        {
                            price: 2,
                            count: 3,
                            total: computed(
                                async (scope) => {
                                    count++;
                                    return scope.price * scope.count;
                                },
                                ["price", "count"],
                                {
                                    id: "x",
                                    immediate: "auto",
                                },
                            ),
                        },
                        {
                            onComputedDone: () => {
                                expect(count).toBe(1);
                                expect(store.state.total).toBe(6);
                                resolve();
                            },
                        },
                    );
                });
            });

            test("[简单异步计算] immediate为auto且有initial值时，创建后不马上执行", () => {
                let count = 0;
                return new Promise<void>((resolve) => {
                    const store = new AutoStore({
                        price: 2,
                        count: 3,
                        total: computed(
                            async (scope) => {
                                count++;
                                return scope.price * scope.count;
                            },
                            ["price", "count"],
                            {
                                id: "x",
                                immediate: "auto",
                                initial: 100,
                            },
                        ),
                    });

                    setTimeout(() => {
                        expect(count).toBe(0);
                        expect(store.state.total).toBe(100);
                        resolve();
                    }, 10);
                });
            });

            test("[简单异步计算] immediate为auto且有initial值时，依赖变化后会执行计算", () => {
                let count = 0;
                return new Promise<void>((resolve) => {
                    const store = new AutoStore(
                        {
                            price: 2,
                            count: 3,
                            total: computed(
                                async (scope) => {
                                    count++;
                                    return scope.price * scope.count;
                                },
                                ["price", "count"],
                                {
                                    id: "x",
                                    immediate: "auto",
                                    initial: 100,
                                },
                            ),
                        },
                        {
                            onComputedDone: () => {
                                expect(count).toBe(1);
                                expect(store.state.total).toBe(8);
                                resolve();
                            },
                        },
                    );

                    // 触发依赖变化
                    store.state.count = 4;
                });
            });
        });

        describe("[简单异步计算] immediate 默认行为", () => {
            test("[简单异步计算] 未指定immediate且没有initial值时，默认行为类似于auto（马上执行）", () => {
                let count = 0;
                return new Promise<void>((resolve) => {
                    const store = new AutoStore(
                        {
                            price: 2,
                            count: 3,
                            total: computed(
                                async (scope) => {
                                    count++;
                                    return scope.price * scope.count;
                                },
                                ["price", "count"],
                                {
                                    id: "x",
                                },
                            ),
                        },
                        {
                            onComputedDone: () => {
                                expect(count).toBe(1);
                                expect(store.state.total).toBe(6);
                                resolve();
                            },
                        },
                    );
                });
            });

            test("[简单异步计算] 未指定immediate且有initial值时，默认不马上执行", () => {
                let count = 0;
                return new Promise<void>((resolve) => {
                    const store = new AutoStore({
                        price: 2,
                        count: 3,
                        total: computed(
                            async (scope) => {
                                count++;
                                return scope.price * scope.count;
                            },
                            ["price", "count"],
                            {
                                id: "x",
                                initial: 100,
                            },
                        ),
                    });

                    setTimeout(() => {
                        expect(count).toBe(0);
                        expect(store.state.total).toBe(100);
                        resolve();
                    }, 10);
                });
            });
        });
    });

    describe("[简单异步计算] 执行分组或满足条件的计算函数", () => {
        test("[简单异步计算] 异步计算分组", () => {
            const results: string[] = [];
            return new Promise<void>((resolve) => {
                const store = new AutoStore(
                    {
                        price: 2,
                        count: 3,
                        total1: computed(
                            async (scope) => {
                                return scope.price * scope.count;
                            },
                            ["price", "count"],
                            { group: "a" },
                        ),
                        total2: computed(
                            async (scope) => {
                                return scope.price * scope.count;
                            },
                            ["price", "count"],
                            { group: "a" },
                        ),
                        total3: computed(
                            async (scope) => {
                                return scope.price * scope.count;
                            },
                            ["price", "count"],
                            { group: "b" },
                        ),
                        total4: computed(
                            async (scope) => {
                                return scope.price * scope.count;
                            },
                            ["price", "count"],
                            { group: "b" },
                        ),
                        total5: computed(
                            async (scope) => {
                                return scope.price * scope.count;
                            },
                            ["price", "count"],
                            { group: "c" },
                        ),
                        total6: computed(
                            async (scope) => {
                                return scope.price * scope.count;
                            },
                            ["price", "count"],
                            { group: "c" },
                        ),
                    },
                    {
                        // 遍历对象，从而导致计算属性被读取而立刻创建

                        onComputedDone: ({ computedObject }) => {
                            results.push(computedObject.path!.join(","));
                            if (results.length === 12) {
                                expect(results).toStrictEqual([
                                    "total1",
                                    "total2",
                                    "total3",
                                    "total4",
                                    "total5",
                                    "total6",
                                    "total1",
                                    "total2",
                                    "total3",
                                    "total4",
                                    "total5",
                                    "total6",
                                ]);
                                resolve();
                            }
                        },
                    },
                );
                // 手动控制运行分组a
                store.computedObjects.runGroup("a");
                store.computedObjects.runGroup("b");
                store.computedObjects.runGroup("c");
            });
        });
        test("[简单异步计算] 手动执行满足条件的计算", () => {
            const results: string[] = [];
            return new Promise<void>((resolve) => {
                const store = new AutoStore(
                    {
                        price: 2,
                        count: 3,
                        total1: computed(
                            async (scope) => {
                                return scope.price * scope.count;
                            },
                            ["price", "count"],
                            { id: "a", group: "a", initial: 0 },
                        ),
                        total2: computed(
                            async (scope) => {
                                return scope.price * scope.count;
                            },
                            ["price", "count"],
                            { id: "b", group: "a", initial: 0 },
                        ),
                        total3: computed(
                            async (scope) => {
                                return scope.price * scope.count;
                            },
                            ["price", "count"],
                            { id: "c", group: "b", initial: 0 },
                        ),
                        total4: computed(
                            async (scope) => {
                                return scope.price * scope.count;
                            },
                            ["price", "count"],
                            { id: "d", group: "b", initial: 0 },
                        ),
                        total5: computed(
                            async (scope) => {
                                return scope.price * scope.count;
                            },
                            ["price", "count"],
                            { id: "e", group: "c", initial: 0 },
                        ),
                        total6: computed(
                            async (scope) => {
                                return scope.price * scope.count;
                            },
                            ["price", "count"],
                            { id: "f", group: "c", initial: 0 },
                        ),
                    },
                    {
                        // 遍历对象，从而导致计算属性被读取而立刻创建，注意是创建而不是执行

                        onComputedDone: ({ computedObject }) => {
                            results.push(computedObject.path!.join(","));
                            if (results.length === 3) {
                                expect(results).toStrictEqual(["total1", "total3", "total5"]);
                                resolve();
                            }
                        },
                    },
                );
                store.computedObjects.run((obj) => {
                    return ["a", "c", "e"].includes(obj.id);
                });
            });
        });
        test("[简单异步计算] 指定超时手动执行满足条件的计算", () => {
            return new Promise<void>((resolve) => {
                const store = new AutoStore({
                    price: 2,
                    count: 3,
                    total1: computed(
                        async (scope) => {
                            await delay(5000);
                            return scope.price * scope.count;
                        },
                        ["price", "count"],
                        { id: "a", group: "a", initial: 0 },
                    ),
                    total2: computed(
                        async (scope) => {
                            await delay(5000);
                            return scope.price * scope.count;
                        },
                        ["price", "count"],
                        { id: "b", group: "a", initial: 0 },
                    ),
                    total3: computed(
                        async (scope) => {
                            await delay(5000);
                            return scope.price * scope.count;
                        },
                        ["price", "count"],
                        { id: "c", group: "b", initial: 0 },
                    ),
                    total4: computed(
                        async (scope) => {
                            await delay(5000);
                            return scope.price * scope.count;
                        },
                        ["price", "count"],
                        { id: "d", group: "b", initial: 0 },
                    ),
                    total5: computed(
                        async (scope) => {
                            await delay(5000);
                            return scope.price * scope.count;
                        },
                        ["price", "count"],
                        { id: "e", group: "c", initial: 0 },
                    ),
                    total6: computed(
                        async (scope) => {
                            await delay(5000);
                            return scope.price * scope.count;
                        },
                        ["price", "count"],
                        { id: "f", group: "c", initial: 0 },
                    ),
                });
                store.computedObjects
                    .run(
                        (obj) => {
                            return ["a", "c", "e"].includes(obj.id);
                        },
                        {},
                        { timeout: 200, wait: true },
                    )
                    .catch((e) => {
                        expect(e).toBeInstanceOf(Error);
                        resolve();
                    });
            });
        });
    });
    describe("[简单异步计算] 异步计算的loading状态", () => {
        test("[简单异步计算] 异步计算的默认加载状态", () => {
            return new Promise<void>((resolve) => {
                const store = new AutoStore(
                    {
                        price: 2,
                        count: 3,
                        loading: false,
                        total: computed(
                            async (scope) => {
                                expect(store.state.loading).toBeTruthy();
                                await delay(10);
                                return scope.price * scope.count;
                            },
                            ["price", "count"],
                            {
                                initial: 5,
                                reports: {
                                    loading: "./loading",
                                },
                            },
                        ),
                    },
                    {
                        // 遍历对象，从而导致计算属性被读取而立刻创建
                        onComputedDone: () => {
                            // 计算完成时触发
                            expect(store.state.total).toEqual(8);
                            expect(store.state.loading).toBeFalsy();
                            resolve();
                        },
                    },
                );
                store.state.count++;
            });
        });

        test("[简单异步计算] 使用绝对路径设置loading状态", () => {
            return new Promise<void>((resolve) => {
                const store = new AutoStore(
                    {
                        price: 2,
                        count: 3,
                        ui: {
                            loading: false,
                        },
                        total: computed(
                            async (scope) => {
                                expect(store.state.ui.loading).toBeTruthy();
                                await delay(10);
                                return scope.price * scope.count;
                            },
                            ["price", "count"],
                            {
                                initial: 5,
                                reports: {
                                    loading: "ui.loading",
                                },
                            },
                        ),
                    },
                    {
                        onComputedDone: () => {
                            expect(store.state.total).toEqual(8);
                            expect(store.state.ui.loading).toBeFalsy();
                            resolve();
                        },
                    },
                );
                store.state.count++;
            });
        });

        test("[简单异步计算] 使用数组形式绝对路径设置loading状态", () => {
            return new Promise<void>((resolve) => {
                const store = new AutoStore(
                    {
                        price: 2,
                        count: 3,
                        ui: {
                            loading: false,
                        },
                        total: computed(
                            async (scope) => {
                                expect(store.state.ui.loading).toBeTruthy();
                                await delay(10);
                                return scope.price * scope.count;
                            },
                            ["price", "count"],
                            {
                                initial: 5,
                                reports: {
                                    loading: ["ui", "loading"],
                                },
                            },
                        ),
                    },
                    {
                        onComputedDone: () => {
                            expect(store.state.total).toEqual(8);
                            expect(store.state.ui.loading).toBeFalsy();
                            resolve();
                        },
                    },
                );
                store.state.count++;
            });
        });

        test("[简单异步计算] 在嵌套对象中使用相对路径设置loading状态", () => {
            return new Promise<void>((resolve) => {
                const store = new AutoStore(
                    {
                        data: {
                            price: 2,
                            count: 3,
                            loading: false,
                            total: computed(
                                async (scope) => {
                                    expect(store.state.data.loading).toBeTruthy();
                                    await delay(10);
                                    return scope.price * scope.count;
                                },
                                ["./price", "./count"],
                                {
                                    initial: 5,
                                    reports: {
                                        loading: "./loading",
                                    },
                                },
                            ),
                        },
                    },
                    {
                        onComputedDone: () => {
                            expect(store.state.data.total).toEqual(8);
                            expect(store.state.data.loading).toBeFalsy();
                            resolve();
                        },
                    },
                );
                store.state.data.count++;
            });
        });

        test("[简单异步计算] 使用父级相对路径设置loading状态", () => {
            return new Promise<void>((resolve) => {
                const store = new AutoStore(
                    {
                        loading: false,
                        data: {
                            price: 2,
                            count: 3,
                            total: computed(
                                async (scope) => {
                                    expect(store.state.loading).toBeTruthy();
                                    await delay(10);
                                    return scope.price * scope.count;
                                },
                                ["./price", "./count"],
                                {
                                    initial: 5,
                                    reports: {
                                        loading: "../loading",
                                    },
                                },
                            ),
                        },
                    },
                    {
                        onComputedDone: () => {
                            expect(store.state.data.total).toEqual(8);
                            expect(store.state.loading).toBeFalsy();
                            resolve();
                        },
                    },
                );
                store.state.data.count++;
            });
        });

        test("[简单异步计算] 计算出错时loading状态正确重置", () => {
            return new Promise<void>((resolve) => {
                const store = new AutoStore(
                    {
                        price: 2,
                        count: 3,
                        loading: false,
                        error: undefined as string | undefined,
                        total: computed(
                            async (scope) => {
                                expect(store.state.loading).toBeTruthy();
                                await delay(10);
                                throw new Error("计算错误");
                            },
                            ["price", "count"],
                            {
                                initial: 5,
                                reports: {
                                    loading: "./loading",
                                    error: "./error",
                                },
                            },
                        ),
                    },
                    {
                        onComputedError: () => {
                            expect(store.state.loading).toBeFalsy();
                            expect(store.state.total).toEqual(5); // 保持初始值
                            expect(store.state.error).toBe("计算错误");
                            resolve();
                        },
                    },
                );
                store.state.count++;
            });
        });

        test("[简单异步计算] 多次计算时loading状态正确切换", () => {
            const loadingStates: boolean[] = [];
            return new Promise<void>((resolve) => {
                const store = new AutoStore(
                    {
                        price: 2,
                        count: 3,
                        loading: false,
                        total: computed(
                            async (scope) => {
                                loadingStates.push(store.state.loading);
                                await delay(10);
                                return scope.price * scope.count;
                            },
                            ["price", "count"],
                            {
                                initial: 0,
                                reports: {
                                    loading: "./loading",
                                },
                            },
                        ),
                    },
                    {
                        onComputedDone: () => {
                            if (store.state.count === 5) {
                                // 第一次计算: loadingStates = [true]
                                // 第二次计算: loadingStates = [true, true]
                                expect(loadingStates).toEqual([true, true]);
                                expect(store.state.loading).toBeFalsy();
                                expect(store.state.total).toEqual(10);
                                resolve();
                            }
                        },
                    },
                );
                // 触发第一次计算
                store.state.count = 4;
                // 触发第二次计算
                setTimeout(() => {
                    store.state.count = 5;
                }, 20);
            });
        });

        test("[简单异步计算] 不指定reports.loading时不设置loading状态", () => {
            return new Promise<void>((resolve) => {
                const store = new AutoStore(
                    {
                        price: 2,
                        count: 3,
                        loading: false,
                        total: computed(
                            async (scope) => {
                                expect(store.state.loading).toBeFalsy(); // 保持原值
                                await delay(10);
                                return scope.price * scope.count;
                            },
                            ["price", "count"],
                            {
                                initial: 5,
                            },
                        ),
                    },
                    {
                        onComputedDone: () => {
                            expect(store.state.total).toEqual(8);
                            expect(store.state.loading).toBeFalsy();
                            resolve();
                        },
                    },
                );
                store.state.count++;
            });
        });

        test("[简单异步计算] 相对路径指向嵌套对象的loading", () => {
            return new Promise<void>((resolve) => {
                const store = new AutoStore(
                    {
                        price: 2,
                        count: 3,
                        status: {
                            loading: false,
                        },
                        total: computed(
                            async (scope) => {
                                expect(store.state.status.loading).toBeTruthy();
                                await delay(10);
                                return scope.price * scope.count;
                            },
                            ["price", "count"],
                            {
                                initial: 5,
                                reports: {
                                    loading: "./status.loading",
                                },
                            },
                        ),
                    },
                    {
                        onComputedDone: () => {
                            expect(store.state.total).toEqual(8);
                            expect(store.state.status.loading).toBeFalsy();
                            resolve();
                        },
                    },
                );
                store.state.count++;
            });
        });
    });

    describe("[简单异步计算] 异步计算的error状态", () => {
        test("[简单异步计算] 异步计算的默认错误状态", () => {
            return new Promise<void>((resolve) => {
                const store = new AutoStore(
                    {
                        price: 2,
                        count: 3,
                        error: undefined as string | undefined,
                        total: computed(
                            async (scope) => {
                                await delay(10);
                                throw new Error("计算错误");
                            },
                            ["price", "count"],
                            {
                                initial: 5,
                                reports: {
                                    error: "./error",
                                },
                            },
                        ),
                    },
                    {
                        onComputedError: ({ error }) => {
                            expect(error.message).toBe("计算错误");
                            expect(store.state.error).toBe("计算错误");
                            expect(store.state.total).toEqual(5); // 保持初始值
                            resolve();
                        },
                    },
                );
                store.state.count++;
            });
        });

        test("[简单异步计算] 使用绝对路径设置error状态", () => {
            return new Promise<void>((resolve) => {
                const store = new AutoStore(
                    {
                        price: 2,
                        count: 3,
                        ui: {
                            error: undefined as string | undefined,
                        },
                        total: computed(
                            async (scope) => {
                                await delay(10);
                                throw new Error("计算失败");
                            },
                            ["price", "count"],
                            {
                                initial: 5,
                                reports: {
                                    error: "ui.error",
                                },
                            },
                        ),
                    },
                    {
                        onComputedError: () => {
                            expect(store.state.ui.error).toBe("计算失败");
                            expect(store.state.total).toEqual(5);
                            resolve();
                        },
                    },
                );
                store.state.count++;
            });
        });

        test("[简单异步计算] 使用数组形式绝对路径设置error状态", () => {
            return new Promise<void>((resolve) => {
                const store = new AutoStore(
                    {
                        price: 2,
                        count: 3,
                        ui: {
                            error: undefined as string | undefined,
                        },
                        total: computed(
                            async (scope) => {
                                await delay(10);
                                throw new Error("数组路径错误");
                            },
                            ["price", "count"],
                            {
                                initial: 5,
                                reports: {
                                    error: ["ui", "error"],
                                },
                            },
                        ),
                    },
                    {
                        onComputedError: () => {
                            expect(store.state.ui.error).toBe("数组路径错误");
                            expect(store.state.total).toEqual(5);
                            resolve();
                        },
                    },
                );
                store.state.count++;
            });
        });

        test("[简单异步计算] 在嵌套对象中使用相对路径设置error状态", () => {
            return new Promise<void>((resolve) => {
                const store = new AutoStore(
                    {
                        data: {
                            price: 2,
                            count: 3,
                            error: undefined as string | undefined,
                            total: computed(
                                async (_scope) => {
                                    await delay(10);
                                    throw new Error("嵌套对象错误");
                                },
                                ["./price", "./count"],
                                {
                                    initial: 5,
                                    reports: {
                                        error: "./error",
                                    },
                                },
                            ),
                        },
                    },
                    {
                        onComputedError: () => {
                            expect(store.state.data.error).toBe("嵌套对象错误");
                            expect(store.state.data.total).toEqual(5);
                            resolve();
                        },
                    },
                );
                store.state.data.count++;
            });
        });

        test("[简单异步计算] 使用父级相对路径设置error状态", () => {
            return new Promise<void>((resolve) => {
                const store = new AutoStore(
                    {
                        error: undefined as string | undefined,
                        data: {
                            price: 2,
                            count: 3,
                            total: computed(
                                async (_scope) => {
                                    await delay(10);
                                    throw new Error("父级路径错误");
                                },
                                ["./price", "./count"],
                                {
                                    initial: 5,
                                    reports: {
                                        error: "../error",
                                    },
                                },
                            ),
                        },
                    },
                    {
                        onComputedError: () => {
                            expect(store.state.error).toBe("父级路径错误");
                            expect(store.state.data.total).toEqual(5);
                            resolve();
                        },
                    },
                );
                store.state.data.count++;
            });
        });

        test("[简单异步计算] 计算成功时error状态被清除", () => {
            return new Promise<void>((resolve) => {
                const store = new AutoStore(
                    {
                        price: 2,
                        count: 3,
                        error: "之前的错误" as string | undefined,
                        total: computed(
                            async (scope) => {
                                await delay(10);
                                return scope.price * scope.count;
                            },
                            ["price", "count"],
                            {
                                initial: 5,
                                reports: {
                                    error: "./error",
                                },
                            },
                        ),
                    },
                    {
                        onComputedDone: () => {
                            expect(store.state.total).toEqual(8);
                            expect(store.state.error).toBeUndefined();
                            resolve();
                        },
                    },
                );
                store.state.count++;
            });
        });

        test("[简单异步计算] 多次计算时error状态正确切换", () => {
            const errorStates: (string | undefined)[] = [];
            return new Promise<void>((resolve) => {
                let shouldThrow = true;
                const store = new AutoStore(
                    {
                        price: 2,
                        count: 3,
                        error: undefined as string | undefined,
                        total: computed(
                            async (scope) => {
                                await delay(10);
                                if (shouldThrow) {
                                    throw new Error("计算错误");
                                }
                                return scope.price * scope.count;
                            },
                            ["price", "count"],
                            {
                                initial: 0,
                                reports: {
                                    error: "./error",
                                },
                            },
                        ),
                    },
                    {
                        onComputedDone: () => {
                            // 第二次计算成功
                            expect(store.state.error).toBeUndefined();
                            expect(store.state.total).toEqual(10);
                            expect(errorStates).toEqual(["计算错误", undefined]);
                            resolve();
                        },
                        onComputedError: () => {
                            // 第一次计算失败
                            errorStates.push(store.state.error);
                            shouldThrow = false;
                            // 触发第二次计算
                            setTimeout(() => {
                                store.state.count = 5;
                            }, 20);
                        },
                    },
                );
                // 触发第一次计算
                store.state.count = 4;
            });
        });

        test("[简单异步计算] 不指定reports.error时不设置error状态", () => {
            return new Promise<void>((resolve) => {
                const store = new AutoStore(
                    {
                        price: 2,
                        count: 3,
                        error: undefined as string | undefined,
                        total: computed(
                            async (scope) => {
                                await delay(10);
                                throw new Error("不应该被记录");
                            },
                            ["price", "count"],
                            {
                                initial: 5,
                            },
                        ),
                    },
                    {
                        onComputedError: () => {
                            expect(store.state.error).toBeUndefined(); // 保持原值
                            expect(store.state.total).toEqual(5);
                            resolve();
                        },
                    },
                );
                store.state.count++;
            });
        });

        test("[简单异步计算] 相对路径指向嵌套对象的error", () => {
            return new Promise<void>((resolve) => {
                const store = new AutoStore(
                    {
                        price: 2,
                        count: 3,
                        status: {
                            error: undefined as string | undefined,
                        },
                        total: computed(
                            async (_scope) => {
                                await delay(10);
                                throw new Error("嵌套状态错误");
                            },
                            ["price", "count"],
                            {
                                initial: 5,
                                reports: {
                                    error: "./status.error",
                                },
                            },
                        ),
                    },
                    {
                        onComputedError: () => {
                            expect(store.state.status.error).toBe("嵌套状态错误");
                            expect(store.state.total).toEqual(5);
                            resolve();
                        },
                    },
                );
                store.state.count++;
            });
        });

        test("[简单异步计算] 同时设置loading和error状态", () => {
            return new Promise<void>((resolve) => {
                const store = new AutoStore(
                    {
                        price: 2,
                        count: 3,
                        loading: false,
                        error: undefined as string | undefined,
                        total: computed(
                            async (_scope) => {
                                expect(store.state.loading).toBeTruthy();
                                expect(store.state.error).toBeUndefined();
                                await delay(10);
                                throw new Error("计算错误");
                            },
                            ["price", "count"],
                            {
                                initial: 5,
                                reports: {
                                    loading: "./loading",
                                    error: "./error",
                                },
                            },
                        ),
                    },
                    {
                        onComputedError: () => {
                            expect(store.state.loading).toBeFalsy();
                            expect(store.state.error).toBe("计算错误");
                            expect(store.state.total).toEqual(5);
                            resolve();
                        },
                    },
                );
                store.state.count++;
            });
        });
    });
});
