import { isRaw } from '../utils/isRaw';
import { hookArrayMethods } from './hookArray';
import { StateOperates } from './types'; 
import { CyleDependError } from '../errors';
import { ComputedState } from '../descriptor';
import { AutoStore } from './store';
 

const __NOTIFY__ = Symbol('__NOTIFY__')

export type ReactiveNotifyParams<T=any> = {
    type:StateOperates, path: string[], indexs:number[] , value: T, oldValue: T, parentPath: string[], parent: any,
    operates?:StateOperates[]
}



type CreateReactiveObjectOptions = {
  notify:(params:ReactiveNotifyParams)=>void
  createComputedObject:(path:string[],value:Function,parentPath:string[],parent:any)=>any
};
 

function createProxy(store:AutoStore<any>,target: any, parentPath: string[],proxyCache:WeakMap<any,any>,isComputedCreating:Map<any,any>,options: CreateReactiveObjectOptions):any{
    const { notify,createComputedObject } = options
    if (proxyCache.has(target)) { 
        return proxyCache.get(target);
    }
    if (typeof target !== 'object' || target === null) {
        return target;
    }
    if(isRaw(target)) return target
    const proxyObj = new Proxy(target, {             
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
            if(!store.silenting) notify({type:'get', path,indexs:[], value,oldValue: undefined, parentPath,parent: obj});            
            return  createProxy(store,value, path,proxyCache,isComputedCreating,options); 
        },
        set: (obj, prop, value, receiver) => {
            const oldValue = Reflect.get(obj, prop, receiver);
            let success = Reflect.set(obj, prop, value, receiver);
            if(prop === __NOTIFY__) return true  
            if (success && prop!==__NOTIFY__ && !store.silenting) {
                const path = [...parentPath, String(prop)];
                notify({type:'set', path,indexs: [], value, oldValue, parentPath, parent:obj});  
            }
            return success;
        },
        deleteProperty: (obj, prop) => {
            const value = obj[prop];
            const path = [...parentPath, String(prop)];
            const success = Reflect.deleteProperty(obj, prop);
            if (success && prop!==__NOTIFY__ && !store.silenting) {
                notify({type:'delete', path,indexs: [],value,oldValue: undefined, parentPath,parent: obj});
            }
            return success;
        }
    })
    proxyCache.set(target, proxyObj);
    return proxyObj

}

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
export function createReactiveObject<State extends object>(store:AutoStore<State>,state:State,options?: CreateReactiveObjectOptions): ComputedState<State> {
    const isComputedCreating = new Map()
    const proxyCache = new WeakMap();
    return createProxy(store,state, [],proxyCache,isComputedCreating,options!) as ComputedState<State>
} 
 