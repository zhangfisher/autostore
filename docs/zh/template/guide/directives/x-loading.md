# x-loading 加载状态

## 概述

`x-loading` 给元素覆盖一个**加载层**（loading overlay），用于表达「这块正在加载」。它是**运行时指令**（observer 通道）——属性保留在渲染 DOM 上，由 `MutationObserver` 驱动，支持三种触发方式：命令式 `setAttribute`、反应式绑定、字面量。

```html
<div x-loading="isLoading">内容</div>
```

## 快速入门

<demo html="template/loading/overlay.html"/>

最典型的用法是**命令式 overlay**：给元素 `setAttribute("x-loading", ...)` 即显示覆盖层、`removeAttribute` 即隐藏——动作里触发异步加载时非常顺手。

```javascript
function load() {
    panel.setAttribute("x-loading", JSON.stringify({ message: "加载中…" }));
    fetchData().then(() => panel.removeAttribute("x-loading"));
}
```

## 指南

### 命令式 overlay 模式

`setAttribute("x-loading", JSON.stringify({message, ...}))`（配置对象**省略 visible**）即显示覆盖层并用配置渲染；`removeAttribute("x-loading")` 隐藏。属性存在即显示、不存在即隐藏：

<demo html="template/loading/overlay.html"/>

```javascript
const panel = document.querySelector("#panel");
// 显示：属性存在即显示
panel.setAttribute("x-loading", JSON.stringify({ message: "加载中…" }));
// 隐藏
panel.removeAttribute("x-loading");
```

这个模式被 `x-on` 的 `.feedback` 修饰符（`loading` 配置）和 `x-slot` remote 加载复用——零额外接线。

### 反应式模式

把 `x-loading` 绑定到状态路径，值真则显示、假则隐藏，随状态自动切换：

```html
<div x-loading="ui.loading">内容</div>
```

```javascript
engine.state.ui.loading = true; // 显示覆盖层
engine.state.ui.loading = false; // 隐藏
```

### 字面量模式

`x-loading="true"` / `x-loading="false"` 直接控制显隐（字符串字面量）：

```html
<div x-loading="true">恒显示加载层</div>
```

## 配置

`setAttribute` 时传 JSON 配置对象（命令式 overlay 模式）：

| 配置项 | 说明 |
| --- | --- |
| `message` | 覆盖层提示文案 |
| `bgColor` | 覆盖层背景色 |
| 其他 | 由实现定义的覆盖层样式项 |

| 元数据 | 值 | 说明 |
| --- | --- | --- |
| `kind` | `Runtime` | 运行时指令，属性保留、observer 驱动（不走 scope 通道） |
| `priority` | — | runtime 指令不参与 scope 排序 |

::: info 关于指令配置体系
指令选项 / 修饰符 / 宿主选项 / 两层回退见[指令配置](../config.md)。
:::

## 注意事项

- **运行时指令**：`x-loading` 是 runtime 指令——属性保留在渲染 DOM，可经 DOM API（`setAttribute` / `removeAttribute`）命令式控制，也可经状态反应式控制。
- **与 feedback / x-slot 协同**：`.feedback` 的 `loading` 配置、`x-slot` remote 加载都复用 `x-loading` 覆盖层，无需重复实现加载态。
- **反应式仅绝对路径**：作为运行时指令，反应式来源只接受 `engine.store.watch` 的绝对路径（运行时新增元素无 scope 上下文）。
