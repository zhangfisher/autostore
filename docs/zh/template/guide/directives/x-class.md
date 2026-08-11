# 类名绑定

## 概述

`x-class` 把状态绑定到元素的 `class`。它是 `:class` 的**全称别名**——解析期归一化为 `x-bind` + `class` 参数，没有独立指令类，行为与 [`:class`](./x-bind.md#绑定-class) 完全一致，按 diff 增量更新。

```html
<span x-class="{ val: on, muted: !on }">状态</span>
<!-- 等价写法 -->
<span :class="{ val: on, muted: !on }">状态</span>
<span x-bind:class="cls">状态</span>
```

## 快速入门

<demo html="template/bind/class.html"/>

```html
<span :class="{ val: on, muted: !on }">状态</span>
```

## 指南

### 对象写法

键为类名、值为真则启用：

<demo html="template/bind/class-object.html"/>

```html
<span :class="{ val: user.active, 'is-loading': user.busy }">状态</span>
```

### 数组写法

合并多个类；`falsy` 项（如 `cond && 'val'`）会被自动跳过：

<demo html="template/bind/class-array.html"/>

```html
<span :class="['card', theme, user.active && 'val']">标签</span>
```

### 字符串写法

直接给类名字符串：

<demo html="template/bind/class-string.html"/>

```html
<span :class="theme">主题</span>
```

### 响应式切换

`:class` 的表达式随状态自动求值并 patch——改 `engine.state` 中被引用的路径，类名立即按 diff 增删，无需手动操作 DOM。多个状态可同时驱动同一元素的 class（对象写法还支持计算键），且与静态 `class="..."` 共存（diff 只管自己写入的 token）：

<demo html="template/bind/class-reactive.html"/>

```html
<!-- selected / done / 优先级各自独立变化，class 自动 diff；静态 task 类常驻 -->
<div
    class="task"
    :class="{ selected: task.selected, done: task.done, ['pri-' + task.priority]: true }"
>
    {{ task.title }}
</div>
```

更完整的说明（diff 更新、与静态 class 共存）见 [x-bind · 绑定 class](./x-bind.md)。

## 配置

`x-class` 的指令值即类名表达式，**无独立指令选项与修饰符**。

## 注意事项

- `x-class` / `:class` / `x-bind:class` 三者**完全等价**，任选其一。
- `:class` 绑定与静态 `class="..."` 是两套来源，避免互相依赖（diff 只管自己写入的 token）。
- 完整能力与边界见 [x-bind](./x-bind.md)。
