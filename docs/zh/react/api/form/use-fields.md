# useFields

一次性为**整棵（或部分）状态树**生成绑定 props 的 Hook。

与[useField](./use-field)逐个绑定不同，`useFields`返回一个深层 Proxy 对象，访问任意叶子属性即得到该路径的绑定 props，无需逐个声明。

## 签名

```ts
interface UseFieldsType<State extends Dict> {
    (options?: UseFieldsOptions): UseFieldsState<ComputedState<State>>;
}
```

**参数：**

| 参数 | 说明 |
| --- | --- |
| `options` | 以相对路径为 key 的字段选项映射，如`{ 'user.sex': { type: 'radio', values: ['男', '女'] } }` |

**返回值：** 与状态树同构的绑定树。叶子节点（原始值）为`UseFieldBindings`（`{ value, onChange, name, checked? }`），直接展开到输入控件：

```tsx
const fields = useFields();
<input {...fields.user.firstName} />
```

## 使用说明

- 访问`fields.a.b.c`时**按需惰性创建**绑定对象（内部通过 Proxy + 假绑定对象节约内存），未访问的属性不会产生开销。
- 路径指向异步计算属性（`AsyncComputedValue`）时，自动绑定到其`.value`子路径。
- 字段级选项通过`options`按路径配置，支持任意深度。

## 示例

```tsx
const { useFields } = createStore({
    user: {
        firstName: 'Zhang',
        lastName: 'Fisher',
        sex: '男',
    },
});

const fields = useFields({
    'user.sex': { type: 'radio', values: ['男', '女'] },
});

<input {...fields.user.firstName} />
<input {...fields.user.lastName} />
<input type="radio" {...fields.user.sex[0]} />男
```

**运行效果如下：**

<demo react="form/field/useFieldsBase.tsx"/>

**按路径配置字段选项：**

<demo react="form/field/useFieldsConfig.tsx"/>

## 注意事项

:::warning 必须在渲染期间访问
绑定树是响应式的，请在组件渲染期间访问`fields.xxx`（JSX 中或先取值再展开），不要把`fields`整体缓存到渲染外的作用域后再使用。
:::

:::tip
`useFields`内部使用`useSyncExternalStore`维护快照，批量更新（batch）时会合并处理，性能优于为每个字段单独调用`useField`。
:::
