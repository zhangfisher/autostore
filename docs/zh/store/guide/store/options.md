# 参数

`AutoStore`支持丰富的配置参数。

#### id

- **类型**: `string`
- **默认值**: `随机字符串`

为 `Store` 对象提供一个唯一标识符,用于区分不同的 `Store` 对象。

一般不需要手动配置,仅在启用 `debug` 模式和 `devTools` 时用来区分不同的 Store。

```ts
const store = new AutoStore(state, {
    id: "my-store",
});
```

#### debug

- **类型**: `boolean`
- **默认值**: `false`

启用调试模式,会在控制台输出详细的日志信息,便于开发调试。

```ts
const store = new AutoStore(state, {
    debug: true,
});
```

#### delimiter

- **类型**: `string`
- **默认值**: `"."`

路径分隔符,用于构建和解析状态路径。

```ts
const store = new AutoStore(state, {
    delimiter: "/", // 使用 / 作为路径分隔符
});
```

### 计算属性配置

#### enableComputed

- **类型**: `boolean`
- **默认值**: `true`

是否启用计算属性功能。当设置为 `false` 时,会创建计算属性对象,但不会执行计算函数,相当于全局计算总开关。

```ts
const store = new AutoStore(state, {
    enableComputed: false, // 禁用计算属性
});

// 之后可以手动启用
// store.enableComputed = true;
```

#### lazy

- **类型**: `boolean | 'auto'`
- **默认值**: `false`

控制计算属性的执行时机:

- `false`: 在创建时立即执行第一次计算,马上收集依赖
- `true`: 计算函数仅在第一次读取时执行(延迟执行)
- `'auto'`: 默认值,计算对象会立即创建,同步计算会立即执行,异步计算如果有 `initial` 值则在初始化时不执行

```ts
const store = new AutoStore(state, {
    lazy: true, // 延迟计算,首次访问时才执行
});
```

#### reentry

- **类型**: `boolean`
- **默认值**: `true`

计算函数是否允许重入(递归调用自身)。

```ts
const store = new AutoStore(
    {
        count: 0,
        // 重入示例
        result: (scope) => {
            scope.count++;
            if (scope.count < 3) {
                return scope.result; // 重入
            }
            return scope.count;
        },
    },
    {
        reentry: true,
    },
);
```

#### getRootScope

- **类型**: `(state: State, options: { observerType: ObserverType, valuePath: string[] | undefined }) => any`
- **默认值**: `undefined`

计算函数获取 `scope` 时调用,允许修改其根 `scope` 的指向。

默认指向当前根对象,可以通过此函数修改指向。例如 `return state.fields`,代表计算函数的根指向 `state.fields`。这样在指定依赖时,如 `depends="count"`,则会自动转换为 `state.fields.count`。

```ts
const store = new AutoStore(
    {
        fields: {
            price: 100,
            count: 2,
            total: (scope) => scope.price * scope.count,
        },
    },
    {
        getRootScope: (state) => state.fields,
        // 现在 total 中的 scope.price 等价于 state.fields.price
    },
);
```

#### scope

- **类型**: `ComputedScope`
- **默认值**: `undefined`

为所有 `computedObject`、`watchObject` 提供默认的 `scope` 参数。

默认情况下,所有 `computedObject`、`watchObject` 的 `scope` 参数均为 `CURRENT`。可以通过此参数将默认值改为其他值,比如 `ROOT`。

```ts
const store = new AutoStore(
    {
        price: 100,
        items: {
            count: 2,
            total: (scope) => scope.price * scope.count, // scope 默认为 CURRENT
        },
    },
    {
        scope: "ROOT", // 所有计算属性的 scope 默认为 ROOT
    },
);
```

### 生命周期钩子

#### onComputedCreated

- **类型**: `(this: AutoStore<State>, computedObject: ComputedObject) => void`
- **默认值**: `undefined`

当创建计算属性对象时调用,允许对计算对象进行一些处理,比如重新封装 `getter` 函数。

