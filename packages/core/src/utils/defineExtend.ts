/**
 * 
 *  为AutoStore添加扩展功能
 * 
 * 
 *  export default defineExtend((store)=>{
 * 
 * 
 *  }
 * 
 * 
 */

import type { AutoStore } from "../store/store"
import { Dict } from "../types"


export type AutoStoreExtend<State extends Dict> = (store:AutoStore<State>)=>void

export function defineExtend<State extends Dict>(extend: AutoStoreExtend<State>){    
     if(globalThis.__AUTOSTORE_EXTENDS__){
        globalThis.__AUTOSTORE_EXTENDS__ = []
    }
    if(typeof(extend)=== "function"){
        globalThis.__AUTOSTORE_EXTENDS__.push(extend)
    }   
}
