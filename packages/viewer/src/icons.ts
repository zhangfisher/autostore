// 图标常量定义 - 所有图标统一 24x24，使用 currentColor 继承文本颜色

export const ICONS = {
  // 对象图标
  object: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-braces preview-icon"><path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1"/><path d="M16 21h1a2 2 0 0 0 2-2v-5c0-1.1.9-2 2-2a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1"/></svg>`,

  // 数组图标
  array: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-brackets preview-icon"><path d="M16 3h3a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-3"/><path d="M8 21H5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h3"/></svg>`,

  // 字符串图标
  string: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-case-sensitive preview-icon"><path d="m2 16 4.039-9.69a.5.5 0 0 1 .923 0L11 16"/><path d="M22 9v7"/><path d="M3.304 13h6.392"/><circle cx="18.5" cy="12.5" r="3.5"/></svg>`,

  // 数字图标
  number: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-binary preview-icon"><rect x="14" y="14" width="4" height="6" rx="2"/><rect x="6" y="4" width="4" height="6" rx="2"/><path d="M6 20h4"/><path d="M14 10h4"/><path d="M6 14h2v6"/><path d="M14 4h2v6"/></svg>`,

  // 布尔图标
  boolean: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-toggle-right preview-icon"><circle cx="15" cy="12" r="3"/><rect width="20" height="14" x="2" y="5" rx="7"/></svg>`,

  // 其他普通成员图标
  default: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file preview-icon"><path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"/><path d="M14 2v5a1 1 0 0 0 1 1h5"/></svg>`,

  // 计算属性图标 (sigma)
  computed: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sigma preview-icon"><path d="M18 7V5a1 1 0 0 0-1-1H6.5a.5.5 0 0 0-.4.8l4.5 6a2 2 0 0 1 0 2.4l-4.5 6a.5.5 0 0 0 .4.8H17a1 1 0 0 0 1-1v-2"/></svg>`,

  // 函数图标
  function: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square-function preview-icon"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><path d="M9 17c2 0 2.8-1 2.8-2.8V10c0-2 1-3.3 3.2-3"/><path d="M9 11.2h5.7"/></svg>`,

  // markRaw 图标
  markRaw: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-x-corner preview-icon"><path d="M11 22H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v5"/><path d="M14 2v5a1 1 0 0 0 1 1h5"/><path d="m15 17 5 5"/><path d="m20 17-5 5"/></svg>`,

  // 展开/折叠指示图标 (chevron-right)
  chevron: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right preview-icon"><path d="m9 18 6-6-6-6"/></svg>`,
} as const;

export type IconKey = keyof typeof ICONS;

// 获取图标的辅助函数
export function getIcon(key: IconKey): string {
  return ICONS[key];
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