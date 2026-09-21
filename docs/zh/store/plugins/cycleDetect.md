# cycleDetect

循环依赖检测插件，用于在同步计算属性构造或执行期间检测循环依赖关系，避免无限递归和运行时错误。

## 概述

在 AutoStore 中，同步计算属性之间可能形成循环依赖关系（例如 A 依赖 B，B 又依赖 A），这会导致无限递归或运行时错误。`cycleDetect` 插件通过在构造阶段和执行阶段进行检测，提前发现并报告循环依赖问题。

:::warning 提示
循环依赖是代码逻辑错误，应修复依赖关系而非依赖检测插件运行。
:::

## 工作原理

### 检测阶段

1. **构造阶段检测**：在 observer 创建期间检测同步循环依赖
   - 使用 `Set<string>` 追踪正在创建的 observer 路径
   - 当嵌套创建链上出现重复路径时生成 `CyleDependError`

2. **执行阶段检测**：在同步 getter 执行期间检测循环依赖
   - 使用全局 `Map<Function, string>` 追踪活跃的 getter 函数
   - 当同一 getter 在执行期间被重入时生成 `CyleDependError`

### 检测覆盖范围

- 同步静态计算属性（构造期间 getter 执行）
- 动态写入状态树的函数属性（首次读取触发创建时）
- watch 对象不参与循环检测

### 异步计算属性不参与检测

异步计算属性不参与循环依赖检测，原因：

- 异步 getter 的执行链路存在 `await` 边界，依赖变化触发的重算由 core 的重入保护（`_running` 检查 + `observer/*/cancel` 事件）兜底，不会产生同步无限递归
- 异步计算属性互相依赖时，重入的计算会被取消并记录 warning 日志（`Async computed: xxx is running, can't reentry`）

## 使用方式

### 基础用法

```ts
import { AutoStore } from "autostore";
import { cycleDetect } from "@autostorejs/plugins/cycleDetect";

// 全局安装，对后续所有 store 生效
cycleDetect();

const store = new AutoStore({
    a: (scope) => scope.b,
    b: (scope) => scope.a,  // b 的 observer.error 为 CyleDependError
});
```

:::warning 注意
同步计算属性使用裸函数声明（自动收集依赖）。`computed(fn, deps数组)` 是**异步计算属性**的声明方式，传入数组依赖会被判定为异步计算，不参与循环检测。
:::

### 单个 Store 安装

```ts
import { AutoStore } from "autostore";
import { cycleDetect } from "@autostorejs/plugins/cycleDetect";

const store = new AutoStore({
    a: (scope) => scope.b,
    b: (scope) => scope.a,
});

// 仅对特定 store 安装
cycleDetect(store);
```

### 异步计算属性

异步计算属性不参与循环依赖检测，互相依赖时由 core 的重入保护兜底：

```ts
import { AutoStore, computed } from "autostore";
import { cycleDetect } from "@autostorejs/plugins/cycleDetect";

cycleDetect();

const store = new AutoStore({
    a: computed(async (scope) => scope.b?.value ?? 0, ["./b"]),
    b: computed(async (scope) => scope.a?.value ?? 0, ["./a"]),
});

// 访问 a 触发异步计算，重入的计算被 core 取消（不抛出 CyleDependError）
store.state.a;
```

## 高级配置（DevTools）

`@autostorejs/devtools` 包提供了更强大的循环依赖检测功能，支持异步计算的运行时检测。

### 安装 DevTools 版本

```ts
import { installCycleDetectExtend } from "@autostorejs/devtools";

installCycleDetectExtend({
    cycleCount: 8,        // 循环次数阈值
    maxOpereates: 200,    // 最大操作数
    stores: [],           // 指定 store（空数组表示所有）
    onDetected: (paths, computedObject) => {
        console.error("发现循环依赖:", paths);
        return "disable"; // "ignore" | "throw" | "disable"
    },
});
```

### 配置选项

| 选项 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `cycleCount` | `number` | `8` | 当检测到多少个循环时视为循环依赖 |
| `maxOpereates` | `number` | `200` | 当检测时间操作数量达到此值时，停止检测 |
| `stores` | `string[]` | `[]` | 指定仅作用于指定的 store，空数组代表所有 store 均生效 |
| `onDetected` | `(paths: string[], computedObject: any) => "ignore" \| "throw" \| "disable"` | `undefined` | 检测到循环依赖时的处理方式 |

### onDetected 返回值

- `"ignore"`：忽略循环依赖，继续执行
- `"throw"`：抛出错误
- `"disable"`：禁用该计算属性

