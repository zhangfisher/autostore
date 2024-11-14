import React from 'react';
import { createStore } from '@autostorejs/react';
import { ColorBlock,Button,Input, Layout } from "x-react-components"

  const { reset,useFields,$,useWatch  } = createStore({
  user:{
    firstName:"Zhang",
    lastName:"Fisher",
    fullName:(user)=>{
      return user.firstName + " " + user.lastName
    } 
  }
} )

export default ()=>{
  const bindings = useFields({entry:'user'})

  const [ dirty ]  = useWatch<boolean>(({path})=>{   
            if(['firstName','lastName'].includes(path[path.length-1])){
                return true
            }
          },{initial:false})
  return (
    <Layout>
    <div>
      <Input label="FirstName" {...bindings.firstName}/>
      <Input label="lastName" {...bindings.lastName}/>
      <Button onClick={()=>{
          reset()        
      }}>Reset</Button>
    </div>     
    <div>
      <ColorBlock name="Dirty">{String(dirty)}</ColorBlock>
      <ColorBlock name="FullName">{$('user.fullName')}</ColorBlock>            
    </div>
  </Layout>)
}
 