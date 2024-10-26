import React from "react"
import { createStore,delay,computed,useForm } from '@autostorejs/react';
import {Input, Button,Loading,Table } from "x-react-components"


const calcOrderTotal = (scope)=> Math.floor(scope.price*scope.count)

const store  = createStore({
  orders: [
    {
      book: 'AutoStore最佳实践',
      price: 10,
      count: 1,
      // 小计
      total: calcOrderTotal
    }
  ],
  //  折扣 ：向后台请求折扣
  discount: computed(async (scope)=>{
    await delay(2000)
    return  parseFloat((0.5 + Math.random()).toFixed(2))
  },['orders.*.total'],{
    initial:0.9
  }),
  // 总计
  total: computed(async (scope)=>{ 
    await delay(2000)
    return (scope.orders.reduce((acc,cur)=>acc+cur.total,0)*scope.discount.value).toFixed(2)
  },['discount'])  

});
export default ()=>{
  const [cashDesk] = store.useReactive()

  const { state:newOrder, Form:NewOrderForm } =  useForm({
      book:'精通AutoStore',
      price:10,
      count:1 
  }) 

  return (<div>
    <Table 
        title="书店订单"
        cols={['<书名','单价','数量','小计']}
        rows={[
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
            ['折扣',null,null,()=><>{
                cashDesk.discount.loading ? <Loading/> : cashDesk.discount.value
            }</>],
            ['总计',null,null,()=>{
              return <>{
                cashDesk.total.loading ? <Loading/> : cashDesk.total.value
              }</>
            }]
        ]}         
    >
      <NewOrderForm >
          <h5>新增订单</h5>
          <Input name='book'></Input>
          <Input name='price'></Input>
          <Input name='count'></Input>
          <Button onClick={()=>{
            store.state.orders.push({
              ...newOrder,
              total:calcOrderTotal as any
            })
          }}>Add</Button>
      </NewOrderForm>
    </Table> 
  </div>)  
}