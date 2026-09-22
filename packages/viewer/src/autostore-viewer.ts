import { LitElement, html, nothing } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { ICONS } from './icons'
import { viewerStyles } from './styles'
import { formatValue } from './utils/formatValue'
import { getNodeIconKey } from './utils/getNodeIconKey'
import { getObjectKeyCount } from './utils/getObjectKeyCount'
import { isInternalKey } from './utils/isInternalKey'
import { Editable } from './editable'
import { isComputed } from 'autostore'
import type { TreeNode, TreeNodeType } from './types'
import type { AutoStore } from 'autostore'

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
  )

  // 用于保存store watcher
  private _storeWatcher: any = null

  // 用于保存observer事件订阅（异步计算完成通知）
  private _observerWatcher: any = null

  // store-id 绑定重试（store 可能晚于组件挂载创建）
  private _bindRetryCount = 0
  private _bindRetryTimer: any = null

  // CSS样式（提取自 styles.ts）
  static styles = viewerStyles;

  // 连接到DOM时
  connectedCallback() {
    super.connectedCallback()
    this._tryBindStore()
  }

  // 断开DOM时
  disconnectedCallback() {
    super.disconnectedCallback()
    this._unbindStore()
    if (this._bindRetryTimer) {
      clearTimeout(this._bindRetryTimer)
      this._bindRetryTimer = null
    }
    this._bindRetryCount = 0
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
    // 进入编辑状态时聚焦输入框并全选
    if (this._editable.editingPath) {
      const input = this.renderRoot.querySelector<HTMLInputElement>('.edit-input')
      input?.focus()
      if (input && (input.type === 'text' || input.type === 'number')) input.select()
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
      } else {
        // 重新构建受影响的节点
        this._updateTreeNode(operate.path, operate.value)
      }
      this.requestUpdate()
    })

    // 异步计算结果经 peep 静默回写，watch('*') 收不到通知，须订阅 observer 完成事件
    this._observerWatcher = (this._store as any).on?.('observer/*/done', (args: any) => {
      const observer = args?.observer ?? args
      if (observer?.path) {
        this._updateTreeNode(observer.path, observer.value)
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
    const key = node.path[node.path.length - 1]
    if (parent) delete parent[key]
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
    const iconHtml = ICONS[iconKey]
    const chevronHtml = ICONS.chevron
    const isExpandable = this._isExpandableType(node.type)
    const isEditing = this._editable.isEditing(node)

    return html`
      <div class="tree-node ${isEditing ? 'editing' : ''}" @click=${() => this._toggleExpand(node)}>
        <div class="node-content">
          ${isExpandable ? html`
            <span class="expand-icon ${node.expanded ? 'expanded' : ''}">
              ${chevronHtml}
            </span>
          ` : html`
            <span class="expand-icon" style="visibility: hidden;">
              ${chevronHtml}
            </span>
          `}
          <span class="type-icon">${iconHtml}</span>
          <span class="node-key">${node.key}</span>
          ${this.showHint && isExpandable && !node.expanded && !isEditing ? html`
            <span class="collapsed-hint">${node.type === 'array' ? '[...]' : '{...}'}</span>
          ` : nothing}
          ${this.showCount && node.childCount > 0 && !isEditing ? html`
            <span class="child-count">${node.childCount}</span>
          ` : nothing}
          ${isEditing ? this._editable.renderEditor(node) : html`
            <span class="node-value">${!isExpandable ? formatValue(node.value, node.type) : nothing}</span>
          `}
          <span class="node-tools">
            ${isEditing ? html`
              <span class="node-tool" title="取消 (Esc)" @click=${(e: Event) => { e.stopPropagation(); this._editable.cancel() }}>${ICONS.no}</span>
              <span class="node-tool" title="确认 (Enter)" @click=${(e: Event) => { e.stopPropagation(); this._editable.confirm(node) }}>${ICONS.yes}</span>
            ` : html`
              <span class="node-tool" title="编辑" @click=${(e: Event) => { e.stopPropagation(); this._editable.start(node) }}>${ICONS.edit}</span>
              <span class="node-tool" title="删除" @click=${(e: Event) => this._deleteNode(e, node)}>${ICONS.trash}</span>
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
      <div class="tree-container">
        ${this._treeNodes.map(node => this._renderNode(node))}
      </div>
    `
  }
}

// 类型声明
declare global {
  interface HTMLElementTagNameMap {
    'autostore-viewer': AutostoreViewer
  }
}