# ADR-0016：x-if detach 模型与 x-show 独立化

- **状态**：Accepted（grill-with-docs）
- **日期**：2026-08-10
- **关联**：[CONTEXT.md](../../CONTEXT.md)、[ADR-0001](0001-directive-kind-system.md)、[ADR-0007](0007-directive-options-and-modifiers.md)
- **命名更新（2026-08-11）**：本文记录的 `.keep` 修饰符（及指令选项键 `keep`）已重命名为 **`.keepalive`** / `keepalive`，语义不变（摘宿主但保活子树与 watcher）。正文保留历史用名 `.keep` 不改，迁移说明见 [CONTEXT.md](../../CONTEXT.md)「已废弃」区。

## 背景

原 x-if 两态（`if.ts`）：

- **eager**（默认 `x-if="expr"`）：假时宿主 `display:none` + 移除子树 DOM + 销毁子 scope；**宿主本身永远留 DOM 作锚点**。
- **keep**（`x-if.keep` / 别名 `x-show`）：假时仅 `display:none`，子树与 watcher 全保留。

两个痛点：

1. **`display:none` 的宿主仍在 DOM**——表单控件（`<input>`/`<select>`）的值**仍被表单提交**、仍占 `:nth-child` 计数位、仍被 `querySelector`/`:has()` 命中。eager 与 keep 都用 display:none 切宿主显隐，故都带这副作用。
2. **`x-show` 是 `x-if.keep` 的解析期别名**——把「条件存在性」（节点在不在 DOM）与「条件可见性」（节点在但看不见）两个**正交概念**合并成一个指令的两态，造成 `.keep` 到底该 detach 还是 display:none 的语义反复（本 ADR 的 grill 过程即在此反复中展开）。

需求：x-if 假时**连宿主也摘除**（注释占位），根治 display:none 副作用；并把 `x-show` 拆成独立可见性指令，让两个正交概念各有归属。

拷问暴露出**决定方案形态的八个既有事实**（使本 ADR 落在「宿主 scope 兼任锚点 + 运行时摘换注释」，无需新 scope 类型、不改 compiler 核心）：

1. **scope 销毁是显式的，detach 不自动销毁**：`AutoTemplateScope.destroy()` 只被显式调用（父级递归 / `destroyChildren` / x-for 重建，见 `scope.ts:423`）；`dispatcher` 的 MutationObserver **只**管 runtime 指令的 `mounted`/`unmounted`（`dispatcher.ts:190-215`），不销毁 compile 通道 scope。故摘除宿主 el **不**销毁其 scope，控制 watcher 照常触发——这是 detach 可行的 enabler，也解开 `if.ts` 注释里「控制订阅留在自身 scope，避免自杀」的顾虑。
2. **宿主 scope 被 `parent.children` 强引用，detach 期间保活**：scope 用 `WeakRef` 持 el（`scope.ts:47-49`），但 scope 对象本身由父级 `children` Set 强引用。故**宿主 scope 兼任锚点 scope**——承载控制 watcher + template 引用 + parent 链 localScope 继承，**无需新建 scope 类型**。Q5「锚点 scope」概念坍缩为零成本。
3. **runtime 指令在 detach/reattach 上配对自洽**：dispatcher 检测 addedNodes/removedNodes → mount/unmount（`instances` Map + `_attrThreeState` 三态配对，`dispatcher.ts:217-227`）；`removeDirectives` 保留 Runtime/Hybrid 属性（`compiler.ts:319-337`）。故 detach 触发 unmount、reattach 触发 mount，是**正确行为而非 bug**；eager 重编译出全新 el，dispatcher 对新 el mount，干净。
4. **注释书签的稳定性**：注释节点随 DOM 移动，`parentNode` 恒为当前父；即使兄弟节点增删致位置变化，注释始终标记正确重插位——比「记 parent + nextSibling 引用」健壮（后者在 DOM 变动后失效）。这是 Vue/Alpine 用 comment marker 的同款理由。
5. **compileElement 返回值即挂载节点——但本方案不改它**：`transformElement` 把 compileElement 返回的 `{node}` 直接 `appendChild` 进父树（`transformElement.ts:144`）。eager/.keep 的 ownsChildren 信号**不变**（eager=true / .keep=false），返回值不变（eager 返回 `{node:el}`、.keep 返回 `el`），注释管理放在指令 toggle 内的「运行时摘换」，**不改 compileElement/transformElement**。
6. **ownsChildren 矩阵不变 → escape hatch 保留**：eager ownsChildren=true（与 x-for 冲突），`.keep` 与 `x-show` ownsChildren=false（可与 x-for 共存）。故 `compiler.ts:302-313` 的冲突 escape hatch 仍可用，仅文案须从「仅切 display」改为「不占子树」。
7. **首次 toggle 须 defer microtask**：`created()` 在 compileElement 内同步跑，此刻返回节点尚未挂进父树（transformElement 的 appendChild 还没发生），toggle 拿不到 `parentNode`。故首次 toggle 须像 x-for 一样 defer 到 microtask（`for.ts:168` 同款），届时宿主已挂载。当前 `if.ts` 同步 toggle 依赖 display:none（不需 parent），新模型改 defer。
8. **别名归一化是解析期单点**：x-show 别名**仅**在 `getDirectives.ts:173-176` 归一化为 `if` + `keep`，零运行时实体。拆分 = 删这段 + 注册独立 show 指令，改动面集中在解析层 + 一个新指令文件。

