# ADR-0014：x-text / x-html 空值占位（empty）与 `.hide` 修饰符

- **状态**：Accepted（grill-with-docs）
- **日期**：2026-08-09
- **关联**：[CONTEXT.md](../../CONTEXT.md)、[ADR-0005](0005-x-html-directive.md)、[ADR-0007](0007-directive-options-and-modifiers.md)

## 背景

x-text / x-html 当前对绑定求值结果的空值处理统一为 `value == null ? "" : String(value)`（`text.ts:19`、`html.ts:32`）——`null`/`undefined` 渲染空串，其余 `String()`。**无任何「空值占位」机制**：值为空时只能是空串，无法显示「暂无数据」等占位文案；也无法在空值时隐藏整个宿主元素。

需求有二：

1. **空值占位**：值为空时显示指定内容（默认空串），且可自定义「哪些值算空」。
2. **空值隐藏**：值为空时整个宿主元素不显示。

拷问暴露出决定方案形态的**四个既有事实**（使本 ADR 落在「复用既有机制 + 定语义」，而非「造新机制」）：

1. **载体机制已存在**：ADR-0007 已落地 `x-{name}-options` 指令选项 + 基类 `getOption(key)` 两层回退 + 修饰符解析期注入为同名选项键（`getDirectives.ts:207`）。`x-text-options="{empty:'...'}"` 与 `.hide` 修饰符**无需任何新机制**，直接 `getOption` 读取。
2. **x-for 已有 `x-empty` 先例**（`for.ts` 的 `SPECIAL_CHILDREN`）：但那是**结构空状态**（items 为空数组 → 渲染整块 fallback 子节点，是子节点指令）；本 ADR 是**值级空状态**（单个绑定值空 → 显示文案，是 options 键）。机制层不同、不会撞，命名沿用 `empty` 求心智一致。
3. **范围边界**：向 DOM 写可见文本/HTML 内容的只有 x-text / x-html；`x-bind` 对 falsy 已 `removeAttribute`（`bind.ts:106`），`x-if`/`x-for` 是结构指令（x-for 另有独立 x-empty）。故 empty 的自然边界即此二者。
4. **既有空值行为**：`value == null ? "" : String(value)` → `null`/`undefined` → `""`；`0` → `"0"`、`""` → `""`、`false` → `"false"`、`NaN` → `"NaN"`。

## 决策

### 1. `empty` 配置：值级空状态占位，复用既有 options 机制

`x-text` / `x-html` 新增两个指令选项键，经 ADR-0007 的 `getOption` 读取，享受两层回退（指令选项 → 元素级 `x-options`）：

- **`empty`**（空时显示的内容，默认 `""`）；
- **`emptyValues`**（哪些值算空，默认见决策 2）。

```html
<div x-text="x" x-text-options="{ empty: '没有数据' }"></div>
<div x-text="x" x-options="{ empty: '没有数据' }"></div>   <!-- 元素级回退 -->
```

**零新机制**：不新增解析、不新增字段，仅指令 `created()` 内读 `getOption` 并改 patch 写法。

### 2. `emptyValues`：默认集 `[null, undefined, NaN]` + 用户附加（不覆盖），`includes` 判定

判定绑定值是否为空用 `emptyValues.includes(value)`。**必须 `includes`、禁用 `indexOf`**：`includes` 用 **SameValueZero** 算法，专门为命中 `NaN` 而设计（`[null,undefined,NaN].includes(NaN) === true`）；`indexOf` 用严格相等，命中不了 `NaN`。

**默认集 `[null, undefined, NaN]` 在代码内硬编码（`DEFAULT_EMPTY_VALUES`），不经过 `x-*-options` 的宽松 JSON 解析**——这是落地中发现的关键约束：relaxed-json 无法可靠表达 `undefined`（被解析为字符串 `"undefined"`）与 `NaN`（解析抛 `not a float`），仅 `null` 可正确表达。若默认集走 JSON 解析，用户一旦自定义就会丢失 undefined/NaN 算空能力。

**故用户经 `emptyValues` 声明的是「附加」值，不是覆盖**（`resolveEmptyValues` = `[...DEFAULT_EMPTY_VALUES, ...user]`）：

