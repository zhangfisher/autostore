import { test,expect, describe,vi} from "vitest"
import { createStore,computed, ComputedObject } from "../../src"
import { delay } from "flex-tools/async/delay"
 

describe("异步计算",()=>{

    test("默认异步计算",()=>{
        let count:number =0 
        let results:number[] = [] 
        return new Promise<void>((resolve)=>{
            const store = createStore({
                price:2,
                count:3,
                total:computed(async (scope)=>{
                    count++
                    return scope.price * scope.count
                },['price','count'])
            },{    
                immediate:true               // 遍历对象，从而导致计算属性被读取而立刻创建
            }) 
            store.on("computed:done",()=>{
                results.push(store.state.total.result)
                if(results.length===3){
                    expect(count).toBe(3)         
                    expect(results).toEqual([6,8,10]) 
                    resolve()        
                }                
            })   
            store.state.count = 4
            store.state.count = 5          

        })
    })  
    test("从异步对象实例读取计算值",()=>{
        let count:number =0 
        let results:number[] = []
        return new Promise<void>((resolve)=>{
            const store = createStore({
                price:2,
                count:3,
                total:computed(async (scope)=>{
                    count++
                    return scope.price * scope.count
                },['price','count'],{id:"x"})
            },{    
                immediate:true             
            }) 
            const cobj = store.computedObjects.get("x")!
            store.on("computed:done",()=>{     
                results.push(cobj.value.result)
                if(results.length===3){
                    expect(count).toBe(3)         
                    expect(results).toEqual([6,8,10]) // ?
                    resolve()        
                }                
            })   
            store.state.count = 4
            store.state.count = 5
        })
    })  


    test("异步计算生成异步计算数据对象",()=>{
        return new Promise<void>((resolve)=>{
            const store = createStore({
                price:2,
                count:3,
                total:computed(async (scope)=>{
                    return scope.price * scope.count
                },['price','count'])
            } ) 
            store.on("computed:created",()=>{
                expect("result" in store.state.total).toBe(true)
                expect("error" in store.state.total).toBe(true)
                expect("loading" in store.state.total).toBe(true)
                expect("retry" in store.state.total).toBe(true)
                expect("run" in store.state.total).toBe(true)
                expect("cancel" in store.state.total).toBe(true)
                expect("progress" in store.state.total).toBe(true)
                expect("timeout" in store.state.total).toBe(true)
                resolve()        
            })   
            store.state.total
        })
    })  

    test("创建计算对象实例",()=>{
        return new Promise<void>((resolve)=>{
            let count:number =0 
            const store = createStore({
                price:2,
                count:3,
                total:computed(async (scope)=>{
                    count++
                    return scope.price * scope.count
                },['price','count'],{id:'x'})
            })
            store.on("computed:created",({id})=>{
                expect(store.computedObjects.has('x')).toBe(true)                   
                expect(id).toBe("x")
                const obj = store.computedObjects.get("x")!
                expect(obj).toBeInstanceOf(ComputedObject)
                expect(obj.id).toBe("x")
                expect(obj.enable).toBe(true)
                expect(obj.depends).toEqual([["price"],["count"]])
                expect(obj.path).toEqual(['total'])
                resolve()
            })
            store.state.total
        })        
    }) 

    test("全局控制启用与停止计算",()=>{
        let count = 0
        return new Promise<void>((resolve)=>{
            const store = createStore({
                price:2,
                count:3,
                total:computed(async (scope)=>{
                    count++       
                    return scope.price * scope.count
                },['price','count'],{id:'x'})
            },{
                immediate:true,
                enableComputed:false
            })
            store.state.count = 4
            store.state.count = 5             
            store.state.count = 4
            store.state.count = 5
            store.computedObjects.enable = true
            store.on("computed:done",()=>{ 
                expect(count).toBe(1)
                resolve()
            })
            store.state.count = 100
        })
    })
    test("单独控制计算属性的启用与停止计算",()=>{
        let count = 0
        return new Promise<void>((resolve)=>{
            const store = createStore({
                price:2,
                count:3,
                total1:computed(async (scope)=>{
                    return scope.price * scope.count
                },['price','count'],{id:'x',enable:false,initial:100}),         // 默认禁用
                total2:computed(async (scope)=>{                    
                    return scope.price * scope.count
                },['price','count'],{id:'y'})
            },{                                
                immediate:true
            })            
            store.on("computed:done",({path})=>{ 
                count++
                if(count===2){
                    expect(store.state.total1.result).toBe(100)
                    expect(store.state.total2.result).toBe(8)
                    resolve()
                }               
                
            })
            store.state.count = 4
        })
    })
    test("通过计算属性对象手动执行计算函数",()=>{
        let count = 0
        return new Promise<void>((resolve)=>{
            const store = createStore({
                price:2,
                count:3,
                total:computed(async (scope)=>{
                    return scope.price * scope.count
                },['price','count'],{id:'x'}),         
            },{                                
                immediate:true
            })                        
            store.on("computed:done",()=>{
                count++
                if(count===2){ // 第一次是创建时执行，第二次是手动执行
                    resolve()
                }
            })
            store.computedObjects.get("x")!.run({
                extras:1
           })
        })        
    })    
    test("异步计算属性的计算执行次数，初始化时执行一次",()=>{
        let count = 0
        return new Promise<void>((resolve)=>{
            const store = createStore({
                price:2,
                count:3,
                total:computed(async (scope)=>{
                    return scope.price * scope.count
                },['price','count'],{id:'x'}),         
            })                        
            store.on("computed:done",()=>{
                count++             
            })
            store.state.total   // 创建计算属性时，会立即执行一次计算函数
            setTimeout(()=>{
                expect(count).toBe(1)
                store.state.count = 4
                setTimeout(()=>{
                    expect(count).toBe(2)
                    resolve()
                },10)
            },10)
        })        
    })

    test("手动执行异步计算属性的计算函数",()=>{
        return new Promise<void>((resolve)=>{
            const store = createStore({
                price:2,
                count:3,
                total:computed(async (scope)=>{
                    return scope.price * scope.count
                },['price','count'],{id:'x',immediate:false}),         
            },{immediate:true})                                    
            store.on("computed:created",async ()=>{
                await store.computedObjects.get("x")!.run()
                expect(store.state.total.result).toBe(6)
                resolve()
            })
        })
    })
    test("手动传参覆盖默认的异步计算属性参数，然后运行",()=>{
        return new Promise<void>((resolve)=>{
            const store = createStore({
                price:2,
                count:3,
                total:computed(async (price)=>{
                    expect(price).toBe(2)
                    return price * 100
                },['price','count'],{id:'x',immediate:false}),         
            },{immediate:true})                                    
            store.on("computed:created",async ()=>{
                await store.computedObjects.get("x")!.run({scope:"price"})
                expect(store.state.total.result).toBe(200)
                // 运行时修改的scope仅在本次运行中有效，不会影响到下次运行
                // 默认的scope没有配置是undefined,指向的是当前对象,
                expect(store.computedObjects.get("x")!.options.scope).toBe(undefined)
                resolve()
            })
        })
    })

})


