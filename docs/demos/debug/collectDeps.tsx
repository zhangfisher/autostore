import React from "react"
import { createStore } from "@autostorejs/react"
import { Box } from "x-react-components"
import { useRef,useEffect } from "react"

const { state, collectDependencies } = createStore({
  a:1,
  b:2,
  c:3
})
 
export default ()=>{

  const ref = useRef<any>()

  useEffect(()=>{
    const deps = collectDependencies(()=>{
        state.a = 4  
        state.b = 5
        state.c      
    })
    deps.forEach(dep=>{
        ref.current.insertAdjacentHTML("beforeend",`<p style='margin:2px;'}>
        ${dep.join(".")} </p>`)
    })
  },[])

  return <Box ref={ref}/> 
} 