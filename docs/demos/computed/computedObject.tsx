import React from "react"
import { createStore,computed } from '@autostorejs/react';
import { RichLabel, Box,ColorBlock,Button } from "x-react-components"

let count=0
const store = createStore({
  user:{
    firstName:"Zhang",
    lastName:"Fisher",
    fullName: (user)=>{
      return user.firstName+user.lastName + `${++count}`
    },
    fullName2: computed(async (user)=>{
      return user.firstName+user.lastName  + `${++count}`
    },["./firstName","./lastName"]),
    fullName3: computed(async (user)=>{
      return user.firstName+user.lastName  + `${++count}`
    },["./firstName","./lastName"],{id:"myname"}) 
  }
} )

export default ()=>{
  const [state] = store.useState()

  return (<div>
    <ColorBlock name="FirstName">{state.user.firstName}</ColorBlock>
    <ColorBlock name="lastName">{state.user.lastName}</ColorBlock>
    <ColorBlock name="FullName"  value={state.user.fullName}/>
    <ColorBlock name="FullName2"  value={state.user.fullName2.value}/>
    <Box>
        <RichLabel text={`typeof(store.computedObjects)=={${typeof(store.computedObjects)}}`}/>
        <RichLabel text={`store.computedObjects instanceof Map={${String(store.computedObjects instanceof Map)}}`}/>
        <RichLabel text={`store.computedObjects.size={${store.computedObjects.size}}`}/>
        <RichLabel text={`store.computedObjects.keys()={${[...store.computedObjects.keys()].join(" , ")}}`}/>
        <Button onClick={()=>store.computedObjects.get("user.fullName")!.run()}>手动执行fullName计算函数</Button>
        <Button onClick={()=>store.computedObjects.get("user.fullName2")!.run()}>手动执行fullName2计算函数</Button>
        <Button onClick={()=>store.state.user.fullName2.run()}>手动执行fullName2计算函数</Button>
    </Box>
  </div>)
}


