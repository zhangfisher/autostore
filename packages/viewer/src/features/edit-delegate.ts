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
  // 按路径取父容器（跨 store 归属解析后写回，配置面板模式下不可用 getStateByPath 前缀代替）
  getParent(path: string[]): any
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

  // 自写回标记（path key → 待回声次数）：委托写回会同步触发 store watch 回声，
  // 宿主据此将回声判定为"自己写的"以冻结树更新（防委托写回重置光标）；外部写入
  // （其他 viewer 实例/程序化 setState）无标记，照常同步。微任务兜底清除——
  // 同值写入不派发 operate 时残留标记会误吞下一次外部更新
  private _selfWrites = new Map<string, number>()

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
    const parent = this._host.getParent(node.path)
    if (!parent) return
    // 先打自写回标记再写：store 的 watch 回声（同步派发，含批量回放）据此被宿主冻结
    this._selfWrites.set(key, (this._selfWrites.get(key) ?? 0) + 1)
    queueMicrotask(() => this._selfWrites.delete(key))
    parent[node.path[node.path.length - 1]] = convertValue(raw, node.type, plan, schema)
  }

  // edit 常驻：Enter = 焦点转移到树序下一个可编辑控件（textarea 的 Enter 为换行）；
  // 签名对齐 _onInput 用 Event——EventListener 形参逆变，KeyboardEvent 处理器不能直接挂载
  private _onKeydown = (e: Event) => {
    if (!(e instanceof KeyboardEvent)) return
    if (this._host.mode !== 'edit') return
    if (e.isComposing || e.keyCode === 229) return
    if (e.key !== 'Enter') return
    // 能走到此处 target 必为 .edit-input 的 input（TEXTAREA 已排除），与 getEditControls 元素同型
    const target = e.target as HTMLInputElement
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

  // 是否存在任一常驻校验错误（表单提交前校验的判定源，ADR-0035 提交管理）：
  // 非法值滞留控件未进 store，登记于此
  hasInlineErrors(): boolean {
    return this._inlineErrors.size > 0
  }

  // 命中并消费一次自写回标记（宿主 onStateOperate 冻结判定入口）：
  // 计数消费——同一控件对同 path 的连续多次写回对应多次回声
  consumeSelfWrite(path: string[]): boolean {
    const key = joinPath(path)
    const count = this._selfWrites.get(key) ?? 0
    if (count === 0) return false
    if (count === 1) this._selfWrites.delete(key)
    else this._selfWrites.set(key, count - 1)
    return true
  }

  // 切离 edit 模式时清空常驻错误与自写回标记（宿主 willUpdate 编排调用）
  clearErrors(): void {
    this._inlineErrors.clear()
    this._selfWrites.clear()
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
