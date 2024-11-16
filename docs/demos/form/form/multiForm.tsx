import React from "react"
import { createStore, useForm } from "@autostorejs/react";
import { Button, Box, Input, JsonView, Layout, ColorBlock } from "x-react-components";


const sumOrder = (order)=>order.price * order.count

const store = createStore({
    orders:[
        {
            name:"精通AutoStore",
            price:18,
            count:2,
            total:sumOrder
        },
        {
            name:"AutoStore最佳实践",
            price:98,
            count:1,
            total:sumOrder
        }
    ],
    total:(state)=>state.orders.reduce((total,order)=>total+order.total,0) 
  }) 

   

export default ()=>{
    
    const [ state ] = store.useReactive()
      return (<div>        
            {state.orders.map((order,index)=>{
                const { Form,reset } = useForm(store,{entry:`orders.${index}`})
                return <Box key={index}>
                        <Form>
                            <ColorBlock name="Order Total">{order.total}</ColorBlock>   
                            <Input label="Name" name="name" />
                            <Input label="Price"  name="price" type="number" />
                            <Input label="count"  name="count" type="number" />                                                                  
                            <Button onClick={()=>{}}>Submit</Button>
                            <Button onClick={()=>reset()}>Reset</Button>
                        </Form>
                    </Box>  
            })}     
            <Box>
                <JsonView data={state}/>
            </Box>
        </div>
      )
}
