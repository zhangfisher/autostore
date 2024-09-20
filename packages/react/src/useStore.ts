/**
 * 
 * 创建一个自动管理的store
 * 
 * 
 * @example
 * 
 * const MyComponent = ()=>{
 * 
 * const { } = useStore({
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


import { Dict } from "autostore"
import { ReactAutoStore } from "./store"    
import { useEffect, useRef} from "react"
export function useStore<State extends Dict>(define:State){
    const ref = useRef<ReactAutoStore<State>>()
   // 使用 useEffect 确保仅在组件挂载时运行  
   useEffect(() => {  
        if (!ref.current) {  
            ref.current = new ReactAutoStore<State>(define);  
        }  
        return () => {  
            ref.current?.destroy();
        };  
    }, [define]);
    return ref.current    
}