/**
 * 
 *  基于开发工具
 * 
 *  Redux DevTools 是一个实用工具，用于开发和调试 Redux 应用程序。
 *  AutoStore是基于Redux DevTools 的简单包装，可以让开发者使用Redux DevTools
 *  来查看AutoStore的状态变化 
 * 
 *  import { createStore } from "@autostorejs/react"
 *  import { install } from "@autostorejs/devtools"
 * 
 *  
 *  const store = createStore({})
 * 
 *  install()
 * 
 */

import { createStore } from "redux"
 
const initialState = {}


export class AutoStoreDevTools{
    private reduxStore:any
    private _installed:boolean = false
    stores = new WeakMap()

    constructor(){
        this.install()
    }
    add(store:any){      
        this.stores.set(store,true)  
        this.stores.push(store)
        store.changesets.onAny((payload:any,type:any)=>{
            this.reduxStore.dispatch({
                type,
                store,
                payload 
            })
        })
    }
    remove(store:any){
        const index = this.stores.indexOf(store)
        if(index!==-1){
            this.stores.splice(index,1)
        }
    }

    private reducer(state:object = initialState, action:any){
        return {
            ...state,
            [action.store.id]:{...action.store.state}
        }
    }
    private install(){
        if(this._installed) return 
        this.reduxStore = createStore(
            this.reducer,
            // @ts-ignore
            window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
        );
        this.stores.forEach((store)=>{
            this.add(store)
        })
        this._installed = true
    }
}

export function install(){
    if(!globalThis.__AUTO_STORES__) globalThis.__AUTO_STORES__ = new AutoStoreDevTools()    
} 

declare global{
    var __AUTO_STORES__ : AutoStoreDevTools
}