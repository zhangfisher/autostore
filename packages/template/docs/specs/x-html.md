# Spec：x-html 指令（默认消毒的原始 HTML 注入）

> 关联：[ADR-0005](../adr/0005-x-html-directive.md)、[glossary「原始 HTML 注入（x-html）」](../glossary.md)、[ADR-0004](../adr/0004-reactive-text-interpolation.md)。
> 术语统一引用项目 glossary（DirectiveKind / scope 通道 / Compile 指令 / singleton / priority / `{{}}` 插值 / safe-by-default）。

## Problem Statement

模板需要把状态中的**原始 HTML 片段**（服务端返回的富文本、动态拼装的标记、本地静态片段）渲染进元素，并在状态变化时原位更新。现有 `x-text` 只能写**转义后的纯文本**（`textContent`）——`<b>` 这类标记会被当字面字符显示，无法满足「注入 HTML 并保持响应式」的需求。

同时，原始 HTML 注入天然是 **XSS 入口**。引擎需要给出一条**既可用、又默认安全**的通道：普通用户拿到「已去掉主流 XSS 向量的安全 HTML」，需要完全裸奔的受信场景有显式逃生舱，需要工业级安全时可整体替换消毒器。

## Solution

新增 `x-html` 指令——与 `x-text` **同构**的响应式绑定，差别仅在 patch 写 `innerHTML`（解析为 DOM）而非 `textContent`（转义文本）。默认对注入内容做 HTML 消毒（**safe-by-default**，与本引擎 `{{}}` 插值默认 XSS 安全的哲学一致），剥除主流 XSS 向量；提供 `.raw` 修饰符作为退出消毒的逃生舱，用于受信内容；消毒器可经引擎选项替换为 DOMPurify 等工业级实现。注入内容为**静态快照**，不被递归编译（不建 scope/watcher，不获响应式）。

## User Stories

1. 作为模板开发者，我想把状态里的原始 HTML 渲染进某元素，这样富文本/动态标记能正确呈现而非当字面字符。
2. 作为模板开发者，我想在状态变化时 HTML 自动原位更新，这样无需手动重渲染。
3. 作为模板开发者，我想用简单状态路径绑定（`x-html="user.bio"`），这样最常见用法零样板。
4. 作为模板开发者，我想用表达式绑定（`x-html="'<b>'+name+'</b>'"`），这样多依赖变化自动重算。
5. 作为模板开发者，我想数值/对象等非字符串值被合理 stringify 后注入，这样不会抛错或出现 `[object Object]` 残留。
6. 作为模板开发者，我想 `null`/`undefined`/空串渲染为空内容，这样初始未就绪状态不报错。
7. 作为应用所有者，我想**默认就对注入的 HTML 做 XSS 过滤**，这样用户生成内容不会因疏忽导致 XSS。
8. 作为应用所有者，我想默认消毒剥除 `<script>`，这样脚本注入向量被堵。
9. 作为应用所有者，我想默认消毒剥除 `on*` 事件属性（`onerror`/`onclick`/…），这样事件钩子向量被堵。
10. 作为应用所有者，我想默认消毒剥除 `javascript:`/`vbscript:`/`data:text/html` 危险协议 URL，这样属性向量被堵。
11. 作为应用所有者，我想默认消毒**不误杀**合法标签（`<b>`/`<i>`/`<a>` 安全 href/`<img>` 安全 src），这样正常富文本可用。
12. 作为应用所有者，我想默认消毒**保留** `data:image/*` 等安全 data URL，这样内联图片不丢失。
13. 作为模板开发者，我想用 `.raw` 修饰符注入**受信**内容并跳过消毒（`x-html.raw`），这样自家服务端生成的富文本原样呈现。
14. 作为模板开发者，我想 `.raw` 下危险属性（如 `onerror`）被原样保留，这样我能明确知道「我选择了退出安全」。
15. 作为安全工程师，我想能经引擎选项注入 DOMPurify 作为消毒器，这样金融/UGC 等高安全场景获工业级保护。
16. 作为安全工程师，我想消毒器是**纯函数** `(html: string) => string`，这样可独立替换、易测、无副作用。
17. 作为安全工程师，我想 `.raw` 在文档与行为上都**显式标注为退出安全**，这样误用可追溯。
18. 作为模板开发者，我想注入的 HTML **不被再次编译**（内含 `x-text` 等指令不生效），这样行为可预期、无无限递归风险。
19. 作为模板开发者，我想 `<script>` 在注入内容中**不执行**，这样与浏览器 `innerHTML` 既定语义一致、无意外代码运行。
20. 作为模板开发者，我想 `x-html` 与同元素的直接文本 `{{}}` 插值共存时 `x-html` 胜出且插值不泄漏，这样不产生孤儿 watcher。
21. 作为模板开发者，我想同元素同时写 `x-text` 与 `x-html` 时行为**确定**（x-html 胜出），这样不会因指令顺序不同而结果漂移。
22. 作为模板开发者，我想 `x-html` 在 `x-for` 列表项内逐项生效，这样每个项的 HTML 各自绑定。
23. 作为模板开发者，我想 `x-html` 在 `x-if` 条件子树内生效，这样条件渲染的 HTML 正常工作。
24. 作为模板开发者，我想 `x-html` 经 `scope.watch` 支持 x-data 局部变量与 x-for item 等 scope 相对表达式，这样与其它指令的反应式来源一致。
25. 作为模板开发者，我想 x-for primitive 循环变量驱动的 `x-html` 在项 rebind 时经 `scope.refresh()` 重算，这样与引擎现状的响应式语义一致。
26. 作为模板开发者，我想多个 `x-html` 分布在不同元素上彼此独立，这样互不干扰。
27. 作为模板开发者，我想同元素多个 `x-html` 声明按 singleton 取最后一条，这样与 `x-text` 行为一致、可预期。
28. 作为模板开发者，我想 `x-html` 的执行优先级（`priority=0`）排在结构指令（x-for/x-if）之后，这样列表/条件先生成容器、再注入 HTML。
29. 作为维护者，我想 `x-html` 复用既有反应式底座（`scope.watch`/`collectDependencies`/scheduler），这样不引入新订阅机制、destroy/refresh 自动。
30. 作为维护者，我想引擎未配置自定义消毒器时回退到内置极简默认，这样开箱即安全、零配置。
31. 作为维护者，我想引擎销毁时 `x-html` 的 watcher 随 scope 统一回收，这样无内存泄漏。
32. 作为库集成者，我想 `sanitizer` 选项是稳定的公共 API，这样升级/替换消毒器不必改指令代码。
33. 作为文档读者，我想明确知晓内置极简消毒器**非无懈可击**（mutation XSS/foreign content 不覆盖）及升级路径，这样不会产生虚假安全感。
34. 作为文档读者，我想明确知晓在 `x-html` 元素内放静态指令子节点会被响应式 patch 擦除（与 x-text 既有特性一致），这样避免反模式。

