# 创建 Store

`AutoStore` 是 AutoStore 的核心类,所有的功能都是基于 `AutoStore` 实例来实现的。

## 基本用法

### 创建实例

```ts
import { AutoStore } from "autostore";

const store = new AutoStore(
    {
        price: 100,
        count: 2,
        total: (scope) => {
            return scope.price * scope.count;
        },
    },
    {
        // 配置参数
    },
);
```

### 访问和修改状态

创建好 `store` 对象后,可以通过 `store.state` 对象来访问和修改状态数据。

```ts
// 访问状态数据
console.log(store.state.price); // 100
console.log(store.state.total); // 200

// 修改状态数据
store.state.price = 200; // 会触发 total 的重新计算
console.log(store.state.total); // 400

// 监听状态数据变化
store.watch("count", ({ value, oldValue }) => {
    console.log(`count 从 ${oldValue} 变为 ${value}`);
});
```

## 状态定义

### 普通状态

```ts
const store = new AutoStore({
    name: "AutoStore",
    version: "1.0.0",
    author: {
        name: "John",
        email: "john@example.com",
    },
    tags: ["reactive", "state-management"],
});
```

### 同步计算属性

使用函数定义计算属性,函数接收 `scope` 参数用于访问依赖的状态:

```ts
const store = new AutoStore({
    firstName: "zhang",
    lastName: "san",
    // 同步计算属性
    fullName: (scope) => scope.firstName + " " + scope.lastName,
    // 同步计算属性
    fullName: computed((scope) => scope.firstName + " " + scope.lastName, {
        // 提供额外的计算参数
    }),
});
```

### 异步计算属性

使用 `computed` 和`asyncComputed` 函数创建异步计算属性:

```ts
import { computed } from "autostore";

const store = new AutoStore({
    userId: 1,
    user: computed(
        async (scope) => {
            await delay();
            return "autostore";
        },
        ["userId"],
        {
            initial: null, // 初始值
            timeout: 5000, // 超时时间
        },
    ),
});
```

也可以使用`asyncComputed` 函数创建增强异步计算属性:

```ts
import { asyncComputed } from "autostore";

const store = new AutoStore({
    userId: 1,
    user: asyncComputed(
        async (scope) => {
            await delay();
            return "autostore";
        },
        ["userId"],
        {
            initial: null, // 初始值
            timeout: 5000, // 超时时间
        },
    ),
});
```

使用`computed`和`asyncComputed`创建异步计算属性的差别在于：

- 使用`computed`时
  计算结果原地直接写入，即上例中`store.state.user==='autostore'`
- 使用`asyncComputed`时
  创建的是增强型的异步计算属性,支持对异步计算进行超时、倒计时、进度、重试、可中止等功能，可以对异步过程进行更多的控制，计算结果原地写入的是`AsyncComputedValue`，即上例：

```ts
store.state.user === {
    loading: false;
    progress: 0; // 进度值
    timeout: 0; // 超时时间，单位ms，当启用超时时进行倒计时
    error: null;
    retry: 0; // 重试次数，当执行重试操作时，会进行倒计时
    value: "autostore"; // 计算结果保存到此处
    run: (options?: RuntimeComputedOptions) => void; // 重新执行任务
    cancel: () => void; // 中止正在执行的异步计算
};
```
