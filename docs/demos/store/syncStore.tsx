import { createStore,computed } from '@autostorejs/react';
import React from "react"
import { Button,Layout, JsonView } from "x-react-components"

const { state:state1  } = createStore({
    order:{
        price: 9.9,
        count: 2,
        total: computed((order)=>order.price * order.count)

    }
})

const { state:state2 } = createStore({
    order:{
        price: 9.9,
        count: 2,
        total: 19.8,

    }
})
 
export default () => {
    return <div>
        <Layout>
            <JsonView data={state1}/>
            <JsonView data={state2}/>        
        </Layout>
        <Layout>
        <div>
            <Button onClick={() => state1.order.count++} >Count++</Button>        
            <Button onClick={() => state2.order.count--} >Count--</Button>        
        </div>
        <div>
            
        </div>        
        </Layout>
    </div>
} 
