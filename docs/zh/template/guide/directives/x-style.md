# x-style 样式绑定

## 概述

`x-style` 把状态绑定到元素的内联 `style`。它是 `:style` 的**全称别名**——解析期归一化为 `x-bind` + `style` 参数，没有独立指令类，行为与 [`:style`](./x-bind.md#绑定-style) 完全一致。

```html
<p x-style="{ color: msg.color, fontSize: msg.size + 'px' }">文本</p>
<!-- 等价写法 -->
<p :style="{ color: msg.color, fontSize: msg.size + 'px' }">文本</p>
<p x-bind:style="msg.style">文本</p>
```

## 快速入门

<demo html="template/bind/style.html"/>

```html
<p :style="msg.style">{{ msg.text }}</p>
```

## 指南

### 对象写法

对象经 `Object.assign(el.style, value)` 合并，key 必须是 `CSSStyleDeclaration` 的属性名（**驼峰**）：

<demo html="template/bind/style-object.html"/>

```html
<p :style="{ color: '#42b883', fontSize: '16px', backgroundColor: '#f0fff4' }">文本</p>
```

::: tip 两套对象切换时 key 集要一致
合并是 `Object.assign`，新对象里没有的旧属性**不会被清除**。在两套样式间切换时让它们的 key 集合相同，否则会出现残留（例如取消加粗后 `fontWeight` 依旧生效）。
:::

### 字符串写法

字符串作为 `cssText` 整体替换（用连字符没问题）：

<demo html="template/bind/style-string.html"/>

```html
<p :style="'color:#42b883;font-size:16px'">文本</p>
```

::: warning 对象 key 用驼峰
对象写法的 key 若用连字符（`font-size`）不生效；字符串写法用连字符没问题。
:::

### 响应式切换

`:style` 的表达式随状态自动求值并 patch——改 `engine.state` 中被引用的路径，内联样式立即更新，无需手动操作 DOM。无论对象里的单个属性、整段字符串，还是在多套样式间用三元选择，都是响应式的：

<demo html="template/bind/style-reactive.html"/>

```html
<!-- 字号、颜色、加粗均随 state 实时变化 -->
<p
    :style="{ color: theme.color, fontSize: theme.size + 'px', fontWeight: theme.bold ? '700' : '400' }"
>
    文本
</p>
```

### 过渡动画

给 `x-style` 加 `.transition` 修饰符，引擎会在每次写样式时注入一条 CSS `transition` 声明，让内联样式的变化被浏览器**自动过渡动画**——无需手写 `transition` 到样式对象里：

<demo html="template/bind/style-transition.html"/>

```html
<!-- 默认 transition:all 0.3s ease-in，尺寸/颜色变化自动过渡 -->
<div x-style.transition="box.on ? box.big : box.small"></div>
```

**默认值与覆盖**：`.transition`（无值）注入默认值 `all 0.3s ease-in`。要自定义，用 `x-bind-options` 传字符串（指令选项层显式优先于修饰符）：

```html
<!-- 覆盖为 all 0.8s ease-out -->
<div x-style.transition="s" x-bind-options="{transition:'all 0.8s ease-out'}"></div>
<!-- 关闭（显式 false，与 ADR-0007「显式 false 生效」一致） -->
<div x-style.transition="s" x-bind-options="{transition:false}"></div>
```

::: tip 三级优先
当 `transition` 值来自多处时，按以下顺序取一个生效（高优先级先命中）：

1. **样式对象自带的 `transition` key**（显式，最高）——对象里写了 `transition` 就用它；
2. **指令配置**（`x-bind-options` 传字符串覆盖、或 `.transition` 注入的 `true`）；
3. **默认值** `all 0.3s ease-in`（仅当 `.transition` 修饰符存在时）。

故对象里写 `transition:'none'` 可临时关掉某次动画；`x-bind-options="{transition:false}"` 可整条关闭注入。
:::

::: warning 为什么是「每次写都注入」而不是设一次
字符串写法走 `el.style.cssText = value` **整体替换**，会擦掉之前一次性写入的 `transition`。故 `.transition` 在每次 patch 内部合并注入，保证两种写法下都生效。详见 ADR-0015。
:::

其余边界（与插值的配合等）见 [x-bind · 绑定 style](./x-bind.md)。

## 配置

`x-style` 的指令值即样式表达式。下列配置项控制过渡动画注入（带 ✅ 者可用修饰符方式启用）。

| 配置项        | 默认值 | 修饰符 | 说明                                                                                                                                                                                                                                |
| ------------- | ------ | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.transition` | 未启用 | ✅     | 注入 CSS `transition` 让样式变化自动过渡。`.transition`（无值）注入默认 `all 0.3s ease-in`；`x-bind-options` 传字符串覆盖、`false` 关闭。仅 `attr === 'style'` 生效。详见[过渡动画 `.transition`](#过渡动画-transition) 与 ADR-0015 |

::: info 关于指令配置体系
指令选项 `x-{name}-options`、修饰符、宿主选项 `x-options`、两层回退的通用机制见[指令配置](../config.md)。注意 `x-style` 归一化为 `bind`，故 `x-style-options` 静默丢弃、不生效；覆盖 `transition` 须用 `x-bind-options`（详见 ADR-0015）。
:::

## 注意事项

- `x-style` / `:style` / `x-bind:style` 三者**完全等价**，任选其一。
- 对象 key 用驼峰，字符串用连字符。
- 完整能力与边界见 [x-bind](./x-bind.md)。
