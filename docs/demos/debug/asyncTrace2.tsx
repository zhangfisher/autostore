import React from "react"
import { createStore,computed,delay } from "@autostorejs/react"
import { Box } from "x-react-components"
import { useRef,useEffect } from "react"

const { state, trace } = createStore({
  a:1,
  b:2,
  c:computed(async (scope)=>scope.a+scope.b,["a","b"],{initial:3}),
  d:computed(async (scope)=>scope.c.value+1,["c"],{initial:4})
})
 
export default ()=>{

  const ref = useRef<any>()

  useEffect(()=>{
    const tracker = trace(async ()=>{      
      state.a = 10
      await delay()
      state.b = 20
    })   
    tracker.start().then(ops=>{
      ops.forEach(operate=>{
        ref.current.insertAdjacentHTML("beforeend",`<p style='margin:2px;'}>
        ${operate.type} ${operate.path.join('.')}</p>`)
      })
    })
  },[])

  return <Box ref={ref}/> 
} 