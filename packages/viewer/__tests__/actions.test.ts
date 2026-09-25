import { test, expect } from 'bun:test'
import { AutoStore } from 'autostore'
import { nothing } from 'lit'
import { filterVisibleActions, invokeAction, renderNodeActions } from '../src/features/actions'
import type { ActionsHost } from '../src/features/actions'
import type { AutoStoreAction } from 'autostore'
import type { TreeNode } from '../src/types'

// 手工构建树节点（复刻 _buildNodes 结构）
const mkNode = (key: string, path: string[], value: any): TreeNode => ({
  key,
  value,
  type: typeof value === 'number' ? 'number' : 'string',
  expanded: false,
  childCount: 0,
  path,
  children: [],
})

const mkEvent = (): Event => ({ stopPropagation: () => {} } as unknown as Event)

// ---- filterVisibleActions ----

test('filterVisibleActions：非数组入参与空数组归空', () => {
  expect(filterVisibleActions(undefined)).toEqual([])
  expect(filterVisibleActions(null as any)).toEqual([])
  expect(filterVisibleActions([])).toEqual([])
})

test('filterVisibleActions：visible=undefined/true 保留，false 过滤，非对象项剔除', () => {
  const a: AutoStoreAction = { label: 'a' }
  const b: AutoStoreAction = { label: 'b', visible: true }
  const c: AutoStoreAction = { label: 'c', visible: false }
  expect(filterVisibleActions([a, b, c, null as any, 'x' as any])).toEqual([a, b])
})

// ---- invokeAction（onClick 契约，ADR-0030）----

test('invokeAction：value 传节点当前状态值（原始值而非显示值），ctx 携带 action/options/event', () => {
  const store = new AutoStore({ count: 5 })
  const node = mkNode('count', ['count'], store.state.count)
  const schema = { label: '计数' }
  const action: AutoStoreAction = { label: '翻倍' }
  const event = mkEvent()
  let received: any = null
  action.onClick = (value: any, ctx: any) => {
    received = { value, ctx }
  }
  invokeAction(node, schema, action, event, (p) => store.state[p as any])
  expect(received.value).toBe(5)
  expect(received.ctx.action).toBe(action)
  expect(received.ctx.options).toBe(schema)
  expect(received.ctx.event).toBe(event)
  expect(typeof received.ctx.update).toBe('function')
})

test('invokeAction：ctx.update 经 Proxy 写节点路径，store 状态随之更新', () => {
  const store = new AutoStore({ user: { age: 25 } })
  const node = mkNode('age', ['user', 'age'], store.state.user.age)
  const action: AutoStoreAction = {
    onClick: (_v: any, ctx: any) => ctx.update(26),
  }
  invokeAction(node, undefined, action, mkEvent(), (p) => {
    let obj: any = store.state
    for (const k of p) obj = obj?.[k]
    return obj
  })
  expect(store.state.user.age).toBe(26)
})

test('invokeAction：无 onClick 静默跳过；onClick 抛错容错 warn 不上抛', () => {
  const node = mkNode('x', ['x'], 1)
  // 无 onClick：不炸
  invokeAction(node, undefined, { label: 'x' }, mkEvent(), () => ({}))
  // 抛错：被捕获不上抛（console.warn 输出到测试日志可接受）
  const action: AutoStoreAction = {
    onClick: () => {
      throw new Error('boom')
    },
  }
  expect(() => invokeAction(node, undefined, action, mkEvent(), () => ({}))).not.toThrow()
})

// ---- renderNodeActions（TemplateResult 结构级断言，无 DOM）----

// mock 宿主：记录 clickAction 调用与图标请求，开合态由 Set 承载
const makeHost = (overrides: Partial<ActionsHost> = {}) => {
  const clicks: { action: AutoStoreAction; event: Event }[] = []
  const requested: string[] = []
  const open = new Set<string>()
  return {
    clicks,
    requested,
    open,
    hasIcon: (name: string) => ['copy', 'edit'].includes(name) || open.has('icon:' + name),
    requestIcons: (names: string[]) => {
      requested.push(...names)
    },
    clickAction: (_node: TreeNode, _schema: any, action: AutoStoreAction, event: Event) => {
      clicks.push({ action, event })
    },
    isMenuOpen: (key: string) => open.has(key),
    setMenuOpen: (key: string, v: boolean) => {
      v ? open.add(key) : open.delete(key)
    },
    ...overrides,
  }
}

type Host = ReturnType<typeof makeHost>

