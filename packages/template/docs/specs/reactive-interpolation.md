# Spec：响应式插值（Reactive Interpolation `{{ }}`）

> 本文件为 `/to-spec` 产出的特性规格，待发布至 GitHub Issues（`zhangfisher/autostore`）并打 `ready-for-agent` triage 标签。
> 权威设计记录见 [ADR-0004](../adr/0004-reactive-text-interpolation.md)；术语见 [glossary](../glossary.md)「响应式插值」一节。

## Problem Statement

在 `AutoTemplateEngine` 中，所有响应式绑定都必须依赖**显式指令属性**（`x-text`、`:class`/`x-bind`、`x-on` 等）。模板里写出的任何 `{{ }}` 都会被**原样当作字面文本**渲染。开发者无法用熟悉的 Mustache 语法把响应式值或表达式直接嵌入元素**文本内容**或**属性值**——诸如 `<div>I am {{name}}</div>` 或 `<a href="/u/{{id}}">` 这类最朴素的内联绑定都做不到，必须用指令包裹、改变标记结构，心智负担与样板代码双双增加。

## Solution

引入**响应式插值（Reactive Interpolation）** `{{ expr }}`，覆盖**文本节点**与**属性值**两个表面，**全量复用现有响应式底座**（`scope.watchExpression` + `collectDependencies` + `scheduler`），**零新订阅机制**——与 `x-text`/`x-bind` 同构：

- **文本插值**：把含 `{{}}` 的文本节点拆成「字面量段 + 表达式段」（插值段 Interpolation Segment），每表达式段建独立 text node + 一个 `scope.watch`，patch 各改各的 `nodeValue`。
- **属性插值**：走 **desugar-to-x-bind**——编译期把整属性值合成一条表达式，等同一个合成的 `:attr` 绑定，复用属性 patch 的五路分派（class diff / style / property / boolean / 普通）。
- **合成 scope（Synthesized Scope / 隐式指令）**：含插值但无指令的「裸元素」自动建 scope，使插值在任意普通元素上生效。

权威设计见 [ADR-0004](../adr/0004-reactive-text-interpolation.md)；术语见 glossary「响应式插值」一节。

## User Stories

