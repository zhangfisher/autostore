# CheckboxGroup

## 概述

复选框组组件，用于从多个候选项中同时选择多项，状态值是选中值的数组。支持普通横排样式与卡片样式，并可结合 `toInput`/`toState` 实现数组值与位运算数值之间的双向转换。

## 示例

给 `choices` 传入候选项数组，字段初值应为数组。

```ts
const { configurable } = AutoStoreSpaces;
const form = document.querySelector('#form');
form.state = {
    product: configurable([], {
        label: '产品',
        widget: 'checkbox-group',
        choices: [
            { label: '产品1', value: 1 },
            { label: '产品2', value: 2 },
            { label: '产品3', value: 3 },
        ],
    }),
};
```

<demo html="autoform/widgets/checkbox-group.html"/>

## 指南

### 基础用法

复选框组的状态值是选中项 `valueKey` 字段组成的数组，初值给空数组 `[]` 表示未选择：

```ts
form.state = {
    product: configurable([1], {
        label: '产品',
        widget: 'checkbox-group',
        valueKey: 'value',
        choices: [
            { label: '产品1', value: 1 },
            { label: '产品2', value: 2 },
            { label: '产品3', value: 3 },
        ],
    }),
};
```

### 卡片样式

设置 `card: true` 后选项以卡片形式展示，配合 `itemWidth` 控制卡片宽度。对象选项的 `icon` 与 `tips` 字段会分别显示为卡片图标与说明文字：

```ts
form.state = {
    features: configurable([], {
        label: '功能开关',
        widget: 'checkbox-group',
        card: true, // [!code ++]
        itemWidth: '33.33%', // [!code ++]
        choices: [
            { label: 'PSH', value: 4, icon: 'email', tips: '推送数据' },
            { label: 'SYN', value: 16, icon: 'globe', tips: '同步序列号' },
            { label: 'FIN', value: 32, icon: 'phone', tips: '释放连接' },
        ],
    }),
};
```

<demo html="autoform/widgets/checkbox-group-card.html"/>

### 值转换

复选框组的状态值天然是数组，但很多业务场景（如 TCP 标志位、权限位）用位运算数值存储。通过 `toInput`/`toState` 可以在状态值（数值）与控件值（数组）之间双向转换：

-   `toInput(value)`：状态值 → 控件值，把位掩码数值展开为选中值数组
-   `toState(vals)`：控件值 → 状态值，把选中值数组合并回位掩码数值

```ts
form.state = {
    // 状态中存的是一个位掩码数值，3 = URG(1) + ACK(2)
    tcpFlags: configurable(3, {
        label: 'TCP标识',
        widget: 'checkbox-group',
        choices: [
            { label: 'URG', value: 1 },
            { label: 'ACK', value: 2 },
            { label: 'PSH', value: 4 },
            { label: 'RST', value: 8 },
            { label: 'SYN', value: 16 },
            { label: 'FIN', value: 32 },
        ],
        // 状态值(位掩码) -> 控件值(数组)
        toInput: (value) => {
            return [1, 2, 4, 8, 16, 32].filter((flag) => (value & flag) > 0);
        },
        // 控件值(数组) -> 状态值(位掩码)
        toState: (vals) => {
            return vals.reduce((sum, flag) => sum + flag, 0);
        },
    }),
};
```

## 属性

| 属性        | 类型                                                         | 默认值 | 说明                                 |
| ----------- | ------------------------------------------------------------ | ------ | ------------------------------------ |
| `choices`   | `any[] \| string[] \| (() => any[] \| Promise<any[]>)` | 必填   | 候选项列表，或返回候选项的（异步）函数 |
| `valueKey`  | `string`                                                     | `"value"` | 候选项取值字段名                     |
| `card`      | `boolean`                                                    | `false` | 是否显示为卡片样式                   |
| `itemWidth` | `string \| number`                                           | —      | 选项宽度，如 `'33.33%'`              |

## 注意事项

-   候选项配置键是 `choices`，旧版以 `select` 作为配置键的写法已废弃，继续使用会静默失效。
-   字段状态值默认是选中值数组，初值应给数组；若需要位掩码等其他形态，请配合 `toInput`/`toState` 转换。
-   卡片模式下应指定 `itemWidth`，并控制好 `tips` 的长度，否则会出现卡片高度不一致的情况。