// 模板文本（strings 拼接，§ 为插值分隔）：断言类名/标签结构
const textOf = (r: any) => (r.strings as readonly string[]).join('§')

// 递归收集模板全文（strings 与 values 交错，嵌套子模板/数组展开）：
// 分割线、caret 等渲染在子模板里，外层 strings 看不到
const deepText = (v: any): string => {
  if (Array.isArray(v)) return v.map(deepText).join('')
  if (v && typeof v === 'object' && 'strings' in v) {
    return (v.strings as readonly string[]).map((s, i) => s + deepText((v.values as any[])[i] ?? '')).join('')
  }
  return ''
}
// 提取模板中的事件处理器（values 里的函数）
const handlersOf = (r: any) => (r.values as any[]).filter((v) => typeof v === 'function')

// renderNodeActions 返回单插值模板，values[0] 为各动作的 TemplateResult 数组
const partsOf = (host: Host, actions: AutoStoreAction[], node = mkNode('v', ['v'], 'x')) => {
  return (renderNodeActions(host as any, node, actions, {}).values as any[])[0] as any[]
}

test('button 形态：icon+label 渲染图标按钮（node-tool），title 取 tooltip，label 不进按钮体', () => {
  const host = makeHost()
  const [part] = partsOf(host, [{ icon: 'copy', label: '复制', tooltip: '复制当前值' }])
  const text = textOf(part)
  expect(text).toContain('node-tool')
  expect(text).not.toContain('node-tool-text')
  // title=tooltip（values 里有插值 title）
  expect((part.values as any[]).map(String)).toContain('复制当前值')
})

test('button 形态：仅 label 渲染文字按钮变体（node-tool-text）', () => {
  const host = makeHost()
  const [part] = partsOf(host, [{ label: '重置' }])
  expect(textOf(part)).toContain('node-tool-text')
})

test('button 形态：icon 未命中攒批拉取且有 label 回落文字按钮；无 label 渲染引用壳占位', () => {
  const host = makeHost()
  const [a] = partsOf(host, [{ icon: 'dynamic-icon', label: '拉取中' }])
  expect(host.requested).toEqual(['dynamic-icon'])
  expect(textOf(a)).toContain('node-tool-text')
  // 无 label：渲染空白引用壳占位（SVGTemplateResult），不渲染文字
  const host2 = makeHost()
  const [b] = partsOf(host2, [{ icon: 'dynamic-icon' }])
  expect(host2.requested).toEqual(['dynamic-icon'])
  expect(textOf(b)).toContain('node-tool')
  expect((b.values as any[]).some((v) => v && typeof v === 'object' && 'strings' in v)).toBe(true)
})

test('button 形态：icon 与 label 都无跳过渲染并 warn', () => {
  const host = makeHost()
  const [part] = partsOf(host, [{} as AutoStoreAction])
  expect(part).toBe(nothing)
})

test('enable=false：渲染置灰类且点击守卫（clickAction 不触发）', () => {
  const host = makeHost()
  const [part] = partsOf(host, [{ label: '禁用', enable: false }])
  expect((part.values as any[]).map(String).join(' ')).toContain('disabled')
  handlersOf(part)[0](mkEvent())
  expect(host.clicks.length).toBe(0)
})

test('enable=true（默认）：点击触发 clickAction', () => {
  const host = makeHost()
  const action: AutoStoreAction = { label: '点我' }
  const [part] = partsOf(host, [action])
  handlersOf(part)[0](mkEvent())
  expect(host.clicks.length).toBe(1)
  expect(host.clicks[0].action).toBe(action)
})

test('image 形态：url 渲染 img；缺 url 跳过渲染', () => {
  const host = makeHost()
  const [ok] = partsOf(host, [{ type: 'image', url: 'https://x/a.png', label: '图片' } as AutoStoreAction])
  expect(textOf(ok)).toContain('img')
  const host2 = makeHost()
  const [bad] = partsOf(host2, [{ type: 'image', label: '无地址' } as AutoStoreAction])
  expect(bad).toBe(nothing)
})

test('dropdown 形态：默认收起（无 action-menu 面板），开合态经宿主读写', () => {
  const host = makeHost()
  const action: AutoStoreAction = { type: 'dropdown', label: '菜单', items: [{ label: '一' }] }
  const [closed] = partsOf(host, [action])
  expect(textOf(closed)).not.toContain('action-menu-item')
  // 打开后渲染菜单面板
  host.open.add('v#0')
  const [opened] = partsOf(host, [action])
  expect(textOf(opened)).toContain('action-menu')
})

