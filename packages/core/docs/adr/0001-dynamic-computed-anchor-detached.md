# 动态创建的计算对象：anchor 仅用于路径解析，不改变游离性质

## 背景

`computedObjects.create` 动态创建的计算对象默认没有计算上下文(ObserverContext)，因此 scope 和 depends 只能使用根(ROOT)或绝对路径，无法使用相对路径（`./`、`../`、`CURRENT`、`PARENT`）。

## 决策

在 `ObserverOptions` 上新增可选的 `anchor` 字段，允许在动态创建时声明计算对象的逻辑位置（锚点路径）以启用相对路径。**但提供 anchor 不会改变动态对象的游离(detached)性质**：对象始终 `associated=false`，计算结果不回写状态树，id 自动生成。anchor 仅用于解析相对的 scope 指向和 depends 路径。

字段命名为 `anchor`（而非 `context`）是有意为之：`context`/`ObserverContext` 在本库中特指关联对象在状态树中的**完整位置**，复用该词会暗示"提供完整上下文 → 触发关联/挂载/回写"，而这是刻意避免的。`anchor` 表达"相对路径所锚定的参考点"，与关联解耦。

## 理由

`ObserverObject` 原本以"是否传入构造 context"来判定是否关联(associated)状态树。动态创建的对象本意是"不挂载到状态树的辅助计算"，若提供位置就触发关联，会引发非预期的副作用：计算结果被写入 `state[anchor.path]`、id 变为路径、并与现有"动态对象始终游离"的契约冲突。

因此选择**解耦**：关联与否只由构造 context（仅状态树遍历 `handleReactiveObject` 提供）决定；`options.anchor` 仅作为路径解析的回退来源（供 `_path` 与 `this.context` 使用），不触及 `_associated`、`_id` 与回写逻辑。

## 后果

- ~~提供 anchor 的动态对象，其 `obj.watch()` 与事件广播使用 `anchor.path` 作为路径（而非生成的 `#id`）。若外部代码同时也写 `state[anchor.path]` 并监听同一路径，可能交叉触发——这是游离对象以真实路径广播事件的固有特性，使用时需知晓。~~
  > **[已被 ADR-0002 修订]** 游离对象的值变更不再进入 state 变更流（`operates`），改走独立顶层事件 `observer:set:<id>`，不再以 `anchor.path` 在状态变更总线上广播。详见 [ADR-0002](./0002-detached-observer-exits-state-change-bus.md)。
- 提供 anchor 时默认 scope 为 `CURRENT`（指向 `anchor.path` 所在容器），与静态计算属性一致；不提供 anchor 时默认 scope 仍为 `ROOT`（向后兼容）。
- `parentPath` 可由 `path` 自动推导，用户通常只需提供 `anchor.path`。
