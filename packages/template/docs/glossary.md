# 指令系统统一语言 (Glossary)

> v0.1 · 活文档（living document）——随 `/grill-with-docs` 会话推进而更新。
> 任何对指令系统的讨论应使用以下术语，避免歧义。

## 核心术语

### DirectiveKind（指令类别）

标识一条指令归属哪条执行通道的**静态**类字段。三值：

| 值                 | 名称       | 通道                    | 出现在结果元素？ |
| ------------------ | ---------- | ----------------------- | ---------------- |
| `Compile`(0，默认) | 编译时指令 | scope/compiler 通道     | ❌（属性被剥除） |
| `Runtime`(1)       | 运行时指令 | observer 通道           | ✅（属性保留）   |
| `Hybrid`(2)        | 混合指令   | scope + observer 双通道 | ✅（属性保留）   |

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

"模板元素 → scope"的映射，复用编译期 `templateScopeMap`（实例字段，半持久化），经 `compiler.getScopeByTemplate(el)` 访问。`patch(selector, updater)` 的 selector 对 `engine.template` 命中后，经正向桥定位 scope、取 `scope.el`（运行元素）。**仅含指令（Compile/Hybrid）或 `{{}}` 插值（合成 scope）的元素有正向桥**；纯静态裸元素无映射，需挂 `x-patch` 哨兵。

### 补丁单元（Patch Unit）

`patch` 的重建范围由 `updater` 返回值决定（四态）：`void`/同引用 → **子树重建**（destroy `scope.children` + `compileSubtree` 重挂，复用 `_recompileSubtree`，scope 自身不动）；新 `Node`/`string`(HTML) → **替换自身**；`null`/空串 → **删除自身**。替换/删除涉及 scope 自身 destroy + 模板/运行双侧 DOM 替换或移除。

### 增量编译 vs 全量编译

- **增量编译（`patch`）**：仅动 patch 目标（子树重建 / 替换自身 / 删除自身），保留其余子树运行态（焦点/滚动/未提交输入）。
- **全量编译（`compile`）**：重建整棵运行树（`replaceChildren`），丢弃全部运行态。用于初始化或"scope 自身指令变更"等 patch 不覆盖的场景。

### 动态区域（Dynamic Region）/ 稳定子树（Stable Subtree）

- **稳定子树**：非结构指令作用域内的静态子树，模板与运行树 1:1 同构，正向桥可靠，可 patch。
- **动态区域**：`x-for` 项内 / `x-if` 分支内——运行侧结构由指令运行时生成，与模板非同构，正向桥不保证。patch 目标落在动态区域（祖先链含 `ownsChildren` 结构指令）时拒绝或升级重建。

### Runtime 指令与 patch 的关系

纯 Runtime 指令（`x-loading`）**不建 scope**，不在 patch 范围；但其 observer 通道（[ADR-0001](adr/0001-directive-kind-system.md)）**本就响应原生 DOM 变更**，无需 patch。故 patch 边界 = scope = scope 通道（Compile/Hybrid）指令，无遗漏。

### x-patch（哨兵指令）

零副作用 Compile 指令，唯一作用是让裸元素成为 scope（进正向桥）、从而可被 `engine.patch` 定位。`created`/`compile`/`destroy` 全 no-op，不建 `_scopes[id]` 数据域、不注入 `data`。等效 `x-data="{}"` 但更轻、更语义化。用法：`<div id="x" x-patch></div>` → `engine.patch("#x", ...)`。

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

一律过去时/状态形容词，禁命令式。使 `directive/*/mounted`（任意指令挂载）、`actions/*/pending`（任意 action 开始）等"跨主体抓同动词"模式成立。

> **元素级反馈不订阅本域事件**：x-on 的 `.feedback` 修饰符（[ADR-0008](adr/0008-x-on-feedback-modifier.md)）做元素级 async action 反馈时，**不订阅** `actions/<name>/*`——全局事件按 name 广播会致同名 action 多元素串扰（点其一、两个都亮），且同步 action 不广播（feedback 永不触发）。feedback 改为捕获 business handler 的**返回值**（action 返回的 Promise），精确到本次触发。全局 actions 事件（供全局 loading/toast）与 feedback 元素级反馈**正交并存**。

### actions 域（x-on action 生命周期）

事件总线中承载 **action 生命周期**的域：`actions/<name>/<verb>`——`<name>` = action 函数名（**入路径**），verb = `pending`/`resolved`/`rejected`。由 `utils/buildAction` 在**注册时自动包装**触发——`engine.actions[name]=fn`（actions Proxy 的 set trap）、构造时 `options.actions`（构造函数扫描）、`<script type="actions">`（compiler 提取）三入口均自动包装。**同步/异步 action 统一广播**（ADR-0011）：pending 在执行前、resolved（成功）/rejected（失败）在完成时——同步 action 同 tick 内 pending→resolved（或抛错 pending→rejected），异步经 `then`；同步抛错 broadcast rejected 后 **rethrow**（保持错误传播），async reject 经内部 `then(_, onRejected)` 消费消除 unhandled rejection。payload 亦带 `name`（方便通配订阅者区分）。流信号 plain emit（不 retain）。见 `utils/buildAction` 实现。

