import React from "react"
import { createStore } from '@autostorejs/react';
import { Button,Input,Layout, JsonView} from "x-react-components"

const { reset, useField,useReactive } = createStore({
  order:{
    price:0,                                 // number
    remark:""                                // string
  }
})

export default ()=>{
    const [state] = useReactive()
    // 重载 toState: 输入 '100,000' 转换为数字 100000 写入状态
    const fieldPrice = useField("order.price",{
        toState:(value)=>{
            const num = Number(String(value).replace(/,/g,''))
            return isNaN(num) ? 0 : num
        }
    })
    // 重载 toState: 输入自动去除首尾空白
    const fieldRemark = useField("order.remark",{
        toState:(value)=> String(value).trim()
    })
    return <Layout>
        <div>
            <Input label="Price(支持千分位)" {...fieldPrice} placeholder="如 100,000"/>
            <Input label="Remark(自动去空白)" {...fieldRemark}/>
            <Button onClick={()=>{ reset() }}>Reset</Button>
        </div>
        <div>
            <JsonView  border={false} data={state}/>
        </div>
    </Layout>
}
