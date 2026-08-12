# ADR-0021：x-scope 结构占位、x-block 命名模板块与全局块供体

- **状态**：Accepted（决策 7 于 ADR-0022 范畴内就地修订；决策 9–12 为本 ADR 扩展）
- **日期**：2026-08-12
- **关联**：[CONTEXT.md](../../CONTEXT.md)、[ADR-0001](0001-directive-kind-system.md)、[ADR-0002](0002-dynamic-patch.md)、[ADR-0006](0006-x-slot-directive.md)

## 背景

三组配套需求：

1. **scope 创建门槛的缺口**：`compileElement` 仅在元素 `hasDirectives || hasInterpolation` 时建 scope，否则只浅克隆。这导致一个纯容器 `<div>`（无指令、无插值，仅作结构包裹）不建 scope，其后代 scope 的 parent 链会越过它落到更远的祖先，后代 x-block 也无处就近归属。开发者需要一个手段，在不引入任何指令语义的前提下，显式声明「这里有一个 scope 锚点」。

2. **局部块预置 UI 的自定义缺口**：x-loading 等指令有内置预置 UI（旋转 loader），但无法被模板自定义。用户希望写 `<div x-block="loading">自定义加载内容</div>`，让 x-loading 用该内容替换内置 UI。这是一种**跨指令通用**的自定义能力——x-empty/x-error 等都可能有同样的「预置 UI + 用户可覆盖」诉求。

3. **全局块缺口**：`AutoTemplateEngineOptions.blocks`（引擎级配置项）早已在类型层声明，但长期无消费点——查找链止于 scope 链，用户无法在引擎构造时一次性声明「全引擎复用的模板块」（如全局 loading 模板）。开发者需要一条**贯穿 scope 链 + 引擎全局**的统一取块链路，以及一套针对字符串入参的「解析、规范化、懒缓存」机制。

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

### 7. 块根 scope 由消费编译路径内禀保证（Q9-B 修订，原"注入 x-scope"作废）

> **修订记录**：原决策 7 要求 `_collectBlock` 给深克隆副本根元素注入 `x-scope=""`。该注入实为冗余——块的唯一合法消费路径是 `compiler.compileChild`，该方法**无条件 `new AutoTemplateScope`**（`compiler.ts` `compileChild`），块根 scope 由消费编译路径本身保证，与根上是否有 `x-scope` 属性无关。注入 `x-scope` 既不增加任何保证，又污染块模板（凭空多一个声明性属性）。故移除该注入。

「block 总是创建 scope」是块消费编译路径的**内禀属性**，不依赖任何注入属性。消费者（x-loading 等）经 `compiler.compileChild(snapshot, parentScope, dataScope)` 渲染块时：

- 块根元素**无条件建 scope**（`compileChild` 内 `new AutoTemplateScope(engine, el, itemTemplate)`），消费者可向该 scope 注入 dataScope（如 x-loading 的 config，见决策 12），块内相对表达式（`x-text="message"` / `:style="color"`）有继承起点。
- `_collectBlock`（局部块）与全局块懒预编译路径（决策 11）**都不再给快照根注入任何属性**。

**约束（须文档锁定）**：该保证依赖"块消费必经 scope 创建路径"。未来新增块消费者必须用 `compileChild`（或等价的建 scope 编译路径）渲染块，否则块根将无 scope。局部块的 `_collectBlock` 与全局块的懒预编译都只产出**未编译、保留指令属性的冻结快照**，scope 在消费时诞生。

### 8. `default` 块唯一性仅约束直接归属（Q9=A）

每个 scope 的直接归属 default 唯一（第二个直接归属 default → 编译期报错）；沿 parent 链允许覆盖（内层 default 遮蔽外层）。命名**纯自由**，引擎不预定义 UI 态名册。**全局块不参与 `default` 唯一性约束**——该约束只管 `_collectBlock` 直接归属的局部 default，全局块经不同路径注入。

### 9. 全局块 + `getBlock` 统一查找链（Q1=A、Q4、Q11）

**命名统一为 `getBlock`**（原 `lookupBlock` 改名）。`getBlock` 与 `getAction` / `getDataScope` 命名呼应，是「沿链就近取块」的统一出口。三个落点：

- `scope.getBlock(name)`：从本 scope 起，沿 parent 链逐层查 `scope.blocks`，到顶后**兜底查 `engine.options.blocks`**（全局块），未命中返回 `undefined`。
- `engine.getBlock(el, name)`：经 `findScopeByEl(el)` 反查宿主 scope 后委托 `scope.getBlock(name)`（供 Runtime 指令如 x-loading 使用，其无 binding）。
- Compile/Hybrid 消费指令直接用 `this.binding.scope.getBlock(name)`，免 O(n) 遍历。

