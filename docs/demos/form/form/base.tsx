import React from "react"
import { useForm } from "@autostorejs/react";
import { Button, CheckBox, Input, JsonView, Layout, TextArea } from "x-react-components";

export default ()=>{
    const { Form,useReactive,reset } = useForm({
        user:{
            name:"张三",
            age:18,
            address:"北京",
            phone:"1234567890",
            email:"fisher@china.com",
            vip:false,
            resume:"非常优秀的员工"            
        }
      })
      const [ state ] = useReactive()
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
