import React from "react"
import { createStore } from '@autostorejs/react';
import { ColorBlock,Button,Box } from "x-react-components"


const store = createStore({
  firstName:"Zhang",
  lastName:"Fisher",
  age:18
})

const FirstName = React.memo((props)=>{
    const [firstName] = store.useReactive('firstName') 
    return <ColorBlock name={`子组件:FirstName`}>
      {firstName} 
    </ColorBlock>
})
const LastName = React.memo((props)=>{
    const [lastName] = store.useReactive('lastName') 
    return <ColorBlock name={`子组件:lastName`}>
      {lastName}
    </ColorBlock>
}) 
export default ()=>{ 
    const [age] = store.useReactive('age') 

  return <>
        <Box title="根组件">
            <ColorBlock name="FullName">Hello :{store.state.firstName}{' '}{store.state.lastName}</ColorBlock>
            <ColorBlock name="Age">{age}</ColorBlock>      
        </Box>
        <Box title="子组件">
            <FirstName/>
            <LastName/>
        </Box>
        <Button onClick={()=>store.state.age=store.state.age+1}>Age++</Button>
        <Button onClick={()=>store.state.firstName=store.state.firstName+"."}>Change FirstName</Button>
    </>
}