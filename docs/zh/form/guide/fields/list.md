# List

从列表中选择一项或多项

## 参数

```ts
type SchemaListWidgetListItem = {
    id: any;
    value?: any;
    label?: string;
    icon?: string;
} & Record<string, any>;

type SchemaListWidgetOptions = {
    // 备选列表
    select: SchemaWidgetSelectItem[];
    // 是否多选
    multiple?: boolean;
    // 选项值字段名，默认为'value'
    valueKey?: string;
    // 用于显示,默认为label
    labelKey?: string;
    // 是否显示已选择结果框
    showResults?: boolean;
    // 选择HTML模板
    itemTemplate?: string | ((item: SchemaWidgetSelectItem) => string);
};
```

## 示例

<demo html="autoform/widgets/list.html"/>

## 指南

### 渲染模板

`itemTemplate`属性用于指定渲染列表项的模板，该模板支持 HTML，支持`{变量}`插值语法，可以将`item`对象中的属性插入到模板中,例如`<span>{label}</span><span style="color:red;">{price}</span>'`

`itemTemplate`属性也可以是函数，该函数接收一个参数`SchemaWidgetSelectItem`，表示列表项对象，返回值就是渲染的`HTML`字符串。

### 显示选择结果

`showResults`属性用于指定是否显示已选择结果框.

-   如果为`true`，则显示一个已选择结果框
-   如果为`false`，则不显示已选择结果框

## Action

可以通过`actions=[...]`属性添加额外的功能按钮, 例如:

```ts
configurable(['电脑'], {
    label: '产品',
    //...
    actions: [
        {
            label: '计算总价',
            onClick: (value, ctx) => {
                alert(value);
            },
        },
    ],
}),
```
