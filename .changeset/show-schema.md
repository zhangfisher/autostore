---
'@autostorejs/viewer': minor
---

新增 `show-schema` 属性（默认关闭）：从 store 的 schema（`configurable()` 声明，经 ConfigManager 注册）提取元数据增强树节点显示——

- **label**：完全替换 key 显示
- **required**：为 `true` 时 label 后尾随红色 `*`（颜色可经 `--viewer-required-color` 定制，列宽截断时星号不会被切）
- **help**：作为整行 hover 的 `title` 提示（仅支持字符串）
- **choices**：值匹配候选项时显示对应项的 `label`（显示层替换，数据层不变；编辑态仍显示原值）

无 schema 的节点原样回落显示；`label` 与红星计入 value-align 的标签区列宽测量。
