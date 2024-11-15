/**
 * 
 * 基于现有Store创建一个状态域
 * 
 * 
 * 
 * 
 * 
 * @example
 * 
 * const store = new AutoStore({
  *      user:{
 *          name:'张三',
 *          age:18
 *      }
 * })
 * 
 * const snapshot = store.scope({entry:'user'})}
 * 
 * snapshot.state= {name:'张三',age:18}
 * 
 * 
 * snapshot.watch("name",({path})=>{
 *      path  // ['name']
 * })  // 相当于 store.watch("user.name",()=>{})
 * 
 * snapshot.operates.on("name",()=>{}) // 相当于 store.operates.on("user.name",()=>{})
 * 
 * 
 * 
 */

import { PATH_DELIMITER } from "../consts";
import { Dict } from "../types";
import { getVal, isFunction } from "../utils";
import type { AutoStore } from "./store";


export type AutoStoreScopeOptions = {
    entry: string   
}

export interface AutoStoreScope<State extends Dict> extends AutoStore<State>{

}



export function createAutoStoreScope<State extends Dict,Entry extends string = string> (store:AutoStore<State>,options:AutoStoreScopeOptions):AutoStoreScope<State>{
    const { entry } = Object.assign({},options)
    let operatesCache:any
    return new Proxy(store,{
        get(target,key,receiver){
            const value = Reflect.get(target, key, receiver)
            if(key === 'state'){
                return getVal(value,entry)
            }else if(key === 'watch'){
                return (...args:any[])=>{
                    if(isFunction(args[0])){
                        return  
                    }else{
                        const paths:string[] = Array.isArray(args[0]) ? args[0].map(v=>typeof(v)==='string'? v : v.join(PATH_DELIMITER)) : [args[0]]
                        args[0] = paths.map(path=>`${entry}.${path}`)
                        // @ts-ignore
                        return store.watch(...args)
                    }
                    
                }
            }else if(key === 'operates'){
                if(!operatesCache){
                    operatesCache = store.operates.scope(entry)
                }
                return operatesCache
            }
            return value
        }
    }) as AutoStoreScope<State> 
} 