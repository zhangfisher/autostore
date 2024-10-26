import React from "react"
import { createStore,computed } from '@autostorejs/react';
import { Button,ColorBlock } from "x-react-components"


const { state,useReactive,$ } = createStore({
    user:{
        firstName:"Zhang",
        lastName:"Fisher",
        age:18,
        fullName:(user)=>user.firstName+user.lastName,
        salary:computed(async (user)=>{
            return user.age * 10
        },['age'])
    },
})
 
export default () => {
  const [age,setAge] = useReactive<number>('user.age') 
  const [lastName,setLastName] = useReactive((state)=>state.user.lastName,(name,state)=>state.user.lastName=name) 

  return <div>    
      <ColorBlock name="Fullname">{state.user.firstName}{' '}{lastName}</ColorBlock>
      <ColorBlock name="Age">{age}</ColorBlock>
      <ColorBlock name="Salary">{$('user.salary')}</ColorBlock>
      <Button onClick={()=>setAge(age+1)}>Age++</Button> 
      <Button onClick={()=>setLastName(lastName+'.')}>Change lastName</Button>
    </div>
}

