---
group:
  title: 调试与诊断
  order: 6
order: 4 
title: 循环依赖
demo:
  tocDepth: 5
toc: content
---

# 循环依赖

在复杂的状态中，有时会不经意间会产生循环依赖，这是响应式状态管理中的一个常见问题。
`AutoStore`提供了相应的`循环依赖检测`和`调试跟踪能力`功能,帮助开发者发现和解决循环依赖问题。

## 同步循环依赖检测

构建`AutoStore`时如果存在循环依赖，会抛出异常，开发者可以通过异常信息快速定位问题。

以下示例中就存在循环依赖，构建`store`时会抛出异常。

```tsx
/**
 * title: 循环依赖
 * description: 存在循环依赖时会抛出异常
 * defaultShowCode: true 
 */
import { useStore } from '@autostorejs/react';
import { Box } from "x-react-components"
import { useState,useRef } from "react"
 
export default ()=>{  
  const [error, setError] = useState(null);
  
  const ref = useRef(false)
  try{
    store = useStore({ 
      a: 1,
      b: (scope:any)=>scope.h + 1,
      c: (scope:any)=>scope.b + 1,
      d: (scope:any)=>scope.c + 1,
      e: (scope:any)=>scope.d + 1,
      f: (scope:any)=>scope.e + 1,
      g: (scope:any)=>scope.f + 1,
      h: (scope:any)=>scope.g + 1,
    });
  }catch(e){
      if(!ref.current){
        setError(e.message)
        ref.current=true
      }
  }
  return <div style={{color:'red'}}>{error}</div>
}

```            

## 异步循环依赖检测

异步循环依赖就比较麻烦，无法在构建时自动检测，需要开发者手动跟踪检测。


```tsx
/**
 * title: 循环依赖
 * description: 存在循环依赖时会抛出异常
 * defaultShowCode: true 
 */
import { useStore,computed } from '@autostorejs/react';
import { Box } from "x-react-components"
import { useState,useRef } from "react"
 
export default ()=>{  
  const [error, setError] = useState(null);
  
  const ref = useRef(false)
  let store
  try{
    store = useStore({ 
      a: computed(async (scope:any)=>{
        return scope.b.value + 1
      },['b']),
      b: computed(async (scope:any)=>{
        debugger
        return scope.a.value + 1
      },['a'])
    })
  }catch(e){
      if(!ref.current){
        setError(e.message)
        ref.current=true
      }
  }
  return <div style={{color:'red'}}>{error}</div>
}

```          