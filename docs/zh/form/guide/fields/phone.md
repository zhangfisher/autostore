# Phone

## 概述

`Phone`电话号码输入组件，继承自[Input](input.md)，底层`input type`固定为`tel`，默认显示`phone`前缀图标，在触屏设备上会弹出数字键盘。由于电话号码格式因国家/地区而异，组件本身不内置格式校验，需要通过`pattern`或`validate`自行约束。

## 示例

声明一个电话字段只需要指定`widget: 'phone'`：

```ts
const form = document.querySelector('#form');
form.state = {
    phone: configurable('', {
        label: '电话号码',
        widget: 'phone',
        placeholder: '请输入电话号码',
    }),
};
```

<demo html="autoform/widgets/phone.html"/>

## 指南

### pattern 正则校验

`pattern`接收一个正则表达式字符串，用于约束电话号码格式：

```ts
form.state = {
    // 座机号码：区号-号码，如 0595-22181234
    telphone: configurable('0595-22181234', {
        label: '座机号码',
        widget: 'phone',
        pattern: '[0-9]{4}-[0-9]{8}', // [!code ++]
    }),
    // 手机号码：13 开头的 11 位数字
    mobile: configurable('', {
        label: '手机号码',
        widget: 'phone',
        pattern: '13[0-9]{9}', // [!code ++]
    }),
};
```

## 属性

继承[Input](input.md)全部属性，无自有属性。

## 注意事项

-   `tel`类型不携带任何自动校验，格式约束完全依赖`pattern`或`validate`（见[Input](input.md)）。
-   完整属性见[Input](input.md)；更多底层行为参考[MDN input/tel](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/tel)。
