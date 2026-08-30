# useForm

创建表单对象的 Hook，实现表单元素与 store 的双向绑定。

`useForm`从`@autostorejs/react`包直接导入，可以基于传入的状态对象**内部创建**一个表单 store，也可以绑定一个已存在的 store。

## 签名

```ts
// 1. 传入初始状态，内部创建 store
function useForm<State extends Dict>(
    state: State,
    options?: UseFormOptions<State>,
): AutoFormObject<State>;
// 2. 绑定已存在的 store
function useForm<State extends Dict>(
    store: ReactAutoStore<State> | AutoStore<State>,
    options?: UseFormOptions<State>,
): AutoFormObject<State>;
```

**主要选项（`UseFormOptions`）：**

| 选项 | 类型 | 说明 |
| --- | --- | --- |
| `ref` | `RefObject<HTMLFormElement>` | 表单元素 ref，默认自动创建 |
| `entry` | `string` | 表单入口路径；提交/重置时只处理该路径下的数据 |
| `validAtInit` | `boolean` | 初始化时是否校验，默认`true` |
| `validate` | `(path, value, part, fieldEle) => boolean \| string` | 输入校验；返回`false`/错误字符串时阻止写入状态 |
| `fromState` | `(path, value, input) => any` | 状态值 → 输入控件值的转换 |
| `toState` | `(path, value, input) => any` | 输入控件值 → 状态值的转换 |
| `errClass` | `string` | 校验失败时附加到输入控件的类名 |
| `errStyle` | `[selector, style]` | 校验失败时向`selector`指向元素注入的样式 |
| `customReport` | `boolean` | 自定义错误报告方式 |

（完整选项请参见[表单文档](/zh/react/form/about)。）

**返回值（`AutoFormObject`）：**

| 成员 | 类型 | 说明 |
| --- | --- | --- |
| `Form` | 组件 | 表单容器组件，见[Form 组件](../components/form) |
| `Field` | 组件 | 字段包装组件，见[Field 组件](../components/field) |
| `state` | `ComputedState<State>` | 响应式状态树 |
| `valid` | `boolean` | 表单是否校验通过 |
| `dirty` | `boolean` | 表单是否被修改过 |
| `submiting` | `boolean` | 是否正在提交 |
| `error` | `any` | 提交错误 |
| `submit` | `() => Promise` | 触发表单提交 |
| `reset` | `() => void` | 重置表单（回到初始值并清除`dirty`） |
| `validator` | `Validator` | 校验器实例 |
| 其余 | — | 透传 store 的全部成员（`$`、`useReactive`、`watch`...） |

## 使用说明

- `useForm`返回对象是 store 的超集：解构后可直接使用`state`、`$`、`useReactive`等全部 store 能力。
- 提交表单通过`<Form onSubmit={...}>`声明处理函数，或调用返回值的`submit()`方法。
- `reset()`会重置到**初始状态**并将`dirty`恢复为`false`。

## 示例

```tsx
import { useForm } from '@autostorejs/react';

const { Form, Field, state, dirty, submit } = useForm({
    user: {
        firstName: 'Zhang',
        lastName: 'Fisher',
        age: 18,
    },
});

<Form onSubmit={() => console.log('submit', state)}>
    <Field name="firstName" />
    <Field name="age" type="number" />
    <button type="submit">提交</button>
</Form>;
```

**运行效果如下：**

<demo react="api/useForm.tsx"/>

## 注意事项

:::warning state 不驱动组件重渲染
返回值中的`state`是 store 的响应式`Proxy`引用，身份恒定。直接渲染`<JsonView data={state} />`时，编辑表单字段只会更新 Proxy 内部的值，**不会触发当前组件重渲染**（`dirty`只在首次修改时从`false`变`true`触发一次），视图于是停留在旧值。

需要在组件中实时展示状态，请改用返回的`useReactive`订阅：`const [state] = useReactive()`，任何字段变化都会触发重渲染。
:::

:::warning store 生命周期
传入状态对象时，`useForm`内部创建的 store 在组件卸载时自动销毁；传入已有 store 时，**不会**在卸载时销毁该 store（由创建方管理）。
:::

:::tip 提交拦截
`validate`返回`false`或错误字符串时，输入值不会写入状态，`valid`变为`false`；`Form`的`onSubmit`在校验通过时才会触发。
:::
