import React from 'react';
import { useForm } from '@autostorejs/react';
import { Button,Input, Layout, JsonView } from "x-react-components"



export default ()=>{ 
    const { reset, useReactive, Field } = useForm({
        order:{
          name:"精通AutoStore",
          price: 9.9,
          count: 1,      
        }
    })

    const [ state ] = useReactive()
 
    return <Layout>    
        <div>
            <Field 
                name="order.name" 
                label="Name"
                render={({ bind })=>{
                    return <Input {...bind} />
                }}
            />    
            <Field 
                name="order.price" 
                label="Price"
                render={({ bind })=>{
                    return <Input {...bind} />
                }}
            />    
            <Field 
                name="order.count" 
                label="Count"
                validate={(value)=>{
                    if(state.order.price > 10){
                        return value>0 && value<10 
                    }
                    return value>0
                }}
                render={({ bind })=>{
                    return <Input {...bind} />
                }}
            />    
            <Button onClick={()=>{
                reset()           
            }}>Reset</Button>
        </div>
        <div>
            <JsonView border={false} data={state}/>
        </div>
    </Layout>
}

