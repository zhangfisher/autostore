import React from 'react';
import { useStore } from '@autostorejs/react';
import { Layout,JsonView,Button,Input, Select } from "x-react-components"
 
export default ()=>{

  const { batchUpdate,useFields,useReactive } = useStore({
    user:{
      firstName:"Zhang",
      lastName:"Fisher",
      job:2,
      age:18,
      vip:false 
    }
  })

  const fields = useFields()
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
        <Button onClick={()=>{
            batchUpdate(state=>{
                state.user.firstName= "Zhang"
                state.user.lastName = "Fisher"
                state.user.age = 18
                state.user.vip = false
            })          
        }}>Reset</Button>
      </div>
      <div>    
        <JsonView data={state}/>  
      </div>    
    </Layout>
}