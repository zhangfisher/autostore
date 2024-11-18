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
    tracker.start((op)=>{        
        // 预期整个执行流程会修改d的值，因此应该在d的set value上停止
        return op.type=='set' && op.path.length===2 && op.path[0] === 'd' && op.path[1] === 'value'
    }).then(ops=>{
      ops.forEach(operate=>{
        ref.current.insertAdjacentHTML("beforeend",`<p style='margin:2px;'}>
        ${operate.type} ${operate.path.join('.')}</p>`)
      })
    })
  },[])

  return <Box ref={ref}/> 
} 