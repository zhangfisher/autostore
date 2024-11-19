import React from "react"
import { createStore } from '@autostorejs/react';
import { Button,Input,Layout, JsonView, Select, Radio } from "x-react-components"

const { reset, useField,useReactive } = createStore({
  user:{
    firstName:"Zhang",
    lastName:"Fisher",
    vip:false, 
    job:2,
    sex:'男',
    pets:"",
    tags:['Nodejs','React','Vue','Angular','TypeScript','JavaScript','CSS','HTML'],    
  }
})

export default ()=>{
    const [state] = useReactive()
    const fieldFirstName = useField("user.firstName")
    const fieldLastName = useField("user.lastName")
    const fieldVip = useField("user.vip")
    const fieldJob = useField("user.job")
    const fieldSex = useField("user.sex",{type:'radio',values:['男','女']})    

    return <Layout>    
        <div>
            <Input label="First Name" {...fieldFirstName}/>
            <Input label="Last Name" {...fieldLastName} />
            <Input type="checkbox" label="VIP" {...fieldVip}/>
            <Select {...fieldJob}  label ="Job" 
                items={[
                    {value:1,title:"Engineer"},
                    {value:2,title:"Doctor"},
                    {value:3,title:"Teacher"}
                ]}
            /> 
            <Radio label="男" {...fieldSex[0]}/>
            <Radio label="女" {...fieldSex[1]}/>         
            <Button onClick={()=>{
                reset()     
            }}>Reset</Button> 
        </div>
        <div>
            <JsonView data={state}/>
        </div>
    </Layout>
}
