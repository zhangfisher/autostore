import React from "react"
import { delay, useForm } from "@autostorejs/react";
import { Button, CheckBox, Input, JsonView, Layout, Loading, TextArea } from "x-react-components";
import { Fit } from "../styles";

export default ()=>{

    const { Form,useReactive,reset,submiting,submit } = useForm({
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
                <Form 
                    method="get"
                    action="/adduser"
                    onSubmit={async (state)=>{
                        await delay(2000)
                        console.log("表单数据=",state)
                    }}
                >
                    <Input name="user.name" label="Name"/>
                    <Input name="user.age" label="Age" type="number"/>
                    <Input name="user.address" label="Address"/>
                    <Input name="user.phone" label="Phone"/>
                    <Input name="user.email" label="Email" type="email"/>
                    <TextArea name="user.resume" label="Resume"/> 
                    <CheckBox name='user.vip' label="VIP"/>
                    { submiting && <div className={Fit.className}>
                        <Loading/>
                        <div>正在提交表单...</div>
                        {/* <div><Button onClick={()=>cancel()}>取消</Button></div> */}
                    </div>}                    
                    <Button onClick={()=>reset()}>Reset</Button>
                    <Button onClick={()=>submit()}>Submit</Button>
                    <input type="submit" value="Default Submit "/>
                </Form>  
            </div>
            <div>
                <JsonView data={state}/>
            </div>
        </Layout>
      )
}
