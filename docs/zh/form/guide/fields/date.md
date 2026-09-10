# Date

## 概述

`Date`是日期选择组件，继承自[Input](input.md)，底层使用`inputType=date`渲染原生日期选择器，默认显示`date`图标。适合录入生日、活动日期等单日期场景。

## 示例

声明一个日期字段只需要指定`widget: 'date'`，值采用`YYYY-MM-DD`格式的字符串。

```ts
const form = document.querySelector('#form');
form.state = {
    birthday: configurable('1990-01-01', {
        label: '生日',
        widget: 'date',
    }),
};
```

<demo html="autoform/widgets/date.html"/>

## 指南

### 基础用法

只需指定`widget: 'date'`即可获得原生日期选择能力：

```ts
form.state = {
    eventDate: configurable('', {
        label: '活动日期',
        widget: 'date',
    }),
};
```

### 限制日期范围

通过`min`/`max`限定可选日期的上下界（格式`YYYY-MM-DD`），范围外的日期无法被选中：

```ts
form.state = {
    eventDate: configurable('', {
        label: '活动日期',
        widget: 'date',
        min: '2025-01-01', // [!code ++]
        max: '2025-12-30', // [!code ++]
    }),
};
```

### 清除按钮

`clearable=true`时在输入框右侧显示清除按钮，一键清空已选日期：

```ts
form.state = {
    eventDate: configurable('2025-12-12', {
        label: '活动日期',
        widget: 'date',
        clearable: true, // [!code ++]
    }),
};
```

## 属性

| 属性        |   类型    | 默认值  | 说明                        |
| ----------- | :-------: | :-----: | ---------------------------- |
| `min`       | `string`  |         | 最小日期，格式`YYYY-MM-DD`   |
| `max`       | `string`  |         | 最大日期，格式`YYYY-MM-DD`   |
| `clearable` | `boolean` | `false` | 是否显示清除按钮             |

## 注意事项

-   `Date`继承自[Input](input.md)，`filled`、`pill`、`icon`、`pattern`、`actions`等通用属性同样可用。
-   底层基于原生`<input type="date">`，不同浏览器/移动端的日期选择界面存在差异，详见[MDN input date](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/date)。
