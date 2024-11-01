import React from 'react';
import { delay,createStore,computed } from '@autostorejs/react';
import { Input,ColorBlock } from "x-react-components"

const { useAsyncReactive, useReactive,state, bind } = createStore({
  user:{
    firstName:"Zhang",
    lastName:"Fisher",
    fullName: computed(async (user)=>{
      await delay(1000)       // 模拟异步计算
      return user.firstName+' '+user.lastName  
    },
    ["user.firstName","./lastName"],{ // 指定依赖
      initial:"ZhangFisher"
    }) 
  }
},{
  id:"async-base", 
  debug:true // 打开Redux devtools
})

export default ()=>{ 
  const [firstName] =  useReactive("user.firstName") 
  const [lastName] =  useReactive("user.lastName") 
  const fullName = useAsyncReactive("user.fullName")  
  return <>
    <Input label="firstName" value={firstName} {...bind('user.firstName')} />
    <Input label="lastName" value={lastName} {...bind('user.lastName')} />
    <ColorBlock name="FullName" loading={fullName.loading}>{fullName.value}</ColorBlock>
    </>
}