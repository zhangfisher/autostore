# cascadeDestroy

级联销毁观察对象特性，当状态树中的路径被删除时，自动销毁依赖该路径的计算属性（computed）和监听器（watch），避免"死对象"持续占用资源。

## 概述

在 AutoStore 中，计算属性和监听器会订阅特定的状态路径。当这些路径被删除时，对应的观察对象就变成了永远不会再次执行的"死对象"。`cascadeDestroy` 插件通过监听全局 `delete` 操作，自动检测并销毁这些失效的观察对象。

:::warning 提示
`cascadeDestroy` 默认开启，无需手动配置。如需禁用，可在创建 Store 时设置 `cascadeDestroy: false`。
:::

## 工作原理

1. **全局监听**：在 AutoStore 构造时注册全局 delete 监听器（唯一）
2. **路径匹配**：当删除操作发生时，检查被删除路径是否命中观察对象的挂载路径或依赖路径
3. **批量处理**：同一 tick 内的多个 delete 操作合并为一次遍历，避免重复扫描
4. **异步销毁**：通过 `setTimeout` 异步执行销毁操作，确保性能最优

## 触发条件

当以下任一条件满足时，观察对象会被自动销毁：

- 删除路径覆盖观察对象的**挂载路径**（仅 associated 观察者）
- 删除路径是观察对象**任一依赖**的前缀

```ts
// 示例：当删除 user 对象时，依赖 user 的计算属性会被自动销毁
const store = new AutoStore({
    user: {
        name: "张三",
        age: 25,
    },
    greeting: computed((scope: any) => `你好，${scope.user.name}`),
});

// 删除 user 对象
delete store.state.user;

// greeting 计算属性会被自动销毁，因为它的依赖 user 被删除了
```

## 配置选项

### 全局配置

在创建 Store 时通过 `cascadeDestroy` 选项控制：

```ts
import { AutoStore } from "autostore";

// 启用级联销毁（默认）
const store1 = new AutoStore({
    user: { name: "张三" },
    greeting: computed((scope: any) => `你好，${scope.user.name}`),
    cascadeDestroy: true,
});

// 禁用级联销毁
const store2 = new AutoStore({
    user: { name: "张三" },
    greeting: computed((scope: any) => `你好，${scope.user.name}`),
    cascadeDestroy: false,
});
```

### 单个观察对象配置

可以为单个计算属性或监听器单独配置 `cascadeDestroy` 选项，覆盖全局设置：

```ts
const store = new AutoStore({
    user: {
        name: "张三",
        age: 25,
    },
    // 使用全局配置（默认 true）
    greeting: computed((scope: any) => `你好，${scope.user.name}`),

    // 禁用此计算属性的级联销毁
    summary: computed(
        (scope: any) => `${scope.user.name} 今年 ${scope.user.age} 岁`,
        { cascadeDestroy: false }
    ),
});
```

## 使用示例

### 基础用法

```ts
import { createStore } from "@autostorejs/react";
import { computed } from "autostore";

const { state } = createStore({
    items: ["苹果", "香蕉", "橘子"],
    count: computed((scope: any) => scope.items.length),
});

console.log(state.count); // 3

// 删除 items 数组
delete state.items;

// count 计算属性会被自动销毁
// 此时访问 state.count 会得到 undefined
```

### 与 watch 配合使用

```ts
const store = new AutoStore({
    user: {
        name: "张三",
        profile: {
            bio: "前端开发者",
        },
    },
});

// 监听 user.name 变化
const watcher = store.watch("user.name", (operate) => {
    console.log(`姓名变化: ${operate.oldValue} -> ${operate.value}`);
});

// 删除 user.name
delete store.state.user.name;

// watcher 会被自动销毁，后续修改不会再触发回调
store.state.user.name = "李四"; // 不会触发 watcher
```

### 部分删除

```ts
const store = new AutoStore({
    order: {
        price: 100,
        quantity: 2,
        total: computed((scope: any) => scope.price * scope.quantity),
        discount: computed((scope: any) => scope.total * 0.9),
    },
});

console.log(store.state.order.total); // 200
console.log(store.state.order.discount); // 180

// 删除 price（discount 的依赖）
delete store.state.order.price;

// discount 会被自动销毁（因为依赖 price）
// total 也会被自动销毁（因为依赖 price）
```

## 注意事项

1. **性能优化**：同一 tick 内的多个 delete 操作会合并为一次遍历，避免重复全量扫描
2. **内存管理**：被销毁的观察对象会被从 `store.computedObjects` 和 `store.watchObjects` 中移除
3. **Store 销毁**：调用 `store.destroy()` 时会清理所有待处理的级联销毁任务
4. **类型安全**：单个观察对象的 `cascadeDestroy` 选项需要通过类型断言访问

## 与其他插件的关系

- **shadow**：Shadow Store 继承主 Store 的 `cascadeDestroy` 配置
- **watch**：`cascadeDestroy` 会自动销毁失效的 watch 监听器
- **computed**：`cascadeDestroy` 会自动销毁失效的计算属性
