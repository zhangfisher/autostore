import {  AsyncComputedGetter, AsyncComputedObject, AsyncComputedValue, computed, ComputedGetter, Dict, isObserverDescriptor, isObserverDescriptorBuilder, ObserverDescriptorBuilder, SyncComputedObject, Watcher,WatchObject } from "@autostorejs/core"
import type { ReactAutoStore } from "../store"
import React, { useEffect, useState } from "react"
import type  {  SignalComponentRender } from "./types"
import { isPathEq } from '../../../core/src/utils/isPathEq';

/**
 *  
 * 动态创建计算属性，然后渲染信号组件
 * 
 * @exam 
 *  *  - 指定一个计算同步的getter函数
 *   
 *   $(({loading,timeout,value,retry,.....})=>{
 *      return <div>{value}</div></div>
 *   },(state)=>state.order.total)
 * 
 *  *  - 指定一个异步计算的getter函数
 *   
 *   $(({loading,timeout,value,retry,.....})=>{
 *      return <div>{value}</div></div>
 *   },async (state)=>state.order.total)
 * 
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
export function createDynamicRender<State extends Dict>(store:ReactAutoStore<State>,render:SignalComponentRender,builder:ObserverDescriptorBuilder | ComputedGetter<any> | AsyncComputedGetter<any>){

    return React.memo(()=>{

        const descriptor = isObserverDescriptorBuilder(builder) ?  builder() :  builder

        // 创建一个计算对象
        const [ observerObj ] = useState(()=>{
            if(isObserverDescriptor(descriptor)){
                descriptor.options.objectify = false // 不保存到computedObjects
                if(descriptor.type==='computed'){
                    return store.computedObjects.create(descriptor as any)
                }else if(descriptor.type==='watch'){
                    return store.watchObjects.create(descriptor as any)
                }
            }else{
                const builder = computed(descriptor as any)
                const descr = builder()
                descr.options.objectify = false
                return store.computedObjects.create(descr)
            }
            
        })
        const [ value,setValue ] = useState<AsyncComputedValue>(()=>{
            return observerObj ? observerObj.async ? observerObj.value : {value:observerObj.value } : {value:''}
        }) 
        
        useEffect(()=>{ 
            let watcher:Watcher = {off:()=>{}}
            if(observerObj){
                watcher = observerObj.watch((operate)=>{                    
                    /** 什么要设置reply=true?
                     *  因为异步计算属性的getter运行时会使用批量更新模式，因为一次基本的会触发多次更新事件
                     *  执行前：
                     *    - set loading=false
                     *  执行后:
                     *  - set value=xxx
                     *  - set loading=false
                     * 
                     *  然后在batch更新模式下，会分别触发
                     *    - set value=xxx        operate.reply=true
                     *    - set loading=false    operate.reply=true
                     *    - set obj={value.loading,.....}  batch事件
                     *    
                     * 这样就最少会触发3次事件，为了避免这种情况，在batchUpdate时会设置operate.reply=true
                     * 
                     * 这样在渲染时就只需要忽略掉replay=true的事件，只侦听batch事件即可
                     * 
                     * 
                     * 如果计算对象的值是通过state.computedItem.value=xxxx而触发的变化事件，则该事件的reply!=true，这样就会触发事件，也可以得到正确的渲染
                     * 
                     */
                    console.log('operate:',operate)
                    if(operate.reply) return
                    if(observerObj.type==='computed'){
                        if(observerObj.async){
                            const asyncObj = observerObj as unknown as AsyncComputedObject                            
                            if(isPathEq(operate.path,asyncObj.path)){
                                setValue(asyncObj.value)
                            }else if(operate.path[operate.path.length-1]==='value'){
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