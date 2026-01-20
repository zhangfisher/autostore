import {
    describe,
    test,
    it,
    expect,
    mock,
    beforeAll,
    afterAll,
    beforeEach,
    afterEach,
} from 'bun:test';
/**
 *
 * 测试计算属性的getter的第二个参数的各项功能
 *
 * - 不可重入
 * - 中止信号
 * - 重试
 *
 *
 */

import { AutoStore, computed } from '../..';
import { delay } from 'flex-tools/async/delay';
import type { AsyncComputedObject } from '../../src/computed/async';

describe('异步计算高级控制功能', () => {
    // beforeEach(() => {
    //     console.log("Fake timers not implemented in Bun yet")
    //   })
    //   afterEach(() => {
    //     console.log("Restore mocks not implemented in Bun yet")
    //   })
    // 注意：重入时仅会被忽略而不是产生错误
    test('控制计算函数的执行的不允许重入执行', () => {
        let cancelCount: number = 0;
        let calcCount: number = 0;
        return new Promise<void>((resolve) => {
            const store = new AutoStore(
                {
                    price: 2,
                    count: 3,
                    total: computed(
                        async (scope) => {
                            calcCount++;
                            await delay(1000);
                            return scope.price * scope.count;
                        },
                        ['price', 'count'],
                        {
                            reentry: false,
                        },
                    ),
                },
                {
                    onComputedCancel: () => {
                        cancelCount++;
                        if (cancelCount === 9) {
                            expect(calcCount).toBe(1);
                            resolve();
                        }
                    },
                    onComputedCreated: () => {
                        // 连接执行多次依赖更新,但是由于reentry=false,所以只会执行一次，其它的会被忽略
                        setTimeout(() => {
                            for (let i = 0; i < 10; i++) {
                                store.state.count += i;
                            }
                        });
                    },
                },
            );
            store.state.total;
        });
    }, 100000);

    test('通过abortSignal来中止计算函数的执行', () => {
        return new Promise<void>((resolve) => {
            const fn = mock();
            const store = new AutoStore(
                {
                    price: 2,
                    count: 3,
                    total: computed(
                        async (scope, { abortSignal }) => {
                            return new Promise<number>((resolve) => {
                                // 当接收到中止信号时，必须主动reject或者resolve，否则会被视为正常执行
                                abortSignal.addEventListener('abort', () => {
                                    fn();
                                    resolve(0); // 重点: 当接收到中止信号 ，需要退出本应用
                                });
                                // 模拟一个耗时的异步操作
                                setTimeout(() => {
                                    resolve(scope.count * scope.price);
                                }, 100 * 1000);
                            });
                        },
                        ['price', 'count'],
                        { id: 'x' },
                    ),
                },
                {
                    onComputedCancel: () => {
                        expect(fn).toHaveBeenCalled();
                        resolve();
                    },
                    onComputedCreated: () => {
                        setTimeout(() => {
                            (store.computedObjects.get('x') as AsyncComputedObject)!.value.cancel();
                        }, 10);
                    },
                },
            );
            store.state.total;
        });
    });

    test('当执行计算函数出错时,自动重试5次', () => {
        let count = 0;
        return new Promise<void>((resolve) => {
            const store = new AutoStore({
                price: 2,
                count: 3,
                total: computed(
                    async (scope) => {
                        count++;
                        if (count === 6) {
                            // 第一次执行失败，然后重试5次，共执行6次
                            resolve();
                        } else {
                            throw new Error('error');
                        }
                        return scope.price * scope.count;
                    },
                    ['price', 'count'],
                    { id: 'x', retry: 5 },
                ),
            });
            store.state.total;
        });
    });
    test('当执行计算函数出错时自动重试5次并且指定重试间隔', () => {
        let count = 0;
        let times: number[] = [];
        return new Promise<void>((resolve) => {
            const store = new AutoStore({
                price: 2,
                count: 3,
                total: computed(
                    async (scope) => {
                        times.push(Date.now());
                        count++;
                        if (count === 6) {
                            times.forEach((time, index) => {
                                if (index > 0) {
                                    expect(time - times[index - 1]).toBeGreaterThanOrEqual(100);
                                }
                            });
                            resolve();
                        } else {
                            throw new Error('error');
                        }
                        return scope.price * scope.count;
                    },
                    ['price', 'count'],
                    { id: 'x', retry: [5, 100] },
                ),
            });
            store.state.total;
        });
    });
    test('当执行计算函数重试5次过程中读取retry值', () => {
        let count = 0;
        let retryValues: (number | undefined)[] = [];
        return new Promise<void>((resolve) => {
            const store = new AutoStore(
                {
                    price: 2,
                    count: 3,
                    total: computed(
                        async () => {
                            count++;
                            throw new Error('error');
                        },
                        ['price', 'count'],
                        { id: 'x', retry: [5, 100] },
                    ),
                },
                {
                    onComputedError: () => {
                        expect(store.state.total.retry).toBe(0);
                        resolve();
                    },
                },
            );
            store.watch(['total.retry'], () => {
                retryValues.push(store.state.total.retry);
                // 第一次运行出错，再重试5次，因此retry值为5,4,3,2,1,0
                if (retryValues.length === 7) {
                    expect(retryValues).toEqual([0, 5, 4, 3, 2, 1, 0]);
                    expect(count).toEqual(6);
                }
            });
        });
    });
});

