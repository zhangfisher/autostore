import { createObserverObject, Dict, ObserverBuilder, ObserverObject } from "autostore"
import { useEffect, useRef } from "react"
import { ReactAutoStore } from "../store"



export function createUseObserver<State extends Dict>(store:ReactAutoStore<State>){

    return function<Value>(params:ObserverBuilder){
        if(!params) return undefined
        const ref = useRef<ObserverObject<Value>>()

        useEffect(()=>{
            if(!ref.current){
                ref.current =  createObserverObject(store,params) as ObserverObject<Value>
            }
            return ()=>{
                ref.current?.detach()
                ref.current = undefined
            }
        },[params]) 
        return ref.current
    }
} 