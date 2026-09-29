# viewer 列宽拖拽：锁存语义与值归属

viewer 标签区列宽此前仅由 JS 自动测量写入 `--viewer-key-width`，无手动调节入口；现支持鼠标拖拽动态调节。决定：拖拽产生手动值并进入**锁存**——覆盖自动测量，锁存期间既有 6 输入重测门控（`_treeNodes`/`showCount`/`showHint`/`valueAlign`/`maxKeyWidth`/`disableSchema`）一律不重算，手动值不受 `max-key-width` 约束（该上限只约束自动测量），唯一出口是双击分界复位回自动。手动值仅存组件内部状态（不入 store、不产生 Operate、不加可写属性），对外仅在拖拽结束/复位时派发 `key-width-change` 事件；`value-align=right` 模式手柄不渲染。

## Considered Options

- **锁存语义**：锁存（选定）／一次性（下次重测即冲掉，拖拽"莫名消失"）／下限协同（手动值作下限、自动测量仍可顶掉，行为难预测）。
- **值归属**：组件内部状态（选定）／宿主可读写属性／写入 store 配置（列宽是纯展示偏好，入 store 会污染状态树并产生 Operate 事件）。
- **手柄形态**：宿主级单一覆盖手柄、复用背景带 calc 几何（选定，单监听零测量）／每行 `.node-label` 内嵌手柄（N 行 N 监听，且须逐一隔离行 click/双击编辑/长按编辑）。
- **输入模型**：Pointer Events + `setPointerCapture`（选定，兼顾触控、天然处理拖出元素边界）／纯 mouse 事件（排除触控）。
