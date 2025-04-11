import React from "react"
import { computed, configurable, createStore } from '@autostorejs/react';
import { Button,ColorBlock } from "x-react-components"

const { state , $ } = createStore({
    order:{
        price:configurable(100),
        count:configurable(2),
        total:computed((scope)=>scope.price*scope.count)
    }
})

export default () => {

  return <div>
      <ColorBlock name="Price">{$('order.price')}</ColorBlock>
      <ColorBlock name="Count">{$('order.count')}</ColorBlock>
      <ColorBlock name="Total">{$('order.total')}</ColorBlock>
      <Button onClick={()=>state.order.count++}>Count++</Button>
    </div>
}
