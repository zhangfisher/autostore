# 插件系统

AutoStore 提供了灵活的插件系统，允许扩展 Store 的功能。插件可以为 Store 添加新的方法、监听器、计算属性类型等能力。

## 概述

AutoStore 的插件系统基于简单的函数注入模式：

- 插件是一个接收 `store` 实例作为参数的函数
- 插件可以修改 `store` 实例，添加新的属性或方法
- 插件通过 `installPlugin` 注册到全局，可在创建 Store 时自动加载

```ts
// 插件类型定义
type IAutoStorePlugin = (store: AnyAutoStore) => void;
```

## 内置插件

`@autostorejs/plugins` 包提供了以下内置插件：

| 插件 | 说明 | 导入路径 |
| :---: | :--- | :--- |
| `shadow` | 影子 Store，基于原 Store 派生计算视图 | `@autostorejs/plugins/shadow` |
| `asyncpro` | 增强型异步计算属性 | `@autostorejs/plugins/asyncpro` |
| `createComputed` | 动态创建计算属性 | `@autostorejs/plugins/createComputed` |
| `manualComputed` | 手动执行计算函数（分组/条件执行） | `@autostorejs/plugins/manualComputed` |
| `trace` | 状态操作跟踪调试 | `@autostorejs/plugins/trace` |
| `cascadeDestroy` | 级联销毁观察对象 | `@autostorejs/plugins` |
| `cycleDetect` | 循环依赖检测 | `@autostorejs/plugins/cycleDetect` |

## 引入方式

### 按需引入（推荐）

```ts
// 引入单个插件
import { shadow } from "@autostorejs/plugins/shadow";
import { asyncComputed } from "@autostorejs/plugins/asyncpro";
import { trace } from "@autostorejs/plugins/trace";
```

### 全量引入

```ts
// 引入所有插件
import { shadow, asyncComputed, trace } from "@autostorejs/plugins";
```

### 自动加载

插件通过 `installPlugin` 注册后，会在创建 AutoStore 实例时自动加载：

```ts
import { AutoStore } from "autostore";
// 插件会自动生效，无需手动安装
const store = new AutoStore({ /* ... */ });
```

## 使用示例

### shadow 插件

创建影子 Store，在不污染原 Store 的前提下派生额外的计算视图：

```ts
import { AutoStore, computed } from "autostore";
import { shadow } from "@autostorejs/plugins/shadow";

const store = new AutoStore({
    price: 10,
    count: 3,
});

// shadow 插件为 store 添加了 shadow 方法
const shadowStore = store.shadow({
    total: computed((scope) => scope.price * scope.count),
});

console.log(shadowStore.state.total); // 30

store.state.count = 4;
console.log(shadowStore.state.total); // 40
```

### asyncpro 插件

使用增强型异步计算属性，支持超时、重试、进度条等高级特性：

```ts
import { AutoStore } from "autostore";
import { asyncComputed } from "@autostorejs/plugins/asyncpro";

const store = new AutoStore({
    user: {
        firstName: "张",
        lastName: "三",
        fullName: asyncComputed(
            async (scope, { getProgressbar, abortSignal }) => {
                const pbar = getProgressbar({ max: 100 });
                pbar.value(50);
                
                const response = await fetch("/api/user", {
                    signal: abortSignal,
                });
                
                pbar.end();
                return response.json();
            },
            ["./firstName", "./lastName"],
            {
                timeout: 5000,
                retry: [3, 1000],
            }
        ),
    },
});
```

### trace 插件

跟踪调试状态操作：

```ts
import { AutoStore } from "autostore";
import { trace } from "@autostorejs/plugins/trace";

const store = new AutoStore({
    a: 1,
    b: 2,
    c: (scope) => scope.a + scope.b,
});

// 使用 trace 跟踪操作
const tracker = store.trace(() => {
    store.state.a = 10;
    store.state.b = 20;
});

const operates = await tracker.start();
console.log(operates); // [{ type: 'set', path: ['a'], ... }, ...]
```

