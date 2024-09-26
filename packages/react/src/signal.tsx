/**
 * 
 * 
 * 用于创建信号组件
 * 
 * 
 * 
 */

import { AsyncComputedGetter, ComputedDepends, ComputedGetter, ComputedOptions, ComputedState, Dict, SyncComputedOptions } from "@autostorejs/core";
import { ReactAutoStore } from "./store"
import { AsyncComponentRender, SyncComponentRender } from "./types";
import { getValueBySelector } from "./utils/getValueBySelector";
import { useEffect, useState } from "react";
import React from "react";


export interface SignalComponentType<State extends Dict>{
    (selector: string):React.ReactNode
    (selector: (state:ComputedState<State>)=>any):React.ReactNode
    <Value=any, Scope=any>(render:AsyncComponentRender,getter: AsyncComputedGetter<Value,Scope>,depends: ComputedDepends,options?: ComputedOptions<Value,Scope>):React.ReactNode
    <Value=any, Scope=any >(render:SyncComponentRender,getter: ComputedGetter<Value,Scope>,options?: SyncComputedOptions<Value,Scope>):React.ReactNode;
    ():React.ReactNode
}




/**
 * 
 * 创建一个响应式的组件，当数据发生变化时，组件会自动更新
 * 
 * @example
 * 
 * import { createStore } from "@autostorejs/react" 
 * import { AsyncComputedResult } from '../../core/src/computed/types';
 * import { isAsyncComputedResult } from '../../core/src/utils/isAsyncComputedResult';
 * 
 * const { state, $ } = createStore({
 *      firstName:'zhang',
 *      lastName:'san'
 *      fullName: (user)=>{
 *          return user.firstName + ' ' + user.lastName
 *    }
 * })
 * 
 * @example
 * 
 * 生成一个只包括指定路径值的ReactNode
 * 
 * $("firstName")
 * 
 * @example
 * 
 * 生成一个由多个计算状态组成的ReactNode,当依赖变化时自动更新
 * 
 * $((state)=>{
 *    return state.firstName+state.lastName
 * })
 * 
 * scope默认指向ROOT
 * 
 * @example
 * 
 *  同步计算组件， $(render,getter,options)
 *  
 *   getter是一个计算函数，当依赖变化时，重新执行getter来获取数据，然后作为props传递给render进行重新渲染
 * 
 *  当组件内部依赖的a,b变化时，自动重新渲染
 *   $((value)=>{
 *      return <div>{state.a + state.b}</div></div>
 *   },(scope)=>{
 *      return scope.a + scope.b
 *   },computedOptions)
 * 
 * 
 * @example
 * 
 *  异步计算组件
 *   
 *   当依赖变化时，重新执行getter来获取数据，然后重新渲染组件
 *   
 *   $(({loading,timeout,result,retry,.....})=>{
 *      return {loading ? <div>loading...</div> : <div>{result}</div>}
 *   },async (scope,options)=>{
 *     const books = await fetch(scope.url)
 *     return books
 *   },[依赖],{timeout:1000,retry:3})
 * 
 * 
 * </div>
 * 
 * 
 * @param selector  字符串或逊
 * @returns 
*/
export function createSignalComponent<State extends Dict>(store:ReactAutoStore<State>){
    return (function(){ 
        const args = arguments    
        const selector = args.length===1 && (typeof(args[0])==='string' || typeof(args[0])==='function') ? args[0] : undefined
        // const render = args.length>=2 && typeof(args[0])==='function' ? args[0] : undefined
        // const getter = args.length>=2 && typeof(args[1])==='function' ? args[1] : undefined
        // const depends = args.length>=3 && Array.isArray(args[2]) ? args[2] : []
        // const asyncOptions = args.length>=4 && typeof(args[3])==='object' ? args[3] : {}
        // const syncOptions = args.length>=3 && typeof(args[2])==='object' ? args[2] : {}
        
         const El =  React.memo(()=>{
            // const [computedObj,setComputedObj] = useState<ComputedObject>()
    
            // 收集依赖的路径
            const deps = store.useDeps(selector)
    
            const [ value,setValue ] = useState(()=>getValueBySelector(store,selector))
    
            useEffect(()=>{
                // if(computedObj instanceof ComputedObject){                    
                // }else{    
                // }
                // 侦听依赖的变化，当依赖变化时，更新值
                const watcher = store.watch(deps,()=>{
                    setValue(getValueBySelector(store,selector))  
                })
                return ()=>watcher.off()
            },[deps])
    
            return <>
                {value}
            </>
        }, ()=>true)  
        return <El />; 
    }) as SignalComponentType<State>
}
