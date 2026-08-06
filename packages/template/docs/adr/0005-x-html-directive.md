# ADR-0005：x-html 指令（默认消毒的原始 HTML 注入）

- **状态**：Accepted（Round 1，grill-with-docs）
- **日期**：2026-08-06
- **关联**：[glossary.md](../glossary.md)、[ADR-0001](0001-directive-kind-system.md)、[ADR-0004](0004-reactive-text-interpolation.md)

## 背景

`x-text`（`text.ts`）已将状态值绑定为 `textContent`：`created()` 经 `scope.watch(value, cb)` 订阅（纯路径走精准 watch、表达式走 `collectDependencies`），用返回的当前值首渲，后续变化由 scheduler 微任务合并后 patch。需求是引入 `x-html`——同构的反应式绑定，差别仅 patch 写 `innerHTML`（注入原始 HTML 片段）。

表面看是「`textContent` → `innerHTML`」的一字之差，但拷问暴露出**五个真正要决策的接线问题**，而非「复制 x-text 改一个属性」：

1. **安全姿态**：`innerHTML` 天然 XSS 入口。Vue `v-html` / Alpine `x-html` 均**默认不消毒**（把责任交给用户/DOMPurify）。但本引擎的哲学是 **safe-by-default**——`{{}}` 插值已默认 XSS 安全（ADR-0004 决策 6：一律 `String(value)` 写 text node，浏览器转义）。x-html 作为原始 HTML 注入是否也应默认安全？还是沿用生态的「默认裸奔」？
2. **消毒机制**：若默认消毒，用什么？项目当前**零 sanitizer**（grep 无命中）。自研极简、集成 DOMPurify、还是可插拔？
3. **注入内容是否编译**：引擎**自带编译器**——注入的 HTML 内若含 `<span x-text="..">`，是否递归编译、获得响应式？
4. **x-text + x-html 同元素**：二者皆「独占元素内容」、同 `priority=0`、不同名单例不去重。若同元素并存，per-tick 各写一次 → last-writer-wins，行为非确定。
5. **ownsChildren / 子节点擦除**：`compileElement`（`compiler.ts:219`）时序是 `scope.compile()`（跑 `created()`）**先于** `transformElement` 递归挂子节点。故 created() 写内容时元素为空，子节点是*之后*才挂上的；后续任一次响应式 patch（`innerHTML=`）会擦掉已挂载的子节点。x-text 当前**未设** `ownsChildren`，此为其既有特性——x-html 是否同此行为？

**关键事实**：反应式底座**全复用、零新增**。`scope.watch`（`scope.ts:262`）已统一路径/表达式两路 + 返回当前值；`{{}}` 优先级接线（`compileTextNode`，`compiler.ts:92`）**已含 `name === "html"`**——x-html 在场时插值编译期剪枝（ADR-0004 决策 5），无需改编译器。故本 ADR 的工作落在：① patch 写法、② 消毒、③ 让步。仍是「表面语法 + 一条 patch」，非新反应式机制。

## 决策

### 1. x-html 与 x-text 同构：复用 `scope.watch`，patch 写 `innerHTML`

`HtmlDirective` 与 `TextDirective` 同构：`static priority = 0`、`static singleton = true`、Compile 通道。`created()` 经 `this.binding.watch(this.value, cb)` 订阅（路径/表达式/`collectDependencies` 全复用），用返回的当前值首渲；cb 把**最终 HTML 字符串**写入 `el.innerHTML`。差别仅：x-text 写 `textContent`（转义），x-html 写 `innerHTML`（解析为 DOM）。

### 2. 默认消毒（safe-by-default）——与生态相反，与引擎哲学一致

**默认经 sanitizer 过滤后再写 `innerHTML`**。这与 Vue `v-html` / Alpine `x-html`（默认裸奔）相反，但对齐本引擎既定哲学：`{{}}` 插值已默认 XSS 安全（ADR-0004 决策 6），x-html 作为「原始 HTML 注入」这一更高危操作**更应**默认安全。用户想注入原始 HTML，得到的就是「已去掉主流 XSS 向量的安全 HTML」；想要完全裸奔，须显式 opt-in（决策 3）。

### 3. `.raw` 修饰符退出消毒——逃生舱

`x-html.raw="expr"` **跳过 sanitizer**，把绑定值原样写入 `innerHTML`。用于**受信内容**（如自家服务端生成的富文本、本地静态片段）。命名取 **`.raw`**：

- **正向描述内容模式**（原始 HTML），简短；
- **生态熟面**：Vue 文档称三花括号 / `v-html` 产物为 "raw HTML"，多引擎用 `raw` 表「未转义输出」；
- 优于 `.nosafe`（双重否定 "no-safe"，语义别扭）与 `.unsafe`（可用、风险可见性高，但偏长）。

启用 `.raw` 时**无视 x-html 绑定值为何种类型**，原样插入（非字符串先 `String()`，决策 7）。

### 4. 可插拔 sanitizer + 内置极简默认

`engine.options.sanitizer?: (html: string) => string`。默认 = 内置 `sanitizeHtml`（`utils/sanitize.ts`）：**`<template>` 惰性解析 + DOM 遍历**（非 regex），剥除：

