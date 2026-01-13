/**
 * configurable 类型推断验证测试
 *
 * 验证 onValidate 回调中的 value 参数能正确推断类型
 */

import { describe, it, expect } from 'bun:test';
import { AutoStore, ValidateError } from '../src/index';
import { configurable } from '../src/schema/schema';

describe('configurable 类型推断测试', () => {
    it('number 类型应正确推断', () => {
        const store = new AutoStore({
            count: configurable(100, {
                onValidate: (value) => {
                    // 此处 value 应被推断为 number 类型
                    // 如果是 any 类型，TypeScript 会允许字符串操作
                    // 但如果正确推断为 number，则只能进行数字操作
                    expect(typeof value).toBe('number');

                    // 类型检查：value 应该是 number，可以进行数字运算
                    if (value < 0 || value > 1000) {
                        throw new ValidateError('数量超出范围');
                    }
                    return true;
                },
                onInvalid: 'pass',
            }),
        });

        // 验证类型安全：赋值时应该是 number
        store.state.count = 50;
        expect(store.state.count).toBe(50);
    });

    it('string 类型应正确推断', () => {
        const store = new AutoStore({
            name: configurable('hello', {
                onValidate: (value) => {
                    // 此处 value 应被推断为 string 类型
                    expect(typeof value).toBe('string');

                    // 类型检查：string 特有的属性和方法
                    if (value.length < 3) {
                        throw new ValidateError('名称太短');
                    }
                    return true;
                },
            }),
        });

        store.state.name = 'world';
        expect(store.state.name).toBe('world');
    });

    it('boolean 类型应正确推断', () => {
        const store = new AutoStore({
            enabled: configurable(true, {
                onValidate: (value) => {
                    // 此处 value 应被推断为 boolean 类型
                    expect(typeof value).toBe('boolean');
                    return true;
                },
            }),
        });

        store.state.enabled = false;
        expect(store.state.enabled).toBe(false);
    });

    it('泛型 object 类型应正确推断', () => {
        interface User {
            name: string;
            age: number;
        }

        const store = new AutoStore({
            user: configurable<User>(
                { name: 'test', age: 20 },
                {
                    onValidate: (value) => {
                        // 此处 value 应被推断为 User 类型
                        expect(typeof value).toBe('object');
                        expect(typeof value.name).toBe('string');
                        expect(typeof value.age).toBe('number');

                        if (value.age < 18) {
                            throw new ValidateError('年龄不足');
                        }
                        return true;
                    },
                },
            ),
        });

        // 类型安全：赋值时应该是 User 类型
        store.state.user = { name: 'John', age: 30 };
        expect(store.state.user.name).toBe('John');
    });

    it('array 类型应正确推断', () => {
        const store = new AutoStore({
            items: configurable<number[]>([1, 2, 3], {
                onValidate: (value) => {
                    // 此处 value 应被推断为 number[] 类型
                    expect(Array.isArray(value)).toBe(true);

                    if (value.length === 0) {
                        throw new ValidateError('数组不能为空');
                    }
                    return true;
                },
            }),
        });

        store.state.items = [4, 5, 6];
        expect(store.state.items).toEqual([4, 5, 6]);
    });

    it('toView 和 toState 函数应正确推断类型', () => {
        const store = new AutoStore({
            price: configurable(100, {
                onValidate: (value) => {
                    // value 应该是 number
                    expect(typeof value).toBe('number');
                    return true;
                },
                // toView 的参数应该是 number
                toView: (value) => {
                    return `¥${value.toFixed(2)}`;
                },
                // toState 的参数应该是 any（外部输入）
                toState: (value) => {
                    return Number(value);
                },
            }),
        });

        store.state.price = 99.9;
        expect(store.state.price).toBe(99.9);
    });
});
