import { describe, test, it, expect, mock, beforeAll, afterAll, beforeEach, afterEach } from "bun:test"
import { AutoStore,computed, delay, StateOperate  } from "../"  

 
describe("依赖关系管理",()=>{
    test("异步依赖关系链计算",()=>{ 
        return new Promise<void>((resolve)=>{
            const store = new AutoStore({ 
                a0: 10,
                a1: computed(async (scope:any)=>{
                  return scope.a0 + 1
                },["a0"],{initial:11}),
                a2: computed(async (scope:any)=>{
                  return scope.a1.value + 1
                },["a1"],{initial:12}),
                a3: computed(async (scope:any)=>{
                  return scope.a2.value + 1
                },["a2"],{initial:13}),
                a4: computed(async (scope:any)=>{
                  return scope.a3.value + 1
                },["a3"],{initial:14}),
                a5: computed(async (scope:any)=>{
                  return scope.a4.value + 1
                },["a4"],{initial:15}),
                a6: computed(async (scope:any)=>{
                  return scope.a5.value + 1
                },["a5"],{initial:16}),
                a7: computed(async (scope:any)=>{
                  return scope.a6.value + 1
                },["a6"],{initial:17}),
                a8: computed(async (scope:any)=>{
                  return scope.a7.value + 1
                },["a7"],{initial:18}),
                a9: computed(async (scope:any)=>{
                  return scope.a8.value + 1
                },["a8"],{initial:19}),
            });
            (async ()=>{
                store.on('computed:done',(event)=>{
                    if(event.path.join(".")==="a9"){
                        resolve()
                    }
                }) 
                store.state.a0 = 1           
            })()
          })
    })   
    test("同步依赖链计算",()=>{
        return new Promise<void>((resolve)=>{            
            const store = new AutoStore({ 
                sync:{
                    a: 1,
                    b: (scope:any)=>scope.a + 1,
                    c: (scope:any)=>scope.b + 1,
                    d: (scope:any)=>scope.c + 1,
                    e: (scope:any)=>scope.d + 1,
                    f: (scope:any)=>scope.e + 1,
                    g: (scope:any)=>scope.f + 1,
                    h: (scope:any)=>scope.g + 1,
                },     
                sync1:{
                    x:computed((scope:any)=>scope.e + 1,{scope:"../sync"}),
                    y:(scope:any)=>scope.x + 1,
                    z:(scope:any)=>scope.y + 1,
                }       
            });   
            const operates:StateOperate[] = []
            store.watch((operate)=>{
                operates.push(operate)
                if(operate.path[1]==="h"){
                    expect(operates.map(op=>{
                        return [op.type,op.path.join(".")]
                    })).toStrictEqual([
                        ["set","sync.a"],
                        ["set","sync.b"],
                        ["set","sync.c"],
                        ["set","sync.d"],
                        ["set","sync.e"],
                        ["set","sync.f"],
                        ["set","sync.g"],
                        ["set","sync.h"]
                    ])
                    resolve()
                }
            },{
                operates:"write"
            }) 
            store.state.sync.a = 2
        })
    }) 
    test("收集依赖项列表",()=>{
        const store = new AutoStore({ 
            a:1,
            b:2,
            c:3
        })
        const deps = store.collectDependencies(()=>{
            store.state.a
            store.state.b
            store.state.c
        })
        expect(deps).toStrictEqual([["a"],["b"],["c"]])
    })

})



describe("trace依赖关系管理",()=>{
    test("同步依赖关系跟踪",()=>{
        return new Promise<void>((resolve)=>{            
            const store = new AutoStore({ 
                sync:{
                    a: 1,
                    b: (scope:any)=>scope.a + 1,
                    c: (scope:any)=>scope.b + 1,
                    d: (scope:any)=>scope.c + 1,
                    e: (scope:any)=>scope.d + 1,
                    f: (scope:any)=>scope.e + 1,
                    g: (scope:any)=>scope.f + 1,
                    h: (scope:any)=>scope.g + 1,
                }       
            });    
            store.trace(()=>{
                store.state.sync.a = 2              
            },"write").start().then((operates)=>{
                expect(operates.map(op=>{
                    return [op.type,op.path.join(".")]
                })).toStrictEqual([
                    ["set","sync.a"],
                    ["set","sync.b"],
                    ["set","sync.c"],
                    ["set","sync.d"],
                    ["set","sync.e"],
                    ["set","sync.f"],
                    ["set","sync.g"],
                    ["set","sync.h"]
                ])
                resolve()
            })
        })
    })


    test("异步依赖关系跟踪",()=>{
        return new Promise<void>((resolve)=>{
            const store = new AutoStore({ 
                a0: 10,
                a1: computed(async (scope:any)=>{
                    await delay(1)
                    return scope.a0 + 1
                },["a0"],{initial:11}),
                a2: computed(async (scope:any)=>{
                    await delay(1)
                    return scope.a1.value + 1
                },["a1"],{initial:12}),
                a3: computed(async (scope:any)=>{
                    await delay(1)
                    return scope.a2.value + 1
                },["a2"],{initial:13}),
                a4: computed(async (scope:any)=>{
                    await delay(1)
                    return scope.a3.value + 1
                },["a3"],{initial:14}),
                a5: computed(async (scope:any)=>{
                    await delay(1)
                    return scope.a4.value + 1
                },["a4"],{initial:15}),
                a6: computed(async (scope:any)=>{
                    await delay(1)
                    return scope.a5.value + 1
                },["a5"],{initial:16}),
                a7: computed(async (scope:any)=>{
                    await delay(1)
                    return scope.a6.value + 1
                },["a6"],{initial:17}),
                a8: computed(async (scope:any)=>{
                    await delay(1)
                    return scope.a7.value + 1
                },["a7"],{initial:18}),
                a9: computed(async (scope:any)=>{
                    await delay(1)
                    return scope.a8.value + 1
                },["a8"],{initial:19}),
            }); 
            store.trace(()=>{
                store.state.a0=2
            },"write").start((operate)=>{
                return operate.path[0]==="a9"
            }).then(operates=>{
                expect(operates[operates.length-1].path[0]).toBe("a9")
                resolve()
            })                      
        })
    })

    // test("重入maxReentry=0时异步循环依赖处理",()=>{
    //     return new Promise<void>(resolve=>{
    //         const cancelList:string[] = []
    //         const store = new AutoStore({ 
    //             x:1,
    //             a: computed(async (scope:any)=>{
    //               return scope.b.value + scope.x
    //             },['b','x']),
    //             b: computed(async (scope:any)=>{
    //               return scope.a.value + + scope.x
    //             },['a','x'])
    //           },{
    //             reentry:0,
    //             // 当计算函数达到最大重入时会触发此回调
    //             onComputedCancel:({path,reason})=>{
    //                 cancelList.push(path.join("."))
    //                 expect(reason).toBe("reentry")
    //             }
    //           }) 
    //         setTimeout(()=>{
    //             store.state.x = 2
    //             setTimeout(()=>{
    //                 store.state.x = 3
    //                 setTimeout(()=>{
    //                     resolve()
    //                 },1000)
    //             },1000)
    //         },500)            
    //     })        
    // }, { timeout: Infinity })

})