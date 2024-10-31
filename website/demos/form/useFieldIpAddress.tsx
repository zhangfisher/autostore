import React from 'react';
import { createStore } from '@autostorejs/react';
import { Field,Button,Input, Layout, JsonView } from "x-react-components"

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
        ({value,part},state)=>{
            const ipParts = state.net.ip.split(".")
            ipParts[part] = value
            state.net.ip = ipParts.join(".")           
        })
    return <Layout>    
        <div>
            <Field labelWidth="80px" label="IP">
            <Input inline width={60} {...ipParts[0]}/>.
            <Input inline width={60} {...ipParts[1]}/>.
            <Input inline width={60} {...ipParts[2]}/>.
            <Input inline width={60} {...ipParts[3]}/>
            </Field>
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

