import { removeClass } from "./removeClass"
import { removeStyle } from "./removeStyle"

/**
 * 移除元素样式或类名
 * @param input - 待操作的元素或选择器
 * @param params - 要移除的样式或类名，可以是字符串或对象
 * @param kind - 操作类型，'style' 表示移除样式，'class' 表示移除类名
 * @description 该函数用于移除指定元素的样式或类名。params 可以是字符串或对象，对象时键为选择器，值为要移除的样式或类名。
 * @example removeElementStyleOrClass(element, 'active'); // 移除 element 的 'active' 类名
 * @example removeElementStyleOrClass(element, { '.child': 'active' }, 'class'); // 移除所有 .child 元素的 'active' 类名
 */
export function removeStyleOrClass(input: any, params: string | Record<string, string> | undefined, kind: 'style' | 'class') {
    if (!params) return
    
    const removeKind = (el: any, s: string) => {
        if (kind === 'style') {
            removeStyle(input, s)
        } else {
            removeClass(input, s)
        }
    }

    if (typeof(params) === 'object') {
        Object.entries(params).forEach(([selector, style]) => {
            const el = selector.toLocaleUpperCase() === 'ROOT' ? input : input.querySelector(selector)
            removeKind(el, style)
        })
    } else if (typeof(params) === 'string') {
        removeKind(input, params)
    }
}