/**
    声明一个监听函数 
 * store.watch(()=>{},["Ddd"])

 */

import type {  IStore } from "../store/types"; 
import { Dict } from "../types";
import {  normalizeDeps } from "../utils";


/**
 * 
 * 
 *  
 *  @description  动态创建一个侦听器，用来侦听状态变化
 *  
 *  创建侦听时存在一个问题，当store中的成员是一个计算函数，并且该计算函数还没有被computed处理成computedObject时，
 *  侦听器是无法侦听到该计算函数的变化的，因为watch只能侦听到store中的常规数值类型的变化
 * 
 *  因此，watch必须保证侦听的数据是已经被computed处理成computedObject的数据再调用
 *  
 * 
 * 
 * @param store
 * @returns 侦听器会返回一个取消侦听的函数
 */
export function createWatch<T extends Dict>(store:IStore<T>){
    /**
     *  创建一个侦听器
     */
    return (listener:(changedPaths:string[][])=>void,depends?:(string | string[])[])=>{
        depends = normalizeDeps(depends)       
        if(depends.length===0){
            return store.reactiveable.createWatch(listener)
        }else{
            if(depends.some(dep=>typeof(dep)==='string' && dep.startsWith(".") )){
                throw new Error("watch depends can not start with '.'")
            }
        }
        return store.reactiveable.createWatch(listener,depends)   
    }
}

    