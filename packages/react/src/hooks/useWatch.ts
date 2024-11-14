import { useCallback, useEffect, useState } from "react"
import {  Dict, isFunction, Watcher } from "autostore" 
import type { ReactAutoStore } from "../store"
import { UseWatchOptions } from "./types"

/**
 * 
 *  侦听store状态的变化，当组件销毁时自动取消侦听
 * 
 *   const { useWatch } = createStore({...})
 * 
 *   store.useWatch("order.price",(operate)=>{...})
 *   store.useWatch(["order.price","order.count"],(operate)=>{...})
 *   store.useWatch("order.price",(operate)=>{...},{operates:['add']}) 
 * 
 * 
 * @returns 
 */
export function createUseWatch<State extends Dict>(store:ReactAutoStore<State>){
    return (...args:any[])=>{        
        const deps = isFunction(args[0]) ? undefined : args[0]
        const getter = isFunction(args[0]) ? args[0] : undefined
        const options = Object.assign({},
                ( args.length==3  ? args[2] : ( 
                        (args.length==2 && isFunction(args[0])) ? args[1] : undefined
                    ) 
                )
            ) as UseWatchOptions<any>
            
        const [ value,setValue ] = useState(options?.initial)
        const executeGetter = useCallback((operate:any)=>{
            Promise.resolve(getter(operate)).then((result)=>{
                if(result!==undefined) setValue(result)
            })
        },[value])
        useEffect(() => { 
            let watcher :Watcher
            if(getter){
                watcher = store.watch((operate)=>executeGetter(operate),options)
            }else{
                watcher = store.watch(deps,(operate)=>executeGetter(operate),options)
            }            
            return ()=>watcher.off()
        },[])        
        return [value,setValue]
    } 
}
