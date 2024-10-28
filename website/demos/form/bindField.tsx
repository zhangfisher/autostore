import React from "react"
import { createStore } from '@autostorejs/react';
import { ColorBlock,Button,Input,JsonView } from "x-react-components" 

const { $, bind, useReactive } = createStore({
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
  const [firstName,setFirstName] = useReactive("user.firstName")
  const [lastName,setLastName] = useReactive("user.lastName")
  const [vip ] = useReactive("user.vip")
  const [state] = useReactive() 
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
    <div>   
        <JsonView data={state}/>
    </div>
  </div>
}