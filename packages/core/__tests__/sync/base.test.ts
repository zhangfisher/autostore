import { describe, test, expect } from 'bun:test';
import { AutoStore, computed, type ComputedObject } from '../..';
import { CyleDependError } from '../../src/errors';

describe('同步计算属性的基本特性', () => {
    test('默认同步计算', async () => {
        const store = new AutoStore({
            price: 2,
            count: 3,
            total: computed((scope) => {
                return scope.price * scope.count;
            }),
        });
        store.state.count = 4;
        expect(store.state.total).toBe(8);
    });
    test('简单的同步计算,默认scope指向current', () => {
        const store = new AutoStore({
            user: {
                firstName: 'zhang',
                lastName: 'fisher',
                fullName: (scope: any) => `${scope.firstName} ${scope.lastName}`,
            },
        });
        expect(store.state.user.fullName).toBe('zhang fisher');
        store.state.user.firstName = 'li';
        expect(store.state.user.fullName).toBe('li fisher');
    });

    test('不使用computed函数的同步计算', async () => {
        const store = new AutoStore({
            price: 2,
            count: 3,
            total: (scope: any) => {
                return scope.price * scope.count;
            },
        });
        store.state.count = 4;
        expect(store.state.total).toBe(8);
    });
    test('默认this指向计算对象', () => {
        return new Promise<void>((resolve) => {
            const store = new AutoStore({
                order: {
                    price: 2,
                    count: 3,
                    total: computed(function (this: ComputedObject) {
                        expect(this.store.state.order.price).toBe(2);
                        expect(this.store.state.order.count).toBe(3);
                        resolve();
                    }),
                },
            });
            store.state.order.total; // 读取操作时创建计算属性
        });
    });
    test('通过计算对象实例读取同步计算值', async () => {
        const store = new AutoStore({
            price: 2,
            count: 3,
            total: computed<number>(
                (scope) => {
                    return scope.price * scope.count;
                },
                { id: 'a' },
            ),
        });
        store.state.count = 4;
        expect(store.state.total).toBe(8);
        // @ts-expect-error
        expect(store.computedObjects.get('a')!.value).toBe(8);
    });

    test('手动执行同步计算属性的计算函数', () => {
        return new Promise<void>((resolve) => {
            const results: any[] = [];
            const store = new AutoStore(
                {
                    price: 2,
                    count: 3,
                    total: computed(
                        (scope) => {
                            results.push(scope);
                            if (results.length === 2) {
                                resolve();
                            }
                            return scope.price * scope.count;
                        },
                        { id: 'x' },
                    ),
                },
                {
                    onComputedCreated: () => {
                        setTimeout(() => {
                            store.computedObjects.get('x')!.run();
                            expect(store.state.total).toBe(6);
                            resolve();
                        });
                    },
                },
            );
        });
    });
    test('手动传参覆盖默认的计算属性参数，然后运行', () => {
        return new Promise<void>((resolve) => {
            const results: any[] = [];
            // 同步计算在创建时会先执行一次用于自动收集依赖，此时的scope是默认指向的
            // 然后第二次是手动执行,此时的scope是通过run传入的。
            const store = new AutoStore(
                {
                    price: 2,
                    count: 3,
                    total: computed(
                        (scope) => {
                            results.push(scope);
                            if (results.length === 2) {
                                expect(results[1]).toBe(2);
                                resolve();
                            } else {
                                scope.price * scope.count;
                            }
                        },
                        { id: 'x' },
                    ),
                },
                {
                    onComputedCreated: () => {
                        setTimeout(() => {
                            store.computedObjects.get('x')!.run({ scope: 'price' });
                        });
                    },
                },
            );
        });
    });
    test('侦听同步计算属性的变更事件', async () => {
        const store = new AutoStore({
            user: {
                firstName: 'zhang',
                lastName: 'fisher',
                fullName: (scope: any) => `${scope.firstName} ${scope.lastName}`,
            },
        });
        const oldvalues: any[] = [];
        const values: any[] = [];
        return new Promise<void>((resolve) => {
            store.watch(
                'user.fullName',
                (event) => {
                    values.push(event.value);
                    oldvalues.push(event.oldValue);
                    expect(event.value).toBe('li fisher');
                    expect(event.oldValue).toBe('zhang fisher');
                    resolve();
                },
                { operates: ['set'] },
            );
            expect(store.state.user.fullName).toBe('zhang fisher');
            store.state.user.firstName = 'li';
            expect(store.state.user.fullName).toBe('li fisher');
        });
    });

    test('提供额外的同步计算属性依赖', async () => {
        let count: number = 0;
        const store = new AutoStore({
            user: {
                firstName: 'zhang',
                lastName: 'fisher',
                fullName: computed(
                    (scope: any) => `${scope.firstName} ${scope.lastName} ${count}`,
                    { depends: ['alias'] },
                ),
            },
            alias: 'x',
        });
        return new Promise<void>((resolve) => {
            store.watch(
                'user.fullName',
                (event) => {
                    expect(event.value).toBe('zhang fisher 1');
                    expect(store.state.user.fullName).toBe('zhang fisher 1');
                    resolve();
                },
                { operates: ['set'] },
            );
            expect(store.state.user.fullName).toBe('zhang fisher 0');
            count++;
            store.state.alias = 'y'; // trigger user.fullName recompute, beacuse it is
        });
    });
    test('计算属性依赖于另外一个计算属性', () => {
        const store = new AutoStore({
            user: {
                firstName: 'zhang',
                lastName: 'fisher',
                fullName1: computed((scope: any) => `${scope.firstName} ${scope.lastName}`),
                fullName2: computed((scope: any) => `${scope.fullName1}*`),
                fullName3: computed((scope: any) => `${scope.fullName2}*`),
                fullName4: computed((scope: any) => `${scope.fullName3}*`),
                fullName5: computed((scope: any) => `${scope.fullName4}*`),
            },
        });
        expect(store.state.user.fullName1).toBe('zhang fisher');
        expect(store.state.user.fullName2).toBe('zhang fisher*');
        expect(store.state.user.fullName3).toBe('zhang fisher**');
        expect(store.state.user.fullName4).toBe('zhang fisher***');
        expect(store.state.user.fullName5).toBe('zhang fisher****');
    });
});