**查找链最终形态**：自身 scope.blocks → 各祖先 blocks → `engine.options.blocks`（全局，懒预编译缓存，见决策 11）→ undefined。**局部 x-block 沿链遮蔽全局同名块**（就近原则，与 `getAction` 内层局部覆盖全局 `engine.actions` 同构）。

### 10. 块自动包装（Auto-wrap，Q2）

**仅适用于全局块字符串入参**（局部块入参已是 DOM 元素，无需包装）。全局块字符串首次 `getBlock` 命中时，按顶级元素数量规范化为「恰好一个带 `x-block` 的根元素」：

| 输入形态 | 包装结果 |
|---|---|
| 单顶级元素、无 `x-block`（`'<div>aaa</div>'`） | `<div x-block="t1">aaa</div>`（根打本 key 名） |
| 单顶级元素、**已含** `x-block`（`'<div x-block="foo">x</div>'`） | **尊重原值不重命名**（用户显式声明优先） |
| 多顶级节点（`'<div>a</div><div>b</div>'`） | 包一层 `<div x-block="t1">…</div>`（原节点作子树） |
| 元素+文本混排（`'<div>a</div>b'`） | 同上，算多顶级节点 → 包 |
| 纯文本无元素（`'Loading...'`） | 包成 `<div x-block="t1">Loading...</div>`（按"无根元素"处理） |

**包装标签固定 `<div>`**（YAGNI，不开放配置项）。**不注入 `x-scope`**（决策 7：scope 由消费编译路径内禀保证）。解析失败/空串 → `logger.warn` + 视为未命中（回退默认块）。

### 11. 全局块懒预编译缓存（Q3-A）

全局块入参是字符串，需解析为 DOM 树。采用**懒编译 + 首次预编译 + 后续 deepClone**：

- engine 挂私有缓存 Map（如 `_globalBlockCache: Map<string, HTMLElement>`），key=块名。
- 首次 `getBlock(name)` 命中全局时：`parseHtmlFragment` 解析字符串 → 按决策 10 自动包装 / 打 `x-block=name`（已含则尊重原值）→ 存入 Map（value = 预编译根，未编译、保留指令属性）→ 返回。
- 后续命中：直接 `cloneNode(true)`（**不重复解析**）。

**值形态 = 预编译后的根元素**（已包装、含 `x-block`、**不含 x-scope**），与局部块 `_collectBlock` 产出的快照形态一致——消费者经同一路径（`compileChild`）渲染，无需区分来源。

**纪律**：**不回写 `options.blocks`**（突变用户输入对象，意外）；缓存生命周期 = engine 生命周期（Map 为 engine 实例字段，`destroy` 时随 engine 回收，无需手动清）；**`options.blocks` 运行时突变不追踪**——构造期配置语义，改了不失效缓存（与 `actions`/`sanitizer` 等其他 options 同纪律）。

### 12. x-loading 升级：默认块 + dataScope 注入 + 整壳替换（Q5-B、Q6、Q7 全注入、Q8、Q10-B）

x-loading 从「自建 overlay 壳 + 代码 createElement loader」升级为「统一编译块」：

**(a) 默认全局块，消灭代码 DOM 路径（Q10-B）**：LoadingDirective 自带 `DEFAULT_BLOCK` 模板串（与公开示例同形：`x-loading-overlay` > `x-loading-box` > `x-loading-loader`(`:style="color"`) + `x-loading-message`(`x-text="message"`)）。渲染统一为 `block = getBlock("loading") ?? DEFAULT_BLOCK` → **永远编译一个块**（clone + 壳样式注入 + dataScope 注入 + `compileChild`）。`_buildBuiltinContent` 代码路径删除。**默认块由 LoadingDirective 持有**（非 engine 注册表）——不违反「引擎不预定义 UI 态名册」，是「某指令自带的、可被全局/局部块覆盖的默认实现」。`injectStyles` 全局 CSS 保留（默认块 loader 复用 `currentColor` + `x-loading-spin`）。

**(b) 块根即 overlay 壳（Q5-B）**：x-loading 不再自建 overlay `<div>`，块根即 overlay 壳。x-loading 把计算好的**壳样式**作为内联 style 追加到块根（追加在块作者声明样式之后，覆盖定位冲突）：`position:absolute|fixed`（`.screen` 修饰符决定）、`inset:0`、`background:rgba(bgColor,opacity)`、`z-index`、flex 居中。「覆盖层」语义由指令保证，块作者只管装什么内容。

**(c) config 以 dataScope 注入块（Q6、Q7 全注入）**：x-loading 虽是 Runtime 指令（自身无 scope、绑全局 store），但**块有 scope**。挂 overlay 时，为块 scope 在 `store.state._scopes[blockScope.id]` 建响应式条目（仿 `DataDirective`），`blockScope.dataScope` 指向它，**注入全 config 七字段**（`visible / message / bgColor / color / opacity / delay / selector`）——逻辑最简，块可按需取用、不取用即忽略。块内 `x-text="message"` / `:style="color"` 经 dataScope 响应式字段级细粒度更新。

