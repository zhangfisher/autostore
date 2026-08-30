# useComputedObject

在组件中动态创建**计算属性对象**（`ComputedObject`）的 Hook。

与[useComputed](./use-computed)的区别：`useComputedObject`返回计算属性对象本身（不订阅值变化、不触发重渲染），由开发者自行决定如何使用（手动`watch`、传给信号组件等）；`useComputed`则额外订阅值变化驱动组件重渲染。

## 签名

```ts
interface UseComputedObjectType<State extends Dict> {
    // getter 函数（同步或异步）
    <Value>(getter: ComputedGetter<Value, Scope> | AsyncComputedGetter<Value, Scope>,
        computedOptions?: ComputedOptions<Value, Scope>
    ): SyncComputedObject<Value, Scope> | AsyncComputedObject<Value, Scope> | undefined;
    // builder：computed(...) / asyncComputed(...)
    <Value, Scope>(builder: ComputedDescriptorBuilder<Value, Scope>,
        computedOptions?: ComputedOptions<Value, Scope>
    ): SyncComputedObject<Value, Scope> | AsyncComputedObject<Value, Scope> | undefined;
}
```

**返回值：** 计算属性对象，主要成员：

| 成员 | 说明 |
| --- | --- |
| `value` | 当前计算结果 |
| `async` | 是否为异步计算 |
| `id` | 计算对象唯一标识 |
| `watch(listener)` | 订阅值变化，返回`Watcher` |
| `run()` | 手动触发计算 |
| `detach()` | 从 store 分离并销毁 |

## 使用说明

- 首次渲染时创建计算属性对象，组件卸载时自动`detach()`。
- 默认注入`scope: ObserverScopeRef.Root`（动态创建的计算属性没有"所在对象"，统一挂到根节点）。
- 是[useComputed](./use-computed)的底层实现。

## 示例

```tsx
const { useComputedObject } = createStore({
    order: { price: 100, count: 2 },
});

const totalObj = useComputedObject((state) => state.order.price * state.order.count);

// 手动订阅值变化
useEffect(() => {
    const watcher = totalObj?.watch(() => {
        console.log('total =', totalObj.value);
    });
    return () => watcher?.off();
}, []);

// 手动触发重新计算
<Button onClick={() => totalObj?.run()}>重新计算</Button>
```

**运行效果如下：**

<demo react="api/useComputedObject.tsx"/>

## 注意事项

:::warning 不订阅值变化
`useComputedObject`返回的对象值变化**不会**触发组件重渲染。需要驱动渲染时请使用[useComputed](./use-computed)，或自行通过`watch` + `setState`实现。
:::

:::tip
`useComputedObject`内部基于`useObserverObject`实现（该 API 不对外公开），仅追加默认`scope`配置（挂载到根节点）。
:::
