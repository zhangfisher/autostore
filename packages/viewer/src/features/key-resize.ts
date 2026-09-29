import type { ReactiveController } from 'lit'

// 手柄拖拽的最小列宽（px）：保证展开箭头+类型图标+标签仍可读。
// 固定值不作配置——列宽值仅存组件内部、无属性通道（ADR-0036）
export const MIN_KEY_WIDTH = 40

// 列宽拖拽宿主接口（ADR-0031 特性控制器形态）
export interface KeyResizeHost {
  // value 对齐方式：right 模式不测量列宽、无 key/value 分界（手柄由 CSS 门控不渲染）
  readonly valueAlign: 'left' | 'right'
  // 宿主元素（拖拽期间 user-select 抑制 + 起点 CSS 变量读取）
  getHostElement(): HTMLElement
  // 列宽写回（与列宽测量共用宿主回调面 --viewer-key-width）
  setKeyWidth(width: string): void
  // 锁存置位/复位/查询：标志由列宽测量特性持有，宿主转发——特性互不知晓实现
  latchKeyWidth(): void
  unlatchKeyWidth(): void
  isKeyWidthLatched(): boolean
  // 拖拽结束/复位通知（bubbles+composed 的 key-width-change）
  notifyKeyWidthChange(width: number | null, manual: boolean): void
}

// 列宽拖拽特性控制器（ADR-0036）：手柄（.key-resizer）是渲染壳提供的宿主级覆盖层，
// 经根委托接管 pointerdown/dblclick——手柄位于行外，天然不触发行 click（展开）/
// value 双击编辑/长按编辑，无需逐一拦截。拖拽实时写 --viewer-key-width（rAF 合并），
// 背景带/垂直线随既有 calc 自动跟随；首次实际移动即锁存（测量让位），
// 双击手柄复位归还自动（锁存唯一出口）；值仅存组件内部
export class KeyResizeController implements ReactiveController {
  private _host: KeyResizeHost

  // 根事件委托目标（firstUpdated attach 挂载；断开摘除、重连重挂——renderRoot 随元素存活）
  private _root: HTMLElement | DocumentFragment | null = null

  // 进行中的拖拽会话
  private _dragging = false
  // 本次会话是否产生实际位移（无位移的单击不锁存、不通知）
  private _moved = false
  private _pointerId = -1
  private _startX = 0
  private _startWidth = 0
  // 最近一次会话写入的宽度（px，rAF 未落地时的兜底）
  private _sessionWidth = 0
  // 未落地的指针横坐标与合并帧句柄
  private _pendingX: number | null = null
  private _moveFrame: number | null = null
  // 活动会话的手柄（事件监听挂载点）
  private _handle: HTMLElement | null = null

  constructor(host: KeyResizeHost) {
    this._host = host
  }

  // 根事件委托挂载（与 edit-delegate/press-edit 同形态）
  attach(root: HTMLElement | DocumentFragment): void {
    this._root = root
    root.addEventListener('pointerdown', this._onPointerDown as EventListener)
    root.addEventListener('dblclick', this._onDblClick as EventListener)
  }

  // 手柄判定（根委托）：事件目标向上找 .key-resizer
  private _handleOf(e: Event): HTMLElement | null {
    const target = e.target as Element | null
    return target && typeof target.closest === 'function' ? target.closest('.key-resizer') : null
  }

  // 起点宽度：优先解析宿主 CSS 变量（px）；未测量/非 px（auto/缺失）时 DOM 兜底读
  // 首个行的 .node-label 实测宽（携 --row-depth 反向补偿还原全局列宽）；再无（空树）回落 0
  private _currentWidth(): number {
    const host = this._host.getHostElement()
    const raw = getComputedStyle(host).getPropertyValue('--viewer-key-width').trim()
    const parsed = parseFloat(raw)
    if (raw.endsWith('px') && Number.isFinite(parsed) && parsed > 0) return parsed
    const row = this._root?.querySelector?.('.tree-node') as HTMLElement | null
    const label = row?.querySelector('.node-label') as HTMLElement | null
    if (!label) return 0
    const depth = parseFloat(row!.style?.getPropertyValue('--row-depth') || '') || 0
    const step = (parseFloat(getComputedStyle(host).getPropertyValue('--viewer-indent-size')) || 20) - 8
    return label.getBoundingClientRect().width + depth * step
  }

