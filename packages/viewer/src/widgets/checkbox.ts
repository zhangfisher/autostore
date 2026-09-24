// checkbox widget：查看态只读勾选框（disabled 不灰化）+ 编辑态双值档位勾选
// 勾选框旁文案（checkLabel/choices 当前项/switchValues 当前值）两态同源，均经 resolveCheckLabel 决策
import { html, nothing, type TemplateResult } from 'lit'
import { resolvePair, resolveCheckLabel } from '../edit-plan'
import type { WidgetModule, WidgetRenderContext } from './types'

// 勾选态判定：双值档位（choices/switchValues 恰两项）时勾选 ≡ 值等于第一项 value，
// 否则按布尔真值
export function isCheckboxChecked(value: unknown, schema: Record<string, any> | undefined): boolean {
  const pair = resolvePair(schema)
  if (pair) return value === pair[0].value
  return !!value
}

// 查看态：只读勾选框——包裹层 ::before 透明遮罩拦截点击（不切换勾选、不灰化），
// 双击经包裹层冒泡仍可进编辑（disabled 控件不派发鼠标事件，双击失效）；
// tabindex=-1 关闭键盘空格切换（遮罩只拦鼠标）
export function toView(ctx: WidgetRenderContext): TemplateResult {
  const label = resolveCheckLabel(ctx.value, ctx.schema)
  return html`<span class="to-view-checkbox">
    <input type="checkbox" tabindex="-1" ?checked=${isCheckboxChecked(ctx.value, ctx.schema)} />
    ${label ? html`<span class="check-label">${label}</span>` : nothing}
  </span>`
}

// 编辑态：双值档位（勾选≡第一项 value）；无档位则 boolean 开关
export function toRender(ctx: WidgetRenderContext): TemplateResult {
  const { plan, setValue, onKeydown } = ctx
  const onValue = plan.pair ? plan.pair[0].value : true
  const label = resolveCheckLabel(ctx.value, ctx.schema)
  // label 包裹：编辑容器为纵向 flex，勾选框与文案需横排成行（点文案亦可切换勾选）
  return html`<label class="edit-checkbox">
    <input
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
    />${label ? html`<span class="check-label">${label}</span>` : nothing}
  </label>`
}

export const checkboxModule: WidgetModule = { toView, toRender }
