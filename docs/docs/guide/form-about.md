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
  
同步计算属性直接声明在状态中，本质上是一个普通的函数，,当`State`中的数据变化时，会自动触发计算属性的重新计算，将计算结果赋值给`State`中的对应属性。


```tsx | pure
import { createStore } from '@autostorejs/react';
import { ColorBlock,Button } from "components"

const { state, $, bind } = createStore({
  user:{
    firstName:"Zhang",
    lastName:"Fisher",
    fullName: (user)=>{
      return user.firstName+user.lastName
    } 
  }
})

export default ()=>{
  const [state,setState] = store.useState()
  return <div>
    <input {...bind("user.firstName")}>
    <input {...bind("user.lastName")}>
    <ColorBlock name="Full Name">{state.user.fullName}</ColorBlock>    
  </div>
}

```