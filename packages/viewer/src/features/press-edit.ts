import type { ReactiveController } from 'lit'
import type { TreeNode } from '../types'
import { splitPath } from '../utils/splitPath'

// click-edit 长按宿主接口（ADR-0031 特性控制器形态）
export interface PressEditHost {
  // 编辑模式（仅 click-edit 生效）
  readonly mode: 'view' | 'edit' | 'click-edit'
  getNodeByPath(path: string[]): TreeNode | null
  isEditableNode(node: TreeNode): boolean
  // 进入编辑（Editable 状态机）
  startEdit(node: TreeNode): void
  // 展开抑制标记写入（树特性 toggleExpand 消费即复位）
  setSuppressClick(value: boolean): void
}

// click-edit 长按特性控制器（ADR-0027 修订；ADR-0031 自宿主提炼）：
// 按住可编辑行 1s 进入编辑（与双击并列为编辑入口），松开/偏移超阈值/
// 第二次按下（双击接管）/断开取消；触发时抑制随后的展开 click
export class PressEditController implements ReactiveController {
  private _host: PressEditHost

  // click-edit 长按进入编辑（ADR-0027 修订）：按住 1s 触发（press-and-hold），
  // 松开/偏移超阈值/第二次按下（双击接管）/断开取消；触发时抑制随后的展开 click
  private _pressTimer: any = null
  private _pressOrigin: { x: number; y: number } | null = null
  private _pressDocTeardown: (() => void) | null = null

  // 根事件委托目标（firstUpdated 挂载，断开时摘除）
  private _root: HTMLElement | DocumentFragment | null = null

  constructor(host: PressEditHost) {
    this._host = host
  }

  // click-edit 根委托。按住模型：pointerdown 启动计时；document 级 pointerup
  // （松开）/pointermove 偏移超 6px（手抖容忍，亦覆盖移出行）取消；
  // 第二次 pointerdown 先取消旧计时（双击接管）。
  // 触发时置抑制标记抑制松手后的展开 click（触发早于 pointerup，时序天然成立）
  private _onPointerDown = (e: PointerEvent) => {
    // 新按压开始：重置抑制标记（清理上一长按未消费的残留，如触发后移出组件松开）
    this._host.setSuppressClick(false)
    if (this._host.mode !== 'click-edit' || e.button !== 0) return
    const target = e.target as HTMLElement
    // 编辑控件内的按住（如按住拖选文本）不启动
    if (target instanceof Element && target.closest('.edit-editor')) return
    const row = target instanceof Element ? target.closest('.tree-node') as HTMLElement | null : null
    const pathAttr = row?.dataset.path
    if (!pathAttr) return
    const node = this._host.getNodeByPath(splitPath(pathAttr))
    if (!node || !this._host.isEditableNode(node)) return
    this._cancelPress()
    this._pressOrigin = { x: e.clientX, y: e.clientY }
    const onUp = () => this._cancelPress()
    const onMove = (me: PointerEvent) => {
      if (
        this._pressOrigin &&
        Math.hypot(me.clientX - this._pressOrigin.x, me.clientY - this._pressOrigin.y) > 6
      ) {
        this._cancelPress()
      }
    }
    document.addEventListener('pointerup', onUp)
    document.addEventListener('pointermove', onMove)
    this._pressDocTeardown = () => {
      document.removeEventListener('pointerup', onUp)
      document.removeEventListener('pointermove', onMove)
    }
    this._pressTimer = setTimeout(() => {
      this._cancelPress()
      // 计时到点：再次确认模式未被切走
      if (this._host.mode !== 'click-edit') return
      this._host.setSuppressClick(true)
      this._host.startEdit(node)
    }, 1000)
  }

  // 取消进行中的长按：清计时器与 document 监听
  private _cancelPress(): void {
    if (this._pressTimer) {
      clearTimeout(this._pressTimer)
      this._pressTimer = null
    }
    this._pressOrigin = null
    if (this._pressDocTeardown) {
      this._pressDocTeardown()
      this._pressDocTeardown = null
    }
  }

  // 根事件委托挂载（渲染根就绪后；原宿主 firstUpdated 行为原样迁入）
  attach(root: HTMLElement | DocumentFragment): void {
    this._root = root
    root.addEventListener('pointerdown', this._onPointerDown as EventListener)
  }

  // 断开DOM时取消进行中的长按并摘除监听
  hostDisconnected(): void {
    this._cancelPress()
    this._root?.removeEventListener('pointerdown', this._onPointerDown as EventListener)
  }
}
