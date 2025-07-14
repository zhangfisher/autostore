# TreeSelect

树选择框。

## 属性

```ts
type TreeNodes = TreeNode[] | TreeNode;
type TreeSelectedItem = {
    id: any;
    value: any;
    path: any;
};
type AutoTreeSelectOptions = {
    items: TreeNodes;
    idKey: string;
    valueKey: string; // 用于值
    labelKey: string; // 用于显示,默认为label
    multiple: boolean;
    onlySelectLeaf: boolean; //只选择叶子节点
    // 是否在选择项显示为路径, =true，则使用labelKey组成路径
    showAsPath: boolean;
    onSelectionChange: (selection: TreeSelectedItem[]) => void;
};
```

## 示例

<demo html="autoform/widgets/tree-select.html"/>
