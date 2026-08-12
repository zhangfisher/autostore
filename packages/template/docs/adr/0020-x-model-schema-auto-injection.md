# ADR-0020：x-model 元数据自动注入（schema 驱动的 input 属性合成）

- **状态**：Accepted
- **日期**：2026-08-12
- **关联**：[CONTEXT.md](../../CONTEXT.md)、[ADR-0018](0018-x-model-two-way-binding.md)、[ADR-0019](0019-x-bind-config-reference-prefix.md)

## 背景

ADR-0019 落地 x-bind `@` 分隔符，能手工把 configManager 元数据绑到 input 属性（`:placeholder="order.price@placeholder"`）。但表单场景下，每个 x-model input 都要手写一堆 `@` 绑定（placeholder/title/required/readonly/min/max…），冗长且易漏。

configManager 的 schema 已承载字段元数据（`configurable(initial, {placeholder, title, required, min, max, ...})`），这些元数据天然对应 input 的原生属性。本 ADR 让 **x-model 元素自动从 schema 注入 input 属性**——用户只写 `<input x-model="order.price"/>`，引擎自动合成 `placeholder`/`title`/`required`/`min`/`max` 等隐式 `@` 绑定（前提是 schema 配了对应元数据）。

## 决策

### 1. compiler 层合成（Q1=A），与属性插值 desugar 并列（Q13=A）

在 `compiler.compileElement` / `compileChild` 的 `scope.compile()` 之后、`_compileAttrInterpolation` 旁，并列调用 `_synthesizeModelSchemaBindings(el, scope)`。复用 compiler 既有的「编译后合成」模式（属性插值 desugar 同款），合成时机统一。

合成只针对**含 x-model 指令的元素**——compiler 扫 scope.directives，命中 ModelDirective 才触发合成。

### 2. 合成实体 = BindDirective 实例（复用 ADR-0019 全部能力）

合成的不是某个特殊逻辑，而是**标准的 BindDirective 实例**——构造合成 `AutoDirectiveInfo`（`{name:"bind", attr:"placeholder", value:"order.price@placeholder"}`）喂给 `createDirectives`，生成的 BindDirective 复用 ADR-0019 的全部能力：`@` 路径解析、collectDependencies 自动追踪、scheduler 合并、patch 全分派、三层降级。零重复实现。

### 3. ModelDirective 静态方法封装合成知识（Q9=B）

元数据注入是 x-model 的**伴生行为**，合成知识（白名单、type 扩展、enable 反向、name 特殊）内聚在 `ModelDirective.synthesizeSchemaBindings(...)` 静态方法。compiler 只负责「调用时机」（scope.compile 后），不负责「合成什么」——与 `static initialize` / `static ownsChildren` 同构（指令类提供静态能力、compiler 在适当时机调用）。

### 4. 注入白名单 = 通用集 + type 扩展（Q7=C）

模板包**自治**，不耦合 core 的 widget 类型内部结构（`widget-types.ts` 是 core 的 schema 类型层，未必稳定导出；`attr in el` 探测不可靠——`min` 在 text input 上 `in` 也为 true，但 text 不该注入 min）。内置白名单按 input `type` 精准匹配：

| 分类 | 注入属性 |
|---|---|
| **通用**（所有 text-like input + textarea） | `placeholder` / `title` / `required` / `readonly` / `enable`(→disabled) / `pattern` / `minlength` / `maxlength` |
| **number/range/date/time/datetime-local/month/week 扩展** | `min` / `max` / `step` |

`label`/`help` 忽略（非 input 原生属性，Field.tsx 的渲染层概念）。`name` 单独处理（决策 8）。

### 5. 仅注入 schema 有的属性（动态交集，Q3）

白名单只是「候选」，实际只注入 schema 里**有值**的属性。逐个白名单项查 `configManager.state[fullKey][attr]`（经 getVal，因 `enable` 等是 schema 顶层属性），schema 没配的属性不合成对应绑定。例如 schema 只配了 `placeholder`，就只合成 `:placeholder` 一个绑定。

### 6. 不含 `value`/`checked`（x-model 自管，Q12）

`value`/`checked` 由 x-model 双向绑定自管（ADR-0018），**不自动注入**。白名单显式排除二者，避免与 x-model 的读写方向竞写。

