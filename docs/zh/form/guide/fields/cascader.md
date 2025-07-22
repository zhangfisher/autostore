# Cascader

联动选择器，用于选择层级关系数据，例如省市区、公司层级、事物分类等。

## 参数

```ts
type SchemaCascaderWidgetOptions = {
    // 显示为下拉框，默认为true
    dropdown?: boolean;
    rootKey?: string;
    idKey?: string;
    labelKey?: string;
    valueKey?: string;
    childrenKey?: string;
    // 最大级数,默认是3
    maxLevel?: number;
    // 默认为''，用于合并级联值
    delimiter?: string;
    // 树形数据
    select: Record<string, any> | Record<string, any>[];
};
```

## 示例

<demo html="autoform/widgets/cascader.html"/>

## 指南

### 数据格式

使用`select`参数为联动选择器提供数据，联动选择器的数据格式是一个树形数据结构，每个节点包含至少包含`id`、`label`、`children?`三个属性。

支持`树形结构`和`扁平结构`：

::: code-group

```ts [树形结构]
const cars = {
    id: '0',
    children: [
        {
            id: '1',
            label: '乘用车',
            children: [
                {
                    id: '1-1',
                    label: '轿车',
                    children: [
                        { label: '紧凑型轿车', id: '1-1-1' },
                        { label: '中型轿车', id: '1-1-2' },
                        { label: '豪华轿车', id: '1-1-3' },
                    ],
                },
                {
                    id: '1-2',
                    label: 'SUV',
                    children: [
                        { label: '小型SUV', id: '1-2-1' },
                        { label: '中型SUV', id: '1-2-2' },
                        { label: '大型SUV', id: '1-2-3' },
                    ],
                },
            ],
        },
    ],
};
```

```json [扁平结构]
{
    "0": [
        { "id": "1-1", "label": "轿车" },
        { "id": "1-2", "label": "乘用车" },
        { "id": "1-3", "label": "SUV" }
    ],
    "1-1": [
        { "id": "1-1-1", "label": "紧凑型轿车" },
        { "id": "1-1-2", "label": "中型轿车" },
        { "id": "1-1-3", "label": "豪华轿车" }
    ],
    "1-2": [
        { "id": "1-2-1", "label": "小型SUV" },
        { "id": "1-2-2", "label": "中型SUV" },
        { "id": "1-2-3", "label": "大型SUV" }
    ],
    "1-3": [
        { "id": "1-3-1", "label": "小型SUV" },
        { "id": "1-3-2", "label": "中型SUV" },
        { "id": "1-3-3", "label": "大型SUV" }
    ]
}
```

:::

<demo html="autoform/widgets/cascader-flat.html"/>

### 定制数据键名

通过`idKey`,`labelKey`、`valueKey`、`childrenKey`可以定制数据键名。

| 参数          | 类型     | 默认值     | 说明                           |
| ------------- | -------- | ---------- | ------------------------------ |
| `idKey`       | `string` | `id`       | 数据项的唯一标识               |
| `labelKey`    | `string` | `label`    | 数据项的显示文本，用于显示     |
| `valueKey`    | `string` | `<idKey>`  | 数据项的返回值，用于提交       |
| `childrenKey` | `string` | `children` | 数据项的子节点                 |
| `rootKey`     | `string` | `$root`    | 根节点的标识，当扁平结构时指定 |

### 层级限制

`maxLevel`用于限制最大层级，`maxLevel`为`0`时，表示不限制层级。默认为`3`。

### 分隔符

`delimiter`用于指定级联值的分隔符，默认为`''`。

### 下拉框

`dropdown`用于指定是否显示为下拉框，默认为`true`。

### 指定根

`rootKey`用于指定根节点

### 懒加载

指定`onLoad`加载函数，并且在`select`数据中的指定`lazy=true`用于配置懒加载，即在第一次展开时才加载数据。

<demo html="autoform/widgets/cascader-lazy.html"/>

### 行政区划联动

-   **显示级别=3**

<demo html="autoform/widgets/cascader-area.html"/>

-   **显示级别=4**

<demo html="autoform/widgets/cascader-area2.html"/>

-   **显示级别=4, 指定根节点，仅显示福建省**

<demo html="autoform/widgets/cascader-area3.html"/>

:::warning 提示

行政区划数据：

-   [三级行政区划](/area.json)
-   [四级行政区划](/area2.json)

:::