### cascadeDestroy 插件

自动销毁失效的观察对象：

```ts
import { AutoStore, computed } from "autostore";

// cascadeDestroy 默认开启
const store = new AutoStore({
    user: {
        name: "张三",
    },
    greeting: computed((scope) => `你好，${scope.user.name}`),
});

// 删除 user 时，greeting 会被自动销毁
delete store.state.user;
```

## 开发自定义插件

### 插件结构

一个 AutoStore 插件是一个简单的函数，接收 `store` 实例作为参数：

```ts
import type { AnyAutoStore, Dict } from "autostore";
import { installPlugin } from "@autostorejs/plugins";

/**
 * 自定义插件
 */
function myPlugin(store: AnyAutoStore) {
    // 1. 为 store 添加新方法
    store.myMethod = function () {
        console.log("myMethod called");
    };

    // 2. 监听状态变化
    const watcher = store.watch("**", (operate) => {
        console.log("State changed:", operate);
    });

    // 3. 清理资源
    store.once("unload", () => {
        watcher.off();
    });
}

// 注册插件到全局
installPlugin(myPlugin);

// 扩展 AutoStore 类型
declare module "autostore" {
    interface AutoStore<State extends Dict, Options = unknown> {
        myMethod: () => void;
    }
}
```

### 插件开发步骤

#### 1. 创建插件函数

```ts
import type { AnyAutoStore, Dict } from "autostore";

export function myPlugin(store: AnyAutoStore) {
    // 插件逻辑
}
```

#### 2. 扩展 Store 类型

使用 TypeScript 模块扩展为 Store 添加类型：

```ts
declare module "autostore" {
    interface AutoStore<State extends Dict, Options = unknown> {
        // 添加新方法
        myMethod: () => void;
        
        // 添加新属性
        myProperty: string;
    }
}
```

#### 3. 注册插件

使用 `installPlugin` 将插件注册到全局：

```ts
import { installPlugin } from "@autostorejs/plugins";

installPlugin(myPlugin);
```

#### 4. 导出插件

```ts
// src/myPlugin.ts
export { myPlugin } from "./myPlugin";
```

### 插件模式

#### 模式一：扩展 Store 方法

为 Store 添加新的实例方法：

```ts
export function formatDate(store: AnyAutoStore) {
    store.formatDate = function (date: Date) {
        return date.toLocaleDateString();
    };
}

declare module "autostore" {
    interface AutoStore<State extends Dict, Options = unknown> {
        formatDate: (date: Date) => string;
    }
}
```

#### 模式二：注册新的观察者类型

为 Store 添加新的观察者类型（如计算属性、监听器）：

```ts
import { AutoStore } from "autostore";

export function myObserverType(store: AnyAutoStore) {
    const observers = (store.constructor as typeof AutoStore).observers;
    
    observers["myType"] = (
        store: AnyAutoStore,
        descriptor: AnyObserverDescriptor,
        context?: ObserverContext,
    ) => {
        // 创建自定义观察者对象
        const observerObj = new MyObserverObject(store, descriptor, context);
        store.computedObjects.set(observerObj.id, observerObj);
        return observerObj;
    };
}
```

#### 模式三：监听 Store 事件

监听 Store 的生命周期事件：

```ts
export function myPlugin(store: AnyAutoStore) {
    // 监听 Store 创建完成
    store.once("created", () => {
        console.log("Store created");
    });

    // 监听状态变化
    store.on("change", (operate) => {
        console.log("State changed:", operate);
    });

    // 监听 Store 销毁
    store.once("unload", () => {
        console.log("Store destroyed");
    });
}
```

#### 模式四：添加 Sandbox 变量

为计算函数提供额外的上下文变量：

```ts
export function myPlugin(store: AnyAutoStore) {
    if (!store.options.sandbox) store.options.sandbox = {};
    if (!store.options.sandbox.context) store.options.sandbox.context = {};
    
    // 添加自定义变量到 sandbox
    store.options.sandbox.context.myHelper = {
        format: (value: any) => `formatted: ${value}`,
    };
}

// 在计算函数中使用
const store = new AutoStore({
    result: computed((scope, { extras }) => {
        const { myHelper } = extras;
        return myHelper.format(scope.data);
    }),
});
```

