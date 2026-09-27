// 树节点值类型
export type TreeNodeType =
  | 'object'
  | 'array'
  | 'string'
  | 'number'
  | 'boolean'
  | 'function'
  | 'computed'
  | 'markRaw'
  | 'other'

// 树节点类型定义
export interface TreeNode {
  key: string | number
  value: any
  type: TreeNodeType
  expanded: boolean
  childCount: number
  path: string[]
  children: TreeNode[]
}

// 配置面板分组视图（ADR-0034）：一组配置项节点的呈现单元。
// sections 序列 = 默认区（置顶裸排）→ 真实组（order 升序/缺省沉底/注册序）→ 高级虚拟组（置尾）
export interface ConfigSection {
  // 组名（默认区为空串；高级虚拟组为内置标识 __advanced__）
  name: string
  // 标题（默认区为空串 = 不渲染标题条；真实组 title ?? name）
  title: string
  // 组图标（SchemaGroup.icon，走图标链）
  icon?: string
  // 排序权重（真实组参与；默认区恒置顶、高级组恒置尾，不参与排序）
  order?: number
  // 高级虚拟组标记（默认折叠的唯一例外，ADR-0034 决策十七）
  advanced?: boolean
  // 组内项节点（恒注册序；跨 store 空组为空数组——标题条照渲染）
  nodes: TreeNode[]
}
