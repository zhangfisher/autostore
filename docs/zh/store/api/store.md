# AutoStore API

`AutoStore` 是 AutoStore 的核心类，提供基于 Proxy 的响应式状态管理。

## 构造函数

### constructor

```ts
constructor(state?: State, options?: AutoStoreOptions<State>)
```

创建一个 AutoStore 实例。

**参数：**

| 参数 | 类型 | 说明 |
| :---: | :---: | :--- |
| `state` | `State` | 初始状态对象 |
| `options` | `AutoStoreOptions<State>` | 配置选项 |

**配置选项：**

| 选项 | 类型 | 默认值 | 说明 |
| :---: | :---: | :---: | :--- |
| `id` | `string` | 自动生成 | Store 实例标识 |
| `debug` | `boolean` | `false` | 是否启用调试模式 |
| `lazy` | `boolean` | `false` | 是否延迟创建计算对象 |
| `shadow` | `boolean` | `false` | 是否声明为影子 Store |
| `enableComputed` | `boolean` | `true` | 是否启用计算属性（全局开关） |
| `enableValueExpr` | `boolean` | `true` | 是否启用字符串表达式解析 |
| `reentry` | `boolean` | `true` | 计算函数是否允许重入 |
| `resetable` | `boolean` | `false` | 是否启用重置功能 |
| `cascadeDestroy` | `boolean` | `true` | 依赖删除时是否级联销毁 |
| `plugins` | `IAutoStorePlugin[]` | `[]` | 功能插件列表 |
| `logger` | `ILogger` | - | 自定义日志器 |
| `scope` | `ComputedScope` | - | 默认的计算作用域 |
| `getRootScope` | `function` | - | 获取计算函数根作用域 |
| `configManager` | `ConfigManager \| false` | - | 配置管理器 |
| `configKey` | `string` | `store.id` | 配置项前缀 |
| `onInvalid` | `string` | - | 校验失败时的默认行为 |
| `validate` | `function` | - | 全局校验函数 |
| `validators` | `Record<string, function>` | - | 路径级别的校验函数 |
| `refStore` | `AutoStore \| AutoStore[]` | - | 引用其他 Store |
| `sandbox` | `object` | - | 代码执行沙箱配置 |

**示例：**

```ts
import { AutoStore } from "autostore";

const store = new AutoStore(
    {
        user: {
            name: "张三",
            age: 25,
        },
        order: {
            price: 100,
            count: 2,
        },
    },
    {
        id: "my-store",
        debug: true,
        resetable: true,
    }
);
```

---

## 属性

### state

```ts
get state(): ComputedState<State>
```

获取响应式状态对象。通过 Proxy 代理，读写操作会自动触发事件。

**示例：**

```ts
// 读取状态
console.log(store.state.user.name);

// 修改状态（触发事件）
store.state.user.name = "李四";
```

### id

```ts
get id(): string
```

获取 Store 实例的唯一标识符。

```ts
console.log(store.id); // "my-store" 或自动生成的 ID
```

### options

```ts
get options(): AutoStoreOptions<State>
```

获取 Store 的配置选项。

### operates

```ts
get operates(): FastLiteEvent<StateChangeEvents>
```

获取状态操作事件触发器。用于订阅状态变化事件。

```ts
// 订阅特定路径的变化
store.operates.on("user.name", (operate) => {
    console.log("user.name 变化:", operate);
});

// 订阅所有变化
store.operates.onAny((operate) => {
    console.log("状态变化:", operate);
});
```

### computedObjects

```ts
get computedObjects(): ComputedObjects<State>
```

获取计算对象管理器，用于管理所有计算属性实例。

### watchObjects

```ts
get watchObjects(): WatchObjects<State>
```

获取监听对象管理器，用于管理所有 watch 监听器实例。

### errors

```ts
get errors(): Record<string, string>
```

获取校验错误信息集合。键为路径，值为错误信息。

### silenting

```ts
get silenting(): boolean
```

获取当前是否处于静默更新状态。

### batching

```ts
get batching(): boolean
```

获取当前是否处于批量更新状态。

### peeping

```ts
get peeping(): boolean
```

获取当前是否处于偷看模式（读取状态但不触发事件）。

### delimiter

```ts
get delimiter(): string
```

