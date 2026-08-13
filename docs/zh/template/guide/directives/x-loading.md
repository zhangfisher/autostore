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

### 命令式

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

### 绑定状态控制

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

### 挂载目标

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

### 全屏覆盖

`.screen` 修饰符让覆盖层以 `position:fixed;inset:0` 撑满整个视口（仍留在宿主子树，不 teleport）。常用于整页/整应用级加载态。

<demo html="template/loading/screen.html"/>

```html
<div x-loading.screen="{ visible:'pageLoading', message:'加载中…' }">内容</div>
```

### 默认加载样式

#### 提示文本

`message` 渲染在 loader 下方的提示文案。默认模板的 message 元素恒存在，不传 `message` 时其文本为空（不显示文案、仅 loader）；若用自定义模板，message 是否渲染由你的模板决定。

<demo html="template/loading/message.html"/>

```html
<!-- 配置绑定下传 message -->
<div x-loading="{ visible:'on', message:'正在拉取数据…' }">内容</div>
<!-- 快速绑定（无 message）：仅 loader -->
<div x-loading="on">内容</div>
```

#### 旋转色

`color` 控制 loader 圆环的旋转色，经 `currentColor` 注入到 conic/radial 两处渐变。支持 hex、`rgb()/rgba()`、`hsl()/hsla()` 及常用颜色名；不可识别的值回退默认色 `#888`。

<demo html="template/loading/color.html"/>

```html
<div x-loading="{ visible:'on', color:'#42b883' }">内容</div>
<div x-loading="{ visible:'on', color:'red' }">内容</div>
```

#### 遮罩底色

`bgColor` 是覆盖层的背景色，默认 `"black"`。它不直接作为元素底色，而是与 `opacity` 合成为 `rgba(bgColor, opacity)`——这样 loader 与文案始终保持清晰，不被透明度拉淡。

<demo html="template/loading/bgcolor.html"/>

```html
<div x-loading="{ visible:'on', bgColor:'white' }">内容</div>
<div x-loading="{ visible:'on', bgColor:'#42b883' }">内容</div>
```

#### 透明度

`opacity` 取 `0~1`，作用于 `bgColor` 的 alpha 通道（覆盖层底色透明度），默认 `0.5`。它不是整元素 `opacity`，故 loader 与文案不受影响。

<demo html="template/loading/opacity.html"/>

```html
<div x-loading="{ visible:'on', bgColor:'black', opacity:0.2 }">内容</div>
<div x-loading="{ visible:'on', bgColor:'black', opacity:0.8 }">内容</div>
```

#### 防闪烁

`delay`（毫秒）在显示覆盖层前等待一段窗口期。若窗口期内 visible 回假，挂载定时器被取消、覆盖层**从不出现**——典型用途是「请求很快时不想惊扰用户」：把 delay 设得略大于典型耗时即可无感。

<demo html="template/loading/delay.html"/>

```html
<!-- delay:500：500ms 内完成的短任务不会闪现 loader -->
<div x-loading="{ visible:'fast', delay:500 }">内容</div>
```

### 自定义加载模板

默认覆盖层是内置旋转 `loader`。若不满意——想换成脉冲扩散点、进度条、骨架屏，甚至完全自定义布局——无需 fork 指令，用**组件**覆盖即可。`x-loading` 渲染时会先经 `getComponent("loading")` 取组件：取到则用块替换默认 loader，取不到才回退内置。

块有两类，按**就近原则**查找（局部覆盖全局）：

#### 局部组件

在宿主的任意祖先上声明 `x-scope` 建 scope 锚点，其内用 `x-component="loading"` 声明一个命名组件。该组件在编译期从渲染树摘除、上交给最近祖先 scope 的 `components`，`x-loading` 渲染时沿 scope 链就近取用：

<demo html="template/loading/block-local.html"/>

```html
<!-- x-scope 建 scope 锚点，让内部 x-component 有归属 -->
<div x-scope>
    <!-- 自定义 loading 组件：根即 overlay 壳（x-loading 注入定位/背景样式） -->
    <div x-component="loading">
        <div class="loader"></div>
        <!-- message 经 x-loading 配置注入块，块内 x-text 响应式取值 -->
        <div class="my-msg" x-text="message"></div>
    </div>

    <!-- 这两个宿主共用上面的局部组件 -->
    <div x-loading="{ visible:'on', message:'正在拉取数据…' }">内容</div>
</div>
```