### 7. `enable→disabled` 反向映射（Q8）

schema 的 `enable` 是 boolean、语义「是否可用」（Field.tsx 同款），input 的 DOM 属性是 `disabled`、**语义反向**（enable=true → 无 disabled；enable=false → disabled）。故 `enable` 不走普通 `@` 绑定（普通绑定值直传），合成专用绑定：读 `schema.enable` 后**值取反**再 patch 到 `disabled`。白名单注入器对 `enable` 特判（其余属性直传）。

### 8. `name` 特殊处理（Q4=A、Q11=B）

`name` 是表单提交键，不走响应式 `@` 绑定（状态路径编译期固定），**静态写**一次：
- schema 有 `name` 元数据 → 用元数据值；
- schema 无 `name` + x-model 绑定值是**简单路径**（`order.price`）→ `name = 路径`；
- x-model 绑定值是**表达式**（`user.first+','+user.last`）→ 跳过 name 注入（表达式作 name 语义混乱，用户应显式写 `name="..."`）。

### 9. 显式绑定优先、抑制合成（Q5）

合成前检查同元素是否已有 `bind` 指令的 `attr === 白名单项`，有则跳过该项合成。用户显式写 `:placeholder="..."` 就不自动合成 `@path@placeholder`——显式声明优先，自动注入是补充而非覆盖。`name` 同理（显式 `name="..."` 属性存在则跳过）。

### 10. schema 未注册时跳过合成（修订自 Q6=B）

原决策 10 拟「无条件合成全部白名单 `@` 绑定，schema 后注册时经 ADR-0019 三层降级自动生效」。实现时发现：schema 未注册时全合成会为**每个白名单属性产生一条 schema 不存在 WARN**（8~11 条/input），噪音过大，违背「静默优先」基调。

故修订为：**编译期查 schema，未注册则跳过整个 `@` 属性合成**（仅保留 name 简单路径注入，因 name 不依赖 schema）。

- 取舍：牺牲「schema 后注册/async load 后自动生效」的动态性，换静默。
- 理由：schema 后注册场景罕见（schema 在 store 构造期随 `configurable` 字段一次性注册），而 WARN 噪音每个 x-model input 都有；静默优先于罕见的动态性。
- 表达式场景（非简单路径）同样跳过合成——schema 按状态路径注册，表达式路径无对应 schema，合成必失败。

> 决策 5「仅注入 schema 有的属性」与决策 10 的关系：决策 5 是「schema 已注册时按属性交集精确合成」，决策 10 是「schema 未注册时整体跳过」——二者共同保证：只合成 schema 实际承载的属性，且无 WARN 噪音。

### 11. 合成实例手动 created+compile，watcher 随 scope.destroy 回收（Q10）

合成发生在 `scope.compile()` 之后，故合成实例需**手动调 `created()` + `compile()`**（scope.compile 已跑完，不会自动覆盖）。合成实例 push 进 `scope.directives`；watcher 由 BindDirective 自身 push 进 `this.watchers`（基类字段），由 `scope.destroy` 统一 off。生命周期与现有指令同构。

### 12. configManager 不存在时整个合成跳过（静默）

`this.store.configManager` 为 undefined（store 未配置 configManager）→ 整个 `_synthesizeModelSchemaBindings` 直接返回，不合成任何绑定。与 ADR-0019 决策 6 降级风格一致——首版宽松，KISS。

## 后果

- **正向**：x-model input 自动获得 schema 元数据驱动（placeholder/约束/校验属性），用户只写 `x-model` 即得完整表单字段属性；复用 ADR-0019 全部能力，零重复实现；显式绑定优先保证可控性；enable 反向映射与 Field.tsx 语义对齐。
- **负向/限制**：每个 x-model input 可能挂最多 ~11 个合成 watcher（轻量，collectDependencies 精准订阅）；白名单是内置固定集（首批），新增属性需改模板包代码（schema 可扩展但注入白名单封闭——取舍：注入白名单须映射 input 原生属性，本就是有限集）；name 仅简单路径自动、表达式场景需用户显式。
- **后续**：白名单可经 `x-model-options="{inject:[...]}"` 或 engine 选项开放自定义扩展（当前 YAGNI，首批内置足够）。
