// schema.actions 渲染模块（ADR-0030）：纯渲染函数，宿主（viewer 组件）经 ActionsHost 接口
// 注入图标链（ADR-0024）与点击回调，dropdown 开合态由宿主 Set 承载。
// 三形态：button（默认）/ image / dropdown（自制轻量菜单，不引 UI 库）。
// pos 静默忽略（form 的布局概念，node-tools 单一位置按声明顺序渲染）。
// ADR-0035 扩展：动作目标抽象 ActionTarget——节点动作（path/value 取节点）与区域动作
// （区头/区尾，path/value 皆空、menuKey 以区名为前缀）共用同一渲染与触发契约；
// mode 模式显隐门控与 align 侧别分组为通用过滤/布局规则
import { html, nothing, type TemplateResult } from 'lit'
import { iconHtml } from './builtin-icons'
import { joinPath } from '../utils/joinPath'
import type { AutoStoreAction } from 'autostore'

// 动作触发目标：节点动作由 renderNodeActions 构造（value=节点状态值、path=节点完整路径），
// 区域动作由 renderAreaActions 构造（value/path 皆 undefined，menuKey 前缀为区名）
export interface ActionTarget {
  // 节点完整 store 路径；区域动作无路径（detail.path 为 undefined、update 为 noop）
  path?: string[]
  // onClick 首参 / action 事件 detail.value：节点为当前状态值，区域动作恒 undefined
  value?: any
  // menuKey 前缀：节点为 joinPath(path)，区头/区尾为 'header'/'footer'
  menuKeyPrefix: string
}

// 宿主回调面：图标链与点击契约（value=目标状态值、update 经 Proxy 写路径）由宿主实现
export interface ActionsHost {
  // 图标是否已注册（slot 自定义/内置/拉取命中）
  hasIcon(name: string): boolean
  // 未命中图标攒批拉取（拉取完成后宿主自行重渲染）
  requestIcons(names: string[]): void
  // 点击回调：宿主组装 ctx（action/options/event/update），onClick 抛错由宿主容错
  clickAction(target: ActionTarget, schema: Record<string, any> | undefined, action: AutoStoreAction, event: Event): void
  // dropdown 开合态读写（menuKey = 前缀#声明序号）
  isMenuOpen(menuKey: string): boolean
  setMenuOpen(menuKey: string, open: boolean): void
}

// visible/mode 双重过滤（ADR-0030/0035）：undefined 视为可见（顶层与菜单项同一语义）；
// mode 声明的逗号分隔模式子集非空时，未命中当前模式即不渲染（mode 空 = 全模式显示）。
// currentMode 缺省跳过模式过滤（单测便利；组件恒传真实模式）
export function filterVisibleActions(actions: AutoStoreAction[] | undefined, currentMode?: string): AutoStoreAction[] {
  if (!Array.isArray(actions)) return []
  return actions.filter((a) => {
    if (!a || typeof a !== 'object' || a.visible === false) return false
    if (typeof a.mode === 'string' && a.mode.trim() !== '' && typeof currentMode === 'string') {
      const modes = a.mode.split(',').map((m) => m.trim()).filter(Boolean)
      if (modes.length > 0 && !modes.includes(currentMode)) return false
    }
    return true
  })
}

