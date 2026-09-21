# cycleDetect

循环依赖检测插件，用于在计算属性构造或执行期间检测循环依赖关系，避免无限递归和运行时错误。

## 概述

在 AutoStore 中，计算属性之间可能形成循环依赖关系（例如 A 依赖 B，B 又依赖 A），这会导致无限递归或运行时错误。`cycleDetect` 插件通过在构造阶段和执行阶段进行检测，提前发现并报告循环依赖问题。

:::warning 提示
循环依赖是代码逻辑错误，应修复依赖关系而非依赖检测插件运行。
:::

## 工作原理

### 检测阶段

1. **构造阶段检测**：在 observer 创建期间检测同步循环依赖
   - 使用 `Set<string>` 追踪正在创建的 observer 路径
   - 当检测到路径重复时抛出 `CyleDependError`

2. **执行阶段检测**：在 getter 执行期间检测同步/异步循环依赖
   - 使用全局 `Map<Function, string>` 追踪活跃的 getter 函数
   - 当检测到 getter 重复执行时抛出 `CyleDependError`

### 检测覆盖范围

- 同步静态计算属性（构造期间 getter 执行）
- 异步静态计算属性（run() 期间 getter 执行）
- 动态创建的计算属性（computedObjects.create）
- watch 对象不参与循环检测

## 使用方式

### 基础用法

```ts
import { AutoStore, computed } from "autostore";
import { cycleDetect } from "@autostorejs/plugins/cycleDetect";

// 全局安装，对后续所有 store 生效
cycleDetect();

const store = new AutoStore({
    a: computed((scope) => scope.b, ["./b"]),
    b: computed((scope) => scope.a, ["./a"]),  // throws CyleDependError
});
```

### 单个 Store 安装

```ts
import { AutoStore, computed } from "autostore";
import { cycleDetect } from "@autostorejs/plugins/cycleDetect";

const store = new AutoStore({
    a: computed((scope) => scope.b, ["./b"]),
    b: computed((scope) => scope.a, ["./a"]),
});

// 仅对特定 store 安装
cycleDetect(store);
```

### 异步计算属性检测

```ts
import { AutoStore, computed } from "autostore";
import { cycleDetect } from "@autostorejs/plugins/cycleDetect";

cycleDetect();

const store = new AutoStore({
    a: computed(async (scope) => scope.b?.value ?? 0, ["./b"]),
    b: computed(async (scope) => scope.a?.value ?? 0, ["./a"]),
});

// 访问 a 时会触发异步计算，检测到循环依赖
store.state.a; // throws CyleDependError
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

```ts
import { AutoStore, computed } from "autostore";
import { cycleDetect } from "@autostorejs/plugins/cycleDetect";

cycleDetect();

try {
    const store = new AutoStore({
        a: computed((scope) => scope.b, ["./b"]),
        b: computed((scope) => scope.a, ["./a"]),
    });
} catch (e) {
    if (e instanceof CyleDependError) {
        console.error("检测到循环依赖:", e.message);
        // 输出: Find circular dependency at <"a">, steps: a -> b -> a
    }
}
```

### 检测动态创建的计算属性

```ts
import { AutoStore, computed } from "autostore";
import { cycleDetect } from "@autostorejs/plugins/cycleDetect";

cycleDetect();

const store = new AutoStore({
    a: computed((scope) => scope.b, ["./b"]),
});

try {
    // 动态创建 b，依赖 a，形成循环
    store.computedObjects.create(
        (scope) => scope.a,
        ["./a"],
        { anchor: { path: ["b"] } },
    );
} catch (e) {
    if (e instanceof CyleDependError) {
        console.error("动态创建时检测到循环依赖:", e.message);
    }
}
```

### 与 React 集成使用

```tsx
import { useStore, computed } from "@autostorejs/react";
import { cycleDetect } from "@autostorejs/plugins/cycleDetect";
import { useState } from "react";

// 全局安装
cycleDetect();

export default () => {
    const [error, setError] = useState(null);
    
    const store = useStore({
        x: 1,
        a: computed(async (scope) => scope.b.value + scope.x, ["b", "x"]),
        b: computed(async (scope) => scope.a.value + scope.x, ["a", "x"]),
    }, {
        debug: true,
        onObserverError: ({ error }) => {
            if (error instanceof CyleDependError) {
                setError(error.message);
            }
        },
    });

    return (
        <div>
            <div style={{ color: 'red' }}>{error}</div>
        </div>
    );
};
```

## 错误处理

### CyleDependError

循环依赖检测会抛出 `CyleDependError` 错误，包含详细的路径信息：

```ts
import { CyleDependError } from "autostore";

try {
    new AutoStore({
        a: computed((scope) => scope.b, ["./b"]),
        b: computed((scope) => scope.a, ["./a"]),
    });
} catch (e) {
    if (e instanceof CyleDependError) {
        console.error(e.message);
        // Find circular dependency at <"a">, steps: a -> b -> a
    }
}
```

### 错误消息格式

错误消息包含以下信息：
- 循环依赖的起始路径
- 完整的循环路径链
- 步骤分隔符 `->`

## 注意事项

1. **性能影响**：循环依赖检测会增加少量性能开销，生产环境可考虑关闭
2. **异步检测**：异步计算属性的循环依赖检测需要在执行时进行，无法在构造时完全检测
3. **watch 对象**：watch 对象不参与循环检测，因为它们不参与计算
4. **动态创建**：动态创建的计算属性也会被检测循环依赖
5. **DevTools 版本**：`@autostorejs/devtools` 提供更强大的异步检测功能

## 与其他插件的关系

- **cascadeDestroy**：循环依赖检测与级联销毁独立工作
- **shadow**：Shadow Store 继承主 Store 的循环依赖检测配置
- **trace**：trace 插件可以跟踪循环依赖的检测过程
