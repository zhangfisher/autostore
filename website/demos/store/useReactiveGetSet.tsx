import React from "react"
import { createStore } from '@autostorejs/react';
import { ColorBlock } from "x-react-components"
import { Button } from "x-react-components"

 
const { useReactive,state,$ } = createStore( {
  firstName:"Zhang",
  lastName:"Fisher",
  fullName:(state)=>state.firstName+state.lastName,
})


export default () => { 
    const [firstName,setFirstName] = useReactive(
        (state)=>state.firstName,
        (value,state)=>state.firstName=value
    )
    const [fullName,setFullName] = useReactive<string,[string,string]>(
        (state)=>state.fullName,       // getter
        ([first,last],state)=>{        // 可选,setter
            state.firstName=first
            state.lastName=last
        }
    )
    return <div>
        <ColorBlock name="FullName" value={fullName}></ColorBlock>
        <Button onClick={()=>setFirstName(`<${firstName}>`)}>Change FirstName</Button>
        <Button onClick={()=>setFullName(["Hello","Voerkai18n❤️"])}>Change FullName</Button>
    </div>
}
