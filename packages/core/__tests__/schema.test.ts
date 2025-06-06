import { describe, expect, test } from 'vitest';
import { configurable, s } from '../src/schema'
import { AutoStore, StateOperate } from '../src/store';
import { computed, setVal, ValidateError } from '../src';


describe("validator", () => {

    test("number initial", () => {
        const store = new AutoStore({
            order: {
                price: s.number(100, (val) => val > 10)
            }
        })
        expect(store.state.order.price).toBe(100)
        store.schemas.has("order.price")
    })
    test("赋值时校验出错默认触发ValidateError", () => {
        const store = new AutoStore({
            order: {
                price: s.number(100, (val) => val > 10)
            }
        })
        expect(store.state.order.price).toBe(100)
        expect(() => store.state.order.price = 10).toThrow(ValidateError)
        expect(store.state.order.price).toBe(100)
    })

    test("赋值时校验出错时不触发错误忽略", () => {
        const store = new AutoStore({
            order: {
                price: s.number(100, (val) => val > 10)
            }
        }, {
            defaultValueSchema: {
                behavior: 'ignore'
            }
        })
        expect(store.state.order.price).toBe(100)
        expect(() => store.state.order.price = 10).not.toThrow(ValidateError)
        expect(store.state.order.price).toBe(100)
    })

    test("赋值时校验出错时不触发错误放行", () => {
        const store = new AutoStore({
            order: {
                price: s.number(100, (val) => val > 10)
            }
        }, {
            defaultValueSchema: {
                behavior: 'pass'
            }
        })
        expect(store.state.order.price).toBe(100)
        expect(() => store.state.order.price = 10).not.toThrow(ValidateError)
        expect(store.state.order.price).toBe(10)
        expect("order.price" in store.schemas.errors).toBe(true)
    })
    test("自定义校验提示", () => {
        const store = new AutoStore({
            order: {
                price: s.number(100, (val) => val > 10, { errorTips: "价格必须大于10" })
            }
        })
        expect(store.state.order.price).toBe(100)
        store.schemas.has("order.price")
        try {
            store.state.order.price = 10

        } catch (e: any) {
            expect(e).toBeInstanceOf(ValidateError)
            expect(e.message).toBe("价格必须大于10")
            expect(store.schemas.errors["order.price"]).toBe("价格必须大于10")
        }
    })
    test("自定义校验提示", () => {
        const store = new AutoStore({
            order: {
                price: s.number(100, (val) => val > 10, "价格必须大于10")
            }
        })
        expect(store.state.order.price).toBe(100)
        store.schemas.has("order.price")
        try {
            store.state.order.price = 10

        } catch (e: any) {
            expect(e).toBeInstanceOf(ValidateError)
            expect(e.message).toBe("价格必须大于10")
            expect(store.schemas.errors["order.price"]).toBe("价格必须大于10")
        }
    })
    test("使用函数自定义校验提示", () => {
        const store = new AutoStore({
            order: {
                price: s.number(100, (val) => val > 10, { errorTips: (path: string) => path + ":价格必须大于10" })
            }
        })
        expect(store.state.order.price).toBe(100)
        store.schemas.has("order.price")
        try {
            store.state.order.price = 10

        } catch (e: any) {
            expect(e).toBeInstanceOf(ValidateError)
            expect(e.message).toBe("order.price:价格必须大于10")
            expect(store.schemas.errors["order.price"]).toBe("order.price:价格必须大于10")
        }
    })
    test("使用onValidate校验", () => {
        const store = new AutoStore({
            order: {
                price: 100
            }
        }, {
            onValidate: (path, newVal, oldVal) => {
                expect(path).toEqual(["order", "price"])
                expect(newVal).toBe(10)
                expect(oldVal).toBe(100)
                return newVal > 10
            }
        })
        expect(store.state.order.price).toBe(100)
        try {
            store.state.order.price = 5
        } catch (e: any) {
            expect(e).toBeInstanceOf(ValidateError)
            expect("order.price" in store.schemas.errors).toBe(true)
        }
    })

    test("configurable状态时提供默认值", () => {
        const store = new AutoStore({
            order: {
                name: configurable("order"),
                price: configurable(10),
                count: configurable(2),
                pay: configurable(true)
            }
        })
        expect(store.state.order.name).toBe("order")
        expect(store.state.order.price).toBe(10)
        expect(store.state.order.count).toBe(2)
        expect(store.state.order.pay).toBe(true)

    })
    test("监听使用schema装饰的值变化", () => {
        return new Promise<void>((resolve, reject) => {
            const store = new AutoStore({
                order: {
                    price: s.number(100, (val) => val > 10)
                }
            })
            store.watch((operate: StateOperate) => {
                expect(operate.path).toEqual(["order", "price"])
                expect(operate.value).toBe(101)
                resolve()
            })
            setVal(store.state, ["order", "price"], 101)
            // store.state.order.price = 101
        })
    })
    test("schema数据是一个计算函数", () => {
        return new Promise<void>((resolve, reject) => {
            const store = new AutoStore({
                order: {
                    price: configurable(10),
                    visiable: configurable(true, {
                        enable: computed((state) => {
                            return state.order.price > 20 as boolean
                        })
                    })
                }
            })
            store.on('schema:updated', (schema) => {
                expect(schema.enable).toBe(true)
            })
            const schmea = store.schemas.get("order.visiable")!
            expect(schmea.enable).toBe(false)
            setVal(store.state, ["order", "price"], 101)
            expect(schmea.enable).toBe(true)
            resolve()
        })
    })
    test("schema数据是一个异步计算函数", () => {
        return new Promise<void>((resolve, reject) => {
            const store = new AutoStore({
                order: {
                    price: configurable(10),
                    visiable: configurable(true, {
                        enable: computed(async (state) => {
                            await new Promise((resolve) => setTimeout(resolve, 10))
                            return state.order.price > 20
                        }, ['order.price'], {
                            initial: false
                        })
                    })
                }
            })
            const values: any[] = []
            store.on("schema:updated", (schema) => {
                values.push((schema.enable as any).value)
            })

            const schmea = store.schemas.get("order.visiable")!

            setVal(store.state, ["order", "price"], 101)
            setTimeout(() => {
                expect(schmea.enable.value).toBe(true)
                resolve()
            }, 200)

        })
    })
})

