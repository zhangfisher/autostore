# 加载状态

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

<demo html="template/loading/reactive.html"/>

```html
<div x-loading="ui.loading">内容</div>
```

```javascript
engine.state.ui.loading = true; // 显示覆盖层
engine.state.ui.loading = false; // 隐藏
```

### 字面量模式

`x-loading="true"` / `x-loading="false"` 直接静态显隐（字符串字面量），不订阅状态：

<demo html="template/loading/literal.html"/>

```html
<div x-loading="true">恒显示加载层</div>
```

裸 `x-loading`（无值）等同 `"true"`；`"false"` 与不写该属性等价。适合无需切换的静态骨架屏。

### message 提示文案

`message` 渲染在 loader 下方的提示文案；不传则不渲染文本节点（默认只有 loader）。

<demo html="template/loading/message.html"/>

```html
<!-- 配置绑定下传 message -->
<div x-loading="{ visible:'on', message:'正在拉取数据…' }">内容</div>
<!-- 快速绑定（无 message）：仅 loader -->
<div x-loading="on">内容</div>
```

### color：loader 旋转色

`color` 控制 loader 圆环的旋转色，经 `currentColor` 注入到 conic/radial 两处渐变。支持 hex、`rgb()/rgba()`、`hsl()/hsla()` 及常用颜色名；不可识别的值回退默认色 `#888`。

<demo html="template/loading/color.html"/>

```html
<div x-loading="{ visible:'on', color:'#42b883' }">内容</div>
<div x-loading="{ visible:'on', color:'red' }">内容</div>
```

### bgColor：遮罩底色

`bgColor` 是覆盖层的背景色，默认 `"black"`。它不直接作为元素底色，而是与 `opacity` 合成为 `rgba(bgColor, opacity)`——这样 loader 与文案始终保持清晰，不被透明度拉淡。

<demo html="template/loading/bgcolor.html"/>

```html
<div x-loading="{ visible:'on', bgColor:'white' }">内容</div>
<div x-loading="{ visible:'on', bgColor:'#42b883' }">内容</div>
```

### opacity：透明度

`opacity` 取 `0~1`，作用于 `bgColor` 的 alpha 通道（覆盖层底色透明度），默认 `0.5`。它不是整元素 `opacity`，故 loader 与文案不受影响。

<demo html="template/loading/opacity.html"/>

```html
<div x-loading="{ visible:'on', bgColor:'black', opacity:0.2 }">内容</div>
<div x-loading="{ visible:'on', bgColor:'black', opacity:0.8 }">内容</div>
```

### delay：防闪烁

`delay`（毫秒）在显示覆盖层前等待一段窗口期。若窗口期内 visible 回假，挂载定时器被取消、覆盖层**从不出现**——典型用途是「请求很快时不想惊扰用户」：把 delay 设得略大于典型耗时即可无感。

<demo html="template/loading/delay.html"/>

```html
<!-- delay:500：500ms 内完成的短任务不会闪现 loader -->
<div x-loading="{ visible:'fast', delay:500 }">内容</div>
```

### selector：挂载目标

默认覆盖层挂在宿主元素上。`selector` 可改挂载目标：

- 普通值（如 `'#inner'`）→ `宿主.querySelector(selector)`，挂到**宿主后代**；
- 以 `@` 开头（如 `'@#modal'`）→ `document.querySelector(去@部分)`，挂到**宿主外/全局元素**；
- 选择器未命中或非法 → 回退宿主（不抛错、记 warn）。

<demo html="template/loading/selector.html"/>

```html
<!-- 覆盖层挂到宿主后代的 #inner -->
<div x-loading="{ visible:'on', selector:'#inner' }">
    <div id="inner">目标</div>
</div>
<!-- @ 前缀：挂到全局元素 -->
<div x-loading="{ visible:'on', selector:'@#modal' }">宿主</div>
```

### .screen：全屏覆盖

`.screen` 修饰符让覆盖层以 `position:fixed;inset:0` 撑满整个视口（仍留在宿主子树，不 teleport）。常用于整页/整应用级加载态。

<demo html="template/loading/screen.html"/>

```html
<div x-loading.screen="{ visible:'pageLoading', message:'加载中…' }">内容</div>
```

## 配置

`x-loading` 的指令值是显示状态表达式（快速绑定 `x-loading="isLoading"`，全默认），或配置对象（`x-loading="{ visible:'isLoading', ... }"`，`visible` 必填）。下列配置项在配置绑定时生效；带 ✅ 者可用修饰符方式启用。

| 配置项     | 默认值       | 修饰符 | 说明                                                      |
| ---------- | ------------ | ------ | --------------------------------------------------------- |
| `visible`  | 必填         |        | 显示状态表达式（全局路径或表达式）                        |
| `message`  | 无（不渲染） |        | 覆盖层提示文案；不传则不渲染文本节点                      |
| `bgColor`  | `"black"`    |        | 覆盖层背景色（与 opacity 合成为 rgba）                   |
| `color`    | `"#888"`     |        | loader 旋转色（经 `currentColor` 注入）                   |
| `opacity`  | `0.5`        |        | 覆盖层底色透明度（作用于 bgColor 的 alpha）              |
| `delay`    | `0`          |        | 显示前延时（防闪烁），毫秒                                |
| `selector` | 宿主元素     |        | 覆盖层挂载目标选择器；`@` 前缀走 `document.querySelector` |
| `.screen`  | 未启用       | ✅     | 全屏覆盖（`position:fixed`）                              |

::: info 关于指令配置体系
指令选项 / 修饰符 / 宿主选项 / 两层回退见[指令配置](../config.md)。
:::

## 注意事项

- **运行时指令**：`x-loading` 是 runtime 指令——属性保留在渲染 DOM，可经 DOM API（`setAttribute` / `removeAttribute`）命令式控制，也可经状态反应式控制。
- **与 feedback / x-slot 协同**：`.feedback` 的 `loading` 配置、`x-slot` remote 加载都复用 `x-loading` 覆盖层，无需重复实现加载态。
- **反应式仅绝对路径**：作为运行时指令，反应式来源只接受 `engine.store.watch` 的绝对路径（运行时新增元素无 scope 上下文）。
- **定位前提**：覆盖层为 `position:absolute;inset:0`，相对最近的 positioned 祖先定位。宿主（或 `selector` 目标）需 `position:relative` 才能被精确覆盖；否则会回退到视口/最近定位祖先（`.screen` 修饰符除外，它用 `position:fixed`）。
- **颜色解析限制**：`bgColor`/`color` 支持 hex、`rgb()/rgba()`、`hsl()/hsla()` 及常用颜色名；`oklch`/`color()`/`lab` 等现代语法不可识别，回退默认色。
