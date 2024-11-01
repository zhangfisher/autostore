import React from "react"
import { createStore,computed } from '@autostorejs/react';
import { ColorBlock,Button } from "x-react-components";

const store = createStore({
  order:{
    price:100,
    count:3,
    // 1. 快速创建同步计算属性，自动收集依赖
    total1:(order)=>order.price * order.count,
    // 2. 使用computed函数创建同步计算属性，支持配置参数
    total2:computed((order)=>order.price * order.count),
  }
})

export default ()=>{
  const [state,setState] = store.useReactive()
  return <div> 
    <ColorBlock name="Price">{state.order.price}</ColorBlock>
    <ColorBlock name="Count">{state.order.count}</ColorBlock>
    <ColorBlock name="Total 1">{state.order.total1}</ColorBlock>
    <ColorBlock name="Total 2">{state.order.total2}</ColorBlock>
    <Button onClick={()=>setState((state)=>state.order.count++)}>Count++</Button>
  </div>

}
