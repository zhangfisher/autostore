# Phase 2: 表达式系统 - Context

**Gathered:** 2026-06-30
**Updated:** 2026-07-01 (添加 BindingManager 优化和指令 computed 函数机制)
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
- **D-02:** 使用 `store.computedObjects.create((scope) => getter(scope))` 创建计算对象
- **D-03:** AutoStore 的 computed 系统自动处理依赖追踪和表达式解析
- **D-04:** 本阶段不需要独立实现表达式解析引擎，而是创建与 AutoStore 的桥接
- **D-37:** 表达式求值使用**参数解构**：`(...scope) => eval(expression)`
- **D-38:** 参数解构使 `x-text="order.count"` 可以直接访问 `scope.order.count`
- **D-39:** ExpressionParser 生成包装函数：`(scope) => (({...scope}) => eval(expr))(scope)`

### Binding 类设计

- **D-05:** 创建独立的 **Binding 类** 作为连接器
- **D-06:** Binding 构造函数：`constructor(el: HTMLElement, directiveName: string, expression: string, store: AutoStore, directiveRegistry: DirectiveRegistry)`
- **D-07:** Binding 内部根据 `directiveName` 从 `DirectiveRegistry` 查找指令对象
- **D-08:** Binding 内部调用 `store.computedObjects.create(() => <expression>)` 创建计算对象
- **D-09:** Binding 监听计算属性的变化事件
- **D-10:** 变化时调用 `directive.update(el, value)` 让指令负责 DOM 更新
- **D-11:** 不需要 ExpressionBridge 中间层，Binding 直接负责计算对象创建

### BindingManager 类设计

- **D-12:** 创建独立的 **BindingManager 类** 统一管理所有 Binding 对象
- **D-13:** BindingManager 使用 **WeakMap<HTMLElement, Set<Binding>>** 按 DOM 元素分组存储
- **D-14:** 按元素分组有利于优化更新（同一元素可能有多个指令）
- **D-15:** WeakMap 确保元素被移除时自动清理绑定，避免内存泄漏
- **D-16:** **AutoTemplate.bindings** 直接返回 BindingManager 实例
- **D-40:** **同名指令去重** — 同一元素上相同指令名称的 binding 只保留一个（如 `<span x-text="a" x-text="b"></span>`，后一个覆盖前一个）
- **D-41:** **指令优先级排序** — BindingManager 中的 binding 按指令优先级排列，执行时高优先级的先执行（如 `<div x-for="item of items" x-text="">....</div>`，x-for 优先于 x-text）
- **D-42:** 使用 `Directive.priority` 属性确定执行顺序，数值越小优先级越高

### 指令更新机制

- **D-17:** 指令提供 **更新器对象**：`{ update(el, value): void, destroy(el): void }`
- **D-18:** 不同指令有不同的更新策略：
  - `x-text` → `el.textContent = value`
  - `x-html` → `el.innerHTML = value`
  - `x-if` → 条件性替换元素
- **D-15:** 更新由指令执行，Binding 只负责触发

### 指令 computed 函数机制

- **D-43:** **指令可选的 computed 函数** — 指令可以提供 `computed(expr)` 函数来特殊处理表达式求值
- **D-44:** 默认情况下 Binding 自动创建计算属性，但对某些特殊指令（如 `x-for`）无效
- **D-45:** `x-for="item of items"` 这种特殊语法不能按普通表达式求值：`((...scope)=>{ return item of items })(scope)` 是无效的
- **D-46:** 将计算属性的创建从 Binding 转移到指令中，由指令实现 `computed(expr)` 函数
- **D-47:** 指令的 computed 函数返回 `[getter, params]` 元组，其中 getter 用于创建计算对象，params 传递给 update
- **D-48:** 对于 x-for，computed 函数解析表达式并返回数组和迭代变量

### 计算对象管理

- **D-19:** 每个指令创建 **独立的计算对象**（不复用）
- **D-20:** 简化设计，避免引用计数的复杂性
- **D-21:** 可接受适度的性能开销

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
- **D-36:** Binding 需要访问 `DirectiveRegistry` 来查找指令对象

### Binding 创建流程

- **D-32:** TemplateScanner 扫描得到：`{ el, directiveName, expression }`
- **D-33:** 传递给 `new Binding(el, directiveName, expression, store, directiveRegistry)`
- **D-34:** Binding 内部根据 `directiveName` 从 `DirectiveRegistry` 查找指令对象
- **D-35:** **优先检查指令是否提供 computed 函数**，如果有则使用指令的 computed 创建计算对象
- **D-49:** 如果指令没有 computed 函数，则使用默认的 ExpressionParser 创建计算对象

