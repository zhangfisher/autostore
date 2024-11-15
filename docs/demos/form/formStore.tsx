import React from "react"
import { createStore, useForm } from "@autostorejs/react";
import {Spin, Button, CheckBox, Input, JsonView, Layout, TextArea } from "x-react-components";

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
    
    const { Form,reset } = useForm(store)
    const [ state ] = store.useReactive()
      return (
        <Layout>        
            <div> 
                <Form>
                    <Spin value="10"/>
                    <Input name="users.0.name" label="Name"/>
                    <Input name="users.0.age" label="Age" type="number"/>
                    <Input name="users.0.address" label="Address"/>
                    <Input name="users.0.phone" label="Phone"/>
                    <Input name="users.0.email" label="Email" type="email"/>
                    <TextArea name="users.0.resume" label="Resume"/> 
                    <CheckBox name='users.0.vip' label="VIP"/>
                </Form>  
                <Button onClick={()=>reset()}>Reset</Button>
            </div>
            <div>
                <JsonView data={state}/>
            </div>
        </Layout>
      )
}
