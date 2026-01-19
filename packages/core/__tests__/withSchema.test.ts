/** biome-ignore-all lint/correctness/noUnusedFunctionParameters: <explanation> */
import { describe, test, expect } from 'bun:test';
import { AutoStore, ValidateError, withSchema } from '../src';

/**
 * withSchema 功能测试
 *
 * 测试 withSchema 函数的所有选项：
 * - validate: 控制校验行为 ('none' | 'pass' | 'throw' | 'ignore' | 'throw-pass')
 * - silent (拼写为 slient): 控制是否触发事件
 */
describe('withSchema', () => {
    describe('validate 选项', () => {
        describe('validate="none" - 跳过校验', () => {
            test('validate="none" 时应该跳过校验并写入数据', () => {
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

                // 使用 withSchema 跳过校验
                store.state.user.age = withSchema(200, { validate: 'none' });
                expect(store.state.user.age).toBe(200);
            });

            test('validate="none" 时应该跳过所有类型的校验', () => {
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
                                const error = new ValidateError('Age validation failed');
                                error.behavior = 'throw';
                                throw error;
                            }
                            return true;
                        },
                    },
                );

                // 即使校验函数抛出异常，也应该跳过校验
                store.state.user.age = withSchema(200, { validate: 'none' });
                expect(store.state.user.age).toBe(200);
            });

            test('validate="none" 时应该不触发 validate 事件', () => {
                let validateEventCount = 0;
                const store = new AutoStore(
                    {
                        user: { age: 18 },
                    },
                    {
                        onValidate(newValue, oldValue, path) {
                            validateEventCount++;
                            return true;
                        },
                    },
                );

                store.on('validate', () => {
                    validateEventCount++;
                });

                // validate="none" 不应该触发校验事件
                store.state.user.age = withSchema(200, { validate: 'none' });

                // 校验函数和 validate 事件都不应该被触发
                expect(validateEventCount).toBe(0);
                expect(store.state.user.age).toBe(200);
            });
        });

        describe('validate="pass" - 校验失败继续写入', () => {
            test('validate="pass" 时校验失败应该继续写入', () => {
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
                                error.behavior = 'throw';
                                throw error;
                            }
                            return true;
                        },
                    },
                );

                // 使用 withSchema 的 validate="pass" 覆盖校验函数的 behavior
                store.state.user.age = withSchema(200, { validate: 'pass' });
                expect(store.state.user.age).toBe(200);
            });

            test('validate="pass" 时校验失败应该记录错误', () => {
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
                                throw new ValidateError('Age must be between 0 and 150');
                            }
                            return true;
                        },
                    },
                );

                // 校验失败但继续写入
                store.state.user.age = withSchema(200, { validate: 'pass' });
                expect(store.state.user.age).toBe(200);
                expect(store.errors['user.age']).toBeDefined();
            });
        });

        describe('validate="ignore" - 校验失败忽略写入', () => {
            test('validate="ignore" 时校验失败应该忽略写入', () => {
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
                                error.behavior = 'throw';
                                throw error;
                            }
                            return true;
                        },
                    },
                );

                // 校验失败，忽略写入
                store.state.user.age = withSchema(200, { validate: 'ignore' });
                expect(store.state.user.age).toBe(18); // 值保持不变
            });

            test('validate="ignore" 时不应该抛出异常', () => {
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
                                throw new ValidateError('Age must be between 0 and 150');
                            }
                            return true;
                        },
                    },
                );

                // 不应该抛出异常
                expect(() => {
                    store.state.user.age = withSchema(200, { validate: 'ignore' });
                }).not.toThrow();
            });

            test('validate="ignore" 时应该记录错误', () => {
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
                                throw new ValidateError('Age must be between 0 and 150');
                            }
                            return true;
                        },
                    },
                );

                // ignore 模式：校验失败不写入，但记录错误
                store.state.user.age = withSchema(200, { validate: 'ignore' });
                expect(store.state.user.age).toBe(18); // 值保持不变
                expect(store.errors['user.age']).toBeDefined();
            });
        });

        describe('validate="throw" - 校验失败抛出异常（默认）', () => {
            test('validate="throw" 时校验失败应该抛出异常', () => {
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
                                error.behavior = 'pass';
                                throw error;
                            }
                            return true;
                        },
                    },
                );

                // 使用 validate="throw" 覆盖校验函数的 behavior="pass"
                expect(() => {
                    store.state.user.age = withSchema(200, { validate: 'throw' });
                }).toThrow(ValidateError);
                expect(store.state.user.age).toBe(18); // 值不应该被修改
            });

            test('不指定 validate 时应该默认为 "throw"', () => {
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
                                throw new ValidateError('Age must be between 0 and 150');
                            }
                            return true;
                        },
                    },
                );

                // 不指定 validate，默认为 'throw'
                expect(() => {
                    store.state.user.age = withSchema(200, {});
                }).toThrow(ValidateError);
                expect(store.state.user.age).toBe(18);
            });
        });

        describe('validate="throw-pass" - 写入数据但同时抛出异常', () => {
            test('validate="throw-pass" 时应该写入数据但同时抛出异常', () => {
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
                                error.behavior = 'pass';
                                throw error;
                            }
                            return true;
                        },
                    },
                );

                // 应该抛出异常
                expect(() => {
                    store.state.user.age = withSchema(200, { validate: 'throw-pass' });
                }).toThrow(ValidateError);

                // 但是值应该已经被写入
                expect(store.state.user.age).toBe(200);
            });

            test('validate="throw-pass" 时应该记录错误', () => {
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
                                throw new ValidateError('Age must be between 0 and 150');
                            }
                            return true;
                        },
                    },
                );

                try {
                    store.state.user.age = withSchema(200, { validate: 'throw-pass' });
                } catch {
                    // 预期会抛出异常
                }

                expect(store.state.user.age).toBe(200); // 值已被写入
                expect(store.errors['user.age']).toBeDefined(); // 错误被记录
            });
        });

        describe('validate 与 validators 组合', () => {
            test('validate 选项应该覆盖 validators 的行为', () => {
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
                                const error = new ValidateError('Age must be between 0 and 150');
                                error.behavior = 'throw';
                                throw error;
                            },
                        },
                        onInvalid: 'throw',
                    },
                );

                // 使用 validate="pass" 覆盖 validator 的 behavior
                store.state.user.age = withSchema(200, { validate: 'pass' });
                expect(store.state.user.age).toBe(200);
            });

            test('validate="none" 应该跳过 validators 校验', () => {
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

                // validate="none" 跳过校验
                store.state.user.age = withSchema(200, { validate: 'none' });
                expect(store.state.user.age).toBe(200);
            });
        });
    });

    describe('silent 选项 (拼写为 slient)', () => {
        test('silent=true 时应该不触发 watch', () => {
            let watchCallCount = 0;
            const store = new AutoStore({
                user: { age: 18 },
            });

            store.watch('user.age', () => {
                watchCallCount++;
            });

            // 普通赋值应该触发 watch
            store.state.user.age = 25;
            expect(watchCallCount).toBe(1);

            // silent 赋值不应该触发 watch
            store.state.user.age = withSchema(30, { slient: true });
            expect(watchCallCount).toBe(1); // 仍然是 1
            expect(store.state.user.age).toBe(30);
        });

        test('silent=true 时应该不触发数组元素的 watch', () => {
            let watchCallCount = 0;
            const store = new AutoStore({
                items: [1, 2, 3],
            });

            store.watch('items.0', () => {
                watchCallCount++;
            });

            // 普通赋值应该触发 watch
            store.state.items[0] = 10;
            expect(watchCallCount).toBe(1);

            // silent 赋值不应该触发 watch
            store.state.items[0] = withSchema(20, { slient: true });
            expect(watchCallCount).toBe(1); // 仍然是 1
            expect(store.state.items[0]).toBe(20);
        });

        test('silent=true 时应该不触发嵌套路径的 watch', () => {
            let watchCallCount = 0;
            const store = new AutoStore({
                user: {
                    profile: {
                        age: 18,
                    },
                },
            });

            store.watch('user.profile.age', () => {
                watchCallCount++;
            });

            // 普通赋值应该触发 watch
            store.state.user.profile.age = 25;
            expect(watchCallCount).toBe(1);

            // silent 赋值不应该触发 watch
            store.state.user.profile.age = withSchema(30, { slient: true });
            expect(watchCallCount).toBe(1); // 仍然是 1
            expect(store.state.user.profile.age).toBe(30);
        });

        test('silent=false 时应该正常触发 watch', () => {
            let watchCallCount = 0;
            const store = new AutoStore({
                user: { age: 18 },
            });

            store.watch('user.age', () => {
                watchCallCount++;
            });

            // silent=false 应该触发 watch
            store.state.user.age = withSchema(25, { slient: false });
            expect(watchCallCount).toBe(1);
            expect(store.state.user.age).toBe(25);
        });

        test('不指定 silent 时应该默认触发 watch', () => {
            let watchCallCount = 0;
            const store = new AutoStore({
                user: { age: 18 },
            });

            store.watch('user.age', () => {
                watchCallCount++;
            });

            // 不指定 silent，默认触发 watch
            store.state.user.age = withSchema(25, {});
            expect(watchCallCount).toBe(1);
            expect(store.state.user.age).toBe(25);
        });
    });

    describe('validate 和 silent 组合使用', () => {
        test('validate="pass" 和 silent=true 组合', () => {
            let watchCallCount = 0;
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
                            throw new ValidateError('Age must be between 0 and 150');
                        }
                        return true;
                    },
                },
            );

            store.watch('user.age', () => {
                watchCallCount++;
            });

            // 校验失败但继续写入，同时不触发 watch
            store.state.user.age = withSchema(200, { validate: 'pass', slient: true });
            expect(store.state.user.age).toBe(200);
            expect(watchCallCount).toBe(0); // 不应该触发 watch
        });

        test('validate="none" 和 silent=true 组合', () => {
            let watchCallCount = 0;
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

            store.watch('user.age', () => {
                watchCallCount++;
            });

            // 跳过校验，不触发 watch
            store.state.user.age = withSchema(200, { validate: 'none', slient: true });
            expect(store.state.user.age).toBe(200);
            expect(watchCallCount).toBe(0); // 不应该触发 watch
        });

        test('validate="throw" 和 silent=true 组合', () => {
            let watchCallCount = 0;
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
                            throw new ValidateError('Age must be between 0 and 150');
                        }
                        return true;
                    },
                },
            );

            store.watch('user.age', () => {
                watchCallCount++;
            });

            // 校验失败抛出异常，即使设置 silent=true 也不会写入数据
            expect(() => {
                store.state.user.age = withSchema(200, { validate: 'throw', slient: true });
            }).toThrow(ValidateError);
            expect(store.state.user.age).toBe(18); // 值保持不变
            expect(watchCallCount).toBe(0); // 不会触发 watch
        });
    });

    describe('复杂场景', () => {
        test('在嵌套对象中使用 withSchema', () => {
            let watchCallCount = 0;
            const store = new AutoStore(
                {
                    user: {
                        profile: {
                            age: 18,
                        },
                    },
                },
                {
                    onValidate(newValue, oldValue, path) {
                        if (path[path.length - 1] === 'age') {
                            if (newValue >= 0 && newValue <= 150) {
                                return true;
                            }
                            throw new ValidateError('Age must be between 0 and 150');
                        }
                        return true;
                    },
                },
            );

            store.watch('user.profile.age', () => {
                watchCallCount++;
            });

            // 在嵌套路径中使用 withSchema
            store.state.user.profile.age = withSchema(200, {
                validate: 'pass',
                slient: true,
            });
            expect(store.state.user.profile.age).toBe(200);
            expect(watchCallCount).toBe(0);
        });

        test('在数组元素中使用 withSchema', () => {
            let watchCallCount = 0;
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

            store.watch('items.0', () => {
                watchCallCount++;
            });

            // 在数组元素中使用 withSchema
            store.state.items[0] = withSchema(-10, { validate: 'pass', slient: true });
            expect(store.state.items[0]).toBe(-10);
            expect(watchCallCount).toBe(0);
        });

        test('多次赋值使用不同的 withSchema 选项', () => {
            let watchCallCount = 0;
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
                            throw new ValidateError('Age must be between 0 and 150');
                        }
                        return true;
                    },
                },
            );

            store.watch('user.age', () => {
                watchCallCount++;
            });

            // 第一次：正常赋值，触发 watch
            store.state.user.age = 25;
            expect(watchCallCount).toBe(1);
            expect(store.state.user.age).toBe(25);

            // 第二次：静默赋值，不触发 watch
            store.state.user.age = withSchema(30, { slient: true });
            expect(watchCallCount).toBe(1);
            expect(store.state.user.age).toBe(30);

            // 第三次：跳过校验的静默赋值
            store.state.user.age = withSchema(200, { validate: 'none', slient: true });
            expect(watchCallCount).toBe(1);
            expect(store.state.user.age).toBe(200);

            // 第四次：正常赋值，触发 watch
            store.state.user.age = 35;
            expect(watchCallCount).toBe(2);
            expect(store.state.user.age).toBe(35);
        });
    });

    describe('边界情况', () => {
        test('withSchema 包装的值应该保持原始类型', () => {
            const store = new AutoStore({
                value: 100,
            });

            // 数字
            store.state.value = withSchema(200, {});
            expect(store.state.value).toBe(200);
            expect(typeof store.state.value).toBe('number');

            // 字符串
            //@ts-expect-error
            store.state.value = withSchema('hello', {});
            //@ts-expect-error
            expect(store.state.value).toBe('hello');
            expect(typeof store.state.value).toBe('string');

            // 对象
            const obj = { name: 'John' };
            //@ts-expect-error
            store.state.value = withSchema(obj, {});
            //@ts-expect-error
            expect(store.state.value).toEqual(obj);

            // 数组
            const arr = [1, 2, 3];
            //@ts-expect-error
            store.state.value = withSchema(arr, {});
            //@ts-expect-error
            expect(store.state.value).toEqual(arr);

            // null
            //@ts-expect-error
            store.state.value = withSchema(null, {});
            //@ts-expect-error
            expect(store.state.value).toBe(null);

            // undefined
            //@ts-expect-error
            store.state.value = withSchema(undefined, {});
            //@ts-expect-error
            expect(store.state.value).toBe(undefined);
        });

        test('withSchema 应该支持所有类型的值', () => {
            const store = new AutoStore({
                value: null,
            });

            // 测试各种类型
            //@ts-expect-error
            store.state.value = withSchema(100, {});
            //@ts-expect-error
            expect(store.state.value).toBe(100);

            //@ts-expect-error
            store.state.value = withSchema('string', {});
            //@ts-expect-error
            expect(store.state.value).toBe('string');

            //@ts-expect-error
            store.state.value = withSchema(true, {});
            //@ts-expect-error
            expect(store.state.value).toBe(true);

            //@ts-expect-error
            store.state.value = withSchema({ key: 'value' }, {});
            //@ts-expect-error
            expect(store.state.value).toEqual({ key: 'value' });

            //@ts-expect-error
            store.state.value = withSchema([1, 2, 3], {});
            //@ts-expect-error
            expect(store.state.value).toEqual([1, 2, 3]);

            store.state.value = withSchema(null, {});
            expect(store.state.value).toBe(null);
        });

        test('没有 onValidate 时使用 withSchema 应该正常工作', () => {
            const store = new AutoStore({
                user: { age: 18 },
            });

            // 没有 onValidate，withSchema 应该正常工作
            store.state.user.age = withSchema(200, { validate: 'none', slient: true });
            expect(store.state.user.age).toBe(200);
        });

        test('withSchema 在计算属性中使用', () => {
            const store = new AutoStore({
                base: 10,
                doubled: (scope: any) => scope.base * 2,
            });

            // 计算属性是只读的，不应该能写入
            // 这里测试 withSchema 不会影响计算属性的正常行为
            expect(store.state.doubled).toBe(20);

            store.state.base = 20;
            expect(store.state.doubled).toBe(40);
        });
    });

    describe('validate 事件与 withSchema', () => {
        test('validate="pass" 时应该触发 validate 事件', () => {
            let validateEventCount = 0;
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
                            throw new ValidateError('Age must be between 0 and 150');
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

            // validate="pass" 应该触发 validate 事件
            store.state.user.age = withSchema(200, { validate: 'pass' });
            expect(validateEventCount).toBe(1);
            expect(capturedError).toBeInstanceOf(ValidateError);
            expect(store.state.user.age).toBe(200);
        });

        test('validate="none" 时不应该触发 validate 事件', () => {
            let validateEventCount = 0;
            const store = new AutoStore(
                {
                    user: { age: 18 },
                },
                {
                    onValidate(newValue, oldValue, path) {
                        validateEventCount++;
                        return true;
                    },
                },
            );

            store.on('validate', () => {
                validateEventCount++;
            });

            // validate="none" 不应该触发 validate 事件
            store.state.user.age = withSchema(200, { validate: 'none' });
            expect(validateEventCount).toBe(0);
            expect(store.state.user.age).toBe(200);
        });

        test('validate="ignore" 时应该触发 validate 事件', () => {
            let validateEventCount = 0;
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
                            throw new ValidateError('Age must be between 0 and 150');
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

            // validate="ignore" 应该触发 validate 事件
            store.state.user.age = withSchema(200, { validate: 'ignore' });
            expect(validateEventCount).toBe(1);
            expect(capturedError).toBeInstanceOf(ValidateError);
            expect(store.state.user.age).toBe(18); // 值保持不变
        });
    });

    describe('错误处理', () => {
        test('withSchema 应该正确处理校验错误', () => {
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
                            const error = new ValidateError('自定义错误信息');
                            error.behavior = 'throw';
                            throw error;
                        }
                        return true;
                    },
                },
            );

            // 应该抛出包含自定义错误信息的异常
            expect(() => {
                store.state.user.age = withSchema(200, { validate: 'throw' });
            }).toThrow('自定义错误信息');
        });

        test('validate="throw-pass" 应该在写入后抛出异常', () => {
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
                            throw new ValidateError('Age must be between 0 and 150');
                        }
                        return true;
                    },
                },
            );

            // 应该抛出异常
            expect(() => {
                store.state.user.age = withSchema(200, { validate: 'throw-pass' });
            }).toThrow(ValidateError);

            // 但是值应该已经被写入
            expect(store.state.user.age).toBe(200);
        });
    });
});
