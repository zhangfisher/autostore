# 配置系统

`AutoStore`支持一套非常优雅的可配置系统，允许开发者将`AutoStore`的状态成员指定可配置，指定相应元数据，帮助开发者创建一套应用程序的响应式配置系统。

## 快速入门

下面我们以构建一个完整应用的响应式配置系统为例说明：

### 第1步：创建全局配置管理器

我们为应用创建一个全局的配置管理器。

```ts
import { ConfigManager } from "autostore";
const configManager = new ConfigManager({
    load: async () => {
        //加载配置
        // return {....}
    },
    save: async () => {
        //...保存配置
    },
});
```

- 默认情况下，`new ConfigManager`会创建一下全局对象`AutoStoreConfigManager`实例。
- 配置管理器一般需要配置`load`参数用于加载配置，`save`用于保存配置。
- 配置管理器`ConfigManager`类继承自`AutoStore`，全局对象`AutoStoreConfigManager`实例本身也是一个`AutoStore`实例。

### 第2步：构建应用模块

接下来，我们先在应用系统内部构建`3`个模块,并使用`AutoStore`存储模块状态数据。

```ts {1,5}
import { AutoStore } from "autostore";

// shop模块
const shopStore = new AutoStore(
    {
        order: {
            price: 100,
            count: 12,
            discount: 0.9,
        },
    },
    { id: "shop" },
);
// user模块
const userStore = new AutoStore(
    {
        user: {
            name: "name",
            age: 12,
        },
    },
    { id: "user" },
);

// product模块
const productStore = new AutoStore(
    {
        name: "name",
        price: 100, // 数量
    },
    { id: "product" },
);
```

### 第3步：声明可配置项

在我们的示例应用中，我们希望三个模块中的状态：`shop.order.discount`,`user.user.age`,`product.price`是可以配置的。
因此，我们需要使用`configurable`函数来声明模块状态中的可配置项。

```ts {1,5}
import { AutoStore, configurable } from "autostore";

// shop模块
const shopStore = new AutoStore(
    {
        order: {
            price: 100,
            count: 10,
            discount: configurable(0.4, {
                label: "折扣",
            }),
        },
    },
    { id: "shop" },
);
// user模块
const userStore = new AutoStore(
    {
        user: {
            name: "name",
            age: configurable(12, {
                label: "年龄",
                validate: (value) => {
                    return value > 1;
                },
            }),
        },
    },
    { id: "user" },
);

// product模块
const productStore = new AutoStore(
    {
        name: "name",
        price: configurable(12, {
            label: "单价",
            validate: (value) => {
                return value > 3;
            },
        }),
    },
    { id: "product" },
);
```

- `configurable`用于配置模块状态的`schema`元数据，包括校验信息、校验行为、标题(label)、渲染参数等一系列任意元数据。

:::warning 提示

- **Q:** 为什么`configurable`可以提供渲染参数？跟UI渲染有什么关系？
- **A:** 因为在前端应用系统中，可能需要将整个应用可配置项渲染出来，因此在各个模块中分散声明配置项的渲染参数是比较方便的。
  :::

### 第4步: 更新配置

以上创建了一个全局配置管理器`AutoStoreConfigManager`实例和三个业务模块，本个业务模块中的可配置项会自动注册到全局配置管理器`AutoStoreConfigManager`实例。

而`AutoStoreConfigManager`实例本身就是一个`AutoStore`实例，当在三个业务模块`AutoStore`时会将内部的所有可配置项(使用`configurable`声明)注册到`AutoStoreConfigManager`中，注册后的`AutoStoreConfigManager.state`.如下

```json
// AutoStoreConfigManager.state
{
    "order.discount": {
        "label": "折扣",
        "value": 0.9
        // ...其他无数据
    },
    "user.age": {
        "label": "年龄",
        "value": 12
        //......其他无数据
    },
    "product.price": {
        "label": "单价",
        "value": 12
        //......其他无数据
    }
}
```

- `AutoStoreConfigManager.state`中的**每一个配置项的`value`均指向的是原`AutoStore`的可配置项的状态值**。
  例如`AutoStoreConfigManager.state['order.discount'].value====shopStore.state.order.discount`。
- 此时如果业务模块的可配置项值发生更新就会通知`AutoStoreConfigManager`，`AutoStoreConfigManager`会调用`save`方法执行配置保存。

```ts
import { ConfigManager } from "autostore";
const configManager = new ConfigManager({
    /**
     * 每一个配置项变更时均会调用
     */
    save: async (values: Record<string, any>) => {
        // 在此保存配置
        // values={'shop.order.discount':0.8}
    },
});
// 模块可配置项变化
shopStore.state.order.discount = 0.8;
```

### 第5步: 加载配置

创建配置管理器时可以指定`load`用于从外部存储加载配置。

