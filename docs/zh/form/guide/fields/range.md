# Range

## 概述

`Range`是滑动输入条组件，基于`sl-range`渲染，通过拖动滑块在数值区间内取值，常用于音量、进度、百分比等连续数值的直观调节。

## 示例

声明一个滑动条字段只需要指定`widget: 'range'`：

```ts
const form = document.querySelector('#form');
form.state = {
    volume: configurable(50, {
        label: '音量',
        widget: 'range',
    }),
};
```

<demo html="autoform/widgets/range.html"/>

## 指南

### 基础用法

默认取值区间为`0-100`：

```ts
form.state = {
    progress: configurable(0, {
        label: '进度',
        widget: 'range',
    }),
};
```

### 步长

通过`step`控制每次拖动的增量：

```ts
form.state = {
    volume: configurable(50, {
        label: '音量',
        max: 100,
        step: 5, // [!code ++]
        widget: 'range',
    }),
};
```

### 值展示

滑块上方会显示当前值，配合`toView`可以自定义展示格式：

```ts
form.state = {
    volume: configurable(5, {
        label: '音量',
        max: 100,
        step: 5,
        toView: (value) => `${value}%`, // [!code ++]
        widget: 'range',
    }),
};
```

## 属性

| 属性   |   类型   | 默认值 | 说明                 |
| ------ | :------: | :----: | --------------------- |
| `max`  | `number` | `100`  | 最大值               |
| `min`  | `number` |  `0`   | 最小值               |
| `step` | `number` |  `1`   | 步长                 |

## 注意事项

-   `Range`的值是数值类型，确保初始值、`min`、`max`、`step`同为数字。
-   拖动过程中触发`input`，松手后触发`change`，按需配合`validate`校验时机。
