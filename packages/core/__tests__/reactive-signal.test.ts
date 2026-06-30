/**
 * 混合架构实现测试
 *
 * 测试新的基于 alien-signals 的混合架构实现是否与原系统完全兼容
 */

import { describe, test, expect } from 'bun:test';
import { AutoStore, markRaw } from '../src';

describe('混合架构实现兼容性测试', () => {

    test('基础响应式功能', () => {
        const store = new AutoStore({
            count: 0,
            name: 'test'
        });

        expect(store.state.count).toBe(0);
        expect(store.state.name).toBe('test');

        store.state.count = 1;
        expect(store.state.count).toBe(1);

        store.state.name = 'updated';
        expect(store.state.name).toBe('updated');
    });

    test('嵌套对象响应式', () => {
        const store = new AutoStore({
            user: {
                name: 'John',
                age: 30,
                address: {
                    city: 'New York',
                    zip: '10001'
                }
            }
        });

        expect(store.state.user.name).toBe('John');
        expect(store.state.user.address.city).toBe('New York');

        store.state.user.name = 'Jane';
        expect(store.state.user.name).toBe('Jane');

        store.state.user.address.city = 'Boston';
        expect(store.state.user.address.city).toBe('Boston');
    });

    test('计算属性功能', () => {
        const store = new AutoStore({
            price: 10,
            count: 2,
            total: (scope: any) => scope.price * scope.count
        });

        // 计算属性应该在首次访问时计算
        expect(store.state.total).toBe(20);

        // 更新依赖应该重新计算
        store.state.price = 15;
        expect(store.state.total).toBe(30);

        store.state.count = 3;
        expect(store.state.total).toBe(45);
    });

    test('watch 功能', () => {
        const store = new AutoStore({
            count: 0
        });

        const results: any[] = [];

        store.watch(({ type, path, value }) => {
            results.push({ type, path: [...path], value });
        });

        store.state.count = 1;
        store.state.count = 2;

        expect(results.length).toBe(2);
        expect(results[0].type).toBe('set');
        expect(results[0].path).toEqual(['count']);
        expect(results[0].value).toBe(1);
    });

    test('update 功能', () => {
        const store = new AutoStore({
            user: {
                name: 'John',
                age: 30
            }
        });

        store.update((state) => {
            state.user.name = 'Jane';
            state.user.age = 31;
        });

        expect(store.state.user.name).toBe('Jane');
        expect(store.state.user.age).toBe(31);
    });

    test('批量更新功能', () => {
        const store = new AutoStore({
            count: 0,
            name: 'test'
        });

        const events: any[] = [];

        store.watch(({ type }) => {
            events.push(type);
        });

        store.batchUpdate((state) => {
            state.count = 1;
            state.name = 'updated';
        });

        // 批量更新应该触发两个 set 事件和一个 batch 事件
        expect(events.length).toBe(3);
        expect(events[0]).toBe('set'); // count 设置
        expect(events[1]).toBe('set'); // name 设置
        expect(events[2]).toBe('batch'); // 批量更新结束事件
    });

    test('数组操作', () => {
        const store = new AutoStore({
            items: [1, 2, 3]
        });

        expect(store.state.items).toEqual([1, 2, 3]);

        store.state.items.push(4);
        expect(store.state.items).toEqual([1, 2, 3, 4]);

        store.state.items.pop();
        expect(store.state.items).toEqual([1, 2, 3]);
    });

    test('delete 操作', () => {
        const store = new AutoStore({
            user: {
                name: 'John',
                age: 30,
                temp: 'value'
            }
        });

        delete store.state.user.temp;

        expect(store.state.user.temp).toBeUndefined();
    });

    test('markRaw 功能', () => {
        const store = new AutoStore({
            data: markRaw({
                value: 1,
                nested: {
                    item: 'test'
                }
            })
        });

        // markRaw 的对象不应该被响应式化
        expect(store.state.data.value).toBe(1);
        expect(store.state.data.nested.item).toBe('test');

        // 修改应该不会触发事件
        const events: any[] = [];
        store.watch(() => {
            events.push('changed');
        });

        store.state.data.value = 2;
        // markRaw 的修改不应该触发 watch
        expect(events.length).toBe(0);
    });

    test('深层嵌套对象', () => {
        const store = new AutoStore({
            level1: {
                level2: {
                    level3: {
                        level4: {
                            value: 'deep'
                        }
                    }
                }
            }
        });

        expect(store.state.level1.level2.level3.level4.value).toBe('deep');

        store.state.level1.level2.level3.level4.value = 'updated';
        expect(store.state.level1.level2.level3.level4.value).toBe('updated');
    });

    test('计算属性复杂依赖', () => {
        const store = new AutoStore({
            price: 10,
            discount: 0.1,
            tax: 0.05,
            total: (scope: any) => {
                const discounted = scope.price * (1 - scope.discount);
                return discounted * (1 + scope.tax);
            }
        });

        const total = store.state.total;
        expect(total).toBeCloseTo(9.45);

        store.state.price = 20;
        expect(store.state.total).toBeCloseTo(18.9);
    });

    test('多个计算属性', () => {
        const store = new AutoStore({
            a: 1,
            b: 2,
            sum: (scope: any) => scope.a + scope.b,
            product: (scope: any) => scope.a * scope.b
        });

        expect(store.state.sum).toBe(3);
        expect(store.state.product).toBe(2);

        store.state.a = 3;
        expect(store.state.sum).toBe(5);
        expect(store.state.product).toBe(6);
    });

    test('计算属性缓存', () => {
        let computeCount = 0;

        const store = new AutoStore({
            value: 1,
            doubled: (scope: any) => {
                computeCount++;
                return scope.value * 2;
            }
        });

        // 首次访问触发计算
        expect(store.state.doubled).toBe(2);
        expect(computeCount).toBe(1);

        // 再次访问不应该重新计算（缓存）
        expect(store.state.doubled).toBe(2);
        expect(computeCount).toBe(1);

        // 修改依赖应该重新计算
        store.state.value = 2;
        expect(store.state.doubled).toBe(4);
        expect(computeCount).toBe(2);
    });

    test('watch 路径监听', () => {
        const store = new AutoStore({
            user: {
                name: 'John',
                age: 30
            }
        });

        const results: any[] = [];

        store.watch('user.name', ({ value }) => {
            results.push(value);
        });

        store.state.user.name = 'Jane';
        store.state.user.age = 31;

        expect(results).toEqual(['Jane']);
        expect(results.length).toBe(1);
    });

    test('onObserverInitial 功能', () => {
        const store = new AutoStore({
            button: {
                onClick: () => 'clicked',
                label: 'Click me'
            }
        }, {
            onObserverInitial(path, value) {
                const name = path[path.length - 1];
                if (name && name.startsWith('on') && typeof value === 'function') {
                    return false; // 不为以 'on' 开头的函数创建 observer
                }
            }
        });

        // onClick 应该保持原样，不被转换
        expect(typeof store.state.button.onClick).toBe('function');
        expect(store.state.button.onClick()).toBe('clicked');
    });
});