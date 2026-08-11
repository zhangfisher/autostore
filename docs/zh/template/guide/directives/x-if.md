# 条件渲染

## 概述

`x-if` 根据表达式真假，控制元素的**存在性**：表达式为假时，**宿主元素本身离开 DOM**（detach），原位留一个锚点注释作书签；为真时再挂回。变的不只是显隐，而是**节点是否在 DOM 树中**。

```html
<div x-if="show">
    <p>条件为真时显示</p>
</div>
```

它有两种模式：**eager**（默认，真则编译子树、假则销毁子树）与 **keepalive**（假时仅摘除宿主、子树与 watcher 全部保留）。

::: tip 与 x-show 的区别
`x-show` 切**可见性**（假时 `display:none`，宿主永留 DOM，仍被表单提交/`querySelector` 命中）；`x-if` 切**存在性**（假时宿主离开 DOM）。两者是各自独立的指令，详见 [x-show](./x-show.md)。
:::

## 快速入门

<demo html="template/if/eager.html"/>

```html
<button @click="toggle">{{ show ? "隐藏" : "显示" }}详情</button>
<div x-if="show">
    <p class="card">详情内容</p>
</div>
```

## 指南

### eager 模式（默认）

默认 `x-if="expr"` 是**结构指令**：表达式为真时编译并挂载子树；为假时**摘除宿主**（detach，锚点注释占位）+ 移除子树 DOM + **销毁子 scope**（子树 watcher 一并 off）。

<demo html="template/if/eager.html"/>

```javascript
engine.state.show = false; // 宿主离开 DOM、子树移除、watcher 销毁
engine.state.show = true; // 宿主挂回、子树重新编译挂载、watcher 重建
```

宿主离开 DOM 意味着假时：不被 `querySelector` 命中、不占 `:nth-child` 计数位、不被 `<form>` 提交。

eager 适合「假时彻底卸载」的场景——省掉隐藏期间的订阅与渲染开销。

### keepalive 模式（x-if.keepalive）

`.keepalive` 修饰符假时同样**摘除宿主**（detach，锚点注释占位），但**子树与 watcher 全部保留**；真时**原宿主 reattach**（同一个元素实例，状态保留）：

<demo html="template/if/keepalive.html"/>

```html
<div x-if.keepalive="on">...</div>
```

keepalive 适合「假时要保留子树状态」的场景——隐藏期间 watcher 仍存活、继续 patch 到已 detach 的子树；重新挂回的是**同一个** DOM 实例（非 state 的 DOM 状态如焦点、滚动位置也一并保留）。

::: info eager 与 keepalive 的唯一差别
eager 假时**销毁子树**（真时重新编译重建）；keepalive 假时**保活子树**（真时原实例挂回）。两者假时都摘除宿主（detach），都不被表单提交/`querySelector` 命中。
:::

### 与 x-for 的关系

- **eager 模式禁止与 `x-for` 同元素**（二者都要独占子树，语义冲突，编译期报错）。需要时用外层包裹，或改用 `x-show` / `x-if.keepalive`（均不占子树）。
- **keepalive 模式可与 `x-for` 共存**：`x-for` 独占子树做列表，`x-if.keepalive` 只切容器的存在性。

### 叶子元素

叶子元素（无子树，如 `<hr x-if>`、`<input x-if>`）两态等价——假时均退化为**摘除宿主**（detach）。

## 配置

`x-if` 的指令值是条件表达式（必填）。下列配置项控制条件为假时的处理方式；带 ✅ 者可用修饰符方式启用。

| 配置项       | 默认值 | 修饰符 | 说明                                                                                |
| ------------ | ------ | ------ | ----------------------------------------------------------------------------------- |
| `.keepalive` | 未启用 | ✅     | 假时摘宿主但保活子树与 watcher（真时原宿主 reattach）；默认 eager 假时销毁/重建子树 |

::: info 关于指令配置体系
指令选项 / 修饰符 / 宿主选项 / 两层回退见[指令配置](../config.md)。
:::

## 注意事项

- **宿主随条件离开/回到 DOM**：`x-if` 控制的是宿主本身的存在性——假时宿主离开 DOM（锚点注释占位）、真时挂回。这与 `x-show`（宿主永留 DOM、仅切 `display`）正交。要连父容器一起移除，把 `x-if` 上移一层。
- **eager 与 x-for 互斥**：同元素同时写 `x-if`（eager）与 `x-for` 会报错，改用 `x-show` / `x-if.keepalive` 或外层包裹。
- **eager 频繁切换有成本**：每次真假切换都重建/销毁子树与 watcher，频繁切换用 `x-if.keepalive` 或 `x-show` 更省。
- **keepalive 保活的是子树 DOM 与 watcher**，与 Vue `<keep-alive>`（缓存组件实例）概念相邻但不等同。
