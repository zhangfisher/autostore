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
