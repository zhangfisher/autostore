/** biome-ignore-all lint/correctness/noUnusedFunctionParameters: <explanation> */
import { describe, test, expect } from 'bun:test';
import { AutoStore, ValidateError } from '../src';

/**
 * onValidate 校验功能测试
 *
 * 测试 onValidate 参数的所有行为：
 * - 返回 true: 校验成功，继续写入
 * - 返回 false: 校验失败，抛出异常（等效于 throw）
 * - 抛出 ValidateError: 校验失败，通过 behavior 属性控制行为
 *   - behavior='pass': 校验失败但继续写入
 *   - behavior='ignore': 校验失败，静默忽略（不写入）
 *   - behavior='throw': 校验失败，抛出异常（默认）
 *   - behavior='throw-pass': 写入数据但同时抛出异常
 */
describe('onValidate', () => {
    describe('基本用法 - 返回 boolean', () => {
        test('返回 true 时应该允许写入', () => {
            const store = new AutoStore(
                {
                    user: { age: 18 },
                },
                {
                    onValidate(newValue, oldValue, path) {
                        if (path[0] === 'user' && path[1] === 'age') {
                            return newValue >= 0 && newValue <= 150;
                        }
                        return true;
                    },
                },
            );

            store.state.user.age = 25;
            expect(store.state.user.age).toBe(25);
        });

        test('返回 false 时应该抛出异常（等效于 throw）', () => {
            const store = new AutoStore(
                {
                    user: { age: 18 },
                },
                {
                    onValidate(newValue, oldValue, path) {
                        if (path[0] === 'user' && path[1] === 'age') {
                            return newValue >= 0 && newValue <= 150;
                        }
                        return true;
                    },
                },
            );

            expect(() => {
                store.state.user.age = 200;
            }).toThrow(ValidateError);
            expect(store.state.user.age).toBe(18); // 值不应该被修改
        });
    });

    describe('验证失败行为 - behavior=pass', () => {
        test('抛出 behavior="pass" 的 ValidateError 时应该继续写入', () => {
            const store = new AutoStore(
                {
                    user: { age: 18 },
                },
                {
                    onValidate(newValue, oldValue, path) {
                        if (path[0] === 'user' && path[1] === 'age') {
                            if (newValue >= 0 && newValue <= 150) {
                                return true;
                            }
                            // 校验失败，但继续写入
                            const error = new ValidateError('Age must be between 0 and 150');
                            error.behavior = 'pass';
                            throw error;
                        }
                        return true;
                    },
                },
            );

            // 虽然校验失败，但应该继续写入
            store.state.user.age = 200;
            expect(store.state.user.age).toBe(200);
        });
    });

    describe('验证失败行为 - behavior=ignore', () => {
        test('抛出 behavior="ignore" 的 ValidateError 时应该静默忽略（不写入）', () => {
            const store = new AutoStore(
                {
                    user: { age: 18 },
                },
                {
                    onValidate(newValue, oldValue, path) {
                        if (path[0] === 'user' && path[1] === 'age') {
                            if (newValue >= 0 && newValue <= 150) {
                                return true;
                            }
                            // 校验失败，忽略写入
                            const error = new ValidateError('Age must be between 0 and 150');
                            error.behavior = 'ignore';
                            throw error;
                        }
                        return true;
                    },
                },
            );

            // 校验失败，应该忽略写入
            store.state.user.age = 200;
            expect(store.state.user.age).toBe(18); // 值保持不变
        });

        test('behavior="ignore" 时不应该抛出异常', () => {
            const store = new AutoStore(
                {
                    user: { age: 18 },
                },
                {
                    onValidate(newValue, oldValue, path) {
                        if (path[0] === 'user' && path[1] === 'age') {
                            if (newValue >= 0 && newValue <= 150) {
                                return true;
                            }
                            const error = new ValidateError('Age must be between 0 and 150');
                            error.behavior = 'ignore';
                            throw error;
                        }
                        return true;
                    },
                },
            );

            // 不应该抛出异常
            expect(() => {
                store.state.user.age = 200;
            }).not.toThrow();
        });
    });

    describe('验证失败行为 - behavior=throw', () => {
        test('抛出 behavior="throw" 的 ValidateError 时应该抛出异常', () => {
            const store = new AutoStore(
                {
                    user: { age: 18 },
                },
                {
                    onValidate(newValue, oldValue, path) {
                        if (path[0] === 'user' && path[1] === 'age') {
                            if (newValue >= 0 && newValue <= 150) {
                                return true;
                            }
                            // 校验失败，抛出异常
                            const error = new ValidateError('Age must be between 0 and 150');
                            error.behavior = 'throw';
                            throw error;
                        }
                        return true;
                    },
                },
            );

            expect(() => {
                store.state.user.age = 200;
            }).toThrow(ValidateError);
            expect(store.state.user.age).toBe(18); // 值不应该被修改
        });

        test('抛出默认 ValidateError 时应该抛出异常（默认 behavior=throw）', () => {
            const store = new AutoStore(
                {
                    user: { age: 18 },
                },
                {
                    onValidate(newValue, oldValue, path) {
                        if (path[0] === 'user' && path[1] === 'age') {
                            if (newValue >= 0 && newValue <= 150) {
                                return true;
                            }
                            // 不设置 behavior，默认为 'throw'
                            throw new ValidateError('Age must be between 0 and 150');
                        }
                        return true;
                    },
                },
            );

            expect(() => {
                store.state.user.age = 200;
            }).toThrow(ValidateError);
            expect(store.state.user.age).toBe(18);
        });
    });

    describe('验证失败行为 - behavior=throw-pass', () => {
        test('抛出 behavior="throw-pass" 的 ValidateError 时应该写入数据但同时抛出异常', () => {
            const store = new AutoStore(
                {
                    user: { age: 18 },
                },
                {
                    onValidate(newValue, oldValue, path) {
                        if (path[0] === 'user' && path[1] === 'age') {
                            if (newValue >= 0 && newValue <= 150) {
                                return true;
                            }
                            // 写入数据但同时抛出异常
                            const error = new ValidateError('Age must be between 0 and 150');
                            error.behavior = 'throw-pass';
                            throw error;
                        }
                        return true;
                    },
                },
            );

            // 应该抛出异常
            expect(() => {
                store.state.user.age = 200;
            }).toThrow(ValidateError);

            // 但是值应该已经被写入
            expect(store.state.user.age).toBe(200);
        });
    });

    describe('复杂场景 - 嵌套对象', () => {
        test('校验嵌套对象属性', () => {
            const store = new AutoStore(
                {
                    user: {
                        name: 'John',
                        age: 25,
                    },
                },
                {
                    onValidate(newValue, oldValue, path) {
                        if (path[path.length - 1] === 'age') {
                            return newValue >= 0 && newValue <= 150;
                        }
                        return true;
                    },
                },
            );

            // 正常值应该写入
            store.state.user.age = 30;
            expect(store.state.user.age).toBe(30);

            // 异常值应该被拒绝
            expect(() => {
                store.state.user.age = 200;
            }).toThrow(ValidateError);
            expect(store.state.user.age).toBe(30);
        });
    });

    describe('复杂场景 - 数组操作', () => {
        test('校验数组元素赋值', () => {
            const store = new AutoStore(
                {
                    items: [1, 2, 3],
                },
                {
                    onValidate(newValue, oldValue, path) {
                        if (path[0] === 'items') {
                            return typeof newValue === 'number' && newValue > 0;
                        }
                        return true;
                    },
                },
            );

            // 正常值应该写入
            store.state.items[0] = 10;
            expect(store.state.items[0]).toBe(10);

            // 异常值应该被拒绝
            expect(() => {
                store.state.items[1] = -5;
            }).toThrow(ValidateError);
            expect(store.state.items[1]).toBe(2);
        });
    });

    describe('ValidateError 自定义错误信息', () => {
        test('ValidateError 应该携带自定义错误信息', () => {
            let capturedError: any;

            const store = new AutoStore(
                {
                    user: { age: 18 },
                },
                {
                    onValidate(newValue, oldValue, path) {
                        if (path[0] === 'user' && path[1] === 'age') {
                            if (newValue >= 0 && newValue <= 150) {
                                return true;
                            }
                            throw new ValidateError('年龄必须在 0 到 150 之间');
                        }
                        return true;
                    },
                },
            );

            store.on('validate', (event) => {
                if (event.error) {
                    capturedError = event.error;
                }
            });

            try {
                store.state.user.age = 200;
            } catch {
                // 预期会抛出异常
            }

            expect(capturedError).toBeInstanceOf(ValidateError);
            expect(capturedError.message).toBe('年龄必须在 0 到 150 之间');
        });

        test('不同的 behavior 应该携带不同的错误信息', () => {
            let capturedError: any;
            let capturedBehavior: any;

            const store = new AutoStore(
                {
                    user: { age: 18 },
                },
                {
                    onValidate(newValue, oldValue, path) {
                        if (path[0] === 'user' && path[1] === 'age') {
                            if (newValue >= 0 && newValue <= 150) {
                                return true;
                            }
                            const error = new ValidateError('Invalid age value');
                            error.behavior = 'ignore';
                            throw error;
                        }
                        return true;
                    },
                },
            );

            store.on('validate', (event: any) => {
                if (event.error) {
                    capturedError = event.error;
                    capturedBehavior = event.error.behavior;
                }
            });

            store.state.user.age = 200; // 不会抛出异常，因为 behavior='ignore'

            expect(capturedError).toBeInstanceOf(ValidateError);
            expect(capturedError.message).toBe('Invalid age value');
            expect(capturedBehavior).toBe('ignore');
        });
    });

    describe('参数验证', () => {
        test('onValidate 应该接收正确的参数', () => {
            let capturedPath: string[] | undefined;
            let capturedNewValue: any;
            let capturedOldValue: any;

            const store = new AutoStore(
                {
                    user: { age: 18 },
                },
                {
                    onValidate(newValue, oldValue, path) {
                        capturedPath = path;
                        capturedNewValue = newValue;
                        capturedOldValue = oldValue;
                        return true;
                    },
                },
            );

            store.state.user.age = 25;

            expect(capturedPath).toEqual(['user', 'age']);
            expect(capturedNewValue).toBe(25);
            expect(capturedOldValue).toBe(18);
        });

        test('onValidate 中 this 应该指向 store 实例', () => {
            let capturedThis: any;

            const store = new AutoStore(
                {
                    user: { age: 18 },
                },
                {
                    onValidate(newValue, oldValue, path) {
                        capturedThis = this;
                        return true;
                    },
                },
            );

            store.state.user.age = 25;

            expect(capturedThis).toBe(store);
        });
    });

    describe('oldValue 对比', () => {
        test('应该能够访问 oldValue 进行对比', () => {
            let capturedOldValue: any;

            const store = new AutoStore(
                {
                    user: { age: 18 },
                },
                {
                    onValidate(newValue, oldValue, path) {
                        if (path[0] === 'user' && path[1] === 'age') {
                            capturedOldValue = oldValue;
                            // 只允许年龄增大，不允许减小
                            if (newValue < oldValue) {
                                const error = new ValidateError('年龄不能减小');
                                error.behavior = 'throw';
                                throw error;
                            }
                            // 同时校验年龄范围
                            if (newValue > 150) {
                                const error = new ValidateError('年龄不能超过 150');
                                error.behavior = 'throw';
                                throw error;
                            }
                        }
                        return true;
                    },
                },
            );

            // 年龄增大应该成功
            store.state.user.age = 25;
            expect(store.state.user.age).toBe(25);
            expect(capturedOldValue).toBe(18);

            // 再次增大应该成功
            store.state.user.age = 30;
            expect(store.state.user.age).toBe(30);
            expect(capturedOldValue).toBe(25);

            // 尝试减小年龄应该失败
            expect(() => {
                store.state.user.age = 20;
            }).toThrow(ValidateError);
            expect(store.state.user.age).toBe(30); // 值保持不变
        });

        test('应该能够基于 oldValue 和 newValue 的差值进行校验', () => {
            const store = new AutoStore(
                {
                    user: { age: 18 },
                },
                {
                    onValidate(newValue, oldValue, path) {
                        if (path[0] === 'user' && path[1] === 'age') {
                            // 每次年龄增幅不能超过 10 岁
                            const diff = newValue - oldValue;
                            if (diff > 10) {
                                const error = new ValidateError(
                                    `年龄增幅过大：${diff} 岁，最大允许增幅 10 岁`,
                                );
                                error.behavior = 'throw';
                                throw error;
                            }
                        }
                        return true;
                    },
                },
            );

            // 小幅增长应该成功
            store.state.user.age = 25; // 增幅 7
            expect(store.state.user.age).toBe(25);

            // 继续小幅增长应该成功
            store.state.user.age = 32; // 增幅 7
            expect(store.state.user.age).toBe(32);

            // 大幅增长应该失败
            expect(() => {
                store.state.user.age = 50; // 增幅 18
            }).toThrow(ValidateError);
            expect(store.state.user.age).toBe(32); // 值保持不变
        });

        test('应该能够基于 oldValue 的类型进行校验', () => {
            const store = new AutoStore(
                {
                    user: { age: 18 },
                },
                {
                    onValidate(newValue, oldValue, path) {
                        if (path[0] === 'user' && path[1] === 'age') {
                            // 类型必须与 oldValue 一致
                            if (typeof newValue !== typeof oldValue) {
                                const error = new ValidateError(
                                    `类型不匹配：期望 ${typeof oldValue}，实际 ${typeof newValue}`,
                                );
                                error.behavior = 'throw';
                                throw error;
                            }
                        }
                        return true;
                    },
                },
            );

            // 数字应该成功
            store.state.user.age = 25;
            expect(store.state.user.age).toBe(25);

            // 尝试设置为字符串应该失败
            expect(() => {
                // @ts-expect-error - 测试类型不匹配
                store.state.user.age = '25';
            }).toThrow(ValidateError);
            expect(store.state.user.age).toBe(25);

            // 尝试设置为 null 应该失败
            expect(() => {
                // @ts-expect-error - 测试类型不匹配
                store.state.user.age = null;
            }).toThrow(ValidateError);
            expect(store.state.user.age).toBe(25);
        });

        test('应该在 validate 事件中包含 oldValue', () => {
            let capturedOldValue: any;

            const store = new AutoStore(
                {
                    user: { age: 18 },
                },
                {
                    onValidate(newValue, oldValue, path) {
                        if (path[0] === 'user' && path[1] === 'age') {
                            if (newValue > 150) {
                                throw new ValidateError('年龄不能超过 150');
                            }
                        }
                        return true;
                    },
                },
            );

            store.on('validate', (event) => {
                if (event.error) {
                    capturedOldValue = event.oldValue;
                }
            });

            try {
                store.state.user.age = 200;
            } catch {
                // 预期会抛出异常
            }

            expect(capturedOldValue).toBe(18);
        });

        test('应该能够基于 oldValue 的存在性进行校验', () => {
            const store = new AutoStore(
                {
                    user: { age: 18 },
                },
                {
                    onValidate(newValue, oldValue, path) {
                        if (path[0] === 'user' && path[1] === 'age') {
                            // 如果 oldValue 是 undefined，说明是首次设置
                            if (oldValue === undefined) {
                                // 首次设置只允许正数
                                if (newValue <= 0) {
                                    const error = new ValidateError('初始年龄必须是正数');
                                    error.behavior = 'throw';
                                    throw error;
                                }
                            } else {
                                // 非首次设置，允许任何非负数
                                if (newValue < 0) {
                                    const error = new ValidateError('年龄不能为负数');
                                    error.behavior = 'throw';
                                    throw error;
                                }
                            }
                        }
                        return true;
                    },
                },
            );

            // 首次设置正数应该成功
            expect(store.state.user.age).toBe(18);

            // 非首次设置非负数应该成功
            store.state.user.age = 0;
            expect(store.state.user.age).toBe(0);

            // 尝试设置负数应该失败
            expect(() => {
                store.state.user.age = -1;
            }).toThrow(ValidateError);
            expect(store.state.user.age).toBe(0);
        });
    });

    describe('validate 选项', () => {
        test('validate="none" 时应该跳过校验', () => {
            const store = new AutoStore(
                {
                    user: { age: 18 },
                },
                {
                    onValidate(newValue, oldValue, path) {
                        if (path[0] === 'user' && path[1] === 'age') {
                            return newValue >= 0 && newValue <= 150;
                        }
                        return true;
                    },
                },
            );

            // 使用 update 方法的 validate 选项
            expect(() => {
                store.update(
                    () => {
                        store.state.user.age = 200;
                    },
                    { validate: 'none' },
                );
            }).not.toThrow();

            expect(store.state.user.age).toBe(200);
        });

        test('validate="none" 时应该跳过校验', () => {
            const store = new AutoStore(
                {
                    user: { age: 18 },
                },
                {
                    onValidate(newValue, oldValue, path) {
                        if (path[0] === 'user' && path[1] === 'age') {
                            if (newValue >= 0 && newValue <= 150) {
                                return true;
                            }
                            // 校验失败，抛出 ValidateError
                            const error = new ValidateError('Age validation failed');
                            error.behavior = 'throw';
                            throw error;
                        }
                        return true;
                    },
                },
            );

            // 使用 update 方法的 validate="none" 选项，跳过校验
            store.update(
                () => {
                    store.state.user.age = 200;
                },
                { validate: 'none' },
            );

            expect(store.state.user.age).toBe(200);
        });

        test('validate="pass" 时校验失败也应该继续', () => {
            const store = new AutoStore(
                {
                    user: { age: 18 },
                },
                {
                    onValidate(newValue, oldValue, path) {
                        if (path[0] === 'user' && path[1] === 'age') {
                            if (newValue >= 0 && newValue <= 150) {
                                return true;
                            }
                            // 校验失败，但设置 behavior='pass' 继续写入
                            const error = new ValidateError('Age validation failed');
                            error.behavior = 'pass';
                            throw error;
                        }
                        return true;
                    },
                },
            );

            // 即使校验失败也继续写入
            store.state.user.age = 200;
            expect(store.state.user.age).toBe(200);
        });

        test('validate="ignore" 时校验失败应该忽略', () => {
            const store = new AutoStore(
                {
                    user: { age: 18 },
                },
                {
                    onValidate(newValue, oldValue, path) {
                        if (path[0] === 'user' && path[1] === 'age') {
                            return true; // 总是返回 true
                        }
                        return true;
                    },
                },
            );

            store.update(
                () => {
                    store.state.user.age = 200;
                },
                { validate: 'ignore' },
            );

            // validate='ignore' 时不执行校验函数
            expect(store.state.user.age).toBe(200);
        });
    });

    describe('validate 事件', () => {
        test('校验时应该触发 validate 事件', () => {
            let validateEventCount = 0;
            let capturedError: any;

            const store = new AutoStore(
                {
                    user: { age: 18 },
                },
                {
                    onValidate(newValue, oldValue, path) {
                        if (path[0] === 'user' && path[1] === 'age') {
                            return newValue >= 0 && newValue <= 150;
                        }
                        return true;
                    },
                },
            );

            store.on('validate', (event) => {
                validateEventCount++;
                if (event.error) {
                    capturedError = event.error;
                }
            });

            // 成功的校验
            store.state.user.age = 25;
            expect(validateEventCount).toBe(1);

            // 失败的校验
            try {
                store.state.user.age = 200;
            } catch {
                // 预期会抛出异常
            }

            expect(validateEventCount).toBe(2);
            expect(capturedError).toBeInstanceOf(ValidateError);
        });

        test('validate 事件应该包含完整的路径、值和错误信息', () => {
            const capturedEvents: any[] = [];

            const store = new AutoStore(
                {
                    user: {
                        profile: {
                            age: 18,
                            name: 'John',
                        },
                    },
                },
                {
                    onValidate(newValue, oldValue, path) {
                        if (path[path.length - 1] === 'age') {
                            if (newValue < 0 || newValue > 150) {
                                throw new ValidateError(
                                    `年龄 ${newValue} 不在有效范围内 [0-150]`,
                                );
                            }
                        }
                        return true;
                    },
                },
            );

            store.on('validate', (event) => {
                capturedEvents.push({ ...event });
            });

            // 测试 1: 成功的校验 - 应该触发事件，error 为 undefined
            store.state.user.profile.age = 25;
            expect(capturedEvents).toHaveLength(1);
            expect(capturedEvents[0].path).toEqual(['user', 'profile', 'age']);
            expect(capturedEvents[0].newValue).toBe(25);
            expect(capturedEvents[0].oldValue).toBe(18);
            expect(capturedEvents[0].error).toBeUndefined();

            // 测试 2: 失败的校验 - 应该触发事件，error 为 ValidateError
            try {
                store.state.user.profile.age = 200;
            } catch {
                // 预期会抛出异常
            }

            expect(capturedEvents).toHaveLength(2);
            expect(capturedEvents[1].path).toEqual(['user', 'profile', 'age']);
            expect(capturedEvents[1].newValue).toBe(200);
            expect(capturedEvents[1].oldValue).toBe(25);
            expect(capturedEvents[1].error).toBeInstanceOf(ValidateError);
            expect(capturedEvents[1].error.message).toBe(
                '年龄 200 不在有效范围内 [0-150]',
            );

            // 测试 3: 另一个成功的校验
            store.state.user.profile.age = 30;
            expect(capturedEvents).toHaveLength(3);
            expect(capturedEvents[2].path).toEqual(['user', 'profile', 'age']);
            expect(capturedEvents[2].newValue).toBe(30);
            expect(capturedEvents[2].oldValue).toBe(25);
            expect(capturedEvents[2].error).toBeUndefined();
        });

        test('validate 事件应该在不同 behavior 下正确传递错误', () => {
            const capturedEvents: any[] = [];

            const store = new AutoStore(
                {
                    user: { age: 18 },
                },
                {
                    onValidate(newValue, oldValue, path) {
                        if (path[0] === 'user' && path[1] === 'age') {
                            if (newValue >= 0 && newValue <= 150) {
                                return true;
                            }
                            const error = new ValidateError(
                                `年龄 ${newValue} 超出范围`,
                            );
                            error.behavior = 'pass'; // 校验失败但继续写入
                            throw error;
                        }
                        return true;
                    },
                },
            );

            store.on('validate', (event) => {
                capturedEvents.push({ ...event });
            });

            // behavior="pass" 时，校验失败但仍会写入值，同时触发事件
            store.state.user.age = 200;
            expect(store.state.user.age).toBe(200);
            expect(capturedEvents).toHaveLength(1);
            expect(capturedEvents[0].path).toEqual(['user', 'age']);
            expect(capturedEvents[0].newValue).toBe(200);
            expect(capturedEvents[0].oldValue).toBe(18);
            expect(capturedEvents[0].error).toBeInstanceOf(ValidateError);
            expect(capturedEvents[0].error.behavior).toBe('pass');
        });

        test('validate 事件应该捕获多个校验失败的场景', () => {
            const capturedEvents: any[] = [];

            const store = new AutoStore(
                {
                    users: [
                        { id: 1, age: 25 },
                        { id: 2, age: 30 },
                    ],
                },
                {
                    onValidate(newValue, oldValue, path) {
                        if (path[path.length - 1] === 'age') {
                            if (newValue < 0 || newValue > 120) {
                                throw new ValidateError(
                                    `年龄 ${newValue} 无效`,
                                );
                            }
                        }
                        return true;
                    },
                },
            );

            store.on('validate', (event) => {
                capturedEvents.push({ ...event });
            });

            // 第一次成功
            store.state.users[0].age = 26;
            expect(capturedEvents).toHaveLength(1);
            expect(capturedEvents[0].path).toEqual(['users', '0', 'age']);
            expect(capturedEvents[0].newValue).toBe(26);
            expect(capturedEvents[0].error).toBeUndefined();

            // 第二次成功
            store.state.users[1].age = 31;
            expect(capturedEvents).toHaveLength(2);
            expect(capturedEvents[1].path).toEqual(['users', '1', 'age']);
            expect(capturedEvents[1].newValue).toBe(31);
            expect(capturedEvents[1].error).toBeUndefined();

            // 第一次失败
            try {
                store.state.users[0].age = 200;
            } catch {
                // 预期会抛出异常
            }
            expect(capturedEvents).toHaveLength(3);
            expect(capturedEvents[2].path).toEqual(['users', '0', 'age']);
            expect(capturedEvents[2].newValue).toBe(200);
            expect(capturedEvents[2].oldValue).toBe(26);
            expect(capturedEvents[2].error).toBeInstanceOf(ValidateError);

            // 第二次失败
            try {
                store.state.users[1].age = -10;
            } catch {
                // 预期会抛出异常
            }
            expect(capturedEvents).toHaveLength(4);
            expect(capturedEvents[3].path).toEqual(['users', '1', 'age']);
            expect(capturedEvents[3].newValue).toBe(-10);
            expect(capturedEvents[3].oldValue).toBe(31);
            expect(capturedEvents[3].error).toBeInstanceOf(ValidateError);
        });

        test('validate 事件的 error 属性应该区分有错误和无错误的情况', () => {
            const successEvents: any[] = [];
            const failureEvents: any[] = [];

            const store = new AutoStore(
                {
                    items: [1, 2, 3],
                },
                {
                    onValidate(newValue, oldValue, path) {
                        if (path[0] === 'items') {
                            if (typeof newValue !== 'number') {
                                throw new ValidateError('必须是数字');
                            }
                            if (newValue < 0) {
                                throw new ValidateError('不能为负数');
                            }
                        }
                        return true;
                    },
                },
            );

            store.on('validate', (event) => {
                if (event.error) {
                    failureEvents.push(event);
                } else {
                    successEvents.push(event);
                }
            });

            // 成功的校验
            store.state.items[0] = 10;
            expect(successEvents).toHaveLength(1);
            expect(failureEvents).toHaveLength(0);
            expect(successEvents[0].error).toBeUndefined();

            // 失败的校验 - 类型错误
            try {
                // @ts-expect-error - 测试类型错误
                store.state.items[1] = 'invalid';
            } catch {
                // 预期会抛出异常
            }
            expect(successEvents).toHaveLength(1);
            expect(failureEvents).toHaveLength(1);
            expect(failureEvents[0].error).toBeInstanceOf(ValidateError);
            expect(failureEvents[0].error.message).toBe('必须是数字');

            // 失败的校验 - 值错误
            try {
                store.state.items[2] = -5;
            } catch {
                // 预期会抛出异常
            }
            expect(successEvents).toHaveLength(1);
            expect(failureEvents).toHaveLength(2);
            expect(failureEvents[1].error).toBeInstanceOf(ValidateError);
            expect(failureEvents[1].error.message).toBe('不能为负数');
        });
    });

    describe('边界情况', () => {
        test('onValidate 抛出异常时的处理', () => {
            const store = new AutoStore(
                {
                    user: { age: 18 },
                },
                {
                    onValidate(newValue, oldValue, path) {
                        if (path[0] === 'user' && path[1] === 'age' && newValue > 150) {
                            const error = new ValidateError('Age must be <= 150');
                            error.behavior = 'throw';
                            throw error;
                        }
                        return true;
                    },
                },
            );

            // onValidate 内部抛出的 ValidateError 应该被抛出
            expect(() => {
                store.state.user.age = 200;
            }).toThrow(ValidateError);

            expect(store.state.user.age).toBe(18);
        });

        test('没有 onValidate 函数时应该正常工作', () => {
            const store = new AutoStore({
                user: { age: 18 },
            });

            // 不应该有任何限制
            store.state.user.age = 200;
            expect(store.state.user.age).toBe(200);
        });

        test('null 和 undefined 值的校验', () => {
            const store = new AutoStore(
                {
                    value: 'hello',
                },
                {
                    onValidate(newValue, oldValue, path) {
                        // 允许 null，但不允许 undefined
                        return newValue !== undefined;
                    },
                },
            );

            // null 应该被允许
            // @ts-expect-error
            store.state.value = null;
            // @ts-expect-error
            expect(store.state.value).toBe(null);

            // undefined 应该被拒绝
            expect(() => {
                // @ts-expect-error - 测试 undefined 值
                store.state.value = undefined;
            }).toThrow();
        });
    });
});

