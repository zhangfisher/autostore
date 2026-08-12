# 快速入门

本页带你从零搭起一个 **TODO 应用**——分 N 步，每步引入一两个指令，最后拼成一个相对完整的小程序。跟着写，结束时你会掌握引擎的核心套路。

> 不熟悉 `状态`、`指令`、`作用域` 这些词？先花两分钟读一遍[名词解释](./glossary.md)。

下面是最终成品的样子：

<demo html="template/get-started-todo.html"/>

接下来一步步实现它。

## 第 1 步：安装与引入

按[安装](./install.md)装好 `@autostorejs/template`。在浏览器里直接用 IIFE 产物最省事——全局挂载在 `AutoTemplateSpaces` 下：

```html
<script src="/path/to/template.js"></script>
<script>
    const { AutoTemplateEngine } = AutoTemplateSpaces;
</script>
```

项目里用打包工具就走 ESM：

```javascript
import { AutoTemplateEngine } from "@autostorejs/template";
```

## 第 2 步：准备 HTML 与状态

TODO 应用的核心是一组任务。先给页面一个挂载点，再给引擎一份初始状态。

```html
<div id="app">
    <h1>TODO 清单</h1>
    <!-- 列表稍后用 x-for 渲染 -->
</div>

<script>
    const { AutoTemplateEngine } = AutoTemplateSpaces;
    const engine = new AutoTemplateEngine(
        document.getElementById("app"),
        {
            input: "", // 输入框当前文字
            todos: [
                { id: 1, text: "阅读快速入门", done: false },
                { id: 2, text: "写一个 TODO 应用", done: false },
            ],
        },
    );
</script>
```

构造器第二参传**裸状态对象**，引擎自动建立 store——不用手动 `new AutoStore`。改 `engine.state.*` 才会触发更新，直接改原始对象无效。

::: tip 状态是「真相源」
界面随状态变，不是状态随界面变。所有改动都落到 `engine.state`，引擎负责把变化 patch 到 DOM。
:::

## 第 3 步：用 x-for 渲染列表

`x-for` 根据数组重复渲染一段模板。语法是 `项变量 of 数组路径`，`:key` 声明在容器上、用唯一标识帮助复用。

```html
<ul id="list" x-for="todo of todos" :key="todo.id">
    <li>{{ todo.text }}</li>
</ul>
```

项模板里用项变量（`todo`）访问当前项的字段。`{{ }}` 是文本插值，和 `x-text` 等价。现在增删 `engine.state.todos`（`push` / `splice` / 整体赋值）列表都会自动刷新。

::: warning x-for 独占容器子树
带 `x-for` 的元素是**容器**，渲染一次；它的元素子节点才是被重复的项模板。`:key` 写在容器（`<ul>`）上，不是项（`<li>`）上。
:::

## 第 4 步：用 x-model + @click 添加任务

加一个输入框和「添加」按钮。`x-model` 双向绑定输入框到状态；`@click` 点击触发动作。

```html
<div class="field has-addons">
    <input class="input" x-model="input" placeholder="要做点什么？" />
    <button class="button is-primary" @click="add">添加</button>
</div>
```

动作在构造器第三参注册，挂在 `engine.actions` 上。动作函数里 `this.state` 就是全局状态：

```javascript
const engine = new AutoTemplateEngine(
    document.getElementById("app"),
    { input: "", todos: [/* ... */] },
    {
        actions: {
            add() {
                const text = this.state.input.trim();
                if (!text) return;
                this.state.todos.push({
                    id: Date.now(),
                    text,
                    done: false,
                });
                this.state.input = ""; // 清空输入框，x-model 自动同步回 DOM
            },
        },
    },
);
```

几个要点：

- `@click="add"` 的值是裸标识符，引擎当**动作名**查找；写 `@click="add(1)"` 则带参调用。
- `x-model="input"` 输入即写回 `state.input`，`add` 里清空 `state.input` 后输入框也自动清空——双向。
- 想让回车也能添加？给输入框加 `@keydown.enter="add"`（`.enter` 是按键守卫修饰符）。

::: tip 动作的 this
动作里 `this` 是求值上下文：`this.state` 访问全局状态、`this.data` 访问所在 `x-data` 局部字段、`this.$event` 拿原生事件。详见[动作](../guide/action.md)。
:::

## 第 5 步：用 @click + :class 切换完成态

点击任务文字切换完成/未完成，完成的加删除线。这里串联两个指令：

- `@click="toggle(todo.id)"`——带参调用，把当前项 id 传给动作。
- `:class="表达式"`——按状态动态加 class。

```html
<ul x-for="todo of todos" :key="todo.id">
    <li>
        <span
            @click="toggle(todo.id)"
            style="cursor: pointer"
            :class="todo.done ? 'has-text-grey line-through' : ''"
        >
            {{ todo.text }}
        </span>
    </li>
</ul>
```

```javascript
actions: {
    toggle(id) {
        const todo = this.state.todos.find((t) => t.id === id);
        if (todo) todo.done = !todo.done;
    },
    // add 同上
},
```

`:class` 的值是**表达式**——三元运算按 `todo.done` 返回不同 class 串。`x-for` 项内改 `todo.done` 触发该项的 `:class` 重新求值、只 patch 这一个节点。

::: tip 为什么不用 checkbox？
首版 `x-model` 支持 text-like 控件（input 非 checkbox/radio + textarea），checkbox 的「勾选收集」是另一种语义。用 `@click` + `:class` 切换状态字段更直接，也能自由定制样式。详见 [x-model](../guide/directives/x-model.md)。
:::

## 第 6 步：删除任务与空状态

每项加个删除按钮，列表空了显示提示。

