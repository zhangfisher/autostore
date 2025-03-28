/**
 * 判断给定的 HTML 元素是否为输入元素（input、textarea 或 select）。
 * @param input - 要检查的 HTML 元素。
 * @returns 如果元素是输入元素，则返回 true；否则返回 false。
 */
export function isInputElement(input: Element): input is HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement {
    return ["input", "textarea", "select"].includes(input.tagName.toLowerCase())
}

/**
 * 判断给定的 HTML 元素是否为 input 元素。
 * @param input - 要检查的 HTML 元素。
 * @returns 如果元素是 input 元素，则返回 true；否则返回 false。
 */
export function isHtmlInputElement(input: HTMLElement): input is HTMLInputElement {
    return input.tagName.toLowerCase() === "input"
}

/**
 * 判断给定的 HTML 元素是否为 select 元素。
 * @param input - 要检查的 HTML 元素。
 * @returns 如果元素是 select 元素，则返回 true；否则返回 false。
 */
export function isHtmlSelectElement(input: HTMLElement): input is HTMLSelectElement {
    return input.tagName.toLowerCase() === "select"
}