test('dropdown 菜单项：visible 过滤、"-" 渲染分割线、点击以该项为 ctx.action 并关闭菜单', () => {
  const host = makeHost()
  host.open.add('v#0')
  const item1: AutoStoreAction = { label: '一' }
  const action: AutoStoreAction = {
    type: 'dropdown',
    label: '菜单',
    items: [item1, '-', { label: '隐藏', visible: false }, { label: '二' }],
  }
  const [opened] = partsOf(host, [action])
  expect(deepText(opened)).toContain('action-menu-divider')
  expect(deepText(opened)).not.toContain('隐藏')
  // 找到"一"菜单项的 handler（面板 values 里的数组 → 项模板 → 其 handler）
  const itemsArr = (opened.values as any[]).find((v) => Array.isArray(v))!
  const itemPart = itemsArr.find((p: any) => textOf(p).includes('action-menu-item'))!
  handlersOf(itemPart)[0](mkEvent())
  expect(host.clicks.length).toBe(1)
  expect(host.clicks[0].action).toBe(item1)
  // 点击后菜单关闭
  expect(host.open.has('v#0')).toBe(false)
})

test('dropdown 菜单项 enable=false：置灰且点击不触发 clickAction', () => {
  const host = makeHost()
  host.open.add('v#0')
  const action: AutoStoreAction = {
    type: 'dropdown',
    label: '菜单',
    items: [{ label: '禁用项', enable: false }],
  }
  const [opened] = partsOf(host, [action])
  const itemsArr = (opened.values as any[]).find((v) => Array.isArray(v))!
  const itemPart = itemsArr.find((p: any) => textOf(p).includes('action-menu-item'))!
  expect((itemPart.values as any[]).map(String).join(' ')).toContain('disabled')
  handlersOf(itemPart)[0](mkEvent())
  expect(host.clicks.length).toBe(0)
})

test('syncMenu：选中后把该项 label/icon/tooltip 回写触发按钮动作', () => {
  const host = makeHost()
  host.open.add('v#0')
  const action: AutoStoreAction = {
    type: 'dropdown',
    label: '菜单',
    syncMenu: true,
    items: [{ label: '选中项', icon: 'copy', tooltip: '提示' }],
  }
  const [opened] = partsOf(host, [action])
  const itemsArr = (opened.values as any[]).find((v) => Array.isArray(v))!
  const itemPart = itemsArr.find((p: any) => textOf(p).includes('action-menu-item'))!
  handlersOf(itemPart)[0](mkEvent())
  expect(action.label).toBe('选中项')
  expect(action.icon).toBe('copy')
  expect(action.tooltip).toBe('提示')
})

test('syncMenu 缺省：选中不回写触发按钮动作', () => {
  const host = makeHost()
  host.open.add('v#0')
  const action: AutoStoreAction = {
    type: 'dropdown',
    label: '菜单',
    items: [{ label: '选中项' }],
  }
  const [opened] = partsOf(host, [action])
  const itemsArr = (opened.values as any[]).find((v) => Array.isArray(v))!
  const itemPart = itemsArr.find((p: any) => textOf(p).includes('action-menu-item'))!
  handlersOf(itemPart)[0](mkEvent())
  expect(action.label).toBe('菜单')
})

test('dropdown enable=false：触发按钮点击不打开菜单', () => {
  const host = makeHost()
  const action: AutoStoreAction = { type: 'dropdown', label: '菜单', enable: false, items: [{ label: '一' }] }
  const [part] = partsOf(host, [action])
  // 触发按钮在 dropdown 模板的 values[0]（trigger TemplateResult）
  const trigger = (part.values as any[]).find((v: any) => v && typeof v === 'object' && 'strings' in v)!
  handlersOf(trigger)[0](mkEvent())
  expect(host.open.size).toBe(0)
})

test('caret=true：触发按钮渲染下拉箭头', () => {
  const host = makeHost()
  const [part] = partsOf(host, [{ type: 'dropdown', label: '菜单', caret: true } as AutoStoreAction])
  expect(deepText(part)).toContain('action-caret')
})

test('多动作按声明顺序渲染（pos 忽略，ADR-0030）', () => {
  const host = makeHost()
  const parts = partsOf(host, [
    { label: '前', pos: 'before' } as AutoStoreAction,
    { label: '后', pos: 'after' } as AutoStoreAction,
  ])
  expect(parts.length).toBe(2)
  // 两动作都渲染（pos 不参与布局）
  expect(parts.every((p: any) => p !== nothing)).toBe(true)
})
