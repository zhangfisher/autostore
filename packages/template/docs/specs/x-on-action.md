# Spec：x-on 的 Action 抽象（事件响应函数的统一规格）

> 关联：[ADR-0001](../adr/0001-directive-kind-system.md)、[ADR-0007](../adr/0007-directive-options-and-modifiers.md)、[glossary「钩子」/「RuntimeDirective 接口」](../glossary.md)。
> 术语统一引用项目 glossary（DirectiveKind / scope 通道 / Compile 指令 / priority / singleton / OnEvalContext）。

## Problem Statement

`x-on:event` / `@event` 用于监听任意 DOM 事件。其响应函数被**统一抽象为 Action**——这是模板「最小声明、最大响应」哲学在交互侧的落点：既支持显式、可测试、可维护的具名 action（`@click="submit"`），又保留内联表达式的零样板（`@click="count++"`、`@click="alert(1)"`）。

但 Action 的规格——**什么算 Action、它从哪里来、沿什么链查找、何时查找、以什么 `this` 与参数调用、与表达式如何划定边界、修饰符如何作用于它**——目前只散落在求值器与类型文件的代码注释里，缺一份权威、可被验证 / 回归 / 后续维护代理参照的规格记录。任何对这些行为有歧义的讨论（如「`user.save` 算不算 action」「action 没注册会怎样」「修饰符还包不包 action」）都没有单一事实源可查。

本 spec 把这些**已商定、已实现**的行为固化为权威规格。

## Solution

明确 Action 抽象的完整（同步）规格，覆盖五个面：

1. **语法识别**：一条正则把指令值分为「Action 候选」与「表达式兜底」两类。
2. **来源链**：局部 `<script type="actions">` 注入 + 全局 `engine.actions`。
3. **查找链与时机**：沿 scope parent 链子覆盖父、命中即止；**查找延迟到事件触发时**。
4. **`OnEvalContext` 契约**：action 的 `this`、参数求值、`data` 读写通道、`$options` 配置通道。
5. **Action 优先 + 表达式兜底 + 修饰符管道**：命中具名 action 优先，否则退化为 `with(data)` 表达式；guard / wrapper / option 三类修饰符对二者同样生效。

本 spec **不引入任何代码变更**——所描述行为均已实现并通过测试，此处为「已商定行为」的权威记录。

## User Stories

### 语法识别（Action 候选 vs 表达式兜底）

1. 作为模板开发者，我想用裸名调用 action（`@click="submit"`），这样最常见的「点名调用」零样板。
2. 作为模板开发者，我想用空括号调用 action（`@click="submit()"`），这样与「裸名」语义等价、可读性自选。
3. 作为模板开发者，我想给 action 传参（`@click="pay(1, order.id)"`），这样参数按表达式求值后透传。
4. 作为模板开发者，我想用内联表达式副作用（`@click="count++"`），这样简单自增不必另写 action。
5. 作为模板开发者，我想用内联表达式调用全局 / 模板函数（`@click="alert(1)"`、`@click="go('/x')"`），这样无需把每个一次性函数都登记成 action。
6. 作为模板开发者，我想用属性访问表达式（`@click="user.save"`）时它**不**被当作 action 命名查找，而走表达式求值，这样点号路径语义明确。
7. 作为模板开发者，我想用复合表达式（`@click="a + b"`、`@click="n = n + 1"`）走表达式兜底，这样任意 JS 副作用表达式可用。
8. 作为维护者，我想「是否 Action 候选」的判据是**一条确定正则**（首段为合法标识符、可选单层括号），这样边界可预期、无歧义。

### 来源（局部 script / 全局 engine.actions）

9. 作为模板开发者，我想把页面级 action 集中注册到 `engine.actions`（`engine.actions.submit = fn`），这样全局可点。
10. 作为模板开发者，我想用 `<script type="actions">{ fn(){...} }</script>` 声明**局部** action，这样组件内聚、不污染全局。
11. 作为模板开发者，我想局部 `<script type="actions">` 在编译期被提取并从渲染 DOM **移除**，这样最终 HTML 干净、不残留脚本节点。
12. 作为模板开发者，我想普通 `<script>`（无该 type）**原样保留**在渲染 DOM，这样既有内联脚本不受影响。
13. 作为模板开发者，我想局部 action 注入到**最近祖先 scope**，这样它对该子树可见、与 x-data 边界对齐。
14. 作为模板开发者，我想 `<script type="actions">` 内容须为对象字面量（`{ fn(){}, ... }`），这样解析可预期；非法内容记日志而非崩溃。
15. 作为库集成者，我想全局 action 经构造选项 `options.actions` 注入、且 `engine.actions` 与之**同一引用**，这样运行时追加 / 覆盖 action 直接生效。

