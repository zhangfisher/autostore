import { isInputElement } from "./isInputElement"

/**
 * 获取表单输入元素。
 * 如果传入的元素本身就是输入元素（input、textarea 或 select），则直接返回该元素。
 * 否则，尝试在传入的元素内查找并返回第一个 input、textarea 或 select 元素。
 * @param input - 需要查找输入元素的 HTMLElement
 * @returns 返回找到的输入元素，如果没有找到则返回 undefined
 */
export function getInputElements(input: HTMLElement):(HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement)[] {   
    let ele 
    if (isInputElement(input)) {
		ele = input
	}
	ele =input.querySelectorAll("input,textarea,select") 
    return Array.from(ele) as (HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement)[]
}

