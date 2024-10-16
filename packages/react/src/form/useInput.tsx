
import { isPlainObject, PATH_DELIMITER, setVal, Watcher, type Dict,isPrimitive } from "autostore";
import { type ReactAutoStore } from '../store';
import { useCallback, useEffect, useState } from 'react';
import { getValueBySelector } from '../utils/getValueBySelector';
import { getInputValueFromEvent } from '../utils/getInputValueFromEvent'; 
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
 * const bindFullname = useInput((state=>state.firstName + ' ' +state.lastName,(input,state)=>{
*          const [firstName,lastName]  = value.split(' ')
*          state.firstName = firstName
*          state.lastName = lastName
  * }) 
 * <input {...bindFullname} /> 
 * 
 */
export function createUseInput<State extends Dict>(store:ReactAutoStore<State>){
    return  (function(){
        const args = arguments   
        const selector:string[] | undefined = args.length>=1 ? (
                Array.isArray(args[0]) ? args[0]
                    : (typeof(args[0])==='string' ? args[0].split(PATH_DELIMITER): undefined)
                ) : undefined
        const getter = args.length>=2 && typeof(args[0])==='function' ? args[0] : undefined
        const setter = args.length>=2 && typeof(args[1])==='function' ? args[1] : undefined 
 
        const createInputBinding = useCallback((key:string[] | string | undefined,val:any)=>{
            return {
                value:val,
                onChange:(e:any)=>{
                    const inputValue = getInputValueFromEvent(e)
                    if(key){
                        store.update(state=>setVal(state,Array.isArray(key) ? key : key.split(PATH_DELIMITER),inputValue))
                    }else{
                        setter(inputValue,store.state)
                    }
                }
            }   
        },[])


        const createInputObjectBindings = useCallback((parent:string[] | undefined,val:object)=>{
            const bindings = {} as Record<string,any>
            Object.entries(val).forEach(([key,val])=>{
                if(isPrimitive(val)){
                    const fpath = parent ? [...parent,key] : [key]
                    bindings[key] = createInputBinding(fpath,val)
                }                    
            })
            return bindings
        },[])

        const [ bindings, setBindings ] = useState(()=>{
            if(typeof(getter)==='function'){
                return createInputBinding(undefined,getter(store.state))
            }else{
                const val =selector ? getValueBySelector(store,selector,true) : store.state
                if(isPlainObject(val)){ 
                    return createInputObjectBindings(selector,val)
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
        const deps = store.useDeps(selector || getter) 

        useEffect(()=>{    
            let watcher:Watcher              
            if(deps.length===0 || args.length===0){
                watcher = store.watch(({path,value})=>{
                    if(path.length!==1) return  // 只能处理一级的绑定          
                    if(isPrimitive(value)){          
                        setBindings({
                            ...bindings,
                            [path[0]]:createInputBinding(path[0],value)
                        })
                    }
                })
            }else if(deps.length>0){
                const val = selector ? getValueBySelector(store,selector,true) : undefined
                const isSelObject = isPlainObject(val)
                // 如果是一个对象，则添加一个通配符，表示对象的所有属性都依赖
                if(selector && isSelObject && deps.length===1){
                    deps[0].push('*')
                }
                
                watcher = store.watch(deps,({path,value})=>{
                    if(typeof(getter)==='function'){
                        const newValue = getter(store.state)
                        setBindings(createInputBinding(undefined,newValue))
                    }else{
                        if(isSelObject){
                            setBindings({
                                ...bindings,
                                [path[path.length-1]]:createInputBinding(path,value)
                            })
                        }else{
                            setBindings(createInputBinding(path,value))
                        }
                    } 
                })
            }            
            return ()=>watcher.off()
        },[deps])     
        return bindings
    }) as UseInputType<State>
} 