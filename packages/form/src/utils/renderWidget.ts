import type { SchemaOptions } from "autostore"

export function renderWidget(options: SchemaOptions, args?: {
    parent?: HTMLElement,
    styles?: Record<string, any>,
    attrs?: Record<string, any>,
    classs?: Record<string, any> | string,
}) {
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
    if (args?.styles) {
        Object.assign(widgetEle.style, args.styles)
    }
    if (args?.attrs) {
        for (const key in args.attrs) {
            widgetEle.setAttribute(key, String(args.attrs[key]))
        }
        // @ts-ignore
        widgetEle.parent = args.parent
    }
    // @ts-ignore
    if (width) widgetEle.style.width = width
    if (args?.classs) {
        if (typeof (args.classs) === 'string') {
            widgetEle.classList.add(args.classs)
        } else if (typeof (args.classs) === 'object') {
            Object.entries(args.classs).forEach(([key, value]) => {
                if (value) {
                    widgetEle.classList.add(key)
                } else {
                    widgetEle.classList.remove(key)
                }
            })
        }
    }
    return widgetEle
}