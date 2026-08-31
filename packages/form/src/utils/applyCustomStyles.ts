import type { SchemaWidgetStyles } from "autostore"


export function applyCustomStyles(el: HTMLElement, styles: SchemaWidgetStyles | undefined) {
    if (!styles) return
    Object.entries(styles).forEach(([selector, value]) => {
        const eles = selector === 'root' ? [el] : Array.from(el.querySelectorAll(selector)) as HTMLElement[]
        eles.forEach((ele) => {
            if (typeof (value) === 'string') {
                ele.style.cssText = value
            } else if (typeof (value) === 'object') {
                Object.assign(ele.style, value)
            }
        })
    })
}