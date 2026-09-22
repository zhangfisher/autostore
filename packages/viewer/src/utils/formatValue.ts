import type { TreeNodeType } from '../types'

// 格式化值显示
export function formatValue(value: any, type: TreeNodeType): string {
  if (value === null) return 'null'
  if (value === undefined) return 'undefined'
  switch (type) {
    case 'string': return `"${value}"`
    case 'number': return String(value)
    case 'boolean': return value ? 'true' : 'false'
    case 'function': return 'ƒ()'
    // 计算属性显示计算结果值
    case 'computed': {
      if (value === null || value === undefined) return String(value)
      if (Array.isArray(value)) return `[${value.length}]`
      if (typeof value === 'object') return '{...}'
      if (typeof value === 'string') return `"${value}"`
      return String(value)
    }
    case 'markRaw': return '{...}'
    case 'object': return '{...}'
    case 'array': return `[${value.length}]`
    default: return String(value)
  }
}
