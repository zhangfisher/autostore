# Rating

## 概述

`Rating`是星级评分组件，基于`sl-rating`渲染，以点选星星的方式录入评分值，常用于评价、打分场景。默认 5 颗星，支持调整最大星数与评分精度。

## 示例

声明一个评分字段只需要指定`widget: 'rating'`：

```ts
const form = document.querySelector('#form');
form.state = {
    score: configurable(3, {
        label: '评分',
        widget: 'rating',
    }),
};
```

<demo html="autoform/widgets/rating.html"/>

## 指南

### 基础用法

默认最多 5 颗星、步进 1 分：

```ts
form.state = {
    score: configurable(3, {
        label: '评分',
        widget: 'rating',
    }),
};
```

### 最大星数

通过`max`调整星星数量：

```ts
form.state = {
    score: configurable(3, {
        label: '最大评分',
        max: 10, // [!code ++]
        widget: 'rating',
    }),
};
```

### 半星精度

`precision=0.5`时支持半星选择，可以打出`2.5`这样的分值：

```ts
form.state = {
    score: configurable(3, {
        label: '精度评分',
        precision: 0.5, // [!code ++]
        widget: 'rating',
    }),
};
```

## 属性

| 属性        |   类型   | 默认值 | 说明                             |
| ----------- | :------: | :----: | -------------------------------- |
| `max`       | `number` |  `5`   | 最高星数                         |
| `precision` | `number` |  `1`   | 评分精度（如`0.5`支持半星）      |

## 注意事项

-   `Rating`的值是数值类型，配合`max`/`precision`可以确定有效区间与最小步进。
-   只读展示时（如详情页）星星不可交互，仅呈现当前分值。
