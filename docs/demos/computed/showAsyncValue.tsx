import React from "react"
import { createStore,computed } from "@autostorejs/react"
import { Box,JsonView } from "x-react-components"

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
    <JsonView data={store.state}
      highlightKeys={['total','loading','error','value','progress','retry','timeout']}
    />
  </Box>
  <Box title={`store.computedObjects.get("order.total")=`}>
        {/* 计算对象实例 */}
        typeof store.computedObjects.get("order.total") = {typeof store.computedObjects.get("order.total")}
  </Box>
  </>)
}
