import {  AsyncComputedObject, AsyncComputedValue, Dict, ObserverDescriptorBuilder, SyncComputedObject, Watcher,WatchObject } from "@autostorejs/core"
import type { ReactAutoStore } from "../store"
import React, { useEffect, useState } from "react"
import type  {  SignalComponentRender } from "./types"
import { isPathEq } from '../../../core/src/utils/isPathEq';

/**
 *  
 * 动态创建计算属性，然后渲染信号组件
 * 
 * @exam 
 * 
 *  - 动态同步计算组件
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
 *  关于异步计算的渲染优化
 * 1. 在运行前value.loading=true，触发一次渲染
 * 2. 在运行后value.loading=false,value.value=newvValue，触发两次事件导致2次渲染，如何优化成一次？
 *      - 在run getter内部使用.update(fn,batch:true)来更新计算属性的数据，会触发
 *          
 *          batch事件，只需要侦听batch事件即可，当batch事件发生时，只触发一次渲染 * 
 *      - 但是如果直接调用state.asyncobj.value更新值，则也会触发渲染
 * 
 * 
 * 
 */
export function createDynamicRender<State extends Dict>(store:ReactAutoStore<State>,render:SignalComponentRender,builder:ObserverDescriptorBuilder){
    
    

    return React.memo(()=>{

        const descriptor = builder() 
        // 创建一个计算对象
        const [ observerObj ] = useState(()=>{
            if(descriptor.type==='computed'){
                return store.computedObjects.create(descriptor as any)
            }else if(descriptor.type==='watch'){
                return store.watchObjects.create(descriptor as any)
            }
        })
        const [ value,setValue ] = useState<AsyncComputedValue>(()=>{
            return observerObj ? observerObj.value : {}
        }) 
        
        useEffect(()=>{ 
            let watcher:Watcher = {off:()=>{}}
            if(observerObj){
                watcher = observerObj.watch((operate)=>{                    
                    // 
                    if(operate.reply) return
                    if(observerObj.type==='computed'){
                        if(observerObj.async){
                            const asyncObj = observerObj as unknown as AsyncComputedObject
                            if(isPathEq(operate.path,asyncObj.path)){
                                setValue(asyncObj.value)
                            }else if(operate.type){
                                setValue(asyncObj.value)

                            }
                        }else{
                            // @ts-ignore
                            setValue({value:(observerObj as unknown as SyncComputedObject).value})
                        }
                    }else if(observerObj.type==='watch'){
                        // @ts-ignore
                        setValue({value:(observerObj as unknown as WatchObject).value})
                    }                    
                },{operates:'write'})
            }            
            return ()=>watcher.off()
        },[descriptor])



        return <>{render(value)}</>
    }, ()=>true) 
}