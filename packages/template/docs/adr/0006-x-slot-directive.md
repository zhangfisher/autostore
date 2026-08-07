# ADR-0006：x-slot 指令（engine 边界 / 隔离快照 / 远程子引擎）

- **状态**：Accepted（Round 5，grill-with-docs）｜⚠️ **部分调整（2026-08-07）**：决策 6/7 的 `task/slot/*` 事件已移除，x-slot remote 加载改用 x-loading 覆盖层表达加载态、不广播事件。见 glossary「task/slot 事件（已移除）」。
- **日期**：2026-08-06
- **关联**：[glossary.md](../glossary.md)、[ADR-0001](0001-directive-kind-system.md)、[ADR-0003](0003-engine-event-bus.md)、[ADR-0004](0004-reactive-text-interpolation.md)、[ADR-0005](0005-x-html-directive.md)

## 背景

需求：引入 `x-slot`——在模板中划一块**独立于 engine 的隔离 DOM 区域**。两种形态：

```html
<!-- 静态：宿主内是冻结快照，engine 永不触碰，开发者用 DOM API 全权管理 -->
<div x-slot><a href="x">ssss</a></div>

<!-- 远程：从响应式 url fetch 模板，在其上建一个完全独立的 child engine -->
<div x-slot="postUrl"></div>
```

表面是「一个标记指令」，但拷问暴露出**六个真正要决策的接缝**，且其中两个与现有架构机制正面相撞：

1. **「保持原样」防的是什么**：本引擎的「重新编译」会物理销毁元素——全量 `engine.compile()`（`engine.ts:171` `replaceChildren`）、`engine.data` 子树重建（`engine.ts:258` `_recompileSubtree`）、`x-if` eager 切换（`if.ts:84` `destroyChildren` + `node.remove()`）。x-slot 的开篇例子就把它放在 `x-if` 内——`count` 翻转时宿主连内容一起被销毁。靠 `ownsChildren`（`base.ts:95`，仅让编译器跳过本元素子节点自动递归）挡不住「宿主自身被祖先重建连根拔起」。须明确威胁边界。
2. **内容是否被编译**：引擎自带编译器。x-slot 内若含 `<span x-text>`，是递归编译获响应式，还是冻结成静态快照？后者才是「隔离 DOM 空间」字面义，但内层绑定静默失效是脚枪。
3. **url 是否响应式**：`x-slot="postUrl"` 的 `postUrl` 是 url 字面量还是反应式表达式？后者（与 x-text/x-html 同构）让「换 state.apiUrl 即换子模板」成立，但 url 变化须驱动 child engine 销毁/重建。
4. **child engine 的 store 与挂载**：构造签名 `new AutoTemplateEngine(el, store, options?)`（`engine.ts:85`）且 `engine.ts:90` 强校验 store 须为 AutoStore 实例——「完全独立的 engine」的 store 从哪来？挂哪个元素？
5. **双 dispatcher 抢管**：父 engine 的 `RuntimeObserverDispatcher` 以 `subtree:true` 观察 `engine.el`（`dispatcher.ts:83`），child engine 写进 x-slot 宿主的运行时指令属性（如 `x-loading`）会被**父 dispatcher 二次 mount**（`dispatcher.ts:159` `_handle` → `collectEls` → `mount`）。须隔离。
6. **teardown 接线**：用户要求「宿主/祖先删除即销毁 child engine」。如何挂到现有销毁级联、不泄漏。

**关键事实**：反应式底座**全复用**——`scope.watch`（`scope.ts:262`）统一路径/表达式两路 + 返回当前值，url 响应式直接复用；`ownsChildren` 机制（x-for/x-if 范本）让 x-slot 拦截子节点自动编译；`scope.destroy()` 级联调指令 `destroy()`（`scope.ts:429`）天然提供 teardown 钩子。故本 ADR 工作落在：① 静态冻结语义、② url 反应式 + child engine 生命周期、③ dispatcher 盲区隔离。

