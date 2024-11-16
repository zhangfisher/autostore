import React from "react"
import {  useForm } from "@autostorejs/react";
import { Button,Layout, JsonView, ColorBlock, Field } from "x-react-components"
import { LiteFieldStyle } from "../styles"
 
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
                <div data-field-name="user.name" className={LiteFieldStyle.className}>
                    <label>Name</label>
                    <input/>
                </div>
                <div data-field-name="user.age"  className={LiteFieldStyle.className}>
                    <label>Age</label>
                    <input type="number"/>
                </div>
                <div data-field-name="user.job" className={LiteFieldStyle.className}>
                    <label>Job</label>
                    <select>
                        <option value="1">程序员</option>
                        <option value="2">教师</option>
                        <option value="3">公务员</option>
                        <option value="4">外卖员</option>
                    </select>
                </div>
                <div data-field-name="user.vip" className={LiteFieldStyle.className}>
                    <label>Vip</label>
                    <input type="checkbox"/>
                </div>
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
