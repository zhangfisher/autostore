import { test, describe, expect } from 'vitest';
import { AutoStore, computed } from '../src';
import { createShadow } from '../src/store/shadow';
import { getAsyncValue } from '../src/utils/getAsyncValue';

const delay = (ms: number = 100) => new Promise(resolve => setTimeout(resolve, ms));

// 测试 isPathMatched 函数
describe("create shadow store", () => {

    test("创建Shadow store的同步计算属性", () => {
        const store = new AutoStore({
            order: {
                price: 10,
                count: 3,
                total: computed((scope: any) => scope.price * scope.count)
            }
        })
        const shadowStore = createShadow(store, {
            orderTotal: computed((scope: any) => {
                return scope.order.price * scope.order.count
            })
        })
        expect(shadowStore.state.orderTotal).toBe(30)
        store.state.order.count = 4
        expect(shadowStore.state.orderTotal).toBe(40)
    })
    test("监听Shadow store的同步计算属性", () => {
        const store = new AutoStore({
            order: {
                price: 10,
                count: 3,
                total: computed((scope: any) => scope.price * scope.count)
            }
        })
        const shadowStore = createShadow(store, {
            orderTotal: computed((scope) => {
                return scope.order.price * scope.order.count
            })
        })
        let values: any[] = []
        shadowStore.watch('orderTotal', (operate) => {
            values.push(operate.value)
        })
        expect(shadowStore.state.orderTotal).toBe(30)
        store.state.order.count = 4
        expect(shadowStore.state.orderTotal).toBe(40)
        expect(values).toEqual([40])
    })

    test("创建Shadow store的异步计算属性", async () => {
        const store = new AutoStore({
            order: {
                price: 10,
                count: 3,
                total: computed((scope: any) => scope.price * scope.count)
            }
        })
        const shadowStore = createShadow(store, {
            orderTotal: computed(async (scope: any) => {
                return scope.order.price * scope.order.count
            }, ['order.price', 'order.count'])
        })
        await delay()
        expect(shadowStore.state.orderTotal.value).toBe(30)
        store.state.order.count = 4
        await delay()
        expect(shadowStore.state.orderTotal.value).toBe(40)
    })
})