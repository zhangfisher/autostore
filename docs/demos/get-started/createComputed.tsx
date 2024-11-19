import React from "react"
import { createStore } from '@autostorejs/react';
import { Table, Button,JsonView } from "x-react-components"

const {state,$,useState} = createStore({
  orders: [
    {
      book: 'AutoStore最佳实践',
      price: 39.9,
      count: 1,
      // 小计
      total: (scope)=> Math.floor(scope.price*scope.count)
    }
  ],
  // 总计
  total: (scope)=>scope.orders.reduce((acc,cur)=>acc+cur.total,0)

});
export default ()=>{
  const [orders] = useState()

  const orderRows = state.orders.map(order=>{
    return [
        order.book,
        order.price,
        ()=>{
          return <><Button onClick={()=>order.count--}>-</Button>
            {order.count}
            <Button onClick={()=>order.count++}>+</Button>
            </>
        },
        order.total
      ]
  })

  return <div>
      <Table
          cols={['书名','单价','数量','小计']}
          rows={[
            ...orderRows,
            ['总计','','',()=>$('total')]
          ]}
      />      
      <JsonView data={orders} border/>
    </div>
}
