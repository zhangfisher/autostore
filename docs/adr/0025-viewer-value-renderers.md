# viewer 值渲染钩子：schema.toView 与 schema.toRender

core 的 `AutoStateSchemaBase` 早已声明 `toView`/`toRender`，但 viewer 从未消费——节点值恒为 `formatValue` 文本，checkbox 显示 true/false、color 显示色号字符串。本决策让 viewer 消费这对钩子，形成"**toView 管看、toRender 管改**"的渲染契约：

- **toView（查看态）**：替代 node-value 的 `formatValue`，优先级 `toView > choices label 替换 > formatValue`，入参为原始值（choices 语义由开发者自理）。返回三态：lit `TemplateResult` 原样、字符串经 `unsafeHTML`（注入安全责任在开发者，文档注明）、Node 直接插入。
- **toRender（编辑态）**：**替代默认编辑控件**——编辑态渲染 `toRender(value)` 的自定义交互 UI，viewer 不再注入标准编辑器与校验状态机，值写回由自定义控件自理（直接改 store 即与即时生效兼容）；同壳 `.edit-editor` 保留失焦退出机制。
- **门控与隔离**：两者均属展示词汇，受 `disable-schema` 门控（回落默认渲染）；抛错回落（toView→formatValue、toRender→默认编辑器）+ console.warn，用户函数异常不击穿查看与编辑的基本能力。
- **默认 toView 特例**（widget 显式声明才启用，不做值格式启发）：`widget='color'` 渲染相框结构色块（白底 + 1px 边框 + 3px 内边距 + 小阴影，颜色经 `--swatch-color` 由 `::before` 铺满 content 区，title=值），非颜色格式值回落文本；`widget='checkbox'` 渲染只读勾选框（`::before` 透明遮罩拦截点击，勾选态复用双值档位判定，双击可冒泡进编辑）；`widget='range'` 渲染迷你滑轨（轨道 + 填充段 + 数值，填充百分比按 min/max 归一、缺省 0~100），非数值回落文本。

考虑过的替代方案：仅支持 lit 模板返回——被否：IIFE 纯 HTML 用户拿不到 `html` 标签；字符串方案（unsafeHTML）让两 类消费者零门槛。toRender 渲染在编辑控件旁作预览——被否：与"toRender=自定义渲染表单字段"的 core 语义冲突，且布局复杂。