- `x-text-options="{emptyValues:[0]}"` → 最终 `[null, undefined, NaN, 0]`；
- 用户无需重写 null/undefined/NaN，且即便误写这两个字面量（relaxed-json 误解析为字符串/报错），默认集仍兜底保证算空；
- 用户**不能移除**默认三成员（null/undefined/NaN 几乎总该算空，移除需求极罕见且反直觉，YAGNI）。

默认集取舍：

- `null`/`undefined` 与既有 `value == null` 逐字对齐；
- `NaN` 纳入是**有意的行为变更**：既有 `String(NaN)` 渲染 `"NaN"`，现归为空 → 渲染 `empty`（默认 `""`）。`NaN` 几乎总是缺失值/计算错误，显示 `"NaN"` 几乎从不是期望行为；
- `0`/`""`/`false` 默认**不**算空（保留 `String(0)="0"` 等既有行为）；用户要它们也算空，附加声明 `emptyValues:[0,""]`。

### 3. x-html 的 `empty` 占位串也过 sanitize（safe-by-default 无例外）

x-html 默认消毒（ADR-0005）。值为空、改写 `empty` 占位串进 `innerHTML` 时，占位串与主值走**同一个 sanitize 判定**：`getOption("raw") ? null : (engine.options.sanitizer ?? sanitizeHtml)`。即 `.raw` 下主值与 empty 都原样，非 `.raw` 下都过消毒。

否决「empty 跳过消毒」：即便 empty 通常是开发者常量串，统一过消毒杜绝「用户把 empty 设成动态拼接串」的意外 XSS，与 ADR-0005 哲学一致、无例外口子。

### 4. `.hide` 修饰符：空值 `display:none`，恢复时还原原内联 display

`.hide` 启用且值为空时，宿主元素 `el.style.display = "none"`（隐藏且**不占位**）；值恢复非空时，**还原原内联 display**。

**display 恢复策略**：

- **惰性缓存内联 `style.display`**：首次要隐藏前，读一次 `el.style.display` 存入实例字段 `prevDisplay`（未缓存才读）；
- **只操作内联 style、绝不读 `getComputedStyle`**：若原 `flex` 来自内联，缓存 `"flex"` 还原；若来自 CSS 类（内联为 `""`），缓存 `""` 还原后 CSS 类的 `flex` 重新接管。这样既满足「`flex` 保持」，又不把计算值固化成内联、污染 CSS 驱动的布局。

```html
<div style="display:flex" x-text.hide="user.name" x-text-options="{ empty: '' }"></div>
<!-- user.name 为空 → display:none；恢复 → display:flex -->
```

`.hide` 是布尔开关，无值，经 ADR-0007 注入为 `options.hide=true`，`getOption("hide")` 读取（正确写法，范本 `if.ts:39`）。

### 5. `empty` 文案与 `.hide` 同元素并存：`.hide` 优先（互斥）

`<div x-text.hide="x" x-text-options="{empty:'无数据'}">` 在值为空时：`.hide` 要 `display:none`、`empty` 要显示「无数据」。元素已 `none`，文案看不见 → 二者只能一个生效。

采 **`.hide` 优先**：值为空且 `.hide` 启用时，元素直接 `display:none` 并**跳过内容写入**（语义清晰 + 避免无谓 DOM 写）。`empty` 文案仅在「值为空且未启用 `.hide`」时写入。即 `.hide` 是 `empty` 的「隐藏版」：要占位文案用 `empty`，要整块消失用 `.hide`。

### 6. `.hide` 命名：规避 `.empty`（撞键）与 `.ghost`（语义冲突）

修饰符 `.foo` 经 ADR-0007 注入为 `options.foo=true`——**修饰符与同名指令选项共用一个 options 键**。若隐藏修饰符命名 `.empty`：

- `x-text.empty="x"` → `options.empty = true`（布尔）；
- `x-text-options="{empty:'没有数据'}"` → `options.empty = '没有数据'`（字符串）；

**同一个 `empty` 键要同时承担「隐藏开关(布尔)」与「占位文案(字符串)」两种语义，指令无法区分**。故隐藏修饰符必须用一个与 `empty` **不同**的键名 → 取 `.hide`（简短、动作明确、与显隐直觉一致、与 `.raw` 同为单字修饰符风格统一）。

排除 `.ghost`：暗示 `visibility:hidden`（占位但不可见），与 `display:none`（不占位）语义冲突。

