import { useEffect } from "react"
import {  Dict, WatchListenerOptions } from "autostore" 
import type { ReactAutoStore } from "../store"

/**
 *  
 *   实现表单与store的双向绑定
 * 
 *   const { state,useForm,bindings } = createStore({...})
 *  
 *   <form {...bindings}>
 *      <input name="a" value={bindings.a}/>
 *      <input name="b" value={bindings.b}/>
 *      <input name="c" value={bindings.c}/>
 *   </form>
 * 
 *   bindings.reset()  // 重置表单 
 *   
 * 
 * @returns 
 */
export function createUseForm<State extends Dict>(store:ReactAutoStore<State>){
    return ()=>{        
        const selector = arguments[0]
        const options = arguments[1]
        
        const bindings = store.useFormBindings(selector,options)

        return {
            bindings
        }    
    } 
}
