/**
 * ConfigManager 和 configurable 功能单元测试
 *
 * 测试核心逻辑：
 * - 使用 configurable 声明可配置项
 * - 可配置项自动注册到 ConfigManager
 * - 写入状态值时调用校验函数
 * - 校验失败信息写入 ConfigManager.errors
 *
 * 测试各种数据类型和校验场景
 */

import { describe, test, expect, beforeEach, afterEach } from 'bun:test';
import { AutoStore, configurable, ConfigManager, ValidateError } from '../src';

describe('ConfigManager 和 configurable 集成测试', () => {
    let configManager: ConfigManager;

    beforeEach(() => {
        // 每个测试前创建一个新的 ConfigManager
        configManager = new ConfigManager({
            load: () => ({}),
            save: () => {},
        });
    });

    afterEach(() => {
        // 每个测试后清理 ConfigManager
        configManager = null as any;
    });

    describe('基本功能 - 自动注册配置项', () => {
        test('使用 configurable 声明的字段应该自动注册到 ConfigManager', () => {
            const store = new AutoStore(
                {
                    order: {
                        count: configurable(100, {
                            onValidate: (value) => {
                                return value >= 0 && value <= 1000;
                            },
                        }),
                    },
                },
                {
                    configManager,
                },
            );
            // ConfigManager 应该包含配置项
            expect(configManager.size).toBeGreaterThan(0);
            expect(store.state.order.count).toBe(100);
        });

        test('注册后校验函数应该生效', () => {
            const store = new AutoStore(
                {
                    count: configurable(100, {
                        onValidate: (value) => {
                            if (value < 0 || value > 1000) {
                                throw new ValidateError('数量必须在 0 到 1000 之间');
                            }
                            return true;
                        },
                    }),
                },
                {
                    configManager,
                },
            );

            // 合法值应该成功
            store.state.count = 200;
            expect(store.state.count).toBe(200);

            // 非法值应该抛出异常
            expect(() => {
                store.state.count = 2000;
            }).toThrow(ValidateError);
            expect(configManager.errors.count).toBe('数量必须在 0 到 1000 之间');
        });

        test('校验失败时错误应该记录到 ConfigManager.errors', () => {
            const store = new AutoStore(
                {
                    price: configurable(100, {
                        onValidate: (value) => {
                            if (value <= 0) {
                                throw new ValidateError('价格必须大于0');
                            }
                            return true;
                        },
                    }),
                },
                {
                    configManager,
                },
            );

            // 触发校验失败
            expect(() => {
                store.state.price = -50;
            }).toThrow(ValidateError);

            // 错误应该被记录到 ConfigManager.errors
            expect(configManager.errors['price']).toBeDefined();
            expect(configManager.errors['price']).toBe('价格必须大于0');

            // 值不应该被修改
            expect(store.state.price).toBe(100);
        });

        test('校验成功后应该清除错误', () => {
            const store = new AutoStore(
                {
                    quantity: configurable(10, {
                        onValidate: (value) => {
                            if (value < 0 || value > 100) {
                                throw new ValidateError('数量超出范围');
                            }
                            return true;
                        },
                    }),
                },
                {
                    configManager,
                },
            );

            // 触发校验失败
            expect(() => {
                store.state.quantity = 200;
            }).toThrow(ValidateError);

            expect(configManager.errors['quantity']).toBeDefined();

            // 修正为合法值
            store.state.quantity = 50;
            expect(store.state.quantity).toBe(50);

            // 错误应该被清除
            expect(configManager.errors['quantity']).toBeUndefined();
        });
    });

    describe('onInvalid - 不同验证行为', () => {
        test('onInvalid="pass" - 校验失败但继续写入', () => {
            const store = new AutoStore(
                {
                    count: configurable(100, {
                        onValidate: (value) => {
                            if (value < 0 || value > 1000) {
                                throw new ValidateError('数量超出范围');
                            }
                            return true;
                        },
                        onInvalid: 'pass',
                    }),
                },
                {
                    configManager,
                },
            );

            // 校验失败但应该继续写入
            store.state.count = 2000;
            expect(store.state.count).toBe(2000);

            // 错误应该被记录
            expect(configManager.errors['count']).toBeDefined();
            expect(configManager.errors['count']).toBe('数量超出范围');
        });

        test('onInvalid="ignore" - 校验失败静默忽略', () => {
            const store = new AutoStore(
                {
                    count: configurable(100, {
                        onValidate: (value) => {
                            if (value < 0 || value > 1000) {
                                throw new ValidateError('数量超出范围');
                            }
                            return true;
                        },
                        onInvalid: 'ignore',
                    }),
                },
                {
                    configManager,
                },
            );

            // 校验失败，值不应该被修改
            store.state.count = 2000;
            expect(store.state.count).toBe(100);

            // 错误应该被记录
            expect(configManager.errors['count']).toBeDefined();
        });

        test('onInvalid="throw" - 校验失败抛出异常（默认）', () => {
            const store = new AutoStore(
                {
                    count: configurable(100, {
                        onValidate: (value) => {
                            return value >= 0 && value <= 1000;
                        },
                        onInvalid: 'throw',
                    }),
                },
                {
                    configManager,
                },
            );

            // 校验失败应该抛出异常
            expect(() => {
                store.state.count = 2000;
            }).toThrow(ValidateError);

            expect(store.state.count).toBe(100);
            expect(configManager.errors['count']).toBeDefined();
        });

        test('onInvalid="throw-pass" - 写入数据但抛出异常', () => {
            const store = new AutoStore(
                {
                    count: configurable(100, {
                        onValidate: (value) => {
                            return value >= 0 && value <= 1000;
                        },
                        onInvalid: 'throw-pass',
                    }),
                },
                {
                    configManager,
                },
            );

            // 应该抛出异常
            expect(() => {
                store.state.count = 2000;
            }).toThrow(ValidateError);

            // 但值应该被写入
            expect(store.state.count).toBe(2000);

            // 错误应该被记录
            expect(configManager.errors['count']).toBeDefined();
        });
    });

    describe('测试各种数据类型', () => {
        describe('number 类型', () => {
            test('应该校验数字类型的值', () => {
                const store = new AutoStore(
                    {
                        price: configurable(99.9, {
                            onValidate: (value) => {
                                return typeof value === 'number' && value > 0;
                            },
                        }),
                    },
                    {
                        configManager,
                    },
                );

                // 合法值
                store.state.price = 199.9;
                expect(store.state.price).toBe(199.9);

                // 非法值（负数）
                expect(() => {
                    store.state.price = -10;
                }).toThrow(ValidateError);

                // 非法值（非数字）
                expect(() => {
                    // @ts-expect-error - 测试类型错误
                    store.state.price = 'free';
                }).toThrow(ValidateError);
            });

            test('应该支持整数校验', () => {
                const store = new AutoStore(
                    {
                        quantity: configurable(10, {
                            onValidate: (value) => {
                                return Number.isInteger(value) && value > 0;
                            },
                        }),
                    },
                    {
                        configManager,
                    },
                );

                // 整数应该成功
                store.state.quantity = 20;
                expect(store.state.quantity).toBe(20);

                // 小数应该失败
                expect(() => {
                    store.state.quantity = 15.5;
                }).toThrow(ValidateError);
            });

            test('应该支持范围校验', () => {
                const store = new AutoStore(
                    {
                        age: configurable(25, {
                            onValidate: (value) => {
                                return value >= 0 && value <= 150;
                            },
                        }),
                    },
                    {
                        configManager,
                    },
                );

                // 正常范围应该成功
                store.state.age = 30;
                expect(store.state.age).toBe(30);

                // 超出范围应该失败
                expect(() => {
                    store.state.age = 200;
                }).toThrow(ValidateError);

                expect(() => {
                    store.state.age = -1;
                }).toThrow(ValidateError);
            });
        });

        describe('string 类型', () => {
            test('应该校验字符串类型的值', () => {
                const store = new AutoStore(
                    {
                        username: configurable('admin', {
                            onValidate: (value) => {
                                return typeof value === 'string' && value.length >= 3;
                            },
                        }),
                    },
                    {
                        configManager,
                    },
                );

                // 合法值
                store.state.username = 'user123';
                expect(store.state.username).toBe('user123');

                // 非法值（太短）
                expect(() => {
                    store.state.username = 'ab';
                }).toThrow(ValidateError);

                // 非法值（非字符串）
                expect(() => {
                    // @ts-expect-error - 测试类型错误
                    store.state.username = 123;
                }).toThrow(ValidateError);
            });

            test('应该支持正则表达式校验', () => {
                const store = new AutoStore(
                    {
                        email: configurable('test@example.com', {
                            onValidate: (value) => {
                                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                                return emailRegex.test(value);
                            },
                        }),
                    },
                    {
                        configManager,
                    },
                );

                // 合法邮箱
                store.state.email = 'user@domain.com';
                expect(store.state.email).toBe('user@domain.com');

                // 非法邮箱
                expect(() => {
                    store.state.email = 'invalid-email';
                }).toThrow(ValidateError);
            });

            test('应该支持字符串长度限制', () => {
                const store = new AutoStore(
                    {
                        title: configurable('标题', {
                            onValidate: (value) => {
                                return value.length >= 1 && value.length <= 50;
                            },
                        }),
                    },
                    {
                        configManager,
                    },
                );

                // 正常长度
                store.state.title = '这是一个标题';
                expect(store.state.title).toBe('这是一个标题');

                // 太长
                expect(() => {
                    store.state.title = 'a'.repeat(100);
                }).toThrow(ValidateError);

                // 空字符串
                expect(() => {
                    store.state.title = '';
                }).toThrow(ValidateError);
            });
        });

        describe('boolean 类型', () => {
            test('应该校验布尔类型的值', () => {
                const store = new AutoStore(
                    {
                        enabled: configurable(true, {
                            onValidate: (value) => {
                                return typeof value === 'boolean';
                            },
                        }),
                    },
                    {
                        configManager,
                    },
                );

                // 合法值
                store.state.enabled = false;
                expect(store.state.enabled).toBe(false);

                store.state.enabled = true;
                expect(store.state.enabled).toBe(true);

                // 非法值
                expect(() => {
                    // @ts-expect-error - 测试类型错误
                    store.state.enabled = 'yes';
                }).toThrow(ValidateError);
            });
        });

        describe('array 类型', () => {
            test('应该校验数组类型的值', () => {
                const store = new AutoStore(
                    {
                        tags: configurable(['tag1', 'tag2'], {
                            onValidate: (value) => {
                                return Array.isArray(value) && value.length <= 5;
                            },
                        }),
                    },
                    {
                        configManager,
                    },
                );

                // 合法值
                store.state.tags = ['tag3', 'tag4'];
                expect(store.state.tags).toEqual(['tag3', 'tag4']);

                // 数组太长
                expect(() => {
                    store.state.tags = ['a', 'b', 'c', 'd', 'e', 'f'];
                }).toThrow(ValidateError);

                // 非数组
                expect(() => {
                    // @ts-expect-error - 测试类型错误
                    store.state.tags = 'not-array';
                }).toThrow(ValidateError);
            });

            test('应该校验数组元素类型', () => {
                const store = new AutoStore(
                    {
                        numbers: configurable([1, 2, 3], {
                            onValidate: (value) => {
                                return (
                                    Array.isArray(value) &&
                                    value.every((item) => typeof item === 'number')
                                );
                            },
                        }),
                    },
                    {
                        configManager,
                    },
                );

                // 数字数组
                store.state.numbers = [4, 5, 6];
                expect(store.state.numbers).toEqual([4, 5, 6]);

                // 混合类型数组
                expect(() => {
                    // @ts-expect-error - 测试类型错误
                    store.state.numbers = [1, 2, 'three'];
                }).toThrow(ValidateError);
            });
        });

        describe('object 类型', () => {
            test('应该校验对象类型的值', () => {
                const store = new AutoStore(
                    {
                        settings: configurable(
                            { theme: 'dark' },
                            {
                                onValidate: (value) => {
                                    return (
                                        typeof value === 'object' &&
                                        value !== null &&
                                        'theme' in value
                                    );
                                },
                            },
                        ),
                    },
                    {
                        configManager,
                    },
                );

                // 合法对象
                store.state.settings = { theme: 'light' };
                expect(store.state.settings).toEqual({ theme: 'light' });

                // 缺少必需字段
                expect(() => {
                    // @ts-expect-error - 测试缺少字段
                    store.state.settings = { other: 'value' };
                }).toThrow(ValidateError);

                // 非对象
                expect(() => {
                    // @ts-expect-error - 测试类型错误
                    store.state.settings = 'not-object';
                }).toThrow(ValidateError);
            });
        });

        describe('Date 类型', () => {
            test('应该校验 Date 类型的值', () => {
                const initialDate = new Date('2024-01-01');
                const store = new AutoStore(
                    {
                        createdAt: configurable(initialDate, {
                            onValidate: (value: any) => {
                                // 检查是否为 Date 实例且日期有效
                                return value instanceof Date && !isNaN(value.getTime());
                            },
                        }),
                    },
                    {
                        configManager,
                    },
                );

                // 合法 Date
                const newDate = new Date('2024-12-31');
                store.state.createdAt = newDate;
                // 验证 Date 已被正确设置
                expect(store.state.createdAt instanceof Date).toBe(true);

                // 非 Date
                expect(() => {
                    store.state.createdAt = '2024-01-01';
                }).toThrow(ValidateError);

                // 无效 Date
                expect(() => {
                    store.state.createdAt = new Date('invalid');
                }).toThrow(ValidateError);
            });
        });
    });

    describe('嵌套对象和复杂场景', () => {
        test('应该支持嵌套对象的配置项', () => {
            const store = new AutoStore(
                {
                    user: {
                        profile: {
                            age: configurable(25, {
                                onValidate: (value) => {
                                    return value >= 0 && value <= 150;
                                },
                            }),
                            name: configurable('John', {
                                onValidate: (value) => {
                                    return typeof value === 'string' && value.length > 0;
                                },
                            }),
                        },
                    },
                },
                {
                    configManager,
                },
            );

            // 两个字段都应该正常工作
            store.state.user.profile.age = 30;
            expect(store.state.user.profile.age).toBe(30);

            store.state.user.profile.name = 'Alice';
            expect(store.state.user.profile.name).toBe('Alice');

            // age 校验失败
            expect(() => {
                store.state.user.profile.age = 200;
            }).toThrow(ValidateError);

            // name 校验失败
            expect(() => {
                store.state.user.profile.name = '';
            }).toThrow(ValidateError);
        });

        test('应该支持多个配置项的独立校验', () => {
            const store = new AutoStore(
                {
                    order: {
                        price: configurable(100, {
                            onValidate: (value) => {
                                if (value <= 0) {
                                    throw new ValidateError('价格必须大于0');
                                }
                                return true;
                            },
                        }),
                        quantity: configurable(10, {
                            onValidate: (value) => {
                                if (value < 1 || value > 100) {
                                    throw new ValidateError('数量必须在 1 到 100 之间');
                                }
                                return true;
                            },
                        }),
                        discount: configurable(0.1, {
                            onValidate: (value) => {
                                if (value < 0 || value >= 1) {
                                    throw new ValidateError('折扣必须在 0 到 1 之间');
                                }
                                return true;
                            },
                        }),
                    },
                },
                {
                    configManager,
                },
            );

            // 所有字段初始值应该合法
            expect(store.state.order.price).toBe(100);
            expect(store.state.order.quantity).toBe(10);
            expect(store.state.order.discount).toBe(0.1);

            // price 校验失败
            expect(() => {
                store.state.order.price = -10;
            }).toThrow(ValidateError);
            expect(configManager.errors['order.price']).toBeDefined();
            expect(configManager.errors['order.price']).toBe('价格必须大于0');

            // quantity 校验失败
            expect(() => {
                store.state.order.quantity = 200;
            }).toThrow(ValidateError);
            expect(configManager.errors['order.quantity']).toBeDefined();
            expect(configManager.errors['order.quantity']).toBe('数量必须在 1 到 100 之间');

            // discount 校验失败
            expect(() => {
                store.state.order.discount = 1.5;
            }).toThrow(ValidateError);
            expect(configManager.errors['order.discount']).toBeDefined();
            expect(configManager.errors['order.discount']).toBe('折扣必须在 0 到 1 之间');

            // 三个错误应该独立存在
            expect(configManager.errors['order.price']).toBeDefined();
            expect(configManager.errors['order.quantity']).toBeDefined();
            expect(configManager.errors['order.discount']).toBeDefined();

            // 修正 price
            store.state.order.price = 200;
            expect(configManager.errors['order.price']).toBeUndefined();
            expect(configManager.errors['order.quantity']).toBeDefined();
            expect(configManager.errors['order.discount']).toBeDefined();

            // 修正 quantity
            store.state.order.quantity = 50;
            expect(configManager.errors['order.price']).toBeUndefined();
            expect(configManager.errors['order.quantity']).toBeUndefined();
            expect(configManager.errors['order.discount']).toBeDefined();

            // 修正 discount
            store.state.order.discount = 0.2;
            expect(configManager.errors['order.price']).toBeUndefined();
            expect(configManager.errors['order.quantity']).toBeUndefined();
            expect(configManager.errors['order.discount']).toBeUndefined();
        });
    });

    describe('configKey - 配置键前缀', () => {
        test('应该支持自定义 configKey', () => {
            const store = new AutoStore(
                {
                    count: configurable(100, {
                        onValidate: (value) => {
                            return value >= 0 && value <= 1000;
                        },
                    }),
                },
                {
                    configManager,
                    configKey: 'myapp',
                },
            );

            // 触发校验失败
            expect(() => {
                store.state.count = 2000;
            }).toThrow(ValidateError);

            // 错误应该记录在带前缀的键下
            expect(configManager.errors['myapp.count']).toBeDefined();
            expect(configManager.errors.count).toBeUndefined();
        });
    });

    describe('边界情况和错误处理', () => {
        test('没有 onValidate 时应该正常工作', () => {
            const store = new AutoStore(
                {
                    value: configurable(100, {}),
                },
                {
                    configManager,
                },
            );

            // 没有校验函数，任何值都应该允许
            store.state.value = 200;
            expect(store.state.value).toBe(200);

            store.state.value = -50;
            expect(store.state.value).toBe(-50);

            // 不应该有错误
            expect(configManager.errors).toEqual({});
        });

        test('校验函数抛出非 ValidateError 的异常应该被处理', () => {
            const store = new AutoStore(
                {
                    value: configurable(100, {
                        onValidate: (value) => {
                            if (value < 0) {
                                throw new Error('不允许负数');
                            }
                            return true;
                        },
                    }),
                },
                {
                    configManager,
                },
            );

            // 抛出的普通 Error 应该被处理
            expect(() => {
                store.state.value = -10;
            }).toThrow();

            // 错误应该被记录
            expect(configManager.errors.value).toBeDefined();
        });
    });

    describe('ConfigManager.fields 和 size 属性', () => {
        test('fields 应该返回所有配置项', () => {
            const store = new AutoStore(
                {
                    count: configurable(100, {}),
                    price: configurable(99.9, {}),
                },
                {
                    configManager,
                },
            );

            // size 应该反映配置项数量
            expect(configManager.size).toBe(2);

            // fields 应该包含所有配置项
            expect(configManager.fields).toBeDefined();
        });
    });

    describe('validate 事件触发', () => {
        test('校验时应该触发 validate 事件', () => {
            const validateEvents: any[] = [];

            const store = new AutoStore(
                {
                    count: configurable(100, {
                        onValidate: (value) => {
                            if (value < 0 || value > 1000) {
                                throw new ValidateError('数量超出范围');
                            }
                            return true;
                        },
                    }),
                },
                {
                    configManager,
                },
            );

            store.on('validate', (event) => {
                validateEvents.push({ ...event });
            });

            // 成功的校验
            store.state.count = 200;
            expect(validateEvents.length).toBeGreaterThanOrEqual(1);
            const successEvent = validateEvents.find((e) => e.error === undefined);
            expect(successEvent).toBeDefined();

            // 失败的校验
            try {
                store.state.count = 2000;
            } catch {
                // 预期抛出异常
            }

            const failureEvent = validateEvents.find((e) => e.error instanceof ValidateError);
            expect(failureEvent).toBeDefined();
            expect(failureEvent?.error.message).toBe('数量超出范围');
        });
    });
});
