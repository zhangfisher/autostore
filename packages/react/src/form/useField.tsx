
import { PATH_DELIMITER, setVal, Watcher, type Dict,  getDepends, noRepeat, isPathEq } from "autostore";
import { type ReactAutoStore } from '../store';
import { useCallback, useEffect, useState } from 'react';
import { getValueBySelector } from '../utils/getValueBySelector';
import { getInputValueFromEvent } from '../utils/getInputValueFromEvent'; 
import { UseFieldGetter, UseFieldType } from './types'; 

export type UseFieldBinding = {
    value: any
    onChange: (e: any) => void
    name?: string
    "data-field-name"?: string
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
 * const bindFullname = useInput((state=>state.firstName + ' ' +state.lastName,(input,state)=>{
*          const [firstName,lastName]  = value.split(' ')
*          state.firstName = firstName
*          state.lastName = lastName
  * }) 
 * <input {...bindFullname} /> 
 * 
 */
export function createUseField<State extends Dict>(store:ReactAutoStore<State>){
    return  (function () {

        // 1. 参数处理
        const args = arguments;
        // 是否多段: 第一个参数是数组(string | string[] | StateGetter)[]
        const isMultiParts = Array.isArray(args[0]) && args[0].length > 1;
        const selector: string[] | undefined = args.length >= 1 && typeof (args[0]) === 'string' ? args[0].split(PATH_DELIMITER) : undefined;
        const getter = args.length >= 2 && typeof (args[0]) === 'function' ? args[0] : undefined;
        const setter = args.length >= 2 && typeof (args[1]) === 'function' ? args[1] : undefined;

        const getters = (isMultiParts ? args[0] : [selector || getter]) as unknown as (string | string[] | UseFieldGetter<any, State>)[];

        const createUseFieldBinding = useCallback((path: string[] | string | undefined, val: any,part:number) => {
            const binding = {
                value: val,
                onChange: (e: any) => {
                    const inputValue = getInputValueFromEvent(e);
                    if (path) {
                        store.update(state => setVal(state, Array.isArray(path) ? path : path.split(PATH_DELIMITER), inputValue));
                    } else {
                        if(isMultiParts){
                            setter(part,inputValue, store.state);
                        }else{
                            setter(inputValue, store.state);
                        }
                    }
                }
            } as UseFieldBinding
            if(path){
                const fieldName=  Array.isArray(path) ? path.join(PATH_DELIMITER) : path
                binding['name']= fieldName
                // binding["data-field-name"] = fieldName
            }
            return binding
        }, []); 

        const [ bindings, setBindings ] = useState(() => {
            return getters.map((getter,index) => {
                if (typeof (getter) === 'function') {
                    return createUseFieldBinding(undefined, getter(store.state),index);
                } else {
                    const val = getValueBySelector(store, getter, true) //: store.state;            
                    if (typeof (getter) === 'string') {
                        return createUseFieldBinding(getter, val, index);
                    } else if (Array.isArray(getter)) {
                        return createUseFieldBinding(getter.join(PATH_DELIMITER), val, index);
                    } 
                }
            });
        }); 

        // 收集依赖
        // const deps = store.useDeps(getters)
        // deps=[getter1'deps,...,getterN'deps]  记录了每一个getter的依赖
        // mergedDeps=[dep1,...,depN]  合并去重了记录了所有getter的依赖，用于订阅
        const [ [allDeps,mergedDeps] ] = useState<[string[][][],string[][]]>(()=>{        
            // 如果是异步计算属性，则会自动依赖于其value    
            const allDeps = getters.map(getter=>getDepends(getter,store,'value'))   
            // 合并所有依赖并消除重复
            const mergedDeps = noRepeat(allDeps.reduce((r,cur)=>{
                if(cur) r.push(...cur)
                return r
            },[] as string[][]))
            return [allDeps,mergedDeps]
        })

        if (mergedDeps.length === 0 || args.length === 0) {
            return {}
        }

        useEffect(() => {
            let watcher: Watcher;            
            watcher = store.watch(mergedDeps, ({ path, value }) => {   
                // 判断是哪一个getter的依赖发生了变化                 
                allDeps.forEach((itemDep,index)=>{          
                    if(itemDep.some(dep=>isPathEq(dep,path))){
                        const getter = getters[index]
                        if (typeof (getter) === 'function') {
                            const newValue = getter(store.state);
                            bindings[index] = createUseFieldBinding(undefined, newValue,index)
                            setBindings([...bindings]);                            
                        } else {               
                            bindings[index] = createUseFieldBinding(path, value,index)
                            setBindings([...bindings]); 
                        }
                    }  
                })                    
            });
            
            return () => watcher.off();
        }, [mergedDeps]);

        return isMultiParts ? bindings : bindings[0];
    }) as unknown as UseFieldType<State>
} 


