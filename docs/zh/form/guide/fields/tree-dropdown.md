# TreeDropdown

## 概述

下拉树选择组件，是 `tree-select` 的下拉形态：树形数据收纳在下拉面板中，触发器以标签（tag）展示已选节点。配置属性与 `tree-select` 完全一致，适用于表单空间紧凑、不希望平铺整棵树的场景。

## 示例

用法与 `tree-select` 相同，只需把 `widget` 换成 `'tree-dropdown'`。

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
        widget: 'tree-dropdown',
        valueKey: 'label',
        items: orgTree,
    }),
};
```

<demo html="autoform/widgets/tree-dropdown.html"/>

## 指南

### 下拉展示

`tree-dropdown` 继承 `tree-select` 的全部属性（`items`/`idKey`/`valueKey`/`labelKey`/`multiple`/`defaultExpandLevel`/`onlySelectLeaf`/`showAsPath`/`onSelectionChange`），树数据与取值字段的配置方式完全一致：

```ts
form.state = {
    depts: configurable(['产品部'], {
        label: '部门',
        widget: 'tree-dropdown',
        multiple: true,
        valueKey: 'label',
        onlySelectLeaf: false,
        items: orgTree,
    }),
};
```

与 `tree-select` 的差异只在展示形态：树收纳在下拉面板中，已选节点在触发器中以可移除的标签展示，多选时点击标签上的移除图标即可取消选择。

### 路径显示

叶子节点常重名（如多个部门下都有「综合部」），设置 `showAsPath: true` 后，已选标签按 `labelKey` 组成的完整路径显示（如 `集团公司/研发中心/综合部`），而不是仅显示叶子节点名。鼠标悬停标签时也会提示完整路径：

```ts
form.state = {
    deptPath: configurable('', {
        label: '部门路径',
        widget: 'tree-dropdown',
        valueKey: 'label',
        onlySelectLeaf: true,
        showAsPath: true, // [!code ++]
        items: orgTree,
    }),
};
```

## 属性

与 `tree-select` 完全一致，详见 [TreeSelect 属性](./tree-select.md#属性)：

| 属性                | 类型                                              | 默认值 | 说明                                              |
| ------------------- | ------------------------------------------------- | ------ | ------------------------------------------------- |
| `items`             | `TreeNodes \| (() => TreeNodes \| Promise<TreeNodes>)` | 必填 | 树形数据（单根节点或节点数组），或其异步提供者    |
| `idKey`             | `string`                                          | `"id"`   | 节点 id 字段名                                    |
| `valueKey`          | `string`                                          | `"id"`   | 节点取值字段名                                    |
| `labelKey`          | `string`                                          | `"label"` | 节点显示字段名                                    |
| `multiple`          | `boolean`                                         | `false`  | 是否多选                                          |
| `defaultExpandLevel`| `number`                                          | `2`      | 初始展开层级                                      |
| `onlySelectLeaf`    | `boolean`                                         | `false`  | 只允许选择叶子节点                                |
| `showAsPath`        | `boolean`                                         | `false`  | 已选标签是否按 `labelKey` 组成路径显示            |
| `onSelectionChange` | `(selection: TreeSelectedItem[]) => void`         | —        | 选中项变化回调（含 `id`/`value`/`path`）          |

## 注意事项

-   树数据配置键是 `items`，与 `tree-select` 一致；`showAsPath` 路径显示在本组件的已选标签上最为直观。
-   多选时状态值是数组（初值也应给数组），单选时是单个值。
-   树数据同样支持 `items: async () => ...` 异步加载，加载期间下拉面板显示 loading 状态。
