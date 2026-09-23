---
'@autostorejs/viewer': minor
---

新增 `value-align` 与 `max-key-width` 属性，控制 value 显示对齐：

- `value-align="left"`（默认）：标签区（key + `{...}` 提示 + 数量徽章）统一为固定列宽，value 从统一列起始严格对齐；超出 `max-key-width`（默认 240px）时 key 截断显示 `...`。列宽基于全量树数据计算，与展开/折叠状态解耦，切换展开不会引起对齐跳动。
- `value-align="right"`：value 右对齐，标签区保持内容自适应。
- 字符串值不再显示 `""` 引号包装。

**修复**：构建链路改为 vite 库模式（此前 `tsc && vite build` 无法产出 dist，包出口 `module` 指向源码）。现产出 `dist/index.js`（ESM，lit/autostore external）+ `dist/index.global.js`（IIFE 全捆，经 `@autostorejs/viewer/browser` 引入）+ 完整 d.ts。
