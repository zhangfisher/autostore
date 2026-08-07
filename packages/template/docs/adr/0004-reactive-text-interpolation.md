# ADR-0004：响应式插值（文本 + 属性，`{{ }}`）

- **状态**：Accepted（Round 1，grill-with-docs；属性插值 Round 1 增补）
- **日期**：2026-08-06
- **关联**：[glossary.md](../glossary.md)、[ADR-0001](0001-directive-kind-system.md)、[ADR-0002](0002-dynamic-patch.md)

## 背景

`AutoTemplateEngine` 当前所有反应式绑定都要求**显式指令**：`<span x-text="user.name">`、`<div :class="..">`。模板里的文本节点从不被任何转换器处理——`compileSubtree`（`compiler.ts:181`）对非元素子节点是 `child.cloneNode(true)` 原样克隆，`_getTransformers()`（`compiler.ts:30`）只匹配 `HTMLScriptElement` 与 `HTMLElement`。故 `<div>I am {{name}}</div>` 会**字面输出** `I am {{name}}`。

需求是引入 Vue/Mustache 风格的响应式插值，覆盖**文本节点**与**属性值**两个表面：

```html
<!-- 文本节点 -->
<div>I am {{name}}</div>                       <!-- 变量 -->
<div>I am {{ firstName + lastName }}</div>     <!-- 表达式：任一依赖变化即重算 -->
<!-- 属性值 -->
<div class="row {{type}}">…</div>              <!-- 混合：字面量 + 表达式 -->
<a href="/u/{{id}}">link</a>                   <!-- 混合 -->
<input value="{{prefix}}-{{id}}"/>             <!-- 混合，走 property -->
<button disabled="{{isLocked}}">提交</button>  <!-- 整体单段，走 boolean -->
```

> **范围沿革**：初稿仅文本节点（grill Round 1 前半）；经拷问后属性插值以 **desugar-to-x-bind** 方式纳入本轮（增补）。属性插值与文本插值共用 `{{ }}` 语法与反应式底座，但 patch 形态不同——文本走「多段多 watcher」（决策 3），属性走「单属性单 watcher」（决策 10）。

**关键事实**：反应式基础设施**已存在、零新增**。`scope.watchExpression`（`scope.ts:302`）已是 `new Function("scope","args","with(scope){return (EXPR)}")` + `store.collectDependencies` → `store.watch(deps)`——`{{ firstName + lastName }}` 走这条路即可，依赖变化自动重算。故本 ADR 的全部工作落在**编译期**：检测 `{{ }}`、拆分文本、把每段表达式挂到 `scope.watch`。这是「表面语法 + 编译 pass」，不是新反应式机制。

真正要决策的不是「能否响应式」，而是**三个接线问题**：

1. **watcher 挂在哪**：文本节点没有 scope；而 watcher 的注册地是 scope（`scope.watch` 把 update 闭包 push 进 `scope._updates`，destroy 时统一 off，`scope.ts:262`）。更尖锐的是——含 `{{}}` 的元素**绝大多数根本没有 scope**（仅 `hasDirectives(el)` 为真才建 scope）。
2. **动态区域是否生效**：`compileSubtree` 的文本分支绕过了所有转换器，导致 x-for 项内 / x-if 子树的 `{{}}` 会静默失效。
3. **与 x-text/x-html 的冲突**：x-text 整体覆写 `textContent`，会清空并覆盖插值段。

## 决策

### 1. 插值 = 编译期文本节点 pass，复用 `scope.watchExpression`

新增一个**文本节点 NodeTransformer**（`filter`：`nodeType === TEXT_NODE && /\{\{/.test(nodeValue)`）。转换器职责仅限「检测 + 拆分 + 注册」：

- 把文本拆为「字面量段 + 表达式段」；
- 每表达式段建一个独立 text node，调 `scope.watch(expr, ({value}) => segNode.nodeValue = stringify(value))`；
- 首渲用 `scope.watch` 返回的当前值写入段 text node（与 `x-text` 同构，`text.ts:15`）。

反应式完全复用现有 `watchExpression` + `collectDependencies`——**不引入任何新订阅机制**。多依赖表达式（`a + b`）自动收集 `a`、`b` 两条路径，任一变化经 `scheduler` 微任务合并后重算。

### 2. 合成 scope（隐式指令）：directive-less 元素也能插值

扩建 scope 创建条件（`compileElement`，`compiler.ts:107`）：

```ts
if (!hasDirectives(template) && !hasInterpolation(template)) {
    return template.cloneNode(false);   // 真静态，原样
}
```

