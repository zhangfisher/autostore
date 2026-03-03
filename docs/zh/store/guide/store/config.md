# 配置系统

`AutoStore`支持一套非常优雅的可配置系统，允许将`AutoStore`状态树中的任意状态声明为可配置状态进行集中管理，用于帮助开发者开发一套应用程序的响应式配置系统。

## 核心特性

- **集中化管理** - 所有模块的可配置项自动注册到全局配置管理器，统一加载、保存和遍历
- **响应式元数据** - 配置元数据（如 `enable`、`required`、`visible`）支持计算属性，可与其他配置项或状态值联动
- **声明式配置** - 通过 `configurable()` 函数在状态定义处直接声明可配置项及其校验规则、标签等元数据
- **双向同步** - 配置变更自动同步到各业务模块，模块内变更自动触发保存到持久层
- **灵活的存储抽象** - 通过 `load/save` 函数抽象配置源，支持 localStorage、API、文件等任意存储后端
- **完整的校验系统** - 内置校验函数、错误信息模板、多种失败处理策略（`throw`/`ignore`/`pass`）
- **跨 Store 引用** - `ref()` 函数支持在配置元数据中引用所在 Store 的状态值，实现复杂联动逻辑
- **UI 友好** - 元数据可包含渲染参数（如 `widget`），便于自动生成配置界面

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

```ts {4,15,26}
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

```ts {9-11,21-26,36-41}
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
  但是`AutoStore`本身是不负责渲染的，而只是帮助管理配置相关的元数据。
  :::

### 第4步: 更新配置

以上创建了一个全局配置管理器`AutoStoreConfigManager`实例和三个业务模块，每个业务模块中的可配置项会自动注册到全局配置管理器`AutoStoreConfigManager`实例。

