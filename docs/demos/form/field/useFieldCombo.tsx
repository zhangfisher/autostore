import React from 'react';
import { createStore } from '@autostorejs/react';
import { Button,Input, Layout, JsonView } from "x-react-components"

const { reset,useReactive,useField } = createStore({
  user:{
    firstName:"Zhang",
    lastName:"Fisher" 
  }
})

export default ()=>{ 

    const [ state ] = useReactive()
    const bindFullName = useField(
        (state)=>state.user.firstName+" "+state.user.lastName,
        // 解析输入的值
        ({value},state)=>{
            const [firstName,lastName] = value.split(/\s+/)
            state.user.firstName = firstName
            state.user.lastName = lastName
        })
    return <Layout>    
        <div>
            <Input label="FullName" {...bindFullName}/>         
            <Button onClick={()=>{
                reset()           
            }}>Reset</Button>
        </div>
        <div>
            <JsonView border={false} data={state}/>
        </div>
    </Layout>
}

