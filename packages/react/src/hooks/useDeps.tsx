import { getVal, isAsyncComputedValue, normalizeDeps, PATH_DELIMITER, type ComputedDepends, type ComputedState, type Dict } from "@autostorejs/core"
import type { ReactAutoStore } from "../store"
import { useState } from "react"

export interface UseDepsType<State extends Dict>{
    (selector: string):string[][]
    (selector: string[]):string[][]
    (selector: (state:ComputedState<State>)=>any):string[][]
    (selector:any,depArgs?:ComputedDepends):string[][] 
 }

/**
 * 
 * 创建一个函数钩子，该函数钩子用于返回指定路径的依赖
 * 
 * 
 * @description
 * 
 * - 输入一个字符串路径，转换为路径数组
 * useDeps("order.price") == [["order","price"]]
 * useDeps(["order","price"]) == [["order","price"]]
 * 
 * - 输入一个函数，执行该函数并收集依赖
 * useDeps((state)=>state.order.price* state.order.count)) == [["order","price"],["order","count"]]
 * 
 * 针对异步计算属性
 * 
 * useDeps("order.total")  如果order.total是一个异步计算属性
 * 由于此时order.total是一个AsyncComputedValue对象，真正的计算结果在order.total.value属性中
 * 所以自动添加返回的是[["order","total","value"]]  
 * 这样当watch时就可以监听到异步计算属性的变化
 * 
 */
export function createUseDeps<State extends Dict>(store:ReactAutoStore<State>){ 
    return function(selector:any){
        const [deps] = useState(()=>{
            let deps:string[][] = [] 
            if(typeof(selector)==='function'){
                deps =  store.collectDeps(()=>selector(store.state))  
            }else if(typeof(selector)==='string'){
                deps = [selector.split(PATH_DELIMITER)]   
            }else if(Array.isArray(selector)){
                deps =  [selector]  
            }else{
                deps = []
            } 
            // 判断是否是异步计算属性，如果是则需要自动添加value
            deps.forEach(dep=>{
                // 获取值,不触发GET事件,即偷看
                let value =  store.peep(state=>getVal(state,dep))
                if(isAsyncComputedValue(value)){
                    dep.push("value")
                }
            })
            return deps 
        })
        
        return deps
    }
 } 