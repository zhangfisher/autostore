// textarea widget：多行文本（widget=textarea）与对象/数组 JSON 整体编辑（plan.jsonMode）；
// jsonMode 下 schema.toInput/toState 可自定义文本形态（如 IP 列表 join ⇄ split）
import { html, nothing, type TemplateResult } from 'lit'
import type { WidgetModule, WidgetRenderContext } from './types'

// 循环引用等无法 JSON 化的对象：捕获后留空文本，输入合法 JSON 即写入
function safeStringify(value: any): string {
  try {
    return JSON.stringify(value, null, 2)
  } catch {
    return ''
  }
}

// jsonMode 初值：schema.toInput 自定义序列化（数组→分隔文本等），抛错回落 JSON 化
function initialText(ctx: WidgetRenderContext): string {
  const toInput = ctx.schema?.toInput
  if (typeof toInput === 'function') {
    try {
      return String(toInput(ctx.value))
    } catch {
      // 回落 JSON（与写回 toState 抛错的错误提示对应）
    }
  }
  return safeStringify(ctx.value)
}

// 编辑态：初始文本为快照值的序列化（静态绑定基准，输入过程不重渲染）；
// Enter 是换行不确认（状态机对 textarea 的 Enter 不拦截）
export function toRender(ctx: WidgetRenderContext): TemplateResult {
  const { plan, setValue, onKeydown, name } = ctx
  const props = plan.props
  return html`<textarea
    class="edit-input edit-textarea"
    name=${name ?? nothing}
    .value=${plan.jsonMode ? initialText(ctx) : String(ctx.value ?? '')}
    ?disabled=${props.disabled}
    ?readonly=${props.readOnly}
    tabindex=${props.tabIndex ?? nothing}
    placeholder=${props.placeholder ?? nothing}
    minlength=${props.minLength ?? nothing}
    maxlength=${props.maxLength ?? nothing}
    rows=${props.rows ?? nothing}
    cols=${props.cols ?? nothing}
    wrap=${props.wrap ?? nothing}
    @input=${(e: Event) => setValue((e.target as HTMLTextAreaElement).value)}
    @keydown=${onKeydown}
    @click=${(e: Event) => e.stopPropagation()}
  ></textarea>`
}

export const textareaModule: WidgetModule = { toRender }
