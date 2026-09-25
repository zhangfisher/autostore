import { test, expect } from 'bun:test'
import { AutoStore } from 'autostore'
import { Editable } from '../src/features/editable'
import { joinPath } from '../src/utils/joinPath'
import type { TreeNode } from '../src/types'

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
const isExpandableType = (type: TreeNode['type']) =>
  type === 'object' || type === 'array' || type === 'markRaw'
const isEditableNode = (node: TreeNode) =>
  isExpandableType(node.type)
    ? // 容器（对象/数组/markRaw）一律以 JSON 整体编辑
      true
    : node.type === 'string' || node.type === 'number' || node.type === 'boolean' || node.type === 'other'

// 构建 Editable：注入与 viewer 一致的回调，全部作用于指定树与 store
// schemas：路径 → schema 元数据；synced：退出/链式切换时的树回填路径记录
const makeEditable = (tree: TreeNode[], schemas: Record<string, any> = {}, st: any, synced: string[][] = []) => {
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
  const getStateByPath = (path: string[]): any => {
    let obj: any = st.state
    for (const p of path) obj = obj?.[p]
    return obj
  }
  return new Editable({
    requestUpdate: () => {},
    getStateByPath,
    getStore: () => st,
    findNextEditable: findNext,
    findNodeByPath: getNode,
    getSchemaByPath: (path) => schemas[joinPath(path)],
    syncNode: (path) => synced.push([...path]),
    getEditInput: () => null,
  })
}

// 叶子编辑测试工厂：每个测试独立 store，避免即时写入互相污染
const makeUser = (schemas: Record<string, any> = {}, synced: string[][] = []) => {
  const st = new AutoStore({ user: { firstName: '张', lastName: '三', age: 25, isActive: true } })
  const tree = [
    mkNode('user', ['user'], st.state.user, 'object'),
  ]
  tree[0].children = [
    mkNode('firstName', ['user', 'firstName'], st.state.user.firstName, 'string'),
    mkNode('lastName', ['user', 'lastName'], st.state.user.lastName, 'string'),
    mkNode('age', ['user', 'age'], st.state.user.age, 'number'),
    mkNode('isActive', ['user', 'isActive'], st.state.user.isActive, 'boolean'),
  ]
  return { st, tree, nodes: tree[0].children, editable: makeEditable(tree, schemas, st, synced) }
}

// 模拟键盘事件
const keyEvent = (key: string, opts: Partial<KeyboardEvent> = {}) =>
  ({ key, keyCode: key.charCodeAt(0), ...opts }) as KeyboardEvent

// ---------- 即时生效 ----------

test('setValue 即时写入 store（无需确认）', () => {
  const { st, nodes, editable } = makeUser()
  editable.start(nodes[1])
  editable.setValue('李')
  expect(st.state.user.lastName).toBe('李')
  expect(editable.editingPath).toEqual(['user', 'lastName'])
  editable.exit()
})

test('写入按进入编辑前快照的类型转换（不受编辑期间外部类型更新影响）', () => {
  const { st, nodes, editable } = makeUser()
  const age = nodes[2]
  editable.start(age)
  expect(editable.editType).toBe('number')
  // 模拟编辑期间外部（如 watch 回调）篡改节点类型
  const originalType = age.type
  age.type = 'string'
  editable.setValue('99')
  expect(st.state.user.age).toBe(99)
  expect(typeof st.state.user.age).toBe('number')
  age.type = originalType
  editable.exit()
})

test('进入编辑未改动不写入，失焦退出并回填树', () => {
  const synced: string[][] = []
  const { st, nodes, editable } = makeUser({}, synced)
  editable.start(nodes[0])
  editable.onBlur(nodes[0])
  expect(st.state.user.firstName).toBe('张')
  expect(editable.editingPath).toBeNull()
  // 退出时回填该节点的树
  expect(synced).toEqual([['user', 'firstName']])
})

test('Enter 链式前进到同级下一个可编辑节点（前进前回填上一节点）', () => {
  const synced: string[][] = []
  const { nodes, editable } = makeUser({}, synced)
  editable.start(nodes[0])
  editable.onEditorKeydown(keyEvent('Enter'))
  expect(editable.editingPath).toEqual(['user', 'lastName'])
  // 链式切换回填了上一节点
  expect(synced).toEqual([['user', 'firstName']])
  editable.exit()
})

