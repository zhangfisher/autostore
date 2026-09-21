# 浅响应（Shallow）

## 引言

`AutoStore` 会为状态树中的每个嵌套对象创建深度代理，这在提供细粒度响应能力的同时也带来了开销。当某个值是一个**大型数组或大对象**（如上万条记录的列表）时，深度代理的创建与遍历成本会成为性能瓶颈。

`shallow` 用来将一个对象标记为**浅响应**：该对象进入状态树后**仅创建一层浅代理**——顶层的读写与数组操作照常产生事件，但其属性值**不再递归代理**，读出即为原始引用。

:::tip 与 markRaw 的区别
- `shallow(obj)`：**浅代理**——顶层仍有代理与事件，仅不再深入
- `markRaw(obj)`：**完全不代理**——整个对象脱离响应式系统
:::

## 指南

### 基本用法

```ts
import { shallow } from 'autostore'

const store = new AutoStore({
    a: shallow({
        b: 1,
        c: { c1: 1 },
    }),
    x: [1, 2, 3],
})
```

上述状态的代理行为如下：

| 访问路径 | 代理 | 读取事件 | 说明 |
| --- | --- | --- | --- |
| `store.state.a` | ✅ 浅代理 | ✅ 有 | 被标记对象本身 |
| `store.state.a.b` | 标量 | ✅ 有 | 浅代理的直接子值照常产生事件 |
| `store.state.a.c` | ❌ 原始引用 | ✅ 有 | 读出的是原始对象，不再包装 |
| `store.state.a.c.c1` | ❌ | ❌ 无 | 已脱离代理体系 |
| `store.state.x[1]` | ✅ | ✅ 有 | 标记仅作用于被标记对象，其他路径不受影响 |

### deep 参数：向下多代理一层

默认（`deep=0`）成员读出即原始引用，无法订阅行内字段。若需要**成员级的细粒度订阅**，
可传入 `deep: 1`（仅 0|1 两档）——成员也获得一层浅代理，但**孙级及以下读出即原始引用**：

```ts
const store = new AutoStore({
    items: shallow(
        [
            { id: 1, meta: { x: 1 } },
            { id: 2, meta: { x: 2 } },
        ],
        1,
    ),
})
```

| 访问路径 | 代理 | 说明 |
| --- | --- | --- |
| `store.state.items` | ✅ 浅代理 | 根对象，push/pop 照常产生 insert/remove |
| `store.state.items[0]` | ✅ 浅代理 | 成员被代理——`deep=1` 的增量 |
| `store.state.items[0].id` | 标量 | ✅ 有事件，可订阅 `$('items.0.id')`、可建计算属性 |
| `store.state.items[0].meta` | ❌ 原始引用 | 孙级，读出即 raw |
| `store.state.items[0].meta.x` | ❌ | 静默修改，无事件 |

关于 `deep=1` 的行为细节：

- **对称性**：「成员」指距根恰好一跳的属性/索引。数组根代理元素；对象根的数组成员
  （`shallow({ list: [...] }, 1)`）代理 `list` 本身，其元素属孙级、仍为 raw。
- **动态成员**：之后 `push`/整体赋值进来的新成员，在首次经代理读取时自动纳管，与既有成员行为一致。
- **运行时归一**：JS 调用传 `deep>0` 的任意值一律按 1 处理（`shallow(obj, 2)` 等价 `shallow(obj, 1)`）。

### 事件行为

浅代理的**写事件完整保留**，这是它相对 `markRaw` 的核心价值：

```ts
// 监听浅数组的变化: push/splice 等操作照常产生 insert/remove 事件
store.watch('items', (e) => {
    console.log(e.type) // insert / remove / update
})

store.state.items.push({ id: 1 }) // ✅ 触发 insert
```

:::warning 重要取舍
从浅对象读出的嵌套对象是**原始引用**，直接修改它**不会产生任何事件**，也不会触发组件更新：

```ts
store.state.items[0].name = 'x' // ⚠️ 静默修改，无事件（deep=0 时成员为原始引用）
store.state.items = [...]       // ✅ 整体替换，触发 set
```

需要响应内部变化时，请整体替换该属性，改用 `deep: 1`（订阅成员字段），或对该对象不使用 `shallow`。同理，`deep=0` 时 React 中订阅浅对象内部路径（如 `$('items.0.name')`）将不会触发更新，请订阅被标记路径本身（`$('items')`）——`deep=1` 时订阅到成员层（`$('items.0.name')`）则可正常触发。
:::

### 浅对象内的计算属性

函数值属性按正常逻辑处理，浅对象内依然可以定义计算属性：

```ts
const store = new AutoStore({
    a: shallow({
        price: 10,
        count: 2,
        total: (scope) => scope.price * scope.count,
    }),
})
store.state.a.total // 20
store.state.a.price = 100
store.state.a.total // 200，依赖变化照常重算
```

### 判别与边界

```ts
import { shallow, isShallow } from 'autostore'

isShallow(shallow({})) // true
isShallow(shallow({}, 1)) // true —— deep 档位不影响浅响应判别
isShallow({}) // false

shallow(null) // 安全: 原样返回，不做标记
shallow(1) // 安全: 原样返回
shallow(shallow({})) // 幂等
```

标记通过内部 `Symbol` 键挂在对象上，不会出现在 `JSON.stringify`、`Object.keys` 与遍历结果中。

## 适用场景

- 大型列表数据（虚拟滚动、表格数据源）：只需监听增删改整行，无需行内字段级响应
- 需要行内字段级订阅/计算属性、但行内嵌套对象无需响应的大型列表——`deep: 1`
- 高频读写的批量数据缓存
- 从服务端拉取、整体替换、只读展示的数据块
