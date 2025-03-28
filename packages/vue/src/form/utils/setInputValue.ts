import { isBool, isEmpty } from "../../utils"

/**
 * 设置输入元素的值
 * @param input - 输入元素
 * @param value - 要设置的值
 * @param form - 所属的表单元素
 */
export function setInputValue(input: HTMLInputElement, value: any, form: HTMLFormElement) {
    if (input.type === 'checkbox') {
        if (isEmpty(input.value)) {
            input.checked = value
        } else {
            if (isBool(value)) {
                input.checked = value
            } else {
                const [trueVal] = String(input.value).split(",")
                input.checked = trueVal == String(value)
            }
        }
    } else if (input.type === 'radio') {
        const name = input.name
        const radios = form.querySelectorAll(`:scope input[type="radio"][name="${name}"]`) as NodeListOf<HTMLInputElement>
        
        for (let radio of radios) {
            const datatype = radio.dataset.typeof
            if (datatype) {
                if (datatype === 'boolean') {
                    radio.checked = radio.value === String(value)
                } else if (datatype === 'number') {
                    radio.checked = parseFloat(radio.value) === value
                } else {
                    radio.checked = radio.value == value
                }
            } else {
                radio.checked = radio.value == value
            }
        }
    } else {
        // 对于其他类型的输入元素，直接设置值
        input.value = value == null ? '' : String(value)
    }
}