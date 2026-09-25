import type { IconKey } from '../features/builtin-icons'
import type { TreeNode } from '../types'

// 根据节点类型获取图标键（考虑computed和markRaw）
export function getNodeIconKey(node: TreeNode): IconKey {
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
