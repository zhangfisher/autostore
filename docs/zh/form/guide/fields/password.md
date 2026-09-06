# Password

密码输入，继承自[Input](input.md)，默认显示`lock`图标。

## 参数

继承[Input](input.md)的全部参数。

## 示例

<demo html="autoform/widgets/password.html"/>

## 指南

### 校验

配合`required`、`minLength`、`maxLength`或自定义`validate`函数实现密码强度校验：

```ts
configurable('', {
    label: '强密码',
    widget: 'password',
    required: true,
    validate: (value: any) => {
        if (!value) return false;
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(value);
    },
    errorMessage: '密码必须包含大小写字母和数字',
});
```
