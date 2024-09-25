import { test,expect, describe } from "vitest"
import { createStore,computed, StateOperateParams } from "../"  

 
describe("依赖关系管理",()=>{
    test("创建依赖关系链22",()=>{ 
        const store = createStore({ 
            sync:{
                a: 1,
                b: (scope:any)=>{ 
                    return scope.a + 1
                },
                // c: (scope:any)=>{                  
                //     return scope.b + 1
                // },
                // d: (scope:any)=>{ 
                //     return scope.c + 1
                // },
                // e: (scope:any)=>{ 
                //     return scope.d + 1
                // },
                // f: (scope:any)=>{ 
                //     return scope.e + 1
                // },
                // g: (scope:any)=>{ 
                //     return scope.f + 1
                // },
                // h: (scope:any)=>{ 
                //     return scope.g + 1
                // },
            }     
        });   
        // expect(store.dependencies.chains).toStrictEqual([
        //     ["sync","sync.b","sync.c","sync.d","sync.e","sync.f","sync.g","sync.h"],
        //     ["sync.a","sync.b","sync.c","sync.d","sync.e","sync.f","sync.g","sync.h",],
        //     ["sync","sync1.x","sync1.y","sync1.z",],
        //     ["sync.e","sync1.x","sync1.y","sync1.z",],
        //     ["sync1","sync1.y","sync1.z"]
        // ])
        store.state.sync.a = 2
    })   
    test("创建异步依赖关系链",()=>{ 
        return new Promise<void>((resolve)=>{
            const store = createStore({ 
                a0: 1,
                a1: computed(async (scope:any)=>{
                  return scope.a0 + 1
                },["a0"],{initial:2}),
                a2: computed(async (scope:any)=>{
                  return scope.a1.result + 1
                },["a1"],{initial:3})
            });
            (async ()=>{
                store.on('computed:done',(event)=>{
                    if(event.path.join(".")==="a2"){
                        resolve()
                    }
                }) 
                for(let i = 1; i <= 1; i++){      
                    store.state.a0 = i     
                }                             
            })()
          })
    })   
    test("创建依赖关系链",()=>{
        const store = createStore({ 
            sync:{
                a: 1,
                b: (scope:any)=>{
                    return scope.a + 1
                },
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
        // expect(store.dependencies.chains).toStrictEqual([
        //     ["sync","sync.b","sync.c","sync.d","sync.e","sync.f","sync.g","sync.h"],
        //     ["sync.a","sync.b","sync.c","sync.d","sync.e","sync.f","sync.g","sync.h",],
        //     ["sync","sync1.x","sync1.y","sync1.z",],
        //     ["sync.e","sync1.x","sync1.y","sync1.z",],
        //     ["sync1","sync1.y","sync1.z"]
        // ])
        store.state.sync.a = 2
    }) 
    test("收集依赖项列表",()=>{
        const store = createStore({ 
            a:1,
            b:2,
            c:3
        })
        const deps = store.collectDeps(()=>{
            store.state.a
            store.state.b
            store.state.c
        })
        expect(deps).toStrictEqual([["a"],["b"],["c"]])


    })
})

