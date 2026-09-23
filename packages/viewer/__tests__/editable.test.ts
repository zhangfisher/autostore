import { test, expect } from 'bun:test'
import { AutoStore } from 'autostore'
import { Editable } from '../src/editable'
import type { TreeNode } from '../src/types'

// 构造 store
const store = new AutoStore({
  user: {
    firstName: '张',
    lastName: '三',
    age: 25,
    isActive: true,
  },
})

// 按路径读取 state 值（复刻 viewer 实现）
const getStateByPath = (path: string[]): any => {
  let obj: any = store.state
  for (const p of path) obj = obj?.[p]
  return obj
}

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

const userChildren = [
  mkNode('firstName', ['user', 'firstName'], '张', 'string'),
  mkNode('lastName', ['user', 'lastName'], '三', 'string'),
  mkNode('age', ['user', 'age'], 25, 'number'),
  mkNode('isActive', ['user', 'isActive'], true, 'boolean'),
]
const treeNodes = [mkNode('user', ['user'], {}, 'object')]
treeNodes[0].children = userChildren

// 复刻 viewer 的类型判定
const isExpandableType = (type: TreeNode['type']) =>
  type === 'object' || type === 'array' || type === 'markRaw'
const isEditableNode = (node: TreeNode) =>
  !isExpandableType(node.type) &&
  (node.type === 'string' || node.type === 'number' || node.type === 'boolean' || node.type === 'other')

// 构建 Editable：注入与 viewer 一致的回调，全部作用于指定树
const makeEditable = (tree: TreeNode[]) => {
  const getNode = (path: string[]): TreeNode | null => {
    let nodes = tree
    let found: TreeNode | null = null
    for (const p of path) {
      found = nodes.find((n) => String(n.key) === p) ?? null
      if (!found) return null
      nodes = found.children
    }
    return found
  }
  const findNext = (node: TreeNode): TreeNode | null => {
    let siblings = tree
    if (node.path.length > 0) {
      const parent = getNode(node.path.slice(0, -1))
      if (!parent) return null
      siblings = parent.children
    }
    const idx = siblings.indexOf(node)
    for (let i = idx + 1; i < siblings.length; i++) {
      if (isEditableNode(siblings[i])) return siblings[i]
    }
    return null
  }
  return new Editable(
    { requestUpdate: () => {} },
    getStateByPath,
    () => store,
    findNext,
    getNode,
  )
}

const editable = makeEditable(treeNodes)

// 模拟键盘事件
const keyEvent = (key: string, opts: Partial<KeyboardEvent> = {}) =>
  ({ key, keyCode: key.charCodeAt(0), ...opts }) as KeyboardEvent

test('进入编辑后按 Enter 确认并跳转到同级下一个可编辑节点', () => {
  const firstName = userChildren[0]
  editable.start(firstName)
  expect(editable.editingPath).toEqual(['user', 'firstName'])

  editable.onEditorKeydown(keyEvent('Enter'))
  expect(store.state.user.firstName).toBe('张')
  expect(editable.editingPath).toEqual(['user', 'lastName'])
})

test('编辑值随 Enter 写回 store 后链式前进', () => {
  const lastName = userChildren[1]
  editable.start(lastName)
  editable.editValue = '李'
  editable.onEditorKeydown(keyEvent('Enter'))
  expect(store.state.user.lastName).toBe('李')
  expect(editable.editingPath).toEqual(['user', 'age'])
})

test('回写时按进入编辑前快照的类型转换（不受编辑期间外部类型更新影响）', () => {
  const age = userChildren[2]
  editable.start(age)
  expect(editable.editType).toBe('number')
  // 模拟编辑期间外部（如 watch 回调）篡改节点类型
  const originalType = age.type
  age.type = 'string'
  editable.editValue = '99'
  editable.onEditorKeydown(keyEvent('Enter'))
  expect(store.state.user.age).toBe(99)
  expect(typeof store.state.user.age).toBe('number')
  age.type = originalType
})

test('checkbox 编辑器按 Enter 同样写回并跳转到下一个可编辑节点', () => {
  // 独立构建 boolean 后跟可编辑节点的树
  const children = [
    mkNode('enabled', ['cfg', 'enabled'], true, 'boolean'),
    mkNode('label', ['cfg', 'label'], '开关', 'string'),
  ]
  const tree = [mkNode('cfg', ['cfg'], {}, 'object')]
  tree[0].children = children
  const editable2 = makeEditable(tree)

  editable2.start(children[0])
  expect(editable2.editingPath).toEqual(['cfg', 'enabled'])
  // checkbox change 事件写入的临时值
  editable2.editValue = false
  editable2.onEditorKeydown(keyEvent('Enter'))
  expect(editable2.editingPath).toEqual(['cfg', 'label'])
  expect(children[1].value).toBe('开关')
})

test('末尾节点按 Enter 写回后退出编辑（不循环）', () => {
  const isActive = userChildren[3]
  editable.start(isActive)
  editable.editValue = false
  editable.onEditorKeydown(keyEvent('Enter'))
  expect(store.state.user.isActive).toBe(false)
  expect(editable.editingPath).toBeNull()
})

test('Esc 取消编辑不保存', () => {
  const age = userChildren[2]
  editable.start(age)
  editable.editValue = '99'
  editable.onEditorKeydown(keyEvent('Escape'))
  expect(store.state.user.age).toBe(99)
  expect(editable.editingPath).toBeNull()
})

test('当前编辑节点失焦时退出编辑且不保存', () => {
  const firstName = userChildren[0]
  editable.start(firstName)
  editable.editValue = '王'
  editable.onBlur(firstName)
  expect(store.state.user.firstName).toBe('张')
  expect(editable.editingPath).toBeNull()
})

test('滞后 blur 不清掉 Enter 链式切换后的新编辑状态', () => {
  const firstName = userChildren[0]
  editable.start(firstName)
  editable.onEditorKeydown(keyEvent('Enter'))
  // Enter 已切换到 lastName，此后旧 input(firstName) 的滞后 blur 到达
  editable.onBlur(firstName)
  expect(editable.editingPath).toEqual(['user', 'lastName'])
  editable.cancel()
})

test('输入法组合态的 Enter 不触发确认与跳转', () => {
  const firstName = userChildren[0]
  editable.start(firstName)
  editable.editValue = '王'
  // IME 组合态：isComposing=true 或 keyCode=229（Safari）
  editable.onEditorKeydown(keyEvent('Enter', { isComposing: true }))
  expect(store.state.user.firstName).toBe('张')
  expect(editable.editingPath).toEqual(['user', 'firstName'])
  editable.onEditorKeydown(keyEvent('Enter', { keyCode: 229 }))
  expect(store.state.user.firstName).toBe('张')
  expect(editable.editingPath).toEqual(['user', 'firstName'])
  editable.cancel()
})
