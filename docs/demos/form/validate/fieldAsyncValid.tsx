import React from "react"
import {  useForm,delay,assert  } from "@autostorejs/react";
import { Button,Input,Layout, JsonView,Loading } from "x-react-components" 


 
export default ()=>{

    const { Form,Field,useReactive,reset,useComputed } = useForm({        
        user:{
            name:"fisher",
            age:12,
            vip:true
        }
    })

    const [ state ] = useReactive() 

    return <Layout>    
        <div>            
            <Form>
                <Field
                    name="user.name"
                    label="Name"
                    render={({bind,label})=>{                         
                        const valid = useComputed<boolean>(async (name:string)=>{
                            await delay(1000) // 模拟异步验证
                            return assert(name.length>3,"name长度必须大于3")
                        },{
                            depends:["user.name"],
                            scope:'user.name',
                            onError:()=>false
                        })

                        return <div>
                            <Input label={label} {...bind}/>
                            { valid.loading 
                                ? <Loading title="正在校验...."/> 
                                : !valid.value && <span style={{color:'red'}}>{valid.error}</span>  
                            }
                        </div>
                    }}
                />          
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
