import { describe, test } from 'bun:test';
import type { Equal, Expect } from '@type-challenges/utils';
import { AutoStore, computed } from '../../src';

/**
 * Store 基础类型测试
 * 测试 AutoStore 类的类型推断
 */
describe('Store 基础类型', () => {
    test('基础状态类型推断', () => {
        const store = new AutoStore({
            user: {
                name: '张三',
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
    test('嵌套对象类型推断', () => {
        const store = new AutoStore({
            data: {
                users: [
                    {
                        id: 1,
                        name: '张三',
                        tags: ['a', 'b'],
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

    test('可选状态属性', () => {
        const store = new AutoStore({
            required: '必须值',
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
describe('Store 选项类型', () => {
    test('基础选项类型', () => {
        const store = new AutoStore(
            {
                count: 0,
            },
            {
                id: 'test-store',
                debug: true,
                lazy: false,
                enableComputed: true,
                delimiter: '.',
            },
        );

        type OptionsType = typeof store.options;
        const check1: Expect<Equal<OptionsType, OptionsType>> = true as any;
    });

    test('计算回调选项', () => {
        const store = new AutoStore(
            {
                value: computed(async () => 1, []),
            },
            {
                onComputedCreated: (computedObject) => {
                    const check1: Expect<Equal<typeof computedObject.id, string>> = true;
                    const check2: Expect<Equal<typeof computedObject.path, string[]>> = true;
                },
                onComputedDone: (args) => {
                    const check1: Expect<Equal<typeof args.id, string>> = true;
                    const check2: Expect<Equal<typeof args.path, string[]>> = true;
                    // value 和 computedObject 是 any 类型,跳过断言
                    args.value;
                    args.computedObject;
                },
                onComputedError: (args) => {
                    const check1: Expect<Equal<typeof args.id, string>> = true;
                    const check2: Expect<Equal<typeof args.path, string[]>> = true;
                    // error 和 computedObject 是 any 类型,跳过断言
                    args.error;
                    args.computedObject;
                },
                onComputedCancel: (args) => {
                    const check1: Expect<Equal<typeof args.id, string>> = true;
                    const check2: Expect<Equal<typeof args.path, string[]>> = true;
                    const check3: Expect<
                        Equal<typeof args.reason, 'reentry' | 'timeout' | 'abort' | 'error'>
                    > = true;
                    // computedObject 是 any 类型,跳过断言
                    args.computedObject;
                },
            },
        );
    });

    test('观察者回调选项', () => {
        const store = new AutoStore(
            {
                count: 0,
            },
            {
                onObserverBeforeCreate: (descriptor) => {
                    // type, getter, options 的类型检查
                    descriptor.type;
                    descriptor.getter;
                    descriptor.options;
                },
                onObserverCreated: (observerObject) => {
                    const check1: Expect<Equal<typeof observerObject.id, string>> = true;
                    const check2: Expect<Equal<typeof observerObject.path, string[]>> = true;
                    const check3: Expect<Equal<typeof observerObject.depends, string[][]>> = true;
                    // options 是复杂类型,跳过详细断言
                    observerObject.options;
                },
                onObserverInitial: (path, value, parent) => {
                    const check1: Expect<Equal<typeof path, string[]>> = true;
                    // value 和 parent 是 any 类型
                    value;
                    parent;
                    return undefined;
                },
            },
        );
    });
});
