import { test, expect } from 'bun:test'
import { computeValueError, convertValue, interpolateError, findItemRule } from '../src/utils/value-io'
import { resolveEditorPlan } from '../src/features/edit-plan'
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

// —— 容器整体编辑的文本形态钩子（toInput/toState）与子项校验回溯（itemValidate），ADR-0027 追加 ——

test('convertValue：jsonMode 经 schema.toState 自定义解析，无 toState 走 JSON.parse', () => {
  const node = mkNode([], 'array')
  const plan = planOf(undefined, node)
  plan.jsonMode = true
  const schema = { toState: (t: string) => t.split(/[\s,;]+/).filter(Boolean) }
  expect(convertValue('8.8.8.8 114.114.114.114', 'array', plan, schema)).toEqual(['8.8.8.8', '114.114.114.114'])
  expect(convertValue('["a","b"]', 'array', plan)).toEqual(['a', 'b'])
})

test('computeValueError：jsonMode toState 抛错显示 message，产物跳过类型比对交 validate 把关', () => {
  const node = mkNode([], 'array')
  const plan = planOf(undefined, node)
  plan.jsonMode = true
  const schema = {
    toState: (t: string) => {
      if (t === 'boom') throw new Error('无法解析')
      return t.split(',')
    },
    validate: (v: any) => Array.isArray(v) && v.every((i: string) => /^\d+\.\d+\.\d+\.\d+$/.test(i)),
    errorMessage: 'IP 无效',
  }
  expect(computeValueError({ raw: 'boom', schema, plan, valueType: 'array', oldValue: [], path: ['dns'] })).toBe('无法解析')
  expect(computeValueError({ raw: '1.1.1.1,2.2.2.2', schema, plan, valueType: 'array', oldValue: [], path: ['dns'] })).toBeNull()
  expect(computeValueError({ raw: '1.1.1.1,xyz', schema, plan, valueType: 'array', oldValue: [], path: ['dns'] })).toBe('IP 无效')
})

test('computeValueError：itemRule 逐项校验拒绝/通过/抛错', () => {
  const node = mkNode('8.8.8.8', 'string')
  const plan = planOf('text', node)
  const itemRule = { validate: (item: any) => /^\d+\.\d+\.\d+\.\d+$/.test(item), errorMessage: '{label}须为合法 IP', label: 'DNS' }
  const ctx = (raw: any) => ({ raw, plan, valueType: 'string' as const, oldValue: 'x', path: ['network', 'dns', 0], itemRule })
  expect(computeValueError(ctx('999.1.1.1'))).toBeNull()
  expect(computeValueError(ctx('bad'))).toBe('DNS须为合法 IP')
  expect(computeValueError({ ...ctx('x'), itemRule: { validate: () => { throw new Error('不合法项') } } })).toBe('不合法项')
})

test('findItemRule：父级命中 / 更远祖先命中 / 仅整体 validate 不命中 / 无规则', () => {
  const IPV4 = { itemValidate: (i: any) => typeof i === 'string' && /^\d+\./.test(i), errorMessage: 'IP 无效', label: 'DNS' }
  const schemas: Record<string, any> = {
    'network.dns': IPV4,
    net: {},
  }
  const get = (p: string[]) => schemas[p.join('.')]
  expect(findItemRule(['network', 'dns', 0], get)?.label).toBe('DNS')
  expect(findItemRule(['network', 'dns', 0, 'x'], get)?.label).toBe('DNS')
  // 祖先只有整体 validate（无 itemValidate）：不拦子项
  const onlyValidate = { 'grp': { validate: () => true } }
  expect(findItemRule(['grp', 0], (p) => onlyValidate[p.join('.')])).toBeNull()
  expect(findItemRule(['a', 'b', 'c'], () => undefined)).toBeNull()
})
