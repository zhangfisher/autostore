import React from 'react';
import { createStore } from "@autostorejs/react"
import { Card, Button,ColorBlock } from "components"
import { useState } from 'react';

const { state,$ } = createStore({
  root:{
    count: 1
  }
})

/** Primary UI component for user interaction */
export  const Counter = () => {
  const [count,setCount] =useState(1)
  return (
    <Card title="显示状态值">{count}
      <ColorBlock>Count:{count}</ColorBlock>
      <ColorBlock>Count:{$('root.count')}</ColorBlock>
      <Button onClick={()=>setCount(count+1)}>State +1</Button>
      <Button onClick={()=>state.root.count++}>Signal +1</Button>
    </Card>
  );
};
