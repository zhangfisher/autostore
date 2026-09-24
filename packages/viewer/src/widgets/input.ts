// input 家族 widget：text/number/email/password/search/tel/url/date/datetime-local/
// month/time/week/color/range/file（plan.kind=input）与 combobox（text input + datalist）
import { html, nothing, type TemplateResult } from 'lit'
import type { WidgetModule, WidgetRenderContext } from './types'

// 颜色值格式判定（仅格式，不做命名色表）：#hex / rgb() / hsl() / color()
export function isColorLike(value: unknown): boolean {
  return typeof value === 'string' && /^\s*(#[0-9a-fA-F]{3,8}\b|rgba?\(|hsla?\(|color\()/.test(value)
}

// 查看态：仅 widget=color 提供默认渲染（宽 3em × 高 1em 条形色块，title=值，ADR-0025）；
// 非颜色格式值回落 null（宿主走 choices/formatValue）；其余 input 家族无默认查看
export function toView(ctx: WidgetRenderContext): TemplateResult | null {
  if (ctx.plan.inputType !== 'color') return null
  if (!isColorLike(ctx.value)) return null
  return html`<span class="to-view-color" style=${`background:${ctx.value}`} title=${String(ctx.value)}></span>`
}

// 编辑态：标准 input（原生属性透传 + combobox datalist）
export function toRender(ctx: WidgetRenderContext): TemplateResult {
  const { plan, setValue, onKeydown } = ctx
  const props = plan.props
  return html`<input
    class="edit-input"
    type=${plan.inputType}
    .value=${String(ctx.value ?? '')}
    ?disabled=${props.disabled}
    ?readonly=${props.readOnly}
    ?multiple=${props.multiple}
    tabindex=${props.tabIndex ?? nothing}
    placeholder=${props.placeholder ?? nothing}
    autocomplete=${props.autocomplete ?? nothing}
    pattern=${props.pattern ?? nothing}
    minlength=${props.minLength ?? nothing}
    maxlength=${props.maxLength ?? nothing}
    min=${props.min ?? nothing}
    max=${props.max ?? nothing}
    step=${props.step ?? nothing}
    accept=${props.accept ?? nothing}
    capture=${props.capture ?? nothing}
    spellcheck=${props.spellcheck === true ? 'true' : props.spellcheck === false ? 'false' : nothing}
    list=${plan.choices.length > 0 ? plan.groupId : nothing}
    @input=${(e: Event) => setValue((e.target as HTMLInputElement).value)}
    @keydown=${onKeydown}
    @click=${(e: Event) => e.stopPropagation()}
  />${plan.choices.length > 0 ? renderDatalist(plan) : nothing}`
}

// combobox 的 datalist 候选项
function renderDatalist(plan: WidgetRenderContext['plan']): TemplateResult {
  return html`<datalist id=${plan.groupId}>
    ${plan.choices.map((c) => html`<option value=${c.label}></option>`)}
  </datalist>`
}

export const inputModule: WidgetModule = { toView, toRender }
