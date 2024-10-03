---
group:
  title: 信号组件
order: 4  
demo:
  tocDepth: 5
toc: content
---

# 计算信号组件
 

## 介绍

前文中，我们介绍了如何将状态数据封装为信号组件，无论状态数据路径所指向的是一个普通状态数据还是一个计算属性，都可以通过`$`或`signal`函数将其封装为信号组件。
但是前提是需要在状态中预先声明`computed`计算属性。如下：

```ts | pure
import { createStore } from '@autostorejs/react';
const store = createStore({
  order:{
    price:100,
    count:3,
    // 简单同步计算属性
    total:(order)=>order.price * order.count
    // 使用computed函数创建计算属性
    totalAsync:computed(async (order)=>{
      await delay(1000)
      return order.price * order.count
    },['./price','./count'],{initial:100})
  }
})

// 创建信号组件
const { state , $ } = store
()=>{
  return <>
    // 简单地封装一个状态数据为信号组件
    {$('order.price')}
    // 封装一个计算属性为信号组件
    {$('order.total')}
    {$('order.total.value')}
    // 自定义渲染函数
    {$(({value})=>{....},'order.total')}
  </>
}
```

以上方法的前提是需要在`State`中预先声明`computed`计算属性，然后指定状态数据的路径来创建信号组件。

这种方法在组件中使用时，会有一定的局限性，因此我们提供了一种更加灵活的方式来创建信号组件，即**动态创建计算信号组件**。


![](./signal-computed.drawio.png)

**方法函数签名如下：**

```ts | pure
interface SignalComponentType<State extends Dict>{
    <Value=any, Scope=any >(render:SignalComponentRender,getter:AsyncComputedGetter<Value,Scope>):React.ReactNode
    <Value=any, Scope=any >(render:SignalComponentRender,getter:ComputedGetter<Value,Scope>):React.ReactNode
    <Value=any, Scope=any >(render:SignalComponentRender,builder: ObserverDescriptorBuilder<string,Value,Scope>):React.ReactNode;
}
```

- **自定义渲染函数**

当所依赖的状态数据变化时会自动重新本渲染函数，返回一个`ReactNode`类型的组件。

**自定义渲染函数的类型声明如下：**

```ts | pure {2}
type AsyncComputedValue<Value = any,ExtAttrs extends Dict = {}> ={
    value   : Value;                // 状态数据
    // 以上属性仅在目标状态是异步计算属性时有效
    loading : boolean;          
    progress: number;                // 进度值    
    timeout : number ;               // 超时时间，单位ms，当启用超时时进行倒计时
    error   : any;
    retry   : number                 // 重试次数，当执行重试操作时，会进行倒计时，每次重试-1，直到为0时停止重试
    run     : (options?:RuntimeComputedOptions) => {};        // 重新执行任务
    cancel  : ()=>void                                        // 中止正在执行的异步计算
  } & ExtAttrs

type SignalComponentRender<Value=any> =(value:AsyncComputedValue<Value>)=>React.ReactNode

```

 - **可观察对象构建函数**

 `可观察对象` 包括`computed`和`watch`两种，因此在创建信号组件时，也支持传入一个`ObserverDescriptorBuilder`构建函数，用于创建一个可观察对象，然后再基于此创建信号组件。

:::warning
✈️通俗地说，就是通过`builder`函数创建一个`computed`或`watch`对象，然后再基于此创建信号组件。
:::

 在前文中关于`computed`和`watch`章节中，我们已经介绍了如何创建一个`computed`或`watch`对象，这里不再赘述。 


## 简单计算信号组件

我们先从一个简单的同步计算函数来创建一个计算信号组件。


```ts | pure  {3-5,7-9}
$(
    // 渲染函数
    ({value})=>{
      return <div>{value}</div>
    },
    // 同步computed getter获取状态数据
    (scope)=>{
      return  scope.user.age
    }
) 
```

-  以上代码中，我们创建了一个计算信号组件，提供了一个渲染函数和一个`computed getter`函数，当`getter`函数返回的状态数据变化时，会自动触发渲染函数。
-  在创建信息组件时，会`computed getter`函数自动创建一个`computedObject`对象，然后再基于此创建信号组件。


:::warning{title=提示}
以上创建的是一个同步计算信号组件，当所依赖的状态数据变化时，会自动触发渲染函数。其工作原理与`computed`计算属性相同。
:::


以下是一个同步信号组件的示例：

```tsx  
/**
 * title:信号组件
 * description:`signal`的简写 
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
        // 渲染函数
        ({value})=>{
          return <div>{value}</div>
        },
        // 同步computed getter获取状态数据
        (scope)=>{
          return  scope.user.age
        })
      }</ColorBlock>
      <Button onClick={()=>state.user.age++}>+Age</Button>
    </div>
}
``` 



:::warning{title=注意🌝}
以上的信号组件均是基于`State`中已经声明的`computed`计算属性创建的。也支持**动态创建一个计算属性，然后再基于此创建信号组件**。
:::


## 异步计算信号组件

也可以创建一个异步计算信号组件，但是异步计算信号组件的创建方式与同步计算信号组件有所不同。

 

以下是一个异步计算信号组件的示例：

```tsx  
/**
 * title:信号组件
 * description:`signal`的简写 
 */ 
import { useStore,delay,computed } from '@autostorejs/react';
import { Button,ColorBlock } from "components"

export default () => {
  const { state, $ } = useStore({
    order:{
      price:10,
      count:1 
    }  
  })
  return <div>
      <ColorBlock name="Age">{$(
        // 渲染函数
        ({value,loading})=>{
          debugger
          return <div>
            {loading ? '计算中...' : value }💸💸
          </div>
        },
        // 异步computed
        computed(async (scope)=>{
          await delay(2000)
          return  scope.order.price * scope.order.count
        },['order.price','order.count'],{initial:10})
      )}</ColorBlock>
      <Button onClick={()=>state.order.count++}>Count++</Button>
    </div>
}
``` 























