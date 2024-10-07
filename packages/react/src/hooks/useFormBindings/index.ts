import { ComputedState, Dict, getVal,AutoStore, isPlainObject } from "@autostorejs/core";
import { ReactAutoStore } from "../../store";
import { useState, useSyncExternalStore } from "react";
import { createFakeObjectBindings, createInputBinding, createInputObjectBindings } from "./bindings";
import { isPrimitive } from "../../utils/isPrimitive";



function createProxy<State extends Dict>(target: any, parentPath: string[],proxyCache:Map<any,any>,store:ReactAutoStore<State>):any{
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
            const path = [...parentPath, String(key)];
            const value = getVal(store.state,path);    
            if(isPrimitive(value)){
                return createInputBinding(store,path,value)
            }else{
                return createProxy(value, path,proxyCache,store);     
            } 
        } 
    })
    proxyCache.set(pathKey, proxyObj);
    return proxyObj

}


export function createFormBindingsState<State extends Dict>(store:ReactAutoStore<State>){
    const proxyCache = new Map();
    return createProxy<State>({}, [],proxyCache,store)
}


export function createUseFormBindings<State extends Dict>(store:ReactAutoStore<State>){ 
    return ()=>{
        useSyncExternalStore((callback)=>{
            const watcher = store.watch(()=>{
                callback()
            })  
            return ()=>watcher.off()
        },()=>store.state)
        const [bindingsState] = useState(()=>createFormBindingsState(store))
        return bindingsState        
    }
}

const store = new ReactAutoStore({
    order:{
        price:100,
        count:1,
        total:(scope:any)=>scope.price*scope.count
    },
    addresss:[
        {
            city:"BeiJing",
            street:"chang'an"
        },
        {
            city:"ShangHai",
            street:"nanjing"
        },
        {
            city:"QuanZhou",
            street:"TianAn"
        }
    ]
})

const state = createFormBindingsState(store)

state.order
state.order.price 
state.addresss[0]

console.log("end")