### 7. `html.ts` 的 `.raw` 顺手统一为 `getOption("raw")`（消除技术债）

探索发现 `html.ts:29` 的 `.raw` 仍用旧式 `this.modifiers?.includes("raw")`，未遵从 ADR-0007 决策 1（应统一 `getOption`，范本 `if.ts:39`/`data.ts:53`；`loading.ts:352` 同病）。新增 `.hide` 若用 `getOption("hide")`（正确），与旧式 `.raw` 并存会形成**第三种读法**。本 ADR 顺手把 `.raw` 改为 `this.getOption("raw")`，消除技术债。`loading.ts:352` 的 `.screen` 同病，可一并修或单独留（非本 ADR 强制范围）。

### 8. `empty` 保持静态字面量，不支持响应式

`empty` 的值经 `parseOptions`（`really-relaxed-json`）解析为**静态字面量**，不引用状态、不随状态变。

**否决「empty 支持响应式」**：

- **架构代价大**：让 `empty` 引用状态 = 在配置层凿一个数据洞，直接违背 ADR-0007 决策 6（「options 是配置、不是数据，绝不进入表达式数据视图」，配置与数据正交）。
- **语法歧义**：`empty:'msg'` 是字面串还是路径？JSON 无法区分，需引入前缀/包装语法或单开属性，增加 API 表面。
- **需求必要性低**：占位文案 99% 是静态常量。**动态 fallback 有更干净的替代**——写进主表达式：

```html
<div x-text="x ?? msg"></div>   <!-- x 为 nullish 显示 msg；msg 变化也响应 -->
```

`x-text` 的 `value` 本就是表达式，走 `collectDependencies` 自动追踪多依赖（已有测试覆盖），`x ?? msg` 天然响应式、零新机制、零架构破坏。`empty` 守住「静态便捷快捷方式」定位，主表达式承担「完全灵活的动态判空」，各司其职。文档须引导此模式。

## 被否决的方案

- **`empty` 支持响应式**：违背 ADR-0007 决策 6（配置/数据正交），架构代价大；语法无法区分字面量与路径；动态需求用主表达式 `x ?? msg` 更优（见决策 8）。
- **修饰符命名 `.empty`**：与 `empty` 文案配置共用 options 键，布尔/字符串语义撞车，指令无法区分（见决策 6）。
- **修饰符命名 `.ghost`**：暗示 `visibility:hidden`（占位不可见），与 `display:none`（不占位）语义冲突。
- **隐藏用 DOM 移除/重插**：撕裂 scope/watcher 绑定，语义与 `x-if` 混淆。
- **隐藏用 `visibility:hidden`**：占位但不可见，非「整块消失」语义；且与 `.hide` 命名直觉（不占位）相悖。
- **display 恢复读 `getComputedStyle`**：会把计算值（如来自 CSS 类的 `flex`）固化成内联 style，污染 CSS 驱动的布局、覆盖类意图。只操作内联 style、惰性缓存还原才正确（见决策 4）。
- **`empty` 占位串不过 sanitize**：开 XSS 口子；统一过消毒与 ADR-0005 一致（见决策 3）。
- **`indexOf` 判定空值**：严格相等命中不了 `NaN`，与默认 `emptyValues` 含 `NaN` 冲突；必须 `includes`（SameValueZero）。
- **`emptyValues` 覆盖语义（用户重写完整列表）**：relaxed-json 无法表达 `undefined`（解析为字符串 `"undefined"`）与 `NaN`（解析抛 `not a float`），覆盖会导致用户自定义后丢失 undefined/NaN 算空能力。改为「默认集兜底 + 用户附加」（`resolveEmptyValues`），默认三成员在代码内硬编码、不经 JSON 解析。
- **`empty`/`emptyValues` 扩展到其他指令**：`x-bind` 对 falsy 已 `removeAttribute`、`x-if`/`x-for` 是结构指令有独立机制。值级空状态的自然边界即 x-text/x-html。
- **`emptyValues` 默认纳入 `0`/`""`/`false`**：破坏既有 `String(0)="0"` 等行为，且这些值是否「空」因场景而异；留给用户显式声明，默认只含「几乎一定是缺失」的 `null`/`undefined`/`NaN`。

