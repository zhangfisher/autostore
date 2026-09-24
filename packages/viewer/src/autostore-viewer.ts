import { LitElement, html, nothing } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { BUILTIN_ICON_KEYS, iconHtml, iconSprite } from './icons'
import { IconsRegistry } from './icons-registry'
import type { ParsedIcon } from './icons-registry'
import type { WidgetRenderContext } from './widgets/types'
import { viewerStyles } from './styles'
import { formatValue } from './utils/formatValue'
import { getNodeIconKey } from './utils/getNodeIconKey'
import { getObjectKeyCount } from './utils/getObjectKeyCount'
import { isInternalKey } from './utils/isInternalKey'
import { Editable } from './editable'
import { toRenderable } from './utils/toRenderable'
import { getWidgetModule } from './widgets/registry'
import { resolveEditorPlan } from './edit-plan'
import { joinPath } from './utils/joinPath'
import { deleteNodeValue } from './utils/deleteNodeValue'
import { splitPath } from './utils/splitPath'
import { computeValueError, convertValue } from './utils/value-io'
import { resolvePair } from './edit-plan'
import { inputModule } from './widgets/input'
import { isComputed } from 'autostore'
import type { TreeNode, TreeNodeType } from './types'
import type { AutoStore, AutoStoreStateSchema } from 'autostore'

@customElement('autostore-viewer')
export class AutostoreViewer extends LitElement {
  // 属性声明
  @property({ type: String, attribute: 'store-id' })
  storeId: string = ''

  // 初始展开深度（小于该深度的节点默认展开，0 表示全部折叠）
  @property({ type: Number, attribute: 'expand-depth' })
  expandDepth: number = 3

  // 是否显示子节点数量徽章
  @property({ type: Boolean, attribute: 'show-count' })
  showCount: boolean = true

  // 是否显示折叠占位符 {...} / [...]
  @property({ type: Boolean, attribute: 'show-hint' })
  showHint: boolean = true

  // 是否显示计算属性节点（默认不显示）
  @property({ type: Boolean, attribute: 'show-computed' })
  showComputed: boolean = false

  // 编辑模式（ADR-0027）：
  // view：只读；edit：叶子成员常驻编辑控件（值写回走根事件委托），容器保持双击 JSON 编辑；
  // click-edit：双击值/点击编辑按钮进入编辑（默认 view）
  @property({ type: String, attribute: 'mode' })
  mode: 'view' | 'edit' | 'click-edit' = 'view'

  // 是否允许删除节点（默认不允许；根节点不可删除）
  @property({ type: Boolean, attribute: 'allow-delete' })
  allowDelete: boolean = false

  // value 对齐方式：left=标签区统一列宽、value 左对齐（默认）；right=value 右对齐
  // reflect 用于 :host([value-align='right']) 样式分支
  @property({ type: String, attribute: 'value-align', reflect: true })
  valueAlign: 'left' | 'right' = 'left'

  // 标签区（key+hint+count）统一列宽上限（px），超出部分截断显示 ...
  @property({ type: Number, attribute: 'max-key-width' })
  maxKeyWidth: number = 300

  // 是否禁用 schema 元数据显示（label 替换 key、required 红星、help 提示、choices 标签）
  // schema 默认生效；禁用仅关闭显示，编辑（widget 决策/校验/整体编辑判定）与 schema.icon 仍读取 schema
  @property({ type: Boolean, attribute: 'disable-schema' })
  disableSchema: boolean = false

  // 动态图标批量拉取 URL 模板：{names} 占位符替换为逗号分隔的图标名；
  // 置空禁用拉取（未知名恒回落类型图标）；变更仅影响后续新批次
  @property({ type: String, attribute: 'icon-url' })
  iconUrl: string = 'https://api.iconify.design/material-symbols-light.json?icons={names}'

  // 远程拉取的风格后缀（rounded/sharp/outline/outline-rounded/outline-sharp）：
  // 仅追加到远程请求名（home → home-outline），schema.icon 引用名不变；空 = 不处理
  @property({ type: String, attribute: 'icon-modify' })
  iconModify: string = ''

  // 动态图标注册表：命中链 slot 自定义 > 内置 > icon-url 拉取（ADR-0024）
  private _registry = new IconsRegistry(
    () => this.iconUrl || null,
    (icons) => {
      // 拉取命中：构造真实 SVG 命名空间的 symbol 入队注入
      for (const icon of icons) this._queueDynamicSymbol(icon.name, this._buildSymbol(icon))
      this.requestUpdate()
    },
    () => this.iconModify,
  )

  // 动态 symbol 注入队列（name → 元素）：updated 时统一 append 到动态 sprite 容器。
  // 不用 unsafeSVG——lit 的 html/unsafeSVG 以 HTML 命名空间解析字符串，
  // symbol 必须经 createElementNS 构造为 SVG 命名空间元素 <use> 才能引用
  private _dynamicQueue = new Map<string, SVGSymbolElement>()

  // SVG 命名空间（createElementNS 构造 symbol 必需）
  private static SVG_NS = 'http://www.w3.org/2000/svg'

  // 由解析数据构造 <symbol id="asv-{name}" viewBox="0 0 {w} {h}">{body}</symbol>
  private _buildSymbol(icon: ParsedIcon): SVGSymbolElement {
    const symbol = document.createElementNS(AutostoreViewer.SVG_NS, 'symbol') as SVGSymbolElement
    symbol.setAttribute('id', `asv-${icon.name}`)
    symbol.setAttribute('viewBox', `0 0 ${icon.width} ${icon.height}`)
    symbol.innerHTML = icon.body
    return symbol
  }

