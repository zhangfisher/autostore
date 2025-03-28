/**
 * 基于el元素的向上查找
 * 
 * - 当找到指定的类名时，返回该元素
 * - 如果碰到tagName指定的标签时，停止查找
 * - 如果没有找到指定的类名时，返回null
 * 
 * @param el - 开始查找的元素
 * @param matchClass - 要匹配的类名
 * @param stopTagName - 停止查找的标签名，默认为'form'
 * @returns 找到的元素或null
 */
export function findUpElement(el: HTMLElement, matchClass: string, stopTagName: string = 'form'): HTMLElement | null {
    let parent = el.parentElement
    while (parent) {
        if (parent.classList.contains(matchClass)) {
            return parent
        }
        if (parent.tagName.toLocaleLowerCase() === stopTagName) {
            return null
        }
        parent = parent.parentElement
    }
    return null
}