import React from "react"
import {  useForm } from "@autostorejs/react";
import { Button,Layout, JsonView, ColorBlock } from "x-react-components"
import { LiteFieldStyle } from "../styles"
 
export default ()=>{

    const { Form,useReactive,reset,dirty } = useForm({        
        user:{
            name:"fisher",
            age:12,
            job: 2,
            resume:"非著名开源开发者",
            vip:true,
            sex: '男',

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
                <div data-field-name="user.resume" className={LiteFieldStyle.className}>
                    <label>Sex</label>
                    <textarea/>
                </div>
                <div data-field-name="user.sex" className={LiteFieldStyle.className}>
                    <label>Sex</label>                        
                    <label><input type="radio" value='男'/>男</label>                        
                    <label><input type="radio" value='女'/>女</label>
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
