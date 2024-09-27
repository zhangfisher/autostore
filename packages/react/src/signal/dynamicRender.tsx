import {  Dict } from "@autostorejs/core"
import type { ReactAutoStore } from "../store"
import React, { useEffect, useState } from "react"
import { getValueBySelector } from "../utils/getValueBySelector"
import type  { SignalComponentComputedCreator, SignalComponentGetter, SignalComponentRender } from "./types"

/**
 *  
 * 动态创建计算属性，然后渲染信号组件
 * 
 * @exam 
 * 
 *  - 动态计算组件
 *   
 *   以上创建的信号组件均基于静态的依赖路径，当依赖变化时，重新计算
 *   也可以动态创建一个计算组件，也就是在动态创建一个计算属性
 *    
 *   $(({loading,timeout,value,retry,.....})=>{
 *      return <div>{value}</div></div>
 *   },()=>computed(getter,depends,options))
 *  
 *  - 动态异步计算组件
 *   
 *   就如何创建异步计算属性一样
 * 
  *   $(({value})=>{
 *      return <div>{value}</div></div>
 *   },()=>watch(getter,depends,options)))
 * 
 * 
 * 
 */
export function createDynamicRender<State extends Dict>(store:ReactAutoStore<State>,render:SignalComponentRender,builder:SignalComponentComputedCreator ){
    
    

    return React.memo(()=>{

        const descriptor = builder()
        // 创建一个计算对象
        const [ computedObj,setComputedObj ] = useState(()=>{
            if(descriptor.type==='computed'){
                return store.computedObjects.create(descriptor as any)
            }else if(descriptor.type==='watch'){
                return store.watchObjects.create(descriptor as any)
            }
        }) 

        
 
        
        
        const [ value,setValue ] = useState(()=>d) 
        
        
        useEffect(()=>{ 
            let watcher 
            if(computedObj){
                watcher = computedObj.watch(()=>{
                    setValue(getValueBySelector(store,selector,true))  
                })
            }
            
            return ()=>watcher.off()
        },[deps])



        return <>{render()}</>
    }, ()=>true) 
}