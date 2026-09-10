# Radio

## 概述

单选框组件，用于从多个候选项中选择一个。支持普通横排样式与卡片样式两种外观，候选项既可以是简单字符串，也可以是带 `tips`、`icon`、`enable` 等字段的对象。

## 示例

最简单的用法是给 `choices` 传入字符串数组，选中值就是字符串本身。

```ts
const { configurable } = AutoStoreSpaces;
const form = document.querySelector('#form');
form.state = {
    gender: configurable('male', {
        label: '性别',
        widget: 'radio',
        choices: ['male', 'female'],
    }),
};
```

<demo html="autoform/widgets/radio.html"/>

## 指南

### 基础用法

候选项可以是对象数组，通过 `valueKey` 指定取值字段。`label` 为显示文本，状态值取 `valueKey` 指向的字段（未指定时取 `label`）：

```ts
form.state = {
    certificate: configurable(1, {
        label: '证件类型',
        widget: 'radio',
        choices: [
            { label: '身份证', value: 1 },
            { label: '护照', value: 2 },
            { label: '军官证', value: 3 },
        ],
    }),
};
```

### 卡片样式

设置 `card: true` 后选项以卡片形式展示，配合 `itemWidth` 控制卡片宽度（如 `'33.33%'` 三列排布）。对象选项的 `tips` 字段会显示为卡片内的说明文字：

```ts
form.state = {
    layout: configurable('经典式', {
        label: '页面布局',
        widget: 'radio',
        card: true, // [!code ++]
        itemWidth: '33.33%', // [!code ++]
        choices: [
            { label: '简约风', tips: '极简设计，突出内容' },
            { label: '经典式', tips: '传统布局，平衡稳重' },
            { label: '卡片集', tips: '模块卡片，灵活组合' },
        ],
    }),
};
```

### 禁用选项

在候选项对象上设置 `enable: false` 可以禁用该选项，禁用的选项显示为灰色且不可点击：

```ts
form.state = {
    layout: configurable('经典式', {
        label: '页面布局',
        widget: 'radio',
        choices: [
            { label: '简约风', tips: '极简设计，突出内容' },
            { label: '瀑布流', enable: false, tips: '动态滚动，视觉延展' },
            { label: '经典式', tips: '传统布局，平衡稳重' },
        ],
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
-   卡片模式下应指定 `itemWidth` 属性，并控制好 `tips` 的长度，否则会出现卡片高度不一致的情况。
-   未设置 `valueKey` 时选项取值回退到 `label` 字段，此时状态值是选项文本。
