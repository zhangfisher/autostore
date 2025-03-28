import { PATH_DELIMITER, setVal, Watcher, type Dict, getDepends, noRepeat, isPathEq, isPlainObject, isFunction } from "autostore"
import { type VueAutoStore } from '../store'
import { ref, watch, onUnmounted } from 'vue'
import { getValueBySelector } from '../utils/getValueBySelector'
import { getInputValueFromEvent } from '../utils/getInputValueFromEvent'
import { UseFieldGetter, UseFieldOptions, UseFieldSetter, UseFieldType } from './types'
import { isNumber } from "../utils/isNumber"

export type UseFieldBinding = {
    modelValue?: any
    'onUpdate:modelValue'?: (value: any) => void
    onChange?: (e: any) => void
    checked?: boolean
    name?: string
}

export function createFieldBinding<State extends Dict, Value=any>(
    store: VueAutoStore<State>,
    path: string[] | undefined,
    part: number,
    value: any,
    fieldValue: any,
    setter: UseFieldSetter<Value, State> | undefined,
    options: UseFieldOptions
) {
    const getCheckedValue = (val: any) => {
        if (options.type === 'radio') {
            return fieldValue === val
        } else if (options.type === 'checkbox') {
            return Boolean(value)
        }
    }

    const fieldName = options.name ? options.name : (Array.isArray(path) ? path.join(PATH_DELIMITER) : path || '')

    const updateValue = (newValue: any) => {
        let inputValue = newValue
        if (isFunction(options.toState)) {
            inputValue = options.toState(inputValue, { path, part })
        }
        if (isFunction(setter)) {
            setter({ value: inputValue, path, part }, store.state)
        } else if (path) {
            store.update(state => setVal(state, path, inputValue))
        }
    }

    return new Proxy({
        modelValue: value,
        'onUpdate:modelValue': updateValue,
        onChange: (e: any) => {
            const inputValue = getInputValueFromEvent(e)
            updateValue(inputValue)
        },
        name: fieldName,
        checked: getCheckedValue(value),
        'data-field': true
    }, {
        get(target, key: string, receiver) {
            if (isNumber(key) && options.type === 'radio' && options.values) {
                const part = Number(key)
                return createFieldBinding(store, path, part, options.values[part], value, setter, options)
            }
            return Reflect.get(target, key, receiver)
        }
    })
}

/**
 * useField用来为表单元素提供绑定数据的hook
 * 
 * @example
 * 
 * const bindPrice = useField("order.price") 
 * <input v-model="bindPrice.modelValue" v-bind="bindPrice" />
 * 
 * @example
 * 
 * 如果输入的路径是一个对象，则会返回一个对象，包含了所有属性的绑定
 * 
 * const bindOrder = useField<typeof state.order>("order") 
 * <input v-model="bindOrder.price.modelValue" v-bind="bindOrder.price" />
 * <input v-model="bindOrder.count.modelValue" v-bind="bindOrder.count" />
 * 
 * @example
 *  
 * const bindFullname = useField(
 *   state => state.firstName + ' ' + state.lastName,
 *   (input, state) => {
 *     const [firstName, lastName] = value.split(' ')
 *     state.firstName = firstName
 *     state.lastName = lastName
 *   }
 * ) 
 * <input v-model="bindFullname.modelValue" v-bind="bindFullname" />
 * 
 * @example
 * 
 * 绑定多个值到多个input
 * const bindSex = useField("order.sex", { type: "radio", values: ['男', '女'] }) 
 * <input type="radio" v-model="bindSex[0].modelValue" v-bind="bindSex[0]" />
 * <input type="radio" v-model="bindSex[1].modelValue" v-bind="bindSex[1]" />
 */
export function createUseField<State extends Dict>(store: VueAutoStore<State>) {
    return (function() {
        // 1. 参数处理
        const args = arguments
        // 是否多段: 第一个参数是数组(string | string[] | StateGetter)[]
        const isMultiParts = Array.isArray(args[0]) && args[0].length > 1
        const selector: string[] | undefined = args.length >= 1 && typeof(args[0]) === 'string' ? args[0].split(PATH_DELIMITER) : undefined
        const getter = args.length >= 2 && typeof(args[0]) === 'function' ? args[0] : undefined
        const setter = args.length >= 2 && typeof(args[1]) === 'function' ? args[1] : undefined
        const getters = (isMultiParts ? args[0] : [selector || getter]) as unknown as (string | string[] | UseFieldGetter<any, State>)[]

        const options = ref<UseFieldOptions>(
            args.length >= 2 && isPlainObject(args[1]) ? args[1]
                : (args.length === 3 && isPlainObject(args[2]) ? args[2] : {})
        )

        const bindings = ref(
            getters.map((getter, index) => {
                if (typeof(getter) === 'function') {
                    return createFieldBinding(
                        store, undefined,
                        index, getter(store.state), undefined, setter, options.value
                    )
                } else {
                    const val = getValueBySelector(store, getter, true)
                    return createFieldBinding(
                        store, Array.isArray(getter) ? getter : getter.split(PATH_DELIMITER),
                        index, val, undefined, setter, options.value
                    )
                }
            })
        )

        // 收集依赖
        const allDeps = getters.map(getter => getDepends<State>(getter, store, 'value'))
        const mergedDeps = noRepeat(allDeps.reduce((r, cur) => {
            if (cur) r.push(...cur)
            return r
        }, [] as string[][]))

        if (mergedDeps.length === 0 || args.length === 0) {
            return {}
        }

        // 监听依赖变化
        const watcher = store.watch(mergedDeps, ({ path, value }) => {
            // 判断是哪一个getter的依赖发生了变化
            allDeps.forEach((itemDep, index) => {
                if (itemDep.some(dep => isPathEq(dep, path))) {
                    const getter = getters[index]
                    if (typeof(getter) === 'function') {
                        const newValue = getter(store.state)
                        bindings.value[index] = createFieldBinding(
                            store, undefined,
                            index, newValue, undefined, setter, options.value
                        )
                    } else {
                        bindings.value[index] = createFieldBinding(
                            store, path, index, value, undefined, setter, options.value
                        )
                    }
                }
            })
        })

        // 清理
        onUnmounted(() => {
            watcher.off()
        })

        return isMultiParts ? bindings.value : bindings.value[0]
    }) as unknown as UseFieldType<State>
}