1. 作为模板作者，我希望在元素文本里写 `{{name}}`，这样无需 `x-text` 即可内联渲染变量。
2. 作为模板作者，我希望写 `{{ firstName + lastName }}`，这样任一依赖变化都自动重算。
3. 作为模板作者，我希望同一文本节点含多段 `I am {{a}} and {{b}}`，且各段独立响应各自依赖。
4. 作为模板作者，我希望插值结果被**转义**为纯文本，这样含 HTML 的值不会注入 DOM（XSS 安全）。
5. 作为模板作者，我希望在普通元素（无任何指令）上直接用 `{{ }}`，这样不必为内联值加指令。
6. 作为模板作者，我希望插值在**嵌套静态子树**里生效，这样深层标记也能内联绑定。
7. 作为模板作者，我希望在属性值里写 `class="row {{type}}"`，这样字面量与动态值可混合。
8. 作为模板作者，我希望 `href="/u/{{id}}"`、`src`、`data-*` 等普通属性可插值，这样 URL/资源引用能动态拼。
9. 作为模板作者，我希望 `disabled="{{isLocked}}"` 这类 **boolean 属性**按真/假正确启用/禁用，而不是被字符串 `"false"` 恒真误导。
10. 作为模板作者，我希望 `value="{{text}}"` 走 property 写入反映**当前值**，而非只改默认值。
11. 作为模板作者，我希望整体单段 `class="{{cls}}"` 能透传**对象/数组**给 class 归一化（与 `x-class` 一致）。
12. 作为模板作者，我希望 `x-for` **项内文本**可插值（`<li>{{item.name}}</li>`），这样列表项能内联渲染字段。
13. 作为模板作者，我希望 `x-for` 项内**对象字段**插值是细粒度响应式（改 `item.name` 即更新该项）。
14. 作为模板作者，我理解 **primitive 循环变量** `{{n}}` 在数组变更触发列表重建时正确重渲染。
15. 作为模板作者，我希望插值在 `x-if` 子树、`engine.data` 重建子树里同样生效。
16. 作为模板作者，我希望同元素既有 `x-text` 又有 `{{}}` 时 `x-text` 胜出、且**字面 `{{}}` 不泄漏**进 DOM。
17. 作为模板作者，我希望插值经 scheduler 微任务合并——同 tick 多依赖变更只更新一次。
18. 作为模板作者，我希望元素销毁时其插值 watcher 自动清理，无内存泄漏。
19. 作为模板作者，我希望插值引用**尚未就绪**的依赖（如 `user.name` 而 `user` 初为 undefined）时优雅渲染空、待其就位自动恢复，而非崩溃。
20. 作为模板作者，我希望空插值 `{{}}` 被当作字面量保留，而非求值空串报错。
21. 作为模板作者，我希望 `<script>`/`<style>` 内的 `{{}}` **不被改写**，这样代码/样式源保持原样。
22. 作为模板作者，我希望同元素多个属性各自插值互不干扰。
23. 作为模板作者，我希望插值与原生静态 class（`class="btn"`）等可正确共存/合并。
24. 作为维护者，我希望同属性既有显式 `:attr` 又有插值时**编译期明确报错**，而非静默损坏 class diff 或丢失静态部分。
25. 作为维护者，我希望插值的反应式语义与既有 `x-text`/`x-bind` **完全一致**（含 localData 约束），不引入第二套规则。
26. 作为维护者，我希望大列表场景的插值性能可接受（每表达式段一个 watcher），并作为观察项被记录。
27. 作为维护者，我希望插值完全复用 `scope.watch` 的路径/表达式双轨（纯路径走精准订阅、表达式走 collectDependencies）。

## Implementation Decisions

- **反应式底座零新增**：文本与属性插值均经 `scope.watch`（路径支路 `watchPath` / 表达式支路 `watchExpression`+`collectDependencies`），不引入新订阅机制。
- **合成 scope（隐式指令）**：scope 创建条件由「有指令」扩为「有指令 ‖ 有插值」；`hasInterpolation` 探测**直接文本子节点 + 自身非指令属性值**，**非递归**（O(直接子节点/属性数)，不退化 O(n²)）。raw-text 元素（SCRIPT/STYLE）一律不插值。
- **文本插值 = 多段多 watcher**：含 `{{}}` 的文本节点拆成字面量段（静态 text node）+ 表达式段（text node + watcher），每段 watcher 只改自己的 `nodeValue`；patch 简单、destroy/refresh 粒度自然。空表达式 `{{}}` 保留为字面量。
- **x-text/x-html 冲突 = 剪枝**：同元素有 `x-text`/`x-html` 时，插值文本节点**返回 null 剪枝**（不入 DOM、不注册 watcher），x-text 独占 textContent——避免字面 `{{}}` 泄漏与孤儿 watcher。
- **属性插值 = desugar-to-x-bind**：值含 `{{}}` 的非指令属性 → `removeAttribute` 移除原生平属性（防字面 `{{}}` 作 class token 泄漏、防 classList diff 永删不掉）→ 合成表达式 → 实例化 `BindDirective`（经指令注册表取 `bind` 类）复用其五路 patch 分派（class diff + `lastApplied` 脏追踪 / style / property / boolean / 普通）。每个被插值属性 = **一个复合 watcher**（属性原子）。
- **合成表达式两形态（关键）**：**整体单段**（整个值恰为单个 `{{E}}`）→ 透传**原值 `E`**，让 BindDirective 类型分派拿原生 bool/对象/原生类型（规避 boolean `"false"` 恒真坑）；**混合段**（字面量 + 表达式）→ concat + 每段 nullish→`''` 强转。
- **同属性冲突 = 编译期报错**：同属性名既有显式 bind（`:attr`/`x-bind:attr`/`x-class` 等）又有插值 → 抛错（互斥），不沿用 x-text 静默——因属性冲突会坏 class diff 或因 desugar 已移除平属性而丢静态部分。
- **动态区域生效**：`compileSubtree` 此前对文本节点 `cloneNode(true)` 绕过所有转换器（致 x-for 项 / x-if 子树插值静默失效）——抽 `compileTextNode` 复用函数，**主 walk 文本转换器 + compileSubtree 文本分支共用**；compileSubtree 文本签名补 scope 入参（三处调用点下传）；fragment 返回值展开为实际子节点（保结构指令精确移除）。
- **反应式继承 localData 约束**：插值不引入新语义——`{{obj.field}}`（响应式对象引用）细粒度响应；`{{n}}`（primitive 循环变量 / `$index` 等 localData 普通属性）`collectDependencies` 收不到，靠项 rebind 时 `scope.refresh()` 兜底（引擎现状）。
- **转义纪律**：插值结果一律 `String(value)` → `nodeValue`（浏览器转义、XSS 安全）；原始 HTML 注入是 `x-html` 职责，非插值职责。

