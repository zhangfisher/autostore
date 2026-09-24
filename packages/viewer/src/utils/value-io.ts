// 值写入的校验与转换（ADR-0025/0027）：click-edit 状态机与 edit 常驻委托共用（DRY）
import type { EditorPlan } from '../edit-plan'
import type { TreeNodeType } from '../types'

// errorMessage 插值：{label}/{value}/{path}
export function interpolateError(
  tpl: unknown,
  schema: Record<string, any> | undefined,
  value: any,
  path: string[],
): string | undefined {
  if (typeof tpl !== 'string' || tpl === '') return undefined
  return tpl
    .replaceAll('{label}', schema?.label ?? '')
    .replaceAll('{value}', String(value ?? ''))
    .replaceAll('{path}', path.join('.'))
}

// 编辑值 → 写回值：原值类型为锚；select/radio/checkbox 已是原值类型，仅文本与 JSON 需转换
export function convertValue(raw: any, valueType: TreeNodeType | null, plan: EditorPlan | null | undefined): any {
  if (plan?.jsonMode) return JSON.parse(raw)
  const kind = plan?.kind
  if (valueType === 'number' && (kind === 'input' || kind === 'textarea')) return Number(raw)
  return raw
}

// 值写入上下文
export interface ValueWriteContext {
  // 控件原始输入（文本类为字符串；select/radio/checkbox 为提取后的原值）
  raw: any
  schema?: Record<string, any>
  plan?: EditorPlan | null
  // 类型锚（click-edit=进入编辑快照；edit 常驻=树节点类型）
  valueType: TreeNodeType | null
  // schema.validate 的 oldValue
  oldValue: any
  path: string[]
}

// 校验规则链：required 空值 → JSON 解析与类型（整体编辑）→ schema.validate；null = 通过
export function computeValueError(ctx: ValueWriteContext): string | null {
  const { schema, plan, valueType, oldValue, path } = ctx
  const raw = ctx.raw
  if (schema?.required === true && (raw === '' || raw === null || raw === undefined)) {
    return interpolateError(schema.errorMessage, schema, raw, path) ?? '此项必填'
  }
  // 编辑值 → 将要写回的值（解析失败/类型不符即校验错误）
  let value = raw
  if (plan?.jsonMode) {
    try {
      value = JSON.parse(raw)
    } catch {
      return '无效的 JSON'
    }
    const typeOk =
      valueType === 'array' ? Array.isArray(value) : typeof value === 'object' && value !== null && !Array.isArray(value)
    if (!typeOk) return '值类型不匹配'
  } else {
    const kind = plan?.kind
    if (valueType === 'number' && (kind === 'input' || kind === 'textarea')) {
      value = Number(raw)
    }
  }
  const validate = schema?.validate
  if (typeof validate === 'function') {
    try {
      if (validate(value, oldValue, path) === false) {
        return interpolateError(schema?.errorMessage, schema, raw, path) ?? '值无效'
      }
    } catch (e: any) {
      // 抛错的 message 优先于 errorMessage
      return e?.message ? String(e.message) : (interpolateError(schema?.errorMessage, schema, raw, path) ?? '值无效')
    }
  }
  return null
}