获取路径分隔符，默认为 `"/"`。

### logger

```ts
get logger(): ILogger
```

获取日志器实例。

### configManager

```ts
get configManager(): ConfigManager
```

获取配置管理器实例。

### configKey

```ts
get configKey(): string
```

获取当前 Store 的配置键前缀。

### resetable

```ts
get resetable(): boolean
set resetable(value: boolean)
```

获取或设置是否启用重置功能。启用后，状态的首次变化会被记录，可通过 `reset()` 恢复。

```ts
// 启用重置功能
store.resetable = true;

// 修改状态
store.state.user.name = "李四";

// 重置到初始状态
store.reset();
```

### plugins

```ts
get plugins(): IAutoStorePlugin[]
```

获取已安装的插件列表。

### updatedState

```ts
updatedState: Record<string, any> | undefined
```

记录状态变化的字典（仅在 `resetable=true` 时有效），键为路径，值为首次变化前的旧值。

---

## 方法

### watch

```ts
watch(listener: WatchListener, options?: WatchListenerOptions): Watcher
watch(paths: StatePath | StatePath[], listener: WatchListener, options?: WatchListenerOptions): Watcher
```

监听状态变化。

**参数：**

| 参数 | 类型 | 说明 |
| :---: | :---: | :--- |
| `paths` | `string \| string[]` | 要监听的路径，支持通配符 `*` 和 `**` |
| `listener` | `function` | 状态变化时的回调函数 |
| `options` | `WatchListenerOptions` | 配置选项 |

**options 选项：**

| 选项 | 类型 | 默认值 | 说明 |
| :---: | :---: | :---: | :--- |
| `once` | `boolean` | `false` | 是否只监听一次 |
| `operates` | `string \| string[]` | `"write"` | 过滤操作类型 |
| `filter` | `function` | - | 自定义过滤器 |
| `depth` | `number` | `0` | 监听深度（0/1/≥2） |

**返回值：** `Watcher` 对象，提供 `off()` 方法取消监听。

```ts
// 监听所有变化
const watcher1 = store.watch((operate) => {
    console.log(operate);
});

// 监听指定路径
const watcher2 = store.watch("user.name", ({ value, oldValue }) => {
    console.log(`姓名变化: ${oldValue} -> ${value}`);
});

// 监听多个路径
const watcher3 = store.watch(
    ["user.name", "order.price"],
    (operate) => {
        console.log(operate.path.join("."), "变化");
    }
);

// 使用通配符
store.watch("user.*", (operate) => {
    console.log("user 下的属性变化:", operate);
});

// 配置选项
store.watch("order", callback, {
    once: true,
    operates: "write",
    depth: 2,
});

// 取消监听
watcher1.off();
```

### update

```ts
update(fn: (state: ComputedState<State>) => void, options?: UpdateOptions): void
```

在函数内部更新状态值。

**参数：**

| 参数 | 类型 | 说明 |
| :---: | :---: | :--- |
| `fn` | `function` | 更新函数，在函数内修改 state |
| `options` | `UpdateOptions` | 配置选项 |

**options 选项：**

| 选项 | 类型 | 默认值 | 说明 |
| :---: | :---: | :---: | :--- |
| `batch` | `boolean \| string` | `false` | 是否批量更新 |
| `silent` | `boolean` | `false` | 是否静默更新（不触发事件） |
| `peep` | `boolean` | `false` | 是否偷看模式 |
| `reply` | `boolean` | `true` | 批量更新后是否回放操作事件 |
| `flags` | `number` | `0` | 额外的更新标识 |
| `onInvalid` | `string` | - | 校验失败时的行为 |

```ts
// 普通更新
store.update((state) => {
    state.user.name = "李四";
    state.user.age = 26;
});

// 批量更新（更新完成后触发一次 batch 事件）
store.update(
    (state) => {
        state.user.name = "李四";
        state.user.age = 26;
    },
    { batch: true }
);

// 静默更新（不触发任何事件）
store.update(
    (state) => {
        state.user.name = "李四";
    },
    { silent: true }
);

// 指定批量更新事件名称
store.update(
    (state) => {
        state.user.name = "李四";
    },
    { batch: "user-update" }
);
```

### silentUpdate

