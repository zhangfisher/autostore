# Cascader

## 概述

`Cascader`级联选择器，用于录入具有层级关系的数据，例如省市区、公司层级、事物分类等。数据支持`树形嵌套`与`平铺索引`两种结构，也支持在节点第一次展开时才加载子节点的懒加载模式，选中值按层级自动拼接。

## 示例

声明一个级联字段只需要指定`widget: 'cascader'`并通过`choices`提供树形数据：

```ts
const form = document.querySelector('#form');
form.state = {
    car: configurable('', {
        label: '车型',
        widget: 'cascader',
        placeholder: '选择车型',
        choices: {
            label: '汽车',
            id: '0',
            children: [
                {
                    label: '乘用车',
                    id: '1',
                    children: [
                        { label: '轿车', id: '1-1' },
                        { label: 'SUV', id: '1-2' },
                    ],
                },
            ],
        },
    }),
};
```

<demo html="autoform/widgets/cascader.html"/>

## 指南

### 数据格式

`choices`为级联选择器提供数据，支持`树形结构`和`扁平结构`两种格式：

::: code-group

```ts [树形结构]
// 每个节点至少包含 id、label、children? 三个属性，children 嵌套子节点
const cars = {
    id: '0',
    label: '汽车',
    children: [
        {
            id: '1',
            label: '乘用车',
            children: [
                {
                    id: '1-1',
                    label: '轿车',
                    children: [
                        { id: '1-1-1', label: '紧凑型轿车' },
                        { id: '1-1-2', label: '中型轿车' },
                        { id: '1-1-3', label: '豪华轿车' },
                    ],
                },
                {
                    id: '1-2',
                    label: 'SUV',
                    children: [
                        { id: '1-2-1', label: '小型SUV' },
                        { id: '1-2-2', label: '中型SUV' },
                    ],
                },
            ],
        },
    ],
};
form.state = {
    car: configurable('', {
        label: '车型',
        widget: 'cascader',
        choices: cars,
    }),
};
```

```ts [扁平结构]
// 以父节点 id 为键组织同级列表，配合 rootKey 指定第一级数据的来源
const cars = {
    0: [
        { id: '1', label: '乘用车' },
        { id: '2', label: '商用车' },
    ],
    1: [
        { id: '1-1', label: '轿车' },
        { id: '1-2', label: 'SUV' },
    ],
    2: [
        { id: '2-1', label: '客车' },
        { id: '2-2', label: '货车' },
    ],
    '1-1': [
        { id: '1-1-1', label: '紧凑型轿车' },
        { id: '1-1-2', label: '中型轿车' },
    ],
};
form.state = {
    car: configurable('', {
        label: '车型',
        widget: 'cascader',
        choices: cars,
        rootKey: '0', // [!code ++]
    }),
};
```

:::

<demo html="autoform/widgets/cascader-flat.html"/>

`choices`也可以是一个返回数据的函数或异步函数（返回`Promise`），适合从远程接口获取选项的场景。

### 定制数据键名

通过`idKey`、`labelKey`、`valueKey`、`childrenKey`可以定制数据键名，以适配任意后端数据结构：

| 参数          | 类型     | 默认值    | 说明                           |
| ------------- | -------- | --------- | ------------------------------ |
| `idKey`       | `string` | `id`      | 数据项的唯一标识               |
| `labelKey`    | `string` | `label`   | 数据项的显示文本               |
| `valueKey`    | `string` | `<idKey>` | 数据项的取值，用于提交         |
| `childrenKey` | `string` | `children`| 数据项的子节点                 |
| `rootKey`     | `string` | `$root`   | 根节点的标识，扁平结构时指定   |

例如行政区划数据使用`name`/`code`作为键名：

```ts
form.state = {
    address: configurable('', {
        label: '地址',
        widget: 'cascader',
        choices: data,
        idKey: 'c', // [!code ++]
        labelKey: 'n', // [!code ++]
        valueKey: 'n', // [!code ++]
    }),
};
```

### 层级限制

`maxLevel`用于限制最大级联层级，默认为`3`。数据实际深度浅于`maxLevel`的分支在选中叶子后即结束，后续列不再展开：

```ts
form.state = {
    address: configurable('', {
        label: '乡镇',
        widget: 'cascader',
        maxLevel: 4, // 省/市/区/乡镇 四级 // [!code ++]
    }),
};
```

