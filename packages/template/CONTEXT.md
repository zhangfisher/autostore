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

### 数据声明层

**挂载 / Mount（x-data）**:
x-data 的统一挂载模型：数据总要挂进全局状态树的某个容器，`mount` 指令选项指定挂在哪。三形态：默认（私有域 `_scopes.<id>`）/ 挂根（`.global` ≡ `mount:""`，只挂根不设 `this.data`、不改 scope 行为）/ 挂路径（`mount:'x.y'` merge 进 `state.x.y`，`_data` 指向挂载容器——子树直读 + 全树路径读 + `this.data`/`engine.data` 直写，与默认模式行为同构）。写入恒为 **merge**（他人旧键保留）；中间路径不存在自动创建、断裂（存在但非对象/数组段）降级默认私有域。destroy 键级 CAS 删除 + 容器删空向上回收 + 运行时键（`engine.data` 追加）残留。详见 ADR-0029。
_Avoid_: global 路径化（global 只挂根，承载路径的旧提案已废弃）、挂载点路径（Mount 是机制名，路径是它的值）

**相对挂载语法（Relative Mount）**:
mount 值以 `.` / `..` 开头的形态，段间用 `/` 分隔（与 x-teleport 同构，规避 `..` 与状态路径分隔符 `.` 的字符冲突）：`'./x'` 自身容器下、每级 `'..'` 一个**直接父 scope**（不跳层）、越顶落根；命中的 scope 无 `_data` 则**就地创建空私有域**（含 x-for item scope，数据随 item 生死）。基准切换见 `.nearest`。
_Avoid_: 点分相对路径（`..` 与 `.` 分隔符字符冲突，无法按 splitPath 拆）

**`.nearest` 修饰符（x-data）**:
相对挂载的步进基准开关（≡ `nearest:true`）：每级 `..` 从「直接父 scope」改为「最近的持有 `_data` 的祖先 scope」（跳过 x-if/x-for/x-scope 等占位元素）；`./` 仍指自身容器；上溯无数据祖先落根；配绝对路径静默忽略。「跳层」语义只在此显式 opt-in，不是默认——默认步进的确定性优先。
_Avoid_: 自动跳层（默认语义已被否决，跳层必须显式声明）

### 内容渲染层

**空值占位（Empty Placeholder）**:
x-text / x-html 的**值级**空状态配置：当绑定求值结果落在 `emptyValues` 内时，渲染 `empty` 指定的占位内容（默认空串）。区别于 x-for 的**结构空状态** `x-empty`（items 为空数组时渲染整块 fallback 子节点）——二者机制层不同（指令选项键 vs 子节点指令），命名沿用 `empty` 以求心智一致。详见 ADR-0014。
_Avoid_: fallback、默认值、占位符（占位符歧义大）

**空值集（emptyValues）**:
判定绑定值是否为"空"的集合：默认集 `[null, undefined, NaN]`（代码硬编码）**加上**用户经 `x-*-options` 声明的附加值。用户声明是**附加而非覆盖**——因 relaxed-json 无法表达 `undefined`（解析为字符串 `"undefined"`）与 `NaN`（解析抛 `not a float`），默认三成员不经 JSON 解析、永不可移除。判定用 `Array.prototype.includes`（SameValueZero 算法，故 `NaN` 可命中）。默认纳入 `NaN` 是有意的行为变更：既有 `String(NaN)` 渲染 `"NaN"`，现归为空。x-text/x-html（空值占位）与 x-model（空值回填）共用本集与判定语义。
_Avoid_: falsy 集（不是 falsy 真值判定）

**空值回填 / Empty Fallback（x-model）**:
x-model 读方向的空状态处理：绑定状态落在空值集内时，控件显示 `default` 声明的回填值（无 default 则按控件空值显示——text-like 空串、select 首项、多选全不勾）。区别于 x-text 的**空值占位**（渲染占位内容，输出层）——回填作用于**控件的显示值**，且 `default` 是「字段默认值」概念（模板 > schema 同名两级，优先级链读作同一键的两级声明）。**不回写 state**（显示层语义，state 是真相源）。仅 text-like + select 参与（checkbox 布尔语义、radio 多元素无「第一支」概念）。与 HTML 原生 `defaultValue`（受控初始值，会写 value）无关。详见 ADR-0027。
_Avoid_: defaultValue（那是 HTML 原生属性，会写 value）、默认值显示（泛化）、空值占位（那是 x-text 的词条，输出占位内容）