而`AutoStoreConfigManager`实例本身就是一个`AutoStore`实例，三个业务模块`AutoStore`时会将内部的所有可配置项(使用`configurable`声明)注册到`AutoStoreConfigManager`中，注册后的`AutoStoreConfigManager.state`.如下

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
// order.discount = {"label": "折扣","value": 0.9,errorMessage:null...其他无数据}
// user.age = {"label": "年龄","value": 12,errorMessage:null,...其他无数据}
// product.price = {"label": "单价","value": 123,errorMessage:null,...其他无数据}
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
            enable: (scope: any) => {
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

在上例中，如果我们预期`enable`的值依赖于是否开启`dhcp`，但是问题是，`enable`声明的计算属性是在`AutoStoreConfigManager`这个`AutoStore`中，而`dhcp`是声明在`netStore`实例中，两者并不在同一个`AutoStore`实例中，无法通过简单的计算属性进行计算关联。

但是在实际场景中，我们又预期当`dhcp=true`时，`ip`的`enable`能依赖于`dhcp`的值，当`dhcp`值变化时，配置元数据中的计算属性`enable`可以自动重新计算。此特性在前端进行界面渲染时非常有用。

这问题本质上是，**配置元数据中需要引用所在的`AutoStore`的值，并且在引用值变化时可以`自动重新计算`。**

为解决此问题，我们引入了`refStore`的机制来解决，参阅下文。

### 引用状态

为解决上例中的配置元数据引用所在`AutoStore`的问题，引用了`RefStore`机制。参阅[RefStore](./refStore)

在配置元数据时使用`computed`或`watch`创建计算属性和监视对象时可以通过`ref`函数引用所在`AutoStore`的状态值。

还是以上例中的`netStore`为例:

```ts {6-8}
const netStore = new AutoStore(
    {
        dhcp: true,
        ip: configurable("192.168.1.1", {
            label: "IP地址",
            enable: computed((scope: any, { ref }) => {
                return ref("dhcp");
            }),
        }),
    },
    { id: "network" },
);
```

- 通过`ref`可以引用`netStore`的状态值，并且当`dhcp`变化时配置元数据`enable`会自动更新。

以下是一个更加复杂表单应用场景的示例：

```ts
const formStore = new AutoStore(
    {
        hasAddress: false,
        address: configurable("", {
            label: "地址",
            required: computed((_scope: any, { ref }) => {
                // 有地址时address是必填项
                return ref("hasAddress") === true;
            }),
        }),
        city: configurable("", {
            label: "城市",
            required: computed((_scope: any, { ref }) => {
                return ref("hasAddress") === true;
            }),
        }),
        zipCode: configurable("", {
            label: "邮编",
            required: computed((_scope: any, { ref }) => {
                const hasAddress = ref("hasAddress");
                const city = ref("city");
                // 只有在有地址且已填写城市时才必填
                return hasAddress && city !== "";
            }),
        }),
    },
    { configManager, id: "form" },
);

// 初始状态
expect(configManager.state["form.address"].required).toBe(false);
expect(configManager.state["form.city"].required).toBe(false);
expect(configManager.state["form.zipCode"].required).toBe(false);

// 启用地址
formStore.state.hasAddress = true;
expect(configManager.state["form.address"].required).toBe(true);
expect(configManager.state["form.city"].required).toBe(true);
expect(configManager.state["form.zipCode"].required).toBe(false);

// 填写城市
formStore.state.city = "Beijing";
expect(configManager.state["form.zipCode"].required).toBe(true);
```

在上例中，配置元数据`required`依赖于`formStore.state`的相应状态，并在状态更新时自动重新计算。
如此，在我们使用`formStore`来管理表单数据时，就可以很容易实现表单字段之间的元数据的联动。

### 数据校验

配置数据的校验功能是基于`AutoStore`的底层校验功能实现，阅读前请先参阅[./validate].

#### 校验函数

声明可配置项时可以指定`validate`函数，函数签名如下：

```ts
function validate(
    newValue: Value,    // 新值
    oldValue: Value,    // 原值
    path: string[]  // 路径
) => boolean;
```

以下是简单示例

```ts {4-6}
const store = new AutoStore({
    order: {
        count: configurable(100, {
            validate: (value, oldValue, path) => {
                return value >= 0 && value <= 1000;
            },
        }),
    },
});
```

- 当写入配置值时会自动执行`validate`函数。

#### 校验错误信息

当校验出错时，通过`errorMessage`参数用于指定生成友好的校验错误信息。

```ts {8,11}
const store = new AutoStore({
    order: {
        count: configurable(100, {
            label: "数量",
            validate: (value, oldValue, path) => {
                return value >= 0 && value <= 100;
            },
            errorMessage: "{label}必须大于0小于100",
            // 所有配置元数据均可以作为插值变量，如下：
            custom: 1,
            errorMessage: "{label}必须大于0小于100,{custom}",
        }),
    },
});
```

`errorMessage`支持插值变量, 如上例中的`{label}`。

**所有的配置元数据**均可以作为插值变量，比较常见的插值变量包括：
| 名称 | 说明 |
|:---:| ---- |
| `error` | 错误信息，即`error.message`,`errorMessage`默认值为`{error}`|
| `errorStack` | 错误栈信息，即`error.stack`|
| `path` | 当前配置项路径|
| `value` | 当前配置|
| `label` | 配置标签 |

当校验出错时，错误信息会被写入到三个地方：

- `AutoStoreConfigManager.errors`
- `<AutoStore>.errors`
- `<所在配置元数据>.errorMessage`

因此，如果你在渲染配置界面时，可以直接渲染`errorMessage`

```tsx {6}
Object.entires(AutoStoreConfigManager.state).map(([key, schema]) => {
    return (
        <div>
            <label>{schema.label}</label>
            <input value={schema.value} />
            {schema.errorMessage ? <span>{schema.errorMessage}</span> : ""}
        </div>
    );
});
//
// order.discount = {"label": "折扣","value": 0.9,errorMessage:null...其他无数据}
// user.age = {"label": "年龄","value": 12,errorMessage:null,...其他无数据}
// product.price = {"label": "单价","value": 123,errorMessage:null,...其他无数据}
// ...
```

:::warning 提示
`errorMessage`是一个支持插值变量的模板字符串，在创建可配置项时会在内部保存起来,以便在后续使用。
在校验出错时，会根据结合错误对象+模板字符串插值后写入到`errorMessage`。这样原始的模板字符串就变成插值后的校验错误信息。
:::

#### 校验失败行为

当写入配置状态值时会执行`validate`函数对值进行校验，如果校验失败（触发错误）则可以根据`onInvalid`参数决定如何处理。

```ts
const store = new AutoStore({
    price: configurable(100, {
        validate: (value) => {
            return value > 0;
        },
        onInvalid: "throw", // [!code ++]
    }),
});
```

`onInvalid`取值如下：

|      值      | 默认 | 说明                                   |
| :----------: | :--: | -------------------------------------- |
|   `throw`    |  ✅  | 会触发`ValidateError`错误              |
|   `ignore`   |      | 静默忽略，即不触发错误，也不写入       |
|    `pass`    |      | 继续写入,不抛出错误                    |
| `throw-pass` |      | 继续写入,然后再触发`ValidateError`错误 |

更多关于`onInvalid`参数的信息可以参阅[校验](./validate)

#### 校验事件

当执行`validate`时，无论校验失败或失败，均会抛出`validate`事件.

```ts
const store = new AutoStore({
    user: {
        name: configurable('NAME', {
            label: '用户名',
            validate: (value) => {
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

### Typescript类型

#### 扩展全局配置类型

`interface AutoStoreConfigures`用于扩展全局配置数据的类型，如下：

```ts twoslash
import { AutoStore, computed, ConfigManager, configurable } from "autostore";
import type { AutoStoreConfigures, ConfigurableState } from "autostore";

const configManager = new ConfigManager({
    load: () => {
        return {};
    },
});
const orderStore = new AutoStore(
    {
        order: {
            price: configurable(99.9, {
                label: "订单价格",
                validate: (value) => value > 0,
            }),
            quantity: configurable(10, {
                label: "订单数量",
                validate: (value) => value > 0,
            }),
        },
    },
    {
        configManager,
        configKey: "app1",
    },
);

const userStore = new AutoStore(
    {
        user: {
            name: configurable("Bob", {
                label: "用户名",
                validate: (value) => typeof value === "string" && value.length > 0,
            }),
            age: configurable(25, {
                label: "年龄",
                validate: (value) => value >= 0 && value <= 150,
            }),
        },
    },
    {
        configManager,
        configKey: "app2",
    },
);

const shopStore = new AutoStore(
    {
        shop: {
            discount: configurable(0.1, {
                label: "折扣",
                validate: (value) => value >= 0 && value < 1,
            }),
            tax: configurable(0.05, {
                label: "税率",
                validate: (value) => value >= 0 && value < 1,
            }),
        },
    },
    {
        configManager,
        configKey: "",
    },
);
// 推断可配置状态类型
type orderStoreConfigurableState = ConfigurableState<typeof orderStore, "app1">;
type userConfigurableState = ConfigurableState<typeof userStore, "app2">;
type ShopConfigurableState = ConfigurableState<typeof shopStore>;

// 扩展AutoStoreConfigures类型
declare module "autostore" {
    interface AutoStoreConfigures
        extends orderStoreConfigurableState, userConfigurableState, ShopConfigurableState {}
}
// 访问类型
AutoStoreConfigManager.state;

// 获取所有配置项的键类型（显示为字面量联合类型）
type AllConfigKeys = {
    [K in keyof typeof AutoStoreConfigManager.state]: K;
}[keyof typeof AutoStoreConfigManager.state];
// 类型显示为: "app1.order.price" | "app1.order.quantity" | "app2.user.name" | "app2.user.age" | "shop.discount" | "shop.tax"
AutoStoreConfigManager.state["app1.order.price"];
AutoStoreConfigManager.state["app1.order.price"].value;
AutoStoreConfigManager.state["app1.order.quantity"].value;
AutoStoreConfigManager.state["app2.user.name"].value;
AutoStoreConfigManager.state["app2.user.age"].value;
AutoStoreConfigManager.state["shop.discount"].value;
AutoStoreConfigManager.state["shop.tax"].value;
```

#### 定义Widget类型

配置系统还提供`interface AutoStoreWidgets`类型用于扩展可用的`widget`，这主要用于渲染配置数据时使用。

```ts twoslash
import {
    AutoStore,
    computed,
    ConfigManager,
    configurable,
    type AutoStoreConfigures,
    type ConfigurableState,
    type AutoStoreWidgets,
} from "autostore";

const configManager = new ConfigManager({
    load: () => {
        return {};
    },
});
const orderStore = new AutoStore(
    {
        order: {
            price: configurable(99.9, {
                label: "订单价格",
                widget: "number",
                min: 1,
                max: 10,
                validate: (value) => value > 0,
            }),
            quantity: configurable(10, {
                label: "订单数量",
                validate: (value) => value > 0,
            }),
        },
    },
    {
        configManager,
        configKey: "app",
    },
);
// 推断可配置状态类型
type orderConfigurableState = ConfigurableState<typeof orderStore, "app">;
// 扩展AutoStoreConfigures类型
declare module "autostore" {
    interface AutoStoreConfigures extends orderConfigurableState {}
    // 扩展widget类型，用于渲染场景
    interface AutoStoreWidgets {
        number: {
            max: number;
            min: number;
            step?: number;
        };
        text: {
            maxLength?: number;
            minLength?: number;
            pattern?: RegExp | string;
            rows?: number;
            multiline?: boolean;
        };
        select: {
            options: Array<{ label: string; value: any }>;
            multiple?: boolean;
        };
        checkbox: {
            trueValue?: any;
            falseValue?: any;
            indeterminate?: boolean;
        };
    }
}

AutoStoreConfigManager.state;

// 获取所有配置项的键类型（显示为字面量联合类型）
type AllWidgetNames = {
    [K in keyof AutoStoreWidgets]: K;
}[keyof AutoStoreWidgets];

//
type OrderPriceSchema = (typeof AutoStoreConfigManager.state)["app.order.price"];
type SchemaKeys = keyof OrderPriceSchema;
AutoStoreConfigManager.state["app.order.price"].widget;
// @noErrors
AutoStoreConfigManager.state["app1.order.price"].m;
//                                                ^|

AutoStoreConfigManager.state["app.order.quantity"].widget;
```
