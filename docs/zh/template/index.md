---
title: 模板
---

# AutoTemplate Engine

::: warning 核心定位
AutoTemplate Engine **不是静态模板引擎**，而是与 Vue、React、Alpine.js 同属一类的**响应式前端应用框架**——它同样可以用来构建响应式、可交互、动态的前端应用程序。
:::

与它们的不同只在于实现路径：它以原生 HTML 为模板，在元素上书写 `x-*` 指令，把 [AutoStore](../store/guide/store/about.md) 的响应式状态绑定到 DOM。状态一变，界面自动更新。事件处理、表单双向绑定、条件渲染、列表渲染、组件化、转场动画、动态 patch……构建现代前端应用所需的能力，它都具备。

不要被「模板引擎」的名字误导——它消费的是完整的 `AutoStore`（计算属性、异步计算、状态监听、批量更新），用「最小声明语法」换取「细粒度响应式更新」。你完全可以像写一个 Vue/React 应用那样，用它从零搭建一个全功能的交互式前端应用。

```html
<div id="app">
    <p>你好，<span x-text="user.name"></span>！</p>
    <p>合计：<span x-text="order.price * order.count"></span> 元</p>
    <button @click="rename">改名</button>
</div>

<script>
    const { AutoTemplateEngine } = AutoTemplateSpaces;
    new AutoTemplateEngine(document.getElementById("app"), {
        user: { name: "张三" },
        order: { price: 18, count: 3 },
    });
</script>
```

## 主要特性

1. **最小声明语法** —— 用最少的 `x-*` / `@*` / `:*` 属性声明，完成状态绑定、事件处理与结构控制，无需命令式 DOM 操作，也不必引入完整组件框架。

2. **细粒度响应式更新** —— 复用 `AutoStore` 的路径订阅，每条指令只订阅自己用到的状态路径；状态变化经调度器微任务合并后**只 patch 受影响的节点**，不重建整棵子树，保留焦点、滚动、未提交输入等运行态。

3. **文本与属性插值** —— 除 `x-text` 外，文本节点与属性值均可直接用 `{{ }}` 插值（如把状态动态拼进 class / href），文本按段拆分独立订阅，属性插值在编译期归一化为属性绑定，同样自动响应式。

4. **store | state 双向数据源** —— 构造器既可接收现成的 `AutoStore` 实例（借用、共享状态树），也可直接传裸状态对象（引擎自建 store 并接管销毁），既能独立成页，也能嵌入已有架构。

5. **完整的指令体系** —— 内置 20+ 指令覆盖内容（`x-text`/`x-html`）、结构（`x-if`/`x-for`/`x-tree`）、绑定（`:class`/`:style`/`:disabled`）、事件（`@click`/`@input`）、表单（`x-model`）、显隐（`x-show`）、数据域（`x-data`）、组件（`x-component`/`x-use`）、传送（`x-teleport`）、转场（`x-transition`）、`x-switch`/`x-table`/`x-loading`/`x-slot` 等。

6. **组件化能力** —— 通过 `x-component` 声明命名组件、`x-use` 实例化，支持 `<script setup>`（data / methods / 四阶段生命周期钩子）与 `<style>` 作用域样式，运行期 scope 链天然实现组件私有化，无需额外定义链。

7. **动作（Action）系统** —— `@click="save(args)"` 命中全局或局部 action，同步 action 直接调用，异步 action 自动广播 `pending`/`resolved`/`rejected` 生命周期信号，配合 `x-loading` 即可零胶水实现全局 loading / 错误提示。

8. **可扩展的自定义指令** —— 所有指令继承统一基类，按 `Compile`/`Runtime`/`Hybrid` 三类执行通道分流（编译时变换 / 运行时 observer 监测 / 二者兼有），优先级与单例策略均可静态声明，自定义指令与内置指令平权。

9. **动态 patch 与配置驱动** —— `engine.patch` 可在运行时动态替换局部模板；`x-bind` 支持通过 `configManager` 绑定配置 schema（`@` 引用语法），让 UI 与配置中心联动；动态插值、指令属性变化均触发细粒度 patch 而非重编译。

