import React from 'react';
import { createStore,watch } from '@autostorejs/react';
import { Divider,ColorBlock,Button,Box,Input } from "x-react-components"

 const { state,useFields,watchObjects,$  } = createStore({
  user:{
    firstName:"Zhang",
    lastName:"Fisher",
    fullName:(user)=>{
      return user.firstName + " " + user.lastName
    }, 
    dirty:watch(({path,value},watchObj)=>{   
            //watchObj.cache是一个{...}对象 
            watchObj.cache[path.join(".")] = true
            return true
        },
        (path)=>{
          // 在本例中，只有firstName和lastName会触发dirty
          return ['firstName','lastName'].includes(path[path.length-1])
        },
        {initial:false})
  }
} )

export default ()=>{
  const bindings = useFields({entry:'user'})
  return (<div>
    <Input label="FirstName" {...bindings.firstName}/>
    <Input label="lastName" {...bindings.lastName}/> 
    <Divider/>
    <Box>
      <ColorBlock name="FullName">{$('user.fullName')}</ColorBlock>
      <ColorBlock name="Dirty">{$('user.dirty')}</ColorBlock>
      <Button onClick={()=>{
          state.user.firstName = "Zhang"
          state.user.lastName = "Fisher"
          // 重置dirty
          watchObjects.get("user.dirty")!.reset()
      }}>Reset</Button>
    </Box>
    <Box>
    <div>typeof(store.watchObjects)=={typeof(watchObjects)}</div>
    <div>store.watchObjects.size={watchObjects.size}</div>
    <div>store.watchObjects.size={watchObjects.size}</div>
    <div>store.watchObjects.keys()={[...watchObjects.keys()].join(" , ")}</div>
    </Box> 
  </div>)
}
 