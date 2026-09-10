# Stepper

## 概述

`Stepper`数字步进器组件，继承自[Input](input.md)，由输入框与`-`/`+`按钮组成：点击按钮按步长增减数值，到达边界时对应按钮自动禁用，适合数量、人数等小范围数字的快速调节。原生上下调节按钮已隐藏，数值内容居中显示。

## 示例

声明一个步进器字段只需要指定`widget: 'stepper'`，初始值直接使用数字：

```ts
const form = document.querySelector('#form');
form.state = {
    count: configurable(1, {
        label: '数量',
        widget: 'stepper',
    }),
};
```

<demo html="autoform/widgets/stepper.html"/>

## 指南

### 范围限制

通过`min`/`max`限制数值范围。点击`-`/`+`按钮时数值会被约束在范围内，到达边界时对应按钮自动禁用：

```ts
form.state = {
    age: configurable(25, {
        label: '年龄',
        widget: 'stepper',
        min: 1, // [!code ++]
        max: 120, // [!code ++]
    }),
};
```

手动键盘输入超出范围的值不会被静默修正，仍走校验链报错（配合`required`/`validate`使用）。

### 步长与小数精度

`step`控制每次点击`-`/`+`按钮的增减幅度，支持小数。小数步长连点产生的浮点误差（如`0.1 + 0.2`）会按精度自动舍入：

```ts
form.state = {
    price: configurable(9.99, {
        label: '价格',
        widget: 'stepper',
        min: 0,
        step: 0.01, // [!code ++]
    }),
    ratio: configurable(0.5, {
        label: '比例',
        widget: 'stepper',
        step: 0.5,
        precision: 1, // [!code ++]
    }),
};
```

`precision`未指定时自动取`step`的小数位数（`step: 0.01`即保留 2 位）。

### 单位前后缀

`prefix`/`suffix`在输入框内渲染单位，纯展示用途——状态值始终是`number`，不参与值拼接：

```ts
form.state = {
    weight: configurable(50, {
        label: '重量',
        widget: 'stepper',
        min: 0,
        step: 5,
        prefix: '≈', // [!code ++]
        suffix: 'kg', // [!code ++]
    }),
    budget: configurable(1000, {
        label: '预算',
        widget: 'stepper',
        min: 0,
        step: 100,
        prefix: '¥', // [!code ++]
    }),
};
```

布局顺序固定为`[−] [前缀] 输入值 [后缀] [+]`：`-`/`+`按钮始终在最外侧，单位紧贴输入值。视图态（viewonly）同样渲染`前缀+值+后缀`。

### 宽度

输入框默认宽度`12em`。通过`width`选项可自定义，设置后输入框撑满指定宽度：

```ts
form.state = {
    count: configurable(1, {
        label: '数量',
        widget: 'stepper',
        width: '300px', // [!code ++]
    }),
};
```

## 属性

| 属性        |    类型    | 默认值 | 说明                                                     |
| ----------- | :--------: | :----: | -------------------------------------------------------- |
| `step`      |  `number`  |  `1`   | 步长（`-`/`+` 按钮的增减幅度，支持小数）                 |
| `precision` |  `number`  |        | 小数精度（保留位数），缺省时取`step`的小数位数           |
| `prefix`    |  `string`  |        | 单位前缀（纯展示，渲染在`-`按钮之后、输入值之前）        |
| `suffix`    |  `string`  |        | 单位后缀（纯展示，渲染在输入值之后、`+`按钮之前）        |
| `min`       |  `number`  |        | 最小值，到达时`-`按钮禁用                                |
| `max`       |  `number`  |        | 最大值，到达时`+`按钮禁用                                |

## 注意事项

-   `Stepper`继承自[Input](input.md)，完整属性（`clearable`、`icon`、`actions`、`filled`等）见[Input](input.md)。
-   状态值是`number`类型，初始值请直接声明为数字（如`configurable(1, ...)`），不要写成字符串。
-   单位前后缀是纯展示，不会拼进状态值；需要在值中携带单位时请自行使用`toState`/`toInput`转换。
-   值为空（如清空输入框后）点击`-`/`+`从`0`起步，再按`min`/`max`约束。
-   原生上下调节按钮（spinner）已隐藏；键盘`↑`/`↓`仍走原生步进行为，越界由校验兜底。
