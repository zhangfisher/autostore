# 架构研究 - AutoStore Template

## 系统架构概述

AutoStore Template 采用分层架构，从上到下分为：

```
┌─────────────────────────────────────────┐
│         用户代码 (User Code)              │
│  const app = new AutoRender(el, store)   │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│       核心引擎 (Core Engine)             │
│  - AutoRender 主类                       │
│  - 生命周期管理                          │
│  - 指令注册表                            │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│      指令系统 (Directive System)         │
│  - Directive 基类                        │
│  - 具体指令实现                          │
│  - 指令优先级管理                        │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│     解析器 (Parser & Scanner)            │
│  - 模板扫描                              │
│  - 指令提取                              │
│  - 表达式解析                            │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│       响应式系统 (Reactivity)            │
│  - AutoStore Core                        │
│  - 依赖追踪                              │
│  - Watch 监听                            │
└─────────────────────────────────────────┘
```

## 核心组件

### 1. AutoRender 类

**职责：** 顶层 API，生命周期管理

```typescript
class AutoRender {
  constructor(
    private el: HTMLElement,
    private store: AutoStore,
    private options: RenderOptions
  ) {}

  start(): void          // 启动渲染引擎
  stop(): void           // 停止渲染引擎
  destroy(): void        // 清理资源
}
```

**关键方法：**
- `start()` - 扫描模板，初始化指令，建立依赖
- `stop()` - 移除所有监听器，停止更新
- `destroy()` - 完全清理，包括移除 DOM 修改

### 2. DirectiveSystem（指令系统）

**职责：** 管理所有指令的注册和执行

```typescript
interface Directive {
  name: string                    // 指令名称（如 'if', 'for'）
  priority: number               // 执行优先级
  init(el: HTMLElement, ...args): void   // 初始化
  update(el: HTMLElement, ...args): void // 更新
  destroy(el: HTMLElement): void         // 清理
}

class DirectiveRegistry {
  private directives: Map<string, Directive>

  register(name: string, directive: Directive): void
  get(name: string): Directive | undefined
  has(name: string): boolean
}
```

**指令优先级：**
1. x-for (最高) - 需要先创建子元素
2. x-if (高) - 需要先决定是否渲染
3. x-bind, x-on (中)
4. x-text, x-html, x-visible (低)

### 3. TemplateScanner（模板扫描器）

**职责：** 扫描 DOM 树，提取指令信息

```typescript
class TemplateScanner {
  scan(el: HTMLElement): DirectiveInfo[]

  private walk(el: HTMLElement): void
  private extractDirectives(el: HTMLElement): DirectiveBinding[]
  private parseExpression(expr: string): ParsedExpression
}

interface DirectiveBinding {
  directive: string        // 指令名称
  expression: string       // 表达式字符串
  element: HTMLElement      // 绑定的元素
}
```

**扫描策略：**
- 使用 TreeWalker API 高效遍历
- 只处理有 x- 前缀的属性
- 跳过已经处理过的元素（标记已扫描）

### 4. ExpressionParser（表达式解析器）

**职责：** 解析和求值表达式

```typescript
class ExpressionParser {
  parse(expr: string): CompiledExpression
  evaluate(compiled: CompiledExpression, scope: any): any
}

interface CompiledExpression {
  dependencies: string[]    // 依赖的状态路径
  evaluate(scope: any): any // 求值函数
}
```

**表达式类型：**
- 标识符：`user.name` → 依赖 `['user.name']`
- 字面量：`'hello'` → 无依赖
- 表达式：`count + 1` → 依赖 `['count']`

### 5. Directive 实现类

#### XIfDirective
```typescript
class XIfDirective implements Directive {
  name = 'if'
  priority = 100

  init(el: HTMLElement, expr: string): void {
    const getter = createGetter(expr)
    const condition = getter(store.state)

    if (!condition) {
      el.remove()  // 移除元素
      this.placeholder = document.createComment('x-if')
      el.replaceWith(this.placeholder)
    } else {
      this.placeholder = null
    }
  }

  update(el: HTMLElement, expr: string): void {
    // 重新计算条件
    // 根据条件添加/移除元素
  }
}
```

#### XForDirective
```typescript
class XForDirective implements Directive {
  name = 'for'
  priority = 90

  init(el: HTMLElement, expr: string): void {
    // 解析 "item of items" 语法
    // 获取列表数据
    // 为每个项克隆模板
  }

  update(el: HTMLElement, expr: string): void {
    // diff 算法
    // 最小化 DOM 操作
  }
}
```

## 数据流

### 初始化流程

```
1. new AutoRender(el, store, options)
   ↓
2. app.start()
   ↓
3. scanner.scan(el) - 扫描模板
   ↓
4. 为每个元素创建 DirectiveBinding
   ↓
5. 按优先级排序指令
   ↓
6. 依次调用 directive.init()
   ↓
7. 为每个表达式建立 store.watch()
   ↓
8. 引擎进入活动状态
```

### 更新流程

```
1. store.state 某路径发生变化
   ↓
2. AutoStore 触发 watch 回调
   ↓
3. 获取该路径对应的所有 DirectiveBinding
   ↓
4. 按优先级重新排序
   ↓
5. 依次调用 directive.update()
   ↓
6. Directive 执行 DOM 更新
   ↓
7. 重复依赖追踪（如果表达式引用了新路径）
```

## 组件边界

### AutoStore Template 的职责
- 模板扫描和指令解析
- 指令的初始化和更新
- DOM 操作和更新
- 表达式求值和依赖追踪

### AutoStore Core 的职责
- 响应式状态管理
- Proxy 拦截和依赖收集
- watch 监听系统
- 计算属性求值

**清晰的边界：**
- Template 不处理状态逻辑
- AutoStore 不处理 DOM 操作
- 通过 watch 回调连接两者

## 构建顺序建议

### Phase 1: 核心基础设施
1. AutoRender 类骨架
2. DirectiveRegistry
3. TemplateScanner 基础扫描

### Phase 2: 表达式系统
1. ExpressionParser
2. 依赖提取
3. 表达式求值

### Phase 3: 基础指令
1. XTextDirective
2. XHtmlDirective
3. XVisibleDirective

### Phase 4: 控制流指令
1. XIfDirective
2. XForDirective

### Phase 5: 交互指令
1. XOnDirective (事件绑定)
2. XBindDirective (属性绑定)
3. XClassDirective
4. XStyleDirective

### Phase 6: 集成和优化
1. 与 AutoStore 完整集成
2. 性能优化
3. 错误处理和边界情况

## 关键设计决策

### 为什么不使用虚拟 DOM？
- AutoStore 已提供细粒度依赖追踪
- 直接 DOM 操作在这个场景下更高效
- 避免虚拟树的内存开销

### 为什么指令有优先级？
- x-for 需要先创建子元素，其他指令才能操作
- x-if 需要先决定是否渲染，避免无效操作
- 保证指令执行顺序的一致性

### 为什么使用 TreeWalker？
- 比 querySelectorAll 更高效
- 可以过滤节点类型
- 支持增量遍历

---
*研究日期：2025-06-30*
*来源：Alpine.js 源码分析、Vue.js 架构文档、响应式系统最佳实践*
