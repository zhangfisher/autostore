# ADR-0002：动态 patch 机制（模板增量编译）

- **状态**：Accepted（待确认"scope 自身指令变更"处置，见【待决】）
- **日期**：2026-08-06
- **关联**：[glossary.md](../glossary.md)、[ADR-0001](0001-directive-kind-system.md)

## 背景

`AutoTemplateEngine.template` 是挂载元素的深克隆，作为**只读编译输入**保留全部指令属性（`engine.ts:99`）。编译产物（运行树）经 `el.replaceChildren(...)` 一次性挂载（`engine.ts:158`），指令属性已剥除。状态变化由各指令经 `scope.watch` 自行订阅、`scheduler` 合并 patch——但这是**值层面**的细粒度更新，**不含模板结构变更**。

需求：运行时向模板的某个容器**插入/修改/删除模板片段**（含指令），触发编译，且：

- **保留未改动子树的运行态**（焦点/滚动/未提交输入/第三方 widget 状态）——全量 `compile()` 会 `replaceChildren` 整树抖落这些，不可接受；
- 只重编译**改动部分**（增量），而非全量。

两条候选路径：

1. **改模板**：开发者操作 `engine.template`，再触发增量编译。
2. **改运行树反推**：开发者在运行树上 `insertAdjacentHTML`，engine 反推回模板。

## 决策

### 1. 事实源方向 = 模板；砍掉"运行树反推"（否决路径 2）

`engine.template` 是**唯一事实源**，运行树是派生、一次性产物。动态编译**只通过修改模板触发**，不提供"运行树 → 模板"的反向桥（`inspectTemplate` / `queryTemplate(sel, true)` 取消）。

**理由**：与现有单向架构一致（`engine.ts:158` 丢弃运行树）；运行树指令属性已剥除（`compiler.ts:114`），无法可靠反推"原本是否模板片段"；反向映射在 x-for/x-if 动态区域内本就有损。

### 2. 补丁边界 = scope（Compile/Hybrid 指令元素）

`patch` 只接受**有 scope 的元素**作为目标——即模板中含指令的元素（经 `compileElement` 建 scope 并登记，`compiler.ts:113-118`）。裸元素不可直接 patch；需先挂哨兵指令 `x-patch`（见决策 6）成为 scope 锚——等效 `x-data="{}"` 但无副作用、更轻。

**与 [ADR-0001] 通道划分的自洽**：scope 元素 = Compile/Hybrid 指令元素（走 scope 通道，靠订阅反应）；纯 Runtime 指令（`x-loading`）**不建 scope**，但其 observer 通道**本就响应原生 DOM 变更**（ADR-0001），无需 patch。故"patch 边界 = scope"恰好等价于"patch 只服务 scope 通道指令"，边界干净、无遗漏。

**理由**：scope 元素已有 `scope.template`（scope→模板，`scope.ts:72`）映射，补一个编译期 `WeakMap<模板el, scope>` 即可建立正向桥，**无需全量 per-element WeakMap**；补丁单元 = 该 scope 子树，直接复用 `_recompileSubtree`（`engine.ts:242`），几乎零新增逻辑。

### 3. 触发模型 = 显式 `engine.patch(selector, updater)`（回调式）

开发者通过 `selector` 定位、在 `updater` 回调里修改模板，`patch` 内部完成"定位 + 同步重建"——开发者不直接操作 `engine.template`、不会漏调/传错元素。不引入对 `engine.template` 的 MutationObserver 隐式观察。

**签名**：`patch(selector: string, updater: (templateEl: HTMLElement) => Node | void): this`

- `selector` 对 `engine.template` `querySelector`（模板空间；模板是 `el.cloneNode(true)`，id/class 与运行树一致，开发者写 `#workspace` 无感）。命中须为 scope 元素（正向桥命中），否则 warn 忽略；多匹配取第一个。
- `updater` 接收命中的模板元素，就地 mutate；**返回值区分两种重建语义**（见决策 4）。
- 内部：正向桥定位 scope → 跑 `updater` → 按返回值走子树重建或替换自身 → `scheduler.flushAll()`。

**理由**：回调式把"定位+改+同步"封装为原子操作，声明式、不易错；显式可预测、可调试，复用现有重建管线与 scheduler。隐式 observer 在离屏模板上反直觉、调试难，且 observe→patch→mutate 回环需额外防护，不采用。

