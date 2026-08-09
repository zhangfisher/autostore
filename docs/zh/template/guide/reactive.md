# 响应式

## 概述

「响应式」指**状态变化自动驱动 DOM 更新**。本章从全局视角讲清这套机制：插值的两种形式、作用域与路径规则、以及改状态的方式。具体指令（`x-text` / `x-bind`）的细节见各自文档。

## 响应式如何工作

```
改 engine.state.*  →  各指令的 watcher 被触发  →  调度器微任务合并  →  只 patch 受影响节点
```

1. **编译期订阅**：每条指令（`x-text`、双花括号插值、`:bind` 等）在编译时通过 `scope.watch` 订阅自己表达式中访问到的状态路径。
2. **状态变更触发**：改 `engine.state` 任意路径，订阅了该路径的 watcher 被通知。
3. **调度合并**：同一 tick 内的多次变更合并为一次 patch。
4. **细粒度 patch**：只重写受影响节点的 `textContent` / 属性，不重建整棵子树，保留焦点、滚动等运行态。

## 文本插值

文本节点里的双花括号插值（花括号内写路径或表达式），效果与 `x-text` 等价：

```html
<!-- 一段文本穿插多个值 -->
<p>{{ user.name }}（{{ user.age }} 岁）</p>
<!-- 表达式 -->
<p>合计：{{ order.price * order.count }} 元</p>
```

文本插值按段拆分——每个插值段独立订阅，字面量段是静态文本节点。

## 属性插值

属性值里也能用插值，引擎在编译期把它**归一化为属性绑定**（等价 `:attr`），复用 `x-bind` 的分派逻辑：

```html
<!-- href 里插值 -->
<a href="/users/{{ user.id }}">主页</a>
<!-- class 里插值：字面量 + 状态混排 -->
<span class="card {{ user.role }}">标签</span>
<!-- 整个值就是一个插值：保留原生类型 -->
<input disabled="{{ form.locked }}" />
```

::: tip 整体单段 vs 混合段
整个属性值恰好是一个插值时（整个属性就是一对双花括号），引擎保留值的原始类型（boolean 就是 boolean）；字面量与插值混排时，按字符串拼接。后者规避了布尔属性写成字符串恒真的 HTML 坑。
:::

## 作用域与路径

指令值里的路径，按当前**作用域（scope）**解析。作用域有层次：

| 写法 | 解析为 |
| --- | --- |
| `user.name` | 当前 scope 的相对路径（默认指向全局 state） |
| `name`（在 `x-for` 项内） | 指向当前迭代项的字段 |
| `name`（在 `x-data` 局部作用域内） | 指向该元素声明的局部数据 |
| `$store.user.name` | 显式访问全局 store（绕过局部覆盖） |

`x-for` 的迭代项、`x-data` 的局部变量会**覆盖**同名全局状态——在局部作用域内写 `item` 拿到的是局部变量，要访问全局同名成员得用 `$store.item`。

## 改状态的方式

```javascript
// 1. 直接改响应式句柄（最常用）
engine.state.user.name = "李四";

// 2. 在动作里改（推荐：与事件绑定）
actions: {
    rename: () => { engine.state.user.name = "李四"; }
}

// 3. 运行时给某元素注入局部数据（触发该 scope 子树重算）
engine.data(el, { temp: "临时值" });
```

## demo

下面的例子同时演示文本插值、属性插值（href）与响应式更新——切换用户，所有插值立即变化。

<demo html="template/reactive/interpolation.html"/>

---

下一步：[动作](./action.md)了解事件如何驱动状态变更。
