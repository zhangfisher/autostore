# ADR-0007：指令配置统一（modifier 注入 options + 元素级 host options 回退）

- **状态**：Accepted
- **日期**：2026-08-07
- **关联**：[CONTEXT.md](../../CONTEXT.md)、[ADR-0001](0001-directive-kind-system.md)

## 背景

指令的"额外配置"此前有三套互相不通的表达，且其中一套是空壳：

1. **修饰符（modifier）**：`x-data.global`、`x-if.keep`、`@click.debounce.500`。`OnDirective` 据描述符（`option`/`guard`/`wrapper`）分派，其余指令用 `this.modifiers?.includes(...)` 判开关。
2. **指令选项 `x-{name}-options`**：解析层已实现（`getDirectives` 合并入 `info.options`，`AutoTemplateDirectiveBase.options` 字段就位），但**全库零消费**——没有任何指令读 `this.options`，写了不生效。
3. **元素级共享配置**：不存在。裸 `x-options` 被当作无效指令 `{name:"options"}` 丢弃。

三者割裂带来三个痛点：(a) `x-data.global` 与 `x-data-options="{global:true}"` 语义本应等价却一个生效一个无效；(b) 修饰符表达力仅限开关，带值配置（如 debounce 时长）只能靠 `.500` 这种位置参数——它是修饰符语义里唯一的异类；(c) 多指令共享的公共配置无处声明，只能重复写在每条指令上。

## 决策

### 1. 修饰符在解析期注入为指令选项，指令层废弃"修饰符"概念

`getDirectives` 解析每条指令后，把其修饰符注入同名指令选项键（显式选项优先）：

```ts
for (const m of info.modifiers ?? []) {
    if (!(m in (info.options ??= {}))) info.options[m] = true; // 显式已写（含 false）则不覆盖
}
```

此后**指令统一只读 `info.options`，不再读 `info.modifiers`**。修饰符在指令层消失，降级为"指令选项的快捷写法"。这是**单一数据源**——代价是 `OnDirective` 需重写（见决策 5）。

> 是否给某个选项提供修饰符快捷方式，由**指令作者**决定（DataDirective 作者决定给 `global` 配 `.global`；debounce 时长选项不配快捷方式，因修饰符无法带值）。修饰符不是选项的自动镜像。

### 2. 元素级 `x-options` 挂在 scope 上作为 host options

裸 `x-options="..."` 解析为宿主选项对象，挂在宿主元素的 `scope.hostOptions` 上（scope 与元素一一对应，是 per-element 配置的天然容器）。值用宽松 JSON 解析，须为普通对象，否则抛错（与 `x-{name}-options` 一致）。属性编译后从 DOM 剥离（与 `x-data` 一致，静态配置无需运行时重读）。

### 3. 选项回退（Option Fallback）：两层查找，不合并、不覆盖

读取任一配置键时按固定顺序查找，**缺失才回退，不做合并**：

```
指令选项(info.options) → 宿主选项(scope.hostOptions) → undefined
```

- 显式写值（含 `false`）即"命中"，阻断回退——`x-data-options="{global:false}"` 能显式关掉默认开关。
- 零合并开销：无需 `{...host, ...directive}` 构造新对象。
- 三处出口共享同一回退顺序：基类 `getOption()`、action 侧 `$options` 代理、`OnDirective` 内部分派。

### 4. `getOption()` 基类方法 + `$options` 代理双出口

- **`getOption(key)`**（基类实例方法）：指令内部读取配置的统一入口，按决策 3 顺序回退。
- **`$options` 代理**（`OnEvalContext` 字段）：暴露给 `x-on` action 的只读聚合视图，`get`/`has`/`ownKeys`/`getOwnPropertyDescriptor` 按决策 3 顺序虚拟回退，`set`/`deleteProperty` 返回 false（配置静态）。与 `createScopeContext` 的只读聚合 Proxy 同构。

### 5. 砍掉 `.500` 位置参数；`$modifiers` 废弃为 `$options`

- **位置参数废弃**：`ModifierRuntime.num` 删除。debounce 等带值配置走指令选项 `x-on-options="{debounce:500}"`（键存在即启用、值为时长；`.debounce` 修饰符等价 `options.debounce=true` 即默认时长）。
- **`OnDirective` 重写**：`created()` 的修饰符分派循环（现遍历 `this.modifiers` 查 `MODIFIERS` 分桶）改为遍历 `this.options` 键查 `MODIFIERS`；`exact` 守卫从读 `rt.modifiers` 数组改为读 options 键集合（据 `MODIFIERS` 注册表判系统键）；`$modifiers` 从 options 键重建——但因决策 6 直接删除，无需重建。
- **`$modifiers` 删除**：修饰符已注入 options，`$modifiers` 成了 `$options` 的子集，冗余。`OnEvalContext.$modifiers` 删除，改为 `$options` 代理。破坏面小：生产代码仅 `OnDirective` 链路三处，测试仅 `x-on.test.ts` 一处断言。

### 6. host options 不进入表达式数据视图（边界）

`createScopeContext` 聚合 `localScope + dataScope + state` 为数据视图（表达式 `with(data)` 求值、`this.data` 读写）。**host options 是配置、不是数据，绝不进入该聚合视图**——否则其键作为变量污染表达式命名空间，并与 `dataScope` 字段可能重名冲突。action 侧是两条正交通道：`this.data` 取数据，`this.$options` 取指令配置。

