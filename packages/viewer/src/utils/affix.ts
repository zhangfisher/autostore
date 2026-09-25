import { html, nothing } from 'lit'

// 值装饰（CONTEXT.md「值装饰」）：prefix/suffix 拼在值文本前后的纯展示装饰，不属于值本身——
// 状态值与编辑写回均为裸值，无任何拼接/剥离逻辑；查看态只拼 formatValue 裸值层
// （toView/choices 标签/内置 widget 视图均不拼）；受 disable-schema 门控（展示词汇家族，
// 同 label/help——门控由调用方以过滤后 schema 传入实现）

// 装饰判据：非空字符串才生效（同 schema.icon/name 先例）；值为空（null/undefined/''）不拼（$ null 是噪声）
export interface ValueAffix {
  prefix: string
  suffix: string
}

export function resolveAffix(schema: Record<string, any> | undefined, value: unknown): ValueAffix {
  if (value === null || value === undefined || value === '') return { prefix: '', suffix: '' }
  const prefix = typeof schema?.prefix === 'string' && schema.prefix !== '' ? schema.prefix : ''
  const suffix = typeof schema?.suffix === 'string' && schema.suffix !== '' ? schema.suffix : ''
  return { prefix, suffix }
}

// 编辑 shell 层统一包裹形态：无装饰原样返回（渲染路径零变化），有则与控件并排包 inline-flex 行
export function renderAffixed(affix: ValueAffix, content: any): any {
  if (!affix.prefix && !affix.suffix) return content
  return html`<span class="asv-affix-row"
    >${affix.prefix ? html`<span class="asv-affix">${affix.prefix}</span>` : nothing}${content}${affix.suffix ? html`<span class="asv-affix">${affix.suffix}</span>` : nothing}</span
  >`
}
