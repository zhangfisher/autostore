import React from 'react';
import { useStore } from '@autostorejs/react';
import { Button,ColorBlock } from "x-react-components"

export default () => {
  const { state , $ } = useStore({
    user:{
      age:18
    }  
  })
  return <div>
      <ColorBlock name="Age">{$(
        // 自定义渲染函数
        ({value})=>{
          return <div style={{position:'relative',display:'flex',alignItems:'center',color:'red',background:"white"}}>
            <span style={{flexGrow:1}}>{value}</span>
            <Button onClick={()=>state.user.age++}>+Age</Button>
          </div>
        },
        // 状态数据的路径
        "user.age"
      )}</ColorBlock> 
    </div>
}