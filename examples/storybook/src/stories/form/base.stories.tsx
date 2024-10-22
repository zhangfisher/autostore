import type { Meta, StoryObj } from '@storybook/react';
import {Input,Button,ColorBlock,Box,Layout,JsonView,Card,CheckBox } from "x-react-components"
import { useStore} from "@autostorejs/react";
import React from 'react';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Form/Base'
} 

export default meta;

// type Story = StoryObj<typeof meta>;




export const BaseFrom = ()=>{
  const { $,useState,useForm } = useStore({
    user:{
        name:"张三",
        age:18,
        address:"北京",
        phone:"1234567890",
        email:"fisher@china.com",
        vip:false
    }
  });

  const [ state ] = useState()

  const { Form } = useForm()

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