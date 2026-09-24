import { html, nothing } from 'lit'
import type { TreeNode } from './types'
import type { AutoStore } from 'autostore'
import { resolveEditorPlan } from './edit-plan'
import type { EditorPlan } from './edit-plan'
import { computeValueError, convertValue } from './utils/value-io'
import type { WidgetRenderContext } from './widgets/types'
import { getWidgetModule } from './widgets/registry'
import { inputModule } from './widgets/input'

// 行内编辑器宿主接口：编辑状态变化时通知重渲染
export interface EditableHost {
  requestUpdate(): void
}

/**
 * 节点行内编辑器（即时生效模式）
 *
 * 封装编辑状态管理与 widget 决策渲染（ADR-0023）：
 * - schema.widget 显式声明 → 按声明渲染标准表单控件
 *   （input type 家族 / textarea / select / radio / checkbox / combobox=input+datalist）
 * - 无声明：对象/数组（整体编辑判定通过）→ JSON 整体编辑 textarea；叶子按值类型回落
 * - hidden / image / 未知 widget 一律回落标准 text input
 *
 * 即时生效：输入/选择变化即校验并写入 store，无确认与取消——
 * - 值有效：按快照的原值类型转换后立即写入 store
 * - 值无效（required 空值 / JSON 解析与类型不符 / validate 拒绝）：不写入，控件下方实时显示红色错误，
 *   修正后自动写入并隐藏错误
 * - 键盘：Enter 链式前进到同级下一个可编辑节点（当前值无效时不前进；textarea 的 Enter 为换行）；
 *   Esc 不拦截（无取消语义）
 * - 失焦：退出编辑（值已即时写入，退出仅回填树显示）
 *
 * 编辑期间该节点的树更新被宿主冻结（见 autostore-viewer 的 watch 回调），
 * 退出/链式切换时经 _syncNode 回填树，避免 store 自写入触发重渲染重置输入光标。
 */
export class Editable {
  // 当前正在编辑的节点路径（null 表示非编辑状态）
  editingPath: string[] | null = null

  // 编辑中的临时值（非响应式，避免输入时重渲染）
  editValue: any = null

  // 进入编辑前快照的原值类型（回写时用于类型转换，不受编辑期间外部更新影响）
  editType: TreeNode['type'] | null = null

  // 进入编辑前快照的原值（schema.validate 的 oldValue 实参；widget ctx.value 的静态绑定基准）
  editOldValue: any = null

  // 进入编辑时快照的 schema 元数据（编辑期间 schema 变更不影响本次编辑）
  editSchema: Record<string, any> | undefined = undefined

  // 由 schema.widget 与节点类型解析的渲染方案（start 时解析一次）
  editPlan: EditorPlan | null = null

  // 当前校验错误信息（null 表示无错误；仅在变化时 requestUpdate，避免输入过程重渲染）
  editError: string | null = null

  // 编辑会话序号（datalist id / radio 组名隔离，防跨实例串组）
  private _editSeq = 0

  private _host: EditableHost
  // 按路径读取 state 值
  private _getStateByPath: (path: string[]) => any
  // 获取当前绑定的 store
  private _getStore: () => AutoStore<any> | null
  // 查找同级中当前节点之后的第一个可编辑节点（Enter 链式编辑用）
  private _findNextEditable: (node: TreeNode) => TreeNode | null
  // 按路径从树中查找节点（Enter 链式编辑时按编辑路径重新定位当前节点）
  private _findNodeByPath: (path: string[]) => TreeNode | null
  // 按路径读取 schema 元数据（widget 决策与校验规则来源）
  private _getSchemaByPath: (path: string[]) => Record<string, any> | undefined
  // 退出编辑的路径回填（编辑期间树更新被冻结，退出时从 state 同步树节点）
  private _syncNode: (path: string[]) => void

  constructor(
    host: EditableHost,
    getStateByPath: (path: string[]) => any,
    getStore: () => AutoStore<any> | null,
    findNextEditable: (node: TreeNode) => TreeNode | null,
    findNodeByPath: (path: string[]) => TreeNode | null,
    getSchemaByPath: (path: string[]) => Record<string, any> | undefined,
    syncNode: (path: string[]) => void,
  ) {
    this._host = host
    this._getStateByPath = getStateByPath
    this._getStore = getStore
    this._findNextEditable = findNextEditable
    this._findNodeByPath = findNodeByPath
    this._getSchemaByPath = getSchemaByPath
    this._syncNode = syncNode
  }

  // 判断节点是否处于编辑状态
  isEditing(node: TreeNode): boolean {
    const editing = this.editingPath
    return !!editing && editing.length === node.path.length && editing.every((p, i) => p === node.path[i])
  }

