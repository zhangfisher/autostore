# x-patch 哨兵指令

## 概述

`x-patch` 是一个**零副作用哨兵指令**，唯一作用是让一个纯静态裸元素**成为 scope、进入正向桥**，从而能被 `engine.patch(selector, updater)` 定位。

```html
<div id="box" x-patch></div>
```

```javascript
engine.patch("#box", (el) => {
    el.innerHTML = '<p x-text="content"></p>';
});
```

`engine.patch` 靠「模板元素 → scope」的正向桥定位运行元素。但**含指令或插值的元素才会建 scope**——纯静态裸元素没有 scope，`patch` 找不到它。`x-patch` 就是给这种裸元素挂上 scope 的最轻手段：`created` / `compile` / `destroy` 全是空操作，不建数据域、不注入内容，只让元素进正向桥。

## 快速入门

<demo html="template/patch/rebuild.html"/>

```html
<div id="box" x-patch>
    <p x-text="content"></p>
</div>
```

## 指南

### 何时用 x-patch

- 元素本身**没有指令、没有插值**，但你需要用 `engine.patch` 动态修改它 → 加 `x-patch`。
- 元素已有 `x-text` / `:class` 等任意指令或插值 → **不需要** `x-patch`，它已是 scope。

### 等价替代

`x-patch` 等效于 `x-data="{}"`（空局部数据），但更轻、更语义化——明确表达「我只是个 patch 锚点」。

### patch 的用法

挂上 `x-patch` 后，用 `engine.patch(selector, updater)` 增量修改它的模板，返回值决定重建范围（子树重建 / 替换自身 / 删除）。完整用法见[动态模板](../patch.md)。

## 配置

`x-patch` **无指令值、无选项、无修饰符**。它是纯标记指令。

## 注意事项

- **只在裸元素上用**：已有指令/插值的元素无需 `x-patch`（重复加无副作用，但多余）。
- **不建数据、不渲染内容**：`x-patch` 仅为 patch 定位服务，不改变元素的其他行为。
- **完整 patch 机制**（四态返回值、动态区域限制、`engine.data`）见[动态模板](../patch.md)。
