import { describe, test } from 'bun:test';
import type { Equal, Expect } from '@type-challenges/utils';
import { AutoStore, configurable, schema, computed } from '../../src';

/**
 * Schema 基础类型测试
 */
describe('Schema 基础类型', () => {
    test('configurable 函数类型', () => {
        const store = new AutoStore({
            user: {
                name: configurable('张三'),
                age: configurable(18),
                admin: configurable(true),
            },
        });

        // state 应该正确推断类型
        const name = store.state.user.name;
        const check1: Expect<Equal<typeof name, string>> = true as any;

        const age = store.state.user.age;
        const check2: Expect<Equal<typeof age, number>> = true as any;

        const admin = store.state.user.admin;
        const check3: Expect<Equal<typeof admin, boolean>> = true as any;
    });

    test('schema 函数类型', () => {
        const store = new AutoStore({
            value: schema(100, {
                label: '数值',
                widget: 'number',
                min: 0,
                max: 100,
            }),
        });

        const value = store.state.value;
        const check: Expect<Equal<typeof value, number>> = true as any;
    });

    test('嵌套 schema 类型', () => {
        const store = new AutoStore({
            user: {
                name: configurable('张三', {
                    label: '姓名',
                    placeholder: '请输入姓名',
                }),
                address: {
                    city: configurable('北京', {
                        label: '城市',
                    }),
                    street: '长安街',
                },
            },
        });

        const name = store.state.user.name;
        const city = store.state.user.address.city;
        const street = store.state.user.address.street;

        const check1: Expect<Equal<typeof name, string>> = true as any;
        const check2: Expect<Equal<typeof city, string>> = true as any;
        const check3: Expect<Equal<typeof street, string>> = true as any;
    });

    test('数组 schema 类型', () => {
        const store = new AutoStore({
            tags: configurable(['a', 'b', 'c'], {
                label: '标签',
            }),
        });

        const tags = store.state.tags;
        const check: Expect<Equal<typeof tags, string[]>> = true as any;
    });
});

/**
 * Schema 选项类型测试
 */
describe('Schema 选项类型', () => {
    test('基础 schema 选项', () => {
        const store = new AutoStore({
            value: configurable(100, {
                label: '数值',
                help: '帮助信息',
                tooltip: '提示',
                default: 100,
                invalidTips: '无效值',
                datatype: 'number',
                icon: 'icon',
                required: true,
                visible: true,
                description: '描述',
                placeholder: '占位符',
                group: '分组',
                advanced: false,
                divider: false,
                order: 1,
                width: 100,
                height: 50,
            }),
        });
    });

    test('widget 配置类型', () => {
        const store = new AutoStore({
            numberValue: configurable(100, {
                widget: 'number',
                min: 0,
                max: 100,
                step: 1,
            }),
        });
    });

    test('enable 和 computed 选项', () => {
        const store = new AutoStore({
            admin: configurable(true),
            username: configurable('admin', {
                enable: computed((scope) => scope.admin, ['./admin']),
            }),
        });
    });
});

/**
 * Schema 验证类型测试
 */
describe('Schema 验证类型', () => {
    test('onValidate 回调类型', () => {
        const store = new AutoStore({
            age: configurable(18, {
                onValidate: (value, oldValue, path) => {
                    // value 应该是 number
                    const check1: Expect<Equal<typeof value, number>> = true;
                    // oldValue 应该是 number | undefined
                    const check2: Expect<Equal<typeof oldValue, number>> = true;
                    // path 应该是 string[]
                    const check3: Expect<Equal<typeof path, string[]>> = true as any;

                    return value > 0;
                },
            }),
        });
    });

    test('onInvalid 选项类型', () => {
        const store1 = new AutoStore({
            value: configurable(0, {
                onInvalid: 'pass',
            }),
        });

        const store2 = new AutoStore({
            value: configurable(0, {
                onInvalid: 'throw',
            }),
        });

        const store3 = new AutoStore({
            value: configurable(0, {
                onInvalid: 'ignore',
            }),
        });

        const store4 = new AutoStore({
            value: configurable(0, {
                onInvalid: 'throw-pass',
            }),
        });
    });
});

/**
 * Schema 转换函数类型测试
 */
describe('Schema 转换函数', () => {
    test('toView 和 toState 函数', () => {
        const store = new AutoStore({
            date: configurable(new Date(), {
                toView: (value) => {
                    const check: Expect<Equal<typeof value, Date>> = true as any;
                    return value.toISOString();
                },
                toState: (value) => {
                    const check: Expect<Equal<typeof value, any>> = true as any;
                    return new Date(value);
                },
            }),
        });
    });

    test('toInput 函数', () => {
        const store = new AutoStore({
            value: configurable(100, {
                toInput: (value) => {
                    const check: Expect<Equal<typeof value, number>> = true as any;
                    return String(value);
                },
            }),
        });
    });

    test('toRender 函数', () => {
        const store = new AutoStore({
            value: configurable(100, {
                toRender: (value) => {
                    const check: Expect<Equal<typeof value, number>> = true as any;
                    return `<span>${value}</span>`;
                },
            }),
        });
    });
});

