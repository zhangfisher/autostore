# Url

## 概述

`Url`网址输入组件，继承自[Input](input.md)，底层`input type`固定为`url`，默认显示`globe`前缀图标，用于输入网站地址。配合[Input](input.md)的前后缀能力，可以快速实现协议选择与打开方式切换。

## 示例

声明一个网址字段只需要指定`widget: 'url'`：

```ts
const form = document.querySelector('#form');
form.state = {
    homepage: configurable('', {
        label: '官网地址',
        widget: 'url',
        placeholder: '请输入网址',
    }),
};
```

<demo html="autoform/widgets/url.html"/>

## 指南

### 前后缀

`prefix`提供协议候选下拉（单选项时显示为按钮），`suffix`提供打开方式等附加取值。所选前后缀会成为状态值的一部分，在`toState`/`toInput`时自动双向拼接与剥离：

```ts
form.state = {
    homepage: configurable('http://www.voerkai18n.com', {
        label: '官网',
        widget: 'url',
        filled: true,
        prefix: ['http://', 'https://'], // [!code ++]
        suffix: [ // [!code ++]
            { label: '在新窗口打开', value: '?_blank' }, // [!code ++]
            { label: '在当前窗口打开', value: '?_self' }, // [!code ++]
            '-', // 分割线 // [!code ++]
            { label: '空白', value: '' }, // [!code ++]
        ], // [!code ++]
    }),
};
```

## 属性

继承[Input](input.md)全部属性，无自有属性。

## 注意事项

-   `type=url`的原生校验要求输入包含协议（如`http://`），只输入`www.xxx.com`不会通过；实际业务中常配合`prefix`自动补协议或用`validate`放宽校验。
-   `prefix`/`suffix`是值的一部分：配置后状态值会自动包含所选前后缀，见[Input](input.md)。
-   完整属性见[Input](input.md)。
