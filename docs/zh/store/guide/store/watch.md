# 监听状态变化

## 概述

`store.watch` 是 AutoStore 提供的状态变化监听 API，用于监听状态树中任意路径的变化并执行回调函数。与计算属性（computed）自动追踪依赖不同，`watch` 提供了更灵活的手动监听能力，支持：

- 监听指定路径、多个路径或全部状态变化
- 使用通配符（`*` / `**`）进行模式匹配
- 过滤操作类型（读/写/删除等）
- 一次性监听或持续监听
- 控制监听深度（自身/一级后代/全部后代）

## 快速入门

```ts
import { AutoStore } from "autostore";

const store = new AutoStore({
    user: {
        name: "张三",
        age: 25,
    },
    order: {
        price: 100,
        count: 2,
    },
});

// 监听单个路径
const watcher = store.watch("user.name", ({ value, oldValue }) => {
    console.log(`姓名从 ${oldValue} 变为 ${value}`);
});

store.state.user.name = "李四"; // 触发回调: 姓名从 张三 变为 李四

// 取消监听
watcher.off();
```

## 指南

### API 签名

```ts
// 监听全部状态变化
store.watch(listener: WatchListener, options?: WatchListenerOptions): Watcher

// 监听指定路径
store.watch(
    paths: string | string[],
    listener: WatchListener,
    options?: WatchListenerOptions
): Watcher
```

**参数说明：**

| 参数 | 类型 | 说明 |
| :---: | :---: | :--- |
| `paths` | `string \| string[]` | 要监听的路径，支持单个路径或路径数组 |
| `listener` | `WatchListener` | 状态变化时的回调函数 |
| `options` | `WatchListenerOptions` | 可选配置项 |

**返回值：** `Watcher` 对象，提供 `off()` 方法取消监听。

### 回调参数

监听回调接收一个 `StateOperate` 对象：

```ts
type StateOperate = {
    type: "get" | "set" | "delete" | "insert" | "update" | "remove" | "batch";
    path: string[];           // 发生变化的路径
    value: any;               // 新值
    oldValue?: any;           // 旧值
    parentPath?: string[];    // 父路径
    parent?: any;             // 父对象
    indexs?: number[];        // 数组操作时的索引
};
```

### 监听所有变化

不传路径或传 `*` / `**` 将监听整个状态树的所有变化：

```ts
// 方式一：直接传回调函数
const watcher = store.watch((operate) => {
    console.log(`${operate.type}: ${operate.path.join(".")}`);
});

// 方式二：传 *
store.watch("*", (operate) => {
    console.log(operate);
});
```

### 监听指定路径

监听特定路径的变化：

```ts
// 监听单个路径
store.watch("user.name", ({ value, oldValue }) => {
    console.log(`user.name 变化: ${oldValue} -> ${value}`);
});

// 监听嵌套路径
store.watch("order.price", ({ value }) => {
    console.log(`价格变为: ${value}`);
});
```

### 监听多个路径

传入路径数组，同时监听多个路径：

```ts
store.watch(
    ["user.name", "user.age", "order.price"],
    (operate) => {
        console.log(`${operate.path.join(".")} 发生变化`);
    }
);
```

### 通配符匹配

支持两种通配符进行模式匹配：

```ts
// * 匹配单层子路径
store.watch("order.*", (operate) => {
    // 监听 order 下所有直接子属性变化
    // 例如: order.price, order.count
    console.log(operate.path.join("."));
});

// ** 匹配所有后代路径
store.watch("order.**", (operate) => {
    // 监听 order 及其所有后代变化
    // 例如: order.price, order.address.city
    console.log(operate.path.join("."));
});
```

**通配符区别：**

| 通配符 | 匹配范围 | 示例 |
| :---: | :--- | :--- |
| `*` | 仅直接子级 | `order.*` 匹配 `order.price`，不匹配 `order.address.city` |
| `**` | 所有后代 | `order.**` 匹配 `order.price` 和 `order.address.city` |

### depth 选项

`depth` 选项控制向后代钻取的监听深度，提供三档语义：

```ts
store.watch("order", callback, { depth: 1 });
```

| depth 值 | 行为 | 说明 |
| :---: | :--- | :--- |
| `0`（默认） | 仅监听自身 | 只有 `order` 被整体重新赋值时触发 |
| `1` | 自身 + 一级后代 | `order` 和 `order.price` 变化都触发，但 `order.address.city` 不触发 |
| `≥2` | 自身 + 全部后代 | 等价于使用 `order.**` 通配符 |