describe('同步计算函数的启用和禁用', () => {
    test('启用和禁用同步计算函数', () => {
        const store = new AutoStore({
            user: {
                firstName: 'zhang',
                lastName: 'fisher',
                fullName: computed(
                    (scope: any) => {
                        return `${scope.firstName} ${scope.lastName}`;
                    },
                    {
                        id: 'x',
                        enable: false,
                    },
                ),
            },
        });
        expect(store.state.user.fullName).toBe('zhang fisher');
        store.state.user.firstName = 'li';
        expect(store.state.user.fullName).toBe('zhang fisher'); // no computed
        store.computedObjects.get('x')!.enable = true;
        store.state.user.firstName = 'Wang';
        expect(store.state.user.fullName).toBe('Wang fisher');
    });

    test('启用和禁用所有同步计算函数', () => {
        const count = 6;
        const store = new AutoStore(
            {
                user: {
                    firstName: 'zhang',
                    lastName: 'fisher',
                    fullName1: computed((scope: any) => `${scope.firstName} ${scope.lastName}`),
                    fullName2: computed((scope: any) => `${scope.firstName} ${scope.lastName}`),
                    fullName3: computed((scope: any) => `${scope.firstName} ${scope.lastName}`),
                    fullName4: computed((scope: any) => `${scope.firstName} ${scope.lastName}`),
                    fullName5: computed((scope: any) => `${scope.firstName} ${scope.lastName}`),
                    fullName6: computed((scope: any) => `${scope.firstName} ${scope.lastName}`),
                },
            },
            {
                enableComputed: false, // 禁用所有计算
            },
        );
        // 禁用计算属性时，第一次运行不受影响，因此可以正常收集依赖
        for (let i = 1; i <= count; i++) {
            expect((store.state.user as any)[`fullName${i}`]).toBe('zhang fisher');
        }
        // 变更依赖时，不会重新计算
        store.state.user.firstName = 'li';
        for (let i = 1; i <= count; i++) {
            expect((store.state.user as any)[`fullName${i}`]).toBe('zhang fisher');
        }
        // 启用计算属性，变更依赖时，会重新计算
        store.options.enableComputed = true;
        store.state.user.firstName = 'wang';
        for (let i = 1; i <= count; i++) {
            expect((store.state.user as any)[`fullName${i}`]).toBe('wang fisher');
        }
    });

    describe('同步计算函数中的循环依赖', () => {
        test('同步计算依赖了自己', async () => {
            try {
                const store = new AutoStore({
                    price: 2,
                    count: 3,
                    total: computed((scope) => {
                        return scope.price * scope.total;
                    }),
                });
                store.state.total;
            } catch (e: any) {
                expect(e).toBeInstanceOf(CyleDependError);
            }
        });
        test('循环依赖路径中依赖了自己', () => {
            //  ┌───────────────↴
            //  1<──2<──3<──4<──5
            try {
                const store = new AutoStore({
                    user: {
                        firstName: 'zhang',
                        lastName: 'fisher',
                        fullName1: computed((scope: any) => `${scope.fullName5}`),
                        fullName2: computed((scope: any) => `${scope.fullName1}*`),
                        fullName3: computed((scope: any) => `${scope.fullName2}*`),
                        fullName4: computed((scope: any) => `${scope.fullName3}*`),
                        fullName5: computed((scope: any) => `${scope.fullName4}*`),
                    },
                });
                store.state.user.fullName1;
            } catch (e: any) {
                expect(e).toBeInstanceOf(CyleDependError);
            }
        });

        test('所依赖的数据项存在循环依赖路径', () => {
            //      ↓───────────┐
            //  1──>2──>3──>4──>5
            try {
                const store = new AutoStore({
                    user: {
                        firstName: 'zhang',
                        lastName: 'fisher',
                        fullName1: computed((scope: any) => `${scope.fullName2}`),
                        fullName2: computed((scope: any) => `${scope.fullName3}*`),
                        fullName3: computed((scope: any) => `${scope.fullName4}*`),
                        fullName4: computed((scope: any) => `${scope.fullName5}*`),
                        fullName5: computed((scope: any) => `${scope.fullName2}*`),
                    },
                });
                store.state.user.fullName1;
            } catch (e: any) {
                expect(e).toBeInstanceOf(CyleDependError);
            }
        });
        test('数组中存在交叉循环依赖路径', () => {
            try {
                const store = new AutoStore({
                    user: {
                        firstName: 'zhang',
                        lastName: 'fisher',
                        orders: [
                            {
                                name: 'order1',
                                price: computed(
                                    (orders: any[]) => {
                                        return orders[1].price + 1;
                                    },
                                    { scope: 'PARENT' },
                                ),
                            },
                            {
                                name: 'order2',
                                price: computed(
                                    (orders: any[]) => {
                                        return orders[0].price + 1;
                                    },
                                    { scope: 'PARENT' },
                                ),
                            },
                            { name: 'order3' },
                            { name: 'order4' },
                            { name: 'order5' },
                        ],
                    },
                });
                store.state.user.orders[1].price;
            } catch (e: any) {
                expect(e).toBeInstanceOf(CyleDependError);
            }
        });
    });
});

