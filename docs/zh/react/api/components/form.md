# `Form` 表单组件

表单容器组件，由[useForm](../form/use-form)返回，负责收集内部输入控件并与 store 双向同步。

`Form`基于原生`<form>`元素封装，支持全部原生 form 属性（`method`/`action`/`className`等），并扩展了数据提交能力。

## 签名

```ts
type AutoFormProps<State> = React.PropsWithChildren<
    React.FormHTMLAttributes<HTMLFormElement> & {
        // 表单入口路径：提交/重置时只处理该路径下的数据
        entry?: string;
        // 提交前校验钩子，返回 false 阻止提交
        onValidate?: (state: State) => boolean;
        // 提交处理函数（校验通过后触发）
        onSubmit?: (state: ComputedState<State>, e: SubmitEvent) => void | Promise<void> | boolean;
    }
>;

type AutoForm<State> = React.FunctionComponent<AutoFormProps<State>>;
```

## 使用说明

- 内部输入控件通过`name`属性（值为**状态路径**）与 store 关联，如`<Input name="user.age" />`。
- `onSubmit`接收的`state`是提交时刻的状态快照，支持 async；返回`false`可阻止默认行为。
- `entry`指定入口路径时，多个表单可绑定同一 store 的不同子树。
- 提交期间`useForm`返回的`submiting`为`true`。

## 示例

```tsx
const { Form, state, submiting, submit } = useForm({
    user: { name: '张三', age: 18, email: 'fisher@china.com' },
});

<Form
    onSubmit={async (state) => {
        await fetch('/api/user', { method: 'POST', body: JSON.stringify(state) });
    }}
>
    <Input name="user.name" label="Name" />
    <Input name="user.age" label="Age" type="number" />
    <Input name="user.email" label="Email" />
    <button type="submit" disabled={submiting}>提交</button>
</Form>
```

**运行效果如下：**

<demo react="form/form/base.tsx"/>

**提交处理：**

<demo react="form/form/formSubmit.tsx"/>

## 注意事项

:::warning name 必须是合法状态路径
`Form`内部依据输入控件的`name`定位状态，`name`必须是 store 中的完整路径（如`user.age`），路径错误时数据不会被收集。
:::

:::tip
调用`useForm()`返回的`submit()`方法等价于触发表单的 submit 事件，会走相同的校验与提交流程。
:::
