# 组件

## 概述

**组件**（`x-component`）是 AutoTemplate Engine 的可复用 UI 单元——把一段 DOM 连同它的**数据、方法、生命周期、作用域样式**打包封装，在模板里声明一次，即可在任意位置反复实例化使用。

组件让模板具备「结构复用 + 内聚状态」的能力：每个组件实例拥有独立的响应式数据域、自己的方法、四阶段生命周期，以及默认只命中本实例的作用域样式。与 `x-data` 的局部状态不同，组件是**声明性的供体**——它在编译期被摘除、冻结为快照，消费时（`x-use`）才克隆实例化。

一个组件长这样：

```html
<div x-component="counter">
    <button x-on:click="dec">−</button>
    <span x-text="count"></span>
    <button x-on:click="inc">+</button>

    <!-- 数据、方法、生命周期 -->
    <script setup>
        {
            data() { return { count: 0 } },
            methods: { inc() { this.data.count++ }, dec() { this.data.count-- } },
            mounted() { console.log('已挂载') },
        }
    </script>

    <!-- 作用域样式：默认只命中本组件实例 -->
    <style>.count { font-weight: bold }</style>
</div>
```

组件有两个来源、两种使用方式：

| 来源 | 声明方式 | 可见范围 |
| --- | --- | --- |
| **作用域组件** | 模板里 `<div x-component="name">` | 挂最近祖先 scope，仅本作用域可见 |
| **全局组件** | 构造引擎时 `options.components` 传入（字符串） | 全引擎复用（scope 链终点兜底） |

| 使用方式 | 作用 |
| --- | --- |
| `x-use` | 在模板中**实例化**一个组件 |
| `x-import` | 从远程 url **加载**组件定义（可 `.global` 注册为全局） |

此外，`x-loading` 等内置消费者也经 `getComponent(name)` 取用组件来定制默认 UI。

::: tip 组件元素不渲染自身
`x-component` 声明的元素在编译期会被**摘除**——它不进结果 DOM、不建 scope、不渲染。它只是作为「模板供体」上交给祖先 scope，等待 `x-use` 克隆实例化。
:::

## 快速入门

我们从零开发一个典型的计数器组件，逐步覆盖声明、数据、方法、样式、生命周期、实例化的完整流程。

### 第 1 步：声明组件

组件用 `x-component="名称"` 声明，必须放在一个**带 scope 的祖先**内（最简单的方式是用 `x-scope` 让纯容器建 scope 作为锚点）。

```html
<div x-scope>
    <!-- 声明组件 counter：编译后此元素从 DOM 消失，仅作为"模板供体" -->
    <div x-component="counter">
        <span x-text="count"></span>
    </div>
</div>
```

此时页面是空的——组件声明本身不会渲染任何内容。`x-scope` 让纯容器建 scope，使内部的 `x-component` 有归属锚点（否则组件无处归属，编译期被 `warn` 丢弃）。

### 第 2 步：加数据与方法（`<script setup>`）

在组件内用 `<script setup>` 声明数据与方法。`data()` 返回初始状态，`methods` 是组件方法：

```html
<div x-component="counter">
    <button x-on:click="dec">−</button>
    <span x-text="count"></span>
    <button x-on:click="inc">+</button>
    <script setup>
        {
            data() { return { count: 0, step: 1 } },
            methods: {
                inc() { this.data.count += this.data.step },
                dec() { this.data.count -= this.data.step },
            },
        }
    </script>
</div>
```

- `data()` 返回的对象注入组件的响应式 data 域，模板里直接用字段名（`count`）取用；
- `methods` 注入 `scope.actions`，可被 `x-on` 调用；
- 方法内 `this.data` 即组件数据域，可读可写，修改后界面自动更新。

### 第 3 步：加样式（`<style>`）

组件内的 `<style>` 默认**只命中本组件实例**（仿 Vue `<style scoped>`）：

```html
<div x-component="counter">
    <div class="counter"><span class="count" x-text="count"></span></div>
    <style>
        .counter { padding: 8px; border: 1px solid #ccc; }
        .count { font-weight: bold; }
    </style>
</div>
```

实例化时，组件根及所有后代被打上唯一 `data-cmp-{id}` 属性，`<style>` 的选择器末尾自动追加 `[data-cmp-{id}]`，使样式隔离到本实例，多实例互不串扰。

### 第 4 步：加生命周期钩子

