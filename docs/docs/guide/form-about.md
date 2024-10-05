---
group:
  title: 表单
  order: 5
order: 5 
title: 双向绑定
demo:
  tocDepth: 5
toc: content
---



## 关于
  
`AutoStore`提供了一些方法帮助你更方便地实现表单绑定。

## 双向绑定

```tsx  
/**
 * title: onInput
 * description: 输入框的值会自动同步到状态中。
 */
import { createStore } from '@autostorejs/react';
import { ColorBlock,Button,Input } from "components"

const { state, $, bind, useState } = createStore({
  user:{
    firstName:"Zhang",
    lastName:"Fisher",
    vip:false,
    fullName: (user)=>{
      return user.firstName+user.lastName
    } 
  }
})

export default ()=>{
  const [firstName,setFirstName] = useState("user.firstName")
  const [lastName,setLastName] = useState("user.lastName")
  const [vip,setVip ] = useState("user.vip")
  return <div>    
    <Input label="First Name" {...bind("user.firstName")} value={firstName}/>
    <Input label="last Name" {...bind("user.lastName")} value={lastName}/>
    <Input type="checkbox" label="VIP" {...bind("user.vip")} value={vip}/>

    <ColorBlock name="First Name">{$('user.firstName')}</ColorBlock>
    <ColorBlock name="Last Name">{$('user.lastName')}</ColorBlock>        
    <ColorBlock name="Full Name">{$('user.fullName')}</ColorBlock>
    <ColorBlock name="VIP">{$('user.vip')}</ColorBlock>    
    <Button onClick={()=>{
      setFirstName("Zhang")
      setLastName("Fisher")
    }}>Reset</Button>
  </div>
}

```

## useInput

使用`useInput`进行双向绑定更加简单。

```tsx  
/**
 * title: onChange
 * description: 输入框的值会自动同步到状态中。
 */
import { createStore } from '@autostorejs/react';
import { ColorBlock,Button,Input } from "components"

const { state, $, bind, useState } = createStore({
  user:{
    firstName:"Zhang",
    lastName:"Fisher",
    vip:false,
    fullName: (user)=>{
      return user.firstName+user.lastName
    } 
  }
})

export default ()=>{
  const [firstName,setFirstName] = useState("user.firstName")
  const [lastName,setLastName] = useState("user.lastName")
  const [vip,setVip ] = useState("user.vip")
  return <div>    
    <Input label="First Name" {...bind("user.firstName")} value={firstName}/>
    <Input label="last Name" {...bind("user.lastName",{debounce:20 })} value={lastName}/>
    <Input type="checkbox" label="VIP" {...bind("user.vip")} value={vip}/>

    <ColorBlock name="First Name">{$('user.firstName')}</ColorBlock>
    <ColorBlock name="Last Name">{$('user.lastName')}</ColorBlock>        
    <ColorBlock name="Full Name">{$('user.fullName')}</ColorBlock>
    <ColorBlock name="VIP">{$('user.vip')}</ColorBlock>    
    <Button onClick={()=>{
      setFirstName("Zhang")
      setLastName("Fisher")
    }}>Reset</Button>
  </div>
}

```