**`.hide` 修饰符**:
x-text / x-html 的修饰符，绑定值为空时将宿主元素内联 `display` 置 `none`（隐藏且不占位）；值恢复非空时**还原原内联 display**（如原 `flex` 保持 `flex`；无内联则还原为空串，让 CSS 类重新接管）。是空值占位的强化手段——要占位文案用 `empty`，要整块消失用 `.hide`。键名 `hide` 与 `empty`（文案）分离，避免撞键。
_Avoid_: `.empty`（与 empty 文案配置撞键）、`.ghost`（暗示 visibility:hidden 占位，与 display:none 语义冲突）

**`.compile` 修饰符（x-html）**:
x-html 的修饰符，将绑定值作为**子模板编译执行**（而非静态 HTML 快照）——反转 x-html"不编译注入内容"的原定位。注入内容写回 `scope.template` 后调 `recompileSubtree`，建 scope/watcher、继承宿主作用域（localData/data 经 `_linkParent` 自动传递），支持嵌套 x-data/x-for/x-if，与正常模板一致。**隐式强制跳过消毒**（sanitize 会剥指令属性致模板失效），安全等级**高于 `.raw`：.raw 的 `<script>` 经 innerHTML 不执行，compile 注入的 `x-on` 会真实绑定执行**——须确保来源可信。每次值变全量销毁旧子树 + 重编译（无 diff）；空值销毁子树 + 清空宿主、忽略 `empty` 文案（结构空状态无文案占位语义），`.hide` 仍生效。详见 ADR-0017。
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
输入控件与状态的双向同步——state→DOM（读方向）+ DOM→state（写方向）。区别于 `:value`/`x-bind:value` 的单向 state→DOM（"回写 state 须另用 x-model"）。控件按 **控件类别（ControlKind）** 分派读写：text-like（`<input>` 非 checkbox/radio + `<textarea>`，读 `el.value`）+ checkbox 单值布尔（读 `el.checked`，详见 ADR-0023）+ radio 值匹配 + select（选项子树见 **choices**，详见 ADR-0026）；checkbox 组 / radio 组收集暂不支持。详见 ADR-0018、ADR-0023、ADR-0026。
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

**元数据自动注入 / Schema Auto-injection**:
x-model 元素自动从 configManager schema 合成 input 原生属性的隐式 `@` 绑定——用户只写 `<input x-model="order.price"/>`，引擎按注入白名单与 schema 属性的交集自动合成 placeholder/title/required/min/max 等。合成实体是标准 BindDirective（复用 ADR-0019）。详见 ADR-0020。
_Avoid_: 字段属性注入（泛化）、自动绑定（歧义）

**注入白名单 / Injection Whitelist**:
元数据自动注入的候选属性集，按 input type 精准匹配：通用集（placeholder/title/required/readonly/enable/pattern/minlength/maxlength）+ numeric type 扩展（min/max/step）。仅注入 schema 实际承载的属性（动态交集）。不含 value/checked（x-model 自管）。enable 经 `.invert` 修饰符合成反向绑定（见「enable 反向映射」）。
_Avoid_: schema 属性集（那是 schema 的，白名单是 input 原生属性的候选）

**`.invert` 修饰符（x-bind，值取反）**:
x-bind 的修饰符，对求值结果取反（`!value`），状态绑定与 `@` 配置绑定均生效。语义化为 boolean 型属性的反向词汇映射而生（schema `enable` → DOM `disabled`），非布尔属性约定不使用（引擎不强制）。enable 元数据注入即合成 `:disabled.invert="path@enable"`。详见 ADR-0025。
_Avoid_: 反向绑定（泛化）、not 修饰符（与 JS 词汇混淆）

**enable 反向映射 / enable Inversion**:
schema 的 `enable`（boolean，true=可用）映射到 input 的 `disabled` 属性时**值取反**（enable=false → disabled）。经绑定层的 `.invert` 修饰符实现（合成 `:disabled.invert="path@enable"`，ADR-0025）——与普通 `@` 绑定同一套依赖收集/订阅/patch，仅求值结果取反。与 Field.tsx 的 enable 语义对齐。
_Avoid_: disabled 绑定（语义反向，易误解）、专用注入器（ADR-0020 决策 7 原实现，已由 ADR-0025 取代）

