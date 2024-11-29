import React from 'react';
import { createStore,computed,delay } from '@autostorejs/react';
import { ColorBlock,Button,Box,Table } from "x-react-components"

 
const state = {
  book:{
    name:"Zhang",
    count:4,
    price: 100,
    total1: computed(async (book)=>{
      await delay()
      return book.count*book.price 
    },['book.count','book.price'],{async:true,group:"total"}),
    total2: computed(async (book)=>{
      await delay()
      return book.count*book.price 
    },['book.count','book.price'],{async:true,group:"total",initial:100,enable:false}),
    total3: computed(async (book)=>{
      await delay()
      return book.count*book.price 
    },[],{async:true,group:"total"})
  }
} 

const {useReactive,computedObjects } = createStore(state)

export default ()=>{
  const [state] = useReactive() 
  return (<div> 
      <ColorBlock name="BookName">{state.book.name}</ColorBlock>
      <ColorBlock name="count">
        <div style={{display:"flex",alignItems:"center"}}>
          <Button onClick={()=>state.book.count--}>-</Button>
          {state.book.count}
          <Button onClick={()=>state.book.count++}>+</Button>
        </div>
      </ColorBlock>
      <ColorBlock name="price">{state.book.price}</ColorBlock>
    <Table
      showHeader={false}
      cols={['','','']}
      rows={[
        ["Total1",state.book.total1.loading ? '计算中...' : state.book.total1.value,"默认自动计算"],
        ["Total2",state.book.total2.loading ? '计算中...' : state.book.total2.value,"禁用计算，指定了默认值"],
        ["Total3",state.book.total3.loading ? '计算中...' : state.book.total3.value,"无依赖，需要手动计算"]
      ]}/> 
      <Button onClick={()=>computedObjects.runGroup("total")}>执行组total计算函数</Button> 
 
  </div>)
}
