# AutoStoreSyncer

`AutoStoreSyncer` 是最基本的同步器，用于在两个 `AutoStore` 之间建立 `1-1` 的同步关系。

## 快速入门

实现同一应用内两个 `AutoStore` 之间的数据双向同步。当一个 `Store` 的状态发生变化时，另一个 `Store` 会自动更新，保持数据一致性。

### **第 1 步：导入 syncer 包**

```ts
import "@autostorejs/syncer";
import { AutoStore } from "autostore";
```

### **第 2 步：创建两个 Store**

```ts
const store1 = new AutoStore({
    order: {
        name: "fisher",
        price: 2,
        count: 3,
        total: (scope) => scope.price * scope.count,
    },
});

const store2 = new AutoStore({
    myorder: {},
});
```

### **第 3 步：建立同步**

```ts
// 将 store1.state.order 同步到 store2.state.myorder
const syncer = store1.sync(store2, {
    local: "order", // 源路径（store1 的路径）
    remote: "myorder", // 目标路径（store2 的路径）
});

// 现在 store1.order 的变化会自动同步到 store2.myorder
store1.state.order.price = 10;
console.log(store2.state.myorder.price); // 10
```

## 指南

### 同步模式

- **push**

将本地状态推送到远程：

```typescript
const syncer = store1.sync(store2, {
    mode: "push",
});

// store1 的变化会同步到 store2
store1.count = 100; // store2.count 也会变成 100
```

- **pull**

从远程拉取状态：

```typescript
const syncer = store1.sync(store2, {
    mode: "pull",
});

// store2 的变化会同步到 store1
store2.count = 100; // store1.count 也会变成 100
```

- **both**

双向同步（默认）：

```typescript
const syncer = store1.sync(store2, {
    mode: "both",
});

// 任一 store 的变化都会同步到另一个
store1.count = 100; // store2.count = 100
store2.user.name = "Bob"; // store1.user.name = 'Bob'
```

### 同步方向

`direction`选项用于指向同步方向，取值`forward`、`backward`、`both`

|    取值    | 默认 | 说明               |
| :--------: | :--: | ------------------ |
| `forward`  |      | 仅从本地同步到远程 |
| `backward` |      | 仅从远程同步到本地 |
|   `both`   |  ✅  | 双向同步           |

同步方向决定了数据如何在不同 Store 之间流动：

```ts
const store1 = new AutoStore({ data: { value: 1 } });
const store2 = new AutoStore({ data: { value: 2 } });

// 双向同步（默认）
const syncer1 = store1.sync(store2, { direction: "both" });
// store1 ↔ store2：任一方变化都会同步到另一方

// 仅前向同步
const syncer2 = store1.sync(store2, { direction: "forward" });
// store1 → store2：只有 store1 的变化会同步到 store2

// 仅后向同步
const syncer3 = store1.sync(store2, { direction: "backward" });
// store1 ← store2：只有 store2 的变化会同步到 store1
```

### 局部同步

通过 `local` 和 `remote` 选项指定同步的路径：

```ts
const store1 = new AutoStore({
    order: {
        price: 100,
        count: 2,
        total: (scope) => scope.price * scope.count,
    },
    user: {
        name: "Alice",
    },
});

const store2 = new AutoStore({
    myorder: {},
});

// 将 store1.state.order 同步到 store2.state.myorder
store1.sync(store2, {
    local: "order", // store1 的源路径
    remote: "myorder", // store2 的目标路径
});
```

### 过滤同步

使用 `filter` 选项精确控制需要同步的数据：

```ts
const store1 = new AutoStore({
    data: {
        a: 1,
        b: 2,
        c: 3,
        d: 4,
    },
});

const store2 = new AutoStore({
    data: {},
});

// 只同步 a 和 c
store1.sync(store2, {
    filter: (path, value) => {
        // path 是路径数组，如 ['data', 'a']
        // value 是要同步的值
        return path[1] === "a" || path[1] === "c";
    },
});
```

