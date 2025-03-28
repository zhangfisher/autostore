/**
 * const { bind } = createStore({...})
 * 
 * @description
 * 在Vue3中使用v-model或事件绑定
 * 
 * @example
 * 
 * const bindOrder = useInput("order")
 * const bindPrice = useInput("order.price")
 * 
 * // 使用v-model
 * <input v-model="value" v-bind="bindPrice" />
 * 
 * // 使用事件绑定
 * <input :value="state.order.price" v-bind="bind('order.price')" />
 * <input :value="state.order.price" v-bind="bind('order.price', { debounce: 100 })" />
 * 
 * @example 
 * 
 * // 使用getter和setter
 * <input :value="state" v-bind="bind(
 *   (state) => {              // getter
 *     return state.firstName + state.lastName
 *   },
 *   (value, state) => {       // setter
 *     const [firstName, lastName] = value.split(' ')
 *     state.firstName = firstName
 *     state.lastName = lastName
 *   }
 * )" />
 */
import { Dict, PATH_DELIMITER, setVal } from "autostore"
import { VueAutoStore } from "../store"
import { getInputValueFromEvent } from "../utils/getInputValueFromEvent"
import { InputBindings } from "./types"

export function createInputBinding<State extends Dict>(store: VueAutoStore<State>) {
    return function() {
        const args = arguments
        const selector = args.length >= 1 && typeof(args[0]) === 'string' ? args[0] : undefined
        
        if (!selector) {
            throw new Error("Input bind must have at least one argument")
        }

        const bindings: InputBindings = {}

        // 处理v-model
        bindings['modelValue'] = store.peep((state) => {
            const path = selector.split(PATH_DELIMITER)
            let current = state
            for (const key of path) {
                if (current == null) return undefined
                current = current[key]
            }
            return current
        })

        // 处理v-model更新
        bindings['onUpdate:modelValue'] = (value: any) => {
            store.update(state => {
                setVal(state, selector.split(PATH_DELIMITER), value)
            })
        }

        // 处理原生change事件
        bindings['onChange'] = (e: any) => {
            const value = getInputValueFromEvent(e)
            store.update(state => {
                setVal(state, selector.split(PATH_DELIMITER), value)
            })
        }

        return bindings
    }
}