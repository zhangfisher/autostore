import type { SchemaOptions } from "autostore"

export function renderWidget(options: SchemaOptions, parent?: HTMLElement, styles?: Record<string, any>) {
    const width = options.width
    const widget = options.widget
    let widgetEle: HTMLElement
    try {
        widgetEle = document.createElement(`auto-field-${widget || 'input'}`)
    } catch {
        widgetEle = document.createElement('auto-field-input')
    }
    // @ts-ignore
    widgetEle.schema = options
    widgetEle.setAttribute('part', 'field')
    if (styles) {
        Object.assign(widgetEle.style, styles)
    }
    // @ts-ignore
    if (width) widgetEle.style.width = width
    // @ts-ignore
    widgetEle.parent = parent
    return widgetEle
}