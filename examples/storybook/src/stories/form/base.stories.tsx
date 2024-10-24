import {Input,Button,ColorBlock,Box,Layout,JsonView,Card,CheckBox } from "x-react-components"
import { useForm } from "@autostorejs/react";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: '表单/基础功能'
} 

export default meta;


export const BaseFrom = ()=>{
  
  const { Form,useState } = useForm({
    user:{
        name:"张三",
        age:18,
        address:"北京",
        phone:"1234567890",
        email:"fisher@china.com",
        vip:false
    }
  })
  const [ state ] = useState()
  

  return (
    <Card title="BaseForm">
    <Layout>        
        <div> 
            <Form>
                <Input name="user.name" label="Name"/>
                <Input name="user.age" label="Age" type="number"/>
                <Input name="user.address" label="Address"/>
                <Input name="user.phone" label="Phone"/>
                <Input name="user.email" label="Email" type="email"/>
                <CheckBox name='user.vip' label="VIP"/>
            </Form>  
        </div>
        <JsonView data={state}/>
    </Layout>
    </Card>
  )
}