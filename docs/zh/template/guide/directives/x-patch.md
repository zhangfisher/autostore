# x-patch 哨兵指令（已移除）

## 重要说明

`x-patch` 指令已从 AutoStore Template 中移除。该功能已被 `x-scope` 指令完全替代。

### 移除原因

`x-patch` 和 `x-scope` 都是零副作用的 no-op 指令，它们的核心作用是：
- 让纯静态元素建 scope 进入正向桥
- 从而能被 `engine.patch(selector, updater)` 定位

由于 `x-scope` 已经具备了 `x-patch` 的所有功能，且语义更清晰（明确表示结构占位），因此移除了 `x-patch` 以减少概念冗余。

### 迁移指南

**之前使用 x-patch：**
```html
<div id="box" x-patch></div>
```

**现在使用 x-scope：**
```html
<div id="box" x-scope></div>
```

两者功能完全相同，只需将 `x-patch` 替换为 `x-scope` 即可。

### 相关文档

- [x-scope 结构占位指令](./x-scope.md)
- [动态模板](../patch.md)
