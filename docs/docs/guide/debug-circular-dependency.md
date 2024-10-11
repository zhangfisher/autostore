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

```tsx | pure
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

异步循环依赖就比较麻烦，无法像同步循环一样构建时自动检测，而是通过`computedOptions.maxReentry`来控制计算函数的重入次数，当重入次数超过最大重入次数时，就出错。

```tsx
/**
 * title: 更新x值
 * description: 由于`a`,`b`存在循环依赖，内部会忽略`a`,`b`的计算，导致`a`,`b`的值为无法计算。
 * defaultShowCode: false
 */
import { useStore,computed } from '@autostorejs/react';
import { Box,ColorBlock,Button,JsonView } from "x-react-components"
import { useState,useRef } from "react"
 
export default ()=>{  
  const [error, setError] = useState(null);
  
  let store = useStore({ 
      x:1,
      a: computed(async (scope:any)=>{
        return scope.b.value + scope.x
      },['b','x']),
      b: computed(async (scope:any)=>{
        return scope.a.value + + scope.x
      },['a','x'])
    },{
      debug:true,
      // 当计算函数达到最大重入时会触发此回调
      onComputedCancel:({path,reason})=>{
        setError(reason)
      }
    }) 
  const [data] = store.useState()
  return <div>
    <ColorBlock name="x">
        <Button onClick={()=>store.state.x--}>-</Button>
        {store.$('x')}
        <Button onClick={()=>store.state.x++}>+</Button>
    </ColorBlock>
    <div style={{color:'red'}}>{error}</div>
    <JsonView data={data}/>
    </div>
}

```          

**注意：**

- 默认情况下，`computedOptions.maxReentry=0`，即不允许在计算函数重入。因此，当上述例子中的`a`和`b`计算属性存在循环依赖关系时，计算函数就必会必然会反复重入，这时由于`maxReentry`的限制就会退出计算函数，从而不会进入无限循环。但是副作用就是`a`和`b`的值将无法计算，所以上述例子中`a`和`b`的值为`null`。
- 如果需要允许计算函数重入，可以通过`computedOptions.maxReentry`为一个合适的值,当重入次数超过最大重入次数时，就退出错错。。


```tsx
/**
 * title: 更新x值
 * description: 由于`a`,`b`存在循环依赖，内部会忽略`a`,`b`的计算，导致`a`,`b`的值为无法计算。
 * defaultShowCode: false
 */
import { useStore,computed } from '@autostorejs/react';
import { Box,ColorBlock,Button,JsonView } from "x-react-components"
import { useState,useRef } from "react"
 
export default ()=>{  
  const [error, setError] = useState(null);
  
  let store  = useStore({ 
      x:1,
      a: computed(async (scope:any)=>{
        return scope.b.value + scope.x
      },['b','x']),
      b: computed(async (scope:any)=>{
        return scope.a.value + + scope.x
      },['a','x'])
    },{
      debug:true,
      // 指定计算函数最大重入次数
      maxReentry:10,
      // 当计算函数达到最大重入时会触发此回调
      onComputedCancel:({path,reason})=>{
        setError(reason)
      }
    }) 
  const [data] = store.useState()
  return <div>
    <ColorBlock name="x">
        <Button onClick={()=>store.state.x--}>-</Button>
        {store.$('x')}
        <Button onClick={()=>store.state.x++}>+</Button>
    </ColorBlock>
    <div style={{color:'red'}}>{error}</div>
    <JsonView data={data}/>
    </div>
}

```          