# VerifyCode

## 概述

`VerifyCode`短信/邮件验证码输入组件，继承自[Input](input.md)。在输入框后自动附加一个`发送验证码`按钮，单击后触发`onRequest`回调并进入倒计时，倒计时结束前按钮不可再次点击。

## 示例

声明验证码字段只需指定`widget: 'verifycode'`，通过`onRequest`发起发送请求：

```ts
const form = document.querySelector('#form');
form.state = {
    smscode: configurable('', {
        label: '短信验证码',
        widget: 'verifycode',
        maxLength: 6,
        onRequest: () => {
            // 在此向服务器请求发送验证码
            fetch('/api/sms/send');
        },
    }),
};
```

<demo html="autoform/widgets/verifycode.html"/>

## 指南

### 超时设置

`timeout`用于设置验证码的倒计时时长，单位为毫秒，默认`60000`（60 秒）。

-   如果`timeout`为数字，则倒计时时长为该值，每`1000`毫秒（1 秒）更新一次。
-   如果`timeout`为数组`[时长, 步进]`，则倒计时时长为`timeout[0]`，每`timeout[1]`毫秒更新一次。

例如`timeout: [60 * 1000, 1000]`代表倒计时 60 秒，每 1 秒更新一次：

```ts
form.state = {
    smscode: configurable('', {
        label: '短信验证码',
        widget: 'verifycode',
        timeout: 120 * 1000, // 倒计时 120 秒，每秒更新
    }),
};
```

### 模板

`template`用于自定义倒计时中按钮的文字模板，`{timeout}`会被替换为当前剩余秒数，默认`"{timeout}秒后重发"`：

```ts
form.state = {
    smscode: configurable('', {
        label: '短信验证码',
        widget: 'verifycode',
        template: '{timeout}秒后重新发送', // [!code ++]
    }),
};
```

### onRequest

当单击发送验证码按钮时，会触发`onRequest`回调。一般应该在`onRequest`中向服务器请求重新发送验证码。

在倒计时结束前，`onRequest`不会被触发：

```ts
form.state = {
    smscode: configurable('', {
        label: '短信验证码',
        widget: 'verifycode',
        onRequest: () => { // [!code ++]
            fetch('/api/sms/send'); // [!code ++]
        }, // [!code ++]
    }),
};
```

`sendTips`可以自定义发送按钮的文字：

```ts
form.state = {
    smscode: configurable('', {
        label: '短信验证码',
        widget: 'verifycode',
        sendTips: '向我的手机发送验证码', // [!code ++]
    }),
};
```

## 属性

| 属性        |            类型             |      默认值       | 说明                                             |
| ----------- | :-------------------------: | :---------------: | ------------------------------------------------ |
| `onRequest` |         `function`          |                   | 点击发送按钮时调用，一般在此向服务器请求发送验证码 |
| `sendTips`  |          `string`           |  `"发送验证码"`   | 发送按钮文字                                     |
| `timeout`   | `number \| [number,number]` |     `60000`       | 倒计时时长与步进，毫秒数或`[时长, 步进]`数组      |
| `template`  |          `string`           | `"{timeout}秒后重发"` | 倒计时按钮文字模板，`{timeout}`为剩余秒数占位 |

## 注意事项

-   倒计时结束前发送按钮不可再次点击，`onRequest`也不会被触发。
-   `VerifyCode`继承自[Input](input.md)，`maxLength`、`required`、`placeholder`等完整属性请参见 Input 文档。
