/**
 * 
 * 创建一个自动管理的store
 * 
 * 
 * @example
 * 
 * const MyComponent = ()=>{
 * 
 * const store = useStore({
 *      price: 1,
 *      count: 2,
 *      total : (order)=>order.price * order.count
 * })
 * 
 * 
 * 
 * 
 * }
 * 
 * 
 * 
 */


import { Dict,AutoStoreOptions } from "autostore"
import { ReactAutoStore } from "../store"    
import { useRef} from "react" 

export function useStore<State extends Dict>(define:State,options?:AutoStoreOptions<State>){
    const ref = useRef<ReactAutoStore<State>>()
    if (!ref.current) {
        ref.current = new ReactAutoStore<State>(define,options);
    }
    return ref.current    
}