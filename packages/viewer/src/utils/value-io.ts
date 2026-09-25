// 值写入的校验与转换（ADR-0025/0027）：click-edit 状态机与 edit 常驻委托共用（DRY）
import type { EditorPlan } from '../features/edit-plan'
import type { TreeNodeType } from '../types'

// errorMessage 插值：{label}/{value}/{path}
// 模板归一：响应式代理可能把字符串属性读成 String 包装对象（typeof object），valueOf 还原
export function interpolateError(
  tpl: unknown,
  schema: Record<string, any> | undefined,
  value: any,
  path: string[],
): string | undefined {
  const text = typeof tpl === 'string' ? tpl : tpl instanceof String ? tpl.valueOf() : undefined
  if (text === undefined || text === '') return undefined
  return text
    .replaceAll('{label}', schema?.label ?? '')
    .replaceAll('{value}', String(value ?? ''))
    .replaceAll('{path}', path.join('.'))
}

// 编辑值 → 写回值：原值类型为锚；select/radio/checkbox 已是原值类型，仅文本与 JSON 需转换；
// 容器整体编辑（jsonMode）经 schema.toState 自定义文本解析（如 IP 列表 → 数组），替代 JSON.parse
export function convertValue(
  raw: any,
  valueType: TreeNodeType | null,
  plan: EditorPlan | null | undefined,
  schema?: Record<string, any>,
): any {
  if (plan?.jsonMode) {
    if (typeof schema?.toState === 'function') return schema.toState(raw)
    return JSON.parse(raw)
  }
  const kind = plan?.kind
  if (valueType === 'number' && (kind === 'input' || kind === 'textarea')) return Number(raw)
  return raw
}

// 子项校验规则回溯：子项自身 schema 无 validate 时，沿祖先向上找第一个声明 itemValidate 的
// schema（容器级逐项约束，如数组每项须为合法 IP）；返回 null 表示无规则。
// 祖先只有 validate（容器整体校验）时不拦子项编辑——整体合法由容器自身编辑路径把关；
// 仅用于编辑校验链——显示链（label/icon）仍按子项自身路径取 schema，不回溯
export interface ItemRule {
  validate: (item: any, index: number | string) => boolean
  errorMessage?: string
  label?: string
}

export function findItemRule(
  path: string[],
  getSchemaByPath: (path: string[]) => Record<string, any> | undefined,
): ItemRule | null {
  // 自父级起沿祖先向上（自身 schema 的 validate 由调用方 computeValueError 先行处理）
  for (let i = path.length - 1; i > 0; i--) {
    const schema = getSchemaByPath(path.slice(0, i))
    if (typeof schema?.itemValidate === 'function') {
      return { validate: schema.itemValidate, errorMessage: schema.errorMessage, label: schema.label }
    }
  }
  return null
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
  // 子项回溯规则（容器 itemValidate；子项自身 schema 无 validate 时由调用方经 findItemRule 解析）
  itemRule?: ItemRule | null
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
    if (typeof schema?.toState === 'function') {
      // 自定义文本解析：抛错 message 优先（与 validate 抛错同优先级），产物类型交 validate 把关
      try {
        value = schema.toState(raw)
      } catch (e: any) {
        return e?.message ? String(e.message) : '转换失败'
      }
    } else {
      try {
        value = JSON.parse(raw)
      } catch {
        return '无效的 JSON'
      }
      const typeOk =
        valueType === 'array' ? Array.isArray(value) : typeof value === 'object' && value !== null && !Array.isArray(value)
      if (!typeOk) return '值类型不匹配'
    }
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
  // 容器逐项规则（itemValidate 回溯）：自身 schema.validate 已通过或不存在时追加把关
  const itemRule = ctx.itemRule
  if (itemRule) {
    const index = path.length > 0 ? path[path.length - 1] : ''
    try {
      if (itemRule.validate(value, index) === false) {
        return interpolateError(itemRule.errorMessage, { label: itemRule.label }, raw, path) ?? '值无效'
      }
    } catch (e: any) {
      return e?.message ? String(e.message) : (interpolateError(itemRule.errorMessage, { label: itemRule.label }, raw, path) ?? '值无效')
    }
  }
  return null
}