describe('使用update方法对同步计算属性进行更新', () => {
    test('使用update方法更新同步计算属性', () => {
        return new Promise<void>((resolve) => {
            const store = new AutoStore({
                price: 2,
                count: 3,
                total: computed((scope) => {
                    return scope.price * scope.count;
                }),
            });
            store.watch(
                'count',
                (operate) => {
                    expect(operate.type).toBe('set');
                    expect(operate.value).toBe(4);
                    expect(operate.path).toEqual(['count']);
                    resolve();
                },
                { operates: 'write' },
            );
            store.update((state) => {
                state.count = 4;
            });
            expect(store.state.total).toBe(8);
        });
    });

    test('使用update方法静默更新同步计算属性', () => {
        return new Promise<void>((resolve, reject) => {
            // 静默更新指提不会触发事件,因此不会触发计算属性的重新计算,在进行初始化或特殊情况下可能需要
            const store = new AutoStore({
                price: 2,
                count: 3,
                total: computed((scope) => {
                    return scope.price * scope.count;
                }),
            });
            store.watch(
                'count',
                () => {
                    reject();
                },
                { operates: 'write' },
            );
            store.update(
                (state) => {
                    state.count = 4;
                },
                { silent: true },
            );
            // 由于静默更新count，导致不会触发count的set事件
            // 而total又依赖count的set事件来重新计算，所以total的值不会变成8
            expect(store.state.total).toBe(6);
            resolve();
        });
    });
    test('使用update方法批量更新同步计算属性', () => {
        return new Promise<void>((resolve) => {
            const store = new AutoStore({
                a: 1,
                b: 2,
                c: 3,
                d: 4,
                total: computed((scope) => {
                    return scope.a + scope.b + scope.c + scope.d;
                }),
            });
            const events: string[][] = [];
            store.watch(
                (operate) => {
                    if (operate.type === 'batch') {
                        events.push([
                            operate.type,
                            operate.path.join('.'),
                            operate.value.map((item: any) => item.path.join('.')),
                        ]);
                    } else {
                        events.push([operate.type, operate.path.join('.'), operate.value]);
                    }
                },
                { operates: 'write' },
            );
            store.update(
                (state) => {
                    state.a = 2;
                    state.b = 3;
                    state.c = 4;
                    state.d = 5;
                },
                { batch: true },
            );
            // 为什么只接收到一条["set","total",14], 而不是
            // ["set","a",2],["set","total",14],["set","b",3],["set","total",14],["set","c",4],["set","total",14],["set","d",5],["set","total",14]?
            // 因为在batch update方法里面，a,b,c,d的值已经被更新，但是没有触发事件，所以total的值也没有被重新计算
            // 在batch update后，会分别触发set a ,set b ,set c,set d事件
            // 当set a时，会触发total的重新计算，所以只会接收到一条["set","total",14]
            // 然后在set b/c/d时，由于total的值没有变化，所以就不会触发total的重新计算,所以不会接收到["set","total",14]
            // 重点：响应式系统当数据变更时会进行newValue和oldValue的对比，如果相同就不会触发事件
            //@ts-expect-error
            expect(events).toStrictEqual([
                ['set', 'a', 2],
                ['set', 'total', 14], // 为什么只接收到一条？
                ['set', 'b', 3],
                ['set', 'c', 4],
                ['set', 'd', 5],
                ['batch', '__batch_update__', ['a', 'b', 'c', 'd']],
            ]);
            resolve();
        });
    });
    test('使用update方法peep更新同步计算属性', () => {
        return new Promise<void>((resolve) => {
            // 静默更新指提不会触发事件,因此不会触发计算属性的重新计算,在进行初始化或特殊情况下可能需要
            const store = new AutoStore({
                price: 2,
                count: 3,
                total: computed((scope) => {
                    return scope.price * scope.count;
                }),
            });
            const events: any[] = [];
            store.watch(
                (operate) => {
                    events.push([operate.type, operate.path.join('.'), operate.value]);
                },
                { operates: '*' },
            );
            store.update(
                (state) => {
                    state.count = 4;
                },
                { peep: true },
            );
            expect(events).toStrictEqual([
                ['set', 'count', 4],
                ['set', 'total', 8],
            ]);

            // set count = 4 --> set total = 8
            //              |--> store.watch    优先级低

            resolve();
        });
    });
});