describe("执行分组或满足条件的计算函数",()=>{   

    test("异步计算分组",()=>{
        let results:string[] = []
        return new Promise<void>((resolve)=>{
            const store = createStore({
                price:2,
                count:3,
                total1:computed(async (scope)=>{
                    return scope.price * scope.count
                },['price','count'],{group:'a'}),                
                total2:computed(async (scope)=>{
                    return scope.price * scope.count
                },['price','count'],{group:'a'}),                
                total3:computed(async (scope)=>{
                    return scope.price * scope.count
                },['price','count'],{group:'b'}),                
                total4:computed(async (scope)=>{
                    return scope.price * scope.count
                },['price','count'],{group:'b'}),                
                total5:computed(async (scope)=>{
                    return scope.price * scope.count
                },['price','count'],{group:'c'}),                
                total6:computed(async (scope)=>{
                    return scope.price * scope.count
                },['price','count'],{group:'c'})
            },{    
                immediate:true               // 遍历对象，从而导致计算属性被读取而立刻创建
            }) 
            store.on("computed:done",(computedObj)=>{
                results.push(computedObj.path.join(","))                
                if(results.length===12){
                    expect(results).toStrictEqual([
                        "total1","total2","total3","total4","total5","total6",
                        "total1","total2","total3","total4","total5","total6",
                    ]) 
                    resolve()        
                }
            })     

            // 手动控制运行分组a
            store.computedObjects.runGroup("a")
            store.computedObjects.runGroup("b")
            store.computedObjects.runGroup("c")
        })
    })  
    test("手动执行满足条件的计算",()=>{
        let results:string[] = []
        return new Promise<void>((resolve)=>{
            const store = createStore({
                price:2,
                count:3,
                total1:computed(async (scope)=>{
                    return scope.price * scope.count
                },['price','count'],{id:'a',group:'a',initial:0}),                
                total2:computed(async (scope)=>{
                    return scope.price * scope.count
                },['price','count'],{id:'b', group:'a',initial:0}),                
                total3:computed(async (scope)=>{
                    return scope.price * scope.count
                },['price','count'],{id:'c',group:'b',initial:0}),                
                total4:computed(async (scope)=>{
                    return scope.price * scope.count
                },['price','count'],{id:'d',group:'b',initial:0}),                
                total5:computed(async (scope)=>{
                    return scope.price * scope.count
                },['price','count'],{id:'e',group:'c',initial:0}),                
                total6:computed(async (scope)=>{
                    return scope.price * scope.count
                },['price','count'],{id:'f',group:'c',initial:0})
            },{    
                immediate:true               // 遍历对象，从而导致计算属性被读取而立刻创建，注意是创建而不是执行
            }) 
            store.on("computed:done",(computedObj)=>{
                results.push(computedObj.path.join(","))                
                if(results.length===3){
                    expect(results).toStrictEqual([
                        "total1","total3","total5",
                    ]) 
                    resolve()        
                }
            })     
            store.computedObjects.run((obj)=>{
                return ['a','c','e'].includes(obj.id)
            }) 
        })
    })  
    test("指定超时手动执行满足条件的计算",()=>{
        vi.useFakeTimers()
        return new Promise<void>((resolve)=>{
            const store = createStore({
                price:2,
                count:3,
                total1:computed(async (scope)=>{
                    await delay(5000)
                    return scope.price * scope.count
                },['price','count'],{id:'a',group:'a',initial:0}),                
                total2:computed(async (scope)=>{
                    await delay(5000)
                    return scope.price * scope.count
                },['price','count'],{id:'b', group:'a',initial:0}),                
                total3:computed(async (scope)=>{
                    await delay(5000)
                    return scope.price * scope.count
                },['price','count'],{id:'c',group:'b',initial:0}),                
                total4:computed(async (scope)=>{
                    await delay(5000)
                    return scope.price * scope.count
                },['price','count'],{id:'d',group:'b',initial:0}),                
                total5:computed(async (scope)=>{
                    await delay(5000)
                    return scope.price * scope.count
                },['price','count'],{id:'e',group:'c',initial:0}),                
                total6:computed(async (scope)=>{
                    await delay(5000)
                    return scope.price * scope.count
                },['price','count'],{id:'f',group:'c',initial:0})
            },{    
                immediate:true               // 遍历对象，从而导致计算属性被读取而立刻创建，注意是创建而不是执行
            })  
            store.computedObjects.run((obj)=>{
                return ['a','c','e'].includes(obj.id)
            },{},{timeout:200,wait:true}).catch((e)=>{
                expect(e).toBeInstanceOf(Error) 
                vi.restoreAllMocks()
                resolve()
            })
            vi.runAllTimers()
        })
    })  
})

 