### 值与分隔符

级联值的形态由字段初值决定：初值为`字符串`时，各级取值按`delimiter`连接成一个字符串；初值为`数组`时，输出各级取值组成的数组。

```ts
form.state = {
    // 字符串值：选中后为 "乘用车/轿车/中型轿车"
    car: configurable('', {
        label: '车型',
        widget: 'cascader',
        choices: cars,
        valueKey: 'label',
        delimiter: '/', // [!code ++]
    }),
    // 数组值：选中后为 ['乘用车', '轿车']
    car2: configurable(['乘用车', '轿车'], {
        label: '车型',
        widget: 'cascader',
        choices: cars,
        valueKey: 'label',
    }),
};
```

`delimiter`默认为`''`。另外，`dropdown`用于指定是否显示为下拉框，默认为`true`；为`false`时多级列表内联平铺展示。

### 懒加载

指定`onLoad`加载函数，并在`choices`数据中为节点声明`lazy: true`，即可在第一次展开该节点时才加载子节点：

```ts
form.state = {
    car: configurable('', {
        label: '车型',
        widget: 'cascader',
        choices: {
            id: '0',
            label: '汽车',
            children: [
                { id: '1', label: '乘用车', lazy: true }, // [!code ++]
                { id: '2', label: '商用车', lazy: true }, // [!code ++]
            ],
        },
        onLoad: async (id) => { // [!code ++]
            // 入参为当前节点 id，返回其子节点数组 // [!code ++]
            await new Promise((resolve) => setTimeout(resolve, 1000)); // [!code ++]
            if (id === '1') { // [!code ++]
                return [ // [!code ++]
                    { id: '1-1', label: '轿车' }, // [!code ++]
                    { id: '1-2', label: 'SUV' }, // [!code ++]
                ]; // [!code ++]
            } // [!code ++]
            return []; // [!code ++]
        }, // [!code ++]
    }),
};
```

`onLoad`返回的子节点还可以携带`children`，一次返回多级子树；其叶子节点同样可以声明`lazy: true`供下一级按需加载。加载失败时节点回到待加载状态，可再次展开重试。

<demo html="autoform/widgets/cascader-lazy.html"/>

### 行政区划联动

级联选择器非常适合省市区联动场景，配合`maxLevel`与`rootKey`可以控制显示级别与起始范围：

-   **显示级别=3**

<demo html="autoform/widgets/cascader-area.html"/>

-   **显示级别=4**

<demo html="autoform/widgets/cascader-area2.html"/>

-   **显示级别=4，指定根节点，仅显示福建省**

<demo html="autoform/widgets/cascader-area3.html"/>

:::warning 提示

行政区划数据：

-   [三级行政区划](/area.json)
-   [四级行政区划](/area2.json)

:::

## 属性

| 属性          |           类型           |   默认值   | 说明                                          |
| ------------- | :----------------------: | :--------: | --------------------------------------------- |
| `choices`     | `object / array / function` |   `{}`   | 候选项数据：树形、平铺或其异步提供者          |
| `idKey`       |         `string`         |   `"id"`   | 节点唯一标识字段名                            |
| `rootKey`     |         `string`         | `"$root"`  | 根节点标识，扁平结构时指定第一级来源          |
| `labelKey`    |         `string`         | `"label"`  | 节点显示文本字段名                            |
| `valueKey`    |         `string`         | `<idKey>`  | 节点取值字段名，默认跟随`idKey`               |
| `childrenKey` |         `string`         | `"children"` | 子节点字段名                                |
| `maxLevel`    |         `number`         |    `3`     | 最大级联层级                                 |
| `delimiter`   |         `string`         |    `""`    | 字符串值中各级取值的连接符                   |
| `onLoad`      |        `function`        |            | 懒加载函数：入参为节点`id`，返回子节点数组    |
| `dropdown`    |        `boolean`         |   `true`   | 是否显示为下拉框                              |

## 注意事项

-   候选项数据键名为`choices`，旧的`select`配置键已废弃。
-   扁平结构必须通过`rootKey`指定第一级数据的来源键，否则无法渲染。
-   懒加载需要同时满足两个条件：节点声明`lazy: true`且字段配置了`onLoad`。
-   数据量较大时建议使用扁平结构或懒加载，避免一次性构造深层嵌套树。
