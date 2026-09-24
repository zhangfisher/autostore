import type { TreeNode } from './types'

// widget→控件决策与候选项规范化（纯函数，无渲染依赖）
// 决策链见 ADR-0023：schema.widget 显式声明优先；容器未声明 widget 时为 JSON 整体编辑；
// 叶子未声明时按值类型回落；hidden/image/未知 widget 一律回落标准 text input

// 规范化候选项：字符串/数字项 value=label=自身；对象项经 valueKey/labelKey 取值（缺省 value/label）
export interface NormChoice {
  value: any
  label: string
}

// 编辑器渲染方案：start 时由 schema.widget 与节点类型解析一次
export interface EditorPlan {
  // 控件种类
  kind: 'input' | 'textarea' | 'select' | 'radio' | 'checkbox'
  // kind=input 时的原生 type
  inputType?: string
  // textarea 是否为对象 JSON 整体编辑模式（JSON.stringify ⇄ JSON.parse）
  jsonMode: boolean
  // select 是否 multiple（值/写回为所选 value 数组）
  multiple: boolean
  // checkbox 双值档位（勾选取 [0]、取消取 [1]）；null 表示 boolean 开关
  pair: [NormChoice, NormChoice] | null
  // select/radio 的候选项；combobox 的 datalist 候选项
  choices: NormChoice[]
  // combobox 的 datalist id / radio 组名（每次进入编辑重新生成，防跨实例串组）
  groupId: string
  // 透传到原生控件的属性（仅收录 HTML 原生词汇；filled/pill/prefix/suffix 等非原生语义静默忽略）
  props: Record<string, any>
}

// 原生 input type 直传家族（全部为标准表单控件）
const NATIVE_INPUT_TYPES = new Set([
  'text',
  'number',
  'email',
  'password',
  'search',
  'tel',
  'url',
  'date',
  'datetime-local',
  'month',
  'time',
  'week',
  'color',
  'range',
  'file',
])

// 各控件种类透传的原生属性白名单（schema 上存在且非空才透传）
const PROP_KEYS: Record<EditorPlan['kind'], string[]> = {
  input: [
    'disabled',
    'readOnly',
    'placeholder',
    'autocomplete',
    'tabIndex',
    'minLength',
    'maxLength',
    'pattern',
    'min',
    'max',
    'step',
    'accept',
    'capture',
    'multiple',
    'spellcheck',
  ],
  textarea: ['disabled', 'readOnly', 'placeholder', 'tabIndex', 'minLength', 'maxLength', 'rows', 'cols', 'wrap'],
  select: ['disabled', 'tabIndex', 'size'],
  radio: ['disabled', 'tabIndex'],
  checkbox: ['disabled', 'tabIndex'],
}

// 从 schema 拾取白名单内已定义的属性
const pickProps = (schema: Record<string, any> | undefined, kind: EditorPlan['kind']): Record<string, any> => {
  const props: Record<string, any> = {}
  if (!schema) return props
  for (const key of PROP_KEYS[kind]) {
    const v = schema[key]
    if (v !== undefined && v !== null) props[key] = v
  }
  return props
}

// 候选项规范化（SchemaChoices：字符串/数字 或 {label?,value} 对象）
export function normalizeChoices(raw: any, valueKey?: string, labelKey?: string): NormChoice[] {
  if (!Array.isArray(raw)) return []
  return raw.map((item: any) => {
    if (typeof item === 'object' && item !== null) {
      const value = item[valueKey ?? 'value']
      const label = item[labelKey ?? 'label']
      return { value, label: label === undefined || label === null ? String(value) : String(label) }
    }
    return { value: item, label: String(item) }
  })
}

// 双值档位（CONTEXT.md「双值选项对」）：choices 恰好两项时优先，回落 switchValues；
// 数量不符静默忽略为 boolean 开关
export const resolvePair = (schema: Record<string, any> | undefined): [NormChoice, NormChoice] | null => {
  const raw = Array.isArray(schema?.choices)
    ? schema.choices
    : Array.isArray(schema?.switchValues)
      ? schema.switchValues
      : null
  if (!raw || raw.length !== 2) return null
  const norm = normalizeChoices(raw)
  return [norm[0], norm[1]]
}

const makePlan = (
  kind: EditorPlan['kind'],
  groupId: string,
  schema: Record<string, any> | undefined,
  extra?: Partial<EditorPlan>,
): EditorPlan => ({
  kind,
  jsonMode: false,
  multiple: false,
  pair: null,
  choices: [],
  groupId,
  props: pickProps(schema, kind),
  ...extra,
})

// 解析编辑器渲染方案
export function resolveEditorPlan(
  node: TreeNode,
  schema: Record<string, any> | undefined,
  groupId: string,
): EditorPlan {
  const widget: string | undefined = schema?.widget
  const isContainer = node.type === 'object' || node.type === 'array'

  // 容器未声明 widget：JSON 整体编辑（textarea，jsonMode）
  if (isContainer && !widget) {
    return makePlan('textarea', groupId, schema, { jsonMode: true })
  }

  switch (widget) {
    case undefined:
      // 叶子未声明 widget：按值类型回落（schema 化编辑前的既有判定）
      if (node.type === 'boolean') return makePlan('checkbox', groupId, schema)
      return makePlan('input', groupId, schema, { inputType: node.type === 'number' ? 'number' : 'text' })
    case 'textarea':
      return makePlan('textarea', groupId, schema)
    case 'select': {
      const choices = normalizeChoices(schema?.choices, schema?.valueKey, schema?.labelKey)
      return makePlan('select', groupId, schema, { choices, multiple: schema?.multiple === true })
    }
    case 'radio': {
      const choices = normalizeChoices(schema?.choices, schema?.valueKey, schema?.labelKey)
      return makePlan('radio', groupId, schema, { choices })
    }
    case 'combobox': {
      // combobox = 标准输入框 + datalist 候选项
      const choices = normalizeChoices(schema?.choices, schema?.valueKey, schema?.labelKey)
      return makePlan('input', groupId, schema, { inputType: 'text', choices })
    }
    case 'checkbox':
      return makePlan('checkbox', groupId, schema, { pair: resolvePair(schema) })
    default:
      if (widget && NATIVE_INPUT_TYPES.has(widget)) {
        return makePlan('input', groupId, schema, { inputType: widget })
      }
      // hidden 无编辑意义、image 非输入控件、未知 widget 一律回落标准 text input
      return makePlan('input', groupId, schema, { inputType: 'text' })
  }
}
