import React from 'react';
import { useStore } from '@autostorejs/react';
import { Layout,JsonView,Button,Input, Select, Radio } from "x-react-components"
 
export default ()=>{

  const { reset,useFields,useReactive } = useStore({
    user:{
      firstName:"Zhang",
      lastName:"Fisher",
      job:2,
      age:18,
      pets:"Dog",
      vip:false 
    }
  })

  const fields = useFields({
    "user.pets":{
      type:"radio",
      values:["Dog","Cat","Fish"]
    },
    "user.ss":{}
  })
  const [ state  ]=  useReactive()

  return <Layout>
      <div>    
        <Input label="First Name" {...fields.user.firstName}/>
        <Input label="last Name" {...fields.user.lastName} />
        <Input label="Age" {...fields.user.age}/>
        <Select {...fields.user.job}  label ="Job" style={{color:'#333'}}
                items={[
                    {value:1,title:"Engineer"},
                    {value:2,title:"Doctor"},
                    {value:3,title:"Teacher"}
                ]}
            /> 
        <Input type="checkbox" label="VIP" {...fields.user.vip} />
        <Radio inline label="Dog" {...fields.user.pets[0]}/>
        <Radio label="Cat" {...fields.user.pets[1]}/>
        <Radio label="Fish" {...fields.user.pets[2]}/>
        <Button onClick={()=>{
            reset()      
        }}>Reset</Button>
      </div>
      <div>    
        <JsonView data={state}/>  
      </div>    
    </Layout>
}