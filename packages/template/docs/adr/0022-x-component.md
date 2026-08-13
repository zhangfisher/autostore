# ADR-0022：x-block → x-component 组件系统升级

- **状态**：Proposed（grilling 共识达成，待实施）
- **日期**：2026-08-13
- **关联**：[CONTEXT.md](../../CONTEXT.md)、[ADR-0021](0021-x-scope-and-x-block.md)（本 ADR 承接其 x-block/x-scope 决策）、[ADR-0001](0001-directive-kind-system.md)、[ADR-0017](0017-x-html-compile-modifier.md)
- **共识来源**：grilling 四轮决策（约 30 个决策点），本 ADR 即共识落盘

## 背景

ADR-0021 建立了 x-block 命名模板块机制：编译期树变换收集冻结快照，消费者（x-loading 等）经 `getBlock` 沿 scope 链就近取用。x-block 是**声明性资源**（非渲染指令、不建 scope、不实例化），其空类 `BlockDirective` 注释明示"为未来在块根挂指令生命周期留落点"。

本次升级将"模板块"概念升级为"组件"，引入：

1. **全局组件 / 作用域组件**：`AutoTemplateEngineOptions.blocks` → `.components`（全局），x-component 声明作用域组件。
2. **`<script setup>`**：为组件提供数据、方法、生命周期钩子（仿 Vue `<script setup>`）。
3. **`scope.hooks`**：组件生命周期钩子集合（created/mounted/beforeUnmount/unmounted）。
4. **组件作用域 CSS**：`<style>` 默认限本组件（仿 Vue `<style scoped>`，属性后缀法）。
5. **x-use**：实例化组件的指令。
6. **x-import**：fetch 远程加载组件定义（含 `.global` 修饰符）。
7. **嵌套声明 + 递归**：组件内可声明私有子组件、可递归调用自身。

### 与本引擎架构的关键张力（驱动决策的核心约束）

- **引擎无组件实例缓存层**：scope 销毁即销毁（x-if eager 假销毁子树 scope+watcher，不可恢复）。故 Vue 的 `activated`/`deactivated`（依赖 `<keep-alive>` 实例池）在本引擎无自然触发点。
- **编译是同步遍历，fetch 是异步**：`<div x-import="url">` 要求远端组件定义，但编译遍历到该元素时组件尚未下载——编译时序死锁。
- **细粒度响应式，无组件整体重渲染概念**：每个 watcher 各自 flush，无统一的"组件级更新"节点。故 `beforeUpdate`/`updated` 无自然对应。

## 决策

### 一、命名与兼容（硬切，无别名）

| 现有 | 升级后 |
|---|---|
| `AutoTemplateEngineOptions.blocks` | `.components` |
| `scope.blocks` | `scope.components` |
| `scope.getBlock(name)` | `scope.getComponent(name)` |
| `engine.getBlock(el, name)` | `engine.getComponent(el, name)` |
| `engine._resolveGlobalBlock` / `_wrapGlobalBlock` / `_globalBlockCache` | `_resolveGlobalComponent` / `_wrapGlobalComponent` / `_globalComponentCache` |
| `x-block` 指令 / `BlockDirective` / `block.ts` | `x-component` / `ComponentDirective` / `component.ts` |
| compiler `_collectBlock` | `_collectComponent`，匹配 `x-component` |

**策略**：硬切，删除旧名，无别名。包在演进期（v1 需求 38 个、6 阶段规划），CONTEXT.md 已有"已废弃"先例，敢于硬切。消费者跟随：x-loading 改 `getComponent("loading")`；for.ts 的 x-empty 不走 getBlock，不受影响。

> **CONTEXT.md 术语冲突标注**：R5 决策放宽了 ADR-0021 决策 8 的「Default Block Uniqueness」约束（见决策四-4）。CONTEXT.md 的 `default 块唯一性` / `Default Block Uniqueness` 术语需标注"已放宽"。

### 二、组件核心契约

#### 1. 组件本质（与 x-block 收集机制同构）

