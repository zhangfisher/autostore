/**
 * 
 * 动态创建一个计算属性对象
 * 
 * 
 */
import {  ComputedOptions, Dict, ObserverScopeRef } from "autostore"
import { ReactAutoStore } from "../store"
import { UseComputedObjectType } from "./types"

 
export function createUseComputedObject<State extends Dict>(store:ReactAutoStore<State>){
    return ((params:any,computedOptions?:ComputedOptions)=>{
        return store.useObserverObject(params,Object.assign({
            // 动态创建的计算属性因为没有挂载到store上，所以不存在当前的概念，所以默认挂载到根节点上
            scope: ObserverScopeRef.Root                
        },computedOptions) as ComputedOptions)
    })  as UseComputedObjectType<State>
} 