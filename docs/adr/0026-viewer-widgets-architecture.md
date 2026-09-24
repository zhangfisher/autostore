# viewer widgets 分发架构：节点值渲染按 widget 模块化

viewer 的节点值渲染（查看态 toView / 编辑态 toRender）原分散于 `autostore-viewer.ts`（查看链）与 `editable.ts`（`_renderControl` 五分支 switch）。本决策将其重构为 **`src/widgets/` 下的 widget 模块**，editable 收缩为纯状态机 + 分发壳：

- **文件粒度**：按渲染形态建 5 模块——`input.ts`（15 种 input type 家族 + combobox 的 datalist + hidden/image 回落）、`checkbox.ts`、`textarea.ts`（含 JSON 整体编辑）、`select.ts`、`radio.ts`；`registry.ts` 维护 **22 个 widget 名 → 模块**的完整映射。
- **接口契约**：每模块导出 `{ toView?, toRender? }`，签名 `toView/toRender(ctx): TemplateResult | null`（null = 无内置实现，宿主回落默认链）。ctx 为上下文对象：`{ value, schema, plan, node, setValue, onKeydown, editor? }`——`value` 是进入编辑时的快照（静态绑定基准，输入过程不变）；`editor` 是受控编辑接口（`{ value, error, plan }` 只读 + `setValue/exit/keydown`），自定义 toRender 可读错误定制 UI、可显式退出，但不可绕过状态机直改内部字段。
- **优先级链**：查看 `schema.toView > widget 模块 toView > choices label > formatValue`；编辑 `schema.toRender > widget 模块 toRender > input 家族编辑器兜底`。用户函数永远最高；widget 模块是内置默认实现。
- **职责收缩**：editable 保留即时生效状态机（校验/写回/错误/blur/Enter 链式）、编辑器容器壳（focusout 判定 + 错误条）与 ctx 构建；`_renderControl` 五分支删除。`toRenderable` 三态归一化迁 `utils/`，`isColorLike`/`isCheckboxChecked` 内联进唯一消费它们的 widget 模块。

考虑过的替代方案：严格每 widget 一文件（22 个）——被否：input 家族 15 种共享同一模板，逐文件转发是纯重复；registry 按 22 名显式建表保留"每 widget 可达"的覆盖性承诺。直接暴露 Editable 实例进 ctx——被否：内部状态耦合，受控接口足以覆盖自定义控件的需求（读写值/错误/方案 + 退出/键盘）。
