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

import { AutoStore, ObserverScopeRef, computed } from '../..';

describe('异步依赖参数的各种配置形式', () => {
    test('使用字符串绝对路径参数依赖', () => {
        return new Promise<void>((resolve) => {
            let store = new AutoStore(
                {
                    user: {
                        firstName: 'zhang',
                        lastName: 'fisher',
                        fullName: computed(
                            async ([first, last]) => {
                                return first + ' ' + last;
                            },
                            ['user.firstName', 'user.lastName'],
                            {
                                async: true,
                                scope: ObserverScopeRef.Depends,
                            },
                        ),
                    },
                },
                {
                    onComputedDone: ({ value }) => {
                        expect(value).toEqual('zhang fisher');
                        resolve();
                    },
                },
            );
            store.state.user.fullName;
        });
    });
    test('使用路径字符串数组指定依赖', () => {
        return new Promise<void>((resolve) => {
            let store = new AutoStore(
                {
                    user: {
                        firstName: 'zhang',
                        lastName: 'fisher',
                        fullName: computed(
                            async ([first, last]) => {
                                return first + ' ' + last;
                            },
                            [
                                ['user', 'firstName'],
                                ['user', 'lastName'],
                            ],
                            {
                                async: true,
                                scope: ObserverScopeRef.Depends,
                            },
                        ),
                    },
                },
                {
                    onComputedDone: ({ value }) => {
                        expect(value).toEqual('zhang fisher');
                        resolve();
                    },
                },
            );
            store.state.user.fullName;
        });
    });
    test('使用相对当前路径字符串指定依赖', () => {
        // ./代表当前在的对象，即fullName所在的对象user
        return new Promise<void>((resolve) => {
            let store = new AutoStore(
                {
                    user: {
                        firstName: 'zhang',
                        lastName: 'fisher',
                        fullName: computed(
                            async ([first, last]) => {
                                return first + ' ' + last;
                            },
                            ['./firstName', './lastName'],
                            {
                                async: true,
                                scope: ObserverScopeRef.Depends,
                            },
                        ),
                    },
                },
                {
                    onComputedDone: ({ value }) => {
                        expect(value).toEqual('zhang fisher');
                        resolve();
                    },
                },
            );
            store.state.user.fullName;
        });
    });
    test('使用多级相对当前路径字符串指定依赖', () => {
        // ./代表当前在的对象，即fullName所在的对象user
        return new Promise<void>((resolve) => {
            let store = new AutoStore(
                {
                    root: {
                        a: {
                            user: {
                                firstName: 'zhang',
                                lastName: 'fisher',
                            },
                        },
                        b: {
                            user: {
                                fullName: computed(
                                    async ([first, last]) => {
                                        return first + ' ' + last;
                                    },
                                    ['../../a.user.firstName', '../../a.user.lastName'],
                                    {
                                        async: true,
                                        scope: ObserverScopeRef.Depends,
                                    },
                                ),
                            },
                        },
                    },
                },
                {
                    onComputedDone: ({ value }) => {
                        expect(value).toEqual('zhang fisher');
                        resolve();
                    },
                },
            );
            store.state.root.b.user.fullName;
        });
    });
});
