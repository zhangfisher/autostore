# DateRange

## 概述

`DateRange`是日期范围选择组件，由起止两个日期输入框组合而成，用于录入一段时间区间。值既可以是分隔符连接的字符串，也可以是数组，还支持附带时间的日期时间范围。

## 示例

声明一个日期范围字段只需要指定`widget: 'date-range'`：

```ts
const form = document.querySelector('#form');
form.state = {
    dates: configurable('2025-12-12', {
        label: '日期范围',
        help: '使用,分割',
        widget: 'date-range',
    }),
};
```

<demo html="autoform/widgets/date-range.html"/>

## 指南

### 基础用法

值为字符串时，起止日期默认按逗号`,`拼接与拆分：

```ts
form.state = {
    dates: configurable('2025-12-12', {
        label: '日期范围',
        help: '使用,分割',
        widget: 'date-range',
    }),
};
```

### 值类型

值也可以直接使用数组，起止日期分别为数组的前后两个元素：

```ts
form.state = {
    dateArray: configurable(['2025-12-12'], {
        label: '日期范围',
        help: '值为数组',
        widget: 'date-range',
    }),
};
```

### 自定义分隔符

值为字符串时，通过`delimiter`指定起止日期的连接符：

```ts
form.state = {
    dateDelimiter: configurable('2025-12-12', {
        label: '日期范围',
        help: '自定义分割符',
        delimiter: '#', // [!code ++]
        widget: 'date-range',
    }),
};
```

### 包含时间

`includeTime=true`时，起止输入切换为`datetime-local`，可同时选择日期与时间：

```ts
form.state = {
    datetime: configurable('2025-12-12', {
        label: '日期范围',
        help: '包含时间',
        includeTime: true, // [!code ++]
        widget: 'date-range',
    }),
};
```

## 属性

| 属性          |   类型    |  默认值  | 说明                                 |
| ------------- | :-------: | :-----: | ------------------------------------- |
| `delimiter`   | `string`  |   `','`  | 起止日期在值中的连接符（值为字符串时按此拆分） |
| `includeTime` | `boolean` | `false` | 是否包含时间（`datetime-local`输入）  |
| `filled`      | `boolean` | `false` | 是否填充背景                         |
| `pill`        | `boolean` | `false` | 显示为椭圆形状的输入框               |

## 注意事项

-   值为数组时`delimiter`不参与拆分，仅对字符串值生效。
-   `includeTime=true`时起止值格式为`YYYY-MM-DDTHH:mm`，注意后续解析。