  // 由 slot 提取的 symbol 重建为 SVG 命名空间元素：
  // template content 经 HTML 解析器创建的 <symbol> 是 HTML 命名空间元素，
  // cloneNode 不改变命名空间，append 后 <use> 无法引用；
  // 以属性复制 + innerHTML 经 SVG 上下文重建（与拉取构造同机制，ADR-0024）
  private _rebuildSymbol(name: string, source: SVGSymbolElement): SVGSymbolElement {
    const symbol = document.createElementNS(AutostoreViewer.SVG_NS, 'symbol') as SVGSymbolElement
    for (const attr of Array.from(source.attributes)) {
      if (attr.name !== 'id') symbol.setAttribute(attr.name, attr.value)
    }
    symbol.setAttribute('id', `asv-${name}`)
    symbol.innerHTML = source.innerHTML
    return symbol
  }

  // slot 自定义图标：深拷贝入队（template content 中的元素不可直接持有）
  private _queueDynamicSymbol(name: string, symbol: SVGSymbolElement) {
    this._dynamicQueue.set(name, symbol)
  }

  // 注入队列：append 到动态 sprite 容器（容器置于内置 sprite 之前，
  // 同 id 时 <use> 按文档序命中前者，实现"自定义覆盖内置"；
  // 同名重新注入先移除旧节点，防同 id 重复累积）
  private _flushDynamicSymbols() {
    if (this._dynamicQueue.size === 0) return
    const container = this.renderRoot.querySelector('.dynamic-sprite')
    if (!container) return
    for (const [name, symbol] of this._dynamicQueue) {
      container.querySelector(`symbol[id="asv-${name}"]`)?.remove()
      container.appendChild(symbol)
      this._dynamicQueue.delete(name)
    }
  }

  // 响应式状态
  @state()
  private _store: AutoStore<any> | null = null

  @state()
  private _treeNodes: TreeNode[] = []

  // 行内编辑器（见 editable.ts，即时生效模式）
  private _editable = new Editable(
    { requestUpdate: () => this.requestUpdate() },
    (path) => this._getStateByPath(path),
    () => this._store,
    (node) => this._findNextEditableSibling(node),
    (path) => this._getNodeByPath(path),
    (path) => this._getSchemaByPath(path),
    // 编辑期间该节点树更新被冻结（watch 回调跳过），退出/链式切换时经此回填
    (path) => {
      this._updateTreeNode(path, this._getStateByPath(path))
      this._scheduleMeasureLabelWidth()
    },
  )

  // 已聚焦的编辑路径（仅路径变化时聚焦/全选，错误条等重渲染不得抢焦点）
  private _focusedEditPath: string | null = null

  // edit 常驻模式的 per-path 校验错误（非响应式，变更处手动 requestUpdate）
  private _inlineErrors = new Map<string, string>()

  // edit 常驻模式的根事件委托（控件不绑 per-node 监听，写回/键盘统一在此处理，ADR-0027）
  private _onDelegatedInput = (e: Event) => {
    if (this.mode !== 'edit') return
    const target = e.target as HTMLElement
    const row = target instanceof Element ? target.closest('.tree-node') as HTMLElement | null : null
    const pathAttr = row?.dataset.path
    if (!pathAttr) return
    const node = this._getNodeByPath(splitPath(pathAttr))
    // 仅常驻编辑的叶子；容器 JSON 编辑与 click-edit 由 Editable 状态机处理
    if (!node || this._isExpandableType(node.type) || !this._isEditableNode(node)) return
    const schema = this._getSchemaByPath(node.path) as Record<string, any> | undefined
    const plan = resolveEditorPlan(node, schema ?? {}, '')
    const raw = this._extractControlValue(e.target as HTMLInputElement, plan, schema)
    if (raw === undefined) return
    const error = computeValueError({ raw, schema, plan, valueType: node.type, oldValue: node.value, path: node.path })
    const key = joinPath(node.path)
    if (error !== null) {
      if (this._inlineErrors.get(key) !== error) {
        this._inlineErrors.set(key, error)
        this.requestUpdate()
      }
      return
    }
    if (this._inlineErrors.has(key)) {
      this._inlineErrors.delete(key)
      this.requestUpdate()
    }
    const parent = this._getStateByPath(node.path.slice(0, -1))
    if (parent) parent[node.path[node.path.length - 1]] = convertValue(raw, node.type, plan)
  }

