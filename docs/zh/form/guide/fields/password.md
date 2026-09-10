# Password

## 概述

`Password`密码输入框组件，继承自[Input](input.md)，底层`input type`固定为`password`，输入内容默认以掩码显示。组件默认在输入框前显示`lock`图标。

## 示例

声明一个密码字段只需要指定`widget: 'password'`：

```ts
const form = document.querySelector('#form');
form.state = {
    password: configurable('', {
        label: '密码',
        widget: 'password',
        placeholder: '请输入密码',
    }),
};
```

<demo html="autoform/widgets/password.html"/>

## 指南

### 长度校验

配合`required`、`minLength`、`maxLength`实现基础的长度校验：

```ts
form.state = {
    password: configurable('', {
        label: '密码',
        widget: 'password',
        required: true, // [!code ++]
        minLength: 6, // [!code ++]
        maxLength: 20, // [!code ++]
        help: '必填，6-20个字符',
    }),
};
```

### 强度校验

通过`validate`自定义校验函数，配合`errorMessage`指定校验失败时的错误提示：

```ts
form.state = {
    strongPassword: configurable('', {
        label: '强密码',
        widget: 'password',
        required: true,
        validate: (value: string) => {
            if (!value) return false;
            // 必须同时包含大写字母、小写字母和数字
            return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(value);
        },
        errorMessage: '密码必须包含大小写字母和数字', // [!code ++]
    }),
};
```

## 属性

继承[Input](input.md)全部属性，无自有属性。

## 注意事项

-   组件默认显示`lock`前缀图标，可通过`icon`覆盖（见[Input](input.md)）。
-   完整属性（`required`、`minLength`、`maxLength`、`validate`等）见[Input](input.md)。
-   密码强度等复杂规则建议用`validate`函数实现，长度规则优先使用`minLength`/`maxLength`以获得浏览器原生支持。
