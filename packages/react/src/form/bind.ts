/**
 * 
 * const { bind } = createStore({...})
 * 
 * @description
 * 
 * @example
 * 
 * 
 * <input{...@('order.price')} value={state.order.price} />
 * ===
 * <input value value={state.order.price}  onChange={bind('order.price').onChange} />
 * 
 * @example 
 * 
 * <input value={state.} {...bind(
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
import { getValueBySelector } from "../utils/getValueBySelector";
import { getInputValueFromEvent } from "../utils/getInputValueFromEvent";

export function createFormBinding<State extends Dict>(store:ReactAutoStore<State>){
    return (function(){ 
        const args = arguments    
        const selector = args.length===1 && typeof(args[0])==='string' ? args[0]: undefined
        const getter = args.length===2 && typeof(args[1])==='function' ? args[1] : undefined 
        const setter = args.length===2 && typeof(args[2])==='function'? args[2] : undefined
        if(typeof(getter)==='function' && typeof(setter)!=='function'){
            throw new Error("bind must have a getter && setter function")
        }
         let lastValue:any = getValueBySelector(store,selector,true)

        let onChange = (e:any)=>{
            lastValue = getInputValueFromEvent(e)            
            if(selector){
                setVal(store.state,selector.split(PATH_DELIMITER),lastValue)
            }else{
                setter(lastValue,store.state)
            }
        }

        const bindings = {
            value:lastValue,
            onChange
        }
 
        return bindings
    })
}