## 后果

- ✅ **零新机制**：empty/emptyValues/.hide 全复用 ADR-0007 的 options + getOption，无解析/字段新增。
- ✅ **空值占位能力补全**：x-text/x-html 终于支持「空值显示占位文案」与「空值隐藏宿主」两种常用模式。
- ✅ **`.hide` 恢复 display 不破坏布局**：惰性缓存内联值还原，CSS 类驱动的 `flex`/`grid` 等正确重新接管。
- ✅ **技术债消除**：`.raw` 统一为 `getOption`，避免第三种读法。
- ⚠️ **行为变更**：`NaN` 默认归为空（既有渲染 `"NaN"`，现渲染 `empty`）。文档须明示。
- ⚠️ **`empty` 不响应式**：需响应式的动态 fallback 须用主表达式 `x ?? msg`（文档引导）。

## 实现注记（非架构决策，落地时遵循）

### `utils/emptyPlaceholder.ts`（新增，DRY 抽取）

x-text / x-html 的空值/隐藏逻辑同构，抽取为共享渲染器，单点维护：

- **`DEFAULT_EMPTY_VALUES = [null, undefined, NaN]`**：默认空值集，代码内硬编码、不经 JSON 解析（决策 2 的 relaxed-json 限制对策）。
- **`resolveEmptyValues(user)`**：`Array.isArray(user) ? [...DEFAULT_EMPTY_VALUES, ...user] : DEFAULT_EMPTY_VALUES`——用户值**附加**到默认集，非覆盖。
- **`createEmptyRenderer(el, userEmptyValues, empty, hide, writeContent)`**：返回 `apply(value)` 闭包。内部惰性缓存原内联 `display`（`prevDisplay`，首次隐藏时读一次），空值时按 `hide` 决定 `display:none`（跳过 `writeContent`）或写 `empty`；非空时还原 `display` 并写真实值。判空用 `includes`（SameValueZero 命中 NaN）。两个指令仅 `writeContent` 不同（textContent vs innerHTML±sanitize），故逻辑单点。

### `text.ts` / `html.ts`

`created()` 保留既有守卫（x-text 的 `x-html` 让步、二者的「表达式空守卫」`this.value == null || this.value === ""`——针对**指令表达式**而非绑定值，empty 不改）。改为构造 `createEmptyRenderer`：

- 共同参数：`this.el`、`this.getOption("emptyValues")`（原始用户值，渲染器内 `resolveEmptyValues`）、`String(this.getOption("empty") ?? "")`、`!!this.getOption("hide")`；
- `writeContent`：text 写 `el.textContent = text`；html 写 `el.innerHTML = sanitize ? sanitize(text) : text`，其中 `sanitize = this.getOption("raw") ? null : this.engine.options.sanitizer ?? sanitizeHtml`（决策 3：empty 占位串与主值共用同一 sanitize 判定；决策 7：`.raw` 从旧式 `modifiers.includes` 统一为 `getOption`）。

首渲染与后续变化统一走 `apply`：`const initial = this.binding.watch(this.value, ({ value }) => apply(value)); apply(initial);`。

### 测试（已落地，`__tests__/x-text.test.ts` / `x-html.test.ts`）

- x-text：默认空值（null/undefined/NaN→空，0→"0"）、`empty` 占位与切换、`emptyValues` 附加（`[0]` 让 0 算空且默认 null 仍算空、`[]` 等于默认）、`.hide` 还原 display（flex 内联 / 无内联还原空串两路）、`.hide`+`empty` 并存 `.hide` 优先、`.hide`≡`{hide:true}` 等价；
- x-html：`empty` 占位（过 sanitize 安全标签保留）、empty 占位串经 sanitize 危险属性被剥、`.raw` 下 empty 原样、`.hide` on x-html；
- 全量 475 测试通过，无回归。

### 文档（已落地）

- `docs/zh/template/guide/directives/x-text.md`：扩展空值 section（加 NaN）、新增「空值占位（empty）」「`.hide` 修饰符」section、改写「配置」section（指令选项 + 修饰符表）、注意事项加 NaN；
- 新增 demo `docs/demos/template/text/empty.html`、`hide.html`；
- `CONTEXT.md`：新增「内容渲染层」三术语（空值占位 / emptyValues / `.hide`）。
