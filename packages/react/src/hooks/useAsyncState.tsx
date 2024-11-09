import { AsyncComputedValue, isAsyncComputedValue, isPlainObject, type Dict } from "autostore";
import type { ReactAutoStore } from '../store';
import { useEffect, useState } from 'react';
import { getValueBySelector } from '../utils/getValueBySelector';
import { UseAsyncStateType } from './types';

/**
 *  
 *  访问异步计算属性hook
 * 
 * @example 
 * 
 * 如果输入路径所指向的状态是一个异步计算属性
 * 
 * 例如："book.orders"是一个异步计算属性，则此值是book.orders== { value,loading,timeout, run, cancel,.....}
 * 
 * const { value,loading,timeout,.... } = useAsyncState("book.orders") 
 * 
 */
export function createUseAsyncState<State extends Dict>(store:ReactAutoStore<State>){
    return  (function(){
        const args = arguments    
        const selector = args.length>=1 && (Array.isArray(args[0]) || typeof(args[0])==='string' || typeof(args[0])==='function') ? args[0] : undefined     
        const [ result,setResult ] = useState<AsyncComputedValue>(()=>{
            const val = getValueBySelector(store,selector)
            if(isAsyncComputedValue(val)){
                return val
            }else{
                return {value:val,loading:false,retry:0,error:null,timeout:0,progress:0,run:()=>{},cancel:()=>{}}
            }
        })    

        // 注意，如果输入的计算属性是一个异步计算属性，则会自动添加后缀'value'
        const deps = store.useDeps(selector,'all')
 
        useEffect(()=>{    
            const watcher = store.watch(deps,()=>{
                const val = getValueBySelector(store,selector)
                setResult(isPlainObject(val) ? {...val} : Array.isArray(val) ? [...val] : val)  
            })
            return ()=>watcher.off()
        },[deps])     
        return result
    }) as UseAsyncStateType<State>
}

 