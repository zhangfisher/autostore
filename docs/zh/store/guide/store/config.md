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

### 第6步: 渲染配置界面

对于前端项目，如果要渲染整个应用配置界面，可以直接遍历`configManager.state`或`AutoStoreConfigManager.state`，因为`configManager`本身就是一个`AutoStore`实例。

:::warning 提示
`AutoStore`本身并不负责渲染，而是为配置系统提供响应式配置数据管理，包括配置数据和配置元数据。配置元数据本身也可以是响应式的。
:::

## 指南

### 配置管理器

- **创建配置管理器**

一般情况下，一个应用只需要一个全局`ConfigManager`配置管理器，直接实例化配置即可

```ts
import { ConfigManager } from "autostore";

const ConfigManager = new ConfigManager({});
```

默认情况下，`new ConfigManager()`创建的是一个全局单例，并且自动挂载到全局变量`AutoStoreConfigManager`。

`ConfigManager`类继承自`AutoStore`类，本身就是一个`AutoStore`实例，构造参数如下：

```ts
class ConfigManager{
   constructor(
        public source: ConfigSource,
        options?: ConfigManagerOptions<AutoStoreConfigures>,
    )
}
type ConfigManagerOptions<State extends Dict> = AutoStoreOptions<State> & {
    global?: string | boolean;
    autoload?:boolean
};
```

- **配置源**

`source`用于指定配置数据的存储位置，即从哪里加载配置数据，配置数据保存到哪里。详见后续加载配置和保存配置。

- **全局单例**

`global`参数用于配置实例化`ConfigManager`是否创建全局单例变量，默认`true`

```ts
// 创建了默认的全局单例变量AutoStoreConfigManager
const ConfigManager = new ConfigManager({});
// 创建了全局单例变量MyConfigs
const ConfigManager = new ConfigManager({}, { global: "MyConfigs" });
// 不会创建任何全局变量，就是普通的配置管理器实例
const ConfigManager = new ConfigManager({}, { global: false });
```

### configurable

`configurable`函数用于声明状态的`schema`元数据，包括校验信息、校验行为、标题(label)、渲染参数等一系列配置元数据。

```ts
function configurable<Value>(initial: Value): SchemaDescriptorBuilder<Value>;
function configurable<Value>(
    initial: Value,
    schema: Omit<ComputedableStateSchema<Value>, "value">,
): SchemaDescriptorBuilder<Value>;
```

`schema`参数用于提供该配置项的各种元数据，包括但不限于`widget`、`validate`、`visible`等等。

:::warning 提示
`configurable`还有一个别名`schema`
:::

### 绑定配置管理器

配置管理器负责全局的配置数据加载、存储和管理。
所有的`AutoStore`均需要绑定接入到配置管理器，这样使用`configurable`声明的可配置状态才可以被配置管理器。

`AutoStore`要绑定配置管理器有以下几种方法：

- **自动绑定**

默认情况下，当实例化`ConfigManager`时会自动创建一个名为`AutoStoreConfigManager`的全局单例变量。
当`AutoStore`实例状态中存在可配置状态时会自动注册绑定到`AutoStoreConfigManager`实例中，不需要做任何配置。

:::warning 提示
自动绑定时，`ConfigManager`和`AutoStore`之间的注册和绑定与实例化的顺序无关。内部已经做了优化处理。
:::

:::warning 提示
自动绑定时，所有的`AutoStore`可配置状态均会统一注册到全局的`AutoStoreConfigManager`实例中
:::

- **自行管理**

默认情况下，`AutoStore`可配置状态均会统一注册到全局的`AutoStoreConfigManager`实例中。
您也可以为`AutoStore`指定独立的`ConfigManager`

```ts
const myConfigManager = new ConfigManager({...},{
    global:false   // [!code ++] 重点：不创建全局单例
});

const store = new AutoStore({...},{
    configManager：myConfigManager  // [!code ++] 单独指定配置管理器
})
```

### 配置源

实例化`ConfigManager`时需要指定一个配置源`ConfigSource`，类型如下：

