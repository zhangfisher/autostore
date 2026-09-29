import { test, expect } from 'bun:test'
import { renderAreaActions, splitActionsByAlign } from '../src/features/actions'
import type { ActionTarget, ActionsHost } from '../src/features/actions'
import { parseChromeConfig, resolveStorePlaceholders } from '../src/utils/chrome-config'
import type { AutoStoreAction } from 'autostore'

// mock 宿主：记录 clickAction 调用（含目标）与图标请求，开合态由 Set 承载
const makeHost = () => {
  const clicks: { target: ActionTarget; action: AutoStoreAction; event: Event }[] = []
  const open = new Set<string>()
  return {
    clicks,
    open,
    hasIcon: () => false,
    requestIcons: () => {},
    clickAction: (target: ActionTarget, _schema: any, action: AutoStoreAction, event: Event) => {
      clicks.push({ target, action, event })
    },
    isMenuOpen: (key: string) => open.has(key),
    setMenuOpen: (key: string, v: boolean) => {
      v ? open.add(key) : open.delete(key)
    },
  }
}

type Host = ReturnType<typeof makeHost>

const mkEvent = (): Event => ({ stopPropagation: () => {} } as unknown as Event)

// 模板文本（strings 拼接）与事件处理器提取（同 actions.test.ts 手法）
const textOf = (r: any) => (r.strings as readonly string[]).join('§')
const handlersOf = (r: any) => (r.values as any[]).filter((v) => typeof v === 'function')

// ---- parseChromeConfig（ADR-0035 attribute/property 双形态解析）----

test('parseChromeConfig：字符串走 relaxedToJson 宽松解析（无引号键名/单引号/尾逗号）', () => {
  const header = parseChromeConfig<{ title: string; actions: { label: string }[] }>(
    "{title:'配置',actions:[{label:'重置',},]}",
    'header',
  )
  expect(header).toEqual({ title: '配置', actions: [{ label: '重置' }] })
})

test('parseChromeConfig：对象原样透传（property 形态免解析），undefined/null/空白串归一化 undefined', () => {
  const obj = { title: 'x' }
  expect(parseChromeConfig(obj, 'header')).toBe(obj)
  expect(parseChromeConfig(undefined, 'header')).toBeUndefined()
  expect(parseChromeConfig(null, 'header')).toBeUndefined()
  expect(parseChromeConfig('', 'header')).toBeUndefined()
  expect(parseChromeConfig('  ', 'footer')).toBeUndefined()
})

test('parseChromeConfig：解析失败 warn 返回 undefined（该区不渲染）', () => {
  expect(parseChromeConfig('{title:未闭合', 'header')).toBeUndefined()
})

// ---- resolveStorePlaceholders（ADR-0035 Store 占位符）----

test('resolveStorePlaceholders：<store.<prop>> 求值 store 实例公开属性，可混排多实例', () => {
  const store = { title: '应用配置', id: 'st_1' }
  expect(resolveStorePlaceholders('<store.title>', store)).toBe('应用配置')
  expect(resolveStorePlaceholders('[<store.id>] <store.title>', store)).toBe('[st_1] 应用配置')
})

test('resolveStorePlaceholders：未命中属性替换为空串；无占位符原样返回；非字符串透传', () => {
  expect(resolveStorePlaceholders('<store.nope>', { title: 'x' })).toBe('')
  expect(resolveStorePlaceholders('纯文本', {})).toBe('纯文本')
  expect(resolveStorePlaceholders(undefined, {})).toBeUndefined()
  expect(resolveStorePlaceholders('<store.title>', undefined)).toBe('')
})

// ---- splitActionsByAlign（ADR-0035 按侧分组）----

test('splitActionsByAlign：align 缺省随容器默认侧，声明侧归对应组，组内保持声明序', () => {
  const a1: AutoStoreAction = { label: '1' }
  const a2: AutoStoreAction = { label: '2', align: 'left' }
  const a3: AutoStoreAction = { label: '3' }
  const a4: AutoStoreAction = { label: '4', align: 'right' }
  // 区头：默认右
  expect(splitActionsByAlign([a1, a2, a3, a4], 'right')).toEqual({ left: [a2], right: [a1, a3, a4] })
  // 区尾：默认左
  expect(splitActionsByAlign([a1, a2, a3, a4], 'left')).toEqual({ left: [a1, a2, a3], right: [a4] })
})

// ---- renderAreaActions（区头/区尾无节点契约）----

test('renderAreaActions：menuKey 以区名为前缀（header#0），与节点动作开合态隔离', () => {
  const host = makeHost()
  const action: AutoStoreAction = { type: 'dropdown', label: '菜单', items: [{ label: '一' }] }
  const [closed] = (renderAreaActions(host as unknown as ActionsHost, [action], undefined, 'header').values as any[])[0] as any[]
  expect(textOf(closed)).not.toContain('action-menu-item')
  host.open.add('header#0')
  const [opened] = (renderAreaActions(host as unknown as ActionsHost, [action], undefined, 'header').values as any[])[0] as any[]
  expect(textOf(opened)).toContain('action-menu')
})

test('renderAreaActions：点击触发宿主 clickAction，目标无路径无值（detail 契约）', () => {
  const host = makeHost()
  const action: AutoStoreAction = { label: '重置' }
  const [part] = (renderAreaActions(host as unknown as ActionsHost, [action], undefined, 'footer').values as any[])[0] as any[]
  handlersOf(part)[0](mkEvent())
  expect(host.clicks.length).toBe(1)
  expect(host.clicks[0].action).toBe(action)
  expect(host.clicks[0].target.path).toBeUndefined()
  expect(host.clicks[0].target.value).toBeUndefined()
  expect(host.clicks[0].target.menuKeyPrefix).toBe('footer')
})

test('renderAreaActions：indexOffset 保持分组后的原始声明序号（组间 menuKey 不碰撞）', () => {
  const host = makeHost()
  const action: AutoStoreAction = { type: 'dropdown', label: '菜单', items: [{ label: '一' }] }
  // 左组 2 项已渲染（占序号 0/1），右组第 1 项应为 footer#2
  const [closed] = (renderAreaActions(host as unknown as ActionsHost, [action], undefined, 'footer', 2).values as any[])[0] as any[]
  host.open.add('footer#2')
  const [reopened] = (renderAreaActions(host as unknown as ActionsHost, [action], undefined, 'footer', 2).values as any[])[0] as any[]
  expect(textOf(closed)).not.toContain('action-menu-item')
  expect(textOf(reopened)).toContain('action-menu')
})
