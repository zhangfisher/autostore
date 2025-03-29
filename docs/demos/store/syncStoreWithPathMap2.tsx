import { createStore,computed } from '@autostorejs/react';
import React from "react"
import { Button,Layout, JsonView } from "x-react-components"

const store1 = createStore({
    order:{
        a:1, b:2, c:3,                
    },
    user:{
        tags:['x','y','z']
    }             
})
const { useReactive:useReactive1  } = store1

const store2 = createStore({
    myorder:{
        

    }
})
const { useReactive:useReactive2 } = store2

store1.sync(store2,{
    to:"myorder", 
    pathMap:{
        to:(path:string[],value:any)=>{
            if(typeof(value)!=='object'){
                return [path.join(".")]
            }                    
        },
        from:(path:string[],value:any)=>{
            if(typeof(value)!=='object'){
                return path.reduce<string[]>((result,cur)=>{
                    result.push(...cur.split("."))
                    return result
                },[])
            }
        }
    }
})
 
export default () => {
    const [ state1 ] = useReactive1()
    const [ state2 ] = useReactive2()
    const [ a1,setA1 ] = useReactive1("order.a")
    // @ts-ignore
    const [ a2,setA2 ] = useReactive2(["myorder","order.a"])

    return <div>
        <Layout>
            <div><JsonView data={state1}/></div>
            <div><JsonView data={state2}/>        </div>
        </Layout>
        <Layout>
        <div>
            <Button onClick={() => setA1(state1.order.a+1)} >Store1 A++</Button>        
            <Button onClick={() => setA1(state1.order.a-1)} >Store1 A--</Button>        
        </div>
        <div>
            {/*  @ts-ignore */}
            <Button onClick={() => setA2(state2.myorder['order.a']+1)} >Store2 A++</Button>        
            {/*  @ts-ignore */}
            <Button onClick={() => setA2(state2.myorder['order.a']-1)} >Store2 A--</Button>        
        </div>        
        </Layout>
    </div>
} 
