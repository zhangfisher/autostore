# `Field` 字段组件

字段包装组件，由[useForm](../form/use-form)返回。当默认的表单字段（`<input>`+`name`）不能满足需求时，使用`Field`创建**自定义字段**：支持字段级校验、可见性控制、帮助信息、完全自定义渲染等。

## 签名

```tsx
type AutoFieldProps = {
    // 绑定的状态路径
    name: ObjectKeyPaths<ComputedState<State>>;
    // 字段级校验：支持同步/异步函数或 computed(...) 声明
    validate?: boolean | string | ((value) => boolean | string | Promise<boolean | string>) | ComputedDescriptorBuilder;
    // 是否可见/禁用/帮助信息：支持静态值或计算属性
    visible?: boolean | ComputedGetter<boolean>;
    disabled?: boolean | ComputedGetter<boolean>;
    help?: string | ComputedGetter<string>;
    // 完全自定义渲染
    render?: (props: {
        name: string;
        value: any;
        onChange: (e: any) => void;
        loading: boolean;
        error: Error | null;
        validate: boolean | string;
        dirty: boolean;
        help: string;
        visible: boolean;
        // ...AsyncComputedValue 全部成员
    }) => React.ReactNode;
};
```

## 使用说明

- `name`指定绑定的状态路径，`Field`内部通过信号机制细粒度订阅，字段值变化只重渲染该字段。
- `validate`是一个**计算属性**：值为静态`boolean`/`string`时直接生效；传函数或`computed(...)`时，值变化后自动执行校验。
- `render`接收字段全部状态（含`loading`/`error`/`validate`），适合封装业务字段组件（如带格式的 IP 输入框）。

## 示例

```tsx
const { Form, Field } = useForm({
    user: { name: 'fisher', age: 12 },
});

<Form>
    <Field
        name="user.age"
        validate={(value) => (value > 0 ? true : '年龄必须大于0')}
        help="请输入年龄"
        render={({ value, onChange, validate, help }) => (
            <div>
                <input value={value} onChange={onChange} />
                <span>{validate === true ? help : validate}</span>
            </div>
        )}
    />
</Form>
```

**运行效果如下：**

<demo react="form/field/fieldBase.tsx"/>

**自定义拆分字段：**

<demo react="form/field/splitCustomField.tsx"/>

更多用法参见[字段组件指南](/zh/react/form/field/field-component)。

## 注意事项

:::warning Field 须在 Form 内使用
`Field`依赖`Form`提供的上下文（表单上下文/校验器），在`Form`外使用无法正常工作。独立绑定字段请使用[useField](../form/use-field) Hook。
:::

:::tip validate 的三态返回
校验函数返回`true`表示通过；返回`false`表示失败（使用`errClass`/`errStyle`提示）；返回**字符串**表示失败并显示该错误信息。
:::
