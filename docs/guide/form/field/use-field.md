# useField

## 关于

`bind`绑定控件的功能比较简单，`useField`进行双向绑定更加简单。

**`useField`签名如下：**

```ts
type UseFieldBindings<Value> = Value extends Dict ? Record<keyof Value,{
    value:any
    onChange:(e:any)=>void
}> : Value

type UseFieldOptions={}

type UseFieldGetter<Value,State extends Dict>= (state:ComputedState<State>)=>Value
type UseFieldSetter<Value,State extends Dict>= (input:Value,state:ComputedState<State>)=>void

interface UseFieldType<State extends Dict> {
    (): UseFieldBindings<ComputedState<State>>
    <Value>(selector: string,options?:UseFieldOptions): UseFieldBindings<Value>
    <Value>(
        getter: UseFieldGetter<Value,State>,
        setter:UseFieldSetter<Value,State>,
        options?:UseFieldOptions
    ):UseFieldBindings<Value>
}
```

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

通过指定`options.toState`和`options.fromState`参数，可以在`input`和状态值之间进行转换。

- **下例中输入的字符会被转换为大写再更新到状态**

<demo react="form/field/useFieldToState.tsx"
  title="将输入字符全部转换为大写"
/>