```ts
const store = new AutoStore(state, {
    onComputedCreated(computedObject) {
        console.log("计算属性已创建:", computedObject.path);
    },
});
```

#### onComputedDone

- **类型**: `(this: AutoStore<State>, args: { id: string, path: string[], value: any, computedObject: ComputedObject }) => void`
- **默认值**: `undefined`

当计算属性计算完成时调用。

```ts
const store = new AutoStore(state, {
    onComputedDone({ id, path, value }) {
        console.log(`计算完成: ${path.join(".")} = ${value}`);
    },
});
```

#### onComputedError

- **类型**: `(this: AutoStore<State>, args: { id: string, path: string[], error: Error, computedObject: ComputedObject }) => void`
- **默认值**: `undefined`

当计算属性计算出错时调用。

```ts
const store = new AutoStore(state, {
    onComputedError({ id, path, error }) {
        console.error(`计算错误: ${path.join(".")}`, error);
    },
});
```

#### onComputedCancel

- **类型**: `(this: AutoStore<State>, args: { id: string, path: string[], reason: 'timeout' | 'abort' | 'reentry' | 'error', computedObject: ComputedObject }) => void`
- **默认值**: `undefined`

当计算属性被取消时调用(仅在异步计算时有效)。

```ts
const store = new AutoStore(state, {
    onComputedCancel({ id, path, reason }) {
        console.log(`计算被取消: ${path.join(".")}, 原因: ${reason}`);
    },
});
```

#### onObserverBeforeCreate

- **类型**: `(this: AutoStore<State>, descriptor: ObserverDescriptor) => void`
- **默认值**: `undefined`

在创建观察对象(computed/watch)之前调用。

```ts
const store = new AutoStore(state, {
    onObserverBeforeCreate(descriptor) {
        console.log("准备创建观察对象:", descriptor.path);
    },
});
```

#### onObserverCreated

- **类型**: `(this: AutoStore<State>, observerObject: ObserverObject) => void`
- **默认值**: `undefined`

当创建观察对象实例化时调用,可以在此对 `ObserverObject` 进行一些处理,比如重新封装 `run` 函数等。

```ts
const store = new AutoStore(state, {
    onObserverCreated(observerObject) {
        console.log("观察对象已创建:", observerObject.id);
    },
});
```

#### onObserverInitial

- **类型**: `(this: AutoStore<State>, path: string[], value: any, parent: any) => boolean | undefined`
- **默认值**: `undefined`

当状态值是一个函数时,在创建对应的可观察对象前调用。返回 `false` 则不创建对应的可观察对象,将函数标志为原始值。

```ts
const store = new AutoStore(
    {
        callback: () => console.log("hello"),
    },
    {
        onObserverInitial(path, value, parent) {
            // 如果不想将函数转换为观察对象
            if (path.includes("callback")) {
                return false;
            }
        },
    },
);
```

### 日志配置

#### log

- **类型**: `(message: any, level?: 'info' | 'error' | 'warn') => void`
- **默认值**: `undefined`

当启用 `debug=true` 时用来输出日志信息的函数。可以使用此函数来自定义日志输出方式,方便与应用系统的日志结合。

```ts
const store = new AutoStore(state, {
    debug: true,
    log(message, level) {
        // 自定义日志输出,比如发送到远程日志服务
        console[level](`[AutoStore]`, message);
    },
});
```

### 状态重置

#### resetable

- **类型**: `boolean`
- **默认值**: `false`

启用重置功能。当启用 `resetable=true` 时,会记录状态的首次变化,然后在 `store.reset()` 方法调用时,将数据恢复到初始状态。

```ts
const store = new AutoStore(
    {
        count: 0,
        name: "test",
    },
    {
        resetable: true,
    },
);

// 修改状态
store.state.count = 10;
store.state.name = "updated";

// 重置到初始状态
store.reset();
console.log(store.state.count); // 0
console.log(store.state.name); // 'test'
```

### 校验配置

#### onValidate

- **类型**: `(this: AutoStore<State>, newValue: any, oldValue: any, path: string[]) => boolean`
- **默认值**: `undefined`

