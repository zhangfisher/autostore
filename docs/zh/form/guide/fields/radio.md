# Radio

单选框。

## 属性

```ts
type SchemaRadioWidgetOptions = {
    // 显示为卡片样式
    card?: boolean;
    // 选项宽度，如'33.33%'
    itemWidth?: number | string;
    // 选项列表
    select: (SchemaWidgetSelectItem | string | number)[];
};
```

## 示例

<demo html="autoform/widgets/radio.html"/>

:::warning 提示
卡片模式下，应指定`itemWidth`属性，并且应该控制好`tips`的长度，否则会出现卡片高度不一致的情况。
:::
