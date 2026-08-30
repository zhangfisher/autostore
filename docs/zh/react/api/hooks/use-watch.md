# useWatch

监听 store 状态变化的 Hook，将监听结果转化为组件状态`[value, setValue]`，组件销毁时自动取消监听。

`useWatch`与 store 的`watch` API 的核心区别：`watch`是纯订阅（回调），而`useWatch`把监听到的数据变成**驱动重渲染的状态**。

## 签名

```ts
interface UseWatchType<State extends Dict> {
    // 1. 监听指定路径
    <Value, DependValue>(
        selector: ObjectKeyPaths<ComputedState<State>>,
        getter: (operate: StateOperate<DependValue>) => Value | undefined,
        options?: UseWatchOptions<Value>,
    ): [Value, UseWatchSetter<Value>];
    // 2. 监听多个路径
    <Value, DependValue>(
        selector: string[],
        getter: (operate: StateOperate<DependValue>) => Value | undefined,
        options?: UseWatchOptions<Value>,
    ): [Value, UseWatchSetter<Value>];
    // 3. 监听所有变化
    <Value, DependValue>(
        getter: (operate: StateOperate<DependValue>) => Value | undefined,
        options?: UseWatchOptions<Value>,
    ): [Value, UseWatchSetter<Value>];
}
```

**参数：**

| 参数 | 说明 |
| --- | --- |
| `selector` | 监听的路径（字符串或字符串数组），省略时监听所有状态变化 |
| `getter` | 监听回调，接收`operate`操作对象；返回值（非`undefined`）会写入 hook 状态触发重渲染；支持 async 函数 |
| `options` | 监听选项 |

`UseWatchOptions`选项：

| 选项 | 类型 | 说明 |
| --- | --- | --- |
| `initial` | `Value` | hook 状态的初始值 |
| `operates` | `string[]` | 只监听指定操作类型（如`['set', 'add']`） |
| `depth` | `number` | 监听深度 |
| `once` | `boolean` | 仅监听一次 |
| `filters` | `function[]` | 操作过滤器 |

（完整选项与`watch`一致，参见[监视选项](/zh/store/guide/watch/about)。）

**返回值：** `[value, setValue]`

| 返回值 | 说明 |
| --- | --- |
| `value` | getter 最近一次返回的值（初始为`options.initial`） |
| `setValue` | 手动更新该状态 |

## 使用说明

- getter 返回`undefined`时**不会**更新状态，可用于过滤无关变化。
- getter 支持 async 函数，resolve 的值同样写入状态。
- store 执行`reset()`后会自动将 hook 状态重置回`options.initial`。

## 示例

### 监听指定路径

```tsx
const { useWatch } = createStore({
    user: { firstName: 'Zhang', lastName: 'Fisher' },
});

// 当 user.firstName 变化时，返回变化后的值
const [firstName] = useWatch('user.firstName', ({ value }) => value);
```

### 实现脏检查（dirty）

```tsx
const [dirty] = useWatch<boolean>(
    ({ path }) => {
        if (['firstName', 'lastName'].includes(path[path.length - 1])) {
            return true; // 命中关注的变化才返回值
        }
        // 返回 undefined 不更新状态
    },
    { initial: false },
);
```

**运行效果如下：**

<demo react="api/useWatchDirty.tsx"/>

## 注意事项

:::warning getter 返回 undefined 表示忽略
`useWatch`依据 getter 返回值是否为`undefined`来判断是否更新组件状态。如果业务上确实需要把状态更新为`undefined`，请改用`setValue`或换一种返回形态（如`null`）。
:::

:::tip 与 watch 的选择
只需要副作用（打日志、同步到外部系统）时用`store.watch`；需要把变化反映到 UI 时用`useWatch`。
:::
