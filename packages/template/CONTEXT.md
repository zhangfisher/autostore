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

**`.compile` 修饰符（x-html）**:
x-html 的修饰符，将绑定值作为**子模板编译执行**（而非静态 HTML 快照）——反转 x-html"不编译注入内容"的原定位。注入内容写回 `scope.template` 后调 `recompileSubtree`，建 scope/watcher、继承宿主作用域（localScope/dataScope 经 `_linkParent` 自动传递），支持嵌套 x-data/x-for/x-if，与正常模板一致。**隐式强制跳过消毒**（sanitize 会剥指令属性致模板失效），安全等级**高于 `.raw`：.raw 的 `<script>` 经 innerHTML 不执行，compile 注入的 `x-on` 会真实绑定执行**——须确保来源可信。每次值变全量销毁旧子树 + 重编译（无 diff）；空值销毁子树 + 清空宿主、忽略 `empty` 文案（结构空状态无文案占位语义），`.hide` 仍生效。详见 ADR-0017。
_Avoid_: `.template`（与 engine.template/`<template>` 标签重载）、`.render`（泛化）、`.eval`（求值联想 + 安全负面含义）

**`.transition` 修饰符（x-style）**:
x-style / :style 的修饰符（仅 `attr === 'style'`），每次写样式时注入一条 CSS `transition` 声明，让内联样式的响应式变化被浏览器自动过渡动画，默认 `all 0.3s ease-in`。值取三级优先：用户样式对象自带的 `transition` key（显式）> `getOption('transition')`（`.transition` 注入的 `true`、或 `x-bind-options` 传的字符串）> 默认值。带 `.transition` 时覆盖/关闭须用 `x-bind-options`（指令选项层，早于修饰符合并），`x-options`（宿主层）被修饰符遮蔽、不生效。详见 ADR-0015。
_Avoid_: `x-transition` 指令（那是挂载/卸载生命周期的**进出场转场动画**，配合 x-if/x-show/x-teleport，是同名正交的另一个概念）、`.smooth`/`.animated`（牺牲与 CSS `transition` 属性的直觉映射）

### 显隐控制层

**锚点注释（Anchor Comment）**:
x-if（eager / `.keepalive`）条件为假时留在宿主原位的注释节点，作宿主重挂载的 DOM 书签——随 DOM 移动、`parentNode` 恒为当前父，重插位稳定。仅 x-if 家族使用；x-show 宿主永留 DOM，无锚点。
_Avoid_: 占位符（歧义大，本表保留给空值渲染）、marker、占位节点

**条件存在性 / x-if（Conditional Presence）**:
x-if 控制宿主**是否存在于 DOM 树**。条件为假时**摘除宿主**（detach）并以锚点注释占位——宿主离开 DOM，不再被 `querySelector` / `:nth-child` / 表单提交命中。`.keepalive` 修饰符切两态：eager（默认）假时**销毁子树 scope**、真时重编译子树；`.keepalive` 假时**保活子树与 watcher**、真时原宿主 reattach（状态保留）。eager 占子树（ownsChildren）故与 x-for 同元素冲突；`.keepalive` 不占子树，可与 x-for 共存。
_Avoid_: 显示/隐藏（那是 x-show 的可见性语义）、条件渲染（泛化词）

**条件可见性 / x-show（Conditional Visibility，独立指令）**:
控制宿主**是否可见**，宿主**永留 DOM**。条件为假时 `display:none`（仍占 `:nth-child` 位、仍被表单提交、`querySelector` 仍命中），子树与 watcher 全保留、最轻量。**独立指令，不再是 `x-if.keep` 的别名**（别名关系已废弃，见下）。不占子树，可与 x-for 共存。
_Avoid_: x-if.keep 别名/快捷方式（已废弃）、x-if（存在性 vs 可见性，二者正交）

### 表单绑定层

**双向绑定 / x-model（Two-way Binding）**:
输入控件与状态的双向同步——state→DOM（读方向）+ DOM→state（写方向）。区别于 `:value`/`x-bind:value` 的单向 state→DOM（"回写 state 须另用 x-model"）。仅 text-like 控件（`<input>` 非 checkbox/radio + `<textarea>`）。详见 ADR-0018。
_Avoid_: 双向数据绑定（泛化）、表单绑定（泛化）

**getter（state→DOM 变换）**:
x-model **读取方向**的状态值加工（如 `value.split('.')[0]`），把状态值变成 DOM 显示值。经 `x-model-options="{get:'...'}"` 声明，字符串形态（表达式形参 `value` / action 名）。
_Avoid_: 格式化器（泛化）、读取函数

**setter（DOM→state 变换）**:
x-model **写入方向**的输入值拆解（如 `user.first=$value`），把 DOM 输入写回一个或多个状态字段。经 `x-model-options="{set:'...'}"` 声明。与 getter 方向相反。
_Avoid_: 解析器（泛化）、写入函数

**只读降级（Read-only Degradation）**:
表达式/computed 无 setter 时，x-model 退化为单向 state→DOM（DOM→state 静默），`logger.warn` 一次，不抛错、不魔法猜左值。
_Avoid_: 只读模式（泛化）

**x-model 防循环（Self-write Guard）**:
onInput 写 state 触发的 read 回调跳过回写，避免 getter 立即覆盖用户输入。经实例级 `_selfWriting` 标志实现（`scope.watch` 的 scheduler 合并模型不透传 `operate.flags`），写入仍带 `flags:-seq` 供 syncer 识别。
_Avoid_: 死循环防护（实际无栈溢出，是冗余回写/输入覆盖防护）

## 已废弃

**x-show 别名（x-show as x-if.keep alias）**:
已废弃。x-show 曾是 `x-if.keep` 的解析期别名（`getDirectives.ts` 归一化为 `if` + `keep` 修饰符，零运行时实体），把「条件存在性」与「条件可见性」两个正交概念合并成一指令的两态，造成 `.keep` 到底 detach 还是 display:none 的语义反复。现拆分：x-show 独立为可见性指令（display:none），`x-if.keep` 升级为存在性指令（detach 保活）。详见 ADR-0016。
_Avoid_: （不再使用）

**`.keep` 修饰符（已更名为 `.keepalive`）**:
已废弃。`x-if` 的 `.keep` 修饰符（及对应指令选项键 `keep`，即 `x-if-options="{keep:true}"`）已重命名为 **`.keepalive`** / 键 `keepalive`，语义不变（摘宿主但保活子树与 watcher，见「条件存在性 / x-if」）。更名理由：「保活」直译、与通用 keep-alive 概念对齐（注意此处保活的是子树 DOM + watcher，非 Vue 的组件实例）。
_Avoid_: `.keep`（已更名为 `.keepalive`）、`x-if-options="{keep:true}"`（改用 `{keepalive:true}`）

**位置参数修饰符（Positional Modifier Argument）**:
已被废弃的修饰符带值语法，形如 `.debounce.500` 中句点后的数字段。带值配置现统一走**指令选项**（如 `x-on-options="{debounce:500}"`）。详见 ADR-0007。
_Avoid_: （不再使用）
