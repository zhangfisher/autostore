# 陷阱研究 - 响应式模板引擎

## 常见陷阱

### 1. 内存泄漏 - 事件监听器未清理

**问题描述：**
当元素被移除时，绑定的事件监听器和 watch 回调没有被清理，导致内存泄漏。

**症状：**
- 应用运行时间越长，内存占用越高
- 被移除的元素仍然触发回调
- 性能逐渐下降

**预防策略：**
```typescript
// ✅ 正确：清理时移除所有监听器
class Directive {
  private cleanup: Function[] = []

  destroy(el: HTMLElement): void {
    this.cleanup.forEach(fn => fn())
    this.cleanup = []
  }

  protected addCleanup(fn: Function): void {
    this.cleanup.push(fn)
  }
}

// ✅ 正确：使用 MutationObserver 监听元素移除
const observer = new MutationObserver((mutations) => {
  mutations.forEach(mutation => {
    mutation.removedNodes.forEach(node => {
      if (node instanceof HTMLElement) {
        cleanupDirective(node)
      }
    })
  })
})
```

**哪个阶段解决：** Phase 3 - 基础指令实现

### 2. 无限循环 - 响应式更新触发自身

**问题描述：**
指令的 update 方法在更新 DOM 时，意外触发新的状态变化，导致无限循环。

**症状：**
- 浏览器卡死
- "Maximum call stack size exceeded" 错误
- 内存急剧增长

**预防策略：**
```typescript
// ✅ 正确：更新标志位防止递归
class AutoRender {
  private updating = false

  private triggerUpdate(path: string): void {
    if (this.updating) return

    this.updating = true
    try {
      // 执行更新
    } finally {
      this.updating = false
    }
  }
}

// ✅ 正确：避免在 watch 回调中修改被观察的状态
store.watch('user.name', () => {
  // ❌ 不要这样做
  // store.state.user.name = 'new'

  // ✅ 如果需要，使用 nextTick
  nextTick(() => {
    store.state.user.name = 'new'
  })
})
```

**哪个阶段解决：** Phase 3 - 基础指令实现

### 3. x-for key 重复 - 列表更新错误

**问题描述：**
x-for 循环中的 key 不唯一，导致 diff 算法无法正确匹配元素。

**症状：**
- 列表更新时元素顺序混乱
- 输入框焦点丢失
- 动画错误

**预防策略：**
```typescript
// ✅ 正确：验证 key 唯一性
class XForDirective {
  init(el: HTMLElement, expr: string): void {
    const items = this.evaluateList(expr)
    const keys = items.map(item => this.getKey(item))

    // 检查唯一性
    const uniqueKeys = new Set(keys)
    if (uniqueKeys.size !== keys.length) {
      console.warn(
        '[AutoStore Template] Duplicate key in x-for. ' +
        'Keys must be unique for proper list updates.'
      )
    }
  }
}

// ✅ 正确：提供默认 key 行为
// 如果用户没有指定 key，使用索引作为 fallback
// 但在开发模式下发出警告
```

**哪个阶段解决：** Phase 4 - 列表指令实现

### 4. x-if 和 x-for 优先级冲突

**问题描述：**
当同一个元素同时有 x-if 和 x-for 时，执行顺序导致错误。

**症状：**
- x-for 无法遍历空列表
- x-if 条件在错误的时间求值
- Alpine.js 文档明确规定不支持

**预防策略：**
```typescript
// ✅ 正确：检测并警告
class TemplateScanner {
  scan(el: HTMLElement): DirectiveInfo[] {
    const bindings = this.extractDirectives(el)

    // 检测冲突
    const hasIf = bindings.some(b => b.directive === 'if')
    const hasFor = bindings.some(b => b.directive === 'for')

    if (hasIf && hasFor) {
      throw new Error(
        '[AutoStore Template] Cannot use x-if and x-for ' +
        'on the same element. Use a wrapper element.'
      )
    }

    return bindings
  }
}

// ✅ 正确：提供文档示例
// <template x-for="item in items">
//   <div x-if="item.active">{{ item.name }}</div>
// </template>
```

**哪个阶段解决：** Phase 4 - 控制流指令实现

### 5. XSS 攻击 - x-html 不安全的内容

**问题描述：**
使用 x-html 绑定用户输入的内容，导致脚本注入攻击。

**症状：**
- 用户输入的脚本被执行
- Cookie 被窃取
- 重定向攻击

**预防策略：**
```typescript
// ✅ 正确：在开发模式下警告
class XHtmlDirective {
  update(el: HTMLElement, expr: string): void {
    const content = this.evaluate(expr)

    if (isDevMode() && this.containsScript(content)) {
      console.warn(
        '[AutoStore Template] x-html contains script tags. ' +
        'This may be a security risk.'
      )
    }

    el.innerHTML = content
  }

  private containsScript(html: string): boolean {
    return /<script\b/i.test(html)
  }
}

// ✅ 正确：提供 DOMPurify 集成指南
// 在文档中推荐使用 DOMPurify 清理用户输入
```

**哪个阶段解决：** Phase 3 - 基础指令实现

### 6. 表达式注入 - 恶意表达式执行

**问题描述：**
允许执行任意 JavaScript 表达式，攻击者可以注入恶意代码。

**症状：**
- 任意代码执行
- 数据泄露
- 系统控制