## Implementation Decisions

- **指令性质**：`x-html` 为 **Compile 指令**（scope 通道），`priority = 0`、`singleton = true`，与 `x-text` 完全对称。生命周期走 `created()`（建订阅 + 首渲）；`compile()`/`destroy()` 沿用基类默认（destroy 由 scope 统一回收 watcher）。
- **patch 写法**：`el.innerHTML = <最终 HTML 字符串>`（解析为 DOM），区别于 `x-text` 的 `el.textContent = <转义文本>`。这是与 x-text 的**唯一**语义差别。
- **反应式底座全复用**：经 `scope.watch(value, cb)` 订阅——纯路径走精准 watch、表达式走 `collectDependencies`；用返回的当前值做首渲；后续变化由 scheduler 微任务合并后 patch。**不引入任何新订阅机制**。
- **默认消毒（safe-by-default）**：默认把注入字符串经消毒器后再写 `innerHTML`，与本引擎 `{{}}` 插值默认 XSS 安全的哲学一致（与 Vue `v-html`/Alpine `x-html` 默认裸奔相反）。
- **`.raw` 修饰符**：`x-html.raw="expr"` **跳过消毒器**、原样写 `innerHTML`，用于受信内容。编译期按指令实例判定（非运行时切换）。启用时无视绑定值类型，原样插入。
- **可插拔消毒器（API 契约，决策编码）**：引擎选项新增 `sanitizer?: (html: string) => string`；缺省回退内置极简消毒器。`x-html` 的 `.raw` 整体跳过此选项。注入 DOMPurify 即获工业级：构造时传入 `{ sanitizer: DOMPurify.sanitize }`。
- **内置极简消毒器实现取向**：`<template>` 惰性解析（不执行脚本/不加载资源）→ DOM 遍历（非 regex，抗 mutation XSS）→ 剥除：脚本元素（按 `localName === "script"`，覆盖 HTML 与 SVG 命名空间）、`on*` 事件属性、危险协议 URL 属性（`href`/`src`/`formaction`/… 中 `javascript:`/`vbscript:`/`data:text/html` 等）→ 序列化回 HTML 字符串。**明知非无懈可击**（mutation XSS/foreign content/`<iframe srcdoc>` 等边角不覆盖），升级路径 = 注入 sanitizer。
- **注入内容不编译**：注入 HTML 为静态快照，不递归走转换器、不建 scope、不注册 watcher；值变化时整体重写 `innerHTML`（重新消毒）。
- **内容指令确定性优先级**：同元素并存 `x-text` 与 `x-html` 时，**x-html 确定性胜出**——`x-text` 在同 scope 含 `html` 指令时 `created()` 直接 no-op（不订阅、不写）。非 fail-fast、非 last-writer-wins，与属性声明顺序及调度数组顺序皆无关。
- **`{{}}` 插值静默优先级**：`x-html` 在场时，同元素直接文本 `{{}}` 在编译期剪枝（不拆分、不注册 watcher），与 x-text 同构（避免孤儿 watcher泄漏）。该接线已就位。
- **null/非字符串处理**：`value == null ? "" : String(value)`，再消毒（默认）或原样（`.raw`）写 `innerHTML`。与 x-text 一致。
- **`<script>` 不执行**：`innerHTML=` 本就不执行脚本（浏览器约束）；默认消毒还会剥除 `<script>`。`.raw` 下虽不剥，浏览器仍不执行。
- **不设 `ownsChildren`**：与 x-text 对齐。`x-html` 元素内的静态指令子节点会被响应式 patch 擦除（x-text 既有特性，文档提示避免）；不为该边角引入结构指令级所有权机制。

