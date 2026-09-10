# RadioButton

## 概述

按钮式单选组件，以一组按钮的形式展示候选项，适用于选项较少、希望快捷切换的场景（如单位切换、尺寸切换）。相比 `radio`，按钮形态更紧凑、可点击区域更大。

## 示例

给 `choices` 传入候选项数组即可，字符串选项的取值就是字符串本身。

```ts
const { configurable } = AutoStoreSpaces;
const form = document.querySelector('#form');
form.state = {
    unit: configurable('px', {
        label: '单位',
        widget: 'radio-button',
        choices: ['px', 'em', 'rem', '%'],
    }),
};
```

<demo html="autoform/widgets/radio-button.html"/>

## 指南

### 基础用法

候选项可以是对象数组，通过 `valueKey` 指定取值字段，按钮文本显示 `label`：

```ts
form.state = {
    certificate: configurable(3, {
        label: '证件类型',
        widget: 'radio-button',
        choices: [
            { label: '身份证', value: 1 },
            { label: '护照', value: 2 },
            { label: '军官证', value: 3 },
        ],
    }),
};
```

候选项对象上设置 `enable: false` 可以禁用对应按钮。

### 胶囊外观

设置 `pill: true` 后按钮组显示为圆角胶囊外观：

```ts
form.state = {
    certificate: configurable(3, {
        label: '证件类型',
        widget: 'radio-button',
        pill: true, // [!code ++]
        choices: [
            { label: '身份证', value: 1 },
            { label: '护照', value: 2 },
            { label: '军官证', value: 3 },
        ],
    }),
};
```

## 属性

| 属性      | 类型                                                         | 默认值 | 说明                                 |
| --------- | ------------------------------------------------------------ | ------ | ------------------------------------ |
| `choices` | `any[] \| string[] \| (() => any[] \| Promise<any[]>)` | 必填   | 候选项列表，或返回候选项的（异步）函数 |
| `valueKey`| `string`                                                     | `"value"` | 候选项取值字段名                     |
| `pill`    | `boolean`                                                    | `false` | 是否使用胶囊圆角外观                 |

## 注意事项

-   候选项配置键是 `choices`，旧版以 `select` 作为配置键的写法已废弃，继续使用会静默失效。
-   字符串选项的取值是字符串本身，对象选项未设置 `valueKey` 指向的字段时按钮无法选中。
-   按钮组会自动换行，选项较多时建议改用 `select` 组件。