## 决策

### 1. x-slot = engine 边界：static 模式为冻结快照，内容不编译

无值 `x-slot` 进入 **static 模式**：`static ownsChildren = () => true`（结构指令，拦截编译器对子节点的自动递归，与 x-for/x-if 同机制）。`compile()` 把 `this.template` 的子节点**深克隆**进 `this.el`，**剥除全部 `x-*` 指令属性**（复用 `removeDirectives`，产出「洁净静态 HTML」——与引擎「所有渲染元素剥指令属性」的全局惯例一致），**不建 scope、不跑 created、不注册 watcher**。

「engine 边界」的严谨含义：当前 engine 编译**到 x-slot 为止**，不进入其内部。内层任何 `{{}}`/`x-text`/`:bind` 一律**静默失效**——不是「编译了被冻结」，而是**根本不编译**。

内层指令失效的**脚枪对冲**：编译期检测——x-slot 在 static 模式编译时，若 `this.template` 子树含指令属性或 `{{}}`，记 `logger.warn`（提示「x-slot 内容不编译，反应式绑定不生效；若需响应式请用普通元素或 x-slot="url" 远程子引擎」），**不抛错**（与 ADR-0004 决策 12 的属性冲突编译期抛错不同——x-slot 内层指令是「无效」非「冲突」，柔降级更合适）。

### 2. 威胁模型：仅防 T1（反应式刷新）；T2/T3 与普通元素一视同仁

明确「保持原样」的边界——三威胁只挡其一：

- **T1 反应式刷新**（scheduler flush → watcher 重求值 → patch textContent/innerHTML）：✅ **挡**。x-slot 内无 watcher、宿主无 `x-text`/`x-html` 覆写，frozen + ownsChildren 天然使刷新碰不到内容。**这是 x-slot 的核心价值**：硬保证「engine 永不覆写这块内容」。没有 x-slot，往 `<div>` 放内容、日后给它加 `x-text` 或让它进 x-for 就会被覆写/重渲；有 x-slot，此保证板上钉钉。
- **T2 结构重建**（`x-if` eager toggle / `engine.data` 子树重建 / `engine.patch`）：❌ **不挡**。x-slot 与普通元素一视同仁——宿主被销毁则静态内容随销、child engine 随销；重建时静态内容从模板**重克隆**、remote **重新 fetch**。
- **T3 全量重编译**（`engine.compile()`）：❌ **不挡**。整树 `replaceChildren`，无幸存。

**用户的核心诉求（「engine 不碰内容」「隔离 DOM 空间」）由 T1 + 决策 1 满足。** T2/T3 是「结构重建」的固有行为，非 x-slot 职责，与隔壁 `<div>` 一致——文档明示此边界。

### 3. 不跨 toggle 保内容（α 否决）——与「scope.destroy() → engine.destroy()」干净 teardown 互斥

曾考虑 α 方案：内容跨 x-if toggle 幸存（destroy 时 detach 藏进按 `this.template` 索引的 stash，reincarnation 时 adopt 回）。但用户选定的 teardown 机制（决策 5：child engine 挂指令、`scope.destroy()` 时 `this.childEngine.destroy()`）在**每次** scope 死亡时触发——x-if toggle false 即 scope 死。α 要内容跨 toggle 幸存，则不能在 scope 死时销毁 engine，与该机制正面冲突，须引入「detach 不销毁、仅 template 位置永久消失才销毁」的复杂分支。**复杂度高、与干净 teardown 互斥，否决**。选定 β：teardown 优先，接受 toggle 重克隆/重 fetch（决策 2 的直接后果）。

### 4. `x-slot="expr"` → remote 模式：url 响应式 + 完全独立 child engine

