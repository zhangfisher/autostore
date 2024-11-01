import React from 'react';
import { createStore } from '@autostorejs/react';
import { Button,ColorBlock } from "x-react-components"

const { state ,$ } = createStore({
  user:{
    firstName:"张",
    lastName:"三"
  }
})

export default () => {
  return <div>
      <ColorBlock name="FirstName">{$('user.firstName')}</ColorBlock>
      <ColorBlock name="LastName">{$('user.lastName')}</ColorBlock>
      <ColorBlock>FullName :{$(state=>state.user.firstName + ' ' + state.user.lastName)}</ColorBlock>
      <ColorBlock>FullName :{$(state=><span style={{color:'yellow'}}>{state.user.firstName} - {state.user.lastName}</span>)}</ColorBlock>
      <Button onClick={()=>state.user.firstName=state.user.firstName+'❤️'}>Change FirstName</Button>
      <Button onClick={()=>state.user.lastName=state.user.lastName+'✈️'}>Change LastName</Button>
      <Button onClick={()=>{
        state.user.firstName = '张'
        state.user.lastName = '三'
      }}>Reset</Button>

    </div>
}