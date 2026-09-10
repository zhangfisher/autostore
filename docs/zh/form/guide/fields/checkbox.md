# Checkbox

## 概述

`Checkbox`复选框组件，用于切换布尔值或在两个值之间切换，常用于`同意协议`、`记住我`等单一开关场景。需要在多个选项中选择多项时请使用[CheckboxGroup](./checkbox-group.md)。

## 示例

最简单的用法是绑定一个布尔值状态：

```ts
const form = document.querySelector('#form');
form.state = {
    agree: configurable(false, {
        label: '同意协议',
        widget: 'checkbox',
    }),
};
```

<demo html="autoform/widgets/checkbox.html"/>

## 指南

### 说明文字

`checkLabel`用于在复选框旁显示说明文字：

```ts
form.state = {
    autoSave: configurable(false, {
        label: '自动保存',
        widget: 'checkbox',
        checkLabel: '开启后自动保存修改', // [!code ++]
    }),
};
```

### 双值切换

`switchValues`指定`[选中值, 未选中值]`，将复选框变成双值切换器，状态值不再是布尔值：

```ts
form.state = {
    saveMode: configurable('cloud', {
        label: '保存方式',
        widget: 'checkbox',
        switchValues: ['cloud', 'local'], // [!code ++]
    }),
};
```

也可以用`choices`以对象形式指定，还能同时控制显示文字：

```ts
form.state = {
    saveMode: configurable('cloud', {
        label: '保存方式',
        widget: 'checkbox',
        choices: [ // [!code ++]
            { label: '云端保存', value: 'cloud' }, // [!code ++]
            { label: '本地保存', value: 'local' }, // [!code ++]
        ], // [!code ++]
    }),
};
```

### 非布尔值转换

配合`toInput`/`toState`可以将任意类型的值映射为复选状态：

```ts
form.state = {
    status: configurable(1, {
        label: '状态',
        widget: 'checkbox',
        toInput: (value) => value === 1, // 状态值 → 勾选态
        toState: (checked) => (checked ? 1 : 0), // 勾选态 → 状态值
    }),
};
```

### 必填校验

复选框的`required`要求必须勾选，配合`validate`自定义校验：

```ts
form.state = {
    agree: configurable(false, {
        label: '我已阅读并同意协议',
        widget: 'checkbox',
        required: true, // [!code ++]
        validate: (value) => value === true, // [!code ++]
        errorMessage: '必须勾选同意协议', // [!code ++]
    }),
};
```

## 属性

| 属性           |   类型    |     默认值      | 说明                              |
| -------------- | :-------: | :-------------: | --------------------------------- |
| `switchValues` |  `array`  | `[true,false]` | 双值开关语义：`[选中值, 未选中值]` |
| `checkLabel`   | `string`  |                 | 复选框旁的说明文字                |
| `choices`      |  `array`  |                 | 双值选项，勾选时取各项`value`     |

## 注意事项

-   `choices`配置后优先于`switchValues`。
-   在多个候选项中选择多项时应使用[CheckboxGroup](./checkbox-group.md)，而不是 Checkbox。