`<script setup>` 还可声明生命周期钩子。下面在 `mounted`（DOM 编译完成后触发）里读取宿主的 `data-count` 属性来初始化计数：

```html
<div x-component="counter">
    <span class="count" x-text="count"></span>
    <script setup>
        {
            data() { return { count: 0 } },
            mounted() {
                const init = this.scope.el.getAttribute('data-count');
                if (init !== null) this.data.count = Number(init);
            },
        }
    </script>
</div>
```

四个阶段：`created`（编译前）、`mounted`（DOM 编译完成）、`beforeUnmount`（卸载前）、`unmounted`（卸载后）。

### 第 5 步：实例化组件（`x-use`）

组件声明完后，用 `x-use` 在任意位置实例化它。宿主元素会化身为组件根：

```html
<!-- 字面量组件名 -->
<div x-use="counter" data-count="10"></div>

<!-- 传 props（对象形式）：count 覆盖 data() 默认值 -->
<div x-use="{ name: 'counter', count: 100, step: 5 }"></div>
```

### 小结

把上面五步合在一起，就是一个完整可用的组件。下面这个 demo 融合了 data、methods、scoped style、mounted 生命周期、props 覆盖：

<demo html="template/component/counter.html"/>

```html
<div x-scope>
    <div x-component="counter">
        <div class="counter">
            <button x-on:click="dec">−</button>
            <span class="count" x-text="count"></span>
            <button x-on:click="inc">+</button>
        </div>
        <script setup>
            {
                data() { return { count: 0, step: 1 } },
                methods: {
                    inc() { this.data.count += this.data.step },
                    dec() { this.data.count -= this.data.step },
                },
                mounted() {
                    const init = this.scope.el.getAttribute('data-count');
                    if (init !== null) this.data.count = Number(init);
                },
            }
        </script>
        <style>
            .counter { display: inline-flex; align-items: center; gap: 10px; padding: 8px 14px; border-radius: 8px; }
            .count { min-width: 48px; text-align: center; font-weight: 700; font-size: 1.25rem; }
        </style>
    </div>

    <!-- 实例化：mounted 读 data-count=10 初始化 -->
    <div x-use="counter" data-count="10"></div>
    <!-- 传 props：count=100、step=5 覆盖 data() 默认 -->
    <div x-use="{ name: 'counter', count: 100, step: 5 }"></div>
</div>
```

至此你已掌握组件的全部核心用法。下面的指南深入每个特性的细节。

## 指南

### 组件类型

组件按**声明位置与可见范围**分两类。

#### 作用域组件

在模板里用 `<div x-component="name">` 声明的组件，挂在**最近祖先 scope**，仅本作用域（及其子树）可见。这是最常用的形式：

```html
<div x-scope>
    <div x-component="badge"><span>局部徽章</span></div>
    <div x-use="badge"></div>  <!-- 命中上面的局部组件 -->
</div>
```

作用域组件支持「就近覆盖」——内层 scope 声明的同名组件会遮蔽外层，这与组件查找的就近原则一致。配合全局组件，可实现「公共全局 + 局部特例」。

<demo html="template/component/scoped.html"/>

#### 全局组件

在构造引擎时经 `options.components` 传入的组件，是字符串模板，全引擎复用。当 scope 链上没有同名作用域组件时，`getComponent` 最终兜底到全局组件：

```javascript
const engine = new AutoTemplateEngine(el, {}, {
    components: {
        badge: `<span class="badge">全局徽章</span>`,
        // 支持 <script setup> 与 <style>，能力与作用域组件等价
        card: `<div class="card"><span x-text="title"></span><script setup>{ data(){return{title:'默认'}} }</script></div>`,
    },
});
```

全局组件字符串入参首次使用时，按顶级节点数**自动包装**为「恰好一个带 `x-component` 的根元素」（详见下文「声明组件」），并懒预编译缓存。

<demo html="template/component/global.html"/>

### 声明组件

#### 编译期摘除

`x-component` 是**声明性资源，不是渲染指令**。编译期一个前置 transformer 命中它，做四件事：

1. 提取子节点中的 `<script setup>` 与 `<style>`（求值/收集，从快照移除）；
2. **深克隆**剩余 DOM 为冻结快照（保留指令属性，尚未编译）；
3. 按名存入**最近祖先 scope** 的 `components` 映射；
4. 返回 `null` **剪枝**——组件元素及其子树不进结果 DOM、不建 scope。

所以组件元素本身永远不会出现在页面上：

