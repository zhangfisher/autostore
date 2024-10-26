

/**
 * 判断给定的 HTML 元素是否为输入元素（input、textarea 或 select）。
 * @param input - 要检查的 HTML 元素。
 * @returns 如果元素是输入元素，则返回 true；否则返回 false。
 */
export function isInputElement(input: HTMLElement) {
	return ["input", "textarea", "select"].includes(input.tagName.toLowerCase());
}
export function isHtmlInputElement(input: HTMLElement):input is HTMLInputElement {
	return input.tagName.toLowerCase()==="input"
}
export function isHtmlSelectElement(input: HTMLElement):input is HTMLSelectElement {
	return input.tagName.toLowerCase()==="select"
}