**有值即 remote 模式**（与无值 static 对立，二选一，无第三态）。`this.value` 是**反应式表达式**，经 `this.binding.watch(this.value, cb)` 订阅（与 x-text/x-html 完全同构——复用 `scope.watch` 路径/表达式双轨、`collectDependencies`、scheduler 合并；支持 scope 相对路径、x-data 局部变量、x-for item）。watch 返回的当前值 = url。

**child engine 完全独立**：
- **store**：`new AutoStore({})`——空状态，由 fetched HTML 内的 `x-data` 自治声明。**不复用父 engine.store**（否则父状态渗入 child、违反「边界」）。child engine 与父 engine 状态零耦合。
- **挂载元素**：x-slot 宿主 `this.el` 本身。fetch 成功后 `this.el.innerHTML = html`，再 `new AutoTemplateEngine(this.el, new AutoStore({}))`——engine 构造期 `this.template = el.cloneNode(true)`（`engine.ts:97`）捕获已写入的 html 为模板，`compile()` 以之为输入重建。宿主元素身份不变（父 scope 仍持有它），仅其**子节点**被 child engine 接管。
- **持有位置**：挂在指令实例 `this.childEngine`（非 scope 对象——scope 是通用容器、不该认识 engine 领域概念；指令 own 自己的资源、在自己 `destroy()` 回收，职责内聚 SRP）。

**url 响应式驱动 child engine 生命周期**（watch cb）：
- url 值为**假/空**（表达式暂未解析出 url，如 `postUrl` 初始 undefined）→ 无 child engine，宿主空（或 pending 占位）。
- url 值为**有效字符串** → fetch + 建 child engine（决策 6）。
- url 值**变化** → 销毁当前 child engine（`engine.destroy()` + abort 在途 fetch）→ 按新 url 重新 fetch + 重建。换 `state.apiUrl` 即换子模板，零额外接线。

### 5. teardown：child engine 随 `scope.destroy()` 销毁（零额外接线）

child engine 不注册到任何全局表——挂指令实例 `this.childEngine`，在指令 `destroy(el)` 里 `this.childEngine?.destroy()`。`scope.destroy()`（`scope.ts:413`）级联销毁子树时逐个调指令 `destroy()`（`scope.ts:429`），故 child engine **随 scope 死而死**：x-if toggle false、`engine.data` 子树重建、`engine.patch` 删 x-slot、`engine.destroy()` 任一触发 → child engine 干净销毁，**无泄漏**。

`destroy()` 另须 **abort 在途 fetch**（AbortController）：避免 fetch 在 teardown 后完成、向已销毁宿主写入（孤儿 DOM + 重建已废弃的 engine）。即 destroy 三件事：abort fetch + `childEngine?.destroy()` + `dispatcher.removeSlotRoot(el)`（决策 8）。

### 6. fetch 期间复用 x-loading 运行时指令（宿主属性 toggle）+ task 事件 opt-in 全局协调

「自动用 x-loading」的落地——**直接在宿主 `setAttribute("x-loading", "true")`**，由父 dispatcher 自动 mount `LoadingDirective` 覆盖层；fetch 完成/失败后 `removeAttribute("x-loading")` → dispatcher unmount。**不自渲染任何 loading DOM**，完全复用 x-loading 的覆盖层 + 全局样式。

- **可行性根柢**：x-loading 的字面量模式（`resolveLiteral`，`loading.ts:198`）——`x-loading="true"`（或裸 `x-loading`）≡ 静态显示、**不绑 store、不数据耦合**。故 x-slot 无须「打开」一个数据驱动的 x-loading，只须在宿主增删属性，dispatcher 的 attributes 三态（`_attrThreeState`，`dispatcher.ts:182`）自动 mount/unmount 覆盖层。区别于「走父 store 状态位」（决策被否，见被否决方案）——属性 toggle 不触碰任何 store，不违反 engine 边界。
- **前提：盲区不含 slot 宿主自身**（决策 8）。若宿主被盲，父 dispatcher 会跳过宿主的 x-loading 属性变化、覆盖层不显示。故盲区只覆盖**严格后代**（child engine 子树），宿主自身的 runtime 指令仍归父 dispatcher。
- **同时 emit task 域事件**（ADR-0003 决策 3.2，近乎零成本、与信号面一致）：`task/slot/started`（fetch 开始，流信号 plain emit）/ `task/slot/resolved`（成功）/ `task/slot/rejected`（失败）。供 opt-in 的**全局**加载协调（用户在宿主外放 x-loading 订阅 `task/slot/*`，经 task 域跨源协调），与默认的宿主覆盖层互补、不强制。

