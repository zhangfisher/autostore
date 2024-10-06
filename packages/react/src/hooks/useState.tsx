import { isPlainObject, PATH_DELIMITER, setVal, Watcher,  type Dict } from '@autostorejs/core';
import type { ReactAutoStore } from '../store';
import { useCallback, useEffect, useState } from 'react';
import { getValueBySelector } from '../utils/getValueBySelector';
import { UseStateType } from './types';

/**
 *  
 *  访问状态数据的hook
 * 
 * @example 
 * 
 * const [price,setPrice ] = useState<number>("order.price")
 * const [price,setPrice ] = useState<number>(['order','price'])
 * 
 * const [fullName,setFullname ] = useState<number>((state)=>state.firstName+state.lastName,(value,state)=>{
 *   const [ firstName,lastName ] = value.split(' ')
 *   state.firstName = firstName
 *   state.lastName = lastName
 * })
 * 
 * @example
 * 
 * 如果输入路径所指向的状态是一个异步计算属性
 * 
 * 例如："book.orders"是一个异步计算属性，则此值是book.orders== { value,loading,timeout, run, cancel,.....}
 * 
 * useState("book.orders")会自动添加'value'，然后侦听获取到book.orders.value的值
 * 
 * const [ value, setValue ] = useState("book.orders")
 * 
 * 一般情况下，这时调用setValue是不建议的，因为异步计算属性是由所依赖的状态数据变化后自动重新计算的
 * 直接更新book.oreder.value，就相当于跳过了计算逻辑，所以直接更新是没有意义的。
 * 
 * 但是在某些情况下，比如想为该计算属性提供一个初始值，或者在异步计算时，想先提供一个乐观的值，然后等计算完成后再更新，这些先更新，然后再计算也是可行的。
 * 如果要重新计算，则可以通过run()方法重新计算 
 * 
 */
export function createUseState<State extends Dict>(store:ReactAutoStore<State>){
    return  (function(){
        const args = arguments    
        const selector = args.length>=1 && (Array.isArray(args[0]) || typeof(args[0])==='string' || typeof(args[0])==='function') ? args[0] : undefined     
        const setter = args.length===2 && typeof(args[1])==='function' ? args[1] : undefined

        const [ value,setValue ] = useState(()=>getValueBySelector(store,selector,true))    

        // 注意，如果输入的计算属性是一个异步计算属性，则会自动添加后缀'value'
        const deps = store.useDeps(selector)

        useEffect(()=>{    
            let watcher:Watcher  
            if(deps.length===0){
                watcher = store.watch(()=>{
                    setValue({...store.state})  
                })
            }else{
                watcher = store.watch(deps,()=>{
                    const val = getValueBySelector(store,selector)
                    setValue(isPlainObject(val) ? {...val} : Array.isArray(val) ? [...val] : val)  
                })
            }            
            return ()=>watcher.off()
        },[deps])    

        const updateValue = useCallback((value:any)=>{
            if(selector){
                if(typeof(selector)==='string'){            
                    store.update(state=>setVal(state,selector.split(PATH_DELIMITER),value))
                }else if(Array.isArray(selector)){
                    store.update(state=>setVal(state,selector,value))
                }else if (typeof(selector)==='function'){                
                    setter && store.update(state=>setter(value,state))
                } 
            }else if(typeof(value)==='function'){
                store.update(state=>value(state),{batch:true})
            }            
        },[selector])
        return [ value,updateValue ] 
    }) as UseStateType<State>
}

 