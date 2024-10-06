import { useEffect } from "react"
import {  Dict, WatchListenerOptions } from "@autostorejs/core" 
import type { ReactAutoStore } from "../store"



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
    return ()=>{        
        const deps = arguments[0]
        const listener = arguments[1]
        const options = arguments[2] as WatchListenerOptions
        useEffect(() => { 
            const watcher = store.watch(deps,listener,options)
            return ()=>watcher.off()
        },[])        
    }
}
