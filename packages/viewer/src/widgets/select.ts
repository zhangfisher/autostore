// select widget：下拉单选/多选（候选项来自 schema.choices，写回保留 value 原类型）
import { html, nothing, type TemplateResult } from 'lit'
import type { WidgetModule, WidgetRenderContext } from './types'

export function toRender(ctx: WidgetRenderContext): TemplateResult {
  const { plan, setValue, onKeydown, value, name } = ctx
  const props = plan.props
  const isSelected = (cv: any) =>
    plan.multiple ? Array.isArray(value) && value.some((v: any) => v === cv) : value === cv
  return html`<select
    class="edit-input"
    name=${name ?? nothing}
    ?multiple=${plan.multiple}
    ?disabled=${props.disabled}
    tabindex=${props.tabIndex ?? nothing}
    size=${props.size ?? nothing}
    @change=${(e: Event) => {
      const sel = e.target as HTMLSelectElement
      if (plan.multiple) {
        // option value 存的是候选项下标，取回原值以保留类型
        setValue(Array.from(sel.selectedOptions, (o) => plan.choices[Number(o.value)].value))
      } else {
        const choice = plan.choices[sel.selectedIndex]
        if (choice) setValue(choice.value)
      }
    }}
    @keydown=${onKeydown}
    @click=${(e: Event) => e.stopPropagation()}
  >
    ${plan.choices.map((c, i) => html`<option value=${String(i)} ?selected=${isSelected(c.value)}>${c.label}</option>`)}
  </select>`
}

export const selectModule: WidgetModule = { toRender }
