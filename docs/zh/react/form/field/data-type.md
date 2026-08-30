# 字段数据类型

`input`输入控件的`value`**永远是字符串**，而状态中的数据往往是`number`、`boolean`等类型。如果直接绑定，输入`'123'`会把数字类型的`123`覆盖成字符串，污染状态数据。

`useField`内置了**类型驱动转换**机制：**以状态值的原始类型为依据**，自动将输入值转换为对应类型后写入状态，反之亦然。

```tsx
const { useField } = createStore({ count: 1 })
const countField = useField('count')
<input {...countField} />     // 输入 '123' -> 状态写入 123 (number)
```

## 默认转换逻辑

类型转换逻辑由`toState`和`fromState`的**默认实现**进行，无需任何配置。

**写入转换（`defaultToState`）**：`input`输入值 → 状态值

| 状态类型 | 输入值 | 写入结果 |
| --- | --- | --- |
| `number` | `'123'` / `'12.5'` | `123` / `12.5` |
| `number` | `'abc'` / `''`（转换为`NaN`） | `0` |
| `boolean` | `'true'` / `'false'` | `true` / `false` |
| `boolean` | 其他值 | `Boolean(输入值)`，如`'是'`→`true`、`''`→`false` |
| `string` | 任意（含`'0123'`、`'true'`） | **原样保持字符串**，不做类型猜测 |

**显示转换（`defaultFromState`）**：状态值 → `input`显示值

| 状态值 | 显示为 |
| --- | --- |
| `undefined` / `null` / `NaN` | 空字符串`''`（checkbox 则`checked: false`） |
| 其他一切值 | 原样返回 |

<demo react="form/field/fieldTypeDefault.tsx"
  title="默认类型转换：number/boolean/string/空值字段"
/>

上例中：

- `Age`是`number`：输入`'20'`写入`20`，清空或输入非数字写入`0`。
- `Vip`是`boolean`：checkbox 直接以`checked`读写`true/false`。
- `ZipCode`是`string`：输入`'075000'`**保持字符串**，不会因像数字而被转为`75000`。
- `Nickname`初始为`undefined`：见下节空值推断。

:::warning 类型依据是状态值本身
默认转换**不猜测**输入内容，只以状态值的`typeof`为依据。因此`string`状态的`'0123'`、`'true'`都不会被转成数字或布尔——这正是类型驱动转换与「启发式猜测输入内容」的本质区别。
:::

## 空值推断

当状态值为空值（`undefined` / `null` / `NaN`）时，没有类型依据可循，此时按**输入控件的类型**推断：

| 控件类型 | 推断类型 | 首次输入写入 |
| --- | --- | --- |
| `checkbox` | `boolean` | `checked`值（`true`/`false`） |
| `number` / `range` | `number` | 转换后的数字 |
| 其余（`text` / `textarea` / `select` / `radio`...） | `string` | 原样字符串 |

类型一经写入状态即**自锁定**，后续输入按状态类型转换，不再依赖控件推断。

## 重载 toState

通过`options.toState`可以**整体替换**默认的写入转换（不是叠加）：

```tsx
const fieldPrice = useField("order.price",{
    toState:(value)=>{                        // value 为 input 原始值
        const num = Number(String(value).replace(/,/g,''))
        return isNaN(num) ? 0 : num           // 返回值写入状态
    }
})
```

- `value`是**未经任何转换的原始值**（字符串或 checkbox 的`boolean`）。
- 可选第二参数`{ path, part, stateValue, event }`：`stateValue`为当前状态值，`event`为原始事件。
- 返回值直接写入状态。

<demo react="form/field/fieldTypeToState.tsx"
  title="重载 toState：千分位数字与自动去空白"
/>

## 重载 fromState

通过`options.fromState`可以**整体替换**默认的显示转换（状态值 → `input`显示值）：

```tsx
const fieldVip = useField("user.vip",{
    fromState:(value)=> value===true ? '是' : '否'
})
```

- 返回`undefined`时**保留原值**（退出转换），适合只想拦截部分值的场景。

`fromState`通常与`toState`**配对使用**，实现「状态保存原始类型、界面显示友好内容」的双向映射：

<demo react="form/field/fieldTypeFromState.tsx"
  title="fromState 与 toState 配对：boolean↔是/否、number↔中文等级"
/>

上例中状态里始终保存着`vip: true`（boolean）与`level: 2`（number），而界面上显示与输入的是`是/否`、`青铜/白银/黄金`。

:::tip 与 useForm 的转换是两套体系
`useField`的`toState`/`fromState`作用于**hook 生成的绑定对象**；[useForm](../form/use-form)的同名配置作用于`Form`组件内部的 DOM 扫描体系（`data-field`原生表单元素）。二者相互独立，混用时各自生效于各自的绑定方式。
:::