describe('异步计算属性的超时功能', () => {
    // beforeEach(() => {
    //     console.log("Fake timers not implemented in Bun yet")
    //   })
    // afterEach(() => {
    //     console.log("Restore mocks not implemented in Bun yet")
    // })
    test('当执行超时的默认行为', () => {
        // 执行时loading=true,然后超时后自动设置loading=false,error=TIMEOUT
        return new Promise<void>((resolve) => {
            const store = new AutoStore(
                {
                    price: 2,
                    count: 3,
                    total: computed(
                        async (scope) => {
                            await delay(500);
                            return scope.price * scope.count;
                        },
                        ['price', 'count'],
                        { id: 'x', timeout: 100 },
                    ),
                },
                {
                    onComputedError: ({ error }) => {
                        //@ts-expect-error
                        expect(error).toBe('TIMEOUT');
                        expect(store.state.total.loading).toBe(false);
                        expect(store.state.total.error).toBe('TIMEOUT');
                        resolve();
                    },
                },
            );
            store.state.total;
        });
    });
    test('当执行超时并启用倒计时', () => {
        console.log('Fake timers not implemented in Bun yet');
        // 执行时loading=true,然后超时后自动设置loading=false,error=TIMEOUT
        // 本例中配置timeout=[5*1000,5]，代表timeout值会从5递减到0
        const timeouts: any[] = [];
        return new Promise<void>((resolve) => {
            const store = new AutoStore(
                {
                    price: 2,
                    count: 3,
                    total: computed(
                        async (scope) => {
                            await delay(10000);
                            return scope.price * scope.count;
                        },
                        ['price', 'count'],
                        { id: 'x', timeout: [5 * 1000, 5] },
                    ),
                },
                {
                    lazy: false,
                    onComputedError: ({ error }) => {
                        //@ts-expect-error
                        expect(error).toBe('TIMEOUT');
                        expect(store.state.total.loading).toBe(false);
                        expect(store.state.total.timeout).toBe(0);
                        expect(store.state.total.error).toBe('TIMEOUT');
                        resolve();
                    },
                },
            );
            // timeouts
            store.watch(['total.timeout'], ({ path }) => {
                if (path.some((p) => p[0] === 'total' && p[1] === 'timeout')) {
                    timeouts.push(store.state.total.timeout);
                    // console.log("countdown=",timeouts)
                }
                if (store.state.total.timeout === 0) {
                    // 为什么不是[5,4,3,2,1,0]??
                    // 当创建store时指定onceComputed=true时，会马上创建ComputedObject
                    // 此时会执行一次将timeout赋值为5,这时候watch还没有开始，所以不会记录到timeouts中
                    expect(timeouts).toEqual([4, 3, 2, 1, 0]);
                    expect(store.state.total.loading).toBe(false);
                    expect(store.state.total.error).toBe('TIMEOUT');
                    resolve();
                    console.log('Restore mocks not implemented in Bun yet');
                }
                resolve();
            });
            console.log('Run all timers not implemented in Bun yet');
        });
    }, 500000);
});

