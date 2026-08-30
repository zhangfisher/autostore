# API 总览

`@autostorejs/react` 提供的 API 可分为四大类：

| 分类 | 说明 |
| --- | --- |
| **Hooks** | 在组件中访问状态、创建计算属性、监听变化的 React Hooks |
| **表单 Hooks** | 表单双向绑定相关的 Hooks |
| **组件** | 信号组件与表单组件 |
| **创建函数** | 创建 Store 的工厂函数 |

## Hooks

大部分 Hooks 并不需要从包中导入，而是通过`createStore`返回的 store 实例直接访问：

```ts
const store = createStore({...})
// 解构使用
const { state, useReactive, $, useWatch, ... } = store
// 或通过实例访问
store.useReactive('user.age')
```

| API | 说明 |
| --- | --- |
| [useStore](./hooks/use-store) | 在组件中创建一个组件生命周期内自动销毁的 store |
| [useReactive](./hooks/use-reactive) | 访问状态数据，状态变化时自动重渲染 |
| [useAsyncReactive](./hooks/use-async-reactive) | 访问异步计算属性，返回完整的`AsyncComputedValue`对象 |
| [useWatch](./hooks/use-watch) | 监听状态变化，返回`[value,setValue]`，组件销毁时自动取消监听 |
| [useDeps](./hooks/use-deps) | 收集路径或函数的依赖，返回依赖路径数组 |
| [useComputed](./hooks/use-computed) | 在组件内动态创建计算属性并返回其值 |
| [useComputedObject](./hooks/use-computed-object) | 在组件内动态创建计算属性对象，手动控制其生命周期 |

:::warning 已废弃命名
早期版本的`useState`/`useAsyncState`已废弃：`useState`与 React 内置 Hook 重名（使用时经常需要重命名），统一改用[useReactive](./hooks/use-reactive)；`useAsyncState`随之统一为[useAsyncReactive](./hooks/use-async-reactive)。不考虑兼容性，新项目请直接使用新命名。
:::

## 表单 Hooks

| API | 说明 |
| --- | --- |
| [useForm](./form/use-form) | 创建表单对象，实现表单与 store 的双向绑定 |
| [useField](./form/use-field) | 为单个表单控件提供绑定 props |
| [useFields](./form/use-fields) | 一次性为整个（或部分）状态树生成绑定 props |

## 组件

| API | 说明 |
| --- | --- |
| [`$` / `signal`](./components/signal) | 信号组件，细粒度局部渲染 |
| [`Form`](./components/form) | 表单组件，配合`useForm`使用 |
| [`Field`](./components/field) | 字段包装组件，配合`useField`使用 |

## 创建函数

| API | 说明 |
| --- | --- |
| [createStore](./factory/create-store) | 创建一个`ReactAutoStore`实例 |

## 类型工具

以下类型工具在编写 TypeScript 代码时非常有用，均从`@autostorejs/react`（或`autostore`）导入：

| 类型 | 说明 |
| --- | --- |
| `ComputedState<State>` | 状态的类型视图：同步计算属性展开为返回值类型、异步计算属性展开为`AsyncComputedValue<Value>` |
| `ObjectKeyPaths<State>` | 状态树所有合法路径的字面量联合类型 |
| `GetTypeByPath<State, Path>` | 由路径推导状态值的类型 |
| `AsyncComputedValue<Value>` | 异步计算属性值的形态：`{ value, loading, error, timeout, retry, progress, run, cancel }` |
| `StateGetter` / `UseReactiveGetter` | getter 函数类型：`(state) => Value` |
| `UseReactiveExtras` | `useReactive` 第 3 个返回值的类型 |

:::warning 注意
`@autostorejs/react` 会转出`autostore`核心包的全部导出，因此`computed`、`watch`、`asyncComputed`等核心 API 可直接从`@autostorejs/react`导入，其用法请参考[核心库文档](/zh/store/)。
:::
