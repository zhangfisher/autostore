import { describe, test } from 'bun:test';
import type { Equal, Expect } from '@type-challenges/utils';
import { AutoStore, computed } from '../../src';
import type { ComputedState } from '../../src';

/**
 * 响应式状态基础测试
 */
describe('响应式状态 - 基础类型', () => {
    test('字符串类型保持', () => {
        const store = new AutoStore({
            name: '张三',
        });

        type NameType = typeof store.state.name;
        const check: Expect<Equal<NameType, string>> = true;
    });

    test('数字类型保持', () => {
        const store = new AutoStore({
            count: 0,
            age: 18,
        });

        type CountType = typeof store.state.count;
        const check1: Expect<Equal<CountType, number>> = true;

        type AgeType = typeof store.state.age;
        const check2: Expect<Equal<AgeType, number>> = true;
    });

    test('布尔类型保持', () => {
        const store = new AutoStore({
            admin: true,
            visible: false,
        });

        type AdminType = typeof store.state.admin;
        const check1: Expect<Equal<AdminType, boolean>> = true;

        type VisibleType = typeof store.state.visible;
        const check2: Expect<Equal<VisibleType, boolean>> = true;
    });

    test('null 和 undefined 保持', () => {
        const store = new AutoStore({
            nullValue: null,
            undefValue: undefined,
        });

        type NullType = typeof store.state.nullValue;
        const check1: Expect<Equal<NullType, null>> = true;

        type UndefType = typeof store.state.undefValue;
        const check2: Expect<Equal<UndefType, undefined>> = true;
    });
});

/**
 * 响应式状态 - 函数转换
 */
describe('响应式状态 - 函数转换', () => {
    test('函数转换为返回值类型', () => {
        const store = new AutoStore({
            count: 0,
            double: (scope: any) => scope.count * 2,
        });

        type DoubleType = typeof store.state.double;
        const check: Expect<Equal<DoubleType, number>> = true;
    });

    test('嵌套函数转换', () => {
        const store = new AutoStore({
            user: {
                firstName: '张',
                lastName: '三',
                fullName: (scope: any) => scope.firstName + scope.lastName,
            },
        });

        type FullNameType = typeof store.state.user.fullName;
        const check: Expect<Equal<FullNameType, string>> = true;
    });

    test('多层嵌套函数转换', () => {
        const store = new AutoStore({
            level1: {
                level2: {
                    value: 'test',
                    computed: (scope: any) => scope.value,
                },
            },
        });

        type ComputedType = typeof store.state.level1.level2.computed;
        const check: Expect<Equal<ComputedType, string>> = true;
    });

    test('异步计算属性转换', () => {
        const store = new AutoStore({
            value: computed(async () => 1, []),
        });

        type ValueType = typeof store.state.value;
        const check: Expect<
            Equal<
                keyof ValueType,
                'loading' | 'progress' | 'timeout' | 'error' | 'retry' | 'value' | 'run' | 'cancel'
            >
        > = true;
    });
});

/**
 * 响应式状态 - 对象类型
 */
describe('响应式状态 - 对象类型', () => {
    test('嵌套对象类型保持', () => {
        const store = new AutoStore({
            user: {
                name: '张三',
                age: 18,
                address: {
                    city: '北京',
                    street: '长安街',
                },
            },
        });

        type UserType = typeof store.state.user;
        const check: Expect<
            Equal<
                UserType,
                {
                    name: string;
                    age: number;
                    address: {
                        city: string;
                        street: string;
                    };
                }
            >
        > = true;
    });

    test('对象中的计算属性', () => {
        const store = new AutoStore({
            user: {
                firstName: '张',
                lastName: '三',
                fullName: (scope: any) => scope.firstName + scope.lastName,
            },
        });

        type UserType = typeof store.state.user;
        const check: Expect<
            Equal<
                UserType,
                {
                    firstName: string;
                    lastName: string;
                    fullName: string;
                }
            >
        > = true;
    });
});

/**
 * 响应式状态 - 数组类型
 */
describe('响应式状态 - 数组类型', () => {
    test('基础数组类型保持', () => {
        const store = new AutoStore({
            numbers: [1, 2, 3],
            strings: ['a', 'b', 'c'],
        });

        type NumbersType = typeof store.state.numbers;
        const check1: Expect<Equal<NumbersType, number[]>> = true;

        type StringsType = typeof store.state.strings;
        const check2: Expect<Equal<StringsType, string[]>> = true;
    });

    test('对象数组类型', () => {
        const store = new AutoStore({
            users: [
                {
                    id: 1,
                    name: '张三',
                },
                {
                    id: 2,
                    name: '李四',
                },
            ],
        });

        type UsersType = typeof store.state.users;
        const check: Expect<
            Equal<
                UsersType,
                Array<{
                    id: number;
                    name: string;
                }>
            >
        > = true;
    });

    test('数组中的函数转换', () => {
        const store = new AutoStore({
            users: [
                {
                    id: 1,
                    firstName: '张',
                    lastName: '三',
                    fullName: (scope: any) => scope.firstName + scope.lastName,
                },
            ],
        });

        type UsersType = typeof store.state.users;
        const check: Expect<
            Equal<
                UsersType,
                Array<{
                    id: number;
                    firstName: string;
                    lastName: string;
                    fullName: string;
                }>
            >
        > = true;
    });

    test('多维数组', () => {
        const store = new AutoStore({
            matrix: [
                [1, 2, 3],
                [4, 5, 6],
            ],
        });

        type MatrixType = typeof store.state.matrix;
        const check: Expect<Equal<MatrixType, number[][]>> = true;
    });
});

