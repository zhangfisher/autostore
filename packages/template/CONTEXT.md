# AutoStore Template

声明式模板渲染引擎：通过宿主元素上的 `x-*` / `@*` / `:*` 属性（指令）把 AutoStore 状态绑定到 DOM。本表固化引擎内部的领域语言，配置体系（指令选项 / 宿主选项）术语于 ADR-0007 引入。

## Language

### 指令层

**指令（Directive）**:
宿主元素上一个属性声明的行为单元，由指令类实例承载。名称经 `presetDirectives` 的 key 标识（如 `if`/`for`/`on`/`bind`/`data`），不由类的 `static name` 决定。
_Avoid_: 组件、标签、特性（attribute 仅是其 HTML 载体）

**属性参数（attr）**:
指令名冒号后的从属标识，指明指令作用于哪个具体目标，如 `x-on:click` 的 `click`、`x-bind:title` 的 `title`。
_Avoid_: 参数、子指令

**指令类别（DirectiveKind）**:
区分指令归属哪条执行通道的静态字段——`Compile`（编译期变换树、走 scope 通道）/ `Runtime`（编译器致盲、走 observer 通道）/ `Hybrid`（双通道）。详见 ADR-0001。
_Avoid_: 类型、模式

### 配置层

**修饰符（Modifier）**:
指令名句点后、**无参数**的开关项，启用某项内置行为。它在解析期被注入为同名**指令选项**（布尔 `true`），故指令层不再单独读取修饰符——修饰符只是指令选项的快捷写法。是否提供某修饰符快捷方式，由指令作者决定。
_Avoid_: 修饰语、flag、参数（修饰符不带值）

**指令选项（Directive Option）**:
由 `x-{name}-options` 声明的**指令级**配置对象，是该指令的权威配置来源（修饰符在解析期并入其中）。值用宽松 JSON（relaxed-json）解析，须为普通对象。
_Avoid_: 参数对象、props

**宿主选项（Host Option）**:
由 `x-options` 声明的**元素级**共享配置对象，挂在宿主元素的 scope 上，供同元素所有指令回退读取。它**不是数据**，不进入表达式数据视图，仅作指令配置。
_Avoid_: 全局选项、元素配置、公共参数

**选项回退（Option Fallback）**:
读取某配置键时的两层查找顺序：先查指令选项，未命中再回退到宿主选项。**不做合并、不做覆盖**——缺失才回退。该顺序贯穿三个出口：基类 `getOption()`、action 侧 `$options` 代理、`OnDirective` 内部分派。
_Avoid_: 合并、级联、继承（回退不是合并）

**`$options` 代理**:
暴露给 `x-on` action 的只读聚合视图，以 `Option Fallback` 顺序虚拟合并指令选项与宿主选项，读取时按需回退、零拷贝。
_Avoid_: options 对象、配置快照

### 内容渲染层

**空值占位（Empty Placeholder）**:
x-text / x-html 的**值级**空状态配置：当绑定求值结果落在 `emptyValues` 内时，渲染 `empty` 指定的占位内容（默认空串）。区别于 x-for 的**结构空状态** `x-empty`（items 为空数组时渲染整块 fallback 子节点）——二者机制层不同（指令选项键 vs 子节点指令），命名沿用 `empty` 以求心智一致。详见 ADR-0014。
_Avoid_: fallback、默认值、占位符（占位符歧义大）

**空值集（emptyValues）**:
判定绑定值是否为"空"的集合：默认集 `[null, undefined, NaN]`（代码硬编码）**加上**用户经 `x-*-options` 声明的附加值。用户声明是**附加而非覆盖**——因 relaxed-json 无法表达 `undefined`（解析为字符串 `"undefined"`）与 `NaN`（解析抛 `not a float`），默认三成员不经 JSON 解析、永不可移除。判定用 `Array.prototype.includes`（SameValueZero 算法，故 `NaN` 可命中）。默认纳入 `NaN` 是有意的行为变更：既有 `String(NaN)` 渲染 `"NaN"`，现归为空。
_Avoid_: falsy 集（不是 falsy 真值判定）

**`.hide` 修饰符**:
x-text / x-html 的修饰符，绑定值为空时将宿主元素内联 `display` 置 `none`（隐藏且不占位）；值恢复非空时**还原原内联 display**（如原 `flex` 保持 `flex`；无内联则还原为空串，让 CSS 类重新接管）。是空值占位的强化手段——要占位文案用 `empty`，要整块消失用 `.hide`。键名 `hide` 与 `empty`（文案）分离，避免撞键。
_Avoid_: `.empty`（与 empty 文案配置撞键）、`.ghost`（暗示 visibility:hidden 占位，与 display:none 语义冲突）

### 已废弃

**位置参数修饰符（Positional Modifier Argument）**:
已被废弃的修饰符带值语法，形如 `.debounce.500` 中句点后的数字段。带值配置现统一走**指令选项**（如 `x-on-options="{debounce:500}"`）。详见 ADR-0007。
_Avoid_: （不再使用）
