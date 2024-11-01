
import React from 'react';
import { useStore,computed } from '@autostorejs/react';
import { Button,ColorBlock } from "x-react-components"

export default () => {
  const { state , $ } = useStore({
    user:{
      age:18
    }  
  })
  return <div>
      <ColorBlock name="Age">{$<number>(
          // 渲染函数
          ({value})=>{
            return <div>{value}</div>
          },
          // 同步computed getter获取状态数据
          computed((scope)=>{
            return  scope.user.age
          })
        )
      }</ColorBlock>
      <Button onClick={()=>state.user.age++}>+Age</Button>
    </div>
}