```html
<ul x-for="todo of todos" :key="todo.id">
    <li>
        <span @click="toggle(todo.id)" :class="todo.done ? 'line-through' : ''">
            {{ todo.text }}
        </span>
        <button class="delete is-small" @click="remove(todo.id)"></button>
        <!-- 空状态：数组为空时渲染一次 -->
        <p x-empty class="has-text-grey">还没有任务，添加一条吧～</p>
    </li>
</ul>
```

```javascript
actions: {
    remove(id) {
        const todos = this.state.todos;
        const i = todos.findIndex((t) => t.id === id);
        if (i >= 0) todos.splice(i, 1);
    },
    // add / toggle 同上
},
```

容器内带 `x-empty` 的子节点在数组为空时渲染一次、非空时拆除——省去手动判断「列表是不是空」。

::: warning x-empty 标签要匹配容器内容模型
`<ul>` 里用 `<li x-empty>`、`<select>` 里用 `<option x-empty>`——和项模板同标签，避免浏览器解析期挪动节点。
:::

## 第 7 步：用计算属性做剩余计数

底部显示「剩余 N 项未完成」。这是个**派生值**——直接用 AutoStore 的计算属性，状态一变自动重算。

```javascript
const engine = new AutoTemplateEngine(
    document.getElementById("app"),
    {
        input: "",
        todos: [/* ... */],
        // 同步计算属性：函数字段自动成为计算属性，scope 指向所在容器
        remaining: (scope) => scope.todos.filter((t) => !t.done).length,
    },
    { /* actions */ },
);
```

```html
<div class="has-text-grey is-size-7">
    剩余 {{ remaining }} / {{ todos.length }} 项未完成
</div>
```

状态对象里写成**函数**的字段就是同步计算属性。它的 `scope` 形参指向所在容器（这里是根），函数里访问 `scope.todos`，引擎自动追踪依赖——`todos` 任一项的 `done` 变化都让 `remaining` 重算、订阅它的 `{{ remaining }}` 自动刷新。

## 第 8 步：完整成品

把前 7 步拼到一起，就是开头看到的那个 TODO 应用。完整代码：

<demo html="template/get-started-todo.html"/>

```html
<div id="app">
    <h1 class="title is-4">TODO 清单</h1>

    <div class="field has-addons">
        <input class="input" x-model="input" placeholder="要做点什么？" @keydown.enter="add" />
        <button class="button is-primary" @click="add">添加</button>
    </div>

    <ul x-for="todo of todos" :key="todo.id">
        <li>
            <span @click="toggle(todo.id)" :class="todo.done ? 'has-text-grey line-through' : ''">
                {{ todo.text }}
            </span>
            <button class="delete is-small" @click="remove(todo.id)"></button>
        </li>
        <li x-empty class="has-text-grey">还没有任务，添加一条吧～</li>
    </ul>

    <div class="has-text-grey is-size-7">
        剩余 {{ remaining }} / {{ todos.length }} 项未完成
    </div>
</div>

<script>
    const { AutoTemplateEngine } = AutoTemplateSpaces;
    const engine = new AutoTemplateEngine(
        document.getElementById("app"),
        {
            input: "",
            todos: [
                { id: 1, text: "阅读快速入门", done: false },
                { id: 2, text: "写一个 TODO 应用", done: false },
            ],
            remaining: (scope) => scope.todos.filter((t) => !t.done).length,
        },
        {
            actions: {
                add() {
                    const text = this.state.input.trim();
                    if (!text) return;
                    this.state.todos.push({ id: Date.now(), text, done: false });
                    this.state.input = "";
                },
                toggle(id) {
                    const todo = this.state.todos.find((t) => t.id === id);
                    if (todo) todo.done = !todo.done;
                },
                remove(id) {
                    const todos = this.state.todos;
                    const i = todos.findIndex((t) => t.id === id);
                    if (i >= 0) todos.splice(i, 1);
                },
            },
        },
    );
</script>
```

## 小结

恭喜，你已经用 `AutoTemplate Engine` 搭出了一个具备增删改、完成态、空状态、实时计数的 TODO 应用。回顾这一路用到的核心能力：

| 步骤 | 引入的能力 | 关键指令 / 概念 |
| --- | --- | --- |
| 1 | 安装与引入 | IIFE / ESM 两种入口 |
| 2 | 挂载与状态 | 裸状态建 store、`engine.state` 是更新正道 |
| 3 | 列表渲染 | `x-for` + `:key` + `{{ }}` 插值 |
| 4 | 输入与交互 | `x-model` 双向绑定、`@click` 触发动作 |
| 5 | 状态联动 | `@click` 带参、`:class` 表达式、细粒度更新 |
| 6 | 增删与空态 | `splice` 数组操作、`x-empty` 空状态 |
| 7 | 派生数据 | 计算属性自动追踪依赖 |
| 8 | 整合成型 | 组合上面所有能力 |

贯穿全程的三条心智模型：

1. **状态是真相源**：所有改动落 `engine.state`，界面随状态变。
2. **指令是声明**：`x-for` 管「重复」、`x-model` 管「双向」、`@click` 管「触发」、`:class` 管「外观」——各司其职。
3. **更新是细粒度的**：状态变哪 patch 哪，不重建整棵子树，所以列表里改一项的 `done` 不会影响其他项。

## 下一步

TODO 应用只是起点。想继续深入：

- **引擎构造与生命周期**：[初始化](../guide/initial.md)
- **响应式原理与插值**：[响应式](../guide/reactive.md)
- **动作的完整能力**（异步、反馈、祖先聚合）：[动作](../guide/action.md)
- **逐个吃透指令**：从 [x-bind](../guide/directives/x-bind.md) 开始，侧栏「指令」分组列出了全部。
