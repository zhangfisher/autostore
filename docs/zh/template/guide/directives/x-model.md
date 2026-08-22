# x-model 双向绑定

## 概述

在表单控件上实现**双向绑定**——用户输入自动写回状态，状态变化自动同步到控件值。相当于 `x-on:input`（写回）与 `:value`（同步）的声明式合写，并额外支持值的读写变换与循环防护。

```html
<input x-model="user.name" />
<p>你好，{{ user.name }}</p>
```

::: tip 适用控件
支持 **text-like 控件**（`<input>` 非 checkbox/radio + `<textarea>`）、**checkbox 单值布尔**、**radio 单值选择** 和 **select**（单选/`.multiple` 多选，选项可由 schema `choices` 响应式驱动）。checkbox 组 / radio 组收集暂不支持。
:::

## 快速入门

<demo html="template/model/all-input-types.html" />

`x-model="path"` 的 `path` 支持**状态路径**（`user.name`）或**表达式**（`user.first + ',' + user.last`，含计算属性路径）。输入即写回状态、状态变化同步回输入框，无需手动监听 `input` 事件。上例覆盖了 text / number / email / password / textarea / checkbox / radio / select 的完整用法。

## 指南

### 控件类型

x-model 支持四类控件，读写语义各不相同：

| 控件      | 读方向（state→DOM）                 | 写方向（DOM→state）               | 默认事件 |
| --------- | ----------------------------------- | --------------------------------- | -------- |
| text-like | `el.value = String(state)`          | `state = el.value`                | `input`  |
| checkbox  | `el.checked = Boolean(state)`       | `state = el.checked`（布尔）      | `input`  |
| radio     | `el.checked = (state === el.value)` | `state = el.value`（仅勾选时）    | `input`  |
| select    | 选项值严格匹配勾选（见下）          | 单选 `el.value` / 多选 `string[]` | `change` |

#### Input

所有 text-like 控件（`text` / `email` / `password` / `url` / `tel` / `search`）统一读写 `el.value`（字符串）：

<demo html="template/model/text-input.html" />

```html
<input type="text" x-model="form.username" />
<input type="email" x-model="form.email" />
<input type="number" x-model.number="form.age" />
```

