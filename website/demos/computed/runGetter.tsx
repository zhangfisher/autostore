import React from "react"
import { createStore,computed,delay } from '@autostorejs/react';
import { ColorBlock,Button } from "x-react-components";

const { state , $, computedObjects } = createStore({
  order:{
    price:100,
    count:3,
    total:computed(async (order)=>{
      await delay(1000)
      return order.price * order.count
    },['./price','./count']
    ,{id:"total"})
  }
})

export default ()=>{ 
  console.log("computedObjects.get('total')=",computedObjects.get('total'))
  return <div>
      <ColorBlock name="price">{$('order.price')}</ColorBlock>
      <ColorBlock name="count">{$('order.count')}</ColorBlock>
      <ColorBlock name="Total">{$(({value,loading})=>{
        return <div>
          {loading ? "计算中..." : value+1000 }
        </div>
      },"order.total")}</ColorBlock>
      <Button onClick={()=>state.order.count++}>依赖变化时自动执行:Count++</Button>
      <Button onClick={()=>computedObjects.get('total')!.run()}>手动执行</Button>
    </div>
}
