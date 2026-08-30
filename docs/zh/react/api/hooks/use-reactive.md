# useReactive

访问 store 状态数据的 Hook，当所依赖的状态变化时自动触发组件重渲染。

`useReactive`是`@autostorejs/react`中使用频率最高的 Hook，通过 store 实例访问：`store.useReactive(...)`。

:::warning 命名说明
早期版本中该 Hook 名为`useState`，因与`React`内置`useState`重名（使用时经常需要重命名）已废弃，统一使用`useReactive`。
:::

## 签名

```ts
interface UseReactiveType<State extends Dict> {
    // 1. 按路径访问：返回 [值, 更新函数, 异步运行状态]
    <Path extends StatePaths<State>>(selector: Path): UseReactiveResult<Value, State>;
    // 2. 按路径访问异步计算属性：返回完整 AsyncComputedValue 对象
    <Path extends StatePaths<State>>(selector: Path, async: boolean): UseReactiveResult<AsyncComputedValue<Value>, State>;
    // 3. 按路径数组访问：['order', 'price']
    <Value>(selector: string[]): UseReactiveResult<Value, State>;
    // 4. getter/setter 组合：派生状态
    <Value, SetValue>(getter: (state) => Value, setter?: (value, state) => void): [Value, Setter];
    // 5. 无参调用：返回整个状态树
    (): UseReactiveResult<State, State>;
}
```

**返回值：** 三元组`[value, setValue, extras]`

| 返回值 | 说明 |
| --- | --- |
| `value` | 当前值；若路径指向对象则返回响应式代理，路径指向异步计算属性时默认自动解包出标量值 |
| `setValue` | 更新函数：直接传新值写入对应路径；传函数时以`store.update`批量执行 |
| `extras` | 异步运行状态`{ loading, error, retry, timeout, progress }`，仅路径指向异步计算属性时有意义 |

`UseReactiveExtras`各字段：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `loading` | `boolean` | 是否正在计算中（所有异步计算均支持） |
| `error` | `Error \| null` | 计算出错信息 |
| `retry` | `number` | 剩余重试次数（仅高级异步计算） |
| `timeout` | `number` | 超时倒计时 ms（仅高级异步计算） |
| `progress` | `number` | 执行进度 0-100（仅高级异步计算） |

## 使用说明

