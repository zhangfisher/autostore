import React from "react"
import { delay, useForm } from "@autostorejs/react";
import { Button, CheckBox, Input, JsonView, Layout, Loading, TextArea } from "x-react-components";

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
                    onSubmit={async (state)=>{
                        await delay(3000)
                        // await fetch(url,{method:"post",body:JSON.stringify(state)})
                        console.log("submit ok")
                    }}
                >
                    <Input name="user.name" label="Name"/>
                    <Input name="user.age" label="Age" type="number"/>
                    <Input name="user.address" label="Address"/>
                    <Input name="user.phone" label="Phone"/>
                    <Input name="user.email" label="Email" type="email"/>
                    <TextArea name="user.resume" label="Resume"/> 
                    <CheckBox name='user.vip' label="VIP"/>
                    { submiting && <div style={{display:"flex",position:'absolute',top:"0px",left:"0px",width:"100%",height:"100%",color:"white",justifyContent: "center",alignItems:'center',flexDirection:"column",background:"rgba(100,100,100,0.6)"}}>
                        <Loading/>
                        <div>正在提交表单...</div>
                        {/* <div><Button onClick={()=>cancel()}>取消</Button></div> */}
                    </div>}
                </Form>  
                <Button onClick={()=>reset()}>Reset</Button>
                <Button onClick={()=>submit()}>Submit</Button>
            </div>
            <div>
                <JsonView data={state}/>
            </div>
        </Layout>
      )
}
