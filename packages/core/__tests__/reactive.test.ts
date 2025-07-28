import { describe, expect, test } from 'vitest';
import { AutoStore, isRaw, markRaw } from '../src';

// 测试 isEventMatched 函数
describe('reactive', () => {
    test('use markRaw for object', () => {
        const store = new AutoStore({
            a: 1,
            b: 2,
            c: 3,
            total: async () => store.state.a + store.state.b + store.state.c,
            x: markRaw({
                total: async () => store.state.a + store.state.b + store.state.c,
                x1: 1,
                x2: 2,
                x3: {
                    x31: 1,
                    x32: 2,
                    x33: () => 1,
                },
            }),
        });
        store.watch(
            ({ path }) => {
                path; // ['a']
            },
            { operates: 'read' },
        );
        expect(isRaw(store.state.a)).toBe(false);
        expect(isRaw(store.state.x)).toBe(true);
        let xxx = store.state.x.x1;
        store.state.x.x2;
        store.state.x.x3.x31;
        store.state.x.x3.x32;
        store.state.x.x3.x33;
        store.state.x.total;
        store.state.total;
    });
    test('onObserverInitial', () => {
        const store = new AutoStore(
            {
                user: {
                    items: [
                        {
                            icon: 'settings',
                            label: '设置',
                            onClick: () => {
                                console.log('settings');
                            },
                        },
                        { icon: 'home', label: '首页', divider: true },
                        { label: '仪表盘', badge: '1', divider: true },
                    ],
                },
            },
            {
                onObserverInitial(path, value) {
                    const name = path[path.length - 1];
                    if (name && typeof value === 'function') {
                        if (name.startsWith('render') || name.startsWith('on')) {
                            return false;
                        }
                    }
                },
            },
        );
        const onClick = store.state.user.items[0].onClick;
        expect(onClick).toBeInstanceOf(Function);
    });
});
