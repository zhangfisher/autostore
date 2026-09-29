// 区头/区尾配置解析（ADR-0035）：attribute 字符串经 relaxedToJson + JSON.parse 两段解析，
// property 形态直接接受对象（JS 用法免解析）；解析失败 warn 返回 undefined（该区不渲染）。
// Store 占位符：<store.<prop>> 渲染时求值 store 实例公开属性（title/id 等 getter），
// 未命中属性替换为空串——非表达式、非状态路径，渲染函数内即时求值不建响应依赖。
// 注：内容空判定（visible/mode 过滤后无标题无动作即不渲染）在组件渲染层做——
// 判定必须基于过滤后的有效内容，此处不重复该规则
import { relaxedToJson } from './relaxedToJson'

// attribute/property 双形态解析：字符串走 relaxedToJson+JSON.parse，对象原样透传；
// undefined/null/空白串归一化为 undefined（区头未声明走默认值、显式置空不渲染，由调用方区分）
export function parseChromeConfig<T>(raw: string | T | undefined | null, label: string): T | undefined {
    if (raw === undefined || raw === null) return undefined
    if (typeof raw !== 'string') return raw
    const text = raw.trim()
    if (text === '') return undefined
    try {
        return JSON.parse(relaxedToJson(text)) as T
    } catch (e) {
        console.warn(`[autostore-viewer] ${label} 配置解析失败，忽略该区`, e)
        return undefined
    }
}

// Store 占位符求值：/<store\.(\w+)>/g 全局替换为 store 实例公开属性，未命中属性替换为空串
export function resolveStorePlaceholders(text: string | undefined, store: unknown): string | undefined {
    if (typeof text !== 'string' || text === '') return text
    return text.replace(/<store\.(\w+)>/g, (_match, prop: string) => {
        const value = (store as Record<string, any>)?.[prop]
        return value === undefined || value === null ? '' : String(value)
    })
}
