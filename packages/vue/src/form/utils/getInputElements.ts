import { isInputElement } from "./isInputElement"

/**
 * 获取表单输入元素。
 * 如果传入的元素本身就是输入元素（input、textarea 或 select），则直接返回该元素。
 * 否则，尝试在传入的元素内查找并返回所有 input、textarea 或 select 元素。
 * @param input - 需要查找输入元素的 HTMLElement
 * @returns 返回找到的输入元素数组
 */
export function getInputElements(input: HTMLElement): HTMLInputElement[] {
    // 如果元素本身是输入元素，直接返回包含该元素的数组
    if (isInputElement(input)) {
        return [input] as HTMLInputElement[]
    }

    // 否则查找所有输入元素
    const elements = input.querySelectorAll("input,textarea,select")
    return Array.from(elements) as HTMLInputElement[]
}