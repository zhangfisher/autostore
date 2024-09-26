import { PATH_DELIMITER, setVal, type ComputedState, type Dict } from '@autostorejs/core';
import type { ReactAutoStore } from '../store';
import { useCallback, useEffect, useState } from 'react';
import { getValueBySelector } from '../utils/getValueBySelector';

export type UseStateResult<Value>=[Value,React.Dispatch<React.SetStateAction<Value>>]
export type UseStateGetter<Value,State extends Record<string, any>>= (state:ComputedState<State>)=>Value
export type UseStateSetter<SetValue,State extends Record<string, any>>= (value:SetValue,state:ComputedState<State>)=>void


export interface UseStateType<State extends Dict> {
    <Value>(selector: string): UseStateResult<Value>
    <Value>(selector: string[]): UseStateResult<Value>
    <Value,SetValue>(getter: UseStateGetter<Value,State>,setter?:UseStateSetter<SetValue,State>): UseStateResult<Value>
    ():any        
}

/**
 *  
 *  访问状态数据的hook
 * 
 * @example 
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
 * 如果异步状态所引用的是一个异步计算属性
 * const [ { result,loading,timeout, run, cancel,.....} ] = useState("book.orders") 
 * @example
 * 
 * - 动态创建的计算属性
 * const { result,loading } = useState(async (scope,{})=>{
 *      const books = await fetch(scope.url)
 *      return books
 * },[deps],options)
 * 
 * - 通过key获取异步计算属性
 * 
 * * const { result,loading } = useState("async.key")
 * 
 * 
 */
export function createUseState<State extends Dict>(store:ReactAutoStore<State>){
    return  (function(){
        const args = arguments    
        const selector = args.length>=1 && (Array.isArray(args[0]) || typeof(args[0])==='string' || typeof(args[0])==='function') ? args[0] : undefined     
        const setter = args.length===2 && typeof(args[1])==='function' ? args[1] : undefined

        const [ value,setValue ] = useState(()=>getValueBySelector(store,selector))    
        
        const deps = store.useDeps(selector)

        useEffect(()=>{      
            const watcher = store.watch(deps,()=>{
                setValue(getValueBySelector(store,selector))  
            })
            return ()=>watcher.off()
        },[deps])    

        const updateValue = useCallback((value:any)=>{
            if(typeof(selector)==='string'){            
                store.update(state=>setVal(state,selector.split(PATH_DELIMITER),value))
            }else if(Array.isArray(selector)){
                store.update(state=>setVal(state,selector,value))
            }else if (typeof(selector)==='function'){                
                setter && store.update(state=>setter(value,state))
            }
        },[selector])
        return [ value,updateValue ] 
    }) as UseStateType<State>
}

 