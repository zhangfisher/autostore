import { isBool } from "../../utils/isBool"
import { isEmpty } from "../../utils/isEmpty"
import { isNumber } from "../../utils/isNumber"
import type { AutoFormFieldContext } from "../Form"
import { UseFormOptions } from "../types"
import { getInputValue } from "./getInputValue"
import { setInputValue } from "./setInputValue"

/**
 * 默认的状态到字段值的转换函数
 */
function defaultFromState(_: string, value: any, part: string | undefined) {
    if (!part) return value
    
    if (Array.isArray(value) && isNumber(part)) {
        return value[part]
    } else if (typeof(value) === "object") {
        return value[part]
    } else if (typeof(value) === 'string') {
        // 视为正则表达式，从字符串中提取
        try {
            const matched = value.match(new RegExp(part))
            if (matched) {
                // 如果有匹配组，则返回第一个匹配组
                return matched.length === 1 ? matched[0] : matched[1]
            }
        } catch {
            // 正则表达式匹配失败时返回原值
            return value
        }
    } else {
        return part
    }
    return value
}

/**
 * 将表单状态转换为字段值，并更新对应的表单元素。
 * @param fieldInfo - 表单字段信息。
 * @param value - 需要转换的值。
 * @param options - 表单使用的选项，包括状态转换函数。
 * @param initial - 是否为初始化状态调用
 * @returns 如果字段值发生变化则返回 true，否则返回 false。
 */
export function stateToField(
    fieldInfo: AutoFormFieldContext,
    value: any,
    options: UseFormOptions<any>,
    initial?: boolean
): boolean {
    const fromState = options.fromState || defaultFromState
    let changed = false
    const form = options.ref?.value // 注意：在Vue中使用.value访问ref值

    fieldInfo.inputs.forEach(input => {
        const part = input.dataset.fieldPart
        const newVal = fromState(fieldInfo.path, value, part)

        if (initial) {
            // 在初始化时，如果是checkbox或radio，则需要设置默认值
            if (input.type === 'checkbox') {
                if (isEmpty(input.value) && !isBool(newVal)) {
                    input.value = `${newVal}`
                }
            } else if (input.type === 'radio') {
                if (isBool(value)) {
                    if (form) {
                        const radios = form.querySelectorAll(`:scope input[type="radio"][name="${input.name}"]`) as NodeListOf<HTMLInputElement>
                        if (radios.length > 1) {
                            let index = Array.from(radios).findIndex(radio => radio.value === 'true')
                            input.value = String(index < 0)
                        }
                    }
                }
            }
            // 设置数据类型标记
            input.dataset.typeof = Array.isArray(newVal) ? 'array' : typeof newVal
        }

        // 检查值是否发生变化
        const oldVal = getInputValue(input, form!)
        if (initial || oldVal !== newVal) {
            setInputValue(input, newVal, form!)
            changed = true
        }
    })

    return changed
}