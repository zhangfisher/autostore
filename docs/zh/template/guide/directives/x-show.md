# x-show 条件可见性

## 概述

`x-show` 根据表达式真假切换宿主元素的**可见性**：为假时置内联 `display:none`，为真时还原。**宿主元素始终留在 DOM**，变的只是看不看得见。

```html
<div x-show="visible">
    <p>visible 为假时只是看不见，节点仍在 DOM</p>
</div>
```

::: tip 与 x-if 的区别
`x-if` 切**存在性**（假时宿主离开 DOM，不被 `querySelector`/表单提交命中）；`x-show` 切**可见性**（假时 `display:none`，宿主永留 DOM，仍被命中）。两者是各自独立的指令，详见 [x-if](./x-if.md)。
:::

## 快速入门

<demo html="template/show.html"/>

```html
<button @click="toggle">{{ visible ? "隐藏" : "显示" }}详情</button>
<div x-show="visible">
    <p class="card">详情内容</p>
</div>
```

## 指南

### 假时 display:none，宿主永留 DOM

`x-show="expr"` 为假时，宿主元素被置 `style="display:none"`，但**不从 DOM 移除**：

- 仍被 `querySelector` / `querySelectorAll` 命中；
- 仍占 `:nth-child` 计数位；
- 表单控件（`<input>`/`<select>`/`<textarea>`）的值**仍被 `<form>` 提交**；
- 子树 DOM 与 watcher **全保留**——重新显示时是同一个元素实例，隐藏期间的变更照常生效。

```javascript
engine.state.visible = false; // display:none，宿主仍在 DOM、watcher 存活
engine.state.visible = true; // 还原 display，原元素实例继续
```

<demo html="template/show.html"/>

### 适合「频繁切换」与「保留 DOM 占位」

因不重建 DOM、只切内联 `display`，`x-show` 切换成本极低，适合频繁显隐。又因宿主永留 DOM，适合需要保留 `:nth-child` 位、或让 CSS/外部 JS 仍能选中节点的场景。

### 与 x-if / x-if.keepalive 的选择

三者核心差别：

| 指令             | 假时宿主               | 子树     | 表单提交   | ownsChildren |
| ---------------- | ---------------------- | -------- | ---------- | ------------ |
| `x-if`（eager）  | 离开 DOM（detach）     | 销毁重建 | 不提交     | true         |
| `x-if.keepalive` | 离开 DOM（detach）     | 保活     | 不提交     | false        |
| `x-show`         | 留 DOM（display:none） | 保活     | **仍提交** | false        |

选型建议：

- 假时要彻底离开 DOM（不提交/不命中/不占位）→ `x-if` 或 `x-if.keepalive`；
- 假时只是看不见、节点要留在 DOM → `x-show`；
- 频繁切换、追求最低切换成本 → `x-show`；
- 假时保留子树状态、但宿主要离开 DOM → `x-if.keepalive`。

### 与 x-for 共存

`x-show` 不占子树（ownsChildren=false），可与 `x-for` 同元素共存：`x-for` 独占子树做列表，`x-show` 只切容器的 display。

```html
<!-- 列表始终渲染，只切整个 <ul> 的可见性 -->
<ul x-for="item of items" :key="item.id" x-show="listVisible">
    <li x-text="item.name"></li>
</ul>
```

## 配置

`x-show` 的指令值是条件表达式（必填）。它没有额外的修饰符或指令选项——切换的就是宿主的内联 `display`。

::: info 关于指令配置体系
指令选项 / 修饰符 / 宿主选项 / 两层回退见[指令配置](../config.md)。
:::

## 注意事项

- **宿主永留 DOM**：`x-show` 只切 `display`，宿主始终在 DOM。要让节点真正离开 DOM（不被提交/命中/占位），用 `x-if` 或 `x-if.keepalive`。
- **假时仍被表单提交**：`display:none` 的表单控件值仍会提交。若要假时不提交，改用 `x-if` / `x-if.keepalive`（detach）。
- **display 还原策略**：重新显示时内联 `display` 被清空（交还 CSS 接管），不记忆隐藏前的原内联 `display` 值；若宿主依赖内联 `display`（如 `flex`/`grid`），改用 CSS 类管理。