### 查找链与时机

16. 作为模板开发者，我想 action 查找沿 scope parent 链进行（本 scope.actions → 各祖先 actions → engine.actions 终点），这样嵌套子树自动继承外层 action。
17. 作为模板开发者，我想子 scope 同名 action **覆盖**祖先（命中即止），这样内层可重写外层行为。
18. 作为模板开发者，我想局部 action 覆盖同名全局 action，这样局部定制优先于全局默认。
19. 作为模板开发者，我想在指令 `created` **之后**才注册的 action（运行时 `engine.actions.xxx = fn`、或后注入的局部 script）也能被命中，这样注册时序不约束用法。
20. 作为维护者，我想「action 引用不在 `created` 时缓存、而在每次事件触发时现查」，这样规避「actions 后注册 → created 时查到 undefined 误走表达式」的时序暗坑。
21. 作为维护者，我想「表达式编译」与「参数求值器」在 `created` 时一次性完成（指令值不变），这样事件触发路径零重复编译开销。

### OnEvalContext 契约（this / 参数 / data 通道 / $options）

22. 作为模板开发者，我想在 action 内经 `this.el` 拿到触发元素，这样可操作 DOM。
23. 作为模板开发者，我想在 action 内经 `this.$event` 拿到原生事件对象，这样可读 `target.value` / `key` / 阻止默认行为等。
24. 作为模板开发者，我想在 action 内经 `this.store`（AutoStore 实例）直接写全局响应式 state（`this.store.state.count++`），这样改动自动联动 DOM。
25. 作为模板开发者，我想在 action 内经 `this.data` 读取**聚合视图**（x-data 局部字段 + 全局 state 拍平可见），这样无需关心数据来自哪一层。
26. 作为模板开发者，我想在 action 内经 `this.data.<x-data 字段> = v` **写入**并触发细粒度响应式更新，这样局部状态改动联动 DOM。
27. 作为模板开发者，我想在 action 内经 `this.scope`（AutoTemplateScope 实例）做深层访问（`getDataScope()` 沿链取最近 x-data 域、`engine`、`parent`），这样区别于只读的 `this.data` 聚合视图。
28. 作为模板开发者，我想嵌套 x-data 下、后代元素的 action 经聚合视图自动读到**最近（内层）** x-data 字段，这样同名字段就近覆盖。
29. 作为模板开发者，我想无 x-data 时 `getDataScope()` 返回 null、`this.data` 仍可读全局 state，这样 action 在无局部数据场景仍可用。
30. 作为模板开发者，我想在 action 内经 `this.$options` 读取指令配置（含修饰符注入的开关，如 `.left` → `$options.left === true`），这样 action 可据修饰符分支。
31. 作为模板开发者，我想 `this.$options` 按两层回退（指令选项 → 宿主 `x-options`）且**只读**（写入静默失败），这样配置静态、与 `data` 数据通道正交不冲突。
32. 作为模板开发者，我想 action 参数表达式内可用 `$event`（`@input="recv($event.target.value)"`），这样事件对象能透进参数。
33. 作为模板开发者，我想 action 参数表达式经 `with(data)` 求值，这样参数里能引用 x-data 字段与全局 state。

### Action 优先 + 表达式兜底

34. 作为模板开发者，我想「指令值是 Action 候选**且**该名在查找链上命中一个 function」时**优先按 action 调用**，这样具名 action 的可测试 / 可维护性优先。
35. 作为模板开发者，我想 action 未命中（查找链上无此名 / 命中但非 function）时**自动退化**到 `with(data)` 表达式求值，这样 `alert(1)` / `count++` 等仍可用、无需为它们登记空 action。
36. 作为模板开发者，我想 action 调用与表达式求值的**错误都被捕获**并记 `engine.logger.error`、不中断后续事件处理，这样一个坏 action 不拖垮整页交互。
37. 作为维护者，我想 action 调用与表达式求值共用同一套「宽松求值」错误处理（与 `watchExpression` 一致），这样行为统一、无第二套错误语义。

### 修饰符管道对 Action 的生效

