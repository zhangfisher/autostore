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
  const fields = useFields()

  const [ dirty ]  = useWatch<boolean>(({path})=>{   
            if(['firstName','lastName'].includes(path[path.length-1])){
                return true
            }
          },{initial:false})
  return (
    <Layout>
    <div>
      <Input label="FirstName" {...fields.user.firstName}/>
      <Input label="lastName" {...fields.user.lastName}/>
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
 