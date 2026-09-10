# Switch

## 概述

`Switch`开关组件，用于切换布尔值或在两个值之间切换，常用于功能启停、模式选择等场景。开关语义与[Checkbox](checkbox.md)同构，区别在于视觉形态：`Switch`是滑动开关，`Checkbox`是勾选框。

## 示例

最简单的用法是绑定一个布尔值状态：

```ts
const form = document.querySelector('#form');
form.state = {
    autoSave: configurable(false, {
        label: '自动保存',
        widget: 'switch',
    }),
};
```

<demo html="autoform/widgets/switch.html"/>

## 指南

### 联动控制

开关最常见的用途是通过`enable`/`visible`联动控制其他字段。下面的例子中，开启`DHCP`后 IP 参数由路由器自动分配，相关字段随之禁用：

```ts
form.state = {
    network: {
        dhcp: configurable(false, {
            label: '自动获取IP地址',
            widget: 'switch',
        }),
        ip: configurable('192.168.1.100', {
            label: 'IP地址',
            widget: 'ipaddress',
            enable: (state) => !state.network.dhcp, // [!code ++]
        }),
        mask: configurable('255.255.255.0', {
            label: '子网掩码',
            widget: 'ipaddress',
            visible: (state) => !state.network.dhcp, // [!code ++]
        }),
    },
};
```

### 双值切换

`switchValues`指定`[选中值, 未选中值]`，将开关变成双值切换器，状态值不再是布尔值。缺省`checkLabel`时，开关旁会自动显示当前值（布尔值不显示）：

```ts
form.state = {
    saveMode: configurable('开启', {
        label: '自动保存',
        widget: 'switch',
        switchValues: ['开启', '关闭'], // [!code ++]
    }),
};
```

也可以用`choices`以对象形式指定，显式控制每个状态的取值与显示文字：

```ts
form.state = {
    notify: configurable('email', {
        label: '通知方式',
        widget: 'switch',
        choices: [ // [!code ++]
            { label: '邮件通知', value: 'email' }, // [!code ++]
            { label: '短信通知', value: 'sms' }, // [!code ++]
        ], // [!code ++]
    }),
};
```

### 说明文字

`checkLabel`用于在开关旁显示固定的说明文字：

```ts
form.state = {
    autoSave: configurable(false, {
        label: '自动保存',
        widget: 'switch',
        checkLabel: '开启后自动保存修改', // [!code ++]
    }),
};
```

## 属性

| 属性           |   类型    |     默认值      | 说明                                    |
| -------------- | :-------: | :-------------: | --------------------------------------- |
| `switchValues` |  `array`  | `[true,false]` | 双值开关语义：`[选中值, 未选中值]`       |
| `checkLabel`   | `string`  |                 | 开关旁的说明文字                        |
| `choices`      |  `array`  |                 | 双值选项，切换时取各项`value`，显示当前项`label` |

## 注意事项

-   `choices`配置后优先于`switchValues`：切换值取各项`value`，开关旁显示当前项`label`（无`label`则不显示）。
-   任意类型的值（如数字、字符串）都可以通过`switchValues`/`choices`切换，不限于布尔值；配合`toInput`/`toState`可进一步做类型转换。
-   开关在多选项（超过两个）场景不适用，请使用[Select](select.md)或[Radio](radio.md)。
