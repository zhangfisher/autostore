// range widget：查看态迷你滑轨（当前值可视化）+ 编辑态原生滑块与实时数值
// 自 input 家族拆出（range 的查看特例不再寄居 input.ts，对齐 color.ts 先例）
import { html, nothing, type TemplateResult } from 'lit'
import { createRef, ref } from 'lit/directives/ref.js'
import type { WidgetModule, WidgetRenderContext } from './types'

// 轨道填充百分比：min/max 缺省按 HTML range 规范 0~100，值域倒挂或非数值归零
export function rangePercent(value: unknown, min: unknown, max: unknown): number {
  const v = Number(value)
  const lo = Number.isFinite(Number(min)) ? Number(min) : 0
  const hi = Number.isFinite(Number(max)) ? Number(max) : 100
  if (!Number.isFinite(v) || hi <= lo) return 0
  return Math.min(1, Math.max(0, (v - lo) / (hi - lo)))
}

// 查看态：迷你滑轨（轨道 + 填充段 + 数值），非数值回落 null（宿主走 formatValue）
export function toView(ctx: WidgetRenderContext): TemplateResult | null {
  if (typeof ctx.value !== 'number' || !Number.isFinite(ctx.value)) return null
  const pct = rangePercent(ctx.value, ctx.plan.props.min, ctx.plan.props.max)
  return html`<span class="to-view-range" title=${String(ctx.value)}>
    <span class="range-track"><span class="range-fill" style=${`width:${(pct * 100).toFixed(1)}%`}></span></span>
    <span class="range-value">${ctx.value}</span>
  </span>`
}

// 编辑态：原生滑块 + 实时数值（滑块自身无文本显示，旁标当前值；
// 数值为派生显示：编辑过程不重渲染，input 事件经 ref 命令式同步，同 color-hex 先例）
export function toRender(ctx: WidgetRenderContext): TemplateResult {
  const { plan, setValue, onKeydown, name } = ctx
  const valRef = createRef<HTMLSpanElement>()
  return html`<label class="edit-range">
    <input
      class="edit-input"
      type="range"
      name=${name ?? nothing}
      .value=${String(ctx.value ?? '')}
      min=${plan.props.min ?? nothing}
      max=${plan.props.max ?? nothing}
      step=${plan.props.step ?? nothing}
      ?disabled=${plan.props.disabled}
      tabindex=${plan.props.tabIndex ?? undefined}
      @input=${(e: Event) => {
        const v = (e.target as HTMLInputElement).value
        if (valRef.value) valRef.value.textContent = v
        setValue(Number(v))
      }}
      @keydown=${onKeydown}
      @click=${(e: Event) => e.stopPropagation()}
    />
    <span class="range-value" ${ref(valRef)}>${String(ctx.value ?? '')}</span>
  </label>`
}

export const rangeModule: WidgetModule = { toView, toRender }
