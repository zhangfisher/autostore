import { isComputed } from 'autostore'
import type { AutoStore } from 'autostore'
import type { TreeNode, TreeNodeType } from '../types'
import { getObjectKeyCount } from '../utils/getObjectKeyCount'
import { isInternalKey } from '../utils/isInternalKey'
import { joinPath } from '../utils/joinPath'
import { splitPath } from '../utils/splitPath'

// 树特性宿主接口（ADR-0031）：树节点承载在宿主（@state 赋值驱动重渲染）
export interface TreeHost {
  requestUpdate(): void
  // 状态树节点（渲染数据源；赋值触发更新，原地变更须显式 requestUpdate）
  getTreeNodes(): TreeNode[]
  setTreeNodes(nodes: TreeNode[]): void
  // entrys 无效提示态写入（invalid 为 @state；paths 为归一化无效清单供 render 显示）
  setEntryInvalid(invalid: boolean, paths: string[]): void
  // 按路径读取 state 值
  getStateByPath(path: string[]): any
  // 获取当前绑定的 store（isComputed 查询）
  getStore(): AutoStore<any> | null
  // 长按编辑触发后的展开 click 抑制（消费即复位；长按特性置位，ADR-0027 修订）
  shouldSuppressClick(): boolean
  // entrys 多入口声明（逗号分割，splitPath 语法）
  readonly entrys: string
  // 初始展开深度（小于该深度的节点默认展开）
  readonly expandDepth: number
  // 是否显示计算属性节点
  readonly showComputed: boolean
}

// 树特性控制器：树构建/增量更新/路径定位/类型检测/entrys 入口吞并与前缀剥离
// （ADR-0029；ADR-0031 自宿主提炼）。无生命周期行为（构建由 store 绑定/属性变更驱动）
export class TreeController {
  private _host: TreeHost

  // entrys 解析缓存（逗号分割后逐项 splitPath，空白段忽略；位于其它入口子树内的
  // 入口被吞并——同路径行不重复渲染；buildTree 时单点刷新，watch 前缀分流/
  // root-group 判定/getNodeByPath 前缀剥离只读此缓存，ADR-0029）
  private _entryPaths: string[][] = []

  constructor(host: TreeHost) {
    this._host = host
  }

  // 入口路径缓存（render 的 root-group 判定读取）
  get entryPaths(): string[][] {
    return this._entryPaths
  }

  // 构建树结构；entrys 非空时构建各入口子树并按声明序平铺（ADR-0029）：
  // 容器 = 隐式根（渲染其子节点、入口行不出现，depth 自 0 重计即 expandDepth 各自重计）；
  // 叶子 = 单行；任一入口路径无效 = 整体提示态。子树节点 path 保持绝对路径
  // （含入口前缀），watch 匹配/schema 查询/isComputed/编辑写回/删除零改动复用
  buildTree(): void {
    if (!this._host.getStore()) {
      this._host.setTreeNodes([])
      return
    }
    // 单点解析刷新缓存（entrys 属性变更与首次绑定均经此收敛）：
    // 逗号分割、空白段忽略；位于其它入口子树内（或相等）的入口被吞并，
    // 防同路径行重复渲染（两份同 data-path 会让 updateTreeNode/removeTreeNode
    // 只更新首个匹配而残留陈旧副本）
    const paths = this._host.entrys
      ? this._host.entrys.split(',').map((s) => s.trim()).filter(Boolean).map((s) => splitPath(s))
      : []
    this._entryPaths = paths.filter((ep, i) =>
      !paths.some((other, j) => j !== i && other.length <= ep.length && other.every((p, k) => p === ep[k]))
    )
    if (this._entryPaths.length > 0) {
      const invalid: string[] = []
      const nodes: TreeNode[] = []
      for (const entryPath of this._entryPaths) {
        const value = this._host.getStateByPath(entryPath)
        if (value === undefined) {
          invalid.push(joinPath(entryPath))
          continue
        }
        const type = this.detectType(value, entryPath)
        if (this.isExpandableType(type)) {
          nodes.push(...this._buildNodes(value, entryPath, 0))
        } else {
          // 叶子（含 null）：渲染单行，key = 路径末段，schema 照常按绝对路径生效
          nodes.push({
            key: entryPath[entryPath.length - 1],
            value,
            type,
            expanded: false,
            childCount: 0,
            path: entryPath,
            children: [],
          })
        }
      }
      // 任一无效即整体提示态：不回落全树、不部分渲染（掩盖配置错误，ADR-0029 决策三）
      if (invalid.length > 0) {
        this._host.setTreeNodes([])
        this._host.setEntryInvalid(true, invalid)
        console.warn(`[autostore-viewer] entrys 路径不存在: ${invalid.join(', ')}`)
        return
      }
      this._host.setEntryInvalid(false, [])
      this._host.setTreeNodes(nodes)
      return
    }
    this._host.setEntryInvalid(false, [])
    this._host.setTreeNodes(this._buildNodes(this._host.getStore()!.state, [], 0))
  }

