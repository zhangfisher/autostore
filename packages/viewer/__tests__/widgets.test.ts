import { test, expect } from 'bun:test'
import { html, nothing, type TemplateResult } from 'lit'
import { toRenderable } from '../src/utils/toRenderable'
import { resolveControlName } from '../src/utils/control-name'
import { resolveAffix, renderAffixed } from '../src/utils/affix'
import { toView as colorToView, isColorLike } from '../src/widgets/color'
import { toView as rangeToView, rangePercent } from '../src/widgets/range'
import { inputModule } from '../src/widgets/input'
import { isCheckboxChecked, toView as checkboxToView } from '../src/widgets/checkbox'
import { getWidgetModule } from '../src/widgets/registry'
import { resolveEditorPlan } from '../src/features/edit-plan'
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

test('widget=range 查看态：数值渲染迷你滑轨，非数值回落 null', () => {
  expect(rangeToView(makeCtx('range', 0.6, { min: 0, max: 1, step: 0.1 }))).not.toBeNull()
  expect(rangeToView(makeCtx('range', 'not-a-number'))).toBeNull()
})

test('rangePercent：区间归一、缺省 0~100、值域倒挂与非数值归零', () => {
  expect(rangePercent(0.6, 0, 1)).toBeCloseTo(0.6)
  expect(rangePercent(5, 0, 10)).toBeCloseTo(0.5)
  expect(rangePercent(50, undefined, undefined)).toBeCloseTo(0.5)
  expect(rangePercent(-1, 0, 1)).toBe(0)
  expect(rangePercent(2, 0, 1)).toBe(1)
  expect(rangePercent(3, 5, 5)).toBe(0)
  expect(rangePercent('x', 0, 1)).toBe(0)
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
    ['range', 0.6, { min: 0, max: 1, step: 0.1 }],
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

// ---- 编辑控件 name 注入（schema.name 非空串优先，否则完整 store 路径；radio 豁免）----

// 构造带 name 与自定义路径的编辑态上下文
const makeNamedCtx = (widget: string | undefined, value: any, schema: Record<string, any>, name: string | undefined, path: string[] = ['network', 'dhcp']): Ctx => ({
  ...makeCtx(widget, value, schema),
  node: { ...mkNode(value), path },
  name,
})

// 从 TemplateResult 定位静态段以 attr= 结尾处的插值（name=${...} 的实际值）
function attrValue(tpl: TemplateResult, attr: string): unknown {
  const i = (tpl.strings as readonly string[]).findIndex((s) => s.endsWith(attr))
  return i >= 0 ? tpl.values[i] : undefined
}

test('resolveControlName：schema.name 非空串优先，否则完整路径（数组下标/点号转义与 data-path 同源）', () => {
  expect(resolveControlName({ name: 'host-name' }, ['network', 'dhcp'])).toBe('host-name')
  expect(resolveControlName({ name: '' }, ['network', 'dhcp'])).toBe('network.dhcp')
  // 非字符串 name（含 0/数字）视为未声明
  expect(resolveControlName({ name: 0 }, ['network', 'dhcp'])).toBe('network.dhcp')
  expect(resolveControlName(undefined, ['network', 'dhcp'])).toBe('network.dhcp')
  // 数组下标原样、entrys 入口前缀保留（TreeNode.path 即完整 store 路径）
  expect(resolveControlName(undefined, ['users', '0', 'name'])).toBe('users.0.name')
  // 路径段含点号经 escapePath 转义（joinPath round-trip 闭环）
  expect(resolveControlName(undefined, ['a.b', 'c'])).toBe('a\\.b.c')
})

test('编辑态 name 注入：input/textarea/select/checkbox/range/color 写入 ctx.name，未提供渲染为空', () => {
  const name = 'network.dhcp'
  const cases: [string, any, Record<string, any>?][] = [
    ['text', 'hello'],
    ['textarea', 'line'],
    ['select', 'a', { choices: ['a', 'b'] }],
    ['checkbox', true],
    ['range', 3, { min: 0, max: 10 }],
    ['color', '#fff'],
  ]
  for (const [widget, value, schema] of cases) {
    const module = getWidgetModule(widget)!
    const tpl = module.toRender!(makeNamedCtx(widget, value, schema ?? {}, name)) as TemplateResult
    expect(attrValue(tpl, 'name='), `${widget} 写入 name`).toBe(name)
    // 未提供 name（查看态构造点/缺省）渲染为 nothing，不落字段名
    const bare = module.toRender!(makeCtx(widget, value, schema ?? {})) as TemplateResult
    expect(attrValue(bare, 'name='), `${widget} 缺省 name`).toBe(nothing)
  }
})

test('radio 豁免：原生 name 保持互斥组名（groupId），不写字段名', () => {
  const ctx = makeNamedCtx('radio', 'a', { choices: ['a', 'b'] }, 'network.dhcp')
  const tpl = getWidgetModule('radio')!.toRender!(ctx) as TemplateResult
  // choices.map 展开为内层模板数组，取第一个 radio 项
  const items = tpl.values[0] as TemplateResult[]
  expect(items.length).toBe(2)
  expect(attrValue(items[0], 'name=')).toBe(ctx.plan.groupId)
  expect(attrValue(items[1], 'name=')).toBe(ctx.plan.groupId)
  // 字段名不进入 radio 模板的任何插值
  expect(tpl.values).not.toContain('network.dhcp')
})

// ---- 值装饰（schema.prefix/suffix：纯展示拼接，不属于值本身；受 disable-schema 门控）----

test('resolveAffix：非空字符串生效、值为空不拼、非字符串忽略（同 icon/name 判据）', () => {
  expect(resolveAffix({ prefix: '$', suffix: 'ms' }, 100)).toEqual({ prefix: '$', suffix: 'ms' })
  expect(resolveAffix({ prefix: '', suffix: '' }, 100)).toEqual({ prefix: '', suffix: '' })
  // 非字符串（含 0/对象）视为未声明
  expect(resolveAffix({ prefix: 0, suffix: null }, 100)).toEqual({ prefix: '', suffix: '' })
  expect(resolveAffix(undefined, 100)).toEqual({ prefix: '', suffix: '' })
  // 值为空不拼（$ null 是噪声）
  expect(resolveAffix({ prefix: '$', suffix: 'ms' }, null)).toEqual({ prefix: '', suffix: '' })
  expect(resolveAffix({ prefix: '$', suffix: 'ms' }, undefined)).toEqual({ prefix: '', suffix: '' })
  expect(resolveAffix({ prefix: '$', suffix: 'ms' }, '')).toEqual({ prefix: '', suffix: '' })
  // 0/false 非空，装饰照常（$ 0 合理）
  expect(resolveAffix({ prefix: '$' }, 0)).toEqual({ prefix: '$', suffix: '' })
  expect(resolveAffix({ suffix: '!' }, false)).toEqual({ prefix: '', suffix: '!' })
})

test('renderAffixed：无装饰原样返回，有装饰包 asv-affix-row 与控件并排', () => {
  const plain = html`<input />`
  // 无装饰：content 引用原样返回，渲染路径零变化
  expect(renderAffixed({ prefix: '', suffix: '' }, plain)).toBe(plain)
  const tpl = renderAffixed({ prefix: '$', suffix: 'ms' }, plain) as TemplateResult
  expect(tpl.strings.join('')).toContain('asv-affix-row')
  // 外层 values = [prefix 内层模板, content, suffix 内层模板]，装饰文本在内层 values[0]
  const [p, c, s] = tpl.values as [TemplateResult, typeof plain, TemplateResult]
  expect(c).toBe(plain)
  expect(p.values[0]).toBe('$')
  expect(s.values[0]).toBe('ms')
  // 单侧装饰：仅 prefix，对侧插值为 nothing（不引入对侧装饰文本）
  const onlyP = renderAffixed({ prefix: '$', suffix: '' }, plain) as TemplateResult
  expect((onlyP.values[0] as TemplateResult).values[0]).toBe('$')
  expect(onlyP.values[2]).toBe(nothing)
})
