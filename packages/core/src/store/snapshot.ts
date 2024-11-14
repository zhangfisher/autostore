/**
 * 
 * 创建一个Store快照
 * 
 * 快照指向的Store的某个路径指向的数据
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
 * const snapshot = store.snapshot({entry:'user'})}
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

import { Dict } from "../types";
import { getVal } from "../utils";
import type { AutoStore } from "./store";


export type AutoStoreSnapshotOptions = {
    entry?: string   
}

export interface AutoStoreSnapshot<State extends Dict> extends AutoStore<State>{

}



export function createAutoStoreSnapshot<State extends Dict,Entry extends string = string> (store:AutoStore<State>,options:AutoStoreSnapshotOptions):AutoStoreSnapshot<State>{
    const { entry } = Object.assign({entry:[]},options)
    return new Proxy(store,{
        get(target,key,receiver){
            const value = Reflect.get(target, key, receiver)
            if(key === 'state'){
                return getVal(value,entry)
            }else if(key === 'watch'){

            }else if(key === 'operates'){
                
            }
            return value
        }
    }) as AutoStoreSnapshot<State> 
} 