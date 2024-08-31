

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
    
    const notice = (scopeNotify:any,params:ReactiveNotifyParams)=>{
        const fn = scopeNotify && typeof(scopeNotify=='function') ? scopeNotify : notify
        fn(params)
    }    
    const createProxy = (target: any, parentPath: string[],scopeNotify:any): any =>{
        if (typeof target !== 'object' || target === null) {
            return target;
        }
        if(isRaw(target)) return target
        return new Proxy(target, {             
            get: (obj, prop, receiver) => {
                const value = Reflect.get(obj, prop, receiver);                
                if(prop === __NOTIFY__) return value
                if(parentPath.length===0 && receiver[__NOTIFY__]  && typeof(receiver[__NOTIFY__])==='function'){
                    scopeNotify = receiver[__NOTIFY__] 
                }else{
                    scopeNotify=null
                }
                const path = [...parentPath, String(prop)];
                if(!Object.hasOwn(obj,prop) || typeof value === 'function'){
                    if(typeof value === 'function'){
                        if(Array.isArray(obj)){                            
                            return hookArrayMethods((params:ReactiveNotifyParams)=>notice(scopeNotify,params),obj,prop as string,value,parentPath); 
                        }else if(!isRaw(value) && Object.hasOwn(obj,prop)){                          
                            return createDynamicValueObject(path,value,parentPath,obj)    // 如果值是一个函数，则创建一个计算属性或Watch对象
                        }else{
                            return value
                        }
                    }else{
                        return value
                    }                   
                }                
                notice(scopeNotify,{type:'get', path,indexs:[], value,oldValue: undefined, parentPath,parent: obj});
                const p =Object.create(createProxy(value, path,scopeNotify))
                p[__NOTIFY__] = scopeNotify
                return p // createProxy(value, path,scopeNotify);
            },
            set: (obj, prop, value, receiver) => {
                const oldValue = obj[prop];
                const path = [...parentPath, String(prop)];
                let success = Reflect.set(obj, prop, value, receiver);
                if(prop === __NOTIFY__) return true
                if(parentPath.length===0 && receiver[__NOTIFY__]  && typeof(receiver[__NOTIFY__])==='function'){
                    scopeNotify = receiver[__NOTIFY__] 
                }else{
                    scopeNotify=null
                }
                if (success && prop!==__NOTIFY__) {
                    if (Array.isArray(obj)) {
                        if(prop === 'length'){
                            if (value < oldValue) {
                                notice(scopeNotify,{type:'remove',path: parentPath,indexs:[],oldValue,value:undefined,  parentPath,parent: obj});
                            }
                        }else{
                            notice(scopeNotify,{type:'update',path: parentPath,indexs: [Number(prop)], value, oldValue, parentPath, parent:obj});
                        }                        
                    } else {
                        notice(scopeNotify,{type:'set', path,indexs: [], value, oldValue, parentPath, parent:obj}); 
                    }
                }
                return success;
            },
            deleteProperty: (obj, prop) => {
                const value = obj[prop];
                const path = [...parentPath, String(prop)];
                const success = Reflect.deleteProperty(obj, prop);
                if (success && prop!==__NOTIFY__) {
                    notice(scopeNotify,{type:'delete', path,indexs: [],value,oldValue: undefined, parentPath,parent: obj});
                }
                return success;
            }
        })
    } 
    return createProxy(state, [],undefined) as State
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
export function createScopeObject<State extends object>(obj:State,callback:(params:ReactiveNotifyParams)=>void): State {
    const scopeObj = Object.create(obj)
    Object.defineProperty(scopeObj,__NOTIFY__,{
        value:callback,
        writable:false,
        enumerable:false,
        configurable:false
    })  
    return scopeObj as State
}