编译期树变换标记（非渲染指令），剪枝后冻结快照挂最近祖先 scope 的 `components`。消费（x-use）时 clone + 编译实例化。`ComponentDirective` 仍是注册表里的合法名位（与 `BlockDirective` 同），实际收集在 compiler 前置 transformer。

#### 2. data 统一域，废弃 props（R1 / Q2）

- 组件 `data()` 返回值注入子 scope 的 `data` 域（响应式，指向 `store.state._scopes[id]`）。
- `x-use="{..}"` 传入值注入**同一个 data 域**。
- **合并顺序**：`data()` 先注入默认，`x-use` 后覆盖（外部优先）。后续响应式更新只覆盖 x-use 声明的键（`Object.assign(data, 新值)`），组件内部状态（用户交互改的）不被外部重置。
- **无独立 `this.props`**。`this.data` = 合并了 x-use 传入 + `data()` 的统一响应式域。

**理由**：data 域本就响应式（`getContext` set 陷阱透传到响应式代理），props 复用 data 即可，无需新增 `localScope`/`scope.props` 层。KISS。

#### 3. this 三件套（零新增机制，复用现有）

- 组件 methods **注入 `scope.actions`**，复用 x-on 的 action 查找机制（`scope.getAction` 沿 parent 链）。
- methods 执行时的 `this` **复用 `AutoTemplateActionContext`**（`on/types.ts`）：`this.data` = `getContext()` 视图（含组件 data 域，响应式）、`this.state` = `engine.store.state`。
- 与决策二-2 废弃 props 的决定完美契合：`this.data` 天然即合并后的统一域，methods 不需要单独的 this 绑定层。

#### 4. `default` 唯一性放宽（R5=B）

同名组件直接归属同一 scope 时 **warn + 后者覆盖**（不抛错）。沿 parent 链就近覆盖不变。

**理由**：放宽约束，给开发者更大灵活性；warn 保留误写提醒信号。废止 ADR-0021 决策 8 的抛错语义。

### 三、生命周期钩子（scope.hooks，四阶段）

hooks 挂 `scope.hooks`，由 compileChild 实例化流程在四阶段触发：

| 钩子 | 触发点 | 用途 |
|---|---|---|
| `created` | 子 scope 创建 + data 注入后、`compile()` 前 | 初始化（建订阅、读初始 props） |
| `mounted` | `scope.compile()` 完成（子 DOM 子树构建完成） | DOM 就绪后操作 |
| `beforeUnmount` | `scope.destroy()` 开头（watcher 仍活） | 带状态的精确清理（注销监听/定时器） |
| `unmounted` | `scope.destroy()` 结尾 | 无状态收尾 |

**砍掉的钩子及理由**：

- `activated`/`deactivated`：引擎无组件实例缓存层（scope 销毁即销毁），无自然触发点。引入需自建实例池（成本失控，违背轻量定位）。
- `beforeUpdate`/`updated`：细粒度响应式，每个 watcher 各自 flush，无"组件整体重渲染"节点。强加语义空洞或需伪造概念。
- `beforeMount`：与 `created` 紧邻、冗余。

**mounted 语义澄清**：本引擎"编译即挂载"——`scope.compile()` 完成时子 DOM 已构建在父 DOM 树里（整棵树未必已插入 `document`）。`mounted` 定义为"子 scope 编译完成、DOM 子树构建完成"，而非 Vue 的"插入 document"。

### 四、`<script setup>` 与 `<style>`

#### 1. `<script setup>` 位置与合并

- 仅出现在 `x-component` 子节点。
- 多个则**按段分类合并**（R3=A）：多个 data 函数 → 实例化时依次调用合并返回值；methods 浅合并；同名 hooks 串行调用。

#### 2. 执行模型

`new Function('return ' + scriptText)()` 求值为对象字面量。**信任代码**（用户声明信任）。不采用 JSON.parse（methods/hooks 是真实函数对象，无法 JSON）或自建解析器（YAGNI）。

#### 3. 容错

语法错 / `new Function` 抛错 / 返回非对象 → `logger.warn` + 丢弃该 `<script setup>`，不阻断组件其余部分。与全局块解析失败的 warn 纪律一致。

