# Phase 2: 表达式系统 - Context

**Gathered:** 2026-06-30
**Status:** Ready for planning

## Phase Boundary

本阶段交付 **表达式与 DOM 的绑定系统**，包括：

- Binding 类的设计和实现（连接 DOM 元素、指令、计算属性）
- 表达式到 AutoStore 计算属性的转换机制
- 计算属性变化的监听和指令更新触发
- 按元素分组的绑定存储结构（WeakMap<HTMLElement, Set<Binding>>）
- 完整的生命周期管理（创建、监听、更新、清理）

**本阶段实现的是数据绑定机制** - 不包含具体指令的实现（x-text、x-if、x-for 等指令在后续阶段实现）。

## Implementation Decisions

### 核心设计：表达式 = 计算属性

- **D-01:** 每个指令表达式对应一个 AutoStore 计算对象
- **D-02:** 使用 `store.computedObjects.create(() => <表达式>)` 创建计算对象
- **D-03:** AutoStore 的 computed 系统自动处理依赖追踪和表达式解析
- **D-04:** 本阶段不需要独立实现表达式解析引擎，而是创建与 AutoStore 的桥接

### Binding 类设计

- **D-05:** 创建独立的 **Binding 类** 作为连接器
- **D-06:** Binding 连接三元组：`{ el: HTMLElement, directive: Directive, computed: ComputedObject }`
- **D-07:** Binding 监听计算属性的变化事件
- **D-08:** 变化时调用 `directive.update(el, value)` 让指令负责 DOM 更新

### BindingManager 类设计

- **D-09:** 创建独立的 **BindingManager 类** 统一管理所有 Binding 对象
- **D-10:** BindingManager 使用 **WeakMap<HTMLElement, Set<Binding>>** 按 DOM 元素分组存储
- **D-11:** 按元素分组有利于优化更新（同一元素可能有多个指令）
- **D-12:** WeakMap 确保元素被移除时自动清理绑定，避免内存泄漏
- **D-13:** **AutoTemplate.bindings** 直接返回 BindingManager 实例

### 指令更新机制

- **D-13:** 指令提供 **更新器对象**：`{ update(el, value): void, destroy(el): void }`
- **D-14:** 不同指令有不同的更新策略：
  - `x-text` → `el.textContent = value`
  - `x-html` → `el.innerHTML = value`
  - `x-if` → 条件性替换元素
- **D-15:** 更新由指令执行，Binding 只负责触发

### 计算对象管理

- **D-16:** 每个指令创建 **独立的计算对象**（不复用）
- **D-17:** 简化设计，避免引用计数的复杂性
- **D-18:** 可接受适度的性能开销

### ExpressionBridge 类（原命名）

- **D-19:** 提供带配置的 API：`create(expr, store, options) → {computed, dependencies, cleanup}`
- **D-20:** 支持配置项和自定义清理函数
- **D-21:** 返回计算对象、依赖路径和清理函数

### 错误处理

- **D-22:** 采用 **容错模式**
- **D-23:** 表达式解析失败返回无效计算对象，记录 warn 日志并跳过该指令
- **D-24:** 不终止启动流程，保证部分功能可用

### 生命周期管理

- **D-25:** Binding.destroy() 执行 **完整清理**
- **D-26:** 调用 `directive.destroy(el)` 清理指令状态
- **D-27:** 调用 `computed.destroy()` 清理计算对象
- **D-28:** 移除所有监听器和引用

### AutoStore 集成

- **D-29:** 利用 AutoStore computed 的内置依赖追踪
- **D-30:** 利用 AutoStore computed 的自动缓存机制
- **D-31:** 集成到 Phase 01 的监听器管理机制（WeakMap<AutoStore, Set<Unwatch>>）

### TemplateScanner 扩展

- **D-32:** TemplateScanner 负责创建 Binding 对象
- **D-33:** 扫描时为每个指令创建对应的计算对象和 Binding
- **D-34:** 返回包含 Binding 的扫描结果

### Claude's Discretion
以下实现细节留给规划阶段决定：
- Binding 类的具体方法签名和属性设计
- BindingManager 的完整 API 设计（get/remove/update 等方法）
- ExpressionBridge.create() 的 options 参数结构
- 指令更新器对象的 TypeScript 接口定义
- 计算对象变化事件的监听机制（watch 回调或其他）
- 是否需要支持按指令类型查找 Binding

## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### 架构文档
- `.planning/research/ARCHITECTURE.md` - 系统架构和数据流
  - §ExpressionParser: 表达式解析器的原始设计（已被计算属性方案替代）
  - §数据流: 初始化流程和更新流程
  - §核心组件: AutoTemplate、DirectiveSystem 的设计

### 需求规格
- `.planning/REQUIREMENTS.md` - v1 需求完整规格
  - §表达式系统: EXPR-01 到 EXPR-03 的验收标准
  - §核心引擎: CORE-01 到 CORE-04 的 API 设计

