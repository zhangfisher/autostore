/* eslint-disable @typescript-eslint/no-unused-vars */
import { describe, expect, test } from "vitest"
import { computed, AutoStore } from '../../../core/src';
import "..";


describe("本地Store克隆同步", () => {

    describe("克隆Store", () => {
        test("整体克隆", async () => {
            const store = new AutoStore({
                order: {
                    name: "fisher",
                    price: 2,
                    count: 3
                }
            })
            const toStore = await store.clone()
            expect(toStore.getSnap()).toEqual(store.getSnap())
        })
        test("克隆部份", async () => {
            const store = new AutoStore({
                order: {
                    name: "fisher",
                    price: 2,
                    count: 3
                }
            })
            const toStore = await store.clone({ entry: "order" })
            expect(toStore.getSnap()).toEqual(store.getSnap({ entry: "order" }))
        })
    })

    describe("Sync to cloned store", () => {
        test("克隆并且同步两个Store", async () => {
            const store = new AutoStore({
                order: {
                    name: "fisher",
                    price: 2,
                    count: 3,
                    total: computed((order) => order.price * order.count)
                }
            })
            const toStore = await store.clone()
            expect(toStore.getSnap()).toEqual(store.getSnap())
            store.state.order.price = 10
            expect(toStore.state.order.price).toBe(10)
            toStore.state.order.price = 11
            expect(store.state.order.price).toBe(11)
        })
        test("克隆部分并且同步", async () => {
            const store = new AutoStore({
                order: {
                    name: "fisher",
                    price: 2,
                    count: 3
                }
            })
            const toStore = await store.clone({ entry: "order" })
            expect(toStore.getSnap()).toEqual(store.getSnap({ entry: "order" }))
            store.state.order.price = 10
            expect(toStore.state.price).toBe(10)
            toStore.state.price = 11
            expect(store.state.order.price).toBe(11)
        })
        test("整体克隆时同步计算属性", async () => {
            const store = new AutoStore({
                order: {
                    name: "fisher",
                    price: 2,
                    count: 3,
                    total: computed((order) => order.price * order.count)
                }
            })
            const toStore = await store.clone()
            expect(toStore.getSnap()).toEqual(store.getSnap())
            store.state.order.price = 10
            expect(toStore.state.order.price).toBe(10)
            expect(toStore.state.order.total).toBe(30)
            toStore.state.order.price = 11
            expect(store.state.order.price).toBe(11)
            expect(store.state.order.total).toBe(33)
        })
        test("同步数组成员", async () => {
            const store = new AutoStore({
                order: {
                    tags: ["a", "b", "c"]
                }
            })
            const toStore = await store.clone()
            expect(toStore.getSnap()).toEqual(store.getSnap())
            store.state.order.tags[1] = "*"
            expect(toStore.state.order.tags[1]).toBe("*")
            toStore.state.order.tags[1] = "b"
            expect(store.state.order.tags[1]).toBe("b")
        })
        test("删除数组成员", async () => {
            const store = new AutoStore({
                order: {
                    tags: ["a", "b", "c", "d"]
                }
            })
            const toStore = await store.clone()
            expect(toStore.getSnap()).toEqual(store.getSnap())
            store.state.order.tags.splice(1, 1)
            expect(toStore.state.order.tags).toEqual(["a", "c", "d"])
            toStore.state.order.tags.splice(1, 1)
            expect(store.state.order.tags).toEqual(["a", "d"])
        })

        test("同步删除多个数组成员", async () => {
            const store = new AutoStore({
                order: {
                    tags: Array.from({ length: 10 }).map((_, i) => i + 1),
                }
            })
            const toStore = await store.clone()
            expect(toStore.getSnap()).toEqual(store.getSnap())
            store.state.order.tags.splice(5, 3)
            expect(toStore.state.order.tags).toEqual([1, 2, 3, 4, 5, 9, 10])
            toStore.state.order.tags.splice(2, 2)
            expect(store.state.order.tags).toEqual([1, 2, 5, 9, 10])
        })
        test("克隆部分时删除数组成员", async () => {
            const store = new AutoStore({
                order: {
                    tags: ["a", "b", "c", "d"]
                }
            })
            const toStore = await store.clone({ entry: "order" })
            expect(toStore.getSnap()).toEqual(store.getSnap({ entry: "order" }))
            store.state.order.tags.splice(1, 1)
            expect(toStore.state.tags).toEqual(["a", "c", "d"])
            toStore.state.tags.splice(1, 1)
            expect(store.state.order.tags).toEqual(["a", "d"])
        })

        test("克隆部分时同步删除多个数组成员", async () => {
            const store = new AutoStore({
                order: {
                    tags: Array.from({ length: 10 }).map((_, i) => i + 1),
                }
            })
            const toStore = await store.clone({ entry: "order" })
            expect(toStore.getSnap()).toEqual(store.getSnap({ entry: "order" }))
            store.state.order.tags.splice(5, 3)
            expect(toStore.state.tags).toEqual([1, 2, 3, 4, 5, 9, 10])
            toStore.state.tags.splice(2, 2)
            expect(store.state.order.tags).toEqual([1, 2, 5, 9, 10])
        })
        test("删除对象成员", async () => {
            type OrderType = {
                order: {
                    a?: number
                    b?: number
                    c?: number
                    d?: number
                    e?: number
                }
            }
            const store = new AutoStore<OrderType>({
                order: {
                    a: 1,
                    b: 2,
                    c: 3,
                    d: 4,
                    e: 5
                }
            })
            const toStore = await store.clone()
            expect(toStore.getSnap()).toEqual(store.getSnap())
            delete store.state.order.a
            expect(toStore.state.order).toEqual({ b: 2, c: 3, d: 4, e: 5 })
            delete toStore.state.order.b
            expect(store.state.order).toEqual({ c: 3, d: 4, e: 5 })
            delete toStore.state.order.c
            expect(store.state.order).toEqual({ d: 4, e: 5 })
            delete toStore.state.order.d
            expect(store.state.order).toEqual({ e: 5 })
            delete toStore.state.order.e
            expect(store.state.order).toEqual({})

        })
    })
})