## 使用示例

### 检测同步循环依赖

循环检测错误不会中断 store 构造，而是记录在嵌套最深层 observer 的 `error` 属性上：

```ts
import { AutoStore, CyleDependError } from "autostore";
import { cycleDetect } from "@autostorejs/plugins/cycleDetect";

cycleDetect();

const store = new AutoStore({
    a: (scope) => scope.b,
    b: (scope) => scope.a,
});

const error = store.computedObjects.get("b")?.error;
if (error instanceof CyleDependError) {
    console.error("检测到循环依赖:", error.message);
    // 输出: Find circular dependency at <"a">, steps: a -> b -> a
}
```

三个计算属性形成环时，错误记录在嵌套最深层的 `c` 上：

```ts
const store = new AutoStore({
    a: (scope) => scope.b,
    b: (scope) => scope.c,
    c: (scope) => scope.a,
});

const error = store.computedObjects.get("c")?.error;
// Find circular dependency at <"a">, steps: a -> b -> c -> a
```

### 检测动态写入的循环依赖

动态写入状态树的函数属性在首次读取时才创建 observer，配合 `lazy` 选项可以检测后补形成的循环：

```ts
import { AutoStore, CyleDependError } from "autostore";
import { cycleDetect } from "@autostorejs/plugins/cycleDetect";

cycleDetect();

// lazy: 阻止构造期间的首次遍历提前创建 a 的 observer
const store = new AutoStore(
    {
        a: (scope) => scope.b,
    },
    { lazy: true },
);

// 动态写入 b，依赖 a，形成循环
store.state.b = (scope) => scope.a;

// 读取 b 触发创建链: b -> a -> b，命中构造期检测
// 错误记录在嵌套内层的 a 上
void store.state.b;

const error = store.computedObjects.get("a")?.error;
if (error instanceof CyleDependError) {
    console.error("动态创建时检测到循环依赖:", error.message);
}
```

:::warning 注意
`computedObjects.create` 创建的是游离对象（不挂载到状态树），不经过构造期检测路径，因此不参与循环依赖检测。
:::

### 与 React 集成使用

```tsx
import { useStore } from "@autostorejs/react";
import { cycleDetect } from "@autostorejs/plugins/cycleDetect";
import { useEffect, useState } from "react";

// 全局安装
cycleDetect();

export default () => {
    const [error, setError] = useState<string | null>(null);

    const store = useStore({
        x: 1,
        a: (scope) => scope.b + scope.x,
        b: (scope) => scope.a + scope.x,
    });

    useEffect(() => {
        // 同步循环检测错误记录在嵌套最深层 observer 上
        const err = store.computedObjects.get("b")?.error;
        if (err) setError(err.message);
    }, []);

    return (
        <div>
            <div style={{ color: 'red' }}>{error}</div>
        </div>
    );
};
```

## 错误处理

### CyleDependError

循环依赖检测生成的 `CyleDependError` 记录在嵌套最深层 observer 的 `error` 属性上，包含详细的路径信息：

```ts
import { AutoStore, CyleDependError } from "autostore";
import { cycleDetect } from "@autostorejs/plugins/cycleDetect";

cycleDetect();

const store = new AutoStore({
    a: (scope) => scope.b,
    b: (scope) => scope.a,
});

const error = store.computedObjects.get("b")?.error;
if (error instanceof CyleDependError) {
    console.error(error.message);
    // Find circular dependency at <"a">, steps: a -> b -> a
}
```

### 错误消息格式

错误消息包含以下信息：
- 循环依赖的起始路径
- 完整的循环路径链
- 步骤分隔符 `->`

## 注意事项

1. **性能影响**：循环依赖检测会增加少量性能开销，生产环境可考虑关闭
2. **异步计算**：异步计算属性不参与循环依赖检测，重入由 core 的重入保护兜底；如需异步循环检测请使用 DevTools 版本
3. **watch 对象**：watch 对象不参与循环检测，因为它们不参与计算
4. **动态创建**：`computedObjects.create` 创建的游离对象不参与检测；动态写入状态树的函数属性（配合 `lazy`）会被检测
5. **DevTools 版本**：`@autostorejs/devtools` 提供更强大的异步检测功能

## 与其他插件的关系

- **cascadeDestroy**：循环依赖检测与级联销毁独立工作
- **shadow**：Shadow Store 继承主 Store 的循环依赖检测配置
- **trace**：trace 插件可以跟踪循环依赖的检测过程
