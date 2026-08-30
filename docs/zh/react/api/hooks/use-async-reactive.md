# useAsyncReactive

访问**异步计算属性**的 Hook，返回完整的`AsyncComputedValue`对象，可获得`loading`、`error`、`retry`、`timeout`、`progress`、`run`、`cancel`等全部异步能力。

:::warning 命名说明
早期版本中该 Hook 名为`useAsyncState`，随`useState`一同废弃，统一使用`useAsyncReactive`。
:::

## 签名

```ts
interface UseAsyncReactiveType<State extends Dict> {
    <Path extends StatePaths<State>>(selector: Path): AsyncComputedValue<Value>;
    <Value>(selector: string[]): AsyncComputedValue<Value>;
}
```

**参数：**

| 参数 | 说明 |
| --- | --- |
| `selector` | 指向异步计算属性的路径，如`'user.salary'`或`['user', 'salary']` |

**返回值：** `AsyncComputedValue<Value>`对象：

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| `value` | `Value` | 计算结果 |
| `loading` | `boolean` | 是否正在计算 |
| `error` | `Error \| null` | 计算错误 |
| `timeout` | `number` | 超时倒计时（ms），未配置超时为`0` |
| `retry` | `number` | 剩余重试次数 |
| `progress` | `number` | 执行进度`0-100` |
| `run` | `() => void` | 手动触发重新计算 |
| `cancel` | `() => void` | 取消当前计算 |

## 使用说明

- 同时支持两种异步计算属性，返回形态保持一致：
  - **高级异步**（`asyncComputed(...)`声明）：状态值本身就是`AsyncComputedValue`对象，hook 原样返回；
  - **简单异步**（`computed(async ...)`声明）：计算结果原位写入状态树，hook 会包装出`AsyncComputedValue`形态，`loading`/`error`由 observer 事件驱动。
- 依赖监听策略：高级异步监听路径的所有子属性（`.*`），简单异步直接监听路径本身。
- 与`useReactive`的区别：`useReactive`默认解包出标量值，`useAsyncReactive`始终返回完整对象。

## 示例

```tsx
const store = createStore({
    user: {
        firstName: 'Zhang',
        lastName: 'Fisher',
        // 高级异步计算属性
        salary: asyncComputed(
            async (user) => {
                await delay(1000);
                return user.age * 10;
            },
            ['age'],
            { initial: 100 },
        ),
    },
});

const salary = useAsyncReactive('user.salary');
// salary.value / salary.loading / salary.run() / salary.cancel()
```

**运行效果如下：**

<demo react="api/useAsyncReactive.tsx"/>

## 注意事项

:::warning selector 必须指向异步计算属性
`useAsyncReactive`专为异步计算属性设计。若路径指向普通状态或同步计算属性，返回的对象中`loading`等字段没有意义（普通状态返回包装后的原值）。访问普通状态请使用[useReactive](./use-reactive)。
:::

:::tip 首帧 loading
简单异步计算的首次执行通过`setTimeout(0)`触发，可能早于 hook 的订阅生效。`useAsyncReactive`内部已做首帧校正（订阅时同步一次运行状态），无需额外处理。
:::
