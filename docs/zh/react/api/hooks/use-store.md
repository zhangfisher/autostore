# useStore

在组件中创建一个与组件生命周期绑定的 store。

`useStore` 是从`@autostorejs/react`包直接导入的 Hook（区别于其他通过 store 实例访问的 Hooks），组件首次渲染时创建 store，组件卸载时自动销毁。

## 签名

```ts
function useStore<State extends Dict>(
    define: State,
    options?: AutoStoreOptions<State>
): ReactAutoStore<State>
```

**参数：**

| 参数 | 说明 |
| --- | --- |
| `define` | 状态定义对象，支持普通状态、同步计算属性、异步计算属性 |
| `options` | 可选的 store 配置项，见[选项](/zh/store/guide/store/options) |

**返回值：** `ReactAutoStore<State>`实例，包含`state`、`useReactive`、`$`、`useWatch`等全部成员。

## 使用说明

- 适合在组件内部维护局部状态，无需在外部声明 store。
- store 实例在组件整个生命周期内保持稳定（`useRef`缓存），不会因重渲染而重复创建。
- 组件卸载时自动调用`destroy()`销毁 store 并清理所有监听。

## 示例

```tsx
import { useStore } from '@autostorejs/react';

const MyComponent = () => {
    const store = useStore({
        price: 1,
        count: 2,
        total: (scope) => scope.price * scope.count, // 同步计算属性
    });

    const [total, setCount] = store.useReactive('total');

    return <div onClick={() => store.state.count++}>{total}</div>;
};
```

**运行效果如下：**

<demo react="api/useStore.tsx"/>

## 注意事项

:::warning
`useStore`创建的 store 是**组件私有**的。多个组件实例各自创建独立的 store，状态互不共享；需要跨组件共享状态时，请在组件外部使用`createStore`并通过 Context 或模块作用域共享。
:::

:::tip
`useStore`的参数（`define`/`options`）仅在首次渲染时生效，后续渲染传入新的参数会被忽略。不要在参数中引用会变化的 props，若需要同步 props 到状态，请使用`watch`或`useWatch`手动处理。
:::
