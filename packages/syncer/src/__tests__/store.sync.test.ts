/* eslint-disable @typescript-eslint/no-unused-vars */
import { describe, expect, test } from "vitest"
import { computed, AutoStore, configurable, StateOperate } from '../../../core/src';
import "..";


describe("本地Store同步", () => {

    test("一对一全同步", async () => {
        const store1 = new AutoStore({
            order: {
                name: "fisher",
                price: 2,
                count: 3,
                total: computed((order) => order.price * order.count)
            }
        })
        const store2 = new AutoStore<typeof store1.state>()
        store1.sync(store2)
        expect(store2.state).toEqual(store1.state)
        store1.state.order.count = 4
        expect(store2.state.order.count).toBe(4)
        expect(store2.state.order.total).toBe(8)
        store2.state.order.count = 5
        expect(store1.state.order.count).toBe(5)
        expect(store1.state.order.total).toBe(10)
    })

    test("将本地指定路径同步到其他store的指定路径", async () => {
        const store1 = new AutoStore({
            order: {
                name: "fisher",
                price: 2,
                count: 3,
                total: computed((order) => order.price * order.count)
            }
        })
        const store2 = new AutoStore<typeof store1.state.order>()
        store1.sync(store2, { from: ["order"] })
        expect(store2.state).toEqual(store1.state.order)
        store1.state.order.count = 4
        expect(store2.state.count).toBe(4)
        expect(store2.state.total).toBe(8)
        store2.state.count = 5
        expect(store1.state.order.count).toBe(5)
        expect(store1.state.order.total).toBe(10)
    })
    test("同步指定路径的对象到其他store的指定路径", async () => {
        const store1 = new AutoStore({
            order: {
                name: "fisher",
                price: 2,
                count: 3,
                total: computed((order) => order.price * order.count)
            }
        })
        const store2 = new AutoStore<{ myorder: typeof store1.state.order }>({
            // @ts-ignore
            myorder: {}
        })
        store1.sync(store2, { from: ["order"], to: ["myorder"] })
        expect(store2.state.myorder).toEqual(store1.state.order)
        store1.state.order.count = 4
        expect(store2.state.myorder.count).toBe(4)
        expect(store2.state.myorder.total).toBe(8)
        store2.state.myorder.count = 5
        expect(store1.state.order.count).toBe(5)
        expect(store1.state.order.total).toBe(10)
    })
    test("同步指定路径的简单数值到其他store的指定路径", async () => {
        const store1 = new AutoStore({
            order: {
                name: "fisher",
                price: 2,
                count: 3,
                total: computed((order) => order.price * order.count)
            }
        })
        const store2 = new AutoStore<{ myorder: typeof store1.state.order }>({
            // @ts-ignore
            myorder: {
                count: 1,
            }
        })
        store1.sync(store2, { from: ["order", "count"], to: ["myorder", "count"] })
        expect(store2.state.myorder.count).toEqual(store1.state.order.count)
        store1.state.order.count = 4
        expect(store2.state.myorder.count).toBe(4)
        store2.state.myorder.count = 5
        expect(store1.state.order.count).toBe(5)
        expect(store1.state.order.total).toBe(10)
    })
    test("同步数组到其他store", async () => {
        const store1 = new AutoStore({
            order: {
                values: [1, 2, 3, 4, 5, 6, 7, 8, 9]
            }
        }, { id: "a" })
        const store2 = new AutoStore<{ myorder: typeof store1.state.order }>({
            // @ts-ignore
            myorder: {
                values: []
            }
        }, { id: "b" })
        store1.sync(store2, { from: "order.values", to: "myorder.values" })
        expect(store2.state.myorder.values).toEqual(store1.state.order.values)
        store1.state.order.values.push(0)
        expect(store2.state.myorder.values).toEqual(store1.state.order.values)
        store1.state.order.values.splice(1, 2)
        expect(store2.state.myorder.values).toEqual(store1.state.order.values)
        store2.state.myorder.values.splice(1, 3, 10, 11)
        expect(store1.state.order.values).toEqual(store1.state.order.values)

    })

    test("同步时仅指定to时能过滤其他无效的路径", async () => {
        const store1 = new AutoStore({
            x: { a: 1, b: 2, c: 3 },
            y: { a: 1, b: 2, c: 3 }
        })
        const store2 = new AutoStore({
            order: { a: 1, b: 2, c: 3 }
        })

        store1.sync(store2, { to: "x.y" })
        // @ts-ignore
        expect(store2.state.x.y).toEqual(store1.state)

    })

    test("多对一同步", async () => {
        const store = new AutoStore({
            x: { a1: 1, b1: 2, c1: 3 },
            y: { a2: 1, b2: 2, c2: 3 },
            z: { a3: 1, b3: 2, c3: 3 }
        })
        const store1 = new AutoStore({
            a1: 1, b1: 2, c1: 3
        })
        store1.sync(store, { to: "x" })
        const store2 = new AutoStore({
            a2: 1, b2: 2, c2: 3
        })
        store2.sync(store, { to: "y" })
        const store3 = new AutoStore({
            a3: 1, b3: 2, c3: 3
        })
        store3.sync(store, { to: "z" })

        store1.state.a1 = 10
        expect(store.state.x.a1).toBe(10)
        store.state.x.a1 = 11
        expect(store1.state.a1).toBe(11)

        store2.state.a2 = 10
        expect(store.state.y.a2).toBe(10)
        store.state.y.a2 = 11
        expect(store2.state.a2).toBe(11)

        store3.state.a3 = 10
        expect(store.state.z.a3).toBe(10)
        store.state.z.a3 = 11
        expect(store3.state.a3).toBe(11)

    })
    test("一对多同步", async () => {
        const store = new AutoStore({
            x: { a1: 1, b1: 2, c1: 3 },
            y: { a2: 1, b2: 2, c2: 3 },
            z: { a3: 1, b3: 2, c3: 3 }
        })
        const store1 = new AutoStore({
            a1: 1, b1: 2, c1: 3
        })
        store.sync(store1, { from: "x" })

        const store2 = new AutoStore({
            a2: 1, b2: 2, c2: 3
        })
        store.sync(store2, { from: "y" })

        const store3 = new AutoStore({
            a3: 1, b3: 2, c3: 3
        })
        store.sync(store3, { from: "z" })

        store1.state.a1 = 10
        expect(store.state.x.a1).toBe(10)
        store.state.x.a1 = 11
        expect(store1.state.a1).toBe(11)

        store2.state.a2 = 10
        expect(store.state.y.a2).toBe(10)
        store.state.y.a2 = 11
        expect(store2.state.a2).toBe(11)

        store3.state.a3 = 10
        expect(store.state.z.a3).toBe(10)
        store.state.z.a3 = 11
        expect(store3.state.a3).toBe(11)

    })
    test("同步时路径映射", async () => {
        // order.a <-> myorder['order.a']
        const fromStore = new AutoStore({
            order: {
                a: 1, b: 2, c: 3
            }
        })
        const toStore = new AutoStore({
            myorder: {}
        })
        fromStore.sync(toStore, {
            to: "myorder",
            immediate: false, // 不马上同步
            pathMap: {
                toRemote: (path: string[], value) => {
                    if (typeof (value) !== 'object') {
                        return [path.join(".")]
                    }
                },
                toLocal: (path: string[]) => {
                    return path.reduce<string[]>((result, cur) => {
                        result.push(...cur.split("."))
                        return result
                    }, [])
                }
            }
        })
        fromStore.state.order.a = 11
        fromStore.state.order.b = 12
        fromStore.state.order.c = 13

        expect(toStore.state).toEqual({
            myorder: {
                'order.a': 11,
                'order.b': 12,
                'order.c': 13
            }
        })
        // @ts-ignore
        toStore.state.myorder['order.a'] = 21
        // @ts-ignore
        toStore.state.myorder['order.b'] = 22
        // @ts-ignore
        toStore.state.myorder['order.c'] = 23

        expect(fromStore.state).toEqual({
            order: {
                a: 21, b: 22, c: 23
            }
        })

    })
    test("使用路径映射时默认马上进行全同步", async () => {
        // order.a <-> myorder['order.a']
        const fromStore = new AutoStore({
            order: {
                a: 1, b: 2, c: 3
            }
        })
        const toStore = new AutoStore({
            myorder: {}
        })
        fromStore.sync(toStore, {
            to: "myorder",
            // immediate: true, 默认会马上同步
            pathMap: {
                toRemote: (path: string[], value) => {
                    if (typeof (value) !== 'object') {
                        return [path.join(".")]
                    }
                },
                toLocal: (path: string[]) => {
                    return path.reduce<string[]>((result, cur) => {
                        result.push(...cur.split("."))
                        return result
                    }, [])
                }
            }
        })

        expect(toStore.state).toEqual({
            myorder: {
                'order.a': 1,
                'order.b': 2,
                'order.c': 3
            }
        })

    })
    test("指定同步路径映射时进行一次全同步", async () => {
        // order.a <-> myorder['order.a']
        const fromStore = new AutoStore({
            order: {
                a: 1, b: 2, c: 3,
            },
            user: {
                tags: ['x', 'y', 'z']
            }
        })
        const toStore = new AutoStore({
            myorder: {}
        })
        fromStore.sync(toStore, {
            to: "myorder",
            pathMap: {
                toRemote: (path: string[], value: any) => {
                    if (typeof (value) !== 'object') {
                        return [path.join(".")]
                    }
                },
                toLocal: (path: string[], value: any) => {
                    if (typeof (value) !== 'object') {
                        return path.reduce<string[]>((result, cur) => {
                            result.push(...cur.split("."))
                            return result
                        }, [])
                    }
                }
            }
        })
        expect(toStore.state).toEqual({
            myorder: {
                'order.a': 1,
                'order.b': 2,
                'order.c': 3,
                'user.tags.0': 'x',
                'user.tags.1': 'y',
                'user.tags.2': 'z'
            }
        })

        fromStore.state.order.a = 11
        fromStore.state.order.b = 12
        fromStore.state.order.c = 13

        expect(toStore.state).toEqual({
            myorder: {
                'order.a': 11,
                'order.b': 12,
                'order.c': 13,
                'user.tags.0': 'x',
                'user.tags.1': 'y',
                'user.tags.2': 'z'
            }
        })
        // @ts-ignore
        toStore.state.myorder['order.a'] = 21
        // @ts-ignore
        toStore.state.myorder['order.b'] = 22
        // @ts-ignore
        toStore.state.myorder['order.c'] = 23

        expect(fromStore.state).toEqual({
            order: {
                a: 21, b: 22, c: 23
            },
            user: {
                tags: ['x', 'y', 'z']
            }
        })
    })
    test("只有将configable的数据同步到远程", async () => {
        // order.a <-> myorder['order.a']
        const fromStore = new AutoStore({
            order: {
                a: 1, b: configurable(2), c: 3,
            },
            user: {
                tags: ['x', configurable('y'), 'z']
            }
        }, { id: "local" })
        const toStore = new AutoStore({
            myorder: {}
        }, { id: "remote" })
        const filter = (path: string[], value: any) => {
            const keyPath = path.join(".")
            return fromStore.schemas.has(keyPath)
        }
        fromStore.sync(toStore, {
            to: "myorder",
            filter,
            pathMap: {
                toRemote: (path: string[], value: any) => {
                    if (typeof (value) !== 'object') {
                        return [path.join(".")]
                    }
                },
                toLocal: (path: string[], value: any) => {
                    if (typeof (value) !== 'object') {
                        return path.reduce<string[]>((result, cur) => {
                            result.push(...cur.split("."))
                            return result
                        }, [])
                    }
                }
            }
        })
        expect(toStore.state).toEqual({
            myorder: {
                'order.b': 2,
                'user.tags.1': 'y'
            }
        })

        fromStore.state.order.a = 11
        fromStore.state.order.b = 12
        fromStore.state.order.c = 13

        expect(toStore.state).toEqual({
            myorder: {
                'order.b': 12,
                'user.tags.1': 'y'
            }
        })
        // @ts-ignore
        toStore.state.myorder['order.b'] = 22
        // @ts-ignore
        toStore.state.myorder['user.tags.1'] = 'yy'

        expect(fromStore.state).toEqual({
            order: {
                a: 11, b: 22, c: 13
            },
            user: {
                tags: ['x', 'yy', 'z']
            }
        })
    })
})