```ts
interface ConfigSource {
    load: () => Record<string, any> | Promise<Record<string, any>>;
    /**
     * 每一个配置项变更时均会调用
     * @param values
     * @returns
     */
    save?: (values: Record<string, any>) => void | Promise<void>;
}
```

#### 加载配置

`load`函数用于从外部存储加载配置数据。

```ts
import { ConfigManager } from "autostore";
const configManager = new ConfigManager(
    {
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
    },
    {
        autoload: false, // [!code ++] 默认为true，会自动调用load方法
    },
);
// 当autoload=false时，需要自行调用加载配置
await configManager.load(); // [!code ++]
```

- 当配置加载数据成功后会自动将配置数据更新到各个对应的`AutoStore`实例中。

#### 保存配置

当`AutoStore`中的可配置数据更新时会自动调用`save`方法用于将配置数据保存到存储中。

```ts
import { ConfigManager } from "autostore";
const configManager = new ConfigManager({
    /**
     * 每一个配置项变更时均会调用
     */
    save: async (values: Record<string, any>) => {
        Object.entries(values).forEach(([key, value]) => {
            localStorage.setItem(key, value);
        });
    },
});
```

- `save`仅在配置数据变更新调用，如果应用配置没有变化则不会调用。
- 如何存储配置数据由应用层自行处理。

### 重置配置

`reset`方法用于实现将配置数据恢复为默认值。

```ts
const orderStore = new AutoStore(
    {
        order: {
            price: configurable(99.9, {
                label: "订单价格",
            }),
            quantity: configurable(10, {
                label: "订单数量",
            }),
        },
    },
    {
        configKey: "app",
    },
);

// 修改配置项
orderStore.state.order.price = 199.9;
orderStore.state.order.quantity = 50;

expect(orderStore.state.order.price).toBe(199.9);
expect(orderStore.state.order.quantity).toBe(50);

// 调用 reset
configManager.reset();

// 验证值恢复为默认值
expect(orderStore.state.order.price).toBe(99.9);
expect(orderStore.state.order.quantity).toBe(10);
```

配置重置后,会调用`ConfigSource.reset`，可以在此从外部存储中清空配置数据。

```ts {5-7}
import { ConfigManager } from "autostore";
const configManager = new ConfigManager({
    load:async ()=>{....}
    save:async ()=>{....}
    reset: () => {
        localStorage.clear()
    },
});
```

### 配置健

默认情况下，`AutoStore`使用`id`或`configKey`来作为该`AutoStore`实例的配置健前缀。

- **默认配置健**

```ts
const store = new AutoStore({
    enable: configurable(true),
});
```

以上示例`AutoStore`没有指定`id`，所以会有一个随机`id`.
所以在配置管理器中的配置数据为`{ 9a87343s.enable: true }`

- **使用id**

```ts
const store = new AutoStore(
    {
        enable: configurable(true),
    },
    {
        id: "order",
    },
);
```

以上示例`AutoStore`指定`id='order'`，所以在配置管理器中的配置数据为`{ order.enable: true }`

- **自定义配置健**

也可以通过`configKey`指定自定义的配置健前缀。

```ts
const store = new AutoStore(
    {
        enable: configurable(true),
    },
    {
        id: "order",
        configKey: "custom",
    },
);
```

以上示例`AutoStore`指定`configKey='custom'`，所以在配置管理器中的配置数据为`{ custom.enable: true }`

- **不使用配置健**

也可以不使用配置健前缀，只需要将设置`configKey=''`即可。

```ts
const store = new AutoStore(
    {
        enable: configurable(true),
    },
    {
        id: "order",
        configKey: "",
    },
);
```

以上示例`AutoStore`指定`configKey=''`，所以在配置管理器中的配置数据为`{ enable: true }`

### 遍历配置数据

默认情况下，如果要遍历配置整个应用的所有配置项，只需要访问`AutoStoreConfigManager`即可。

```ts
Object.entires(AutoStoreConfigManager.state).forEach(([key, value]) => {
    console.log(key, "=", JSON.stringify(value));
});
//
// order.discount = {"label": "折扣","value": 0.9,...其他无数据}
// user.age = {"label": "年龄","value": 12,...其他无数据}
// product.price = {"label": "单价","value": 123,...其他无数据}
// ...
```

