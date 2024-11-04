import { ComputedOptions, Dict } from "autostore"
import { ReactAutoStore } from "../store"
import { createUseObserver } from "./useObserver"
import { UseComputedType } from "./types"

 
export function createUseComputed<State extends Dict>(store:ReactAutoStore<State>){
    return ((params:any,computedOptions?:ComputedOptions)=>{
        return createUseObserver(store as any)(params)
    })  as UseComputedType<State>
} 