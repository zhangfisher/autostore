import React from 'react';
import { useStore,delay,computed } from '@autostorejs/react';
import { Button,ColorBlock } from "x-react-components"

 
export default () => {
    const { state , $,useAsyncReactive } = useStore({
    order:{
      price: 100,
      count: 1,
      total: computed(async (order)=>{
        await delay()
        return order.price * order.count
      },['order.price','order.count'],{initial:100})
    }
  })
  const total = useAsyncReactive("order.total")
  return <div> 
        <ColorBlock name="Price">{$('order.price')}</ColorBlock>
        <ColorBlock name="Count">{$('order.count')}</ColorBlock>
        <ColorBlock name="Total" loading={total.loading} comment="1秒后更新">
            {$('order.total.value')}
        </ColorBlock>
        <ColorBlock name="Total" loading={total.loading}  comment="1秒后更新">
            {$('order.total')}</ColorBlock>
        <Button onClick={()=>state.order.count++}>+Count</Button>
    </div>
}