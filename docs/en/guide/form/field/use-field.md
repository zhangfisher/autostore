# usefield
Although you only need to specify `data-field-name` the attribute can achieve two -way binding. But in actual development, we usually need more control and functions. At this time, we need to use it `useField` create a two -way field binding object.

 `useField` the following functions can be implemented:

- **Support multiple state values ​​to be bound to one`input`superior.** 
- **Support to split one state value to multiple`input`superior.** 
- Support `input` by -directional conversion with status values.


## about

 `useField` it is used to create a form control binding object to establish status data and `input` two -way binding between controls.

 **`useField`The signature is as follows:** 

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

 `useField` support the following call signature:

- **Usefield (Selector, Options?)** 

pass `selector` specify a state path and create a two -way field binding object.

- **Usefield (Getter, Setter, Options?)** 

pass `getter` and `setter` methods to create a dynamic field binding object.
When you want to achieve multiple state values ​​merged to one `input` use.

- **Usefield (Getters, Setter, Options?)** 
 
When it is realized to bind multiple state values ​​to multiple `input` use or perform a single state data when splitting.
 

## Basic usage

Can directly pass `Usefield (<State path>)` come to create a two -way field binding object, and then deconil `input` the control.

<demo react ="form/field/useFieldBase.tsx"/>
 
- `State path` it can be arbitrarily depth string or string array, such as `useField("order.user.name")`.
- `input[type='radio']` the field needs to be specified `{Type: 'Radio', Values: ['Male', 'Female']})` options, and then in each one `radio` specify `value` binded.


## Combined state binding

You can realize the combination of multiple state values ​​and bind it to one `input` 

<demo react ="form/field/useFieldCombo.tsx"/>

- In the previous example, we pass `getter` and `setter` methods, will `firstName & lastName` binded after merging `1` indivual `input`.
- `getter` methods used to merge the status value into a value.
- `setter` the method is responsible for analysis `input` value and update it into the state.

 
## Disassembling state binding

It also supports binding multiple status values ​​to multiple `input` superior.

 `useField` support the following call signature:

```ts
useField<Value>(
    getters: (string | string[] | UseFieldGetter<Value,State>)[],
    setter:UseFieldSetter<Value,State>,
    options?:UseFieldOptions
):UseFieldBindings<Value>[]
```

- `getters`: Enter one `getter` array, each `getter` may `String` or `String array` the state path can also be one `getter` function.
- `setter`:  one `setter` function for analysis `input` the value is updated to the state.

The following is a simple example:

<demo react ="form/field/useFieldIpAddress.tsx"/>

## Conversion state value

Be specified `options.toState` parameter, you can `input` write the state after the value conversion.

 **The characters entered in the following example will be converted to uppercase and then updated to the state** 

<demo react ="form/field/useFieldToState.tsx" 
Title = "Convert all the input characters into a capital" 
/>


## Configuration field

 `useField` support the following configuration options:

```ts 
type UseFieldOptions<Value=any>={
    name?       : string      // 可选的字段名称    
    type?       : 'radio' | 'checkbox' | 'select' | 'textarea' | 'input'
    // 仅当type = radio或checkbox时有效时有效
    values?     : any[] 
    toState?    : (value:string,options?:{path:string[] | undefined,part:number})=>Value    // 将数据更新到状态中时调用进行转换
}
```

- `name`: Optional field names for identifying fields.
- `type`: Control type, support `radio`,`checkbox`,`select`,`textarea`,`input`.
- `values`:`type = radio` or `checkbox` effective time is effective, used to specify `radio` or `checkbox` value.
- `toState`: For the `input` the value is converted to a function of the state value.

