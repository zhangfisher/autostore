/**
 * 数组成员变化的 watch 监听测试
 *
 * 验证：索引赋值(update)、push/unshift/concat(insert)、pop/shift/splice(remove)、
 * fill(update)、索引段路径、depth 钻取、整体替换数组的后代广播、operates 过滤、
 * off() 取消监听。详见 ADR-0001 / ADR-0003。
 */
import { describe, test, expect, beforeEach, afterEach } from 'bun:test';

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
    items: [1, 2, 3],
    address: [
        { city: 'New York', street: 'Wall Street' },
        { city: 'Los Angeles', street: 'Hollywood Blvd' },
    ],
};

describe('watch 数组成员变化', () => {
    let store: AutoStore<typeof data>;
    let watcher: Watcher | undefined;
    beforeEach(() => {
        store = new AutoStore(deepClone(data));
    });
    afterEach(() => {
        watcher?.off();
        watcher = undefined;
    });

    describe('索引赋值', () => {
        test('监听数组路径，索引赋值触发 update 且 path 含索引段', () => {
            // depth: 1 才能捕获索引段（默认 depth: 0 只监听数组自身）
            const { watcher: w, events } = collect(store, 'items', { depth: 1 });
            watcher = w;
            store.state.items[0] = 99;
            expect(events).toHaveLength(1);
            expect(events[0].type).toBe('update');
            expect(events[0].path).toEqual(['items', '0']);
            expect(events[0].value).toBe(99);
            expect(events[0].oldValue).toBe(1);
            expect(events[0].parentPath).toEqual(['items']);
        });

        test('监听精确索引路径，仅该索引变化触发', () => {
            const { watcher: w, events } = collect(store, 'items.1');
            watcher = w;
            store.state.items[1] = 88;
            expect(events).toHaveLength(1);
            expect(events[0].type).toBe('update');
            expect(events[0].path).toEqual(['items', '1']);
            expect(events[0].oldValue).toBe(2);
            // 其它索引变化不触发
            store.state.items[2] = 77;
            expect(events).toHaveLength(1);
        });

        test('同索引赋相同值不触发（同值去重）', () => {
            const { watcher: w, events } = collect(store, 'items', { depth: 1 });
            watcher = w;
            store.state.items[0] = 1;
            expect(events).toHaveLength(0);
        });

        test('超出 length 的索引赋值触发 update 且 oldValue 为 undefined', () => {
            const { watcher: w, events } = collect(store, 'items', { depth: 1 });
            watcher = w;
            store.state.items[5] = 66;
            expect(events).toHaveLength(1);
            expect(events[0].type).toBe('update');
            expect(events[0].path).toEqual(['items', '5']);
            expect(events[0].value).toBe(66);
            expect(events[0].oldValue).toBeUndefined();
        });
    });

    describe('数组变更方法', () => {
        test('push 触发 insert，indexs 从原 length 开始', () => {
            const { watcher: w, events } = collect(store, 'items');
            watcher = w;
            store.state.items.push(4, 5);
            expect(events).toHaveLength(1);
            expect(events[0].type).toBe('insert');
            expect(events[0].path).toEqual(['items']);
            expect(events[0].indexs).toEqual([3, 4]);
            expect(events[0].value).toEqual([4, 5]);
        });

        test('unshift 触发 insert，indexs 从 0 开始', () => {
            const { watcher: w, events } = collect(store, 'items');
            watcher = w;
            store.state.items.unshift(0);
            expect(events).toHaveLength(1);
            expect(events[0].type).toBe('insert');
            expect(events[0].indexs).toEqual([0]);
            expect(events[0].value).toEqual([0]);
            expect(store.state.items).toEqual([0, 1, 2, 3]);
        });

        test('pop 触发 remove，indexs 为最后一个索引', () => {
            const { watcher: w, events } = collect(store, 'items');
            watcher = w;
            const last = store.state.items.pop();
            expect(last).toBe(3);
            expect(events).toHaveLength(1);
            expect(events[0].type).toBe('remove');
            expect(events[0].path).toEqual(['items']);
            expect(events[0].indexs).toEqual([2]);
            expect(events[0].value).toEqual([3]);
        });

        test('shift 触发 remove，indexs 为 0', () => {
            const { watcher: w, events } = collect(store, 'items');
            watcher = w;
            store.state.items.shift();
            expect(events).toHaveLength(1);
            expect(events[0].type).toBe('remove');
            expect(events[0].indexs).toEqual([0]);
            expect(events[0].value).toEqual([1]);
        });

        test('splice 删除元素触发 remove，indexs 为被删区间', () => {
            const { watcher: w, events } = collect(store, 'items');
            watcher = w;
            store.state.items.splice(1, 1);
            expect(events).toHaveLength(1);
            expect(events[0].type).toBe('remove');
            expect(events[0].path).toEqual(['items']);
            expect(events[0].indexs).toEqual([1]);
            expect(events[0].value).toEqual([2]);
        });

        test('splice 插入元素触发 insert，indexs 为插入位置起', () => {
            const { watcher: w, events } = collect(store, 'items');
            watcher = w;
            store.state.items.splice(1, 0, 8, 9);
            expect(events).toHaveLength(1);
            expect(events[0].type).toBe('insert');
            expect(events[0].indexs).toEqual([1, 2]);
            expect(events[0].value).toEqual([8, 9]);
        });

        test('splice 同时删除与插入时先 remove 后 insert', () => {
            const { watcher: w, events } = collect(store, 'items');
            watcher = w;
            store.state.items.splice(1, 2, 8);
            expect(events.map((e) => e.type)).toEqual(['remove', 'insert']);
            expect(events[0].indexs).toEqual([1, 2]);
            expect(events[0].value).toEqual([2, 3]);
            expect(events[1].indexs).toEqual([1]);
            expect(events[1].value).toEqual([8]);
        });

        test('fill 触发 update 且 indexs 为填充区间', () => {
            const { watcher: w, events } = collect(store, 'items');
            watcher = w;
            store.state.items.fill(0, 1, 3);
            expect(events).toHaveLength(1);
            expect(events[0].type).toBe('update');
            expect(events[0].path).toEqual(['items']);
            expect(events[0].indexs).toEqual([1, 2]);
            expect(events[0].value).toBe(0);
            expect(store.state.items).toEqual([1, 0, 0]);
        });

        test('数组元素为对象时，元素成员变更触发 set', () => {
            const { watcher: w, events } = collect(store, 'address.0.city');
            watcher = w;
            store.state.address[0].city = 'Shanghai';
            expect(events).toHaveLength(1);
            expect(events[0].type).toBe('set');
            expect(events[0].path).toEqual(['address', '0', 'city']);
            expect(events[0].value).toBe('Shanghai');
            expect(events[0].oldValue).toBe('New York');
        });

        test('数组元素对象整体替换，元素后代收到 broadcast set', () => {
            const { watcher: w, events } = collect(store, 'address.0.city');
            watcher = w;
            store.state.address[0] = { city: 'QuanZhou', street: 'TongYang' };
            expect(events).toHaveLength(1);
            expect(events[0].type).toBe('set');
            expect(events[0].path).toEqual(['address', '0', 'city']);
            expect(events[0].value).toBe('QuanZhou');
            expect(events[0].oldValue).toBe('New York');
            expect(events[0].broadcast).toBe(true);
        });
    });

    describe('depth 钻取', () => {
        test('depth: 1 捕获索引段（数字索引段视为一级后代）', () => {
            const { watcher: w, events } = collect(store, 'items', { depth: 1 });
            watcher = w;
            store.state.items[1] = 42;
            expect(events).toHaveLength(1);
            expect(events[0].path).toEqual(['items', '1']);
            expect(events[0].value).toBe(42);
            expect(events[0].oldValue).toBe(2);
        });

        test('depth 默认 0 时索引变化不触发，整体替换才触发', () => {
            const { watcher: w, events } = collect(store, 'items');
            watcher = w;
            store.state.items[0] = 99;
            expect(events).toHaveLength(0);
            store.state.items = [7, 8, 9];
            expect(events).toHaveLength(1);
            expect(events[0].path).toEqual(['items']);
        });
    });

    describe('通配符', () => {
        test("watch('items.*') 捕获索引赋值", () => {
            const { watcher: w, events } = collect(store, 'items.*');
            watcher = w;
            store.state.items[0] = 99;
            store.state.items[2] = 77;
            expect(events.map((e) => e.path.join('.'))).toEqual(['items.0', 'items.2']);
        });

        test("watch('address.**') 捕获数组元素后代成员变更", () => {
            const { watcher: w, events } = collect(store, 'address.**');
            watcher = w;
            store.state.address[1].street = 'Broadway';
            expect(events.map((e) => e.path.join('.'))).toEqual(['address.1.street']);
        });
    });

    describe('operates 过滤', () => {
        test("operates: ['insert'] 时仅插入类变更触发", () => {
            const { watcher: w, events } = collect(store, 'items', {
                operates: ['insert'],
            });
            watcher = w;
            store.state.items.push(4);
            store.state.items.pop();
            store.state.items[0] = 99;
            expect(events).toHaveLength(1);
            expect(events[0].type).toBe('insert');
        });

        test("operates: ['remove'] 时仅移除类变更触发", () => {
            const { watcher: w, events } = collect(store, 'items', {
                operates: ['remove'],
            });
            watcher = w;
            store.state.items.push(4);
            store.state.items.pop();
            expect(events).toHaveLength(1);
            expect(events[0].type).toBe('remove');
        });
    });

    describe('整体替换数组的后代广播', () => {
        test('整体替换数组，已订阅的索引后代收到 broadcast set', () => {
            const i0 = collect(store, 'items.0');
            const i2 = collect(store, 'items.2');
            watcher = i0.watcher;
            store.state.items = [1, 2, 30];
            // 0 号未变被去重
            expect(i0.events).toHaveLength(0);
            // 2 号变化
            expect(i2.events).toHaveLength(1);
            expect(i2.events[0].type).toBe('set');
            expect(i2.events[0].value).toBe(30);
            expect(i2.events[0].oldValue).toBe(3);
            expect(i2.events[0].broadcast).toBe(true);
            i2.watcher.off();
            i0.watcher.off();
        });

        test('整体替换数组，新数组缺少的索引后代收到 broadcast delete', () => {
            const { watcher: w, events } = collect(store, 'items.2');
            watcher = w;
            store.state.items = [1, 2];
            expect(events).toHaveLength(1);
            expect(events[0].type).toBe('delete');
            expect(events[0].value).toBeUndefined();
            expect(events[0].oldValue).toBe(3);
            expect(events[0].broadcast).toBe(true);
        });

        test('整体替换数组，父监听器收到原始 operate（无 broadcast 标记）', () => {
            const { watcher: w, events } = collect(store, 'items');
            watcher = w;
            store.state.items = [7, 8, 9];
            expect(events).toHaveLength(1);
            expect(events[0].path).toEqual(['items']);
            expect(events[0].value).toEqual([7, 8, 9]);
            expect(events[0].broadcast).toBeUndefined();
        });
    });

    describe('取消监听', () => {
        test('watcher.off() 后不再触发', () => {
            const { watcher: w, events } = collect(store, 'items');
            store.state.items.push(4);
            expect(events).toHaveLength(1);
            w.off();
            store.state.items.push(5);
            expect(events).toHaveLength(1);
        });
    });
});
