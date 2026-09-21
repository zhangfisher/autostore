# manualComputed

运行计算函数插件，为 `computedObjects` 添加 `run`、`runGroup`、`enableGroup` 方法，支持按分组或条件手动执行计算函数。

## 基本用法

```ts
import { AutoStore, computed } from "autostore";
import "@autostorejs/plugins/manualComputed";

const store = new AutoStore({
    price: 2,
    count: 3,
    total: computed(
        async (scope) => scope.price * scope.count,
        ["price", "count"],
        { group: "calc" }
    ),
});

// 手动执行指定分组的计算函数
await store.computedObjects.runGroup("calc");
```

## 特性

- 按分组（`group`）批量执行计算函数
- 按自定义过滤条件执行计算函数
- 按 `id` 执行指定的计算函数
- 支持等待所有计算完成（`wait: true`）
- 支持超时控制（`timeout`）
- 启用/禁用指定分组的计算

## API

### `computedObjects.run()`

执行所有计算函数。

```ts
await store.computedObjects.run();
```

### `computedObjects.run(filter, runArgs?, options?)`

按过滤条件执行满足条件的计算函数。

```ts
// 按 id 执行
await store.computedObjects.run("total");

// 按自定义条件执行
await store.computedObjects.run(
    (obj) => obj.group === "calc",
    {},  // runArgs
    { wait: true, timeout: 5000 }
);
```

### `computedObjects.runGroup(group, runArgs?, options?)`

执行指定分组的所有计算函数。

```ts
await store.computedObjects.runGroup("calc");

// 等待完成，设置超时
await store.computedObjects.runGroup("calc", {}, { wait: true, timeout: 3000 });
```

### `computedObjects.enableGroup(group, value)`

启用或禁用指定分组的计算。

```ts
// 禁用 "calc" 分组
store.computedObjects.enableGroup("calc", false);

// 启用 "calc" 分组
store.computedObjects.enableGroup("calc", true);
```

## 参数说明

### `runArgs`

传递给计算函数 `run` 方法的参数：

```ts
await store.computedObjects.run("total", {
    first: true,        // 仅当第一次运行时为 true
    onDone: ({ id }) => {
        console.log(`${id} 完成`);
    },
});
```

### `options`

| 属性 | 类型 | 默认值 | 说明 |
|:---:|:---:|:---:|:---|
| `wait` | `boolean` | `false` | 是否等待所有计算完成 |
| `timeout` | `number` | `0` | 超时时间（毫秒），0 表示不限时 |

## 分组执行

计算属性可以通过 `group` 选项进行分组，然后按组批量执行：

```ts
import { AutoStore, computed } from "autostore";
import "@autostorejs/plugins/manualComputed";

const store = new AutoStore({
    price: 2,
    count: 3,
    total1: computed(
        async (scope) => scope.price * scope.count,
        ["price", "count"],
        { group: "a" }
    ),
    total2: computed(
        async (scope) => scope.price * scope.count,
        ["price", "count"],
        { group: "a" }
    ),
    total3: computed(
        async (scope) => scope.price * scope.count,
        ["price", "count"],
        { group: "b" }
    ),
});

// 只执行 "a" 分组的计算
await store.computedObjects.runGroup("a");

// 禁用 "b" 分组
store.computedObjects.enableGroup("b", false);
```

## 等待与超时

使用 `wait: true` 等待所有计算完成：

```ts
await store.computedObjects.runGroup("calc", {}, {
    wait: true,
    timeout: 5000,  // 5秒超时
});
```

超时后会抛出 `TimeoutError`：

```ts
try {
    await store.computedObjects.runGroup("slow", {}, {
        wait: true,
        timeout: 1000,
    });
} catch (e) {
    if (e instanceof TimeoutError) {
        console.error("计算超时");
    }
}
```

## 完整示例

```ts
import { AutoStore, computed } from "autostore";
import "@autostorejs/plugins/manualComputed";

const store = new AutoStore(
    {
        price: 2,
        count: 3,
        total1: computed(
            async (scope) => {
                await new Promise((r) => setTimeout(r, 100));
                return scope.price * scope.count;
            },
            ["price", "count"],
            { id: "t1", group: "primary", initial: 0 }
        ),
        total2: computed(
            async (scope) => {
                await new Promise((r) => setTimeout(r, 200));
                return scope.price * scope.count;
            },
            ["price", "count"],
            { id: "t2", group: "primary", initial: 0 }
        ),
        total3: computed(
            async (scope) => scope.price * scope.count,
            ["price", "count"],
            { id: "t3", group: "secondary", initial: 0 }
        ),
    },
    {
        onObserverDone: ({ observer }) => {
            console.log(`${observer.id} 完成: ${observer.value}`);
        },
    }
);

// 执行所有计算
await store.computedObjects.run();

// 或者只执行 "primary" 分组
await store.computedObjects.runGroup("primary", {}, { wait: true });

// 按 id 执行
await store.computedObjects.run("t1");

// 按条件执行
await store.computedObjects.run(
    (obj) => obj.group === "secondary"
);
```