- **路径访问**：`useReactive('user.age')`，仅当`user.age`变化时才触发重渲染，粒度细。
- **getter/setter 派生**：适合从多个状态派生一个值（如拼接姓名），setter 负责拆分写回。
- **异步计算属性**：路径指向异步计算属性时，默认自动追加`.value`解包出计算结果；传入第二参`true`则返回完整`AsyncComputedValue`对象（含`loading`/`run`等）。异步计算分两种声明方式，行为有差异，详见下方[简单异步（`computed`）](#异步计算属性-简单异步-computed)与[高级异步（`asyncComputed`）](#异步计算属性-高级异步-asynccomputed)示例。
- **无参调用**：返回整个状态树的浅拷贝，任何状态变化都会触发重渲染，慎用。

## 示例

### 基本用法

```tsx
const { useReactive } = createStore({
    user: { firstName: 'Zhang', lastName: 'Fisher', age: 18 },
});

const [age, setAge] = useReactive('user.age');
// age = 18
// setAge(19) 等价于 store.state.user.age = 19
```

**运行效果如下：**

<demo react="api/useReactiveBase.tsx"/>

### getter/setter 派生状态

```tsx
const [fullName, setFullName] = useReactive(
    (state) => state.user.firstName + ' ' + state.user.lastName,
    (value, state) => {
        const [firstName, lastName] = value.split(' ');
        state.user.firstName = firstName;
        state.user.lastName = lastName;
    },
);
```

**运行效果如下：**

<demo react="api/useReactiveGetSet.tsx"/>

### 异步计算属性：简单异步（`computed`）

`computed(async ...)`声明的计算属性，计算结果**原位写入**状态树（`state.salary` 就是标量值），适合简单的异步取数场景：

```tsx
const store = createStore({
    age: 18,
    // 简单异步：结果原位写入 state.salary（标量值）
    salary: computed(
        async (scope) => {
            await delay(1000);
            return scope.age * 10;
        },
        ['age'],
        { initial: 100 },
    ),
});

// 默认解包：value 是计算结果标量值
// loading/error 来自第3个返回值 extras（由 observer 事件驱动）
const [salary, , { loading, error }] = useReactive('salary');
```

- `salary`直接是计算结果（`number`），可直接渲染。
- `loading`/`error`通过第 3 个返回值`extras`获取；`retry`/`timeout`/`progress`在简单异步下恒为初始值（不支持）。

**运行效果如下：**

<demo react="api/useReactiveAsyncSimple.tsx"/>

### 异步计算属性：高级异步（`asyncComputed`）

`asyncComputed(...)`（由`@autostorejs/plugins/asyncpro`提供）声明的计算属性，状态值本身是`AsyncComputedValue`对象（`{ value, loading, error, retry, timeout, progress, run, cancel }`），支持重试、超时倒计时、进度、取消等完整异步能力：

```tsx
import '@autostorejs/plugins/asyncpro';
import { asyncComputed } from '@autostorejs/plugins/asyncpro';

const store = createStore({
    age: 18,
    // 高级异步：state.salary 是 AsyncComputedValue 对象
    salary: asyncComputed(
        async (scope) => {
            await delay(1000);
            return scope.age * 10;
        },
        ['age'],
        { initial: 100 },
    ),
});

// 方式1（推荐）：默认解包取标量值，extras 提供响应式的 loading/retry/timeout/progress
const [salary, , { loading }] = useReactive('salary');

// 方式2：传入 async: true 返回完整 AsyncComputedValue 对象，可调用 run()/cancel()
const [salaryObj] = useReactive('salary', true);
salaryObj.run();     // 手动重新计算
salaryObj.cancel();  // 取消正在执行的计算
```

#### loading：加载状态

`extras.loading`在计算期间为`true`，完成后为`false`（状态树响应式）：

**运行效果如下：**

<demo react="api/useReactiveAsyncLoading.tsx"/>

#### retry：失败重试

配置`retry: [重试次数, 重试间隔ms]`后，计算失败会自动重试。`extras.retry`表示**剩余重试次数**，重试期间从配置值递减到`0`，响应式更新：

```tsx
salary: asyncComputed(
    async (scope) => {
        await delay(800);
        if (Math.random() < 0.6) throw new Error('请求失败'); // 模拟不稳定的接口
        return scope.age * 10;
    },
    ['age'],
    { initial: 100, retry: [3, 1000] }, // 失败后重试3次，间隔1秒
);
```

**运行效果如下：**

<demo react="api/useReactiveAsyncRetry.tsx"/>

#### timeout：超时倒计时

配置`timeout: [超时时间ms, 倒计时间隔]`后，`extras.timeout`在计算期间从倒计时初始值**持续递减**，响应式更新，适合展示"预计剩余时间"：

```tsx
salary: asyncComputed(
    async (scope) => {
        await delay(3000); // 模拟较长的计算过程
        return scope.age * 10;
    },
    ['age'],
    { initial: 100, timeout: [5000, 30] }, // 5秒超时，倒计时从30递减
);
```

**运行效果如下：**

<demo react="api/useReactiveAsyncTimeout.tsx"/>

### 两种异步的对齐总结

| 对比项 | 简单异步 `computed(async...)` | 高级异步 `asyncComputed(...)` |
| --- | --- | --- |
| 状态值形态 | 标量值（原位写入） | `AsyncComputedValue`对象 |
| `useReactive(path)` 默认解包 | ✓ 标量值 | ✓ 标量值 |
| `extras.loading`/`error` | ✓（observer 事件驱动） | ✓（状态树响应式） |
| `extras.retry`/`timeout`/`progress` | ✗（恒为初始值） | ✓（响应式更新） |
| `useReactive(path, true)` 完整对象 | ✗（取到的仍是标量） | ✓（可`run()`/`cancel()`） |
| 重试/超时/进度/取消 | ✗ | ✓ |

## 注意事项

:::warning 异步计算属性默认解包
`useReactive('xxx')`指向异步计算属性时，会自动追加`.value`依赖监听，返回的是**计算结果标量值**而非`AsyncComputedValue`对象。需要`loading`/`run`等完整能力时，要么传入第二参`true`，要么改用[useAsyncReactive](./use-async-reactive)。
:::

:::warning async:true 只对高级异步有效
第二参`async: true`返回完整`AsyncComputedValue`对象的能力**仅适用于高级异步计算属性**（`asyncComputed(...)`声明，状态值本身就是`AsyncComputedValue`对象）。

若路径指向**简单异步**（`computed(async ...)`声明，计算结果原位写入为标量值），传入`true`后取到的仍是标量值，其上没有`loading`/`run`等成员。简单异步请使用默认解包 + 第 3 返回值`extras`，或改用[useAsyncReactive](./use-async-reactive)（它会将简单异步包装为`AsyncComputedValue`形态返回）。
:::

:::warning 不要直接修改返回的 value
当路径指向对象时，返回的是响应式代理，直接修改其属性虽然能生效，但不会触发当前组件重渲染（hook 订阅的是路径本身）。需要驱动重渲染请调用`setValue`，或使用细粒度的`$('path')`信号组件。
:::

:::tip 优先使用细粒度路径
无参`useReactive()`会订阅整个状态树，任何风吹草动都会重渲染整个组件。请尽量传入精确的路径或 getter。
:::
