# useComputed

在组件中**动态创建计算属性**并直接返回其值的 Hook。

与在状态树中预先声明计算属性不同，`useComputed`创建的计算属性是"游离"的——不写入状态树，仅存在于组件内部，组件卸载时自动销毁。

## 签名

```ts
interface UseComputedType<State extends Dict> {
    // getter 函数（同步或异步）
    <Value>(getter: ComputedGetter<Value, Scope> | AsyncComputedGetter<Value, Scope>,
        computedOptions?: ComputedOptions<Value, Scope>
    ): AsyncComputedValue<Value>;
    // builder：如 computed(...) / asyncComputed(...) 声明
    <Value, Scope>(builder: ComputedDescriptorBuilder<Value, Scope>,
        computedOptions?: ComputedOptions<Value, Scope>
    ): AsyncComputedValue<Value>;
}
```

**参数：**

| 参数 | 说明 |
| --- | --- |
| `getter` | 计算函数，自动收集依赖；支持 async 函数 |
| `builder` | `computed(...)`或`asyncComputed(...)`声明的描述符 builder |
| `computedOptions` | 计算选项，见[计算选项](/zh/store/guide/computed/options) |

**返回值：** `AsyncComputedValue<Value>`形态的对象（`{ value, loading, error, retry, timeout, progress, ... }`），依赖变化时自动重新计算并触发重渲染。

## 使用说明

- 适合**组件私有**的派生数据：不想污染全局状态树，又需要计算属性的特性（依赖追踪、异步能力）。
- 内部基于[useComputedObject](./use-computed-object)实现，等价于`useComputedObject(...)`后再订阅其值变化。
- 动态创建的计算属性默认挂载到根作用域（`scope: ObserverScopeRef.Root`），getter 的`scope`参数即整个状态树。
- 返回值统一为`AsyncComputedValue`形态：同步计算时`loading`恒为`false`，直接使用`value`即可。

## 示例

```tsx
const { useComputed } = createStore({
    order: { price: 100, count: 2 },
});

// 同步计算
const total = useComputed((state) => state.order.price * state.order.count);
// total.value

// 异步计算：声明式 builder
const discount = useComputed(
    asyncComputed(
        async (state) => {
            await delay(1000);
            return state.order.total * 0.8;
        },
        ['order.total'],
        { initial: 0.9 },
    ),
);
// discount.value / discount.loading / discount.error
```

**运行效果如下：**

<demo react="api/useComputed.tsx"/>

## 注意事项

:::warning 每次渲染参数需保持稳定
计算属性对象仅在首次渲染时创建（内部`useRef`缓存）。请确保传入的 getter/builder 引用稳定，推荐在组件外定义 builder（如`asyncComputed(...)`），或使用`useMemo`包裹，避免依赖变化后计算属性不更新的困惑。
:::

:::tip 与 useReactive(getter) 的区别
`useReactive((state) => ...)`返回的是纯值，适合简单派生；`useComputed`返回完整计算属性对象，拥有`loading`/`error`/`retry`/`run`等能力，适合异步计算和需要手动控制的场景。
:::
