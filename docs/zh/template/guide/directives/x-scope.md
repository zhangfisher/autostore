# x-scope 结构占位指令

## 概述

`x-scope` 是一个**零副作用的结构占位指令**，唯一作用是让一个「没有其他指令、没有 `{{}}` 插值」的纯容器元素在编译期建一个 scope——为后代 `x-component` 提供归属锚点，并在 scope 链上插入一道确定的边界。

```html
<div x-scope>
    <div x-component="loading">加载中…</div>
    <div x-loading="{ visible:'on' }">内容</div>
</div>
```

`compileElement` 只在元素「含指令或插值」时才建 scope，否则只浅克隆。这导致一个仅作结构包裹的纯 `<div>` 不建 scope——其后代 `x-component` 无处就近归属（编译期 `warn` 丢弃），后代 scope 的 parent 链也会越过它落到更远的祖先。`x-scope` 就是填补这个缺口的最轻手段：`created` / `compile` / `destroy` 全是空操作，不建数据域、不注入 data、不订阅、不渲染。

## 快速入门

`x-scope` 让纯容器建 scope，使内部的 `x-component="loading"` 有归属锚点。该组件声明了骨架屏模板——`x-loading` 渲染时自动取用它替换内置旋转 loader。注意：`x-component` 元素本身**不会出现在页面上**。

<demo html="template/component/basic.html"/>

## 指南

### 两大作用

`x-scope` 让任意纯容器都成为 scope 锚点，达成两件事：

1. **为后代 `x-component` 提供归属锚点**——`x-component` 收集时向上找最近 scope 挂 `components`，若无 `x-scope`（也无其他指令祖先），组件无处归属 → 编译期 `warn` 丢弃。`x-scope` 让任意 `<div>` 都能当组件容器。
2. **截断后代 scope 链**——后代 scope 经 `_linkParent` 向上找最近 scope 作父，若无 `x-scope`，后代的 parent 会落到更远的祖先（跳过中间纯容器），localData 继承链可能越过预期。`x-scope` 在此插入确定的 scope 边界。

### 何时用 x-scope

- 元素本身**没有指令、没有插值**，但你需要在其内部声明 `x-component` → 加 `x-scope`。
- 想在 scope 链上**显式插入一道边界**，约束后代 scope 的 parent 继承范围 → 加 `x-scope`。
- 元素已有 `x-text` / `:class` / `x-data` 等任意指令或插值 → **不需要** `x-scope`，它已是 scope。

```html
<!-- ❌ 根 div 无指令无插值 → 不建 scope → x-component 被丢弃（warn） -->
<div>
    <div x-component="loading">加载中</div>
</div>

<!-- ✅ x-scope 让纯 div 建 scope → x-component 有归属锚点 -->
<div x-scope>
    <div x-component="loading">加载中</div>
</div>
```

### 与 x-data / x-patch 的关系

`x-scope` 与同优先级（priority = 200）的 `x-data`、零副作用的 `x-patch` 都「让元素建 scope」，但职责正交：

| 指令 | 是否建数据域 | 职责 |
| --- | --- | --- |
| `x-data` | ✅ 注入局部响应式数据 | 为子树表达式提供就近的临时状态 |
| `x-patch` | ❌ | 让纯静态裸元素进入正向桥，能被 `engine.patch` 定位 |
| `x-scope` | ❌ | 为纯容器提供 scope 锚点（`x-component` 归属 + scope 链边界） |

`x-scope` 等效于 `x-data="{}"`（空局部数据）的 scope 建立效果，但更轻、更语义化——明确表达「我只是个结构锚点，不携带任何数据」。

::: tip 同元素其他指令已建 scope 时，x-scope 冗余但无害
元素已有其他指令（本就建 scope）时，`x-scope` 冗余但**静默无副作用**——同元素 scope 只建一次，`x-scope` 不叠加、不报错。这与引擎「冗余属性静默处理」的整体风格一致。
:::

## 配置

`x-scope` **无指令值、无选项、无修饰符**。它是纯标记指令，仅需写上属性名即可。

```html
<div x-scope>...</div>
```

::: info 关于指令配置体系
指令选项 / 修饰符 / 宿主选项 / 两层回退见[指令配置](../config.md)。
:::

## 注意事项

- **只在纯容器上用**：已有指令/插值的元素无需 `x-scope`（重复加无副作用，但多余）。
- **不建数据、不渲染内容**：`x-scope` 仅为 scope 锚点服务，不改变元素的其他行为，也不注入任何 data。
- **必须有祖先或自身 scope 才能收 `x-component`**：每个 `x-component` 都需要至少一个祖先 scope（来自 `x-scope` 或任意其他指令、插值）。否则该组件在编译期被 `warn` 丢弃。
- **完整的组件机制**（声明摘除、`getComponent` 就近覆盖、全局组件兜底、消费者注入）见[组件](../guide/component.md)。