38. 作为模板开发者，我想 `@click.ctrl`、`@keydown.enter`、`@click.self` 等 **guard 修饰符**对 action 同样生效（不满足条件则不调用），这样交互守卫无需写进 action 体。
39. 作为模板开发者，我想多个 guard 修饰符组成 **AND 链**（任一不满足即短路），这样 `@keydown.ctrl.enter` 表达「Ctrl 且 Enter」。
40. 作为模板开发者，我想 `.debounce` 等 **wrapper 修饰符**包裹整条管道（含 guard 与业务），这样防抖语义对 action 与表达式一致生效。
41. 作为模板开发者，我想 `.once` / `.capture` / `.passive` 等 **option 修饰符**合并进 `addEventListener` 第 3 参，这样原生监听选项经修饰符声明式可用。
42. 作为模板开发者，我想 guard 在 wrapper 之内（防抖到时才校验 guard），这样 `@click.debounce.ctrl` 的语义可预期。
43. 作为模板开发者，我想修饰符与 `x-on-options="{...}"` / 元素级 `x-options` **等价互通**（修饰符是选项的快捷写法），这样带值配置（如 debounce 时长）与开关配置有统一出口。
44. 作为维护者，我想修饰符统一为 descriptor（`option` / `guard` / `wrapper` 三型，按 `type` 分派），这样 `OnDirective` 主逻辑与具体修饰符解耦、新增修饰符不改主流程。

### 生命周期与多事件

45. 作为模板开发者，我想同元素声明多个 `x-on` 事件（`@click` + `@input` + `@keydown`）各自独立绑定，这样一个元素可响应多种事件。
46. 作为模板开发者，我想 `@click` 与 `x-on:click` **等价**，这样简写与全写可混用。
47. 作为模板开发者，我想指令值为空（`@click` 无值）时**不报错、不绑定**，这样占位 / 待接线写法不崩。
48. 作为维护者，我想 `engine.destroy` 后所有 `x-on` 监听被 `removeEventListener` 解绑（同一 handler 引用 + 同一 options、capture 字段一致），这样无内存泄漏、销毁后点击无副作用。
49. 作为维护者，我想 wrapper 注册的清理（如 pending debounce timer）在 destroy 时被 cancel，这样销毁不触发已排期的延迟回调。
50. 作为维护者，我想 `x-on` 是 **Compile 指令**（scope 通道）、`priority = 50`、`singleton = false`，这样它建 scope、可同元素多实例、与结构指令的优先级关系确定。

## Implementation Decisions

> 所列均为**已实现**的决策，本 spec 仅作权威记录；不含具体文件路径（避免过时）。

- **指令性质**：`x-on` 为 **Compile 指令**（scope 通道），`priority = 50`、`singleton = false`。生命周期：`created()` 一次性构造最终 handler 并 `addEventListener`；`destroy()` 先 cancel wrapper 清理、再 `removeEventListener`。事件是 **push 模型**——不经 scheduler、不调 `collectDependencies`（区别于 x-text/x-html 等拉模型绑定）。
- **语法识别（Action 候选 vs 表达式，决策编码）**：指令值经一条正则判定。匹配者先尝试 Action 查找，不匹配者直接走表达式兜底。该正则来自现有求值器实现，精确编码了「Action 候选」边界：
  ```
  ^([A-Za-z_$][\w$]*)\s*(?:\(([\s\S]*)\))?$
  ```
  形态对照：
  | 指令值 | 命中？ | name | argsSrc | 走向 |
  |---|---|---|---|---|
  | `submit` | ✅ | `submit` | undefined | Action 候选（无参） |
  | `submit()` | ✅ | `submit` | `""` | Action 候选（空参，等价裸名） |
  | `pay(1, x)` | ✅ | `pay` | `"1, x"` | Action 候选（带参） |
  | `count++` / `a + b` / `user.save` / `alert(1)` | ❌ | — | — | 表达式兜底 |
  > 注意 `alert(1)` 形似 `name(args)` 但 `alert` 未在查找链命中 → 仍落表达式兜底（见「Action 优先 + 表达式兜底」）。判据是「**正则匹配 + 查找链命中 function**」二者皆真才走 Action。
