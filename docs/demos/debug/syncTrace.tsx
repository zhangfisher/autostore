import React from "react"
import { createStore } from "@autostorejs/react"
import { Box } from "x-react-components"
import { useRef,useEffect } from "react"


const { state,trace } = createStore({
  a:1,
  b:2,
  c:(scope)=>scope.a+scope.b
})

export default ()=>{

  const ref = useRef<any>()

  useEffect(()=>{
    const tracker = trace(()=>{
      state.a = 10
      state.b = 20
    })   
    tracker.start().then(ops=>{
      ops.forEach(operate=>{
        ref.current!.insertAdjacentHTML("beforeend",`<p style='margin:2px;'}>
        ${operate.type} ${operate.path.join('.')}</p>`)
      })
    })
  },[])
  return <Box ref={ref}/> 
} 
