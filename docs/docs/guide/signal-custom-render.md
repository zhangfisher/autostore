---
group:
  title: 信号组件
order: 3  
demo:
  tocDepth: 5
toc: content
---

# 自定义渲染

## 介绍

前文将状态数据封装为信号组件的功能相对简单，因此也提供自定义渲染函数，可以在将状态数据封装为信号组件时进行更复杂的外观或样式控制，返回一个`ReactNode`类型的组件。

![](./signal-custom-render.drawio.png)

可以在将**状态数据直接直接封装为信号组件时指定自定义渲染函数**，方法函数签名如下：

```ts | pure
interface SignalComponentType<State extends Dict>{
    <Value=any>(
      render:SignalComponentRender,    // 渲染函数
      path:string | string[]           // 状态数据路径
    ):React.ReactNode 
}
```
 

## 状态信号组件

前文中，我们使用`$('<状态路径>')`将**状态数据直接直接封装为信号组件**，但是缺少更多的控制，此时也可以指定一个自定义渲染函数。

```tsx | pure
<Value=any>(render:SignalComponentRender,path:string | string[]):React.ReactNode
```

将**状态数据直接直接封装为信号组件**指定自定义渲染函数的方式如下：

```ts | pure  {3-5,7}
$(
    // 渲染函数
    ({value})=>{
      return <div>{value}</div>
    },
    // 状态数据的路径
    'user.age'
  )
```

以下是一个`$(render,'<状态路径>')`自定义渲染函数的示例：

```tsx 
/**
* title: 信号组件
* description: `$`是`signal`的简写    
*/
import { useStore,delay,computed } from '@autostorejs/react';
import { Button,ColorBlock } from "components"

export default () => {
  const { state , $ } = useStore({
    user:{
      age:18
    }  
  })
  return <div>
      <ColorBlock name="Age">{$(
        ({value})=>{
          return <div style={{position:'relative',display:'flex',alignItems:'center',color:'red',background:"white"}}>
            <span style={{flexGrow:1}}>{value}</span>
            <Button onClick={()=>state.user.age++}>+Age</Button>
          </div>
        },
        "user.age"
      )}</ColorBlock> 
    </div>
}
```



## 异步状态信号组件

如果状态数据路径所指向的是一个异步计算对象`AsyncComputedValue`时，该对象包含了`loading`、`error`、`value`等属性。

此时同样支持使用`$('<异步计算属性的路径>')`创建一个信号组件。
 

```tsx
/**
* title: 异步信号组件
* description: order.total是一个异步计算属性
*/
import { useStore,delay,computed } from '@autostorejs/react';
import { Button,ColorBlock } from "components"

 
export default () => {
    const { state , $ } = useStore({
    order:{
      price: 100,
      count: 1,
      total: computed(async (order)=>{
        await delay(1000)
        return order.price * order.count
      },['order.price','order.count'],{initial:100})
    }
  })

  return <div> 
      <ColorBlock name="Price">{$('order.price')}</ColorBlock>
      <ColorBlock name="Count">{$('order.count')}</ColorBlock>
      <ColorBlock name="Total" comment="延迟更新">{$('order.total.value')}</ColorBlock>
      <ColorBlock name="Total" comment="延迟更新">{$('order.total')}</ColorBlock>
      <Button onClick={()=>state.order.count++}>+Count</Button>
    </div>
}
```


:::warning{title=提醒}
`$('order.count')`和`$('order.total.value')`是等价的，创建信号组件时，如果发现目标是`AsyncComputedValue`则自动添加`value`。
:::
 

## 异步信号组件控制

如果目标路径是一个异步计算属性，也采用同样的`$(<render>,<path>)`的方式自定义渲染，但此时渲染函数的参数是一个对象`AsyncComputedValue`，包含了`value`、`loading`、`error`、`timeout`、`retry`等属性。

因此，我们可以根据`loading`、`error`等属性进行更多的自定义渲染控制。

```tsx
import { createStore,computed,delay } from '@autostorejs/react';
import { Button,ColorBlock } from "components"

const { state ,$ } = createStore({
  order:{
    price:100,
    count:1,
    total:computed(async (order)=>{
      await delay(2000)
      return order.price * order.count
    },["./price","./count"])
  }
})

export default () => {

  return <div>
      <ColorBlock name="Price">{$('order.price')}</ColorBlock>
      <ColorBlock name="Count">{$('order.count')}</ColorBlock>
      <ColorBlock name="Total">{$(({value,loading})=>{
        return <>
            {loading && <span>正在计算...⏳</span>}
            {!loading && <span>{value}💸💸💸💸💸</span>}
        </>
      },"order.total")}</ColorBlock>
      <Button onClick={()=>state.order.count++}>Count++</Button>
    </div>
}
```



:::warning{title=注意🌝} 
您可能已经注意到了，当前页面的渲染色块组件都不会变化⚡。这就是信号组件细粒度更新的魅力所在，状态变化时，组件的渲染仅限制在信号组件内部。
:::
