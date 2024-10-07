---
group:
  title: 表单
  order: 5
order: 2 
title: useInput
demo:
  tocDepth: 5
toc: content
---



# useInput

使用`useInput`进行双向绑定更加简单。

## 基本用法

```tsx  
/**
 * title: useInput
 * description: 输入框的值会自动同步到状态中。
 */
import { createStore } from '@autostorejs/react';
import { ColorBlock,Button,Input } from "x-react-components"

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

## 组合双向绑定

支持自定义`getter`和`setter`方法。可以实现在输入框中输入多个值，甚至更复杂的双向数据绑定。

```tsx  
/**
 * title: onInput
 * description: FullName输入框中的firstName和lastName使用空格分开
 */
import { createStore } from '@autostorejs/react';
import { ColorBlock,Button,Input } from "x-react-components"

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
## 对象双向绑定

当`useInput(<path>)`的路径指向的是一个对象时，会为该对象的每个属性创建一个双向绑定。可以直接使用。

```tsx  
/**
 * title: onInput
 * description: 输入框的值会自动同步到状态中。
 */
import { createStore } from '@autostorejs/react';
import { ColorBlock,Button,Input } from "x-react-components"

const { state, $, bind,useInput } = createStore({
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

:::warning{title=注意}
使用对象双向绑定时，不支持深层嵌套对象。
:::

如果没有为`useInput`指定路径，那么会绑定整个状态。但是不能支持嵌套成员。

```tsx  
/**
 * title: onInput
 * description: 双向绑定根状态。
 */
import { useStore } from '@autostorejs/react';
import { ColorBlock,Button,Input } from "x-react-components"

 
export default ()=>{

  const { state, $, bind,useInput } = useStore({
      firstName:"Zhang",
      lastName:"Fisher",
      age:18,
      vip:false 
  })

  const bindUser = useInput()

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
  const { state, $, bind,useInput } = useStore({
    user:{
      firstName:"Zhang",
      lastName:"Fisher",
      age:18,
      vip:false 
    }  
  })

  const bindUser = useInput()

  return <div>    
    <Input label="First Name" {...bindUser.user.firstName}/>      // ❌ 不支持
    <Input label="last Name" {...bindUser.user.lastName} />       // ❌ 不支持
    <Input label="Age" {...bindUser.user.age}/>                   // ❌ 不支持
    <Input type="checkbox" label="VIP" {...bindUser.user.vip} />  // ❌ 不支持
  </div>
}
```