```ts
// depth: 0 - 默认，仅监听自身赋值
store.watch("order", (op) => {
    console.log(op.path); // 只在 order 被整体替换时触发
});

// depth: 1 - 监听自身和一级子属性
store.watch("order", (op) => {
    console.log(op.path); // order.price 变化也会触发
}, { depth: 1 });

// depth: 2 - 监听自身和所有后代
store.watch("order", (op) => {
    console.log(op.path); // order.address.city 变化也会触发
}, { depth: 2 });
```

:::warning 注意
- `depth: 3` 等价于 `depth: 2`（三档语义，非连续深度）
- `once: true` 时 `depth` 无效，静默降级为 `0`
- 使用 `**` 通配符时 `depth` 被忽略
:::

### once 一次性监听

设置 `once: true`，回调触发一次后自动移除：

```ts
store.watch(
    "user.name",
    ({ value }) => {
        console.log(`首次变化: ${value}`);
        // 回调执行一次后自动取消
    },
    { once: true }
);
```

### 操作类型过滤

通过 `operates` 选项过滤监听的操作类型：

```ts
// 仅监听写操作（set/update）
store.watch("user.name", callback, { operates: "write" });

// 仅监听读操作
store.watch("user.name", callback, { operates: "read" });

// 监听所有操作
store.watch("user.name", callback, { operates: "*" });

// 监听指定操作类型数组
store.watch("user.name", callback, {
    operates: ["set", "delete"]
});
```

**操作类型说明：**

| 类型 | 说明 |
| :---: | :--- |
| `get` | 读取操作 |
| `set` | 设置操作（对象属性赋值） |
| `delete` | 删除操作 |
| `insert` | 数组插入操作 |
| `update` | 数组更新操作 |
| `remove` | 数组删除操作 |
| `batch` | 批量操作 |

**便捷过滤值：**

| 值 | 等价于 |
| :---: | :--- |
| `"read"` | `["get"]` |
| `"write"` | `["set", "delete", "insert", "update", "remove"]` |
| `"*"` | 所有类型 |

### filter 过滤器

使用 `filter` 函数进行更精细的过滤：

```ts
store.watch(
    (operate) => {
        console.log("变化:", operate);
    },
    {
        // 自定义过滤器：只监听 value 属性的变化
        filter: (operate) => {
            const lastPath = operate.path[operate.path.length - 1];
            return lastPath === "value";
        }
    }
);
```

### 取消监听

通过 `watcher.off()` 取消监听：

```ts
const watcher = store.watch("user.name", callback);

// 取消监听
watcher.off();
```

对于多个路径的监听，`off()` 会取消所有路径的监听：

```ts
const watcher = store.watch(
    ["user.name", "order.price"],
    callback
);

watcher.off(); // 同时取消两个路径的监听
```

### 批量更新

在 `batchUpdate` 中进行多次状态修改，只会触发一次监听回调：

```ts
const events = [];
store.watch("user.*", (op) => events.push(op));

store.batchUpdate((state) => {
    state.user.name = "张三";
    state.user.age = 25;
});

// events 只包含批量操作的事件
```

## 完整示例

### 表单验证监听

```ts
import { AutoStore } from "autostore";

const store = new AutoStore({
    form: {
        username: "",
        email: "",
        password: "",
    },
    validation: {
        username: true,
        email: true,
        password: true,
    },
    isValid: true,
});

// 监听所有验证状态变化，更新整体验证结果
store.watch(
    (operate) => {
        // 当 validation 下任一字段变化时，重新计算整体验证状态
        store.state.isValid =
            store.state.validation.username &&
            store.state.validation.email &&
            store.state.validation.password;
    },
    {
        filter: (op) => op.path[0] === "validation",
    }
);
```

### 实时日志记录

```ts
const store = new AutoStore({
    logs: [] as string[],
    counter: 0,
});

// 记录所有状态变化日志
store.watch("*", (operate) => {
    const timestamp = new Date().toISOString();
    const path = operate.path.join(".");
    const log = `[${timestamp}] ${operate.type}: ${path}`;

    store.state.logs.push(log);
});
```

### 深度监听对象替换

```ts
const store = new AutoStore({
    user: {
        name: "张三",
        address: {
            city: "北京",
            street: "朝阳路",
        },
    },
});

// 使用 depth 监听嵌套对象变化
store.watch(
    "user",
    (operate) => {
        console.log(`用户信息变化: ${operate.path.join(".")}`);
        console.log(`新值:`, operate.value);
    },
    { depth: 2 }
);

// 以下操作都会触发回调
store.state.user.name = "李四";
store.state.user.address.city = "上海";
```