全局校验函数,在写入状态时执行。允许抛出 `ValidateError` 来提供错误信息。

```ts
import { ValidateError } from "autostore";

const store = new AutoStore(
    {
        age: 18,
    },
    {
        onValidate(newValue, oldValue, path) {
            if (path[0] === "age" && newValue < 0) {
                throw new ValidateError("年龄不能为负数");
            }
            return true;
        },
    },
);
```

#### validators

- **类型**: `Record<string, StateValidator<State>>`
- **默认值**: `undefined`

为指定的路径的状态值单独指定校验函数,优先于 `onValidate`。支持使用通配符匹配多个路径。

```ts
const store = new AutoStore(
    {
        user: {
            age: 18,
            name: "John",
        },
        order: {
            price: 100,
        },
    },
    {
        validators: {
            // 精确路径
            "user.age": (newValue, oldValue) => newValue >= 0 && newValue <= 150,

            // 通配符匹配
            "order.*.price": (newValue) => newValue > 0,

            // 带错误信息
            "user.name": function (newValue, oldValue) {
                const isValid = typeof newValue === "string" && newValue.length > 0;
                if (!isValid) {
                    this.getErrorMessage = () => "用户名不能为空";
                }
                return isValid;
            },
        },
    },
);
```

#### onInvalid

- **类型**: `"pass" | "throw" | "ignore" | "throw-pass"`
- **默认值**: `"throw"`

校验失败时的默认行为:

- `throw`: 触发 `ValidateError` 错误(默认)
- `throw-pass`: 继续写入,然后再触发 `ValidateError` 错误
- `pass`: 继续写入,不抛出错误
- `ignore`: 静默忽略,既不触发错误,也不写入

错误信息均会写入到 `store.errors` 中。可被校验函数抛出的 `ValidateError.behavior` 覆盖。

```ts
const store = new AutoStore(state, {
    onInvalid: "ignore", // 校验失败时静默忽略
});
```

### Shadow Store 配置

#### shadow

- **类型**: `boolean`
- **默认值**: `false`

声明是否为 shadow store。Shadow store 是基于现有 store 创建的派生 store,其所有 computed、watch 均基于原始 store。

通常不需要手动设置,使用 `store.shadow()` 方法创建时会自动设置。

```ts
const shadowStore = store.shadow({
    derived: (scope) => scope.originalValue * 2,
});
```

#### getShadowStore

- **类型**: `() => AutoStore<any>`
- **默认值**: `undefined`

获取影子 store,为所有 observer 对象提供 store 对象。

```ts
const mainStore = new AutoStore({ value: 1 });

const shadowStore = new AutoStore(
    {
        derived: (scope) => scope.value * 2,
    },
    {
        getShadowStore: () => mainStore,
    },
);
```

### Schema 配置

#### configManager

- **类型**: `ConfigManager | ConfigSource | boolean`
- **默认值**: `undefined`

提供一个配置管理器对象,用于管理可配置的状态值。

```ts
const store = new AutoStore(state, {
    configManager: {
        load: () => ({
            /* 从远程加载配置 */
        }),
        save: (config) => {
            /* 保存配置到远程 */
        },
    },
});

// 或使用全局配置管理器
const store = new AutoStore(state, {
    configManager: true,
});
```

#### configKey

- **类型**: `string`
- **默认值**: `undefined`

为当前 Store 的所有配置项指定一个统一的前缀。

```ts
const store = new AutoStore(state, {
    configKey: "my-app",
    configManager: true,
});
```

#### defaultSchema

- **类型**: `Partial<AutoStateSchema<any>>`
- **默认值**: `undefined`

默认的 Schema 模式,用于配置可配置状态的行为。

```ts
const store = new AutoStore(state, {
    defaultSchema: {
        persistent: true,
        validator: (value) => typeof value === "string",
    },
});
```

### 表达式求值

#### enableValueExpr

- **类型**: `boolean`
- **默认值**: `true`

