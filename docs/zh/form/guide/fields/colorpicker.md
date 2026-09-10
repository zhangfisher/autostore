# ColorPicker

## 概述

`ColorPicker`颜色选择器组件，基于取色器面板选取颜色，支持`hex`/`rgb`/`hsl`/`hsv`多种颜色格式、预设色快捷块与自定义色板，适合主题色、标签色等配色场景。

## 示例

声明颜色选择字段只需指定`widget: 'colorpicker'`，状态值为所选颜色的字符串：

```ts
const form = document.querySelector('#form');
form.state = {
    themeColor: configurable('#1890ff', {
        label: '主题色',
        widget: 'colorpicker',
    }),
};
```

<demo html="autoform/widgets/colorpicker.html"/>

## 指南

### 基础用法

默认弹出取色面板，取色结果按`format`指定的格式写入状态值（默认`hex`）：

```ts
form.state = {
    color: configurable('#e23a31', {
        label: '颜色',
        widget: 'colorpicker',
        format: 'rgb', // [!code ++]
    }),
};
```

`opacity`开启后支持透明度调节，取色结果中会包含`alpha`分量。

### 预设色

`presets`渲染一组预设色快捷块在取色器旁，单击即可选中，适合提供有限的可选颜色：

```ts
form.state = {
    level: configurable('red', {
        label: '告警级别',
        widget: 'colorpicker',
        presets: ['red', 'blue', 'green', 'yellow', 'orange', 'purple'], // [!code ++]
    }),
};
```

### 内联模式

`inline`让取色面板直接内联渲染，不再弹出：

```ts
form.state = {
    inlineColor: configurable('#e23a31', {
        label: '主题色',
        widget: 'colorpicker',
        inline: true, // [!code ++]
    }),
};
```

### 色板

`swatches`自定义取色面板中的色板色值列表，传空数组可以隐藏色板：

```ts
form.state = {
    inlineColor: configurable('#e23a31', {
        label: '主题色',
        widget: 'colorpicker',
        inline: true,
        swatches: ['#e23a31', '#1890ff', '#2f54eb', '#f5222d', '#faad14'], // [!code ++]
    }),
};
```

## 属性

| 属性       |    类型    |   默认值   | 说明                                       |
| ---------- | :--------: | :--------: | ------------------------------------------ |
| `format`   |  `string`  |   `"hex"`  | 颜色值格式，可选`rgb`/`hsl`/`hsv`          |
| `opacity`  | `boolean`  |  `false`   | 是否支持透明度调节                         |
| `inline`   | `boolean`  |  `false`   | 是否内联渲染（无弹出面板）                 |
| `swatches` | `string[]` | 内置 16 色 | 色板色值列表，空数组隐藏色板               |
| `presets`  | `string[]` |            | 预设色快捷块列表，渲染在取色器旁           |

## 注意事项

-   `presets`是渲染在取色器旁的快捷色块，`swatches`是取色面板内的色板，二者作用位置不同。
-   只读/查看模式下显示色块与颜色值文本。
