# 快速入门

`AutoForm`是基于`WebComponent`的完整的表单渲染解决方案，可以用于`Vue/React/HTML`等任意场景。

下面我们以开发一个简单的用户登录表单为例介绍`AutoForm`的使用。

## 第 1 步：引入

```html {8,10,12}
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>AutoForm</title>
        <!-- 引入 AutoForm 样式 -->
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@autostorejs/form/index.css" />
        <!-- 引入 AutoForm 代码 -->
        <script src="https://cdn.jsdelivr.net/npm/@autostorejs/form/dist/index.global.js"></script>
        <!-- 引入 AutoStore 代码 -->
        <script src="https://cdn.jsdelivr.net/npm/autostore/dist/index.global.js"></script>
        <!-- 可选的主题样式 -->
        <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/@autostorejs/form/dist/themes/dark.css"
        />
        <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/@autostorejs/form/dist/themes/blue.css"
        />
        <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/@autostorejs/form/dist/themes/red.css"
        />
    </head>
    <body>
        ...
    </body>
</html>
```

以上我们直接从`jsdelivr`引入了`AutoForm`和`AutoStore`的代码，当然你也可以安装到本地再引入。

## 第 2 步：定义数据

接下来我们定义表单数据。将状态定义对象直接赋值给`auto-form`组件的`state`属性，`AutoForm`内部会自动创建`AutoStore`实例来管理表单数据。

```html
<script type="module">
    const loginForm = document.querySelector('#login');
    loginForm.state = {
        username: 'admin',
        password: '<PASSWORD>',
        captcha: '图片验证码',
        remember: true, // 记住密码
    };
</script>
```

以上代码会在`AutoForm`内部自动创建一个`AutoStore`对象用于保存表单收集的数据，当表单字段更新时会自动进行双向同步。

## 第 3 步：配置字段

以上我们定义了表单数据，接下来，我们需要告诉`AutoForm`该如何渲染每个字段。
此时需要引入`configurable`函数。

```html
<script type="module">
    const { configurable } = AutoStoreSpaces;
    const loginForm = document.querySelector('#login');
    loginForm.state = {
        username: configurable('', {
            label: '用户名',
            placeholder: '请输入用户名',
            required: true,
            validate: (value) => {
                return value.length > 5;
            },
            errorMessage: '用户名长度必须大于5',
        }),
        password: configurable('', {
            label: '密码',
            widget: 'password',
            placeholder: '请输入密码',
            required: true,
            validate: (value) => {
                return value.length > 5;
            },
            errorMessage: '密码长度必须大于5',
        }),
        captcha: configurable('', {
            label: '验证码',
            widget: 'captcha',
            url: '/autostore/captcha.png',
            placeholder: '请输入验证码',
        }),
        remember: configurable(true, {
            label: '记住我',
            widget: 'switch',
        }),
    };
</script>
```

-   `configurable`函数用于告诉`AutoStore`的状态树中哪里可以配置以及如何配置等。
-   `widget`参数用于决定如何渲染。
-   `validate`函数返回`true`表示校验通过，返回`false`表示校验失败。
-   `errorMessage`用于指定校验失败时显示的错误信息。

## 第 4 步：访问表单数据

`state`属性赋值后，可以通过表单元素的`activeStore`属性访问内部创建的`AutoStore`实例。

注意：`state`赋值后`AutoForm`需要异步完成初始化，请在`updateComplete`之后再访问`activeStore`。

```html
<script type="module">
    const loginForm = document.querySelector('#login');
    loginForm.state = {...};
    loginForm.updateComplete.then(() => {
        // 内部创建的 AutoStore 实例
        const store = loginForm.activeStore;
        // 监听表单数据变化
        store.watch(() => {
            console.log(store.state);
        });
    });
</script>
```

## 第 5 步：提交表单

表单创建完成后，可以通过`submit`方法提交表单：

```javascript
form.submit((values, errors) => {
    if (errors) {
        console.log('表单校验失败', errors);
    } else {
        // values是一个对象，包含表单所有字段的值
        // 可以自行处理表单数据
        console.log('表单校验成功', values);
    }
});
```

## 小结

最后的渲染效果如下：

<demo html="autoform/getstarts.html"/>
