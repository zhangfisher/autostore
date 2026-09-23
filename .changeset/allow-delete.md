---
'@autostorejs/viewer': minor
---

删除能力从 `editable` 属性拆分为独立的 `allow-delete` 属性，默认关闭。

**行为变更**：升级后 `editable` 不再附带删除按钮，需显式添加 `allow-delete` 才显示删除按钮。同时修正：数组元素删除改用 splice（不再产生稀疏空洞），根节点不再显示无效的删除按钮。