**预防策略：**
```typescript
// ✅ 正确：限制表达式语法
class ExpressionParser {
  private allowedSyntax = [
    // 标识符访问
    /^[\w.]+$/,
    // 字面量
    /^['"[\]{}\w\d\s.:,]+$/,
  ]

  parse(expr: string): CompiledExpression {
    // 验证表达式安全性
    const safe = this.allowedSyntax.some(pattern =>
      pattern.test(expr.trim())
    )

    if (!safe) {
      throw new Error(
        '[AutoStore Template] Unsafe expression: ' + expr
      )
    }

    // 继续解析
  }
}

// ✅ 正确：使用 Function 构造函数而非 eval
const evaluate = new Function('scope', `
  with(scope) {
    return ${expr}
  }
`)
```

**哪个阶段解决：** Phase 2 - 表达式系统

### 7. 性能问题 - 全局扫描开销

**问题描述：**
每次状态变化都扫描整个 DOM 树，导致性能问题。

**症状：**
- 大型应用响应缓慢
- CPU 占用高
- 电池消耗快

**预防策略：**
```typescript
// ✅ 正确：只扫描有指令的元素
class TemplateScanner {
  private scannedElements = new WeakSet<HTMLElement>()

  scan(el: HTMLElement): DirectiveInfo[] {
    if (this.scannedElements.has(el)) {
      return []  // 已扫描，跳过
    }

    this.scannedElements.add(el)
    return this.extractDirectives(el)
  }
}

// ✅ 正确：使用索引快速定位受影响的指令
class AutoRender {
  private directiveIndex = new Map<string, DirectiveBinding[]>()

  private watchPath(path: string): void {
    // 只监听相关的指令
    const bindings = this.directiveIndex.get(path) || []
    bindings.forEach(binding => binding.update())
  }
}
```

**哪个阶段解决：** Phase 6 - 集成和优化

### 8. 异步状态竞争条件

**问题描述：**
异步计算状态更新时，多个状态同时变化导致 UI 不一致。

**症状：**
- 短暂显示错误状态
- 加载状态不正确
- UI 闪烁

**预防策略：**
```typescript
// ✅ 正确：使用状态机管理异步状态
class AsyncState<T> {
  state: 'idle' | 'loading' | 'success' | 'error' = 'idle'
  data: T | null = null
  error: Error | null = null

  get isIdle(): boolean { return this.state === 'idle' }
  get isLoading(): boolean { return this.state === 'loading' }
  get isSuccess(): boolean { return this.state === 'success' }
  get isError(): boolean { return this.state === 'error' }
}

// ✅ 正确：提供 x-loading 和 x-error 指令
// <div x-if="asyncState.isLoading">Loading...</div>
// <div x-if="asyncState.isError">{{ asyncState.error }}</div>
```

**哪个阶段解决：** Phase 5 - 交互指令

### 9. 嵌套 x-for 性能退化

**问题描述：**
三层或更多嵌套的 x-for 导致初始化性能严重下降。

**症状：**
- 初始化时间过长（>1秒）
- 浏览器冻结
- 内存占用高

**预防策略：**
```typescript
// ✅ 正确：检测深层嵌套并警告
class XForDirective {
  static nestingLevel = 0
  static readonly MAX_NESTING = 3

  init(el: HTMLElement, expr: string): void {
    XForDirective.nestingLevel++

    if (XForDirective.nestingLevel > XForDirective.MAX_NESTING) {
      console.warn(
        `[AutoStore Template] Deep x-for nesting detected (${nestingLevel} levels). ` +
        `Consider flattening your data structure.`
      )
    }

    // ... 初始化逻辑
  }

  destroy(): void {
    XForDirective.nestingLevel--
  }
}

// ✅ 正确：提供分块渲染
// 对于大型列表，分批渲染 DOM 节点
```

**哪个阶段解决：** Phase 4 - 列表指令实现

### 10. this 上下文丢失

**问题描述：**
在事件处理器中，this 不指向预期对象。

**症状：**
- 事件处理器报错
- 无法访问 store
- 无法调用方法

**预防策略：**
```typescript
// ✅ 正确：绑定 this
class XOnDirective {
  init(el: HTMLElement, expr: string): void {
    const handler = this.createHandler(expr)

    el.addEventListener(event, handler.bind(this))
  }

  private createHandler(expr: string): Function {
    return (event: Event) => {
      const scope = {
        $event: event,
        $el: this.element,
        $store: this.store
      }

      return this.evaluate(expr, scope)
    }
  }
}
```

**哪个阶段解决：** Phase 5 - 交互指令

## 早期检测信号

### 开发模式警告
- 重复的 key
- 深层嵌套
- 不安全的表达式
- x-if 和 x-for 冲突

### 性能监控
- 初始化时间 > 100ms：发出警告
- 更新时间 > 16ms：记录性能数据
- 内存增长：检测内存泄漏

### 运行时断言
```typescript
if (isDevMode()) {
  assert(typeof condition === 'boolean',
    'x-if condition must be boolean')
  assert(Array.isArray(items),
    'x-for requires an array')
}
```

## 最佳实践总结

1. **始终清理监听器** - 在 destroy 方法中移除所有监听
2. **避免递归更新** - 使用标志位防止无限循环
3. **验证输入** - 检查 key 唯一性、表达式安全性
4. **提供警告** - 开发模式下帮助开发者发现问题
5. **优化性能** - 只扫描必要的元素，建立索引
6. **处理异步** - 使用状态机管理异步状态
7. **绑定上下文** - 确保 this 指向正确对象

---
*研究日期：2025-06-30*
*来源：Alpine.js GitHub Issues、Vue.js 文档、前端安全最佳实践*
