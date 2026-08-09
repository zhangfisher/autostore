# x-tree 树形渲染

::: warning 规划中，尚未实现
该指令处于规划阶段，当前**尚未注册、不可用**。以下为预期 API 与用途，待实现后补全。
:::

## 预期用途

基于递归的树形数据（节点有 `children`）渲染嵌套列表 / 目录树，简化手写递归 `x-for` 的复杂度，提供展开 / 折叠、节点 key 等树级配置。

## 预期 API

```html
<ul x-tree="treeData" x-tree:options="{ key: 'id' }">
    <li x-tree-node="nodeId">
        <span x-text="node.text"></span>
    </li>
</ul>
```

容器声明 `x-tree="<树数据>"` 与可选 `x-tree:options`，`<li x-tree-node="<节点 id>">` 作为节点模板**递归**渲染——每个节点的 `children` 继续套用同一模板。

## 预期示例

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

## 注意事项

- 节点模板会**递归**应用到每层 `children`，深度无上限（受栈与数据约束）。
- 展开 / 折叠交互（预期）可通过节点状态或选项配置。
