/**
 * 
 * 测试计算属性的getter的第二个参数的各项功能
 * 
 * - 不可重入
 * - 中止信号
 * - 重试
 * 
 * 
 */


import { test,expect, describe, beforeAll, vi } from "vitest"
import { createStore,computed } from "../.."
import { delay } from "flex-tools/async/delay"
import { AsyncComputedObject } from "../../src/computed/async"



describe("异步计算高级控制功能",()=>{
 
    // 注意：重入时仅会被忽略而不是产生错误
    test("控制计算函数的执行的不允许重入执行",()=>{
        let cancelCount:number =0 
        let calcCount:number = 0
        return new Promise<void>((resolve)=>{
            const store = createStore({
                price:2,
                count:3,
                total:computed(async (scope)=>{ 
                    calcCount++
                    await delay(1000)
                    return scope.price * scope.count
                },['price','count'],{ 
                    noReentry:true
                })
            },{
                onComputedCancel:()=>{
                    cancelCount++
                    if(cancelCount===9){
                        expect(calcCount).toBe(1)
                        resolve()        
                    }
                },
                onComputedCreated:()=>{
                    // 连接执行多次依赖更新,但是由于noReentry=false,所以只会执行一次，其它的会被忽略
                    setTimeout(()=>{
                        for(let i=0;i<10;i++){
                            store.state.count += i
                        }
                    })
                }
            })   
            store.state.total
        })
    })


    test("通过abortSignal来中止计算函数的执行",()=>{
        return new Promise<void>((resolve)=>{
            const fn = vi.fn()
            const store = createStore({
                price:2,
                count:3,
                total:computed(async (scope,{abortSignal})=>{ 
                    return new Promise<number>((resolve,reject)=>{
                        // 当接收到中止信号时，必须主动reject或者resolve，否则会被视为正常执行
                        abortSignal.addEventListener("abort",()=>{
                            fn()
                            reject("cancelled") 
                        })
                        // 模拟一个耗时的异步操作                        
                        setTimeout(()=>{
                            resolve(scope.count*scope.price)
                        },10 *1000)
                        
                    })	
                },['price','count'],{id:'x'})
            },{
                onComputedCancel:({reason})=>{
                    expect(reason).toBe("abort")
                    expect(fn).toHaveBeenCalled()                
                    resolve()
                },
                onComputedCreated:()=>{
                    setTimeout(()=>{
                        (store.computedObjects.get("x") as AsyncComputedObject)!.value.cancel()
                    })
                }
            })  
            store.state.total
        })
    })

    test("当执行计算函数出错时,自动重试5次",()=>{
        let count = 0
        return new Promise<void>((resolve)=>{
            const store = createStore({
                price:2,
                count:3,
                total:computed(async (scope)=>{ 
                    count++
                    if(count===6){ // 第一次执行失败，然后重试5次，共执行6次
                        resolve()
                    }else{
                        throw new Error("error")
                    }
                    return scope.price * scope.count
                },['price','count'],{id:'x',retry:5})
            })  
            store.state.total
        })
    })
    test("当执行计算函数出错时自动重试5次并且指定重试间隔",()=>{
        let count = 0
        let times:number[] = []
        return new Promise<void>((resolve)=>{
            const store = createStore({
                price:2,
                count:3,
                total:computed(async (scope)=>{ 
                    times.push(Date.now())
                    count++
                    if(count===6){
                        times.forEach((time,index)=>{
                            if(index>0){
                                expect(time-times[index-1]).toBeGreaterThanOrEqual(100)
                            }
                        })
                        resolve()
                    }else{
                        throw new Error("error")
                    }
                    return scope.price * scope.count
                },['price','count'],{id:'x',retry:[5,100]})
            })  
            store.state.total
        })
    })
    test("当执行计算函数重试5次过程中读取retry值",()=>{
        let count = 0 
        let retryValues:(number|undefined)[] = []
        return new Promise<void>((resolve)=>{
            const store = createStore({
                price:2,
                count:3,
                total:computed(async ()=>{ 
                    count++
                    throw new Error("error")
                },['price','count'],{id:'x',retry:[5,100]})
            },{
                immediate:true,
                onComputedError:()=>{
                    expect(store.state.total.retry).toBe(0)     
                    resolve()           
                }
            })  
            store.watch(['total.retry'],({value})=>{
                retryValues.push(store.state.total.retry)
                // 第一次运行出错，再重试5次，因此retry值为5,4,3,2,1,0
                if(retryValues.length===7){
                    expect(retryValues).toEqual([0,5,4,3,2,1,0])
                    expect(count).toEqual(6) 
                }
            })    
        })
    },5000000)


})


describe("异步计算属性的超时功能",()=>{
    // beforeEach(() => {
    //     vi.useFakeTimers()
    //   })
    // afterEach(() => {
    //     vi.restoreAllMocks()
    // })
    test("当执行超时的默认行为",()=>{
        // 执行时loading=true,然后超时后自动设置loading=false,error=TIMEOUT
        return new Promise<void>((resolve)=>{
            const store = createStore({
                price:2,
                count:3,
                total:computed(async (scope)=>{ 
                    await delay(500)
                    return scope.price * scope.count
                },['price','count'],{id:'x',timeout:100})
            },{
                onComputedCancel:({reason})=>{
                    expect(reason).toBe("timeout")
                    expect(store.state.total.loading).toBe(false)
                    expect(store.state.total.error).toBe("TIMEOUT")
                    resolve()
                }
            })   
            store.state.total
        })
    })
    test("当执行超时并启用倒计时",()=>{
        vi.useFakeTimers()
        // 执行时loading=true,然后超时后自动设置loading=false,error=TIMEOUT
        // 本例中配置timeout=[5*1000,5]，代表timeout值会从5递减到0
        const timeouts:any[] = []
        return new Promise<void>((resolve)=>{
            const store = createStore({
                price:2,
                count:3,
                total:computed(async (scope)=>{ 
                    await delay(10000)
                    return scope.price * scope.count
                },['price','count'],{id:'x',timeout:[5*1000,5]})                
            },{
                immediate:true,
                onComputedCancel:({reason})=>{
                    expect(reason).toBe("timeout")
                    expect(store.state.total.loading).toBe(false)
                    expect(store.state.total.timeout).toBe(0)
                    expect(store.state.total.error).toBe("TIMEOUT")
                    resolve()
                }

            })    
            // timeouts
            store.watch(['total.timeout'],({path})=>{
                if(path.some(p=>p[0]==='total' && p[1]==='timeout')){
                    timeouts.push(store.state.total.timeout)
                    // console.log("countdown=",timeouts)
                }                    
                if(store.state.total.timeout===0){
                    // 为什么不是[5,4,3,2,1,0]??
                    // 当创建store时指定onceComputed=true时，会马上创建ComputedObject
                    // 此时会执行一次将timeout赋值为5,这时候watch还没有开始，所以不会记录到timeouts中
                    expect(timeouts).toEqual([4,3,2,1,0])
                    expect(store.state.total.loading).toBe(false)
                    expect(store.state.total.error).toBe("TIMEOUT")                
                    resolve()
                    vi.restoreAllMocks()
                }
                resolve()
            }) 
            vi.runAllTimers()              
        })
    },500000)
})

