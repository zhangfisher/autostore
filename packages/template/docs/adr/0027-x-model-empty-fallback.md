# ADR-0027：x-model 空值回填（emptyValues + default）

- **状态**：Accepted
- **日期**：2026-08-22
- **关联**：[ADR-0018](0018-x-model-two-way-binding.md)（x-model 主干）、[ADR-0014](0014-empty-placeholder.md)（x-text/x-html 空值占位——词汇与机制的同构先例）、[ADR-0026](0026-x-model-select.md)（select，首项默认与「选中丢失不回写」同源）、[ADR-0007](0007-directive-options-and-modifiers.md)（指令选项）、[CONTEXT.md](../../CONTEXT.md)

## 背景

x-model 绑定空值（`undefined`/`null`/`NaN`）时各控件行为零散：text-like 经 `String(null)` 显示 `"null"`（强转意外，非设计）；select 靠浏览器自动展示首项（`selectedIndex=-1` 但视觉有首项，ADR-0026 已标注锐边）。本 ADR 统一「状态为空值时控件显示什么」：引入 `emptyValues`（空值判定集）与 `default`（空值回填值），与 ADR-0014 的 x-text 空值占位机制同构。

## 决策

### 1. emptyValues：完全复用 ADR-0014 的空值集语义

- 默认集 `[undefined, null, NaN]`（硬编码），用户声明是**附加而非覆盖**（relaxed-json 表达不了 `undefined`/`NaN`，覆盖会破坏默认判空）——`resolveEmptyValues` 直接复用（DRY）；
- 判定用 `includes`（SameValueZero，`NaN` 可命中）；
- **仅作用于读方向**（state→DOM 显示）。写方向（用户输入→state）不经判空——用户输入 `""` 写回就是 `""`，显示层回填是 get/set 的职责域，不越界。

### 2. 空值时的显示行为（无 default 时）

| 控件 | 空值显示 |
|---|---|
| text-like | `""`（**行为变更**：原 `String(null)` 显示 `"null"` 是强转意外；空串才是直觉，浏览器原生 `input.value=null` 也归一 `""`） |
| checkbox | `Boolean()` 恒 false（既有行为不变，空值集成员本就 falsy） |
| radio | 全不勾（`null === el.value` 不中，既有行为不变） |
| select 单选 | `selectedIndex=-1`（既有严格匹配行为不变） |
| select 多选 | 全不勾（空数组语义，不变） |

### 3. default：统一名称，模板 > schema 两级

- **名称统一为 `default`**（否决 `defaultValue`）：schema 元数据已叫 `default`（`configurable(v, {default: y})`），模板选项同名——同一概念「该字段的默认值」，优先级链读作对同一键的两级声明；且与 HTML/DOM 原生 `defaultValue`（受控初始值，会写 value）职责切开，混用会在 select 注入白名单路径打架。`AutoWidgetSelect.defaultValue`（HTML 属性语义）保持不动、不参与本机制。
- **优先级**：模板 `x-model-options="{default:...}"`（含 `x-options` 回退）> schema `default`（静态读取，与 choices/multiple 的「模板 > schema」先例一致）。
- **仅静态值**：支持表达式被否决——动态默认值用 schema `default: computed(...)` 天然可表达（响应式），模板侧再开表达式是重复能力（YAGNI）。

### 4. 触发时机：每次读方向都判（无条件语义）

state 任何时刻落在空值集 → 显示 default。「绑定值是 emptyValues 之一时使用 defaultValue」是无条件语义，且与 x-text 的 empty 占位同构（每次求值都判）。写方向护栏：用户交互写回经 `_selfWriting` 跳过本次重放，无「删不掉」竞争（但见决策 6 锐边）。

### 5. select 首项默认（无 default 声明时的回退）

- 「第一项」= **渲染后的第一个 `<option>`**（含 optgroup 内首个，按 DOM 顺序）；
- **仅显示层勾中**（`selectedIndex=0`），**不回写 state**（与「选中丢失不回写」同源——state 是真相源）；表单提交会带上首项值，文档标注「提交前须校验 state」；
- **多选**：默认 `[]`（全不勾）——「多选默认勾第一项」语义牵强（YAGNI）；声明了 `default` 且为数组则按数组勾选；
- default 声明优先于首项规则。

### 6. checkbox / radio 不参与 default

checkbox 空值显示 false（布尔语义无默认值概念）；radio 选项分散在多元素、单个 x-model 判不出「第一支」。文档标注仅 text-like + select 支持。

### 7. 已知锐边（文档化，不特判）

- **`emptyValues:[""]` + `default` 组合**：用户清空输入 → state 写 `""`（命中空值集）→ 下一次读回调显示 default——「刚清空又弹回」的循环体验。机制语义统一（无条件判定），特判豁免会让「声明了一半生效」更难解释；该组合后果开发者自担（文档 warning）。
- **`emptyValues:[0]` + `.number`**：计数 `0` 也算空。附加语义是用户显式声明，自担（文档提示）。
- **select 首项默认的提交锐边**：显示层勾首项但 state 仍 `undefined`，`el.value` 非空——依赖 DOM value 提交的表单会带上未确认的值。

### 8. 缓存交互：`_lastDisplayValue` 存判定后的显示值

default 判定发生在 `writeToDom` 内、`_lastDisplayValue` 缓存点在判定之后——choices 重建重放与首渲视觉一致（重建后仍显示默认项）。

## 后果

- **正向**：text-like 空值显示从 `"null"` 意外修正为 `""`；select 获得确定的首项默认（不再依赖浏览器自动展示）；与 x-text 空值占位词汇/机制完全同构（emptyValues 一套语义两处消费）。
- **负向/限制**：`String(null)`→`"null"` 是行为变更（依赖该意外显示的模板会变）；首项默认使 `selectedIndex=0`（原 -1），依赖 -1 判「未选择」的代码须改查 state；锐边三条（决策 7）。
- **修订**：CONTEXT.md「空值集」词条适用范围扩至 x-model；新增「空值回填」词条。