实质上`AutoStoreConfigManager`就是一个`AutoStore`实例，这意味着，我们可以使用`AutoStore`的所有API对配置数据进行订阅和管理。

比如可以通过`AutoStoreConfigManager.watch`来订阅配置数据的变化。

### 响应式元数据

在使用`configurable`声明可配置状态时，配置元数据也可以是响应式的，甚至可以是计算属性。如下：

`AutoStoreConfigManager.state`保存所有的配置数据和配置元数据，如下：

```ts
const store = new AutoStore(
    {
        order: {
            count: configurable(100, {
                label: "数量",
                // enable 基于当前值计算，当 count >= 100 时禁用
                enable: computed((scope: any) => {
                    return ....
                }),
            }),
        },
    },
    { id: "shop" },
);
```

**特殊注意：以上`enable`计算属性中的`scope`不是指`order.count`,而是指可配置项元数据**。

上例中我们声明在`order.count`为可配置项，这样当实例化`AutoStore`时，该配置数据会被注册到全局配置管理器中。
而`AutoStoreConfigManager`就是一个`AutoStore`实例，所以等效于：

```ts
const configManager = new AutoStore({
    "shop.order.count": {
        label: "数量",
        // 指向的是原store中的order.count的值
        value: 100,
        // enable 基于当前值计算，当 count >= 100 时禁用
        enable: computed((scope: any) => {
            return scope.value < 100;
        }),
        validate: (value) => {
            return value >= 0 && value <= 1000;
        },
    },
    // 其他可配置项
    // .....
});
```

:::warning 提示
配置管理器即引用于原始`AutoStore`的值，也保存了可配置项的元数据，同时元数据本身也是响应式的，也可以是计算属性，具有`AutoStore`的所有功能。
:::

基于所有的配置元数据均被封装在一个`AutoStore`这样的设计思路，很容易就可以实现可配置项元数据之间的依赖计算。

```ts
const netStore = new AutoStore(
    {
        dhcp: configurable(true, {
            label: "自动获取IP地址",
        }),
        ip: configurable("192.168.1.1", {
            label: "IP地址",
            enable: false,
        }),
    },
    { id: "network" },
);
```

比如在上例中，我们需在**启用DHCP时，ip地址的enable能根据dhcp的值自动切换，该如何实现此功能？**

以上配置数据在`AutoStoreConfigManager`中等效于:

```ts
const configManager = new AutoStore({
    "network.dhcp": {
        value: true,
        label: "自动获取IP地址",
    },
    "network.ip": {
        value: "192.168.1.1",
        label: "自动获取IP地址",
        enable: false,
    },
});
```

现在我们要让`network.ip.enable`的值依赖于`network.dhcp.value`,使用计算属性就非常简单了。

```ts
const netStore = new AutoStore(
    {
        dhcp: configurable(true, {
            label: "自动获取IP地址",
        }),
        ip: configurable("192.168.1.1", {
            label: "IP地址",
            enable: (scope: any) => {
                return scope["network.dhcp"].value;
            },
        }),
    },
    { id: "network" },
);
```

知道了配置元数据在`AutoStoreConfigManager`的组织方式，再结合`computed`等计算属性就很容易实现配置项元数据之间的联动了。

**特别注意：**

`configurable`内部所有计算属性的`scope`指向的是`AutoStoreConfigManager.state`，而不是`configurable`所在的`AutoStore`。
因此，像如下方式是无效的。

```ts
const netStore = new AutoStore(
    {
        dhcp: true,
        ip: configurable("192.168.1.1", {
            label: "IP地址",
            enable: (scope: any, { refStore }) => {
                //❗ scope===AutoStoreConfigManager.state
                //❗ 而dhcp并没有声明为可配置项
                //❗ 因此AutoStoreConfigManager.state不存在network.dhcp
                //❗ enable是在AutoStoreConfigManager
                //❗ dhcp是在netStore，两者并不在同一个Store中
                return scope["network.dhcp"].value; // [!code ++] ❌无效
            },
        }),
    },
    { id: "network" },
);
```

### 数据校验

配置数据的校验功能是基于`AutoStore`的底层校验功能实现，可以参阅[./validate].

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