### 路径映射

通过 `pathMap` 实现复杂的路径转换：

```ts
const fromStore = new AutoStore({
    order: {
        a: 1,
        b: 2,
        c: 3,
    },
});

const toStore = new AutoStore({
    myorder: {},
});

fromStore.sync(toStore, {
    remote: "myorder",
    pathMap: {
        // 接收到远程更新时，将路径映射到本地
        toLocal: (path, value) => {
            // 将 ['order.a'] 转换为 ['order', 'a']
            if (typeof value !== "object") {
                return path[0].split(".");
            }
        },
        // 发送到远程时，将本地路径映射到远程
        toRemote: (path, value) => {
            // 将 ['order', 'a'] 转换为 ['order.a']
            if (typeof value !== "object") {
                return [path.join(".")];
            }
        },
    },
});

// 同步后
// fromStore.state.order.a = 1
// toStore.state.myorder['order.a'] = 1
```

### 自定义传输器

`store.sync`内部是使用`LocalTransport`实现的同步，等效代码类似如下：

```typescript
import { AutoStore } from "autostore";
import { AutoStoreSyncer, LocalTransport } from "@autostorejs/syncer";

// 创建两个 store
const store1 = new AutoStore({ count: 0, user: { name: "Alice" } });
const store2 = new AutoStore({ count: 0, user: { name: "Bob" } });

// 创建传输器
let transport1: LocalTransport, transport2: LocalTransport;
transport1 = new LocalTransport(() => transport2);
transport2 = new LocalTransport(() => transport1);

// 创建同步器
const syncer1 = new AutoStoreSyncer(store1, { transport: transport1 });
const syncer2 = new AutoStoreSyncer(store2, {
    transport: transport2,
    mode: "pull", // 从远程拉取
});

// 启动同步
transport1.connect();
transport2.connect();
```

:::warning 提示
允许通过开发自定义传输器来实现同步，比如可以开发HTTP传输器,详见传输器开发。
:::

### Peers 过滤

`peers` 选项用于指定接受哪些来源的同步操作：

```ts
const store1 = new AutoStore({ id: "store-1", data: {} });
const store2 = new AutoStore({ id: "store-2", data: {} });
const store3 = new AutoStore({ id: "store-3", data: {} });

// store1 只接受来自 store-2 的操作
store1.sync(store2, {
    peers: ["store-2"], // 只接受 store-2 的操作
});

// 接受所有来源（默认）
store1.sync(store3, {
    peers: ["*"], // 接受所有来源
});
```

:::warning 提示
此选项仅用于`1-N`、`N-N`同步时使用
:::

### 缓存机制

当 同步器所使用的`Transport` 不可用时，操作会被缓存到内存中：

```ts
const store1 = new AutoStore({ data: {} });
const store2 = new AutoStore({ data: {} });

const syncer = store1.sync(store2, {
    maxCacheSize: 100, // 最大缓存数量，默认 100
});

// 当 transport 不可用时，操作会被缓存
// 当 transport 可用时，调用 flush() 发送缓存
syncer.flush();
```

## 选项

### mode

控制初始同步时的行为模式

- **类型**: `"push" | "pull" | "both" | "none"`
- **默认值**: `"push"`

**可选值：**

| 值       | 说明                 |
| -------- | -------------------- |
| `"push"` | 将本地状态推送到远程 |
| `"pull"` | 从远程拉取状态       |
| `"both"` | 双向同步             |
| `"none"` | 不执行初始同步       |

### id

同步器的唯一标识符，用于在多对同步中区分不同的同步器

- **类型**: `string`
- **默认值**: `<store.id>`

### local

指定本地 `store` 中需要同步的状态路径

- **类型**: `string[] | string`
- **默认值**: `[]` (空数组，表示同步整个 store)

**示例：**

```typescript
// 字符串形式
local: "user";

// 数组形式
local: ["user", "profile"];
```

