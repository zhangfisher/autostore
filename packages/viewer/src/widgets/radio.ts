// radio widget：单选按钮组（候选项来自 schema.choices，写回保留 value 原类型）
import { html, type TemplateResult } from 'lit'
import type { WidgetModule, WidgetRenderContext } from './types'

export function toRender(ctx: WidgetRenderContext): TemplateResult {
  const { plan, setValue, onKeydown, value } = ctx
  return html`<span class="edit-radio-group">
    ${plan.choices.map(
      (c, i) => html`<label class="edit-radio-item">
        <input
          type="radio"
          class="edit-radio"
          name=${plan.groupId}
          value=${String(i)}
          ?disabled=${plan.props.disabled}
          ?checked=${value === c.value}
          @change=${(e: Event) => {
            const choice = plan.choices[Number((e.target as HTMLInputElement).value)]
            if (choice) setValue(choice.value)
          }}
          @keydown=${onKeydown}
          @click=${(e: Event) => e.stopPropagation()}
        />${c.label}
      </label>`,
    )}
  </span>`
}

export const radioModule: WidgetModule = { toRender }
