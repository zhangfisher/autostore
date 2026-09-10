# List

## 概述

列表选择组件，将候选项以可滚动的菜单列表平铺展示，支持单选与多选。多选时自动附带「全选/反选/清空」预设操作按钮，也可通过 `dropdown` 切换为下拉面板形态。

## 示例

给 `choices` 传入候选项数组，`multiple: true` 开启多选，初值为数组。

```ts
const { configurable } = AutoStoreSpaces;
const form = document.querySelector('#form');
form.state = {
    city: configurable('', {
        label: '城市',
        widget: 'list',
        choices: ['北京', '上海', '深圳', '广州'],
    }),
};
```

<demo html="autoform/widgets/list.html"/>

## 指南

### 基础用法

候选项可以是对象数组，通过 `valueKey`/`labelKey` 指定取值字段与显示字段，选项对象的 `icon` 字段会显示为选项前缀图标：

```ts
form.state = {
    city: configurable('北京', {
        label: '城市',
        widget: 'list',
        valueKey: 'name',
        choices: [
            { name: '北京', icon: 'pin' },
            { name: '上海', icon: 'pin' },
            { name: '深圳', icon: 'pin' },
        ],
    }),
};
```

### 渲染模板

`renderItem` 用于定制选项内容。传字符串时是 HTML 模板，支持 `{字段名}` 插值，将候选项对象中的属性插入模板；传函数时接收候选项对象，返回 HTML 字符串：

```ts
form.state = {
    products: configurable([], {
        label: '产品',
        widget: 'list',
        multiple: true,
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

### 多选

设置 `multiple: true` 开启多选，状态值为数组。多选时列表底部自动附带「全选/反选/清空」预设按钮与选中计数。设置 `dropdown: true` 后切换为下拉面板形态，已选项在触发器中以标签（tag）展示，超出 `maxTagCount` 的部分折叠为 `+N`：

```ts
form.state = {
    products: configurable(['手机'], {
        label: '产品',
        widget: 'list',
        multiple: true, // [!code ++]
        dropdown: true, // [!code ++]
        maxTagCount: 3, // [!code ++]
        valueKey: 'label',
        choices: [
            { label: '手机', price: 1000 },
            { label: '电脑', price: 2000 },
            { label: '手表', price: 3000 },
        ],
    }),
};
```

### 自定义操作按钮

通过 `actions` 可以添加自定义功能按钮，配合多选可实现对选中结果的批量操作：

```ts
form.state = {
    products: configurable(['电脑'], {
        label: '产品',
        widget: 'list',
        multiple: true,
        valueKey: 'label',
        choices: [
            { label: '手机', price: 1000 },
            { label: '电脑', price: 2000 },
        ],
        actions: [
            {
                label: '计算总价',
                pos: 'before',
                onClick: (value) => {
                    alert(value);
                },
            },
        ],
    }),
};
```

### 懒加载

`choices` 支持传入异步函数延迟加载候选项，加载期间列表区域显示 loading 状态，加载完成后自动渲染选项：

```ts
form.state = {
    products: configurable([], {
        label: '产品',
        widget: 'list',
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

<demo html="autoform/widgets/lazy-list.html"/>

## 属性

| 属性         | 类型                                                        | 默认值 | 说明                                          |
| ------------ | ----------------------------------------------------------- | ------ | --------------------------------------------- |
| `choices`    | `ListItem[] \| (() => ListItem[] \| Promise<ListItem[]>)` | 必填   | 候选项列表，或返回候选项的（异步）函数        |
| `valueKey`   | `string`                                                    | `"value"` | 候选项取值字段名                              |
| `labelKey`   | `string`                                                    | `"label"` | 候选项显示字段名                              |
| `multiple`   | `boolean`                                                   | `false` | 是否多选                                      |
| `dropdown`   | `boolean`                                                   | `false` | 是否以下拉面板渲染（`false` 时平铺直接渲染）  |
| `maxTagCount`| `number`                                                    | `3`    | 下拉模式下触发器最多显示的标签数，超出折叠 `+N` |
| `renderItem` | `string \| ((item: any) => any)`                            | —      | 选项渲染模板（`{key}` 插值）或渲染函数        |

## 注意事项

-   候选项配置键是 `choices`，旧版以 `select` 作为配置键的写法已废弃，继续使用会静默失效。
-   多选时状态值是数组（初值也应给数组），单选时是单个值。
-   旧属性名 `itemTemplate` 已更名为 `renderItem`，旧属性名 `showResults` 已由下拉模式的标签展示取代。
