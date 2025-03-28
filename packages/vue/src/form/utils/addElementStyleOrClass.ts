import { addClass } from "./addClass"
import { insertStyle } from "./insertStyle"

/**
 * 为元素添加样式或类名
 * @param input - 目标元素
 * @param params - 要添加的样式或类名，可以是字符串或对象
 * @param kind - 'style' 或 'class'，指定添加的是样式还是类名
 */
export function addElementStyleOrClass(input: any, params: string | Record<string, string> | undefined, kind: 'style' | 'class') {
    if (!params) return
    
    const addKind = (el: any, s: string) => {
        if (kind === 'style') {
            insertStyle(input, s)
        } else {
            addClass(input, s)
        }
    }

    if (typeof(params) === 'object') {
        Object.entries(params).forEach(([selector, style]) => {
            const el = selector.toLocaleUpperCase() === 'ROOT' ? input : input.querySelector(selector)
            addKind(el, style)
        })
    } else if (typeof(params) === 'string') {
        addKind(input, params)
    }
}