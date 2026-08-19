# x-model 双向绑定

## 概述

在表单控件上实现**双向绑定**——用户输入自动写回状态，状态变化自动同步到控件值。相当于 `x-on:input`（写回）与 `:value`（同步）的声明式合写，并额外支持值的读写变换与循环防护。

```html
<input x-model="user.name" />
<p>你好，{{ user.name }}</p>
```

::: tip 适用控件
支持 **text-like 控件**（`<input>` 非 checkbox/radio + `<textarea>`）、**checkbox 单值布尔** 和 **radio 单值选择**。select / checkbox 组 / radio 组收集暂不支持。
:::

## 快速入门

<demo html="template/model/all-input-types.html" />

`x-model="path"` 的 `path` 是状态路径（必填）。输入即写回状态、状态变化同步回输入框，无需手动监听 `input` 事件。上例覆盖了 text / number / email / password / textarea / checkbox / radio / select 的完整用法。

## 指南

### 嵌套路径

`x-model` 支持多层状态路径：

<demo html="template/model/nested.html" />

```html
<input x-model="user.address.city" />
<input x-model="user.address.street" />
```

### 控件类型

x-model 支持三类控件，读写语义各不相同：

| 控件 | 读方向（state→DOM） | 写方向（DOM→state） | 默认事件 |
| --- | --- | --- | --- |
| text-like | `el.value = String(state)` | `state = el.value` | `input` |
| checkbox | `el.checked = Boolean(state)` | `state = el.checked`（布尔） | `input` |
| radio | `el.checked = (state === el.value)` | `state = el.value`（仅勾选时） | `input` |

#### text input

所有 text-like 控件（`text` / `email` / `password` / `url` / `tel` / `search`）统一读写 `el.value`（字符串）：

<demo html="template/model/text-input.html" />

```html
<input type="text" x-model="form.username" />
<input type="email" x-model="form.email" />
<input type="number" x-model.number="form.age" />
```

