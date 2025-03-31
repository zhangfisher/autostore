import { createStore,computed } from '@autostorejs/react';
import React from "react"
import { Button,Layout, JsonView } from "x-react-components"

const store1 = createStore({
    order:{
        a:1, b:2, c:3,                
    },
    user:{
        tags:[100,200,300]
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

    const [ tag1,setTag1 ] = useReactive1("user.tags.1")
    // @ts-ignore
    const [ tag2,setTag2 ] = useReactive2(["myorder","user.tags.1"])

    return <div>
        <Layout>
            <div><JsonView data={state1}/></div>
            <div><JsonView data={state2}/>        </div>
        </Layout>
        <Layout>
        <div>
            <Button onClick={() => setA1(state1.order.a+1)} >A++</Button>
            <Button onClick={() => setA1(state1.order.a-1)} >A--</Button>
            <Button onClick={() => setTag1(state1.user.tags[1]+1)} >Tags[1]++</Button>
            <Button onClick={() => setTag1(state1.user.tags[1]-1)} >Tags[1]--</Button>
        </div>
        <div>
            {/*  @ts-ignore */}
            <Button onClick={() => setA2(state2.myorder['order.a']+1)} >A++</Button>        
            {/*  @ts-ignore */}
            <Button onClick={() => setA2(state2.myorder['order.a']-1)} >A--</Button>        
            {/*  @ts-ignore */}
            <Button onClick={() => setTag1(state2.myorder['user.tags.1']+1)} >Tags[1]++</Button>
            {/*  @ts-ignore */}
            <Button onClick={() => setTag1(state2.myorder['user.tags.1']-1)} >Tags[1]--</Button>
        </div>        
        </Layout>
    </div>
} 
