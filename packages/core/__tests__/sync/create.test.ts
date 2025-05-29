/**
 * 
 *  动态参数的创建计算属性
 * 
 * 
 */



import { test, expect, describe, } from "vitest"
import { AutoStore } from "../../src"


describe("动态创建同步择计算属性", () => {

    test("创建同步计算属性提供默认值", () => {
        return new Promise<void>(resolve => {
            const store = new AutoStore({
                price: 2,
                count: 3
            })
            const obj = store.computedObjects.create((state: any) => {
                return state.price * state.count
            })
            expect(obj.value).toBe(6)
            resolve()
        })
    })
    test("创建同步计算属性时指定scope", () => {
        return new Promise<void>(resolve => {
            const store = new AutoStore({
                order: {
                    price: 2,
                    count: 3
                }
            })
            const obj = store.computedObjects.create((order: any) => {
                return order.price * order.count
            }, {
                scope: "order"
            })
            expect(obj.value).toBe(6)
            resolve()
        })
    })
    test("动态创建的同步计算对象-默认保存计算对象引用", () => {
        return new Promise<void>(resolve => {
            const store = new AutoStore({
                price: 2,
                count: 3
            })
            const obj = store.computedObjects.create<number>((state: any) => {
                return state.price * state.count
            })
            expect(obj.value).toBe(6)
            expect(store.computedObjects.size).toBe(1)
            expect(store.computedObjects.has(obj.id)).toBe(true)
            resolve()
        })
    })
    test("动态创建的同步计算对象，不保存计算对象引用", () => {
        return new Promise<void>(resolve => {
            const store = new AutoStore({
                price: 2,
                count: 3
            })
            const obj = store.computedObjects.create<number>((state: any) => {
                return state.price * state.count
            }, { id: "x", objectify: false })
            expect(obj.value).toBe(6)
            expect(store.computedObjects.size).toBe(0)
            expect(store.computedObjects.has(obj.id)).toBe(false)
            resolve()
        })
    })

    test("创建同步计算对象然后删除", () => {
        return new Promise<void>(resolve => {
            const store = new AutoStore({
                price: 2,
                count: 3
            })
            const obj = store.computedObjects.create((state: any) => {
                return state.price * state.count
            })
            expect(obj.value).toBe(6)
            store.computedObjects.delete(obj.id)
            expect(store.computedObjects.size).toBe(0)
            expect(obj.associated).toBe(false)
            store.state.count = 4
            expect(obj.value).toBe(6) // 当对象被删除后，不再计算
            resolve()
        })
    })


    test("动态计算属性依赖变化时自动更新", () => {
        return new Promise<void>(resolve => {
            const store = new AutoStore({
                price: 2,
                count: 3
            })
            const obj = store.computedObjects.create((state: any) => {
                return state.price * state.count
            })
            expect(obj.value).toBe(6)
            store.state.count = 4
            expect(obj.value).toBe(8)
            resolve()
        })
    })

    test("侦听动态计算属性的变更事件", () => {
        return new Promise<void>(resolve => {
            const store = new AutoStore({
                price: 2,
                count: 3
            })
            const obj = store.computedObjects.create((state: any) => {
                return state.price * state.count
            })
            obj.watch(({ value }) => {
                expect(value).toBe(8)
                resolve()
            })
            store.state.count = 4
        })
    })

})