> **脚枪标注**：`visible` 是表达式串（如 `"order.isSubmit"`），块内若 `x-if="visible"` 期待布尔会拿到字符串——文档须明示 `visible` 是宿主显隐逻辑（控制 overlay 挂载与否），非块内消费的字段。

**(d) attrChanged 触发重建（Q8 实施修订）**：`x-loading` 属性被运行时改写触发 attrChanged → 整体 `teardown + remount`：块随新 config 重新编译、dataScope 重新注入、壳样式重算。**不细粒度 patch 既有块**——attrChanged 是编程式 setAttribute 的罕见路径，重建最简且正确（避免块已编译的 dataScope/订阅与 dispatcher 时序耦合）。

> **dispatcher 局限（既有，非本特性引入）**：共享 observer 的 attributeFilter 对配置绑定 `x-loading="{...}"` 的 setAttribute **不触发 attrChanged**（与快速绑定 `x-loading="a"` 行为不一致）。故配置绑定的运行时改值实际不生效；运行时改 config 的可靠途径是 `engine.data` 或重建宿主。attrChanged 重建语义对快速绑定 setAttribute 仍有效。unmount → scope.destroy + 清 `_scopes[id]` 条目。

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
| **块根注入 x-scope**（原决策 7，Q9-A 否决） | 冗余——`compileChild` 无条件建 scope，注入不增加保证；污染块模板凭空多一声明性属性。 |
| **全局块兜底只放 engine.getBlock**（Q1-B） | Compile/Hybrid 消费指令走 `binding.scope.getBlock` 拿不到全局块，破坏消费者协议统一。 |
| **保留 `lookupBlock` 旧名**（Q4） | `getBlock` 与 `getAction`/`getDataScope` 命名呼应更一致；特性未发布，无兼容包袱，直接改名。 |
| **config 筛选注入**（Q7 筛选方案） | 引入过滤逻辑与"哪些字段块可用"的判断负担；全注入更 DRY，块按需取用、不取用即忽略。 |
| **config 整体重挂**（Q8-(ii)） | 丢失 dataScope 注入的细粒度响应收益；attrChanged 走 dataScope patch 更优。 |
| **x-loading 块仅替换内容、保留自建 overlay 壳**（Q5-A） | 与公开示例（块根即 `x-loading-overlay`）冲突，块作者写的外层壳被忽略，反直觉。 |
| **x-loading 保留代码 DOM 兜底路径**（Q10-A） | 双渲染路径（块路径 + 代码路径），"loading 长啥样"硬编码一份；默认块统一消灭之。 |
| **懒预编译回写 `options.blocks`**（Q3-B） | 突变用户输入对象，意外且难溯源。 |
| **`options.blocks` 运行时突变失效缓存** | 与 `actions`/`sanitizer` 等 options 的构造期配置纪律不一致。 |
| **新建 ADR-0022 承载新决策**（Q9-A、Q11-B） | 本期新维度（全局块/包装/预编译/x-loading）属「模板块供体」同一主题，折进 ADR-0021 一处看全更自洽。 |

## 后果

- **新增两条指令**：`ScopeDirective`（空占位）、`BlockDirective`（ownsChildren 冻结 + 收集到 blocks）。
- **compiler 新增前置 NodeTransformer**：x-block 元素拦截规则（摘除 + 收集），插在 `<script type="actions">` 规则之后、元素通用规则之前。
- **`AutoTemplateScope` 新增字段**：`blocks: Record<string, HTMLElement>`。
- **公共查找 API 改名**：`scope.lookupBlock` → `scope.getBlock(name)`，`engine.lookupBlock` → `engine.getBlock(el, name)`，查找链末端兜底 `engine.options.blocks`（全局块，懒预编译缓存）。
- **engine 新增私有缓存**：`_globalBlockCache: Map<string, HTMLElement>`（全局块懒预编译产物），构造期消费 `options.blocks`，生命周期随 engine。
- **全局块自动包装**：全局块字符串入参经 `parseHtmlFragment` + 包装规则规范化为「恰好一个带 `x-block` 的根元素」。
- **`_collectBlock` 与懒预编译都不再注入 x-scope**：块根 scope 由 `compileChild` 消费路径内禀保证（决策 7 修订）。
- **x-loading 升级**：渲染统一为「编译块」（默认块 = 自带模板串，可被全局/局部块覆盖）；块根即 overlay 壳，指令注入壳样式；config 全字段以 dataScope 注入块 scope，支持字段级细粒度响应；attrChanged 走 dataScope patch 不重编译块。删除 `_buildBuiltinContent` 代码 DOM 路径。
- **不影响既有指令**：x-scope/x-block 全是新增，零侵入既有编译路径（前置拦截仅在遇到 x-block 时生效）；x-loading 升级为内部重构，对外行为（显隐/delay/selector/.screen）保持。
