# 文本插值

## 概述

`x-text` 把状态值绑定到元素的 `textContent`——状态一变，元素的文本内容就自动刷新。它是模板引擎里最常用的指令，用于展示任意状态值或表达式结果。

```html
<span x-text="user.name"></span>
```

工作原理：编译期通过 `scope.watch` 订阅表达式（纯路径走精准订阅，复合表达式走依赖收集），状态变化经调度器微任务合并后只改 `textContent`，**不重建元素**——保留焦点、滚动等运行态。

## 快速入门

下面的例子展示 `x-text` 最典型的用法：绑定路径、绑定表达式、随状态自动更新。点击按钮改状态，文本立即变化。

<demo html="template/text/base.html"/>

```html
<div id="app">
    <p>你好，<span x-text="user.name"></span>！</p>
    <!-- 文本节点里也能直接用双花括号插值 -->
    <p>商品：{{ order.name }}，单价 {{ order.price }} 元</p>
    <!-- x-text 支持任意表达式 -->
    <p>合计：<strong x-text="order.price * order.count"></strong> 元</p>
</div>

<script>
    const { AutoTemplateEngine } = AutoTemplateSpaces;
    const engine = new AutoTemplateEngine(document.getElementById("app"), {
        user: { name: "张三" },
        order: { price: 18, count: 3 },
    });
    // 改状态，DOM 自动更新
    engine.state.user.name = "李四";
</script>
```

## 指南

### 文本插值

除了 `x-text`，还可以在**文本节点**中直接用双花括号插值（花括号内写路径或表达式），效果与 `x-text` 等价——响应式、随状态自动更新。

<demo html="template/text/interpolation.html"/>

```html
<!-- 路径插值 -->
<p>商品：{{ order.name }}，单价 {{ order.price }} 元</p>
<!-- 表达式插值 + 字面量混排 -->
<p>合计：{{ order.price * order.count }} 元（共 {{ order.count }} 件）</p>
```

双花括号适合**一段文本里穿插多个值**（如「商品 X，单价 Y 元」），`x-text` 适合**整个元素内容**由一个表达式决定。两者可在同一模板混用。

::: warning 同元素 x-text 优先
同一元素同时声明 `x-text` 与直接文本里的双花括号插值时，`x-text` 胜出、插值文本被剪枝（不渲染）。要让插值生效，该元素就别用 `x-text`。
:::

### 绑定状态路径

指令值是一个状态路径，引擎会订阅该路径对应的值，支持任意深度。

<demo html="template/text/path.html"/>

```html
<span x-text="user.name"></span> <span x-text="user.address.city"></span>
```

路径遵循当前 `scope` 的相对路径规则（在 `x-for` 项内、`x-data` 局部作用域内可写相对路径，详见[响应式](../reactive.md)）。

### 绑定任意表达式

指令值不限于路径，可以是任意 JavaScript 表达式，引擎自动收集表达式中访问到的所有状态依赖。

<demo html="template/text/expression.html"/>

```html
<!-- 算术 -->
<span x-text="order.price * order.count"></span>
<!-- 字符串拼接 -->
<span x-text="user.first + ' ' + user.last"></span>
<!-- 三元 -->
<span x-text="order.stock > 0 ? '有货' : '缺货'"></span>
```

表达式中访问到的 `price`、`count`、`stock` 等任一状态变化，都会重算并更新。

### 响应式自动更新

只要改响应式状态（`engine.state.*`），所有订阅了该状态的 `x-text` 会在下一个微任务里批量刷新。

<demo html="template/text/reactive.html"/>

```javascript
const engine = new AutoTemplateEngine(el, { count: 0 });
// 同一 tick 内多次赋值，只触发一次 DOM 更新（调度器合并）
engine.state.count = 1;
engine.state.count = 2;
engine.state.count = 3; // 最终渲染 "3"，仅写一次 textContent
```

::: tip 调度合并
同一事件循环 tick 内的多次状态变更会被合并为一次 patch，避免频繁重排。你无需手动批处理。
:::

### 空值渲染

`x-text` 默认把 `null` / `undefined` / `NaN` 渲染为空字符串（而非字面 `"null"` / `"undefined"` / `"NaN"`），其余值经 `String()` 转换。`0` / `""` / `false` 默认**不**算空（`0` 显示 `"0"`）。

<demo html="template/text/nullish.html"/>

```javascript
const engine = new AutoTemplateEngine(el, { user: { nickname: undefined } });
// 渲染为空：<span></span>，而不是 <span>undefined</span>
engine.state.user.nickname = "老张"; // → <span>老张</span>
```

