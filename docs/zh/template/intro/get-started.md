# 快速入门

三步上手 `AutoTemplate Engine`：**引入引擎 → 写模板 → 建引擎实例**。状态一变，界面自动更新。

<demo html="template/get-started.html"/>

## 1. 引入引擎

::: code-group

```html [IIFE]
<script src="/path/to/template.js"></script>
<script>
    const { AutoTemplateEngine } = AutoTemplateSpaces;
</script>
```

```javascript [ESM]
import { AutoTemplateEngine } from "@autostorejs/template";
```

:::

安装方式见[安装](./install.md)。

## 2. 写模板

在 HTML 元素上用 `x-*` 指令声明状态绑定。下面这段模板同时演示了三种典型用法：

```html
<div id="app">
    <!-- x-text：把状态值绑到 textContent -->
    <p>你好，<span x-text="user.name"></span>！</p>
    <!-- {{ }}：文本节点插值，效果与 x-text 等价 -->
    <p>商品：{{ order.name }}，单价 {{ order.price }} 元</p>
    <!-- @click：点击触发动作 -->
    <button @click="rename">改名 + 加购</button>
</div>
```

## 3. 建引擎实例

选中挂载元素、传入状态、（可选）注册动作，引擎立即编译模板并挂载到 DOM：

```javascript
const { AutoTemplateEngine } = AutoTemplateSpaces;
const engine = new AutoTemplateEngine(
    document.getElementById("app"),
    {
        user: { name: "张三" },
        order: { name: "AutoStore 手册", price: 18, count: 3 },
    },
    {
        actions: {
            rename: () => {
                engine.state.user.name = "李四"; // 改状态，DOM 自动更新
                engine.state.order.count += 1;
            },
        },
    },
);
```

点击按钮，`rename` 动作改写 `engine.state`，所有订阅了相关状态的指令（`x-text` 与双花括号插值）自动刷新。

## 发生了什么

1. 引擎把 `#app` 当作模板，编译出一棵移除指令属性的渲染树并挂载到 DOM；
2. 每条指令（`x-text`、双花括号插值）在编译期订阅自己用到的状态路径；
3. 动作里改 `engine.state.*` 触发订阅，调度器合并后只 patch 受影响节点。

## 下一步

- 系统了解引擎构造与生命周期：[初始化](../guide/initial.md)
- 响应式原理与插值细节：[响应式](../guide/reactive.md)
- 浏览所有指令：[指令](../guide/directives/x-bind.md)