当启用时,如果值是一个字符串,并且以使用```包裹形式,代表这是一个表达式,则会创建一个代码执行沙箱运行并返回值。

**注意:** 仅在 `lazy=false` 时在实例化时才会对字符串表达式进行解释执行,后续读取时不会执行此操作。

````ts
const store = new AutoStore(
    {
        // 字符串表达式
        value: "```computed((scope)=>{....})```", // [!code ++]
        // 等效于
        value: computed((scope)=>{....}) // [!code ++]
    },
    {
        enableValueExpr: true,
    },
);
````

#### sandbox

- **类型**: `{ create?: (context: Record<string, any>, options?: CreateSandboxOptions) => (code: string) => any, context?: Record<string, any> }`
- **默认值**: `undefined`

沙箱配置选项。

当 `enableValueExpr=true` 时,代表值是一个表达式，内部会基于`new Function`创建一个简单的代码执行沙箱用于执行该表达式。

默认的沙箱相对简单，您可以根据需要自行创建。比如下面是基于`eval`执行表达式代码。

````ts
const store = new AutoStore(
    {
        value: "```compute((scope)=>{return scope.count +1 })```",
    },
    {
        enableValueExpr: true,
        sandbox: {
            // 创建沙箱
            create: (context) => {
                return (code) => {
                    return eval(code);
                };
            },
            // 提供可用上下文变量
            context: {
                compute: (a, b) => a + b,
            },
        },
    },
);
````

:::warning 提示
默认沙箱中支持`computed`,`asyncComputed`,`watch`,`configurable`,`schema`函数。
:::

## 实例属性

### state

- **类型**: `ComputedState<State>`

响应式状态对象,访问和修改状态的入口。

```ts
console.log(store.state.someValue);
store.state.someValue = newValue;
```

### id

- **类型**: `string`

Store 实例的唯一标识符。

```ts
console.log(store.id);
```

### options

- **类型**: `AutoStoreOptions<State>`

创建 Store 时传入的配置对象。

```ts
console.log(store.options.debug);
```

### computedObjects

- **类型**: `ComputedObjects<State>`

所有计算属性对象的集合。

```ts
store.computedObjects.forEach((computed) => {
    console.log(computed.path);
});
```

### watchObjects

- **类型**: `WatchObjects<State>`

所有监听对象的集合。

```ts
store.watchObjects.forEach((watch) => {
    console.log(watch.id);
});
```

### errors

- **类型**: `Record<string, string>`

校验错误信息的集合。

```ts
if (store.errors["user.age"]) {
    console.error("校验失败:", store.errors["user.age"]);
}
```

### delimiter

- **类型**: `string`

路径分隔符。

```ts
const path = ["user", "profile", "name"].join(store.delimiter);
```

### batching

- **类型**: `boolean`

是否正在进行批量更新。

```ts
if (store.batching) {
    console.log("批量更新中...");
}
```

### resetable

- **类型**: `boolean`

是否启用重置功能。

```ts
if (store.resetable) {
    store.reset();
}
```

## 实例方法

### update()

更新状态值。

```ts
// 基本用法
store.update((state) => {
    state.count = 10;
    state.name = "updated";
});

// 批量更新
store.update(
    (state) => {
        state.a = 1;
        state.b = 2;
    },
    {
        batch: true, // 批量更新,只触发一次事件
    },
);

// 静默更新
store.update(
    (state) => {
        state.value = newValue;
    },
    {
        silent: true, // 不触发事件
    },
);
```

### silentUpdate()

静默更新状态,不触发任何事件。

```ts
store.silentUpdate((state) => {
    state.value = newValue;
});
```

### batchUpdate()

批量更新状态,期间不触发事件,更新完成后触发一次批量事件。

```ts
store.batchUpdate((state) => {
    state.a = 1;
    state.b = 2;
    state.c = 3;
});
```

### watch()

监听状态变化。

```ts
// 监听所有变化
const watcher = store.watch(({ type, path, value, oldValue }) => {
    console.log(`${type}: ${path.join(".")} 从 ${oldValue} 变为 ${value}`);
});

