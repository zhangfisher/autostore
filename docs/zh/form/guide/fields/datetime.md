# DateTime

## 概述

`DateTime`是日期时间选择组件，继承自[Input](input.md)，底层使用`inputType=datetime-local`在同一个控件内同时录入日期与时间。

## 示例

声明一个日期时间字段只需要指定`widget: 'datetime'`，值采用`YYYY-MM-DDTHH:mm`格式的字符串：

```ts
const form = document.querySelector('#form');
form.state = {
    startTime: configurable('2025-12-12T08:30', {
        label: '开始时间',
        widget: 'datetime',
    }),
};
```

<demo html="autoform/widgets/datetime.html"/>

## 指南

### 基础用法

```ts
form.state = {
    appointment: configurable('', {
        label: '预约时间',
        widget: 'datetime',
    }),
};
```

## 属性

`DateTime`继承自[Input](input.md)的全部属性（如`min`、`max`、`clearable`等），无自有独有属性。

## 注意事项

-   底层基于原生`<input type="datetime-local">`，不同浏览器/移动端的选择界面存在差异，详见[MDN input datetime-local](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/datetime-local)。
-   值中的日期与时间以字母`T`分隔，提交前如需其他格式请配合`toState`/`fromState`转换。