### 完整插件示例

以下是一个完整的日志插件示例：

```ts
import type { AnyAutoStore, Dict, StateOperate } from "autostore";
import { installPlugin } from "@autostorejs/plugins";

interface LogOptions {
    level?: "info" | "warn" | "error";
    filter?: (operate: StateOperate) => boolean;
}

/**
 * 日志插件
 * 记录所有状态操作
 */
export function log(store: AnyAutoStore, options: LogOptions = {}) {
    const { level = "info", filter } = options;

    // 监听所有状态变化
    const watcher = store.watch("**", (operate) => {
        // 应用过滤器
        if (filter && !filter(operate)) return;

        const path = operate.path.join(".");
        const message = `[${operate.type}] ${path}`;

        switch (level) {
            case "info":
                console.log(message, operate);
                break;
            case "warn":
                console.warn(message, operate);
                break;
            case "error":
                console.error(message, operate);
                break;
        }
    });

    // 清理资源
    store.once("unload", () => {
        watcher.off();
    });
}

// 注册插件
installPlugin(log);

// 扩展类型
declare module "autostore" {
    interface AutoStoreOptions<State extends Dict, Options = unknown> {
        log?: LogOptions;
    }
}

// 使用
const store = new AutoStore(
    { a: 1, b: 2 },
    { log: { level: "warn" } }
);
```

## 注意事项

### 1. 插件加载顺序

- 插件在创建 Store 实例时自动加载
- 多个插件的加载顺序取决于导入顺序
- 确保插件之间没有循环依赖

### 2. 类型安全

- 使用 `declare module "autostore"` 扩展类型时，确保类型正确定义
- 避免使用 `any` 类型，尽量提供精确的类型定义

### 3. 资源清理

- 在插件中注册的监听器、定时器等资源，需要在 `unload` 事件中清理
- 避免内存泄漏

```ts
export function myPlugin(store: AnyAutoStore) {
    const watcher = store.watch("**", callback);
    const timer = setInterval(() => { /* ... */ }, 1000);

    // 清理资源
    store.once("unload", () => {
        watcher.off();
        clearInterval(timer);
    });
}
```

### 4. 全局状态

- 插件通过 `installPlugin` 注册到全局 `__AUTOSTORE_PLUGINS__`
- 同一个插件不要重复注册
- 插件函数应该是无状态的，避免使用全局变量

### 5. 与 Store 选项的交互

- 插件可以通过 `store.options` 访问 Store 配置
- 可以在 `store.options.sandbox.context` 中添加自定义变量
- 避免修改已有的 Store 选项

### 6. 异步操作

- 插件中的异步操作需要正确处理错误
- 使用 `store.once("unload")` 清理异步资源
- 避免在插件中执行耗时的同步操作

### 7. 测试

- 为插件编写单元测试
- 测试插件的安装、卸载、资源清理
- 测试与 Store 的交互

```ts
import { describe, it, expect } from "bun:test";
import { AutoStore } from "autostore";
import { myPlugin } from "../src/myPlugin";

describe("myPlugin", () => {
    it("应该正确安装插件", () => {
        const store = new AutoStore({ a: 1 });
        expect(store.myMethod).toBeDefined();
    });

    it("应该正确清理资源", () => {
        const store = new AutoStore({ a: 1 });
        store.destroy();
        // 验证资源已清理
    });
});
```

## 插件开发最佳实践

1. **单一职责**：每个插件只负责一个功能
2. **最小依赖**：尽量减少对外部依赖
3. **类型完整**：提供完整的 TypeScript 类型定义
4. **文档清晰**：提供清晰的使用文档和示例
5. **向后兼容**：更新插件时保持向后兼容
6. **性能优化**：避免在插件中执行耗时操作
7. **错误处理**：妥善处理各种错误情况