::: tip NaN 归空是有意行为
`NaN` 几乎总是缺失值或计算错误的结果，默认归空比显示 `"NaN"` 更符合预期。需要自定义「哪些值算空」见下文 [空值占位（empty）](#空值占位-empty)。
:::

- **自定义空值渲染**

值为空时默认渲染空串。可通过 `x-text-options` 的 `empty` 指定占位文案，用 `emptyValues` 追加「也算空」的值。

<demo html="template/text/empty.html"/>

```html
<!-- 值为空时显示「暂无数据」 -->
<span x-text="stock" x-text-options="{ empty: '暂无数据' }"></span>

<!-- emptyValues 追加 0：0 也算空，显示「未评分」 -->
<span x-text="score" x-text-options="{ empty: '未评分', emptyValues: [0] }"></span>
```

**`emptyValues` 是「追加」而非「覆盖」**：默认集 `[null, undefined, NaN]` 始终兜底（在代码内硬编码），声明的值附加到默认集——无需重写默认成员。

::: warning emptyValues 无法写入 undefined / NaN
`x-*-options` 的值用宽松 JSON 解析：`undefined` 会被解析成字符串 `"undefined"`、`NaN` 会解析报错。所以 `emptyValues` 只适合追加 `0` / `""` / `false` 这类 JSON 能表达的值；`null` / `undefined` / `NaN` 由默认集保证，不必也无法写在 `emptyValues` 里。
:::

::: tip 动态占位文案？用主表达式
`empty` 是**静态字面量**，不随状态变。若占位内容本身需要响应式，直接写进指令表达式：

```html
<span x-text="stock ?? fallbackMsg"></span>
```

`stock` 为 `null` / `undefined` 时显示 `fallbackMsg`，且 `fallbackMsg` 变化也会刷新。
:::

- **空值隐藏**

加上 `.hide` 后，绑定值为空时不再写占位文案，而是把**整个宿主元素** `display: none`（隐藏且不占位）；值恢复非空时还原原来的 `display`（如原来是 `flex` 就恢复 `flex`）。

<demo html="template/text/hide.html"/>

```html
<!-- user.name 为空时，整张卡片消失；有值时显示并还原 display:flex -->
<div style="display:flex" x-text.hide="user.name"></div>
```

`.hide` 与 `empty` 并存时 **`.hide` 优先**：元素直接隐藏，`empty` 文案不生效。要占位文案就用 `empty`，要整块消失就用 `.hide`。

::: info 还原 display 的细节
`.hide` 只读写**内联** `style.display`：隐藏前缓存原内联值（如 `flex` 或空串），恢复时原样还原。若 `display` 来自 CSS 类（内联为空），恢复后还原为空串、CSS 类重新接管——不会被固化成内联值。
:::

## 配置

`x-text` 的指令值是绑定的表达式（必填）。下列配置项控制空值行为（指令选项经 `x-text-options` 声明、可经 `x-options` 元素级回退）；带 ✅ 者可用修饰符方式启用。

| 配置项        | 默认值 | 修饰符 | 说明                                                                                    |
| ------------- | ------ | ------ | --------------------------------------------------------------------------------------- |
| `empty`       | `""`   |        | 值为空时渲染的占位内容（静态字面量，不响应式）                                          |
| `emptyValues` | `[]`   |        | 追加「也算空」的值，如 `[0, ""]`；追加到默认集 `[null, undefined, NaN]`（始终兜底）     |
| `.hide`       | 未启用 | ✅     | 值为空时隐藏宿主元素（`display:none`，恢复时还原原内联 display）；与 `empty` 并存时优先 |

::: info 关于指令配置体系
指令选项 `x-{name}-options`、修饰符、宿主选项 `x-options`、两层回退的通用机制见[指令配置](../config.md)。`empty` / `emptyValues` / `.hide` 同样适用于 [x-html](./x-html.md)（x-html 的 `empty` 占位串会过消毒）。
:::

## 注意事项

- **NaN 默认渲染为空**：`NaN` 与 `null` / `undefined` 一样归入默认空值集，渲染空串而非 `"NaN"`。
- **与 `x-html` 同元素时让步**：同一元素同时声明 `x-text` 与 `x-html` 时，`x-html` 优先，`x-text` 静默不生效（避免二者竞争写入内容）。需要渲染 HTML 片段请用 [x-html](./x-html.md)。
- **空指令值会被忽略**：`<span x-text="">` 不报错，但也不会绑定任何东西。
- **`x-text` 会转义内容**：绑定值始终作为纯文本写入 `textContent`，HTML 标签会被转义显示。需要注入 HTML 请用 `x-html`。
- **原始 HTML 中的插值语法**：在不使用 `x-text` 的元素里，文本节点里的双花括号插值同样会响应式更新，详见[响应式](../reactive.md)。
