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

//@ts-ignore
import { createStore } from "redux"
import { WeakObjectMap } from "./utils"
 
const initialState = {
     
}


export class AutoStoreDevTools{
    private reduxStore:any
    private _installed:boolean = false
    stores = new WeakObjectMap()
    constructor(){
        this.install()
    }
    private onStoreUnload(){

    }
    add(store:any){      
        this.stores.set(store.id,store)
        store.operates.onAny((payload:any,type:any)=>{   
            if(payload.type=='get') return 
            this.reduxStore.dispatch({
                type:`${payload.type}@${type}`,
                store,
                payload 
            })
        })
        this.reduxStore.dispatch({
            type:"__ADD_STORE__",
            store
        })
    }
    remove(store:any){        
        if( this.stores.has(store.id)){
            this.stores.delete(store.id)
        }
    }
    private reducer(state:object = initialState, action:any){
        if(action.type.startsWith("@@")) return state
        if(action.type==='__ADD_STORE__') {
            return {
                ...state,
                [`AutoStore<${action.store.id}>`]:{...action.store.getSnap()}
            }
        }else{
            return {
                ...state,
                [`AutoStore<${action.store.id}>`]:{...action.store.getSnap()}
            }
        }        
    }
    private install(){
        if(this._installed) return 
        this.reduxStore = createStore(
            this.reducer,
            // @ts-ignore
            window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
        );        
        this._installed = true
    }
}

export function install(){
    if(!globalThis.__AUTO_STORES__) globalThis.__AUTO_STORES__ = new AutoStoreDevTools()    
} 

declare global{
    var __AUTO_STORES__ : AutoStoreDevTools
}


install()