`hasInterpolation(el)` 统一探测两处 `{{`：**直接 Text 子节点**（文本插值）与**自身非指令属性值**（属性插值）——均**非递归、O(直接子节点/属性数)**，绝不退化成 O(n²)。这样 scope 必先于文本转换器就位，转换器经 `templateScopeMap.get(textNode.parentElement)` 拿到 scope 即可，**无需 old→new 元素映射**（段 text node 是转换器自建并捕获进闭包的，patch 直改它们，从不碰父元素）。

合成的 scope 与指令 scope 同构：登记进 `engine.scopes`、`_linkParent` 挂父、继承 `localScope`、`scope.compile()` 跑（无指令时 `runDirectives([])` 空跑）、destroy 递归清理。**插值等同一个隐式指令。**

### 3. 多段拆分模型：N 个 text node，每段一个 watcher

`I am {{a}} and {{b}}` → 拆为 5 段：`"I am "`、expr `a`、`" and "`、expr `b`、`""`。字面量段直接建 text node；表达式段建 text node + 注册 watcher。转换器返回由这些 text node 组成的 `DocumentFragment`，`transformElement` 的 `parent.appendChild(frag)` 把子节点搬入新父（`transformElement.ts:144`）。

选「多 text node + 多 watcher」而非「单 text node + 复合 watcher」：patch 更简单（各 watcher 只改自己的 node，无需重组整串）、与 Vue 一致、destroy 粒度自然。

### 4. 修 `compileSubtree` 文本分支绕过：抽 `compileTextNode` 复用

当前 `compileSubtree`（`compiler.ts:181`，被 `compileChild`/x-for 项 与 `_recompileSubtree`/engine.data·eager x-if 共用）对非元素子节点 `cloneNode(true)`，**绕过所有转换器**——主 walk 能到的静态插值生效，x-for 项内 / x-if 子树的 `{{}}` 静默失效（而这恰是插值最该生效处）。

把「拆分 + 注册」抽成 `compileTextNode(node: Text, scope: AutoTemplateScope): Node` 复用函数，**两处都调**：

- 主 walk 的文本 NodeTransformer；
- `compileSubtree` 的文本分支（由 `cloneNode(true)` 改为 `compileTextNode(child, currentScope)`）。

代价是动 `compileSubtree`；收益是 x-for 项 / x-if 子树 / `engine.data` 重建子树的插值全部生效，无静默黑洞。

### 5. x-text/x-html 冲突：x-text 静默胜出（剪枝插值文本）

同元素既有 `x-text`/`x-html` 又有直接文本 `{{}}` 时，**x-text 胜出、插值文本被剪枝**。实现上：`compileTextNode` 在所属 scope 含 `text`/`html` 指令时**返回 `null`（剪枝该文本节点）**——不拆分、不注册 watcher，该文本节点不入渲染 DOM（故字面 `{{}}` 也不可见）。

**为何剪枝（return null）而非「返回克隆」或「建了再被覆盖」**：
- 「建了让 x-text 覆盖」不可行：x-text 的 `el.textContent = value` 在 `scope.compile()` 期（子节点挂载前）执行，随后 walk 才追加文本子节点——插值段 node 会 appended 在 x-text 的 text node **之后**，二者并存（`{{}}` 字面泄漏 + 孤儿 watcher 持续 patch）。
- 「返回克隆」会保留字面 `{{age}}` 文本节点 appended，同样泄漏。
- 故唯一干净解是**剪枝**：该文本节点不进 DOM，x-text 独占 textContent，无 watcher 泄漏。

`compileSubtree` 文本分支收到 `null` 同样跳过（不入 `nodes`、不 append）。

### 6. 转义：一律 `nodeValue`/textContent，永不注入 HTML

插值结果一律经 `String(value)` 写入 text node 的 `nodeValue`——浏览器自动转义，**XSS 安全**。原始 HTML 注入是 `x-html` 的职责。`{{{ }}}`（三花括号、原始 HTML）**本轮不做**，留作 fast-follow。

拆分正则：`/\{\{\s*([\s\S]*?)\s*\}\}/g`（非贪婪、trim 表达式两端空白）。`{{}}`/`{{ }}`（空表达式）跳过；求值抛错（如引用未定义变量）走 `watchExpression` 的宽松求值——记日志返回 `undefined`，段渲染为空，不中断（`scope.ts:311`）。**部分求值收集**：`collectDependencies` 用同一安全包装，抛错前已读到的依赖仍被收集，故 `{{ user.name }}` 在 `user` 初为 undefined 时仍能订阅 `user`，待其就位后自动重算生效。

### 7. 边界排除：`<script>`/`<style>` 文本不插值

