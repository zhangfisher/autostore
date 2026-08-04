# AutoStore Template - 项目指南

本项目使用 GSD (Get Shit Done) 工作流进行管理。

## 项目概述

AutoStore Template 是一个专为 AutoStore 状态管理库设计的声明式模板渲染引擎。它提供类似 Alpine.js 的语法糖，让开发者可以通过 HTML 属性指令直接绑定状态到 DOM。

**核心价值：** 最小声明，最大响应 — 用最少的 HTML 属性声明，实现完整的响应式 UI 更新。

## 快速开始

### 查看项目状态

```bash
/gsd-progress
```

### 开始下一个阶段

```bash
/gsd-discuss-phase 1    # 深入讨论阶段 1
/gsd-plan-phase 1       # 直接规划阶段 1
```

### 查看路线图

查看 [`.planning/ROADMAP.md`](.planning/ROADMAP.md) 了解完整的阶段规划。

## 项目文档

### 规划文档

- [`.planning/PROJECT.md`](.planning/PROJECT.md) - 项目上下文、需求和约束
- [`.planning/REQUIREMENTS.md`](.planning/REQUIREMENTS.md) - v1 需求规格（38 个需求）
- [`.planning/ROADMAP.md`](.planning/ROADMAP.md) - 6 个阶段的详细规划
- [`.planning/STATE.md`](.planning/STATE.md) - 当前项目状态和进度

### 研究文档

- [`.planning/research/STACK.md`](.planning/research/STACK.md) - 技术栈选择和理由
- [`.planning/research/FEATURES.md`](.planning/research/FEATURES.md) - 功能分析（table stakes vs differentiators）
- [`.planning/research/ARCHITECTURE.md`](.planning/research/ARCHITECTURE.md) - 系统架构和组件边界
- [`.planning/research/PITFALLS.md`](.planning/research/PITFALLS.md) - 常见陷阱和预防策略
- [`.planning/research/SUMMARY.md`](.planning/research/SUMMARY.md) - 研究总结

## 工作流配置

**模式：** Interactive - 在每个步骤确认
**粒度：** Standard - 6 个阶段，每个阶段 3-5 个计划
**执行方式：** Sequential - 一次一个计划
**提交文档：** Yes - 规划文档在版本控制中跟踪

**启用的代理：**

- ✓ 研究 - 在规划每个阶段之前进行领域研究
- ✓ 计划检查 - 验证计划能实现其目标
- ✓ 验证 - 确认交付物符合阶段目标

## 项目统计

- **总阶段数：** 6
- **v1 需求：** 38 个
- **需求覆盖：** 100%

## 技术栈

**核心技术：**

- @autostorejs/core - AutoStore 响应式系统
- DOMParser - 浏览器原生 HTML 解析
- TreeWalker API - 高效 DOM 遍历

**构建工具：**

- tsup - 基于 esbuild 的快速构建
- TypeScript - 完整类型支持
- Vitest - 单元测试

## 核心指令

AutoStore Template 支持以下指令：

**核心指令：**

- `x-if` - 条件渲染
- `x-for` - 列表渲染
- `x-text` - 文本内容绑定
- `x-html` - HTML 内容绑定
- `x-show` - 显示/隐藏控制

**交互指令：**

- `x-click` - 点击事件
- `x-input` - 输入事件
- `x-submit` - 表单提交
- `x-on:event` - 通用事件

**属性和样式：**

- `x-bind:attr` 或 `:attr` - 属性绑定
- `x-class` - 类名绑定
- `x-style` - 样式绑定
