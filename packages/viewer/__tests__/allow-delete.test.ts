import { test, expect } from 'bun:test'
import { AutoStore } from 'autostore'
import { deleteNodeValue } from '../src/utils/deleteNodeValue'

test('对象父容器删除后属性移除且广播 delete 操作', () => {
  const store = new AutoStore({ user: { name: '张', age: 25 } })
  const deletes: string[][] = []
  store.watch('user.**', (op: any) => {
    if (op.type === 'delete') deletes.push(op.path)
  })
  deleteNodeValue(store.state.user, 'age')
  expect('age' in (store.state.user as any)).toBe(false)
  expect(deletes).toEqual([['user', 'age']])
})

test('数组父容器删除后无空洞且后续元素前移', () => {
  const store = new AutoStore({ list: ['a', 'b', 'c'] })
  deleteNodeValue(store.state.list, 1)
  const list = [...(store.state.list as any)] as string[]
  expect(list).toEqual(['a', 'c'])
  // 无稀疏空洞：索引连续
  expect(Object.keys(store.state.list as any).filter((k) => k !== 'length')).toEqual(['0', '1'])
})

test('数组删除聚合为单条 remove 操作（树同步依赖的载荷契约）', () => {
  const store = new AutoStore({ list: ['a', 'b', 'c', 'd'] })
  const ops: any[] = []
  store.watch('*', (op: any) => ops.push(op))
  deleteNodeValue(store.state.list, 1)
  // splice 聚合为一条 remove：path 为数组自身路径，value 是被删元素，indexs 为被删索引
  // viewer 的 _watchStore 据此从 state 读真值重建该容器子树
  expect(ops).toHaveLength(1)
  expect(ops[0].type).toBe('remove')
  expect(ops[0].path).toEqual(['list'])
  expect(ops[0].value).toEqual(['b'])
  expect(ops[0].indexs).toEqual([1])
})
