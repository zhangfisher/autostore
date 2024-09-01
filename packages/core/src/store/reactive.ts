

import 'reflect-metadata';
import { isRaw } from '../utils/isRaw';
import { hookArrayMethods } from './hookArray';
import { StateOperates } from './types'; 


const __NOTIFY__ = Symbol('__NOTIFY__')

export type ReactiveNotifyParams<T=any> = {
    type:StateOperates, path: string[], indexs:number[] , value: T, oldValue: T, parentPath: string[], parent: any
}



type CreateReactiveObjectOptions = {
  notify:(params:ReactiveNotifyParams)=>void
  createDynamicValueObject:(path:string[],value:Function,parentPath:string[],parent:any)=>any
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
export function createReactiveObject<State extends object>(state:State,options?: CreateReactiveObjectOptions): State {
    const { notify,createDynamicValueObject } = Object.assign({},options)
    const createProxy = (target: any, parentPath: string[]): any =>{
        if (typeof target !== 'object' || target === null) {
            return target;
        }
        if(isRaw(target)) return target
        return new Proxy(target, {             
            get: (obj, prop, receiver) => {
                const value = Reflect.get(obj, prop, receiver);                
                const path = [...parentPath, String(prop)];
                if(!Object.hasOwn(obj,prop) || typeof value === 'function'){
                    if(typeof value === 'function'){
                        if(Array.isArray(obj)){                            
                            return hookArrayMethods(notify,obj,prop as string,value,parentPath); 
                        }else if(!isRaw(value) && Object.hasOwn(obj,prop)){                          
                            return createDynamicValueObject(path,value(),parentPath,obj)    // 如果值是一个函数，则创建一个计算属性或Watch对象
                        }else{
                            return value
                        }
                    }else{
                        return value
                    }                   
                }                
                notify({type:'get', path,indexs:[], value,oldValue: undefined, parentPath,parent: obj});
                return createProxy(value, path);
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
    return createProxy(state, []) as State
} 


 