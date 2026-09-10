# Captcha

## 概述

`Captcha`图形验证码输入组件，继承自[Input](input.md)。在输入框后自动附加一张验证码图片，单击图片即可刷新；图片加载完成后会自动聚焦并全选输入框，方便用户直接重新输入。

## 示例

声明图形验证码字段只需指定`widget: 'captcha'`并通过`url`指向验证码图片地址：

```ts
const form = document.querySelector('#form');
form.state = {
    captcha: configurable('', {
        label: '验证码',
        widget: 'captcha',
        url: '/captcha.png',
        maxLength: 6,
        required: true,
        validate: (value) => value.length === 6,
        errorMessage: '请输入 6 位验证码',
    }),
};
```

<demo html="autoform/widgets/captcha.html"/>

## 指南

### 基础用法

`url`指向服务器生成的验证码图片，通常配合`required`与自定义`validate`校验用户输入：

```ts
form.state = {
    captcha: configurable('', {
        label: '验证码',
        widget: 'captcha',
        url: '/captcha.png', // [!code ++]
        required: true, // [!code ++]
        validate: (value) => value.length === 4, // [!code ++]
        errorMessage: '请输入 4 位验证码', // [!code ++]
    }),
};
```

### 动态生成

`onGenerate`用于动态生成验证码图片地址，初始显示与每次刷新时都会调用，适合在本地生成验证码（如`canvas`/`svg`的`data URI`）或每次刷新都需重新获取地址的场景：

```ts
form.state = {
    captcha: configurable('', {
        label: '验证码',
        widget: 'captcha',
        onGenerate: () => { // [!code ++]
            // 返回 canvas/svg 生成的 data URI，或重新向服务器获取的地址
            return drawCaptchaImage(); // [!code ++]
        }, // [!code ++]
    }),
};
```

配置了`onGenerate`时优先于`url`生效。

### 自动刷新

-   基于`url`的验证码在每次刷新时会自动附加时间戳参数（`?t=...`）防止浏览器缓存，原有的查询参数会被保留。
-   图片加载完成后自动聚焦并全选输入框内容，便于直接重新输入；加载失败时会在控制台输出错误。
-   `tips`用于自定义鼠标悬停图片时的提示文字。

## 属性

| 属性         |   类型    |      默认值       | 说明                                                |
| ------------ | :-------: | :---------------: | --------------------------------------------------- |
| `url`        | `string`  |                   | 验证码图片地址，刷新时自动附加时间戳防缓存          |
| `onGenerate` | `function`|                   | 动态生成图片地址的函数，适合 canvas/svg dataURI     |
| `tips`       | `string`  | `"单击刷新验证码"` | 悬停验证码图片时的提示文字                          |

## 注意事项

-   支持单击图片刷新验证码，`onGenerate`与`url`二选一，`onGenerate`优先。
-   `Captcha`继承自[Input](input.md)，`placeholder`、`maxLength`、`required`等完整属性请参见 Input 文档。
