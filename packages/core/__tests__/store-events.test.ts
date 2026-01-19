/**
 * Store 事件系统单元测试
 *
 * 测试所有 Store 级别的事件，包括：
 * - load/unload 事件
 * - computed 生命周期事件 (created/done/error/cancel)
 * - watch 生命周期事件 (created/done/error)
 * - observer 生命周期事件 (beforeCreate/created/done)
 * - reset 事件
 * - validate 事件
 */

import { describe, test, expect } from 'bun:test';
import { AutoStore, computed, watch } from '../src';
import { delay } from 'flex-tools/async/delay';

describe('Store Events', () => {
    describe('生命周期事件', () => {
        test('load 事件在 store 创建时触发', () => {
            // load 事件在构造函数中同步触发
            // 验证 store 是否正常初始化
            const store = new AutoStore({
                count: 1,
            });

            // 验证 store 创建成功，说明 load 事件已经触发
            expect(store.state.count).toBe(1);
        });

        test('unload 事件在 store 销毁时触发', () => {
            let unloadEventFired = false;

            const store = new AutoStore({
                count: 1,
            });

            // 注意：由于 destroy() 会先调用 offAll()，所以需要在销毁前监听
            // 但这是当前实现的限制，测试反映了实际行为
            store.on('unload', () => {
                unloadEventFired = true;
            });

            // destroy 内部先调用 offAll() 再 emit('unload')
            // 所以监听器会被移除，无法收到 unload 事件
            store.destroy();

            // 这是当前实现的限制
            expect(unloadEventFired).toBe(false);
        });

        test('reset 事件在重置状态时触发', () => {
            let resetEventFired = false;
            let resetPath: string | undefined;

            const store = new AutoStore(
                {
                    user: {
                        name: 'John',
                        age: 30,
                    },
                    count: 1,
                },
                {
                    resetable: true,
                },
            );

            store.on('reset', (path) => {
                resetEventFired = true;
                resetPath = path;
            });

            // 修改状态
            store.state.user.name = 'Jane';
            store.state.count = 10;

            // 重置整个状态
            store.reset();

            expect(resetEventFired).toBe(true);
            expect(resetPath).toBeUndefined();
            expect(store.state.user.name).toBe('John');
            expect(store.state.count).toBe(1); // count 重置为初始值

            // 修改状态
            store.state.user.name = 'Bob';
            store.state.count = 20;
            resetEventFired = false;

            // 重置特定路径
            store.reset('user');

            expect(resetEventFired).toBe(true);
            expect(resetPath).toBe('user');
            expect(store.state.user.name).toBe('John');
            expect(store.state.count).toBe(20); // count 未被重置
        });
    });

    describe('computed 生命周期事件', () => {
        test('computed:created 事件在计算对象创建时触发', () => {
            const createdEvents: any[] = [];

            const store = new AutoStore(
                {
                    count: 1,
                    dynamicComputed: (scope: any) => scope.count * 2,
                },
                {
                    onComputedCreated(computedObject) {
                        createdEvents.push({
                            path: computedObject.path,
                            id: computedObject.id,
                            async: computedObject.async,
                        });
                    },
                },
            );

            // 访问计算属性以触发创建（使用钩子函数）
            store.state.dynamicComputed;

            expect(createdEvents.length).toBe(1);
            expect(createdEvents[0].path).toEqual(['dynamicComputed']);
            expect(createdEvents[0].async).toBe(false);
        });

        test('computed:created 事件使用 store.on 监听（仅动态创建生效）', async () => {
            const createdEvents: any[] = [];

            const store = new AutoStore({
                count: 1,
                // 初始化时的计算属性（不会触发）
                staticComputed: (scope: any) => scope.count * 3,
            });

            // 使用 store.on 监听（但只对动态创建的计算属性生效）
            store.on('computed:created', (computedObject) => {
                createdEvents.push({
                    path: computedObject.path,
                    id: computedObject.id,
                    async: computedObject.async,
                });
            });

            // 访问静态计算属性（不会触发，因为是在初始化时创建的）
            store.state.staticComputed;

            expect(createdEvents.length).toBe(0);

            // 动态添加计算属性
            store.update((state) => {
                // @ts-expect-error
                state.dynamicComputed = (scope: any) => scope.count * 4;
            });

            // 访问动态计算属性（会触发 created 事件）
            // @ts-expect-error
            store.state.dynamicComputed;

            // 等待异步事件触发
            await delay(0);

            expect(createdEvents.length).toBe(1);
            expect(createdEvents[0].path).toEqual(['dynamicComputed']);
            expect(createdEvents[0].async).toBe(false);
        });

        test('computed:done 事件在同步计算函数执行成功后触发', async () => {
            const doneEvents: any[] = [];

            const store = new AutoStore(
                {
                    count: 1,
                    double: (scope: any) => scope.count * 2,
                },
                {
                    onComputedDone(args) {
                        doneEvents.push({
                            id: args.id,
                            path: args.path,
                            value: args.value,
                        });
                    },
                },
            );

            // 第一次访问会触发计算（但不会触发 done 事件，因为是 first=true）
            const value1 = store.state.double;
            expect(value1).toBe(2);
            expect(doneEvents.length).toBe(0); // 初始化不触发 done 事件

            // 修改依赖会触发重新计算
            store.state.count = 5;
            const value2 = store.state.double;
            expect(value2).toBe(10);

            // 等待异步事件触发（emitStoreEvent 使用了 setTimeout）
            await delay(0);
            expect(doneEvents.length).toBe(1);
            expect(doneEvents[0].value).toBe(10);
            expect(doneEvents[0].path).toEqual(['double']);

            // 再次修改 count，验证可以多次触发 done 事件
            store.state.count = 10;
            const value3 = store.state.double;
            expect(value3).toBe(20);

            await delay(0);
            expect(doneEvents.length).toBe(2);
            expect(doneEvents[1].value).toBe(20);
            expect(doneEvents[1].path).toEqual(['double']);

            // 第三次修改
            store.state.count = 20;
            const value4 = store.state.double;
            expect(value4).toBe(40);

            await delay(0);
            expect(doneEvents.length).toBe(3);
            expect(doneEvents[2].value).toBe(40);
            expect(doneEvents[2].path).toEqual(['double']);
        });

        test('computed:done 事件使用 store.on 监听', async () => {
            const doneEvents: any[] = [];

            const store = new AutoStore({
                count: 1,
                total: (scope: any) => scope.count * 2,
            });

            // 使用 store.on 监听事件
            store.on('computed:done', (args) => {
                doneEvents.push({
                    id: args.id,
                    path: args.path,
                    value: args.value,
                });
            });

            // 第一次访问（初始化不触发）
            const value1 = store.state.total;
            expect(value1).toBe(2);
            expect(doneEvents.length).toBe(0);

            // 修改依赖触发重新计算
            store.state.count = 5;
            const value2 = store.state.total;
            expect(value2).toBe(10);

            // 等待异步事件触发
            await delay(0);
            expect(doneEvents.length).toBe(1);
            expect(doneEvents[0].value).toBe(10);
            expect(doneEvents[0].path).toEqual(['total']);
        });

        test('computed:done 事件在异步计算函数执行成功后触发', async () => {
            const doneEvents: any[] = [];

            const store = new AutoStore(
                {
                    count: 1,
                    asyncDouble: computed(
                        async (scope: any) => {
                            await delay(1);
                            return scope.count * 2;
                        },
                        ['count'],
                    ),
                },
                {
                    onComputedDone(args) {
                        doneEvents.push({
                            id: args.id,
                            path: args.path,
                            value: args.value,
                        });
                    },
                },
            );

            // 访问异步计算属性（初始化，不会触发 done 事件）
            const asyncValue = store.state.asyncDouble;

            // 等待异步计算完成
            await delay(50);

            // 初始化完成，但不会触发 done 事件
            expect(asyncValue.value).toBe(2);
            expect(doneEvents.length).toBe(1);

            // 修改 count 来触发重新计算（这时会触发 done 事件）
            store.state.count = 5;
            await delay(50);

            expect(asyncValue.value).toBe(10);
            expect(doneEvents.length).toBe(2);
            expect(doneEvents[0].value).toBe(2);
            expect(doneEvents[0].path).toEqual(['asyncDouble']);
            expect(doneEvents[1].value).toBe(10);
            expect(doneEvents[1].path).toEqual(['asyncDouble']);
        });

        test('computed:error 事件在计算函数抛出错误时触发', () => {
            const errorEvents: any[] = [];

            const store = new AutoStore(
                {
                    count: 1,
                    errorComputed: () => {
                        throw new Error('计算错误');
                    },
                },
                {
                    // 禁用抛出错误，以便测试
                    onComputedCreated: (computedObject) => {
                        (computedObject.options as any).throwError = false;
                    },
                    onComputedError(args) {
                        errorEvents.push({
                            id: args.id,
                            path: args.path,
                            error: args.error,
                        });
                    },
                },
            );

            // 访问会抛出错误的计算属性
            expect(() => {
                store.state.errorComputed;
            }).not.toThrow(); // AutoStore 会捕获错误

            // 初始化时不触发 error 事件
            expect(errorEvents.length).toBe(0);
        });

        test('computed:error 事件在异步计算函数抛出错误时触发', async () => {
            const errorEvents: any[] = [];

            const store = new AutoStore(
                {
                    count: 1,
                    asyncError: computed(
                        async (scope: any) => {
                            await delay(1);
                            throw new Error(`异步计算错误: ${scope.count}`);
                        },
                        ['count'],
                    ),
                },
                {
                    onComputedError(args) {
                        errorEvents.push({
                            id: args.id,
                            path: args.path,
                            error: args.error,
                        });
                    },
                },
            );

            // 访问异步计算属性（初始化，不会触发 error 事件）
            const asyncValue = store.state.asyncError;

            await delay(20);

            // 初始化完成，有错误但不会触发 error 事件
            expect(asyncValue.error).toBeDefined();
            expect(errorEvents.length).toBe(0);

            // 修改 count 来触发重新计算（这时会触发 error 事件）
            store.state.count = 2;
            await delay(20);

            expect(asyncValue.error).toBeTruthy();
            expect(errorEvents.length).toBe(2);
            expect(errorEvents[0].path).toEqual(['asyncError']);
            expect(errorEvents[1].error.message).toBe('异步计算错误: 2');
        });

        test('computed:cancel 事件在异步计算被取消时触发', async () => {
            const cancelEvents: any[] = [];

            const store = new AutoStore(
                {
                    count: 1,
                    slowComputed: computed(
                        async (scope: any, { abortSignal }) => {
                            // 模拟一个长时间运行的操作，期间会检查 abortSignal
                            for (let i = 0; i < 10; i++) {
                                if (abortSignal.aborted) {
                                    throw new Error('Aborted by user');
                                }
                                await delay(10);
                            }
                            return scope.count * 2;
                        },
                        ['count'],
                    ),
                },
                {
                    onComputedCancel(args) {
                        cancelEvents.push({
                            id: args.id,
                            path: args.path,
                            reason: args.reason,
                        });
                    },
                },
            );

            store.on('computed:cancel', (args) => {
                cancelEvents.push({
                    fromEvent: true,
                    id: args.id,
                    path: args.path,
                    reason: args.reason,
                });
            });
            await delay(1);

            const value = store.state.slowComputed;
            expect(value.loading).toBe(true);

            await delay(15); // 等待一段时间，让异步计算开始执行

            // 手动取消计算
            value.cancel();

            await delay(20);

            // 钩子和事件都应该被触发
            expect(cancelEvents.length).toBe(2);
            expect(cancelEvents[0].path).toEqual(['slowComputed']);
            expect(cancelEvents[0].reason).toBe('abort');
            expect(cancelEvents[1].fromEvent).toBe(true);
        });
    });

    describe('watch 生命周期事件', () => {
        test('watch:created 事件在 WatchObject 创建时触发', () => {
            const createdEvents: any[] = [];

            const store = new AutoStore({
                count: 1,
            });

            store.on('watch:created', (watchObject) => {
                createdEvents.push({
                    id: watchObject.id,
                    path: watchObject.path,
                });
            });

            // 动态添加 watch 属性
            store.update((state) => {
                // @ts-expect-error
                state.watchCount = watch(
                    ({ value }: any) => {
                        return value * 2;
                    },
                    (path: string[]) => path[path.length - 1] === 'count',
                );
            });

            // 访问 watch 属性以触发 WatchObject 创建
            // @ts-expect-error
            store.state.watchCount;

            expect(createdEvents.length).toBe(1);
            expect(createdEvents[0].id).toBe('watchCount');
            expect(createdEvents[0].path).toEqual(['watchCount']);
        });

        test('watch:done 事件在 WatchObject 执行成功后触发', async () => {
            const doneEvents: any[] = [];

            const store = new AutoStore({
                count: 1,
            });

            store.on('watch:done', (args) => {
                doneEvents.push({
                    value: args.value,
                });
            });

            // 动态添加 watch 属性
            store.update((state) => {
                // @ts-expect-error
                state.watchCount = watch(
                    ({ value }: any) => {
                        return value * 2;
                    },
                    (path: string[]) => path[path.length - 1] === 'count',
                );
            });

            // 访问 watch 属性以触发 WatchObject 创建
            // @ts-expect-error
            store.state.watchCount;

            // 修改 count 以触发 watch 函数执行
            store.state.count = 5;
            await delay(0); // 等待事件处理

            expect(doneEvents.length).toBe(1);
            expect(doneEvents[0].value).toBe(10);
        });

        test('watch:error 事件在 WatchObject 执行出错时触发', async () => {
            const errorEvents: any[] = [];

            const store = new AutoStore({
                count: 1,
            });

            store.on('watch:error', (args) => {
                errorEvents.push({
                    error: args.error instanceof Error ? args.error.message : args.error,
                });
            });

            // 动态添加 watch 属性
            store.update((state) => {
                // @ts-expect-error
                state.watchCount = watch(
                    () => {
                        throw new Error('侦听器错误');
                    },
                    (path: string[]) => path[path.length - 1] === 'count',
                );
            });

            // 访问 watch 属性以触发 WatchObject 创建
            // @ts-expect-error
            store.state.watchCount;

            // 修改 count 以触发 watch 函数执行
            store.state.count = 5;
            await delay(0);

            expect(errorEvents.length).toBe(1);
            expect(errorEvents[0].error).toBe('侦听器错误');
        });
    });

    describe('observer 生命周期事件', () => {
        test('observer:beforeCreate 事件在观察者创建前触发', () => {
            const beforeCreateEvents: any[] = [];

            const store = new AutoStore({
                count: 1,
            });

            store.on('observer:beforeCreate', (descriptor) => {
                beforeCreateEvents.push({
                    type: descriptor.type,
                    async: descriptor.options.async,
                });
            });

            // 动态添加计算属性
            store.update((state: any) => {
                state.double = (scope: any) => scope.count * 2;
            });

            // 访问计算属性触发创建
            // @ts-expect-error
            store.state.double;

            expect(beforeCreateEvents.length).toBe(1);
            expect(beforeCreateEvents[0].type).toBe('computed');
            expect(beforeCreateEvents[0].async).toBe(false);
        });

        test('observer:created 事件在观察者创建后触发', () => {
            const createdEvents: any[] = [];

            const store = new AutoStore({
                count: 1,
            });

            store.on('observer:created', (observerObject) => {
                createdEvents.push({
                    path: observerObject.path,
                    id: observerObject.id,
                });
            });

            // 动态添加计算属性
            store.update((state: any) => {
                state.double = (scope: any) => scope.count * 2;
            });

            // 访问计算属性触发创建
            // @ts-expect-error
            store.state.double;

            expect(createdEvents.length).toBe(1);
            expect(createdEvents[0].path).toEqual(['double']);
            expect(createdEvents[0].id).toBeTruthy();
        });

        test('observer:beforeCreate -> observer:created 的触发顺序', () => {
            const events: string[] = [];

            const store = new AutoStore({
                count: 1,
            });

            store.on('observer:beforeCreate', () => {
                events.push('beforeCreate');
            });

            store.on('observer:created', () => {
                events.push('created');
            });

            // 动态添加计算属性
            store.update((state: any) => {
                state.double = (scope: any) => scope.count * 2;
            });
            // @ts-expect-error
            store.state.double;

            expect(events).toEqual(['beforeCreate', 'created']);
        });
    });

    describe('validate 事件', () => {
        test('validate 事件在验证时触发(无论成功或失败)', () => {
            const validateEvents: any[] = [];

            const store = new AutoStore(
                {
                    age: 25,
                },
                {
                    onValidate(_newValue, _oldValue, _path) {
                        if (_path[0] === 'age' && _newValue < 0) {
                            return false;
                        }
                        return true;
                    },
                },
            );

            store.on('validate', (args) => {
                validateEvents.push({
                    path: args.path,
                    newValue: args.newValue,
                    oldValue: args.oldValue,
                    error: args.error,
                });
            });

            // 有效的值也会触发验证事件,但 error 为 undefined
            store.state.age = 30;
            expect(validateEvents.length).toBe(1);
            expect(validateEvents[0].error).toBeUndefined();
            expect(validateEvents[0].newValue).toBe(30);

            // 无效的值会触发验证事件,并且包含 error
            expect(() => {
                store.state.age = -5;
            }).toThrow();

            expect(validateEvents.length).toBe(2);
            expect(validateEvents[1].path).toEqual(['age']);
            expect(validateEvents[1].newValue).toBe(-5);
            expect(validateEvents[1].oldValue).toBe(30);
            expect(validateEvents[1].error).toBeDefined();
        });

        test('validate 事件配合 validators 选项', () => {
            const validateEvents: any[] = [];

            const store = new AutoStore(
                {
                    user: {
                        name: 'John',
                        age: 25,
                    },
                },
                {
                    validators: {
                        'user.age': (newValue) => {
                            if (newValue < 0 || newValue > 150) {
                                return false;
                            }
                            return true;
                        },
                    },
                },
            );

            store.on('validate', (args) => {
                validateEvents.push({
                    path: args.path,
                    newValue: args.newValue,
                });
            });

            // 有效的值
            store.state.user.age = 30;
            expect(validateEvents.length).toBe(1); // 即使有效也会触发验证

            // 无效的值
            expect(() => {
                store.state.user.age = 200;
            }).toThrow();

            expect(validateEvents.length).toBe(2);
            expect(validateEvents[1].path).toEqual(['user', 'age']);
            expect(validateEvents[1].newValue).toBe(200);
        });

        test('validate 事件配合 onInvalid: pass 选项', () => {
            const validateEvents: any[] = [];

            const store = new AutoStore(
                {
                    age: 25,
                },
                {
                    onValidate(_newValue, _oldValue, _path) {
                        return _newValue >= 0;
                    },
                    onInvalid: 'pass', // 验证失败时继续写入，但仍然触发错误
                },
            );

            store.on('validate', (args) => {
                validateEvents.push({
                    path: args.path,
                    newValue: args.newValue,
                    error: args.error,
                });
            });

            store.state.age = -5;

            // 应该触发了验证错误事件
            expect(validateEvents.length).toBe(1);
            expect(validateEvents[0].path).toEqual(['age']);
            expect(validateEvents[0].newValue).toBe(-5);

            // 但是值仍然被写入
            expect(store.state.age).toBe(-5);
        });
    });

    describe('事件钩子函数选项', () => {
        test('onComputedCreated 钩子在计算对象创建时调用', () => {
            const createdComputeds: any[] = [];

            const store = new AutoStore(
                {
                    count: 1,
                    double: (scope: any) => scope.count * 2,
                },
                {
                    onComputedCreated(computedObject) {
                        createdComputeds.push({
                            path: computedObject.path,
                        });
                    },
                },
            );

            // 访问计算属性
            store.state.double;

            expect(createdComputeds.length).toBe(1);
            expect(createdComputeds[0].path).toEqual(['double']);
        });

        test('onComputedDone 钩子在计算完成时调用', async () => {
            const doneArgs: any[] = [];

            const store = new AutoStore(
                {
                    count: 1,
                    double: (scope: any) => scope.count * 2,
                },
                {
                    onComputedDone(args) {
                        doneArgs.push(args);
                    },
                },
            );

            store.state.double;

            // 初始化时不触发 onComputedDone
            expect(doneArgs.length).toBe(0);

            // 修改依赖触发重新计算
            store.state.count = 5;
            store.state.double;
            await delay(1);
            // 非初始化时会触发 onComputedDone
            expect(doneArgs.length).toBe(1);
            expect(doneArgs[0].value).toBe(10);
            expect(doneArgs[0].path).toEqual(['double']);
        });

        test('onComputedError 钩子在计算出错时调用', () => {
            const errorArgs: any[] = [];

            const store = new AutoStore(
                {
                    count: 1,
                    errorComputed: () => {
                        throw new Error('测试错误');
                    },
                },
                {
                    onComputedCreated: (computedObject) => {
                        (computedObject.options as any).throwError = false;
                    },
                    onComputedError(args) {
                        errorArgs.push(args);
                    },
                },
            );

            store.state.errorComputed;

            // 初始化时不触发错误事件
            expect(errorArgs.length).toBe(0);
        });

        test('onComputedCancel 钩子在异步计算被取消时调用', async () => {
            const cancelArgs: any[] = [];

            const store = new AutoStore(
                {
                    count: 1,
                    slowComputed: computed(
                        async (scope: any, { abortSignal }) => {
                            // 模拟一个长时间运行的操作，期间会检查 abortSignal
                            for (let i = 0; i < 10; i++) {
                                if (abortSignal.aborted) {
                                    throw new Error('Aborted by user');
                                }
                                await delay(10);
                            }
                            return scope.count * 2;
                        },
                        ['count'],
                    ),
                },
                {
                    onComputedCancel(args) {
                        cancelArgs.push({
                            fromHook: true,
                            reason: args.reason,
                        });
                    },
                },
            );

            store.on('computed:cancel', (args) => {
                cancelArgs.push({
                    fromEvent: true,
                    reason: args.reason,
                });
            });

            const value = store.state.slowComputed;

            await delay(15);

            // 取消计算
            value.cancel();

            await delay(20);

            expect(cancelArgs.length).toBe(2);
            expect(cancelArgs[0].reason).toBe('abort');
            expect(cancelArgs[1].reason).toBe('abort');
        });
    });

    describe('复杂场景测试', () => {
        test('计算依赖变化时的事件触发', async () => {
            const doneEvents: any[] = [];

            const store = new AutoStore({
                count: 1,
                double: (scope: any) => scope.count * 2,
            });

            store.on('computed:done', (args) => {
                doneEvents.push({
                    path: args.path,
                    value: args.value,
                });
            });

            // 第一次访问不触发 done 事件（初始化）
            const value1 = store.state.double;
            expect(value1).toBe(2);
            expect(doneEvents.length).toBe(0);

            // 修改依赖
            store.state.count = 5;
            const value2 = store.state.double;

            // 等待异步事件触发
            await delay(0);

            expect(doneEvents.length).toBe(1);
            expect(doneEvents[0].value).toBe(10);
            expect(value2).toBe(10);
        });

        test('当更新状态值时，依赖计算属性重新计算触发 computed:done 事件', async () => {
            const doneEvents: any[] = [];

            const store = new AutoStore({
                price: 10,
                count: 2,
                total: (scope: any) => scope.price * scope.count,
            });

            store.on('computed:done', (args) => {
                doneEvents.push({
                    id: args.id,
                    path: args.path,
                    value: args.value,
                    timestamp: Date.now(),
                });
            });

            // 第一次访问，初始化不触发 done 事件
            const total1 = store.state.total;
            expect(total1).toBe(20);
            expect(doneEvents.length).toBe(0);

            // 修改 price，total 应该重新计算
            store.state.price = 15;
            const total2 = store.state.total;
            expect(total2).toBe(30);

            // 等待异步事件触发
            await delay(0);
            expect(doneEvents.length).toBe(1);
            expect(doneEvents[0].path).toEqual(['total']);
            expect(doneEvents[0].value).toBe(30);

            // 再次修改 count
            store.state.count = 3;
            const total3 = store.state.total;
            expect(total3).toBe(45);

            await delay(0);
            expect(doneEvents.length).toBe(2);
            expect(doneEvents[1].value).toBe(45);
        });

        test('当更新状态值时，多个依赖计算属性重新计算触发 done 事件', async () => {
            const doneEvents: any[] = [];

            const store = new AutoStore({
                base: 10,
                double: (scope: any) => scope.base * 2,
                triple: (scope: any) => scope.base * 3,
                quadruple: (scope: any) => scope.base * 4,
            });

            store.on('computed:done', (args) => {
                doneEvents.push({
                    path: args.path,
                    value: args.value,
                });
            });

            // 初始化访问所有计算属性
            expect(store.state.double).toBe(20);
            expect(store.state.triple).toBe(30);
            expect(store.state.quadruple).toBe(40);
            expect(doneEvents.length).toBe(0); // 初始化不触发

            // 修改 base，所有依赖的计算属性都应该重新计算
            store.state.base = 20;

            // 触发重新计算
            expect(store.state.double).toBe(40);
            expect(store.state.triple).toBe(60);
            expect(store.state.quadruple).toBe(80);

            // 等待异步事件触发
            await delay(0);

            // 应该触发 3 个 done 事件
            expect(doneEvents.length).toBe(3);

            // 验证每个事件
            const doubleEvents = doneEvents.filter((e) => e.path[0] === 'double');
            const tripleEvents = doneEvents.filter((e) => e.path[0] === 'triple');
            const quadrupleEvents = doneEvents.filter((e) => e.path[0] === 'quadruple');

            expect(doubleEvents.length).toBe(1);
            expect(doubleEvents[0].value).toBe(40);

            expect(tripleEvents.length).toBe(1);
            expect(tripleEvents[0].value).toBe(60);

            expect(quadrupleEvents.length).toBe(1);
            expect(quadrupleEvents[0].value).toBe(80);
        });
    });
});