### Phase 01 上下文
- `.planning/phases/01-core-infrastructure/01-CONTEXT.md` - 核心基础设施的决策
  - §指令注册系统: DirectiveRegistry 的设计
  - §模板扫描策略: TemplateScanner 的扫描机制
  - §AutoStore 集成: watch 系统的集成点

### AutoStore Core API
- `../../core/src/` - AutoStore 核心包
  - `computed/` - 计算属性 API（computedObjects.create()）
  - `watch/` - 监听器 API（依赖追踪机制）
  - `store/` - 状态管理 API

### 项目上下文
- `.planning/PROJECT.md` - 项目愿景和核心决策
  - §Key Decisions: 技术栈选择、设计哲学
  - §Core Value: "最小声明，最大响应"

## Existing Code Insights

### Reusable Assets
从 Phase 01 实现的核心组件：
- **AutoTemplate** - 主类，需要扩展以支持 Binding 管理
- **DirectiveRegistry** - 指令注册表，需要在扫描时创建 Binding
- **TemplateScanner** - 模板扫描器，需要扩展以创建计算对象和 Binding

### Established Patterns
从 Phase 01 建立的模式：
- 使用 WeakMap 追踪已处理元素（避免重复扫描）
- 指令优先级排序机制
- 私有类属性（`#` 前缀）确保封装性
- 静默失败 + 日志的错误处理策略

### Integration Points
- **@autostorejs/core** - 通过 computedObjects.create() 创建计算对象
- **AutoStore watch 系统** - 计算对象内置依赖追踪
- **Directive 接口** - 需要扩展以支持更新器对象

## Specific Ideas

### Binding 类设计

```typescript
class Binding {
  constructor(
    public el: HTMLElement,
    public directive: Directive,
    public computed: ComputedObject
  ) {}

  // 监听计算属性变化
  private setupListener() {
    this.computed.watch((value) => {
      this.directive.update(this.el, value)
    })
  }

  // 清理资源
  destroy() {
    this.directive.destroy(this.el)
    this.computed.destroy()
  }
}
```

### BindingManager 设计

```typescript
class BindingManager {
  // 按元素分组的存储
  bindings: WeakMap<HTMLElement, Set<Binding>>

  // 添加绑定
  add(el: HTMLElement, binding: Binding): void {
    if (!this.bindings.has(el)) {
      this.bindings.set(el, new Set())
    }
    this.bindings.get(el)!.add(binding)
  }

  // 按元素获取所有绑定
  getByElement(el: HTMLElement): Set<Binding> | undefined {
    return this.bindings.get(el)
  }

  // 按元素清理
  cleanupElement(el: HTMLElement): void {
    const bindings = this.bindings.get(el)
    if (bindings) {
      bindings.forEach(b => b.destroy())
      this.bindings.delete(el)
    }
  }

  // 清理所有绑定
  destroyAll(): void {
    this.bindings.forEach((bindings, el) => {
      bindings.forEach(b => b.destroy())
    })
    this.bindings = new WeakMap()
  }
}
```

### AutoTemplate 集成

```typescript
class AutoTemplate {
  bindings: BindingManager

  constructor() {
    this.bindings = new BindingManager()
  }

  // 清理资源
  destroy() {
    this.bindings.destroyAll()
  }
}
```

### 指令更新器对象接口

```typescript
interface Directive {
  name: string
  priority: number
  
  // 初始化
  init(el: HTMLElement, binding: Binding): void
  
  // 更新器
  update(el: HTMLElement, value: any): void
  
  // 清理
  destroy(el: HTMLElement): void
}
```

### TemplateScanner 扩展

```typescript
class TemplateScanner {
  scan(el: HTMLElement, store: AutoStore): DirectiveBinding[] {
    // ... 现有扫描逻辑
    
    // 为每个指令创建计算对象和 Binding
    bindings.forEach(binding => {
      const computed = store.computedObjects.create(
        () => binding.expression,
        ['auto-generated']
      )
      
      const bindingObj = new Binding(
        binding.el,
        binding.directive,
        computed
      )
      
      // 按元素分组存储
      this.addBinding(binding.el, bindingObj)
    })
    
    return bindings
  }
}
```

### ExpressionBridge 类（辅助工具）

```typescript
class ExpressionBridge {
  create(
    expr: string,
    store: AutoStore,
    options?: ExpressionOptions
  ): CreateResult {
    const computed = store.computedObjects.create(
      () => expr,
      options?.dependencies || []
    )
    
    return {
      computed,
      dependencies: computed.dependencies,
      cleanup: () => computed.destroy()
    }
  }
}
```

## Deferred Ideas

无 - 讨论保持在阶段范围内。

---

*Phase: 2-表达式系统*
*Context gathered: 2026-06-30*
