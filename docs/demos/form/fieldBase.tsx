import React from "react"
import {  useForm,assert } from "@autostorejs/react";
import { Button,Input,Layout, JsonView, ColorBlock } from "x-react-components"



 
export default ()=>{

    const { Form,Field,useReactive,reset,useField,dirty,valid } = useForm({        
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
            <ColorBlock name="IsValid">{String(valid)}</ColorBlock>
            <ColorBlock name="IsDirty">{String(dirty)}</ColorBlock>            
            <Form>
                <Field
                    name="user.name"
                    label="Name"
                    validate={(value)=>assert(value.length>3,"长度必须大于3")}  
                    // eslint-disable-next-line no-unused-vars    
                    render={({name,value,bind,label,onChange,error,select,enable,visible,placeholder,validate,required,readonly,loading,help})=>{                         
                        return <div>
                            <Input 
                                // name={name}
                                // value={value}
                                // onChange={onChange}
                                label={label}
                                {...bind}
                            />
                            {error ? <span style={{color:'red'}}>{error}</span> : null}
                        </div>
                    }}
                />         
                <Field
                    name="user.age"
                    label="Age"
                    validate={(value)=>assert(value>=18,"年龄不能小于18岁")}  
                    // eslint-disable-next-line no-unused-vars    
                    render={({name,value,bind,label,onChange,error,select,enable,visible,placeholder,validate,required,readonly,loading,help})=>{                         
                        return <div>
                            <Input 
                                type="number"
                                // name={name}
                                // value={value}
                                // onChange={onChange}
                                label={label}
                                {...bind}
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
