# x-loading 指令设计文档

> 本文档由 `/grill-with-docs` 会话沉淀。记录术语、API 规格、关键决策（ADR）与边界。

## 1. 术语表（Glossary）

| 术语 | 含义 |
|---|---|
| **宿主元素** | 声明 `x-loading` 的元素，覆盖层挂在其内部作为子节点 |
| **覆盖层（overlay）** | loading 指令创建的 `div.x-loading-overlay`，绝对定位充满宿主（或全屏） |
| **遮罩底色（bgColor）** | 覆盖层的背景颜色，默认 `black`；与 `opacity` 合成为半透明 `rgba` |
| **opacity（alpha）** | 遮罩底色的不透明度，默认 `0.5`；映射为 bgColor 的 alpha 通道，**非**元素 `style.opacity` |
| **loader 动画** | 覆盖层中央的旋转圆环（给定 CSS），颜色由 `color` 控制（默认灰 `#888`） |
| **message** | loader 下方可选文本，默认不渲染；存在时固定白色 |
| **visible 表达式** | 决定覆盖层显隐的状态路径/表达式，truthy 显示、falsy 移除 |
| **快速绑定** | 字符串语法 `x-loading="isLoading"`：整个值即 visible 表达式，配置全默认 |
| **配置绑定** | 对象语法 `x-loading="{visible,message,...}"`：字段化配置 |
| **防闪烁（delay）** | visible 变 true 后延迟 N ms 才真正显示；延迟窗口内回 false 则不显示 |

## 2. API 规格

### 2.1 两种绑定语法

```html
<!-- 快速绑定：值 = visible 表达式，全默认配置 -->
<div x-loading="order.isSubmit"></div>
<div x-loading="isLoading"></div>          <!-- 配合 x-data 局部变量 -->

<!-- 配置绑定：对象，visible 必填 -->
<div x-loading="{ message:'正在加载', bgColor:'white', color:'red', visible:'isLoading', opacity:0.5, delay:300 }"></div>
```

**值类型判定**：`this.value` trim 后以 `{` 开头 → 配置绑定（`really-relaxed-json` 解析）；否则 → 快速绑定，整值作 visible 表达式。两者最终都经 `scope.watch(visible, cb)` 订阅，自动识别纯路径/表达式，自动注入 x-for localScope 与 x-data dataScope。

### 2.2 配置字段

| 字段 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `visible` | string | — | **配置绑定必填**；visible 表达式（路径或表达式） |
| `message` | string | `undefined` | 可选文本；不传则不渲染文字层 |
| `bgColor` | string | `"black"` | 遮罩底色（任意合法 CSS 颜色） |
| `color` | string | `"#888"` | loader 动画色（任意合法 CSS 颜色） |
| `opacity` | number | `0.5` | 遮罩底色 alpha，`0~1` |
| `delay` | number | `0` | 防闪烁延迟（ms）；0 = 立即显示 |

### 2.3 修饰符

| 修饰符 | 行为 |
|---|---|
| `.screen` | 覆盖层 `position:fixed;inset:0`，撑满视口；留在宿主子树（不 teleport） |

## 3. 视觉决策（ADR-001）

### ADR-001：遮罩用 bgColor 的 alpha，而非元素 opacity

**背景** 需求同时出现「黑色/灰色/透明背景」与「opacity 默认 0.5」。

**决策** 覆盖层 = 半透明黑色遮罩（bgColor 默认 `black`、opacity 默认 `0.5`）。`opacity` 映射为 **bgColor 的 alpha 通道**（合成 `rgba(r,g,b,0.5)`），**不**设覆盖层元素的 `style.opacity`。

**理由** 若用元素 `style.opacity=0.5`，loader 动画与 message 文字一并被压暗；用背景色 alpha 则仅背景半透明，动画与文字保持清晰。这是 overlay 的正确写法。

**颜色解析** 自包含手写解析器：`hex`(#rgb/#rrggbb/#rrggbbaa) / `rgb()` / `rgba()` / `hsl()` / 常用颜色名表。**不**依赖 `getComputedStyle`/canvas——happy-dom 规范化不可靠且与生产环境不一致。未识别颜色 → warn + 回退黑色。

### ADR-002：loader 颜色用 currentColor 注入

**决策** 给定 CSS 的两处 `#ffa516` 替换为 `currentColor`；通过覆盖层 loader 元素 `style.color = color`（默认 `#888` 灰）注入。`-webkit-mask` 不含色调，原样保留。

**理由** `color:red` 时 gradient 两处自然变红，无需重建 CSS 文本；符合 `currentColor` 语义。

### ADR-003：message 默认不渲染、固定白色

**决策** 未传 `message` → 不创建文本节点；传了 → 渲染在 loader 下方，颜色固定白色，独立于 `color`（`color` 只管动画）。

**理由** 黑色遮罩上灰色/红色文字可读性差；白色保证可读。动画色与文字色解耦，各自可控。

## 4. 行为决策（ADR-004 ~ 006）

### ADR-004：false 移除 DOM，true 重建

**决策** visible=falsy → 覆盖层节点从 DOM 移除；truthy → 重建。符合需求原话「=false 时移除」。loading 通常低频切换，重建开销可接受，DOM 无残留、动画从 0 重启。

### ADR-005：.screen 用 fixed，不 teleport

**决策** `.screen` 覆盖层 `position:fixed;inset:0`，留在宿主子树；销毁跟随宿主 scope。

**权衡** 宿主祖先若有 `transform/filter/will-change` 会形成层叠上下文，使 fixed 失效（转相对该祖先）——这是已知限制，文档声明，不引入 teleport 的生命周期复杂度。

### ADR-006：不动宿主 position

**决策** 覆盖层用 `position:absolute;inset:0` 充满宿主，但**不**强制给宿主设 `position:relative`。若宿主为 `static`，覆盖层会定位到最近 positioned 祖先——**文档声明要求开发者保证宿主 position 非 static**。

**理由** 不破坏开发者既有布局；代码最干净。「自动充满」的承诺以宿主已 positioned 为前提。

### ADR-007：delay 防闪烁

**决策** 支持 `delay`（ms，默认 0）。visible=true → `setTimeout(delay)` 后才挂载覆盖层；窗口内 visible 变 false → 取消定时器、不显示。`destroy` 时清定时器。

## 5. 指令元信息

| 字段 | 值 | 理由 |
|---|---|---|
| `priority` | `0` | 不改结构，与 x-text/x-html 同级；< x-data(200)/x-for(100)/x-if(80)，保证数据与结构指令先执行，`watch` 能读到已注入的 dataScope |
| `singleton` | `true` | 一个元素只需一个 loading |
| `ownsChildren` | `false` | 不占有子树，可与 x-if/x-for 共存 |

## 6. CSS 注入

模块级标志 `stylesInjected`，首次实例化时注入一次 `<style id="x-loading-styles">` 到 `document.head`，含 `.x-loading-overlay` 布局、`.x-loading-loader`（currentColor + mask 动画）、`@keyframes`、`.x-loading-message`。销毁不回收（全局共享，常驻开销可忽略）。

## 7. 覆盖层 DOM 结构

```html
<div class="x-loading-overlay" style="position:absolute;inset:0;background:rgba(0,0,0,0.5);z-index:9999">
  <div class="x-loading-box">
    <div class="x-loading-loader" style="color:#888"></div>
    <div class="x-loading-message">正在加载</div>   <!-- 仅当有 message -->
  </div>
</div>
```
