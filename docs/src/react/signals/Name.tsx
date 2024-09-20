import React from 'react';
import { createStore } from "autostore-react"
import { Card, Button,ColorBlock } from "components"
import { useState } from 'react';
 
const { state,$ } = createStore({    
  firstName: 'Zhang',
    lastName: 'Fisher'
})


 
export  const Author = () => {  
  const [count,setCount] =useState(1)
  return (
    <Card title="显示状态值">{count}
      <ColorBlock>Count:{count}</ColorBlock>
      <ColorBlock>{$(state=>state.firstName + ' ' + state.lastName)}</ColorBlock>      
      <Button onClick={()=>setCount(count+1)}>State +1</Button>
      <Button onClick={()=>state.lastName=state.lastName + '.'}>Update lastName</Button>
    </Card>
  );
};
 