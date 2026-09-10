# Email

## 概述

`Email`电子邮件输入组件，继承自[Input](input.md)，底层`input type`固定为`email`，默认显示`email`前缀图标，在触屏设备上会弹出带`@`符号的专用键盘。

## 示例

声明一个邮箱字段只需要指定`widget: 'email'`：

```ts
const form = document.querySelector('#form');
form.state = {
    email: configurable('', {
        label: '电子邮件',
        widget: 'email',
        placeholder: '请输入邮箱地址',
    }),
};
```

<demo html="autoform/widgets/email.html"/>

## 指南

### 格式校验

`type=email`本身只做宽松校验（要求形如`a@b`），严格的格式校验建议通过`validate`函数配合`errorMessage`实现：

```ts
form.state = {
    email: configurable('', {
        label: '电子邮件',
        widget: 'email',
        required: true,
        validate: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
        errorMessage: '无效的电子邮件地址', // [!code ++]
    }),
};
```

## 属性

继承[Input](input.md)全部属性，无自有属性。

## 注意事项

-   完整属性（`pattern`、`minLength`、`maxLength`、`validate`等）见[Input](input.md)。
-   更多底层行为参考[MDN input/email](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/email)。
