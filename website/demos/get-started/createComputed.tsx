import React from "react"
import { createStore } from '@autostorejs/react';
import {  ColorBlock,Button,Divider,Layout,JsonView } from "x-react-components"

const {state,$,useState} = createStore({
  orders: [
    {
      book: 'AutoStore最佳实践',
      price: 39.9,
      count: 1,
      // 小计
      total: (scope)=>scope.price*scope.count
    }
  ],
  // 总计
  total: (scope)=>scope.orders.reduce((acc,cur)=>acc+cur.total,0)

});
export default ()=>{
  const [orders] = useState()
  return <Layout>
    <div>
      <ColorBlock name="书名">{$('orders.0.book')}</ColorBlock>
      <ColorBlock name="单价">{$('orders.0.price')}</ColorBlock>
      <ColorBlock name="数量">
        <Button onClick={()=>state.orders[0].count--}>-</Button>
        {$('orders.0.count')}
        <Button onClick={()=>state.orders[0].count++}>+</Button>
      </ColorBlock>
      <ColorBlock name="小计">{$('orders.0.total')}</ColorBlock>
      <Divider/>
      <ColorBlock name="总计">{$('total')}</ColorBlock>
    </div>
    <div>
      <JsonView data={orders}/>
    </div>
  </Layout>  
}
