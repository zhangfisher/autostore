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
  
`AutoStore`提供了一些方法帮助你更方便地实现表单输入控件的双向绑定。

## 简单绑定

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

### 基本用法

```tsx  
/**
 * title: useInput
 * description: 输入框的值会自动同步到状态中。
 */
import { createStore } from '@autostorejs/react';
import { ColorBlock,Button,Input } from "components"

const { state, $, bind, useState,useInput } = createStore({
  user:{
    firstName:"Zhang",
    lastName:"Fisher",
    vip:false, 
    job:"unknown"
  }
})

export default ()=>{
  const bindFirstName = useInput("user.firstName")
  const bindLastName = useInput("user.lastName")
  const bindVip = useInput("user.vip")
  const bindJob = useInput("user.job")
  return <div>    
    <Input label="First Name" {...bindFirstName}/>
    <Input label="last Name" {...bindLastName} />
    <Input type="checkbox" label="VIP" {...bindVip}/>
    <ColorBlock name="Job">    
      <select id="job" {...bindJob}>
        <option value="1">Engineer</option>
        <option value="2">Doctor</option>
        <option value="3">Teacher</option>
      </select>
    </ColorBlock>
    <ColorBlock name="First Name">{$('user.firstName')}</ColorBlock>
    <ColorBlock name="Last Name">{$('user.lastName')}</ColorBlock>        
    <ColorBlock name="VIP">{$('user.vip')}</ColorBlock>    
    <ColorBlock name="Job">{$('user.job')}</ColorBlock>
    <Button onClick={()=>{
      setFirstName("Zhang")
      setLastName("Fisher")
    }}>Reset</Button>
  </div>
}

```

### 组合双向绑定

支持自定义`getter`和`setter`方法。可以实现在输入框中输入多个值，甚至更复杂的双向数据绑定。

```tsx  
/**
 * title: onInput
 * description: FullName输入框中的firstName和lastName使用空格分开
 */
import { createStore } from '@autostorejs/react';
import { ColorBlock,Button,Input } from "components"

const { state, $, bind, useState,useInput } = createStore({
  user:{
    firstName:"Zhang",
    lastName:"Fisher" 
  }
})

export default ()=>{ 
  const bindFullName = useInput(
    (state)=>state.user.firstName+" "+state.user.lastName,
    // 解析输入的值
    (value,state)=>{
      const [firstName,lastName] = value.split(/\s+/)
      state.user.firstName = firstName
      state.user.lastName = lastName
    })
  return <div>    
    <Input label="FullName" {...bindFullName}/>
    <ColorBlock name="First Name">{$('user.firstName')}</ColorBlock>
    <ColorBlock name="Last Name">{$('user.lastName')}</ColorBlock>            
    <Button onClick={()=>{
      state.user.firstName= "Zhang"
      state.user.lastName = "Fisher"
    }}>Reset</Button>
  </div>
}
```

 


### 对象双向绑定


```tsx  
/**
 * title: onInput
 * description: 输入框的值会自动同步到状态中。
 */
import { createStore } from '@autostorejs/react';
import { ColorBlock,Button,Input } from "components"

const { state, $, bind } = createStore({
  user:{
    firstName:"Zhang",
    lastName:"Fisher",
    age:18,
    vip:false 
  }
})

export default ()=>{
  
  const bindUser = useInput("user")

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