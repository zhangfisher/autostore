# 校验

`AutoStore`支持为状态成员指定`Schema`数据，包括校验行为以及其他描述元数据。

## 使用方法

可以通过`schema`或`configurable`函数为状态成员指定`Schema`：

```ts {1,5}
import { schema } from "autostore"

const store = new AutoStore({
    order:{
        price: schema(100,{
            onValidate:(val)=>val>10
            invalidMessage:"价格必须大于10",
            title:"价格",
            required:true
            help:"产品价格",
            tags:["价格"]
        })
    }
});
```

`Schema`函数签名如下：

```ts
function schema<Value = any>(value: Value, options?: SchemaObjectArgs): SchemaObject<Value>;
function schema<Value = any>(value: Value, validate?: AutoStoreValidate<Value>, options?: SchemaObjectArgs): SchemaObject<Value>;
function schema<Value = any>(value: Value, validate?: AutoStoreValidate<Value>, errorTips?: SchemaObjectArgs['errorTips']): SchemaObject<Value>;
```

## 指南

### 内置校验模式

`AutoStore`内置了以下：

-   `s.number` 数字校验器
-   `s.string` 字符串校验器
-   `s.boolean` 布尔校验器
-   `s.array` 数组校验器
-   `s.object` 对象校验器
-   `s.date` 日期校验器
-   `v.bigint` 大整数校验器

**声明如下：**

```ts {1,3-9}
import { schemas } from "autostore"

schemas.number
schemas.string
schemas.boolean
schemas.array
schemas.object
schemas.date
schemas.bigint
(
    // 初始值
    initial:number,
    // 校验函数
    validate:AutoStoreValidate,
    // 校验选项
    options?:SchemaObjectArgs | SchemaObjectArgs['errorTips']
)

export type AutoStoreValidate<Value=any> = (
    newValue:Value,
    oldValue:Value,
    path:string
)=>boolean
```

**示例：**

```ts
import { s } from "autostore"

s.number(100,{
    onValidate: (val)=>val>10,"价格必须大于10"
})
s.number(100,{
    onValidate:(val)=>val>10,
    invalidMessage:"价格必须大于10",
    title:"价格",
    required:true
    description:"产品价格",
    tags:["价格"]
})

s.string("1234",{
    onValidate:(val)=>val.length>3,"密码长度必须大于3"
})
s.string("1234",{
    invalidMessage:"密码长度必须大于3",
    title:"密码",
    required:true,
    placeholder:"请输入密码"
})
```

:::warning 提示
`s`是`schemas`的简写。
:::

### 校验信息

每一个校验器均支持指定校验信息，用于在校验错误时显示。

```ts
s.string('1234', {
    onValidate: (val) => val.length > 3,
    invalidMessage: '密码长度必须大于3', // [!code++]
});
```

### 校验失败行为

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

:::warning 提示
可以通过`store.validators.errors`读取所有的校验错误信息。
:::

### 校验事件

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

### 访问数据

`store.schemas.getState()`用来提取出所以`schema`标注过的所有数据。

```ts
import { s, schema } from 'autostore';
const store = new AutoStore({
    order: {
        name: schema<string>('张三'),
        price: schema<number>(100),
        count: schema<number>(3),
    },
});

store.schemas.getState();

// {
//     "order.name": "张三",
//     "order.price": 100,
//     "order.count": 3
// }
```

:::warning 提示
`schema`函数还有一个别名`configurable`
:::