### 7. fetch 失败 → 错误占位（不静默）；超时为 fast-follow

fetch 失败（网络错 / 非 2xx）→ 宿主渲染**极简错误占位**（如 `<div class="x-slot-error">模板加载失败</div>`）+ `logger.error` + emit `task/slot/rejected`。**不静默留空**（让用户知晓）。fetch 超时/重试（AbortController + `engine.options.slotFetchTimeout`）为 **fast-follow**，v1 走 fetch 默认行为。

### 8. slot 边界对父 dispatcher 致盲（隔离双引擎抢管）

父 `RuntimeObserverDispatcher` 以 `subtree:true` 观察 `engine.el`（`dispatcher.ts:83`），child engine 写进 x-slot 宿主的运行时指令属性（如 `x-loading`，child engine 编译期**保留** runtime 属性供自身 observer 检测）会被父 dispatcher `_handle`（`dispatcher.ts:159`）`collectEls` → `mount` **二次挂载** → 父/子双引擎抢管同一节点、父 LoadingDirective 在 child 子树里冒出来。

**致盲机制**：dispatcher 维护 `slotRoots: Set<HTMLElement>`。x-slot `created()` 调 `engine.dispatcher.addSlotRoot(el)` 登记宿主为盲区；`destroy()` 调 `removeSlotRoot(el)` 注销。dispatcher 的 `collectEls`（初始扫描 / `onDirectiveRegistered` 重扫）与 `_handle`（childList addedNodes / attributes 三态）对每个候选 el 过滤——`slotRoots.some(r => r !== el && r.contains(el))` 命中（**严格后代**）即**跳过**（不 mount、不 attrChange）。子树内运行时指令的 mount/attr 完全由 child engine 自身 dispatcher 负责，父 engine 对 x-slot 内部**致盲**。

**盲区不含宿主自身**（`r !== el`）：slot 宿主上的 runtime 指令（如 fetch 期间 x-slot 添加的 `x-loading`，决策 6）仍归父 dispatcher mount/unmount；仅其**子树**（child engine 编译产物）致盲。这是「复用 x-loading」与「隔离 child engine」并存的关键——宿主属性 toggle 须被父 dispatcher 观测，child 子树须被父 dispatcher 忽略。

static 模式已剥除指令属性（决策 1），父 dispatcher 本就无视；盲区主要服务 remote 模式（child engine 保留的 runtime 属性），但**两种模式统一登记盲区**（一行 add/remove，KISS、未来 static 若放宽保留属性亦安全）。

---

## 被否决的方案

