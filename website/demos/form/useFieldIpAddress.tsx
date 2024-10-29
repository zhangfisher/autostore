import React from 'react';
import { createStore } from '@autostorejs/react';
import { ColorBlock,Button,Input, Layout, JsonView } from "x-react-components"

const { batchUpdate, $, useReactive,useField } = createStore({
  net:{
    ip:"127.0.0.1"
  }
})

export default ()=>{ 

    const [ state ] = useReactive()
    const ipParts = useField(
        [
            (state)=> state.net.ip.split(".")[0],
            (state)=> state.net.ip.split(".")[1],
            (state)=> state.net.ip.split(".")[2],
            (state)=> state.net.ip.split(".")[3],
        ],
        // 解析输入的值
        (part,value,state)=>{
            const ipParts = state.net.ip.split(".")
            ipParts[part] = value
            state.net.ip = ipParts.join(".")           
        })
    return <Layout>    
        <div>
            <Input label="FullName" {...ipParts[0]}/>.
            <Input label="FullName" {...ipParts[1]}/>.
            <Input label="FullName" {...ipParts[2]}/>.
            <Input label="FullName" {...ipParts[3]}/>
            <ColorBlock name="First Name">{$('user.firstName')}</ColorBlock>
            <ColorBlock name="Last Name">{$('user.lastName')}</ColorBlock>            
            <Button onClick={()=>{
                batchUpdate(state=>{
                    state.net.ip= "127.0.0.1"
                })            
            }}>Reset</Button>
        </div>
        <div>
            <JsonView border={false} data={state}/>
        </div>
    </Layout>
}

