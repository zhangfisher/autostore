# AutoStore Template - 响应式模板渲染引擎

## What This Is

AutoStore Template 是一个专为 AutoStore 状态管理库设计的声明式模板渲染引擎。它提供类似 Alpine.js 的语法糖，让开发者可以通过 HTML 属性指令直接绑定状态到 DOM，无需手动编写响应式更新逻辑。

**核心价值：** 让 AutoStore 用户可以用最少的代码实现状态与 UI 的自动同步，保持代码简洁的同时提供细粒度的响应式更新能力。

## Why This Exists

当前使用 AutoStore 进行 UI 开发时，用户需要手动：
- 创建元素引用
- 监听状态变化
- 手动更新 DOM

这种模式虽然提供了细粒度控制，但对于简单的 UI 场景来说过于繁琐。AutoStore Template 通过声明式指令解决了这个问题，让开发者专注于业务逻辑而非 DOM 操作。

## Context

**目标用户：** AutoStore 现有用户

**技术栈：**
- 基于 AutoStore Core（@autostorejs/core）
- 原生 DOMParser 解析模板
- 现代浏览器环境（不支持 SSR）
- TypeScript

**设计哲学：**
- 性能与开发体验平衡
- 保持简单，避免过度抽象
- 与 AutoStore 生态系统无缝集成

## Core Value

**"最小声明，最大响应"** — 用最少的 HTML 属性声明，实现完整的响应式 UI 更新。

## Requirements

### Validated

(无 — 项目初始化阶段)

### Active

- [ ] **TPL-01**: 支持 `x-if` 指令实现条件渲染
- [ ] **TPL-02**: 支持 `x-visible` 指令控制元素显示/隐藏
- [ ] **TPL-03**: 支持 `x-text` 指令绑定文本内容
- [ ] **TPL-04**: 支持 `x-html` 指令绑定 HTML 内容
- [ ] **TPL-05**: 支持 `x-for` 指令实现列表循环渲染
- [ ] **TPL-06**: 支持事件绑定指令（x-click, x-input 等）
- [ ] **TPL-07**: 支持属性绑定（x-bind:attr 或 :attr 语法）
- [ ] **TPL-08**: 支持类/样式动态绑定（x-class, x-style）
- [ ] **TPL-09**: 提供异步计算状态的加载/错误反馈机制
- [ ] **TPL-10**: 实现细粒度 DOM 更新，避免不必要的重渲染
- [ ] **TPL-11**: 提供 AutoRender 类的初始化 API（el, store, options）
- [ ] **TPL-12**: 提供 app.start() 方法启动渲染引擎
- [ ] **TPL-13**: 集成到 AutoStore monorepo 作为独立包（@autostorejs/template）

### Out of Scope

- **SSR 支持** — v1 仅支持浏览器环境，不考虑服务端渲染
- **旧版浏览器** — 仅支持现代浏览器（最新版本的 Chrome、Edge、Firefox、Safari）
- **高级调试工具** — v1 只提供基础的错误提示和警告
- **双向绑定（x-model）** — 留待 v2 版本
- **组件系统** — v1 是指令级渲染，不支持组件抽象
- **路由集成** — 路由功能不在模板引擎的职责范围内

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| 基于原生 DOMParser | 简单直接，避免引入额外依赖 | ✅ 采用原生解析 |
| 浏览器兼容性策略 | 现代浏览器提供更好的 API 支持 | ✅ 仅支持现代浏览器 |
| 指令语法风格 | 与 Alpine.js 保持一致，降低学习曲线 | ✅ 使用 x- 前缀指令 |
| 集成方式 | 作为 monorepo 独立包发布 | ✅ 包名 @autostorejs/template |
| 性能策略 | 平衡性能与开发体验，不是极致性能优先 | ✅ 可接受适度性能开销 |

## Success Metrics

- **API 易用性**：用户能在 5 分钟内理解并使用所有指令
- **集成成本**：现有 AutoStore 项目能在 10 分钟内完成迁移
- **渲染性能**：简单应用（< 1000 个响应式节点）的初始渲染时间 < 50ms
- **更新性能**：单个状态变更的更新延迟 < 16ms（60fps）
- **包体积**：未压缩的 ESM 包体积 < 30KB

## Evolution

此文档在阶段转换和里程碑完成时更新：

**每次阶段转换后**（通过 `/gsd-transition`）：
1. 验证的需求 → 移至 Validated 并标注阶段引用
2. 失效的需求 → 移至 Out of Scope 并说明原因
3. 新出现的需求 → 添加到 Active
4. 需要记录的决策 → 添加到 Key Decisions
5. 检查 "What This Is" 仍然准确，如有偏离则更新

**每个里程碑完成后**（通过 `/gsd-complete-milestone`）：
1. 全面审查所有章节
2. Core Value 检查 — 仍然是正确的优先级吗？
3. 审计 Out of Scope — 原因仍然有效吗？
4. 更新 Context 以反映当前状态

---
*Last updated: 2025-06-30 after initialization*
