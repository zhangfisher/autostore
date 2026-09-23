import { html } from 'lit'
import type { TreeNode, TreeNodeType } from './types'
import type { AutoStore } from 'autostore'

// 行内编辑器宿主接口：编辑状态变化时通知重渲染
export interface EditableHost {
  requestUpdate(): void
}

/**
 * 节点行内编辑器
 *
 * 封装编辑状态管理与类型化输入渲染：
 * - string → text 输入框
 * - number → number 输入框
 * - boolean → checkbox
 *
 * 键盘交互：Esc 取消编辑，Enter 确认并进入同级下一个可编辑节点
 * 失焦交互：input 失焦时退出编辑（不保存）
 */
export class Editable {
  // 当前正在编辑的节点路径（null 表示非编辑状态）
  editingPath: string[] | null = null

  // 编辑中的临时值（非响应式，避免输入时重渲染）
  editValue: any = null

  // 进入编辑前快照的原值类型（回写时用于类型转换，不受编辑期间外部更新影响）
  editType: TreeNodeType | null = null

  private _host: EditableHost
  // 按路径读取 state 值
  private _getStateByPath: (path: string[]) => any
  // 获取当前绑定的 store
  private _getStore: () => AutoStore<any> | null
  // 查找同级中当前节点之后的第一个可编辑节点（Enter 链式编辑用）
  private _findNextEditable: (node: TreeNode) => TreeNode | null
  // 按路径从树中查找节点（Enter 链式编辑时按编辑路径重新定位当前节点）
  private _findNodeByPath: (path: string[]) => TreeNode | null

  constructor(
    host: EditableHost,
    getStateByPath: (path: string[]) => any,
    getStore: () => AutoStore<any> | null,
    findNextEditable: (node: TreeNode) => TreeNode | null,
    findNodeByPath: (path: string[]) => TreeNode | null,
  ) {
    this._host = host
    this._getStateByPath = getStateByPath
    this._getStore = getStore
    this._findNextEditable = findNextEditable
    this._findNodeByPath = findNodeByPath
  }

  // 判断节点是否处于编辑状态
  isEditing(node: TreeNode): boolean {
    const editing = this.editingPath
    return !!editing && editing.length === node.path.length && editing.every((p, i) => p === node.path[i])
  }

  // 进入编辑状态：快照原值与原值类型
  start(node: TreeNode): void {
    this.editValue = node.value
    this.editType = node.type
    this.editingPath = [...node.path]
    this._host.requestUpdate()
  }

  // 取消编辑
  cancel(): void {
    this.editValue = null
    this.editType = null
    this.editingPath = null
    this._host.requestUpdate()
  }

  // 确认编辑：输入值按快照的原值类型转换后写回 store
  confirm(): void {
    if (!this.editingPath) return
    const store = this._getStore()
    if (!store) return
    const parent = this._getStateByPath(this.editingPath.slice(0, -1))
    const key = this.editingPath[this.editingPath.length - 1]
    if (!parent) return
    let value = this.editValue
    if (this.editType === 'number') value = Number(value)
    parent[key] = value
    this.editValue = null
    this.editType = null
    this.editingPath = null
  }

  // 编辑器失焦：退出编辑且不保存
  // 仅当失焦节点仍是当前编辑节点时取消——Enter 链式切换/pointerdown 确认后，
  // 渲染移除旧 input 可能引发滞后 blur，不得清掉新节点的编辑状态
  onBlur(node: TreeNode): void {
    if (this.isEditing(node)) this.cancel()
  }

  // 编辑器键盘事件：Esc 取消 / Enter 确认并前进到同级下一个可编辑节点
  onEditorKeydown(e: KeyboardEvent): void {
    // 输入法组合态（候选确认）的 Enter/Esc 不触发编辑操作
    if (e.isComposing || e.keyCode === 229) return
    if (e.key === 'Escape') {
      this.cancel()
    } else if (e.key === 'Enter') {
      // confirm 会清空 editingPath，须先捕获路径供查找下一节点
      const path = this.editingPath
      this.confirm()
      const current = path ? this._findNodeByPath(path) : null
      const next = current ? this._findNextEditable(current) : null
      if (next) this.start(next)
    }
  }

  // 渲染类型化编辑器（string→text / number→number / boolean→checkbox）
  renderEditor(node: TreeNode): any {
    if (node.type === 'boolean') {
      return html`<input
        class="edit-input"
        type="checkbox"
        .checked=${!!node.value}
        @change=${(e: Event) => { this.editValue = (e.target as HTMLInputElement).checked }}
        @keydown=${(e: KeyboardEvent) => this.onEditorKeydown(e)}
        @blur=${() => this.onBlur(node)}
        @click=${(e: Event) => e.stopPropagation()}
      />`
    }
    const inputType = node.type === 'number' ? 'number' : 'text'
    return html`<input
      class="edit-input"
      type=${inputType}
      .value=${String(node.value ?? '')}
      @input=${(e: Event) => { this.editValue = (e.target as HTMLInputElement).value }}
      @keydown=${(e: KeyboardEvent) => this.onEditorKeydown(e)}
      @blur=${() => this.onBlur(node)}
      @click=${(e: Event) => e.stopPropagation()}
    />`
  }
}
