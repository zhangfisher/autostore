/// <reference types="bun" />
import { describe, test, expect } from "bun:test";
import { AutoStore, computed, delay } from "autostore";
import "../manualComputed"


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

                        onObserverDone: ({ observer: computedObject }) => {
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

                        onObserverDone: ({ observer: computedObject }) => {
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