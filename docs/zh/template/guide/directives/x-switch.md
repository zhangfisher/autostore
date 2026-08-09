# x-switch 条件分支

::: warning 规划中，尚未实现
该指令处于规划阶段，当前**尚未注册、不可用**。以下为预期 API 与用途，待实现后补全。
:::

## 预期用途

根据一个表达式的值，在多个候选分支中**切换显示其一**——比串联多个 `x-if` / `x-if-else` 更清晰地表达「多选一」的分派逻辑。

## 预期 API

```html
<div x-switch="status">
    <div x-case="loading">加载中…</div>
    <div x-case="error">出错了</div>
    <div x-case="success">完成</div>
    <div x-default>未知状态</div>
</div>
```

容器声明 `x-switch="表达式或状态"`，子节点用 `x-case="值"` 声明各分支，`x-default` 兜底。表达式求值后命中匹配的分支显示，其余隐藏。

## 预期示例

```html
<div x-switch="order.state">
    <span x-case="paid" class="val">已支付</span>
    <span x-case="pending" class="muted">待支付</span>
    <span x-case="refunded" class="tag-warn">已退款</span>
    <span x-default>—</span>
</div>
```

## 注意事项

- 表达式值为对象时，分支匹配规则以实现版本为准。
- 与多个 `x-if` 的取舍：状态是离散枚举值时用 `x-switch` 更直观。
