/* eslint-disable @typescript-eslint/no-unused-vars */
import { describe, expect, test } from 'vitest';
import { computed, AutoStore, configurable, c, ValidateError } from '../../../core/src';
import '..';
import { isFunction } from '../../../core/src/utils/isFunction';

describe('本地Store同步', () => {
    test('一对一全同步', async () => {
        const store1 = new AutoStore({
            order: {
                name: 'fisher',
                price: 2,
                count: 3,
                total: computed((order) => order.price * order.count),
            },
        });
        const store2 = new AutoStore<typeof store1.state>();
        store1.sync(store2);
        expect(store2.state).toEqual(store1.state);
        store1.state.order.count = 4;
        expect(store2.state.order.count).toBe(4);
        expect(store2.state.order.total).toBe(8);
        store2.state.order.count = 5;
        expect(store1.state.order.count).toBe(5);
        expect(store1.state.order.total).toBe(10);
    });

    test('主动拉取一对一全同步', async () => {
        const fromStore = new AutoStore({
            order: {
                name: 'fisher',
                price: 2,
                count: 3,
                total: computed((order) => order.price * order.count),
            },
        });
        const toStore = new AutoStore<typeof fromStore.state>();
        const syncer = toStore.sync(fromStore, { immediate: false });
        expect(toStore.state).toEqual({});

        syncer.pull();

        expect(toStore.state).toEqual(fromStore.state);
        fromStore.state.order.count = 4;
        expect(toStore.state.order.count).toBe(4);
        expect(toStore.state.order.total).toBe(8);
        toStore.state.order.count = 5;
        expect(fromStore.state.order.count).toBe(5);
        expect(fromStore.state.order.total).toBe(10);
    });

    test('将本地指定路径同步到其他store的指定路径', async () => {
        const fromStore = new AutoStore({
            order: {
                name: 'fisher',
                price: 2,
                count: 3,
                total: computed((order) => order.price * order.count),
            },
        });
        const toStore = new AutoStore<typeof fromStore.state.order>();

        const syncer = toStore.sync(fromStore, { remote: ['order'], immediate: false });

        expect(toStore.state).toEqual({});
        syncer.pull();
        expect(toStore.state).toEqual(fromStore.state.order);
        fromStore.state.order.count = 4;
        expect(toStore.state.count).toBe(4);
        expect(toStore.state.total).toBe(8);
        toStore.state.count = 5;
        expect(fromStore.state.order.count).toBe(5);
        expect(fromStore.state.order.total).toBe(10);
    });

    test('将本地指定路径同步到其他myorder的指定路径', async () => {
        const fromStore = new AutoStore({
            order: {
                name: 'fisher',
                price: 2,
                count: 3,
                total: computed((order) => order.price * order.count),
            },
        });
        const toStore = new AutoStore({
            myorder: {},
        });

        const syncer = toStore.sync(fromStore, {
            mode: 'pull',
            local: ['myorder'],
            remote: ['order'],
        });

        expect(toStore.state.myorder).toEqual(fromStore.state.order);
        fromStore.state.order.count = 4;
        // @ts-ignore
        expect(toStore.state.myorder.count).toBe(4);
        // @ts-ignore
        expect(toStore.state.myorder.total).toBe(8);
        // @ts-ignore
        toStore.state.myorder.count = 5;
        expect(fromStore.state.order.count).toBe(5);
        expect(fromStore.state.order.total).toBe(10);
    });
    test('只同步变化部分同步', async () => {
        const fromStore = new AutoStore({
            order: {
                name: 'fisher',
                price: 2,
                count: 3,
                total: computed((order) => order.price * order.count),
            },
        });
        const toStore = new AutoStore();

        const syncer = toStore.sync(fromStore, {});

        expect(toStore.state).toEqual({});
        fromStore.state.order.count = 4;
        // @ts-ignore
        expect(toStore.state.order.count).toBe(4);
        // @ts-ignore
        expect(toStore.state.order.total).toBe(8);
        // @ts-ignore
        toStore.state.order.count = 5;
        expect(fromStore.state.order.count).toBe(5);
        expect(fromStore.state.order.total).toBe(10);
    });

    test('主动拉取将本地指定路径同步到其他store的指定路径', async () => {
        const store1 = new AutoStore({
            order: {
                name: 'fisher',
                price: 2,
                count: 3,
                total: computed((order) => order.price * order.count),
            },
        });
        const store2 = new AutoStore<typeof store1.state.order>();

        store1.sync(store2, { local: ['order'] });

        expect(store2.state).toEqual(store1.state.order);
        store1.state.order.count = 4;
        expect(store2.state.count).toBe(4);
        expect(store2.state.total).toBe(8);
        store2.state.count = 5;
        expect(store1.state.order.count).toBe(5);
        expect(store1.state.order.total).toBe(10);
    });
    test('同步指定路径的对象到其他store的指定路径', async () => {
        const store1 = new AutoStore({
            order: {
                name: 'fisher',
                price: 2,
                count: 3,
                total: computed((order) => order.price * order.count),
            },
        });
        const store2 = new AutoStore<{ myorder: typeof store1.state.order }>({
            // @ts-ignore
            myorder: {},
        });
        store1.sync(store2, { local: ['order'], remote: ['myorder'] });
        expect(store2.state.myorder).toEqual(store1.state.order);
        store1.state.order.count = 4;
        expect(store2.state.myorder.count).toBe(4);
        expect(store2.state.myorder.total).toBe(8);
        store2.state.myorder.count = 5;
        expect(store1.state.order.count).toBe(5);
        expect(store1.state.order.total).toBe(10);
    });
    test('同步指定路径的简单数值到其他store的指定路径', async () => {
        const store1 = new AutoStore({
            order: {
                name: 'fisher',
                price: 2,
                count: 3,
                total: computed((order) => order.price * order.count),
            },
        });
        const store2 = new AutoStore<{ myorder: typeof store1.state.order }>({
            // @ts-ignore
            myorder: {
                count: 1,
            },
        });
        store1.sync(store2, { local: ['order', 'count'], remote: ['myorder', 'count'] });
        expect(store2.state.myorder.count).toEqual(store1.state.order.count);
        store1.state.order.count = 4;
        expect(store2.state.myorder.count).toBe(4);
        store2.state.myorder.count = 5;
        expect(store1.state.order.count).toBe(5);
        expect(store1.state.order.total).toBe(10);
    });

    test('同步数组到其他store', async () => {
        const store1 = new AutoStore(
            {
                order: {
                    values: [1, 2, 3, 4, 5, 6, 7, 8, 9],
                },
            },
            { id: 'a' },
        );
        const store2 = new AutoStore<{ myorder: typeof store1.state.order }>(
            {
                // @ts-ignore
                myorder: {
                    values: [],
                },
            },
            { id: 'b' },
        );
        store1.sync(store2, { local: 'order.values', remote: 'myorder.values' });
        expect(store2.state.myorder.values).toEqual(store1.state.order.values);
        store1.state.order.values.push(0);
        expect(store2.state.myorder.values).toEqual(store1.state.order.values);
        store1.state.order.values.splice(1, 2);
        expect(store2.state.myorder.values).toEqual(store1.state.order.values);
        store2.state.myorder.values.splice(1, 3, 10, 11);
        expect(store1.state.order.values).toEqual(store1.state.order.values);
    });

    test('同步时仅指定to时能过滤其他无效的路径', async () => {
        const store1 = new AutoStore({
            x: { a: 1, b: 2, c: 3 },
            y: { a: 1, b: 2, c: 3 },
        });
        const store2 = new AutoStore({
            order: { a: 1, b: 2, c: 3 },
        });

        store1.sync(store2, { remote: 'x.y' });
        // @ts-ignore
        expect(store2.state.x.y).toEqual(store1.state);
    });

    test('多对一同步', async () => {
        const store = new AutoStore({
            x: { a1: 1, b1: 2, c1: 3 },
            y: { a2: 1, b2: 2, c2: 3 },
            z: { a3: 1, b3: 2, c3: 3 },
        });
        const store1 = new AutoStore({
            a1: 1,
            b1: 2,
            c1: 3,
        });
        store1.sync(store, { remote: 'x' });
        const store2 = new AutoStore({
            a2: 1,
            b2: 2,
            c2: 3,
        });
        store2.sync(store, { remote: 'y' });
        const store3 = new AutoStore({
            a3: 1,
            b3: 2,
            c3: 3,
        });
        store3.sync(store, { remote: 'z' });

        store1.state.a1 = 10;
        expect(store.state.x.a1).toBe(10);
        store.state.x.a1 = 11;
        expect(store1.state.a1).toBe(11);

        store2.state.a2 = 10;
        expect(store.state.y.a2).toBe(10);
        store.state.y.a2 = 11;
        expect(store2.state.a2).toBe(11);

        store3.state.a3 = 10;
        expect(store.state.z.a3).toBe(10);
        store.state.z.a3 = 11;
        expect(store3.state.a3).toBe(11);
    });
    test('一对多同步', async () => {
        const store = new AutoStore({
            x: { a1: 1, b1: 2, c1: 3 },
            y: { a2: 1, b2: 2, c2: 3 },
            z: { a3: 1, b3: 2, c3: 3 },
        });
        const store1 = new AutoStore({
            a1: 1,
            b1: 2,
            c1: 3,
        });
        store.sync(store1, { local: 'x' });

        const store2 = new AutoStore({
            a2: 1,
            b2: 2,
            c2: 3,
        });
        store.sync(store2, { local: 'y' });

        const store3 = new AutoStore({
            a3: 1,
            b3: 2,
            c3: 3,
        });
        store.sync(store3, { local: 'z' });

        store1.state.a1 = 10;
        expect(store.state.x.a1).toBe(10);
        store.state.x.a1 = 11;
        expect(store1.state.a1).toBe(11);

        store2.state.a2 = 10;
        expect(store.state.y.a2).toBe(10);
        store.state.y.a2 = 11;
        expect(store2.state.a2).toBe(11);

        store3.state.a3 = 10;
        expect(store.state.z.a3).toBe(10);
        store.state.z.a3 = 11;
        expect(store3.state.a3).toBe(11);
    });
    test('同步时路径映射', async () => {
        // order.a <-> myorder['order.a']
        const fromStore = new AutoStore({
            order: {
                a: 1,
                b: 2,
                c: 3,
            },
        });
        const toStore = new AutoStore({
            myorder: {},
        });
        fromStore.sync(toStore, {
            remote: 'myorder',
            immediate: false, // 不马上同步
            pathMap: {
                toRemote: (path: string[], value) => {
                    if (typeof value !== 'object') {
                        return [path.join('.')];
                    }
                },
                toLocal: (path: string[]) => {
                    return path.reduce<string[]>((result, cur) => {
                        result.push(...cur.split('.'));
                        return result;
                    }, []);
                },
            },
        });
        fromStore.state.order.a = 11;
        fromStore.state.order.b = 12;
        fromStore.state.order.c = 13;

        expect(toStore.state).toEqual({
            myorder: {
                'order.a': 11,
                'order.b': 12,
                'order.c': 13,
            },
        });
        // @ts-ignore
        toStore.state.myorder['order.a'] = 21;
        // @ts-ignore
        toStore.state.myorder['order.b'] = 22;
        // @ts-ignore
        toStore.state.myorder['order.c'] = 23;

        expect(fromStore.state).toEqual({
            order: {
                a: 21,
                b: 22,
                c: 23,
            },
        });
    });
    test('使用路径映射时默认马上进行全同步', async () => {
        // order.a <-> myorder['order.a']
        const fromStore = new AutoStore({
            order: {
                a: 1,
                b: 2,
                c: 3,
            },
        });
        const toStore = new AutoStore({
            myorder: {},
        });
        fromStore.sync(toStore, {
            remote: 'myorder',
            // immediate: true, 默认会马上同步
            pathMap: {
                toRemote: (path: string[], value) => {
                    if (typeof value !== 'object') {
                        return [path.join('.')];
                    }
                },
                toLocal: (path: string[]) => {
                    return path.reduce<string[]>((result, cur) => {
                        result.push(...cur.split('.'));
                        return result;
                    }, []);
                },
            },
        });

        expect(toStore.state).toEqual({
            myorder: {
                'order.a': 1,
                'order.b': 2,
                'order.c': 3,
            },
        });
    });
    test('指定同步路径映射时进行一次全同步', async () => {
        // order.a <-> myorder['order.a']
        const fromStore = new AutoStore({
            order: {
                a: 1,
                b: 2,
                c: 3,
            },
            user: {
                tags: ['x', 'y', 'z'],
            },
        });
        const toStore = new AutoStore({
            myorder: {},
        });
        fromStore.sync(toStore, {
            remote: 'myorder',
            pathMap: {
                toRemote: (path: string[], value: any) => {
                    if (typeof value !== 'object') {
                        return [path.join('.')];
                    }
                },
                toLocal: (path: string[], value: any) => {
                    if (typeof value !== 'object') {
                        return path.reduce<string[]>((result, cur) => {
                            result.push(...cur.split('.'));
                            return result;
                        }, []);
                    }
                },
            },
        });
        expect(toStore.state).toEqual({
            myorder: {
                'order.a': 1,
                'order.b': 2,
                'order.c': 3,
                'user.tags.0': 'x',
                'user.tags.1': 'y',
                'user.tags.2': 'z',
            },
        });

        fromStore.state.order.a = 11;
        fromStore.state.order.b = 12;
        fromStore.state.order.c = 13;

        expect(toStore.state).toEqual({
            myorder: {
                'order.a': 11,
                'order.b': 12,
                'order.c': 13,
                'user.tags.0': 'x',
                'user.tags.1': 'y',
                'user.tags.2': 'z',
            },
        });
        // @ts-ignore
        toStore.state.myorder['order.a'] = 21;
        // @ts-ignore
        toStore.state.myorder['order.b'] = 22;
        // @ts-ignore
        toStore.state.myorder['order.c'] = 23;

        expect(fromStore.state).toEqual({
            order: {
                a: 21,
                b: 22,
                c: 23,
            },
            user: {
                tags: ['x', 'y', 'z'],
            },
        });
    });
    test('只同步更新变更部分部分', async () => {
        const store1 = new AutoStore({
            order: {
                name: 'fisher',
                price: 2,
                count: 3,
                total: computed((order) => order.price * order.count),
            },
        });
        const store2 = new AutoStore<{ myorder: typeof store1.state.order }>({
            // @ts-ignore
            myorder: {},
        });
        store1.sync(store2, {
            local: ['order'],
            remote: ['myorder'],
            immediate: false,
            pathMap: {
                toRemote: (path: string[], value: any) => {
                    if (typeof value !== 'object') {
                        return [path.join('.')];
                    }
                },
                toLocal: (path: string[], value: any) => {
                    if (typeof value !== 'object') {
                        return path.reduce<string[]>((result, cur) => {
                            result.push(...cur.split('.'));
                            return result;
                        }, []);
                    }
                },
            },
        });
        store1.state.order.count = 4;
        expect(store2.state.myorder.count).toBe(4);
        expect(store2.state.myorder.total).toBe(8);
        store2.state.myorder.count = 5;
        expect(store1.state.order.count).toBe(5);
        expect(store1.state.order.total).toBe(10);
    });
    test('全量同步schema数据', async () => {
        // order.a <-> myorder['order.a']
        const fromStore = new AutoStore(
            {
                order: {
                    a: 1,
                    b: configurable(2, {
                        onValidate: (value: any) => value > 2,
                    }),
                    c: 3,
                },
                user: {
                    tags: ['x', configurable('y'), 'z'],
                },
            },
            { id: 'local' },
        );
        // @ts-ignore
        const toStore = new AutoStore<typeof fromStore.types.rawState>({}, { id: 'to' });
        fromStore.sync(toStore);
        expect(Object.keys(toStore.schemas.store.state)).toEqual(['order_$_b', 'user_$_tags_$_1']);
        // @ts-ignore
        expect(isFunction(toStore.schemas.store.state['order_$_b'].onValidate)).toBeTruthy();
    });
    test('主动接取全量同步schema数据', async () => {
        // order.a <-> myorder['order.a']
        const fromStore = new AutoStore(
            {
                order: {
                    a: 1,
                    b: configurable(2, {
                        onValidate: (value: any) => value > 2,
                    }),
                    c: 3,
                },
                user: {
                    tags: ['x', configurable('y'), 'z'],
                },
            },
            { id: 'local' },
        );
        const toStore = new AutoStore({}, { id: 'to' });
        const syncer = toStore.sync(fromStore, { immediate: false });
        syncer.pull();
        expect(Object.keys(toStore.schemas.store.state)).toEqual(['order_$_b', 'user_$_tags_$_1']);
        // @ts-ignore
        expect(isFunction(toStore.schemas.store.state['order_$_b'].onValidate)).toBeTruthy();
    });

    test('全量同步schema数据时进行路径转换', async () => {
        const fromStore = new AutoStore(
            {
                order: {
                    a: 1,
                    b: configurable(2, {
                        onValidate: (value: any) => {
                            return value > 2;
                        },
                    }),
                    c: 3,
                },
                user: {
                    tags: ['x', configurable('y'), 'z'],
                },
            },
            { id: 'from' },
        );
        const toStore = new AutoStore(
            {
                myorder: {},
            },
            { id: 'to' },
        );
        fromStore.sync(toStore, {
            remote: 'myorder',
            pathMap: {
                toRemote: (path: string[], value: any) => {
                    if (typeof value !== 'object') {
                        return [path.join('.')];
                    }
                },
                toLocal: (path: string[], value: any) => {
                    if (typeof value !== 'object') {
                        return path.reduce<string[]>((result, cur) => {
                            result.push(...cur.split('.'));
                            return result;
                        }, []);
                    }
                },
            },
        });
        expect(Object.keys(toStore.schemas.store.state)).toEqual([
            'myorder_$_order.b',
            'myorder_$_user.tags.1',
        ]);
        // @ts-ignore
        expect(() => (toStore.state.myorder['order.b'] = 0)).toThrow(ValidateError);
        // @ts-ignore
        const fromSchema = fromStore.schemas.get('order.b')!;

        // @ts-ignore
        const toSchema = toStore.schemas.get(['myorder', 'order.b'])!;

        expect(fromSchema.onValidate !== toSchema.onValidate).toBe(true);
    });
    test('主动拉取同步schema数据时进行路径转换', async () => {
        const fromStore = new AutoStore(
            {
                order: {
                    a: 1,
                    b: configurable(2, {
                        onValidate: (value: any) => {
                            return value > 2;
                        },
                    }),
                    c: 3,
                },
                user: {
                    tags: ['x', configurable('y'), 'z'],
                },
            },
            { id: 'from' },
        );
        const toStore = new AutoStore(
            {
                myorder: {},
            },
            { id: 'to' },
        );
        const syncer = toStore.sync(fromStore, {
            mode: 'pull',
            local: 'myorder',
            pathMap: {
                toLocal: (path: string[], value: any) => {
                    if (typeof value !== 'object') {
                        return [path.join('.')];
                    }
                },
                toRemote: (path: string[], value: any) => {
                    if (typeof value !== 'object') {
                        return path.reduce<string[]>((result, cur) => {
                            result.push(...cur.split('.'));
                            return result;
                        }, []);
                    }
                },
            },
        });
        expect(Object.keys(toStore.schemas.store.state)).toEqual([
            'myorder_$_order.b',
            'myorder_$_user.tags.1',
        ]);
        // @ts-ignore
        expect(() => (toStore.state.myorder['order.b'] = 0)).toThrow(ValidateError);
        // @ts-ignore
        const fromSchema = fromStore.schemas.get('order.b')!;

        // @ts-ignore
        const toSchema = toStore.schemas.get(['myorder', 'order.b'])!;

        expect(fromSchema.onValidate !== toSchema.onValidate).toBe(true);
    });
});
