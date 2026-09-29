import { test, expect } from 'bun:test'
import { EditDelegateController } from '../src/features/edit-delegate'
import type { EditDelegateHost } from '../src/features/edit-delegate'
import type { TreeNode, TreeNodeType } from '../src/types'

// 无 DOM 环境垫片：_onInput 的 target instanceof Element 判定
;(globalThis as any).Element = (globalThis as any).Element ?? class Element {}

// 手工构建树节点（复刻 _buildNodes 结构）
const mkNode = (key: string | number, path: string[], value: any, type: TreeNode['type']): TreeNode => ({
  key,
  value,
  type,
  expanded: false,
  childCount: 0,
  path,
  children: [],
})

// 复刻 viewer 的类型判定
const isExpandableType = (type: TreeNodeType) => type === 'object' || type === 'array' || type === 'markRaw'
const isEditableNode = (node: TreeNode) =>
  isExpandableType(node.type)
    ? true
    : node.type === 'string' || node.type === 'number' || node.type === 'boolean' || node.type === 'other'

// 构建委托控制器：树节点查找与写回全部作用于指定 state 对象
const makeController = (tree: TreeNode[], state: Record<string, any>) => {
  const getNodeByPath = (path: string[]): TreeNode | null => {
    let nodes = tree
    let found: TreeNode | null = null
    for (const p of path) {
      found = nodes.find((n) => String(n.key) === p) ?? null
      if (!found) return null
      nodes = found.children
    }
    return found
  }
  const host: EditDelegateHost = {
    requestUpdate: () => {},
    mode: 'edit',
    getNodeByPath,
    getSchemaByPath: () => undefined,
    getStateByPath: (p) => p.reduce((o, k) => o?.[k], state),
    getParent: (p) => p.slice(0, -1).reduce((o, k) => o?.[k], state),
    isExpandableType,
    isEditableNode,
    getEditControls: () => [],
  }
  return new EditDelegateController(host)
}

// 伪造 input 控件事件（row 路径经 closest('.tree-node') 提供）
const inputEvent = (rowPath: string, value: string) => {
  const row = new (globalThis as any).Element()
  row.dataset = { path: rowPath }
  const el = new (globalThis as any).Element()
  el.closest = () => row
  el.value = value
  return { target: el } as unknown as Event
}

// 等到微任务队列清空（自写回标记的兜底清除时机）
const flushMicrotasks = () => new Promise<void>((r) => queueMicrotask(() => queueMicrotask(r)))

test('委托写回打自写回标记：回声命中消费，计数一一对应', () => {
  const state = { name: '张三' }
  const tree = [mkNode('name', ['name'], '张三', 'string')]
  const c = makeController(tree, state)

  ;(c as any)._onInput(inputEvent('name', '李四'))
  expect(state.name).toBe('李四')

  // 第一次回声：命中并冻结（防光标重置）
  expect(c.consumeSelfWrite(['name'])).toBe(true)
  // 消费即清：多余回声不得误吞后续外部更新
  expect(c.consumeSelfWrite(['name'])).toBe(false)
})

test('外部写入无标记：consumeSelfWrite 恒 false，宿主照常同步', () => {
  const state = { name: '张三' }
  const tree = [mkNode('name', ['name'], '张三', 'string')]
  const c = makeController(tree, state)

  expect(c.consumeSelfWrite(['name'])).toBe(false)
})

test('同值写入：微任务兜底清除残留标记，不误吞下一次外部更新', async () => {
  const state = { name: '张三' }
  const tree = [mkNode('name', ['name'], '张三', 'string')]
  const c = makeController(tree, state)

  // 同值写回（store 可能不派发 operate），标记已打但回声未来
  ;(c as any)._onInput(inputEvent('name', '张三'))
  await flushMicrotasks()
  expect(c.consumeSelfWrite(['name'])).toBe(false)
})

test('clearErrors：常驻错误与自写回标记一并清空', () => {
  const state = { name: '张三' }
  const tree = [mkNode('name', ['name'], '张三', 'string')]
  const c = makeController(tree, state)

  ;(c as any)._selfWrites.set('name', 2)
  ;(c as any)._inlineErrors.set('name', '必填')
  c.clearErrors()
  expect(c.getInlineError(['name'])).toBeNull()
  expect(c.consumeSelfWrite(['name'])).toBe(false)
})
