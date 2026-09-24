// checkbox widget：查看态只读勾选框（disabled 不灰化）+ 编辑态双值档位勾选
import { html, nothing, type TemplateResult } from 'lit'
import { resolvePair } from '../edit-plan'
import type { WidgetModule, WidgetRenderContext } from './types'

// 勾选态判定：双值档位（choices/switchValues 恰两项）时勾选 ≡ 值等于第一项 value，
// 否则按布尔真值
export function isCheckboxChecked(value: unknown, schema: Record<string, any> | undefined): boolean {
  const pair = resolvePair(schema)
  if (pair) return value === pair[0].value
  return !!value
}

// 查看态：只读勾选框（disabled 不派发鼠标事件，双击进编辑走工具按钮；CSS 保持正常视觉）
export function toView(ctx: WidgetRenderContext): TemplateResult {
  return html`<input
    type="checkbox"
    class="to-view-checkbox"
    ?checked=${isCheckboxChecked(ctx.value, ctx.schema)}
    disabled
  />`
}

// 编辑态：双值档位（勾选≡第一项 value）；无档位则 boolean 开关
export function toRender(ctx: WidgetRenderContext): TemplateResult {
  const { plan, setValue, onKeydown } = ctx
  const onValue = plan.pair ? plan.pair[0].value : true
  return html`<input
    class="edit-input"
    type="checkbox"
    ?disabled=${plan.props.disabled}
    tabindex=${plan.props.tabIndex ?? nothing}
    ?checked=${ctx.value === onValue}
    @change=${(e: Event) => {
      const checked = (e.target as HTMLInputElement).checked
      setValue(plan.pair ? (checked ? plan.pair[0].value : plan.pair[1].value) : checked)
    }}
    @keydown=${onKeydown}
    @click=${(e: Event) => e.stopPropagation()}
  />`
}

export const checkboxModule: WidgetModule = { toView, toRender }
