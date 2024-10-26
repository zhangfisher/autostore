import React from "react"
import { createStore } from '@autostorejs/react';
import { Button,ColorBlock } from "x-react-components"

const { state , $ } = createStore({
  age:18
})

export default () => {

  return <div>
      {/* 引入Signal机制，可以局部更新Age */}
      <ColorBlock name="Age+Signal">{$('age')}</ColorBlock>
      {/* 当直接更新Age时，仅在组件当重新渲染时更新 */}
      <ColorBlock name="Age">{state.age}</ColorBlock>
      <Button onClick={()=>state.age=state.age+1}>+Age</Button>
    </div>
}
