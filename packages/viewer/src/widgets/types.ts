import type { TemplateResult } from 'lit'
import type { TreeNode } from '../types'
import type { EditorPlan } from '../edit-plan'

// 受控编辑接口：widgets 与自定义 toRender 经此读写编辑状态机的对外面，
// 不可绕过状态机直改内部字段（ADR-0026）
export interface WidgetEditorControl {
  // 当前编辑值（实时，随输入变化）
  readonly value: any
  // 当前校验错误（null = 无错误；自定义错误 UI 的数据源）
  readonly error: string | null
  // 渲染方案（attrs/pair/choices/inputType/multiple）
  readonly plan: EditorPlan | null
  // 即时生效写回（校验通过写 store，失败显示错误）
  setValue(v: any): void
  // 退出编辑（回填树）
  exit(): void
  // 接入键盘状态机（Enter 链式前进/Esc）
  keydown(e: KeyboardEvent): void
}

// widget 渲染上下文：value 为进入编辑时快照（静态绑定基准，输入过程不变），
// 实时值经 editor.value 读取；editor 仅编辑态提供（查看态 toView 无编辑语义）
export interface WidgetRenderContext {
  value: any
  schema: Record<string, any>
  plan: EditorPlan
  node: TreeNode
  setValue(v: any): void
  onKeydown(e: KeyboardEvent): void
  editor?: WidgetEditorControl
}

// widget 模块：toView/toRender 返回 null 表示无内置实现，宿主回落默认渲染链（ADR-0026）
export interface WidgetModule {
  toView?(ctx: WidgetRenderContext): TemplateResult | null
  toRender?(ctx: WidgetRenderContext): TemplateResult | null
}
