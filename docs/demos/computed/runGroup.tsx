import React from 'react'
import { createStore,computed,delay } from '@autostorejs/react';
import { ColorBlock,Button, Box } from "x-react-components" 

const state = {
  book:{
    name:"Zhang",
    count:4,
    price: 100,
    total1: computed(async (book)=>{
      await delay()
      return book.count*book.price 
    },[],{async:true,group:"total"}),
    total2: computed(async (book)=>{
      await delay()
      return book.count*book.price 
    },[],{async:true,group:"total"}),
    total3: computed(async (book)=>{
      await delay()
      return book.count*book.price 
    },[],{async:true,group:"total"}),
    average1: computed(async (book)=>{
      await delay()
      return book.price/book.count
    },[],{async:true,group:"average"}),
    average2: computed(async (book)=>{
      await delay()
      return book.price/book.count
    },[],{async:true,group:"average"}),
    average3: computed(async (book)=>{
      await delay()
      return book.price/book.count
    },[],{async:true,group:"average"}) 
  }
} 

const store = createStore(state)

export default ()=>{
  const [state] = store.useState()

  return (<div>  
    <Box title="Total Group">
        <ColorBlock name="Total1" 
        loading={state.book.total1.loading}>{state.book.total1.loading ? '计算中...' : state.book.total1.value}
        </ColorBlock> 
        <ColorBlock name="Total2" 
        loading={state.book.total2.loading}>{state.book.total2.loading ? '计算中...' : state.book.total2.value}
        </ColorBlock> 
        <ColorBlock name="Total3" 
        loading={state.book.total3.loading}>{state.book.total3.loading ? '计算中...' : state.book.total3.value}
        </ColorBlock> 
        <Button onClick={()=>store.computedObjects.runGroup("total")}>执行组total计算函数</Button> 
    </Box>
    <Box title="Average Group">
        <ColorBlock name="Average1" loading={state.book.average1.loading } > {state.book.average1.loading ? '计算中...' : state.book.average1.value}</ColorBlock> 
        <ColorBlock name="Average2" loading={state.book.average2.loading } > {state.book.average2.loading ? '计算中...' : state.book.average2.value}</ColorBlock> 
        <ColorBlock name="Average3" loading={state.book.average3.loading } > {state.book.average3.loading ? '计算中...' : state.book.average3.value}</ColorBlock> 
        <Button onClick={()=>store.computedObjects.runGroup("average")}>执行组Average计算函数</Button> 
    </Box>
  </div>)
}