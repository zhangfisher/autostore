
import { test,expect, describe, beforeAll } from "vitest"
import { createStore,ComputedScopeRef,computed, IStore } from "../.."

 
  


describe("异步依赖参数的各种配置形式",()=>{        

    test("使用路径字符串参数依赖",()=>{
        const results:string[]=[]
        return new Promise<void>(resolve=>{
            let store = createStore({
                user:{
                    firstName:"zhang",
                    lastName:"fisher",
                    fullName: computed(async ([first,last])=>{ 
                        return first + last
                    },["user.firstName","user.lastName"],{
                        async:true,  
                        scope:()=>ComputedScopeRef.Depends
                    })
                }
            })
            store.on("computed:done",()=>{
                results.push(store.state.user.fullName.result)
                if(results.length===3){
                    expect(results).toEqual(["zhangfisher","lifisher","licat"])
                    resolve()
                }                

            })   
            store.state.user.fullName      
            store.setState((draft)=>{
                draft.user.firstName = "li"
            })   
            store.setState((draft)=>{
                draft.user.lastName = "cat"
            })   
        })
    })
    test("使用路径字符串数组指定依赖",()=>{
        const results:string[]=[]
        return new Promise<void>(resolve=>{
            let store = createStore({
                user:{
                    firstName:"zhang",
                    lastName:"fisher",
                    fullName: computed(async ([first,last])=>{ 
                        return first + last
                    },[["user","firstName"],["user","lastName"]],{
                        async:true,  
                        scope:()=>ComputedScopeRef.Depends
                    })
                }
            })
            store.on("computed:done",()=>{
                results.push(store.state.user.fullName.result)
                if(results.length===3){
                    expect(results).toEqual(["zhangfisher","lifisher","licat"])
                    resolve()
                }                

            })   
            store.state.user.fullName      
            store.setState((draft)=>{
                draft.user.firstName = "li"
            })   
            store.setState((draft)=>{
                draft.user.lastName = "cat"
            })   
        })
    })
    test("使用相对当前路径字符串指定依赖",()=>{
        // ./代表当前在的对象，即fullName所在的对象user
        const results:string[]=[]
        return new Promise<void>(resolve=>{
            let store = createStore({
                user:{                    
                    firstName:"zhang",
                    lastName:"fisher",
                    fullName: computed(async ([first,last])=>{ 
                        return first + last
                    },["./firstName","./lastName"],{
                        async:true,  
                        scope:()=>ComputedScopeRef.Depends
                    }) 
                }
            })
            store.on("computed:done",()=>{
                results.push(store.state.user.fullName.result)
                if(results.length===3){
                    expect(results).toEqual(["zhangfisher","lifisher","licat"])
                    resolve()
                }                

            })   
            store.state.user.fullName      
            store.setState((draft)=>{
                draft.user.firstName = "li"
            })   
            store.setState((draft)=>{
                draft.user.lastName = "cat"
            })   
        })
    })
    test("使用多级相对当前路径字符串指定依赖",()=>{
        // ./代表当前在的对象，即fullName所在的对象user
        const results:string[]=[]
        return new Promise<void>(resolve=>{
            let store = createStore({
                root:{
                    a:{
                        user:{                                        
                            firstName:"zhang",
                            lastName:"fisher",                 
                        },
                    },
                    b:{
                        user:{
                            fullName: computed(async ([first,last])=>{ 
                                return first + last
                            },["../../a.user.firstName","../../a.user.lastName"],{
                                async:true,  
                                scope:()=>ComputedScopeRef.Depends
                            }) 
                        }
                    }                    
                },                
            })
            store.on("computed:done",()=>{
                results.push(store.state.root.b.user.fullName.result)
                if(results.length===3){
                    expect(results).toEqual(["zhangfisher","lifisher","licat"])
                    resolve()
                }                

            })   
            store.state.root.b.user.fullName
            store.setState((draft)=>{
                draft.root.a.user.firstName = "li"
            })   
            store.setState((draft)=>{
                draft.root.a.user.lastName = "cat"
            })   
        })
    })
})