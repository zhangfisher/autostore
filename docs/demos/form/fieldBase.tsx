import React from "react"
import { computed, ComputedGetter, useForm, watch } from "@autostorejs/react";
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
                    enable={()=>true}     
                    visible={computed(async (val)=>true,[])}
                    readonly={computed((val)=>false)}
                    required={false}   
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
                <Field
                    name="user.age"
                    validate={async val=>true}         
                    // eslint-disable-next-line no-unused-vars         
                    render={({name,label,value,onChange,error,select,enable,visible,validate,required,readonly,loading})=>{                        
                        return <div>
                            <Input 
                                name={name} 
                                label={label.value}
                                onChange={onChange}
                                value={String(value)}
                            />
                            {error ? <span style={{color:'red'}}>{error}</span> : null}
                        </div>
                    }}
                />
                <Field
                    name="user.vip"
                    validate={computed(val=>true)}         
                    // eslint-disable-next-line no-unused-vars         
                    render={({name,label,value,onChange,error,select,enable,visible,validate,required,readonly,loading})=>{                        
                        return <div>
                            <Input 
                                name={name} 
                                label={label.value}
                                onChange={onChange}
                                value={String(value)}
                            />
                            {error ? <span style={{color:'red'}}>{error}</span> : null}
                        </div>
                    }}
                />
                <Field
                    name="user.tags"
                    validate={computed(async (value)=>{
                        return assert(value.length>5,"长度必须大于5")
                    },[])}
                    // eslint-disable-next-line no-unused-vars         
                    render={({name,label,value,onChange,error,select,enable,visible,validate,required,readonly,loading})=>{                 
                        return <div>
                            <Input name={name} label={label.value} value={String(value)} onChange={onChange}/>
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
 