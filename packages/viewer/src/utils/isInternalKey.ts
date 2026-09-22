// 判定是否是 AutoStore 内部标记键（如 markRaw 的 __AS_SKIP_PROXY__），不应在树中显示
export function isInternalKey(key: string): boolean {
  return key.startsWith('__AS_')
}
