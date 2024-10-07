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

`useFormBindings`是创建可绑定表单的终极解决方案,可以让更方便将`AutoStore`的状态和表单控件绑定在一起，代码更加简洁。

## 基本用法

```tsx   
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
    <Input type="checkbox" label="VIP" {...bindings.user.vip} />
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

- 使用`useFormBindings`创建的嵌套绑定对象，可以支持嵌套成员,直接根据路径绑定到表单控件上即可。
- `useFormBindings`创建的绑定对象，会自动同步状态中的值到表单控件上。

## 收集表单数据

也可以使用`useFormBindings`来收集表单数据，通过`ref`属性绑定到`form`元素上，然后通过`bindings.ref`来获取`form`元素的引用。

`useFormBindings`会侦听表单的`change`事件，然后自动同步表单数据到状态中。


```tsx | pure
import { useStore } from '@autostorejs/react';
import { ColorBlock,Button,Input,Card } from "x-react-components"
 
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
    <Card title="用户表单">
    <form ref={bindings.ref}>
      <Input name="user.firstname" label="First Name" />
      <Input name="user.lastname" label="last Name"  />
      <Input name="age" label="Age" />
      <Input type="checkbox" label="VIP"/>
    </form>
    </Card>
    <ColorBlock name="First Name">{$('user.firstName')}</ColorBlock>
    <ColorBlock name="Last Name">{$('user.lastName')}</ColorBlock>        
    <ColorBlock name="Age">{$('user.age')}</ColorBlock>        
    <ColorBlock name="VIP">{$('user.vip')}</ColorBlock>    
    <div></div>    
  </div>
}

```