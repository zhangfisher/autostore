# Combine

组合多个字段

组合多个字段组件来输入一个状态值。

## 参数

```ts
type SchemaCombineWidgetOptions = {
    children: SchemaOptions[];
};
```

## 示例

<demo html="autoform/widgets/combine.html"/>

## 指南

```ts
configurable('10px 5px', {
    widget: 'combine',
    label: '内边距',
    toState: (values) => toPadding(values), // [!code ++]
    required: true,
    children: [
        {
            name: 'top',
            label: '上',
            widget: 'range',
            width: '50%',
            toInput: (value) => parsePadding(value).top, // [!code ++]
        },
        {
            name: 'right',
            label: '右',
            widget: 'range',
            width: '50%',
            toInput: (value) => parsePadding(value).right, // [!code ++]
        },
        {
            name: 'bottom',
            label: '下',
            widget: 'range',
            width: '50%',
            toInput: (value) => parsePadding(value).bottom,// [!code ++]
        },
        {
            name: 'left',
            label: '左',
            widget: 'range',
            width: '50%',
            toInput: (value) => parsePadding(value).left,// [!code ++]
        },
    ],
}),
```

-   `toState`用于将子组件的值合并成一个值
-   `toInput`用于将父组件的值拆分成子组件的值