- **来源链**：
  - **局部**：`<script type="actions">` 在编译期被提取，内容按宽松 JSON 解析为对象字面量、注入**最近祖先 scope.actions**；该 `<script>` 节点从渲染 DOM 移除（普通 `<script>` 原样保留）。非法内容（非对象字面量 / 解析失败）记 `engine.logger.error`，不崩溃。
  - **全局**：`engine.actions` 是 `options.actions` 的**同一引用**（getter 直返），运行时 `engine.actions.xxx = fn` 即时生效。
- **查找链**：`scope.getAction(name)` 沿 parent 链——本 `scope.actions` → 各祖先 `actions` → `engine.actions`（终点）。子覆盖父、`hasOwnProperty` 判命中、命中即止。
- **查找时机（关键）**：Action 查找**延迟到事件触发时**（handler 闭包内现调 `scope.getAction`）。理由：actions 可能在指令 `created` 之后才注册（运行时赋值 `engine.actions`、后注入的局部 script），若 `created` 时缓存引用会查到 undefined 误走表达式。仅「表达式编译」（`new Function`，指令值不变）与「参数求值器」在 `created` 时一次性完成，事件触发路径零重复编译。
- **调用约定**：命中 function 时，以 `OnEvalContext` 为 `this` 调用；参数由 args 求值器（`new Function('$event','data','with(data){return [...]}')`）产出数组，无参（裸名 / 空括号）则无参调用。调用包裹 try/catch，异常记 `engine.logger.error`、不中断。
- **`OnEvalContext` 契约（决策编码）**：作为 action 的 `this`，同时其字段经表达式 `with(data)` 可见。字段语义：
  | 字段 | 类型 | 语义 |
  |---|---|---|
  | `el` | HTMLElement | 触发元素 |
  | `$event` | Event | 原生事件对象（亦作表达式求值器形参注入） |
  | `data` | 聚合视图 | `scope.getScopeContext()`：localScope + dataScope + 全局 state 拍平。**可读可写**：写 x-data 字段经 set 陷阱透传到响应式 dataScope 触发细粒度更新；写 localScope（普通对象）不响应式 |
  | `scope` | AutoTemplateScope | 当前 scope 实例，提供 `getDataScope()`（沿链取最近 x-data 域）/ `engine` / `parent` 等，供深层访问与写入 |
  | `store` | AutoStore | 实例，`this.store.state` 写入即响应式 |
  | `engine` | AutoTemplateEngine | 引擎实例 |
  | `$options` | 只读聚合视图 | 指令配置：指令选项 → 宿主 `x-options` 两层回退；只读（set/ delete 静默失败）；与 `data` 正交 |
- **Action 优先 + 表达式兜底**：handler 内——若指令值是 Action 候选**且** `scope.getAction(name)` 返回 function，则按 action 调用并 `return`；否则退化到 `with(data)` 表达式求值（`new Function('$event','data','with(data){return (EXPR)}')`）。表达式求值亦 try/catch 记日志不中断。
- **修饰符管道（三类 descriptor）**：修饰符统一为 `{ name, type, apply }`，`type` 判别三型：
  - **option**（once/capture/passive）→ `apply` 返回字段合并进 `addEventListener` 第 3 参；
  - **guard**（self/ctrl/按键别名/鼠标键/exact）→ 组成 **AND 链**，置于业务 handler 之前，任一返回 false 短路；
  - **wrapper**（debounce）→ 由外向内包裹整条管道（在 guard 之外），可注册 `cleanup.cancel` 供 destroy 清理。
  组装顺序：业务 handler（求值器）→ guard 包裹（最内层）→ wrapper 由外向内包裹 → option 合并 → `addEventListener`。故 wrapper 到时才校验 guard。
- **修饰符与选项等价（ADR-0007）**：修饰符在解析期注入为指令选项键（`.ctrl` ≡ `options.ctrl=true`），指令层只读 `options`、不再读 `modifiers`。带值配置（如 debounce 时长）走 `x-on-options="{debounce:500}"`；元素级共享配置走 `x-options`。`OnEvalContext.$options` 暴露该聚合视图。
- **配置 / 数据双通道（ADR-0007）**：`$options`（配置，只读）与 `data`（数据，可读写）正交——host options 绝不进入 `data` 聚合视图，避免键名污染与重名冲突。
- **错误宽松**：action 调用与表达式求值共用 try/catch + `engine.logger.error` 不中断，复用 `watchExpression` 的宽松求值模式。

## Testing Decisions

