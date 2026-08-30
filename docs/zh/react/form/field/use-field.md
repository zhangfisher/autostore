# useField

尽管只需要指定`data-field-name`属性就可以实现双向绑定。但是在实际开发中，我们通常需要更多的控制和功能，此时就需要使用`useField`来创建一个双向字段绑定对象。

`useField`可以实现如下功能：

- **支持多个状态值绑定到一个`input`上。**
- **支持将一个状态值拆分绑定到多个`input`上。**
- 支持在`input`和状态值之间进行双向转换。


## 关于

`useField`用来创建一个表单控件绑定对象，用来建立状态数据与`input`控件之间的双向绑定。

**`useField`签名如下：**

```ts

export interface UseFieldType<State extends Dict> {
    (): UseFieldBindings<ComputedState<State>>
    <Value>(
        selector: ObjectKeyPaths<ComputedState<State>>,
        options?:UseFieldOptions<Value>
    ): UseFieldBindings<Value>
    <Value>(
        getter: UseFieldGetter<Value,State>,
        setter:UseFieldSetter<Value,State>,
        options?:UseFieldOptions<Value>
    ):UseFieldBindings<Value>
    <Value>(
        getters: (ObjectKeyPaths<ComputedState<State>> | string[] | UseFieldGetter<Value,State>)[],
        setter:UseFieldSetter<Value,State>,
        options?:UseFieldOptions<Value>
    ):UseFieldBindings<Value>[]
}
```

`useField`支持如下的调用签名：

- **useField(selector,options?)**

通过`selector`指定一个状态路径，创建一个双向字段绑定对象。

- **useField(getter,setter,options?)**

通过`getter`和`setter`方法，创建一个动态字段绑定对象。
当要实现将多个状态值合并后绑定到一个`input`时使用。

- **useField(getters,setter,options?)**
 
当要实现将多个状态值绑定到多个`input`上或者进行单个状态数据的拆分时使用。
 

## 基本用法

可以直接通过`useField(<状态路径>)`来创建一个双向字段绑定对象，然后解构到`input`控件即可。

<demo react="form/field/useFieldBase.tsx"/>
 
- `状态路径`可以是任意深度的字符串或字符串数组，如`useField("order.user.name")`。
- `input[type='radio']`的字段需要指定`{type:'radio',values:['男','女']})`选项，然后在每一个`radio`上指定`value`值绑定。


## 合并状态绑定

可以实现将多个状态值合并后绑定到一个`input`

<demo react="form/field/useFieldCombo.tsx"/>

- 上例中，我们通过`getter`和`setter`方法，将`firstName & lastName`合并后绑定到`1`个`input`。
- `getter`方法用于将状态值合并成一个值。
- `setter`方法负责解析`input`值,并将其分解更新到状态中。

 
## 拆分状态绑定

也支持将多个状态值绑定到多个`input`上。

`useField`支持如下的调用签名：

```ts
useField<Value>(
    getters: (string | string[] | UseFieldGetter<Value,State>)[],
    setter:UseFieldSetter<Value,State>,
    options?:UseFieldOptions
):UseFieldBindings<Value>[]
```

- `getters`:  输入一个`getter`数组，每个`getter`可以是`字符串`或`字符串数组`的状态路径，也可以是一个`getter`函数。
- `setter`:  一个`setter`函数，用于解析`input`值并更新到状态中。

以下是简单的示例：

<demo react="form/field/useFieldIpAddress.tsx"/>

## 转换状态值

`useField`内置了**类型驱动转换**机制：以状态值的原始类型为依据，自动将`input`输入值转换为对应类型后写入状态。

<demo react="form/field/useFieldTypeConvert.tsx"
  title="number/boolean/string 字段自动类型转换"
/>

**默认转换规则(`defaultToState`)**:

| 状态类型 | 输入值 | 写入结果 |
|---|---|---|
| `number` | `'123'` / `'12.5'` | `123` / `12.5` |
| `number` | `'abc'` / `''`(产物为`NaN`) | `0` |
| `boolean` | `'true'` / `'false'` | `true` / `false` |
| `boolean` | 其他值 | `Boolean(输入值)` |
| `string` | 任意(含`'0123'`、`'true'`) | **原样保持字符串**，不做类型猜测 |
| `undefined`/`null`/`NaN` | — | 按控件类型推断：`checkbox`→`boolean`、`number/range`→`number`、其余→`string` |

- 空值字段(`undefined`/`null`/`NaN`)在首次输入时按控件类型推断，类型一经写入状态即自锁定，后续转换按状态类型进行。
- **显示侧**(`defaultFromState`)：空值(`undefined`/`null`/`NaN`)显示为空字符串，其余原样返回。

通过指定`options.toState`参数，可以**替换默认的写入转换**，将`input`值转换后写入状态。

**下例中输入的字符会被转换为大写再更新到状态**

<demo react="form/field/useFieldToState.tsx"
  title="将输入字符全部转换为大写"
/>

通过指定`options.fromState`参数，可以**替换默认的显示转换**，将状态值转换为`input`显示值。返回`undefined`时保留原值(退出转换)。

```ts
const fieldVip = useField("user.vip",{
    // 状态值 -> input 显示值
    fromState:(value)=> value===true ? '是' : '否',
    // input 值 -> 状态值(与 fromState 配对)
    toState:(value)=> value==='是' ? true : false
})
```


## 配置字段

`useField`支持如下的配置选项：

```ts 
type UseFieldOptions<Value=any>={
    name?       : string      // 可选的字段名称    
    type?       : 'radio' | 'checkbox' | 'select' | 'textarea' | 'input'
    // 仅当type = radio或checkbox时有效时有效
    values?     : any[] 
    toState?    : (value:any,options?:{path:string[] | undefined,part:number,stateValue?:any,event?:any})=>Value
    fromState?  : (stateValue:any,options?:{path:string[] | undefined,part:number})=>any
}
```

- `name`:  可选的字段名称，用于标识字段。
- `type`:  控件类型，支持`radio`、`checkbox`、`select`、`textarea`、`input`。
- `values`:  仅当`type = radio`或`checkbox`时有效时有效，用于指定`radio`或`checkbox`的值。
- `toState`:  将`input`原始值转换为状态值，默认实现见上表，可整体替换。
- `fromState`:  将状态值转换为`input`显示值，默认实现为空值显示空字符串，可整体替换。




:::warning 提示
**不需要`Form`组件包装**，`useField`也可以独立使用，用来实现表单控件（`radio/checkbox/select/textarea/input`）与状态之间的双向绑定。这在某些场景下会更加灵活方便。
:::