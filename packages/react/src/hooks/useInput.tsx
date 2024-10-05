
import { isPlainObject, PATH_DELIMITER, setVal, Watcher, type ComputedState, type Dict } from '@autostorejs/core';
import type { ReactAutoStore } from '../store';
import { useCallback, useEffect, useState } from 'react';
import { getValueBySelector } from '../utils/getValueBySelector';

export type UseInputBindings<Value> = Value extends Dict ? Record<string,{
    value:any
    onChange:(e:any)=>void
}> : Value

export type UseInputOptions<Value>={
    transfrom?:(input:Value,state:Dict)=>void
}

export type UseInputGetter<Value,State extends Record<string, any>>= (state:ComputedState<State>)=>Value

export interface UseInputType<State extends Dict> {
    <Value>(selector: string,options?:UseInputOptions<Value>): UseInputBindings<Value>
    <Value>(selector: string[],options?:UseInputOptions<Value>): UseInputBindings<Value>
    <Value>(getter: UseInputGetter<Value,State>,options?:UseInputOptions<Value>):UseInputBindings<Value>
}
/**
 * 
 * useInput用来为表单元素提供绑定数据的hook
 * 
 * 
 * @example
 * 
 * const bindPrice = useInput("order.price") 
 * <input {...bindPrice} />
 * 
 * @example
 * 
 * 如果输入的路径是一个对象，则会返回一个对象，包含了所有属性的绑定
 * 
 * 注意：不支持嵌套对象
 * 
 * const bindOrder = useInput<typeof state.order>("order") 
 * <input {...bindOrder.price} />
 * <input {...bindOrder.count} />
 * 
 * 
 * @example
 *  
 * const bindFullname = useInput((state=>state.firstName + ' ' +state.lastName,{
 *      // 对输入进行解析
 *      transform:(input,state)=>{
 *          const [firstName,lastName]  = value.split(' ')
 *          state.firstName = firstName
 *          state.lastName = lastName
 *      }
 * }) 
 * <input {...bindFullname} /> 
 * 
 */
export function createUseInput<State extends Dict>(store:ReactAutoStore<State>){
    return  (function(){
        const args = arguments    
        const selector = args.length>=1 && (Array.isArray(args[0]) || typeof(args[0])==='string') ? args[0] : undefined     
        const getter = args.length>=2 && typeof(args[1])==='function' ? args[1] : undefined
        const options = Object.assign({
            transform:(input:unknown,state:Dict)=>input
        },args.length===2 && typeof(args[1])==='object' ? args[1] : undefined)


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
    })  
}

 