## Testing Decisions

- **好测试的标准**：只测**外部行为**（渲染后的 DOM），不测实现细节（不Assert sanitizer 内部、不 Assert watcher 注册）。这让重构自由、减少脆弱测试。
- **唯一接入点（seam）**：复用既有最高层行为级 seam——`mount(templateHtml, state, options?)` 挂载模板 → 驱动 `store.state` → `await nextTick()` → `expect(root).toEqualHTML(...)` 断言渲染后 DOM。**0 新 seam**，与 x-text/x-bind/x-if 同构。
- **覆盖项（均经该 seam 可观测）**：
  - 路径绑定初始渲染 + 状态变化重写 `innerHTML`；
  - 表达式绑定多依赖自动收集与重算；
  - 默认消毒剥除 `<script>`/`on*`/`javascript:` 协议；
  - `.raw` 原样保留危险属性（证明退出消毒）；
  - 可插拔 `sanitizer` 选项覆盖默认（经 `mount` 第三参注入自定义 sanitizer）；
  - `null`/空值渲染为空内容；
  - 同元素 `x-text`+`x-html` 时 x-html 确定性胜出（变化 x-text 依赖不影响输出，变化 x-html 仍生效）。
- **消毒边界用例**：通过渲染 DOM 断言（如合法 `<b>`/安全 href 保留、危险协议被剥），不另开 `utils/` 纯函数 seam——遵循「seam 越少越好」原则。安全关键边界若未来需穷举向量，可再评估是否引入第二个纯函数 seam。
- **先验**：`x-text.test.ts`（镜像范本）、`x-bind.test.ts`、`x-if.test.ts`（同 seam 用法）。

## Out of Scope

- **`{{{ }}}` 原始 HTML 插值**（ADR-0004 待决项）：落地时应复用本 spec 的可插拔消毒器（按段 innerHTML），届时把默认消毒器从 `x-html` 局部回退上提至 engine 全局更自然。
- **内置消毒器的白/黑名单可配置化**（允许/禁用标签表）：当前为硬编码取向，需求驱动再做。
- **注入 HTML 的递归编译**（嵌套响应式）：明确不做，需动态子模板走 x-for/x-if。
- **表单文本**（`<textarea>`/`<option>`）的 HTML 注入语义。
- **自定义插值分隔符**。
- **使内置极简消毒器无懈可击**：明确非目标，高安全场景注入 DOMPurify。

## Further Notes

- **状态**：本 spec 描述的特性**已实现并通过测试**（全量 388 测试 0 失败；template 包 0 类型错误）。此 spec 作为「已商定行为」的权威记录，供验证/回归/后续维护代理参照，而非绿地新建。
- **决策出处**：架构决策全文见 [ADR-0005](../adr/0005-x-html-directive.md)（含被否决方案与后果）；术语见 [glossary「原始 HTML 注入（x-html）」](../glossary.md)。
- **哲学一致性**：safe-by-default 立场与本引擎 `{{}}` 插值默认 XSS 安全（ADR-0004 决策 6）一脉相承；`x-html` 是「显式选择注入原始 HTML」的通道，默认仍守住安全底线，`.raw` 是显式 opt-out。
- **未发布到 issue tracker**：因本机未配置 tracker 与 triage 标签词表（且无 `gh` CLI），spec 暂落仓库 markdown；待 `/setup-matt-pocock-skills` 配置后可迁移至 tracker 并打 `ready-for-agent`。
