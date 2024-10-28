import React from "react"
import { createStore,delay,computed } from '@autostorejs/react';
import { Button,ColorBlock } from "x-react-components"
 
const { state, $ } = createStore({
  order:{
    price: 100,
    count: 1,
    total: computed(async (order)=>{
      await delay(1000)
      return order.price * order.count
    },
    ['order.price','order.count'],
    {initial:100})
  }
})

export default () => {
  return <div> 
      <ColorBlock name="Price">{$('order.price')}</ColorBlock>
      <ColorBlock name="Count">{$('order.count')}</ColorBlock>
      <ColorBlock name="Total" comment="1秒后更新">
        {$('order.total.value')}</ColorBlock>
      <ColorBlock name="Total" comment="1秒后更新">
        {$('order.total')}
      </ColorBlock>
      <Button onClick={()=>state.order.count++}>+Count</Button>
    </div>
}