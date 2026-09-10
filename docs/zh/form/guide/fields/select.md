# Select

## 概述

下拉选择框组件，用于从一组候选项中选择一个或多个值。候选项支持静态数组与异步函数两种提供方式，选项内容可通过 `renderItem` 灵活定制。

## 示例

最简单的用法是给 `choices` 传入字符串数组，选中值就是字符串本身。

```ts
const { configurable } = AutoStoreSpaces;
const form = document.querySelector('#form');
form.state = {
    post: configurable('程序员', {
        label: '职业',
        widget: 'select',
        choices: ['程序员', '教师', '医生', '律师', '其他'],
    }),
};
```

<demo html="autoform/widgets/select.html"/>

## 指南

### 基础用法

候选项也可以是对象数组，通过 `valueKey`/`labelKey` 指定取值字段与显示字段。选项对象还支持 `icon` 字段，会在选项前显示图标：

```ts
form.state = {
    city: configurable('', {
        label: '城市',
        widget: 'select',
        valueKey: 'name',
        choices: [
            { name: '北京', icon: 'pin' },
            { name: '上海', icon: 'pin' },
            { name: '深圳', icon: 'pin' },
        ],
    }),
};
```

### 多选

设置 `multiple: true` 开启多选，此时字段初值应为数组，状态值也是数组。`maxOptionsVisible` 控制触发器中最多直接显示的已选标签数量，超出部分折叠为 `+N`，`0` 表示不限制：

```ts
form.state = {
    products: configurable(['手机'], {
        label: '产品',
        widget: 'select',
        multiple: true, // [!code ++]
        valueKey: 'label',
        maxOptionsVisible: 5, // [!code ++]
        choices: [
            { label: '手机', price: 1000 },
            { label: '电脑', price: 2000 },
            { label: '手表', price: 3000 },
        ],
    }),
};
```

### 自定义选项渲染

`renderItem` 用于定制选项内容。传字符串时是 HTML 模板，支持 `{字段名}` 插值，将候选项对象中的属性插入模板；传函数时接收候选项对象，返回 HTML 字符串：

```ts
form.state = {
    products: configurable('', {
        label: '产品',
        widget: 'select',
        valueKey: 'label',
        // 字符串模板：{label}、{price} 取自候选项对象
        renderItem: '<span>{label}</span><span style="color:red;">{price}</span>',
        choices: [
            { label: '手机', price: 1000 },
            { label: '电脑', price: 2000 },
        ],
    }),
};
```

也可以传入函数实现更复杂的渲染：

```ts
form.state = {
    products: configurable('', {
        label: '产品',
        widget: 'select',
        valueKey: 'label',
        renderItem: (item) => `<span>${item.label}</span><span style="color:red;">¥${item.price}</span>`,
        choices: [
            { label: '手机', price: 1000 },
            { label: '电脑', price: 2000 },
        ],
    }),
};
```

### 懒加载

`choices` 支持传入异步函数延迟加载候选项，加载期间下拉框会显示 loading 状态，加载完成后自动渲染选项：

```ts
form.state = {
    products: configurable([], {
        label: '产品',
        widget: 'select',
        multiple: true,
        valueKey: 'label',
        choices: async () => {
            // 这里可以是任意异步请求，如 fetch('/api/products')
            await new Promise((resolve) => setTimeout(resolve, 1000));
            return [
                { label: '手机', price: 1000 },
                { label: '电脑', price: 2000 },
                { label: '手表', price: 3000 },
            ];
        },
    }),
};
```

<demo html="autoform/widgets/lazy-select.html"/>

## 属性

| 属性               | 类型                                         | 默认值 | 说明                                     |
| ------------------ | -------------------------------------------- | ------ | ---------------------------------------- |
| `choices`          | `any[] \| string[] \| (() => any[] \| Promise<any[]>)` | 必填   | 候选项列表，或返回候选项的（异步）函数   |
| `multiple`         | `boolean`                                    | `false` | 是否多选                                 |
| `valueKey`         | `string`                                     | `"value"` | 候选项取值字段名                         |
| `labelKey`         | `string`                                     | `"label"` | 候选项显示字段名                         |
| `renderItem`       | `string \| ((item: any) => any)`             | —      | 选项渲染模板（`{key}` 插值）或渲染函数   |
| `placement`        | `"top" \| "bottom" \| "left" \| "right"`     | `"top"`  | 下拉面板弹出位置                         |
| `maxOptionsVisible`| `number`                                     | `0`    | 多选时触发器最多显示的标签数，`0` 不限制 |
| `filled`           | `boolean`                                    | `false` | 是否使用填充样式外观                     |
| `pill`             | `boolean`                                    | `false` | 是否使用胶囊圆角外观                     |

## 注意事项

-   候选项配置键是 `choices`。旧版以 `select` 作为配置键的写法已废弃且运行时不再识别，继续使用会静默失效（下拉框为空）。
-   多选时字段的状态值是数组（初值也应给数组），单选时是单个值。
-   字符串选项若以 `-` 开头（如 `'-分组-'`），会渲染为下拉列表中的分隔线而非可选项。