10. **分层事件总线与 HTML 消毒** —— 引擎提供分层命名 + 通配符订阅的事件总线（`engine/**` / `scope/**` / `directive/**` / `actions/**`），信号、数据、控制流分离；`x-html` 默认经极简 sanitizer 消毒（可替换为 DOMPurify），`.raw` 修饰符可跳过消毒原样写入。

## 产品优势

- **轻而不弱** —— 基于 `AutoStore` 的完整状态层（计算属性、异步计算、监听、批量更新），又以原生 `DOMParser`/`TreeWalker` 在运行时编译模板，零编译时依赖、零虚拟 DOM 开销。
- **性能可预期** —— 路径订阅 + 调度合并带来精确更新：改一个字段只重写对应 `textContent`/属性，不触发整组件重渲染，首屏与交互都贴近原生 DOM 成本。
- **渐进可嵌入** —— 一个 `<script>` 引入即可点亮任意 DOM 子树；既能作为整页渲染层（裸状态自给自足），也能作为已有 `AutoStore` 项目的轻量 DOM 渲染补充，不强求接管全局。
- **学习曲线平缓** —— 指令语法贴近 Alpine.js，会写 HTML 就能上手；插值、绑定、事件语义与主流框架同构，迁移心智成本低。
- **架构开放** —— 自定义指令、组件、配置绑定、事件总线四条扩展通道齐备，复杂交互不必绕回命令式，可在引擎内闭环表达。

## 框架对比

| 维度         | AutoTemplate Engine                                     | Alpine.js                 | Vue                          | React                                     |
| ------------ | ------------------------------------------------------- | ------------------------- | ---------------------------- | ----------------------------------------- |
| **状态层**   | 完整 AutoStore（计算属性 / 异步计算 / 监听 / 批量更新） | 自带轻量响应式            | 自带响应式（ref/reactive）   | 需配合状态库（useState/Redux/Zustand 等） |
| **更新粒度** | 路径订阅 + 调度合并，精确 patch 单节点                  | 细粒度 effect             | 组件级重渲染（组件树 diff）  | 组件级重渲染（Fiber diff）                |
| **模板形态** | 原生 HTML + `x-*` 指令，运行时编译                      | 原生 HTML + `x-*` 指令    | SFC（.vue 编译）或 HTML 模板 | JSX（编译为 createElement）               |
| **组件化**   | `x-component`/`x-use` + `<script setup>`                | `x-data` 局部组件，偏轻量 | 单文件组件，体系完整         | 函数/类组件，生态最强                     |
| **构建依赖** | 零，浏览器原生 API 运行时编译                           | 零/可选构建               | 需 vue-loader 编译 SFC       | 需打包器编译 JSX                          |
| **适用规模** | 中后台页面、嵌入式渲染、轻交互                          | 轻交互、渐进增强小部件    | 中大型 SPA、全功能应用       | 大型 SPA、复杂交互应用                    |
| **生态体积** | 与 AutoStore 协同，定位专注                             | 轻量精简                  | 完整生态（Router/Pinia 等）  | 最庞大的生态                              |

**一句话定位**：Vue / React 是「以组件为核心的全功能框架」，Alpine.js 是「以 HTML 为核心的轻量增强器」，而 AutoTemplate Engine 是「以 AutoStore 状态为核心、运行时编译 HTML 的声明式渲染层」——它把完整的状态管理能力，以最小的语法成本铺到 DOM 上。

## 适用场景

- **后台管理系统** —— 列表、表单、仪表盘等以状态驱动的页面，声明式绑定 + 细粒度更新，开发快、交互顺。
- **渐进式增强** —— 在已有页面（甚至服务端渲染产物）上点亮局部交互，无需接管全局、无需重构。
- **AutoStore 项目的渲染层** —— 以 `AutoStore` 为状态核心，补一层轻量 DOM 渲染，状态与视图各司其职。
- **轻交互落地页 / 工具页** —— 需要响应式但不必上完整组件框架的场景，一个 `<script>` 即可运行。
- **配置驱动的动态 UI** —— 配合 `configManager` 与 `engine.patch`，让界面随配置/数据动态变化。

## 从这里开始

- 第一次接触？看[关于](./intro/about.md)与[快速入门](./intro/get-started.md)
- 想了解能做什么？看[特征与优势](./intro/features.md)
- 上手开发？进入[指南](./guide/initial.md)
- 查具体用法？浏览[指令](./guide/directives/x-bind.md)
