# 校验

`AutoForm`提供了丰富的字段校验功能。

## 校验函数

通过`configurable`函数的`onValidate`参数指定校验函数。

```ts {5-7}
const store = new AutoStore({
    user: {
        username: configurable('NAME', {
            label: '用户名',
            onValidate: (value) => {
                return value.length > 6;
            },
        }),
        password: configurable('PASSWORD', {
            label: '密码',
        }),
    },
});
```

-   `onValidate`函数返回`true`表示校验通过，返回`false`表示校验失败。
-   `onValidate`在状态变化时触发执行，比如`store.state.username='xxx'`时，会触发`onValidate`的执行。

## 错误信息

当校验出错时，可以通过以下方式提供错误信息：

-   `invalidMessage`:

**类型**: `string | ((e: Error, path: string, newValue: Value, oldValue: Value) => string)`

指定校验失败时的错误信息。

```ts {8,15-17}
const store = new AutoStore({
    user: {
        name: configurable('NAME', {
            label: '用户名',
            onValidate: (value) => {
                return value.length > 6;
            },
            invalidMessage: '用户名长度必须大于6',
        },
        password: configurable('PASSWORD', {
            label: '密码',
            onValidate: (value) => {
                return value.length > 6;
            },
            invalidMessage: (e, path, newValue, oldValue) => {
                return `密码长度不满足要求：` + e.message;
            }
        }),
    },
});
```

-   从`onValidate`触发的错误中提取

如果没有指定`invalidMessage`，则也可以从`onValidate`触发的错误中提取。

```ts {7}
const store = new AutoStore({
    user: {
        name: configurable('NAME', {
            label: '用户名',
            onValidate: (value) => {
                if(value.length <= 6){
                    throw new Error('用户名称必须大于等于6')
                }
            }
        }
    }
});
```

-   如果同时提供`onValidate`和`invalidMessage`，则优先使用`invalidMessage`，当`invalidMessage`为函数时，会将的错误对象作为参数传递给`invalidMessage`。

-   错误信息还支持`插值变量`，所有配置参数均可以作为插值变量，比如：

```ts {8}
const store = new AutoStore({
    user: {
        name: configurable('NAME', {
            label: '用户名',
            onValidate: (value) => {
                return value.length >= 6
            },
            invalidMessage: '{label}长度必须大于6'
        }
    }
})
```

## 校验失败行为

当执行`onValidate`时，如果校验失败，会抛出`Error`对象，可以通过`onFail`参数指定校验失败时的行为。

**类型：** `'pass' | 'throw' | 'ignore' | 'throw-pass'`

-   `pass`  
    对写入操作放行，不抛出错误，错误的值也写入到`state`中。
-   `throw`  
    校验失败时，抛出错误，不更新`state`。
-   `ignore`  
    忽略错误，不更新`state`。
-   `throw-pass`
    对写入操作放行，错误的值也写入到`state`中,但同时也抛出错误。

```ts {6,12,18,24}
const store = new AutoStore({
    a: configurable('12345', {
        label: '用户名',
        onValidate: (value) => value.length >= 6,
        invalidMessage: '用户名长度必须大于等于6',
        onFail: 'pass',
    }),
    b: configurable('12345', {
        label: '用户名',
        onValidate: (value) => value.length >= 6,
        invalidMessage: '用户名长度必须大于等于6',
        onFail: 'throw',
    }),
    c: configurable('12345', {
        label: '用户名',
        onValidate: (value) => value.length >= 6,
        invalidMessage: '用户名长度必须大于等于6',
        onFail: 'ignore',
    }),
    d: configurable('12345', {
        label: '用户名',
        onValidate: (value) => value.length >= 6,
        invalidMessage: '用户名长度必须大于等于6',
        onFail: 'throw-pass',
    }),
});
```

<demo html="autoform/field/valid-fail.html"/>

## 校验事件

当执行`onValidate`时，无论校验失败或失败，均会抛出`validate`事件.

```ts
'validate': { path: string[], newValue: any, oldValue: any, error: string | undefined }
const store = new AutoStore({
    user: {
        name: configurable('NAME', {
            label: '用户名',
            onValidate: (value) => {
                return value.length >= 6
            }
        })
})

store.on('validate', ({
    path: string[],                 // 状态路径
    newValue: any,
    oldValue: any,
    error: string | undefined       // 校验错误对象
}) => {

})

```

## 校验时机

`AutoForm`通过`validAt`参数配置校验时机为：

-   `input`: 输入时
-   `lost-focus`: 丢失焦点时

```ts
<auto-form validAt="input"></auto-form>
// 默认
<auto-form validAt="lost-focus"></auto-form>
```

## 初始化校验

`AutoForm`通过`validAtInit`参数用于配置是否在首次渲染时进行校验并显示校验错误。

```ts
<auto-form validAtInit></auto-form>
```

## 校验状态

通过表单元素对象的`invalid`属性获取当前表单是否无效。

```html
<auto-form id="xx"></auto-form>
<script>
    const form = document.getElementById('#xx');
    console.log(form.invalid); // true/false
</script>
```

当表单校验失败时，表单自动添加`invalid`类名。
