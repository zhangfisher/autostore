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

<demo react="form/useFieldBase.tsx"/>
 
- `状态路径`可以是任意深度的字符串或字符串数组，如`useField("order.user.name")`。


## 合并状态绑定

可以实现将多个状态值合并后绑定到一个`input`

<demo react="form/useFieldCombo.tsx"/>

- 上例中，我们通过`getter`和`setter`方法，将`firstName & lastName`合并后绑定到`1`个`input`。
- `getter`方法用于将状态值合并成一个值。
- `setter`方法负责解析`input`值,并将其分解更新到状态中。



 
## 拆分状态绑定

也支持将多个状态值绑定到多个`input`上。

<demo react="form/useFieldIpAddress.tsx"/>


## 对象双向绑定

当`useField(<path>)`的路径指向的是一个对象时，会为该对象的每个属性创建一个双向绑定。可以直接使用。

```tsx  
/**
 * title: onInput
 * description: 输入框的值会自动同步到状态中。
 */
import { createStore } from '@autostorejs/react';
import { ColorBlock,Button,Input } from "x-react-components"

const { state, $, bind,useField } = createStore({
  user:{
    firstName:"Zhang",
    lastName:"Fisher",
    age:18,
    vip:false 
  }
})

export default ()=>{
  
  const bindUser = useField("user")

  return <div>    
    <Input label="First Name" {...bindUser.firstName}/>
    <Input label="last Name" {...bindUser.lastName} />
    <Input label="Age" {...bindUser.age}/>
    <Input type="checkbox" label="VIP" {...bindUser.vip} />

    <ColorBlock name="First Name">{$('user.firstName')}</ColorBlock>
    <ColorBlock name="Last Name">{$('user.lastName')}</ColorBlock>        
    <ColorBlock name="Age">{$('user.age')}</ColorBlock>        
    <ColorBlock name="VIP">{$('user.vip')}</ColorBlock>    
    <Button onClick={()=>{
      state.user.firstName= "Zhang"
      state.user.lastName = "Fisher"
      state.user.age = 18
      state.user.vip = false
    }}>Reset</Button>
  </div>
}

```

:::warning 注意 
使用对象双向绑定时，不支持深层嵌套对象。
:::

如果没有为`useField`指定路径，那么会绑定整个状态。但是不能支持嵌套成员。

```tsx  
/**
 * title: onInput
 * description: 双向绑定根状态。
 */
import { useStore } from '@autostorejs/react';
import { ColorBlock,Button,Input } from "x-react-components"

 
export default ()=>{

  const { state, $, bind,useField } = useStore({
      firstName:"Zhang",
      lastName:"Fisher",
      age:18,
      vip:false 
  })

  const bindUser = useField()

  return <div>    
    <Input label="First Name" {...bindUser.firstName}/>
    <Input label="last Name" {...bindUser.lastName} />
    <Input label="Age" {...bindUser.age}/>
    <Input type="checkbox" label="VIP" {...bindUser.vip} />

    <ColorBlock name="First Name">{$('firstName')}</ColorBlock>
    <ColorBlock name="Last Name">{$('lastName')}</ColorBlock>        
    <ColorBlock name="Age">{$('age')}</ColorBlock>        
    <ColorBlock name="VIP">{$('vip')}</ColorBlock>    
    <Button onClick={()=>{
      state.firstName= "Zhang"
      state.lastName = "Fisher"
      state.age = 18
      state.vip = false
    }}>Reset</Button>
  </div>
}

```


**注意**：不能支持嵌套成员，所以以下用法是不支持的。

```ts | pure {14-17}
export default ()=>{
  const { state, $, bind,useField } = useStore({
    user:{
      firstName:"Zhang",
      lastName:"Fisher",
      age:18,
      vip:false 
    }  
  })

  const bindUser = useField()

  return <div>    
    <Input label="First Name" {...bindUser.user.firstName}/>      // ❌ 不支持
    <Input label="last Name" {...bindUser.user.lastName} />       // ❌ 不支持
    <Input label="Age" {...bindUser.user.age}/>                   // ❌ 不支持
    <Input type="checkbox" label="VIP" {...bindUser.user.vip} />  // ❌ 不支持
  </div>
}
```