/**
 * validators 和 validationBehavior 选项测试
 *
 * 测试 validators 选项的路径匹配功能：
 * - 完全路径匹配：如 'user.age'
 * - 通配符匹配：如 'user.*.age', 'items.*.price'
 * - 双星号匹配：如 'user.**'
 *
 * 测试 validationBehavior 选项的行为：
 * - pass: 校验失败但继续写入
 * - throw: 校验失败抛出异常（默认）
 * - ignore: 校验失败静默忽略
 * - throw-pass: 写入数据但同时抛出异常
 */
describe('validators 和 validationBehavior', () => {
    describe('validators - 完全路径匹配', () => {
        test('应该使用完全匹配的 validator 进行校验', () => {
            const store = new AutoStore(
                {
                    user: { age: 18 },
                },
                {
                    validators: {
                        'user.age': (newValue, oldValue, path) => {
                            return newValue >= 0 && newValue <= 150;
                        },
                    },
                },
            );

            // 正常值应该写入
            store.state.user.age = 25;
            expect(store.state.user.age).toBe(25);

            // 异常值应该被拒绝
            expect(() => {
                store.state.user.age = 200;
            }).toThrow(ValidateError);
            expect(store.state.user.age).toBe(25);
        });

        test('validators 优先级应该高于 onValidate', () => {
            let onValidateCalled = false;
            let validatorCalled = false;

            const store = new AutoStore(
                {
                    user: { age: 18 },
                },
                {
                    validators: {
                        'user.age': (newValue, oldValue, path) => {
                            validatorCalled = true;
                            return newValue >= 0 && newValue <= 150;
                        },
                    },
                    onValidate(newValue, oldValue, path) {
                        onValidateCalled = true;
                        // 总是返回 true
                        return true;
                    },
                },
            );

            // 应该调用 validator，而不是 onValidate
            store.state.user.age = 25;
            expect(validatorCalled).toBe(true);
            expect(onValidateCalled).toBe(false);
            expect(store.state.user.age).toBe(25);
        });
    });

    describe('validators - 通配符匹配', () => {
        test('应该使用通配符 * 匹配单层路径', () => {
            const store = new AutoStore(
                {
                    items: [
                        { id: 1, price: 100 },
                        { id: 2, price: 200 },
                    ],
                },
                {
                    validators: {
                        'items.*.price': (newValue, oldValue, path) => {
                            return typeof newValue === 'number' && newValue > 0;
                        },
                    },
                },
            );

            // 正常值应该写入
            store.state.items[0].price = 150;
            expect(store.state.items[0].price).toBe(150);

            store.state.items[1].price = 250;
            expect(store.state.items[1].price).toBe(250);

            // 异常值应该被拒绝
            expect(() => {
                store.state.items[0].price = -10;
            }).toThrow(ValidateError);
            expect(store.state.items[0].price).toBe(150);
        });

        test('应该使用通配符 ** 匹配多层路径', () => {
            const store = new AutoStore(
                {
                    user: {
                        profile: {
                            age: 18,
                        },
                    },
                },
                {
                    validators: {
                        'user.**': (newValue, oldValue, path) => {
                            // 匹配 user 及其所有子路径
                            if (path[path.length - 1] === 'age') {
                                return newValue >= 0 && newValue <= 150;
                            }
                            return true;
                        },
                    },
                },
            );

            // 正常值应该写入
            store.state.user.profile.age = 25;
            expect(store.state.user.profile.age).toBe(25);

            // 异常值应该被拒绝
            expect(() => {
                store.state.user.profile.age = 200;
            }).toThrow(ValidateError);
            expect(store.state.user.profile.age).toBe(25);
        });

        test('通配符应该匹配数组索引', () => {
            const store = new AutoStore(
                {
                    users: [
                        { name: 'Alice', age: 25 },
                        { name: 'Bob', age: 30 },
                        { name: 'Charlie', age: 35 },
                    ],
                },
                {
                    validators: {
                        'users.*.age': (newValue) => {
                            return newValue >= 0 && newValue <= 120;
                        },
                    },
                },
            );

            // 测试所有用户
            store.state.users[0].age = 26;
            expect(store.state.users[0].age).toBe(26);

            store.state.users[1].age = 31;
            expect(store.state.users[1].age).toBe(31);

            store.state.users[2].age = 36;
            expect(store.state.users[2].age).toBe(36);

            // 异常值应该被拒绝
            expect(() => {
                store.state.users[0].age = 200;
            }).toThrow(ValidateError);
            expect(store.state.users[0].age).toBe(26);
        });
    });

    describe('validators - 多个验证器匹配', () => {
        test('应该使用第一个匹配的验证器', () => {
            let firstValidatorCalled = false;
            let secondValidatorCalled = false;

            const store = new AutoStore(
                {
                    user: { age: 18 },
                },
                {
                    validators: {
                        'user.age': (newValue) => {
                            firstValidatorCalled = true;
                            return newValue >= 0 && newValue <= 150;
                        },
                        'user.*': (newValue) => {
                            secondValidatorCalled = true;
                            return true;
                        },
                    },
                },
            );

            store.state.user.age = 25;

            // 应该使用完全匹配的 'user.age'，而不是通配符 'user.*'
            expect(firstValidatorCalled).toBe(true);
            expect(secondValidatorCalled).toBe(false);
            expect(store.state.user.age).toBe(25);
        });
    });

    describe('validationBehavior 选项', () => {
        test('validationBehavior="pass" 时校验失败应该继续写入', () => {
            const store = new AutoStore(
                {
                    user: { age: 18 },
                },
                {
                    validators: {
                        'user.age': (newValue) => {
                            return newValue >= 0 && newValue <= 150;
                        },
                    },
                    validationBehavior: 'pass',
                },
            );

            // 校验失败但继续写入
            store.state.user.age = 200;
            expect(store.state.user.age).toBe(200);
        });

        test('validationBehavior="ignore" 时校验失败应该静默忽略', () => {
            const store = new AutoStore(
                {
                    user: { age: 18 },
                },
                {
                    validators: {
                        'user.age': (newValue) => {
                            return newValue >= 0 && newValue <= 150;
                        },
                    },
                    validationBehavior: 'ignore',
                },
            );

            // 校验失败，忽略写入
            store.state.user.age = 200;
            expect(store.state.user.age).toBe(18); // 值保持不变

            // 不应该抛出异常
            expect(() => {
                store.state.user.age = 200;
            }).not.toThrow();
        });

        test('validationBehavior="throw" 时校验失败应该抛出异常（默认）', () => {
            const store = new AutoStore(
                {
                    user: { age: 18 },
                },
                {
                    validators: {
                        'user.age': (newValue) => {
                            return newValue >= 0 && newValue <= 150;
                        },
                    },
                    validationBehavior: 'throw',
                },
            );

            // 校验失败，抛出异常
            expect(() => {
                store.state.user.age = 200;
            }).toThrow(ValidateError);
            expect(store.state.user.age).toBe(18);
        });

        test('validationBehavior="throw-pass" 时应该写入数据但同时抛出异常', () => {
            const store = new AutoStore(
                {
                    user: { age: 18 },
                },
                {
                    validators: {
                        'user.age': (newValue) => {
                            return newValue >= 0 && newValue <= 150;
                        },
                    },
                    validationBehavior: 'throw-pass',
                },
            );

            // 应该抛出异常
            expect(() => {
                store.state.user.age = 200;
            }).toThrow(ValidateError);

            // 但是值应该已经被写入
            expect(store.state.user.age).toBe(200);
        });
    });

    describe('validators 与 validationBehavior 组合使用', () => {
        test('validator 返回 false 时应该使用 validationBehavior 选项', () => {
            const store = new AutoStore(
                {
                    items: [
                        { id: 1, price: 100 },
                        { id: 2, price: 200 },
                    ],
                },
                {
                    validators: {
                        'items.*.price': (newValue) => {
                            return newValue > 0;
                        },
                    },
                    validationBehavior: 'pass',
                },
            );

            // validator 返回 false，但 validationBehavior='pass' 应该继续写入
            store.state.items[0].price = -50;
            expect(store.state.items[0].price).toBe(-50);
        });

        test('validator 抛出异常时应该优先使用异常中的 behavior', () => {
            const store = new AutoStore(
                {
                    user: { age: 18 },
                },
                {
                    validators: {
                        'user.age': (newValue) => {
                            if (newValue >= 0 && newValue <= 150) {
                                return true;
                            }
                            const error = new ValidateError('年龄超出范围');
                            error.behavior = 'ignore';
                            throw error;
                        },
                    },
                    validationBehavior: 'throw', // 应该被 validator 的 behavior 覆盖
                },
            );

            // 应该使用 validator 中的 behavior='ignore'
            store.state.user.age = 200;
            expect(store.state.user.age).toBe(18); // 值保持不变
        });
    });

    describe('validators - 自定义 delimiter', () => {
        test('应该使用自定义的 delimiter 连接路径', () => {
            const store = new AutoStore(
                {
                    user: { age: 18 },
                },
                {
                    delimiter: '/',
                    validators: {
                        'user/age': (newValue) => {
                            return newValue >= 0 && newValue <= 150;
                        },
                    },
                },
            );

            // 正常值应该写入
            store.state.user.age = 25;
            expect(store.state.user.age).toBe(25);

            // 异常值应该被拒绝
            expect(() => {
                store.state.user.age = 200;
            }).toThrow(ValidateError);
            expect(store.state.user.age).toBe(25);
        });
    });

    describe('validators 与 onValidate 的 fallback 逻辑', () => {
        test('当没有匹配的 validator 时应该使用 onValidate', () => {
            let validatorCalled = false;
            let onValidateCalled = false;

            const store = new AutoStore(
                {
                    user: { age: 18 },
                    items: { price: 100 },
                },
                {
                    validators: {
                        'user.age': (newValue) => {
                            validatorCalled = true;
                            return newValue >= 0 && newValue <= 150;
                        },
                    },
                    onValidate(newValue, oldValue, path) {
                        onValidateCalled = true;
                        if (path[0] === 'items' && path[1] === 'price') {
                            return newValue > 0;
                        }
                        return true;
                    },
                },
            );

            // user.age 应该使用 validator
            store.state.user.age = 25;
            expect(validatorCalled).toBe(true);
            expect(onValidateCalled).toBe(false);

            // items.price 应该使用 onValidate（因为没有匹配的 validator）
            store.state.items.price = 200;
            expect(validatorCalled).toBe(true); // 保持 true
            expect(onValidateCalled).toBe(true);
            expect(store.state.items.price).toBe(200);
        });
    });

    describe('validators - 复杂场景', () => {
        test('应该支持多个路径的验证器', () => {
            const store = new AutoStore(
                {
                    order: {
                        price: 100,
                        quantity: 5,
                        discount: 0.1,
                    },
                },
                {
                    validators: {
                        'order.price': (newValue) => {
                            return newValue > 0;
                        },
                        'order.quantity': (newValue) => {
                            return newValue > 0 && Number.isInteger(newValue);
                        },
                        'order.discount': (newValue) => {
                            return newValue >= 0 && newValue < 1;
                        },
                    },
                },
            );

            // 所有字段都应该正常校验
            store.state.order.price = 200;
            expect(store.state.order.price).toBe(200);

            store.state.order.quantity = 10;
            expect(store.state.order.quantity).toBe(10);

            store.state.order.discount = 0.2;
            expect(store.state.order.discount).toBe(0.2);

            // price 校验失败
            expect(() => {
                store.state.order.price = -10;
            }).toThrow(ValidateError);

            // quantity 校验失败（非整数）
            expect(() => {
                store.state.order.quantity = 5.5;
            }).toThrow(ValidateError);

            // discount 校验失败（超出范围）
            expect(() => {
                store.state.order.discount = 1.5;
            }).toThrow(ValidateError);
        });

        test('应该支持通配符匹配多个嵌套对象', () => {
            const store = new AutoStore(
                {
                    users: {
                        alice: { age: 25 },
                        bob: { age: 30 },
                        charlie: { age: 35 },
                    },
                },
                {
                    validators: {
                        'users.*.age': (newValue) => {
                            return newValue >= 0 && newValue <= 120;
                        },
                    },
                },
            );

            // 所有用户的 age 都应该被校验
            store.state.users.alice.age = 26;
            expect(store.state.users.alice.age).toBe(26);

            store.state.users.bob.age = 31;
            expect(store.state.users.bob.age).toBe(31);

            store.state.users.charlie.age = 36;
            expect(store.state.users.charlie.age).toBe(36);

            // 异常值应该被拒绝
            expect(() => {
                store.state.users.alice.age = 200;
            }).toThrow(ValidateError);
        });
    });

    describe('错误记录到 errors 对象', () => {
        test('校验失败时应该将错误写入 errors 对象', () => {
            const store = new AutoStore(
                {
                    user: { age: 18 },
                },
                {
                    validators: {
                        'user.age': (newValue) => {
                            return newValue >= 0 && newValue <= 150;
                        },
                    },
                },
            );

            // 初始状态 errors 应该为空
            expect(store.errors).toEqual({});

            // 校验失败的值应该记录错误
            expect(() => {
                store.state.user.age = 200;
            }).toThrow(ValidateError);

            // 检查错误是否被记录
            expect(store.errors['user.age']).toBeInstanceOf(ValidateError);
            expect(store.errors['user.age']).toBeDefined();
        });

        test('校验成功时应该从 errors 对象删除对应的错误', () => {
            const store = new AutoStore(
                {
                    user: { age: 18 },
                },
                {
                    validators: {
                        'user.age': (newValue) => {
                            return newValue >= 0 && newValue <= 150;
                        },
                    },
                },
            );

            // 初始状态 errors 应该为空
            expect(store.errors).toEqual({});

            // 触发校验失败
            expect(() => {
                store.state.user.age = 200;
            }).toThrow(ValidateError);

            // 应该有错误记录
            expect(store.errors['user.age']).toBeInstanceOf(ValidateError);

            // 修正为合法值，错误应该被删除
            store.state.user.age = 25;
            expect(store.state.user.age).toBe(25);
            expect(store.errors['user.age']).toBeUndefined();
        });

        test('validationBehavior="pass" 时也应该记录错误', () => {
            const store = new AutoStore(
                {
                    user: { age: 18 },
                },
                {
                    validators: {
                        'user.age': (newValue) => {
                            return newValue >= 0 && newValue <= 150;
                        },
                    },
                    validationBehavior: 'pass',
                },
            );

            // pass 模式：校验失败但继续写入，同时记录错误
            store.state.user.age = 200;
            expect(store.state.user.age).toBe(200);
            expect(store.errors['user.age']).toBeInstanceOf(ValidateError);
        });

        test('validationBehavior="ignore" 时应该记录错误但不写入', () => {
            const store = new AutoStore(
                {
                    user: { age: 18 },
                },
                {
                    validators: {
                        'user.age': (newValue) => {
                            return newValue >= 0 && newValue <= 150;
                        },
                    },
                    validationBehavior: 'ignore',
                },
            );

            // ignore 模式：校验失败不写入，但记录错误
            store.state.user.age = 200;
            expect(store.state.user.age).toBe(18); // 值保持不变
            expect(store.errors['user.age']).toBeInstanceOf(ValidateError);
        });

        test('validationBehavior="throw-pass" 时应该记录错误并抛出异常', () => {
            const store = new AutoStore(
                {
                    user: { age: 18 },
                },
                {
                    validators: {
                        'user.age': (newValue) => {
                            return newValue >= 0 && newValue <= 150;
                        },
                    },
                    validationBehavior: 'throw-pass',
                },
            );

            // throw-pass 模式：写入数据，记录错误，并抛出异常
            expect(() => {
                store.state.user.age = 200;
            }).toThrow(ValidateError);

            expect(store.state.user.age).toBe(200); // 值已被写入
            expect(store.errors['user.age']).toBeInstanceOf(ValidateError); // 错误被记录
        });

        test('多个路径的错误应该独立记录', () => {
            const store = new AutoStore(
                {
                    user: {
                        name: 'John',
                        age: 25,
                    },
                },
                {
                    validators: {
                        'user.name': (newValue) => {
                            return typeof newValue === 'string' && newValue.length > 0;
                        },
                        'user.age': (newValue) => {
                            return newValue >= 0 && newValue <= 150;
                        },
                    },
                },
            );

            // 触发 age 的错误
            expect(() => {
                store.state.user.age = 200;
            }).toThrow(ValidateError);

            expect(store.errors['user.age']).toBeInstanceOf(ValidateError);
            expect(store.errors['user.name']).toBeUndefined();

            // 触发 name 的错误
            expect(() => {
                store.state.user.name = '';
            }).toThrow(ValidateError);
            expect(store.errors['user.name']).toBeInstanceOf(ValidateError);

            // 两个错误都应该存在
            expect(store.errors['user.age']).toBeDefined();
            expect(store.errors['user.name']).toBeDefined();

            // 修正 age，只有 name 的错误
            store.state.user.age = 30;
            expect(store.errors['user.age']).toBeUndefined();
            expect(store.errors['user.name']).toBeDefined();

            // 修正 name，所有错误都应该清除
            store.state.user.name = 'Alice';
            expect(store.errors['user.age']).toBeUndefined();
            expect(store.errors['user.name']).toBeUndefined();
        });

        test('使用自定义 delimiter 时错误路径应该正确', () => {
            const store = new AutoStore(
                {
                    user: { age: 18 },
                },
                {
                    delimiter: '/',
                    validators: {
                        'user/age': (newValue) => {
                            return newValue >= 0 && newValue <= 150;
                        },
                    },
                },
            );

            // 触发错误
            expect(() => {
                store.state.user.age = 200;
            }).toThrow(ValidateError);

            // 错误应该记录在 'user/age' 路径下
            expect(store.errors['user/age']).toBeInstanceOf(ValidateError);
            expect(store.errors['user.age']).toBeUndefined(); // 使用错误的分隔符
        });
    });
});
