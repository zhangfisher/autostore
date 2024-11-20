# Calculating signal component 
:::warning reminder
Please understand first when reading this section `computed` and `watch` chapter.
:::

## about

In the previous article, we introduced how to encapsulate status data as signal components. Whether the state data path is directed to a normal state data or a calculation attribute, you can pass `$` or `signal` the function encapsulates it as a signal component.
But the premise is that you need to declare in advance in the state `computed` calculate attributes. as follows:

```ts {20-26}
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

The premise of the above method is to need to be `State` pre -state statement `computed` calculate the attribute, and then specify the path of the status data to create a signal component.

This method will have a certain limitations when used in the component, so we provide a more flexible way to create a signal component, that is,**Dynamic creation calculation signal component**.
 

 **The method function signature is as follows:** 

```ts 
interface SignalComponentType<State extends Dict>{
    <Value=any, Scope=any >(
        render:SignalComponentRender,
        getter:AsyncComputedGetter<Value,Scope>,
        options?:SignalComponentOptions
    ):React.ReactNode
    <Value=any, Scope=any >(
        render:SignalComponentRender,
        getter:ComputedGetter<Value,Scope>,
        options?:SignalComponentOptions
    ):React.ReactNode
    <Value=any, Scope=any >(
        render:SignalComponentRender,
        builder: ObserverDescriptorBuilder<string,Value,Scope>,
        options?:SignalComponentOptions
    ):React.ReactNode;
}
```

## Simple calculation signal component

Let's create a computing signal component from a simple synchronous calculation function.


```ts   {3-5,7-9}
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

- In the above code, we created a computing signal component, providing a rendering function and a `computed getter` function,`getter` when the status data returns by the function, the rendering function is automatically triggered.
- When creating information components, it will `computed getter` function automatically create a `computedObject` object, and then create signal components based on this.The following is an example of a synchronous signal component:

<demo react ="signals/signalDynamicBase.tsx"/>

:::warning reminder
The above is created by a synchronous calculation signal component. When the state data is changed, the rendering function will be automatically triggered. Its working principle and `computed` the calculation attributes are the same.
:::


## Synchronous calculation signal component

For synchronous signal components, you can use it `computed` the function packaging synchronization calculation function. The above example is the same, the difference is that it should be used `computed` when you can configure `computed` parameter.

```ts   {3-5,7-9}
$<number>(
    // 渲染函数
    ({value})=>{
      return <div>{value}</div>
    },
    // 同步computed getter获取状态数据
    computed((scope)=>{
      return  scope.user.age
    })
) 
```
 

The following is an example of a synchronous signal component:

<demo react ="signals/signalDynamicComputed.tsx"/>

## Asynchronous computing signal component

You can also create an asynchronous computing signal component, but the creation method of the asynchronous calculation signal component is different from the synchronous calculation signal component.

```ts 
<Value=any, Scope=any >(render:SignalComponentRender,builder: ObserverDescriptorBuilder<string,Value,Scope>):React.ReactNode;
```

Need to pass one `ObserverDescriptorBuilder`,`computed(....)` can build one `ObserverDescriptorBuilder` object, the method of use is the same as the calculation attribute.

The following is an example of an asynchronous computing signal component:

<demo react ="signals/signalDynamicAsync.tsx"/>
 

:::warning reminder
When creating asynchronous signal components, you can use it `computed` all the characteristics created asynchronous computing, including `loading`, Timeout control, retry, error handling, progress, etc.
:::
 