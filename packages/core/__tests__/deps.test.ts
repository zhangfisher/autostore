import { test,expect, describe } from "vitest"
import { createStore,computed } from "../"  

describe("依赖关系管理",()=>{
   
    test("创建依赖关系图",()=>{
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
        });   
        store.dependencies     
    }) 
})

