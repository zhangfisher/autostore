import React from "react"
import { createStore,computed,ObserverScopeRef,delay } from '@autostorejs/react';
import { Button,Loading,JsonView,RichLabel,Table } from "x-react-components"
  
const { state,useAsyncReactive } = createStore({
  order:{
    bookName:"Proficient in AutoStore",
    price:100,
    count:1,
    total: computed(async ()=>{
        await delay()
        throw new Error("计算出错")
    },
    ["order.count","order.price"], // 指定依赖
    {
      retry:[5,1000] ,// 重试5次，每次间隔1秒
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
                    return <> {total.loading ? <Loading/> : null }
                    {
                     total.loading ? <RichLabel inline text={`正在计算......`}/> 
                     : (
                       total.error && <RichLabel inline  text={`ERROR: {${total.error}}`}/> 
                     )}
                     {total.retry >0 && <RichLabel inline  text={`重试: {${total.retry}}`}/> }
                     </>
                },
                null,
                null,
                total.value
            ]
        ]}/> 
        <JsonView 
            title="state.order.total="
            highlightKeys={["retry","error","value"]}
            data={total}
        />
  </div>)
}