修饰符控制值转换：`.number` 写回前 `Number()` 转换，`.trim` 去除首尾空格。详见[修饰符](#修饰符)。

#### Textarea

`<textarea>` 统一读写 `el.value`，用法与 text input 一致：

<demo html="template/model/textarea.html" />

```html
<textarea x-model="form.bio" placeholder="自我介绍"></textarea>
```

#### Checkbox

`<input type="checkbox">` 读写 `el.checked`（布尔值），而非 `el.value`。

<demo html="template/model/checkbox.html" />

```html
<input type="checkbox" x-model="form.agree" />
<!-- 勾选 → state.form.agree = true -->
<!-- 取消 → state.form.agree = false -->
```

**读方向**：`el.checked = Boolean(state)`。非布尔 state 经 `Boolean()` 宽容转换（`"yes"` → `true`，`null` → `false`）。

**写方向**：`state = el.checked`（恒写布尔）。一旦用户操作过 checkbox，值就永远是布尔类型。

::: tip checkbox 的 value 属性不参与绑定
checkbox 的 `value` 属性仅用于表单提交值，不影响 `x-model` 绑定。`x-model` 始终读写 `el.checked`（布尔）。
:::

checkbox 与 `:value` 不冲突——`:value` 设置的是表单提交值，不与 `x-model` 竞写 `el.checked`：

```html
<!-- ✅ 允许：:value 设选项值，x-model 绑定 checked -->
<input type="checkbox" x-model="form.agree" value="yes" />

<!-- ❌ 报错：:checked 与 x-model 竞写 el.checked -->
<input type="checkbox" x-model="form.agree" :checked="forceChecked" />
```

修饰符（`.trim` / `.number` / `.boolean`）对 checkbox 无意义（空转，不报错）——`.boolean` 尤其冗余：checkbox 写方向恒为布尔，无需转换。

#### Radio

`<input type="radio">` 通过值匹配实现互斥选择——多个同名 radio 共享一个 state 值。

<demo html="template/model/radio.html" />

```html
<input type="radio" name="gender" value="male" x-model="form.gender" />
<input type="radio" name="gender" value="female" x-model="form.gender" />
<!-- 选中 male → state.form.gender = "male" -->
<!-- 选中 female → state.form.gender = "female"，male 自动取消 -->
```

**读方向**：`el.checked = (state === el.value)`。state 值与 radio 的 `value` 属性比较，匹配则选中。

**写方向**：仅勾选时写 `state = el.value`（字符串），取消时不写（另一个 radio 会接管）。

::: warning radio 必须有 value 属性
radio 的 `value` 属性是绑定值的来源。如果缺少 `value`（HTML 默认 `"on"`），引擎会 warn 并跳过绑定。
:::

radio 与 `:value` 不冲突——`:value` 设置的是选项值，不与 `x-model` 竞写 `el.checked`：

```html
<!-- ✅ 允许：:value 设选项值 -->
<input type="radio" value="male" x-model="form.gender" :value="'M'" />

<!-- ❌ 报错：:checked 与 x-model 竞写 el.checked -->
<input type="radio" value="male" x-model="form.gender" :checked="forceChecked" />
```

修饰符（`.trim` / `.number`）对 radio 无意义（空转，不报错）。

#### Select

`<select>` 的选项子树有三类来源，优先级从高到低：

<demo html="template/model/select.html" />

**① 静态 `<option>`（最优先）**——模板手写选项（含手写 `<optgroup>` 分组），引擎不做任何选项管理，两处 `choices` 配置整体忽略：

```html
<select x-model="form.car">
    <option value="ZEEKR">极氪</option>
    <option value="NIO">蔚来</option>
</select>
```

**② 模板 choices**——`x-model-options="{choices:[...]}"` 声明选项数组，优先于 schema：

```html
<select
    x-model="form.car"
    x-model-options="{choices:[{value:'ZEEKR',label:'极氪'},{value:'NIO',label:'蔚来'}]}"
></select>
```

**③ schema choices（响应式）**——`configurable(initial, { choices })` 声明在字段元数据里，选项**动态更新**（增删、改 label/value、整体替换都会全量重建选项子树并保持选中）：

```js
cars: configurable("ZEEKR", {
    label: "车辆",
    choices: [
        { value: "ZEEKR", label: "极氪" },
        { value: "NIO", label: "蔚来" },
        { value: "XPENG", label: "小鹏" },
    ],
}),
```

三源皆空时 warn 一次，不生成选项。

**choice 形态**：`{ label?, value?, ...附加字段 }`——`label` 缺省回退 `String(value)`；`value` 缺省省略属性（HTML 原生回退，label 即值，适合纯中文枚举）；附加字段可作 `group` 分组键。

**读写方向**：

- 单选：state 是 `string`，读方向按选项值**严格 `===` 匹配**勾选，写方向 `state = el.value`；
- 多选（`.multiple`）：state 是 `string[]`，读方向逐选项 `includes` 勾选，写方向收集 `selectedOptions`。

**默认事件 `change`**：select 无「打字中间态」，`change` 是其语义事件（与 Vue/Alpine 惯例一致）；`.change` 修饰符显式声明同效（幂等）。

::: warning 严格匹配是锐边
option 的 `value` 恒为字符串，state 是**数字等非字符串时不勾中任何项**（不静默 `String()` 强转——掩盖类型漂移无益）。`.number` 写回数字后回读勾不中同理，需配 `get:'String(value)'` 转换（与 radio 布尔对的锐边同构）。类型不匹配会 `warn` 一次。
:::

::: warning state 未初始化时的首项默认
state 为 `undefined` 时 select 会勾中**第一个 option**（引擎主动，[空值与默认值](#空值与默认值)）——但 state **不回写**（仍是 undefined）。依赖 DOM value 提交表单会带上未确认的首项值，提交前须校验 state。需要占位提示请显式在 choices 头部放 `{value:"",label:"请选择"}` 并初始化 state 为 `""`。
:::

**多选 `.multiple`**：声明方式三选一（等价，任一为真即真）——静态 `multiple` 属性、`.multiple` 修饰符、schema 的 `multiple` 元数据（显式声明优先于 schema）：

```html
<select multiple x-model="form.cars"></select>
<!-- 或 -->
<select x-model.multiple="form.cars"></select>
```

多选 state 为 `string[]`；修饰符管道（`.trim`/`.number`/`.boolean`）对数组**逐项应用**（`.number` 把 `["1","2"]` 写回成 `[1,2]`——注意与严格匹配锐边的配合需 get 转换）。

**分组 `group`**：`x-model-options="{group:'字段名'}"` 按 choices 项的指定字段值聚合到 `<optgroup label>`，无该字段的项渲染为顶层 `<option>`（可与组交错）：

```html
<select
    x-model="form.car"
    x-model-options="{group:'category',choices:[
        {value:'ZEEKR',label:'极氪',category:'轿车'},
        {value:'NIO',label:'蔚来',category:'SUV'},
        {value:'XPENG',label:'小鹏',category:'轿车'}
    ]}"
></select>
<!-- 渲染为 <optgroup label="轿车">极氪/小鹏</optgroup> + <optgroup label="SUV">蔚来</optgroup> -->
```

`group` 仅作用于 choices 路径（模板/schema 两来源均可）；静态手写模式请直接写 `<optgroup>`。schema 不承载 group 字段（分组是表现层关注点，声明在模板侧）。

**元数据注入白名单**：select 自动注入 `title` / `required` / `size`（schema 有则合成），`enable` 经 `.invert` 反向映射 `disabled`（与其他控件一致），`multiple` 在无显式声明时注入。`choices` 不走属性注入，走上述选项子渲染。

**自动选中 `autoSelect`（默认开启）**：当绑定值**不在选项集内**（如级联切省后原市值过期），自动选中一项并**回写 state**——级联联动的可用性基石：

- **选取规则**：choices 项含 `default:true` 的第一项 ＞ 渲染后首项；
- **回写**：与用户手选完全同一条写路径（含 set 表达式/防循环），回写触发下游级联，链路闭合；
- **多选是过滤式**：剔除数组中过期项后回写（保留有效项），不整组重选；
- **关闭**：`x-model-options="{autoSelect:false}"`（或 schema `autoSelect: false`）退回旧行为——不勾中、不回写。模板声明 > schema，默认 `true`；
- **不触发的场景**：类型不匹配（数字配单选，维持 warn）、空选项集（静默）。

```html
<!-- 级联：切省 → 市值过期 → 自动选中福建·福州并回写 → 区县 choices 随之重算 -->
<select x-model="province">
    ...
</select>
<select x-model="city"></select>
<select x-model="district"></select>
```

```js
city: configurable("fz", {
    choices: computed((scope, { ref }) => CITIES[ref("province")] ?? []),
}),
district: configurable("gl_fz", {
    choices: computed((scope, { ref }) => DISTRICTS[ref("city")] ?? []),
}),
// 切省 → city 值不在新集 → 自动选 CITIES 新集的 default:true 项或首项并回写
// → district 的 choices 引用新 city 重算 → 同样自动选中——链路逐级闭合，零模板代码
```

::: warning 行为变更（默认开启）
值不在选项集的场景从「不勾中不回写」改为「自动选中并回写」（ADR-0028）。依赖旧行为（`selectedIndex === -1` 判未选、state 保持过期值）的代码须显式声明 `autoSelect:false` 退回。
:::

### 空值与默认值

绑定状态落在**空值集**内时，x-model 按本节规则回填控件的**显示值**——与 [x-text 的空值占位](./x-text.md)同构的一套机制（同一 `emptyValues` 词汇与判定语义），但作用于表单控件的显示而非文本渲染。

<demo html="template/model/empty-default.html" />

**空值集 `emptyValues`**：默认 `[undefined, null, NaN]`，用户声明是**附加而非覆盖**（relaxed-json 表达不了 `undefined`/`NaN`，覆盖会破坏默认判空）：

```html
<!-- 附加 0：state.n 为 0/undefined/null/NaN 时都算空 -->
<input x-model="n" x-model-options="{emptyValues:[0]}" />
```

**空值时的显示**（无 `default` 声明时）：

| 控件        | 空值显示                                                        |
| ----------- | --------------------------------------------------------------- |
| text-like   | 空串 `""`（原 `String(null)` 显示 `"null"` 是强转意外，已修正） |
| checkbox    | `false`（不变）                                                 |
| radio       | 全不勾（不变）                                                  |
| select 单选 | **勾中第一个 option**（含 optgroup 内首个，见下）               |
| select 多选 | 全不勾（不变）                                                  |

**回填值 `default`**：空值时显示 `default` 声明的值。两级声明、模板优先：

```html
<!-- 模板级：state.a 为空时输入框显示 "未填写" -->
<input x-model="a" x-model-options="{default:'未填写'}" />
```

```js
// schema 级：configurable 的 default 元数据（第二级，模板未声明时生效）
a: configurable(undefined, { default: "未填写" }),
```

::: warning default ≠ HTML 原生 defaultValue
本机制的 `default` 是「空值时的**显示回填**」（state 不动）；HTML/DOM 原生的 `defaultValue` 是「受控组件**初始值**」（会写 value，React 同名语义）。二者无关，请勿混用。
:::

**select 首项默认**：未声明 `default` 且状态为空时，单选 select 勾中渲染后的第一个 `<option>`（含 optgroup 内首个）。这是**仅显示层**的勾中——**state 不回写**（仍是 undefined），表单提交会带上首项的值，提交前须校验 state 是否真正被选择。多选 select 空值时全不勾（`[]` 语义）；声明了 `default` 且为数组则按数组勾选。

**判定时机**：每次读方向都判（state 任何时刻变成空值都回填显示）；写方向**不经判空**——用户输入 `""` 写回就是 `""`（`""` 不在默认空值集）。

**适用范围**：仅 text-like + select。checkbox 是布尔语义（空值即 false，无默认值概念）；radio 的选项分散在多个元素上，无「第一支」可判。

::: warning 已知锐边

- **`emptyValues:[""]` + `default` 组合**：用户清空输入 → state 写 `""`（命中空值集）→ 显示弹回 default，「刚清空又弹回」。机制语义统一（无条件判定），该组合后果自担，请避免。
- **`emptyValues:[0]` + `.number`**：计数 `0` 也会被算空。附加语义是显式声明，注意数字常用值被误伤。
- **get 变换与判定的顺序**：先 get 后判空——get 求值失败回退原空值仍走回填；get 把空值转成非空产物则照常显示（可借此自定义空值文案）。
  :::

### 修饰符

默认监听 `input` 事件（实时同步；select 默认 `change`）。五个修饰符控制同步时机与值转换：

| 修饰符      | 等价配置                            | 说明                                                              |
| ----------- | ----------------------------------- | ----------------------------------------------------------------- |
| `.number`   | `x-model-options="{number:true}"`   | 写回前 `Number()`，`NaN` 回退原字符串（避免字符串污染）           |
| `.trim`     | `x-model-options="{trim:true}"`     | 写回前去除首尾空格                                                |
| `.boolean`  | `x-model-options="{boolean:true}"`  | 写回前严格集转布尔（见下）                                        |
| `.change`   | `x-model-options="{change:true}"`   | 监听 `change` 事件（失焦触发）而非 `input`（实时；select 已默认） |
| `.multiple` | `x-model-options="{multiple:true}"` | select 多选（state 为 `string[]`，见 [select](#select)）          |

#### `.number`

不加 `.number` 时，`<input type="number">` 的值是字符串，`price * count` 会变成字符串拼接：

<demo html="template/model/modifiers-number.html" />

#### `.trim`

<demo html="template/model/modifiers-trim.html" />

#### `.boolean`

`el.value` 是字符串，`.boolean` 把写回值转为**布尔类型**。仅认三个字符串字面量（**严格集**，大小写敏感）：

| 输入       | 写入 state                                                       |
| ---------- | ---------------------------------------------------------------- |
| `"true"`   | `true`                                                           |
| `"false"`  | `false`                                                          |
| `""`       | `false`                                                          |
| 其他任意串 | **保留原值**（不转换，镜像 `.number` 的 NaN 回退「不破坏」原则） |

<demo html="template/model/modifiers-boolean.html" />

```html
<!-- radio 布尔对：主场景 -->
<input type="radio" name="sw" value="true" x-model.boolean="form.enabled" />
<input type="radio" name="sw" value="false" x-model.boolean="form.enabled" />
<!-- 勾选"开启" → state.form.enabled = true（布尔，非字符串 "true"） -->
```

**适用控件**：text-like 与 radio（读 `el.value` 的控件）；checkbox 写方向恒为布尔，`.boolean` 冗余空转（无害）。

**注意（读方向不转换）**：`.boolean` 仅作用于**写方向**（DOM→state）。radio 读方向是 `state === el.value` 严格比较——布尔 `true` 与字符串 `"true"` 不相等，若要布尔 state 驱动 radio 选中态，需配 get 变换：`x-model-options="{get:'String(value)'}"`。

**注意（与 `.number` 同写）**：`.number` / `.boolean` 都是类型终态声明，同写时**按书写序顺序执行、不短路不告警**——`x-model.boolean.number` 输入 `"true"` 先转布尔 `true`、再被 `Number(true)` 转成 `1`；`x-model.number.boolean` 则 `Number("true")=NaN` 回退原串后转得 `true`。冲突后果由开发者自担，请只写一个。

radio 的 `value` 是模板静态声明，若不在严格集内（如 `value="abc"`），会 `warn` 一次并保留原值写回（提示模板 bug）；text 输入的未识别串静默保留（用户输入不预设）。

#### `.change`

<demo html="template/model/modifiers-change.html" />

写回管道顺序：`el.value` →（`.trim`）→（`.number` / `.boolean` 按书写序）→ `$value` → set 或直写状态。

### 嵌套路径

`x-model` 支持多层状态路径：

<demo html="template/model/nested.html" />

```html
<input x-model="user.address.city" /> <input x-model="user.address.street" />
```

### 绑定表达式

`x-model` 的值除**状态路径**外，还支持**表达式**——含运算符、拼接、函数调用的任意 JS 表达式（含计算属性路径）。判定规则：纯标识符点分路径（字母/数字/下划线/`$`）走路径快路径；含任何非路径字符即为表达式。

| 形态                        | 示例                                     | 读方向     | 写方向                            |
| --------------------------- | ---------------------------------------- | ---------- | --------------------------------- |
| 状态路径                    | `x-model="user.name"`                    | ✓          | ✓ 直写该路径                      |
| 表达式 + set                | `x-model="user.first + ',' + user.last"` | ✓ 求值显示 | ✓ 经 set 反向变换拆回             |
| 表达式 / computed（无 set） | `x-model="order.price * order.count"`    | ✓ 求值显示 | ✗ **只读绑定**（降级，warn 一次） |

#### 双向绑定（表达式 + set）

表达式组合多个字段显示，编辑后经 **set 反向变换**拆解写回——一个输入框双向驱动多个状态字段：

<demo html="template/model/expr-bind.html" />

```html
<!-- 读 = first + ',' + last 组合显示；写 = set action 拆回两个字段 -->
<input x-model="user.first + ',' + user.last" x-model-options="{set:'setName'}" />

<!-- 金额输入：读 = price 格式化；写 = 去符号回写 price -->
<input
    x-model="'¥ ' + order.price"
    x-model-options="{set:'order.price=Number($value.replace(/[^\\d.]/g,\\'\\'))||0'}"
/>
```

```js
actions: {
    // set action：把「姓,名」输入拆回两个字段
    setName: function ($value) {
        const parts = $value.split(",");
        this.state.user.first = parts[0] ?? "";
        this.state.user.last = parts[1] ?? "";
    },
},
```

set 的两种写法（表达式 / action 名）与更多拆分组合场景见下文 [get / set 变换](#get-set-变换)。

#### 只读绑定（表达式 / 计算属性，无 set）

表达式**未配 set**（或绑定的是计算属性——天然无 setter）时，写方向不可逆，`x-model` **自动降级为单向只读**：读方向正常（state→DOM 显示），用户输入不写回（静默），`logger.warn` 提示一次（不抛错、不魔法猜左值）：

```html
<!-- 派生值展示：改 price/count 联动刷新，输入不回写（上方 demo 第二卡片） -->
<input x-model="order.price * order.count" />
<!-- 计算属性同理（fullName = computed/函数声明，无 setter） -->
<input x-model="user.fullName" />
```

只读降级的完整行为见[只读降级](#只读降级)。

::: tip 何时用表达式绑定

- **需要组合/派生显示**且用户可编辑 → 表达式 + set（双向）；
- **纯展示派生值**（金额合计、全名预览）→ 表达式无 set（只读）——比 `:value` 单向绑定多一层「控件语义」（同一套 x-model 的修饰符/空值回填/元数据注入都可用）；
- 简单字段读写 → 直接用路径，别绕表达式。
  :::

### get / set 变换

`x-model` 的值可以是**表达式或计算属性**。此时读方向没问题，但写方向需要一个**反向变换**——把输入值拆解写回一个或多个状态字段。

经 `x-model-options="{get:'...',set:'...'}"` 声明：

- **get（state→DOM 变换）**：把状态值加工成输入框显示值。
- **set（DOM→state 变换）**：把输入值拆解写回状态字段。

::: warning 值形态：字符串 only，禁箭头函数
`get`/`set` 的值**只能是字符串**。因为配置值经宽松 JSON（relaxed-json）解析，不支持函数字面量——箭头函数会被降级为字符串或直接解析失败。请用下面两条「正道」：**表达式**或 **action 名**。
:::

两种写法任选其一：

- **表达式**：经 `new Function(...,"with(scope){...}")` 求值。get 固定形参 `value`（当前状态值），set 固定形参 `$value`（DOM 输入值），语句体执行赋值。
- **action 名**（推荐，逻辑复杂时）：`get`/`set` 只写 action 名。get action 当前状态值**自动作首参**（`value`），set action DOM 输入值**自动作首参**（`$value`），括号内均可追加参数，`this.state` 可访问状态。

下面按两个典型场景展开。

### 字段拆分

**一个状态值拆分到多个输入框，编辑后再合并写回。** 典型如 IP 地址：单个 `user.ip` 拆成 4 段输入框，`get` 显示对应八位段、`set` 重组完整 IP 写回。

<demo html="template/model/get-action.html" />

```html
<input x-model="user.ip" x-model-options="{get:'octet(0)',set:'joinOctet(0)'}" />
<input x-model="user.ip" x-model-options="{get:'octet(1)',set:'joinOctet(1)'}" />
<input x-model="user.ip" x-model-options="{get:'octet(2)',set:'joinOctet(2)'}" />
<input x-model="user.ip" x-model-options="{get:'octet(3)',set:'joinOctet(3)'}" />
```

```js
actions: {
    // get：返回 IP 的第 index 段用于显示
    octet: (value, index) => String(value).split(".")[index] ?? "",
    // set：读当前完整 IP，替换第 index 段，重组写回
    joinOctet: function ($value, index) {
        const parts = String(this.state.user.ip).split(".");
        parts[index] = $value;
        this.state.user.ip = parts.join(".");
    },
},
```

同样的拆分逻辑也可用**表达式**写法（逻辑简单时）。下面把数字状态格式化成「¥ 金额」显示：

<demo html="template/model/get-expression.html" />

```html
<input x-model="order.amount" x-model-options="{get:'`¥ ${value}`'}" />
```

### 字段组合

**多个状态字段组合到一个输入框，编辑后拆解写回各字段。** 典型如姓名：`user.first + ',' + user.last` 组合显示，编辑后按逗号拆回 `first` / `last`。

<demo html="template/model/set-action.html" />

```html
<input
    x-model="user.first + ',' + user.last"
    x-model-options="{get:'user.first + \',\' + user.last', set:'setName'}"
/>
```

```js
actions: {
    // set：把「姓,名」拆回两个字段
    setName: function ($value) {
        const parts = $value.split(",");
        this.state.user.first = parts[0] ?? "";
        this.state.user.last = parts[1] ?? "";
    },
},
```

组合的写方向也可用**表达式**（`$value` 形参，语句体赋值）。下面把输入直接写到 `dst` 字段：

<demo html="template/model/set-expression.html" />

```html
<input x-model="src" x-model-options="{set:'dst=$value'}" />
```

action 可声明在 `<script type="actions">`（局部）或 `engine.actions`（全局），详见 [action](../action.md)。

### 只读降级

当 `x-model` 绑定的是**表达式或计算属性**且**未提供 set** 时，读方向正常（state→DOM 显示），但写方向不可逆——此时 `x-model` **自动降级为单向只读**：

- 输入框手动改值不会写回状态（静默）；
- `logger.warn` 提示一次（不抛错、不魔法猜左值）。

<demo html="template/model/readonly.html" />

```html
<!-- fullName 是计算属性，无 setter → 只读降级 -->
<input x-model="user.fullName" />
```

### 绑定数据来源

`x-model="path"` 的取值按 **scope 链就近解析**——同一个模板里，不同控件可以各取所需：本地 `x-data`、祖先 `x-data`、全局状态，甚至三者混用。

#### 来源一：本地 x-data

控件写在 `x-data` 容器**内**，绑定即容器的局部字段——表单草稿、临时开关就近存放，不污染全局 store：

<demo html="template/model/source-local.html" />

```html
<div x-data="{ draft: '', urgent: false }">
    <!-- 读局部字段；写方向须配 set 桥接（见下 warning）——所有控件类型同理 -->
    <input x-model="draft" x-model-options="{set:'draft=$value'}" />
    <input type="checkbox" x-model="urgent" x-model-options="{set:'urgent=$value'}" />
</div>
```

#### 来源二：祖先 x-data

嵌套 `x-data` 时，内层控件绑定的键沿 parent 链**就近继承**——本地未声明的键落到最近声明它的祖先层：

<demo html="template/model/source-ancestor.html" />

```html
<div x-data="{ tenant: 'acme', tag: 'prod' }">
    <!-- 本层没有 tag 声明，内层绑定落到祖先的 tag -->
    <div x-data="{ tag: '' }">
        <input x-model="tag" x-model-options="{set:'tag=$value'}" />
        <!-- 改的是本层 tag；删掉本层声明则改祖先 tag -->
    </div>
</div>
```

#### 来源三：全局状态

不在任何 `x-data` 内（或键名不在局部作用域），绑定落到 **engine 的全局 store**——跨组件共享、需要持久化/联动的正式数据：

<demo html="template/model/source-global.html" />

```js
new AutoTemplateEngine(el, {
    user: { name: "zhang", email: "a@b.com" }, // 全局状态
});
```

```html
<input x-model="user.name" />
<!-- 无局部声明 → 读写均走 store.state.user.name，多组件共享同一份 -->
```

#### 三种来源混用

一个表单可以**同时**从三个来源取数——全局放正式数据、本地放草稿、祖先放分区共享值，各控件按 scope 链各自就近命中：

<demo html="template/model/data-sources.html" />

```html
<div x-data="{ draftName: '', remark: '' }">
    <!-- 本地：本卡片草稿 -->
    <input x-model="draftName" x-model-options="{set:'draftName=$value'}" />
    <!-- ↑ 本地 x-data：草稿，提交前不进全局 -->

    <div x-data="{ section: 'basic' }">
        <!-- 祖先（对更深控件而言）：分区共享 -->
        <input x-model="section" x-model-options="{set:'section=$value'}" />
        <!-- ↑ 祖先 x-data：本分区共享，兄弟卡片同读同写 -->

        <input x-model="user.name" />
        <!-- ↑ 全局状态：正式数据，任何组件改动全站同步 -->
    </div>
</div>
```

::: tip 来源判定规则
读方向：`getContext()` 聚合 `localData > data > state`，同名键**就近覆盖**（本地 > 祖先 > 全局）；写方向：**简单路径直写全局 store**（不经局部域），绑局部字段必须配 `set:'<字段>=$value'` 桥接——详见下文[绑定局部数据](#绑定局部数据)的读写不对称 warning。
:::

### 绑定局部数据

除了支持绑定全局状态外，还支持绑定到最近的`x-data`数据。

#### 局部响应式绑定

`x-model` 也能双向绑定到 [x-data](./x-data.md) 声明的**局部响应式字段**——把表单的临时状态就近放在一起，不必塞进全局 store。但有一个**读写方向不对称**的坑要先讲清：

::: warning 简单路径会「读局部、写全局」——必须用 set 表达式桥接
`x-model` 两条方向走不同支路：

- **读方向**（state→DOM）：经 `scope.watch` 的表达式支路，能读到 x-data 局部字段 ✓
- **写方向**（DOM→state）：**简单路径**走 `setVal` 直写**全局 `store.state.<路径>`**，**绕过** x-data 私有域 ✗

于是 `x-model="count"`（`count` 是 x-data 局部字段）会「读局部、写全局」——读到的是局部值，输入却写进了全局 state.count，二者分裂、demo 跑不通。

**解法**：用 `set` 表达式。`set` 经 `with(scope)` 在 `getContext()` 上执行，其 set 陷阱按 `localData > data` 就近命中**本层** x-data 字段（详见 [action · this.data](../action.md)），读写才同源：

```html
<div x-data="{ count: 0 }">
    <!-- set:'count=$value' 把 DOM 输入写回本层 x-data 的 count -->
    <input x-model="count" x-model-options="{set:'count=$value'}" />
</div>
```

:::

<demo html="template/model/data-bind.html" />

```html
<div x-data="{ count: 0, label: '计数' }">
    <input x-model="count" x-model-options="{set:'count=$value'}" />
    <button @click="reset">重置</button>
</div>
```

action 内改 `this.data.count` 与 `x-model` 的 `set` 写到同一份局部字段，二者双向同步。

#### 多级嵌套绑定

x-data 父子层经 `getContext` 的 parent 链层叠（子覆盖父同名键、未声明键继承）。各级 `x-model` 配 `set` 表达式后，写入按就近命中**只改本层**——子层输入框改子层 user，父层纹丝不动；未覆盖的键（如子层读 `role`）沿链继承父层。

<demo html="template/model/nested-data.html" />

```html
<div x-data="{ user: '张三', role: 'admin' }">
    <input x-model="user" x-model-options="{set:'user=$value'}" />
    <!-- 改父层 user -->
    <div x-data="{ user: '李四', score: 88 }">
        <input x-model="user" x-model-options="{set:'user=$value'}" />
        <!-- 改子层 user -->
        <input x-model.number="score" x-model-options="{set:'score=Number($value)||0'}" />
        <span>{{ role }}</span>
        <!-- 继承父层 -->
    </div>
</div>
```

::: tip 写入命中本层、读取就近继承
`getContext` 的 set 陷阱只改本层已声明键，故各级 `x-model` 输入框各自独立、互不串扰；读方向同名键子覆盖父、未声明键沿 parent 链向上取最近一层。这与 [x-data · 嵌套作用域](./x-data.md#嵌套作用域) 的隔离语义一致。
:::

### 字段元数据

AutoStore 的 `configManager` 为每个状态字段维护一份**字段元数据（schema）**——描述字段「长什么样、如何约束」的描述性信息，区别于字段本身的值。例如 `price: configurable(100, { title: "价格", placeholder: "请输入", min: 0 })` 中，`100` 是字段值，而 `title` / `placeholder` / `min` 是字段的**元数据**。

这些元数据天然对应表单控件的属性（`placeholder` 占位、`title` 提示、`required`/`readonly` 约束、`disabled` 启停、`min`/`max` 范围等）。`x-model` 与 `configManager` 联动，让元数据自动驱动控件属性，免去逐个手写 `:placeholder` / `:disabled` 的重复声明。

联动分两层：**手动绑定**（用 `@` 精确指定绑哪个元数据）与**自动注入**（写一行 `x-model` 引擎按白名单自动合成）。

:::warning 重点
`AutoStore` 的 `configManager`本身也是一个`AutoStore`实例，其管理的字段元数据（schema）也是响应式的，这意味着当更新字段的元数据时，也要实时重新渲染。
:::

#### 手动绑定

当使用`x-bind`绑定状态时，`x-bind` 值含 `@` 时，绑定来源从 `store` 状态切到 `configManager` 元数据。`@` 左侧是**配置状态路径**（定位 schema 条目），右侧是**配置属性路径**（schema 的属性，支持多段嵌套）：

<demo html="template/model/config-ref.html" />

```html
<!-- 绑 schema 的 placeholder 属性 -->
<input :placeholder="order.price@placeholder" />
<!-- 右侧支持嵌套：绑 schema.style.color -->
<input :placeholder="order.price@style.color" />
```

`@` 右侧属性路径支持任意深度嵌套，`schema` 不存在或属性缺失时静默降级。详见 [x-bind · configManager 元数据](./x-bind.md)。

#### 自动注入

更强大的是——**用户只写一行 `x-model`，引擎自动从 `schema` 合成控件原生属性的隐式绑定**。下面一行 `x-model` 自动获得 `placeholder` / `title` / `name` / `readonly` / `min` / `max` 等，并能经 `enable` 控制禁用：

<demo html="template/model/schema-inject.html" />

```html
<input x-model="form.username" />
<!-- 自动注入 placeholder/title/name -->
<input x-model="form.email" />
<!-- 自动注入 readonly/required/name -->
<input type="number" x-model="order.count" />
<!-- 自动注入 min/max/step -->
```

只要 schema 配了对应元数据，引擎按控件 type 自动合成：

| 注入项                                                          | 来源                                                  |
| --------------------------------------------------------------- | ----------------------------------------------------- |
| `placeholder` / `title` / `pattern` / `minlength` / `maxlength` | 通用白名单（所有 text-like 控件）                     |
| `required` / `readonly`                                         | 通用白名单（boolean）                                 |
| `disabled`                                                      | schema 的 `enable` 经 `.invert` **取反映射**          |
| `min` / `max` / `step`                                          | numeric type（number/range/date 等）扩展              |
| `name`                                                          | schema 有用元数据值；无则 `name=路径`；表达式场景跳过 |

**关键规则：**

- **仅注入 schema 实际承载的属性**（动态交集），schema 没配的属性不注入。
- **显式绑定优先**：用户显式写 `:placeholder="..."` 则该项不自动合成。
- **`enable` 反向**：自动合成 `:disabled.invert="path@enable"`（[x-bind `.invert` 修饰符](./x-bind.md#invert)），`enable`（true=可用）取反映射到 `disabled`。改 `schema.enable` 会响应式切换 `disabled`。
- **`name` 默认路径**：schema 无 name 元数据时，`name` 自动取 `x-model` 的状态路径（如 `order.price`），方便表单提交；提供了 name 元数据则用元数据值。

### 字段联动

schema 元数据不止能配静态值——它可以是**计算属性**，引用其他字段的状态值。这样「一个字段的值控制另一个字段」这类**字段联动**就声明在 schema 里，模板侧仍然只写一行 `x-model`，无需手写 `:disabled` 表达式或事件监听。

schema 中**所有注入白名单属性**（`enable` / `placeholder` / `required` / `readonly` / `min` / `max` / `choices`……）都支持计算属性形态，联动维度覆盖：**可编辑性**（enable）、**提示文案**（placeholder）、**校验约束**（required/min/max）、**选项集**（choices）。

#### 工作原理

字段联动原理：**字段的元数据（schema 属性）是一个响应式计算值，其依赖可以是任何响应式数据**——按依赖来源分两级：

**① 元数据 ← 另一个字段的值**（上面三个示例都是）：计算属性经 `ref("path")` 引用其他字段的**状态值**，值变 → 元数据重算 → 注入属性切换。

**② 元数据 ← 另一个字段的元数据**：`configManager` 的 schema 本身是响应式 Proxy——计算属性同样可以引用**其他字段的 schema 属性**。关键在 schema computed 的 `scope` 形态：它是 **configManager 的 state 视图**（键为 `configKey.字段路径` 的 fullKey），而 `ref()` 走的是主 store 的状态——所以引用其他字段的元数据要用 **`scope` 直接按 fullKey 取**：

:::warning 重点
表单字段的任何均属性（如`placeholder`、`disabled`、`title`等等）均可以依赖于其他字段的值，当所依赖的字段值更新时，字段的绑定属性也自动更新。
:::

```js
const { configurable, computed } = AutoStoreSpaces;

new AutoTemplateEngine(
    el,
    {
        gateway: configurable("192.168.0.1", {
            label: "网关",
            enable: true, // 独立开关
        }),
        dns: configurable("8.8.8.8", {
            label: "DNS",
            // dns 的 enable 依赖 gateway 的 enable（元数据 ← 元数据）：
            // 网关被禁用 → DNS 无从生效，随之禁用；网关恢复 → DNS 跟随恢复。
            // scope 是 configManager 视图，按 "<configKey>.<字段>" 取另一字段的 schema
            enable: computed((scope) => scope["network.gateway"]?.enable ?? false),
        }),
    },
    { storeOptions: { configManager, configKey: "network" } },
);
```

```html
<input x-model="gateway" />
<input x-model="dns" />
<!-- 运行时改 schema：configManager.state["network.gateway"].enable = false
     → dns 的 enable 计算属性重算 → dns 输入框随之禁用（元数据沿链传导） -->
```

这就是完整的传导链：**源字段的元数据变化 → 依赖它的计算属性重算 → 目标字段的元数据更新 → 注入绑定切换 DOM**。与「元数据 ← 字段值」共享同一条响应式管线（依赖收集 → 计算属性重算 → `@` 注入深读触发），只是依赖的起点从主 store 状态值换成了 configManager 的 schema 属性。

::: warning scope 与 ref 的寻址区别

- `ref("gateway")` → 主 store 的**状态值**（`state.gateway`）——引用其他字段的**值**用它；
- `scope["configKey.字段"]` → configManager 的 **schema 对象**——引用其他字段的**元数据**用它（取属性如 `.enable`）。
  两者可在同一个计算属性里混用：`ref("advanced") && scope["network.remark"].required`。
  :::

::: tip 适用场景
元数据←元数据适合**语义从属**关系（网关禁用则 DNS 无意义、父选项必填则子选项必填）；元数据←字段值适合**数据驱动**关系（勾选高级模式改变约束、省份切换改变选项集）。
:::

#### 联动一：enable 控制可编辑性

典型场景——IP 配置表单：勾选「DHCP 自动获取」时 IP 输入框应禁用（自动分配无需手填），取消勾选时恢复可编辑：

<demo html="template/model/field-linkage.html" />

```html
<input type="checkbox" x-model="dhcp" />
<!-- 只写 x-model：disabled 由 schema.enable 联动驱动 -->
<input type="text" x-model="ip" />
```

```js
const { configurable, computed } = AutoStoreSpaces;

new AutoTemplateEngine(
    el,
    {
        dhcp: true,
        ip: configurable("192.168.1.1", {
            label: "IP地址",
            // 联动核心：enable 是计算属性，引用主 store 的 dhcp（取反——dhcp 开启则禁用手填）
            enable: computed((scope, { ref }) => !ref("dhcp")),
        }),
    },
    { storeOptions: { configManager, configKey: "network" } },
);
```

dhcp 翻转 → `enable` 计算属性响应式重算 → 引擎自动注入的 `disabled`（enable 取反）随之切换，全程无模板侧代码。

#### 联动二：省市区县三级联动

选项集本身也能联动——`schema.choices` 为计算属性，引用其他字段动态生成选项。级联可以**任意深度链式**：下一级的 choices 引用上一级的值，上一级变化沿链逐级传导。典型如省市区三级联动：

<demo html="template/model/field-cascade.html" />

```html
<select x-model="province">
    <option value="fj">福建</option>
    <option value="zj">浙江</option>
    <option value="js">江苏</option>
    <option value="gd">广东</option>
</select>
<!-- 只写 x-model：选项集由 schema.choices 联动生成，级联逐级传导 -->
<select x-model="city"></select>
<select x-model="district"></select>
```

```js
// 三级选项表（真实行政区划数据，按需裁剪）
const CITIES = {...};
const DISTRICTS = {...};

new AutoTemplateEngine(
    el,
    {
        province: "fj",
        city: configurable("fz", {
            // 一级联动：choices 按 province 生成市级选项
            choices: computed((scope, { ref }) => CITIES[ref("province")] ?? []),
        }),
        district: configurable("gl_fz", {
            // 二级级联：choices 引用 city（而 city 又被 province 联动）——链式传导
            choices: computed((scope, { ref }) => DISTRICTS[ref("city")] ?? []),
        }),
    },
    { storeOptions: { configManager, configKey: "region" } },
);
```

**链式传导（autoSelect 驱动，默认开启）**：province 切换 → city 的 choices 重算（市级选项重建）→ 原 city 值不在新省的选项集 → **自动选中**新集的 `default:true` 项或首项并**回写 state** → district 的 choices 引用新 city 重算 → 同样自动选中——**一级变化沿链逐级归位**，全程零模板代码。

#### 联动三：约束与提示联动

校验约束、提示文案同理——「启用高级模式才必填备注」「根据部署方式启停端口输入」：

<demo html="template/model/field-constraints.html" />

```js
{
    advanced: false,
    deploy: "static",
    remark: configurable("", {
        // required 联动：advanced 开启时必填
        required: computed((scope, { ref }) => ref("advanced")),
        // placeholder 联动：按 advanced 切换提示文案
        placeholder: computed((scope, { ref }) =>
            ref("advanced") ? "必填：说明高级配置原因" : "备注（可选）",
        ),
    }),
    port: configurable(8080, {
        // enable 联动：仅 docker 部署时可编辑（enable→disabled 取反注入）
        enable: computed((scope, { ref }) => ref("deploy") === "docker"),
        placeholder: computed((scope, { ref }) =>
            ref("deploy") === "docker" ? "容器内部端口，如 8080" : "仅 Docker 部署可编辑",
        ),
    }),
}
```

```html
<input type="checkbox" x-model="advanced" />
<select x-model="deploy">
    <option value="static">静态托管</option>
    <option value="docker">Docker 容器</option>
</select>
<input x-model="remark" />
<input x-model.number="port" />
<!-- advanced 勾选 → remark 注入 required + placeholder 切换；
     deploy 切到 docker → port 启用并切提示，其余方式禁用。零模板代码 -->
```

#### 联动链的响应式保证

三层响应式各就其位，任何一环变化都会传导到 DOM：

| 联动层               | 机制                                            | 触发粒度                      |
| -------------------- | ----------------------------------------------- | ----------------------------- |
| 字段值 → 计算属性    | core 响应式系统（`ref()` 收集依赖）             | 字段级精准                    |
| 计算属性 → schema 值 | configManager 的 schema 是响应式 Proxy          | 深层（含 choices 数组项字段） |
| schema → DOM         | 注入绑定（`@` 引用 + collectDependencies 深读） | 属性级精准                    |

choices 深读会收集每个选项项的 `label`/`value`/`group` 字段路径——单项 `label` 变更、增删项、整体替换数组都会触发选项子树重建并重放选中。

## 配置

`x-model` 的指令值是双向绑定的状态路径或表达式（必填）。下列配置项经 `x-model-options` 声明：

| 配置项        | 类型   | 说明                                                                                      |
| ------------- | ------ | ----------------------------------------------------------------------------------------- |
| `get`         | 字符串 | state→DOM 变换：表达式（形参 `value`）或 action 名（当前值作首参）                        |
| `set`         | 字符串 | DOM→state 变换：表达式（形参 `$value`）或 action 名（DOM 值作首参）                       |
| `number`      | 布尔   | 同 `.number` 修饰符                                                                       |
| `trim`        | 布尔   | 同 `.trim` 修饰符                                                                         |
| `boolean`     | 布尔   | 同 `.boolean` 修饰符                                                                      |
| `change`      | 布尔   | 同 `.change` 修饰符                                                                       |
| `multiple`    | 布尔   | 同 `.multiple` 修饰符（select 多选）                                                      |
| `choices`     | 数组   | select 选项列表 `{label?,value?,default?}[]`（优先于 schema.choices，静态 option 最优先） |
| `group`       | 字符串 | select 分组字段名：choices 项按该字段值聚合到 `<optgroup>`                                |
| `autoSelect`  | 布尔   | 值不在选项集时自动选中 `default:true` 项或首项并回写（默认 `true`，见 [select](#select)） |
| `emptyValues` | 数组   | 附加空值集（默认 `[undefined,null,NaN]` 之上追加，见[空值与默认值](#空值与默认值)）       |
| `default`     | 任意   | 空值回填值（模板 > schema.default 两级，静态值 only）                                     |

修饰符在解析期注入为同名指令选项（如 `.number` ≡ `x-model-options="{number:true}"`），二者等价。

::: info 关于指令配置体系
指令选项 / 修饰符 / 宿主选项 / 两层回退的通用机制见[指令配置](../config.md)。
:::

## 注意事项

- **冲突检测（控件感知）**：text-like 与 select 查 `:value` 冲突（竞写 `el.value`），checkbox/radio 查 `:checked` 冲突（竞写 `el.checked`）。`:value` 对 checkbox/radio 放行（设选项值）。
- **控件范围**：支持 text-like、checkbox 单值、radio 单值、select（单选/多选）。checkbox 组 / radio 组收集暂不支持。
- **radio 必须有 value 属性**：缺少 `value`（HTML 默认 `"on"`）时引擎 warn 并跳过绑定。
- **checkbox 写入后值变布尔**：非布尔 state 经 `Boolean()` 宽容显示，但用户操作后写入的是布尔值。
- **select 选中态是严格匹配**：非字符串 state 不勾中任何项（warn 一次），须配 `get:'String(value)'` 或保证 state 为 `string`/`string[]`。
- **schema.choices 在静态模式下被忽略**：模板手写了 `<option>` 即完全放权给模板，schema 的 choices 及其后续响应式变化不再生效。
- **空值回填仅显示层**：`emptyValues`/`default` 只改控件显示（state 不动），写方向不经判空；select 首项默认会被表单提交带上，提交前校验 state。详见[空值与默认值](#空值与默认值)。
- **autoSelect 默认开启（行为变更）**：select 值不在选项集时自动选中 `default:true` 项或首项并**回写 state**（级联联动基石）。依赖旧行为（不勾中不回写）须显式 `autoSelect:false`。详见 [select · 自动选中](#select)。
- **get/set 禁箭头函数**：配置值只能是字符串（relaxed-json 约束），箭头函数字面量会解析失败。
- **安全：get/set 是代码执行点**：表达式经 `new Function` 在当前页面上下文求值（与 x-on/action 同级的既有机制）。**绝不要把用户输入拼进 get/set 表达式**——表达式必须来自开发者编写的模板。编译产物有缓存（同表达式只编译一次），但求值本身不受沙箱保护。若模板来源不可信（如服务端下发、用户提交），须在编译前消毒（sanitize）指令属性。
- **动态改 `x-model` 属性值不支持**：运行时 `setAttribute("x-model", ...)` 改绑定值不生效（编译期解析，首版有意）。
- **循环防护是内置的**：无需手动处理，写入经 flags 标识，read 回调自动跳过自身触发的回写。
- **绑定 x-data 局部字段须配 set 表达式**：简单路径 `x-model="<局部字段>"` 会「读局部、写全局」（写方向经 `setVal` 直写 `store.state` 绕过私有域），导致读写分裂。绑局部字段时务必加 `x-model-options="{set:'<字段>=$value'}"`，详见上文[绑定 x-data 局部数据](#绑定-x-data-局部数据)。
