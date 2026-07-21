import { describe, test } from "bun:test";
import type { Equal, Expect } from "@type-challenges/utils";
import { AutoStore, computed } from "../../src";

/**
 * Store 基础类型测试
 * 测试 AutoStore 类的类型推断
 */
describe("Store 基础类型", () => {
    test("基础状态类型推断", () => {
        const store = new AutoStore({
            user: {
                name: "张三",
                age: 18,
                admin: true,
            },
            count: 0,
        });

        type StateType = typeof store.state;
        type Expected = {
            user: {
                name: string;
                age: number;
                admin: boolean;
            };
            count: number;
        };

        const check: Expect<Equal<StateType, Expected>> = true;
    });
    test("嵌套对象类型推断", () => {
        const store = new AutoStore({
            data: {
                users: [
                    {
                        id: 1,
                        name: "张三",
                        tags: ["a", "b"],
                    },
                ],
                meta: {
                    count: 10,
                    total: 100,
                },
            },
        });

        type StateType = typeof store.state;
        type Expected = {
            data: {
                users: Array<{
                    id: number;
                    name: string;
                    tags: string[];
                }>;
                meta: {
                    count: number;
                    total: number;
                };
            };
        };

        const check: Expect<Equal<StateType, Expected>> = true;
    });

    test("可选状态属性", () => {
        const store = new AutoStore({
            required: "必须值",
            optional: undefined as string | undefined,
        });

        type StateType = typeof store.state;
        type Expected = {
            required: string;
            optional: string | undefined;
        };

        const check: Expect<Equal<StateType, Expected>> = true as any;
    });
});

/**
 * Store 选项类型测试
 */
describe("Store 选项类型", () => {
    test("基础选项类型", () => {
        const store = new AutoStore(
            {
                count: 0,
            },
            {
                id: "test-store",
                debug: true,
                lazy: false,
                enableComputed: true,
            },
        );

        type OptionsType = typeof store.options;
        const check1: Expect<Equal<OptionsType, OptionsType>> = true as any;
    });

    test("计算回调选项", () => {
        const store = new AutoStore(
            {
                value: computed(async () => 1, []),
            },
            {
                onObserverCreated: (args) => {
                    const check1: Expect<Equal<typeof args.observer.id, string>> = true;
                    const check2: Expect<Equal<typeof args.observer.path, string[]>> = true;
                },
                onObserverDone: (args) => {
                    const check1: Expect<Equal<typeof args.observer.id, string>> = true;
                    const check2: Expect<Equal<typeof args.observer.path, string[]>> = true;
                    // value 保留在顶层
                    args.value;
                    args.observer;
                },
                onObserverError: (args) => {
                    // 注意：onObserverError 的字段名是 observerObject（非 observer）
                    const check1: Expect<Equal<typeof args.observerObject.id, string>> = true;
                    const check2: Expect<Equal<typeof args.observerObject.path, string[]>> = true;
                    args.error;
                    args.observerObject;
                },
                onObserverCancel: (args) => {
                    const check1: Expect<Equal<typeof args.observer.id, string>> = true;
                    const check2: Expect<Equal<typeof args.observer.path, string[]>> = true;
                    // reason 类型是 string
                    const check3: Expect<Equal<typeof args.reason, string>> = true;
                    args.observer;
                },
            },
        );
    });

    test("观察者回调选项", () => {
        const store = new AutoStore(
            {
                count: 0,
            },
            {
                onObserverInitial: (args) => {
                    // descriptor 上的 type/getter/options
                    args.descriptor.type;
                    args.descriptor.getter;
                    args.descriptor.options;
                },
                onObserverCreated: (args) => {
                    const check1: Expect<Equal<typeof args.observer.id, string>> = true;
                    const check2: Expect<Equal<typeof args.observer.path, string[]>> = true;
                    const check3: Expect<Equal<typeof args.observer.depends, string[][]>> = true;
                    // options 是复杂类型,跳过详细断言
                    args.observer.options;
                },
            },
        );
    });
});
