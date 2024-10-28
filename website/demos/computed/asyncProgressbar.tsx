import React from "react"
import {delay,createStore,computed,ObserverScopeRef } from '@autostorejs/react';
import { Button,Table, Box, Loading, RichLabel } from "x-react-components"

 
const {  state,useAsyncState } = createStore({
  order:{
    bookName:"Proficient in AutoStore",
    price:100,
    count:1,
    total: computed(async ([count,price],{getProgressbar})=>{
      const progressbar = getProgressbar()
      return new Promise(async (resolve)=>{
        for(let i=1;i<=100;i++){
          await delay(30)
          progressbar.value(i)
        }
        progressbar.end()
        resolve(count*price)
      }) 
    },
    ["order.count","order.price"],
    {scope:ObserverScopeRef.Depends}) 
  }
}  )

export default ()=>{
  const total = useAsyncState("order.total")

  globalThis.total=total

  return (<div>
    <Table
        cols={['书名','价格','数量','小计']}
        rows={[
            [
                state.order.bookName,
                state.order.price,
                ()=>(<>
                        <Button onClick={()=>state.order.count--}>-</Button>
                        {state.order.count}
                        <Button  onClick={()=>state.order.count++}>+</Button>
                    </>),
                state.order.total.value
            ],
            [
                ()=>{
                    return total.loading ? (
                      <><Loading/><RichLabel inline text={`正在计算总价......{${total.progress}}%`}/></>
                    ) : '总价'
                },
                null,
                null,
                total.value
            ]
        ]}
    />    
    <Box title='state.order.total='>
      {JSON.stringify(state.order.total)}
    </Box>
  </div>)
}