/**
 * 
 *  动态参数的创建计算属性
 * 
 * 
 */



import { test,expect, describe, beforeAll,vi } from "vitest"
import { createStore,ComputedScopeRef,computed, IStore } from "../.."



describe("动态创建同步择计算属性",()=>{

    test("创建同步计算属性提供默认值",()=>{
        return new Promise<void>(resolve=>{
            const store = createStore({
                price:2,
                count:3
            })
            const obj = store._createComputed((scope:any)=>{
                return scope.price * scope.count
            })
            expect(obj.value).toBe(6)            
            resolve()
        }) 
    })
    test("动态创建的同步计算对象-默认没有保存计算对象引用",()=>{
        return new Promise<void>(resolve=>{
            const store = createStore({
                price:2,
                count:3
            })
            const obj = store._createComputed<number>((scope:any)=>{
                return scope.price * scope.count
            })
            expect(obj.value).toBe(6)             
            expect(store.computedObjects.size).toBe(0)  
            expect(store.computedObjects.has(obj.id)).toBe(false)
            resolve()
        }) 
    })
    test("动态创建的同步计算对象，指定保存计算对象引用",()=>{
        return new Promise<void>(resolve=>{
            const store = createStore({
                price:2,
                count:3
            })
            const obj = store._createComputed<number>((scope:any)=>{
                return scope.price * scope.count
            },{id:"x",save:true})
            expect(obj.value).toBe(6)             
            expect(store.computedObjects.size).toBe(1)  
            expect(store.computedObjects.has(obj.id)).toBe(true)
            resolve()
        }) 
    })

    test("创建同步计算对象然后删除",()=>{
        return new Promise<void>(resolve=>{
            const store = createStore({
                price:2,
                count:3
            })
            const obj = store._createComputed((scope:any)=>{
                return scope.price * scope.count
            })
            expect(obj.value).toBe(6)    
            resolve()
        }) 
    })
    test("动态计算属性依赖变化时自动更新",()=>{
        return new Promise<void>(resolve=>{
            const store = createStore({
                price:2,
                count:3
            })
            const obj = store._createComputed((scope:any)=>{
                return scope.price * scope.count
            })
            expect(obj.value).toBe(6)            
            resolve()
        }) 
    })

})



describe("动态创建异步计算属性",()=>{

    test("创建异步计算属性提供默认值",()=>{
        const fn = vi.fn()
        return new Promise<void>(resolve=>{
            const store = createStore({
                price:2,
                count:3
            })
            store.on("computed:created",()=>{            
                expect(obj.value.result).toBe(10)      
                expect(fn).not.toBeCalled()
                resolve()
            })
            const obj = store._createComputed(async ()=>{
                fn()
                return 1
            },["price","count"],{
                initial:10,
                // 禁止立即执行，这样仅当依赖变化时才会执行，所以initial值才会生效，否则会被计算值覆盖
                immediate:false     
            })
        }) 
    })
    test("动态创建的异步计算对象-默认没有保存计算对象引用",()=>{
        return new Promise<void>(resolve=>{
            const store = createStore({
                price:2,
                count:3
            })
            const obj = store._createComputed<number>(async (scope:any)=>{
                return scope.price * scope.count
            },["price","count"],{id:"x"})
            store.on("computed:created",()=>{                               
                expect(store.computedObjects.size).toBe(0)  
                expect(store.computedObjects.has(obj.id)).toBe(false)
                resolve()      
            })       
        }) 
    })
    test("动态创建的异步计算对象，指定保存计算对象引用",()=>{
        return new Promise<void>(resolve=>{
            const store = createStore({
                price:2,
                count:3
            })
            store.on("computed:created",()=>{                
                expect(store.computedObjects.size).toBe(1)  
                expect(store.computedObjects.has(obj.id)).toBe(true)
                resolve()})
            const obj = store._createComputed<number>(async (scope:any)=>{
                return scope.price * scope.count
            },["price","count"],{id:"x",save:true})            
        }) 
    })
    test("动态异步计算属性初始化时自动执行一次",()=>{
        return new Promise<void>(resolve=>{
            const store = createStore({
                price:2,
                count:3
            })
            store.on("computed:done",()=>{       
                expect(obj.value.result).toBe(6)  
                resolve()
            })
            const obj = store._createComputed(async (scope:any)=>{
                return scope.price * scope.count
            },["price","count"]) 
            // store.setState((draft)=>draft.count = 4)
        }) 
    })

    test("动态异步计算属性初始化时会执行一次计算",()=>{
        let results:number[]= []
        return new Promise<void>(resolve=>{
            const store = createStore({
                price:2,
                count:3
            })
            store.on("computed:done",()=>{     
                expect(obj.value.result).toBe(6)
                resolve()
            })
            const obj = store._createComputed(async (scope:any)=>{
                return scope.price * scope.count
            },["price","count"])  
                
        }) 
    })
    
    test("动态异步计算属性所依赖的数据发生变化时会重新计算",()=>{
        let results:number[]= []
        return new Promise<void>(resolve=>{
            const store = createStore({
                price:2,
                count:3
            })
            store.on("computed:done",({value})=>{     
                results.push(value)
                if(results.length===3){
                    expect(results).toEqual([6,8,12])
                    resolve()
                }
            })
            const obj = store._createComputed(async (scope:any)=>{
                return scope.price * scope.count
            },["price","count"])  
                
           store.setState((draft)=>draft.count = 4)
           store.setState((draft)=>draft.price = 3)            
        }) 
    })



})