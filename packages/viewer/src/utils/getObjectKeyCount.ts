import { isInternalKey } from './isInternalKey'

// 获取对象的键数量（排除 AutoStore 内部标记键）
export function getObjectKeyCount(value: any): number {
  if (value === null || value === undefined) return 0
  if (Array.isArray(value)) return value.length
  if (typeof value === 'object') {
    // markRaw对象为原始值，同样返回真实键数量以支持展开
    return Object.keys(value).filter(key => !isInternalKey(key)).length
  }
  return 0
}
