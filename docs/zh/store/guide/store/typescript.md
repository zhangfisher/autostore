# TypeScript

`AutoStore`具备完善的`Typescript`类型支持.

## 基本状态类型推断

```ts twoslash
import { AutoStore } from "autostore";

const store = new AutoStore({
    user: {
        id: "user_123456",
        username: "Fisher",
        email: "fisher@example.com",
        phone: "+86 138 0000 0000",
        age: 28,
        gender: "male",
        avatar: "https://cdn.example.com/avatar.jpg",
        birthday: new Date("1996-05-15"),
        isVip: true,
        isActive: true,
        address: {
            province: "广东省",
            city: "深圳市",
            district: "南山区",
            street: "科技园路100号",
            zipCode: "518000",
            isDefault: true,
        },
    },
});

store.state;
// "events" | "meta" | "context" | "message" | "listeners"
// | "anyListener" | "rawState" | state
// 一些有用类型
type types = keyof typeof store.types;

// 支持的事件，通过store.on订阅
// "load" | "unload" | "reset" | "computed:created" | "computed:done"
// | "computed:error" | "computed:cancel" | "watch:created"
// | "watch:done" | "watch:error" | "observer:beforeCreate"
// | "observer:created" | "observer:done" | "validate"
type Events = keyof typeof store.types.events;
//
type listeners = keyof typeof store.types.listeners;
//
type message = typeof store.types.message;

// 原始的输入的状态类型
type rawState = keyof typeof store.types.rawState;
```

`typeof store.types`提供了一个有用的类型：
| 类型 | 说明 |
| :---: | ----|
| `events` | 支持的事件 |
| `meta` | 事件元数据类型，见FastEvent |
|`context`| 事件侦听器上下文，见FastEvent|
|`message` | 事件消息 |
|`listeners` | 所有监听器 |
| `anyListener`| |
|`rawState`| 原始状态类型|
| `state` | 经过计算属性变换后的状态类型|

## 计算属性类型

```ts twoslash
import { AutoStore, computed, asyncComputed } from "autostore";

const store = new AutoStore({
    order: {
        price: 100,
        count: 2,
        total: computed((scope) => {
            return scope.price * scope.count;
        }),
        asyncTotal: computed(
            async (scope) => {
                return scope.price * scope.count;
            },
            ["./price", "./count"],
        ),
        asyncTotalPro: asyncComputed(
            async (scope) => {
                return scope.price * scope.count;
            },
            ["./price", "./count"],
        ),
    },
});

type state = typeof store.state;
/**
 {
    order: {
        price: number;
        count: number;
        total: number;
        asyncTotal: number;
        asyncTotalPro: AsyncComputedValue<number>;
    };
}*/
type rawState = typeof store.types.rawState;
```

## Scope类型

由于`computed`、`watch`、`asyncComputed`均是独立的函数，并且`scope`是可以根据`scope`参数动态指定的，所以`scope`目前无法自动推断。

## 类型工具

以下是一个相关的类型工具。

### ComputedState

递归遍历状态树，将所有计算属性/监视属性替换为其返回值类型。
这是 `AutoStore` 类型系统的核心，用于推导计算后的状态类型。

```ts twoslash
import { computed, asyncComputed, ComputedState } from "autostore";
const state = {
    order: {
        price: 100,
        count: 2,
        total: computed((scope) => {
            return scope.price * scope.count;
        }),
        asyncTotal: computed(
            async (scope) => {
                return scope.price * scope.count;
            },
            ["./price", "./count"],
        ),
        asyncTotalPro: asyncComputed(
            async (scope) => {
                return scope.price * scope.count;
            },
            ["./price", "./count"],
        ),
    },
};

type computedState = ComputedState<typeof state>;
/**
 {
    order: {
        price: number;
        count: number;
        total: number;
        asyncTotal: number;
        asyncTotalPro: AsyncComputedValue<number>;
    };
}*/
```

