import {  Dict, getVal,isPrimitive, isPlainObject, setVal, PATH_DELIMITER, pathStartsWith, isAsyncComputedValue } from "autostore";
import { ReactAutoStore } from "../store";
import { useState, useSyncExternalStore } from "react";
import type { UseFieldsType } from "./types";  
import { getInputValueFromEvent } from "../utils/getInputValueFromEvent";

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

 

export function createFieldBinding<State extends Dict>(store:ReactAutoStore<State>,path:string[],val:any){    
    return {
        value:val,
        onChange:(e:any)=>{
            const inputValue = getInputValueFromEvent(e)
            store.update(state=>setVal(state, path,inputValue))
        }
    }   
}

function createProxy<State extends Dict>(target: any, parentPath: string[],proxyCache:Map<any,any>,store:ReactAutoStore<State>,entry:string[]):any{
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
            const value = getVal(store.state,path);    
            if(isPrimitive(value)){
                return createFieldBinding(store,path,value)
            }else if(isAsyncComputedValue(value)){
                return createFieldBinding(store,[...path,'value'],value)
            }else{
                return createProxy(value, path,proxyCache,store,entry);     
            } 
        } 
    })
    proxyCache.set(pathKey, proxyObj);
    return proxyObj
}


export function createBindingsState<State extends Dict>(store:ReactAutoStore<State>,entry:string[]){
    const proxyCache = new Map();
    return createProxy<State>({}, [],proxyCache,store,entry)  
}


export function createUseFields<State extends Dict>(store:ReactAutoStore<State>): UseFieldsType<State>{ 
    return function (){
        const args = arguments
        const entry =args.length > 0 ? 
                        (   typeof(args[0])==='string' ? args[0].split(PATH_DELIMITER) 
                            : (Array.isArray(args[0]) ? args[0] : [])
                        ) : []

        const [ snap,setSnap ] = useState(()=>{
            return store.getSnap({entry})
        })

        const [ bindingsState ] = useState(()=>createBindingsState(store,entry))

        useSyncExternalStore((callback)=>{
            const watcher = store.watch(({path,value})=>{   
                if(!pathStartsWith(entry,path)) return            
                const relPath =path.slice(entry.length)
                setVal(snap,relPath,value)
                setVal(bindingsState,[...relPath,'value'],value)
                setSnap({...snap})
                callback()
            })  
            return ()=>{
                watcher.off()
            }
        },()=>snap)

        return bindingsState        
    }
}