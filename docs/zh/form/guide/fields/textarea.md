# Textarea

## 概述

`Textarea`多行文本输入组件，用于输入简介、备注、描述等较长的文本内容。基于`sl-textarea`实现，支持行数、长度限制等配置。

## 示例

声明一个多行文本字段只需要指定`widget: 'textarea'`：

```ts
const form = document.querySelector('#form');
form.state = {
    bio: configurable('', {
        label: '个人简介',
        widget: 'textarea',
        placeholder: '介绍一下自己...',
    }),
};
```

<demo html="autoform/widgets/textarea.html"/>

## 指南

### 行数

`rows`控制输入框的默认可见行数，默认为`3`：

```ts
form.state = {
    memo: configurable('产品简介', {
        label: '产品简介',
        widget: 'textarea',
        rows: 5, // [!code ++]
    }),
};
```

### 长度限制

`minLength`/`maxLength`限制文本长度，超出上限后无法继续输入：

```ts
form.state = {
    description: configurable('', {
        label: '描述',
        widget: 'textarea',
        maxLength: 500, // [!code ++]
        minLength: 10, // [!code ++]
        placeholder: '10-500个字符',
    }),
};
```

## 属性

| 属性          |   类型    | 默认值 | 说明                                                                                                         |
| ------------- | :-------: | :----: | ------------------------------------------------------------------------------------------------------------ |
| `rows`        | `number` |  `3`   | 可见行数                                                                                                     |
| `minLength`   | `number` |        | 最小长度                                                                                                     |
| `maxLength`   | `number` |        | 最大长度                                                                                                     |
| `autocorrect` | `string` |        | 自动修正，见[MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Global_attributes/autocorrect) |

## 注意事项

-   `Textarea`直接继承自`AutoField`而非[Input](input.md)，不支持的输入框属性（如`pattern`、`prefix`、`suffix`、`actions`）。
-   `placeholder`、`required`、`enable`、`visible`等通用字段属性仍然可用，见字段通用属性。
