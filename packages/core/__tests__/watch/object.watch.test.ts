/**
 * 对象成员变化的 watch 监听测试
 *
 * 验证：成员 set/delete/新增、同值去重、深层成员真实路径、depth 钻取、
 * once、通配符、operates 过滤、off() 取消、整体替换的后代广播、批量更新。
 */
import { describe, test, expect, beforeEach, afterEach, mock } from 'bun:test';

import { AutoStore } from '../../src';
import { deepClone } from 'flex-tools/object/deepClone';
import type { StateOperate } from '../../src/store/types';
import type { Watcher } from '../../src/watch/types';

/** 收集 operate 的辅助：返回一个 [watcher, events] */
function collect(
    store: AutoStore<any>,
    path: string | string[],
    options?: { depth?: number; once?: boolean; operates?: any },
) {
    const events: StateOperate[] = [];
    const watcher = store.watch(path as any, (op: StateOperate) => events.push(op), options as any);
    return { watcher, events };
}

const data = {
    user: {
        firstName: 'John',
        lastName: 'Doe',
        profile: {
            city: 'New York',
            age: 30,
        },
    },
    order: {
        price: 100,
        count: 5,
    },
};

describe('watch 对象成员变化', () => {
    let store: AutoStore<typeof data>;
    let watcher: Watcher | undefined;
    beforeEach(() => {
        store = new AutoStore(deepClone(data));
    });
    afterEach(() => {
        watcher?.off();
        watcher = undefined;
    });

    describe('成员赋值', () => {
        test('监听成员路径，set 触发且携带 value/oldValue/parentPath', () => {
            const { watcher: w, events } = collect(store, 'user.firstName');
            watcher = w;
            store.state.user.firstName = 'Li';
            expect(events).toHaveLength(1);
            expect(events[0].type).toBe('set');
            expect(events[0].path).toEqual(['user', 'firstName']);
            expect(events[0].value).toBe('Li');
            expect(events[0].oldValue).toBe('John');
            expect(events[0].parentPath).toEqual(['user']);
        });

        test('重复赋相同值不触发（同值去重）', () => {
            const { watcher: w, events } = collect(store, 'user.firstName');
            watcher = w;
            store.state.user.firstName = 'John';
            expect(events).toHaveLength(0);
        });

        test('新增成员触发 set 且 oldValue 为 undefined', () => {
            const { watcher: w, events } = collect(store, 'user.email');
            watcher = w;
            (store.state.user as any).email = 'john@example.com';
            expect(events).toHaveLength(1);
            expect(events[0].type).toBe('set');
            expect(events[0].path).toEqual(['user', 'email']);
            expect(events[0].value).toBe('john@example.com');
            expect(events[0].oldValue).toBeUndefined();
        });

        test('多次成员变更按发生顺序收到事件', () => {
            const { watcher: w, events } = collect(store, ['user.firstName', 'user.lastName']);
            watcher = w;
            store.state.user.firstName = 'Li';
            store.state.user.lastName = 'Si';
            store.state.user.firstName = 'Wang';
            expect(events.map((e) => `${e.type} ${e.path.join('.')}`)).toEqual([
                'set user.firstName',
                'set user.lastName',
                'set user.firstName',
            ]);
            expect(events[2].value).toBe('Wang');
            expect(events[2].oldValue).toBe('Li');
        });
    });

    describe('成员删除', () => {
        test('delete 成员触发 delete，value 为被删值', () => {
            const { watcher: w, events } = collect(store, 'user.lastName');
            watcher = w;
            // @ts-expect-error 运行时允许删除
            delete store.state.user.lastName;
            expect(events).toHaveLength(1);
            expect(events[0].type).toBe('delete');
            expect(events[0].path).toEqual(['user', 'lastName']);
            expect(events[0].value).toBe('Doe');
            expect(events[0].oldValue).toBeUndefined();
        });

        test('删除后再赋值可再次触发 set', () => {
            const { watcher: w, events } = collect(store, 'order.count');
            watcher = w;
            // @ts-expect-error 运行时允许删除
            delete store.state.order.count;
            store.state.order.count = 7;
            expect(events.map((e) => e.type)).toEqual(['delete', 'set']);
            expect(events[1].oldValue).toBeUndefined();
            expect(events[1].value).toBe(7);
        });
    });

    describe('深层成员', () => {
        test('watch 精确路径，operate.path 为完整真实路径', () => {
            const { watcher: w, events } = collect(store, 'user.profile.city');
            watcher = w;
            store.state.user.profile.city = 'Shanghai';
            expect(events).toHaveLength(1);
            expect(events[0].path).toEqual(['user', 'profile', 'city']);
            expect(events[0].value).toBe('Shanghai');
            expect(events[0].oldValue).toBe('New York');
        });

        test('watch 中间层路径，depth 默认 0 时后代变更不触发', () => {
            const { watcher: w, events } = collect(store, 'user');
            watcher = w;
            store.state.user.profile.city = 'Shanghai';
            expect(events).toHaveLength(0);
            // 自身被重新赋值才触发
            store.state.user = { ...store.state.user, firstName: 'Li' };
            expect(events).toHaveLength(1);
            expect(events[0].path).toEqual(['user']);
        });

        test('depth: 1 捕获一级后代且 path 为真实后代路径', () => {
            const { watcher: w, events } = collect(store, 'user', { depth: 1 });
            watcher = w;
            store.state.user.firstName = 'Li';
            expect(events).toHaveLength(1);
            expect(events[0].path).toEqual(['user', 'firstName']);
            expect(events[0].value).toBe('Li');
            expect(events[0].oldValue).toBe('John');
            // 二级后代变更不触发
            store.state.user.profile.city = 'Shanghai';
            expect(events).toHaveLength(1);
        });

        test('depth: 2 捕获二级后代', () => {
            const { watcher: w, events } = collect(store, 'user', { depth: 2 });
            watcher = w;
            store.state.user.profile.age = 31;
            expect(events).toHaveLength(1);
            expect(events[0].path).toEqual(['user', 'profile', 'age']);
            expect(events[0].oldValue).toBe(30);
        });
    });

    describe('once', () => {
        test('once: true 时只触发一次', () => {
            const { watcher: w, events } = collect(store, 'order.price', { once: true });
            watcher = w;
            store.state.order.price = 200;
            store.state.order.price = 300;
            store.state.order.price = 400;
            expect(events).toHaveLength(1);
            expect(events[0].value).toBe(200);
        });
    });

    describe('通配符', () => {
        test("watch('user.*') 捕获任一一级成员变更", () => {
            const { watcher: w, events } = collect(store, 'user.*');
            watcher = w;
            store.state.user.firstName = 'Li';
            store.state.user.lastName = 'Si';
            expect(events).toHaveLength(2);
            expect(events[0].path).toEqual(['user', 'firstName']);
            expect(events[1].path).toEqual(['user', 'lastName']);
        });

        test("watch('user.**') 捕获所有后代变更", () => {
            const { watcher: w, events } = collect(store, 'user.**');
            watcher = w;
            store.state.user.firstName = 'Li';
            store.state.user.profile.city = 'Shanghai';
            expect(events.map((e) => e.path.join('.'))).toEqual([
                'user.firstName',
                'user.profile.city',
            ]);
        });
    });

    describe('operates 过滤', () => {
        test("operates: ['delete'] 时 set 不触发、delete 触发", () => {
            const { watcher: w, events } = collect(store, 'order.price', {
                operates: ['delete'],
            });
            watcher = w;
            store.state.order.price = 200;
            expect(events).toHaveLength(0);
            // @ts-expect-error 运行时允许删除
            delete store.state.order.price;
            expect(events).toHaveLength(1);
            expect(events[0].type).toBe('delete');
        });

        test("operates: ['set'] 时 delete 不触发", () => {
            const { watcher: w, events } = collect(store, 'order.price', {
                operates: ['set'],
            });
            watcher = w;
            store.state.order.price = 200;
            // @ts-expect-error 运行时允许删除
            delete store.state.order.price;
            expect(events).toHaveLength(1);
            expect(events[0].type).toBe('set');
        });
    });

    describe('取消监听', () => {
        test('watcher.off() 后不再触发', () => {
            const { watcher: w, events } = collect(store, 'order.price');
            store.state.order.price = 200;
            expect(events).toHaveLength(1);
            w.off();
            store.state.order.price = 300;
            expect(events).toHaveLength(1);
        });

        test('filter 返回 false 时丢弃事件', () => {
            const events: StateOperate[] = [];
            watcher = store.watch('order.price' as any, (op: StateOperate) => events.push(op), {
                filter: (op: StateOperate) => (op.value as number) > 150,
            } as any);
            store.state.order.price = 120;
            store.state.order.price = 180;
            expect(events).toHaveLength(1);
            expect(events[0].value).toBe(180);
        });
    });

    describe('整体替换对象的后代广播', () => {
        test('整体替换父对象，成员后代收到 broadcast set', () => {
            const { watcher: w, events } = collect(store, 'order.price');
            watcher = w;
            store.state.order = { price: 188, count: 5 };
            expect(events).toHaveLength(1);
            expect(events[0].type).toBe('set');
            expect(events[0].path).toEqual(['order', 'price']);
            expect(events[0].value).toBe(188);
            expect(events[0].oldValue).toBe(100);
            expect(events[0].broadcast).toBe(true);
        });

        test('整体替换父对象，新对象缺少的成员后代收到 broadcast delete', () => {
            const { watcher: w, events } = collect(store, 'order.count');
            watcher = w;
            // @ts-expect-error 刻意缺省 count
            store.state.order = { price: 188 };
            expect(events).toHaveLength(1);
            expect(events[0].type).toBe('delete');
            expect(events[0].value).toBeUndefined();
            expect(events[0].oldValue).toBe(5);
            expect(events[0].broadcast).toBe(true);
        });

        test('整体替换父对象，父监听器收到原始 operate（无 broadcast 标记）', () => {
            const { watcher: w, events } = collect(store, 'order');
            watcher = w;
            store.state.order = { price: 188, count: 5 };
            expect(events).toHaveLength(1);
            expect(events[0].path).toEqual(['order']);
            expect(events[0].broadcast).toBeUndefined();
        });
    });

    describe('批量更新', () => {
        test('batchUpdate 内修改成员，flush 后触发', () => {
            const { watcher: w, events } = collect(store, 'order.price');
            watcher = w;
            store.batchUpdate((state) => {
                state.order.price = 888;
            });
            const setEvents = events.filter(
                (e) => e.type === 'set' && e.path.join('.') === 'order.price',
            );
            expect(setEvents.length).toBeGreaterThanOrEqual(1);
            expect(setEvents.some((e) => e.value === 888)).toBe(true);
        });
    });

    describe('监听器内部读写安全', () => {
        test('回调内读取状态不会因 get 事件无限循环', () => {
            const cb = mock((_op: StateOperate) => {
                // 读取状态：peeping 期间 get 事件被抑制
                void store.state.order.price;
            });
            watcher = store.watch(
                'order.price' as any,
                cb as any,
                {
                    operates: '*',
                } as any,
            );
            store.state.order.price = 200;
            expect(cb).toHaveBeenCalledTimes(1);
        });
    });
});
