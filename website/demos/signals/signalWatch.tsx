
import React from 'react';
import { useStore,watch } from '@autostorejs/react';
import { Button,ColorBlock } from "x-react-components"

export default () => {
  const { state , $,watchObjects } = useStore({    
    a:{
        validate:true
    },
    b:{
        validate:true
    },            
    c:{
        validate:true,
        c1:{
            validate:true
        }
      },
  })
  return <div>
        <ColorBlock name="A.Validate">{$("a.validate")}</ColorBlock>
        <ColorBlock name="B.Validate">{$("b.validate")}</ColorBlock>
        <ColorBlock name="C.Validate">{$("c.validate")}</ColorBlock>
        {$<boolean>(
          // 渲染函数
          ({value})=>{
                return <ColorBlock name="Validate">{String(value)}</ColorBlock>
          },
          // 动态创建监听对象
          watch<boolean,boolean>(({path,value},watchObj)=>{   
                if(typeof(value) === 'boolean'){
                    const srcKey = path.join('.')
                    if(value){
                        delete watchObj.cache[srcKey]
                    }else{
                        watchObj.cache[srcKey] = value
                    }
                }
                // 由于cache里面只记录validate=false的值
                // 所以如果cache不为空则代表有字段的validate=false
                return Object.keys(watchObj.cache).length==0
            },
            // 只侦听validate字段的值变化
            (path)=>path[path.length-1]=='validate', 
            {initial:true,id:"dirty"}
        )
      )} 
      <Button onClick={()=>state.a.validate=!state.a.validate}>Change A</Button>
      <Button onClick={()=>state.b.validate=!state.b.validate}>Change B</Button>
      <Button onClick={()=>state.c.validate=!state.c.validate}>Change C</Button>
      <Button onClick={()=>watchObjects.reset()}>Reset WatchObject</Button>
    </div>
}