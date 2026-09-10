# Combine

## 概述

`Combine`组合字段组件，将多个子字段组件组合起来共同输入一个状态值。各子字段独立交互，值经`toState`聚合为一个状态值写入 store；状态值变化时又经各子字段的`toInput`拆分回填，适合`内边距`、`坐标`、`尺寸`这类由多个部分构成的单值场景。

## 示例

声明一个组合字段需要指定`widget: 'combine'`并通过`children`提供子字段列表：

```ts
const form = document.querySelector('#form');
form.state = {
    padding: configurable('10px 5px', {
        widget: 'combine',
        label: '内边距',
        children: [
            { name: 'top', label: '上', widget: 'range' },
            { name: 'right', label: '右', widget: 'range' },
        ],
    }),
};
```

<demo html="autoform/widgets/combine.html"/>

## 指南

### 工作原理

组合字段是纯粹的容器，数据的流动分为两个方向：

-   `toState`：任一子字段的值发生变化时触发，入参是各子字段当前值组成的数组，返回值聚合后的结果写入父字段的状态。
-   `toInput`：声明在各子字段上，入参是父字段的状态值，返回该子字段应显示的值。状态值变化时逐个子字段拆分回填。

以`内边距`为例，状态值是`'10px 5px'`这样的字符串，经`parsePadding`拆分为上/右/下/左四个数值分发给四个子字段；任一子字段变化后又经`toPadding`把数值数组拼回字符串：

```ts
function parsePadding(padding: string) {
    const [top = 0, right = 0, bottom = 0, left = 0] = padding.trim().split(/\s+/).map((v) => parseInt(v, 10) || 0);
    return { top, right, bottom, left };
}
function toPadding(values: number[]) {
    return values.map((v) => `${v}px`).join(' ');
}
```

### children 配置

`children`是子字段的 schema 数组，每个子字段可以是任意 widget，并支持该 widget 自身的全部配置（`min`、`choices`、`switchValues`等），同时可声明`name`（作为列表 key）、`label`、`width`等布局属性：

```ts
form.state = {
    padding: configurable('10px 5px', {
        widget: 'combine',
        label: '内边距',
        required: true,
        children: [
            {
                name: 'top',
                label: '上',
                widget: 'range',
                width: '50%',
                min: 0,
                max: 100,
            },
            {
                name: 'bottom',
                label: '下',
                widget: 'range',
                width: '50%',
                min: 0,
                max: 100,
            },
        ],
    }),
};
```

子项是「部分 schema」：不要求`value`（初值由父字段的`toInput`拆分而来）。

### 内边距四方向示例

完整的四方向内边距编辑器，父字段提供`toState`聚合，四个子字段各自提供`toInput`拆分：

```ts
form.state = {
    padding: configurable('10px 5px', {
        widget: 'combine',
        label: '内边距',
        toState: (values) => toPadding(values), // [!code ++]
        required: true,
        children: [
            {
                name: 'top',
                label: '上',
                widget: 'range',
                width: '50%',
                toInput: (value) => parsePadding(value).top, // [!code ++]
            },
            {
                name: 'right',
                label: '右',
                widget: 'range',
                width: '50%',
                toInput: (value) => parsePadding(value).right, // [!code ++]
            },
            {
                name: 'bottom',
                label: '下',
                widget: 'range',
                width: '50%',
                toInput: (value) => parsePadding(value).bottom, // [!code ++]
            },
            {
                name: 'left',
                label: '左',
                widget: 'range',
                width: '50%',
                toInput: (value) => parsePadding(value).left, // [!code ++]
            },
        ],
    }),
};
```

-   `toState`用于将子组件的值合并成一个值。
-   `toInput`用于将父组件的值拆分成子组件的值。

### 下拉开关

`dropdown`控制子字段的呈现方式，默认`true`以弹层方式显示；`false`时子字段内联展示在表单中：

```ts
form.state = {
    padding: configurable('10px 5px', {
        widget: 'combine',
        label: '内边距',
        dropdown: false, // [!code ++]
        children: [
            { name: 'top', label: '上', widget: 'range' },
            { name: 'right', label: '右', widget: 'range' },
        ],
    }),
};
```

## 属性

| 属性       |  类型   | 默认值 | 说明                                                                 |
| ---------- | :-----: | :----: | -------------------------------------------------------------------- |
| `children` | `array` |  `[]`  | **必填**。子字段 schema 数组，每个子字段可以是任意 widget            |
| `dropdown` | `boolean` | `true` | 是否以弹层方式展示子字段                                           |

## 注意事项

-   `children`是必填配置，缺失时字段没有可交互内容。
-   子字段的值不会写入独立的状态路径，最终状态只保留父字段经`toState`聚合后的单值。
-   子字段应各自提供`toInput`从父状态值拆出初值，否则子字段初值为空。
-   子项建议声明`name`，它同时作为子字段列表渲染的 key，缺失时按索引复用。
