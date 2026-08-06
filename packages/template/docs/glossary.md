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

## 动态 patch（模板增量编译）

### 事实源方向（Source-of-Truth Direction）
`engine.template` 为**唯一事实源**（只读编译输入）；运行树为派生、一次性产物。动态编译**只经修改模板触发**，不提供"运行树 → 模板"反向桥。见 [ADR-0002](adr/0002-dynamic-patch.md) 决策 1。

### 正向桥（Forward Bridge）
"模板元素 → scope"的映射，编译期由 `WeakMap<模板el, scope>` 维护（scope 创建时登记）。`patch(templateEl)` 经正向桥定位 scope，再取 `scope.el`（运行元素）。**仅 scope 元素有正向桥**；裸元素无映射，不可直接 patch。

### 补丁单元（Patch Unit）
一次 `patch` 重建的最小范围 = **一个 scope 的子树**（destroy `scope.children` + `compileSubtree` 重挂，复用 `_recompileSubtree`）。scope 元素**自身**不在重建范围内。

### 增量编译 vs 全量编译
- **增量编译（`patch`）**：仅重建 patch 目标 scope 子树，保留其余子树运行态（焦点/滚动/未提交输入）。覆盖"在 scope 内插/删/改子节点"。
- **全量编译（`compile`）**：重建整棵运行树（`replaceChildren`），丢弃全部运行态。用于初始化或"scope 自身指令变更"等 patch 不覆盖的场景。

### 动态区域（Dynamic Region）/ 稳定子树（Stable Subtree）
- **稳定子树**：非结构指令作用域内的静态子树，模板与运行树 1:1 同构，正向桥可靠，可 patch。
- **动态区域**：`x-for` 项内 / `x-if` 分支内——运行侧结构由指令运行时生成，与模板非同构，正向桥不保证。patch 目标落在动态区域（祖先链含 `ownsChildren` 结构指令）时拒绝或升级重建。

### Runtime 指令与 patch 的关系
纯 Runtime 指令（`x-loading`）**不建 scope**，不在 patch 范围；但其 observer 通道（[ADR-0001](adr/0001-directive-kind-system.md)）**本就响应原生 DOM 变更**，无需 patch。故 patch 边界 = scope = scope 通道（Compile/Hybrid）指令，无遗漏。

### x-patch（哨兵指令）
零副作用 Compile 指令，唯一作用是让裸元素成为 scope（进正向桥）、从而可被 `engine.patch` 定位。`created`/`compile`/`destroy` 全 no-op，不建 `_scopes[id]` 数据域、不注入 `dataScope`。等效 `x-data="{}"` 但更轻、更语义化。用法：`<div id="x" x-patch></div>` → `engine.patch("#x", ...)`。

## 事件总线（信号面）

### 信号面（Signal Plane）
与**数据面**（`store.state`，承载值）和**控制面**（直接命令调用，承载确定性控制流）正交的**第三通讯平面**。承载离散事件的通知/协调/可观测，机制为 `FastLiteEvent`。见 [ADR-0003](adr/0003-engine-event-bus.md) 决策 1。

### 事件分层（Event Hierarchy）
事件名以 `/` 分段构成层级（如 `directive/loading/mounted`）。命名空间用指令**注册名**（`getDirectives` 的 `info.name` / `presetDirectives` 的 key，如 `loading`），非 DOM 属性名（`x-loading`）。配合通配符 `*`（恰好一段）/ `**`（仅末尾、零或多段）实现"精确订阅 + 通配订阅一批"。**注意**：此分层是**事件名层级**，不是已砍掉的 `FastEventScope` 命名空间隔离。四条不变量（动词固定深度 / 受控动词词表 / 主体固定槽 / 阶段后缀）保证通配可预测。见 [ADR-0003](adr/0003-engine-event-bus.md) 决策 3。

### 动词词表（Verb Vocabulary）
跨指令/跨源共享的受控事件动词集合，镜像 [ADR-0001](adr/0001-directive-kind-system.md) 的两条通道：
- **observer 通道**：`mounted` / `unmounted` / `attr-changed`
- **scope 通道**：`created` / `compiled` / `destroyed`
- **指令自定**（登记制扩词表）：x-for `rendered`/`item-added`/`item-removed`；x-data `ready`/`resolved`

一律过去时/状态形容词，禁命令式。使 `directive/*/mounted`（任意指令挂载）、`task/*/started`（任意异步源开始）等"跨主体抓同动词"模式成立。

