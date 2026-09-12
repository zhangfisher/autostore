---
"autostore": minor
"@autostorejs/react": minor
"@autostorejs/syncer": minor
"@autostorejs/plugins": minor
"@autostorejs/devtools": minor
"@autostorejs/form": minor
---

Schema widget 类型系统升级（ADR-0005 widget config vocabulary），固定版本组 4.3.2 → 4.5.0：

- **core**: base widget 类型仅收录 HTML 词汇，字段词汇统一为 camelCase，重叠组件字段下沉至 core 类型表，消除 TS2717 类型冲突
- **form**: input/select widget 配置对齐新词汇表，field/form 样式与 hostClass 控制增强；`autostore` 依赖从 peerDependencies 移至 dependencies