父元素 `nodeName ∈ {SCRIPT, STYLE}` 的文本节点**跳过插值**：二者文本是代码/样式源（`<script>` 已执行、改写无意义且不重执行；`<style>` 改写 `{{}}` 语义怪异）。`<script type="actions">` 已被 script 转换器剪枝，不在此列。`<textarea>`/`<option>` 的文本属表单范畴（值/双向），随属性插值 fast-follow 一并考虑，本轮不特殊处理。

### 8. 反应式继承 localScope 约束（既定，非插值新增）

插值完全继承 `scope.watch` 的 localScope 语义（见 memory：localScope 响应式化已证伪）：

- **`{{ obj.field }}`**（obj 是响应式对象引用，如 x-for 项 `user` 指向 `state.users[i]`）→ `getScopeContext().obj` 返回响应式代理，`.field` 读取经代理 → `collectDependencies` 收集 → **细粒度响应式**。
- **`{{ n }}`**（n 是 primitive 循环变量 / `$index` / `$end`，经 localScope 注入为普通属性）→ `collectDependencies` 收不到 → 仅在项 rebind 时由 `scope.refresh()`（`scope.ts:344`）兜底重算。

此为引擎现状（所有指令同此约束），插值不引入新问题。`{{ n }}` 类primitive 插值列为**核心测试用例**，验证 rebind 时经 `refresh()` 正确重算。

---

### 9. 属性插值 = desugar-to-x-bind（复用 `BindDirective` 五路分派）

属性值含 `{{}}` 时，**不自建 patch**——编译期把整属性值合成一条表达式，等同一个合成的 `:attr` 绑定，**全量复用 `BindDirective`（`bind.ts`）已有的五路分派**：`class`（normalizeClass + classList diff + `lastApplied` 脏追踪）/ `style`（cssText 或 Object.assign）/ property（`value`/`checked`）/ boolean（`disabled`/`readonly`/…）/ 普通（setAttribute/removeAttribute）。零 patch 逻辑重复。

watcher 注册在同一元素 scope 上（与文本插值同构）。属性插值在 `compileElement` 内、scope 建好后扫描 `el.attributes` 完成合成与注册——**无需改 `compileSubtree`**（x-for 项的元素子节点经 `transformElement → compileElement` 自然走到），与文本插值（决策 4 需修 compileSubtree）不同。

### 10. 单属性单 watcher；合成表达式分两种形态

属性是**原子**的——任一依赖变都要重组整串再写入，无法像文本那样每段独立 patch。故每个被插值的属性 = **一个复合 watcher**（读取其全部段的依赖），与 `BindDirective`「一属性一 watch」模型一致；区别于文本的多段多 watcher（决策 3）。

合成表达式按值形态分两种（**关键规则，规避 HTML boolean/类型坑**）：

| 值形态 | 例子 | 合成表达式 | 为何 |
|---|---|---|---|
| **整体单段**（整个值就是一个 `{{E}}`） | `disabled="{{isLocked}}"`、`class="{{obj}}"`、`title="{{name}}"` | **原始 `E`**（不拼接、不强转） | 让 BindDirective 类型分派拿**原生值**：boolean 拿到 bool、class 拿到对象/数组、property 拿到原生类型 |
| **混合段**（字面量 + ≥1 `{{E}}`） | `class="row {{type}}"`、`href="/u/{{id}}"`、`value="{{p}}-{{id}}"` | **concat + 每段 nullish→`''` 强转**：`'row ' + (type==null?"":type)` | 属性本就为字符串；强转避免 `{{type}}` 为 undefined 时 concat 出 `"row undefined"`、class 多出 `"undefined"` token |

**为何整体单段必须保留原值**：若 `disabled="{{isLocked}}"` 也走 concat 强转，`isLocked=false` → 合成字符串 `"false"` → BindDirective boolean 分支判 truthy → `setAttribute("disabled","")` → **照样禁用**（HTML boolean 属性「存在即生效」经典坑）。整体单段透传原值，boolean 分支拿到 `false` → `removeAttribute`，正确。

**nullish 强转的内联形式**：`(E == null ? "" : E)`，靠 concat 的 `+` 隐式 stringify（与文本插值的 `String(value)` 等价）；自包含，不依赖任何 helper 或全局，不污染 scope 视图。`E` 被求值两次——`collectDependencies` 按路径去重，无重复订阅副作用（表达式假定无副作用）。

### 11. desugar 移除原生平属性（防字面 `{{}}` 泄漏 DOM）

