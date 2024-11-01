/**
 * 
 *  动态参数的创建计算属性
 * 
 * 
 */



import { test,expect, describe } from "vitest"
import { AsyncComputedObject } from "../../src/computed/async"
import { AutoStore } from "../../src"


describe("动态创建异步计算属性",()=>{

    test("创建异步计算属性提供默认值",()=>{
        return new Promise<void>(resolve=>{
            const store = new AutoStore({
                price:2,
                count:3
            },{lazy:false,})
            const obj = store.computedObjects.create<number>(async (order:any)=>{
                return order.price * order.count
            },["price","count"])
            store.on("computed:done",()=>{
                expect(obj.value.value).toBe(6)
                resolve()
            })
        }) 
    })
    test("动态创建的异步计算对象-默认保存计算对象引用",()=>{
        return new Promise<void>(resolve=>{
            const store = new AutoStore({
                price:2,
                count:3
            },{
                lazy:false,
                onComputedCreated:()=>{
                    expect(store.computedObjects.size).toBe(1)  
                    expect(store.computedObjects.has('x')).toBe(true)
                    resolve()   
                }
            })
            store.computedObjects.create<number>(async (scope:any)=>{
                return scope.price * scope.count
            },["price","count"],{id:"x"}) 
        }) 
    })
    test("动态创建的异步计算对象，不保存计算对象实例",()=>{
        return new Promise<void>(resolve=>{
            const store = new AutoStore({
                price:2,
                count:3
            },{
                lazy:false,
                onComputedCreated:()=>{
                    expect(store.computedObjects.size).toBe(0)  
                    expect(store.computedObjects.has('x')).toBe(false)
                    resolve()   
                }
            }) 
            store.computedObjects.create<number>(async (scope:any)=>{
                return scope.price * scope.count
            },["price","count"],{id:"x",objectify:false})            
        }) 
    })
    test("动态异步计算属性初始化时自动执行一次",()=>{
        return new Promise<void>(resolve=>{
            let obj:AsyncComputedObject
            const store = new AutoStore({
                price:2,
                count:3
            },{
                lazy:false,
                onComputedDone:({value})=>{
                    expect(value).toBe(6)
                    expect(obj.value.value).toBe(6)
                    resolve()
                }
            }) 
            obj = store.computedObjects.create(async (scope:any)=>{
                return scope.price * scope.count
            },["price","count"]) 
        }) 
    })
    
    test("动态异步计算属性所依赖的数据发生变化时会重新计算",()=>{
        let results:number[]= []
        return new Promise<void>(resolve=>{
            const store = new AutoStore({
                price:2,
                count:3
            },{ 
                lazy:false,
                onComputedDone:({value})=>{     
                    results.push(value)
                    if(results.length===2){
                        expect(results).toEqual([6,8])
                        resolve()
                    }
                    }
                }
            )
            store.computedObjects.create(async (scope:any)=>{
                return scope.price * scope.count
            },["price","count"])        
            setTimeout(()=>{            
                store.state.count = 4       
            },0)
        }) 
    })

    // test("侦听动态异步计算属性的变更事件",()=>{
    //     return new Promise<void>(resolve=>{
    //         const store = new AutoStore({
    //             price:2,
    //             count:3
    //         })
    //         const obj = store.computedObjects.create(async (state:any)=>{
    //             return state.price * state.count
    //         },["price","count"],{initial:6})
    //         obj.watch(({value,type})=>{
    //             expect(value).toStrictEqual(obj.value)
    //             expect(type).toBe("set")
    //             resolve()
    //         })
    //         store.state.count = 4
    //     }) 
    // })

})