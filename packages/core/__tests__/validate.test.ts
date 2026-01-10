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
                    onValidate(path, newValue) {
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
                    onValidate(path, newValue) {
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
                    onValidate(path, newValue) {
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
                    onValidate(path, newValue) {
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
                    onValidate(path, newValue) {
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
                    onValidate(path, newValue) {
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
                    onValidate(path, newValue) {
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
                    onValidate(path, newValue) {
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
                    onValidate(path, newValue) {
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
                    onValidate(path, newValue) {
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
                    onValidate(path, newValue) {
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
                    onValidate(path, newValue) {
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
                    onValidate(path, newValue, oldValue) {
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
                    onValidate(path, newValue, oldValue) {
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
                    onValidate(path, newValue, oldValue) {
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
                    onValidate(path, newValue, oldValue) {
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
                    onValidate(path, newValue, oldValue) {
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
                    onValidate(path, newValue, oldValue) {
                        if (path[0] === 'user' && path[1] === 'age') {
                            if (newValue > 150) {
                                throw new ValidateError('年龄不能超过 150');
                            }
                        }
                        return true;
                    },
                },
            );

            store.on('validate', (event: any) => {
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
                    onValidate(path, newValue, oldValue) {
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
                    onValidate(path, newValue) {
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
                    onValidate(path, newValue) {
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
                    onValidate(path, newValue) {
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
                    onValidate(path, newValue) {
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
                    onValidate(path, newValue, oldValue) {
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
    });

    describe('边界情况', () => {
        test('onValidate 抛出异常时的处理', () => {
            const store = new AutoStore(
                {
                    user: { age: 18 },
                },
                {
                    onValidate(path, newValue, oldValue) {
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
                    onValidate(path, newValue) {
                        // 允许 null，但不允许 undefined
                        return newValue !== undefined;
                    },
                },
            );

            // null 应该被允许
            // @ts-expect-error
            store.state.value = null;
            expect(store.state.value).toBe(null);

            // undefined 应该被拒绝
            expect(() => {
                // @ts-expect-error - 测试 undefined 值
                store.state.value = undefined;
            }).toThrow();
        });
    });
});