- **脚本元素**：按 `localName === "script"` 移除（覆盖 HTML 与 SVG 命名空间的 `<script>`）；
- **事件属性**：所有 `on*`（`onclick`/`onerror`/`onload`/…）；
- **危险协议 URL 属性**：`href`/`src`/`xlink:href`/`formaction`/`action`/`background`/`poster`/`data`/`srcset`/`cite`/`longdesc`/`usemap`/`ping` 中，值为 `javascript:`/`vbscript:`/`livescript:`/`mocha:`/`data:text/html` 协议者。

需**工业级**安全（金融/UGC 富文本）时，注入 DOMPurify：`new AutoTemplateEngine(el, store, { sanitizer: DOMPurify.sanitize })`。

**极简 sanitizer 明知非无懈可击**——mutation XSS、foreign content（`<svg>`/`<math>` 命名空间混淆）、`<iframe srcdoc>` 等边角向量不在覆盖范围。这是 **aware 的权衡，非虚假安全感**：升级路径清晰（注入 sanitizer 选项），文档须明示其极简定位。选 DOM 遍历而非 regex 字符串清洗：regex 消毒易被 mutation XSS 绕过（标签拆分、实体编码、命名空间切换），DOM 解析后遍历已归一为真实节点、更稳；且引擎已有 `<template>.innerHTML` 惰性解析原语（`transformElement.ts:36`，不执行脚本/不加载资源）。

### 5. 注入的 HTML 不被编译（静态快照）

注入内容**不递归走转换器、不建 scope、不注册 watcher**——为静态快照。与 Vue `v-html` / Alpine `x-html` 一致。规避：无限递归（注入内容再含 `x-html`）、重复 scope 注册、XSS 随嵌套放大、性能开销。绑定值变化时**整体重写 `innerHTML`**（重新经消毒）。需动态子模板者走 `x-for`/`x-if`，非 x-html 职责。

### 6. x-text + x-html 同元素 → x-html 确定性胜出（x-text no-op 让步）

二者语义互斥（皆独占元素内容）、同 `priority=0`、不同名单例不去重。采**「确定性优先级 + 文档」**（非 fail-fast、非任其竞争）：

- **x-text 在同 scope 含 `html` 指令时，`created()` 直接 no-op**（首行一行守卫，`this.binding.directives.some(d => d.info.name === "html")`）——不订阅、不写内容；
- x-html 恒为唯一写入者，**与属性声明顺序、与 `_updates` 数组顺序皆无关**，完全确定。

`scope.directives`（`scope.ts:51`）在 scope 构造期（`createDirectives`，`scope.ts:244`）已全量就位，先于 `scope.compile()` → `runDirectives` → `created()`，故 x-text.created() 时必能查见同 scope 的 html 指令，守卫时序安全。

### 7. null / 非字符串：与 x-text 一致 stringify

`value == null ? "" : String(value)`，再经消毒（默认）或原样（`.raw`）写 `innerHTML`。与 x-text（`text.ts:16`）完全一致。

### 8. `<script>` 不执行（浏览器既定，文档化）

`innerHTML=` 本就**不执行** `<script>`（HTML 规范约束，与 `v-html` 一致）；默认 sanitizer 还会**剥除** `<script>`。`.raw` 下虽不剥，浏览器仍不执行 innerHTML 注入的脚本——若需执行脚本须显式处理（非 x-html 职责）。

### 9. `{{}}` 优先级接线已就位（零编译器改动）

`compileTextNode`（`compiler.ts:92`）已写 `d.info.name === "text" || d.info.name === "html"`——x-html 在场时，同元素的直接文本 `{{}}` **编译期剪枝**（不拆分、不注册 watcher），与 x-text 同构（ADR-0004 决策 5）。本 ADR **无需改编译器**。

### 10. 不设 ownsChildren（与 x-text 对齐，继承既有特性）

`compileElement` 时序（`compiler.ts:234`）：`scope.compile()`（→ `created()` 写内容）先于 `transformElement` 递归挂子节点。故 x-html 元素若**模板里写了静态子节点**，首渲被 created() 覆写、之后挂上、再被响应式 patch 擦除——此为 **x-text 既有特性**（x-text 亦未设 `ownsChildren`），x-html 继承以求对齐。子节点的 watcher 待 scope destroy 统一回收（不永久泄漏）。

**不设 `ownsChildren` 的理由**：x-html 与 x-text 语义对称（用户期望「基本一样」）；设了会与 x-text 行为分叉、破坏直觉。子节点擦除是边角用法（在 x-html 元素内放静态指令子节点本就反模式），文档提示避免即可，不为它引入结构指令级别的所有权机制（YAGNI）。

---

## 被否决的方案

