/**
 * 
 * 
 * 用于创建信号组件
 * 
 * 
 * 
 */

import { Dict, isPlainObject} from "autostore";
import { ReactAutoStore } from "../store"
import React from "react";
import { createStaticRender } from "./staticRender";
import { createCustomRender } from "./customRender";
import { createDynamicRender } from "./dynamicRender";
import type { SignalComponentType } from "./types"

/**
 * 
 * 创建一个响应式的组件，当数据发生变化时，组件会自动更新
 * 
 * @example
 * 
 * import { createStore } from "@autostorejs/react" 
 * import { AsyncComputedResult } from '../../core/src/computed/types';
 * import { isAsyncComputedValue } from '../../core/src/utils/isAsyncComputedValue';
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
 *   $(({loading,timeout,value,retry,.....})=>{
 *      return {loading ? <div>loading...</div> : <div>{result}</div>}
 *   },()=>computed(getter,depends,options))
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

        const selector = args.length>=1 
                        && (typeof(args[0])==='string' || typeof(args[0])==='function') 
                        && (!args[1] || isPlainObject(args[1])) 
                        ? args[0] : undefined

        const render = args.length>=2 
                        && typeof(args[0])==='function' 
                        && (typeof(args[1])==='string' || Array.isArray(args[1]) || typeof(args[1])==='function')
                        ? args[0] : undefined

        const getterOrBuilder = args.length>=2 
                                && typeof(args[1])==='function' ? args[1] : undefined 

        const renderPath = args.length>=2 
                        && typeof(args[0])==='function'
                        && (typeof(args[1])==='string' || Array.isArray(args[1])) ? args[1] : undefined

        const options = Object.assign({},args.length>1 && isPlainObject(args[args.length-1]) ? args[args.length-1] : undefined) 

        const SignalCompoent = selector ? createStaticRender(store,selector,options) 
            : (
                renderPath ? createCustomRender(store,render,renderPath,options) 
                : (
                    getterOrBuilder ? createDynamicRender(store,render,getterOrBuilder,options) 
                    : ()=><></>
                ) 
            )
        return <SignalCompoent/>; 
    }) as SignalComponentType<State>
}