```ts
import { ConfigManager } from "autostore";
const configManager = new ConfigManager({
    /**
     * 每一个配置项变更时均会调用
     */
    load: async () => {
        await delay();
        return {
            "shop.order.discount": 0.9,
            "user.age": 18,
            "product.price": 100,
        };
    },
});
// 加载配置
await configManager.load();
```

执行`configManager.load()`时会将配置数据自动更新到各个业务模块的对应位置。

### 渲染配置界面

对于前端项目，如果要渲染整个应用配置界面，可以直接遍历`configManager.state`或`AutoStoreConfigManager.state`，因为`configManager`本身就是一个`AutoStore`实例。

## 指南

### configurable

`configurable`函数用于配置模块状态的schema元数据，包括校验信息、校验行为、标题(label)、渲染参数等一系列任意元数据。

```ts
function configurable<Value>(initial: Value): SchemaDescriptorBuilder<Value>;
function configurable<Value>(
    initial: Value,
    schema: ComputedableStateSchema<Value>,
): SchemaDescriptorBuilder<Value>;
function configurable<Value>(initial: Value, schema?: ComputedableStateSchema<Value>);
```

`ComputedableStateSchema`参数如下：

```ts
export type ComputedableStateSchema<Value = any> = {
    /**
     * 校验函数，当写入状态时的校验函数
     */
    validate?: (value: Value, oldValue: Value, path: string[]) => boolean;
    /**
     * 当配置被渲染到只读视图时调用
     */
    toView?: (value: any) => any;
    /**
     * 从表单转换到状态时调用
     */
    toState?: (value: any) => Value;
    /**
     * 将状态值转换为表单输入字段时调用
     */
    toInput?: (value: Value) => any;
    /**
     * 当渲染该配置表单字段时调用
     */
    toRender?: (value: any) => any;

    // 保留字段不允许为 ComputedBuilder
    name?: string;
    id?: string;
    key?: string;
    value?: any;
    path?: string[];
    datatype?: string;

    // 其他属性可以是值或 ComputedBuilder
    [key: string]: any;
};
```

:::warning 提示
`configurable`还有一个别名`schema`
:::

### 内置校验模式

`AutoStore`内置了以下：

- `s.number` 数字校验器
- `s.string` 字符串校验器
- `s.boolean` 布尔校验器
- `s.array` 数组校验器
- `s.object` 对象校验器
- `s.date` 日期校验器
- `v.bigint` 大整数校验器

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
    invalidTips:"价格必须大于10",
    title:"价格",
    required:true
    description:"产品价格",
    tags:["价格"]
})

s.string("1234",{
    onValidate:(val)=>val.length>3,"密码长度必须大于3"
})
s.string("1234",{
    invalidTips:"密码长度必须大于3",
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
s.string("1234", {
    onValidate: (val) => val.length > 3,
    invalidTips: "密码长度必须大于3", // [!code++]
});
```

### 校验失败行为

当执行`onValidate`时，如果校验失败，会抛出`Error`对象，可以通过`onFail`参数指定校验失败时的行为。

**类型：** `'pass' | 'throw' | 'ignore' | 'throw-pass'`

- `pass`  
  对写入操作放行，不抛出错误，错误的值也写入到`state`中。
- `throw`  
  校验失败时，抛出错误，不更新`state`。
- `ignore`  
  忽略错误，不更新`state`。
- `throw-pass`
  对写入操作放行，错误的值也写入到`state`中,但同时也抛出错误。

```ts {6,12,18,24}
const store = new AutoStore({
    a: configurable("12345", {
        label: "用户名",
        onValidate: (value) => value.length >= 6,
        invalidTips: "用户名长度必须大于等于6",
        onFail: "pass",
    }),
    b: configurable("12345", {
        label: "用户名",
        onValidate: (value) => value.length >= 6,
        invalidTips: "用户名长度必须大于等于6",
        onFail: "throw",
    }),
    c: configurable("12345", {
        label: "用户名",
        onValidate: (value) => value.length >= 6,
        invalidTips: "用户名长度必须大于等于6",
        onFail: "ignore",
    }),
    d: configurable("12345", {
        label: "用户名",
        onValidate: (value) => value.length >= 6,
        invalidTips: "用户名长度必须大于等于6",
        onFail: "throw-pass",
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

### 动态创建

可以动态创建`schema`对象。

```ts
import { s } from 'autostore';
const store = new AutoStore({
    user: {
        name: 'voerkai18n'
    }
})

store.schemas.add('user.name', schema({.....}))

```

### 访问数据

`store.schemas.getState()`用来提取出所以`schema`标注过的所有数据。

```ts
import { s, schema } from "autostore";
const store = new AutoStore({
    order: {
        name: schema<string>("张三"),
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