> **ADR-0010 起双发并存**：`buildAction` 在 thenable 分支除 emit 本域总线事件外，**同时** dispatch DOM 冒泡事件 `action:<name>`（`bubbles+composed`，detail **不带 el/scope**——靠 `event.target` 与冒泡路径表达触发元素/作用域），服务**祖先聚合后代 action**（`<form @action:submit>`，经 x-on 监听、phase 修饰符过滤）。总线（全局通配）与 DOM 冒泡（DOM 层级）**正交并存**，见下文「action DOM 冒泡事件」。

> **ADR-0012 局部 action 隔离**：局部 action（`scope.actions`，`<script type="actions">`）**只 DOM 冒泡、不进总线**——总线是全局通道，局部 action 同名进总线会与其他 scope 串扰（消费者无法区分来源）。故总线 `actions/<name>/*` 只承载全局 action（name 唯一、无冲突）；DOM `action:<name>` 承载全部（冒泡隔离作用域）。经 `buildAction` 的 `local` 标志区分（compiler 入口 true、engine 入口 false）。配套 `<script type="actions" global>` 标志可声明全局 action（注入 `engine.actions`、双发），与默认局部区分。见 [ADR-0012](adr/0012-local-action-dom-only.md)。

> **task 域已废弃（2026-08-07）**：ADR-0003 原设计的 `task/<source>/<verb>` 统一异步事件抽象未被采用——x-on async action 用 `actions/<name>/*`（per-action 精确订阅，name 入路径），x-slot remote 加载用 x-loading 指令自带覆盖层（不广播事件）。task 域零消费者，已移除。"一处订阅抓所有异步"的跨源诉求当前不存在，若未来出现再评估统一抽象。

### 通配契约（Wildcard Contract）

分层命名承诺的可订阅模式。高价值模式：`<域>/<主体>/*`（一主体全动作）、`<域>/*/<动词>`（跨主体同动词，★ 核心）、`<域>/**`（一域全部）、`**`（全部= `onAny`）。详见 [ADR-0003](adr/0003-engine-event-bus.md) 决策 3.4。

### 态信号 vs 流信号（retain 纪律）

- **态信号**（一次性、表"当前是否就绪"，如 `engine/ready`、`directive/x-data/ready`）→ **`retain=true`** emit：晚订阅者立即补拿，规避 priority 顺序竞态（A 先发、B 后订则 B 错过）。
- **流信号**（可重复、表"发生了"，如 `actions/*/pending`、`directive/x-for/item-added`）→ **plain emit**：retain 只留最后一条，用于流信号反错。

**铁律：态信号 retain，流信号 plain。** 见 [ADR-0003](adr/0003-engine-event-bus.md) 决策 6。

### RuntimeObserverDispatcher

engine 级共享 MutationObserver 分发器（`engine.el` 上单一 observer，`attributeFilter` 覆盖所有 runtime 指令属性）。按变更属性名路由到对应指令类的 `mounted`/`unmounted`/`attrChanged`，并同步广播 `directive/<name>/**` 事件。替代此前 runtime 指令各自建 observer（如 `loading.ts`）的做法，顺带落地 [ADR-0001](adr/0001-directive-kind-system.md)【实现注记】的"单一共享 observer"。见 [ADR-0003](adr/0003-engine-event-bus.md) 决策 7。

## 响应式插值（Reactive Interpolation）

### 响应式插值 / Mustache 表达式

模板文本节点中的 `{{ expr }}` 语法。编译期把含 `{{}}` 的文本节点拆成「字面量段 + 表达式段」，每表达式段建独立 text node + 一个 `scope.watch(expr)`。反应式**全复用** `scope.watchExpression`（`with(scope){return (EXPR)}` + `collectDependencies`），**零新订阅机制**——与 x-text/x-bind 同构。见 [ADR-0004](adr/0004-reactive-text-interpolation.md) 决策 1。分隔符固定 `{{ }}`（正则 `/\{\{\s*([\s\S]*?)\s*\}\}/g`），可配置性留待后续。

### 插值段（Interpolation Segment）

含 `{{}}` 的文本节点拆分后的最小单位：字面量段（静态 text node）或表达式段（text node + watcher）。多段拆分模型（而非单节点复合 watcher）：每段 watcher 只改自己的 text node `nodeValue`，patch 简单、destroy 粒度自然。见 [ADR-0004](adr/0004-reactive-text-interpolation.md) 决策 3。

### 合成 scope（Synthesized Scope / 隐式指令）

含 `{{}}` 但无任何显式指令的元素，由编译器**自动建 scope**（条件 `hasDirectives(el) || hasInterpolatedDirectText(el)`）。`hasInterpolatedDirectText` 只扫**直接** Text 子节点（非递归、O(直接子节点数)）。合成 scope 与指令 scope 同构（登记 `engine.scopes`、`_linkParent`、继承 localData、destroy 递归清理），插值等同一个隐式指令。保证 scope 先于文本转换器就位，转换器经 `templateScopeMap.get(parentElement)` 即可取 scope，无需 old→new 元素映射。见 [ADR-0004](adr/0004-reactive-text-interpolation.md) 决策 2。

### compileTextNode（文本节点编译函数）

抽自「拆分 + 注册」的复用函数 `compileTextNode(node, scope): Node`，被**两处**调用：① 主 walk 的文本 NodeTransformer；② `compileSubtree` 的文本分支。修掉 `compileSubtree` 此前对文本节点 `cloneNode(true)` 绕过所有转换器、导致 x-for 项 / x-if 子树插值静默失效的暗坑。见 [ADR-0004](adr/0004-reactive-text-interpolation.md) 决策 4。

