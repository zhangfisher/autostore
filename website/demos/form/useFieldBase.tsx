import React from "react"
import { createStore } from '@autostorejs/react';
import { ColorBlock,Button,Input,Layout, JsonView, Select, Radio } from "x-react-components"

const { batchUpdate, $, useField,useReactive } = createStore({
  user:{
    firstName:"Zhang",
    lastName:"Fisher",
    vip:false, 
    job:2,
    sex:'男'
  }
})

export default ()=>{
    const [state] = useReactive()
    const bindFirstName = useField("user.firstName")
    const bindLastName = useField("user.lastName")
    const bindVip = useField("user.vip")
    const bindJob = useField("user.job")
    const bindSex = useField("user.sex",{type:'radio',values:['男','女']})

    return <Layout>    
        <div>
            <Input label="First Name" {...bindFirstName}/>
            <Input label="last Name" {...bindLastName} />
            <Input type="checkbox" label="VIP" {...bindVip}/>
            <Select {...bindJob}  label ="Job" style={{color:'#333'}}
                items={[
                    {value:"1",title:"Engineer"},
                    {value:"2",title:"Doctor"},
                    {value:"3",title:"Teacher"}
                ]}
            /> 
            <Radio label="男" {...bindSex}/>
            <Radio label="女" {...bindSex}/>         
            <Button onClick={()=>{
                batchUpdate((state)=>{
                    state.user.firstName = "Zhang"
                    state.user.lastName = "Fisher"
                })      
            }}>Reset</Button>
        </div>
        <div>
            <JsonView  border={false} data={state}/>
        </div>
    </Layout>
}
