# 计算信号组件
 
:::warning 提示
阅读本节时请先理解`computed`和`watch`章节。
:::

## 关于

前文中，我们介绍了如何将状态数据封装为信号组件，无论状态数据路径所指向的是一个普通状态数据还是一个计算属性，都可以通过`$`或`signal`函数将其封装为信号组件。
但是前提是需要在状态中预先声明`computed`计算属性。如下：

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

以上方法的前提是需要在`State`中预先声明`computed`计算属性，然后指定状态数据的路径来创建信号组件。

这种方法在组件中使用时，会有一定的局限性，因此我们提供了一种更加灵活的方式来创建信号组件，即**动态创建计算信号组件**。
 

**方法函数签名如下：**

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

## 简单计算信号组件

我们先从一个简单的同步计算函数来创建一个计算信号组件。


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

-  以上代码中，我们创建了一个计算信号组件，提供了一个渲染函数和一个`computed getter`函数，当`getter`函数返回的状态数据变化时，会自动触发渲染函数。
-  在创建信息组件时，会`computed getter`函数自动创建一个`computedObject`对象，然后再基于此创建信号组件。以下是一个同步信号组件的示例：

<demo react="signals/signalDynamicBase.tsx"/>

:::warning 提示
以上创建的是一个同步计算信号组件，当所依赖的状态数据变化时，会自动触发渲染函数。其工作原理与`computed`计算属性相同。
:::


## 同步计算信号组件

对于同步信号组件，可以使用`computed`函数封装同步计算函数，以上例功能是一样的，差别在于当使用`computed`时，可以配置`computed`参数。

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
 

以下是一个同步信号组件的示例：

<demo react="signals/signalDynamicComputed.tsx"/>

## 异步计算信号组件

也可以创建一个异步计算信号组件，但是异步计算信号组件的创建方式与同步计算信号组件有所不同。

```ts 
<Value=any, Scope=any >(render:SignalComponentRender,builder: ObserverDescriptorBuilder<string,Value,Scope>):React.ReactNode;
```

需要传入一个`ObserverDescriptorBuilder`，`computed(....)`可以构建一个`ObserverDescriptorBuilder`对象，其使用方法与计算属性相同。 

以下是一个异步计算信号组件的示例：

<demo react="signals/signalDynamicAsync.tsx"/>
 

:::warning 提示
创建异步信号组件时，可以使用`computed`创建的异步计算的所有特性，包括`loading`、超时控制、重试、错误处理、进度等等。
:::
 