describe('异步计算进度条功能', () => {
    test('通过getProgressbar更新进度值', () => {
        const progresses: number[] = [];
        return new Promise<void>((resolve) => {
            const store = new AutoStore(
                {
                    data: computed(
                        async (_scope, { getProgressbar }) => {
                            const pbar = getProgressbar!({ max: 100, min: 0, value: 0 });
                            for (let i = 0; i <= 100; i += 10) {
                                pbar.value(i);
                                await delay(50);
                            }
                            return 'done';
                        },
                        [],
                        { id: 'data' },
                    ),
                },
                {
                    onComputedDone: () => {
                        // 验证进度值从0到100递增
                        expect(progresses.length).toBeGreaterThan(0);
                        expect(progresses[0]).toBe(0);
                        expect(progresses[progresses.length - 1]).toBe(100);
                        resolve();
                    },
                },
            );

            // 监听进度值的变化 - 使用字符串路径而不是数组
            store.watch('data.*', () => {
                progresses.push(store.state.data.progress);
            });

            // 触发计算
            void store.state.data;
        });
    });

    test('进度条值被限制在min和max范围内', () => {
        return new Promise<void>((resolve) => {
            const store = new AutoStore(
                {
                    data: computed(
                        async (_scope, { getProgressbar }) => {
                            const pbar = getProgressbar!({ max: 50, min: 10 });
                            // 测试超出范围的值
                            pbar.value(0); // 应该被限制为10
                            await delay(10);
                            expect(store.state.data.progress).toBe(10);
                            pbar.value(100); // 应该被限制为50
                            await delay(10);
                            expect(store.state.data.progress).toBe(50);
                            pbar.value(30); // 正常范围内的值
                            await delay(10);
                            expect(store.state.data.progress).toBe(30);
                            return 'done';
                        },
                        [],
                        { id: 'data' },
                    ),
                },
                {
                    onComputedDone: () => {
                        resolve();
                    },
                },
            );

            // 触发计算
            void store.state.data;
        });
    });

    test('使用progress.end()完成进度条', () => {
        const progresses: number[] = [];
        return new Promise<void>((resolve) => {
            const store = new AutoStore(
                {
                    data: computed(
                        async (_scope, { getProgressbar }) => {
                            const pbar = getProgressbar!({ max: 100, min: 0, value: 0 });
                            pbar.value(50);
                            await delay(50);
                            pbar.end(); // 应该将进度设置为max=100
                            await delay(50);
                            return 'done';
                        },
                        [],
                        { id: 'data' },
                    ),
                },
                {
                    onComputedDone: () => {
                        // 验证最后一个是100（max值）
                        expect(progresses[progresses.length - 1]).toBe(100);
                        resolve();
                    },
                },
            );

            // 监听进度值的变化
            store.watch('data.*', () => {
                progresses.push(store.state.data.progress);
            });

            // 触发计算
            void store.state.data;
        });
    });

    test('进度条初始值设置为指定值', () => {
        return new Promise<void>((resolve) => {
            const store = new AutoStore(
                {
                    data: computed(
                        async (_scope, { getProgressbar }) => {
                            const pbar = getProgressbar!({ max: 100, min: 0, value: 30 });
                            // 初始值应该是30
                            await delay(50);
                            return 'done';
                        },
                        [],
                        { id: 'data' },
                    ),
                },
                {
                    onComputedDone: () => {
                        // 验证初始值
                        expect(store.state.data.progress).toBe(30);
                        resolve();
                    },
                },
            );

            // 触发计算
            void store.state.data;
        });
    });

    test('默认进度条范围为0-100', () => {
        const progresses: number[] = [];
        return new Promise<void>((resolve) => {
            const store = new AutoStore(
                {
                    data: computed(
                        async (_scope, { getProgressbar }) => {
                            const pbar = getProgressbar!(); // 使用默认参数
                            pbar.value(50);
                            await delay(50);
                            pbar.end();
                            await delay(50);
                            return 'done';
                        },
                        [],
                        { id: 'data' },
                    ),
                },
                {
                    onComputedDone: () => {
                        // 验证默认范围是0-100
                        expect(progresses).toContain(0); // 初始值
                        expect(progresses).toContain(50);
                        expect(progresses).toContain(100); // end()设置为max
                        resolve();
                    },
                },
            );

            // 监听进度值的变化
            store.watch('data.*', () => {
                progresses.push(store.state.data.progress);
            });

            // 触发计算
            void store.state.data;
        });
    });

    test('在长时间计算中实时更新进度', () => {
        let lastProgress = -1;
        return new Promise<void>((resolve) => {
            const store = new AutoStore(
                {
                    task: computed(
                        async (_scope, { getProgressbar }) => {
                            const pbar = getProgressbar!({ max: 5, min: 0 });
                            for (let i = 1; i <= 5; i++) {
                                await delay(30);
                                pbar.value(i);
                            }
                            return 'completed';
                        },
                        [],
                        { id: 'task' },
                    ),
                },
                {
                    onComputedDone: () => {
                        // 验证最终状态
                        expect(store.state.task.progress).toBe(5);
                        expect(store.state.task.loading).toBe(false);
                        expect(store.state.task.value).toBe('completed');
                        resolve();
                    },
                },
            );

            // 监听进度值，验证进度递增
            store.watch(['task.progress'], () => {
                const current = store.state.task.progress;
                expect(current).toBeGreaterThanOrEqual(lastProgress);
                lastProgress = current;
            });

            // 触发计算
            store.state.task;
        });
    });

    test('进度值在计算错误时也会更新', () => {
        const progresses: number[] = [];
        return new Promise<void>((resolve) => {
            const store = new AutoStore(
                {
                    data: computed(
                        async (_scope, { getProgressbar }) => {
                            const pbar = getProgressbar!({ max: 100, min: 0 });
                            pbar.value(30);
                            await delay(50);
                            pbar.value(60);
                            await delay(50);
                            throw new Error('Calculation failed');
                        },
                        [],
                        { id: 'data' },
                    ),
                },
                {
                    onComputedError: () => {
                        // 验证进度值在错误前已更新
                        expect(progresses.length).toBeGreaterThan(0);
                        expect(progresses).toContain(30);
                        expect(progresses).toContain(60);
                        resolve();
                    },
                },
            );

            // 监听进度值的变化
            store.watch('data.*', () => {
                progresses.push(store.state.data.progress);
            });

            // 触发计算
            void store.state.data;
        });
    });

    test('多次执行计算时进度值重新开始', () => {
        const firstRunProgresses: number[] = [];
        const secondRunProgresses: number[] = [];
        let runCount = 0;

        return new Promise<void>((resolve) => {
            const store = new AutoStore(
                {
                    trigger: 0,
                    data: computed(
                        async (scope, { getProgressbar }) => {
                            const pbar = getProgressbar!({ max: 50, min: 0 });
                            for (let i = 0; i <= 50; i += 10) {
                                pbar.value(i);
                                await delay(50);
                            }
                            return `done-${scope.trigger}`;
                        },
                        ['trigger'],
                        { id: 'data' },
                    ),
                },
                {
                    onComputedDone: () => {
                        runCount++;
                        if (runCount === 1) {
                            // 第一次运行完成
                            expect(store.state.data.progress).toBe(50);
                            // 触发第二次运行
                            setTimeout(() => {
                                store.state.trigger = 1;
                            }, 100);
                        } else if (runCount === 2) {
                            // 第二次运行完成
                            expect(store.state.data.progress).toBe(50);
                            expect(firstRunProgresses.length).toBeGreaterThan(0);
                            expect(secondRunProgresses.length).toBeGreaterThan(0);
                            resolve();
                        }
                    },
                },
            );

            // 监听进度值的变化
            store.watch('data.*', () => {
                if (runCount === 0) {
                    firstRunProgresses.push(store.state.data.progress);
                } else {
                    secondRunProgresses.push(store.state.data.progress);
                }
            });

            // 触发第一次计算
            void store.state.data;
        });
    });
});
