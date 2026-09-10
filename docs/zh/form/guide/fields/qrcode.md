# QRCode

## 概述

`QRCode`二维码展示组件，将字段值渲染为二维码图片。这是一个只读展示组件——仅用于显示二维码，不能输入；当值变化时二维码自动更新。

## 示例

声明二维码字段只需指定`widget: 'qrcode'`，字段值即二维码内容：

```ts
const form = document.querySelector('#form');
form.state = {
    url: configurable('https://www.voerkai18n.com', {
        label: '二维码',
        widget: 'qrcode',
    }),
};
```

<demo html="autoform/widgets/qrcode.html"/>

## 指南

### 基础用法

字段值变化时二维码自动重新渲染，默认黑码白底、边长`64px`：

```ts
form.state = {
    link: configurable('https://www.voerkai18n.com', {
        label: '访问链接',
        widget: 'qrcode',
        size: 96, // [!code ++]
    }),
};
```

`tips`可自定义鼠标悬停二维码时的提示文字。

### 圆角与配色

`radius`设置码点圆角半径，`fill`/`background`分别控制码点前景色与背景色：

```ts
form.state = {
    code: configurable('https://www.voerkai18n.com', {
        label: '二维码',
        widget: 'qrcode',
        radius: 8, // [!code ++]
        fill: 'deeppink', // [!code ++]
        background: 'white', // [!code ++]
    }),
};
```

### 纠错级别

`errorCorrection`指定二维码的纠错级别，可选`L`/`M`/`Q`/`H`，级别越高可容忍的污损面积越大，码点也越密集：

```ts
form.state = {
    code: configurable('https://www.voerkai18n.com', {
        label: '二维码',
        widget: 'qrcode',
        errorCorrection: 'H', // [!code ++]
    }),
};
```

## 属性

| 属性              |   类型   |  默认值   | 说明                                   |
| ----------------- | :------: | :-------: | -------------------------------------- |
| `fill`            | `string` | `"black"` | 前景色（码点颜色）                     |
| `background`      | `string` | `"white"` | 背景色                                 |
| `radius`          | `number` |    `0`    | 码点圆角半径                           |
| `errorCorrection` | `string` |   `"L"`   | 纠错级别，可选`L`/`M`/`Q`/`H`          |
| `size`            | `number` |   `64`    | 二维码尺寸（px）                       |
| `tips`            | `string` |           | 鼠标悬停二维码时的提示文字             |

## 注意事项

-   组件仅用于展示，不能输入；值变化时二维码自动更新。
-   纠错级别越高（`H`最高）码点越密集，内容较长时建议适当增大`size`保证可扫描。
