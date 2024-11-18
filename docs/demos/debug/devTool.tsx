import React from "react"
import { createStore,computed } from '@autostorejs/react';
import { Button,ColorBlock } from "x-react-components"
import `@autostorejs/devtools`

const { state,useReactive,$ } = createStore({
  firstName:"Zhang",
  lastName:"Fisher",
  age:18,
  fullName:(user)=>user.firstName+user.lastName,
  salary:computed(async (user)=>{
    return user.age * 10
  },['age'])
},{
  debug:true,  // 配置调试模式
  id:"user"   // 配置id便以在devTools中显示
})
 

export default () => {
  const [age,setAge] = useReactive('age') 
  const [lastName,setLastName] = useReactive((state)=>state.lastName,(name,user)=>user.lastName=name) 

  return <div>    
      <ColorBlock>Fullname :{state.firstName}{' '}{lastName}</ColorBlock>
      <ColorBlock>Age :{age}</ColorBlock>
      <ColorBlock>Salary: {$('salary')}</ColorBlock>
      <Button onClick={()=>setAge(age+1)}>Age++</Button> 
      <Button onClick={()=>setLastName(lastName+'.')}>Change lastName</Button>
    </div>
}