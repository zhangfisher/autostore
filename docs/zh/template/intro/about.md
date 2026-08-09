# 关于 AutoTemplate Engine

`AutoTemplate Engine` 是一个为 [AutoStore](../../store/guide/store/about.md) 量身打造的**声明式模板渲染引擎**。你只需在 HTML 元素上书写 `x-*` 指令，就能把响应式状态绑定到 DOM——状态一变，界面自动更新。

```html
<div id="app">
    <p>你好，<span x-text="user.name"></span>！</p>
    <p>合计：<span x-text="order.price * order.count"></span> 元</p>
</div>

<script>
    const { AutoTemplateEngine } = AutoTemplateSpaces;
    new AutoTemplateEngine(document.getElementById("app"), {
        user: { name: "张三" },
        order: { price: 18, count: 3 },
    });
</script>
```

## 核心价值

**最小声明，最大响应**——用最少的 HTML 属性声明，换取完整的响应式 UI 更新能力。

你不需要写命令式的 DOM 操作，也不用引入一整套组件框架。状态写在 `AutoStore` 里，界面用指令声明，二者由引擎自动桥接。

## 它解决什么问题

在传统命令式开发中，「状态变化 → 更新界面」的同步逻辑散落各处、易错难维护；而引入完整组件框架又往往过重。`AutoTemplate Engine` 取中间路线：

- **声明式**：界面长什么样、依赖什么状态，全写在 HTML 里，一眼可读。
- **细粒度响应式**：复用 `AutoStore` 的路径订阅，状态变化只 patch 受影响的节点，不重建整棵子树。
- **零编译时依赖**：基于浏览器原生 `DOMParser` 与 `TreeWalker`，模板即 HTML 字符串，运行时编译。

## 与 Alpine.js 的关系

`AutoTemplate Engine` 的指令语法（`x-text` / `x-for` / `x-on` / `:bind` 等）灵感来自 [Alpine.js](https://alpinejs.dev/)，理念相近——在 HTML 里完成声明式绑定。关键区别在于：

- **状态层**：Alpine.js 自带轻量响应式；本引擎的状态层是完整的 `AutoStore`——支持计算属性（含异步计算）、状态监听、批量更新等。
- **更新粒度**：本引擎基于 `AutoStore` 的路径订阅做细粒度 patch，而非整组件重渲染。

## 与 AutoStore 的关系

`AutoTemplate Engine` 不重复造状态轮子，它**消费** `AutoStore`：

- 引擎构造时接收一个 `AutoStore` 实例（或裸状态对象，由引擎自动建 store）；
- 指令通过 `scope.watch` 订阅状态路径，状态变化驱动 DOM 更新；
- `AutoStore` 的计算属性、异步计算、事件系统等能力，在模板中均可用。

可以说：`AutoStore` 管「状态怎么变」，`AutoTemplate Engine` 管「变了之后界面怎么更新」。

## 适用场景

- 后台管理系统的列表 / 表单 / 仪表盘页面
- 需要声明式响应式、但不想上完整组件框架的场景
- 以 `AutoStore` 为状态核心、希望补一层轻量 DOM 渲染的项目

---

准备好开始的话，前往[安装](./install.md)与[快速入门](./get-started.md)，或先了解[特征与优势](./features.md)。
