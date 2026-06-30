# Phase 1: 核心基础设施 - Context

**Gathered:** 2025-06-30
**Status:** Ready for planning

## Phase Boundary

本阶段交付 **AutoStore Template 渲染引擎的核心架构和基础设施**，包括：

- AutoRender 主类的生命周期管理（初始化、启动、停止、销毁）
- DirectiveRegistry 指令注册系统的实现
- TemplateScanner 模板扫描器的实现
- 与 AutoStore 响应式系统的集成点（watch 监听器管理）

**本阶段实现的是引擎骨架** - 不包含具体指令实现（x-text、x-if、x-for 等指令在后续阶段实现）。

## Implementation Decisions

### 状态管理
- **D-01:** 使用**类属性模式**存储 AutoRender 的内部状态
- **D-02:** 追踪**扩展状态**：`#started`、`#el`、`#store`、`#options`、`#scanner`、`#directives`（绑定列表）、`#watchers`（监听器列表）
- **D-03:** 所有状态属性使用私有类属性（`#` 前缀）确保封装性

### 指令注册系统
- **D-04:** 使用**独立注册方法**设计 - 提供 `registerDirective()` 方法
- **D-05:** v1 **显式拒绝自定义指令** - `registerDirective()` 存在但抛出错误 `"Custom directives not supported in v1"`
- **D-06:** DirectiveRegistry 内部使用 **Map<string, Directive>** 存储指令
- **D-07:** 内置指令在 AutoRender 构造函数中自动注册

### 模板扫描策略
- **D-08:** 采用**增量扫描策略** - 初始全量扫描，后续只扫描新添加的元素
- **D-09:** 使用 **WeakMap<HTMLElement, boolean>** 在**实例级别**追踪已扫描元素
- **D-10:** 使用 TreeWalker API 高效遍历 DOM 树

### 错误处理
- **D-11:** 采用**静默失败 + 日志**策略
- **D-12:** 提供基础级别日志：error 级别记录所有错误，warn 级别记录可恢复问题
- **D-13:** debug 模式通过 `options.debug` 启用

### AutoStore 集成
- **D-14:** 使用 **WeakMap<AutoStore, Set<Unwatch>>** 管理监听器生命周期
- **D-15:** 每个表达式建立独立的 watch 监听器
- **D-16:** stop() 时调用所有 unwatch 函数清理监听器

### 生命周期语义
- **D-17:** destroy() 采用**硬销毁语义** - 调用后实例完全不可用，所有方法抛出错误
- **D-18:** start() 可重复调用（幂等操作）
- **D-19:** stop() 后可以重新调用 start() 恢复

### Claude's Discretion
以下实现细节留给规划阶段决定：
- Directive 接口的具体方法签名（init/update/destroy 的参数列表）
- TemplateScanner 返回的数据结构（DirectiveInfo 的具体字段）
- 表达式解析的集成方式（是否在 Phase 1 实现基础解析）
- 性能优化的具体实现（路径索引的细节）

## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### 架构文档
- `.planning/research/ARCHITECTURE.md` - 系统架构、组件边界、数据流、构建顺序建议
  - §核心组件: AutoRender 类、DirectiveSystem、TemplateScanner 的详细设计
  - §数据流: 初始化流程和更新流程
  - §构建顺序建议: Phase 1 的具体实现建议

### 需求规格
- `.planning/REQUIREMENTS.md` - v1 需求完整规格
  - §核心引擎: CORE-01 到 CORE-04 的验收标准
  - §表达式系统: EXPR-01 到 EXPR-03 的安全约束
  - §性能: PERF-01 到 PERF-03 的性能目标

### 项目上下文
- `.planning/PROJECT.md` - 项目愿景和核心决策
  - §Key Decisions: 技术栈选择、设计哲学
  - §Out of Scope: 明确不在 v1 范围的功能

### AutoStore Core 集成
- `../../core/src/` - AutoStore 核心包（monorepo 内部依赖）
  - watch 系统 API 参考
  - 计算属性 API 参考
  - 状态管理 API 参考

## Existing Code Insights

### Reusable Assets
目前项目处于初始化阶段，尚无现有代码资产。

### Established Patterns
从 AutoStore 核心包学到的模式：
- 使用 Proxy 实现响应式系统
- watch 系统的路径订阅机制
- 计算属性的 scope 模式

### Integration Points
- **@autostorejs/core** - 通过 watch 系统建立响应式依赖
- **DOMParser** - 浏览器原生 API 用于模板解析
- **TreeWalker API** - 高效 DOM 遍历

## Specific Ideas

### 指令优先级系统
从 ARCHITECTURE.md 中确认的优先级顺序：
1. x-for (最高) - 需要先创建子元素
2. x-if (高) - 需要先决定是否渲染
3. x-bind, x-on (中)
4. x-text, x-html, x-visible (低)

**实现要求：** DirectiveRegistry 必须支持按优先级排序指令执行顺序。

### 错误提示示例
从用户讨论中确认的错误处理要求：
- 未知指令名称 → warn 级别日志，跳过该指令
- 无效表达式 → error 级别日志，跳过该表达式
- 初始化参数错误 → 抛出错误，终止启动

## Deferred Ideas

无 - 讨论保持在阶段范围内。

---

*Phase: 1-核心基础设施*
*Context gathered: 2025-06-30*