- **α 跨 toggle 保内容（stash + adopt）**：与「`scope.destroy()` → child engine.destroy()」干净 teardown 正面冲突（scope 死于每次 toggle，α 要内容跨 toggle 幸存则不能在 scope 死时销毁 engine），须引入「detach 不销毁、仅 template 位置永久消失才销毁」的复杂分支。复杂度高、与用户选定的 teardown 机制互斥，否决（决策 3）。
- **内容编译岛（内层一次性编译获响应式）**：与「隔离 DOM 空间」「engine 不碰内容」核心措辞冲突——engine 经 watcher 持续改写内容即非隔离。内层反应式需求由 remote 模式（独立 child engine）承接，非 static 职责。否决。
- **复用父 store 的 child engine**：非「完全独立」、父状态渗入 child 违反 engine 边界。否决，child 自带 `new AutoStore({})`。
- **注释锚点 modifier（移除宿主、内容置注释之间）**：YAGNI。x-slot 只有一种宿主策略（内容在宿主内、宿主始终保留），remote 模式也需要真实宿主挂载 child engine。代价：flex/grid 直接子项、`<table>`/`<select>` 内容模型等「不愿多一层包裹」的场景不支持——文档化为已知限制，不为此加机制。
- **url 作字面量（非响应式）**：失去「换 state 即换子模板」能力，且与 x-text/x-html 的反应式值语义不一致。否决，url 经 `scope.watch` 求值。
- **走父 store 状态位驱动 x-loading**：违反 engine 边界（父状态须能表达 child 的加载态）。否决——改用宿主 `x-loading` 属性 toggle（字面量模式静态显示、不绑 store，决策 6）。
- **自渲染 loading 占位（`x-slot-loading`）**：重复实现 x-loading 已有的覆盖层 + 样式，违反 DRY。否决——直接 `setAttribute("x-loading")` 复用运行时指令。
- **fetch 失败静默留空**：用户无从知晓加载失败。否决，错误占位 + log + task/slot/rejected。
- **不加盲区、靠 child engine 自行管理**：父 dispatcher 仍 `subtree:true` 观察到 child 子树的 runtime 属性并二次 mount，双引擎抢管。必须致盲，否决「不隔离」。

## 后果

- ✅ **engine 边界清晰**：父反应式不渗入 x-slot、child 不渗出；static 内容 engine 永不覆写（T1 挡住）。
- ✅ **url 响应式**：换 `state.apiUrl` 即换子模板，复用 `scope.watch` 全套底座，零新反应式机制。
- ✅ **teardown 无泄漏**：child engine 随 `scope.destroy()` 销毁，abort 在途 fetch。
- ✅ **remote 开箱即用**：自带 store + loading 占位 + 错误占位 + task 事件。
- ⚠️ **不防 T2/T3**：x-slot 在 toggle/重建结构内会重克隆（static）/重 fetch（remote）——开发者 DOM API 改动在 toggle 后丢失、remote 每 toggle 重新网络请求。文档明示；需跨 toggle 保内容者待 α 升级（fast-follow）。
- ⚠️ **x-slot 是 ownsChildren**：不能与 `x-for` / eager `x-if` 同元素（`_resolveOwnership` 抛 owners 冲突，`compiler.ts:256`）——作 x-for/x-if 的**子元素**无碍。
- ⚠️ **需改 dispatcher.ts**：加 `slotRoots` 盲区机制（add/remove + collectEls/_handle 过滤）——这是 remote 模式正确性的必要改动。
- ⚠️ **remote 每 url 变化重建 child engine**：url 频繁切换时反复 fetch + 建/销 engine，有开销；缓解见 fast-follow（结果缓存）。

## 待决（fast-follow）

- **fetch 超时/重试**：AbortController + `engine.options.slotFetchTimeout` + 可选 retry 策略。
- **fetch 结果缓存**：避免 url 来回切换时反复网络请求（注意 cache 与「响应式 url 变化须重建 engine」的语义边界——可缓存 HTML 文本但 engine 仍按需建/销）。
- **α 持久化升级路径**：若 T2（toggle 保内容）场景成真，按 `this.template` 索引 stash + adopt，仅在 template 位置永久消失时 teardown。
- **`{{{ }}}` 与 x-html 共用 sanitizer**（ADR-0005 待决项）：remote fetch 的 HTML 是否经 `engine.options.sanitizer` 消毒——若 child engine 自带 options，可由 child 侧 `sanitizer` 承接，v1 不强制。

## 实现注记（非架构决策，落地时遵循）