**合成绑定 / Synthesized Binding**:
compiler 在 scope.compile() 后、对含 x-model 的元素合成的隐式 BindDirective 实例（构造合成 AutoDirectiveInfo 喂给 createDirectives）。合成知识封装在 `ModelDirective.synthesizeSchemaBindings` 静态方法（compiler 只管调用时机）。
_Avoid_: 隐式指令（那是插值 desugar 的术语）

**控件类别 / ControlKind**:
x-model 内部对表单控件的分型（text / checkbox / radio / select），决定读源（`el.value` / `el.checked` / selectedOptions）、写目标、默认事件（text-like=`input`、select=`change`）、单值/组模式（select 的 multiple 多值 `string[]`）。分派发生在 `writeToDom`/`_handleInput` 底层，与 get/set、防循环、元数据注入正交。select 分支见 ADR-0026（选项源见 **choices**、分组见 **group 分组**）。
_Avoid_: 控件类型（与 schema.widget 重载——widget 是 schema 声明的控件类型，ControlKind 是 x-model 运行期按元素判定的绑定分型）、模式（mode）

**控件感知冲突 / Control-aware Conflict**:
x-model 与显式 bind 的冲突判据随控件类别变化：text-like/`<select>` 查 `:value`（竞写 `el.value`）、`<input type=checkbox>`/`<input type=radio>` 查 `:checked`（竞写 `el.checked`）且 `:value` 放行（设选项值，必需）。取代 ADR-0018 决策 7 的「同元素一律查 `:value`」。详见 ADR-0023。
_Avoid_: 冲突规则（泛化）、竞写检测（实现细节）

**choices（选项列表）**:
选项类控件的选项数据（`{ label?; value?; default?; [k: string]: any }[]`，label/value 均可缺省走 HTML 原生回退，附加字段可作 **group 分组** 键或 `default:true` **自动选中** 标记）。select 的选项源三级优先：**静态 `<option>`/`<optgroup>` > 模板 choices（x-model-options）> schema choices（响应式，变更全量重建子树后重放选中）**；静态模式忽略两处 choices。checkbox 组 / radio 组收集暂未接入（词汇已统一，待组收集落地）。详见 ADR-0026。
_Avoid_: options（泛化）、备选项（与 `AutoWidgetSelect.select` 撞义，统一后原名废弃）

**自动选中 / Auto-select（select）**:
x-model select 的值不在选项集内时的行为（默认开启）：自动选中 choices 项含 `default:true` 的第一个项（无则渲染后首个 option）并**回写 state**——与用户手选同一条写路径（flags/防循环/set 全复用），回写触发下游级联，链路闭合。类型不匹配（非字符串配单选）与空选项集不触发（维持不勾中）；多选是**过滤式**（剔除数组中过期项）。`autoSelect:false` 显式退回旧行为（不勾中不回写）；声明两级：模板 > schema，默认 true。级联联动的可用性基石。详见 ADR-0028。
_Avoid_: 默认选中（与 ADR-0027 的 default 回填混淆——那是空值显示回填，这是过期值重选+回写）、自动补全（输入联想，无关）

**group 分组（select）**:
choices 渲染的分组方式：`x-model-options="{group:'字段名'}"` 按项的该字段值聚合到 `<optgroup label>`，无该字段的项渲染为顶层 `<option>`（顺序遍历可与组交错）。仅作用于 choices 路径（两来源均可），静态手写 optgroup 不适用；group 键只在模板侧声明，schema 不承载。详见 ADR-0026。
_Avoid_: 分组字段（那是 group 的值，不是机制）、optgroup（那是 DOM 产物）

### 结构占位与组件层

**结构占位 / x-scope（Structural Placeholder）**:
纯占位指令，元素上声明 `x-scope` 即令该元素建立 `AutoTemplateScope`——即便它没有其他指令、没有插值。目的是在「无其他指令的纯容器 `<div>`」上插入一个 scope 锚点，让后代 scope 的 parent 链落到此处（而非更远的祖先），并为其后代 `x-component` 提供归属。注册占位类 `ScopeDirective`（`created`/`compile` 皆空，高优先级）；冗余声明（元素已有其他指令、本就建 scope）静默无副作用。**不建数据域**——与 x-data 的数据注入职责正交。
_Avoid_: 作用域容器（泛化）、命名空间（语义不符）、占位符（本表保留给空值渲染，歧义大）

