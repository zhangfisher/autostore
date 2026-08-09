# x-slot 模板插槽

## 概述

`x-slot` 在模板中划一块**独立于 engine 的隔离 DOM 区域**。两种模式（由值的有无切换）：

- **static**（无值 `<div x-slot>`）：内容是**冻结快照**——深克隆、剥除指令属性、不编译、不建 scope、不注册 watcher。engine 永不覆写。
- **remote**（有值 `<div x-slot="urlExpr">`）：从响应式 url fetch 模板，在其上建**完全独立的 child engine**。

```html
<!-- 静态冻结快照 -->
<div x-slot>...</div>
<!-- 远程子引擎 -->
<div x-slot="postUrl"></div>
```

## 快速入门

<demo html="template/slot/static.html"/>

```html
<div x-slot>
    <span x-text="name">（初始文本）</span>
</div>
```

## 指南

### static 模式：冻结快照

无值的 `x-slot` 把宿主内容**冻结**：编译期深克隆模板子节点、剥除全部指令属性（`x-*` / `@` / `:`）、不编译。engine 永不覆写，开发者用 DOM API 全权管理。

<demo html="template/slot/static.html"/>

```html
<div class="card" x-slot>
    <!-- x-text 被剥除、不生效，span 恒显示其初始文本 -->
    <span x-text="name">（初始文本）</span>
</div>
<!-- 普通区域正常响应式 -->
<p>普通：<span x-text="name"></span></p>
```

::: warning 内层指令 / 插值静默失效
static 内容里的 `x-*` 指令、双花括号插值**一律不编译、不生效**（编译期会 `warn`）。要响应式就用普通元素，或用 remote 子引擎。
:::

### remote 模式：远程子引擎

有值的 `x-slot="urlExpr"` 把表达式经 `scope.watch` 求值得 **url**（响应式），fetch 该 url 的 HTML，在宿主上建一个**完全独立**的 `AutoTemplateEngine`（自带空 store，fetched HTML 用自身 `x-data` 自治）：

```html
<div x-slot="state.postUrl"></div>
```

```javascript
// 换 state.postUrl 即换子模板，零额外接线
engine.state.postUrl = "/posts/2.html";
```

url 变化时销毁当前 child engine、重新 fetch、重建。加载期间自动用 `x-loading` 显示覆盖层，失败显示错误占位。

### 威胁边界

`x-slot` 的「保持原样」只挡**反应式刷新**（T1：scheduler flush 不擦内容）——这是它的核心价值。而**结构重建**（`x-if` toggle / `engine.data` / `patch`）与**全量重编译**（`engine.compile`）与普通元素一视同仁：宿主被销毁则内容 / child engine 随销，重建时静态重克隆 / remote 重 fetch。

## 配置

| 配置项 | 形式 | 说明 |
| --- | --- | --- |
| 指令值 | 无值 / `x-slot="urlExpr"` | 无值=static 冻结；有值=remote（表达式求值为 url） |

| 元数据 | 值 | 说明 |
| --- | --- | --- |
| `priority` | `90` | 结构指令档（介于 `x-if` 80 / `x-for` 100） |
| `singleton` | `true` | 同元素同名取最后声明 |
| `ownsChildren` | `true` | 独占子树（static 自行克隆填充、remote 由 child engine 接管） |

::: info 关于指令配置体系
指令选项 / 修饰符 / 宿主选项 / 两层回退见[指令配置](../config.md)。
:::

## 注意事项

- **不能与 `x-for` / eager `x-if` 同元素**：三者都要独占子树（ownership 冲突）。需要时外层包裹。
- **static 内容不响应式**：内层指令 / 插值静默失效，要响应式用普通元素或 remote。
- **remote 用独立 store**：child engine 自带空 store，不复用父 store——子模板的状态用自身 `x-data` 声明，与父状态零耦合。
- **url 响应式**：remote 的 url 是表达式，支持路径 / 表达式 / `x-data` 局部 / `x-for` item。
