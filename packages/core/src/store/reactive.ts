import { isRaw } from '../utils/isRaw';
import { hookArrayMethods } from './hookArray';
import { StateOperateType } from './types'; 
import { CyleDependError, ValidateError } from '../errors'; 
import { ComputedState, Dict } from '../types';
import type { AutoStore } from './store';
import { isValidator } from '../utils';
import { PATH_DELIMITER } from '../consts'; 
import type { ValidatorObject } from '../validate/validator';


const __NOTIFY__ = Symbol('__NOTIFY__')

export type ReactiveNotifyParams<T=any> = {
    type:StateOperateType, path: string[], indexs:number[] , value: T, oldValue: T, parentPath: string[], parent: any,
    operates?:StateOperateType[]
}



type CreateReactiveObjectOptions = {
  notify:(params:ReactiveNotifyParams)=>void
  createComputedObject:(path:string[],value:Function,parentPath:string[],parent:any)=>any
};
 

function isValidPass(this:AutoStore<any>,proxyObj:any,key:string,newValue:any,oldValue:any,parentPath: string[]){
    if(proxyObj.__validators && key in proxyObj.__validators){
        const validator = proxyObj.__validators[key]  as ValidatorObject
        const path = [...parentPath,key]
        const strPath = path.join(PATH_DELIMITER)
        let isValid:boolean = true
        let errorTips:string = validator.errorTips || 'invalid value'
        let isPass:boolean = true
        try{
            isValid =  validator.validate?.call(this,newValue,oldValue,strPath) || true
        }catch(e:any){
            if(e instanceof ValidateError){
                errorTips = e.message
            }
        }finally{
            if(isValid){
                if(strPath  in this.validators.errors){
                    delete this.validators.errors[strPath]
                }
            }else{
                this.validators.errors[strPath] = errorTips!
                this.emit("invalid",{path,newValue,oldValue,error:errorTips})    
                isPass = validator.pass??true             
            }            
        }
        return isPass
    } 
    return true
}


function createProxy(this:AutoStore<any>,target: any, parentPath: string[],proxyCache:WeakMap<any,any>,isComputedCreating:Map<any,any>,options: CreateReactiveObjectOptions):any{
    if(isRaw(target)) return target
    if (typeof target !== 'object' || target === null) {
        return target;
    }
    if (proxyCache.has(target)) { 
        return proxyCache.get(target);
    }    
    const proxyObj = new Proxy(target, {             
        get: (obj, key, receiver) => { 
            const value = Reflect.get(obj, key, receiver);  
            if(typeof(key)!=='string') return value             
            const path = [...parentPath, String(key)];
            if(typeof value === 'function' || !Object.hasOwn(obj,key)){
                if(typeof value === 'function'){
                    if(Array.isArray(obj)){           
                        return hookArrayMethods(options.notify,obj,key as string,value,parentPath); 
                    }else if(!isRaw(value) && Object.hasOwn(obj,key)){           
                        const pathKey = path.join('.')                          
                        try{  
                            if(isComputedCreating.has(pathKey)){  // 如果已经创建过计算属性，则直接返回
                                const cylePaths = [...isComputedCreating.keys(),pathKey]
                                isComputedCreating.clear()
                                throw new CyleDependError(`Find circular dependency at <"${path}">, steps: ${cylePaths.join(' -> ')}`)
                            }
                            isComputedCreating.set(pathKey,true)
                            return options.createComputedObject(path,value,parentPath,obj)    // 如果值是一个函数，则创建一个计算属性或Watch对象
                        }finally{
                            isComputedCreating.delete(pathKey)
                        }
                    }else{
                        return value
                    }
                }else{
                    return value
                }                   
            }else if(isValidator(value)){
                if(!proxyObj.__validators)proxyObj.__validators = {}
                const pathKey = [...parentPath, String(key)].join(PATH_DELIMITER)
                const validator = Object.assign({pass:false},this.options.validator,value,{path:pathKey})
                proxyObj.__validators[key] = validator        
                this.validators.set(pathKey,validator)
                return value.value
            }                
            options.notify({type:'get', path,indexs:[], value,oldValue: undefined, parentPath,parent: obj});                        
            return  createProxy.call(this,value, path,proxyCache,isComputedCreating,options); 
        },
        set: (obj, key, value, receiver) => {
            const oldValue = Reflect.get(obj, key, receiver);            
            if(isValidPass.call(this,proxyObj,key as string,value,oldValue,parentPath)){
                let success = Reflect.set(obj, key, value, receiver);
                if(key === __NOTIFY__) return true  
                if (success && key!==__NOTIFY__ && value!==oldValue) {
                    const path = [...parentPath, String(key)];
                    options.notify({type:Array.isArray(obj) ? 'update' : 'set', path,indexs: [], value, oldValue, parentPath, parent:obj});
                }
                return success;
            }else{
                return false
            }
        },
        deleteProperty: (obj, prop) => {
            const value = obj[prop];
            const path = [...parentPath, String(prop)];
            const success = Reflect.deleteProperty(obj, prop);
            if (success && prop!==__NOTIFY__) {
                options.notify({type:'delete', path,indexs: [],value,oldValue: undefined, parentPath,parent: obj});
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
export function createReactiveObject<State extends Dict>(this:AutoStore<any>,state:State,options?: CreateReactiveObjectOptions): ComputedState<State> {
    const isComputedCreating = new Map()
    const proxyCache = new WeakMap();
    return createProxy.call(this,state, [],proxyCache,isComputedCreating,options!) as ComputedState<State>
} 
 