**组件 / x-component（Component）**:
编译期树变换标记，**不是渲染指令**。在 x-scope（或任意带 scope 的祖先）内声明一个命名组件片段，编译时被**从渲染树摘除**（不进结果 DOM、不建 scope、不实例化指令），以**深克隆的 template 元素副本**形态上交给最近祖先 scope 的 `components`。无值时取名 `default`。组件上同元素的其他指令（如 `x-component="error" x-text="msg"`）随组件整体冻结，待消费者渲染该组件时才编译执行。**组件根 scope 由消费编译路径（`compiler.compileChild`）内禀保证**——消费者无条件 `new AutoTemplateScope`，与根上是否有 `x-scope` 属性无关；`_collectComponent` 不再给快照根注入任何属性（原"注入 x-scope"已作废，ADR-0022（承接 ADR-0021）决策 7 修订）。详见 ADR-0022（承接 ADR-0021）。
_Avoid_: 片段（泛化）、插槽（那是 x-slot，正交）、命名空间组件

**组件归属（Component Ownership）**:
一个 x-component 挂到其**最近的祖先 scope**——任意深度（跨中间无 scope 的纯 `<div>`），与 `_linkParent` 向上找最近 scope 的语义同构。嵌套 scope 时归最内层祖先；x-component 向上找不到任何带 scope 的祖先时，编译期 warn 并丢弃（无处归属）。
_Avoid_: 组件归属深度（实现细节）、组件父（用 scope 统一）

**`default` 组件唯一性（Default Component Uniqueness，已放宽）**:
该约束**已放宽**（ADR-0022 决策四-4）。原 ADR-0021 中"每个 scope 的 `components.default` 唯一、同名直接归属抛错"已废止——**同名组件直接归属同一 scope 时改为 warn + 后者覆盖**（不再抛错）。沿 parent 链**允许覆盖**：内层 scope 的 default 遮蔽外层同名 default，与组件查找的就近原则一致。此放宽为 x-component 引擎无实例缓存层、组件复用更灵活而设。
_Avoid_: 全局唯一（沿链可覆盖）、同名互斥（约束已放宽为 warn+覆盖）、抛错（已废止）

**组件查找（Component Lookup）**:
消费者（如 x-loading/x-empty/x-error）按约定名取组件的查找协议，经 `getComponent(name)`（原 `getBlock`/`lookupBlock`）执行：从自身 scope 起沿 parent 链向上取首个含该名 component 的 scope，**到顶兜底查 `engine.options.components`（全局组件，懒预编译缓存）**。命中则用该组件替换内置 UI；未命中则回退默认组件/内置 UI。**局部 x-component 沿链遮蔽全局同名组件**（就近原则，与 `getAction` 内层覆盖全局 `engine.actions` 同构）。与 action/data 的 parent 链查找范式统一，支持「局部覆盖、外层兜底」。三个落点：`scope.getComponent(name)`（链终点兜底全局）、`engine.getComponent(el, name)`（经 el 反查 scope，供 Runtime 指令）、Compile/Hybrid 指令直接 `this.binding.scope.getComponent(name)`。
_Avoid_: 组件解析、组件匹配（查找是按 scope 链就近+全局兜底，非内容匹配）

**组件兜底（Component Fallback）**:
消费者未查找到约定名组件时回退其默认渲染的行为。两种形态：**(a) 消费指令自带的默认组件**（如 x-loading 的 `DEFAULT_BLOCK` 模板串，渲染统一走「编译组件」路径，可被全局/局部组件覆盖）；**(b) 纯代码兜底**（已被 (a) 取代，x-loading 不再保留代码 DOM 路径）。组件是可选的覆盖资源，不存在时消费者回退其默认实现，引擎行为不退化。
_Avoid_: 降级渲染

**全局组件（Global Component）**:
经引擎构造选项 `AutoTemplateEngineOptions.components`（`Record<string, string>`）声明的、**全引擎复用**的命名组件，字符串入参。是 scope 链查找的**终点兜底**（`getComponent` 到顶后查此）。与局部组件（x-component 声明、入参为 DOM）相对——二者经同一条 `getComponent` 链统一取用，消费者无需区分来源。懒预编译（见「组件预编译」），**构造期配置语义、运行时突变不失效缓存**（与 `actions`/`sanitizer` 等 options 同纪律）。详见 ADR-0022（承接 ADR-0021）决策 9。
_Avoid_: 全局模板（泛化）、注册组件（无注册表，引擎不维护名册）