合成的 `:attr` **接管该属性的全部值**，故须**从渲染元素移除原生平属性**。否则：原生 `class="row {{type}}"` 的 token `{{type}}`（按空白切分为一个 token）会留在 classList，而 `BindDirective.patchClass` 的 `lastApplied` 脏追踪只知「自己加过的 token」、**永不会删原生 token** → 字面 `{{type}}` 永久泄漏进渲染 class。普通属性同理（`href="/u/{{id}}"` 不移除则字面泄漏）。

故 desugar 流程：① 扫描非指令属性值含 `{{}}` → ② `el.removeAttribute(name)` → ③ 合成表达式 → ④ 在 scope 上注册合成 bind watcher（复用 BindDirective patch）。原生平属性不入渲染 DOM，全部由合成 bind 产出。

### 12. 同属性显式 `:attr` 冲突 → 编译期报错（非静默）

若元素同时有**显式 bind**（`:class`/`x-bind:class`/`x-class`/`:style`/…）与**同属性名的插值**（`class="…{{}}…"`）→ **编译期抛错**，明示互斥。**不沿用 x-text 的「静默胜出」（决策 5）**，因为属性冲突有 x-text 没有的后果：

- **class/style**：两个 BindDirective 实例各持独立 `lastApplied` 写同一属性 → classList diff 互相覆盖/误删，损坏追踪；
- **任意属性**：若插值被静默跳过但原生平属性已被 desugar 移除（决策 11）→ 静态字面部分（如 `"row"`）也随之丢失，元素无故丢类/丢属性。

显式 bind 与插值**语义互斥**（都想独占该属性值），编译期 fail-fast 最干净。指令属性值内的 `{{}}`（如 `:class="a {{b}}"`、`x-text="{{x}}"`）**不处理**——指令值本身是表达式，`{{}}` 在其中是字面字符、属用户误写，忽略不报错（可选 warn）。

### 13. 边界排除（属性）

- **指令属性值**（`x-*`/`:`/`@`）内的 `{{}}` 不处理（决策 12）。
- **事件属性**（`onclick="…{{}}…"` 等原生 inline handler）内的 `{{}}` 不处理——inline handler 是代码字符串，插值其中语义怪异；事件绑定走 `@event`/`x-on`。
- 整体单段 boolean/property 透传原值（决策 10）已覆盖 `disabled="{{flag}}"`、`value="{{x}}"` 的正确语义；混合段写入 boolean 属性（如 `disabled="a {{flag}}"`）属用户误写，产物恒为非空字符串→恒真，文档提示「boolean 属性用整体单段」。

---

## 被否决的方案

- **上提到最近祖先 scope**：watcher 在祖先、文本节点在后代，后代被 x-if 销毁而祖先 scope 仍在 → watcher 错位/泄漏；根元素无指令时**无祖先可提**仍需兜底建 scope。合成 scope（决策 2）更干净。
- **单 text node + 复合 watcher**：每次任一段变化需重组整串再写回，patch 复杂、与 Vue 模型不一致。多段拆分（决策 3）更简。
- **运行时求值（非编译期拆分）**：失去编译期 segment 切分，每次 render 全量重扫文本，性能差、无法做细粒度 patch。
- **`{{{ }}}` 原始 HTML**：XSS 风险，与「一律转义」默认冲突，本轮砍（fast-follow）。
- **属性插值的 naive `setAttribute` 模型**（不复用 BindDirective 分派）：对 `class`/`style` 会覆写整个属性、冲掉静态 token、击穿 diff；对 `value` 只改默认值不反映当前值；对 boolean `disabled="{{flag}}"` 合成字符串恒真。五路分派躲不掉，故采 desugar-to-x-bind（决策 9）全量复用 BindDirective。
- **属性插值的「每段独立 watcher + 按 attr 分派」模型**：属性是原子的，无法像文本那样每段独立 patch；任一段变都需重组整串。故采「单属性单复合 watcher」（决策 10）。
- **属性冲突沿用 x-text 静默胜出**：属性冲突有 x-text 没有的后果（class diff 损坏 + desugar 已移除原生平属性致静态部分丢失），故改编译期报错（决策 12）。
- **对 directive-less 元素用 old→new 元素映射兜底建 scope**：元素级探测（决策 2）保证 scope 先于转换器就位，转换器只需查 `templateScopeMap`，无需维护跨 walk 的 old→new 映射。

## 后果