### x-text 静默胜出（Silent Precedence）

同元素既有 `x-text`/`x-html` 又有直接文本 `{{}}` 时，x-text 胜出、插值文本**剪枝**（`compileTextNode` 返回 `null`，文本节点不入渲染 DOM——不拆分、不注册 watcher、字面 `{{}}` 亦不可见）。「静默」的严谨含义是剪枝而非「建了被覆盖」或「返回克隆」——二者都会让插值段 node 被 appended 在 x-text 的 text node 之后（x-text 的 `textContent=` 在 compile 期、子节点挂载前执行），致字面泄漏 + 孤儿 watcher。见 [ADR-0004](adr/0004-reactive-text-interpolation.md) 决策 5。

### 转义纪律（Escaping Discipline）

插值结果一律 `String(value)` 写入 text node `nodeValue`（浏览器自动转义、XSS 安全）；原始 HTML 注入是 x-html 的职责，**非插值职责**。`{{{ }}}`（三花括号、原始 HTML）本轮不做，留作 fast-follow。见 [ADR-0004](adr/0004-reactive-text-interpolation.md) 决策 6。

### 插值反应式继承 localData 约束

插值不引入新反应式语义，完全继承 `scope.watch` 的 localData 行为：`{{obj.field}}`（obj 为响应式对象引用）细粒度响应；`{{n}}`（primitive 循环变量 / `$index` / `$end`，localData 普通属性）`collectDependencies` 收不到，仅靠项 rebind 时的 `scope.refresh()` 兜底重算（引擎现状，所有指令同此约束）。见 [ADR-0004](adr/0004-reactive-text-interpolation.md) 决策 8。

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

隔离父/子双 dispatcher 抢管的机制。父 `RuntimeObserverDispatcher` 以 `subtree:true` 观察 `engine.el`，child engine 写进宿主**子树**的运行时指令属性（如 x-loading）会被父 dispatcher 二次 mount。x-slot `created()` 调 `dispatcher.addSlotRoot(host)` 登记宿主为盲区根；dispatcher 的 `collectEls`/`_handle` 对盲区**严格后代**（`slotRoots.some(r => r !== el && r.contains(el))`）跳过 mount/attr 派发；`destroy()` 注销。**盲区不含宿主自身**——宿主上的 runtime 指令（如 fetch 期间 x-slot 添加的 x-loading）仍归父 dispatcher，仅子树由 child engine 自身 dispatcher 负责。见 [ADR-0006](adr/0006-x-slot-directive.md) 决策 8。

### ~~task/slot 事件（已移除）~~

remote 模式**原计划**广播 `task/slot/{started,resolved,rejected}` 供全局加载协调，但 task 域抽象未被采用（见上文「task 域已废弃」）。x-slot remote 加载的加载态改由 **x-loading 指令自带覆盖层**（宿主 `setAttribute("x-loading")` toggle，dispatcher 自动 mount/unmount）表达，错误由占位 + `logger.error` 表达——**不广播任何事件**。

## 结构占位与模板块（x-scope / x-block）

### x-scope（结构占位指令）