**组件预编译（Component Precompile）**:
全局组件字符串入参首次被 `getComponent` 命中时，经 `parseHtmlFragment` 解析 + 自动包装（见「组件自动包装」）为「恰好一个带 `x-component` 的根元素」，存入 engine 私有缓存 Map（key=组件名，value=预编译根），后续命中只 `cloneNode(true)` 不重复解析。**懒编译**——仅首次使用时预编译，未用的全局组件永不解析。预编译产物形态与局部组件 `_collectComponent` 快照一致（未编译、保留指令属性、**不注入 x-scope**），消费者经同一路径渲染。解析失败/空串 → `logger.warn` + 视为未命中。详见 ADR-0022（承接 ADR-0021）决策 11。
_Avoid_: 组件编译（预编译只解析+包装，编译在消费时）、组件缓存（强调的是懒解析+复用，非单纯存储）

**组件自动包装（Component Auto-wrap）**:
全局组件字符串入参规范化为「恰好一个带 `x-component` 属性的根元素」的规则（仅全局组件字符串入参适用，局部组件入参已是 DOM）：单顶级元素无 `x-component` → 根打本 key 名；已含 `x-component` → 尊重原值不重命名；多顶级节点/元素+文本混排 → 包一层 `<div x-component="name">`；纯文本无元素 → 包成 `<div x-component="name">文本`。包装标签固定 `<div>`（不开放配置）。详见 ADR-0022（承接 ADR-0021）决策 10。
_Avoid_: 组件归一化（泛化）、组件封装

**跨指令供体协议（Cross-directive Provider Protocol）**:
x-component 不绑定具体消费者，是声明性资源——任意指令按约定名从 `scope.components` 取用。组件名**纯自由命名**（各消费指令文档自定其读取名与兜底逻辑），引擎**不预定义 UI 态名册**（如 loading/error/empty），不限制指令开发者发明新消费场景（开放-封闭）。
_Avoid_: 插槽契约（与 x-slot 撞义）、UI 态注册表（引擎不维护名册）

**组件冻结（Component Frozen Snapshot）**:
x-component 收集时 `cloneNode(true)` 产出的、独立于 template 事实源的洁净副本。保留指令属性、未编译、可被多消费者重复取用而不相互污染。机制与 x-slot static 模式的「深克隆子节点」同构。
_Avoid_: 组件克隆（强调的是冻结独立事实，非单纯克隆操作）

### 配置绑定层

**配置分隔符 `@`（Config Separator）**:
x-bind 值中的路径中缀，声明该绑定指向 configManager 元数据而非 store 状态。`:placeholder="order.price@placeholder"` 中 `@` 把值来源从 `scope.watch(state)` 切到 `configManager`，左侧为配置状态路径、右侧为配置属性路径。无 `@` 即状态绑定（支持相对表达式）——配置绑定仅绝对配置路径。
_Avoid_: 元数据前缀、schema 前缀、配置引用前缀（初版 `~` 已废弃）

**配置引用（Config Reference）**:
`@` 分隔的整体路径串（如 `order.price@placeholder`），由「配置状态路径 + 配置属性路径」组成。用 `indexOf("@")` 取第一个 `@` 分割，两侧再各用 `splitPath(".")` 拆，与 configManager state key 的 `.` join 同构。
_Avoid_: 配置路径（歧义，下分）

**配置状态路径（Config State Path）**:
配置引用中 `@` 左侧部分（`order.price`），定位 configManager.state 中的 schema 条目。注意它指向 configManager 的 flat schema 表，非 store 状态树。
_Avoid_: 状态路径（那是 store.state 的）

**配置属性路径（Config Attribute Path）**:
配置引用中 `@` 右侧部分（`placeholder` 或 `style.color`），schema 对象的属性路径，**支持多段嵌套**（`getVal(schema, rightPath)` 读任意深度）。schema 是可扩展数据结构，故**无白名单**。
_Avoid_: schema 字段（泛化）、配置属性（已升级为路径，支持嵌套）

