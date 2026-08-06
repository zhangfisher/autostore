# 指令系统统一语言 (Glossary)

> v0.1 · 活文档（living document）——随 `/grill-with-docs` 会话推进而更新。
> 任何对指令系统的讨论应使用以下术语，避免歧义。

## 核心术语

### DirectiveKind（指令类别）
标识一条指令归属哪条执行通道的**静态**类字段。三值：

| 值 | 名称 | 通道 | 出现在结果元素？ |
|---|---|---|---|
| `Compile`(0，默认) | 编译时指令 | scope/compiler 通道 | ❌（属性被剥除） |
| `Runtime`(1) | 运行时指令 | observer 通道 | ✅（属性保留） |
| `Hybrid`(2) | 混合指令 | scope + observer 双通道 | ✅（属性保留） |

### 编译时指令 (Compile-time directive)
- **执行时机**：模板编译期。
- **职责**：指导如何编译模板（结构变换），如 `x-if` / `x-for`。
- **结果元素**：**不出现**——`removeDirectives` 剥除其属性。
- **生命周期**：`created()` → `compile()` → `destroy()`（走 scope 通道）。
- **反应式来源**：`scope.watch`（支持相对 scope 的表达式 / x-data 局部变量 / x-for item）。

### 运行时指令 (Runtime directive)
- **执行时机**：编译期编译器**致盲**（不建 scope、不调 created/compile）；运行时由 observer 驱动。
- **结果元素**：**属性保留**，允许通过 DOM API（`setAttribute` / `removeAttribute`）改值或删除。
- **生命周期**：observer 检测到 add → `mounted()`；remove → `unmounted()`；attributes 变化 → 重绑定。
- **反应式来源**：**仅 `engine.store.watch(绝对路径)`**——不接受 scope 相对表达式（运行时 DOM 新增元素无 scope 上下文）。
- **初始化资源**：通过 `static Initialize(engine)` 建立 per-engine 的 MutationObserver。

### Hybrid 指令（双通道）
- **scope 通道**：编译器建 scope + `created`/`compile`/`destroy`，**保留属性**（让 observer 可见）→ 拿到 `scope.watch` 相对表达式反应性。
- **observer 通道**：add/remove → `mounted`/`unmounted` → 拿到元素生命周期（widget 类指令 init/teardown）。
- **职责不重叠，无需去重**：scope 通道管反应性，observer 通道管生命周期。
- **真实用例**：`x-widget="{ min: today }"` 类——既要 scope 相对绑定，又要在 mount 时初始化第三方组件、unmount 时销毁。
- **优雅降级**：运行时 DOM API 新增的 Hybrid 元素无 scope → 仅 `mounted`/`unmounted` 生命周期，无 scope 反应性。

## 通道 (Channel)

### scope 通道
编译期执行管线：`createDirectives` 实例化 → `created()`（建订阅）→ `compile()`（首渲）→ `destroy()`（清理）。现行所有指令的唯一通道。

### observer 通道
`static Initialize(engine)` 在 engine 初始化后建立的 MutationObserver，运行时指令的执行与生命周期管线。`engine.el` 上每类 runtime 指令一个 observer。

## 钩子 (Hooks)

### initialize / dispose 钩子（所有 kind 通用，可选）
`static initialize(engine): void` / `static dispose(engine): void`——engine 初始化后 / 销毁时对**每个注册指令类**（不分 Compile/Runtime/Hybrid）调用一次。基类提供 no-op 默认，指令按需 override。典型用途：runtime 指令建立 per-engine observer、注入全局样式、预编译类级资源。晚注册的指令在 `DirectiveManager.set` 时补调 initialize。幂等：同一 (类, engine) 仅一次（`DirectiveManager._initialized` 保证）。

### mounted() / unmounted() / attrChanged()
运行时指令的生命周期钩子。**调用方是 observer 通道**：add → `mounted()`、remove → `unmounted()`、属性值变化 → `attrChanged(newVal, oldVal)`（仅重绑 watcher、保留实例状态如 delay 定时器，非 unmount+remount）。编译时指令不使用。

### RuntimeDirective 接口
`interface RuntimeDirective { mounted(); unmounted(); attrChanged?(newVal, oldVal) }`。
`Runtime`/`Hybrid` 指令 `extends AutoTemplateDirectiveBase implements RuntimeDirective`。编译时指令不实现此接口。运行时判别仍以 `static kind` 为准（`implements` 仅编译期契约）。

### AutoTemplateDirectiveBase（形状，决策 C）
单一基类，两类指令共用：
- `binding?: AutoTemplateScope`（改**可选**——runtime 实例无 scope）；
- `el` 与 `binding.el` **解耦**——runtime 实例由 observer 直接注入 `el`；
- 静态字段：`kind`（默认 `Compile`）、`priority`、`singleton`、`ownsChildren`、`initialize(engine)`、`dispose(engine)`；
- 实例钩子：scope 通道 `created`/`compile`/`destroy`；observer 通道 `mounted`/`unmounted`/`attrChanged`（基类皆为空实现，调用总安全）。

## 决策记录
- ✅ [ADR-0001] 运行时指令走纯 observer 通道（方案 A）—— *待补全 Initialize/Dispose 契约后定稿*