```ts
silentUpdate(fn: (state: ComputedState<State>) => void): void
```

静默更新状态，不触发任何事件。等价于 `update(fn, { silent: true })`。

```ts
store.silentUpdate((state) => {
    state.user.name = "李四";
});
```

### batchUpdate

```ts
batchUpdate(fn: (state: ComputedState<State>) => void): void
```

批量更新状态，更新完成后触发一次 `__batch_update__` 事件。等价于 `update(fn, { batch: true, onInvalid: "pass" })`。

```ts
store.batchUpdate((state) => {
    state.user.name = "李四";
    state.user.age = 26;
    state.order.count = 5;
});
```

### peep

```ts
peep<Value>(getter: (state: State) => Value): Value
peep<PATH>(path: PATH): GetTypeByPath<ComputedState<State>, PATH>
peep<Value>(path: string[]): Value
```

偷看状态值，读取过程中不触发 `get` 事件。

```ts
// 使用路径字符串
const name = store.peep("user.name");

// 使用路径数组
const name2 = store.peep(["user", "name"]);

// 使用 getter 函数
const total = store.peep((state) => state.order.price * state.order.count);
```

### collectDependencies

```ts
collectDependencies(fn: () => void, operates?: WatchListenerOptions["operates"]): string[][]
```

执行函数并收集函数内部读写操作涉及的依赖路径。

```ts
// 收集所有操作的依赖
const deps = store.collectDependencies(() => {
    store.state.user.name;
    store.state.order.price;
});
// deps = [["user", "name"], ["order", "price"]]

// 只收集读操作的依赖
const readDeps = store.collectDependencies(() => {
    store.state.user.name;
    store.state.user.age = 26; // 写操作不收集
}, "read");
// readDeps = [["user", "name"]]
```

### getSnap

```ts
getSnap<Entry>(options?: { entry?: Entry; reserveAsync?: boolean; includeFunc?: boolean }): GetTypeByPath<ComputedState<State>, Entry>
```

返回状态的快照数据（纯对象，非 Proxy）。

| 选项 | 类型 | 默认值 | 说明 |
| :---: | :---: | :---: | :--- |
| `entry` | `string` | - | 指定路径，不传则返回整个状态 |
| `reserveAsync` | `boolean` | `true` | 是否保留异步对象结构 |
| `includeFunc` | `boolean` | - | 是否包含函数属性 |

```ts
// 获取整个状态快照
const snapshot = store.getSnap();

// 获取指定路径的快照
const userSnap = store.getSnap({ entry: "user" });

// 不保留异步对象结构
const snap = store.getSnap({ reserveAsync: false });
```

### get

```ts
get<T>(path: T, options?: { defaultValue?: any; waitAsyncDone?: boolean; timeout?: number }): any
```

获取指定路径的值，支持异步计算属性等待。

| 选项 | 类型 | 说明 |
| :---: | :---: | :--- |
| `defaultValue` | `any` | 路径不存在时的默认值 |
| `waitAsyncDone` | `boolean` | 是否等待异步计算完成 |
| `timeout` | `number` | 等待异步计算的超时时间（毫秒） |

```ts
// 同步获取
const name = store.get("user.name");

// 获取不存在的路径，返回默认值
const val = store.get("nonexistent", { defaultValue: "默认值" });

// 等待异步计算完成
const asyncVal = await store.get("user.asyncData", {
    waitAsyncDone: true,
    timeout: 5000,
});
```

### reset

```ts
reset(entry?: string): void
```

将状态重置到初始值。需要先启用 `resetable` 选项。

```ts
// 启用重置功能
store.resetable = true;

// 修改状态
store.state.user.name = "李四";
store.state.order.price = 200;

// 重置所有状态
store.reset();

// 重置指定路径下的状态
store.reset("user");
```

### destroy

```ts
destroy(): void
```

销毁 Store 实例，取消所有事件订阅和监听器。

```ts
store.destroy();
```

### createObserverObject

```ts
createObserverObject(descriptor: AnyObserverDescriptor, context?: ObserverContext): ObserverObject | undefined
```

创建观察者对象实例（内部方法，通常不直接调用）。

### toString

```ts
toString(): string
```

返回 Store 的字符串表示。

```ts
console.log(store.toString()); // "AutoStore<my-store>"
```
