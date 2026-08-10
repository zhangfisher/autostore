# 整体替换结构化值时向后代监听器广播

**状态**：accepted

## 背景

AutoStore 的响应式核心建立在 `operates`（一个 `FastLiteEvent` 实例）之上：状态读写被捕获为 `StateOperate`，经 `_notify` → `operates.emit(path, operate)` 通知订阅者，`store.watch(path, listener)` 本质是 `operates.on(path, listener)`。

这存在一个语义缺陷：当整体替换一个对象时——

```ts
store.watch("order.count", fn); store.watch("order.price", fn); store.watch("order", fn);
store.state.order = { count: 101, price: 1.8 }; // 只有 watch("order") 触发，count/price 不触发
```

原因：`emit("order")` 只精确命中 `order` 自身，事件匹配到达路径终点 `order` 后停止，不再下探子树。这不符合"后代值确实变了，后代监听器理应收到通知"的语义。

## 决策

引入 fastevent 2.7.0 的 **broadcast** 能力（发布端前缀广播）：在 `_notify` 中，当 `operate.type ∈ {set, delete, update}` 且 `operate.value` 是结构化值（普通对象 `{}` / `Map` / `Array`）时，用 `operates.broadcast(path, operate, callback)` 替代 `operates.emit(path, operate)`。broadcast 除命中自身路径外，会唤醒该路径子树内所有**已订阅**的后代监听器（含通配符），并通过回调为每个后代派生独立的 `operate`。

派生规则（每个后代）：
- `type` = 后代路径在新快照中存在 → `"set"`；仅旧快照存在 → `"delete"`。（**不继承父 type**）
- `value` = `getVal(新对象, 相对路径)`；`oldValue` = `getVal(旧对象, 相对路径)`。
  - `set`/`update`：新对象 = `operate.value`，旧对象 = `operate.oldValue`。
  - `delete`：旧对象（被删）= `operate.value`，无新对象。
- 逐后代去重：`value === oldValue` 则跳过该后代。
- 标记 `operate.broadcast = true`，便于下游识别广播派生事件、消解重复/冲突。

## 关键约束

- **observer 后代跳过**：computed / watch 观察者拥有自己的生命周期与自通知机制（依赖变化后自行 `_notify`）。广播回调对命中 `computedObjects` / `watchObjects` 注册表的后代路径 `return null` 跳过，避免双重触发与强行实例化 lazy computed。
- **`_peeping` 守卫必须在回调内部逐次设置**：watch 监听器执行末尾会把 `_peeping` 置 false（store.ts watch 处理器），外层统设会被重置；故每次回调读旧对象（可能是 proxy，触发 get）前临时置 true、读完恢复。
- **分隔符**：`operates` 与 `this.delimiter` 均为 `"."`（`PATH_DELIMITER`），broadcast 回调的 `type` 即 `"."` 连接的后代路径，`split(".")` 还原数组。
- **Set 不纳入**：`isBroadcastableValue` 显式排除 `Set`（第一阶段范围）。

## 范围边界（Phase 2 待办）

第一阶段只处理 **set / delete / update（set 陷阱，`arr[i] = 结构化值`）**——这三种情形的 `operate.value` / `oldValue` 携带完整新旧对象，派生逻辑干净、可去重。

**未处理**：`insert` / `remove` / `fill` 等数组方法产生的 operate。它们的 `value` 是增量数组（`args` / `deletedItems`）、`indexs` 标注受影响索引、`oldValue: undefined`，且 `splice`/`unshift`/`shift` 存在索引移位——没有完整旧快照，无法套用"读快照 + 去重"的通用逻辑，移位语义亦需单独定义。这些留给后续阶段以专门的索引逻辑实现与测试。

## 备选方案（为何被否决）

- **深度遍历状态树逐路径 emit**：能达成同样效果，但要自行遍历整棵子树（而非只触达已订阅后代），对深层/大对象开销大且重复造 broadcast 已提供的轮子。
- **把旧行为写进文档当作"特性"**：与"后代值变了就应通知"的直觉相悖，用户已明确定性为漏洞。
- **opt-in 开关**：定性为 bugfix，默认开启；测试审计确认无现有用例依赖旧的"不触发"行为。
