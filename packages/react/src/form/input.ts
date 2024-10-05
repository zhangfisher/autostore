/**
 * 
 * const { bind } = createStore({...})
 * 
 * @description
 * 
 * @example
 * 
 * const bindOrder= useInput("order")
 * const bindPrice= useInput("order.price")
 * 
 * <input {...bindPrice} />
 * 
 * <input {...bind('order.price')} value={state.order.price} />
 * <input {...bind('order.price',{debounce:100,on:'change'})} value={state.order.price} />
 * ===
 * <input value value={state.order.price}  onChange={bind('order.price').onChange} />
 * 
 * @example 
 * 
 * <input value={state} onChange={@onchange(
 *  (state)=>{              // getter
 *     return state.firstName + state.lastName
 *  },
 *  (value,state)=>{        // setter
 *      const [ firstName,lastName ] = value.split(' ')
 *      state.firstName = firstName
 *      state.lastName = lastName
 *  }
 * )} />
 * 
 * 
 * 
 * 
 */
import { Dict, PATH_DELIMITER, setVal } from "@autostorejs/core";
import { ReactAutoStore } from "../store";
import { getInputValueFromEvent } from "../utils/getInputValueFromEvent";
import { InputBindings } from "./types";

export function createInputBinding<State extends Dict>(store:ReactAutoStore<State>){
    return (function(){ 
        const args = arguments    
        const selector = args.length>=1 && typeof(args[0])==='string' ? args[0]: undefined
        const getter = args.length>=2 && typeof(args[1])==='function' ? args[1] : undefined 
        const setter = args.length>=2 && typeof(args[2])==='function'? args[2] : undefined
        const options = Object.assign({
            debounce:0
        },args.length===2 && typeof(args[1])==='object' ? args[1] : (
            args.length===3 && typeof(args[2])==='object' ? args[2] : undefined
        ))

        if(typeof(getter)==='function' && typeof(setter)!=='function'){
            throw new Error("bind must have a getter && setter function")
        } 
        let timeoutId: NodeJS.Timeout | null = null;

        const bindings:InputBindings = { }

        bindings['onChange'] = (e:any)=>{
            const value = getInputValueFromEvent(e)            
            if (timeoutId !== null) {
                clearTimeout(timeoutId);
            }
            if(options.debounce>0){
                timeoutId = setTimeout(() => {
                    if(selector){
                        setVal(store.state,selector.split(PATH_DELIMITER),value)
                    }else{
                        setter(value,store.state)
                    }
                }, options.debounce);
            }else{
                if(selector){
                    setVal(store.state,selector.split(PATH_DELIMITER),value)
                }else{
                    setter(value,store.state)
                }
            }            
            e.preventDefault()
        }   
        return bindings
    })
}