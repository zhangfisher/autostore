import { LitElement, html, nothing } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { iconHtml, iconSprite } from './icons'
import { viewerStyles } from './styles'
import { formatValue } from './utils/formatValue'
import { getNodeIconKey } from './utils/getNodeIconKey'
import { getObjectKeyCount } from './utils/getObjectKeyCount'
import { isInternalKey } from './utils/isInternalKey'
import { Editable } from './editable'
import { joinPath } from './utils/joinPath'
import { deleteNodeValue } from './utils/deleteNodeValue'
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

  // 是否启用行内编辑（默认只读展示）
  @property({ type: Boolean, attribute: 'editable' })
  editable: boolean = false

  // 是否允许删除节点（默认不允许；根节点不可删除）
  @property({ type: Boolean, attribute: 'allow-delete' })
  allowDelete: boolean = false

  // value 对齐方式：left=标签区统一列宽、value 左对齐（默认）；right=value 右对齐
  // reflect 用于 :host([value-align='right']) 样式分支
  @property({ type: String, attribute: 'value-align', reflect: true })
  valueAlign: 'left' | 'right' = 'left'

  // 标签区（key+hint+count）统一列宽上限（px），超出部分截断显示 ...
  @property({ type: Number, attribute: 'max-key-width' })
  maxKeyWidth: number = 240

  // 是否启用 schema 元数据显示（label 替换 key、required 红星、help 提示、choices 标签）
  @property({ type: Boolean, attribute: 'show-schema' })
  showSchema: boolean = false

  // 响应式状态
  @state()
  private _store: AutoStore<any> | null = null

  @state()
  private _treeNodes: TreeNode[] = []

  // 行内编辑器（见 editable.ts）
  private _editable = new Editable(
    { requestUpdate: () => this.requestUpdate() },
    (path) => this._getStateByPath(path),
    () => this._store,
    (node) => this._findNextEditableSibling(node),
    (path) => this._getNodeByPath(path),
  )

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
    // 关闭编辑能力时立即退出编辑状态
    if (changedProperties.has('editable') && !this.editable && this._editable.editingPath) {
      this._editable.cancel()
    }
    // 进入编辑状态时聚焦输入框并全选
    if (this._editable.editingPath) {
      const input = this.renderRoot.querySelector<HTMLInputElement>('.edit-input')
      input?.focus()
      if (input && (input.type === 'text' || input.type === 'number')) input.select()
    }
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
        changedProperties.has('showSchema'))
    ) {
      this._scheduleMeasureLabelWidth()
    }
    // 默认 configManager:true 经异步 import 创建并注册 schema，晚于同步首渲染，
    // 须限时轮询就绪后重渲染（label 替换改变标签区文本，须一并重测列宽）
    if (this.showSchema && this._store && !this._store.configManager && this._cmReadyRetries < 20) {
      this._cmReadyRetries++
      this._cmReadyTimer = setTimeout(() => {
        this._cmReadyTimer = null
        this.requestUpdate()
        if (this._store?.configManager) {
          this._cmReadyRetries = 0
          if (!this._isRightAlign()) this._scheduleMeasureLabelWidth()
        }
      }, 100)
    }
  }

  // 是否处于右对齐模式（非法值一律按 left 处理）
  private _isRightAlign(): boolean {
    return this.valueAlign === 'right'
  }

  // 读取节点路径对应的 schema 元数据（对齐 ConfigManager.add 的 key 拼法：仅显式 options.configKey 参与前缀，不回落 id）
  private _getSchema(node: TreeNode): AutoStoreStateSchema | undefined {
    if (!this.showSchema) return undefined
    const configManager = (this._store as any)?.configManager
    if (!configManager) return undefined
    const configKey = this._store!.options?.configKey
    const fullKey = (configKey ? `${configKey}.` : '') + joinPath(node.path)
    return configManager.state[fullKey] as AutoStoreStateSchema | undefined
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

    // 收集全树节点的标签区组成（与渲染条件保持一致；show-schema 时 label+红星参与宽度）
    const entries: { key: string; required: boolean; hint: string; count: string }[] = []
    const collect = (nodes: TreeNode[]) => {
      for (const node of nodes) {
        const expandable = this._isExpandableType(node.type)
        const schema = this._getSchema(node)
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
    const width = `${Math.min(max, this.maxKeyWidth)}px`
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

  // 判断节点是否可编辑：仅无子节点的原始值类型（容器/computed/function 均不可编辑）
  private _isEditableNode(node: TreeNode): boolean {
    return (
      !this._isExpandableType(node.type) &&
      (node.type === 'string' || node.type === 'number' || node.type === 'boolean' || node.type === 'other')
    )
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

  // 渲染节点
  private _renderNode(node: TreeNode): any {
    const iconKey = getNodeIconKey(node)
    const isExpandable = this._isExpandableType(node.type)
    const isEditing = this._editable.isEditing(node)
    const canEdit = this.editable && this._isEditableNode(node)
    // schema 元数据（show-schema 开启时按路径读取，无则逐节点回落原渲染）
    const schema = this._getSchema(node)
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
    const displayValue = !isExpandable
      ? (typeof choiceLabel === 'object' && choiceLabel !== null && typeof choiceLabel.label === 'string'
          ? choiceLabel.label
          : formatValue(node.value, node.type))
      : nothing

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
          ${isEditing ? this._editable.renderEditor(node) : html`
            <span
              class="node-value"
              @dblclick=${canEdit ? () => this._editable.start(node) : nothing}
            >${displayValue}</span>
          `}
          <span class="node-tools">
            ${isEditing ? html`
              <span class="node-tool" title="取消 (Esc)" @click=${(e: Event) => { e.stopPropagation(); this._editable.cancel() }}>${iconHtml('no')}</span>
              <span class="node-tool" title="确认 (Enter)" @pointerdown=${(e: Event) => { e.stopPropagation(); this._editable.confirm() }}>${iconHtml('yes')}</span>
            ` : html`
              ${canEdit ? html`
                <span class="node-tool" title="编辑" @click=${(e: Event) => { e.stopPropagation(); this._editable.start(node) }}>${iconHtml('edit')}</span>
              ` : nothing}
              ${this.allowDelete && node.path.length > 0 ? html`
                <span class="node-tool" title="删除" @click=${(e: Event) => this._deleteNode(e, node)}>${iconHtml('trash')}</span>
              ` : nothing}
            `}
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
      <!-- 图标 sprite：<symbol> 定义只此一份，节点处的 iconHtml() 通过 <use> 引用 -->
      ${iconSprite}
      <div class="tree-container">
        ${this._treeNodes.map(node => this._renderNode(node))}
      </div>
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