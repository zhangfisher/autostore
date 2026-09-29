// input 家族 widget：text/number/email/password/search/tel/url/date/datetime-local/
// month/time/week/range/file（plan.kind=input）与 combobox（text input + datalist）
// color 的查看态色块特例已拆至 color.ts；input 家族无查看特例，查看回落 choices/formatValue
import { html, nothing, type TemplateResult } from 'lit'
import type { WidgetModule, WidgetRenderContext } from './types'

// 编辑态：标准 input（原生属性透传 + combobox datalist）
export function toRender(ctx: WidgetRenderContext): TemplateResult {
  const { plan, setValue, onKeydown, name } = ctx
  const props = plan.props
  // number 输入缺省 step="any"：浏览器默认 step=1 会把小数值判 stepMismatch（隐式假约束，
  // 表单校验/提交被无提示阻断）；schema 显式声明 step 时按声明（真语义优先）
  const step = props.step ?? (plan.inputType === 'number' ? 'any' : nothing)
  return html`<input
    class="edit-input"
    type=${plan.inputType}
    name=${name ?? nothing}
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
    step=${step}
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

export const inputModule: WidgetModule = { toRender }
