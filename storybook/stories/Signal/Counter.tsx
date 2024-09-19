import React from 'react';
import { createStore } from "autostore-react"
import { Card, Button,ColorBlock } from "components"
 
const { state,$ } = createStore({    
  root:{
    count: 1
  }    
})



/** Primary UI component for user interaction */
export  const Counter = () => {  
  return (
    <Card title="显示状态值">
      <ColorBlock>Count:{$('root.count')}</ColorBlock>
      <Button onClick={()=>state.root.count++}>+1</Button>
    </Card>
  );
};
 