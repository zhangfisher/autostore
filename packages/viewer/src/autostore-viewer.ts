import { LitElement, css, html, nothing } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { ICONS, type IconKey } from './icons'
import type { AutoStore } from 'autostore'

// 树节点类型定义
interface TreeNode {
  key: string | number
  value: any
  type: 'object' | 'array' | 'string' | 'number' | 'boolean' | 'function' | 'computed' | 'markRaw' | 'other'
  expanded: boolean
  childCount: number
  path: string[]
  children: TreeNode[]
}

// 根据值类型获取图标键（考虑computed和markRaw）
function getNodeIconKey(node: TreeNode): IconKey {
  if (node.type === 'computed') return 'computed'
  if (node.type === 'markRaw') return 'markRaw'
  if (node.type === 'function') return 'function'
  if (node.type === 'array') return 'array'
  if (node.type === 'object') return 'object'
  if (node.type === 'string') return 'string'
  if (node.type === 'number') return 'number'
  if (node.type === 'boolean') return 'boolean'
  return 'default'
}

// 获取对象的键数量
function getObjectKeyCount(value: any): number {
  if (value === null || value === undefined) return 0
  if (Array.isArray(value)) return value.length
  if (typeof value === 'object') {
    // 检查是否是markRaw对象
    if (value['__AS_SKIP_PROXY__']) return 0
    return Object.keys(value).length
  }
  return 0
}

// 格式化值显示
function formatValue(value: any, type: TreeNode['type']): string {
  if (value === null) return 'null'
  if (value === undefined) return 'undefined'
  switch (type) {
    case 'string': return `"${value}"`
    case 'number': return String(value)
    case 'boolean': return value ? 'true' : 'false'
    case 'function': return 'ƒ()'
    case 'computed': return 'ƒ()'
    case 'markRaw': return '{...}'
    case 'object': return '{...}'
    case 'array': return `[${value.length}]`
    default: return String(value)
  }
}

@customElement('autostore-viewer')
export class AutostoreViewer extends LitElement {
  // 属性声明
  @property({ type: String, attribute: 'store-id' })
  storeId: string = ''

  // 响应式状态
  @state()
  private _store: AutoStore<any> | null = null

  @state()
  private _treeNodes: TreeNode[] = []

  // 用于保存store watcher
  private _storeWatcher: any = null

  // 初始展开深度
  private _initialExpandDepth = 3

  // CSS样式
  static styles = css`
    :host {
      --viewer-icon-size: 16px;
      --viewer-font-size: 1em;
      --viewer-bg: #ffffff;
      --viewer-text: #333333;
      --viewer-border: #e5e7eb;
      --viewer-hover-bg: #f3f4f6;
      --viewer-badge-bg: #e5e7eb;
      --viewer-badge-text: #6b7280;
      --viewer-indent-size: 20px;

      display: block;
      font-family: system-ui, -apple-system, sans-serif;
      font-size: var(--viewer-font-size);
      color: var(--viewer-text);
      background: var(--viewer-bg);
      border: 1px solid var(--viewer-border);
      border-radius: 8px;
      overflow: hidden;
    }

    @media (prefers-color-scheme: dark) {
      :host {
        --viewer-bg: #1f2937;
        --viewer-text: #f9fafb;
        --viewer-border: #374151;
        --viewer-hover-bg: #374151;
        --viewer-badge-bg: #4b5563;
        --viewer-badge-text: #d1d5db;
      }
    }

    .tree-node {
      display: flex;
      align-items: center;
      padding: 4px 8px;
      cursor: pointer;
      user-select: none;
      transition: background-color 0.15s ease;
      min-height: 32px;
    }

    .tree-node:hover {
      background: var(--viewer-hover-bg);
    }

    .node-content {
      display: flex;
      align-items: center;
      flex: 1;
      min-width: 0;
    }

    .expand-icon {
      width: var(--viewer-icon-size);
      height: var(--viewer-icon-size);
      flex-shrink: 0;
      transition: transform 0.2s ease;
      margin-right: 4px;
    }

    .expand-icon.expanded {
      transform: rotate(90deg);
    }

    .type-icon {
      width: var(--viewer-icon-size);
      height: var(--viewer-icon-size);
      flex-shrink: 0;
      margin-right: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .type-icon svg {
      width: 100%;
      height: 100%;
    }

    .node-key {
      font-weight: 500;
      margin-right: 6px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .child-count {
      background: var(--viewer-badge-bg);
      color: var(--viewer-badge-text);
      font-size: 0.75em;
      padding: 1px 6px;
      border-radius: 10px;
      margin-right: 6px;
      white-space: nowrap;
      font-weight: 500;
    }

    .node-value {
      color: #6b7280;
      font-family: ui-monospace, monospace;
      font-size: 0.9em;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      flex-shrink: 1;
    }

    @media (prefers-color-scheme: dark) {
      .node-value {
        color: #9ca3af;
      }
    }

    .node-children {
      overflow: hidden;
      transition: max-height 0.2s ease-out;
    }

    .node-children.collapsed {
      max-height: 0 !important;
    }

    .node-children.expanded {
      max-height: none;
    }

    .node-children .tree-node {
      padding-left: 20px;
    }

    .loading {
      padding: 16px;
      text-align: center;
      color: var(--viewer-badge-text);
    }

    @media (prefers-reduced-motion: reduce) {
      .expand-icon {
        transition: none;
      }
      .node-children {
        transition: none;
      }
    }
  `;