### PickComputedResult

提取计算属性、监视属性等的返回值类型

```ts twoslash
import { computed, asyncComputed, PickComputedResult, watch } from "autostore";
// 同步计算
type SyncResult = PickComputedResult<(scope: any) => string>; // string

// 简单异步计算
const asyncState = computed(async () => true, []);
type AsyncResult = PickComputedResult<typeof asyncState>;
// 增加异步计算
const asyncStatePro = asyncComputed(async () => true, []);
type AsyncResultPro = PickComputedResult<typeof asyncStatePro>;
// watch
const watchState = watch(() => "");
type watchResult = PickComputedResult<typeof watchState>;
```

### StatePath

获取状态树中所有可能的路径字符串，用于类型安全的路径访问。别名`ObjectKeyPaths`

```ts twoslash
import { computed, asyncComputed, StatePath } from "autostore";
const state = {
    order: {
        price: 100,
        count: 2,
        total: computed((scope) => {
            return scope.price * scope.count;
        }),
        asyncTotal: computed(
            async (scope) => {
                return scope.price * scope.count;
            },
            ["./price", "./count"],
        ),
        asyncTotalPro: asyncComputed(
            async (scope) => {
                return scope.price * scope.count;
            },
            ["./price", "./count"],
        ),
    },
};
type Paths = StatePath<typeof state>;
/**
 type Paths = "order" | "order.price" | "order.count" 
 | "order.total" | "order.asyncTotal" | "order.asyncTotalPro" 
 | "order.asyncTotalPro.cancel" | "order.asyncTotalPro.loading" 
 | "order.asyncTotalPro.progress" | "order.asyncTotalPro.timeout" 
 | "order.asyncTotalPro.error" | "order.asyncTotalPro.retry" 
 | "order.asyncTotalPro.value" | "order.asyncTotalPro.run"
 */
```

### Dict

字典类型

- 表示一个键为字符串的对象类型，但排除函数类型。
- 这是一个通用的对象类型约束，用于状态树定义

```ts
type Dict<T = any> = T extends (...args: any[]) => any ? never : Record<string, T>;
```

### GetTypeByPath

根据路径字符串获取状态类型
从状态类型中通过点分隔的路径字符串获取对应的值类型。
空路径或 undefined 返回整个状态类型。

```ts twoslash
import { GetTypeByPath } from "autostore";
type State = {
    user: {
        name: string;
        age: number;
    };
};
type NameType = GetTypeByPath<State, "user.name">; // string
type UserType = GetTypeByPath<State, "user">; // { name: string; age: number }
type WholeType = GetTypeByPath<State, "">; // State
```

### MutableRecord

可变记录类型 - 用于构建类型安全的联合记录

```ts
type MutableRecord<
    Items,
    KindKey extends string = "type",
    Share = unknown,
    DefaultKind extends keyof Items = never,
>
```

**类型参数：**

|     名称      | 说明                                |
| :-----------: | ----------------------------------- |
|    `Items`    | 各种类别的类型定义集合              |
|   `KindKey`   | 用于区分类型的键名，默认为`type`    |
|    `Share`    | 所有类型共享的属性                  |
| `DefaultKind` | 默认类型，该类型的`KindKey`是可选的 |

- **可变记录类型,其类型是由记录上的type字段推断出来的。**

```ts twoslash
import { MutableRecord } from "autostore";

type Animal = MutableRecord<{
    dog: { bark: boolean; wagging: boolean };
    cat: { mew: number };
    chicken: { egg: number };
}>;
let animals: Animal = {
    type: "dog",
    bark: true,
    wagging: true,
};
let animals2: Animal = {
    type: "cat",
    mew: 23,
};
```

- **也可以通过第二个泛型参数来指定，类型字段。**