#### 4. 组件作用域 CSS（属性后缀法，仿 Vue `<style scoped>`）

- 组件实例化时给**组件根 + 所有后代元素**打唯一 `data-cmp-{id}` 属性。
- `<style>` 文本每条选择器末尾追加 `[data-cmp-{id}]`（仿 Vue：仅末尾选择器加后缀，组件根也打属性让根上 class 命中）。
- **不支持穿透**（无 `:deep()`/`>>>`/`>>>`），纯隔离。YAGNI——真实需求出现再加（仅改写器一个额外规则，不影响架构）。
- 样式按**组件定义**缓存（同名 x-component 只改写注入一次），多实例共享，引用计数管理移除。
- 改写边界（实施时须逐一覆盖）：媒体查询（`@media`）、`@keyframes`、逗号选择器（`a, b`）、伪类伪元素（`:hover`、`::before`）。

### 五、x-use 实例化指令

#### 1. 定位（Q3=A）

复用底层 `compileChild`/`recompileSubtree`，叠加 props 注入 + hooks 触发 + scoped CSS。x-html.compile 保持原位（消费 HTML 字符串、无组件语义）。

#### 2. 根元素语义（T4=B）：宿主被组件根替换

宿主所有属性复制到组件根：

- `class`：**合并拼接**（`组件根class + 宿主class`）。
- `style`：合并，冲突键**组件根优先**（组件内部样式不被宿主意外覆盖）。
- 其他属性：不覆盖（组件根已有则保留）。
- `x-use`、`x-component` 属性不复制（否则无限实例化）。

#### 3. props 响应式

x-use 属性值经 `scope.watch` 求值得对象，watcher 重求值时 `Object.assign(data, 新值)`（只覆盖声明键）。组件内 `{{x}}` 经 getContext 重读自动刷新，**不需重编译整个组件**。

#### 4. 异步占位（R6=B）

组件定义还在 fetch 时，x-use 宿主显示 **loading 态**（复用升级后的组件化 x-loading），就绪后替换为组件实例，首次渲染用最新 props。

#### 5. 与其他指令共存（U3）

- x-use + 任意结构指令（x-if/x-for/x-slot/x-switch/x-tree 等占子树）→ 编译期 warn + 拒绝。
- x-use + 非结构指令（x-show/x-on/x-bind/x-text/x-class 等）→ 允许，属性复制到组件根生效。

#### 6. 组件根建 scope

compileChild 内禀无条件 `new AutoTemplateScope`，组件根天然建 scope，无需额外声明 x-scope。用户冗余写 x-scope 静默无副作用（与 ScopeDirective 既有纪律一致）。

### 六、x-import 远程加载

#### 1. 异步模型（Q5=A）

`getComponent` 返回 `Promise<Component>`，x-use 异步渲染（先占位、组件就绪后填充）。编译同步契约不变，异步性收敛在 x-use 这一点。

> **实施风险**：`getComponent` 改返回 Promise 影响**所有现有消费者**（x-loading 同步调用 getBlock）。须给 getComponent 一个**同步快速路径**（组件已加载时同步返回）+ 异步路径（fetch 中），或核查各消费者能否接受异步。

#### 2. fetch 复用（Q6=A）

抽取公共 `fetchHtml(url, signal)`（与 x-slot remote 共用 fetch 逻辑），但**不复用** child engine 路径——x-import 解析 fetched HTML 里的 x-component 元素注册到**当前 engine**的组件表（全局或作用域）。

#### 3. 缓存（T6）

按 url 缓存 fetch 结果（engine 级 `Map<url, ComponentDefs>`），重复引用命中缓存。

#### 4. 循环依赖（T6）

检测到循环 import（A import B import A）→ warn + 中断该条链（不抛错，已加载的照常注册）。

#### 5. `.global` 修饰符

`x-import.global="url"`：加载全局组件（注册到 engine.components）；否则注册为作用域组件（最近祖先 scope.components）。

#### 6. 容错