// 触发动作点击（onClick 契约，ADR-0030/0035）：value = 目标当前状态值（区域动作恒 undefined）；
// update 经 Proxy 写目标路径（宿主提供状态访问器，写入后 watch 自动刷新树），
// 区域动作无路径，update 为 noop；onClick 抛错容错 warn 不上抛（对齐 toView 惯例）
export function invokeAction(
  target: ActionTarget,
  schema: Record<string, any> | undefined,
  action: AutoStoreAction,
  event: Event,
  getParent?: (path: string[]) => any,
): void {
  if (typeof action.onClick !== 'function') return
  try {
    action.onClick(target.value, {
      action,
      options: schema,
      event,
      update: (v: any) => {
        const path = target.path
        if (!path || path.length === 0 || !getParent) return
        const parent = getParent(path)
        if (parent) parent[path[path.length - 1]] = v
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

// 点击处理器：stopPropagation 防触发行展开/折叠（区域动作无行，无害）；enable=false 点击守卫
function onToolClick(host: ActionsHost, target: ActionTarget, schema: Record<string, any> | undefined, action: AutoStoreAction, disabled: boolean) {
  return (e: Event) => {
    e.stopPropagation()
    if (!disabled) host.clickAction(target, schema, action, e)
  }
}

// button 形态：icon+label → 图标按钮带悬停提示；仅 label → 小文字按钮（.node-tool-text）；
// 仅 icon → 纯图标；都无 → 跳过 + warn（ADR-0030 空回落四档）
function renderButtonAction(host: ActionsHost, target: ActionTarget, schema: Record<string, any> | undefined, action: AutoStoreAction): TemplateResult | typeof nothing {
  const hasIcon = typeof action.icon === 'string' && action.icon !== ''
  const hasLabel = typeof action.label === 'string' && action.label !== ''
  if (!hasIcon && !hasLabel) {
    return nothing
  }
  const disabled = action.enable === false
  const iconView = renderActionIcon(host, action)
  // 图标不可显示（未声明或未加载回落）且有 label → 文字按钮变体
  if (iconView === nothing && hasLabel) {
    return html`<span
      class="node-tool-text ${disabled ? 'disabled' : ''}"
      title=${actionTitle(action)}
      @click=${onToolClick(host, target, schema, action, disabled)}
    >${action.label}</span>`
  }
  return html`<span
    class="node-tool ${disabled ? 'disabled' : ''}"
    title=${actionTitle(action, action.label)}
    @click=${onToolClick(host, target, schema, action, disabled)}
  >${iconView}</span>`
}

// image 形态：url 渲染图片（尺寸 --viewer-icon-size），label 作 alt/悬停兜底；缺 url 跳过 + warn
function renderImageAction(host: ActionsHost, target: ActionTarget, schema: Record<string, any> | undefined, action: AutoStoreAction): TemplateResult | typeof nothing {
  if (typeof action.url !== 'string' || action.url === '') {
    return nothing
  }
  const disabled = action.enable === false
  return html`<span
    class="node-tool ${disabled ? 'disabled' : ''}"
    title=${actionTitle(action, action.label)}
    @click=${onToolClick(host, target, schema, action, disabled)}
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
function renderMenuItems(host: ActionsHost, target: ActionTarget, schema: Record<string, any> | undefined, action: AutoStoreAction, menuKey: string): TemplateResult[] {
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
          if (!disabled) host.clickAction(target, schema, item, e)
        }}
      >${menuItemIcon(host, item.icon)}<span>${item.label ?? ''}</span></div>`
    })
}

// dropdown 形态：触发按钮（icon/label/caret）+ 打开时的行内 absolute 右对齐菜单面板；
// 面板空白处点击 stopPropagation 不关闭（视为菜单内），点击外部由宿主的 document 监听关闭
function renderDropdownAction(host: ActionsHost, target: ActionTarget, schema: Record<string, any> | undefined, action: AutoStoreAction, menuKey: string): TemplateResult {
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
  >${iconView}${showText ? action.label : nothing}${action.caret === true ? html`<span class="action-caret">${iconHtml('chevron-sm')}</span>` : nothing}</span>`
  if (!open) return html`<span class="node-action-menu">${trigger}</span>`
  return html`<span class="node-action-menu">
    ${trigger}
    <div class="action-menu" @click=${(e: Event) => e.stopPropagation()}>
      ${renderMenuItems(host, target, schema, action, menuKey)}
    </div>
  </span>`
}

// 渲染动作列表（visible/mode 已由调用方过滤）：按声明顺序，pos 忽略（ADR-0030）；
// indexOffset 供区头/区尾按侧分组后保持原始声明序号作 menuKey（组间不碰撞，ADR-0035）
function renderActionList(
  host: ActionsHost,
  target: ActionTarget,
  actions: AutoStoreAction[],
  schema: Record<string, any> | undefined,
  indexOffset = 0,
): TemplateResult {
  return html`${actions.map((action, i) => {
    const type = action.type ?? 'button'
    // dropdown 开合键：前缀 + 声明序号（同区多个 dropdown 互不干扰）
    const menuKey = `${target.menuKeyPrefix}#${indexOffset + i}`
    if (type === 'dropdown') return renderDropdownAction(host, target, schema, action, menuKey)
    if (type === 'image') return renderImageAction(host, target, schema, action)
    return renderButtonAction(host, target, schema, action)
  })}`
}

// 渲染节点动作组（节点动作入口，保持既有签名）：目标为节点本身
export function renderNodeActions(
  host: ActionsHost,
  node: { path: string[]; value: any },
  actions: AutoStoreAction[],
  schema: Record<string, any> | undefined,
): TemplateResult {
  return renderActionList(host, { path: node.path, value: node.value, menuKeyPrefix: joinPath(node.path) }, actions, schema)
}

// 渲染区域动作组（区头/区尾，ADR-0035）：无节点契约——value=undefined、update=noop、
// menuKey=区名#声明序号；indexOffset 语义见 renderActionList
export function renderAreaActions(
  host: ActionsHost,
  actions: AutoStoreAction[],
  schema: Record<string, any> | undefined,
  area: 'header' | 'footer',
  indexOffset = 0,
): TemplateResult {
  return renderActionList(host, { menuKeyPrefix: area }, actions, schema, indexOffset)
}

// 按侧分组（ADR-0035）：align 缺省随容器默认侧（区头 right / 区尾左 left），
// 按侧分组、组内保持声明序；节点动作忽略 align（同 pos 待遇），不经过此函数
export function splitActionsByAlign(
  actions: AutoStoreAction[],
  defaultSide: 'left' | 'right',
): { left: AutoStoreAction[]; right: AutoStoreAction[] } {
  const left: AutoStoreAction[] = []
  const right: AutoStoreAction[] = []
  for (const action of actions) {
    ;((action.align ?? defaultSide) === 'left' ? left : right).push(action)
  }
  return { left, right }
}
