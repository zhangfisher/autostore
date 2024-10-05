import { ComputedState, Dict } from "@autostorejs/core"
import type { ReactAutoStore } from "../store"
import React, { useEffect, useState } from "react"
import { getValueBySelector } from "../utils/getValueBySelector"

/**
 * 
 * 根据输入的状态数据路径，创建一个信号组件
 * 
 * @example
 * 
 * import { createStore } from "@autostorejs/react"  
 * 
 * const { state, $ } = createStore({
 *    order:{
 *      price: 100,
 *      count:1,
 *      total: computed(async (user)=>{
 *          return user.price + ' ' + user.count
 *      },["price","count"])
 *    }
 * })
 * 
 * 
 * @example
 * 
 * 生成一个只包括指定路径值的ReactNode
 * 
 * $("order.price")
 * 
 * @example
 * 
 * 生成一个由多个计算状态组成的ReactNode,当依赖变化时自动更新
 * 
 * $((state)=>{
 *    return `${state.order.price}, ${state.lastName}`
 * })
 * 
 * 
 * @example
 * 
 * 如果果创建的信号组件指向的是一个异步计算属性，则会自动添加后缀'value'
 * 
 * $("order.total") ==== $("order.total.value") 
 * 因为order.total是一个异步计算属性，在状态数据中的值是一个AsyncComputedValue对象，真正的计算结果在value属性中
 * 
 * 
 */
export function createStaticRender<State extends Dict>(store:ReactAutoStore<State>,selector:string[] | ((state:ComputedState<State>)=>any)){
    return React.memo(()=>{
        // 收集依赖的路径
        const deps = store.useDeps(selector)
        const [ value,setValue ] = useState(()=>getValueBySelector(store,selector,true)) 
        useEffect(()=>{ 
            const watcher = store.watch(deps,()=>{
                setValue(getValueBySelector(store,selector,true))  
            })
            return ()=>watcher.off()
        },[deps])
        return <>{String(value)}</>
    }, ()=>true) 
}