/**
 * Schema actions 类型测试
 */
describe('Schema actions', () => {
    test('actions 配置类型', () => {
        const store = new AutoStore({
            value: configurable(100, {
                actions: [
                    {
                        label: '增加',
                        onClick: () => {},
                    },
                    {
                        label: '减少',
                        onClick: () => {},
                    },
                ],
            }),
        });
    });
});

/**
 * Store types 属性类型测试
 */
describe('Store types 属性', () => {
    test('types.schemas 类型', () => {
        const store = new AutoStore({
            user: {
                name: configurable('张三'),
                age: configurable(18),
                admin: configurable(true),
                address: {
                    city: configurable('北京'),
                    street: '长安街',
                },
                tags: [configurable('其他')],
            },
        });

        type SchemasType = typeof store.types.schemas;
        const check: Expect<
            Equal<
                SchemasType,
                {
                    'user.name': string;
                    'user.age': number;
                    'user.admin': boolean;
                    'user.address.city': string;
                }
            >
        > = true as any;
    });

    test('types.schemaKeys 类型', () => {
        const store = new AutoStore({
            user: {
                name: configurable('张三'),
                age: configurable(18),
                admin: configurable(true),
                address: {
                    city: configurable('北京'),
                    street: '长安街',
                },
                tags: [configurable('其他')],
            },
        });

        type SchemaKeysType = typeof store.types.schemaKeys;
        const check: Expect<
            Equal<
                SchemaKeysType,
                | 'user.name'
                | 'user.age'
                | 'user.admin'
                | 'user.address.city'
                | `user.tags.${number}`
            >
        > = true as any;
    });
});

/**
 * Schema 管理器类型测试
 */
describe('Schema 管理器', () => {
    test('schemas.get 方法类型', () => {
        const store = new AutoStore({
            user: {
                name: configurable('张三'),
            },
        });

        const schema = store.schemas.get('user.name');
        if (schema) {
            // schema 应该有 schema 和 value 属性
            schema.value;
            schema.schema;
        }
    });

    test('schemas.add 方法类型', () => {
        const store = new AutoStore({
            value: 0,
        });

        // 动态添加 schema
        const newSchema = store.schemas.add('value', {
            label: '数值',
            widget: 'number',
        });

        newSchema.label;
        newSchema.widget;
    });
});

/**
 * Schema 样式类型测试
 */
describe('Schema 样式', () => {
    test('styles 和 classs 选项', () => {
        const store = new AutoStore({
            value: configurable(100, {
                styles: {
                    color: 'red',
                    fontSize: '14px',
                },
                classs: {
                    'value-input': true,
                    'value-large': false,
                },
            }),
        });
    });
});

/**
 * 特殊 Schema 类型测试
 */
describe('特殊 Schema 类型', () => {
    test('计算属性与 schema 混合', () => {
        const store = new AutoStore({
            user: {
                firstName: configurable('张'),
                lastName: configurable('三'),
                fullName: (scope) => scope.firstName + scope.lastName,
            },
        });

        const firstName = store.state.user.firstName;
        const lastName = store.state.user.lastName;
        const fullName = store.state.user.fullName;

        const check1: Expect<Equal<typeof firstName, string>> = true as any;
        const check2: Expect<Equal<typeof lastName, string>> = true as any;
        const check3: Expect<Equal<typeof fullName, string>> = true as any;

        // schemas 只包含 configurable 的字段
        type SchemasType = typeof store.types.schemas;
        const check4: Expect<
            Equal<
                SchemasType,
                {
                    'user.firstName': string;
                    'user.lastName': string;
                }
            >
        > = true as any;
    });

    test('异步计算与 schema 混合', () => {
        const store = new AutoStore({
            user: {
                name: configurable('张三'),
                displayName: computed(async () => {
                    return 'Mr. ' + '张三';
                }, ['./user.name']),
            },
        });

        const name = store.state.user.name;
        const displayName = store.state.user.displayName;

        const check1: Expect<Equal<typeof name, string>> = true as any;
        const check2: Expect<
            Equal<
                keyof typeof displayName,
                'loading' | 'progress' | 'timeout' | 'error' | 'retry' | 'value' | 'run' | 'cancel'
            >
        > = true as any;
    });
});