### task 域（进行中的工作单元）
事件总线中承载**有生命周期、进行中的工作**的域：`task/<source>/<verb>`——source 受控为 `x-data`/`x-on`/`computed`/`user`，verb 为 `started`/`ended`/`progressed`/`resolved`/`rejected`。使全局 loading / 错误 toast / 进度 / Suspense 等**跨源协调**成为可能（`task/*/started` = 任意任务开始）。实现上 `task/computed/**` **转发** store 的 `observer:*` 事件，模板原生源（x-data 异步初值 / x-on async action）需插桩。**命名沿革**：前身 `async/**`，因"async 描述机制而非领域、且与响应式 signal 概念撞名"改为 `task`（离散工作单元，语义贴切）。见 [ADR-0003](adr/0003-engine-event-bus.md) 决策 3.2/3.5。

### 通配契约（Wildcard Contract）
分层命名承诺的可订阅模式。高价值模式：`<域>/<主体>/*`（一主体全动作）、`<域>/*/<动词>`（跨主体同动词，★ 核心）、`<域>/**`（一域全部）、`**`（全部= `onAny`）。详见 [ADR-0003](adr/0003-engine-event-bus.md) 决策 3.4。

### 态信号 vs 流信号（retain 纪律）
- **态信号**（一次性、表"当前是否就绪"，如 `engine/ready`、`directive/x-data/ready`）→ **`retain=true`** emit：晚订阅者立即补拿，规避 priority 顺序竞态（A 先发、B 后订则 B 错过）。
- **流信号**（可重复、表"发生了"，如 `task/*/started`、`directive/x-for/item-added`）→ **plain emit**：retain 只留最后一条，用于流信号反错。

**铁律：态信号 retain，流信号 plain。** 见 [ADR-0003](adr/0003-engine-event-bus.md) 决策 6。

### RuntimeObserverDispatcher
engine 级共享 MutationObserver 分发器（`engine.el` 上单一 observer，`attributeFilter` 覆盖所有 runtime 指令属性）。按变更属性名路由到对应指令类的 `mounted`/`unmounted`/`attrChanged`，并同步广播 `directive/<name>/**` 事件。替代此前 runtime 指令各自建 observer（如 `loading.ts`）的做法，顺带落地 [ADR-0001](adr/0001-directive-kind-system.md)【实现注记】的"单一共享 observer"。见 [ADR-0003](adr/0003-engine-event-bus.md) 决策 7。

## 响应式插值（Reactive Interpolation）

### 响应式插值 / Mustache 表达式
模板文本节点中的 `{{ expr }}` 语法。编译期把含 `{{}}` 的文本节点拆成「字面量段 + 表达式段」，每表达式段建独立 text node + 一个 `scope.watch(expr)`。反应式**全复用** `scope.watchExpression`（`with(scope){return (EXPR)}` + `collectDependencies`），**零新订阅机制**——与 x-text/x-bind 同构。见 [ADR-0004](adr/0004-reactive-text-interpolation.md) 决策 1。分隔符固定 `{{ }}`（正则 `/\{\{\s*([\s\S]*?)\s*\}\}/g`），可配置性留待后续。

### 插值段（Interpolation Segment）
含 `{{}}` 的文本节点拆分后的最小单位：字面量段（静态 text node）或表达式段（text node + watcher）。多段拆分模型（而非单节点复合 watcher）：每段 watcher 只改自己的 text node `nodeValue`，patch 简单、destroy 粒度自然。见 [ADR-0004](adr/0004-reactive-text-interpolation.md) 决策 3。

### 合成 scope（Synthesized Scope / 隐式指令）
含 `{{}}` 但无任何显式指令的元素，由编译器**自动建 scope**（条件 `hasDirectives(el) || hasInterpolatedDirectText(el)`）。`hasInterpolatedDirectText` 只扫**直接** Text 子节点（非递归、O(直接子节点数)）。合成 scope 与指令 scope 同构（登记 `engine.scopes`、`_linkParent`、继承 localScope、destroy 递归清理），插值等同一个隐式指令。保证 scope 先于文本转换器就位，转换器经 `templateScopeMap.get(parentElement)` 即可取 scope，无需 old→new 元素映射。见 [ADR-0004](adr/0004-reactive-text-interpolation.md) 决策 2。

