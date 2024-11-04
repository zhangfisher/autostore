import React from "react"
import { computed, createStore, delay } from '@autostorejs/react';
import { Button,Input,Layout, JsonView, Select, Radio } from "x-react-components"

const { batchUpdate, useField,useReactive } = createStore({
  user:{
    firstName:"Zhang",
    lastName:"Fisher",
    fullName:computed(async (user:any)=>{
        await delay(2000)
        return `${user.firstName} ${user.lastName}`
    },["./firstName","./lastName"]),    
  }
})

export default ()=>{
    const [state] = useReactive()
    const fieldFirstName = useField("user.firstName")
    const fieldLastName = useField("user.lastName")
    const fieldFullName = useField(
        computed(async (user:any)=>{
            await delay(2000)
            return `${user.firstName} ${user.lastName}`
        },["./firstName","./lastName"]), 
        // 解析输入的值
        ({value},state)=>{
            const [firstName,lastName] = value.split(/\s+/)
            state.user.firstName = firstName
            state.user.lastName = lastName
        })

    return <Layout>    
        <div>
            <Input label="First Name" {...fieldFirstName}/>
            <Input label="last Name" {...fieldLastName} />
            
            <Button onClick={()=>{
                batchUpdate((state)=>{
                    state.user.firstName = "Zhang"
                    state.user.lastName = "Fisher"
                })      
            }}>Reset</Button> 
        </div>
        <div>
            <JsonView data={state}/>
        </div>
    </Layout>
}
