import { test,expect, describe } from "vitest"
import { createStore,computed } from "../"  

describe("依赖关系管理",()=>{
   
    test("创建依赖关系链",()=>{
        const store = createStore({ 
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
        expect(store.dependencies.chains).toStrictEqual([
            ["sync","sync.b","sync.c","sync.d","sync.e","sync.f","sync.g","sync.h"],
            ["sync.a","sync.b","sync.c","sync.d","sync.e","sync.f","sync.g","sync.h",],
            ["sync","sync1.x","sync1.y","sync1.z",],
            ["sync.e","sync1.x","sync1.y","sync1.z",],
            ["sync1","sync1.y","sync1.z"]
        ])
        store.state.sync.a = 2
    }) 
})

