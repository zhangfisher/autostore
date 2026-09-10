# Icons

## 概述

`Icons`图标选择组件，从一组候选图标中选择一个或多个图标名，常用于为菜单项、按钮等配置图标。默认附带内置图标集，也可以通过`icons`指定自定义候选图标。

## 示例

声明图标选择字段只需指定`widget: 'icons'`：

```ts
const form = document.querySelector('#form');
form.state = {
    icon: configurable('', {
        label: '图标',
        widget: 'icons',
    }),
};
```

<demo html="autoform/widgets/icons.html"/>

## 指南

### 基础用法

单选模式下组件收缩为一个图标加下拉箭头，点击从下拉面板中选择；默认附带`help`、`email`、`search`、`lock`、`user`等内置图标：

```ts
form.state = {
    icon: configurable('email', {
        label: '菜单图标',
        widget: 'icons',
    }),
};
```

### 自定义候选图标

`icons`指定候选图标名列表，接受数组或逗号分隔的字符串。图标名来自[lucide](https://lucide.dev/icons)图标库，可通过`builtIn: false`排除内置图标集：

```ts
form.state = {
    icon: configurable('', {
        label: '图标',
        widget: 'icons',
        icons: ['award', 'apple', 'alarm-clock', 'aperture', 'chart-spline'], // [!code ++]
    }),
};
```

### 尺寸

`size`控制图标的渲染尺寸，默认`24px`：

```ts
form.state = {
    icon: configurable('', {
        label: '大图标',
        widget: 'icons',
        size: '32px', // [!code ++]
    }),
};
```

### 多选

`multiple`开启多选模式，此时组件满宽平铺展示所有候选图标，状态值为图标名数组（单选时为字符串）：

```ts
form.state = {
    icons: configurable([], {
        label: '功能图标',
        widget: 'icons',
        multiple: true, // [!code ++]
        icons: 'award,apple,alarm-clock,aperture,cassette-tape', // [!code ++]
    }),
};
```

`dropdown`控制是否以下拉面板展示（`false`时平铺）；单选始终为下拉，多选默认平铺。

## 属性

| 属性       |            类型             |  默认值  | 说明                                       |
| ---------- | :-------------------------: | :------: | ------------------------------------------ |
| `icons`    | `string[] \| string`        |   `[]`   | 候选图标名列表，数组或逗号分隔字符串       |
| `size`     | `string`                    | `"24px"` | 图标渲染尺寸                               |
| `multiple` | `boolean`                   | `false`  | 是否多选；多选满宽展示，单选收缩为图标+箭头 |
| `dropdown` | `boolean`                   | `false`  | 是否以下拉面板展示（`false`时平铺）        |
| `builtIn`  | `boolean`                   |  `true`  | 是否附带内置图标集                         |

## 注意事项

-   图标名来自[lucide](https://lucide.dev/icons)图标库，可通过`registerIcons`注册本地 SVG 或自定义图标源。
-   多选时状态值为图标名数组，单选时为字符串。