### remote

指定远程 `store` 中需要同步的状态路径

- **类型**: `string[] | string`
- **默认值**: `[]` (空数组，表示同步整个 store)

**示例：**

```typescript
// 字符串形式
remote: "user";

// 数组形式
remote: ["user", "profile"];
```

### transport

传输层对象，负责在本地和远程之间传递同步消息

- **类型**: `AutoStoreSyncTransportBase`
- **默认值**: `undefined`

### autostart

是否在创建同步器时自动启动同步

- **类型**: `boolean`
- **默认值**: `true`

### onSend

发送操作到远程之前的钩子函数，可以修改或阻止发送

- **类型**: `(operate: StateRemoteOperate) => boolean | undefined`
- **默认值**: `undefined`

**返回值：**

- `false` - 阻止发送此操作
- `true` 或 `undefined` - 继续发送

### onReceive

接收到远程操作之后的钩子函数，可以修改或阻止应用此操作

- **类型**: `(operate: StateRemoteOperate) => boolean | undefined`
- **默认值**: `undefined`

**返回值：**

- `false` - 阻止应用此操作
- `true` 或 `undefined` - 继续应用

### immediate

是否在连接建立后立即执行一次全同步

- **类型**: `boolean`
- **默认值**: `false`

### maxCacheSize

传输层未连接时，本地操作缓存的最大数量

- **类型**: `number`
- **默认值**: `100`

当缓存超过此数量时，最旧的操作会被移除。

### direction

控制同步的方向

- **类型**: `"both" | "forward" | "backward"`
- **默认值**: `"both"`

**可选值：**

- `"both"` - 双向同步（默认）
- `"forward"` - 仅从本地同步到远程
- `"backward"` - 仅从远程同步到本地

### filter

过滤器函数，决定哪些路径的操作应该被同步

- **类型**: `(path: string[], value: any) => boolean`
- **默认值**: `undefined`

**返回值：**

- `false` - 此路径不会被同步
- `true` - 此路径会被同步

### pathMap

路径映射配置，用于在同步时转换本地和远程的路径结构

- **类型**:

```typescript
{
    toLocal?: (path: string[], value: any) => string[] | undefined;
    toRemote?: (path: string[], value: any) => string[] | undefined;
}
```

- **默认值**: `{}`

### peers

接受的同步源列表，用于过滤来自其他同步器的操作

- **类型**: `string[]`
- **默认值**: `["*"]`

**说明：**

- `["*"]` - 接受所有来源的同步
- `["syncer-1", "syncer-2"]` - 只接受指定 ID 的同步器的操作

### debug

是否启用调试模式，启用后会触发 `localOperate` 和 `remoteOperate` 事件

- **类型**: `boolean`
- **默认值**: `false`

## API

### 属性

| 名称        | 类型                         | 说明         |
| ----------- | ---------------------------- | ------------ |
| `store`     | `AutoStore`                  | 关联的 store |
| `id`        | `string`                     | 同步器 ID    |
| `options`   | `AutoStoreSyncerOptions`     | 配置选项     |
| `transport` | `AutoStoreSyncTransportBase` | 传输层对象   |
| `syncing`   | `boolean`                    | 是否正在同步 |

### 方法

| 方法      | 说明                   |
| --------- | ---------------------- |
| `start()` | 启动同步               |
| `stop()`  | 停止同步               |
| `push()`  | 手动推送本地状态到远程 |
| `pull()`  | 手动从远程拉取状态     |
| `flush()` | 刷新操作缓存           |

### 事件

| 事件            | 说明                             |
| --------------- | -------------------------------- |
| `start`         | 同步启动时触发                   |
| `stop`          | 同步停止时触发                   |
| `error`         | 发生错误时触发                   |
| `localOperate`  | 本地操作时触发（需要开启 debug） |
| `remoteOperate` | 远程操作时触发（需要开启 debug） |