- ✅ **零新反应式机制**：全复用 `scope.watchExpression` + `collectDependencies` + `scheduler`，与 x-text/x-bind 同构。
- ✅ directive-less 元素可插值（合成 scope）；x-for 项 / x-if 子树 / `engine.data` 重建子树均生效（修 compileSubtree）。
- ✅ XSS 安全（文本一律转义）；多段拆分 patch 简单。
- ✅ 属性插值复用 `BindDirective` 全部五路分派（class diff / style / property / boolean / 普通），零 patch 逻辑重复；boolean/property 经「整体单段透传原值」规避 HTML 类型坑。
- ⚠️ 属性插值的 desugar 会**移除原生平属性**（决策 11）——渲染 DOM 上该属性由合成 bind 产出（非原生 attribute）， inspectors 见到的是 JS 写入值；视觉/行为一致。
- ⚠️ 同属性显式 `:attr` + 插值 → 编译期报错（决策 12），迁移既有模板须留心。
- ⚠️ 混合段写入 boolean 属性恒真（用户误写，决策 13 文档提示）。
- ⚠️ 含插值的原本静态元素多一个 scope + N watcher（每表达式段一个）——可接受的 v1 权衡；大列表场景的性能特征列入观察项。
- ⚠️ **ownsChildren 元素的直接文本**（如 `<ul x-for="..">{{count}}</ul>`）插值语义依结构指令的所有权——x-for 占有子树时其直接文本由 x-for render 管理，属边角用法，实现期 smoke test 验证，不保证直觉语义（建议避免在结构指令元素上混用直接文本插值）。
- ⚠️ x-for primitive 循环变量非细粒度响应（继承引擎现状，靠 `refresh()` 兜底）。
- ⚠️ x-text/x-html 与 `{{}}` 同元素时插值静默失效（决策 5，须文档提示）。

## 待决（fast-follow）

- **`{{{ }}}` 原始 HTML 插值**：与 x-html 同语义，按段 `innerHTML`（须在同元素无 x-html 时方启用，避免双重写入冲突）。
- **表单文本**：`<textarea>`/`<option>` 的插值（值/双向）——`<textarea>` 的初始值经 textContent 可工作但非双向，正式支持随 x-model 范畴考虑。
- **插值分隔符可配置**：固定 `{{ }}`，自定义分隔符（Vue delimiters）留待需求驱动。

## 实现注记（非架构决策，落地时遵循）

- **接线点**：
  - `compiler.ts _getTransformers()`：新增文本 NodeTransformer（`filter` 判 `TEXT_NODE` + 含 `{{`）。
  - `compiler.ts compileElement()`：scope 创建条件由 `hasDirectives(t)` 扩为 `hasDirectives(t) || hasInterpolation(t)`（`hasInterpolation` 探测直接文本子节点 + 自身非指令属性值）。**同一处**做属性插值：scope 建好后扫描 `el.attributes`，对值含 `{{}}` 的非指令属性 desugar。
  - 新增 `compiler.ts compileTextNode(node, scope)`：拆分 + 注册 + 返回 `DocumentFragment`；x-text/x-html 在场则跳过；父 ∈ {SCRIPT,STYLE} 则跳过。
  - `compiler.ts compileSubtree()`：**文本分支**由 `child.cloneNode(true)` 改为 `compileTextNode(child, currentScope)`（属性插值无需改——元素子节点经 `transformElement → compileElement` 自然处理）。
- **`compileSubtree` 取 scope**：该函数当前签名无 scope 入参；`compileChild` 已持 `scope`（项 scope），可下传；`_recompileSubtree`（engine.ts:258）持 `scope`，可下传。两调用点显式传 scope，避免在 compileSubtree 内反向查找。
- **属性 desugar 复用 `BindDirective` 实例**（持 `lastApplied` 等 per-attr 状态，零 patch 重复）：对每个被插值的非指令属性，按决策 10 合成表达式（整体单段→原值；混合→concat + `(E==null?"":E)`），构造 synthesized `AutoDirectiveInfo`（`{name:'bind', attr, value:synthExpr, …}`）→ `new BindDirective(engine, scope, info).created()`。watcher 经 `scope.watch` 自动入 `scope.watchers`/`_updates`，destroy 自动 off、refresh 自动重跑，无需手动登记。
- **desugar 顺序**：`compileElement` 内 `removeDirectives`（剥 x-）→ 属性 desugar（`removeAttribute` 平属性 + 合成 bind）→ 文本由后续转换器/compileTextNode 处理。冲突检测（决策 12）：desugar 前查 scope.directives 是否已有同名 bind，有则抛错。
- **stringify（文本）**：`value == null ? "" : String(value)`（与 `text.ts:16` 一致）。
- **`scope.compile()` 时序**：合成 scope 的 watcher 由文本转换器 / 属性 desugar 在 `scope.compile()` 之后注册（文本节点在元素之后被 walk；属性 desugar 在 compileElement 内 compile() 之后）——无指令时 `compile()` 空跑，watcher 独立注册、独立 destroy/refresh，时序无碍。
