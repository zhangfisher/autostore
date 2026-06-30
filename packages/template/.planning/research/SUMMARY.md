# 研究总结 - AutoStore Template

## 研究日期
2025-06-30

## 研究方法
Web 搜索 + 行业标准分析 + Alpine.js/Vue.js 架构研究

## 关键发现

### 技术栈选择

**核心决策：**
- 使用 DOMParser 进行原生解析，零依赖
- 直接 DOM 操作而非虚拟 DOM，配合 AutoStore 的细粒度更新
- TreeWalker API 高效遍历 DOM 树

**不使用的技术：**
- ❌ 虚拟 DOM - AutoStore 已提供细粒度追踪
- ❌ 模板编译器 - 保持简单，运行时解析足够
- ❌ 复杂依赖注入 - 直接依赖 store 实例

### 功能范围

**Table Stakes（必须具备）：**
- 核心指令：x-if, x-for, x-text, x-html, x-visible
- 事件绑定：x-click, x-input, x-submit
- 属性绑定：x-bind, :attr 简写
- 样式控制：x-class, x-style

**差异化功能：**
- 异步状态支持（加载、错误、进度）
- 与 AutoStore 深度集成
- TypeScript 完整支持

**不实现的功能（v1）：**
- x-model 双向绑定
- 组件系统
- SSR 支持
- 自定义指令 API

### 架构设计

**分层架构：**
```
AutoRender API
  → 指令系统（优先级管理）
  → 解析器（模板扫描、表达式解析）
  → 响应式系统（AutoStore Core）
```

**组件边界：**
- Template 负责：模板扫描、指令执行、DOM 操作
- AutoStore 负责：状态管理、依赖追踪、watch 系统

**构建顺序：**
1. 核心基础设施
2. 表达式系统
3. 基础指令（text/html/visible）
4. 控制流指令（if/for）
5. 交互指令（on/bind/class/style）
6. 集成和优化

### 常见陷阱

**Top 3 风险：**
1. **内存泄漏** - 监听器未清理（Phase 3 解决）
2. **无限循环** - 更新触发自身（Phase 3 解决）
3. **XSS 攻击** - x-html 不安全内容（Phase 3 解决）

**其他关键问题：**
- x-for key 重复（Phase 4）
- x-if/x-for 冲突（Phase 4）
- 性能问题（Phase 6）
- 异步状态竞争（Phase 5）

### 性能洞察

**关键发现：**
- "最快的虚拟 DOM 就是没有虚拟 DOM" - 直接 DOM 操作配合细粒度更新更高效
- MutationObserver 适合观察 DOM 变化，Proxy 适合响应式系统
- 嵌套 x-for 超过 3 层会严重降低性能

**优化策略：**
- 只扫描有指令的元素（WeakSet 标记）
- 建立路径到指令的索引，快速定位
- 分块渲染大型列表

## 验证通过的设计决策

| 决策 | 验证来源 | 置信度 |
|------|----------|--------|
| DOMParser 原生解析 | 浏览器原生 API 成熟度 | 高 |
| 直接 DOM 操作 | 性能研究 | 高 |
| 指令优先级系统 | Alpine.js 架构 | 高 |
| x-if 和 x-for 不共存 | Alpine.js 文档 | 高 |
| 异步状态支持 | 用户需求分析 | 中 |

## 需要注意的约束

1. **浏览器兼容性** - 仅支持现代浏览器
2. **包体积** - ESM < 30KB 目标
3. **性能目标** - 初始渲染 < 50ms，更新 < 16ms
4. **安全性** - 需要限制表达式语法，防止注入

## 参考资源

**架构参考：**
- [Alpine.js](https://alpinejs.dev/) - 指令语法灵感
- [Vue Reactivity](https://vuejs.org/guide/extras/reactivity-in-depth.html) - 响应式系统
- [Petite Vue](https://github.com/vuejs/petite-vue) - 轻量级实现

**性能参考：**
- [JavaScript Template Engine Benchmark 2024](https://dev.to/devcrafter91/javascript-template-engine-benchmark-2024-2m3j)
- [Template Engine Benchmark GitHub](https://github.com/itsarnaud/templating-engine-bench)

**最佳实践：**
- [MutationObserver - MDN](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)
- [Mastering JavaScript Observers](https://harshal-ladhe.netlify.app/post/mastering-js-observers)

## 下一步

基于此研究：
1. 定义 REQUIREMENTS.md - 将研究结果转换为具体需求
2. 创建 ROADMAP.md - 根据构建顺序规划阶段
3. 开始 Phase 1 规划

---
*研究总结完成*
*准备进入需求定义阶段*
