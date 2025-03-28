import { createStore,computed } from '@autostorejs/react';
import React from "react"
import { Button,Layout, JsonView } from "x-react-components"

const store1 = createStore({
    order:{
        price: 10,
        count: 2,
        total: computed((order)=>order.price * order.count)

    }
})
const { useReactive:useReactive1  } = store1
const store2 = createStore({
    order:{
        price: 10,
        count: 2,
        total: 19.8,

    }
})

const { useReactive:useReactive2 } = store2

store1.sync(store2)
 
export default () => {
    const [ state1 ] = useReactive1()
    const [ state2 ] = useReactive2()
    const [ count1,setCount1 ] = useReactive1("order.count")
    const [ count2,setCount2 ] = useReactive2("order.count")

    return <div>
        <Layout>
            <div><JsonView data={state1}/></div>
            <div><JsonView data={state2}/>        </div>
        </Layout>
        <Layout>
        <div>
            <Button onClick={() => setCount1(state1.order.count+1)} >Store1 Count++</Button>        
            <Button onClick={() => setCount1(state1.order.count-1)} >Store1 Count--</Button>        
        </div>
        <div>
            <Button onClick={() => setCount2(state2.order.count+1)} >Store2 Count++</Button>        
            <Button onClick={() => setCount2(state2.order.count-1)} >Store2 Count--</Button>        
        </div>        
        </Layout>
    </div>
} 
