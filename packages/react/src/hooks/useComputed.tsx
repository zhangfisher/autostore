/**
 * 
 *  在组件中创建计算属性
 * 
 * const { value,loading,error } = useComputed((state)=>state.order.price*state.order.count)
 * 
 * 
 * 
 */
import {  AsyncComputedValue, ComputedOptions, createAsyncComptuedValue, Dict, Watcher } from "autostore"
import { ReactAutoStore } from "../store"
import { UseComputedType } from "./types" 
import { useEffect, useState } from "react"

 
export function createUseComputed<State extends Dict>(store:ReactAutoStore<State>){
    return ((params:any,computedOptions?:ComputedOptions)=>{
        const computedObj = store.useComputedObject(params,computedOptions)
        const [ value,setValue ] = useState<AsyncComputedValue<any>>(()=>{
            return computedObj?.async ? computedObj.value : createAsyncComptuedValue(computedObj?.value)
        })
        useEffect(()=>{
            let watcher:Watcher
            if(computedObj){
                watcher =computedObj.watch(()=>{
                    setValue(computedObj?.async ? computedObj.value : createAsyncComptuedValue(computedObj?.value))
                })
            }
            return ()=>{
                watcher?.off()
            }
        },[computedObj])
        return value
    }) as UseComputedType<State>
}