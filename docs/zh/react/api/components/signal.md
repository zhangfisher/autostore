# `$` / `signal` 信号组件

信号组件将渲染更新限制在**尽可能小的范围内**：仅当所依赖的状态变化时，才重新渲染该片段，而不重渲染整个组件。

`$`与`signal`是同一个函数的两个名字（`store.$ === store.signal`）。

## 签名

```ts
interface SignalComponentType<State extends Dict> {
    // 1. 封装单个状态：$(path)
    (selector: ObjectKeyPaths<ComputedState<State>>,
        options?: SignalComponentOptions
    ): React.ReactNode;
    // 2. 组合多个状态：$((state) => ReactNode)
    (selector: (state: ComputedState<State>) => React.ReactNode,
        options?: SignalComponentOptions
    ): React.ReactNode;
    // 3. 自定义渲染 + 路径
    <Value>(render: (value) => ReactNode,
        path: string | string[],
        options?: SignalComponentOptions
    ): React.ReactNode;
    // 4. 自定义渲染 + getter（同步/异步）
    <Value, Scope>(render: (value) => ReactNode,
        getter: ComputedGetter<Value, Scope> | AsyncComputedGetter<Value, Scope>,
        options?: SignalComponentOptions
    ): React.ReactNode;
    // 5. 自定义渲染 + builder（computed(...)/asyncComputed(...)）
    <Value, Scope>(render: (value) => ReactNode,
        builder: ObserverDescriptorBuilder<string, Value, Scope>,
        options?: SignalComponentOptions
    ): React.ReactNode;
}
```

**选项（`SignalComponentOptions`）：**

| 选项 | 类型 | 说明 |
| --- | --- | --- |
| `errorBoundary` | `ComponentType<{ error: any }>` | 渲染出错时的兜底组件 |

**自定义渲染函数参数：** `render(value)`的`value`为`AsyncComputedValue<Value>`形态（`{ value, loading, error, timeout, retry, progress, ... }`），可在渲染中直接使用`loading`/`error`等状态。

## 使用说明

- **`$(path)`**：最简形式，直接渲染路径的值。
- **`$((state) => ...)`**：组合多个状态，自动收集渲染函数内访问的路径作为依赖。
- **`$(render, path/getter/builder)`**：需要异步能力（`loading`/`retry`/`timeout`）或复杂渲染逻辑时使用；信号组件内部动态创建计算属性，生命周期随组件。

## 示例

```tsx
const { state, $ } = createStore({
    user: {
        firstName: 'Zhang',
        lastName: 'Fisher',
        age: 18,
        fullName: (user) => user.firstName + ' ' + user.lastName,
    },
});

// 封装单个状态
<div>{$('user.age')}</div>

// 组合多个状态
<div>{(state) => state.user.firstName + ' ' + state.user.lastName}</div>

// 自定义渲染 + 异步计算
$(
    ({ loading, value }) => (loading ? '加载中...' : value),
    asyncComputed(async () => { /* ... */ }, ['user.age'], { initial: 0 }),
)
```

**运行效果如下：**

<demo react="signals/signalBase.tsx"/>

**自定义渲染异步计算：**

<demo react="signals/signalAsyncCustomRender.tsx"/>

更多用法参见[信号组件指南](/zh/react/signal/component)。

## 注意事项

:::warning signal 内部是独立渲染单元
信号组件渲染的是**独立的 React 子树**，其依赖变化只重渲染该子树，外层组件不会重渲染。不要在信号组件的渲染函数中引用会随外层变化的闭包变量——它们不会触发信号更新。
:::

:::tip 与 useReactive 的选择
渲染局部一小片值（如表格单元格、价格标签）用`$()`；需要在组件逻辑中读写值（事件处理、条件分支）用`useReactive`。两者可混用。
:::
