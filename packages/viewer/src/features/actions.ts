// schema.actions 渲染模块（ADR-0030）：纯渲染函数，宿主（viewer 组件）经 ActionsHost 接口
// 注入图标链（ADR-0024）与点击回调，dropdown 开合态由宿主 Set 承载。
// 三形态：button（默认）/ image / dropdown（自制轻量菜单，不引 UI 库）。
// pos 静默忽略（form 的布局概念，node-tools 单一位置按声明顺序渲染）。
import { html, nothing, type TemplateResult } from 'lit'
import { iconHtml } from './builtin-icons'
import { joinPath } from '../utils/joinPath'
import type { AutoStoreAction } from 'autostore'
import type { TreeNode } from '../types'

// 宿主回调面：图标链与点击契约（value=node.value、update 经 Proxy 写路径）由宿主实现
export interface ActionsHost {
  // 图标是否已注册（slot 自定义/内置/拉取命中）
  hasIcon(name: string): boolean
  // 未命中图标攒批拉取（拉取完成后宿主自行重渲染）
  requestIcons(names: string[]): void
  // 点击回调：宿主组装 ctx（action/options/event/update），onClick 抛错由宿主容错
  clickAction(node: TreeNode, schema: Record<string, any> | undefined, action: AutoStoreAction, event: Event): void
  // dropdown 开合态读写（menuKey = 路径#声明序号）
  isMenuOpen(menuKey: string): boolean
  setMenuOpen(menuKey: string, open: boolean): void
}

// visible 过滤：undefined 视为可见（顶层与菜单项同一语义，ADR-0030）
export function filterVisibleActions(actions: AutoStoreAction[] | undefined): AutoStoreAction[] {
  if (!Array.isArray(actions)) return []
  return actions.filter((a) => a && typeof a === 'object' && a.visible !== false)
}

// 触发动作点击（onClick 契约，ADR-0030）：value = 节点当前状态值（非 toView 显示值）；
// update 经 Proxy 写该节点路径（宿主提供状态访问器，写入后 watch 自动刷新树）；
// onClick 抛错容错 warn 不上抛（对齐 toView 惯例）
export function invokeAction(
  node: TreeNode,
  schema: Record<string, any> | undefined,
  action: AutoStoreAction,
  event: Event,
  getStateByPath: (path: string[]) => any,
): void {
  if (typeof action.onClick !== 'function') return
  try {
    action.onClick(node.value, {
      action,
      options: schema,
      event,
      update: (v: any) => {
        const parent = getStateByPath(node.path.slice(0, -1))
        if (parent) parent[node.path[node.path.length - 1]] = v
      },
    })
  } catch (e) {
    console.warn('[autostore-viewer] action onClick 执行失败', e)
  }
}

// 悬停提示：正名 tooltip（tips 不消费），图标按钮以 label 兜底（图标语义无提示难猜）
function actionTitle(action: AutoStoreAction, fallback?: string): string | typeof nothing {
  if (typeof action.tooltip === 'string') return action.tooltip
  if (fallback !== undefined) return fallback
  return nothing
}

// 渲染动作图标：已注册渲染引用壳；未命中攒批拉取——
// 有 label 回落文字按钮（拉取完成重渲染换图标），无 label 渲染空白引用壳占位
// （symbol 注册后 <use> 动态解析自动填充，布局不跳）
function renderActionIcon(host: ActionsHost, action: AutoStoreAction): TemplateResult | typeof nothing {
  const icon = action.icon
  if (typeof icon !== 'string' || icon === '') return nothing
  if (!host.hasIcon(icon)) {
    host.requestIcons([icon])
    return action.label ? nothing : iconHtml(icon)
  }
  return iconHtml(icon)
}

// 点击处理器：stopPropagation 防触发行的展开/折叠；enable=false 点击守卫
function onToolClick(host: ActionsHost, node: TreeNode, schema: Record<string, any> | undefined, action: AutoStoreAction, disabled: boolean) {
  return (e: Event) => {
    e.stopPropagation()
    if (!disabled) host.clickAction(node, schema, action, e)
  }
}

// button 形态：icon+label → 图标按钮带悬停提示；仅 label → 小文字按钮（.node-tool-text）；
// 仅 icon → 纯图标；都无 → 跳过 + warn（ADR-0030 空回落四档）
function renderButtonAction(host: ActionsHost, node: TreeNode, schema: Record<string, any> | undefined, action: AutoStoreAction): TemplateResult | typeof nothing {
  const hasIcon = typeof action.icon === 'string' && action.icon !== ''
  const hasLabel = typeof action.label === 'string' && action.label !== ''
  if (!hasIcon && !hasLabel) {
    console.warn('[autostore-viewer] action 无 icon 且无 label，跳过渲染', action)
    return nothing
  }
  const disabled = action.enable === false
  const iconView = renderActionIcon(host, action)
  // 图标不可显示（未声明或未加载回落）且有 label → 文字按钮变体
  if (iconView === nothing && hasLabel) {
    return html`<span
      class="node-tool-text ${disabled ? 'disabled' : ''}"
      title=${actionTitle(action)}
      @click=${onToolClick(host, node, schema, action, disabled)}
    >${action.label}</span>`
  }
  return html`<span
    class="node-tool ${disabled ? 'disabled' : ''}"
    title=${actionTitle(action, action.label)}
    @click=${onToolClick(host, node, schema, action, disabled)}
  >${iconView}</span>`
}