```html
<div x-scope>
    <!-- 声明：编译后从 DOM 消失，仅作为 "counter" 组件供体 -->
    <div x-component="counter">
        <span x-text="count"></span>
        <script setup>{ data(){ return { count: 0 } } }</script>
    </div>
    <div x-use="counter"></div>
</div>
```

#### 组件归属

组件挂到其**最近的祖先 scope**——可以跨任意深度的中间纯 `<div>`（这些不建 scope 的容器会被穿透）。向上找不到任何带 scope 的祖先时，编译期 `warn` 丢弃该组件。这就是为什么作用域组件声明通常需要一个 `x-scope`（或任意其他建 scope 的指令/插值）作为祖先锚点。

#### 命名约定

- 组件名自由命名（`counter`、`my-card`、`UserAvatar` 均可），不预定义任何 UI 态名册；
- 无值的 `x-component`（裸属性）取默认名 `default`；
- 同名组件直接归属**同一 scope** 时 `warn` + 后者覆盖（不抛错）；
- 沿 parent 链允许就近覆盖（内层遮蔽外层）。

#### 全局组件自动包装

全局组件字符串入参规范化为「恰好一个带 `x-component` 的根元素」（仅全局字符串入参适用，作用域组件入参已是 DOM）：

| 输入形态 | 包装结果 |
| --- | --- |
| 单顶级元素、无 `x-component` | 根打本 key 名（`x-component="name"`） |
| 单顶级元素、**已含** `x-component` | 尊重原值不重命名 |
| 多顶级节点 / 元素+文本混排 | 包一层 `<div x-component="name">` |
| 纯文本无元素 | 包成 `<div x-component="name">文本` |

包装标签固定 `<div>`。

### 组件实例化

#### `x-use` 基础

`x-use` 在模板中实例化一个已声明的组件。实例化时**宿主化身组件根**：宿主元素保留身份，组件快照子树编译挂入。

```html
<!-- 字面量组件名（不经表达式求值） -->
<div x-use="counter"></div>

<!-- 传 props：对象形式，name/is/component 字段标识组件名，其余键作 props -->
<div x-use="{ name: 'counter', count: 100 }"></div>
```

值解析双轨：

- **纯标识符**（如 `x-use="counter"`、`x-use="my-card"`）→ 字面量组件名，直接实例化，不订阅状态；
- **对象字面量 / 表达式**（如 `x-use="{name:'counter',count:1}"`）→ 经 `watch` 求值，支持响应式（组件名/props 随状态变化）。

#### props 注入

`x-use` 传入的 props 注入组件的**同一个 data 域**，合并顺序是 `data()` 默认先注入、props 后覆盖（外部优先）。后续 props 响应式更新只覆盖声明键，组件内部状态（用户交互改的）不被重置。

<demo html="template/component/use-props.html"/>

#### 属性继承

宿主化身组件根后，组件快照根的属性并入宿主：

- `class`：**拼接**（宿主 class + 组件根 class）；
- `style`：合并，冲突键**组件根优先**；
- 其他属性：宿主已有则保留（不覆盖），否则复制组件根属性。

<demo html="template/component/use-props.html"/>

#### 结构指令互斥

`x-use` 与结构指令（`x-if` / `x-for` / `x-slot` / `x-switch` / `x-tree` 等）**不能同元素**——编译期 `warn` 并跳过实例化。要控制组件显隐，把 `x-show` / `x-if` 写在外层包裹元素上：

```html
<!-- ❌ 冲突：x-use 与 x-for 同元素 -->
<div x-for="i in 3" x-use="card"></div>

<!-- ✅ 把结构控制写在外层 -->
<div x-if="show">
    <div x-use="card"></div>
</div>
```

### 组件上下文

组件 methods 与生命周期钩子内的 `this` 是一个上下文对象，提供三件套：

| `this.x` | 指向 |
| --- | --- |
| `this.data` | 组件聚合数据视图（含 `data()` 返回值 + `x-use` 传入的 props），响应式、可读可写 |
| `this.state` | 全局 store 状态（`engine.store.state`） |
| `this.scope` | 当前组件实例 scope（`this.scope.el` 即组件根元素） |

`methods` 注入 `scope.actions`，复用 `x-on` 的 action 查找机制——所以 `x-on:click="inc"` 能直接调用组件方法。方法内 `this.data.count++` 修改后，界面自动更新。

下面这个 demo 展示在 `created` 钩子里读全局 `state.user.name` 与自身 `data.greeting` 拼接问候语：