**配置绑定（Config Binding）**:
经 `@` 把 configManager 元数据响应式注入 DOM 属性的行为。经 `configManager.collectDependencies("read")` 自动追踪依赖（含嵌套层，规避手工拼 watch 路径），回调同样经 scheduler 合并。三层降级：configManager/schema 不存在 → warn + 静默；属性取不到（含嵌套中途断裂）→ 复用 patch removeAttribute。详见 ADR-0019。
_Avoid_: 元数据绑定（泛化）

## 组件层

**组件 / x-component（Component）**:
承接 x-block 的命名组件供体，升级为带数据/方法/生命周期/CSS 的完整组件（ADR-0022）。编译期树变换标记，剪枝后冻结快照挂最近祖先 `scope.components`；子节点可含 `<script setup>`/`<style>`（收集期提取移除）。消费（x-use）时实例化。
_Avoid_: 片段（泛化）、插槽（那是 x-slot，正交）、命名空间组件

**`<script setup>`**:
组件的数据/方法/生命周期声明，对象字面量经 new Function 求值（信任代码），多个按段（data/methods/hooks）分类合并。data() 返回值注入组件 data 域，methods 注入 scope.actions，hooks 挂 scope.hooks。
_Avoid_: 组件脚本（泛化）、setup 函数（Vue 术语，机制不同）

**scope.hooks**:
组件实例的四阶段生命周期钩子（created/mounted/beforeUnmount/unmounted），砍掉 activated/deactivated（引擎无实例缓存层）、beforeUpdate/updated（细粒度无组件整体重渲染）。每个 hook 用 ComponentMethodContext 作 this（data/state/scope）。
_Avoid_: 生命周期（泛化）、组件钩子（泛化）

**组件作用域 CSS（Scoped CSS）**:
属性后缀法（仿 Vue scoped，不支持穿透）。组件根+后代打 `data-cmp-{id}` 属性，`<style>` 选择器末尾追加 `[data-cmp-{id}]`，按组件定义缓存 + 引用计数注入 head。
_Avoid_: CSS 隔离（泛化）、CSS Modules（机制不同）

**样式绑定 / CSS 变量响应式（Style Bind）**:
scoped CSS 之上的值响应式能力。`<style>` 声明值写 `bind(expr)`（引号可选，仅作整个属性值，支持任意表达式），编译期提取为 `ComponentDef.styleBinds` 清单、`bind()` 替换为 `var(--name, unset)`；实例化期对每个 bind 调 `hostScope.watch` 求值并写入**组件根元素**的 CSS 变量（每实例独立，与 data-cmp-{id} 同构隔离）。变量名：纯路径→`--{路径}`（`.`→`-`、`*`→`_`，如 `bind("order.style")`→`--order-style`），表达式→`--h{hash36}`（`h` 保 CSS 合法，首字符非数字）。同表达式复用同一变量（一处 watch、多处 var 共享）。null/undefined 不写变量走 `unset` 回退（fallback 固定不可配，要自定义默认值用 `:style`）。详见 ADR-0022 决策四-4.1。
_Avoid_: 内联样式绑定（`:style` 指令是元素级，style bind 是组件级样式表）、CSS-in-JS（无运行时对象）

**x-use（组件实例化）**:
实例化组件的指令。宿主化身组件根（属性继承：class 合并拼接、style 合并冲突键组件根优先、其他不覆盖），props 注入组件 data 域覆盖 data() 默认。组件未就绪（x-import 加载中）显示 loading 占位，就绪后重实例化。
_Avoid_: 组件渲染（泛化）、组件挂载（Vue 术语）

**x-import（远程组件加载）**:
fetch 远程 HTML 加载组件定义（可含 1-N 个 x-component）。`.global` 修饰符注册全局组件，否则作用域组件（挂最近祖先 `scope.components`）。url 缓存 + 循环 import 检测。
_Avoid_: 组件异步加载（泛化）、组件懒加载（语义不符）

**组件查找（Component Lookup）**:
`getComponent` 沿 scope 链就近 + 全局兜底，与原 getBlock 同构。default 唯一性放宽（同名 warn+覆盖）。
_Avoid_: 组件解析、组件匹配（查找是按 scope 链就近+全局兜底，非内容匹配）

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

**x-block / blocks / getBlock 全套术语**:
已废弃，升级为 x-component / components / getComponent（ADR-0022）。default 块唯一性抛错语义亦废止，改为 warn + 后者覆盖。
_Avoid_: （不再使用）
