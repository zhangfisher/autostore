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

异步循环依赖就比较麻烦，无法像同步循环一样构建时自动检测。因为异步计算属性的计算函数是异步的，很容易在多个异步计算时形成很复杂的循环调用链。

`AutoStore`提供了`cycleDetect`扩展，用来帮助检测异步计算属性的循环依赖。但是由于进行循环依赖检测需要一定的成本开消，
所以该功能是作为一个扩展，需要手动安装。
 
### 启用检测

```ts | pure
 import { installCycleDetectExtend }  from '@autostorejs/devtools'
 
installCycleDetectExtend({
  onDetected:(paths)=>{
    console.error("发现循环依赖:",paths)
    return 'disable'
  }  
})

```

### 示例

```tsx
/**
 * title: 打开控制台观察信息
 * description: 由于`a`,`b`存在循环依赖，内部会忽略`a`,`b`的计算，导致`a`,`b`的值为无法计算。
 * defaultShowCode: false
 */
import { useStore,computed } from '@autostorejs/react';
import { Box,ColorBlock,Button,JsonView } from "x-react-components"
import { useState,useRef } from "react"
import { installCycleDetectExtend }  from '@autostorejs/devtools'
 
installCycleDetectExtend({
  onDetected:(paths)=>{
    console.error("发现循环依赖:",paths)
    return 'disable'
  }  
})

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
      debug:true
    }) 
  const [ data ] = store.useState()
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

- 在控制台可以发现`发现循环依赖: a->b->a.loading->a.timeout->a.retry->a.error->a.value->a.progress->b.loading->b.timeout->b.retry->b.error->b.value->b.progress->x`的信息，这是循环依赖的路径。
- `onDetected`回调函数返回`disable`代表当检测到循环依赖后，会禁用该计算属性，这样就可以避免循环依赖导致的问题。

### 基本原理

异步循环依赖检测比较复杂，特别是在异步计算属性中，很容易形成很复杂的循环调用链。

循环依赖检测的基本原理如下：

- 安装`cycleDetect`扩展后，会对每个异步计算属性的`run`函数进行包装。
- 当计算属性第一次运行时，执行`store.wath`记录侦听所有的`get`读操作事件。如果存在循环依赖，就会执行计算属性的`run`函数，从而可以收集到大量的`get`事件。
- 当侦听到指定`maxOperates`数量的`get`事件后,进行分析，找出事件列表中的循环依赖路径即可。
- 然后执行`onDetected`回调函数，由开发者决定如何处理：
  - `return 'disable'`： 代表禁用该计算属性。
  - `return 'ignore'`:  代表忽略
  - 其他会触发错误

### 配置参数

`installCycleDetectExtend`具有以下配置参数：

| 参数        | 类型     | 默认值 | 说明                                                        |
| ----------- | -------- | ------ | ----------------------------------------------------------- |
| `maxOperates` | `number`   | `200`    | 最大操作数，从开始运行计算函数后，当收集到此数量的操作事件后开如分析。|
| `onDetected`  | `(paths:string)=>'disable' \| 'ignore' \| void` | -      | 当检测到循环依赖时的回调函数，返回`disable`代表禁用该计算属性，返回`ignore`代表忽略,其他触发错误。|




