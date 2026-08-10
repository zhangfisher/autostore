# x-tree 树形渲染

::: warning 规划中，尚未实现
该指令处于规划阶段，当前**尚未注册、不可用**。以下为预期 API 与用途，待实现后补全。
:::

## 概述

基于递归的树形数据（节点有 `children`）渲染嵌套列表 / 目录树，简化手写递归 `x-for` 的复杂度，提供展开 / 折叠、节点 key 等树级配置。

## 快速入门

```html
<ul x-tree="categories" x-tree:options="{ key: 'id' }">
    <li x-tree-node="nodeId">
        {{ node.name }}
        <!-- 子节点由 x-tree 自动递归渲染 -->
    </li>
</ul>
```

```javascript
const tree = [
    {
        id: 1,
        name: "分类 A",
        children: [{ id: 11, name: "子分类 A1", children: [] }],
    },
];
```

## 配置

```html
<ul x-tree="treeData" x-tree:options="{ key: 'id' }">
    <li x-tree-node="nodeId">
        <span x-text="node.text"></span>
    </li>
</ul>
```

`x-tree` 的指令值是树形数据（必填）；`<li x-tree-node="<节点 id>">` 作为节点模板**递归**渲染（每层 `children` 套用同一模板）。下列配置项经 `x-tree:options` 声明；带 ✅ 者可用修饰符方式启用。

| 配置项 | 默认值  | 修饰符 | 说明                               |
| ------ | ------- | ------ | ---------------------------------- |
| `key`  | `index` |        | 节点的唯一标识字段名，缺省用 index |

## 注意事项

- 节点模板会**递归**应用到每层 `children`，深度无上限（受栈与数据约束）。
- 展开 / 折叠交互（预期）可通过节点状态或选项配置。
