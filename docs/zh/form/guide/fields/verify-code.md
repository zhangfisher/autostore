# VerifyCode

邮件或短信验证码

## 属性

```ts
type SchemaVerifyCodeWidgetOptions = {
    timeout?: number | [number, number];
    template?: string;
    sendTips?: string;
    // 单击发送时调用，一般应在此向服务器请求重新发送验证码
    onRequest?: () => void;
};
```

## 示例

<demo html="autoform/widgets/verifycode.html"/>

## 指南

### 超时设置

`timeout`用于设置当前验证码的过期时间，单位为秒。

-   如果`timeout`为数字，则表示验证码在`timeout`秒后过期，倒计时为`1000`。
-   如果`timeout`为数组，则表示验证码在`timeout[0]`秒后过期，倒计时为`timeout[1]`。

例如: `timeout=[60 * 1000,1000]`代表超时时间为`60`秒，每`1`秒更新一次。

### 模板

`template`用于设置重新发送验证码的模板。

例： `template="{timeout}秒后重新发送"`，`{timeout}`会被替换为当前剩余时间。

### onRequest

当单击发送验证码按钮时，会触发`onRequest`事件。一般应该在`onRequest`中向服务器请求重新发送验证码。

在倒计时结束前，`onRequest`不会被触发。