test('末尾节点按 Enter 不前进且保持编辑', () => {
  const { st, nodes, editable } = makeUser()
  editable.start(nodes[3])
  editable.setValue(false)
  expect(st.state.user.isActive).toBe(false)
  editable.onEditorKeydown(keyEvent('Enter'))
  expect(editable.editingPath).toEqual(['user', 'isActive'])
  editable.exit()
})

test('Esc 不拦截（即时模式无取消语义）', () => {
  const { st, nodes, editable } = makeUser()
  editable.start(nodes[2])
  editable.setValue(30)
  editable.onEditorKeydown(keyEvent('Escape'))
  expect(editable.editingPath).toEqual(['user', 'age'])
  expect(st.state.user.age).toBe(30)
  editable.exit()
})

test('输入法组合态的 Enter 不触发链式前进', () => {
  const { nodes, editable } = makeUser()
  editable.start(nodes[0])
  // IME 组合态：isComposing=true 或 keyCode=229（Safari）
  editable.onEditorKeydown(keyEvent('Enter', { isComposing: true }))
  expect(editable.editingPath).toEqual(['user', 'firstName'])
  editable.onEditorKeydown(keyEvent('Enter', { keyCode: 229 }))
  expect(editable.editingPath).toEqual(['user', 'firstName'])
  editable.exit()
})

test('滞后 blur 不清掉 Enter 链式切换后的新编辑状态', () => {
  const { nodes, editable } = makeUser()
  editable.start(nodes[0])
  editable.onEditorKeydown(keyEvent('Enter'))
  // Enter 已切换到 lastName，此后旧 input(firstName) 的滞后 blur 到达
  editable.onBlur(nodes[0])
  expect(editable.editingPath).toEqual(['user', 'lastName'])
  editable.exit()
})

// ---------- 即时校验 ----------

test('required 空值：不写入并实时显示错误', () => {
  const { st, nodes, editable } = makeUser({ 'user.firstName': { required: true } })
  editable.start(nodes[0])
  editable.setValue('')
  expect(editable.editError).toBe('此项必填')
  expect(st.state.user.firstName).toBe('张')
  expect(editable.editingPath).toEqual(['user', 'firstName'])
  editable.exit()
})

test('值修正后自动写入并隐藏错误', () => {
  const { st, nodes, editable } = makeUser({ 'user.firstName': { required: true } })
  editable.start(nodes[0])
  editable.setValue('')
  expect(editable.editError).toBe('此项必填')
  editable.setValue('王')
  expect(editable.editError).toBeNull()
  expect(st.state.user.firstName).toBe('王')
  editable.exit()
})

test('当前值无效时 Enter 不前进', () => {
  const { nodes, editable } = makeUser({ 'user.firstName': { required: true } })
  editable.start(nodes[0])
  editable.setValue('')
  editable.onEditorKeydown(keyEvent('Enter'))
  expect(editable.editingPath).toEqual(['user', 'firstName'])
  expect(editable.editError).toBe('此项必填')
  editable.exit()
})

test('无效值失焦直接退出编辑（值未写入）', () => {
  const { st, nodes, editable } = makeUser({ 'user.firstName': { required: true } })
  editable.start(nodes[0])
  editable.setValue('')
  editable.onBlur(nodes[0])
  expect(editable.editingPath).toBeNull()
  expect(st.state.user.firstName).toBe('张')
})

test('validate 返回 false 时不写入并使用 errorMessage 插值', () => {
  const { st, nodes, editable } = makeUser({
    'user.firstName': {
      label: '名字',
      validate: () => false,
      errorMessage: '{label}无效：{value}',
    },
  })
  editable.start(nodes[0])
  editable.setValue('王')
  expect(editable.editError).toBe('名字无效：王')
  expect(st.state.user.firstName).toBe('张')
  editable.exit()
})

test('validate 抛错时 message 优先于 errorMessage', () => {
  const { st, nodes, editable } = makeUser({
    'user.firstName': {
      validate: () => {
        throw new Error('名字太短')
      },
      errorMessage: '此字段无效',
    },
  })
  editable.start(nodes[0])
  editable.setValue('王')
  expect(editable.editError).toBe('名字太短')
  expect(st.state.user.firstName).toBe('张')
  editable.exit()
})