/**
 * 响应式状态 - 复杂场景
 */
describe('响应式状态 - 复杂场景', () => {
    test('对象数组嵌套计算属性', () => {
        const store = new AutoStore({
            users: [
                {
                    id: 1,
                    firstName: '张',
                    lastName: '三',
                    fullName: (scope: any) => scope.firstName + scope.lastName,
                },
            ],
            count: (scope: any) => scope.users.length,
        });

        type UsersType = typeof store.state.users;
        const check1: Expect<
            Equal<
                UsersType,
                Array<{
                    id: number;
                    firstName: string;
                    lastName: string;
                    fullName: string;
                }>
            >
        > = true;

        type CountType = typeof store.state.count;
        const check2: Expect<Equal<CountType, number>> = true;
    });

    test('深层嵌套与计算属性', () => {
        const store = new AutoStore({
            level1: {
                level2: {
                    items: [1, 2, 3],
                    sum: (scope: any) => scope.items.reduce((a: number, b: number) => a + b, 0),
                },
                total: (scope: any) => scope.level2.sum * 2,
            },
        });

        type SumType = typeof store.state.level1.level2.sum;
        const check1: Expect<Equal<SumType, number>> = true;

        type TotalType = typeof store.state.level1.total;
        const check2: Expect<Equal<TotalType, number>> = true;
    });

    test('混合同步和异步计算', () => {
        const store = new AutoStore({
            count: 0,
            syncDouble: (scope: any) => scope.count * 2,
            asyncTriple: computed(async (scope: any) => scope.count * 3, ['./count']),
        });

        type SyncDoubleType = typeof store.state.syncDouble;
        const check1: Expect<Equal<SyncDoubleType, number>> = true;

        type AsyncTripleType = typeof store.state.asyncTriple;
        const check2: Expect<
            Equal<
                keyof AsyncTripleType,
                'loading' | 'progress' | 'timeout' | 'error' | 'retry' | 'value' | 'run' | 'cancel'
            >
        > = true;
    });
});

/**
 * 响应式状态 - 边界情况
 */
describe('响应式状态 - 边界情况', () => {
    test('空对象', () => {
        const store = new AutoStore({});

        type StateType = typeof store.state;
        const check: Expect<Equal<StateType, {}>> = true;
    });

    test('只有计算属性', () => {
        const store = new AutoStore({
            base: 10,
            computed1: (scope: any) => scope.base * 2,
            computed2: (scope: any) => scope.computed1 + 1,
        });

        type StateType = typeof store.state;
        const check: Expect<
            Equal<
                StateType,
                {
                    base: number;
                    computed1: number;
                    computed2: number;
                }
            >
        > = true;
    });

    test('可选属性', () => {
        const store = new AutoStore({
            required: 'value',
            optional: undefined as string | undefined,
        });

        type StateType = typeof store.state;
        const check: Expect<
            Equal<
                StateType,
                {
                    required: string;
                    optional: string | undefined;
                }
            >
        > = true;
    });

    test('联合类型', () => {
        const store = new AutoStore({
            value: 'string' as string | number,
        });

        type ValueType = typeof store.state.value;
        const check: Expect<Equal<ValueType, string | number>> = true;
    });

    test('数组联合类型', () => {
        const store = new AutoStore({
            items: [1, 'a', true] as (number | string | boolean)[],
        });

        type ItemsType = typeof store.state.items;
        const check: Expect<Equal<ItemsType, (number | string | boolean)[]>> = true;
    });
});

/**
 * ComputedState 工具类型测试
 */
describe('ComputedState 工具类型', () => {
    test('ComputedState 转换基础类型', () => {
        type Input = {
            name: string;
            age: number;
            getValue: () => number;
        };

        type Output = ComputedState<Input>;
        const check: Expect<
            Equal<
                Output,
                {
                    name: string;
                    age: number;
                    getValue: number;
                }
            >
        > = true;
    });

    test('ComputedState 转换嵌套对象', () => {
        type Input = {
            user: {
                name: string;
                displayName: () => string;
            };
        };

        type Output = ComputedState<Input>;
        const check: Expect<
            Equal<
                Output,
                {
                    user: {
                        name: string;
                        displayName: string;
                    };
                }
            >
        > = true;
    });

    test('ComputedState 转换数组', () => {
        type Input = {
            items: Array<{
                id: number;
                label: () => string;
            }>;
        };

        type Output = ComputedState<Input>;
        const check: Expect<
            Equal<
                Output,
                {
                    items: Array<{
                        id: number;
                        label: string;
                    }>;
                }
            >
        > = true;
    });

    test('ComputedState 转换异步函数', () => {
        type Input = {
            asyncValue: () => Promise<number>;
        };

        type Output = ComputedState<Input>;
        // 异步函数不会自动转换,保持原样
        const check: Expect<
            Equal<
                Output,
                {
                    asyncValue: Promise<number>;
                }
            >
        > = true;
    });

    test('ComputedState 保持非函数类型', () => {
        type Input = {
            str: string;
            num: number;
            bool: boolean;
            nul: null;
            undef: undefined;
        };

        type Output = ComputedState<Input>;
        const check: Expect<
            Equal<
                Output,
                {
                    str: string;
                    num: number;
                    bool: boolean;
                    nul: null;
                    undef: undefined;
                }
            >
        > = true;
    });
});
