import { createObserverObject, Dict, ObserverBuilder, ObserverObject } from "autostore"
import { useEffect, useRef } from "react"
import { ReactAutoStore } from "../store"



export function createUseObserver<State extends Dict>(store:ReactAutoStore<State>){

    return function<Value>(params:ObserverBuilder,options?:Dict){
        if(!params) return undefined
        const ref = useRef<ObserverObject<Value>>()
        if(!ref.current){
            ref.current =  createObserverObject(store,params,options) as ObserverObject<Value>
        }
        useEffect(()=>{
            return ()=>{
                ref.current?.detach()
                ref.current = undefined
            }
        },[params]) 
        return ref.current
    }
} 