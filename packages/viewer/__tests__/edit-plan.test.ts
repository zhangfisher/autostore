import { test, expect } from 'bun:test'
import { resolveEditorPlan, normalizeChoices } from '../src/edit-plan'
import type { TreeNode } from '../src/types'

const mkNode = (value: any, type: TreeNode['type']): TreeNode => ({
  key: 'v',
  value,
  type,
  expanded: false,
  childCount: 0,
  path: ['v'],
  children: [],
})

test('未知 widget 回落标准 text input', () => {
  const plan = resolveEditorPlan(mkNode('x', 'string'), { widget: 'cron' }, 'g')
  expect(plan.kind).toBe('input')
  expect(plan.inputType).toBe('text')
})

test('hidden 与 image widget 回落 text input', () => {
  for (const widget of ['hidden', 'image']) {
    const plan = resolveEditorPlan(mkNode('x', 'string'), { widget }, 'g')
    expect(plan.kind).toBe('input')
    expect(plan.inputType).toBe('text')
  }
})

test('原生 input type widget 直传', () => {
  for (const widget of ['number', 'date', 'color', 'range', 'file', 'password']) {
    const plan = resolveEditorPlan(mkNode('x', 'string'), { widget }, 'g')
    expect(plan.kind).toBe('input')
    expect(plan.inputType).toBe(widget)
  }
})

test('widget=select 解析候选项并支持 multiple 与 valueKey/labelKey', () => {
  const plan = resolveEditorPlan(
    mkNode(2, 'number'),
    {
      widget: 'select',
      multiple: true,
      valueKey: 'id',
      labelKey: 'name',
      choices: [
        { id: 1, name: '甲' },
        { id: 2, name: '乙' },
      ],
    },
    'g',
  )
  expect(plan.kind).toBe('select')
  expect(plan.multiple).toBe(true)
  expect(plan.choices).toEqual([
    { value: 1, label: '甲' },
    { value: 2, label: '乙' },
  ])
})

test('widget=textarea 为普通多行文本（非 JSON 模式）', () => {
  const plan = resolveEditorPlan(mkNode('x', 'string'), { widget: 'textarea', rows: 4 }, 'g')
  expect(plan.kind).toBe('textarea')
  expect(plan.jsonMode).toBe(false)
  expect(plan.props.rows).toBe(4)
})

test('对象节点无 widget 时为 JSON 整体编辑', () => {
  for (const type of ['object', 'array'] as const) {
    const plan = resolveEditorPlan(mkNode({}, type), undefined, 'g')
    expect(plan.kind).toBe('textarea')
    expect(plan.jsonMode).toBe(true)
  }
})

test('对象节点声明 widget 时按声明渲染', () => {
  const plan = resolveEditorPlan(mkNode({}, 'object'), { widget: 'select', choices: ['a'] }, 'g')
  expect(plan.kind).toBe('select')
  expect(plan.jsonMode).toBe(false)
})

test('widget=radio 解析候选项', () => {
  const plan = resolveEditorPlan(mkNode('a', 'string'), { widget: 'radio', choices: ['a', 'b'] }, 'g')
  expect(plan.kind).toBe('radio')
  expect(plan.choices).toEqual([
    { value: 'a', label: 'a' },
    { value: 'b', label: 'b' },
  ])
})

test('widget=combobox 生成 text input 与 datalist 候选项', () => {
  const plan = resolveEditorPlan(mkNode('x', 'string'), { widget: 'combobox', choices: ['a', 'b'] }, 'g')
  expect(plan.kind).toBe('input')
  expect(plan.inputType).toBe('text')
  expect(plan.choices.length).toBe(2)
})

test('widget=checkbox 双值档位：choices 恰两项优先，回落 switchValues，数量不符静默忽略', () => {
  const byChoices = resolveEditorPlan(
    mkNode(true, 'boolean'),
    { widget: 'checkbox', choices: [{ label: '开', value: 1 }, { label: '关', value: 0 }] },
    'g',
  )
  expect(byChoices.pair?.[0]).toEqual({ value: 1, label: '开' })
  expect(byChoices.pair?.[1]).toEqual({ value: 0, label: '关' })

  const bySwitch = resolveEditorPlan(mkNode(true, 'boolean'), { widget: 'checkbox', switchValues: ['yes', 'no'] }, 'g')
  expect(bySwitch.pair?.[0].value).toBe('yes')
  expect(bySwitch.pair?.[1].value).toBe('no')

  // 双值选项对写 3 项会被静默忽略 → boolean 开关
  const invalid = resolveEditorPlan(mkNode(true, 'boolean'), { widget: 'checkbox', choices: [1, 0, 2] }, 'g')
  expect(invalid.pair).toBeNull()

  const plain = resolveEditorPlan(mkNode(true, 'boolean'), { widget: 'checkbox' }, 'g')
  expect(plain.pair).toBeNull()
})

test('叶子无 widget 时按值类型回落', () => {
  expect(resolveEditorPlan(mkNode('x', 'string'), undefined, 'g').inputType).toBe('text')
  expect(resolveEditorPlan(mkNode(1, 'number'), undefined, 'g').inputType).toBe('number')
  expect(resolveEditorPlan(mkNode(true, 'boolean'), undefined, 'g').kind).toBe('checkbox')
  expect(resolveEditorPlan(mkNode(new Date(), 'other'), undefined, 'g').inputType).toBe('text')
})

test('非原生属性被忽略，原生属性被透传', () => {
  const plan = resolveEditorPlan(
    mkNode(5, 'number'),
    { widget: 'number', min: 0, max: 10, step: 2, filled: true, pill: true, prefix: '$' },
    'g',
  )
  expect(plan.props).toEqual({ min: 0, max: 10, step: 2 })
})

test('候选项规范化：字符串项 value=label=自身，对象项缺省 label 取 value', () => {
  expect(normalizeChoices(['a', 2])).toEqual([
    { value: 'a', label: 'a' },
    { value: 2, label: '2' },
  ])
  expect(normalizeChoices([{ value: 1 }, 'b'])).toEqual([
    { value: 1, label: '1' },
    { value: 'b', label: 'b' },
  ])
  expect(normalizeChoices(undefined)).toEqual([])
})