#### 全局组件

在 engine 构造选项 `components.loading` 声明一个**全引擎复用**的模板（字符串入参）。所有 `x-loading` 在无局部组件覆盖时都取它：

<demo html="template/loading/block-global.html"/>

```javascript
const engine = new AutoTemplateEngine(el, state, {
    components: {
        // 多顶级节点会自动包一层 div 并打 x-component="loading"
        loading: `
            <div class="loader"></div>
            <div class="my-msg" x-text="message"></div>
        `,
    },
});
```

#### 块内可用的注入字段

块的 scope 会以 **data**（响应式）注入 `x-loading` 配置的全字段，块内表达式/指令直接按字段名取用：

| 字段       | 含义                                       | 块内典型用法                 |
| ---------- | ------------------------------------------ | ---------------------------- |
| `message`  | 提示文案                                   | `x-text="message"`           |
| `color`    | loader 旋转色                              | `:style="{color}"`           |
| `bgColor`  | 遮罩底色                                   | 自定义遮罩时取用             |
| `opacity`  | 透明度                                     | 自定义遮罩时取用             |
| `visible`  | 显隐表达式串（**脚枪**：是字符串，非布尔） | 块内一般不用（显隐由宿主管） |
| `delay`    | 防闪烁毫秒                                 | 块内一般不用                 |
| `selector` | 挂载目标选择器                             | 块内一般不用                 |

::: warning 块根即 overlay 壳
自定义块的**根元素就是 overlay 壳**——`x-loading` 会把定位（`position:absolute`/`fixed`、`inset:0`、flex 居中）和背景（`rgba(bgColor, opacity)`）作为内联样式注入到块根。所以块根通常写一个空 `<div>` 承载壳样式，把实际内容放它的子节点里（见上方示例的 `.loader`）。
:::

#### 自动包装规则（仅全局组件字符串入参）

全局组件入参是字符串，首次使用时按顶级节点数自动规范化为「恰好一个带 `x-component` 的根元素」：

| 输入                       | 包装结果                             |
| -------------------------- | ------------------------------------ |
| 单顶级元素、无 `x-component`   | 根打本 key 名（`x-component="loading"`） |
| 已含 `x-component`             | 尊重原值不重命名                     |
| 多顶级节点 / 元素+文本混排 | 包一层 `<div x-component="loading">`     |
| 纯文本无元素               | 包成 `<div x-component="loading">文本`   |

局部组件入参已是 DOM 元素，不经包装。块根**总是创建 scope**（由消费编译路径保证），块内表达式有继承起点。

::: info 局部覆盖全局
查找顺序是「自身 scope → 各祖先 scope → 全局 `options.components`」。所以在某个 `x-scope` 内声明局部 `x-component="loading"`，只覆盖该子树内的 x-loading，其余仍走全局组件——支持「公共全局样式 + 局部特例」。
:::

## 配置

`x-loading` 的指令值是显示状态表达式（快速绑定 `x-loading="isLoading"`，全默认），或配置对象（`x-loading="{ visible:'isLoading', ... }"`，`visible` 必填）。下列配置项在配置绑定时生效；带 ✅ 者可用修饰符方式启用。

| 配置项     | 默认值       | 修饰符 | 说明                                                      |
| ---------- | ------------ | ------ | --------------------------------------------------------- |
| `visible`  | 必填         |        | 显示状态表达式（全局路径或表达式）                        |
| `message`  | 无（不渲染） |        | 覆盖层提示文案；不传则不渲染文本节点                      |
| `bgColor`  | `"black"`    |        | 覆盖层背景色（与 opacity 合成为 rgba）                    |
| `color`    | `"#888"`     |        | loader 旋转色（经 `currentColor` 注入）                   |
| `opacity`  | `0.5`        |        | 覆盖层底色透明度（作用于 bgColor 的 alpha）               |
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
