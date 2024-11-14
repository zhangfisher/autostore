
import { PATH_DELIMITER, setVal, Watcher, type Dict,  getDepends, noRepeat, isPathEq, isPlainObject, isFunction, getId } from "autostore";
import { type ReactAutoStore } from '../store';
import { useEffect, useState } from 'react';
import { getValueBySelector } from '../utils/getValueBySelector';
import { getInputValueFromEvent } from '../utils/getInputValueFromEvent'; 
import { UseFieldGetter, UseFieldOptions, UseFieldSetter, UseFieldType } from './types'; 
import { isNumber } from "../utils/isNumber";

export type UseFieldBinding = {
    checked?: boolean
    value: any
    onChange: (e: any) => void
    name?: string 
}

export function createFieldBinding<State extends Dict,Value=any>(
    store:ReactAutoStore<State>,
    path:string[] | undefined,
    part:number,
    value:any,
    fieldValue:any,
    setter:UseFieldSetter<Value,State> | undefined,
    options:UseFieldOptions 
){    
    const getCheckedValue = (val:any)=>{
        if(options.type==='radio'){
            return fieldValue === val
        }else if(options.type==='checkbox'){
            return Boolean(value)
        }
    }
    
    const fieldName = options.name ? options.name : (Array.isArray(path) ? path.join(PATH_DELIMITER) : path || '')        

    return new Proxy({
        value,
        onChange:(e:any)=>{
            let inputValue = getInputValueFromEvent(e)
            if(isFunction(options.toState)){
                inputValue = options.toState(inputValue,{path,part})
            }
            if(isFunction(setter)){
                setter({value:inputValue,path,part},store.state);
            }else{
                if(path){
                    store.update(state => setVal(state, path, inputValue));
                }
            }        
        },
        name: fieldName,
        checked: getCheckedValue(value),
        'data-field':true
    },{
        get(target, key:string,receiver){             
            if(isNumber(key) && options.type==='radio' && options.values){
                const part = Number(key)
                return createFieldBinding(store,path,part,options.values[part],value,setter,options)
            }
            return Reflect.get(target, key,receiver);
        } 
    })  
}


/**
 * 
 * useField用来为表单元素提供绑定数据的hook
 * 
 * 
 * @example
 * 
 * const bindPrice = useField("order.price") 
 * <input {...bindPrice} />
 * 
 * @example
 * 
 * 如果输入的路径是一个对象，则会返回一个对象，包含了所有属性的绑定
 * 
 * 注意：不支持嵌套对象
 * 
 * const bindOrder = useField<typeof state.order>("order") 
 * <input {...bindOrder.price} />
 * <input {...bindOrder.count} />
 * 
 * 
 * @example
 *  
 * const bindFullname = useField((state=>state.firstName + ' ' +state.lastName,(input,state)=>{
*          const [firstName,lastName]  = value.split(' ')
*          state.firstName = firstName
*          state.lastName = lastName
  * }) 
 * <input {...bindFullname} /> 
 * 
 * 
 * @example
 * 
 * 绑定多个值到多个input
 * const bindSex = useField("order.sex",{type:"radio",values:['男','女']}) 
 * <input type="radio" {...bindSex} />
 * <input type="radio" {...bindSex} />
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

        const [ options ] = useState<UseFieldOptions>(()=>{
            return args.length >= 2 && isPlainObject(args[1]) ? args[1]
            :  ( args.length === 3 && isPlainObject(args[2]) ? args[2] : {})
        })


        const [ bindings, setBindings ] = useState(() => {
            return getters.map((getter,index) => {
                if (typeof (getter) === 'function') {
                    return createFieldBinding(
                        store,undefined,
                        index,getter(store.state),undefined,setter,options);
                } else {
                    const val = getValueBySelector(store, getter, true)       
                    return createFieldBinding(
                        store,Array.isArray(getter) ? getter : getter.split(PATH_DELIMITER),
                        index,val,undefined,setter,options);
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
                            bindings[index] = createFieldBinding(
                                store,undefined,
                                index,newValue,undefined,setter,options);

                            setBindings([...bindings]);                            
                        } else {               
                            bindings[index] = createFieldBinding(store,path,index,value,undefined,setter,options);
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



 