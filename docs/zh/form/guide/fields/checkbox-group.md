# Checkbox Group

复选框组

## 属性

```ts
type SchemaWidgetSelectItem<Value = any> = ({
    id?: any
    label?: string
    value?: ToRawType<Value>
    tips?: string
    help?: string
    default?: boolean
    enable?: boolean
    icon?: string
}
type SchemaCheckboxGroupWidgetOptions = {
    // 选项值字段名，默认为'value'
    valueKey?: string;
    // 选项列表
    select: SchemaWidgetSelectItem[];
    // 是否显示为卡片样式
    card?: boolean;
    // 选项宽度，如'33.33%'
    itemWidth?: string;
};
```

## 示例

<demo html="autoform/widgets/checkbox-group.html"/>

`Checkbox Group`还支持卡片样式，只需要指定`card=true`即可。

<demo html="autoform/widgets/checkbox-group-card.html"/>
