# useField

为单个表单控件提供**绑定 props** 的 Hook。返回值可直接展开到`<input>`等表单元素上，实现双向绑定。

`useField`通过 store 实例访问：`store.useField(...)`。

## 签名

```ts
interface UseFieldType<State extends Dict> {
    // 1. 按路径绑定
    <Value>(selector: ObjectKeyPaths<ComputedState<State>>,
        options?: UseFieldOptions<Value>
    ): UseFieldBindings<Value>;
    // 2. getter/setter 派生绑定
    <Value>(getter: (state) => Value,
        setter: (input: { value, path, part }, state) => void,
        options?: UseFieldOptions<Value>
    ): UseFieldBindings<Value>;
    // 3. 多段绑定（radio/checkbox 等）
    <Value>(getters: (path | string[] | getter)[],
        setter: UseFieldSetter<Value, State>,
        options?: UseFieldOptions<Value>
    ): UseFieldBindings<Value>[];
}
```

**返回值（`UseFieldBindings`）：** `{ name, value, onChange, checked? }`，直接展开到输入控件：

```tsx
<input {...bindPrice} />
```

**选项（`UseFieldOptions`）：**

| 选项 | 类型 | 说明 |
| --- | --- | --- |
| `name` | `string` | 字段名，默认取路径 |
| `type` | `'radio' \| 'checkbox' \| 'select' \| 'textarea' \| 'input'` | 控件类型 |
| `values` | `any[]` | 多段值列表（radio/checkbox 每段的取值） |
| `toState` | `(value, { path, part, stateValue, event }) => Value` | 输入值写入状态前的转换，默认实现见[字段数据类型](/zh/react/form/field/data-type) |
| `fromState` | `(stateValue, { path, part }) => any` | 状态值转换为输入显示值；返回`undefined`保留原值 |

## 使用说明

- **路径绑定**：`useField('order.price')`返回该路径的绑定 props。
- **getter/setter**：绑定派生值（如`firstName + ' ' + lastName`），setter 负责拆分写回。
- **radio/checkbox**：通过`options.values`声明每段取值，返回的绑定对象支持按下标访问各段：`bindSex[0]`、`bindSex[1]`。

## 示例

```tsx
const { useField } = createStore({
    user: { firstName: 'Zhang', lastName: 'Fisher', age: 18, sex: '男' },
});

// 单值绑定
const firstNameField = useField('user.firstName');
<input {...firstNameField} />

// radio 多段绑定
const sexField = useField('user.sex', { type: 'radio', values: ['男', '女'] });
<input type="radio" {...sexField[0]} />男
<input type="radio" {...sexField[1]} />女
```

**运行效果如下：**

<demo react="form/field/useFieldBase.tsx"/>

**多段绑定（radio/checkbox）：**

<demo react="form/field/useFieldCombo.tsx"/>

**getter/setter 拆分绑定：**

<demo react="form/field/useFieldIpAddress.tsx"/>

## 数据类型转换

`input`的`value`永远是字符串，而状态中往往是`number`/`boolean`等类型。`useField`内置**类型驱动转换**：以**状态值的原始类型**为依据自动转换，无需配置。

**默认写入转换（`defaultToState`，input 值 → 状态值）：**

| 状态类型 | 输入值 | 写入结果 |
| --- | --- | --- |
| `number` | `'123'` / `'12.5'` | `123` / `12.5` |
| `number` | `'abc'` / `''`（转换为`NaN`） | `0` |
| `boolean` | `'true'` / `'false'` | `true` / `false` |
| `boolean` | 其他值 | `Boolean(输入值)` |
| `string` | 任意（含`'0123'`、`'true'`） | 原样保持字符串，不做类型猜测 |
| `undefined`/`null`/`NaN` | — | 按控件类型推断：`checkbox`→`boolean`、`number/range`→`number`、其余→`string` |

**默认显示转换（`defaultFromState`，状态值 → input 显示值）：** 空值（`undefined`/`null`/`NaN`）显示为空字符串，其余原样返回。

<demo react="form/field/fieldTypeDefault.tsx"
  title="默认类型转换：number/boolean/string/空值字段"
/>

`toState`/`fromState`可**整体替换**默认实现，详见[字段数据类型](/zh/react/form/field/data-type)。

**重载`toState`（如支持千分位输入）：**

<demo react="form/field/fieldTypeToState.tsx"
  title="重载 toState：千分位数字与自动去空白"
/>

**重载`fromState`（与`toState`配对，状态保存原始类型、界面显示友好内容）：**

<demo react="form/field/fieldTypeFromState.tsx"
  title="fromState 与 toState 配对：boolean↔是/否、number↔中文等级"
/>

## 注意事项

:::warning 返回的是绑定 props 而非状态
`useField`返回的`value`是**快照值**，配合受控组件使用。不要通过修改`bind.value`来更新状态——只能通过用户输入（`onChange`）或直接修改`store.state`触发更新。
:::

:::tip 批量绑定时用 useFields
需要绑定大量字段时，逐个调用`useField`比较繁琐，可改用[useFields](./use-fields)一次性生成整棵绑定树。
:::
