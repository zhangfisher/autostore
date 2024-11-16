# useField

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

通过指定`options.toState`和`options.fromState`参数，可以在`input`和状态值之间进行转换。

- **下例中输入的字符会被转换为大写再更新到状态**

<demo react="form/field/useFieldToState.tsx"
  title="将输入字符全部转换为大写"
/>


## 配置字段

`useField`支持如下的配置选项：

```ts 
type UseFieldOptions<Value=any>={
    name?       : string      // 可选的字段名称    
    type?       : 'radio' | 'checkbox' | 'select' | 'textarea' | 'input'
    // 仅当type = radio或checkbox时有效时有效
    values?     : any[] 
    toState?    : (value:string,options?:{path:string[] | undefined,part:number})=>Value    // 将数据更新到状态中时调用进行转换
}
```

- `name`:  可选的字段名称，用于标识字段。
- `type`:  控件类型，支持`radio`、`checkbox`、`select`、`textarea`、`input`。
- `values`:  仅当`type = radio`或`checkbox`时有效时有效，用于指定`radio`或`checkbox`的值。
- `toState`:  用于将`input`值转换为状态值的函数。