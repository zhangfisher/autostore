

import 'reflect-metadata';
import { isRaw } from '../utils/isRaw';
import { hookArrayMethods } from './hookArray';
import { StateOperateParams, StateOperates } from './types'; 


type CreateReactiveObjectOptions = {
  notify:(type:StateOperates, path: string[], indexs:number[] , value: any, oldValue: any, parentPath: string[], parent: any)=>void
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
    const notice = (receiver:any,type:StateOperates, path: string[], indexs:number[] , value: any, oldValue: any, parentPath: string[], parent: any)=>{
        const fn = receiver.__notify__ && typeof(receiver.__notify__ =='function') ? receiver.__notify__ : notify
        fn(type,path,indexs,value,oldValue,parentPath,parent)
    }
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
                            return hookArrayMethods((...args:any[])=>notice(receiver,...args),obj,prop as string,value,parentPath); 
                        }else if(!isRaw(value) && Object.hasOwn(obj,prop)){                          
                            return createDynamicValueObject(path,value,parentPath,obj)    // 如果值是一个函数，则创建一个计算属性或Watch对象
                        }else{
                            return value
                        }
                    }else{
                        return value
                    }                   
                }                
                notice(receiver,'get', path,[], value, undefined, parentPath, obj);
                return createProxy(value, path);
            },
            set: (obj, prop, value, receiver) => {
                const oldValue = obj[prop];
                const path = [...parentPath, String(prop)];
                const success = Reflect.set(obj, prop, value, receiver);
                if (success) {
                    if (Array.isArray(obj)) {
                        if(prop === 'length'){
                            if (value < oldValue) {
                                notify('remove', parentPath, [],oldValue,undefined,  parentPath, obj);
                            }
                        }else{
                            notice(receiver,'update', parentPath, [Number(prop)], value, oldValue, parentPath, obj);
                        }                        
                    } else {
                        notice(receiver,'set', path, [], value, oldValue, parentPath, obj); 
                    }
                }
                return success;
            },
            deleteProperty: (obj, prop) => {
                const value = obj[prop];
                const path = [...parentPath, String(prop)];
                const success = Reflect.deleteProperty(obj, prop);
                if (success) {
                    notice(undefined,'delete', path, [],value, undefined, parentPath, obj);
                }
                return success;
            }
        })
    } 
    return createProxy(state, []) as State
} 



/**
 * 
 * 创建一个具有独立更新作用范围的对象
 * 
 * 
 * @description
 * 
 * const reactiveObject = createReactiveObject(state,{
 *  notify:(params)=>{
 *      DEFAULT: 此处响应读取操作   
 *  }
 * })
 * 
 * const scope1= createScopeObject(reactiveObject,(params)=>{
 *     SHADOW:此处响应读取操作   
 * })
 * scope1.xxx.xxx
 * scope1.xxx.xx="1111"
 * 
 * 对scope1的读取只会在SHADOW处发生，而不会在DEFAULT发生
 * 
 * 
 * 
 * @param state 
 * @param options 
 */
export function createScopeObject<State extends object>(obj:State,callback:(type:StateOperates, path: string[], indexs:number[] , value: any, oldValue: any, parentPath: string[], parent: any)=>void): State {
    const scopeObj = Object.create(obj)
    scopeObj.__notify__ = callback
    return scopeObj as State
}



