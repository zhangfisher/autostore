// color widget：查看态条形色块（ADR-0025）+ 编辑态原生色板与 hex 文本
// 自 input.ts 拆出（color 的查看特例不再寄居 input 家族，单一职责）
import { html, nothing, type TemplateResult } from 'lit'
import { createRef, ref } from 'lit/directives/ref.js'
import type { WidgetModule, WidgetRenderContext } from './types'

// 颜色值格式判定（仅格式，不做命名色表）：#hex / rgb() / hsl() / color()
export function isColorLike(value: unknown): boolean {
  return typeof value === 'string' && /^\s*(#[0-9a-fA-F]{3,8}\b|rgba?\(|hsla?\(|color\()/.test(value)
}

// 查看态：宽 3em × 高 1em 色块（相框结构：白底 + 1px 边框 + 3px 内边距，
// 颜色经 --swatch-color 由 ::before 铺满 content 区域），title=值；
// 非颜色格式值回落 null（宿主走 formatValue）
export function toView(ctx: WidgetRenderContext): TemplateResult | null {
  if (!isColorLike(ctx.value)) return null
  return html`<span class="to-view-color" style=${`--swatch-color:${ctx.value}`} title=${String(ctx.value)}></span>`
}

// 编辑态：原生色板 + hex 文本（色板自身无文本显示，旁标当前值；
// .value 仅 #hex 直接可用，rgb()/命名色由浏览器兜底 #000000，一动色板即写回合法 hex）
// hex 文本是派生显示：编辑过程不重渲染（ctx.value 为进入编辑快照，ADR-0027），
// input 事件里经 ref 命令式同步（input/checkbox 等原生控件自维护状态无此问题）
export function toRender(ctx: WidgetRenderContext): TemplateResult {
  const { plan, setValue, onKeydown, name } = ctx
  const hexRef = createRef<HTMLSpanElement>()
  return html`<label class="edit-color">
    <input
      class="edit-input"
      type="color"
      name=${name ?? nothing}
      .value=${typeof ctx.value === 'string' && ctx.value.startsWith('#') ? ctx.value : '#000000'}
      ?disabled=${plan.props.disabled}
      tabindex=${plan.props.tabIndex ?? undefined}
      @input=${(e: Event) => {
        const v = (e.target as HTMLInputElement).value
        if (hexRef.value) hexRef.value.textContent = v
        setValue(v)
      }}
      @keydown=${onKeydown}
      @click=${(e: Event) => e.stopPropagation()}
    />
    <span class="color-hex" ${ref(hexRef)}>${String(ctx.value ?? '')}</span>
  </label>`
}

export const colorModule: WidgetModule = { toView, toRender }