### TemplateScanner 扩展

- **D-32:** TemplateScanner 负责创建 Binding 对象
- **D-33:** 扫描时为每个指令创建对应的计算对象和 Binding
- **D-34:** 返回包含 Binding 的扫描结果

### Claude's Discretion
以下实现细节留给规划阶段决定：
- 指令优先级的具体数值定义（Phase 04 实现具体指令时确定）
- BindingManager 的排序算法性能优化（是否需要缓存排序结果）
- computed 函数返回的 params 对象的标准化格式
- 是否需要支持指令的 computed 函数返回多个依赖项
- 表达式解析失败的具体错误消息格式
- Binding 创建失败时的回退策略

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
  public computed: ComputedObject
  private directive: Directive
  private params: Record<string, any> = {}

  constructor(
    public el: HTMLElement,
    directiveName: string,
    public expression: string,
    private store: AutoStore,
    private directiveRegistry: DirectiveRegistry
  ) {
    // 根据指令名称查找指令对象
    this.directive = directiveRegistry.get(directiveName)

    if (!this.directive) {
      throw new Error(`Directive not found: ${directiveName}`)
    }

    // 优先检查指令是否提供 computed 函数
    if (this.directive.computed) {
      // 使用指令的 computed 函数创建计算对象
      const [getter, params] = this.directive.computed(this.expression)
      this.params = params

      this.computed = store.computedObjects.create(
        (scope) => getter(scope),
        { throws: false }
      )
    } else {
      // 默认：使用 ExpressionParser 解析表达式
      const getter = ExpressionParser.parse(this.expression)

      this.computed = store.computedObjects.create(
        (scope) => getter(scope),
        { throws: false }
      )
    }

    // 监听计算属性变化
    this.setupListener()
  }

  // 监听计算属性变化
  private setupListener() {
    this.computed.watch((value) => {
      this.directive.update(this.el, value, this.params)
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

  // 添加绑定（同名指令去重 + 优先级排序）
  add(el: HTMLElement, binding: Binding): void {
    if (!this.bindings.has(el)) {
      this.bindings.set(el, new Set())
    }
    const bindings = this.bindings.get(el)!

    // 同名指令去重：检查是否已存在相同指令名称的 binding
    const existing = Array.from(bindings).find(b => b.directive.name === binding.directive.name)
    if (existing) {
      // 移除旧的 binding
      existing.destroy()
      bindings.delete(existing)
    }

    // 添加新的 binding
    bindings.add(binding)

    // 按优先级排序
    this.sortBindingsByPriority(el)
  }

  // 按元素获取所有绑定（按优先级排序）
  getByElement(el: HTMLElement): Binding[] {
    const bindings = this.bindings.get(el)
    return bindings ? Array.from(bindings).sort((a, b) =>
      a.directive.priority - b.directive.priority
    ) : []
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

  // 按优先级排序
  private sortBindingsByPriority(el: HTMLElement): void {
    const bindings = this.bindings.get(el)
    if (!bindings) return

    const sorted = Array.from(bindings).sort((a, b) =>
      a.directive.priority - b.directive.priority
    )

    bindings.clear()
    sorted.forEach(b => bindings.add(b))
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

  // 可选的计算属性创建函数
  computed?(expr: string): [
    (scope: any) => any,  // getter 函数
    Record<string, any>  // 额外参数传递给 update
  ]

  // 初始化
  init(el: HTMLElement, binding: Binding): void

  // 更新器
  update(el: HTMLElement, value: any, params?: Record<string, any>): void

  // 清理
  destroy(el: HTMLElement): void
}
```

### ExpressionParser 设计（参数解构）

```typescript
class ExpressionParser {
  // 解析表达式为 getter 函数
  static parse(expression: string): (scope: any) => any {
    // 使用参数解构使表达式可以直接访问 scope 属性
    // "order.count" → (scope) => (({...scope}) => order.count)(scope)
    return new Function('scope', `
      return (({...scope}) => {
        return (${expression});
      })(scope);
    `)
  }

  // 安全性检查
  static validate(expression: string): { safe: boolean; error?: string } {
    // 拒绝危险模式：function, =>, new, ;, (, ), [, ], =
    const dangerous = [
      /\bfunction\b/, /=>/, /\bnew\b/, /;/, /\(/, /\)/, /\[/, /\]/, /=/
    ]

    for (const pattern of dangerous) {
      if (pattern.test(expression)) {
        return { safe: false, error: `Dangerous syntax: ${pattern}` }
      }
    }

    return { safe: true }
  }
}
```

**表达式转换示例：**
```
输入：x-text="order.count"
  ↓
ExpressionParser.parse("order.count")
  ↓
输出：(scope) => (({...scope}) => order.count)(scope)
  ↓
使用：store.computedObjects.create((scope) => getter(scope))
  ↓
最终效果：scope.order.count 可以正确访问
```

### x-for 指令的 computed 函数示例

```typescript
const forDirective: Directive = {
  name: 'for',
  priority: 100,  // 高优先级

  // 特殊的表达式处理
  computed(expr: string): [
    (scope: any) => any,
    Record<string, any>
  ] {
    // 解析 "item of items" 语法
    const [itemVar, listExpr] = expr.split(/\s+of\s+/)

    // 返回 getter 和 params
    return [
      // getter：返回数组（不使用解构，直接访问 scope）
      (scope) => {
        // 通过路径访问：scope.items
        const parts = listExpr.trim().split('.')
        let value = scope
        for (const part of parts) {
          value = value[part]
        }
        return value
      },
      // params：传递给 update 的额外参数
      { item: itemVar.trim() }
    ]
  },

  // update 方法接收 params
  update(el: HTMLElement, value: any[], params: Record<string, any>) {
    const { item } = params
    // value 是数组，item 是迭代变量名
    // 渲染列表项...
  },

  destroy(el: HTMLElement) {
    // 清理...
  }
}
```

**x-for 表达式处理流程：**
```
输入：x-for="item of items"
  ↓
forDirective.computed("item of items")
  ↓
返回：[ getter, { item: "item" } ]
  ↓
创建计算对象：store.computedObjects.create(getter)
  ↓
变化时触发：directive.update(el, value, { item: "item" })
  ↓
update 方法知道数组变化和迭代变量名
```

### 扫描和创建流程

```typescript
// TemplateScanner 扫描模板，返回指令信息
class TemplateScanner {
  scan(el: HTMLElement): DirectiveInfo[] {
    // ... 扫描逻辑

    // 返回结构：{ el, directiveName, expression }
    return [
      { el: span, directiveName: 'text', expression: 'user.name' },
      { el: div, directiveName: 'html', expression: 'content.html' }
    ]
  }
}

// AutoTemplate 创建 Binding
class AutoTemplate {
  #setupWatcher(directiveInfos: DirectiveInfo[]) {
    directiveInfos.forEach(({ el, directiveName, expression }) => {
      // 创建 Binding：传入 DOM、指令名称、表达式
      const binding = new Binding(
        el,
        directiveName,     // 指令名称（如 'text', 'html'）
        expression,        // 表达式（如 'user.name'）
        this.store,
        this.directiveRegistry
      )

      // Binding 内部会：
      // 1. 根据 directiveName 查找指令对象
      // 2. 检查指令是否提供 computed 函数
      // 3. 创建 AutoStore 计算对象

      // BindingManager.add 会自动：
      // 1. 检查同名指令，移除旧的（同名去重）
      // 2. 按优先级排序（优先级执行）
      this.bindings.add(el, binding)
    })
  }
}
```

**同名指令去重示例：**
```html
<!-- 示例：两个 x-text 指令 -->
<span x-text="user.firstName" x-text="user.lastName"></span>

<!-- 扫描结果： -->
<!-- 1. 创建第一个 binding（x-text="user.firstName"） -->
<!-- 2. 创建第二个 binding（x-text="user.lastName"） -->
<!-- 3. BindingManager.add 检测到同名指令，移除第一个，保留第二个 -->
<!-- 结果：只有 x-text="user.lastName" 生效 -->
```

**指令优先级执行示例：**
```html
<!-- 示例：x-for 和 x-text -->
<div x-for="item of items" x-text="item.name"></div>

<!-- 指令优先级：x-for(100) > x-text(200) -->
<!-- 执行顺序： -->
<!-- 1. x-for 先执行（创建列表项） -->
<!-- 2. x-text 后执行（填充文本内容） -->
```

## Deferred Ideas

无 - 讨论保持在阶段范围内。

---

*Phase: 2-表达式系统*
*Context gathered: 2026-06-30*
*Context updated: 2026-07-01*
