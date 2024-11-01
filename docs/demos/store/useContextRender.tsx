import React,{createContext,useContext,useState} from "react"
import { ColorBlock,Button,Divider,Box } from "x-react-components"

const ctx = createContext({
  firstName:"Zhang",
  lastName:"Fisher",
  age:18
})

const Child = React.memo((props:any)=>{
    const context=useContext(ctx)
    return <ColorBlock name={`子组件:${props.name}`}>
      <span>Hello :{context.firstName}{' '}{context.lastName}</span> 
    </ColorBlock>
})


let count:number = 0
export default ()=>{
  const [user,setUser] = useState({
    firstName:"Zhang",
    lastName:"Fisher",
    age:18
  })
  return <ctx.Provider value={user}>
      <Box title="根组件">
        <ColorBlock name={'FullName'}>{user.firstName}{' '}{user.lastName}</ColorBlock>
        <ColorBlock name={'Age'}>Age :{user.age}</ColorBlock>
      </Box>
      <Box title="子组件">
        <Child name="A"/>
        <Child name="B"/>
      </Box>
      <Button onClick={()=>{
        setUser({firstName:"Zhang",lastName:"Fisher",age:++count})
      }}>+Age</Button>
    </ctx.Provider>
}