<demo html="template/component/context.html"/>

```html
<div x-component="hello">
    <div x-text="message"></div>
    <script setup>
        {
            data() { return { greeting: '你好' } },
            created() {
                // created：读全局 state + 自身 data 拼接
                this.data.message = `${this.data.greeting}，${this.state.user.name}！`;
            },
            mounted() {
                this.scope.el.setAttribute('title', '由组件上下文生成');
            },
        }
    </script>
</div>
```

::: tip methods 不广播事件
组件 methods 定位是「组件内部逻辑」，注入 `scope.actions` 时**不经事件总线包装**——即不广播 `actions/<name>/{pending,resolved,rejected}`、不冒泡 CustomEvent。需要跨元素事件聚合时，方法内显式 `this.scope.engine.emit(...)`，或让祖先 watch 组件改动的 data。
:::

### 组件样式

#### 作用域 CSS（scoped）

组件内的 `<style>` 默认仅命中本组件实例，机制是**属性后缀法**（仿 Vue `<style scoped>`）：

1. 实例化时给**组件根 + 所有后代元素**打唯一 `data-cmp-{id}` 属性；
2. `<style>` 每条选择器末尾自动追加 `[data-cmp-{id}]`，使样式隔离到本实例；
3. 同名组件的样式按**组件定义缓存**（只改写注入一次），多实例共享，引用计数管理移除。

改写规则覆盖：媒体查询（`@media`）内部照常改写、逗号选择器各组分别加、伪类伪元素（`:hover`/`::before`）属性后缀置于其前。

<demo html="template/component/scoped-style.html"/>

```html
<div x-component="card">
    <div class="title" x-text="title"></div>
    <style>
        /* 仅命中本组件实例的 .title，不影响页面同名 class */
        .title { color: #3273dc; font-weight: 700; }
        .title:hover { color: #23d160; }   /* 属性后缀置于伪类前 */
    </style>
</div>
```

::: warning 不支持深度穿透
当前不支持 `:deep()` / `>>>`（纯隔离）。真实穿透需求出现时再加——它只是改写器的一个额外规则，不影响架构。
:::

#### 响应式样式（`<style>` bind）

`<style>` 的声明值可以写 `bind(expr)`，把状态/表达式注入为 **CSS 变量**，实现样式的响应式——状态变，样式跟着变，无需 `:style` 逐元素绑定：

```html
<div x-component="bar">
    <div class="bar-track"></div>
    <style>
        .bar-track {
            width: bind("barWidth + 'px'");     /* 表达式 → 注入为 --h{hash} */
            background: bind("barColor");        /* 纯路径 → 注入为 --bar-color */
        }
    </style>
</div>
```

**工作原理**：编译期扫描 `<style>`，把 `bind(expr)` 替换为 `var(--变量名, unset)` 并记录绑定清单；实例化时对每个绑定订阅表达式，求值结果写入**组件根元素**的 CSS 变量。状态变化 → 变量更新 → 所有引用该变量的样式自动刷新。

<demo html="template/component/style-bind.html"/>

**bind 语法**：

- `bind(expr)` 或 `bind("expr")`——**引号可选**，二者等价；
- **仅作为整个属性值**：`bind()` 必须独占声明值位置，不能嵌入复合值（`margin: 8px bind("gap")` 非法）；
- 参数支持**任意表达式**（纯路径如 `theme.primary`，或运算式如 `w + base`、`count * 2`）。

**变量名规则**——同一表达式在多处 `bind()` 共享同一个变量名（只订阅一次，多处引用）：

| 形态 | 规则 | 示例 |
| --- | --- | --- |
| **纯路径**（仅 `字母/数字/_/$/.`） | `--{路径}`，`.`→`-` | `bind("order.style")` → `--order-style` |
| **表达式**（含运算符等） | `--h{hash}`（确定性短 hash，`h` 保变量名合法） | `bind("a+b")` → `--h1a2b3c` |

::: warning 数字值需配 calc
CSS 变量是**字符串**——`bind("count")` 注入 `100` 时，`width: var(--count)` 无效（需 `100px`）。两种写法：表达式里拼单位 `bind("count + 'px'")`，或用 `calc`：`width: calc(var(--count) * 1px)`。
:::

**无效值的安全回退**：当表达式返回 `null` / `undefined`（或求值失败），**不写入变量**，CSS 自动走 `var(--name, unset)` 回退——无效值不影响布局。`bind` 的回退值固定为 `unset`、不可配；需要自定义默认值时改用 `:style` 指令。

