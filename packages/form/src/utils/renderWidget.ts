import type { SchemaOptions } from "autostore"

export function renderWidget(options: SchemaOptions, args?: {
    parent?: HTMLElement,
    styles?: Record<string, any>,
    attrs?: Record<string, any>,
    classs?: Record<string, any> | string,
}) {
    const width = options.width
    const height = options.height
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
    widgetEle.setAttribute('exportparts', 'field-value, field-label,field-help')
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

    if (width) widgetEle.style.width = String(width)
    if (height) widgetEle.style.height = String(height)

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