import type { ReactiveController } from 'lit'
import type { AutoStore, AutoStoreStateSchema } from 'autostore'
import type { TreeNode, TreeNodeType } from '../types'

// 列宽测量宿主接口（ADR-0031 特性控制器形态）
export interface LabelWidthHost {
  requestUpdate(): void
  // value 对齐方式：right 模式不测量
  readonly valueAlign: 'left' | 'right'
  // hint（折叠占位符）是否参与标签区
  readonly showHint: boolean
  // count（子节点数量徽章）是否参与标签区
  readonly showCount: boolean
  // 标签区统一列宽上限（px）
  readonly maxKeyWidth: number
  // 是否禁用 schema 元数据显示（禁用时 label/红星不参与宽度）
  readonly disableSchema: boolean
  // 当前绑定的 store（无 store 不测量）
  getStore(): AutoStore<any> | null
  // 状态树节点（测量基于全量树数据，含折叠子树）
  getTreeNodes(): TreeNode[]
  // 节点对应 schema 元数据
  getSchema(node: TreeNode): AutoStoreStateSchema | undefined
  // 可展开类型判定（hint 组成条件）
  isExpandableType(type: TreeNodeType): boolean
  // 离屏宽度探针元素（renderRoot 提供）
  getMeasureProbe(): HTMLElement | null
  // 宿主元素（--viewer-indent-size 计算样式读取 + ResizeObserver 观察目标）
  getHostElement(): HTMLElement
  // 列宽写回（宿主级 CSS 变量 --viewer-key-width）
  setKeyWidth(width: string): void
}

// 列宽测量特性控制器：标签区（key+hint+count）统一列宽测量（ADR-0031 自宿主提炼）。
// 探针批量测宽、rAF 合并、隐藏容器延时重试、ResizeObserver 变可见重测
export class LabelWidthController implements ReactiveController {
  private _host: LabelWidthHost

  // 标签区统一列宽当前值（脏检查缓存，值未变不写样式避免无效失效）
  private _labelWidth: string = 'auto'

  // 标签区列宽测量帧句柄（rAF 合并多次更新）
  private _measureHandle: number | null = null

  // 宿主不可见（如隐藏 tab 面板）时测量不可信的延时重试句柄与计数
  private _measureRetryTimer: any = null
  private _measureRetryCount = 0

  // 宿主尺寸监听（隐藏容器如 tab 面板内测量无效，变可见后须重测）
  private _resizeObserver: ResizeObserver | null = null

  constructor(host: LabelWidthHost) {
    this._host = host
  }

  // 连接到DOM时挂宿主尺寸监听：
  // tab 面板等容器以 display:none 隐藏时探针无布局盒（测量全 0 不可信），
  // ResizeObserver 在隐藏期 contentRect 为 0 天然过滤，变可见（尺寸非 0）后触发重测；
  // 回调发生在 layout 之后，同步测量即可取到有效布局，rAF 再兜底一次
  hostConnected(): void {
    this._resizeObserver = new ResizeObserver((entries) => {
      if (entries.some((entry) => entry.contentRect.width > 0 || entry.contentRect.height > 0)) {
        this.measure()
        this.scheduleMeasure()
      }
    })
    this._resizeObserver.observe(this._host.getHostElement())
  }

  // 断开DOM时清理帧句柄/重试计时/尺寸监听
  hostDisconnected(): void {
    if (this._measureHandle !== null) {
      cancelAnimationFrame(this._measureHandle)
      this._measureHandle = null
    }
    if (this._measureRetryTimer) {
      clearTimeout(this._measureRetryTimer)
      this._measureRetryTimer = null
    }
    this._measureRetryCount = 0
    this._resizeObserver?.disconnect()
    this._resizeObserver = null
  }

  // left 模式下重算标签区列宽：仅树结构/相关属性变化时触发（门控在宿主 updated() 编排——
  // 本版本 ReactiveController.hostUpdated 不携带 changedProperties，ADR-0031）。
  // 测量基于全量树数据（含折叠子树）与展开态解耦，展开/折叠不重算，避免列宽跳动

  // 是否处于右对齐模式（非法值一律按 left 处理）
  private _isRightAlign(): boolean {
    return this._host.valueAlign === 'right'
  }

  // 调度标签区列宽测量（rAF 合并同一帧内的多次更新）
  scheduleMeasure(): void {
    if (this._measureHandle !== null) return
    this._measureHandle = requestAnimationFrame(() => {
      this._measureHandle = null
      this.measure()
    })
  }