### 生命周期

组件实例有**四阶段**生命周期钩子，挂在 `scope.hooks`：

| 钩子 | 触发时机 | 典型用途 |
| --- | --- | --- |
| `created` | 组件 scope 创建 + data 注入后、编译前 | 初始化（建订阅、读初始 props、拼接首帧数据） |
| `mounted` | DOM 子树编译完成 | DOM 就绪后操作（绑第三方库、读尺寸） |
| `beforeUnmount` | 卸载前（watcher 仍活） | 带状态的精确清理（注销监听/定时器） |
| `unmounted` | 卸载后 | 无状态收尾 |

::: warning 为何没有 activated/deactivated、beforeUpdate/updated？
本引擎是**细粒度响应式 + DOM 模板**，没有 Vue 那样的「组件实例缓存层」（`<keep-alive>`），scope 销毁即销毁——故 `activated`/`deactivated` 无自然触发点。同理，每个绑定各自更新，没有「组件整体重渲染」的节点，`beforeUpdate`/`updated` 也无对应。需要显隐控制用 `x-show` / `x-if`（配合 `mounted`/`unmounted`）。
:::

下面这个 demo 用 `x-if` 切换组件挂载/卸载，把每次钩子触发实时记录到日志面板（`mounted` 启动定时器、`beforeUnmount` 清理）：

<demo html="template/component/lifecycle.html"/>

```html
<div x-component="timed">
    <div class="timer">组件存活中 · <span x-text="tick"></span></div>
    <script setup>
        {
            data() { return { tick: 0, timer: null } },
            created() { log('created', 'scope 已建、data 已注入') },
            mounted() {
                log('mounted', 'DOM 编译完成');
                this.data.timer = setInterval(() => this.data.tick++, 1000);
            },
            beforeUnmount() {
                log('beforeUnmount', '清理定时器');
                clearInterval(this.data.timer);   // watcher 仍活，可读最终状态
            },
            unmounted() { log('unmounted', '卸载收尾') },
        }
    </script>
</div>

<div x-if="show"><div x-use="timed"></div></div>
```

**`mounted` 语义澄清**：本引擎「编译即挂载」——`scope.compile()` 完成时子 DOM 已构建在父 DOM 树里（整棵树未必已插入 `document`）。`mounted` 指「子 scope 编译完成、DOM 子树构建完成」，而非 Vue 的「插入 document」。

::: tip 钩子容错
单个钩子抛错**不阻断其余**——同名多个钩子串行调用，try-catch 隔离，一个失败不影响后续。多个 `<script setup>` 的同名 hook 会串行执行。
:::

### 远程加载组件

`x-import` 从远程 url 加载组件定义——fetched HTML 内可含 **1-N 个 `x-component`**，加载后注册到当前 engine：

```html
<!-- 作用域组件：挂最近祖先 scope，仅本作用域可见 -->
<div x-import="/components.html"></div>

<!-- 全局组件（.global 修饰符）：注册到 engine，全引擎复用 -->
<div x-import.global="/global-components.html"></div>
```

加载后用 `x-use` 实例化即可。远程组件与本地组件能力**完全等价**——同样支持 `<script setup>`、`<style>`、props、生命周期。

#### 异步占位与编译时序

`x-import` 的 fetch 是异步的，**不阻塞编译**。组件就绪前，`x-use` 宿主显示 loading 占位；组件就绪后引擎广播 `component/registered`，pending 的 `x-use` 收到通知重新实例化（首次渲染用最新 props）。

```html
<div x-scope>
    <!-- 1. 发起远程加载 -->
    <div x-import="/components/like-button.html"></div>
    <!-- 2. 加载完成前显示 loading 占位，就绪后自动渲染 -->
    <div x-use="like-button"></div>
</div>
```

<demo html="template/component/import.html"/>

#### `.global` 修饰符与批量注册

一个远程 HTML 文件可含多个 `x-component`，一次性批量注册。加 `.global` 修饰符则注册为全局组件，全引擎可跨任意作用域实例化：

```html
<!-- widgets.html 含 stat 与 chip 两个组件，全部注册为全局 -->
<div x-import.global="/components/widgets.html"></div>

<div x-use="{ name: 'stat', label: '收入', value: '12,580', tone: 'up' }"></div>
<div x-use="{ name: 'chip', text: '批量注册' }"></div>
```

<demo html="template/component/import-global.html"/>

#### 健壮性

