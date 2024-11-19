import React from "react"
import { createStore,delay,computed } from '@autostorejs/react';
import { Button,Table } from "x-react-components"

const {$,useReactive} = createStore({
  orders: [
    {
      book: 'AutoStore最佳实践',
      price: 10,
      count: 1,
      // 小计
      total: (scope)=> Math.floor(scope.price*scope.count)
    }
  ],
  //  折扣 ：向后台请求折扣
  discount: computed(async (scope)=>{
    // 如await fetch(`/api/discount?userId=1&total=${scope.total}....`) 
    await delay(2000)
    return  parseFloat((0.5 + Math.random()).toFixed(2))
  },['orders.*.total'],{
    initial:0.9
  }),
  // 总计
  total: computed(async (scope)=>{ 
    return (scope.orders.reduce((acc,cur)=>acc+cur.total,0)*scope.discount.value).toFixed(2)
  },['discount'])  

});
export default ()=>{
  const [cashDesk] = useReactive()
  return <div>
    <Table 
        title="书店订单"
        cols={['<书名','单价','数量','小计']}
        rows={
          [
            ...cashDesk.orders.map((order,index)=>[
                order.book,
                `￥${order.price}`,
                ()=>(<div key={index}>
                  <Button onClick={()=>order.count--}>-</Button>
                  {order.count}
                  <Button onClick={()=>order.count++}>+</Button>
                </div>),
                `￥${order.total}`
            ]),
            ['折扣',null,null,()=><>{$('discount')}</>],
            ['总计',null,null,()=><>👉{$('total')}</>]
          ]
        }         
    /> 
  </div>  
}