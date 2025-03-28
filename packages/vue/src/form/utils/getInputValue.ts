import { isEmpty } from "../../utils"
import { HTMLInputElements } from "../types"
import { isHtmlInputElement, isHtmlSelectElement } from "./isInputElement"

/**
 * 获取输入元素的值
 * @param input - 输入元素
 * @param form - 所属的表单元素
 * @returns 输入元素的值，根据元素类型和data-typeof属性进行适当的转换
 */
export function getInputValue(input: HTMLInputElements, form: HTMLFormElement): any {
    let value: any
    const datatype = input.dataset.typeof

    if (isHtmlInputElement(input)) {
        if (input.type === 'checkbox') {
            if (isEmpty(input.value)) {
                value = input.checked
            } else {
                const [trueVal, falseVal] = String(input.value).split(",")
                value = input.checked ? trueVal : falseVal
            }
        } else if (input.type === 'radio') {
            const name = input.name
            const radios = form.querySelectorAll(`:scope input[type="radio"][name="${name}"]`) as NodeListOf<HTMLInputElement>
            if (radios.length > 1) {
                let index = Array.from(radios).findIndex(radio => radio.checked)
                value = index >= 0 ? radios[index].value : null
            } else {
                value = radios[0].checked
            }
        } else {
            value = input.value
        }
    } else if (isHtmlSelectElement(input)) {
        if (input.multiple) {
            const selectedOptions = input.selectedOptions
            value = Array.from(selectedOptions).map(option => option.value)
        } else {
            value = input.value
        }
    } else {
        value = input.value
    }

    // 根据data-typeof属性进行类型转换
    if (datatype) {
        if (datatype === 'boolean') {
            value = value || value === 'true'
        } else if (datatype === 'number') {
            value = parseFloat(value)
        } else if (datatype === 'object') {
            try {
                value = JSON.parse(value)
            } catch {
                // 解析失败时保持原值
            }
        }
    }

    return value
}