# asyncpro

增强型异步计算属性插件，提供超时控制、重试机制、进度条、取消计算、重入控制等高级特性。

## 概述

`asyncpro` 插件扩展了 `AutoStore` 的异步计算能力，通过 `asyncComputed` 函数声明增强型异步计算属性。相比基础的 `computed` 声明方式，增强型异步计算属性提供了更丰富的状态管理和控制能力。

:::warning 提示
`asyncpro` 插件需要从 `@autostorejs/plugins/asyncpro` 单独导入。
:::

## 安装与使用

```ts
import { asyncComputed } from "@autostorejs/plugins/asyncpro";
```

## 基本用法

```ts
import { AutoStore } from "autostore";
import { asyncComputed } from "@autostorejs/plugins/asyncpro";

const store = new AutoStore({
    user: {
        firstName: "张",
        lastName: "三",
        fullName: asyncComputed(
            async (scope) => {
                // 模拟异步操作
                await new Promise((resolve) => setTimeout(resolve, 100));
                return scope.firstName + scope.lastName;
            },
            ["./firstName", "./lastName"],
        ),
    },
});

// 访问异步计算结果
console.log(store.state.user.fullName.value); // "张三"
console.log(store.state.user.fullName.loading); // false
```

## AsyncComputedValue 对象

使用 `asyncComputed` 声明的计算属性会被替换为 `AsyncComputedValue` 对象，包含以下属性：

| 属性 | 类型 | 说明 |
| :---: | :---: | :--- |
| `value` | `T` | 计算结果 |
| `loading` | `boolean` | 是否正在计算中 |
| `error` | `string \| null` | 错误信息 |
| `timeout` | `number` | 倒计时剩余时间（ms） |
| `retry` | `number` | 剩余重试次数 |
| `progress` | `number` | 计算进度（0-100） |
| `run` | `(options?) => void` | 手动触发计算 |
| `cancel` | `() => void` | 取消正在进行的计算 |

## 计算函数参数

`asyncComputed` 的计算函数接收两个参数：

```ts
async (scope, args) => {
    // scope: 作用域对象，包含依赖的状态数据
    // args: 控制参数
    return result;
};
```

**args 参数说明：**

| 参数 | 类型 | 说明 |
| :---: | :---: | :--- |
| `abortSignal` | `AbortSignal` | 用于取消异步计算的信号 |
| `cancel` | `() => void` | 取消计算函数 |
| `getProgressbar` | `(opts?) => Progressbar` | 获取进度条控制对象 |
| `onTimeout` | `(cb) => void` | 注册超时回调 |
| `getSnap` | `(scope) => object` | 获取快照数据 |
| `extras` | `any` | 额外参数 |
| `operate` | `StateOperate` | 变化的依赖信息 |
| `first` | `boolean` | 是否是首次运行 |

## 高级特性

### 超时控制

设置计算函数的执行超时时间，超时后自动设置 `loading=false` 并记录错误。

```ts
const store = new AutoStore({
    data: {
        result: asyncComputed(
            async (scope) => {
                await fetch("/api/data");
            },
            ["./url"],
            {
                timeout: 5000, // 5秒超时
            },
        ),
    },
});
```

**超时配置选项：**

```ts
// 简单超时
timeout: 5000

// 超时 + 倒计时（每1000ms更新一次，共60次）
timeout: [60 * 1000, 60]
```

**倒计时示例：**

```ts
const store = new AutoStore({
    order: {
        price: 100,
        total: asyncComputed(
            async (scope, { onTimeout }) => {
                // 模拟耗时操作
                await new Promise((resolve) => setTimeout(resolve, 60000));
                return scope.price;
            },
            ["./price"],
            {
                timeout: [60 * 1000, 60], // 60秒倒计时
            },
        ),
    },
});

// 通过 watch 监听倒计时
store.watch("order.total.timeout", (op) => {
    console.log(`剩余时间: ${op.value}秒`);
});
```

### 重试机制

当计算函数执行出错时，自动重试指定次数。

```ts
const store = new AutoStore({
    data: {
        result: asyncComputed(
            async (scope) => {
                const response = await fetch("/api/data");
                if (!response.ok) throw new Error("请求失败");
                return response.json();
            },
            ["./url"],
            {
                retry: 3, // 最多重试3次
            },
        ),
    },
});
```

**重试配置选项：**

```ts
// 简单重试（重试3次，间隔0ms）
retry: 3

// 重试 + 间隔（重试3次，每次间隔1000ms）
retry: [3, 1000]
```

**重试过程说明：**

- 重试次数为 `N` 时，实际执行 `N+1` 次（首次 + N次重试）
- 每次重试前会更新 `retry` 属性为剩余次数
- 重试完成后 `retry` 归零

### 进度条

在计算函数中控制进度显示。

```ts
const store = new AutoStore({
    download: {
        progress: asyncComputed(
            async (scope, { getProgressbar }) => {
                const pbar = getProgressbar({ min: 0, max: 100 });
                
                for (let i = 0; i <= 100; i += 10) {
                    await new Promise((r) => setTimeout(r, 100));
                    pbar.value(i);
                }
                
                pbar.end();
                return "下载完成";
            },
            [],
        ),
    },
});

// 监听进度
store.watch("download.progress.progress", (op) => {
    console.log(`下载进度: ${op.value}%`);
});
```

**进度条 API：**