纯占位指令——元素上声明 `x-scope` 即令其建立 `AutoTemplateScope`，**即便该元素没有其他指令、没有插值**。注册占位类 `ScopeDirective`（`created`/`compile` 皆空、高优先级）。填补「纯容器 `<div>` 不建 scope」的缺口：让后代 scope 的 parent 链落到此处（而非更远祖先），并为后代 `x-block` 提供**归属锚点**。**不建数据域**——与 [x-data](#x-data)（数据注入）职责正交。冗余声明（元素已有其他指令、本就建 scope）静默无副作用。见 [ADR-0021](adr/0021-x-scope-and-x-block.md) 决策 1。

> **为什么不能用「未注册属性」零实现**：`x-scope` 即便不注册也会因属性存在触发 `hasDirectives` 建一次 scope，`createDirectives` 随后跳过——看似零成本。但这让 `x-scope` 成为注册表里不存在的幽灵属性，无法设 priority、不可被静态分析/IDE 识别，未来加任何行为都要回头补类。注册占位类换取合法可发现性与确定性执行时机。

### x-block（命名模板块 / 模板块）

编译期树变换标记，**不是渲染指令**。在带 scope 的祖先（x-scope 或其他）内声明一个命名模板片段，编译时被**从渲染树摘除**（不进结果 DOM、不建 scope、不实例化指令），以**深克隆的 template 元素副本**形态上交给最近祖先 scope 的 `blocks`。无值时取名 `default`。

机制 = compiler 前置 NodeTransformer（与 `<script type="actions">` 提取同构）+ 轻量 `BlockDirective`（`ownsChildren=true` 冻结其内容，防子树被正常 walk 编译）。被拦截元素**根本不进 `compileElement`**，故自然地不建 scope、不实例化任何指令。**x-scope 保持 `ownsChildren=false`**——不越权接管子树，职责单一（SRP）。见 [ADR-0021](adr/0021-x-scope-and-x-block.md) 决策 2。

> **与 x-slot 的关键区别**（极易混淆）：x-slot 是 **engine 边界 / 隔离运行**（内部不编译、开发者 DOM API 全权管理，或建 child engine）；x-block 是**存模板待引用**（编译期摘除、冻结副本供消费者取用）。x-slot 的内容**留在渲染树里**（静态快照或 child engine 接管）；x-block 的内容**从渲染树移除**、仅作为 `blocks[name]` 存在。二者正交，可共存于同一模板。

### 块归属（Block Ownership）

x-block 挂到其**最近的祖先 scope**——**任意深度**（跨中间无 scope 的纯 `<div>`），与 `_linkParent` 向上找最近 scope 的既有语义同构。嵌套 scope 时归最内层祖先。**不限定直接子**：`<div x-scope><div class="wrap"><div x-block="x">` 的 x-block 仍归属 x-scope。向上找不到任何带 scope 的祖先 → 编译期 `warn` 并丢弃（无处归属）。见 [ADR-0021](adr/0021-x-scope-and-x-block.md) 决策 4。

### 块冻结快照（Block Frozen Snapshot）

`scope.blocks[name]` 存的内容形态：`cloneNode(true)` 产出的、保留指令属性、未编译、可被多消费者重复取用而不相互污染的洁净副本。**独立于 `engine.template` 事实源**（ADR-0002 只读约束）。机制与 x-slot static 模式的「深克隆子节点」同构，但区别在：x-slot 快照剥除指令属性（纯静态 HTML）、x-block 快照**保留**指令属性（块被消费渲染时才编译）。见 [ADR-0021](adr/0021-x-scope-and-x-block.md) 决策 3。

### 同元素指令随块冻结（Co-frozen Directives）

`x-block="error" x-text="msg"` 的 x-text **不在当前 scope 执行**——x-block 元素是自包含模板单元，其上的指令是「块被消费渲染时」的绑定，非当前 scope 的绑定。由 compiler 前置拦截自然保证（被拦截元素根本不进 `compileElement`，故不实例化任何指令）。见 [ADR-0021](adr/0021-x-scope-and-x-block.md) 决策 6。

### `default` 块唯一性（Default Block Uniqueness）

每个 scope 的 `blocks.default` 唯一——**仅约束直接归属本 scope 的 default**（同一 scope 收集到第二个直接归属的 default → 编译期报错）。沿 parent 链**允许覆盖**：内层 scope 的 default 遮蔽外层同名 default，与块查找的就近原则一致。其他块名（loading/error/empty…）不受唯一性约束，纯自由命名。见 [ADR-0021](adr/0021-x-scope-and-x-block.md) 决策 7。

### 块查找（Block Lookup）

消费者（x-loading/x-empty/x-error 等）按**约定名**取块的协议：从自身 scope 起沿 parent 链向上，取首个含该名 block 的 scope。命中→用该块替换内置 UI；未命中→回退内置 UI（[块兜底](#块兜底block-fallback)）。与 action/data 的 parent 链查找范式统一，支持「局部覆盖、外层兜底」。公共 API `scope.getBlock(name): HTMLElement | undefined`。见 [ADR-0021](adr/0021-x-scope-and-x-block.md) 决策 5。

### 块兜底（Block Fallback）

消费者未查找到约定名块时回退其内置预置 UI 的行为。x-block「自定义能力」的缺省语义——块是**可选的覆盖资源**，不存在时引擎行为不退化。这是 x-block 与内置预置 UI 的协作契约：消费者始终先 `lookupBlock`，块存在性只决定「自定义 vs 内置」，不决定「渲染 vs 不渲染」。

### 跨指令供体协议（Cross-directive Provider Protocol）

x-block **不绑定具体消费者**，是声明性资源——任意指令按约定名从 `scope.blocks` 取用。块名**纯自由命名**（各消费指令文档自定其读取名与兜底逻辑），引擎**不预定义 UI 态名册**（不硬编码 loading/error/empty），不限制指令开发者发明新消费场景（开放-封闭原则）。消费关系由各指令文档单独约定，引擎只提供存取基础设施。

## x-on 反馈（feedback）

### feedback 修饰符（action 执行反馈）

`x-on:click.feedback="submit"` 启用的 **wrapper 修饰符**，为 action 提供**声明式 UI 反馈**：**同步/异步统一**（ADR-0013）——同步成功直接加 `resolved` 类、同步抛错加 `rejected` 类、async 先加 `pending` 类（常驻）再 resolve/reject 切 `resolved`/`rejected`。经 `x-on-options="{feedback:{...}}"` 或宿主 `x-options` 配置 `at`（目标元素）/ `timeout`（终态延时清除）/ `pendingClass` / `resolvedClass` / `rejectedClass` / `loading`。`.feedback` 裸修饰符 = 全默认。**信号源 = business handler 返回值捕获**（async 的 Promise 冒泡；同步抛错经 eval.ts rethrow 冒泡，ADR-0013），非订阅全局 `actions/*` 事件（避免串扰）。**pending 仅 async**（同步无加载窗口）；feedback 固定 wrapper 链最内层（拿原始返回值）。见 [ADR-0008](adr/0008-x-on-feedback-modifier.md)、[ADR-0013](adr/0013-feedback-sync-async-unified.md)。

### 命令式 overlay 模式（Imperative Overlay Mode）

x-loading 的一种使用模式：`setAttribute('x-loading', JSON.stringify({message,bgColor,...}))`（对象配置**省略 visible**）→ x-loading 的 `resolveLiteral("")===true` 使其"属性存在即显示、用配置渲染"；`removeAttribute('x-loading')` → 隐藏。该行为原为"裸 `x-loading` ≡ 显示"设计的副作用，被 feedback 的 `loading` 配置对象复用，实现**命令式 overlay 显隐而 x-loading 零改动**。已测试锁定 + 文档化为正式契约（[ADR-0008](adr/0008-x-on-feedback-modifier.md) 决策 8）。区别于 x-loading 的反应式模式（visible 走 store 路径）与字面量模式（`"true"`/`"false"`）。

### generation 防陈旧（Stale-Reject Guard）

feedback 状态机的重入竞态防护：单调递增 `gen` 标记每次触发，Promise 回调校验 `my === gen` 才生效。action pending 中再触发（连点）时 `gen++`，旧 Promise 的 resolve/reject 因不匹配被忽略——避免"慢 action 后 resolve 覆盖快 action 终态"。旧 Promise **不取消**（core 无 cancel 能力），仅 feedback 元素侧忽略；全局 `actions/*` 广播照常。见 [ADR-0008](adr/0008-x-on-feedback-modifier.md) 决策 4。

## action DOM 冒泡事件（祖先聚合）

### action: DOM 事件（Action Bubble Event）

action 生命周期的 **DOM 表达**：`action:<name>` CustomEvent，`bubbles:true` + `composed:true`，`detail={name, phase, result?/error?}`，由 `buildAction` 在 thenable 分支 dispatch 自**触发元素**（`AutoTemplateActionContext.el`）。与总线 `actions/<name>/*`（全局广播、吃通配符）**正交并存**——服务**祖先聚合后代 action**：事件冒泡到祖先即等价「action 发生在该祖先作用域内」。经 `x-on` 监听（`<form @action:submit>`），与 `@click` 同构、**零新指令**。**作用域由冒泡路径表达（detail 不带 scope）、触发元素由 `event.target` 表达（detail 不带 el）**——规避 ADR-0008 否决的「payload 带 el」。命令式 `engine.actions[name]()` 直调无触发元素 → 只走总线、不发 DOM 事件（声明式 vs 命令式不对称）。见 [ADR-0010](adr/0010-action-dom-bubble-event.md)。

### phase 修饰符（Phase Modifier）

`x-on` 的 **guard 类**修饰符 `.pending` / `.resolved` / `.rejected`，过滤 `action:<name>` 事件的 `detail.phase`：`@action:submit.pending` 仅在 pending 阶段触发 handler。与 `.left` / `.right` / `.middle`（鼠标键）**同构**——都是互斥事件维度的 guard、**单选使用**（`.pending.resolved` 同 `.left.right` 般无意义；多 phase 靠挂多个 listener，`x-on` `singleton=false` 支持同元素多实例）。裸 `@action:submit`（无 phase）= 听所有 phase，handler 读 `e.detail.phase` 自行分派。对非 `action:` 事件误用 phase 修饰符静默失效（同 `.left` 对非 mouse 事件）。见 [ADR-0010](adr/0010-action-dom-bubble-event.md)。

### 祖先聚合（Ancestor Aggregation）

action 监听的 **DOM 层级模式**：祖先元素经 `@action:<name>` 监听后代触发的 action 生命周期（依赖 CustomEvent 冒泡）。典型场景 `<form @action:submit>` 聚合内部各 button 的 submit，做容器级 UI 协调（如任一 submit 在跑则 form 显 submitting）。区别于 **feedback**（声明在触发元素、元素级自带状态机）与**总线订阅**（全局、无 DOM 层级、吃通配符）。三者**正交**：feedback=元素级精确反馈、总线=全局通配协调、祖先聚合=DOM 层级聚合。见 [ADR-0010](adr/0010-action-dom-bubble-event.md)。

## 引擎构造（数据源）

### 数据源（Data Source）

`AutoTemplateEngine` 构造器第二参，二态输入：`AutoStore` 实例（**借用**）或裸状态对象（**种子**，engine 自动 `new AutoStore(state)` 建 store）。形参名仍为 `store`（字段 `engine.store` 是公开契约），类型联合 `AutoStore<State> | State`。判别走 `instanceof AutoStore` 主 + `__AUTO_STORE__` brand 兜重复包；`null`/`undefined`/非对象静默走自建路径兜空 store（不抛错）。见 [ADR-0009](adr/0009-store-or-state-input.md) 决策 1/3/5。

### 种子状态（Seed State）

数据源的裸对象形态，仅作**初始种子**。建 store 后其身份**失效**——`engine.state`/`engine.store.state`（Proxy，响应式根）与原裸对象**身份不同**，且对原裸对象的直接赋值**绕过 Proxy set trap、不触发更新**。故裸对象建后应丢弃，统一以响应式状态句柄访问/改写。区别于外部传入的 AutoStore 实例（其 `.state` 本就是响应式句柄）。
_Avoid_: 初始状态、初始数据（"种子"强调一次性播种、建后即弃）

### 响应式状态句柄（Reactive State Handle）

访问/改写状态的唯一正道：`engine.state` / `engine.store.state`（二者同源，均返回 store 的响应式 Proxy 根）。改写即触发细粒度更新。种子状态经 engine 建 store 后，唯有此句柄是响应式的。见 [ADR-0009](adr/0009-store-or-state-input.md) 决策 1。
_Avoid_: state 引用、state 对象（"句柄"强调它是访问正道、区别于已失效的种子）

### 自有 store vs 借用 store（Owned vs Borrowed Store）

engine 对 store 的两种所有权：**借用**（第二参为 AutoStore 实例）= 外部共享资源，`engine.destroy()` **绝不**销毁它（保留原"绝不 destroy 外部 store"不变量）；**自有**（第二参为种子状态，engine 自建）= 引擎自有资源，`engine.destroy()` **会**销毁它（回收 computedObjects / 事件订阅 / Proxy 等 core 资源）。引擎以私有 `_ownsStore` 标志区分（不暴露 getter）。谁建谁销毁（RAII）。见 [ADR-0009](adr/0009-store-or-state-input.md) 决策 2。

### storeOptions（自建 store 配置）

`AutoTemplateEngineOptions` 上的 `storeOptions?: AutoStoreOptions<State>` 字段，**仅自建路径**（第二参为种子状态）消费：`new AutoStore(state, options?.storeOptions)`。第二参为 AutoStore 实例时被忽略（用户已自配）。为与 `State` 联动，`AutoTemplateEngineOptions` 泛型化为 `<State extends Dict = any>`。见 [ADR-0009](adr/0009-store-or-state-input.md) 决策 4。

## 表单绑定（x-model）

### 双向绑定 / x-model（Two-way Binding）

输入控件与状态的双向同步：state→DOM（读方向，经 `scope.watch` 订阅）+ DOM→state（写方向，监听 `input`/`change` 事件）。区别于 `:value`/`x-bind:value` 的单向 state→DOM（bind.ts 注释「回写 state 须另用 x-model」）。**Compile 通道**（原拟 Hybrid，实现时发现挂 input 事件在 compile 期即可——`el` 存在就能 `addEventListener`，元素插入 DOM 后事件自然触发——不需 observer 通道的 mounted；x-model 不响应 setAttribute 动态改值，不需 attrChanged）。首版仅 text-like（input 非 checkbox/radio + textarea）。详见 [ADR-0018](adr/0018-x-model-two-way-binding.md)。

### getter / setter（读写方向变换）

钉死的两个方向术语（容易搞反）：

- **getter（get）= state→DOM 变换**：状态值 → DOM 显示值（如 `value.split('.')[0]`）。
- **setter（set）= DOM→state 变换**：DOM 输入值 → 一个或多个状态字段（如 `user.first=$value`）。

经 `x-model-options="{get:'...',set:'...'}"` 声明（**砍快捷属性** x-model-get/x-model-set，守 ADR-0007 的 `-options` 后缀边界）。值形态**字符串 only**：relaxed-json 不支持函数字面量（`{get:(v)=>...}` 降级为字符串后求值错乱、语句块箭头直接解析失败），故**禁箭头函数字面量**。经 x-on 的 `ACTION_RE` 分派：表达式（固定形参 `value`(get)/`$value`(set)，`with(scope)`）/ action 名（当前值自动作首参 + 括号追加参数，`this`=`AutoTemplateActionContext`）。

### 只读降级（Read-only Degradation）

表达式/computed 无 setter 时，x-model 退化为单向 state→DOM（DOM→state 静默），`logger.warn` 一次。**不抛错、不魔法猜左值**——表达式（如 `a+b`）写入不可逆，只读是合理降级；computed 写语义另依赖 core 行为。

### x-model 防循环（Self-write Guard）

onInput 写 state → read 回调写回 DOM 的循环防护。虽程序设 `el.value` 不触发 input 事件（无同步栈溢出），但 read 回调若经 getter 写回会**立即覆盖用户刚输入的内容**（UX 灾难）+ 冗余写。故：

- 写入带 `flags:-this.seq`（`seq=++ModelDirective._seq` 类级静态自增，仿 `AutoStoreSyncer.seq`；与 syncer 范式一致，供 syncer/未来指令识别）；
- 但 `scope.watch` 的 scheduler 合并模型不透传 `operate` 给 listener（flush 时重新 `safeEval` 读当前值，无参 update 闭包），read 回调拿不到 `operate.flags`——故防循环用实例级 `_selfWriting` 标志：onInput 置位 → read 回调检查命中则重置并跳过。

语义与纯 flags 等价（只跳过自己触发的回写，其他 x-model 实例 / 外部写入 `_selfWriting=false`，正常更新显示）。

### .number / .change / .trim 修饰符（x-model）

x-model 写回管道修饰符（经 ADR-0007 注入为指令选项，`.number` ≡ `x-model-options="{number:true}"`）：

- `.change`：监听 change 事件（失焦触发）而非 input（实时）；
- `.trim`：写前 `value.trim()`；
- `.number`：写前 `Number(value)`，NaN 回退原字符串——解决数字字段（如 `order.count`）被字符串污染致计算属性（`price*count`）失效。

管道顺序：`el.value` →(.trim)→ (.number)→ `$value` → set/直写 state。

## 元数据自动注入（x-model + schema）

### 元数据自动注入 / Schema Auto-injection

x-model 元素自动从 configManager schema 合成 input 原生属性的隐式 `@` 绑定。用户只写 `<input x-model="order.price"/>`，引擎按注入白名单与 schema 属性的交集，自动合成 placeholder/title/required/min/max 等 BindDirective 实例（复用 ADR-0019 全部能力：`@` 路径解析、collectDependencies 追踪、scheduler 合并、patch 全分派、三层降级）。详见 ADR-0020。

**合成时机**：compiler 在 `scope.compile()` 之后、`_compileAttrInterpolation` 旁调用 `_synthesizeModelSchemaBindings`。合成知识封装在 `ModelDirective.synthesizeSchemaBindings` 静态方法（compiler 只管调用时机，与 `static initialize`/`static ownsChildren` 同构）。

_Avoid_: 字段属性注入（泛化）、自动绑定（歧义）

### 注入白名单 / Injection Whitelist

元数据自动注入的候选属性集，按 input `type` 精准匹配：

- **通用集**（所有 text-like input + textarea）：`placeholder` / `title` / `required` / `readonly` / `enable`(→disabled) / `pattern` / `minlength` / `maxlength`
- **numeric type 扩展**（number/range/date/time/datetime-local/month/week）：`min` / `max` / `step`

仅注入 schema **实际承载**的属性（动态交集）；不含 `value`/`checked`（x-model 自管）；`label`/`help` 忽略（非 input 原生属性）。模板包**自治**，不耦合 core 的 widget 类型内部结构。

> schema 未注册时跳过整个 `@` 合成（仅保留 name 简单路径注入），避免每个白名单属性一条 schema 不存在 WARN（静默优先于罕见的后注册动态性）。表达式场景同样跳过（schema 按状态路径注册，表达式路径无对应 schema）。

_Avoid_: schema 属性集（那是 schema 的，白名单是 input 原生属性的候选）

### enable 反向映射 / enable Inversion

schema 的 `enable`（boolean，true=可用）映射到 input 的 `disabled` 属性时**值取反**（enable=false → disabled）。不走普通 `@` 绑定（直传语义），用专用 patch + 自建 watcher（读 `schema.enable` 取反 patch 到 disabled，watcher 订阅 enable 变化经 scheduler 合并重 patch）。与 Field.tsx 的 enable 语义对齐。

_Avoid_: disabled 绑定（语义反向，易误解）

### name 特殊处理 / name Special-casing

name 是表单提交键，不走响应式 `@` 绑定（状态路径编译期固定），**静态写**一次：

- schema 有 `name` 元数据 → `name = schema.name`；
- schema 无 `name` + x-model 绑定值是**简单路径** → `name = 路径`；
- x-model 绑定值是**表达式** → 跳过（用户应显式写 `name="..."`）；
- 元素已有显式 `name` 属性 → 跳过（显式优先）。

### 合成绑定 / Synthesized Binding

compiler 在 `scope.compile()` 后、对含 x-model 的元素合成的隐式 BindDirective 实例（构造合成 `AutoDirectiveInfo` 喂给 `createDirectives`，复用 ADR-0019）。合成实例手动 `created()`，watcher 随 `scope.destroy` 回收。**显式绑定优先抑制合成**：同元素已有 `bind` 的 `attr===白名单项` 则跳过该项合成。

_Avoid_: 隐式指令（那是插值 desugar 的术语）

## 配置绑定（x-bind `@`）

### 配置分隔符 `@`（Config Separator）

x-bind 值中的路径中缀，声明该绑定指向 **configManager 元数据**而非 store 状态。`:placeholder="order.price@placeholder"` 中 `@` 把值来源从 `scope.watch(state)` 切到 `configManager`（经 `this.store.configManager`，全局对象不随每个 scope 引用），左侧为配置状态路径、右侧为配置属性路径。两个值来源正交：

- **状态绑定**（无 `@`）：`scope.watch(expr)` → store.state，支持相对表达式（x-for item / x-data 局部变量）。`order.price` = 绑状态值。
- **配置绑定**（`@`）：`configManager.collectDependencies("read")` → configManager.state，**仅绝对配置路径**（无 scope 相对语义）。`order.price@placeholder` = 绑 schema 的 placeholder 属性、`order.price@value` = 绑 schema 的 value 属性。

> **语法演进**：初版用 `~` 值前缀（末段恒属性、单段），无法绑 schema 嵌套对象属性。现改为 `@` 路径中缀，右侧属性路径支持多段嵌套。`~` 已移除（未发布无兼容包袱）。

_Avoid_: 元数据前缀、schema 前缀、配置引用前缀（初版 `~` 已废弃）

### 配置引用（Config Reference）

`@` 分隔的整体路径串（如 `order.price@placeholder`），由「配置状态路径 + 配置属性路径」组成。用 `indexOf("@")` 取**第一个** `@` 分割（左侧配置状态路径不含 `@`；右侧多余 `@` 在 getVal 时取不到值、走 falsy 降级），两侧再各用 `splitPath(".")` 拆——与 configManager state key 的 `.` join（`joinPath`）同构，复用 escapePath 支持 key 含 `.` 的转义。

> AutoStore 有**两个事件触发器**：AutoStore 生命周期事件（`store.emit/on`）用 `/`；状态变化事件（`operates.emit/on`，即 `store.watch`）用 `.`（`PATH_DELIMITER`）。`store.delimiter` getter 恒返回 `.`。configManager.state key 与 watch 都用 `.`——自洽。

_Avoid_: 配置路径（歧义，下分配置状态路径 / 配置属性路径）

### 配置状态路径（Config State Path）

配置引用中 `@` 左侧部分（`order.price`），定位 configManager.state 中的 schema 条目。fullKey 拼接仅用左侧、复刻 `configManager.add` 的算法：`joinPath([configKey?, ...leftSegs])`——configKey 空串不加前缀（`add` 内 `if(configKey) splice` 对空串 falsy 不执行），configKey 永非 undefined（store.ts:298 构造期归一为 store.id）。

注意它指向 configManager 的 flat schema 表（key 是 `.` 连接串），**非 store 状态树**。

_Avoid_: 状态路径（那是 store.state 的）

### 配置属性路径（Config Attribute Path）

配置引用中 `@` 右侧部分（`placeholder` 或 `style.color`），schema 对象的属性路径，**支持多段嵌套**——`getVal(schema, rightPath)` 读任意深度。schema 是可扩展数据结构，故**无白名单**。`@` 两侧均须非空（任一为空 → warn + 静默）。

> 较初版 `~`（末段恒属性、单段）的核心改进：右侧支持嵌套，能绑 `schema.style.color` 这类对象属性——这是 `@` 改版的动因。

_Avoid_: schema 字段（泛化）、配置属性（已升级为路径，支持嵌套）

### 配置绑定（Config Binding）

经 `@` 把 configManager 元数据响应式注入 DOM 属性的行为。依赖收集用 `configManager.collectDependencies("read")` 自动追踪——在求值回调内 `getVal(configManager.state[fullKey], rightPath)` 读，响应式系统记录 `[fullKey, ...rightPath]` 依赖路径（**含嵌套层**），**规避手工拼 watch 路径**（configManager state key 是 flat `.` 连接串，手工拼易踩 delimiter 坑）。整体替换 schema 嵌套对象也经后代广播（ADR-0001）唤醒后代监听。回调同样经 `engine.scheduler` 微任务合并（与 `scope.watch` 同构）；watcher 进 `this.watchers` 随 scope.destroy 回收。

**三层降级**（静默优先）：configManager 不存在 / schema 不存在 → warn + 不动 DOM；属性取不到（含嵌套中途断裂）→ 复用 patch 既有 removeAttribute 分支（**不额外 warn**，属性缺失是常态）。patch 全分派复用（class/style/property/boolean/普通 attr）。

`@` 两侧纯路径 only，不支持表达式（`:placeholder="x@placeholder + ' 元'"` 非法）——要变换走 x-model get（ADR-0018）或 computed。详见 ADR-0019。

_Avoid_: 元数据绑定（泛化）

## 决策记录

- ✅ [ADR-0001] 运行时指令走纯 observer 通道（方案 A）—— _待补全 Initialize/Dispose 契约后定稿_
- ✅ [ADR-0002] 动态 patch 机制（模板增量编译）—— _待确认"scope 自身指令变更"处置_
- ✅ [ADR-0003] 事件总线（信号面）与分层事件契约 —— _Accepted（Round 3）_
- ✅ [ADR-0004] 响应式文本插值（`{{ }}`）—— _Accepted（Round 1，grill-with-docs）_
- ✅ [ADR-0005] x-html 指令（默认消毒的原始 HTML 注入）—— _Accepted（Round 1，grill-with-docs）_
- ✅ [ADR-0006] x-slot 指令（engine 边界 / 隔离快照 / 远程子引擎）—— _Accepted（Round 5，grill-with-docs）_
- ✅ [ADR-0007] 指令配置统一（modifier 注入 options + 元素级 host options 回退）—— _Accepted_
- ✅ [ADR-0008] x-on feedback 修饰符（async action 执行反馈）—— _Accepted（grill-with-docs）_
- ✅ [ADR-0009] 构造器第二参接受 `store | state`（自建 store 归 engine 销毁）—— _Accepted（Round 3，grill-with-docs）｜实现待落地_
- ✅ [ADR-0010] action DOM 冒泡事件 + phase 修饰符（祖先聚合后代 action）—— _Accepted（grill-with-docs）｜实现待落地_
- ✅ [ADR-0011] 同步 action 统一广播 lifecycle（同步/异步一致）—— _Accepted（grill-with-docs）｜feedback 同步响应待错误流重构_
- ✅ [ADR-0012] 局部 action 只 DOM 冒泡、不进总线（隔离同名串扰）—— _Accepted（grill-with-docs）｜实现待落地_
- ✅ [ADR-0013] feedback 同步/异步一致（错误流冒泡）—— _Accepted（grill-with-docs）｜实现待落地_
- ✅ [ADR-0018] x-model 双向绑定指令（阶段1：Compile 通道 + 防循环 + get/set + 修饰符）—— _Accepted（grill-with-docs）｜阶段2 configManager 元数据驱动见 ADR-0019_
- ✅ [ADR-0019] x-bind `@` 分隔符——configManager 元数据绑定（`@` 左配置状态路径/右配置属性路径支持嵌套 + 第一个 @ 分割 + splitPath "." 拆 + fullKey 复刻 add + getVal 读嵌套 + collectDependencies 自动收集 + scheduler 合并 + 三层降级 + patch 全分派复用 + 两侧纯路径 only）—— _Accepted（grill-with-docs）｜初版 `~` 前缀（末段恒属性不支持嵌套）已改版为 `@`_
- ✅ [ADR-0020] x-model 元数据自动注入（compiler 层合成 + ModelDirective 静态方法封装 + 注入白名单通用集+type扩展 + 动态交集仅注入schema有 + 不含value/checked + enable→disabled 反向 + name 特殊处理 + 显式优先抑制 + schema 未注册跳过合成静默）—— _Accepted（grill-with-docs）_