## Testing Decisions

- **唯一 seam = engine 级 mount→render→react 黑盒**：`mount(html, state)` 装载 + `nextTick` 等待微任务 flush，断言渲染 DOM（`toEqualHTML` 结构断言 + `className`/`getAttribute`/`value`/`disabled`/`children.length`/`textContent` 等 DOM API）。这是**最高 seam**、**全仓唯一**、**已被所有指令测试沿用**（x-text.test.ts / x-bind.test.ts / x-for/*.test.ts 同款），零新基建。
- **好测试只测外部行为**：渲染结构 + 状态变化后的 DOM 反应；**绝不**断言内部实现（scope.watchers 长度、parseInterpolation 返回、BindDirective 实例）。
- **覆盖面**：文本（变量 / 多依赖表达式 / 多段 / 转义安全 / directive-less 嵌套 / x-text 剪枝）；x-for 项内（对象字段细粒度 / primitive 重建）；属性（混合段普通属性 / 混合段 class diff 防泄漏 / 整体单段 class 字符串 / 整体单段 boolean 透传 / 整体单段 property / 整体单段普通属性路径 / 同属性冲突报错）。
- **先验**：既有 x-text/x-bind/x-for 测试即范本——同 mount + nextTick + toEqualHTML 模式。

## Out of Scope

- **指令属性值内的 `{{}}`**（如 `:class="a {{b}}"`、`x-text="{{x}}"`）不处理——指令值本身已是表达式。
- **`{{{ }}}` 原始 HTML 插值**（fast-follow；与 `x-html` 同语义，须避双重写入冲突）。
- **`<textarea>`/`<option>` 表单文本插值**（fast-follow，随 `x-model` 范畴考虑）。
- **可配置分隔符**（固定 `{{ }}`，Vue delimiters 留待需求驱动）。
- **ownsChildren 结构指令元素的直接文本插值**（边角；语义依结构指令所有权，建议避免混用）。
- **整体单段属性的对象字段嵌套响应式**（path 订阅的引擎级既定限制，非插值特有；与显式 `:attr` 同）。

## Further Notes

- **权威设计记录 = [ADR-0004](../adr/0004-reactive-text-interpolation.md)**；术语统一见 glossary「响应式插值」一节（响应式插值 / 插值段 / 合成 scope / desugar-to-x-bind / 整体单段 vs 混合段 / x-text 静默胜出 / 转义纪律）。
- 该特性**已实现并通过测试**（template 包 381 测试全绿、零回归、自身 tsc 零错误）。
- **性能观察项**：每表达式段 = 一个 watcher + 一个编译期 getter；大列表乘数效应列入 v1 观察项。