test('validate 校验的是转换后的值（number 文本输入）', () => {
  const { st, nodes, editable } = makeUser({
    'user.age': { validate: (v: any) => v > 10 },
  })
  editable.start(nodes[2])
  editable.setValue('5')
  expect(editable.editError).toBe('值无效')
  expect(st.state.user.age).toBe(25)
  editable.setValue('99')
  expect(editable.editError).toBeNull()
  expect(st.state.user.age).toBe(99)
  editable.exit()
})

// ---------- select/checkbox 值语义 ----------

test('select 编辑采用候选项原值即时写回（类型不变）', () => {
  const { st, nodes, editable } = makeUser({
    'user.age': {
      widget: 'select',
      choices: [
        { label: '青年', value: 18 },
        { label: '中年', value: 40 },
      ],
    },
  })
  editable.start(nodes[2])
  expect(editable.editPlan?.kind).toBe('select')
  editable.setValue(40)
  expect(st.state.user.age).toBe(40)
  expect(typeof st.state.user.age).toBe('number')
  editable.exit()
})

test('checkbox 双值档位按勾选态即时写回对应 value', () => {
  const { st, nodes, editable } = makeUser({
    'user.isActive': {
      widget: 'checkbox',
      choices: [
        { label: '启用', value: 'on' },
        { label: '停用', value: 'off' },
      ],
    },
  })
  editable.start(nodes[3])
  expect(editable.editPlan?.pair?.[0].value).toBe('on')
  editable.setValue('off')
  expect(st.state.user.isActive).toBe('off')
  editable.exit()
})

// ---------- 对象/数组整体编辑（JSON 即时生效） ----------

// 每个整体编辑测试独立 store，避免写回互相污染
const makeCfg = () => {
  const st = new AutoStore({ cfg: { a: 1, b: 'x' } })
  const tree = [mkNode('cfg', ['cfg'], st.state.cfg, 'object')]
  return { st, tree, node: tree[0] }
}

test('进入编辑时整体编辑方案为 JSON 模式并快照原值', () => {
  const { st, tree, node } = makeCfg()
  const editable = makeEditable(tree, {}, st)
  editable.start(node)
  expect(editable.editPlan?.kind).toBe('textarea')
  expect(editable.editPlan?.jsonMode).toBe(true)
  // JSON 序列化已迁至 widgets/textarea（以快照值为基准）
  expect(editable.editOldValue).toEqual({ a: 1, b: 'x' })
})

test('整体编辑输入合法 JSON 即整体替换写回', () => {
  const { st, tree, node } = makeCfg()
  const editable = makeEditable(tree, {}, st)
  editable.start(node)
  editable.setValue('{"a":2,"b":"y","c":true}')
  expect(st.state.cfg).toEqual({ a: 2, b: 'y', c: true })
  expect(editable.editError).toBeNull()
})

test('整体编辑解析失败时不写入并实时报错', () => {
  const { st, tree, node } = makeCfg()
  const editable = makeEditable(tree, {}, st)
  editable.start(node)
  editable.setValue('{bad json')
  expect(editable.editError).toBe('无效的 JSON')
  expect(st.state.cfg).toEqual({ a: 1, b: 'x' })
  expect(editable.editingPath).toEqual(['cfg'])
})

test('整体编辑类型不符报错（对象节点解析出数组）', () => {
  const { st, tree, node } = makeCfg()
  const editable = makeEditable(tree, {}, st)
  editable.start(node)
  editable.setValue('[1,2]')
  expect(editable.editError).toBe('值类型不匹配')
  expect(st.state.cfg).toEqual({ a: 1, b: 'x' })
})

test('整体编辑 required 空文本在解析前报必填', () => {
  const { st, tree, node } = makeCfg()
  const editable = makeEditable(tree, { cfg: { required: true } }, st)
  editable.start(node)
  editable.setValue('')
  expect(editable.editError).toBe('此项必填')
})

test('textarea 的 Enter 是换行不触发链式前进', () => {
  const { st, tree, node } = makeCfg()
  const editable = makeEditable(tree, {}, st)
  editable.start(node)
  editable.onEditorKeydown(keyEvent('Enter'))
  expect(editable.editingPath).toEqual(['cfg'])
  editable.exit()
})
