# x-table 表格渲染

::: warning 规划中，尚未实现
该指令处于规划阶段，当前**尚未注册、不可用**。以下为预期 API 与用途，待实现后补全。
:::

## 预期用途

基于二维数据（行 × 列）渲染表格，简化 `x-for` 嵌套（行循环 + 列循环）的写法，提供表格级的配置（列定义、行 key 等）。

## 预期 API

```html
<table x-table="rows" x-table:options="{ key: 'id' }">
    <tr x-table-row="rowId">
        <td x-text="col.name"></td>
        <td x-text="col.price"></td>
    </tr>
</table>
```

容器 `<table>` 声明 `x-table="<数据>"` 与可选的 `x-table:options`（列/行配置），`<tr x-table-row="<行 id>">` 作为行模板被重复。

## 预期示例

```html
<table x-table="orders" x-table:options="{ key: 'id' }">
    <tr x-table-row="rowId">
        <td>{{ row.name }}</td>
        <td>{{ row.price }}</td>
    </tr>
</table>
```

## 注意事项

- 与 `x-for` 的取舍：纯表格场景用 `x-table` 更贴合；自定义布局用 `x-for`。
- 行 key 复用机制预期与 `x-for` 的 `:key` 一致。
