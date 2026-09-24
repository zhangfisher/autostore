// widget 注册表：widget 名 → 渲染模块（22 项全覆盖，ADR-0026）
// input 家族与 combobox/hidden/image 共享 input 模块（同一套 input 模板）
import type { WidgetModule } from './types'
import { inputModule } from './input'
import { colorModule } from './color'
import { checkboxModule } from './checkbox'
import { textareaModule } from './textarea'
import { selectModule } from './select'
import { radioModule } from './radio'

const MODULES: Record<string, WidgetModule> = {
  text: inputModule,
  number: inputModule,
  email: inputModule,
  password: inputModule,
  search: inputModule,
  tel: inputModule,
  url: inputModule,
  date: inputModule,
  'datetime-local': inputModule,
  month: inputModule,
  time: inputModule,
  week: inputModule,
  color: colorModule,
  range: inputModule,
  file: inputModule,
  combobox: inputModule,
  hidden: inputModule,
  image: inputModule,
  checkbox: checkboxModule,
  textarea: textareaModule,
  select: selectModule,
  radio: radioModule,
}

// 未声明/未知 widget 返回 null：编辑回落 input 家族编辑器，查看回落 choices/formatValue
export function getWidgetModule(widget: string | undefined): WidgetModule | null {
  if (!widget) return null
  return MODULES[widget] ?? null
}

// 按 plan.kind 兜底取模块：plan 是 widget 决策链的产物（容器未声明→textarea/jsonMode、
// boolean 叶子未声明→checkbox 等），渲染分发以产物为准，防止决策与渲染脱节
const KIND_MODULES: Record<string, WidgetModule> = {
  input: inputModule,
  textarea: textareaModule,
  select: selectModule,
  radio: radioModule,
  checkbox: checkboxModule,
}

export function getModuleByPlanKind(kind: string): WidgetModule {
  return KIND_MODULES[kind] ?? inputModule
}
