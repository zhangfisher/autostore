import {  Dict, getVal,isPrimitive, isPlainObject, setVal, PATH_DELIMITER, pathStartsWith, isAsyncComputedValue } from "autostore";
import { ReactAutoStore } from "../../store";
import { useState, useSyncExternalStore } from "react";
import { createFakeObjectBindings, createInputBinding } from "./bindings"; 
import type { UseFormBindingsType } from "../types";  


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
                return createInputBinding(store,path,value)
            }else if(isAsyncComputedValue(value)){
                return createInputBinding(store,[...path,'value'],value)
            }else{
                return createProxy(value, path,proxyCache,store,entry);     
            } 
        } 
    })
    proxyCache.set(pathKey, proxyObj);
    return proxyObj

}


export function createFormBindingsState<State extends Dict>(store:ReactAutoStore<State>,entry:string[]){
    const proxyCache = new Map();
    return createProxy<State>({}, [],proxyCache,store,entry)  
}


export function createUseFormBindings<State extends Dict>(store:ReactAutoStore<State>): UseFormBindingsType<State>{ 
    return function (){
        const args = arguments
        const entry =args.length > 0 ? 
                        (   typeof(args[0])==='string' ? args[0].split(PATH_DELIMITER) 
                            : (Array.isArray(args[0]) ? args[0] : [])
                        ) : []

        const [ snap,setSnap ] = useState(()=>{
            return store.getSnap({entry})
        })

        const [bindingsState] = useState(()=>createFormBindingsState(store,entry))

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

// const store = new ReactAutoStore({
//     order:{
//         price:100,
//         count:1,
//         total:(scope:any)=>scope.price*scope.count
//     },
//     addresss:[
//         {
//             city:"BeiJing",
//             street:"chang'an"
//         },
//         {
//             city:"ShangHai",
//             street:"nanjing"
//         },
//         {
//             city:"QuanZhou",
//             street:"TianAn"
//         }
//     ]
// })

// const useBindings = createUseFormBindings(store)
// const bindings = useBindings()
// bindings.order
// bindings.order.price
// bindings.order.total


// console.log("end")