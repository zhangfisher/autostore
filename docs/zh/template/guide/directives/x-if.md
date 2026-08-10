# x-if 条件渲染

## 概述

`x-if` 根据表达式真假，控制元素**子树**的渲染与显隐。元素本身始终作为锚点留在 DOM，变的是它的子树。

```html
<div x-if="show">
    <p>条件为真时显示</p>
</div>
```

它有两种模式：**eager**（默认，真则编译子树、假则销毁子树）与 **keep**（仅切 `display`，子树保留）。`x-show` 是 `x-if.keep` 的别名。

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

默认 `x-if="expr"` 是**结构指令**：表达式为真时编译并挂载子树，为假时 `display:none` + 移除子树 DOM + **销毁子 scope**（子树 watcher 一并 off）。

<demo html="template/if/eager.html"/>

```javascript
engine.state.show = false; // 子树 DOM 移除、watcher 销毁
engine.state.show = true; // 子树重新编译挂载、watcher 重建
```

eager 适合「假时彻底卸载」的场景——省掉隐藏期间的订阅与渲染开销。

### keep 模式（x-if.keep / x-show）

`.keep` 修饰符（或别名 `x-show`）只切换 `display`，**子树与 watcher 全部保留**：

<demo html="template/if/keep.html"/>

```html
<!-- 二者等价：仅切 display，子树保留 -->
<div x-if.keep="on">...</div>
<div x-show="on">...</div>
```

keep 适合「频繁切换、且隐藏期间要保留状态」的场景——例如隐藏的输入框仍继续累积最新值。

### 与 x-for 的关系

- **eager 模式禁止与 `x-for` 同元素**（二者都要独占子树，语义冲突，编译期报错）。需要时用外层包裹，或改用 `x-show`。
- **keep 模式可与 `x-for` 共存**：`x-for` 独占子树做列表，`x-if.keep` / `x-show` 只切容器的 `display`。

### 叶子元素

叶子元素（无子树，如 `<hr x-if>`、`<input x-if>`）两态等价——均退化为 `display:none`。

## 配置

`x-if` 的指令值是条件表达式（必填）。下列配置项控制条件为假时的处理方式；带 ✅ 者可用修饰符方式启用。

| 配置项  | 默认值 | 修饰符 | 说明                                                                       |
| ------- | ------ | ------ | -------------------------------------------------------------------------- |
| `.keep` | 未启用 | ✅     | 仅切 `display`、保留子树与 watcher（`x-show` 是其别名）；默认销毁/重建子树 |

::: info 关于指令配置体系
指令选项 / 修饰符 / 宿主选项 / 两层回退见[指令配置](../config.md)。
:::

## 注意事项

- **元素本身永留 DOM**：`x-if` 控制的是子树，宿主元素始终在 DOM（作锚点）。要连宿主一起移除，把 `x-if` 上移一层。
- **eager 与 x-for 互斥**：同元素同时写 `x-if`（eager）与 `x-for` 会报错，改用 `x-show` 或外层包裹。
- **eager 频繁切换有成本**：每次真假切换都重建/销毁子树与 watcher，频繁切换用 `x-show` 更省。
- **`x-show` 是 `x-if.keep` 别名**：二者完全等价，`x-show` 更直观地表达「显示/隐藏」。