  // 连接到DOM时
  connectedCallback() {
    super.connectedCallback()
    this._tryBindStore()
  }

  // 断开DOM时
  disconnectedCallback() {
    super.disconnectedCallback()
    this._unbindStore()
  }

  // 属性变更回调
  updated(changedProperties: Map<string, any>) {
    if (changedProperties.has('storeId')) {
      this._tryBindStore()
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
      // 重新构建受影响的节点
      this._updateTreeNode(operate.path, operate.value)
      this.requestUpdate()
    })
  }

  // 解绑store watcher
  private _unbindStore() {
    if (this._storeWatcher) {
      this._storeWatcher.off?.()
      this._storeWatcher = null
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

    // 检查是否是markRaw对象（需要特殊处理）
    const isMarkRawObj = state['__AS_SKIP_PROXY__'] === true

    if (isMarkRawObj) {
      // markRaw对象不展开子节点
      return []
    }

    const nodes: TreeNode[] = []

    // 检查是否是数组
    if (Array.isArray(state)) {
      for (let i = 0; i < state.length; i++) {
        const value = state[i]
        const path = [...parentPath, String(i)]
        const type = this._detectType(value)
        const isObject = type === 'object' || type === 'array'
        const expanded = depth < this._initialExpandDepth

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

    // 检查是否是普通对象
    if (typeof state === 'object') {
      const keys = Object.keys(state)
      for (const key of keys) {
        const value = state[key]
        const path = [...parentPath, key]
        const type = this._detectType(value)
        const isObject = type === 'object' || type === 'array'
        const expanded = depth < this._initialExpandDepth

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

  // 检测值类型（考虑store的原始值）
  private _detectType(value: any): TreeNode['type'] {
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
          const type = this._detectType(value)
          node.value = value
          node.type = type
          node.childCount = (type === 'object' || type === 'array') ? getObjectKeyCount(value) : 0
          if (type === 'object' || type === 'array') {
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

  // 渲染节点
  private _renderNode(node: TreeNode): any {
    const iconKey = getNodeIconKey(node)
    const iconHtml = ICONS[iconKey]
    const chevronHtml = ICONS.chevron
    const isExpandable = node.type === 'object' || node.type === 'array'

    return html`
      <div class="tree-node" @click=${() => this._toggleExpand(node)}>
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
          ${node.childCount > 0 ? html`
            <span class="child-count">${node.childCount}</span>
          ` : nothing}
          ${!isExpandable ? html`
            <span class="node-value">${formatValue(node.value, node.type)}</span>
          ` : nothing}
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