## 决策

### 1. 三档语义：存在性（x-if 家族，detach）vs 可见性（x-show，display:none）正交分离

| 指令                 | 假时宿主            | 子树              | 表单提交  | 状态   | ownsChildren | 共存 x-for |
| -------------------- | ------------------- | ----------------- | --------- | ------ | ------------ | ---------- |
| `x-if`（eager 默认） | **摘除 + 锚点注释** | 销毁重编译        | ✅ 不提交 | 子树丢 | true         | ❌         |
| `x-if.keep`          | **摘除 + 锚点注释** | 保活              | ✅ 不提交 | 全保留 | false        | ✅         |
| `x-show`（独立）     | **display:none**    | 保活（el 留 DOM） | ⚠️ 仍提交 | 全保留 | false        | ✅         |

对照 Vue `v-if`/`v-show`：存在性（节点在不在）与可见性（在但看不见）各一指令。`.keep` 与 `x-show` 都保活，唯一差别是 detach（不提交/不被 querySelector 命中）vs display:none（提交/可命中）——正是用户要拆开的两个正交需求。

### 2. x-if eager/.keep 用「运行时摘换注释」，不改 compileElement

`toggleEager` / `toggleKeep` 共享锚点摘换：

- **假**：`el.parentNode.insertBefore(comment, el); el.remove();`（el 由指令 `this.el` 强引用保活）。
- **真**：`comment.parentNode.insertBefore(el, comment);`（注释常驻 DOM 作下次书签，紧邻 el 无副作用）。

eager 额外 `destroyChildren()`（假）/ `compileSubtree()`（真）；`.keep` 子树全程保活、不动。注释由指令字段 `anchorComment: Comment` 懒创建（首次假时 `document.createComment`）。

### 3. 宿主 scope 兼任锚点（无新类型）

控制 watcher 留 `this.binding`（宿主 scope），detach 期间由 `parent.children` 强引用保活、watcher 照常触发。**不新建 AnchorScope 类、不改 `scope.ts` 构造签名、不动 `engine.scopes` 索引**。

### 4. 首次 toggle defer microtask

`created()` 内 `engine.scheduler.schedule(() => this.toggle(initial))`，等宿主挂载后执行（同 `for.ts:168`）。

### 5. x-show 独立指令（新文件 `show.ts`）

新建 `ShowDirective extends AutoTemplateDirectiveBase`：`priority=80`、`singleton=true`、`kind=Compile`、`ownsChildren=false`。`created()` 建 watch；`toggle(show)` → `el.style.display = show ? "" : "none"`。即原 `toggleDisplay` 逻辑抽成独立指令。注册到 `presetDirectives` 的 `show` 键。

### 6. 删 x-show 别名归一化

`getDirectives.ts` 删 `SHOW_ALIAS_NAME` 常量 + 173-176 的 `x-show → if+keep` 归一化分支；`x-show-options` 不再归一为 x-if（show 独立后有自己的 options 通道）。

### 7. escape-hatch 文案更新

`compiler.ts:302-313` 冲突提示从「改用 `x-show`/`x-if.keep`（仅切 display）」改为「改用 `x-show`（display:none）或 `x-if.keep`（detach，均不占子树）或外层包裹」。

## 被否决的方案

- **eager 连宿主也重克隆（全量重建）**：需新建独立锚点 scope 类型（宿主 scope 被销毁、watcher 无处挂）+ 推迟宿主编译 + 丢宿主本地状态。决策 2 的「宿主保活 reattach + 仅子树销毁重建」以**零新类型**成本达到同等「假时释放子树订阅」语义，且保留宿主身份/指令不重求值（无闪烁）。AutoStore 哲学是 state 在 store，但宿主身份保留是纯收益。
- **`.keep` 也 display:none（方案 Y）**：`.keep` 下表单仍被提交，无法根治 Q1=A；且与 x-show 语义重叠无区分。用户明确要 `.keep` 不提交，故 `.keep` 必须 detach。
- **统一摘宿主含 x-show（方案 X）**：x-show 失去轻量 display:none 定位，且全栈无独立可见性指令。拆分（决策 1）让两概念各有指令，正是「避免困扰」的解。
- **compileElement 返回注释作挂载节点**：需改 compileElement/transformElement 契约（让结构指令指定锚点 node）。决策 2 的运行时摘换零 compiler 改动达同效果，KISS 胜出。
- **新建 AnchorScope 类型承载 watcher**：宿主 scope 已能兼任（事实 2/3），新类型冗余（YAGNI）。
- **detach 期间 GC 风险**：由「指令 `this.el` 强引用宿主 + scope 由 `parent.children` 强引用」自然消解（事实 2），无需特殊处理。

