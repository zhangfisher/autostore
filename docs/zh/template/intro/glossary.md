# 名词解释

本页解释 AutoTemplate Engine 文档里反复出现的核心术语。读[快速入门](./get-started.md)时遇到不熟悉的词，可随时回到这里查阅；每个词条都附了指向专题文档的链接，需要深入时继续往下走。

## 引擎与状态

**AutoTemplate Engine**（模板引擎）把 [AutoStore](../../store/guide/store/about.md) 的响应式状态绑定到 DOM。你只管在 HTML 上写指令声明「这里显示什么状态」，状态一变，引擎自动更新对应节点。

```html
<div id="app">
    <span x-text="user.name"></span>
</div>

<script>
    const { AutoTemplateEngine } = AutoStoreSpaces;
    // 第二参是状态对象，引擎自动建 store
    new AutoTemplateEngine(document.getElementById("app"), {
        user: { name: "张三" },
    });
</script>
```

两件事要分清：

- **状态**：存在 `AutoStore` 里的数据，是「真相源」。改它才触发更新。
- **模板**：带 `x-*` 指令的 HTML，声明状态怎么显示。模板本身不会变，变的是渲染后的 DOM。

::: tip 状态的唯一正道
引擎建好后，用 `engine.state` / `engine.store.state`（响应式句柄）读写状态才会触发更新。直接改构造时传入的原始对象**不会**生效——它只是「种子」，建完即弃。详见[初始化](../guide/initial.md)。
:::

## 指令

**指令（Directive）** 是写在元素属性上的行为声明，引擎靠它知道「这个元素要干什么」。三种前缀：

| 前缀 | 形态 | 作用 | 示例 |
| --- | --- | --- | --- |
| `x-*` | 完整指令名 | 结构/行为类指令 | `x-text`、`x-if`、`x-for`、`x-data` |
| `:*` | `x-bind:` 的简写 | 把状态绑到元素属性 | `:class`、`:style`、`:value` |
| `@*` | `x-on:` 的简写 | 绑定事件 | `@click`、`@input` |

```html
<span x-text="user.name"></span>      <!-- 文本内容 = 状态 -->
<button @click="submit">提交</button>  <!-- 点击触发动作 -->
<input :class="{ active: on }" />      <!-- class 绑状态 -->
```

指令按执行通道分三类，了解这点有助于读懂后续文档：

- **编译时指令**（如 `x-if` / `x-for`）：编译期变换模板结构，结果元素的指令属性被剥除。
- **运行时指令**（如 `x-loading`）：编译期致盲，运行时由 DOM 观察器驱动，属性保留、可用 DOM API 动态增改。
- **混合指令**：同时走两条通道，既要响应式绑定、又要监听元素生命周期。

::: info 想深入了解
指令的完整分类、生命周期与通道见[指令类型](../guide/directive.md)；指令的选项/修饰符体系见[指令配置](../guide/config.md)。
:::

## 响应式插值

文本里的 `{{ 表达式 }}` 会被求值并替换为文本——和 `x-text` 等价，只是内联在文本中。

```html
<p>你好，{{ user.name }}！共 {{ list.length }} 条。</p>
```

`{{ }}` 结果一律按纯文本写入（浏览器自动转义，XSS 安全）。要注入原始 HTML，用 [x-html](../guide/directives/x-html.md)。属性值里也能用 `{{ }}`（如 `class="row {{ type }}"`），它会被合成等价的 `:attr` 绑定。

## 作用域（Scope）

**作用域（Scope）** 是模板引擎的核心组织单元。每个**含指令或 `{{}}` 插值**的元素，编译期都会建一个 `AutoTemplateScope`，它统一管理该元素上所有指令的生命周期与状态订阅。

一个 scope 持有：

- **指令实例**：该元素上的所有指令，按优先级排列。
- **watcher（订阅）**：指令通过 `scope.watch(路径或表达式)` 订阅状态，状态变时驱动 DOM 更新。
- **父子链**：scope 之间组成树（`parent` / `children`），子 scope 的局部数据可继承父级。

```html
<!-- 外层 scope（含 x-data） -->
<div x-data="{ tab: 'home' }">
    <!-- 内层 scope（x-for 每项各建一个 scope），继承父级 tab -->
    <div x-for="item in list">
        <span x-text="item.name + '(' + tab + ')'"></span>
    </div>
</div>
```

### 谁会建 scope

并非每个元素都建 scope。**含指令、含 `{{}}` 插值**的元素才建。一个光秃秃的 `<div>`（只作结构包裹）不建 scope。这正是 [x-scope](../guide/directives/x-scope.md) 指令的用途：让纯容器也建 scope，为后代 `x-block` 提供归属锚点、为作用域链插入边界。

### 作用域链与就近查找