  // 进入编辑状态：快照原值/原值类型/schema 并解析渲染方案
  // 链式切换（已有编辑路径）时先回填上一节点的树
  start(node: TreeNode): void {
    if (this.editingPath) this._syncNode(this.editingPath)
    this.editValue = node.value
    this.editType = node.type
    this.editingPath = [...node.path]
    this.editOldValue = node.value
    this.editSchema = this._getSchemaByPath(node.path)
    this.editError = null
    this._editSeq++
    const groupId = `asv-edit-${this._editSeq}-${Math.random().toString(36).slice(2, 7)}`
    this.editPlan = resolveEditorPlan(node, this.editSchema, groupId)
    this._host.requestUpdate()
  }

  // 退出编辑：回填该节点的树并清空状态（值已即时写入，退出仅恢复树显示）
  exit(): void {
    const path = this.editingPath
    if (!path) return
    this.editingPath = null
    this.editValue = null
    this.editType = null
    this.editOldValue = null
    this.editSchema = undefined
    this.editPlan = null
    this.editError = null
    this._syncNode(path)
    this._host.requestUpdate()
  }

  // 编辑器失焦：退出编辑
  // 仅当失焦节点仍是当前编辑节点时处理——Enter 链式切换后渲染移除旧 input
  // 可能引发滞后 blur，不得清掉新节点的编辑状态
  onBlur(node: TreeNode): void {
    if (this.isEditing(node)) this.exit()
  }

  // 即时生效：输入值校验通过立即写入 store；无效则不写入并实时显示错误
  setValue(v: any): void {
    this.editValue = v
    const error = this._computeError(v)
    if (error !== this.editError) {
      this.editError = error
      this._host.requestUpdate()
    }
    if (error === null) this._write(v)
  }

  // 编辑器键盘事件：Enter 链式前进（值无效时不前进；textarea 的 Enter 为换行）
  onEditorKeydown(e: KeyboardEvent): void {
    // 输入法组合态（候选确认）的 Enter 不触发链式前进
    if (e.isComposing || e.keyCode === 229) return
    if (e.key === 'Enter') {
      // textarea 的 Enter 是换行
      if (this.editPlan?.kind === 'textarea') return
      // 当前值无效：不前进（错误保持显示）
      if (this.editError !== null) return
      const path = this.editingPath
      const current = path ? this._findNodeByPath(path) : null
      const next = current ? this._findNextEditable(current) : null
      if (next) this.start(next)
    }
    // Esc 不拦截：即时生效模式无取消语义
  }

  // 渲染编辑器：外层容器统一 focusout 失焦判定，纵向排列控件与错误；
  // 控件渲染分发到 widget 模块 toRender，无模块实现（未声明/未知 widget）时
  // 回落 input 家族编辑器（ADR-0026）
  renderEditor(node: TreeNode): any {
    const ctx = this._buildRenderContext(node)
    const module = getWidgetModule(this.editSchema?.widget)
    const content = module?.toRender?.(ctx) ?? inputModule.toRender!(ctx)
    return html`
      <div class="edit-editor" @focusout=${(e: FocusEvent) => this._onFocusOut(e, node)}>
        ${content}
        ${this.editError ? html`<div class="edit-error">${this.editError}</div>` : nothing}
      </div>
    `
  }

  // widget 渲染上下文：value 为进入编辑时快照（静态绑定基准，输入过程不变），
  // 实时值经 editor.value 读取
  private _buildRenderContext(node: TreeNode): WidgetRenderContext {
    const editable = this
    return {
      value: this.editOldValue,
      schema: this.editSchema ?? {},
      plan: this.editPlan!,
      node,
      setValue: (v) => this.setValue(v),
      onKeydown: (e) => this.onEditorKeydown(e),
      editor: {
        get value() {
          return editable.editValue
        },
        get error() {
          return editable.editError
        },
        get plan() {
          return editable.editPlan
        },
        setValue: (v) => editable.setValue(v),
        exit: () => editable.exit(),
        keydown: (e) => editable.onEditorKeydown(e),
      },
    }
  }

  // 容器级失焦判定：焦点仍在编辑器内部（如 radio 组内移动）不算失焦
  private _onFocusOut(e: FocusEvent, node: TreeNode): void {
    if (e.currentTarget instanceof HTMLElement && e.currentTarget.contains(e.relatedTarget as Node)) return
    this.onBlur(node)
  }

  // 校验规则链与写回转换已抽离 utils/value-io（click-edit 状态机与 edit 常驻委托共用，ADR-0027）
  private _computeError(raw: any): string | null {
    return computeValueError({
      raw,
      schema: this.editSchema,
      plan: this.editPlan,
      valueType: this.editType,
      oldValue: this.editOldValue,
      path: this.editingPath ?? [],
    })
  }

  private _convert(raw: any): any {
    return convertValue(raw, this.editType, this.editPlan)
  }

  // 写入 store：值已通过校验
  private _write(raw: any): void {
    const store = this._getStore()
    const path = this.editingPath
    if (!store || !path) return
    const parent = this._getStateByPath(path.slice(0, -1))
    const key = path[path.length - 1]
    if (!parent) return
    parent[key] = this._convert(raw)
  }
}
