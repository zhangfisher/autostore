# 特征与优势

`AutoTemplate Engine` 用「最小声明」换取「最大响应」——以最少的 HTML 属性，实现完整的响应式 UI 更新。下面是它的核心特征。

## 最小声明语法

只需在 HTML 元素上书写 `x-*` / `@*` / `:*` 指令，就能声明状态绑定、事件处理与结构控制，无需命令式 DOM 操作，也无需引入完整组件框架。

```html
<div id="app">
    <span x-text="user.name"></span>
    <button @click="rename">改名</button>
</div>
```

指令一览：

| 前缀 | 用途 | 示例 |
| --- | --- | --- |
| `x-*` | 内容 / 结构 / 数据指令 | `x-text` `x-if` `x-for` `x-data` |
| `:*` 或 `x-bind:*` | 属性绑定 | `:class` `:style` `:disabled` |
| `@*` 或 `x-on:*` | 事件绑定 | `@click` `@input` `@submit` |

## 细粒度响应式更新

引擎复用 `AutoStore` 的**路径订阅**——每条指令只订阅自己用到的状态路径，状态变化经调度器微任务合并后，**只 patch 受影响的节点**，不重建整棵子树。

```javascript
engine.state.user.name = "李四";
// 只有订阅了 user.name 的指令刷新，其余 DOM 原地不动
```

这意味着：

- **精确更新**：改一个字段，只重写对应的 `textContent` / 属性，保留焦点、滚动、未提交输入等运行态。
- **自动批处理**：同一 tick 内多次状态变更合并为一次 patch，避免频繁重排，无需手动批处理。

## 文本与属性插值

除了 `x-text`，还可以在**文本节点**与**属性值**中直接用双花括号插值，同样响应式：

```html
<!-- 文本插值：一段话里穿插多个值 -->
<p>商品：{{ order.name }}，单价 {{ order.price }} 元</p>

<!-- 属性插值：把状态拼进属性 -->
<a href="/users/{{ user.id }}">主页</a>
<input class="row {{ theme }}" />
```

文本插值按段拆分、每段独立订阅；属性插值在编译期归一化为属性绑定，复用同一套绑定分派逻辑——零额外学习成本。

## store | state 双向数据源

构造器第二参既可接收一个**现成的 `AutoStore` 实例**（与其他模块共享状态），也可直接传**裸状态对象**（引擎自动建 store 并接管销毁）：

```javascript
// 方式一：传入 AutoStore 实例（借用，destroy 不销毁它）
const store = new AutoStore({ ... });
new AutoTemplateEngine(el, store);

// 方式二：传入裸状态（引擎自建 store，destroy 时自动回收）
new AutoTemplateEngine(el, { user: { name: "张三" } });
```

这让引擎既能作为独立页面的渲染层（裸状态自给自足），也能嵌入已有 `AutoStore` 架构（共享同一状态树），集成方式灵活。

---

更多能力（动作系统、动态模板、自定义指令、事件总线）见[指南](../guide/initial.md)。