scope 经 `parent` 链组成树，读取局部数据时**就近命中**：

- **同名键覆盖**：子层声明的同名键覆盖父层——子读到自己那份，父层不受影响。
- **未声明键继承**：子层没声明的键，沿 `parent` 链向上取最近一层的值（父 → 祖父 → … → 根状态）。

这套就近查找范式贯穿三件事：局部数据（下方）、动作（action）、模板块（block）——它们都沿 scope 链向上找，内层覆盖外层、到顶兜底全局。

## 作用域数据

状态除了放进全局 store，还能就近挂在元素上——`x-data` 声明一份**局部响应式数据**，仅该子树可见。

```html
<div x-data="{ count: 0 }">
    <span x-text="count"></span>
    <button @click="bump">+1</button>
</div>
```

- **默认**写入元素的私有响应式域，子树可见、scope 间隔离，字段级细粒度更新。
- **`.global` 修饰符**合并进全局 store 根键，全引擎可见。
- 父子 `x-data` 经作用域链层叠，子覆盖父同名键、继承父未声明的键。

::: tip 区分 x-data 与 x-scope
`x-data` 注入局部数据、建 scope；`x-scope` 只建 scope、不注入任何数据。要数据用 `x-data`，只要个 scope 锚点用 `x-scope`。详见 [x-data](../guide/directives/x-data.md) / [x-scope](../guide/directives/x-scope.md)。
:::

## 动作（Action）

**动作（Action）** 是 `@*` 事件绑定的处理函数。可以在 `<script type="actions">` 里声明局部动作，或经引擎选项注入全局动作。

```html
<div x-data="{ count: 0 }">
    <span x-text="count"></span>
    <button @click="bump">+1</button>
</div>

<script type="actions">
    {
        bump() {
            this.data.count++;   // 写本层 x-data 的局部数据
        },
    }
</script>
```

动作内经 `this` 访问上下文：`this.data` 写当前作用域的局部数据，`this.state` 读写全局状态，`this.scope` 拿到当前 scope。动作也沿 scope 链查找——局部同名动作覆盖全局。

动作既可以是同步函数，也可以是返回 Promise 的异步函数。异步动作的生命周期（pending/resolved/rejected）能被反馈修饰符（`.feedback`）或祖先聚合（`@action:*`）消费，驱动 loading、提交态等 UI。

::: info 想深入了解
动作的上下文、局部/全局、异步与反馈见[动作](../guide/action.md)。
:::

## 模板块（Block）

**模板块（`x-block`）** 是一种声明性模板资源——它本身不渲染，编译期被「深克隆为快照」后从渲染树摘除，作为**供体**交给最近祖先 scope 保管。

消费者指令（如 `x-loading`）需要一个 UI 态（加载中、空、错误）时，经 `getBlock(名字)` 沿 scope 链取块，克隆 + 编译后替换内置默认 UI。于是同一套状态，可以用任意自定义 HTML 表达它的各种「非内容态」。

```html
<div x-scope>
    <!-- 声明：编译后从 DOM 消失，作为 "loading" 模板供体 -->
    <div x-block="loading"><div class="skeleton"></div></div>
    <!-- 消费：x-loading 取上面的块替换内置旋转 loader -->
    <div x-loading="{ visible: 'on' }">内容</div>
</div>
```

这里 `x-scope` 是关键：`x-block` 要挂到最近祖先 scope，但纯容器不建 scope——`x-scope` 让这个 `<div>` 成为 scope 锚点，块才有归属。块查找支持「局部覆盖、外层兜底」：内层 scope 的同名块遮蔽外层，到顶兜底引擎全局块（`options.blocks`）。

::: info 想深入了解
模板块的声明摘除、就近覆盖、全局块兜底、消费者协议见[模板块](../guide/block.md)。
:::

## 响应式更新机制

最后，理解状态变化如何变成 DOM 更新，能避免一些常见困惑：

1. **路径订阅**：指令经 `scope.watch` 订阅状态路径。纯路径（如 `user.name`）走精准订阅，最快；表达式（如 `a + b`、`item.title`）由引擎自动收集读依赖后订阅。
2. **批量合并**：同一 tick 内多次状态变更，引擎经微任务合并——多个 watcher 只求值一次、DOM 只更新一次。
3. **细粒度 patch**：状态变化只更新受影响的节点，不重建整棵子树。这是「细粒度响应式」的核心，与整组件重渲染的框架路线不同。

::: tip 一句话总结
**状态在 AutoStore，界面用指令声明，scope 把两者桥接，变化经订阅自动 patch 到最小粒度的 DOM。**
:::

---

掌握这些术语后，前往[安装](./install.md)与[快速入门](./get-started.md)动手实践。各指令的详细用法见侧栏「指令」分组，读到陌生概念随时回这里查阅。
