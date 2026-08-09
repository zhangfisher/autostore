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

### 对象写法（驼峰 key）

对象经 `Object.assign(el.style, value)` 合并，key 必须是 `CSSStyleDeclaration` 的属性名（**驼峰**）：

```html
<p :style="{ color: '#42b883', fontSize: '16px', backgroundColor: '#f0fff4' }">文本</p>
```

### 字符串写法（cssText）

字符串作为 `cssText` 整体替换（用连字符没问题）：

```html
<p :style="'color:#42b883;font-size:16px'">文本</p>
```

::: warning 对象 key 用驼峰
对象写法的 key 若用连字符（`font-size`）不生效；字符串写法用连字符没问题。
:::

更完整的说明（含响应式切换、与插值的配合）见 [x-bind · 绑定 style](./x-bind.md)。

## 配置

`x-style` 的指令值即样式表达式，**无独立指令选项与修饰符**。元数据与 `x-bind` 一致（详见 [x-bind 配置](./x-bind.md#配置)）。

## 注意事项

- `x-style` / `:style` / `x-bind:style` 三者**完全等价**，任选其一。
- 对象 key 用驼峰，字符串用连字符。
- 完整能力与边界见 [x-bind](./x-bind.md)。