  // edit 常驻：Enter = 焦点转移到树序下一个可编辑控件（textarea 的 Enter 为换行）
  private _onDelegatedKeydown = (e: KeyboardEvent) => {
    if (this.mode !== 'edit') return
    if (e.isComposing || e.keyCode === 229) return
    if (e.key !== 'Enter') return
    const target = e.target as HTMLElement
    if (target.tagName === 'TEXTAREA' || !target.classList.contains('edit-input')) return
    const controls = Array.from(
      this.renderRoot.querySelectorAll<HTMLInputElement>('.tree-node .edit-editor .edit-input:not(:disabled)'),
    )
    const next = controls[controls.indexOf(target) + 1]
    if (next) {
      next.focus()
      if (next.type === 'text' || next.type === 'number') next.select()
    }
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

  // toast 文案与淡隐态（2s 自动淡隐，见 _showToast）
  @state()
  private _toastText: string | null = null

  @state()
  private _toastFading: boolean = false

  // toast 定时句柄（重复触发与新组件断开时清理）
  private _toastTimers: any[] = []

  // 用于保存store watcher
  private _storeWatcher: any = null

  // 用于保存observer事件订阅（异步计算完成通知）
  private _observerWatcher: any = null

  // store-id 绑定重试（store 可能晚于组件挂载创建）
  private _bindRetryCount = 0
  private _bindRetryTimer: any = null

  // configManager 就绪轮询（默认 configManager:true 走异步 import 创建，晚于同步首渲染）
  private _cmReadyTimer: any = null
  private _cmReadyRetries = 0

  // 标签区统一列宽当前值（脏检查缓存，值未变不写样式避免无效失效）
  private _labelWidth: string = 'auto'

  // 标签区列宽测量帧句柄（rAF 合并多次更新）
  private _measureHandle: number | null = null

  // 宿主不可见（如隐藏 tab 面板）时测量不可信的延时重试句柄与计数
  private _measureRetryTimer: any = null
  private _measureRetryCount = 0

  // 宿主尺寸监听（隐藏容器如 tab 面板内测量无效，变可见后须重测）
  private _resizeObserver: ResizeObserver | null = null

  // CSS样式（提取自 styles.ts）
  static styles = viewerStyles;

  // edit 常驻模式的根事件委托监听（控件不绑 per-node 监听）
  firstUpdated() {
    this.renderRoot.addEventListener('input', this._onDelegatedInput)
    this.renderRoot.addEventListener('change', this._onDelegatedInput)
    this.renderRoot.addEventListener('keydown', this._onDelegatedKeydown)
  }

  constructor() {
    super()
    // 内置图标为注册链"已存在"基线：slot 同名覆盖、拉取跳过（ADR-0024）
    this._registry.markRegistered(BUILTIN_ICON_KEYS)
  }

  // 连接到DOM时
  connectedCallback() {
    super.connectedCallback()
    this._tryBindStore()
    // tab 面板等容器以 display:none 隐藏时探针无布局盒（测量全 0 不可信），
    // ResizeObserver 在隐藏期 contentRect 为 0 天然过滤，变可见（尺寸非 0）后触发重测；
    // 回调发生在 layout 之后，同步测量即可取到有效布局，rAF 再兜底一次
    this._resizeObserver = new ResizeObserver((entries) => {
      if (entries.some((entry) => entry.contentRect.width > 0 || entry.contentRect.height > 0)) {
        this._measureLabelWidth()
        this._scheduleMeasureLabelWidth()
      }
    })
    this._resizeObserver.observe(this)
  }

  // 断开DOM时
  disconnectedCallback() {
    super.disconnectedCallback()
    this._unbindStore()
    if (this._bindRetryTimer) {
      clearTimeout(this._bindRetryTimer)
      this._bindRetryTimer = null
    }
    if (this._measureHandle !== null) {
      cancelAnimationFrame(this._measureHandle)
      this._measureHandle = null
    }
    if (this._cmReadyTimer) {
      clearTimeout(this._cmReadyTimer)
      this._cmReadyTimer = null
    }
    if (this._measureRetryTimer) {
      clearTimeout(this._measureRetryTimer)
      this._measureRetryTimer = null
    }
    this._measureRetryCount = 0
    this._resizeObserver?.disconnect()
    this._resizeObserver = null
    this._bindRetryCount = 0
    this._cmReadyRetries = 0
    this._clearToastTimers()
    this.renderRoot?.removeEventListener('input', this._onDelegatedInput)
    this.renderRoot?.removeEventListener('change', this._onDelegatedInput)
    this.renderRoot?.removeEventListener('keydown', this._onDelegatedKeydown)
  }

  // 属性变更回调
  updated(changedProperties: Map<string, any>) {
    if (changedProperties.has('storeId')) {
      this._tryBindStore()
    }
    // 影响树结构的属性须重建（showCount/showHint 仅影响渲染，无需重建）
    if ((changedProperties.has('expandDepth') || changedProperties.has('showComputed')) && this._store) {
      this._buildTree()
    }
    // 切离 edit 模式时清常驻错误；切离全部编辑模式时退出 click-edit 编辑状态
    if (changedProperties.has('mode')) {
      if (this._inlineErrors.size > 0) this._inlineErrors.clear()
      if (this.mode === 'view' && this._editable.editingPath) this._editable.exit()
    }
    // 进入编辑状态时聚焦输入框并全选（仅路径变化时执行：
    // 校验错误条渲染等重渲染不得抢焦点，也不得触发全选导致输入内容被整体替换）
    if (this._editable.editingPath) {
      const pathKey = joinPath(this._editable.editingPath)
      if (this._focusedEditPath !== pathKey) {
        this._focusedEditPath = pathKey
        const input = this.renderRoot.querySelector<HTMLInputElement>('.edit-input')
        input?.focus()
        if (input && (input.type === 'text' || input.type === 'number')) input.select()
      }
    } else {
      this._focusedEditPath = null
    }
    // 动态图标注入：动态 sprite 容器随渲染就绪后统一 append（slotchange/拉取命中入队）
    this._flushDynamicSymbols()
    // left 模式下重算标签区列宽：仅树结构/相关属性变化时触发。
    // 测量基于全量树数据（含折叠子树）与展开态解耦，展开/折叠不重算，避免列宽跳动
    if (
      !this._isRightAlign() &&
      this._store &&
      (changedProperties.has('_treeNodes') ||
        changedProperties.has('showCount') ||
        changedProperties.has('showHint') ||
        changedProperties.has('valueAlign') ||
        changedProperties.has('maxKeyWidth') ||
        changedProperties.has('disableSchema'))
    ) {
      this._scheduleMeasureLabelWidth()
    }
    // 默认 configManager:true 经异步 import 创建并注册 schema，晚于同步首渲染，
    // 须限时轮询就绪后处理：label 替换经重渲染生效（render 期读取）；
    // 折叠/整体编辑判定在 build 期读取 schema，须重建树；列宽一并重测
    if (
      (!this.disableSchema || this.mode !== 'view') &&
      this._store &&
      !this._store.configManager &&
      this._cmReadyRetries < 20
    ) {
      this._cmReadyRetries++
      this._cmReadyTimer = setTimeout(() => {
        this._cmReadyTimer = null
        this.requestUpdate()
        if (this._store?.configManager) {
          this._cmReadyRetries = 0
          this._buildTree()
          if (!this._isRightAlign()) this._scheduleMeasureLabelWidth()
        }
      }, 100)
    }
  }

  // 是否处于右对齐模式（非法值一律按 left 处理）
  private _isRightAlign(): boolean {
    return this.valueAlign === 'right'
  }

  // 按路径读取 schema 元数据（对齐 ConfigManager.add 的 key 拼法：仅显式 options.configKey 参与前缀，不回落 id）
  // 独立于 disable-schema 显示开关：编辑（widget 决策/校验）与整体编辑判定始终读取
  private _getSchemaByPath(path: string[]): AutoStoreStateSchema | undefined {
    const configManager = (this._store as any)?.configManager
    if (!configManager) return undefined
    const configKey = this._store!.options?.configKey
    const fullKey = (configKey ? `${configKey}.` : '') + joinPath(path)
    return configManager.state[fullKey] as AutoStoreStateSchema | undefined
  }

  // 读取节点对应的 schema 元数据（展示用途须由调用方以 disableSchema 门控）
  private _getSchema(node: TreeNode): AutoStoreStateSchema | undefined {
    return this._getSchemaByPath(node.path)
  }

  // 调度标签区列宽测量（rAF 合并同一帧内的多次更新）
  private _scheduleMeasureLabelWidth() {
    if (this._measureHandle !== null) return
    this._measureHandle = requestAnimationFrame(() => {
      this._measureHandle = null
      this._measureLabelWidth()
    })
  }

  // 计算标签区（key+hint+count）统一列宽：基于全量树数据（含折叠子树）而非可见 DOM，
  // 与展开态解耦以保证列宽稳定不跳动。文本宽度用离屏探针（复用真实样式类）批量测量，
  // 一次写入、一次批量读取，避免逐节点强制回流
  private _measureLabelWidth() {
    if (this._isRightAlign() || !this._store) return
    const probe = this.renderRoot.querySelector<HTMLElement>('.measure-probe')
    if (!probe) return

    // 收集全树节点的标签区组成（与渲染条件保持一致；未禁用 schema 显示时 label+红星参与宽度）
    const entries: { key: string; required: boolean; hint: string; count: string }[] = []
    const collect = (nodes: TreeNode[]) => {
      for (const node of nodes) {
        const expandable = this._isExpandableType(node.type)
        // 展示词汇（label/required）在未禁用 schema 显示时参与列宽
        const schema = !this.disableSchema ? this._getSchema(node) : undefined
        entries.push({
          key: schema?.label ?? String(node.key),
          required: schema?.required === true,
          hint: this.showHint && expandable ? (node.type === 'array' ? '[...]' : '{...}') : '',
          count: this.showCount && node.childCount > 0 ? String(node.childCount) : '',
        })
        if (node.children.length > 0) collect(node.children)
      }
    }
    collect(this._treeNodes)

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
        this.style.setProperty('--viewer-key-width', 'auto')
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
    let max = 0
    for (const entry of entries) {
      let width = 0
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
          this._measureLabelWidth()
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
    const width = `${Math.min(max+16, this.maxKeyWidth)}px`
    if (width !== this._labelWidth) {
      this._labelWidth = width
      this.style.setProperty('--viewer-key-width', width)
    }
  }

  // 尝试绑定store
  private _tryBindStore() {
    // 清理之前的watcher
    this._unbindStore()

    // 如果有store属性，直接使用
    if (this._store) {
      this._buildTree()
      this._watchStore()
      return
    }

    // 如果有store-id属性，从全局注册表查找
    if (this.storeId) {
      const instances = (globalThis as any).__AUTOSTORE_INSTANCES__
      if (Array.isArray(instances)) {
        for (const weakRef of instances) {
          const store = weakRef.deref?.()
          if (store && store.options?.id === this.storeId) {
            this._store = store
            this._buildTree()
            this._watchStore()
            return
          }
        }
      }
      // store 可能晚于组件挂载创建，延迟重试若干次
      if (this._bindRetryCount < 10) {
        this._bindRetryCount++
        if (this._bindRetryTimer) clearTimeout(this._bindRetryTimer)
        this._bindRetryTimer = setTimeout(() => {
          this._bindRetryTimer = null
          this._tryBindStore()
        }, 500)
        return
      }
      console.warn(`autostore-viewer: Store with id "${this.storeId}" not found`)
    }
  }

  // 绑定store属性
  set store(value: AutoStore<any> | null) {
    const oldValue = this._store
    this._store = value
    if (value !== oldValue) {
      this._unbindStore()
      if (value) {
        this._buildTree()
        this._watchStore()
      }
      this.requestUpdate()
    }
  }

  // 获取store属性
  get store(): AutoStore<any> | null {
    return this._store
  }

  // 监听store变化
  private _watchStore() {
    if (!this._store) return

    // 移除之前的watcher
    this._unbindStore()

    // 监听所有状态变化
    this._storeWatcher = this._store.watch('*', (operate: any) => {
      // 即时生效：编辑节点的自写入操作已反映在控件中，跳过树重建以免重置输入光标；
      // 退出/链式切换时经 _syncNode 回填（编辑期间该节点的外部更新也在退出时一并收敛）
      const editing = this._editable.editingPath
      if (
        editing &&
        Array.isArray(operate?.path) &&
        operate.path.length === editing.length &&
        operate.path.every((p: any, i: number) => p === editing[i])
      ) {
        return
      }
      // edit 常驻：叶子值类写入同样冻结树更新（控件即真相），防委托写回重置光标；
      // 结构类 operate（insert/remove/delete）照常处理
      if (this.mode === 'edit' && operate?.type === 'set' && Array.isArray(operate.path)) {
        const node = this._getNodeByPath(operate.path)
        if (node && !this._isExpandableType(node.type) && this._isEditableNode(node)) return
      }
      if (operate.type === 'delete') {
        // 删除操作：从树中移除对应节点
        this._removeTreeNode(operate.path)
      } else if (operate.type === 'insert' || operate.type === 'remove') {
        // 数组聚合操作：value 是被插入/删除的元素而非剩余数组，
        // 须从 state 读取真实值重建该容器子树
        this._updateTreeNode(operate.path, this._getStateByPath(operate.path))
      } else {
        // 重新构建受影响的节点
        this._updateTreeNode(operate.path, operate.value)
      }
      // 树结构原地变更（不换 _treeNodes 引用），须显式调度列宽重算
      this._scheduleMeasureLabelWidth()
      this.requestUpdate()
    })

    // 异步计算结果经 peep 静默回写，watch('*') 收不到通知，须订阅 observer 完成事件
    this._observerWatcher = (this._store as any).on?.('observer/*/done', (args: any) => {
      const observer = args?.observer ?? args
      if (observer?.path) {
        this._updateTreeNode(observer.path, observer.value)
        this._scheduleMeasureLabelWidth()
        this.requestUpdate()
      }
    })
  }

  // 解绑store watcher
  private _unbindStore() {
    if (this._storeWatcher) {
      this._storeWatcher.off?.()
      this._storeWatcher = null
    }
    if (this._observerWatcher) {
      this._observerWatcher.off?.()
      this._observerWatcher = null
    }
  }

  // 构建树结构
  private _buildTree() {
    if (!this._store) {
      this._treeNodes = []
      return
    }

    const state = this._store.state
    this._treeNodes = this._buildNodes(state, [], 0)
  }

  // 递归构建节点
  private _buildNodes(state: any, parentPath: string[], depth: number): TreeNode[] {
    if (state === null || state === undefined) return []

    const nodes: TreeNode[] = []

    // 检查是否是数组
    if (Array.isArray(state)) {
      for (let i = 0; i < state.length; i++) {
        const value = state[i]
        const path = [...parentPath, String(i)]
        const type = this._detectType(value, path)
        if (!this.showComputed && type === 'computed') continue
        const isObject = this._isExpandableType(type)
        const expanded = depth < this.expandDepth

        const node: TreeNode = {
          key: i,
          value,
          type,
          expanded,
          childCount: isObject ? getObjectKeyCount(value) : 0,
          path,
          children: isObject ? this._buildNodes(value, path, depth + 1) : [],
        }
        nodes.push(node)
      }
      return nodes
    }

    // 检查是否是普通对象（含markRaw对象，其内部为原始值可正常遍历）
    if (typeof state === 'object') {
      // 过滤 AutoStore 内部标记键（如 markRaw 的 __AS_SKIP_PROXY__）
      const keys = Object.keys(state).filter(key => !isInternalKey(key))
      for (const key of keys) {
        const value = state[key]
        const path = [...parentPath, key]
        const type = this._detectType(value, path)
        if (!this.showComputed && type === 'computed') continue
        const isObject = this._isExpandableType(type)
        const expanded = depth < this.expandDepth

        const node: TreeNode = {
          key,
          value,
          type,
          expanded,
          childCount: isObject ? getObjectKeyCount(value) : 0,
          path,
          children: isObject ? this._buildNodes(value, path, depth + 1) : [],
        }
        nodes.push(node)
      }
    }

    return nodes
  }

  // 可展开的节点类型（对象/数组/markRaw对象）
  private _isExpandableType(type: TreeNodeType): boolean {
    return type === 'object' || type === 'array' || type === 'markRaw'
  }

  // 判断节点是否可编辑：所有容器（对象/数组/markRaw）均以 JSON 整体编辑；
  // 叶子中 computed/function 无编辑语义不可编辑，其余原始值类型可编辑
  private _isEditableNode(node: TreeNode): boolean {
    if (this._isExpandableType(node.type)) return true
    return node.type === 'string' || node.type === 'number' || node.type === 'boolean' || node.type === 'other'
  }

  // 按路径在树中查找节点
  private _getNodeByPath(path: string[]): TreeNode | null {
    let nodes = this._treeNodes
    let found: TreeNode | null = null
    for (const p of path) {
      found = nodes.find((n) => String(n.key) === p) ?? null
      if (!found) return null
      nodes = found.children
    }
    return found
  }

  // 查找同级中当前节点之后的第一个可编辑节点（末尾返回 null）
  private _findNextEditableSibling(node: TreeNode): TreeNode | null {
    let siblings = this._treeNodes
    if (node.path.length > 0) {
      const parent = this._getNodeByPath(node.path.slice(0, -1))
      if (!parent) return null
      siblings = parent.children
    }
    const idx = siblings.indexOf(node)
    for (let i = idx + 1; i < siblings.length; i++) {
      if (this._isEditableNode(siblings[i])) return siblings[i]
    }
    return null
  }

  // 检测值类型（考虑store的原始值）
  private _detectType(value: any, path?: string[]): TreeNodeType {
    // 计算属性判定优先：state[key] 经 Proxy 拦截返回的是计算结果，
    // 无法从值识别，须按路径查询（core 公开 API）
    if (path && this._store && isComputed(this._store, path)) return 'computed'

    if (value === null || value === undefined) return 'other'
    if (Array.isArray(value)) return 'array'

    if (typeof value === 'function') {
      // 检查是否是计算属性描述符构建函数
      if (value['__OBSERVER_TYPE__']) return 'computed'
      return 'function'
    }

    if (typeof value === 'object') {
      // 检查是否是markRaw对象
      if (value['__AS_SKIP_PROXY__']) return 'markRaw'
      return 'object'
    }

    if (typeof value === 'string') return 'string'
    if (typeof value === 'number') return 'number'
    if (typeof value === 'boolean') return 'boolean'

    return 'other'
  }

  // 更新树节点
  private _updateTreeNode(path: string[], value: any) {
    const findAndUpdate = (nodes: TreeNode[]): boolean => {
      for (const node of nodes) {
        // 检查路径是否匹配
        if (node.path.length === path.length &&
            node.path.every((p, i) => p === path[i])) {
          // 找到节点，更新值
          const type = this._detectType(value, path)
          const expandable = this._isExpandableType(type)
          node.value = value
          node.type = type
          node.childCount = expandable ? getObjectKeyCount(value) : 0
          if (expandable) {
            node.children = this._buildNodes(value, path, 0)
          }
          return true
        }
        // 递归查找子节点
        if (node.children.length > 0 && findAndUpdate(node.children)) {
          return true
        }
      }
      return false
    }

    findAndUpdate(this._treeNodes)
  }

  // 切换展开/折叠
  private _toggleExpand(node: TreeNode) {
    node.expanded = !node.expanded
    this.requestUpdate()
  }

  // 提取 slot 自定义图标：template[slot=icons] 的 content 中与直接子元素中的 <symbol>；
  // slotchange 动态触发，重新提取沿用同名覆盖策略（后注册者生效）
  private _onSlotChange(e: Event) {
    const slot = e.currentTarget as HTMLSlotElement
    const symbols: SVGSymbolElement[] = []
    for (const node of slot.assignedNodes()) {
      if (node instanceof HTMLTemplateElement) {
        symbols.push(...node.content.querySelectorAll('symbol'))
      } else if (node instanceof Element) {
        if (node.tagName.toLowerCase() === 'symbol') symbols.push(node as SVGSymbolElement)
        else symbols.push(...node.querySelectorAll('symbol'))
      }
    }
    const names: string[] = []
    for (const symbol of symbols) {
      // id 规范化：asv- 前缀可带可不带（引用名一律不含前缀）
      let name = symbol.id || ''
      if (name.startsWith('asv-')) name = name.slice(4)
      if (!name) continue
      // 重建为 SVG 命名空间元素（HTML 命名空间的 symbol 无法被 <use> 引用）
      this._queueDynamicSymbol(name, this._rebuildSymbol(name, symbol))
      names.push(name)
    }
    this._registry.markRegistered(names)
    this.requestUpdate()
  }

  // 按路径读取 state 值
  private _getStateByPath(path: string[]): any {
    let obj: any = this._store?.state
    for (const p of path) obj = obj?.[p]
    return obj
  }

  // 删除节点对应的键
  private _deleteNode(e: Event, node: TreeNode) {
    e.stopPropagation()
    const parent = this._getStateByPath(node.path.slice(0, -1))
    if (parent) deleteNodeValue(parent, node.path[node.path.length - 1])
  }

  // toast：组件右上方显示，2s 后自动淡隐（0.3s 过渡后移除）
  private _showToast(text: string) {
    this._clearToastTimers()
    this._toastText = text
    this._toastFading = false
    this._toastTimers = [
      setTimeout(() => {
        this._toastFading = true
      }, 1500),
      setTimeout(() => {
        this._toastText = null
        this._toastFading = false
      }, 1600),
    ]
  }

  private _clearToastTimers() {
    this._toastTimers.forEach(clearTimeout)
    this._toastTimers = []
  }

  // 复制节点值：容器序列化为 JSON（缩进 2），原始值转字符串
  private async _copyNode(node: TreeNode) {
    let text: string
    try {
      const value = node.value
      text = value !== null && typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value ?? '')
      await this._writeClipboard(text)
      this._showToast('copied!')
    } catch {
      this._showToast('copy failed')
    }
  }

  // 剪贴板写入：优先异步 Clipboard API，非安全上下文回落 execCommand
  private _writeClipboard(text: string): Promise<void> {
    if (navigator.clipboard?.writeText) return navigator.clipboard.writeText(text)
    return new Promise<void>((resolve, reject) => {
      const textarea = document.createElement('textarea')
      textarea.value = text
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'
      document.body.appendChild(textarea)
      textarea.select()
      try {
        document.execCommand('copy') ? resolve() : reject(new Error('copy failed'))
      } catch (e) {
        reject(e as Error)
      } finally {
        textarea.remove()
      }
    })
  }

  // 从树中移除指定路径的节点
  private _removeTreeNode(path: string[]) {
    const isSamePath = (nodePath: string[]) =>
      nodePath.length === path.length && nodePath.every((p, i) => p === path[i])
    const removeFrom = (nodes: TreeNode[]): boolean => {
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i]
        if (isSamePath(node.path)) {
          nodes.splice(i, 1)
          return true
        }
        // 仅沿祖先链递归查找
        if (node.path.length < path.length && node.path.every((p, i) => p === path[i])) {
          if (removeFrom(node.children)) {
            node.childCount = Math.max(0, node.childCount - 1)
            return true
          }
        }
      }
      return false
    }
    removeFrom(this._treeNodes)
  }

  // 节点是否处于编辑呈现：click-edit=状态机判定；edit=叶子常驻、容器以状态机判定（双击 JSON）
  private _isNodeEditing(node: TreeNode): boolean {
    if (this.mode === 'edit') {
      if (this._isExpandableType(node.type)) return this._editable.isEditing(node)
      return this._isEditableNode(node)
    }
    return this._editable.isEditing(node)
  }

  // 非编辑态 node-value 渲染：toView > widget 模块 toView > choices label > formatValue
  // toView 属展示词汇，受 disable-schema 门控；抛错回落默认渲染（ADR-0025/0026）
  private _renderNodeValue(node: TreeNode, schema: AutoStoreStateSchema | undefined, choiceLabel: any): any {
    if (schema && typeof schema.toView === 'function') {
      try {
        return toRenderable(schema.toView(node.value))
      } catch (e) {
        console.warn('[autostore-viewer] toView 执行失败，回落默认渲染', e)
      }
    }
    const module = getWidgetModule(schema?.widget)
    if (module?.toView) {
      try {
        const view = module.toView(this._buildViewContext(node, schema))
        if (view) return view
      } catch (e) {
        console.warn('[autostore-viewer] widget toView 执行失败，回落默认渲染', e)
      }
    }
    if (choiceLabel && typeof choiceLabel.label === 'string') return choiceLabel.label
    return formatValue(node.value, node.type)
  }

  // 查看态渲染上下文（plan 现场解析；无编辑控制面）
  private _buildViewContext(node: TreeNode, schema: AutoStoreStateSchema | undefined): WidgetRenderContext {
    const raw = (schema ?? {}) as Record<string, any>
    return {
      value: node.value,
      schema: raw,
      plan: resolveEditorPlan(node, raw, ''),
      node,
      setValue: () => {},
      onKeydown: () => {},
    }
  }

  // 编辑态渲染：edit 常驻叶子走 widget toRender（写回走根委托，ADR-0027）；
  // 其余（click-edit 全部 / edit 容器双击）走 Editable 状态机；
  // schema.toRender 优先（自定义控件自理写回）；抛错回落默认渲染
  private _renderEditingValue(node: TreeNode, schema: AutoStoreStateSchema | undefined): any {
    const error = this.mode === 'edit' ? (this._inlineErrors.get(joinPath(node.path)) ?? null) : null
    if (schema && typeof schema.toRender === 'function') {
      try {
        return this._editorShell(node, toRenderable(schema.toRender(node.value)), error)
      } catch (e) {
        console.warn('[autostore-viewer] toRender 执行失败，回落默认编辑器', e)
      }
    }
    if (this.mode === 'edit' && !this._isExpandableType(node.type)) {
      const raw = (schema ?? {}) as Record<string, any>
      const plan = resolveEditorPlan(node, raw, '')
      // 常驻控件的回调为 no-op：写回/键盘经根事件委托统一处理
      const ctx: WidgetRenderContext = {
        value: node.value,
        schema: raw,
        plan,
        node,
        setValue: () => {},
        onKeydown: () => {},
      }
      const module = getWidgetModule(raw.widget)
      const content = module?.toRender?.(ctx) ?? inputModule.toRender!(ctx)
      return this._editorShell(node, content, error)
    }
    return this._editable.renderEditor(node)
  }

  // 编辑器外壳：edit 常驻模式 blur 不退出（不绑 focusout）；其余失焦退出（Q4a）
  private _editorShell(node: TreeNode, content: any, error: string | null): any {
    const errorPart = error ? html`<div class="edit-error">${error}</div>` : nothing
    if (this.mode === 'edit') {
      return html`<div class="edit-editor">${content}${errorPart}</div>`
    }
    return html`<div
      class="edit-editor"
      @focusout=${(e: FocusEvent) => {
        const container = e.currentTarget as HTMLElement
        if (container.contains(e.relatedTarget as Node)) return
        this._editable.onBlur(node)
      }}
    >${content}${errorPart}</div>`
  }

  // 渲染节点
  private _renderNode(node: TreeNode): any {
    const isExpandable = this._isExpandableType(node.type)
    const isEditing = this._isNodeEditing(node)
    const canEdit = this.mode !== 'view' && this._isEditableNode(node)
    // schema 展示词汇（label/required/help/choices 标签）在未禁用 schema 显示时生效；
    // 编辑态与 schema.icon 的读取始终生效（图标为节点身份，不受 disable-schema 门控）
    const rawSchema = this._getSchema(node)
    const schema = !this.disableSchema ? rawSchema : undefined
    // schema.icon 命中链：slot 自定义 > 内置 > icon-url 拉取（ADR-0024）；
    // 未加载/负缓存回落类型图标，缺失时攒批拉取，注册完成后经 onLoaded 重渲染替换
    const schemaIcon = typeof rawSchema?.icon === 'string' && rawSchema.icon !== '' ? rawSchema.icon : undefined
    let iconKey = getNodeIconKey(node)
    if (schemaIcon) {
      if (this._registry.has(schemaIcon)) iconKey = schemaIcon
      else this._registry.request([schemaIcon])
    }
    // label 完全替换 key 显示
    const displayKey = schema?.label ?? node.key
    const required = schema?.required === true
    // help 仅 string 生效，挂整行 title
    const help = typeof schema?.help === 'string' ? schema.help : undefined
    // choices 严格相等匹配后显示层替换为匹配项 label（匹配不到/无 label 回落原值；编辑态显示原值）
    const choices = Array.isArray(schema?.choices) ? schema!.choices : undefined
    const choiceLabel = choices?.find((c) => {
      const item = typeof c === 'object' && c !== null ? c : { value: c }
      return item.value === node.value
    })
    const displayValue = !isExpandable ? this._renderNodeValue(node, schema, choiceLabel) : nothing

    return html`
      <div
        class="tree-node ${isEditing ? 'editing' : ''}"
        data-path=${joinPath(node.path)}
        title=${help ?? nothing}
        @click=${() => this._toggleExpand(node)}
      >
        <div class="node-content">
          ${isExpandable ? html`
            <span class="expand-icon ${node.expanded ? 'expanded' : ''}">
              ${iconHtml('chevron')}
            </span>
          ` : html`
            <span class="expand-icon" style="visibility: hidden;">
              ${iconHtml('chevron')}
            </span>
          `}
          <span class="type-icon">${iconHtml(iconKey)}</span>
          <span class="node-label">
            <span class="node-key">${displayKey}</span>
            ${required ? html`<span class="required-mark">*</span>` : nothing}
            ${this.showHint && isExpandable && !node.expanded && !isEditing ? html`
              <span class="collapsed-hint">${node.type === 'array' ? '[...]' : '{...}'}</span>
            ` : nothing}
            ${this.showCount && node.childCount > 0 && !isEditing ? html`
              <span class="child-count">${node.childCount}</span>
            ` : nothing}
          </span>
          ${isEditing ? this._renderEditingValue(node, schema) : html`
            <span
              class="node-value"
              @dblclick=${canEdit ? () => this._editable.start(node) : nothing}
            >${displayValue}</span>
          `}
          <span class="node-tools">
            ${!isEditing ? html`
              <span class="node-tool" title="复制" @click=${(e: Event) => { e.stopPropagation(); this._copyNode(node) }}>${iconHtml('copy')}</span>
              ${canEdit && this.mode === 'click-edit' ? html`
                <span class="node-tool" title="编辑" @click=${(e: Event) => { e.stopPropagation(); this._editable.start(node) }}>${iconHtml('edit')}</span>
              ` : nothing}
              ${this.allowDelete && node.path.length > 0 ? html`
                <span class="node-tool" title="删除" @click=${(e: Event) => this._deleteNode(e, node)}>${iconHtml('trash')}</span>
              ` : nothing}
            ` : nothing}
          </span>
        </div>
      </div>
      ${isExpandable && node.expanded && node.children.length > 0 ? html`
        <div class="node-children expanded">
          ${node.children.map(child => this._renderNode(child))}
        </div>
      ` : nothing}
    `
  }

  // 主渲染
  render(): any {
    if (!this._store) {
      return html`<div class="loading">未绑定 Store</div>`
    }

    return html`
      <!-- 动态图标 sprite：置于内置 sprite 之前，同 id 时 <use> 按文档序命中前者（自定义覆盖内置，ADR-0024） -->
      <svg class="dynamic-sprite" xmlns="http://www.w3.org/2000/svg" width="0" height="0" style="position:absolute" aria-hidden="true"></svg>
      <!-- 内置图标 sprite：<symbol> 定义只此一份，节点处的 iconHtml() 通过 <use> 引用 -->
      ${iconSprite}
      <slot name="icons" @slotchange=${this._onSlotChange} style="display: none;"></slot>
      <div class="tree-container">
        ${this._treeNodes.map(node => this._renderNode(node))}
      </div>
      ${this._toastText ? html`
        <div class="toast ${this._toastFading ? 'fading' : ''}">${this._toastText}</div>
      ` : nothing}
      <!-- 离屏宽度探针：复用真实样式类测量文本自然宽，见 _measureLabelWidth -->
      <div class="measure-probe" aria-hidden="true"></div>
    `
  }
}

// 类型声明
declare global {
  interface HTMLElementTagNameMap {
    'autostore-viewer': AutostoreViewer
  }
}