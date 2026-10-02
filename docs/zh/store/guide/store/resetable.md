# 重置状态（Resetable）

## 引言

调试、表单回退、"撤销到初始值"这类需求，都要求状态能回到某个干净起点。

`resetable` 提供这个能力：当某条路径**第一次发生变化**时，`AutoStore` 记下那一刻的值作为该路径的**基线**，之后调用 `reset()` 即可把状态还原到基线。

需要先明确一点，它还原的是**基线快照**，而不是"把操作倒着做一遍"。这两者在多数时候结果相同，但一旦状态被反复改动就会分道扬镳：

```ts
const store = new AutoStore({ list: [1, 2, 3] }, { resetable: true });

store.state.list.push(4);
store.state.list.pop();
store.state.list.pop();

store.state.list; // [1, 2]      —— 逆放会停在这里
store.reset();
store.state.list; // [1, 2, 3]   —— 基线是"首次变脏前"，即最初那个数组
```

`resetable` **默认为 `false`**——不启用时完全不会挂载采集回调，零开销。需要回滚能力的场景（表单回退、开发调试、测试隔离）显式开启：

```ts
const store = new AutoStore(state, { resetable: true }); // 或 store.resetable = true
```

## 指南

### 基本用法

```ts
const store = new AutoStore(
    {
        count: 0,
        user: { name: "张三", tags: ["a"] },
    },
    { resetable: true },
);

store.state.count = 10;
store.state.user.name = "李四";
store.state.user.tags.push("b");

store.reset(); // count=0, user={name:"张三", tags:["a"]}
```

也可以只还原某条路径及其后代：

```ts
store.reset("user"); // 只还原 user，count 保持不变
```

`entry` 是**精确路径**匹配，不会误伤同前缀的兄弟路径：

```ts
const store = new AutoStore(
    { user: { n: 1 }, username: "abc" },
    { resetable: true },
);

store.state.user.n = 99;
store.state.username = "xyz";

store.reset("user"); // user.n 回到 1，username 仍是 "xyz"
```

### 键的存在性

基线记录的是"这一刻这条路径长什么样"，而不只是"它的值是多少"。因此键的**出现与消失**也能被正确还原：

```ts
const store = new AutoStore({ a: 1, u: undefined }, { resetable: true });

store.state.added = 5;   // 新增键
delete store.state.a;    // 删除键

store.reset();
// a        → 1        （恢复被删的键）
// added    → 已消失   （撤销新增）
// u        → undefined （原本存在但值为 undefined，不会被误删）
```

> `u` 这一条是关键：`added` 和 `u` 还原前的值都是 `undefined`，但语义完全相反。只记录值的实现无法区分二者。

键名本身含 `.` 时也能正确还原，内部按转义路径编码，不会把一个键拆成两级。

### 数组

数组的全部常规变更都能还原到基线形态：

| 操作 | 还原结果 |
| --- | --- |
| `push` / `pop` | ✅ |
| `shift` / `unshift` | ✅ |
| `splice`（删除 / 插入 / 替换） | ✅ |
| `fill` | ✅ |
| `sort` / `reverse` | ✅ |
| 单下标赋值 `arr[0] = x` | ✅ |
| 改变 `length`（扩容 / 截断） | ✅ |
| `delete arr[0]` | ✅ |

```ts
const store = new AutoStore({ list: [3, 1, 2] }, { resetable: true });

store.state.list.sort((a, b) => a - b);
store.state.list.length = 1;
store.state.list.push(99);

store.reset(); // [3, 1, 2]
```

### 限定重置范围

传入 `string[]` 可以把重置范围限定到指定路径。规则**首匹配即止**——按书写顺序依次匹配，命中即决定该路径是否可重置，不再检查后续规则。

```ts
// 纳入规则（无前缀）：命中即判定可重置，范围是该路径整棵子树（含自身）
new AutoStore(state, { resetable: ["orders.items"] });

// 排除规则（`!` 前缀）：命中即判定不可重置
new AutoStore(state, { resetable: ["!orders.items"] });
```

**顺序会遮蔽后面的规则**，这是最容易踩的地方：

```ts
// 排除在前 —— 生效
new AutoStore(state, { resetable: ["!orders.items", "orders"] });
//   orders.items → 命中规则 1 → 不可重置
//   orders.price → 规则 1 不命中 → 命中规则 2 → 可重置

// 纳入在前 —— 排除规则成了死代码，因为没有任何路径能走到它
new AutoStore(state, { resetable: ["orders", "!orders.items"] });
//   orders.items → 命中规则 1 → 可重置
```

未命中任何规则时的默认行为，取决于规则集里有没有纳入规则：

| 规则集 | 零命中默认 | 含义 |
| --- | --- | --- |
| `["x"]` | **不可重置** | 规则集是收窄，只认白名单 |
| `["!x"]` | **可重置** | 规则集是排除，除 x 外都记 |
| `true` | 全部可重置 | 无规则 |

