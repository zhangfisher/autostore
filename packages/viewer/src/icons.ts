// 图标常量定义 - 所有图标统一 24x24，使用 currentColor 继承文本颜色
// 注意：必须使用 svg`` 模板标签生成 SVGTemplateResult，
// 普通字符串在 lit 的 html`` 模板中会被当作文本节点渲染（显示源码而非图形）

import { svg, type SVGTemplateResult } from 'lit'

export const ICONS = {
  // 对象图标
  object: svg`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-braces preview-icon"><path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1"/><path d="M16 21h1a2 2 0 0 0 2-2v-5c0-1.1.9-2 2-2a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1"/></svg>`,

  // 数组图标
  array: svg`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-brackets preview-icon"><path d="M16 3h3a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-3"/><path d="M8 21H5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h3"/></svg>`,

  // 字符串图标
  string: svg`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-case-sensitive preview-icon"><path d="m2 16 4.039-9.69a.5.5 0 0 1 .923 0L11 16"/><path d="M22 9v7"/><path d="M3.304 13h6.392"/><circle cx="18.5" cy="12.5" r="3.5"/></svg>`,

  // 数字图标
  number: svg`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-binary preview-icon"><rect x="14" y="14" width="4" height="6" rx="2"/><rect x="6" y="4" width="4" height="6" rx="2"/><path d="M6 20h4"/><path d="M14 10h4"/><path d="M6 14h2v6"/><path d="M14 4h2v6"/></svg>`,

  // 布尔图标
  boolean: svg`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-toggle-right preview-icon"><circle cx="15" cy="12" r="3"/><rect width="20" height="14" x="2" y="5" rx="7"/></svg>`,

  // 其他普通成员图标
  default: svg`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file preview-icon"><path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"/><path d="M14 2v5a1 1 0 0 0 1 1h5"/></svg>`,

  // 计算属性图标 (f× 数学函数符，填充型)
  computed: svg`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 1024 1024" fill="currentColor" class="preview-icon"><path d="M755.2 730.9l102.4-102.4c14.1-14.1 14.1-36.9 0-50.9-14.1-14.1-36.9-14.1-50.9 0L704.3 680 601.9 577.6c-14.1-14.1-36.9-14.1-50.9 0-14.1 14.1-14.1 36.9 0 50.9l102.4 102.4L551 833.3c-14.1 14.1-14.1 36.9 0 50.9 7 7 16.2 10.5 25.5 10.5s18.4-3.5 25.5-10.5l102.4-102.4 102.4 102.4c7 7 16.2 10.5 25.5 10.5s18.4-3.5 25.5-10.5c14.1-14.1 14.1-36.9 0-50.9L755.2 730.9zM638.6 119.3c9.5-21-2.9-45.4-25.4-50.1-31.9-6.6-77.9-9.7-123.9 9.8-35.1 14.9-62 34.3-82.1 59.6-18.2 22.9-27.7 46.9-34 62.8-16.7 42.1-54 208.8-54.4 210.5-0.5 2.3-1.1 5.1-1.8 8.2H166.3c-20.2 0-37.1 16.5-36.7 36.7 0.4 19.6 16.3 35.3 36 35.3h134.6c-34.5 146.2-100 419.4-100.8 422.8-4.6 19.3 7.3 38.8 26.6 43.4 2.8 0.7 5.6 1 8.4 1 16.3 0 31-11.1 35-27.6 3.5-14.6 72.1-300.4 104.8-439.6h153c20.2 0 37.1-16.5 36.7-36.7-0.4-19.6-16.3-35.3-36-35.3H390.8c12.2-54.2 38.7-165.1 49.4-192.2 11.6-29.4 23.7-59.9 77.2-82.5 29.2-12.3 59.9-10 81.2-5.6 16.4 3.4 33.1-5.1 40-20.5z"/></svg>`,

  // 函数图标
  function: svg`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square-function preview-icon"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><path d="M9 17c2 0 2.8-1 2.8-2.8V10c0-2 1-3.3 3.2-3"/><path d="M9 11.2h5.7"/></svg>`,

  // markRaw 图标
  markRaw: svg`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-x-corner preview-icon"><path d="M11 22H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v5"/><path d="M14 2v5a1 1 0 0 0 1 1h5"/><path d="m15 17 5 5"/><path d="m20 17-5 5"/></svg>`,

  // 展开/折叠指示图标 (chevron-right)
  chevron: svg`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right preview-icon"><path d="m9 18 6-6-6-6"/></svg>`,

  // 复制图标
  copy: svg`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copy preview-icon"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`,

  // 否/关闭图标 (x)
  no: svg`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x preview-icon"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`,

  // 是/确认图标 (check)
  yes: svg`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check preview-icon"><path d="M20 6 9 17l-5-5"/></svg>`,

  // 编辑图标 (square-pen)
  edit: svg`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square-pen preview-icon"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"/></svg>`,

  // 删除图标 (trash)
  trash: svg`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash preview-icon"><path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>`,
} as const

export type IconKey = keyof typeof ICONS

// 获取图标的辅助函数
export function getIcon(key: IconKey): SVGTemplateResult {
  return ICONS[key]
}

// 根据值类型获取对应的图标键
export function getIconKeyForValue(value: any, isComputed = false, isMarkRaw = false): IconKey {
  if (isComputed) return 'computed';
  if (isMarkRaw) return 'markRaw';
  if (typeof value === 'function') return 'function';
  if (Array.isArray(value)) return 'array';
  if (value === null) return 'default';
  switch (typeof value) {
    case 'object': return 'object';
    case 'string': return 'string';
    case 'number': return 'number';
    case 'boolean': return 'boolean';
    default: return 'default';
  }
}