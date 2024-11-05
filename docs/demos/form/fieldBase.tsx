import React from "react"
import { useForm } from "@autostorejs/react";
import { Button,Input,Layout, JsonView } from "x-react-components"

export default ()=>{

    const { Field,useReactive,reset } = useForm({        
        user:{
            firstName:"Zhang",
            lastName:"Fisher"  
        }
    })

    const [ state ] = useReactive()
       
    //   fullName:computed(async (user:any)=>{
    //     await delay(2000)
    //     return `${user.firstName} ${user.lastName}`
    // },["./firstName","./lastName"]),  

    return <Layout>    
        <div>
        <Field<string>
            label="FullName"
            name="user.fullName"
            validate={(value)=>value.length>3}
            render={({label,value,onChange})=>{
                return <Input 
                    label={label}
                    onChange={onChange}
                    value={value}
                />
            }}
        />
        <Field<string>
            label="FullName"
            name="user.fullName"
            validate={(value)=>value.length>5}
            render={({label,value,onChange})=>{
                return <Input 
                    label={label}
                    onChange={onChange}
                    value={value}
                />
            }}
        />
            <Button onClick={()=>{
                reset()    
            }}>Reset</Button> 
        </div>
        <div>
            <JsonView data={state}/>
        </div>
    </Layout>
}
