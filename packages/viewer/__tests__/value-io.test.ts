import { test, expect } from 'bun:test'
import { computeValueError, convertValue, interpolateError } from '../src/utils/value-io'
import { resolveEditorPlan } from '../src/edit-plan'
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

const planOf = (widget: string | undefined, node: TreeNode, schema: Record<string, any> = {}) =>
  resolveEditorPlan(node, { ...(widget ? { widget } : {}), ...schema }, 'g')

test('computeValueError：required 空值与 validate 链', () => {
  const node = mkNode('x', 'string')
  const plan = planOf('text', node)
  expect(computeValueError({ raw: '', schema: { required: true }, plan, valueType: 'string', oldValue: 'x', path: ['v'] })).toBe('此项必填')
  expect(
    computeValueError({
      raw: 'abc',
      schema: { label: '名字', validate: (v: any) => v.length > 5, errorMessage: '{label}至少6个字符' },
      plan,
      valueType: 'string',
      oldValue: 'x',
      path: ['v'],
    }),
  ).toBe('名字至少6个字符')
  expect(
    computeValueError({ raw: 'abcdef', schema: { validate: () => true }, plan, valueType: 'string', oldValue: 'x', path: ['v'] }),
  ).toBeNull()
})

test('computeValueError：JSON 整体编辑的解析与类型校验', () => {
  const node = mkNode({}, 'object')
  const plan = planOf(undefined, node)
  plan.jsonMode = true
  expect(computeValueError({ raw: '{bad', schema: {}, plan, valueType: 'object', oldValue: {}, path: ['v'] })).toBe('无效的 JSON')
  expect(computeValueError({ raw: '[1]', schema: {}, plan, valueType: 'object', oldValue: {}, path: ['v'] })).toBe('值类型不匹配')
  expect(computeValueError({ raw: '{"a":1}', schema: {}, plan, valueType: 'object', oldValue: {}, path: ['v'] })).toBeNull()
})

test('computeValueError：validate 抛错 message 优先于 errorMessage', () => {
  const node = mkNode('x', 'string')
  const plan = planOf('text', node)
  const error = computeValueError({
    raw: 'x',
    schema: { validate: () => { throw new Error('太短') }, errorMessage: '兜底文案' },
    plan,
    valueType: 'string',
    oldValue: 'x',
    path: ['v'],
  })
  expect(error).toBe('太短')
})

test('convertValue：number 类型锚转换，其余原样', () => {
  const textNode = mkNode('99', 'number')
  expect(convertValue('99', 'number', planOf('text', textNode))).toBe(99)
  expect(convertValue('abc', 'string', planOf('text', mkNode('abc', 'string')))).toBe('abc')
  // select/radio/checkbox 的值已是原类型，不做数字转换
  const checkboxNode = mkNode('on', 'string')
  expect(convertValue('on', 'string', planOf('checkbox', checkboxNode))).toBe('on')
})

test('interpolateError：{label}/{value}/{path} 插值', () => {
  expect(interpolateError('{label}无效：{value}（{path}）', { label: '名字' }, '王', ['user', 'name'])).toBe(
    '名字无效：王（user.name）',
  )
  expect(interpolateError(undefined, {}, '', [])).toBeUndefined()
})
