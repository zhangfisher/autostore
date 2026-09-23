---
'@autostorejs/viewer': patch
---

图标渲染机制升级为 SVG sprite 复用，消除每个树节点的完整 `<svg>` DOM 克隆：

- 组件内联一份隐藏 `<symbol>` sprite（`asv-` 前缀 id），节点处通过 `<use href="#asv-xxx"/>` 引用壳渲染，图形定义从随节点数线性增长降为恒定一份。510 节点树实测：path/circle/rect 图形元素 2130 → 39（-98.2%），shadow root 元素总数 7452 → 6397（-14.2%）。
- stroke 型图标线宽统一为 1.5（原类型图标为 2，视觉略变细）；`computed` 保持唯一填充型。
- 清理零引用的脚手架残留（`assets/` 下 svg/png）与重复的图标辅助函数。
