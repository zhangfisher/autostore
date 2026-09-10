# TreeSelect

## 概述

树选择组件，将树形数据（如组织架构、分类目录）以可展开的树形控件平铺展示，从中选择一个或多个节点。支持只选叶子、路径显示与异步加载树数据。

## 示例

给 `items` 传入树形数据（节点含 `label` 与 `children`），单选时初值为单个值。

```ts
const { configurable } = AutoStoreSpaces;
const form = document.querySelector('#form');
const orgTree = {
    id: 1,
    label: '集团公司',
    children: [
        { id: 11, label: '工程部' },
        { id: 12, label: '产品部' },
    ],
};
form.state = {
    dept: configurable('', {
        label: '部门',
        widget: 'tree-select',
        valueKey: 'label',
        items: orgTree,
    }),
};
```

<demo html="autoform/widgets/tree-select.html"/>

## 指南

### 基础用法

树形数据由嵌套的节点对象组成，节点字段名通过 `idKey`/`valueKey`/`labelKey` 指定。`defaultExpandLevel` 控制初始展开层级：

```ts
form.state = {
    dept: configurable('', {
        label: '部门',
        widget: 'tree-select',
        idKey: 'id',
        valueKey: 'id',
        labelKey: 'label',
        defaultExpandLevel: 2, // [!code ++]
        items: [
            {
                id: 1,
                label: '研发中心',
                children: [
                    { id: 11, label: '工程部' },
                    { id: 12, label: '产品部' },
                ],
            },
            {
                id: 2,
                label: '营销中心',
                children: [
                    { id: 21, label: '销售部' },
                ],
            },
        ],
    }),
};
```

### 多选

设置 `multiple: true` 开启多选，此时状态值为数组，父子节点可同时勾选：

```ts
form.state = {
    depts: configurable(['产品部'], {
        label: '部门',
        widget: 'tree-select',
        multiple: true, // [!code ++]
        valueKey: 'label',
        items: orgTree,
    }),
};
```

### 只选叶子

设置 `onlySelectLeaf: true` 后只允许选择叶子节点，父节点仅用于分组展开，不可选中。适合「必须挂到具体部门/分类」的场景：

```ts
form.state = {
    admin: configurable('', {
        label: '部门',
        widget: 'tree-select',
        valueKey: 'label',
        onlySelectLeaf: true, // [!code ++]
        items: orgTree,
    }),
};
```

### 异步加载

`items` 支持传入异步函数延迟加载树数据，加载期间树区域显示 loading 状态，加载完成后自动渲染：

```ts
form.state = {
    dept: configurable('', {
        label: '部门',
        widget: 'tree-select',
        valueKey: 'label',
        items: async () => {
            // 这里可以是任意异步请求，如 fetch('/api/orgs')
            await new Promise((resolve) => setTimeout(resolve, 1000));
            return {
                id: 1,
                label: '集团公司',
                children: [
                    { id: 11, label: '工程部' },
                    { id: 12, label: '产品部' },
                ],
            };
        },
    }),
};
```

<demo html="autoform/widgets/lazy-tree-select.html"/>

## 属性

| 属性                | 类型                                              | 默认值 | 说明                                              |
| ------------------- | ------------------------------------------------- | ------ | ------------------------------------------------- |
| `items`             | `TreeNodes \| (() => TreeNodes \| Promise<TreeNodes>)` | 必填 | 树形数据（单根节点或节点数组），或其异步提供者    |
| `idKey`             | `string`                                          | `"id"`   | 节点 id 字段名                                    |
| `valueKey`          | `string`                                          | `"id"`   | 节点取值字段名                                    |
| `labelKey`          | `string`                                          | `"label"` | 节点显示字段名                                    |
| `multiple`          | `boolean`                                         | `false`  | 是否多选                                          |
| `defaultExpandLevel`| `number`                                          | `2`      | 初始展开层级                                      |
| `onlySelectLeaf`    | `boolean`                                         | `false`  | 只允许选择叶子节点                                |
| `showAsPath`        | `boolean`                                         | `false`  | 选中项是否按 `labelKey` 组成路径显示              |
| `onSelectionChange` | `(selection: TreeSelectedItem[]) => void`         | —        | 选中项变化回调（含 `id`/`value`/`path`）          |

## 注意事项

-   树数据配置键是 `items`（不是 `choices`），节点取值默认取 `idKey` 字段而非 `valueKey` 字段，需按 `valueKey`/`idKey` 分别指定。
-   多选时状态值是数组（初值也应给数组），单选时是单个值。
-   `showAsPath` 只在下拉形态（`tree-dropdown`）的选择框中有直观体现，本组件平铺展示时主要用于 `onSelectionChange` 回调中的路径信息。