  // 树节点值自 store 回填（结构与展开态不动）——edit 常驻期间叶子 set 被冻结
  // （watch 跳过防光标重置），切离 edit 时统一收敛；不重建树以保留用户展开状态
  syncTreeValues(nodes: TreeNode[]): void {
    for (const node of nodes) {
      const value = this._host.getStateByPath(node.path)
      if (value !== undefined) node.value = value
      if (node.children.length > 0) this.syncTreeValues(node.children)
    }
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
        const type = this.detectType(value, path)
        if (!this._host.showComputed && type === 'computed') continue
        const isObject = this.isExpandableType(type)
        const expanded = depth < this._host.expandDepth

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
        const type = this.detectType(value, path)
        if (!this._host.showComputed && type === 'computed') continue
        const isObject = this.isExpandableType(type)
        const expanded = depth < this._host.expandDepth

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
  isExpandableType(type: TreeNodeType): boolean {
    return type === 'object' || type === 'array' || type === 'markRaw'
  }

  // 判断节点是否可编辑：所有容器（对象/数组/markRaw）均以 JSON 整体编辑；
  // 叶子中 computed/function 无编辑语义不可编辑，其余原始值类型可编辑
  isEditableNode(node: TreeNode): boolean {
    if (this.isExpandableType(node.type)) return true
    return node.type === 'string' || node.type === 'number' || node.type === 'boolean' || node.type === 'other'
  }

  // 按路径在树中查找节点；入口隐式根下树内节点不含入口段（顶层从各入口子级起），
  // 命中某入口前缀则剥离后下钻——否则委托编辑/click-edit/watch 冻结判定在子树内
  // 均落空（ADR-0029）。path 恰为入口路径时空段查找返回 null（入口行本身不渲染）
  getNodeByPath(path: string[]): TreeNode | null {
    let segments = path
    if (this._entryPaths.length > 0) {
      for (const ep of this._entryPaths) {
        if (path.length >= ep.length && ep.every((p, i) => p === path[i])) {
          segments = path.slice(ep.length)
          break
        }
      }
    }
    let nodes = this._host.getTreeNodes()
    let found: TreeNode | null = null
    for (const p of segments) {
      found = nodes.find((n) => String(n.key) === p) ?? null
      if (!found) return null
      nodes = found.children
    }
    return found
  }

  // 查找同级中当前节点之后的第一个可编辑节点（末尾返回 null）
  findNextEditableSibling(node: TreeNode): TreeNode | null {
    let siblings = this._host.getTreeNodes()
    if (node.path.length > 0) {
      const parent = this.getNodeByPath(node.path.slice(0, -1))
      if (!parent) return null
      siblings = parent.children
    }
    const idx = siblings.indexOf(node)
    for (let i = idx + 1; i < siblings.length; i++) {
      if (this.isEditableNode(siblings[i])) return siblings[i]
    }
    return null
  }

  // 检测值类型（考虑store的原始值）
  private detectType(value: any, path?: string[]): TreeNodeType {
    // 计算属性判定优先：state[key] 经 Proxy 拦截返回的是计算结果，
    // 无法从值识别，须按路径查询（core 公开 API）
    const store = this._host.getStore()
    if (path && store && isComputed(store, path)) return 'computed'

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
  updateTreeNode(path: string[], value: any): void {
    const findAndUpdate = (nodes: TreeNode[]): boolean => {
      for (const node of nodes) {
        // 检查路径是否匹配
        if (node.path.length === path.length &&
            node.path.every((p, i) => p === path[i])) {
          // 找到节点，更新值
          const type = this.detectType(value, path)
          const expandable = this.isExpandableType(type)
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

    findAndUpdate(this._host.getTreeNodes())
  }

  // 从树中移除指定路径的节点
  removeTreeNode(path: string[]): void {
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
    removeFrom(this._host.getTreeNodes())
  }

  // 切换展开/折叠；长按进入编辑后的松手 click 被抑制（展开态不被翻转，ADR-0027 修订）
  toggleExpand(node: TreeNode): void {
    if (this._host.shouldSuppressClick()) return
    node.expanded = !node.expanded
    this._host.requestUpdate()
  }

  // 全局最后可见行：沿末项的展开链下钻（折叠或叶子即止），
  // 供 grid=1 水平线仅末行无线判定（ADR-0028 决策二修订）
  findLastVisible(nodes: TreeNode[]): TreeNode {
    const last = nodes[nodes.length - 1]
    if (this.isExpandableType(last.type) && last.expanded && last.children.length > 0) {
      return this.findLastVisible(last.children)
    }
    return last
  }

  // operate.path 等于任一入口路径或为其祖先（⪯ 某入口）：入口容器自身的
  // set/delete/整体替换，语义上须重建入口子树（ADR-0029）
  isEntryAncestorOrSelf(path: string[]): boolean {
    return this._entryPaths.some(
      (ep) => path.length <= ep.length && path.every((p, i) => p === ep[i]),
    )
  }

  // path 严格位于任一入口子树内（长于该入口且为前缀延续）
  isPathWithinEntry(path: string[]): boolean {
    return this._entryPaths.some(
      (ep) => path.length > ep.length && ep.every((p, i) => p === path[i]),
    )
  }
}
