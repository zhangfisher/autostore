import React from "react"
import { useForm } from "@autostorejs/react";
import { Button,Input,Layout, JsonView } from "x-react-components"

function assert(value:any,help:string){
    if(!value){
        throw new Error(help)
    }
    return true
}

export default ()=>{

    const { Form,Field,useReactive,reset,useField } = useForm({        
        user:{
            firstName:"z",
            lastName:"Fisher"  
        }
    })

    const [ state ] = useReactive()
    
    const firstNameField = useField("user.firstName")

    return <Layout>    
        <div>
            <Form>
                <Field<string>
                    label="FirstName"
                    name="user.firstName"
                    validate={(value)=>{
                        return assert(value.length>3,"长度必须大于3")
                    }} 
                    render={({name,label,value,onChange,error,validate,loading})=>{
                        return <div>
                            <Input 
                                name={name} 
                                label={label}
                                onChange={onChange}
                                value={value}
                            />
                            {error ? <span style={{color:'red'}}>{error}</span> : null}
                        </div>
                    }}
                />
                <Field<string>
                    label="LastName"
                    name="user.lastName"
                    validate={(value)=>{
                        return assert(value.length>5,"长度必须大于5")
                    }}
                    render={({name,label,value,onChange,error})=>{
                        return <div>
                            <Input name={name} label={label} value={value} onChange={onChange}/>
                        {error ? <span style={{color:'red'}}>{error}</span> : null}
                    </div>
                    }}
                />
                <Input  label="FirstName" {...firstNameField} />
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
 