### compileTextNode（文本节点编译函数）
抽自「拆分 + 注册」的复用函数 `compileTextNode(node, scope): Node`，被**两处**调用：① 主 walk 的文本 NodeTransformer；② `compileSubtree` 的文本分支。修掉 `compileSubtree` 此前对文本节点 `cloneNode(true)` 绕过所有转换器、导致 x-for 项 / x-if 子树插值静默失效的暗坑。见 [ADR-0004](adr/0004-reactive-text-interpolation.md) 决策 4。

### x-text 静默胜出（Silent Precedence）
同元素既有 `x-text`/`x-html` 又有直接文本 `{{}}` 时，x-text 胜出、插值文本**剪枝**（`compileTextNode` 返回 `null`，文本节点不入渲染 DOM——不拆分、不注册 watcher、字面 `{{}}` 亦不可见）。「静默」的严谨含义是剪枝而非「建了被覆盖」或「返回克隆」——二者都会让插值段 node 被 appended 在 x-text 的 text node 之后（x-text 的 `textContent=` 在 compile 期、子节点挂载前执行），致字面泄漏 + 孤儿 watcher。见 [ADR-0004](adr/0004-reactive-text-interpolation.md) 决策 5。

### 转义纪律（Escaping Discipline）
插值结果一律 `String(value)` 写入 text node `nodeValue`（浏览器自动转义、XSS 安全）；原始 HTML 注入是 x-html 的职责，**非插值职责**。`{{{ }}}`（三花括号、原始 HTML）本轮不做，留作 fast-follow。见 [ADR-0004](adr/0004-reactive-text-interpolation.md) 决策 6。

### 插值反应式继承 localScope 约束
插值不引入新反应式语义，完全继承 `scope.watch` 的 localScope 行为：`{{obj.field}}`（obj 为响应式对象引用）细粒度响应；`{{n}}`（primitive 循环变量 / `$index` / `$end`，localScope 普通属性）`collectDependencies` 收不到，仅靠项 rebind 时的 `scope.refresh()` 兜底重算（引擎现状，所有指令同此约束）。见 [ADR-0004](adr/0004-reactive-text-interpolation.md) 决策 8。

### 属性插值 / desugar-to-x-bind
属性值中的 `{{}}`（`class="row {{type}}"`、`href="/u/{{id}}"`、`disabled="{{isLocked}}"`）。编译期把整属性值合成一条表达式，等同一个合成的 `:attr` 绑定，**全量复用 `BindDirective`（`bind.ts`）五路分派**（class diff / style / property / boolean / 普通），零 patch 重复。每个被插值的属性 = **一个复合 watcher**（属性原子，任一依赖变都重组整串），区别于文本插值的多段多 watcher。见 [ADR-0004](adr/0004-reactive-text-interpolation.md) 决策 9-10。

### 整体单段 vs 混合段（属性合成规则）
属性插值合成表达式按值形态分两种，**关键规则**：
- **整体单段**（整个值就是一个 `{{E}}`，如 `disabled="{{isLocked}}"`、`class="{{obj}}"`）→ 合成**原始 `E`**（不拼接不强转），让 BindDirective 类型分派拿**原生值**（boolean 拿 bool、class 拿对象/数组）。规避 `disabled="{{isLocked}}"` 在 `false` 时合成字符串 `"false"` 恒真照样禁用的 HTML boolean 坑。
- **混合段**（字面量 + ≥1 `{{E}}`，如 `class="row {{type}}"`）→ 合成 **concat + 每段 nullish→`''` 强转**（`'row ' + (type==null?"":type)`），属性本就为字符串。

见 [ADR-0004](adr/0004-reactive-text-interpolation.md) 决策 10。

### desugar 移除原生平属性
合成的 `:attr` 接管该属性全部值，故须 `removeAttribute` 移除渲染元素上的原生平属性——否则字面 `{{type}}` 会作为 class token 泄漏进 classList，而 `BindDirective.patchClass` 的 `lastApplied` 脏追踪永不会删原生 token。见 [ADR-0004](adr/0004-reactive-text-interpolation.md) 决策 11。

### 同属性冲突编译期报错（非静默）
元素同时有显式 bind（`:class`/`x-class`/`:style`/…）与**同属性名**的插值 → **编译期抛错**。不沿用 x-text 静默胜出：属性冲突会致 class diff 损坏、或因 desugar 已移除平属性而丢失静态部分。指令属性值内的 `{{}}`（`:class="a {{b}}"`）不处理（指令值本身是表达式）。见 [ADR-0004](adr/0004-reactive-text-interpolation.md) 决策 12。

## 原始 HTML 注入（x-html）

