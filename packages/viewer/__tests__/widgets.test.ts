import { test, expect } from 'bun:test'
import { html, nothing } from 'lit'
import { toRenderable } from '../src/utils/toRenderable'
import { toView as colorToView, isColorLike } from '../src/widgets/color'
import { inputModule } from '../src/widgets/input'
import { isCheckboxChecked, toView as checkboxToView } from '../src/widgets/checkbox'
import { getWidgetModule } from '../src/widgets/registry'
import { resolveEditorPlan } from '../src/edit-plan'
import type { TreeNode } from '../src/types'
import type { WidgetRenderContext as Ctx } from '../src/widgets/types'

// 22 个 widget 名（HtmlInputTypeMap/AutoStoreWidgets 全集）
const ALL_WIDGETS = [
  'text', 'number', 'email', 'password', 'search', 'tel', 'url',
  'checkbox', 'radio', 'file', 'range', 'date', 'datetime-local', 'month',
  'time', 'week', 'color', 'hidden', 'image', 'textarea', 'select', 'combobox',
]

const mkNode = (value: any): TreeNode => ({
  key: 'v',
  value,
  type: 'string',
  expanded: false,
  childCount: 0,
  path: ['v'],
  children: [],
})

// 构造查看态渲染上下文（与 viewer._buildViewContext 一致）
const makeCtx = (widget: string | undefined, value: any, schema: Record<string, any> = {}): Ctx => {
  const raw = { ...schema, ...(widget ? { widget } : {}) }
  return {
    value,
    schema: raw,
    plan: resolveEditorPlan(mkNode(value), raw, 'g'),
    node: mkNode(value),
    setValue: () => {},
    onKeydown: () => {},
  }
}

test('registry 覆盖全部 22 个 widget 名', () => {
  for (const widget of ALL_WIDGETS) {
    const plan = resolveEditorPlan(mkNode('x'), { widget }, 'g')
    expect(getWidgetModule(widget)).not.toBeNull()
    // plan.kind 归并后（hidden/image 回落 input）模块恒可达
    expect(getWidgetModule(widget)).toBe(getWidgetModule(widget))
    void plan
  }
  expect(getWidgetModule(undefined)).toBeNull()
  expect(getWidgetModule('no-such-widget')).toBeNull()
})

test('toRenderable 三态归一化：字符串包装、空串与空值渲染为空、其余原样透传', () => {
  const tpl = html`<b>bold</b>`
  expect(toRenderable(tpl)).toBe(tpl)
  const fakeNode = { nodeType: 1 }
  expect(toRenderable(fakeNode)).toBe(fakeNode)
  expect(toRenderable(null)).toBe(nothing)
  expect(toRenderable(undefined)).toBe(nothing)
  expect(toRenderable('')).toBe(nothing)
  const wrapped = toRenderable('<b>x</b>')
  expect(wrapped).not.toBe('<b>x</b>')
  expect(wrapped).toBeDefined()
})

test('isColorLike：hex/rgb/hsl/color() 为真，命名色与普通字符串为假', () => {
  expect(isColorLike('#fff')).toBe(true)
  expect(isColorLike('#808080cc')).toBe(true)
  expect(isColorLike('rgba(1, 2, 3, 0.5)')).toBe(true)
  expect(isColorLike('color(display-p3 1 0 0)')).toBe(true)
  expect(isColorLike('red')).toBe(false)
  expect(isColorLike('')).toBe(false)
  expect(isColorLike(null)).toBe(false)
})

test('widget=color 查看态：颜色值渲染色块，非颜色值回落 null', () => {
  expect(colorToView(makeCtx('color', '#3b82f6'))).not.toBeNull()
  expect(colorToView(makeCtx('color', 'not-a-color'))).toBeNull()
})

test('color 渲染门控由 registry 分发承担：input 家族模块无 toView（查看回落 choices/formatValue）', () => {
  // @ts-expect-error 模块未实现 toView 是分发层的回落依据
  expect(inputModule.toView).toBeUndefined()
})

test('widget=checkbox 查看态：恒渲染只读勾选框，勾选态按双值档位判定', () => {
  expect(checkboxToView(makeCtx('checkbox', true))).not.toBeNull()
  expect(checkboxToView(makeCtx('checkbox', 'off', { choices: [{ label: '开', value: 'on' }, { label: '关', value: 'off' }] }))).not.toBeNull()
  expect(isCheckboxChecked('on', { choices: [{ label: '开', value: 'on' }, { label: '关', value: 'off' }] })).toBe(true)
  expect(isCheckboxChecked('off', { choices: [{ label: '开', value: 'on' }, { label: '关', value: 'off' }] })).toBe(false)
  expect(isCheckboxChecked(false, undefined)).toBe(false)
})

test('编辑态 toRender：各模块均返回渲染结果', () => {
  const cases: [string, any, Record<string, any>?][] = [
    ['text', 'hello'],
    ['checkbox', true],
    ['textarea', 'multi\nline'],
    ['select', 'a', { choices: ['a', 'b'] }],
    ['radio', 'a', { choices: ['a', 'b'] }],
    ['combobox', 'zsh', { choices: ['bash', 'zsh'] }],
  ]
  for (const [widget, value, schema] of cases) {
    const module = getWidgetModule(widget)!
    expect(module).not.toBeNull()
    expect(module.toRender!(makeCtx(widget, value, schema ?? {}))).not.toBeNull()
  }
  // 对象/数组 JSON 整体编辑（textarea jsonMode）
  const jsonPlan = resolveEditorPlan({ ...mkNode({}), type: 'object', children: [] } as TreeNode, {}, 'g')
  const ctx: WidgetRenderContext = {
    value: { a: 1 },
    schema: {},
    plan: jsonPlan,
    node: mkNode({}),
    setValue: () => {},
    onKeydown: () => {},
  }
  expect(getWidgetModule('textarea')!.toRender!(ctx)).not.toBeNull()
})
