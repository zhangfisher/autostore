import { describe, test, it, expect } from 'bun:test';
import type { Equal, Expect } from '@type-challenges/utils';
import { AutoStore, computed, RuntimeComputedOptions } from '../../src';

/**
 * Computed 基础类型测试
 * 测试计算属性的类型推断和类型转换
 */
describe('Computed 基础类型', () => {
    test('同步计算返回类型推断', () => {
        const store = new AutoStore({
            // 基础类型计算
            count: 0,
            double: (scope: any) => scope.count * 2,

            // 字符串计算
            firstName: 'zhang',
            lastName: 'san',
            fullName: (scope: any) => scope.firstName + ' ' + scope.lastName,

            // 布尔值计算
            admin: true,
            isAdmin: (scope: any) => scope.admin === true,
        });

        type StateType = typeof store.state;
        type Case = Expect<
            Equal<
                StateType,
                {
                    count: number;
                    double: number;
                    firstName: string;
                    lastName: string;
                    fullName: string;
                    admin: boolean;
                    isAdmin: boolean;
                }
            >
        >;
    });

    test('异步计算返回类型推断', () => {
        const store = new AutoStore({
            // 异步计算返回 AsyncComputedValue
            value: computed(async () => {
                return 1;
            }, []),

            // 异步计算字符串
            name: computed(async () => {
                return 'test';
            }, []),

            // 异步计算对象
            user: computed(async () => {
                return {
                    id: 1,
                    name: '张三',
                };
            }, []),
        });

        type StateType = typeof store.state;
        type ValueType = StateType['value'];
        type Case1 = Expect<
            Equal<
                ValueType,
                {
                    loading: boolean;
                    progress: number;
                    timeout: number;
                    error: any;
                    retry: number;
                    value: number;
                    run: (options?: RuntimeComputedOptions) => void;
                    cancel: () => void;
                }
            >
        >;

        type Case2 = Expect<
            Equal<
                StateType['name'],
                {
                    loading: boolean;
                    progress: number;
                    timeout: number;
                    error: any;
                    retry: number;
                    value: string;
                    run: (options?: RuntimeComputedOptions) => void;
                    cancel: () => void;
                }
            >
        >;

        type Case3 = Expect<
            Equal<
                StateType['user'],
                {
                    loading: boolean;
                    progress: number;
                    timeout: number;
                    error: any;
                    retry: number;
                    value: {
                        id: number;
                        name: string;
                    };
                    run: (options?: RuntimeComputedOptions) => void;
                    cancel: () => void;
                }
            >
        >;
    });

    test('嵌套计算属性类型', () => {
        const store = new AutoStore({
            user: {
                firstName: 'zhang',
                lastName: 'san',
                fullName: (scope: any) => scope.firstName + scope.lastName,
                displayName: (scope: any) => 'Mr. ' + scope.fullName,
            },
        });

        type StateType = typeof store.state;
        type Case = Expect<
            Equal<
                StateType,
                {
                    user: {
                        firstName: string;
                        lastName: string;
                        fullName: any;
                        displayName: string;
                    };
                }
            >
        >;
    });
});

/**
 * AsyncComputedValue 类型测试
 */
describe('AsyncComputedValue 类型', () => {
    test('基础 AsyncComputedValue 类型', () => {
        const store = new AutoStore({
            data: computed(async () => {
                return {
                    id: 1,
                    name: '张三',
                };
            }, []),
        });

        const asyncValue = store.state.data;
        type AsyncValue = typeof asyncValue;

        // AsyncComputedValue 应该包含这些属性
        type Case = Expect<
            Equal<
                keyof AsyncValue,
                'loading' | 'progress' | 'timeout' | 'error' | 'retry' | 'value' | 'run' | 'cancel'
            >
        >;

        // value 属性应该是原始类型
        type ValueType = AsyncValue['value'];
        type Case2 = Expect<Equal<ValueType, { id: number; name: string }>>;

        // loading 应该是 boolean
        type LoadingType = AsyncValue['loading'];
        type Case3 = Expect<Equal<LoadingType, boolean>>;

        // run 方法签名
        type RunType = AsyncValue['run'];
        type Case4 = Expect<Equal<RunType, (options?: RuntimeComputedOptions) => void>>;

        // cancel 方法签名
        type CancelType = AsyncValue['cancel'];
        type Case5 = Expect<Equal<CancelType, () => void>>;
    });
});