// image 形态：url 渲染图片（尺寸 --viewer-icon-size），label 作 alt/悬停兜底；缺 url 跳过 + warn
function renderImageAction(host: ActionsHost, node: TreeNode, schema: Record<string, any> | undefined, action: AutoStoreAction): TemplateResult | typeof nothing {
  if (typeof action.url !== 'string' || action.url === '') {
    console.warn('[autostore-viewer] image action 缺少 url，跳过渲染', action)
    return nothing
  }
  const disabled = action.enable === false
  return html`<span
    class="node-tool ${disabled ? 'disabled' : ''}"
    title=${actionTitle(action, action.label)}
    @click=${onToolClick(host, node, schema, action, disabled)}
  ><img src=${action.url} alt=${action.label ?? ''} /></span>`
}

// 菜单项图标：已注册渲染引用壳；未命中攒批拉取不渲染（菜单项自带文字，拉取完成重渲染补上）
function menuItemIcon(host: ActionsHost, icon: unknown): TemplateResult | typeof nothing {
  if (typeof icon !== 'string' || icon === '') return nothing
  if (!host.hasIcon(icon)) {
    host.requestIcons([icon])
    return nothing
  }
  return iconHtml(icon)
}

// dropdown 菜单项："-" 渲染分割线；项自身 onClick 以该项为 ctx.action（对齐 form）；
// syncMenu 选中后把该项 label/icon/tooltip 回写触发按钮显示（对齐 form 行为）；
// 项上的 visible/enable 同语义生效（ADR-0030）
function renderMenuItems(host: ActionsHost, node: TreeNode, schema: Record<string, any> | undefined, action: AutoStoreAction, menuKey: string): TemplateResult[] {
  const items = Array.isArray(action.items) ? action.items : []
  return items
    .filter((item) => item === '-' || (item && typeof item === 'object' && item.visible !== false))
    .map((item) => {
      if (item === '-') return html`<div class="action-menu-divider"></div>`
      const disabled = item.enable === false
      return html`<div
        class="action-menu-item ${disabled ? 'disabled' : ''}"
        @click=${(e: Event) => {
          e.stopPropagation()
          host.setMenuOpen(menuKey, false)
          if (action.syncMenu === true) {
            action.label = item.label
            action.icon = item.icon
            action.tooltip = item.tooltip
          }
          if (!disabled) host.clickAction(node, schema, item, e)
        }}
      >${menuItemIcon(host, item.icon)}<span>${item.label ?? ''}</span></div>`
    })
}

// dropdown 形态：触发按钮（icon/label/caret）+ 打开时的行内 absolute 右对齐菜单面板；
// 面板空白处点击 stopPropagation 不关闭（视为菜单内），点击外部由宿主的 document 监听关闭
function renderDropdownAction(host: ActionsHost, node: TreeNode, schema: Record<string, any> | undefined, action: AutoStoreAction, menuKey: string): TemplateResult {
  const disabled = action.enable === false
  const open = !disabled && host.isMenuOpen(menuKey)
  const iconView = renderActionIcon(host, action)
  const hasLabel = typeof action.label === 'string' && action.label !== ''
  const showText = iconView === nothing && hasLabel
  const trigger = html`<span
    class="${showText ? 'node-tool-text' : 'node-tool'} ${disabled ? 'disabled' : ''}"
    title=${actionTitle(action)}
    @click=${(e: Event) => {
      e.stopPropagation()
      if (!disabled) host.setMenuOpen(menuKey, !host.isMenuOpen(menuKey))
    }}
  >${iconView}${showText ? action.label : nothing}${action.caret === true ? html`<span class="action-caret">${iconHtml('chevron')}</span>` : nothing}</span>`
  if (!open) return html`<span class="node-action-menu">${trigger}</span>`
  return html`<span class="node-action-menu">
    ${trigger}
    <div class="action-menu" @click=${(e: Event) => e.stopPropagation()}>
      ${renderMenuItems(host, node, schema, action, menuKey)}
    </div>
  </span>`
}

// 渲染节点动作组（visible 已由调用方过滤）：按声明顺序，pos 忽略（ADR-0030）
export function renderNodeActions(
  host: ActionsHost,
  node: TreeNode,
  actions: AutoStoreAction[],
  schema: Record<string, any> | undefined,
): TemplateResult {
  return html`${actions.map((action, index) => {
    const type = action.type ?? 'button'
    // dropdown 开合键：路径 + 声明序号（同节点多个 dropdown 互不干扰）
    const menuKey = `${joinPath(node.path)}#${index}`
    if (type === 'dropdown') return renderDropdownAction(host, node, schema, action, menuKey)
    if (type === 'image') return renderImageAction(host, node, schema, action)
    return renderButtonAction(host, node, schema, action)
  })}`
}
