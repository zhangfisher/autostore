# Phase 2 Discussion Log

**Phase:** 02 - 表达式系统
**Date:** 2026-06-30
**Duration:** ~15 minutes

## Discussion Flow

### Critical Design Decision

用户提供了核心设计决策：**表达式 = AutoStore 计算属性**

- 每个指令表达式对应 `store.computedObjects.create(() => <表达式>)`
- 计算对象与 DOM 元素创建绑定关系
- 每个指令实例统一管理这种关系
- 计算属性变化时更新 DOM 元素

这个决策完全改变了阶段范围：不需要独立实现表达式解析引擎，而是创建与 AutoStore 的桥接层。

### Questions Asked

#### Q1: 表达式到计算属性的桥接层级？
**Answer:** 独立桥接 - 创建独立的 ExpressionBridge 类

#### Q2: 计算对象的生命周期管理？
**Answer:** 弱引用 - 使用 WeakMap，依赖 AutoStore 的内部清理

#### Q3: 绑定关系存储方式？
**Answer:** 集中索引 - AutoTemplate 维护全局 Map<computed, Set<{el, updateFn}>>

**User Note:** 绑定关系应包含指令、DOM元素、计算属性三者，更新 DOM 由指令执行

#### Q4: updateStrategy 实现方式？
**Answer:** 更新器对象 - 指令提供 { update(el, value), destroy(el) }

#### Q5: ExpressionBridge 职责范围？
**Answer:** ExpressionBridge 更名为 Binding 对象
- 作为 DOM元素、指令、计算属性的映射绑定
- 监听计算属性变更事件
- 变更时调用指令的更新方法，传入 DOM 元素
- 让指令负责更新

#### Q6: 计算对象复用策略？
**Answer:** 独立创建 - 每个指令创建独立的计算对象

#### Q7: Binding 对象创建时机？
**Answer:** Scanner 创建 - TemplateScanner 扫描时创建

#### Q8: Binding 对象存储方式？
**Answer:** 按 DOM 元素分组 - WeakMap<HTMLElement, Set<Binding>>

**User Note:** 按元素分组有利于优化更新

#### Q9: Binding 清理机制？
**Answer:** 完整清理 - Binding.destroy() 调用 directive.destroy(el) + computed.destroy()

## Decisions Captured

### 核心架构
- 表达式系统基于 AutoStore 计算属性
- Binding 类作为三元组连接器
- TemplateScanner 负责创建 Binding

### 存储结构
- WeakMap<HTMLElement, Set<Binding>> 按元素分组
- 弱引用避免内存泄漏

### 更新机制
- 指令提供更新器对象
- Binding 监听计算属性变化并触发指令更新

### 生命周期
- 独立计算对象，不复用
- 完整清理机制

## User Corrections

1. **纠正:** 绑定关系不是简单的 computed → el 映射，而是包含指令的三元组
2. **纠正:** ExpressionBridge 更名为 Binding 对象
3. **强调:** 不同指令更新方式不同（x-text vs x-html）
4. **强调:** 按元素分组有利于更新优化

## Deferred Ideas

None - discussion stayed within phase scope.

## Claude's Discretion Items

- Binding 类的具体方法签名
- ExpressionBridge.create() 的 options 参数
- 指令更新器对象的 TypeScript 接口
- 按元素分组的操作方法
- 计算对象变化事件的监听机制

---
*Discussion logged: 2026-06-30*