### 7. LoadingDirective（唯一 Runtime 指令）暂不覆盖 host options

host options 挂 scope，所有 Compile 指令（含 `OnDirective`，它是 Compile）天然可读。唯一缺口是 `LoadingDirective`（`DirectiveKind.Runtime`，无 scope）。当前**接受其不支持 host options**（YAGNI，加载态指令罕见需要）；用例出现时再为 Runtime 指令开特殊路径（dispatcher 工厂从 el 注入）。

## 被否决的方案

- **基类桥接（原 Q1 方案 c1）**：`getOption(key)` 同时查 `options[key]` 与 `modifiers.includes(key)`，两套数据并存、OnDirective 不动。否决理由：两套数据需保持同步，违背单一数据源；用户在深化后选择解析期注入，让修饰符在指令层彻底消失。
- **解析期注入但判死刑于"OnDirective 顺序敏感"**：曾以 OnDirective 对修饰符顺序敏感为由否决解析期注入。复查 `on/index.ts` 后发现：guard 是 AND 链、wrapper 由外向内包裹均与数组顺序无关，仅 `exact` 需要"集合"信息——而 options 的键集合能提供。原否决理由不成立，故采用解析期注入。
- **深合并 / 浅合并**：曾框定 `x-options` 与 `x-{name}-options` 同键时的合并语义（深/浅）。否决理由：用户提出"回退而非合并"——缺失才回退、零合并开销，语义更简单且可预测（深合并的嵌套叠加结果难脑算）。
- **per-event 选项 `x-on:click-options`**：为同元素多 `x-on` 事件分别配置。否决理由：`@click`+`@keydown` 经解析同为 `{name:"on"}` 不同 `attr`，按 name 合并会撞车；同元素多事件各自配 debounce 极罕见（YAGNI），`x-on` 仅吃元素级 `x-options` 共享。
- **`info.hostOptions` 字段方案**：解析时把 host options 引用塞进每个 `AutoDirectiveInfo`。否决理由：用户选择挂 scope——scope 是 per-element 配置的天然容器，且与"宿主选项"语义更贴。
- **保留 `$modifiers`、不引入 `$options`**：曾记为"YAGNI，action 读配置用例未见"。否决理由：用户指出修饰符注入 options 后 `$modifiers` 成为 `$options` 子集、纯冗余，应直接以 `$options` 代理暴露。

## 后果

- ✅ **单一数据源**：指令只读 `options`，修饰符/选项/位置参数三套表达收敛为一。
- ✅ **零合并开销**：回退查找替代对象合并。
- ✅ **配置与数据分通道**：`$options`（配置）与 `data`（数据）正交，命名空间不冲突。
- ✅ **表达力补全**：带值配置（debounce 时长等）有了声明式出口；元素级共享配置无需重复。
- ⚠️ **`OnDirective` 重写**：修饰符分派循环、`exact`、`$modifiers` 三处改读 options（非几行，是 `created()` 主体）。
- ⚠️ **破坏性变更**：删除 `.500` 位置参数语法、删除 `OnEvalContext.$modifiers`。需大版本号与迁移说明。
- ⚠️ **`x-options` 解析为新增职责**：`getDirectives` 需识别裸 `x-options` 并产出 host options（现有仅识别带指令名的 `-options` 后缀）。

## 实现注记（非架构决策，落地时遵循）

- **修饰符注入点**：`getDirectives` 现有的 `pendingOptions` 合并循环（合并 `x-{name}-options`）之后，追加 modifier→options 注入循环。`x-show`/`x-class` 等解析期别名归一化（`getDirectives.ts:156-180`）在注入之前完成，保证 `.keep` 等别名修饰符正确注入。
- **`x-options` 解析**：`getDirectives` 识别裸 `x-options`（`rest === "options"`），用 `parseOptions` 解析为对象。因 `getDirectives` 不持有 scope，host options 经调用方（`scope._createDirectives`）挂到 `scope.hostOptions`；`getDirectives` 签名可不变（host options 作为附带返回或由调用方二次解析）。
- **`getOption` 陷阱**：`hasOwnProperty` 判定命中（显式 `false` 生效），非 falsy 判定。
- **`$options` 代理构造点**：`createEvalHandler`（`on/eval.ts`）构造 `OnEvalContext` 时，以 `this.options` + `this.binding.hostOptions` 造 Proxy 注入；形参从 `$modifiers` 改为接收 `directiveOptions` + `hostOptions`。
- **基类字段**：`info.modifiers` 保留（解析产物、调试用），但基类构造不再提取 `this.modifiers`（或保留为兼容字段、文档标注弃用）；指令统一经 `getOption` / `this.options` 读取。
- **测试改动**：`getDirectives.test.ts` 补 modifier 注入断言、`x-options` 解析断言；`x-on.test.ts:104` 的 `$modifiers` 断言改为 `$options`；新增 `debounce` 经 `x-on-options` 配置时长的用例；删除 `.debounce.500` 用例（`x-on.test.ts:318`）。
- **文档**：CONTEXT.md 术语表已随本 ADR 建立；用户文档需补 `x-options` / `x-{name}-options` / 修饰符等价说明，并标注 `.500` 与 `$modifiers` 废弃。
