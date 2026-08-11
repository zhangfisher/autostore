# x-html.compile：将注入 HTML 作为模板编译执行

x-html 原定位为"不编译注入内容"——注入 HTML 是静态快照，不建 scope、不注册 watcher（`html.ts` 原注释）。`.compile` 修饰符反转该定位：绑定值写回 `scope.template` 后调 `recompileSubtree`，作为子模板编译进宿主子树，与正常模板一致（建 scope/watcher、继承宿主作用域、支持嵌套 x-data/x-for/x-if）。

为此承受三项代价，皆经权衡：

1. **模板树污染**——写回 `scope.template`（engine.template 共享树）是该机制的要求：编译器的 `_linkParent` 靠模板树位置继承作用域，离树编译会断链。与 engine.patch 命令式改模板同源，属既定语义；副作用是 `scope.template` 子节点被永久改为末次注入内容（x-html 宿主一般不触发自身 `recompileSubtree`，风险可控）。
2. **跳过消毒**——compile 隐式强制跳过 sanitize（sanitize 会剥 `x-on`/`@*`/`:*` 指令属性致模板失效）。其安全等级**高于 `.raw`**：`.raw` 原样写 innerHTML，`<script>` 经浏览器约束不执行；compile 模式注入的 `x-on:click` 会真实绑定执行。须确保注入来源可信。
3. **全量重建**——每次绑定值变化销毁旧子 scope 树（off watcher）并重编译新内容，无 diff。

## Considered Options

- **(A) 写回 `scope.template` + `recompileSubtree`**（采纳）：复用现有重建内核，`_linkParent` 自动继承作用域，最小改动。代价是模板树污染（接受为设计要求）。
- **(B) 离树编译**（parseHtmlFragment 成 fragment 后手动建 scope / addChild）：不污染模板树，但须复刻 `_linkParent` 的 localScope 继承、把 `compileChild` 从单项泛化到多节点，维护成本高。拒绝。
- **(C) 字面调用 `engine.patch(selector, updater)`**：selector 无法稳定指向当前指令宿主，且 `_isInDynamicRegion` 会拒掉 x-for item 上的 x-html。拒绝。
