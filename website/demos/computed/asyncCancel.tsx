import React from "react"
import { createStore,computed,ObserverScopeRef,delay } from '@autostorejs/react';
import { Button,Loading,JsonView,RichLabel,Table, Box } from "x-react-components"
  
const { state,useAsyncReactive } = createStore({
  order:{
    bookName:"Proficient in AutoStore",
    price:100,
    count:1,
    total: computed(async ([count,price],{abortSignal})=>{
      return new Promise<number>((resolve,reject)=>{
        const tmId = setTimeout(()=>{
          resolve(count*price)  // 模拟耗时干活
        },1000 *1000)
        abortSignal.addEventListener("abort",()=>{
          clearTimeout(tmId)
          reject("cancelled")
        })
      })	
    },
    ["order.count","order.price"], // 指定依赖
    { 
      initial:100,
      scope:ObserverScopeRef.Depends
    })
  }
}  )

export default ()=>{
  const total = useAsyncReactive("order.total")
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
                    return <> 
                    {
                     total.loading ? <RichLabel inline text={`正在计算......`}/> 
                     : (
                       total.error && <RichLabel inline  text={`ERROR: {${total.error}}`}/> 
                     )}
                     {total.loading ? <Button onClick={()=>total.cancel()}>取消</Button> : null }
                     </>
                },
                null,
                null,
                total.value
            ]
        ]}/>
    <div title="state.order.total=">{JSON.stringify(state.order.total)}</div> 
  </div>)
}