### 4. 重建语义 = 双语义（引用相等区分，React updater 风格）

`updater` 返回值决定重建范围：

| 返回值 | 语义 | 处理 |
|---|---|---|
| `void`/`undefined`（就地改未返回）或 `=== templateEl`（同引用） | **子树重建**（纯增量） | destroy `scope.children` + `compileSubtree(scope.el, templateEl)`，复用 `_recompileSubtree`（`engine.ts:242`）；scope 自身指令/订阅不变 |
| `string`（HTML）或新 `Node`（`!== templateEl`） | **替换自身** | `string` 先经 `<template>.innerHTML` 解析为节点（可能多个）；模板侧 `T.replaceWith(...nodes)` → 运行侧各 node 经 `compileElement` 产运行节点、`scope.el.replaceWith(...runtimeNodes)` → destroy 旧 scope（含子树）→ 新 scope 逐个 `_linkParent` → flush。**空串解析为 0 节点 → `replaceWith()` 无参 = 删除**（与 `null` 等价） |
| `null` | **删除自身** | `scope.destroy()`（递归 off watcher + 从 `scope.parent.children` 移除，见 `scope.ts:409`）→ 模板侧 `T.remove()` + 运行侧 `scope.el.remove()` → flush |

- **返回值判定（严格区分，实现须用 `===` / `typeof`，不可 `==`——因 `undefined == null`）**：`R === null` → 删除；`R === undefined || R === templateEl` → 子树重建；`typeof R === 'string'` → 替换自身（`<template>` 解析 HTML）；`R instanceof Node` → 替换自身（单节点）；其余（数字等）→ warn 忽略。
- **删除契约**：删除**必须** `return null`，**不得**在回调内 `T.remove()`——后者是命令式偷偷删，patch 仍按子树重建处理已脱离模板的 `T`，行为错误。`return null` 才让 patch 知道删除意图并正确做双侧移除 + scope destroy。
- **删除根不可达**：`querySelector` 不含 `engine.template` 根自身，故 selector 命中的永远是根的后代；删除根的直接子 = 清空渲染，合法。

- **子树重建**覆盖：在 scope 内**插入/删除/修改子节点**（深层经 `transformElement` 重编译，`compiler.ts:186`）。
- **替换自身**覆盖：**改 scope 自身指令** / 整体替换该 scope。返回的新节点 `R` 有指令→建新 scope；为裸元素→该位置失去 scope（不可再 patch，除非再加指令）。
- **顺序敏感**：替换自身须**先在模板侧 `replaceChild`**，使随后 `compileElement(R)` 的 `_linkParent` 能沿 `R` 的新模板祖先链找到正确父 scope。
- **代价**：替换自身涉及模板+运行树双侧替换、父位置定位、旧 scope destroy + 新 scope 重链，比子树重建复杂一档；但以"引用相等"一个信号统一两种操作，API 面最小、开发者熟悉（类比 React state updater `(prev)=>next`）。

### 5. 动态区域约束

patch 目标若处于**动态区域**——其模板祖先链上存在 `ownsChildren` 的结构指令（x-for / eager x-if，`compiler.ts:136`）——则运行侧结构是动态生成的、与模板非同构，正向桥不保证。处置：**拒绝并报错**（默认），或升级为该结构 scope 整体重建（见【待决】）。

**检查 O(树深)**：patch 时沿 `templateEl.parentElement` 向上扫，命中 `WeakMap<模板el, scope>` 中带 `ownsChildren` 指令的 scope 即判定。

### 6. 哨兵指令 `x-patch`（裸元素的 scope 锚）

裸元素（无指令）无法直接 patch。借用 `x-data="{}"` 语义不符（其声明响应式数据域、空域纯占位，且会建 `store.state._scopes[id]` 条目），故引入**零副作用哨兵指令 `x-patch`**：

- **kind = Compile**；`created`/`compile`/`destroy` 全 no-op；编译期属性剥除。
- **唯一作用**：让 `hasDirectives(template)` 为 true → `compileElement` 建 scope（`compiler.ts:113-118`）→ 元素进正向桥 `WeakMap`，成为可 patch 锚。
- **不建数据域**：无 `_scopes[id]` 条目、无 `dataScope`、不参与 `getScopeContext` 层叠——比 `x-data="{}"` 更轻。
- **命名**：与 `engine.patch` 同名，`patch('#x')` 时 `#x` 上挂 `x-patch`，心智一致。

