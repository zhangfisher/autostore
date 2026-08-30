# createStore

创建一个`ReactAutoStore`实例，是使用`@autostorejs/react`的入口函数。

```ts
import { createStore } from '@autostorejs/react';
```

## 签名

```ts
function createStore<State extends Dict>(
    initial: State,
    options?: AutoStoreOptions<State>
): ReactAutoStore<State>
```

**参数：**

| 参数 | 说明 |
| --- | --- |
| `initial` | 初始状态定义，支持普通状态、同步计算属性、异步计算属性（`computed`/`asyncComputed`声明） |
| `options` | store 配置项 |

**常用选项：**

| 选项 | 类型 | 说明 |
| --- | --- | --- |
| `id` | `string` | store 标识，用于 devtools 显示 |
| `debug` | `boolean` | 开启 Redux DevTools 调试 |
| `resetable` | `boolean` | 是否支持`reset()`，React 包默认`true` |
| `signalErrorBoundary` | `ComponentType` | 信号组件的默认错误边界，React 包默认渲染`ERROR` |

（完整选项参见[核心库选项](/zh/store/guide/store/options)。）

**返回值：** `ReactAutoStore<State>`实例：

| 分类 | 成员 |
| --- | --- |
| 状态 | `state`、`getSnap()`、`reset()` |
| Hooks | `useReactive`、`useAsyncReactive`、`useWatch`、`useDeps`、`useComputed`、`useComputedObject`、`useField`、`useFields` |
| 组件 | `$`、`signal` |
| 更新 | `update()`、`batchUpdate()`、`silentUpdate()`、`peep()` |
| 监听 | `watch()`、`watchObjects`、`computedObjects` |
| 其他 | `id`、`options`、`logger`、`destroy()` |

## 使用说明

- `createStore`通常在**组件外部**（模块作用域）调用，创建全局或模块级共享的 store。
- 在组件内部创建私有 store 时使用[useStore](../hooks/use-store)。
- React 包的`createStore`在核心库`AutoStore`基础上预设了`resetable: true`与默认信号错误边界。

## 示例

```tsx
import { createStore, computed } from '@autostorejs/react';

export const store = createStore(
    {
        user: {
            firstName: 'Zhang',
            lastName: 'Fisher',
            // 同步计算属性
            fullName: (user) => user.firstName + ' ' + user.lastName,
        },
        // 异步计算属性
        salary: computed(
            async (scope) => scope.user.age * 10,
            ['user.age'],
            { async: true, initial: 0 },
        ),
    },
    { id: 'app-store', debug: true },
);

// 解构使用
export const { state, $, useReactive } = store;
```

**运行效果如下：**

<demo react="api/createStore.tsx"/>

## 注意事项

:::warning 不要在组件渲染函数内调用
`createStore`每次调用都会创建新实例。在组件体内调用会在每次渲染时重复创建 store（且不会销毁），请使用模块作用域或[useStore](../hooks/use-store)。
:::

:::tip 类型推断
`createStore`的泛型`State`会自动推断（无需手写），计算属性、hooks 路径等均能获得完整的类型提示。复杂状态可显式声明：`createStore<MyState>(...)`。
:::
