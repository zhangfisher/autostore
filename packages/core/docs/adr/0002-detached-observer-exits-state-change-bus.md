# 游离观察者的值变更退出 state 变更流，改走独立顶层事件 `observer:set:<id>`

## 背景

游离（detached）观察对象的计算/监听结果不写入状态树，其 `path` 仅用于解析作用域与依赖。但 `ObserverObject.set value` 原先对游离对象也调用 `store._notify({ type:"set", path, value, oldValue })`，把值变更作为一条 state 路径变更事件 emit 到 `operates` 总线。

当游离对象带有 anchor 时，其 `path` 是一条逻辑路径（如 `order.total`），而该路径在状态树中并不存在（结果不回写）。于是 `store.watch("order.total")` 会被触发，但 `state.order.total` 为 `undefined`——**事件与状态不一致的"幽灵 path"**。ADR-0001 曾把这种"以真实路径广播"作为既定特性记录（见其"后果"第 1 条），本决策修订该结论。

## 决策

游离观察者被定义为**完全外部的观察者**，其值变更不再进入 state 变更流：

- `set value` 游离分支不再调用 `store._notify`，改为在 store 顶层总线 emit 独立事件 `observer:set:<id>`，payload 为 `{ type:"set", path, value, oldValue }`。
- `watch` 游离分支改为 `store.on("observer:set:<id>", ...)`；关联对象仍走 `store.watch(path)`（`operates` 总线）。
- payload 刻意保持 `StateOperate` 形状（`type/path/value/oldValue`），使 `obj.watch(listener)` 的 listener 契约在关联/游离之间一致。
- `observer.destroy` 时清理 `observer:set:<id>` 命名空间监听，防止绕过 `obj.watch` 直接 `store.on` 导致的泄漏。

由此游离对象：不进入 `operates`、不可被其他对象 `depends`、对 `store.watch("*")` / `onAny` / devtools 不可见——均为预期行为（by design）。`delimiter` 不参与此机制：`observer:set:<id>` 是顶层总线的字面事件名，不经过 `path.join(delimiter)`。

## 理由

`operates` 总线的语义是"状态路径变更"。游离对象不修改状态，复用该总线会把一条不存在于状态的路径伪装成状态变更，造成监听者读到与状态不符的事件。独立通道让语义纯洁；同时通过保持 payload 形状，避免 `watch` 契约分裂（关联/游离 listener 收同形数据）。

## 备选方案

- **维持现状**（`_notify` 进 `operates`）：watch 契约一致、全局可见，但带 anchor 的游离对象 emit 幽灵 state path。
- **本方案**（顶层事件 `observer:set:<id>`）：语义纯洁、契约一致；代价是游离对象退出全局可见性、不可被 depends（视为外部观察者的预期边界）。
- **游离对象用非 state 标识（如 `#<id>`）留在 `operates`**：能消除幽灵 path 又保留全局可见，但被否决——游离对象定位为"外部观察者"，不应与 state 体系耦合。

## 后果

- `obj.watch(cb)` 能监听游离对象，但 `store.watch(obj.path, cb)` 不能——这是"外部观察者"的预期行为；`path` 对游离对象退化为作用域/依赖解析的基准，不再表示"可被全局监听的状态路径"。
- **修订 ADR-0001"后果"第 1 条**：游离对象不再以 `anchor.path` 在 `operates` 上广播事件。
- 游离 `watch` 不支持 `expand`（该能力本就未实现）、不支持 `operates` 过滤；listener 收 `{ type:"set", path, value, oldValue }`。
