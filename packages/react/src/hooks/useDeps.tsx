import { normalizeDeps, PATH_DELIMITER, type ComputedDepends, type ComputedState, type Dict } from "@autostorejs/core"
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
 * 返回指定路径的依赖
 * 
 * @example
 * 
 * useDeps("order.price") == [["order","price"]]
 * useDeps(["order","price"]) == [["order","price"]]
 * useDeps((state)=>state.order.price* state.order.count)) == [["order","price"],["order","count"]]
 * 
 */
export function createUseDeps<State extends Dict>(store:ReactAutoStore<State>){ 
    return function(selector:any,depArgs?:ComputedDepends){
        const [deps] = useState(()=>{
            if(depArgs){
                return normalizeDeps(depArgs).filter(dep=>Array.isArray(dep))
            }else{
                if(typeof(selector)==='function'){
                    return store.collectDeps(()=>selector(store.state))  
                }else if(typeof(selector)==='string'){
                    return [selector.split(PATH_DELIMITER)]  
                }else if(Array.isArray(selector)){
                    return [selector]  
                }else{
                    return []
                }
            }
        })
        return deps        
    }
 } 