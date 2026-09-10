# 提交表单

`AutoForm`不同于普通的表单，提供了`submit`方法用于提交表单。

```html {5-17,21-29}
<auto-form id="login"></auto-form>

<script>
    const { configurable } = AutoStoreSpaces;
    const form = document.querySelector('#login');
    form.state = {
        username: configurable('', {
            label: '用户名',
            placeholder: '请输入用户名',
            required: true,
            validate: (value) => {
                return value.length > 5;
            },
            errorMessage: '用户名长度必须大于5',
        }),
        //....
    };

    form.submit((values, errors) => {
        if (errors) {
            console.log('表单校验失败', errors);
        } else {
            // values是一个对象，包含表单所有字段的值
            // 可以自行处理表单数据
            console.log('表单校验成功', values);
        }
    });
</script>
```

-   `submit`方法并不像传统的表单提交那样，会刷新页面，而是会触发回调，让开发者自行处理表单数据。
-   `values`参数是一个对象，包含表单所有字段的值。
-   `errors`参数是一个对象，包含校验失败的字段和错误信息，如果校验通过则为`undefined`。
