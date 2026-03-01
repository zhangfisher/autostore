# 事件

创建的`AutoStore`对象实例后，实例提供两个事件触发器：

- **实例事件触发器**：
- **状态操作事件触发器**

两个事件触发器均基于[FastEvent](https://zhangfisher.github.io/fastevent/)，相关的事件订阅方法可以参考官网。

## 实例事件

`AutoStore`对象实例本身就是一个事件触发器，提供了一些事件用来监听实例的生命周期、状态变化以及计算属性等事件。

```ts
class AutoStore<State extends Dict> extends EventEmitter<StoreEvents> {}
export type StoreEvents = {
    // 响应对象创建后
    load: AutoStore<any>;
    // 响应对象销毁后
    unload: AutoStore<any>;
    // 对象重置时触发，入参为重置的路径字符串
    reset: string | undefined;
    // 当计算对象创建时
    "computed:created": ComputedObject;
    // 当计算函数执行成功后
    "computed:done": { id: string; path: string[]; value: any; computedObject: ComputedObject };
    // 当计算函数执行出错时
    "computed:error": { id: string; path: string[]; error: any; computedObject: ComputedObject };
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
    // 可观察对象事件
    "observer:beforeCreate": ObserverDescriptor<any, any, any>;
    "observer:afterCreate": ObserverDescriptor<any, any, any>;
    "observer:done": ObserverDescriptor<any, any, any>;
    // 当验证器验证失败时触发
    validate: { path: string[]; newValue: any; oldValue: any; error: string | undefined };
};
```

`AutoStore`提供了以下事件：

### load

当`AutoStore`对象实例创建后触发。

```ts
store.on("load", (store: AutoStore) => {
    console.log("store loaded:", store);
});
```

### unload

当调用`store.destory()`销毁`AutoStore`对象实例后触发。

```ts
store.on("unload", (store: AutoStore) => {
    console.log("store loaded:", store);
});
```

### computed:created

当计算属性对象创建时触发。

```ts
store.on("computed:created", (computedObject: ComputedObject) => {
    console.log("computedObject created:", computedObject);
});
```

### computed:done

当计算函数执行成功时触发。

```ts
store.on("computed:done", ({ id, path, value, computedObject }: any) => {
    console.log("computedObject done:", id, path, value, computedObject);
});
```

### computed:error

当计算函数执行出错时触发。

```ts
store.on("computed:error", ({ id, path, error, computedObject }: any) => {
    console.log("computedObject error:", id, path, error, computedObject);
});
```

### computed:cancel

当异步计算函数被取消时触发。

```ts
store.on("computed:cancel", ({ id, path, reason, computedObject }: any) => {
    console.log("computedObject cancel:", id, path, reason, computedObject);
});
```

- `reason`是计算被取消的原因，取值:`timeout` | `abort` | `reentry` | `error`

### watch:created

当`watch`对象创建时触发。

```ts
store.on("watch:created", (watchObject: WatchObject) => {
    console.log("watchObject created:", watchObject);
});
```

### watch:done

当`watch`函数执行成功时触发。

```ts
store.on("watch:done", ({ value, watchObject }: any) => {
    console.log("watchObject done:", value, watchObject);
});
```

### watch:error

当`watch`函数执行出错时触发。

```ts
store.on("watch:error", ({ error, watchObject }: any) => {
    console.log("watchObject error:", error, watchObject);
});
```

### observer:beforeCreate

当可观察对象事件创建前触发,可以在此修改创建参数。

### observer:afterCreate

当可观察对象事件创建后触发

### observer:done

当可观察对象事件执行完成后触发

:::warning 可观察对象
可观察对象是一个抽象概念，所有的`computedObject`、`watchObject`均是可观察对象。
:::

## 状态操作事件

`AutoStore`对象实例提供了一个状态变更事件触发器`operates`，用来监听状态的读写变化。

**当读写状态时，会触发相应的事件，`store.operates`就是一个普通的事件触发器对象，可以通过`operates`的`on/once/onAny/wait`方法订阅事件。所以`AutoStore`的所有依赖收集以及事件响应均是基于`store.operates`实现的。**

### 触发状态读写事件

当对状态进行读写操作时，会在`operates`触发名称为`<状态路径>`的事件。

```ts
const store = new AutoStore({
    user: {
        name: "tom",
        age: 18,
    },
});
```

**例如:**

- **读操作：** `console.log(store.state.user.name)`：

触发名称为`user.name`的事件。相当于`store.operates.emit('user.name',<operate>)`。

- **写操作：** `store.state.user.name='jack'`：

触发名称为`user.name`的事件。相当于`store.operates.emit('user.name',<operate>)`。

### 事件操作参数

`operates`触发的事件的参数是一个`StateOperate`对象，用来描述状态的读写操作。

```ts
type StateOperate<Value = any, Parent = any> = {
    type: StateOperateType;
    path: string[];
    value: Value;
    indexs?: number[];
    oldValue?: Value;
    parentPath?: string[];
    parent?: Parent;
    reply?: boolean;
};

type BatchChangeEvent = "__batch_update__";
type StateChangeEvents = Record<string, StateOperate>;

type StateOperateType =
    | "get"
    | "set"
    | "delete" // 用于对象
    | "insert"
    | "update"
    | "remove" // 用于数组
    | "batch"; // 批量操作
```

**`StateOperate`对象包含以下属性：**

|     属性     |        类型        | 说明                                                                          |
| :----------: | :----------------: | ----------------------------------------------------------------------------- |
|    `type`    | `StateOperateType` | 操作类型，取值`get`、`set`、`delete`、`insert`、`update`、`remove`、`batch`。 |
|    `path`    |     `string[]`     | 状态路径。                                                                    |
|   `value`    |      `Value`       | 状态值。                                                                      |
|   `indexs`   |     `number[]`     | 数组操作时的索引。                                                            |
|  `oldValue`  |      `Value`       | 旧值。                                                                        |
| `parentPath` |     `string[]`     | 父路径。                                                                      |
|   `parent`   |      `Parent`      | 父对象。                                                                      |
|   `reply`    |     `boolean`      | 是否回放操作。                                                                |

- `type`：操作类型，`get`表示读操作，`set`表示写操作，`delete`表示删除操作，`insert`表示插入操作，`update`表示更新操作，`remove`表示删除操作，`batch`表示批量操作。
- `insert`、`update`、`remove`用于表示数组的插入、更新、删除操作。操作时还提供`indexs`属性用来表示操作的索引。
- `get`、`set`、`delete`用于表示对象的读、写、删除操作。
- `batch`用于表示批量操作。
- `get`代表所有读操作

### 监听状态操作

要监听状态读写操作，可以通过`operates`的`on/once/onAny/wait`方法订阅事件。

```ts
const store = new AutoStore({
    user: {
        name: "tom",
        age: 18,
    },
});
```

- **监听 user.name 操作**

`store.operates.on('user.name',(operate:StateOperate)=>{...})`

- **监听所有操作**

`store.operates.onAny((operate:StateOperate)=>{...})`

- **使用通配符**

支持`*`通配符，可以监听所有`user`下的操作。

`store.operates.on('user.*',(operate:StateOperate)=>{...})`

:::warning 提示
`AutoStore`的所有依赖收集以及事件响应均是基于`store.operates`实现的，所以`store.operates`是一个非常重要的事件触发器对象。
:::

### markRaw

当读写状态时，会触发相应的事件，但是有时候我们并不希望触发事件，可以使用`markRaw`标识。

```ts
import { isRaw, markRaw } from "@autostorejs/react";

const store = new AutoStore({
    order: markRaw({
        price: 9.9,
        count: 5,
        total: (order) => order.price * order.count,
    }),
});

isRaw(store.state.order); // true
typeof state.order.total; // 'function'
```

- **`markRaw`标识的对象不会触发事件，也不会创建 Proxy，不具备响应式**
- `isRaw`函数用来判断对象是否被`markRaw`标识。
- 上例中的`total`也不会创建计算属性，因为`order`对象是`markRaw`标识的。