// 监听指定路径
const watcher = store.watch("user.name", ({ value }) => {
    console.log("用户名变为:", value);
});

// 监听多个路径
const watcher = store.watch(["user.name", "user.age"], ({ path, value }) => {
    console.log(`${path.join(".")}:`, value);
});

// 使用通配符
const watcher = store.watch("user.*", ({ path, value }) => {
    console.log("user 下的某项变化:", path, value);
});

// 取消监听
watcher.off();
```

### peep()

读取指定路径的状态值但不触发事件(偷看)。

```ts
// 使用路径
const value = store.peep("user.profile.name");

// 使用路径数组
const value = store.peep(["user", "profile", "name"]);

// 使用函数
const value = store.peep((state) => state.user.profile.name);
```

### get()

获取指定路径的值,支持异步计算。

```ts
// 获取普通值
const value = store.get("user.name");

// 等待异步计算完成
const value = await store.get("user.data", {
    waitAsyncDone: true,
    timeout: 5000,
});

// 带默认值
const value = store.get("nonexistent.path", {
    defaultValue: "default",
});
```

### reset()

重置 store 恢复到初始状态(需要启用 `resetable` 选项)。

```ts
const store = new AutoStore(state, { resetable: true });

// 修改状态后
store.reset(); // 重置全部
store.reset("user"); // 只重置 user 路径下的状态
```

### shadow()

创建一个 shadow store。

```ts
const shadowStore = store.shadow({
    derived: (scope) => scope.originalValue * 2,
});

console.log(shadowStore.derived);
```

### getSnap()

返回当前状态的快照数据。

```ts
// 获取全部状态快照
const snapshot = store.getSnap();

// 获取指定路径的快照
const userSnap = store.getSnap({ entry: "user" });

// 选项
const snap = store.getSnap({
    reserveAsync: false, // 不保留异步对象,只返回值
    includeFunc: false, // 不包含函数
});
```

### trace()

跟踪函数内部的操作,主要用于调试。

```ts
// 跟踪同步操作
const tracker = store.trace(() => {
    store.state.value = 100;
});

const operates = await tracker.start();
console.log("触发的操作:", operates);

// 跟踪异步操作
const tracker = store.trace(async () => {
    await fetchData();
    store.state.data = "loaded";
});

// 在特定条件停止跟踪
const operates = await tracker.start((operate) => {
    return operate.type === "set" && operate.path[0] === "data";
});
```

### collectDependencies()

收集函数内部的依赖路径。

```ts
const deps = store.collectDependencies(() => {
    console.log(store.state.a);
    console.log(store.state.b);
});

console.log("依赖路径:", deps);
// 输出: [['a'], ['b']]
```

### destroy()

销毁 store,取消所有订阅和监听。

```ts
store.destroy();
```

## TypeScript 类型

### 基本类型

```ts
import { AutoStore } from "autostore";

interface UserState {
    name: string;
    age: number;
    email: string;
}

const store = new AutoStore<UserState>({
    name: "John",
    age: 30,
    email: "john@example.com",
});

// store.state 拥有完整的类型推导
store.state.name; // string
store.state.age; // number
```

### 路径类型

```ts
type UserPath = ObjectKeyPaths<UserState>;
// 'name' | 'age' | 'email'

store.get("name" as UserPath);
```

### 计算属性类型

```ts
const store = new AutoStore({
    firstName: "zhang",
    lastName: "san",
    // 类型推导会自动识别计算属性
    fullName: (scope: { firstName: string; lastName: string }) => string,
});
```

## 使用建议

1. **配置管理**: 使用 `id` 和 `debug` 选项便于开发和调试
2. **性能优化**: 对于大型状态树,考虑使用 `lazy: true` 延迟计算
3. **类型安全**: 充分利用 TypeScript 的类型推导功能
4. **状态重置**: 开发阶段启用 `resetable` 便于测试和重置
5. **校验**: 使用 `validators` 确保状态数据的完整性
