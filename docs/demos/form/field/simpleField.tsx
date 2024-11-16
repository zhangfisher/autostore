import React from "react"
import {  useForm } from "@autostorejs/react";
import { Button,Layout, JsonView, ColorBlock, Field } from "x-react-components"



 
export default ()=>{

    const { Form,useReactive,reset,dirty } = useForm({        
        user:{
            name:"fisher",
            age:12,
            job: 2,
            vip:true
        }
    })

    const [ state ] = useReactive() 

    return <Layout>    
        <div>
            <ColorBlock name="IsDirty">{String(dirty)}</ColorBlock>            
            <Form>
                <Field label="Name">
                    <input data-field-name="user.name"/>
                </Field>
                <Field label="Age">
                    <input  data-field-name="user.age" type="number"/>
                </Field>
                <Field label="Job">
                    <select data-field-name="user.job">
                        <option value="1">程序员</option>
                        <option value="2">教师</option>
                        <option value="3">公务员</option>
                        <option value="4">外卖员</option>
                    </select>
                </Field>
                <Field label="Vip">
                    <input data-field-name="user.vip" type="checkbox"/>
                </Field>
                <Button onClick={()=>{
                    reset()    
                }}>Reset</Button> 
            </Form>
        </div>
        <div>
            <JsonView data={state}/>
        </div>
    </Layout>
}
