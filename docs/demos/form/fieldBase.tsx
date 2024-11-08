import React from "react"
import { computed, ComputedGetter, useForm, watch } from "@autostorejs/react";
import { Button,Input,Layout, JsonView } from "x-react-components"

function assert(value:any,help:string){
    if(!value){
        throw new Error(help)
    }
    return true
}


function prop(fn:()=>any | Promise<any>){
    return computed(fn,[]) as ComputedGetter<any>
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
                    name="user.firstName"
                    validate={(value)=>assert(value.length>3,"长度必须大于3")}  
                    enable={()=>true}     
                    visible={()=>true}
                    readonly={()=>false}
                    required={()=>false}  
                    select={prop(async ()=>([1,2,3]))}  
                    // eslint-disable-next-line no-unused-vars    
                    render={({name,label,value,onChange,error,select,enable,visible,validate,required,readonly,loading})=>{                        
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
                    name="user.firstName"
                    validate={computed(async val=>true,[])}         
                    // eslint-disable-next-line no-unused-vars         
                    render={({name,label,value,onChange,error,visible,validate,loading})=>{                        
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
                <Field  
                    name="user.lastName"
                    validate={computed(async (value)=>{
                        return assert(value.length>5,"长度必须大于5")
                    },[])}
                    render={({name,label,value,onChange,error,validate})=>{
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
 