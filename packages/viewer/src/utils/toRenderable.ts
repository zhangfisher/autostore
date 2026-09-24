import { nothing } from 'lit'
import { unsafeHTML } from 'lit/directives/unsafe-html.js'

// toView/toRender 返回值三态归一化：lit 模板原样、字符串经 unsafeHTML（注入安全责任在开发者）、
// Node 由 lit 直接插入；null/undefined 渲染为空
export function toRenderable(result: unknown): unknown {
  if (result === null || result === undefined) return nothing
  if (typeof result === 'string') return result === '' ? nothing : unsafeHTML(result)
  return result
}
