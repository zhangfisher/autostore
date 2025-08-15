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

以上我们直接从`jsdeslivrer`引入了`AutoForm`和`AutoStore`的代码，当然你也可以安装到了本地再引入。

## 第 2 步：定义数据

接下来我们定义一个`AutoStore`实例，用于管理表单数据。

```html
<script type="module">
    const { AutoStore } = AutoStoreSpace
    const store = new AutoStore({
        username: 'admin',
        password: '<PASSWORD>'
        captcha: '图片验证码',
        remember: true// 记住密码
    })
</script>
```

以上代码创建一个`AutoStore`对象用于保存表单收集的数据，当表单字段更新时会自动进行双向同步。

## 第 3 步：配置字段

以上我们定义了一个`AutoStore`用来存储表单数据，接下来，我们需要告诉`AutoForm`该如何渲染每个字段。
此时需要引入`configurable`函数。

```html
<script type="module">
    const { AutoStore, configurable } = AutoStoreSpaces;
    const store = new AutoStore({
        username: configurable('', {
            label: '用户名',
            placeholder: '请输入用户名',
            onValidate: (value) => {
                return value.length > 5;
            },
        }),
        password: configurable('', {
            label: '密码',
            widget: 'password',
            placeholder: '请输入密码',
            onValidate: (value) => {
                return value.length > 5;
            },
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
    });
</script>
```

-   `configurable`函数用于告诉`AutoStore`的状态树中哪里可以配置以及如何配置等。
-   `widget`参数用于决定如何渲染。

## 第 4 步：创建表单

接下来，我们创建一个`AutoForm`组件，将`AutoStore`实例绑定到`AutoForm`上，即可完成表单的渲染。

```html {7,10,13}
<html lang="en">
    <head>
        <!-- .... -->
    </head>
    <body>
        <!-- 创建表单元素 -->
        <auto-form id="login"></auto-form>
        <script type="module">
            // 创建响应式数据管理对象
            const store = new AutoStore({...})
            const loginForm = document.querySelector('#login');
            // 绑定表单元素
            loginForm.bind(store);
        </script>
    </body>
</html>
```

## 小结

最后的渲染效果如下：

<demo html="autoform/getstarts.html"/>
