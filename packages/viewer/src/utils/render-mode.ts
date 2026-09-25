// 渲染模式取值（ADR-0032）：full = 全部节点常驻 DOM；lazy = 展开渲染、折叠自 DOM 移除
export type RenderMode = 'full' | 'lazy'

// 生效渲染模式判定（ADR-0032）：mode=edit 恒为 full——edit+lazy 是被禁止的组合
// （折叠销毁编辑控件 → 重展开回显旧值的数据-视图不一致配方）；view/click-edit 按声明值
export function resolveRenderMode(declared: RenderMode, mode: string): RenderMode {
  return mode === 'edit' ? 'full' : declared
}
