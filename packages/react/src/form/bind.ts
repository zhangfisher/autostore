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
import { type Dict, PATH_DELIMITER, setVal } from 'autostore';
import type { ReactAutoStore } from '../store';
import { getInputValueFromEvent } from '../utils/getInputValueFromEvent';
import type { InputBindings } from './types';

export function createInputBinding<State extends Dict>(store: ReactAutoStore<State>) {
    return function () {
        const args = arguments;
        const selector = args.length >= 1 && typeof args[0] === 'string' ? args[0] : undefined;
        if (!selector) {
            throw new Error('Input bind must have at least one argument');
        }
        const bindings: InputBindings = {};

        bindings['onChange'] = (e: any) => {
            const value = getInputValueFromEvent(e);
            setVal(store.state, selector.split(PATH_DELIMITER), value);
        };
        return bindings;
    };
}