修饰符控制值转换：`.number` 写回前 `Number()` 转换，`.trim` 去除首尾空格。详见[修饰符](#修饰符)。

#### textarea

`<textarea>` 统一读写 `el.value`，用法与 text input 一致：

<demo html="template/model/textarea.html" />

```html
<textarea x-model="form.bio" placeholder="自我介绍"></textarea>
```

#### checkbox 单值布尔

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

修饰符（`.trim` / `.number`）对 checkbox 无意义（空转，不报错）。

#### radio 单值选择

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

### 修饰符

默认监听 `input` 事件（实时同步）。三个修饰符控制同步时机与值转换：

| 修饰符     | 等价配置                              | 说明                                                   |
| ---------- | ------------------------------------- | ------------------------------------------------------ |
| `.number`  | `x-model-options="{number:true}"`     | 写回前 `Number()`，`NaN` 回退原字符串（避免字符串污染）|
| `.trim`    | `x-model-options="{trim:true}"`       | 写回前去除首尾空格                                     |
| `.change`  | `x-model-options="{change:true}"`     | 监听 `change` 事件（失焦触发）而非 `input`（实时）     |

#### `.number`：避免字符串污染计算属性

不加 `.number` 时，`<input type="number">` 的值是字符串，`price * count` 会变成字符串拼接：

<demo html="template/model/modifiers-number.html" />

#### `.trim`

<demo html="template/model/modifiers-trim.html" />

#### `.change`

<demo html="template/model/modifiers-change.html" />

写回管道顺序：`el.value` →（`.trim`）→（`.number`）→ `$value` → set 或直写状态。

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

### 绑定 x-data 局部数据

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

### 多级嵌套 x-data 绑定

x-data 父子层经 `getContext` 的 parent 链层叠（子覆盖父同名键、未声明键继承）。各级 `x-model` 配 `set` 表达式后，写入按就近命中**只改本层**——子层输入框改子层 user，父层纹丝不动；未覆盖的键（如子层读 `role`）沿链继承父层。

<demo html="template/model/nested-data.html" />

```html
<div x-data="{ user: '张三', role: 'admin' }">
    <input x-model="user" x-model-options="{set:'user=$value'}" /> <!-- 改父层 user -->
    <div x-data="{ user: '李四', score: 88 }">
        <input x-model="user" x-model-options="{set:'user=$value'}" /> <!-- 改子层 user -->
        <input x-model.number="score" x-model-options="{set:'score=Number($value)||0'}" />
        <span>{{ role }}</span> <!-- 继承父层 -->
    </div>
</div>
```

::: tip 写入命中本层、读取就近继承
`getContext` 的 set 陷阱只改本层已声明键，故各级 `x-model` 输入框各自独立、互不串扰；读方向同名键子覆盖父、未声明键沿 parent 链向上取最近一层。这与 [x-data · 嵌套作用域](./x-data.md#嵌套作用域) 的隔离语义一致。
:::

### 循环防护

双向绑定有一个循环风险：用户输入写回 state → state 变化触发 read 回调写回 DOM → 若 get 变换存在，会**立即覆盖用户刚输入的内容**。

`x-model` 内置防循环机制：写入 state 时标记本次写回，随之而来的 read 回调识别出「自己触发的」并跳过 DOM 回写。其他来源的 state 变化（如外部代码改状态、其他 x-model 实例）仍正常更新显示。

这一机制对用户透明，无需手动配置。写入经 `store.update(fn, {flags})` 承载标识，供 syncer 等其他消费者识别。

### 字段元数据

AutoStore 的 `configManager` 为每个状态字段维护一份**字段元数据（schema）**——描述字段「长什么样、如何约束」的描述性信息，区别于字段本身的值。例如 `price: configurable(100, { title: "价格", placeholder: "请输入", min: 0 })` 中，`100` 是字段值，而 `title` / `placeholder` / `min` 是字段的**元数据**。

这些元数据天然对应表单控件的属性（`placeholder` 占位、`title` 提示、`required`/`readonly` 约束、`disabled` 启停、`min`/`max` 范围等）。`x-model` 与 `configManager` 联动，让元数据自动驱动控件属性，免去逐个手写 `:placeholder` / `:disabled` 的重复声明。

联动分两层：**手动绑定**（用 `@` 精确指定绑哪个元数据）与**自动注入**（写一行 `x-model` 引擎按白名单自动合成）。

#### 手动绑定：`:attr` 的 `@` 分隔符

`x-bind` 值含 `@` 时，绑定来源从 store 状态切到 configManager 元数据。`@` 左侧是**配置状态路径**（定位 schema 条目），右侧是**配置属性路径**（schema 的属性，支持多段嵌套）：

<demo html="template/model/config-ref.html" />

```html
<!-- 绑 schema 的 placeholder 属性 -->
<input :placeholder="order.price@placeholder" />
<!-- 右侧支持嵌套：绑 schema.style.color -->
<input :placeholder="order.price@style.color" />
```

`@` 右侧属性路径支持任意深度嵌套，schema 不存在或属性缺失时静默降级。详见 [x-bind · configManager 元数据](./x-bind.md)。

#### 自动注入：x-model 自动合成控件属性

更强大的是——**用户只写一行 `x-model`，引擎自动从 schema 合成控件原生属性的隐式绑定**。下面一行 `x-model` 自动获得 `placeholder` / `title` / `name` / `readonly` / `min` / `max` 等，并能经 `enable` 控制禁用：

<demo html="template/model/schema-inject.html" />

```html
<input x-model="form.username" />        <!-- 自动注入 placeholder/title/name -->
<input x-model="form.email" />           <!-- 自动注入 readonly/required/name -->
<input type="number" x-model="order.count" />  <!-- 自动注入 min/max/step -->
```

只要 schema 配了对应元数据，引擎按控件 type 自动合成：

| 注入项                                                              | 来源                                          |
| ------------------------------------------------------------------ | -------------------------------------------- |
| `placeholder` / `title` / `pattern` / `minlength` / `maxlength`    | 通用白名单（所有 text-like 控件）              |
| `required` / `readonly`                                            | 通用白名单（boolean）                         |
| `disabled`                                                         | schema 的 `enable` **取反映射**               |
| `min` / `max` / `step`                                             | numeric type（number/range/date 等）扩展      |
| `name`                                                             | schema 有用元数据值；无则 `name=路径`；表达式场景跳过 |

**关键规则：**

- **仅注入 schema 实际承载的属性**（动态交集），schema 没配的属性不注入。
- **显式绑定优先**：用户显式写 `:placeholder="..."` 则该项不自动合成。
- **`enable` 反向**：schema 的 `enable`（true=可用）映射到 `disabled` 时值取反（enable=false → 禁用）。改 `schema.enable` 会响应式切换 `disabled`。
- **`name` 默认路径**：schema 无 name 元数据时，`name` 自动取 `x-model` 的状态路径（如 `order.price`），方便表单提交；提供了 name 元数据则用元数据值。

## 配置

`x-model` 的指令值是双向绑定的状态路径或表达式（必填）。下列配置项经 `x-model-options` 声明：

| 配置项   | 类型   | 说明                                                                |
| -------- | ------ | ------------------------------------------------------------------- |
| `get`    | 字符串 | state→DOM 变换：表达式（形参 `value`）或 action 名（当前值作首参）  |
| `set`    | 字符串 | DOM→state 变换：表达式（形参 `$value`）或 action 名（DOM 值作首参） |
| `number` | 布尔   | 同 `.number` 修饰符                                                 |
| `trim`   | 布尔   | 同 `.trim` 修饰符                                                   |
| `change` | 布尔   | 同 `.change` 修饰符                                                 |

修饰符在解析期注入为同名指令选项（如 `.number` ≡ `x-model-options="{number:true}"`），二者等价。

::: info 关于指令配置体系
指令选项 / 修饰符 / 宿主选项 / 两层回退的通用机制见[指令配置](../config.md)。
:::

## 注意事项

- **冲突检测（控件感知）**：text-like 查 `:value` 冲突（竞写 `el.value`），checkbox/radio 查 `:checked` 冲突（竞写 `el.checked`）。`:value` 对 checkbox/radio 放行（设选项值）。
- **控件范围**：支持 text-like、checkbox 单值、radio 单值。select / checkbox 组 / radio 组收集暂不支持。
- **radio 必须有 value 属性**：缺少 `value`（HTML 默认 `"on"`）时引擎 warn 并跳过绑定。
- **checkbox 写入后值变布尔**：非布尔 state 经 `Boolean()` 宽容显示，但用户操作后写入的是布尔值。
- **get/set 禁箭头函数**：配置值只能是字符串（relaxed-json 约束），箭头函数字面量会解析失败。
- **动态改 `x-model` 属性值不支持**：运行时 `setAttribute("x-model", ...)` 改绑定值不生效（编译期解析，首版有意）。
- **循环防护是内置的**：无需手动处理，写入经 flags 标识，read 回调自动跳过自身触发的回写。
- **绑定 x-data 局部字段须配 set 表达式**：简单路径 `x-model="<局部字段>"` 会「读局部、写全局」（写方向经 `setVal` 直写 `store.state` 绕过私有域），导致读写分裂。绑局部字段时务必加 `x-model-options="{set:'<字段>=$value'}"`，详见上文[绑定 x-data 局部数据](#绑定-x-data-局部数据)。
