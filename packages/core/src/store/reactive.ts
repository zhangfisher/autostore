

import 'reflect-metadata';
import { isRaw } from '../utils/isRaw';
import { hookArrayMethods } from './hookArray';
import { StateOperates } from './types'; 
import { CyleDependError } from '../errors';
import { ComputedState } from '../descriptor';
 

const __NOTIFY__ = Symbol('__NOTIFY__')

export type ReactiveNotifyParams<T=any> = {
    type:StateOperates, path: string[], indexs:number[] , value: T, oldValue: T, parentPath: string[], parent: any
}



type CreateReactiveObjectOptions = {
  notify:(params:ReactiveNotifyParams)=>void
  createComputedObject:(path:string[],value:Function,parentPath:string[],parent:any)=>any
};


/**
 * 创建一个响应式对象。
 * 
 * 
 * @template State - 对象状态的类型，必须是对象类型。
 * @param {State} state - 对象的状态，必须是对象类型。
 * @param {CreateReactiveObjectOptions} [options] - 可选参数，用于配置响应式对象的行为。
 * @param {CreateReactiveObjectOptions.notify} [options.notify] - 用于通知状态变化的回调函数。
 * @param {CreateReactiveObjectOptions.createDynamicValueObject} [options.createDynamicValueObject] - 用于创建动态值对象的函数。
 * @returns {State} - 返回一个响应式对象。
 */
export function createReactiveObject<State extends object>(state:State,options?: CreateReactiveObjectOptions): ComputedState<State> {
    const { notify,createComputedObject } = Object.assign({},options)

    const isComputedCreating = new Map()

    const createProxy = (target: any, parentPath: string[]): any =>{
        if (typeof target !== 'object' || target === null) {
            return target;
        }
        if(isRaw(target)) return target
        return new Proxy(target, {             
            get: (obj, key, receiver) => {
                const value = Reflect.get(obj, key, receiver);  
                if(typeof(key)!=='string') return value             
                const descriptor = Reflect.getOwnPropertyDescriptor(target, key);
                // 如果属性不可配置或只读，直接返回值
                if (descriptor && !descriptor?.configurable && !descriptor?.writable) {
                    return value
                }

                const path = [...parentPath, String(key)];
                if(!Object.hasOwn(obj,key) || typeof value === 'function'){
                    if(typeof value === 'function'){
                        if(Array.isArray(obj)){           
                            return hookArrayMethods(notify,obj,key as string,value,parentPath); 
                        }else if(!isRaw(value) && Object.hasOwn(obj,key)){           
                            const pathKey = path.join('.')                          
                            try{  
                                if(isComputedCreating.has(pathKey)){  // 如果已经创建过计算属性，则直接返回
                                    const cylePaths = [...isComputedCreating.keys(),pathKey]
                                    isComputedCreating.clear()
                                    throw new CyleDependError(`The computed property "${pathKey}" has a circular dependency, steps: ${cylePaths.join(' <- ')}`)
                                }
                                isComputedCreating.set(pathKey,true)
                                return createComputedObject(path,value,parentPath,obj)    // 如果值是一个函数，则创建一个计算属性或Watch对象
                            }finally{
                                isComputedCreating.delete(pathKey)
                            }                            
                        }else{
                            return value
                        }
                    }else{
                        return value
                    }                   
                }                
                notify({type:'get', path,indexs:[], value,oldValue: undefined, parentPath,parent: obj});
                return  createProxy(value, path); 
            },
            set: (obj, prop, value, receiver) => {
                const oldValue = obj[prop];
                const path = [...parentPath, String(prop)];
                let success = Reflect.set(obj, prop, value, receiver);
                if(prop === __NOTIFY__) return true  
                if (success && prop!==__NOTIFY__) {
                    if (Array.isArray(obj)) {
                        if(prop === 'length'){
                            if (value < oldValue) {
                                notify({type:'remove',path: parentPath,indexs:[],oldValue,value:undefined,  parentPath,parent: obj});
                            }
                        }else{
                            notify({type:'update',path: parentPath,indexs: [Number(prop)], value, oldValue, parentPath, parent:obj});
                        }                        
                    } else {
                        notify({type:'set', path,indexs: [], value, oldValue, parentPath, parent:obj}); 
                    }
                }
                return success;
            },
            deleteProperty: (obj, prop) => {
                const value = obj[prop];
                const path = [...parentPath, String(prop)];
                const success = Reflect.deleteProperty(obj, prop);
                if (success && prop!==__NOTIFY__) {
                    notify({type:'delete', path,indexs: [],value,oldValue: undefined, parentPath,parent: obj});
                }
                return success;
            }
        })
    } 
    return createProxy(state, []) as ComputedState<State>
} 


 