```html
<div id="workspace" x-patch></div>
```
```js
engine.patch("#workspace", () => '<p x-text="content"></p>');
```

## 被否决的方案

- **路径 2（运行树反推 + `inspectTemplate`）**：反向桥有损、与单向架构冲突、动态区域内不可靠。`inspectTemplate` / `queryTemplate(sel, true)` 一并取消。
- **P1 全量 `WeakMap<模板el, 运行el>`**：每元素登记，成本可接受但语义冗余——scope 元素已有映射，裸元素本不该作为 patch 锚。
- **P2 锚点约束 + 裸元素支持**：用户的原始裸容器场景需全量映射才能支撑；限定 scope 后裸容器以 `x-data="{}"` 变通，换取大幅简化。
- **隐式 MutationObserver 监听 `engine.template`**：反直觉、调试难、需防回环。
- **细粒度自身重建（`recompileElement`）**：区分"子树重建 / 自身重建"两条路径，易错；"改自身指令"罕见，YAGNI。
- **`engine.refresh(...)` 命名**：与 `scope.refresh()`（`scope.ts:343`，重跑绑定、不重建 DOM）语义相反，误导。定名 `patch`。

## 后果

- ✅ **正向桥复用现有 `templateScopeMap`**（compiler 实例字段，半持久化）：加 public `getScopeByTemplate(el)` 即可，**无需新建 WeakMap、无需改 `compile()` 重置**（patch 走 `compileSubtree`/`compileElement`，不触发全量 `compile()`；全量 compile 重置后整树重建立即重填 map，一致）。
- ✅ **新增代码小**：`getScopeByTemplate` + `scopeOwnsChildren`（提取自 `_resolveOwnership`）+ `compileOneChild`/`compileChildNodes`（`compileSubtree` 委托）+ `patch`/`_replaceSelf`/`_deleteSelf`/`_isInDynamicRegion` + `x-patch` 哨兵（照抄 `html.ts` no-op）+ 导出 `parseHtmlFragment`。
- ✅ 保留未改动子树运行态（增量核心价值）。
- ✅ 与 [ADR-0001] 通道划分自洽：patch 管 scope 通道；**dispatcher 透明**——patch 插入/删除节点时 runtime 指令 mount/unmount 由 `RuntimeObserverDispatcher`（[ADR-0003]）的 MutationObserver 自动处理，patch 不直接操作。
- ✅ **发 `engine/patch/before|after` 事件**（对齐 `compile`/`data`，经 `broadcast` 门控，无订阅零成本）。
- ✅ **patch 边界 = 有 scope 的元素** = 含指令（Compile/Hybrid）**或**含 `{{}}` 插值（合成 scope，[ADR-0004]）；纯静态裸元素挂 `x-patch` 哨兵。
- ⚠️ `engine.scopes` 的 `WeakRef` entry destroy 后不自动清理（`_recompileSubtree` 同样未清，既存特性）；patch 高频替换放大堆积——本次不修。
- ⚠️ updater 抛错 / 编译失败后，模板可能已变更但运行树未同步（未定义状态，文档声明）。

## 待决

- ~~**scope 自身指令变更的处置**~~ → **已决**：`updater` 返回新节点（`!== templateEl`）触发"替换自身"重建，解锁改 scope 自身指令（决策 4）。
- ~~**零副作用哨兵指令**~~ → **已决**：引入 `x-patch`（决策 6），等效 `x-data="{}"` 但无副作用、不建数据域。
- ~~**patch 非 scope 元素的行为**~~ → **已决（实现）**：warn 忽略，不抛错（低频误用，柔降级）。
- ~~**动态区域内 patch**~~ → **已决（实现）**：拒绝（warn），不升级重建。
- ~~**`updater` 抛错**~~ → **已决（实现）**：记 error 日志 + 不重建（模板可能已被部分修改，状态不一致属未定义）。
- **fast-follow**：patch 返回的 HTML 字符串经 `engine.options.sanitizer` 消毒（参 [ADR-0005]/[ADR-0006] 待决）；`engine.scopes` WeakRef entry 主动清理。