fetch 失败 / HTTP 非 2xx → `logger.warn` + 该 x-import 组件视为未注册。与 x-slot remote 的 `_renderError` 纪律一致。

### 七、嵌套声明与递归（U4 / U5 / U6=B）

#### 1. 递归调用（T5=A）

组件模板内 `x-use="自身名"` 实例化自身，带**深度上限保护**（默认 100，可配），超限 warn + 停止。实例化时沿 scope 链向上统计同名组件实例化深度。

#### 2. 嵌套声明（U4 / U6=B，第一版完整实现）

A 定义内声明 B → B 是 A 的**私有子组件**。

#### 3. 定义 scope 链（Definition Scope Chain）

引入与运行期 scope 链**平行独立**的第二条链。现有运行期 scope 链（`templateScopeMap`）无法承载嵌套组件归属——组件定义被剪枝不建 scope，内层组件收集时会越过外层组件定义错误归属到外层 scope（作用域泄漏）。

**收集期**（`_collectComponent`）：

```
收集到 x-component="A"（嵌套在另一组件定义 P 内）:
  1. 判断 A 是否位于某个组件定义内:
     - 沿 parentElement 向上，先查 defScopeMap（定义链）命中 → A 是 P 的子组件
     - 否则查 templateScopeMap（运行期链）命中 → A 是普通局部组件
  2. A 的 ComponentDef.parent = P 的 ComponentDef（建定义父子链）
  3. A 冻结快照存入 P.def.components（P 的局部组件表）
     （非嵌套则存入运行期 scope.components，与现有一致）
```

**实例化期**（x-use 渲染 A）：

```
实例化 A 时，A 的 scope 不仅要链到运行期 parent，还要"继承" A 的定义链:
  - 沿 A.def.parent（定义链）把祖先组件定义的 components 累积进 lookup 栈
  - scope.getComponent 查找时，先查运行期 scope 链，再查这条定义链栈
  - 于是 A 内的 x-use="B" → 在 A.def.components 命中 B（局部），不泄漏到外层
```

**严格私有**（U5=A）：嵌套声明的 B 仅对声明它的 A（及 A 的实例）可见，A 实例外查不到 B。

**定义链只携带组件表（命名可见性），不携带 data/actions**——与运行期响应式链正交。组件实例的响应式数据仍走运行期 scope 链。

**新增结构**：`defScopeMap: Map<snapRoot, ComponentDef>`、`ComponentDef.parent`、`ComponentDef.components`。

### 八、文档与规范同步

1. **CONTEXT.md**：术语 block→component 全面更新；新增组件层术语（组件 / `<script setup>` / scope.hooks / scoped css / x-use / x-import / 定义 scope 链 / 局部组件 vs 全局组件）；标注 `default 块唯一性` 约束已放宽。
2. **本 ADR**（0022）即组件系统决策记录。
3. **文档**：`docs/zh/template/guide/block.md` → `component.md`；新增 x-use/x-import 指南。
4. **demo**：`docs/demos/template/` 相关 demo 更新。
5. **测试**：`x-block.test.ts` → `x-component.test.ts`，重写覆盖全部新机制。

## 实施风险提示（须重点验证）

1. **定义链查找正确性**：双链查找（运行期 + 定义链）顺序须严格，否则递归/嵌套作用域泄漏。建议先写查找单元测试再实现。
2. **异步 getComponent 的传染性**：影响所有现有消费者（x-loading 同步调用）。须同步快速路径 + 异步路径，或核查消费者。
3. **scoped CSS 选择器改写边界**：`@media`/`@keyframes`/逗号选择器/伪类伪元素改写规则须逐一明确。
4. **属性继承与 dispatcher 交互**：宿主 x-show/x-on 复制到组件根后，dispatcher 是否仍正确派发（元素引用变了）须验证。

## 废止

- **ADR-0021 决策 8「`default` 块唯一性抛错」**：本 ADR 决策四-4 放宽为 warn + 覆盖。
- **x-block 指令名 / `blocks` / `getBlock` 全套术语**：本 ADR 决策一硬切为 component 体系。
