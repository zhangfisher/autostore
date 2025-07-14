# Select

下拉选择框。

## 属性

```ts
type SchemaWidgetSelectItem<Value = any> = {
    id?: any;
    label?: string;
    value?: ToRawType<Value>;
    tips?: string;
    help?: string;
    default?: boolean;
    enable?: boolean;
    icon?: string;
} & Record<string, any>;

type SchemaSelectWidgetOptions = {
    valueKey?: string;
    labelKey?: string;
    clearable?: boolean;
    // 最多显示多少个选项
    maxOptionsVisible?: number;
    // 下拉框位置
    placement?: 'top' | 'bottom';
    pill?: boolean;
    filled?: boolean;
    // 是否多选
    multiple?: boolean;
    // 渲染列表项
    renderItem?: string | ((item: SchemaWidgetSelectItem) => string);
    // 选择列表
    select: (SchemaWidgetSelectItem | string)[];
};
```

## 示例

<demo html="autoform/widgets/select.html"/>
