import { Dict, getVal, setVal } from "autostore"
import { VueAutoStore } from "../../store"
import { UseFormOptions } from "../types"
import { PATH_DELIMITER } from "autostore"
import { replaceWithRegex } from "./replaceWithRegex"

/**
 * 默认的toState转换函数
 */
function defaultToState(this: HTMLInputElement, path: string, value: any, part: string | undefined) {
    if (!part) return value
    return value
}

/**
 * 根据数据类型转换值
 */
function toTypedValue(val: any, datatype: string | undefined) {
    if (!datatype) return val
    if (datatype === 'number') {
        return parseFloat(val)
    } else if (datatype === 'boolean') {
        return Boolean(val)
    } else if (datatype === 'string') {
        return String(val)
    }
    return val
}

/**
 * 将输入控件的值写入状态中
 * 
 * 写入逻辑如下：
 * - 没有part，即没有data-field-part属性时，此时input.value === state.value
 *   此情况比较简单，直接写入即可
 * - 如果有part，即data-field-part属性时
 *      - 当state.value是数组时，data-field-part为数组索引，state.value[part] = input.value
 *      - 当state.value是对象时，state.value[part] = input.value
 *      - 当state.value是boolean，视为true/false，state.value[part] = Boolean(input.value)
 *      - 当state.value是数字，视为数字，state.value[part] = parseFloat(input.value)
 *      - 当state.value是字符串时，视为正则表达式，input.value替换stateValue的捕获组
 */
export function fieldToState<State extends Dict>(
    store: VueAutoStore<State>,
    input: HTMLInputElement,
    name: string,
    value: any,
    options: UseFormOptions<any>
): [string, any] | undefined {
    const toState = options.toState || defaultToState
    const entry = options.entry ? options.entry.split(PATH_DELIMITER) : []
    const part = input.dataset.fieldPart
    const path = [...entry, ...name.split(PATH_DELIMITER)]
    // 在执行fromStateToField时会将dataType写入data-typeof属性，记住这个属性的原始类型
    const dataType = input.dataset.typeof

    const stateValue = store.peep((state) => getVal(state, path))
    const typedValue = toTypedValue(value, dataType)
    let newValue = toState.call(input, name, typedValue, stateValue, part)

    if (part) {
        if (Array.isArray(stateValue)) {
            // 处理数组
            const index = parseInt(part)
            stateValue[index] = newValue
            return [`${name}.${part}`, newValue]
        } else if (typeof(stateValue) === "object") {
            // 处理对象
            stateValue[part] = newValue
            return [`${name}.${part}`, newValue]
        } else if (dataType === 'string') {
            // 处理字符串（正则替换）
            newValue = replaceWithRegex(stateValue, part, value)
            store.update((state) => { setVal(state, path, newValue) }, { peep: true })
            return [name, newValue]
        } else {
            // 处理其他类型
            store.update((state) => { setVal(state, path, newValue) }, { peep: true })
        }
    } else {
        // 直接更新值
        store.update((state) => { setVal(state, path, newValue) }, { peep: true })
        return [name, newValue]
    }
}