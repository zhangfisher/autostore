# Time

## 概述

`Time`是时间选择组件，继承自[Input](input.md)，底层使用原生时间输入，用于录入`HH:mm`或`HH:mm:ss`格式的时间。

## 示例

声明一个时间字段只需要指定`widget: 'time'`：

```ts
const form = document.querySelector('#form');
form.state = {
    meetingTime: configurable('14:00', {
        label: '会议时间',
        widget: 'time',
    }),
};
```

<demo html="autoform/widgets/time.html"/>

## 指南

### 基础用法

```ts
form.state = {
    startTime: configurable('08:30:00', {
        label: '开始时间',
        widget: 'time',
    }),
};
```

## 属性

`Time`继承自[Input](input.md)的全部属性（如`clearable`、`filled`、`pill`等），无自有独有属性。

## 注意事项

-   底层基于原生`<input type="time">`，不同浏览器/移动端的时间选择界面存在差异，详见[MDN input time](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/time)。
-   `Time`继承自[Input](input.md)，`icon`、`actions`等通用属性同样可用。