```ts twoslash
import { MutableRecord } from "autostore";
type Animal = MutableRecord<
    {
        dog: { bark: boolean; wagging: boolean };
        cat: { mew: number };
        chicken: { egg: number };
    },
    "kind"
>;

let animals: Animal = {
    kind: "dog",
    bark: true,
    wagging: true,
};
// {kind:'dog',bark:boolean,wagging:boolean }
// | {kind: 'cat', mew:number}
// | {kind: 'chicken', egg:number}
```

- **第 3 个泛型参数用来指定`share`公共字段**

```ts twoslash
import { MutableRecord } from "autostore";
type Animal = MutableRecord<
    {
        dog: { bark: boolean; wagging: boolean };
        cat: { mew: number };
        chicken: { egg: number };
    },
    "kind",
    {
        name: string;
        age: number;
    }
>;

let animals: Animal = {
    kind: "dog",
    bark: true,
    wagging: true,
    name: "Jack",
    age: 3,
};
// {kind:'dog',bark:boolean,wagging:boolean,name:string,age:number }
// | {kind: 'cat', mew:number,name:string,age:number}
// | {kind: 'chicken', egg:number,name:string,age:number}
```

- **第 4 个泛型参数用于指定 kind 默认类型**

```ts twoslash
import { MutableRecord } from "autostore";
type Animal = MutableRecord<
    {
        dog: { bark: boolean; wagging: boolean };
        cat: { mew: number };
        chicken: { egg: number };
    },
    "kind",
    {
        name: string;
        age: number;
    },
    "cat"
>;
// 以下没有指定kind时，默认为cat类型。
let animals: Animal = {
    mew: 5,
    name: "Jack",
    age: 3,
};
animals.kind;
```

### AutoStoreEvents

`AutoStore`实例本身就是一个[FastEvent](https://zhangfisher.github.io/fastevent/)实例，`AutoStoreEvents`是该实例支持的事件类型。

```ts
type AutoStoreEvents = TransformedEvents<{
    // 响应对象创建后
    load: AutoStore<any>;
    // 响应对象销毁后
    unload: AutoStore<any>;
    // 对象重置时触发，入参为重置的路径字符串
    reset: string | undefined;
    // 当计算对象创建时
    "computed:created": ComputedObject;
    // 当计算函数执行成功后
    "computed:done": {
        id: string;
        path: string[];
        value: any;
        computedObject: ComputedObject;
    };
    // 当计算函数执行出错时
    "computed:error": {
        id: string;
        path: string[];
        error: any;
        computedObject: ComputedObject;
    };
    // 当计算函数被取消时
    "computed:cancel": {
        id: string;
        path: string[];
        reason: "timeout" | "abort" | "reentry" | "error";
        computedObject: ComputedObject;
    };
    "watch:created": WatchObject;
    "watch:done": { value: any; watchObject: WatchObject };
    "watch:error": { error: any; watchObject: WatchObject };
    //
    "observer:beforeCreate": ComputedDescriptor;
    "observer:created": ObserverObject<any, any>;
    "observer:done": ObserverDescriptor<any, any, any>;
    // 当验证器验证失败时触发
    validate: { path: string[]; newValue: any; oldValue: any; error: string | undefined };
}>;
```

### ConfigurableState

获取`AutoStore`中的所有可配置项的状态类型

```ts twoslash
import { AutoStore, configurable, ConfigurableState } from "autostore";
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
// 未指定配置健
type localConfig = ConfigurableState<typeof orderStore>;
// 指定配置健
type withAppConfig = ConfigurableState<typeof orderStore, "app">;
```

### ConfigurableKeyPaths

返回状态中的可配置项的健名

```ts twoslash
import { AutoStore, configurable, ConfigurableKeyPaths } from "autostore";
const state = {
    order: {
        price: configurable(99.9, {
            label: "订单价格",
        }),
        quantity: configurable(10, {
            label: "订单数量",
        }),
    },
};
type configurableKeys = ConfigurableKeyPaths<typeof state>;
```
