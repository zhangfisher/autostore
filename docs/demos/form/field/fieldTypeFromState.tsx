import React from "react"
import { createStore } from '@autostorejs/react';
import { Button,Select,Layout, JsonView} from "x-react-components"

const { reset, useField,useReactive } = createStore({
  user:{
    vip:true,                                // 状态中保存 boolean
    level:2                                  // 状态中保存数字
  }
})

export default ()=>{
    const [state] = useReactive()
    // fromState 与 toState 配对重载: 状态 boolean <-> 显示 是/否
    const fieldVip = useField("user.vip",{
        fromState:(value)=> value===true ? '是' : '否',
        toState:(value)=> value==='是' ? true : false
    })
    // 状态 number <-> 显示 中文等级
    const LEVELS = ['青铜','白银','黄金']
    const fieldLevel = useField("user.level",{
        fromState:(value)=> LEVELS[value] ?? '',
        toState:(value)=> LEVELS.indexOf(value)
    })
    return <Layout>
        <div>
            <Select label="Vip" items={[{title:'是',value:'是'},{title:'否',value:'否'}]} {...fieldVip}/>
            <Select label="Level" items={LEVELS.map(title=>({title,value:title}))} {...fieldLevel}/>
            <Button onClick={()=>{ reset() }}>Reset</Button>
        </div>
        <div>
            <JsonView  border={false} data={state}/>
        </div>
    </Layout>
}