- **好测试的标准**：只测**外部行为**——action 是否被调用、调用次数、`this` 各字段取值、参数透传、DOM/state 副作用、修饰符的放行 / 短路、销毁后解绑。**不**测实现细节（不 assert `ACTION_RE` 匹配结果、不 assert 闭包缓存、不 assert handler 组装顺序），让重构自由。
- **唯一接入点（seam）**：复用既有最高层行为级 seam——`mount(templateHtml, state, options?)` 挂载模板 → 触发事件（`el.click()` / `dispatchEvent(...)`）→ `await nextTick()` → 断言渲染 DOM 或 `store.state` / action spy。**0 新 seam**，与 x-text/x-bind/x-if 同构。
- **action 注册方式（测试约定）**：经 `engine.actions.xxx = fn`（getter 返回 `options.actions` 同一引用）注册；局部 action 经内联 `<script type="actions">` 声明。两者均经同一 `mount` seam 可观测。
- **异步行为**：本 spec 仅覆盖**同步** Action 语义。async action 的生命周期广播（`actions/<name>/{pending,resolved,rejected}`，经 `engine.buildAction` 注册时自动包装）是独立特性，见 `buildAction.test.ts` 与 glossary「actions 域」，不在本 spec 测试覆盖内。
- **先验**：`x-on.test.ts`（已全面覆盖上述各面，为本 spec 的镜像范本与回归基线）、`events.test.ts`（事件订阅断言范式）。

## Out of Scope

- **异步 Action 的生命周期广播**：✅ **已由 `engine.buildAction` 实现**（独立特性，非本 spec 范围）——action 返回 thenable 时广播 `actions/<name>/{pending,resolved,rejected}`，注册时自动包装（Proxy set / 构造扫描 / `<script type="actions">` 三入口），reject 经内部 then 消费消除 unhandled rejection。详见 glossary「actions 域」与 `buildAction.test.ts`。本 spec 仅覆盖同步 Action 规格。
- **action 返回值的消费**：x-on 不消费 action 返回值（同步丢弃）；async action 返回的 Promise 经 buildAction 消费用于广播生命周期，但 resolve 值不回传 x-on 调用点。
- **新的 action 来源**：如 ESM 导入、动态注册 API、装饰器声明等——均非本 spec 范围。
- **表达式兜底的求值语义细节**：`with(data)` 表达式分支属于「表达式 / 插值」通用规格（见 [reactive-interpolation.md](reactive-interpolation.md) 与 `watchExpression`），非 Action 规格本身；本 spec 只划定「何时走表达式」的边界。
- **自定义修饰符注册 API**：属 ADR-0007 修饰符体系，非 Action 规格。
- **`x-on` 与 `x-model` / 表单指令的协同语义**：属各自指令规格。

## Further Notes

- **状态**：本 spec 描述的特性**已实现并通过测试**（`x-on.test.ts` 全绿、全量测试 0 失败、template 包 0 类型错误）。此 spec 作为「已商定行为」的权威记录，供验证 / 回归 / 后续维护代理参照，而非绿地新建、**零代码变更**。
- **决策出处**：实现见求值器 / 类型文件 / `scope.getAction`；修饰符与配置统一见 [ADR-0007](../adr/0007-directive-options-and-modifiers.md)；指令类别（Compile / scope 通道）见 [ADR-0001](../adr/0001-directive-kind-system.md)；术语见 [glossary「钩子」/「RuntimeDirective 接口」](../glossary.md)。
- **哲学一致性**：Action 优先 + 表达式兜底兼顾「显式 action 的可测试 / 可维护」与「内联表达式的零样板」，与 Alpine.js `x-on` 同源；`OnEvalContext` 的 `data`（读写数据）/ `$options`（只读配置）双正交通道，与 ADR-0007 的「配置与数据分通道」一脉相承。
- **未发布到 issue tracker**：因本机未配置 tracker 与 triage 标签词表（且无 `gh` CLI），spec 暂落仓库 markdown（与既有 `x-html.md` / `reactive-interpolation.md` / `engine-patch.md` spec 一致）；待 `/setup-matt-pocock-skills` 配置后可迁移至 tracker 并打 `ready-for-agent`。
- **异步 Action 已落地**：本 spec 定稿后，async action 的生命周期广播已由 `engine.buildAction` 实现（`actions/<name>/{pending,resolved,rejected}`），glossary 已更新「actions 域」描述（task 域已废弃）。本 spec 仍专注同步 Action 规格，async 行为以 glossary + buildAction 实现为权威。
