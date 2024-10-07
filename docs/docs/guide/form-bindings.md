---
group:
  title: 表单
  order: 5
order: 3 
title: useFormBindings
demo:
  tocDepth: 5
toc: content
---
 

# useFormBindings

`useFormBindings`是创建可绑定表单的终极解决方案,可以让更方便将`AutoStore`的状态和表单控件绑定在一起。


## 基本用法

```tsx  
/**
 * title: onInput
 * description: 双向绑定根状态。
 */
import { useStore } from '@autostorejs/react';
import { ColorBlock,Button,Input } from "x-react-components"
 
export default ()=>{

  const { state, $, useFormBindings } = useStore({
    user:{
      firstName:"Zhang",
      lastName:"Fisher",
      age:18,
      vip:false 
    }
  })

  const bindings = useFormBindings()

  return <div>    
    <Input label="First Name" {...bindings.user.firstName}/>
    <Input label="last Name" {...bindings.user.lastName} />
    <Input label="Age" {...bindings.user.age}/>
    <Input type="checkbox" label="VIP" {...bindUser.user.vip} />
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

- 使用`useFormBindings`创建的嵌套绑定对象，可以支持嵌套成员。直接根据路径绑定到表单控件上即可。
- `useFormBindings`创建的绑定对象，会自动同步状态中的值到表单控件上。
