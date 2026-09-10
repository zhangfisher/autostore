# Number

## 概述

`Number`数字输入框组件，继承自[Input](input.md)，底层`input type`固定为`number`，用于输入整数或小数。输入框右侧自带上下调节按钮，支持范围限制与步长控制。

## 示例

声明一个数字字段只需要指定`widget: 'number'`，初始值直接使用数字：

```ts
const form = document.querySelector('#form');
form.state = {
    age: configurable(25, {
        label: '年龄',
        widget: 'number',
        placeholder: '请输入年龄',
    }),
};
```

<demo html="autoform/widgets/number.html"/>

## 指南

### 范围限制

通过`min`/`max`限制数值范围，超出范围的输入无法通过校验：

```ts
form.state = {
    age: configurable(25, {
        label: '年龄',
        widget: 'number',
        min: 0, // [!code ++]
        max: 120, // [!code ++]
    }),
    score: configurable(60, {
        label: '得分',
        widget: 'number',
        min: 0,
        max: 100,
    }),
};
```

### 步长

`step`控制每次点击调节按钮（或按键盘方向键）时的增减幅度：

```ts
form.state = {
    price: configurable(100, {
        label: '价格',
        widget: 'number',
        min: 0,
        step: 10, // [!code ++]
    }),
};
```

### 隐藏调节按钮

`noSpinButtons`用于隐藏数字输入框右侧的上下调节按钮，让它看起来与普通输入框一致：

```ts
form.state = {
    quantity: configurable(1, {
        label: '数量',
        widget: 'number',
        min: 1,
        noSpinButtons: true, // [!code ++]
    }),
};
```

## 属性

| 属性   |   类型   | 默认值 | 说明           |
| ------ | :------: | :----: | -------------- |
| `min`  | `number` |        | 最小值         |
| `max`  | `number` |        | 最大值         |
| `step` | `number` |        | 步长           |

## 注意事项

-   `Number`继承自[Input](input.md)，完整属性（`clearable`、`icon`、`actions`、`filled`等）见[Input](input.md)。
-   状态值是`number`类型，初始值请直接声明为数字（如`configurable(25, ...)`），不要写成字符串。
-   `noSpinButtons`、`maxLength`等属性在[Input](input.md)属性表中统一维护。
