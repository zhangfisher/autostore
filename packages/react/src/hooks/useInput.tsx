
import { isPlainObject, PATH_DELIMITER, setVal, Watcher, type Dict } from '@autostorejs/core';
import type { ReactAutoStore } from '../store';
import { useCallback, useEffect, useState } from 'react';
import { getValueBySelector } from '../utils/getValueBySelector';
import { getInputValueFromEvent } from '../utils/getInputValueFromEvent';
import { isPrimitive } from '../utils/isPrimitive';
import { UseInputType } from './types';


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
        if(args.length===0){
            throw new Error("useInput must have at least one argument")
        }
        const selector = args[0]
        const { transform } = Object.assign({
            transform:(input:unknown,_:Dict)=>input
        },args.length>=2 && typeof(args[1])==='object' ? args[1] : undefined)

        const createInputBinding = useCallback((key:string[] | string | undefined,val:any)=>{
            return {
                value:val,
                onChange:(e:any)=>{
                    const inputValue = getInputValueFromEvent(e)
                    transform(inputValue,store.state)
                    if(key){
                        store.update(state=>setVal(state,Array.isArray(key) ? key : key.split(PATH_DELIMITER),bindings))
                    }
                    e.preventDefault()
                }
            }   
        },[])
        const createInputObjectBindings = useCallback((val:object)=>{
            const bindings = {} as Record<string,any>
            Object.entries(val).forEach(([key,val])=>{
                if(isPrimitive(val)){
                    bindings[key] = createInputBinding(key,val)
                }                    
            })
            return bindings
        },[])

        const [ bindings, setBindings ] = useState(()=>{
            if(typeof(selector)==='function'){
                return createInputBinding(undefined,selector())
            }else{
                const val =selector ? getValueBySelector(store,selector,true) : store.state
                if(isPlainObject(val)){ 
                    return createInputObjectBindings(val)
                }else{
                    if(typeof(selector)==='string'){
                        return createInputBinding(selector,val)
                    }else if(Array.isArray(selector)){
                        return createInputBinding(selector.join(PATH_DELIMITER),val)
                    }
                }
            }
            
        })    

        //  收集依赖的路径
        const deps = store.useDeps(selector) 

        useEffect(()=>{    
            let watcher:Watcher  
            if(deps.length===0){
                watcher = store.watch(({path,value})=>{
                    if(path.length!==1) return  // 只能处理一级的绑定          
                    if(isPrimitive(value)){          
                        setBindings({
                            ...bindings,
                            [path[0]]:createInputBinding(path[0],value)
                        })
                    }
                })
            }else{
                //@ts-ignore
                watcher = store.watch(deps,({path})=>{
                    if(typeof(selector)==='function'){
                        const newValue = selector(store.state)
                        setBindings(createInputBinding(undefined,newValue))
                    }else{
                        const val = getValueBySelector(store,selector,true)
                        if(isPlainObject(val)){
                            setBindings(createInputObjectBindings(val))
                        }else{
                            setBindings(createInputBinding(path,val))
                        }
                    } 
                })
            }            
            return ()=>watcher.off()
        },[deps])     
        return bindings
    }) as UseInputType<State>
}

 