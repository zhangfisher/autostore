import React from "react"
import {  useForm,assert} from "@autostorejs/react";
import { Button,Input,Layout, JsonView } from "x-react-components"



 
export default ()=>{

    const { Form,Field,useReactive,reset,useField } = useForm({        
        user:{
            name:"fisher",
            age:12,
            vip:true,
            tags:['Nodejs','React','Vue','Angular','TypeScript','JavaScript','CSS','HTML']
        }
    })

    const [ state ] = useReactive()
    
    const nameField = useField("user.name")

    return <Layout>    
        <div>
            <Form>
                <Field
                    name="user.name"
                    validate={(value)=>assert(value.length>3,"长度必须大于3")}  
                    // eslint-disable-next-line no-unused-vars    
                    render={({name,label,value,onChange,error,select,enable,visible,validate,required,readonly,loading})=>{                        
                        return <div>
                            <Input 
                                name={name}
                                label={label.value}
                                onChange={onChange}
                                value={value}
                            />
                            {error ? <span style={{color:'red'}}>{error}</span> : null}
                        </div>
                    }}
                />            
                <Input  label="FirstName" {...nameField} />
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
 