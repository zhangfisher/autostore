import {  Dict, getVal,isPrimitive, isPlainObject, setVal, PATH_DELIMITER, pathStartsWith, isAsyncComputedValue, StateOperate } from "autostore";
import { ReactAutoStore } from "../store";
import { useState, useSyncExternalStore } from "react";
import type { UseFieldsOptions, UseFieldsType } from "./types";  
import { createFieldBinding } from "./useField";

export const FAKE_BINDINGS = Symbol('FAKE_BINDINGS')

/**
 * 
 * 构建一个假的对象绑定
 * 
 * @description
 * 
 * 为什么要构建假的对象绑定？
 * 
 * 主要是为了节约内存，如果没有访问到就不需要去创建绑定对象
 * 
 * @param store 
 * @param val 
 * @returns 
 */
export function createFakeObjectBindings<State extends Dict>(store:ReactAutoStore<State>,val:object){
    const bindings = {} as Record<string,any>    
    if (val instanceof Map) {
        val.forEach((value, key) => {
            bindings[key] = FAKE_BINDINGS;
        });
    } else {
        Object.entries(val).forEach(([key])=>{
            bindings[key] = FAKE_BINDINGS
        })    
    }
    return bindings
}


function createProxy<State extends Dict>(target: any, parentPath: string[],proxyCache:Map<any,any>,store:ReactAutoStore<State>,options:Required<UseFieldsOptions>):any{
    const entry:string[] = Array.isArray(options.entry) ? options.entry : options.entry.split(PATH_DELIMITER)
    if (typeof target !== 'object' || target === null) {
        return target;
    }    
    const pathKey = parentPath.length===0 ? "__ROOT__" : parentPath.join('.')
    if (proxyCache.has(pathKey)) { 
        return proxyCache.get(pathKey);
    }
    let fakeTarget = target  
    if(Array.isArray(target)){
        fakeTarget = createFakeObjectBindings(store,target)
    }else if(isPlainObject(target)){
        fakeTarget =  createFakeObjectBindings(store,target)
    }
    
    const proxyObj = new Proxy(fakeTarget, {             
        get: (obj, key, receiver) => { 
            if(typeof(key)!=='string') return Reflect.get(obj, key, receiver);            
            const path = [...entry,...parentPath, String(key)];      
            const relPathKey = [...parentPath, String(key)].join(PATH_DELIMITER)     
            const value = getVal(store.state,path);    
            if(isPrimitive(value)){
                const  fieldOpts = (relPathKey in options ? options[relPathKey] : {}) as any
                return createFieldBinding(store,path,0,value,undefined,undefined,fieldOpts)
            }else if(isAsyncComputedValue(value)){
                const  fieldOpts = (relPathKey in options ? options[relPathKey] : {}) as any
                return createFieldBinding(store,[...path,'value'],0,value,undefined,undefined,fieldOpts)
            }else{
                return createProxy(value, path,proxyCache,store,options);     
            } 
        } 
    })
    proxyCache.set(pathKey, proxyObj);
    return proxyObj
}


export function createBindingsState<State extends Dict>(store:ReactAutoStore<State>,options:Required<UseFieldsOptions>){
    const proxyCache = new Map();
    return createProxy<State>({}, [],proxyCache,store,options)  
}

function getStateEntry(entry:string | string[]){
    return Array.isArray(entry) ? entry : entry.split(PATH_DELIMITER)
}

export function createUseFields<State extends Dict>(store:ReactAutoStore<State>): UseFieldsType<State>{ 
    return function (options?:UseFieldsOptions){
        const opts = Object.assign({entry:[]},options) as Required<UseFieldsOptions>        

        const [ snap,setSnap ] = useState(()=>{
            return store.getSnap({entry:getStateEntry(opts.entry)})
        })

        const [ bindingsState ] = useState(()=>createBindingsState(store,opts))

        useSyncExternalStore((callback)=>{
            const entry = getStateEntry(opts.entry)
            const watcher = store.watch((op)=>{   
                if(op.reply) return
                const ops =  (op.type =='batch' ? op.value : [op]) as StateOperate[]
                ops.forEach(({path,value})=>{
                    if(!pathStartsWith(entry,path)) return     
                    const relPath =path.slice(entry.length)
                    setVal(snap,relPath,value)
                    setVal(bindingsState,[...relPath,'value'],value)
                })
                setSnap({...snap})
                callback()
            },{operates:'write'})  
            return ()=>{
                watcher.off()
            }
        },()=>snap)

        return bindingsState        
    }
}