- **`directives/presets/slot.ts`**：`SlotDirective extends AutoTemplateDirectiveBase`；`static override priority = 90`（结构指令档，介于 if=80 / for=100）；`static override singleton = true`；`static override ownsChildren = () => true`；kind 默认 Compile。
  - 字段：`private mode: "static" | "remote"`；`private childEngine?: AutoTemplateEngine`；`private abortCtrl?: AbortController`。
  - `created()`：`this.engine.dispatcher.addSlotRoot(this.el)`；判定模式——`this.value` 空 → `mode="static"`（compile 填充）；非空 → `mode="remote"`，`const initial = this.binding.watch(this.value, ({ value: url }) => this._loadUrl(url))` 后 `this._loadUrl(initial)`（watch 返回初值即触发首次加载）。
  - `compile()`：仅 static——深克隆 `this.template.childNodes`，对每个克隆递归 `removeDirectives` 剥指令属性（节点本身 + `querySelectorAll("*")` 后代），`appendChild` 进 `this.el`；若子树含指令/`{{}}` → `logger.warn`。
  - `_loadUrl(url)`：先 `_teardownEngine()`（abort + childEngine?.destroy() + `removeAttribute("x-loading")`）；`url` 假/空 → `el.replaceChildren()` return；否则 `el.setAttribute("x-loading", "true")`（复用 x-loading，决策 6）+ `broadcast("task/slot/started", { url })` + `fetch(url, { signal: myCtrl.signal })` → 成功（`res.ok`）→ `el.removeAttribute("x-loading")` + `el.innerHTML = await res.text()` + `this.childEngine = new (this.engine.constructor)(this.el, new AutoStore({}))`（经 `this.engine.constructor` 创建同类实例，避 `import AutoTemplateEngine` 循环依赖）→ `broadcast("task/slot/resolved", { url })`；失败 → `removeAttribute("x-loading")` + 错误占位（`.x-slot-error`）+ `logger.error` + `broadcast("task/slot/rejected", { url })`。每次 `fetch` 用独立 AbortController，await 后校验 `myCtrl.signal.aborted` 丢弃被取代/销毁的过期结果。
  - `_teardownEngine()`：`abortCtrl?.abort()` + `childEngine?.destroy()` + `el.removeAttribute("x-loading")`。
  - `destroy()`：`_teardownEngine()` + `this.engine.dispatcher.removeSlotRoot(this.el)`。
- **`directives/runtime/dispatcher.ts`**：加 `private slotRoots = new Set<HTMLElement>()`；`addSlotRoot(el)`/`removeSlotRoot(el)`；私有 `_inSlotRoot(el): boolean`（`slotRoots.size && [...slotRoots].some(r => r !== el && r.contains(el))`——**严格后代**，不含宿主自身，决策 8）；`collectEls` 的 `visit` 与 `_handle` 的 addedNodes/attributes 分支对候选 el 过滤盲区。
- **`directives/presets/index.ts`**：`export * from "./slot"` + `presetDirectives` 追加 `slot: SlotDirective`。
- **`types.ts AutoTemplateEngineOptions`**：可选 `slotFetchTimeout?: number`（fast-follow，v1 可不落字段）。
- **测试 `__tests__/x-slot.test.ts`**：① static 冻结——内层 `x-text` 不绑定（textContent 为空）、`{{}}` 不展开、反应式 state 变化后内容不变、DOM API 改动在反应式刷新后保留；② static 内层指令 warn；③ remote——mock fetch，url 初值 → loading → child engine 产物挂载、child engine 独立 store（其内 `x-data`/`x-text` 自治、父 state 变化不影响 child）；④ url 响应式变化 → 旧 child engine destroy + 新 fetch + 重建；⑤ fetch 失败 → 错误占位 + task/slot/rejected；⑥ teardown——x-if toggle false → child engine destroy 无泄漏（spy child.destroy）；⑦ dispatcher 盲区——child 子树内 `x-loading` 不被父 dispatcher 误 mount（父 instances 不含该 el）。
