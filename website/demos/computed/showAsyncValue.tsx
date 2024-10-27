import React from "react"
import { createStore,computed,AsyncComputedObject } from "@autostorejs/react"
import { Box, JsonView } from "x-react-components"

const store = createStore({
  order:{
    price:10,
    count:1,
    total:computed(async (scope)=>{
      return scope.price*scope.count
    },['./price','./count'])
  }
})

export default ()=>{
  return (<>
  <Box title="store.state=">
        {JSON.stringify(store.state)} 
  </Box>
  <Box title={`store.computedObjects.get("order.total")=`}>
        store.computedObjects.get("order.total")! instanceof AsyncComputedObject = {String(store.computedObjects.get("order.total")! instanceof AsyncComputedObject)}
  </Box>
  </>)
  
  
}