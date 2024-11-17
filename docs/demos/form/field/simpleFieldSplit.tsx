import React from "react"
import {  useForm } from "@autostorejs/react";
import { Button,Layout, JsonView } from "x-react-components"
import { LiteFieldStyle } from "../styles";



 
export default ()=>{

    const { Form,useReactive,reset } = useForm({        
        user:{
            firstName:"zhang",
            lastName:"fisher",
        }
    })

    const [ state ] = useReactive() 

    return <Layout>    
        <div>
            <Form>
                <div className={LiteFieldStyle.className}>
                    <label>FirstName</label>
                    <input data-field-name="user" 
                           data-field-part="firstName"/>
                </div>
                <div  className={LiteFieldStyle.className}>
                    <label>LastName</label>
                    <input data-field-name="user" 
                           data-field-part="lastName"/>
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
