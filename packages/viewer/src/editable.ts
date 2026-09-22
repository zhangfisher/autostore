import { html } from 'lit'
import type { TreeNode } from './types'
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
 * 键盘交互：Esc 取消编辑，Enter 确认编辑
 */
export class Editable {
  // 当前正在编辑的节点路径（null 表示非编辑状态）
  editingPath: string[] | null = null

  // 编辑中的临时值（非响应式，避免输入时重渲染）
  editValue: any = null

  private _host: EditableHost
  // 按路径读取 state 值
  private _getStateByPath: (path: string[]) => any
  // 获取当前绑定的 store
  private _getStore: () => AutoStore<any> | null

  constructor(
    host: EditableHost,
    getStateByPath: (path: string[]) => any,
    getStore: () => AutoStore<any> | null,
  ) {
    this._host = host
    this._getStateByPath = getStateByPath
    this._getStore = getStore
  }

  // 判断节点是否处于编辑状态
  isEditing(node: TreeNode): boolean {
    const editing = this.editingPath
    return !!editing && editing.length === node.path.length && editing.every((p, i) => p === node.path[i])
  }

  // 进入编辑状态
  start(node: TreeNode): void {
    this.editValue = node.value
    this.editingPath = [...node.path]
    this._host.requestUpdate()
  }

  // 取消编辑
  cancel(): void {
    this.editValue = null
    this.editingPath = null
    this._host.requestUpdate()
  }

  // 确认编辑：将输入值写回 store
  confirm(node: TreeNode): void {
    const store = this._getStore()
    if (!store) return
    const parent = this._getStateByPath(node.path.slice(0, -1))
    const key = node.path[node.path.length - 1]
    if (!parent) return
    let value = this.editValue
    if (node.type === 'number') value = Number(value)
    parent[key] = value
    this.editValue = null
    this.editingPath = null
  }

  // 编辑器键盘事件：Esc 取消 / Enter 确认
  onEditorKeydown(e: KeyboardEvent, node: TreeNode): void {
    if (e.key === 'Escape') {
      this.cancel()
    } else if (e.key === 'Enter') {
      this.confirm(node)
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
        @click=${(e: Event) => e.stopPropagation()}
      />`
    }
    const inputType = node.type === 'number' ? 'number' : 'text'
    return html`<input
      class="edit-input"
      type=${inputType}
      .value=${String(node.value ?? '')}
      @input=${(e: Event) => { this.editValue = (e.target as HTMLInputElement).value }}
      @keydown=${(e: KeyboardEvent) => this.onEditorKeydown(e, node)}
      @click=${(e: Event) => e.stopPropagation()}
    />`
  }
}
