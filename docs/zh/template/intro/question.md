# 常见问题

## 它和 Alpine.js 有什么区别？

`AutoTemplate Engine` 的指令语法（`x-text` / `x-for` / `@click` / `:class`）灵感来自 [Alpine.js](https://alpinejs.dev/)，理念相近——在 HTML 里完成声明式绑定。关键区别：

- **状态层**：Alpine.js 自带轻量响应式；本引擎的状态层是完整的 `AutoStore`，支持计算属性（含异步计算）、状态监听、批量更新、数据校验等。
- **更新粒度**：本引擎基于 `AutoStore` 的路径订阅做细粒度 patch，而非整组件重渲染。

## 它和 AutoStore / @autostorejs/react 是什么关系？

- **`autostore`（核心库）**：响应式状态层，管「状态怎么变」。
- **`@autostorejs/template`（本包）**：声明式模板引擎，管「状态变了之后界面怎么更新」，消费 `AutoStore`。
- **`@autostorejs/react`**：React 集成，提供 hooks 与 signal 组件。

三者共享同一个 `AutoStore` 状态层。你可以把 `AutoTemplateEngine` 看作 React signal 之外的另一种渲染出口——面向纯 DOM、不依赖 React 的场景。

## 为什么有些指令没有文档 / 标注「规划中」？

模板引擎仍在快速迭代。下列指令**已注册并可用**：`x-text` `x-html` `x-if` `x-for` `x-data` `x-bind`（含 `:class` / `:style` / `x-class` / `x-style` 归一化）`x-on` `x-loading` `x-slot` `x-patch`。

另有 `x-model` `x-switch` `x-table` `x-teleport` `x-transition` `x-tree` 等**规划中**指令，文档以占位形式给出预期 API，待实现后补全。它们当前**尚未注册、不可用**。

## 浏览器兼容性如何？

引擎依赖浏览器原生 `DOMParser` 与 `TreeWalker` API 解析、遍历模板。所有现代浏览器（Chrome / Edge / Firefox / Safari 近年版本）均支持。不支持 IE。

## 性能怎么样？

- **编译期**：一次性解析模板、建立 scope 与订阅，结果缓存复用。
- **运行期**：状态变化走路径订阅 + 微任务调度合并，只 patch 受影响节点，避免不必要的重排。
- 模板过大时，可用 `engine.patch` 做**增量编译**（只重建指定子树），保留其余运行态。

## 如何调试？

构造时开启 `debug` 选项，引擎会输出更详细的日志：

```javascript
new AutoTemplateEngine(el, state, { debug: true });
```

也可订阅引擎的[事件总线](../guide/initial.md)（如 `engine/ready`、`scope/created`、`actions/*/pending`）观察内部生命周期。

## 可以自定义指令吗？

可以。所有内置指令都继承自 `AutoTemplateDirectiveBase`，你可以注册自己的指令类。详见[指令类型](../guide/directive.md)。
