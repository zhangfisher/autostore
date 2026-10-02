---
'autostore': minor
---

重写 `reset()`：从「逆放变更操作」改为「还原首次变脏基线」，并新增 `resetable` 路径规则。

## 基线模型

`reset()` 语义变更。旧实现逆放每次变更的操作（记录每个 key 的旧值，再按序回写）；新实现记录路径**首次变化前的基线快照**，还原时直接把该路径写回基线。类型不变但可观察行为有别：

```ts
const { state } = createStore({ list: [1, 2, 3] }, { resetable: true });

state.list.push(4);
state.list.pop();

store.reset();
// 旧: []        —— 逆放了 push(4) 和 pop()
// 新: [1,2,3]   —— 回到首次变脏前的基线
```

基线一经记录，后续对该路径的修改不再记录（去抖），所以基线对应用途而非逆序日志。设计取舍见 `docs/adr/0037-reset-baseline-model.md`。

## 数组

`push`/`pop`/`shift`/`unshift`/`splice`/`fill`/`sort`/`reverse`/`length`/单下标赋值/下标 `delete` 均可在还原后精确回到基线。数组基线保存变更前的元素表副本，对应的数组对象不额外复制。

## 键存在性

新增的键还原为消失，删除的键还原为恢复，键原本存在但值为 `undefined` 时还原为 `undefined`。含 `.` 的键名按转义路径编码处理，不产生多余层级。

## `resetable` 接受路径规则

`resetable` 类型由 `boolean` 拓宽为 `boolean | string[]`：

```ts
resetable: ["orders.items"]           // 纳入规则，命中即判定可重置，范围为整棵子树（含自身）
resetable: ["!orders.items"]          // 排除规则，命中即判定不可重置
resetable: ["!orders.items", "orders"] // orders.items 不可重置，orders.price 可重置
```

- **首匹配即止**：按书写顺序匹配，命中即决定，后续规则不再检查。因此顺序遮蔽是常态——`["orders", "!orders.items"]` 里的排除规则是死代码。
- 通配符 `*` 匹配恰好一层，`**` 匹配任意层（含零层，故 `["!**"]` 排除整棵树）。
- 零命中兜底：**存在纳入规则时**默认可重置为否；**只有排除规则时**默认可重置，即 `["!x"]` 表示「除 x 外都记」。
- 容器基线会吸收其后代；若某容器在子树内已有脏路径之后才被整体替换，则不捕获该容器基线，还原降级为逐个脏路径。

`true`（无规则）与 `false`/`[]` 的运行时开销与改造前持平：采集回调装在 reactive 的 options 上，禁用态不挂载。

## 破坏性变更

- **`updatedState` 由可写字段降级为只读 getter**，且不再作为还原依据，仅保留为调试视图。直接赋值不再生效。
- **`resetable` 默认值由 `true` 改为 `false`**。基线采集会在每次写入时检查"子树内是否已有脏路径"，默认关闭可让绝大多数 store 回到零开销。需要回滚能力的场景（表单回退、开发调试、测试隔离）必须显式开启：

  ```ts
  new AutoStore(state, { resetable: true }); // 或 store.resetable = true
  ```

  受影响的下游：`AutoForm` 内部 store 已显式传 `resetable: true`，不受影响；外部 store（`.store` 属性）由 `AutoForm` 在绑定时补开启（见下）。`ConfigManager` 有自己的 `reset()` 覆写，不依赖此选项。
- **新增只读属性 `store.resetableExplicit`**，用于区分「用户没配 `resetable`」与「用户显式配了 `resetable: false`」。构造器会把默认值合并进 `options`，因此 `store.resetable` 在两种情况下读数都是 `false`，消费方无从分辨。`AutoForm` 依此在绑定外部 store 时：未显式配置则自动开启 `resetable`（打一条 info 日志）以保证 `form.reset()` 可用；显式传 `false` 则尊重，不覆盖。

  ```ts
  new AutoStore(state).resetableExplicit;                        // false
  new AutoStore(state, { resetable: false }).resetableExplicit; // true
  ```

  此前依赖「`resetable` 默认 `true`」在外部 store 上调用 `form.reset()` 的代码无需改动。
- **`reset(entry)` 不再误伤同前缀兄弟路径**：`reset("user")` 精确匹配该路径及其后代，不影响 `username`。
- **还原单个容器只产生一次节点级写回**，其后代的重置事件不再逐条触发。若有代码依赖「每个脏叶子各触发一次」来更新自身，此行为需调整。
- **计算属性路径不参与还原**（在依赖变化时自动重算），不再被记录。
- `@autostorejs/plugins/watch` 与 `@autostorejs/plugins/shadow` 在 `reset()` 期间不刷新——其 `onAny` 订阅收不到广播派生事件。改造前同样如此，未新增退化。