```ts
const pbar = getProgressbar({ min: 0, max: 100, value: 0 });

pbar.value(50); // 设置进度值
pbar.end();     // 结束进度条（设置为 max）
```

### 取消计算

通过 `AbortController` 取消正在进行的异步计算。

```ts
const store = new AutoStore({
    request: {
        data: asyncComputed(
            async (scope, { abortSignal }) => {
                const response = await fetch("/api/data", {
                    signal: abortSignal, // 传递 abort 信号
                });
                return response.json();
            },
            ["./url"],
            {
                abortController: () => new AbortController(),
            },
        ),
    },
});

// 取消计算
store.state.request.data.cancel();
```

**自定义 AbortController：**

```ts
asyncComputed(
    async (scope, { abortSignal }) => {
        // abortSignal 会在取消时触发
        await fetch("/api/data", { signal: abortSignal });
    },
    ["./url"],
    {
        abortController: () => new AbortController(),
    }
)
```

### 重入控制

控制当依赖变化时是否允许重新进入计算。

```ts
const store = new AutoStore({
    search: {
        keyword: "",
        result: asyncComputed(
            async (scope) => {
                await new Promise((r) => setTimeout(r, 1000));
                return search(scope.keyword);
            },
            ["./keyword"],
            {
                reentry: false, // 禁止重入
            },
        ),
    },
});

// 快速修改 keyword，只会执行一次计算
store.state.search.keyword = "a";
store.state.search.keyword = "ab";
store.state.search.keyword = "abc";
// 只有最后一次修改会触发计算
```

### 错误处理

通过 `onError` 回调处理计算错误。

```ts
const store = new AutoStore({
    data: {
        result: asyncComputed(
            async (scope) => {
                throw new Error("计算失败");
            },
            [],
            {
                onError: (error) => {
                    console.error("计算错误:", error);
                    return "默认值"; // 返回错误时的默认值
                },
            },
        ),
    },
});
```

### 完成回调

通过 `onDone` 回调监听计算完成事件。

```ts
const store = new AutoStore({
    data: {
        result: asyncComputed(
            async (scope) => {
                return fetchData();
            },
            [],
            {
                onDone: ({ value, error, abort, timeout }) => {
                    if (error) {
                        console.error("计算失败:", error);
                    } else if (abort) {
                        console.log("计算被取消");
                    } else if (timeout) {
                        console.log("计算超时");
                    } else {
                        console.log("计算完成:", value);
                    }
                },
            },
        ),
    },
});
```

### 初始值

设置异步计算的初始值。

```ts
const store = new AutoStore({
    data: {
        result: asyncComputed(
            async (scope) => {
                return fetchData();
            },
            [],
            {
                initial: "加载中...", // 初始值
            },
        ),
    },
});

console.log(store.state.data.result.value); // "加载中..."
```

### 首次执行控制

控制是否在创建时立即执行计算。

```ts
// auto: 根据 initial 自动决定（默认）
// true: 立即执行
// false: 仅在依赖变化时执行

asyncComputed(
    async (scope) => { /* ... */ },
    ["./data"],
    { immediate: false }
)
```

### 额外参数

通过 `extras` 为计算函数提供额外参数。

```ts
const store = new AutoStore({
    data: {
        result: asyncComputed(
            async (scope, { extras }) => {
                console.log(extras); // 100
                return fetchData(extras);
            },
            [],
            { extras: 100 }
        ),
    },
});

// 手动运行时传入额外参数
store.state.data.result.run({ extras: 200 });
```

## 完整示例

### 数据加载

```ts
import { AutoStore } from "autostore";
import { asyncComputed } from "@autostorejs/plugins/asyncpro";

const store = new AutoStore({
    userId: 1,
    user: asyncComputed(
        async (scope, { abortSignal, getProgressbar }) => {
            const pbar = getProgressbar({ max: 100 });
            
            pbar.value(30);
            const response = await fetch(`/api/users/${scope.userId}`, {
                signal: abortSignal,
            });
            
            pbar.value(70);
            const data = await response.json();
            
            pbar.value(100);
            return data;
        },
        ["./userId"],
        {
            initial: null,
            timeout: 10000,
            retry: [2, 1000],
            onError: (error) => {
                console.error("加载用户失败:", error);
                return null;
            },
        }
    ),
});

// 监听加载状态
store.watch("user.user", (op) => {
    const { loading, error, value } = op.value;
    if (loading) {
        console.log("加载中...");
    } else if (error) {
        console.error("错误:", error);
    } else {
        console.log("用户数据:", value);
    }
});
```

## 与基础 computed 的区别

| 特性 | computed | asyncComputed |
| :---: | :---: | :---: |
| 加载状态 | 需通过 reports 配置 | 内置 |
| 超时控制 | 不支持 | 支持 |
| 重试机制 | 不支持 | 支持 |
| 进度条 | 不支持 | 支持 |
| 取消计算 | 不支持 | 支持 |
| 重入控制 | 不支持 | 支持 |
| 错误处理 | 通过 onError | 通过 onError |
| 值类型 | 直接返回值 | AsyncComputedValue 对象 |

## 注意事项

1. **依赖声明**：异步计算属性**必须显式指定依赖**，无法自动收集
2. **依赖路径**：当依赖其他异步计算属性时，需使用 `./xxx.value` 格式
3. **类型安全**：建议配合 TypeScript 使用以获得完整的类型推导
4. **性能**：避免在计算函数中执行过于频繁的操作
5. **内存**：组件销毁时会自动取消正在进行的异步计算
