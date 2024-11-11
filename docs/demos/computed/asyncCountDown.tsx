import React from "react"
import { createStore,computed,ObserverScopeRef,delay } from '@autostorejs/react';
import { Button,Loading,RichLabel,Table, JsonView } from "x-react-components"
  
const { state,useAsyncReactive } = createStore({
  order:{
    bookName:"Proficient in AutoStore",
    price:100,
    count:1,
    total: computed(async ([count,price])=>{
        await delay(5000)    // 模拟长时间计算
        return count*price
    },
    ["order.count","order.price"], // 指定依赖
    {
      timeout:[5*1000,5] ,  // 指定超时时间为5秒，每秒更新一次   
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
                    return (total.loading ? (
                        <><Loading/><RichLabel inline text={`正在计算总价......倒计时{${total.timeout}}秒`}/></>)   
                        : ( total.error ? <RichLabel inline 
                            text={`总价计算出错: {${total.error}}`} color="red"/> : '总价'
                        ))
                },
                null,
                null,
                total.value
            ]
        ]}/>
        <JsonView 
          title="state.order.total="
          highlightKeys={["error","timeout","value"]}
          data={total}
      />
  </div>)
}