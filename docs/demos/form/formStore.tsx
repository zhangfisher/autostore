import React from "react"
import { createStore, useForm } from "@autostorejs/react";
import { Button, CheckBox, Input, JsonView, Layout, TextArea } from "x-react-components";

const store = createStore({
    users:[
        {
            name:"张三",
            age:18,
            address:"北京",
            phone:"1234567890",
            email:"fisher@china.com",
            vip:false,
            resume:"非常优秀的员工"            
        }
    ] 
  }) 

   

export default ()=>{
    
    const { Form,reset } = useForm<typeof store.state.users[0]>(store,{entry:'users.0'})
    const [ state ] = store.useReactive()
      return (
        <Layout>        
            <div> 
                <Form>
                    <Input name="user.name" label="Name"/>
                    <Input name="user.age" label="Age" type="number"/>
                    <Input name="user.address" label="Address"/>
                    <Input name="user.phone" label="Phone"/>
                    <Input name="user.email" label="Email" type="email"/>
                    <TextArea name="user.resume" label="Resume"/> 
                    <CheckBox name='user.vip' label="VIP"/>
                </Form>  
                <Button onClick={()=>reset()}>Reset</Button>
            </div>
            <div>
                <JsonView data={state}/>
            </div>
        </Layout>
      )
}
