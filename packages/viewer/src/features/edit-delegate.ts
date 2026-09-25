import type { ReactiveController } from 'lit'
import type { TreeNode, TreeNodeType } from '../types'
import { resolveEditorPlan, resolvePair } from './edit-plan'
import { joinPath } from '../utils/joinPath'
import { splitPath } from '../utils/splitPath'
import { computeValueError, convertValue, findItemRule } from '../utils/value-io'

// edit 常驻委托宿主接口（ADR-0031 特性控制器形态）
export interface EditDelegateHost {
  requestUpdate(): void
  // 编辑模式（仅 edit 生效）
  readonly mode: 'view' | 'edit' | 'click-edit'
  getNodeByPath(path: string[]): TreeNode | null
  getSchemaByPath(path: string[]): Record<string, any> | undefined
  getStateByPath(path: string[]): any
  isExpandableType(type: TreeNodeType): boolean
  isEditableNode(node: TreeNode): boolean
  // 树序全部可用编辑控件（Enter 焦点转移）
  getEditControls(): HTMLInputElement[]
}

// edit 常驻委托特性控制器（ADR-0027；ADR-0031 自宿主提炼）：
// 控件不绑 per-node 监听，input/change/keydown 写回与键盘统一在渲染根委托处理
export class EditDelegateController implements ReactiveController {
  private _host: EditDelegateHost

  // edit 常驻模式的 per-path 校验错误（非响应式，变更处手动 requestUpdate）
  private _inlineErrors = new Map<string, string>()

  // 根事件委托目标（firstUpdated 挂载，断开时摘除）
  private _root: HTMLElement | DocumentFragment | null = null

  constructor(host: EditDelegateHost) {
    this._host = host
  }

  // edit 常驻模式的根事件委托（ADR-0027）：input/change = 提取控件值→校验→写回
  private _onInput = (e: Event) => {
    if (this._host.mode !== 'edit') return
    const target = e.target as HTMLElement
    const row = target instanceof Element ? target.closest('.tree-node') as HTMLElement | null : null
    const pathAttr = row?.dataset.path
    if (!pathAttr) return
    const node = this._host.getNodeByPath(splitPath(pathAttr))
    // 仅常驻编辑的叶子；容器 JSON 编辑与 click-edit 由 Editable 状态机处理
    if (!node || this._host.isExpandableType(node.type) || !this._host.isEditableNode(node)) return
    const schema = this._host.getSchemaByPath(node.path) as Record<string, any> | undefined
    const plan = resolveEditorPlan(node, schema ?? {}, '')
    const raw = this._extractControlValue(e.target as HTMLInputElement, plan, schema)
    if (raw === undefined) return
    // 子项自身 schema 无 validate 时回溯祖先 itemValidate（容器逐项约束）
    const itemRule = typeof schema?.validate === 'function' ? null : findItemRule(node.path, (p) => this._host.getSchemaByPath(p))
    const error = computeValueError({ raw, schema, plan, valueType: node.type, oldValue: node.value, path: node.path, itemRule })
    const key = joinPath(node.path)
    if (error !== null) {
      if (this._inlineErrors.get(key) !== error) {
        this._inlineErrors.set(key, error)
        this._host.requestUpdate()
      }
      return
    }
    if (this._inlineErrors.has(key)) {
      this._inlineErrors.delete(key)
      this._host.requestUpdate()
    }
    const parent = this._host.getStateByPath(node.path.slice(0, -1))
    if (parent) parent[node.path[node.path.length - 1]] = convertValue(raw, node.type, plan, schema)
  }

  // edit 常驻：Enter = 焦点转移到树序下一个可编辑控件（textarea 的 Enter 为换行）
  private _onKeydown = (e: KeyboardEvent) => {
    if (this._host.mode !== 'edit') return
    if (e.isComposing || e.keyCode === 229) return
    if (e.key !== 'Enter') return
    const target = e.target as HTMLElement
    if (target.tagName === 'TEXTAREA' || !target.classList.contains('edit-input')) return
    const controls = this._host.getEditControls()
    const next = controls[controls.indexOf(target) + 1]
    if (next) {
      next.focus()
      if (next.type === 'text' || next.type === 'number') next.select()
    }
  }

  // 根事件委托挂载（渲染根就绪后；原宿主 firstUpdated 行为原样迁入）
  attach(root: HTMLElement | DocumentFragment): void {
    this._root = root
    root.addEventListener('input', this._onInput)
    root.addEventListener('change', this._onInput)
    root.addEventListener('keydown', this._onKeydown)
  }

  // 断开DOM时摘除委托监听
  hostDisconnected(): void {
    this._root?.removeEventListener('input', this._onInput)
    this._root?.removeEventListener('change', this._onInput)
    this._root?.removeEventListener('keydown', this._onKeydown)
  }

  // 渲染读取：edit 常驻模式某路径的当前校验错误（null=无）
  getInlineError(path: string[]): string | null {
    return this._inlineErrors.get(joinPath(path)) ?? null
  }

  // 切离 edit 模式时清空常驻错误（宿主 willUpdate 编排调用）
  clearErrors(): void {
    this._inlineErrors.clear()
  }

  // per-kind 从控件提取待写值（checkbox 双值档位/select 下标取原值/radio/文本原样）
  private _extractControlValue(
    el: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement,
    plan: ReturnType<typeof resolveEditorPlan>,
    schema: Record<string, any> | undefined,
  ): any {
    switch (plan.kind) {
      case 'checkbox': {
        const pair = resolvePair(schema)
        const checked = (el as HTMLInputElement).checked
        return pair ? (checked ? pair[0].value : pair[1].value) : checked
      }
      case 'select': {
        const sel = el as HTMLSelectElement
        if (plan.multiple) {
          return Array.from(sel.selectedOptions, (o) => plan.choices[Number(o.value)].value)
        }
        return plan.choices[sel.selectedIndex]?.value
      }
      case 'radio': {
        return plan.choices[Number((el as HTMLInputElement).value)]?.value
      }
      default:
        return (el as HTMLInputElement).value
    }
  }
}
