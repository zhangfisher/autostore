# x-switch 条件分支

::: warning 规划中，尚未实现
该指令处于规划阶段，当前**尚未注册、不可用**。以下为预期 API 与用途，待实现后补全。
:::

## 概述

根据一个表达式的值，在多个候选分支中**切换显示其一**——比串联多个 `x-if` / `x-if-else` 更清晰地表达「多选一」的分派逻辑。

## 快速入门

```html
<div x-switch="order.state">
    <span x-case="paid" class="val">已支付</span>
    <span x-case="pending" class="muted">待支付</span>
    <span x-case="refunded" class="tag-warn">已退款</span>
    <span x-default>—</span>
</div>
```

## 配置

```html
<div x-switch="status">
    <div x-case="loading">加载中…</div>
    <div x-case="error">出错了</div>
    <div x-case="success">完成</div>
    <div x-default>未知状态</div>
</div>
```

`x-switch` 的指令值是判别表达式或状态（必填）；分支由子指令 `x-case="值"` 声明、`x-default` 兜底，**`x-switch` 自身无独立配置项**（表达式值为对象时的匹配规则以实现版本为准）。

## 注意事项

- 表达式值为对象时，分支匹配规则以实现版本为准。
- 与多个 `x-if` 的取舍：状态是离散枚举值时用 `x-switch` 更直观。