  // 计算标签区（key+hint+count）统一列宽（value 全局对齐）：列宽 = max(行「缩进+标签」
  // 总宽)，深层行标签宽经 .node-label 的补偿声明减去 depth×步进，使「缩进+标签」恒定、
  // value/edit 控件起点全局一致。基于全量树数据（含折叠子树）而非可见 DOM，
  // 与展开态解耦以保证列宽稳定不跳动。文本宽度用离屏探针（复用真实样式类）批量测量，
  // 一次写入、一次批量读取，避免逐节点强制回流
  measure(): void {
    if (this._isRightAlign() || !this._host.getStore()) return
    const probe = this._host.getMeasureProbe()
    if (!probe) return

    // 收集全树节点的标签区组成（与渲染条件保持一致；未禁用 schema 显示时 label+红星参与宽度）；
    // 携带深度：value 全局对齐下标签宽 = 全局列宽 − depth×步进（.node-label 的补偿声明），
    // 列宽需求按「缩进 + 标签」总宽计，保证最深的行也不截断
    const entries: { key: string; required: boolean; hint: string; count: string; depth: number }[] = []
    const collect = (nodes: TreeNode[], depth: number) => {
      for (const node of nodes) {
        const expandable = this._host.isExpandableType(node.type)
        // 展示词汇（label/required）在未禁用 schema 显示时参与列宽
        const schema = !this._host.disableSchema ? this._host.getSchema(node) : undefined
        entries.push({
          key: schema?.label ?? String(node.key),
          required: schema?.required === true,
          hint: this._host.showHint && expandable ? (node.type === 'array' ? '[...]' : '{...}') : '',
          count: this._host.showCount && node.childCount > 0 ? String(node.childCount) : '',
          depth,
        })
        if (node.children.length > 0) collect(node.children, depth + 1)
      }
    }
    collect(this._host.getTreeNodes(), 0)

    // 唯一（类别, 文本）建探针 span，一次 fragment 写入后批量读宽
    const kindClass = { key: 'node-key', required: 'required-mark', hint: 'collapsed-hint', count: 'child-count' } as const
    const spans = new Map<string, HTMLElement>()
    const frag = document.createDocumentFragment()
    const ensureSpan = (kind: keyof typeof kindClass, text: string) => {
      const cacheKey = `${kind}:${text}`
      let el = spans.get(cacheKey)
      if (!el) {
        el = document.createElement('span')
        el.className = kindClass[kind]
        el.textContent = text
        frag.appendChild(el)
        spans.set(cacheKey, el)
      }
      return el
    }
    for (const entry of entries) {
      if (entry.key) ensureSpan('key', entry.key)
      if (entry.required) ensureSpan('required', '*')
      if (entry.hint) ensureSpan('hint', entry.hint)
      if (entry.count) ensureSpan('count', entry.count)
    }

    if (entries.length === 0) {
      // 空树回落 auto
      if (this._labelWidth !== 'auto') {
        this._labelWidth = 'auto'
        this._host.setKeyWidth('auto')
      }
      return
    }

    probe.appendChild(frag)
    // 布局盒标记须在读取宽度时同步跟踪（探针清空后元素脱离文档，offsetWidth 恒为 0）
    let anyLayout = false
    const widthOf = (el: HTMLElement) => {
      if (el.offsetWidth > 0) anyLayout = true
      const cs = getComputedStyle(el)
      return el.offsetWidth + parseFloat(cs.marginLeft) + parseFloat(cs.marginRight)
    }
    const widthCache = new Map<string, number>()
    const cachedWidth = (kind: keyof typeof kindClass, text: string) => {
      const cacheKey = `${kind}:${text}`
      let w = widthCache.get(cacheKey)
      if (w === undefined) {
        w = widthOf(spans.get(cacheKey)!)
        widthCache.set(cacheKey, w)
      }
      return w
    }
    // 缩进步进与 .node-content 的 padding-left 公式同源（--viewer-indent-size 可被宿主覆盖，
    // 读取失败回落内置默认 20px）；深度补偿计入每行需求（缩进+标签总宽）
    const indentStep = (parseFloat(getComputedStyle(this._host.getHostElement()).getPropertyValue('--viewer-indent-size')) || 20) - 8
    let max = 0
    for (const entry of entries) {
      let width = entry.depth * indentStep
      if (entry.key) width += cachedWidth('key', entry.key)
      if (entry.required) width += cachedWidth('required', '*')
      if (entry.hint) width += cachedWidth('hint', entry.hint)
      if (entry.count) width += cachedWidth('count', entry.count)
      if (width > max) max = width
    }
    probe.textContent = ''
    // 探针无一有布局盒：宿主处于 display:none 容器（如隐藏 tab 面板）中，
    // offsetWidth 虽全为 0 但 margin 仍会累加出非零 max，须按布局盒判定不可信，
    // 跳过写入以免列宽被压没；延时轮询重试直至可见（ResizeObserver 之外的环境无关兜底）
    if (!anyLayout) {
      if (this._measureRetryTimer === null && this._measureRetryCount < 150) {
        this._measureRetryCount++
        this._measureRetryTimer = setTimeout(() => {
          this._measureRetryTimer = null
          this.measure()
        }, 200)
      }
      return
    }
    // 测得有效布局，停止重试
    if (this._measureRetryTimer) {
      clearTimeout(this._measureRetryTimer)
      this._measureRetryTimer = null
    }
    this._measureRetryCount = 0

    // 超限由 maxKeyWidth 钳制（超出行的 key 截断显示 ...）
    const width = `${Math.min(max+16, this._host.maxKeyWidth)}px`
    if (width !== this._labelWidth) {
      this._labelWidth = width
      this._host.setKeyWidth(width)
    }
  }
}
