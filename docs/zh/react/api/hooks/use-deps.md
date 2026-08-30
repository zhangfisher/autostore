# useDeps

收集依赖路径的 Hook。输入一个路径、函数或数组，返回其依赖的**状态路径数组**（每个路径以字符串数组形式表示）。

`useDeps`主要供其他 Hooks（`useReactive`等）内部使用，用于将 selector 转换为可监听的依赖路径；也可以在需要精确控制监听粒度时单独使用。

## 签名

```ts
interface UseDepsType<State extends Dict> {
    // 输入路径或函数
    (selector: string | ((state) => any), extendAsync?: 'none' | 'value' | 'all'): string[][];
    // 输入数组：路径/函数/路径数组的混合
    (selector: (string | string[] | ((state) => any))[], extendAsync?: 'none' | 'value' | 'all'): string[][];
}
```

**参数：**

| 参数 | 说明 |
| --- | --- |
| `selector` | 路径字符串、getter 函数，或二者混合的数组 |
| `extendAsync` | 异步计算属性的依赖展开策略，默认`'none'` |

`extendAsync`取值：

| 值 | 说明 |
| --- | --- |
| `'none'` | 不展开，直接使用路径本身 |
| `'value'` | 自动追加`.value`，即依赖异步计算的结果值 |
| `'all'` | 追加`.*`，依赖异步计算的全部子属性（`value`/`loading`/`error`...） |

**返回值：** `string[][]`——依赖路径数组，每个元素是一段路径。

## 使用说明

- **输入路径**：`useDeps('order.price')` → `[['order', 'price']]`
- **输入函数**：执行函数并自动收集其中访问的路径：
  `useDeps((state) => state.order.price * state.order.count)` → `[['order', 'price'], ['order', 'count']]`
- **输入数组**：逐项收集后合并，并自动去重（`noRepeat`）。
- **异步计算属性**：路径指向异步计算属性时，状态值是`AsyncComputedValue`对象，真正的结果在`.value`中。通过`extendAsync`控制展开方式，确保 watch 时能监听到值变化。

## 示例

```tsx
const { useDeps } = createStore({
    order: {
        price: 100,
        count: 2,
        total: (order) => order.price * order.count,
        discount: computed(async (order) => { /* ... */ }, ['price'], { async: true }),
    },
});

useDeps('order.price'); // => [['order', 'price']]
useDeps((s) => s.order.price + s.order.count); // => [['order','price'], ['order','count']]
useDeps('order.discount'); // => [['order', 'discount']]  (none)
useDeps('order.discount', 'value'); // => [['order', 'discount', 'value']]
useDeps('order.discount', 'all'); // => [['order', 'discount', '*']]
```

**运行效果如下：**

<demo react="api/useDeps.tsx"/>

## 注意事项

:::warning 依赖收集仅执行一次
`useDeps`内部通过`useReactive`同款的惰性初始化执行收集，**仅在组件首次渲染时执行一次**。若 selector 是内联函数且其访问的路径会随渲染变化，收集结果不会更新。
:::

:::tip 与 collectDependencies 的关系
`useDeps`是核心库`getDepends`的 React 封装。需要在组件外收集依赖时可直接使用`autostore`导出的`getDepends`/`collectDependencies`。
:::
