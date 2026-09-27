---
'@autostorejs/viewer': minor
---

图标视觉统一（ADR-0033）：三类图标（节点前置 / 展开折叠 / action）画风对齐内置线型系。

- **默认图标拉取源由 material-symbols-light 换为 lucide**（线型系，与内置图标同画风）。需要原填充系画风请显式配置 `icon-url="https://api.iconify.design/material-symbols-light.json?icons={names}"`——覆写拉取源者自担风格差（填充型图标不做线宽重写）。
- 拉取注册的线型（stroke 系）图标统一重写线宽：symbol 注入内置同款公共属性（stroke-width 1.5 / currentColor / round 端点），并剥离 iconify body 自带的内联 `stroke-width`（如 lucide 的 2）——远程图标与内置图标同屏粗细一致。
- 解析 iconify 响应的 `aliases` 别名展开（lucide 常用名多为别名，如 `home` → `house`；此前别名随「响应未出现」一并负缓存，反转 ADR-0024 的忽略决策）；别名条目可覆盖 body/尺寸，仅解析一层。
- dropdown caret（10px 小容器）改用专用粗线变体 `chevron-sm`（张角略放大 + 线宽 2.75，视觉补偿缩放线宽漂移）；树折叠 chevron 保持原版。action 菜单项图标尺寸 14px → 16px。
- 删除零引用的孤立资产 `public/icons.svg`（品牌图标、硬编码色）。
- 修复 slot 自定义图标在容器尺寸 ≠ 24px 时显示不全：HTML 解析器把 template/light DOM 中的 `viewBox` 属性小写化为 `viewbox`（SVG 渲染不认），重建 symbol 时按 camelCase 映射修正——此前 24px 容器与内容坐标系 1:1 碰巧完整，自定义 `--viewer-icon-size`（如 18px）即暴露内容被裁。
