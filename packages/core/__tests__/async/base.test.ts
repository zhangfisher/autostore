import { test, expect, describe, vi } from "vitest"
import { AutoStore, computed, ComputedObject } from "../../src"
import { delay } from "flex-tools/async/delay"
import { AsyncComputedObject } from "../../src/computed/async"

describe("所有异步计算基础功能", () => {

    describe("异步计算的基础功能", () => {

        test("异步计算的默认值", () => {
            return new Promise<void>((resolve) => {
                const store = new AutoStore({
                    price: 2,
                    count: 3,
                    total: computed(async (scope) => {
                        return scope.price * scope.count
                    }, ['price', 'count'])
                }, {                  // 遍历对象，从而导致计算属性被读取而立刻创建
                    onComputedDone: () => {  // 计算完成时触发                        
                        expect(store.state.total.value).toEqual(6)
                        resolve()
                    }
                })
            })
        })

        test("默认异步计算", () => {
            let count: number = 0
            let results: number[] = []
            return new Promise<void>((resolve) => {
                const store = new AutoStore({
                    price: 2,
                    count: 3,
                    total: computed(async (scope) => {
                        count++
                        return scope.price * scope.count
                    }, ['price', 'count'])
                }, {                  // 遍历对象，从而导致计算属性被读取而立刻创建
                    lazy: false,
                    onComputedDone: () => {  // 计算完成时触发
                        results.push(store.state.total.value)
                        if (results.length === 2) {
                            expect(count).toBe(2)
                            expect(results).toEqual([8, 8])
                            resolve()
                        }
                    }
                })
                store.state.count = 4
            })
        })

        test("从异步对象实例读取计算值", () => {
            return new Promise<void>((resolve) => {
                const store = new AutoStore({
                    price: 2,
                    count: 3,
                    total: computed(async (scope) => {
                        return scope.price * scope.count
                    }, ['price', 'count'], { id: "x" })
                }, {
                    lazy: false,
                    onComputedDone: () => {
                        const cobj = store.computedObjects.get("x")!
                        expect(cobj.value.value).toBe(6)
                        resolve()
                    }
                })
            })
        })
        test("当提供异步计算属性的默认值时不会触发初始计算", () => {
            let count: number = 0
            return new Promise<void>((resolve) => {
                const store = new AutoStore({
                    price: 2,
                    count: 3,
                    total: computed(async (scope) => {
                        count++
                        return scope.price * scope.count
                    }, ['price', 'count'], {
                        id: "x",
                        initial: 6
                    })
                }, { lazy: false, })
                setTimeout(() => {
                    const cobj = store.computedObjects.get("x")!
                    expect(cobj.value.value).toBe(6)
                    expect(count).toBe(0) // 提供转让 
                    resolve()
                }, 0)
            })
        })
        test("当提供异步计算属性的默认值并且显示指定immediate为true时总会触发初始计算", () => {
            let count: number = 0
            return new Promise<void>((resolve) => {
                const store = new AutoStore({
                    price: 2,
                    count: 3,
                    total: computed(async (scope) => {
                        count++
                        return scope.price * scope.count
                    }, ['price', 'count'], {
                        id: "x",
                        initial: 6,
                        immediate: true
                    })
                }, {
                    lazy: false,
                    onComputedDone: () => {
                        const cobj = store.computedObjects.get("x")!
                        expect(cobj.value.value).toBe(6)
                        expect(count).toBe(1) // 提供转让 
                        resolve()
                    }
                })
                expect(store.state.total.value).toBe(6)
            })
        })

        test("异步计算生成异步计算数据对象", () => {
            return new Promise<void>((resolve) => {
                const store = new AutoStore({
                    price: 2,
                    count: 3,
                    total: computed(async (scope) => {
                        return scope.price * scope.count
                    }, ['price', 'count'])
                }, {
                    onComputedCreated: () => {
                        setTimeout(() => {
                            expect("value" in store.state.total).toBe(true)
                            expect("error" in store.state.total).toBe(true)
                            expect("loading" in store.state.total).toBe(true)
                            expect("retry" in store.state.total).toBe(true)
                            expect("run" in store.state.total).toBe(true)
                            expect("cancel" in store.state.total).toBe(true)
                            expect("progress" in store.state.total).toBe(true)
                            expect("timeout" in store.state.total).toBe(true)
                            resolve()
                        })
                    }
                })
            })
        })

        test("创建计算对象实例", () => {
            return new Promise<void>((resolve) => {
                const store = new AutoStore({
                    price: 2,
                    count: 3,
                    total: computed(async (scope) => {
                        return scope.price * scope.count
                    }, ['price', 'count'], { id: 'x' })
                }, {
                    onComputedCreated: (computedObject) => {
                        setTimeout(() => {
                            expect(store.computedObjects.has('x')).toBe(true)
                            expect(computedObject.id).toBe("x")
                            expect(computedObject).toBeInstanceOf(ComputedObject)
                            const obj = store.computedObjects.get("x")!
                            expect(computedObject).toBe(obj)
                            expect(obj).toBeInstanceOf(ComputedObject)
                            expect(obj.id).toBe("x")
                            expect(obj.enable).toBe(true)
                            expect(obj.depends).toEqual([["price"], ["count"]])
                            expect(obj.path).toEqual(['total'])
                            resolve()
                        })
                    }
                })
            })
        })

        test("全局控制启用与停止计算", () => {
            let count = 0
            return new Promise<void>((resolve) => {
                const store = new AutoStore({
                    price: 2,
                    count: 3,
                    total: computed(async (scope) => {
                        count++
                        return scope.price * scope.count
                    }, ['price', 'count'], { id: 'x', initial: 6 })
                }, {
                    enableComputed: false,
                    lazy: false,
                    onComputedDone: () => {
                        expect(count).toBe(1)
                        resolve()
                    }
                })
                store.state.count = 4
                store.state.count = 5
                store.state.count = 4
                store.state.count = 5
                store.computedObjects.enable = true
                store.state.count = 100
            })
        })
        test("单独控制计算属性的启用与停止计算", () => {
            return new Promise<void>((resolve) => {
                const store = new AutoStore({
                    price: 2,
                    count: 3,
                    total1: computed(async (scope) => {
                        return scope.price * scope.count
                    }, ['price', 'count'], { id: 'x', enable: false, initial: 100 }),
                    total2: computed(async (scope) => {
                        return scope.price * scope.count
                    }, ['price', 'count'], { id: 'y', initial: 200 })
                }, {
                    lazy: false,
                    onComputedDone: ({ path }) => {
                        expect(path).toStrictEqual(["total2"])
                        expect(store.state.total1.value).toBe(100)
                        expect(store.state.total2.value).toBe(8)
                        resolve()
                    }
                })
                store.state.count = 4
            })
        })
        test("通过计算属性对象手动执行计算函数", () => {
            let count = 0
            return new Promise<void>((resolve) => {
                const store = new AutoStore({
                    price: 2,
                    count: 3,
                    total: computed(async (scope, { extras }) => {
                        if (extras !== undefined) expect(extras).toBe("hello")
                        return scope.price * scope.count
                    }, ['price', 'count'], { id: 'x' }),
                }, {
                    lazy: false,
                    onComputedDone: () => {
                        count++
                        if (count === 2) { // 第一次是创建时执行，第二次是手动执行
                            resolve()
                        }
                    }
                })
                store.computedObjects.get("x")!.run({ extras: "hello" })
            })
        })
        test("异步计算属性的计算执行次数，初始化时执行一次", () => {
            return new Promise<void>((resolve) => {
                const store = new AutoStore({
                    price: 2,
                    count: 3,
                    total: computed(async (scope) => {
                        return scope.price * scope.count
                    }, ['price', 'count'], { id: 'x' }),
                }, {
                    lazy: false,
                    onComputedDone: () => {
                        resolve()
                    }
                })
                store.state.total   // 创建计算属性时，会立即执行一次计算函数 
            })
        })

        test("手动执行异步计算属性的计算函数", () => {
            return new Promise<void>((resolve) => {
                const store = new AutoStore({
                    price: 2,
                    count: 3,
                    total: computed(async (scope) => {
                        return scope.price * scope.count
                    }, ['price', 'count'], { id: 'x', immediate: false }),
                }, { lazy: false })
                const asyncObj = store.computedObjects.get("x")! as AsyncComputedObject
                asyncObj.run().then(() => {
                    expect(store.state.total.value).toBe(6)
                    resolve()
                })
            })
        })
        test("手动传参覆盖默认的异步计算属性参数，然后运行", () => {
            return new Promise<void>((resolve) => {
                const store = new AutoStore({
                    price: 2,
                    count: 3,
                    total: computed(async (price) => {
                        expect(price).toBe(2)
                        return price * 100
                    }, ['price', 'count'], { id: 'x', immediate: false }),
                }, { lazy: false })
                const asyncObj = store.computedObjects.get("x")! as AsyncComputedObject
                asyncObj.run({ scope: "price" }).then(() => {
                    //// 运行时修改的scope仅在本次运行中有效，不会影响到下次运行
                    // 默认的scope没有配置是undefined,指向的是当前对象,
                    expect(store.state.total.value).toBe(200)
                    expect(store.computedObjects.get("x")!.options.scope).toBe(undefined)
                    resolve()
                })

            })
        })

    })


    describe("执行分组或满足条件的计算函数", () => {

        test("异步计算分组", () => {
            let results: string[] = []
            return new Promise<void>((resolve) => {
                const store = new AutoStore({
                    price: 2,
                    count: 3,
                    total1: computed(async (scope) => {
                        return scope.price * scope.count
                    }, ['price', 'count'], { group: 'a' }),
                    total2: computed(async (scope) => {
                        return scope.price * scope.count
                    }, ['price', 'count'], { group: 'a' }),
                    total3: computed(async (scope) => {
                        return scope.price * scope.count
                    }, ['price', 'count'], { group: 'b' }),
                    total4: computed(async (scope) => {
                        return scope.price * scope.count
                    }, ['price', 'count'], { group: 'b' }),
                    total5: computed(async (scope) => {
                        return scope.price * scope.count
                    }, ['price', 'count'], { group: 'c' }),
                    total6: computed(async (scope) => {
                        return scope.price * scope.count
                    }, ['price', 'count'], { group: 'c' })
                }, {               // 遍历对象，从而导致计算属性被读取而立刻创建
                    lazy: false,
                    onComputedDone: ({ computedObject }) => {
                        results.push(computedObject.path!.join(","))
                        if (results.length === 12) {
                            expect(results).toStrictEqual([
                                "total1", "total2", "total3", "total4", "total5", "total6",
                                "total1", "total2", "total3", "total4", "total5", "total6",
                            ])
                            resolve()
                        }
                    }
                })
                // 手动控制运行分组a
                store.computedObjects.runGroup("a")
                store.computedObjects.runGroup("b")
                store.computedObjects.runGroup("c")
            })
        })
        test("手动执行满足条件的计算", () => {
            let results: string[] = []
            return new Promise<void>((resolve) => {
                const store = new AutoStore({
                    price: 2,
                    count: 3,
                    total1: computed(async (scope) => {
                        return scope.price * scope.count
                    }, ['price', 'count'], { id: 'a', group: 'a', initial: 0 }),
                    total2: computed(async (scope) => {
                        return scope.price * scope.count
                    }, ['price', 'count'], { id: 'b', group: 'a', initial: 0 }),
                    total3: computed(async (scope) => {
                        return scope.price * scope.count
                    }, ['price', 'count'], { id: 'c', group: 'b', initial: 0 }),
                    total4: computed(async (scope) => {
                        return scope.price * scope.count
                    }, ['price', 'count'], { id: 'd', group: 'b', initial: 0 }),
                    total5: computed(async (scope) => {
                        return scope.price * scope.count
                    }, ['price', 'count'], { id: 'e', group: 'c', initial: 0 }),
                    total6: computed(async (scope) => {
                        return scope.price * scope.count
                    }, ['price', 'count'], { id: 'f', group: 'c', initial: 0 })
                }, {                 // 遍历对象，从而导致计算属性被读取而立刻创建，注意是创建而不是执行
                    lazy: false,
                    onComputedDone: ({ computedObject }) => {
                        results.push(computedObject.path!.join(","))
                        if (results.length === 3) {
                            expect(results).toStrictEqual([
                                "total1", "total3", "total5",
                            ])
                            resolve()
                        }
                    }
                })
                store.computedObjects.run((obj) => {
                    return ['a', 'c', 'e'].includes(obj.id)
                })
            })
        })
        test("指定超时手动执行满足条件的计算", () => {
            vi.useFakeTimers()
            return new Promise<void>((resolve) => {
                const store = new AutoStore({
                    price: 2,
                    count: 3,
                    total1: computed(async (scope) => {
                        await delay(5000)
                        return scope.price * scope.count
                    }, ['price', 'count'], { id: 'a', group: 'a', initial: 0 }),
                    total2: computed(async (scope) => {
                        await delay(5000)
                        return scope.price * scope.count
                    }, ['price', 'count'], { id: 'b', group: 'a', initial: 0 }),
                    total3: computed(async (scope) => {
                        await delay(5000)
                        return scope.price * scope.count
                    }, ['price', 'count'], { id: 'c', group: 'b', initial: 0 }),
                    total4: computed(async (scope) => {
                        await delay(5000)
                        return scope.price * scope.count
                    }, ['price', 'count'], { id: 'd', group: 'b', initial: 0 }),
                    total5: computed(async (scope) => {
                        await delay(5000)
                        return scope.price * scope.count
                    }, ['price', 'count'], { id: 'e', group: 'c', initial: 0 }),
                    total6: computed(async (scope) => {
                        await delay(5000)
                        return scope.price * scope.count
                    }, ['price', 'count'], { id: 'f', group: 'c', initial: 0 })
                }, { lazy: false })
                store.computedObjects.run((obj) => {
                    return ['a', 'c', 'e'].includes(obj.id)
                }, {}, { timeout: 200, wait: true }).catch((e) => {
                    expect(e).toBeInstanceOf(Error)
                    vi.restoreAllMocks()
                    resolve()
                })
                vi.runAllTimers()
            })
        })
    })
})