## 后果

- ✅ **x-if 假时宿主离开 DOM**：表单不提交、`:nth-child` 不计数、`querySelector` 不命中（Q1=A 根治，eager 与 `.keep` 均覆盖）。
- ✅ **存在性/可见性正交分离**，消除 `.keep` 在 detach/display:none 间的语义反复。
- ✅ **零核心改动**：不改 `scope.ts` / `engine.scopes` / `compileElement` / `transformElement`；改动集中在 `if.ts` + 新 `show.ts` + `getDirectives.ts` + 冲突文案。
- ⚠️ **破坏性变更**：`x-show` ≠ `x-if.keep` 别名（CONTEXT 定义变更）；`.keep` 从 display:none 升级 detach；eager 从 display:none 升级 detach；escape-hatch 文案变。测试/文档同步。
- ⚠️ **display:none 在 x-if 家族废除**，仅 `x-show` 保留。
- ⚠️ **首次 toggle 改 defer microtask**：时序变更，须验证现有同步断言测试（见实现注记）。

## 实现注记（非架构决策，落地时遵循）

### `if.ts`

- 新增 `anchorComment: Comment | null = null`（懒创建）。
- 拆 `toggleEager`（eager）/ `toggleKeep`（.keep，原 `toggleDisplay` 改名）：两者共享「摘换注释」逻辑（抽私有 `detachHost()` / `reattachHost()`），eager 额外 `destroyChildren`/`compileSubtree`。
- `detachHost()`：comment 未创建则 `document.createComment("x-if")`；`el.parentNode?.insertBefore(comment, el); el.remove();`。
- `reattachHost()`：`comment.parentNode?.insertBefore(el, comment);`（comment 常驻）。
- `created()`：watch 不变；首次 toggle 改 `this.engine.scheduler.schedule(() => this.toggle(!!initial))`。

### `show.ts`（新增）

- `ShowDirective`：`priority=80, singleton=true, kind=Compile, ownsChildren=false`。
- `created()`：`const init = this.binding.watch(this.value, ({value})=>this.toggle(!!value)); this.toggle(!!init);`（display:none 不需 parent，可同步首渲）。
- `toggle(show)`：`if (this.el) this.el.style.display = show ? "" : "none";`。
- 注册：`presetDirectives.set("show", ShowDirective)`。

### `getDirectives.ts`

- 删 `SHOW_ALIAS_NAME` + 173-176 归一化分支；`x-show-options` 归一化改为指向 `show`（或走标准 options 通道）。

### `compiler.ts`

- 302-313 冲突错误文案更新（决策 7）。

### 测试改动

- `x-if.test.ts`：eager 断言从「`display:none` + 元素在 DOM」改为「元素 detach（`el.isConnected === false`）+ 注释在 DOM」；`.keep` 断言从 display:none 改为 detach + reattach 保留状态；`x-show` 等价测试（214-252）改为 x-show **独立** display:none 断言。
- `getDirectives.test.ts:71-85`：x-show 别名归一化测试删除，改为「`x-show` 不再归一为 `if+keep`，解析为独立 `show` 指令」。
- `x-for.test.ts:611-623`：x-for + x-show 同元素用例保留（x-show 仍 ownsChildren=false、display:none）。
- 新增验证：eager 假时 `<input>` 不被 `<form>` 提交（Q1=A）；`.keep` reattach 保留 input 已打字值；嵌套 x-for 内 `<input x-if="item.active">` 随 item 变化正确 toggle。

### 嵌套 x-for 的 localScope 验证项（关键正确性）

`<div x-for="item of items"><input x-if="item.active"></div>`：

- **复用项**（同 key + index 不变，`Object.assign(localScope)` + `refresh`）：项 scope.`refresh()` 递归到 input 宿主 scope.`refresh()` → 重跑控制 watcher 的 update 闭包 → 重求值 `item.active`（取新 localScope）→ toggle。✓
- **rebind 项**（index 变，销毁重建）：旧 input 宿主 scope destroy（含其控制 watcher），`compileChild` 重建 input + 新 x-if，按当前 `item.active` 初始化。✓
- 关键不变量：控制 watcher 挂 input 宿主 scope（`this.binding`），其 `parent` = 项 scope，localScope 经 `getContext` parent 链聚合；**detach 不破坏 scope 的 parent 链**（scope 关系独立于 DOM 位置）。