  private _onPointerDown = (e: PointerEvent) => {
    if (this._dragging || this._host.valueAlign === 'right') return
    if (e.button !== 0) return
    const handle = this._handleOf(e)
    if (!handle) return
    e.preventDefault()
    this._dragging = true
    this._moved = false
    this._pointerId = e.pointerId
    this._startX = e.clientX
    this._startWidth = this._currentWidth()
    this._sessionWidth = this._startWidth
    this._handle = handle
    // 拖拽期间禁用文本选择（防框选）
    this._host.getHostElement().style.setProperty('user-select', 'none')
    // 后续指针事件捕获到手柄：移出元素边界不丢事件
    handle.setPointerCapture?.(e.pointerId)
    handle.addEventListener('pointermove', this._onPointerMove as EventListener)
    handle.addEventListener('pointerup', this._onPointerUp as EventListener)
    handle.addEventListener('pointercancel', this._onPointerUp as EventListener)
    handle.addEventListener('lostpointercapture', this._onPointerUp as EventListener)
  }

  // 位移经 rAF 合并：同一帧多次 pointermove 只应用末次
  private _onPointerMove = (e: PointerEvent) => {
    if (!this._dragging || e.pointerId !== this._pointerId) return
    this._pendingX = e.clientX
    if (this._moveFrame !== null) return
    this._moveFrame = requestAnimationFrame(() => {
      this._moveFrame = null
      if (!this._dragging || this._pendingX === null) return
      const x = this._pendingX
      this._pendingX = null
      this._applyX(x)
    })
  }

  // 应用横向位移：下限 MIN_KEY_WIDTH、无上限——手动拖拽不受 max-key-width 约束
  // （该上限只约束自动测量，ADR-0036）；首次实际写入即锁存
  private _applyX(clientX: number): void {
    const width = Math.max(MIN_KEY_WIDTH, Math.round(this._startWidth + (clientX - this._startX)))
    if (width === this._sessionWidth) return
    this._sessionWidth = width
    this._host.setKeyWidth(`${width}px`)
    if (!this._moved) {
      this._moved = true
      this._host.latchKeyWidth()
    }
  }

  // 会话收束：摘手柄监听、恢复选择、复位状态（notify=是否对外通知）
  private _finishDrag(notify: boolean): void {
    if (this._moveFrame !== null) {
      cancelAnimationFrame(this._moveFrame)
      this._moveFrame = null
    }
    if (this._dragging && this._pendingX !== null) {
      // 松手即最终值：刷新 rAF 未落地的末帧
      this._applyX(this._pendingX)
    }
    this._pendingX = null
    const handle = this._handle
    if (handle) {
      handle.removeEventListener('pointermove', this._onPointerMove as EventListener)
      handle.removeEventListener('pointerup', this._onPointerUp as EventListener)
      handle.removeEventListener('pointercancel', this._onPointerUp as EventListener)
      handle.removeEventListener('lostpointercapture', this._onPointerUp as EventListener)
    }
    this._handle = null
    this._dragging = false
    this._pointerId = -1
    this._host.getHostElement().style.removeProperty('user-select')
    if (notify && this._moved) {
      this._host.notifyKeyWidthChange(this._sessionWidth, true)
    }
    this._moved = false
  }

  private _onPointerUp = (e: PointerEvent) => {
    if (!this._dragging || e.pointerId !== this._pointerId) return
    this._finishDrag(true)
  }

  // 双击手柄复位：锁存的唯一出口（ADR-0036）——归还自动测量并通知 width=null；
  // 未锁存时是幂等的无事发生（不通知）
  private _onDblClick = (e: MouseEvent) => {
    const handle = this._handleOf(e)
    if (!handle) return
    e.preventDefault()
    e.stopPropagation()
    if (!this._host.isKeyWidthLatched()) return
    this._host.unlatchKeyWidth()
    this._host.notifyKeyWidthChange(null, false)
  }

  // 重连重挂：firstUpdated 只触发一次，断开重连经此恢复（同元素 renderRoot 存活）
  hostConnected(): void {
    if (this._root) {
      this.attach(this._root)
    }
  }

  // 断开DOM时终止进行中的会话（不通知）并摘除根监听
  hostDisconnected(): void {
    if (this._dragging) this._finishDrag(false)
    if (this._root) {
      this._root.removeEventListener('pointerdown', this._onPointerDown as EventListener)
      this._root.removeEventListener('dblclick', this._onDblClick as EventListener)
    }
  }
}