### x-html（默认消毒的原始 HTML 注入）
将状态值作为原始 HTML 注入元素 `innerHTML` 的指令。与 `x-text` 同构（复用 `scope.watch` 全套反应式底座、`priority=0`、`singleton`、Compile 通道），差别仅 patch 写 `innerHTML`（解析为 DOM）而非 `textContent`（转义文本）。**默认经 sanitizer 消毒**（safe-by-default，与本引擎 `{{}}` 插值默认 XSS 安全的哲学一致），与 Vue `v-html` / Alpine `x-html`（默认裸奔）相反。注入内容**不编译**（静态快照，不建 scope/watcher）。见 [ADR-0005](adr/0005-x-html-directive.md) 决策 1/2/5。

### .raw 修饰符（退出消毒的逃生舱）
`x-html.raw="expr"` **跳过 sanitizer**，把绑定值原样写入 `innerHTML`——用于受信内容（自家服务端富文本/本地静态片段）。命名取 `raw`（正向描述「原始 HTML」、简短、生态熟面：Vue 文档称原始 HTML 产物为 "raw HTML"），优于 `.nosafe`（双重否定）/`.unsafe`（可用但偏长）。启用时无视绑定值类型，原样插入。见 [ADR-0005](adr/0005-x-html-directive.md) 决策 3。

### 可插拔 sanitizer（safe-by-default + 升级路径）
`engine.options.sanitizer?: (html: string) => string`。默认 = 内置极简 `sanitizeHtml`（`utils/sanitize.ts`，`<template>` 惰性解析 + DOM 遍历，剥 `<script>`/`on*` 事件属性/危险协议 URL）。**极简 sanitizer 非无懈可击**（mutation XSS / foreign content 不覆盖）——这是 aware 的权衡、非虚假安全感：高安全场景注入 DOMPurify（`{ sanitizer: DOMPurify.sanitize }`）即获工业级。选 DOM 遍历而非 regex 以抗 mutation XSS。见 [ADR-0005](adr/0005-x-html-directive.md) 决策 4。

### 内容指令确定性优先级（x-text + x-html 同元素）
二者皆独占元素内容、同 `priority=0`、不同名单例不去重。采「确定性优先级 + 文档」（非 fail-fast、非任其竞争）：**x-text 在同 scope 含 `html` 指令时 `created()` 直接 no-op**（一行守卫），使 x-html 恒为唯一写入者，与属性声明顺序、`_updates` 数组顺序皆无关——完全确定。区别于属性冲突的编译期报错（ADR-0004 决策 12）。见 [ADR-0005](adr/0005-x-html-directive.md) 决策 6。

## 引擎边界（x-slot）

### x-slot（engine 边界 / 隔离快照）
在模板中划一块**独立于 engine 的隔离 DOM 区域**的指令。当前 engine 编译**到 x-slot 为止、不进入其内部**——static 模式下内容是冻结快照（不编译、不建 scope、不注册 watcher），engine 永不覆写。两种形态由**有无值**切换（二选一、无第三态）：无值 `x-slot` → static；有值 `x-slot="expr"` → remote。是 `ownsChildren` 结构指令（与 x-for/x-if 同机制拦截子节点自动递归），故不能与 `x-for`/eager `x-if` 同元素（`_resolveOwnership` 抛 owners 冲突）。见 [ADR-0006](adr/0006-x-slot-directive.md) 决策 1。

### 威胁边界 T1/T2/T3（x-slot「保持原样」防什么）
- **T1 反应式刷新**（scheduler flush → watcher 重求值 → patch）：✅ **挡**——x-slot 内无 watcher、宿主无 x-text/x-html 覆写，frozen+ownsChildren 天然使刷新碰不到内容。**这是 x-slot 核心价值**。
- **T2 结构重建**（x-if toggle / engine.data 子树重建 / engine.patch）：❌ **不挡**——与普通元素一视同仁，宿主销毁则内容/child engine 随销，重建时静态重克隆 / remote 重 fetch。
- **T3 全量重编译**（engine.compile）：❌ **不挡**——整树 replaceChildren 无幸存。
用户「engine 不碰内容」「隔离 DOM 空间」诉求由 T1 满足；T2/T3 是结构重建固有行为。见 [ADR-0006](adr/0006-x-slot-directive.md) 决策 2。