通配符 `*` 匹配恰好一层，`**` 匹配任意层（**含零层**，故 `a.**` 也覆盖 `a` 自身）：

```ts
new AutoStore(state, { resetable: ["user.**"] });  // user 整棵子树
new AutoStore(state, { resetable: ["!**"] });      // 全不记（等价于 false）
```

规则在**捕获时**判定一次，并在 `reset()` 时复算一次——捕获之后再改规则，已捕获的基线也按新规则处理。

### 容器基线会吸收后代

整体替换一个容器时，只产生**一条**基线，其后代不再单独记录：

```ts
const store = new AutoStore({ u: { x: 1 } }, { resetable: true });

store.state.u = { x: 2, fresh: 3 };
store.state.u.x = 9;

store.reset(); // { x: 1 } —— fresh 也一并消失
```

性能上这很重要：一棵有上万个叶子的树，整体替换只需一条记录，而不是每个叶子一条。

代价是它**不能与更早的脏后代共存**。如果子树里已经有脏路径，之后才整体替换该容器，那么该容器不会被捕获（否则会把后代的还原一起吞掉），还原降级为逐个脏路径：

```ts
const store = new AutoStore({ u: { x: 1 } }, { resetable: true });

store.state.u.x = 9;              // u.x 先变脏
store.state.u = { x: 5, fresh: 3 }; // 之后才整体替换 u

store.reset();
// { x: 1, fresh: 3 } —— x 被还原，但 fresh 残留
```

这是有意的取舍：宁可留下明确可见的残留，也不静默给出错误结果。

### 不参与重置的路径

计算属性的路径不捕获基线。它们不承载用户输入，值由依赖重算得出，重置后会自动重新计算：

```ts
const store = new AutoStore(
    {
        price: 10,
        count: 2,
        total: computed((scope) => scope.price * scope.count),
    },
    { resetable: true },
);

store.state.price = 20;
store.reset();
// price 回到 10，total 自动重算为 20
```

`watch` 与 `shadow` 的订阅路径同理。

### 查看已捕获的基线

`updatedState` 提供一个只读调试视图：

```ts
const store = new AutoStore({ a: 1, list: [1, 2] }, { resetable: true });
store.state.a = 9;
store.state.list.push(3);

store.updatedState; // { a: 1, list: [1, 2] }
```

它仅供调试，**不是还原依据**。更关键的是，任何一次赋值 `store.resetable = ...` 都会清空已有基线——适用集变了，旧的基线就不再可靠。

### 关闭

```ts
new AutoStore(state, { resetable: false }); // 不捕获任何基线
store.resetable = false;                    // 随时关闭并清空
```

`false` 与 `[]` 等价。关闭后 `reset()` 不做任何事。

:::warning 已知限制
`@autostorejs/plugins/watch` 与 `@autostorejs/plugins/shadow` 在 `reset()` 期间不会刷新——它们的 `onAny` 订阅收不到广播派生事件。还原单个容器也只产生**一次节点级写回**，其后代不会逐条触发重置事件；若有代码依赖"每个脏叶子各触发一次"来更新自身，需要改为监听容器路径。设计取舍见 `docs/adr/0037-reset-baseline-model.md`。
:::

## 适用场景

- **表单回退**：`form.reset()` 依托的就是这个能力，把用户填过的字段还原到初始值
- **开发调试**：改乱状态后一键回到干净起点，比刷新页面更快（且不会丢失其他状态）
- **测试隔离**：每个用例开头 `reset()`，无需重建 store
- **Viewer 的重置按钮**：`@autostorejs/viewer` 内置区头的「重置」按钮即调用 `store.reset()`

## 让消费方代为开启

封装 `AutoStore` 的库往往比自己更需要 `reset`——比如表单提供 `reset()` 按钮，就要求底层 store 有基线可还原。此时库可以：

1. 读只读的 [`resetableExplicit`](/zh/store/api/store#resetableexplicit) 判断用户是否**显式配置**过。构造器已把默认值合并进 `options`，光看 `store.resetable` 无法区分「没配」与「显式配了 `false`」，两者读数都是 `false`
2. 未配置时补开启，保证自身能力可用
3. 显式 `false` 视为用户的拒绝，不覆盖

```ts
if (!store.resetableExplicit) store.resetable = true;
```

`AutoForm` 绑定外部 store 时就是这么做的。

::: warning 补开启的时机
基线自**开启那一刻**起算。库若在用户已经开始编辑之后才补开启，那之前的修改就还原不回来了。因此这一步必须发生在**绑定/接管 store 的那一刻**，且越早越好——`form.reset()` 里再开是错的，那时抓到的基线已经是脏数据。
:::