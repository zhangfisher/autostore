---
group:
  title: 调试与诊断
  order: 6
order: 2 
title: 日志
demo:
  tocDepth: 5
toc: content
---

# 日志

`AutoStore`提供日志功能，用于记录`AutoStore`内部发生的事件，方便调试与诊断。



## 使用方法

当创建`AutoStore`时设置`debug`为`true`时，`AutoStore`会记录内部发生的事件,打印在控制台中，如下：

```ts | pure  {6}
import { createStore } from "@autostorejs/react"

const store = createStore({
  //....
},{
  id:"user",
  debug:true   // 开启调试模式  
})
```

控制台输出样式如下:

![log](./logs.png)

:::warning{title="提示"}
当应用具有多个`AutoStore`时，建议为每个`AutoStore`设置不同的`id`，以便区分不同的`AutoStore`。
:::


## 自定义日志输出

如果对默认的日志输出不满意或者想将`AutoStore`的日志信息转发至您自己的日志系统，可以通过配置`options.log`函数自定义日志输出。

```tsx  
/**
 * title: 自定义日志输出
 * description: 调节`count`值，查看日志输出
 */
import { useStore,computed,delay } from "@autostorejs/react"
import { Box,Button,ColorBlock } from "x-react-components"
import { useRef } from "react"
    // 转义HTML特殊字符
const escapeHtml = (str: string) => str.replace(/&/g, "&amp;")
                                        .replace(/</g, "&lt;")
                                        .replace(/>/g, "&gt;")
                                        .replace(/"/g, "&quot;")
                                        .replace(/'/g, "&#039;");
export default ()=>{
  const ref = useRef()
  const { state, $ } = useStore({
    price:100,
    count:2,
    total:computed((scope)=>scope.price*scope.count)
  },{
      debug:true,  // 开启调试模式
      log:(info,level='info')=>{
        const message = typeof(info)==='function' ? info() : (info instanceof Error ? info.message : info)
        ref.current && ref.current.insertAdjacentHTML("beforeend",
        `<p style='margin:2px;'}>
        <b>[${level}]</b> - ${escapeHtml(message)}</p>`)
      }
  })
 
  return <div> 
      <ColorBlock name="Price">{$('price')}</ColorBlock>
      <ColorBlock name="Count">
        <Button onClick={()=>state.count--}>-</Button>
        {$('count')}
        <Button onClick={()=>state.count++}>+</Button>
      </ColorBlock>
      <ColorBlock name="Total">{$('total')}</ColorBlock> 
      <Button onClick={()=>ref.current.innerHTML=''}>Clear</Button>
    <Box ref={ref}>
    </Box>
  </div>
} 

```

`options.log`的类型声明如下：
```ts | pure
type LogMessageArgs = string | Error | (()=>string)
type LogLevel = 'log' | 'error' | 'warn'
function log(this:AutoStore<any>,message: LogMessageArgs,level:LogLevel='log'){
```