### 冻结快照（Frozen Snapshot）
static 模式下 x-slot 内容的形态：`compile()` 把 `this.template` 子节点**深克隆**进宿主、**剥除全部 x-\* 指令属性**（产出洁净静态 HTML，与引擎全局惯例一致），**不编译**。内层 `{{}}`/x-text/:bind 一律**静默失效**（非「编译后被冻结」，而是根本不编译）；编译期检测到内层指令/插值记 `logger.warn`（非抛错）。见 [ADR-0006](adr/0006-x-slot-directive.md) 决策 1。

### static 模式 / remote 模式
x-slot 的两种工作模式：**static**（无值 `x-slot`）= 冻结快照、无 engine、开发者 DOM API 全权管理；**remote**（有值 `x-slot="expr"`）= 从响应式 url fetch 模板、在其上建完全独立的 [child engine](#child-engine子引擎)。模式由值的有无切换。见 [ADR-0006](adr/0006-x-slot-directive.md) 决策 1/4。

### url 响应式（Reactive URL）
remote 模式下 `x-slot="expr"` 的 `expr` 是**反应式表达式**，经 `scope.watch` 求值（与 x-text/x-html 同构——复用路径/表达式双轨、collectDependencies、scheduler 合并；支持 scope 相对路径、x-data 局部、x-for item）。watch 返回值即 url：假/空 → 无 engine；有效字符串 → fetch + 建 engine；**值变化 → 销毁当前 child engine + 重新 fetch + 重建**。换 `state.apiUrl` 即换子模板，零额外接线。见 [ADR-0006](adr/0006-x-slot-directive.md) 决策 4。

### child engine（子引擎）
remote 模式在 x-slot 宿主上创建的**完全独立** `AutoTemplateEngine` 实例：`new AutoTemplateEngine(host, new AutoStore({}))`——自带空 store（fetched HTML 用自身 x-data 自治声明，**不复用父 store**，与父状态零耦合），以宿主为挂载点（fetch 成功后 `host.innerHTML = html` 再构造，宿主身份不变、仅子节点被接管）。挂在指令实例 `this.childEngine`（非 scope 对象——指令 own 自己的资源、SRP）。**随 `scope.destroy()` 销毁**（指令 `destroy()` 调 `childEngine.destroy()` + abort 在途 fetch），零额外接线、无泄漏。见 [ADR-0006](adr/0006-x-slot-directive.md) 决策 4/5。

### slot 盲区（Slot Blind Zone）
隔离父/子双 dispatcher 抢管的机制。父 `RuntimeObserverDispatcher` 以 `subtree:true` 观察 `engine.el`，child engine 写进宿主的运行时指令属性（如 x-loading）会被父 dispatcher 二次 mount。x-slot `created()` 调 `dispatcher.addSlotRoot(host)` 登记宿主为盲区；dispatcher 的 `collectEls`/`_handle` 对盲区内节点（`slotRoots.some(r => r===el || r.contains(el))`）跳过 mount/attr 派发；`destroy()` 注销。子树运行时指令完全由 child engine 自身 dispatcher 负责。见 [ADR-0006](adr/0006-x-slot-directive.md) 决策 8。

### task/slot 事件（远程加载信号）
remote 模式经 [信号面](#信号面signal-plane) 广播的离散事件：`task/slot/started`（fetch 开始，流信号 plain emit）/ `task/slot/resolved`（成功）/ `task/slot/rejected`（失败）。使「用真正的 x-loading 统一全局加载态」成为 opt-in（用户放 x-loading 订阅 `task/slot/*`，经 task 域跨源协调）。与默认的自渲染 loading 占位互补。见 [ADR-0006](adr/0006-x-slot-directive.md) 决策 6/7、[ADR-0003](adr/0003-engine-event-bus.md) 决策 3.2。

## 决策记录
- ✅ [ADR-0001] 运行时指令走纯 observer 通道（方案 A）—— *待补全 Initialize/Dispose 契约后定稿*
- ✅ [ADR-0002] 动态 patch 机制（模板增量编译）—— *待确认"scope 自身指令变更"处置*
- ✅ [ADR-0003] 事件总线（信号面）与分层事件契约 —— *Accepted（Round 3）*
- ✅ [ADR-0004] 响应式文本插值（`{{ }}`）—— *Accepted（Round 1，grill-with-docs）*
- ✅ [ADR-0005] x-html 指令（默认消毒的原始 HTML 注入）—— *Accepted（Round 1，grill-with-docs）*
- ✅ [ADR-0006] x-slot 指令（engine 边界 / 隔离快照 / 远程子引擎）—— *Accepted（Round 5，grill-with-docs）*
