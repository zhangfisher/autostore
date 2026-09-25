import { joinPath } from './joinPath'

// 编辑控件原生 name 解析（click-edit 与 edit 常驻两链共用）：
// schema.name 非空字符串优先，否则用完整 store 路径——与行 data-path 同源
// （数组下标/entrys 入口前缀/点号转义一致）；不受 disable-schema 门控（编辑链路旁路，同 icon 待遇）
export function resolveControlName(schema: Record<string, any> | undefined, path: string[]): string {
  if (typeof schema?.name === 'string' && schema.name !== '') return schema.name
  return joinPath(path)
}