| 场景 | 行为 |
| --- | --- |
| url 缓存 | 重复 `import` 同一 url 只 fetch 一次 |
| 循环 import | A import B import A → `warn` + 中断该条链（不抛错，已加载的照常注册） |
| fetch 失败 / HTTP 非 2xx | `warn` + 该组件视为未注册（不阻断其余组件） |
| url 响应式 | url 含表达式特征时经 `watch` 求值，url 变化重新加载 |

::: tip 远程组件测试文件
上面两个 demo 加载的真实组件文件在仓库 `docs/public/components/` 下：[`like-button.html`](https://github.com/zhangfisher/autostore/blob/main/docs/public/components/like-button.html)（作用域，含 data/methods/scoped style）、[`widgets.html`](https://github.com/zhangfisher/autostore/blob/main/docs/public/components/widgets.html)（全局，含 stat 与 chip 两个组件）。可下载到自己的静态服务器复用。
:::

### 组件间通讯

组件实例各自拥有独立的 data 域，默认互不可见。本引擎没有 Vue 那样的 `provide/inject` 或 React 的 Context 专用机制，但靠下面三种**既有的响应式/事件能力**即可覆盖组件间通讯的全部场景。

#### 方式一：props 下传（父 → 子）

父组件（或页面）经 `x-use` 的 props 把数据注入子组件 data 域。这是最直接的单向数据流：

```html
<!-- 父把 label 传给 product 组件 -->
<div x-use="{ name: 'product', label: '键盘', id: 1 }"></div>
```

子组件在 `data()` 里声明同名字段作默认值，props 覆盖之。详见上文「实例化 → props 注入」。

#### 方式二：全局 state 共享（任意组件 ↔ 任意组件）

所有组件都可通过 `this.state` 读写**全局 store 状态**。把需要跨组件共享的数据放在全局 state，任意组件改它，其他订阅了该路径的组件自动刷新——这是本引擎最自然的通讯方式（细粒度响应式本就是核心能力）。

```html
<div x-component="product">
    <button x-on:click="inc">+</button>
    <script setup>
        {
            methods: {
                inc() {
                    // 子组件改全局 state.cart，cart-total 会自动刷新
                    this.state.cart[this.data.id] = this.data.qty;
                },
            },
        }
    </script>
</div>

<!-- 另一个组件订阅全局 state.cart，product 一改它就联动 -->
<div x-component="cart-total">
    <span x-text="total"></span>
    <script setup>
        {
            data() { return { total: 0 } },
            created() {
                // watch 全局 state.cart，变化时重新求和
                this.scope.engine.store.watch('cart', () => {
                    this.data.total = Object.values(this.state.cart).reduce((s, n) => s + n, 0);
                });
            },
        }
    </script>
</div>
```

`this.state` 是 `engine.store.state`，组件内直接读写；`this.scope.engine.store.watch(path, fn)` 监听全局路径变化。

#### 方式三：事件总线（跨组件解耦）

`engine` 本身是一个事件发射器（`on` / `emit` / `once` / `onAny`）。当两个组件**没有父子关系、也不宜共享 state** 时，用自定义事件解耦通讯——发送方 `emit`，任意监听方 `on`：

```html
<div x-component="product">
    <button x-on:click="favorite">收藏</button>
    <script setup>
        {
            methods: {
                favorite() {
                    // 发送方：emit 自定义事件
                    this.scope.engine.emit('favorite', { id: this.data.id, name: this.data.label });
                },
            },
        }
    </script>
</div>
```

```javascript
// 接收方（任意位置：脚本、另一个组件的 created、祖先作用域）
engine.on('favorite', (e) => {
    console.log('收到收藏事件', e);
});
```

事件总线适合「一次性的动作通知」（如收藏、删除、跳转），不适合「持续的状态同步」（那用全局 state 更合适，响应式自动驱动）。

#### 三种方式怎么选

| 通讯场景 | 推荐方式 |
| --- | --- |
| 父传子配置/初始数据 | **props 下传**（`x-use` 对象） |
| 多组件共享/同步一份持续状态（如购物车、登录态） | **全局 state**（`this.state` + `watch`） |
| 无父子关系的动作通知（如收藏、收藏计数） | **事件总线**（`engine.emit/on`） |
| 子组件通知父组件数据变化 | 子写**全局 state**，父 `watch`；或子 `emit`、父 `on` |

下面这个 demo 用购物车场景一次性演示三种方式：商品组件（props 下传 + 改全局 state）、合计组件（订阅全局 state 联动）、收藏侧栏（监听事件总线）。

<demo html="template/component/communication.html"/>

::: tip 事件总线跨作用域
`engine` 的事件总线是**引擎级**的——任意作用域、任意组件、甚至页面脚本都能 `emit`/`on`。事件名自由约定（引擎不预定义名册），建议用带命名空间的写法（如 `cart/add`、`user/login`）避免冲突。
:::

## 配置

### 组件声明配置

| 项 | 位置 | 说明 |
| --- | --- | --- |
| `x-component="name"` | 元素属性 | 声明作用域组件，`name` 为组件名（裸属性取名 `default`） |
| `x-scope` | 元素属性 | 为纯容器建 scope 锚点，让内部 `x-component` 有归属（详见 [x-scope](./directives/x-scope.md)） |
| `options.components` | engine 构造选项 | 声明全局组件，`Record<string, string>`（字符串模板，自动包装） |

### `x-use` 配置

```html
<!-- 字面量组件名 -->
<div x-use="counter"></div>

<!-- 对象形式：name/is/component 标识组件名，其余键作 props -->
<div x-use="{ name: 'counter', count: 100, step: 5 }"></div>
```

`x-use` 无指令选项、无修饰符，值即组件名或 props 对象。

### `x-import` 配置

```html
<!-- 作用域加载（默认） -->
<div x-import="/components.html"></div>

<!-- 全局加载（.global 修饰符） -->
<div x-import.global="/components.html"></div>

<!-- name 属性（可选诊断）：加载后校验该名组件已注册，未注册则 warn -->
<div x-import="/components.html" name="my-button"></div>
```

| 项 | 说明 |
| --- | --- |
| 指令值 | url 字面量（`/`、`./`、`http(s)://` 开头）或响应式表达式 |
| `.global` | 修饰符，注册为全局组件（默认作用域） |
| `name` | 可选属性，加载后校验该名组件已注册 |

::: info 关于指令配置体系
指令选项 / 修饰符 / 宿主选项 / 两层回退见[指令配置](./config.md)。
:::

## 注意事项

- **组件元素不渲染自身**：`x-component` 声明的元素编译期被摘除，不进结果 DOM、不建 scope。它只是「模板供体」，由 `x-use` 克隆实例化。
- **必须有祖先 scope**：每个 `x-component` 都需要至少一个带 scope 的祖先（`x-scope` 或任意其他建 scope 的指令/插值），否则编译期 `warn` 丢弃。最简单做法是用 `x-scope` 包裹。
- **组件根天然建 scope**：`x-use` 实例化时消费编译路径内禀保证组件根建 scope，无需在组件根上额外声明 `x-scope`（冗余声明静默无副作用）。
- **`x-use` 与结构指令互斥**：`x-use` 不能与 `x-if`/`x-for`/`x-slot`/`x-switch`/`x-tree` 同元素。要控制显隐，把结构指令写在外层包裹元素上。
- **props 覆盖不重置内部状态**：props 响应式更新只覆盖声明键；组件内部状态（用户交互改的 `data` 字段）不会被外部 props 重置。
- **scoped 样式不穿透**：`<style>` 默认纯隔离，不支持 `:deep()`/`>>>`。
- **`bind` 回退固定 unset**：响应式样式的 `var()` 回退值固定为 `unset`、不可配；要自定义默认值用 `:style` 指令。
- **methods 不经事件总线**：组件 methods 不广播 `actions/*` 事件、不冒泡 CustomEvent（定位是组件内部逻辑）。需事件聚合时显式 `this.scope.engine.emit(...)`。
- **全局组件配置期语义**：`options.components` 是构造期配置，运行时突变它**不失效懒预编译缓存**（与 `actions`/`sanitizer` 等同纪律）。要动态注册组件用 `x-import`。
- **远程加载需静态服务器**：`x-import` 经 `fetch` 加载，本地直接打开 HTML 文件（`file://`）会因 CORS 受限，需通过 HTTP 服务器访问。

## 常见问题

### 组件声明了，但页面上看不到 / 报 "组件无处归属" 警告？

`x-component` **本身就不渲染**——它编译期被摘除。如果你是想**使用**组件，需要用 `x-use` 实例化它。如果是 `warn` 提示组件无处归属，说明组件声明处缺少带 scope 的祖先，在最外层包一个 `<div x-scope>` 即可：

```html
<!-- ❌ 根无 scope，组件被 warn 丢弃 -->
<div>
    <div x-component="card">...</div>
</div>

<!-- ✅ x-scope 提供归属锚点 -->
<div x-scope>
    <div x-component="card">...</div>
    <div x-use="card"></div>
</div>
```

### `x-use` 和 `x-if` 写一起为什么组件不渲染？

`x-use` 与结构指令（`x-if`/`x-for`/`x-slot`/`x-switch`/`x-tree`）互斥，同元素会 `warn` 并跳过实例化。把结构指令挪到外层包裹元素：

```html
<!-- ❌ 互斥 -->
<div x-if="show" x-use="card"></div>
<!-- ✅ 外层控制显隐 -->
<div x-if="show"><div x-use="card"></div></div>
```

只需切换可见性（不销毁重建）用 `x-show` 包裹即可。

### 方法里 `this.count` 为什么是 `undefined`？

组件数据在 `this.data` 上，不是 `this` 根。正确写法是 `this.data.count`：

```javascript
methods: {
    // ❌
    inc() { this.count++ },
    // ✅
    inc() { this.data.count++ },
}
```

`this.data` 是组件聚合数据视图（`data()` 返回 + `x-use` props），响应式可读写；`this.state` 是全局 store 状态；`this.scope` 是组件实例 scope。

### props 和 `data()` 的同名字段，哪个生效？

**props 生效**。合并顺序是 `data()` 默认先注入、`x-use` props 后覆盖（外部优先）。但 props 后续更新只覆盖它**声明的键**——组件内部改的字段（没被 props 声明的）不会被重置。

### 同名组件会冲突吗？

分情况：

- **同一 scope 内**同名：`warn` + 后者覆盖（不抛错）。
- **沿 parent 链**：内层 scope 的同名组件**就近遮蔽**外层（含全局同名组件）。这是特性而非 bug，可用它实现「公共全局 + 局部特例」。

### scoped 样式怎么穿透到子组件？

当前**不支持穿透**（无 `:deep()`/`>>>`），`<style>` 纯隔离到本实例。如果确实需要影响子组件，两种变通：把公共样式提到页面级 `<style>`（不进 scoped），或通过 props 把样式值传入子组件用 `bind()` 注入。真实穿透需求足够多时引擎会补 `:deep()` 支持。

### `bind()` 写了但样式没反应？

常见原因：

1. **数字值没拼单位**：`width: bind("count")` 注入的是纯数字 `100`，对 `width` 无效。用 `bind("count + 'px'")` 或 `width: calc(var(--count) * 1px)`。
2. **写成了复合值**：`margin: 8px bind("gap")` 非法。`bind()` 必须独占整个属性值。
3. **值是 null/undefined**：此时走 `var(--name, unset)` 回退，表现为默认值（这是设计的安全行为，非 bug）。

### 远程组件加载失败怎么办？

`x-import` 失败时 `warn` + 该组件视为未注册，`x-use` 宿主保持 loading 占位（不崩溃）。排查：

- 确认通过 HTTP 服务器访问（`file://` 会因 CORS 受限）；
- 确认 url 正确、返回 HTTP 2xx；
- 远程 HTML 里确有 `<div x-component="name">` 元素（无 `x-component` 的节点不会被注册）。

### 组件能递归调用自己吗？

可以。组件模板内 `x-use="自身名"` 会实例化自身（树形/菜单组件常见），带深度上限保护（默认 100），超限 `warn` + 停止，防无限递归。注意递归必须有终止条件（数据结构到叶子层停止）。

```html
<div x-component="tree-node">
    <span x-text="node.name"></span>
    <!-- 递归：对每个子节点实例化自身 -->
    <div x-for="child of node.children">
        <div x-use="{ name: 'tree-node', node: child }"></div>
    </div>
</div>
```

### 组件内能再声明私有子组件吗？

可以。在组件 A 的定义里声明组件 B，则 B 是 A 的**私有子组件**——仅 A 的实例（及其实例子树）可见，外层查不到。机制上 `x-use` 实例化 A 时编译其快照子树，内层 B 经收集器归属到 A 的实例 scope，运行期 scope 链天然实现严格私有。

---

组件讲完。它常与 `x-loading` 配合（定制其默认 UI），其作用域锚点 `x-scope` 的更多背景见 [x-scope](./directives/x-scope.md)，实例化指令 `x-use` 与远程加载 `x-import` 的指令级细节见[指令](./directives/x-bind.md)。