- **默认不消毒（Vue/Alpine 一致）**：与本引擎 safe-by-default 哲学相悖——`{{}}` 已默认 XSS 安全，x-html 不应成为「默认开启的 XSS 入口」。默认消毒 + `.raw` 逃生舱更贴引擎定位。
- **内置集成 DOMPurify**：开箱即工业级，但**强加**依赖体积与构建集成给所有用户（含用 `.raw` 的）；可插拔方案让需者自取，不连带 Majority。
- **仅极简、不可插拔**：极简 sanitizer 必被绕过且无升级路径 → 虚假安全感。可插拔是这条否决的直接反面。
- **注入 HTML 递归编译**：强大（动态子模板）但危险——无限递归、重复 scope、XSS 随嵌套放大、性能差；与生态默认相悖。需动态子模板走 x-for/x-if。
- **text+html fail-fast 报错**：互斥编译期检测无自然落点（`_resolveOwnership` 仅管 `ownsChildren` 结构指令），且用户选「确定性优先级 + 文档」；no-op 让步守卫比抛错更柔和、用户迁移负担更小。
- **text+html 任其 per-tick 竞争**：last-writer-wins 依赖 `_updates` 数组顺序，随指令排序/属性顺序变化，**非确定**——x-text 让步守卫使其完全确定。
- **regex 字符串消毒**：易被 mutation XSS 绕过（标签拆分/实体编码/命名空间切换）；DOM 解析遍历更稳，引擎已有惰性解析原语。
- **`.nosafe` / `.unsafe` 命名**：`.nosafe` 双重否定别扭；`.unsafe` 可用但偏长、且「不安全」是消极框定。`.raw` 正向、简短、生态熟面。
- **x-html 设 ownsChildren**：与 x-text 行为分叉、破坏「基本一样」直觉；子节点擦除是边角反模式，文档提示足矣，不值得结构指令级机制。

## 后果

- ✅ **零新反应式机制**：全复用 `scope.watch` + `collectDependencies` + scheduler，与 x-text 同构。
- ✅ **默认 XSS 安全**（极简 sanitizer 兜底主流向量）+ `.raw` 逃生舱 + 可插拔升级（DOMPurify）。
- ✅ **`{{}}` 优先级接线已就位**，零编译器改动；`compileTextNode` 已含 `html` 判定。
- ✅ x-text + x-html 同元素行为**完全确定**（x-html 胜出、x-text 静默 no-op）。
- ⚠️ **极简 sanitizer 非无懈可击**（mutation XSS / foreign content / `<iframe srcdoc>`）——文档须明示，高安全场景注入 DOMPurify。这是 aware 权衡，非虚假安全感。
- ⚠️ x-html 元素内的**静态指令子节点**会被响应式 patch 擦除（x-text 既有特性，文档提示避免）。
- ⚠️ 注入 HTML **不获响应式**（静态快照）；需动态子模板走 x-for/x-if。
- ⚠️ `<script>` 在注入内容中不执行（浏览器默认 + 默认消毒剥除）；`.raw` 下亦不执行。
- ⚠️ x-text + x-html 同元素：x-html 胜出、x-text 静默 no-op（文档化，迁移既有模板须留心）。

## 待决（fast-follow）

- **`{{{ }}}` 原始 HTML 插值**（ADR-0004 待决项）：落地时复用本 ADR 的可插拔 sanitizer（按段 innerHTML），共用 `engine.options.sanitizer`——届时把默认从 x-html 局部回退上提至 engine 全局更自然。
- **sanitizer 配置化**：当前内置极简为硬编码白/黑名单；若需求出现，可扩为 `sanitizerOptions`（允许/禁用标签表）。

## 实现注记（非架构决策，落地时遵循）

- **`utils/sanitize.ts`**：`export function sanitizeHtml(html: string): string`——`document.createElement("template")` + `tpl.innerHTML = html`（惰性解析）→ `Array.from(tpl.content.querySelectorAll("*"))` 遍历：`localName === "script"` 移除；`attr.name.toLowerCase().startsWith("on")` 移除；URL 属性 ∈ 集合且值匹配危险协议正则则移除。末尾返回 `tpl.innerHTML`。纯函数、可独立单测。`html == null` 返回 `""`。
- **`types.ts AutoTemplateEngineOptions`**：加 `sanitizer?: (html: string) => string`，注释说明默认极简、可注入 DOMPurify、x-html 默认消费。
- **`directives/presets/html.ts`**：`HtmlDirective extends AutoTemplateDirectiveBase`；`static priority = 0`、`static singleton = true`；`created()`：`value` 空（null/""）直接 return；`const raw = this.modifiers?.includes("raw")`；cb 与首渲均 `el.innerHTML = raw ? text : (this.engine.options.sanitizer ?? sanitizeHtml)(text)`，其中 `text = value == null ? "" : String(value)`。
- **`directives/presets/index.ts presetDirectives`**：追加 `html: HtmlDirective`（`export * from "./html"` 已存在）。
- **`directives/presets/text.ts`**：`created()` 首行加 `if (this.binding.directives.some((d) => d.info.name === "html")) return;`（确定性让步，决策 6）。
- **测试 `__tests__/x-html.test.ts`**：镜像 `x-text.test.ts`（路径/表达式/数值）+ 默认消毒（`<script>`/`onerror`/`javascript:` 被剥）+ `.raw` 原样保留 + 与 x-text 同元素时 x-html 胜出（textContent 不出现）。
