---
group:
  title: 调试与诊断
  order: 6
order: 1 
title: trace
demo:
  tocDepth: 5
toc: content
---

# trace

由于状态之间可能存在复杂的依赖计算关系，为了更好的调试状态的变化，`AutoStore`提供了一个`trace`函数来帮助调试`AutoStore`的状态操作。

`trace`函数的签名如下：

```ts
type StateTracker= {
    stop:()=>void,
    start(isStop?:(operate:StateOperate)=>boolean):Promise<StateOperate[]>
}
trace(fn: SyncFunction,operates?:WatchListenerOptions['operates']):StateTracker { 
```

## 同步跟踪


```ts | pure {9-14}
import { createStore } from "@autostorejs/react"

const { state, trace } = createStore({
  a:1,
  b:2,
  c:(scope)=>scope.a+scope.b
})

// 创建跟踪器
tracker = trace(()=>{
  state.a = 1
  state.b = 2
})     
// 开始跟踪
tracker.start((operate)=>{
  console.log(operate)
})  
// 函数执行完毕时自动结束跟踪，异步函数可以使用stop来停止跟踪
tracker.stop()  

```

实际体验一下：


```tsx  
import { createStore } from "@autostorejs/react"
import { Box } from "x-react-components"
import { useRef,useEffect } from "react"


const { state,trace } = createStore({
  a:1,
  b:2,
  c:(scope)=>scope.a+scope.b
})

export default ()=>{

  const ref = useRef()

  useEffect(()=>{
    const tracker = trace(()=>{
      state.a = 10
      state.b = 20
    })   
    tracker.start().then(ops=>{
      ops.forEach(operate=>{
        ref.current.insertAdjacentHTML("beforeend",`<p style='margin:2px;'}>
        ${operate.type} ${operate.path.join('.')}</p>`)
      })
    })
  },[])

  return <Box ref={ref}> 
  </Box>
} 

```

