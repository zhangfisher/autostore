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
                render={({ label,bind,validate  })=>{
                    return <Input label={label} {...bind}  validate={validate} />
                }}
            />
            <Field 
                name="order.price" 
                label="Price"
                render = {({ label,bind,validate  })=>{
                    return <Input label={label} {...bind}  validate={validate} />
                }}
            />
            <Field 
                name="order.count" 
                label="Count"
                validate = {(value)=>{
                    return value>0 && state.order.price > 9
                }}
                render = {({ label,bind,validate })=>{
                    return <>
                        <Input label={label} {...bind}/>
                        {!validate && <span style={{color:'red'}}>count must be greater than 0 and price must be greater than 9</span>}
                    </>
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

