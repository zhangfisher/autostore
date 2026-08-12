# ADR-0021：x-scope 结构占位与 x-block 命名模板块供体

- **状态**：Accepted
- **日期**：2026-08-12
- **关联**：[CONTEXT.md](../../CONTEXT.md)、[ADR-0001](0001-directive-kind-system.md)、[ADR-0002](0002-dynamic-patch.md)、[ADR-0006](0006-x-slot-directive.md)

## 背景

两个独立但配套的需求：

1. **scope 创建门槛的缺口**：`compileElement` 仅在元素 `hasDirectives || hasInterpolation` 时建 scope，否则只浅克隆。这导致一个纯容器 `<div>`（无指令、无插值，仅作结构包裹）不建 scope，其后代 scope 的 parent 链会越过它落到更远的祖先，后代 x-block 也无处就近归属。开发者需要一个手段，在不引入任何指令语义的前提下，显式声明「这里有一个 scope 锚点」。

2. **预置 UI 的自定义缺口**：x-loading 等指令有内置预置 UI（旋转 loader），但无法被模板自定义。用户希望写 `<div x-block="loading">自定义加载内容</div>`，让 x-loading 用该内容替换内置 UI。这是一种**跨指令通用**的自定义能力——x-empty/x-error 等都可能有同样的「预置 UI + 用户可覆盖」诉求。

## 决策

### 1. x-scope 注册占位指令类（Q2=B）

注册 `ScopeDirective extends AutoTemplateDirectiveBase`，`created`/`compile` 皆空、`priority` 设高（先于兄弟指令）。**不采用「不注册、靠未注册属性触发 hasDirectives 即跳过」的零实现**——零实现使 `x-scope` 成为注册表里不存在的幽灵属性，无法设 priority、无法被静态分析/IDE 识别为合法指令、未来加任何行为都要回头补类。注册占位类换取合法可发现性与确定性执行时机。

### 2. x-block = compiler 前置树变换 + 轻量 BlockDirective（Q7=B），非 x-scope 接管子树

x-block 是**编译期树变换**（声明→摘除→上交），最自然的落点是 compiler 的 NodeTransformer 前置规则（与 `<script type="actions">` 提取同构）+ 一个轻量 `BlockDirective`（`ownsChildren=true` 冻结其内容、防子树被正常 walk 编译）。被拦截的 x-block 元素**不进 `compileElement`**——故不建 scope、不实例化任何指令、不出现在结果 DOM。

**x-scope 保持 `ownsChildren=false`**——不越权接管子树，职责单一（SRP）：x-scope 只管建 scope 锚点，x-block 自管摘除自己。

### 3. 块存深克隆 template 副本（Q6=B），非原件引用、非预编译

`scope.blocks[name]` 存 `cloneNode(true)` 产出的、保留指令属性的未编译副本。理由：
- **不存原件**：blocks 须独立于 `engine.template` 事实源（ADR-0002 决策 1 只读约束），且多消费者共享同一引用会相互污染。
- **不预编译**：块在被消费前不知挂载点与数据上下文，提前编译无意义；其内容可能含相对表达式，须消费时才确定 scope。

### 4. 块归属 = 最近祖先 scope，任意深度（Q3=B）

x-block 挂到其最近祖先 scope（跨中间无 scope 的纯 `<div>`），与 `_linkParent` 向上找最近 scope 的既有语义同构。**不限定直接子**——`<div x-scope><div class="wrap"><div x-block="x">` 的 x-block 仍归属 x-scope。

### 5. 块查找 = 消费者沿 parent 链就近（Q5=B）

消费者（x-loading 等）从自身 scope 起沿 parent 链向上取首个含约定名 block 的 scope。命中→替换内置 UI；未命中→回退内置 UI（块兜底）。与 action/dataScope 的 parent 链查找范式统一，支持「局部覆盖、外层兜底」。

### 6. 同元素其他指令随块冻结（Q8=A）

`x-block="error" x-text="msg"` 的 x-text 不在当前 scope 执行——x-block 元素是自包含模板单元，其上的指令是「块被消费渲染时」的绑定。这由 Q2 的前置拦截自然保证（被拦截元素根本不进 compileElement）。

### 7. 块根强制注入 x-scope（Q11，grilling 闭合后追加）

`_collectBlock` 收集时，对深克隆副本的根元素：**若无 `x-scope` 则注入 `x-scope=""`**。确保块根**无论是否已有其他指令**，被消费者编译渲染时一定是一个 scope 锚点——消费者可向块根 scope 注入上下文数据（如加载状态、错误信息），块内相对表达式有 localScope 继承起点。已有 `x-scope` 或其他指令（本就建 scope）则不重复注入（`hasAttribute` 判定，不覆盖用户显式声明）。

### 8. `default` 块唯一性仅约束直接归属（Q9=A）

每个 scope 的直接归属 default 唯一（第二个直接归属 default → 编译期报错）；沿 parent 链允许覆盖（内层 default 遮蔽外层）。命名**纯自由**，引擎不预定义 UI 态名册。

## 否决方案

| 方案 | 否决理由 |
|---|---|
| **x-scope 不注册、零实现**（Q2=A） | 幽灵属性，无法设 priority、不可静态识别，未来扩展须回头补类。 |
| **x-scope `ownsChildren=true` 接管子树收集 x-block**（Q7=A） | 无 x-block 时也强制接管子树，徒增开销、改变所有 x-scope 元素的编译路径，违反 SRP。 |
| **x-block 不注册指令类、纯 compiler 拦截**（Q7=C） | 无法用 `ownsChildren` 冻结内容防子树误编译，拦截逻辑无处挂靠指令生命周期。 |
| **blocks 存原件引用**（Q6=A） | 违反 ADR-0002 事实源只读约束；多消费者共享引用相互污染。 |
| **blocks 存预编译 scope/Fragment**（Q6=C） | 消费前不知挂载点与数据上下文，提前编译无意义且相对表达式无法解析。 |
| **x-block 仅直接子归属**（Q3=A） | 限制书写自由（`<div class="wrap">` 包裹即失效），与既有 `_linkParent` 语义不一致。 |
| **块查找仅当前 scope**（Q5=A） | 强制 x-block 与消费者同 scope，无法在公共外层声明一次、多处复用。 |
| **块查找 engine 全局注册**（Q5=C） | 失去作用域隔离，同名 block 冲突难溯源。 |
| **引擎预定义 UI 态名册（loading/error/empty）**（Q9=B） | 限制指令开发者发明新消费场景，违反 OCP；引擎不应假设 UI 态全集。 |
| **冗余 x-scope 报错/warn**（Q4=B/C） | 与引擎「冗余属性静默处理」整体风格冲突（x-data 解析失败仅 warn、x-slot 内层指令仅 warn）；冗余 x-scope 无害。 |

## 后果

- **新增两条指令**：`ScopeDirective`（空占位）、`BlockDirective`（ownsChildren 冻结 + 收集到 blocks）。
- **compiler 新增前置 NodeTransformer**：x-block 元素拦截规则（摘除 + 收集），插在 `<script type="actions">` 规则之后、元素通用规则之前。
- **`AutoTemplateScope` 新增字段**：`blocks: Record<string, HTMLElement>`。
- **新增公共查找 API**：`scope.lookupBlock(name): HTMLElement | undefined`（沿 parent 链就近），供消费者指令复用。
- **x-loading 等消费指令改造**：渲染内置 UI 前先 `lookupBlock('loading')`，命中则用块替换。
- **不影响既有指令**：x-scope/x-block 全是新增，零侵入既有编译路径（前置拦截仅在遇到 x-block 时生效）。
