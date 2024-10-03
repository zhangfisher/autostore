---
group:
  title: 信号组件
order: 4  
demo:
  tocDepth: 5
toc: content
---

# 异步信号组件

当创建了`AutoStore`后，可以使用`$`或`signal`来创建信号组件。

`AutoStore`支持多种方式创建信号组件，创建信号组件的函数`$`或`signal`签名如下：

```ts | pure
interface SignalComponentType<State extends Dict>{
    (selector: string):React.ReactNode
    <Value=any>(selector: (state:ComputedState<State>)=>Value):React.ReactNode
    <Value=any>(render:SignalComponentRender,path:string | string[]):React.ReactNode
    <Value=any, Scope=any >(render:SignalComponentRender,getter:AsyncComputedGetter<Value,Scope>):React.ReactNode
    <Value=any, Scope=any >(render:SignalComponentRender,getter:ComputedGetter<Value,Scope>):React.ReactNode
    <Value=any, Scope=any >(render:SignalComponentRender,builder: ObserverDescriptorBuilder<string,Value,Scope>):React.ReactNode;
}
```

以下将分别明确介绍不同的信号组件创建方式。


## 同步信号组件

使用`$('<状态路径>')`将**状态数据直接直接封装为信号组件**，当状态数据变化时，自动触发信号组件的重新渲染。

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
      <ColorBlock name="Age">{$('user.age')}</ColorBlock>
      <Button onClick={()=>state.user.age++}>+Age</Button>
    </div>
}
```


## 组合同步信号组件

使用`$((state)=>{.....})`将多个状态数据组合创建为一个信号组件，当依赖的状态数据变化时，该信号组件会自动触发重新渲染。

```tsx 
import { createStore,computed,delay } from '@autostorejs/react';
import { Button,ColorBlock } from "components"

const { state ,signal, $ } = createStore({
  user:{
    firstName:"张",
    lastName:"三",
    fullName:computed(async (user)=>{
      await delay(1000)
      return user.firstName + ' ' + user.lastName
    },["./firstName","./lastName"])
  }
})

export default () => {

  return <div>
      <ColorBlock name="FirstName">{$('user.firstName')}</ColorBlock>
      <ColorBlock name="LastName">{$('user.lastName')}</ColorBlock>
      <ColorBlock name="FullName">{$('user.fullName')}&nbsp;&nbsp;-&nbsp;&nbsp;延迟更新</ColorBlock>
      <ColorBlock>FullName :{$(state=>state.user.firstName + ' ' + state.user.lastName)}</ColorBlock>
      <Button onClick={()=>state.user.firstName=state.user.firstName+'❤️'}>Change FirstName</Button>
      <Button onClick={()=>state.user.lastName=state.user.lastName+'.'}>Change LastName</Button>
    </div>
}
```

:::info{title=提醒}
以上当我们单击`Change FirstName`或`Change LastName`时，`FullName`会自动更新，但是色块的颜色不会变化，并且右则的`Render Count`数字也不会变化，也就是`ColorBlock`没有重新渲染。
:::


## 异步信号组件

当状态数据是异步数据对象`AsyncComputedValue`时，该对象包含了`loading`、`error`、`value`等属性。

此时同样支持使用`$('<异步计算属性的路径>')`创建一个信号组件。
 

```tsx
/**
* title: 异步信号组件
* description: `order.total`是一个异步计算属性
*/
import { createStore,delay,computed } from '@autostorejs/react';
import { Button,ColorBlock } from "components"

const { state, $ } = createStore({
  order:{
    price: 100,
    count: 1,
    total: computed(async (order)=>{
      await delay(1000)
      return order.price * order.count
    },['order.price','order.count'],{initial:100})
  }
})

export default () => {

  return <div> 
      <ColorBlock name="Price">{$('order.price')}</ColorBlock>
      <ColorBlock name="Count">{$('order.count')}</ColorBlock>
      <ColorBlock name="Total">{$('order.total.value')}&nbsp;&nbsp;-&nbsp;&nbsp;延迟更新</ColorBlock>
      <ColorBlock name="Total">{$('order.total')}&nbsp;&nbsp;-&nbsp;&nbsp;延迟更新</ColorBlock>
      <Button onClick={()=>state.order.count++}>+Count</Button>
    </div>
}
```

:::warning{title=提醒⚠️}
`$('order.count')`和`$('order.total.value')`是等价的，创建信号组件时，如果发现目标是`AsyncComputedValue`则自动添加`value`。
:::



## 同步信号自定义渲染

:::warning{title=自定义渲染}
以上的信号组件仅仅是将状态数据渲染为`ReactNode`，我们也可以自定义渲染，提供一个`render`函数，让开发者自定义渲染逻辑，提供更丰富的自定义控制。
:::
 
支持通过`$(<render>,<path>)`的方式自定义渲染。

```tsx 
/**
* title: 同步信号组件自定义渲染
* description: 为`user.firstName`指定自定义渲染函数，当`user.firstName`变化时，会调用该函数进行渲染。
*/
import { createStore,computed,delay } from '@autostorejs/react';
import { Button,ColorBlock } from "components"

const { state ,signal, $ } = createStore({
  user:{
    firstName:"张",
    lastName:"三"
  }
})
 
export default () => {

  return <div>
      <ColorBlock name="FirstName">{$(({value})=>{
          return <span>❤️{value}❤️</span>
      },'user.firstName')}</ColorBlock> 
      <Button onClick={()=>state.user.firstName='.' +state.user.firstName+'.'}>Change FirstName</Button> 
    </div>
}
```

## 异步信号自定义渲染

如果目标路径是一个异步计算属性，也采用同样的`$(<render>,<path>)`的方式自定义渲染，但此时渲染函数的参数是一个对象`AsyncComputedValue`，包含了`value`、`loading`、`error`、`timeout`、`retry`等属性。详见异步计算属性章节。

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


## 动态同步信号组件

:::warning{title=注意🌝}
以上的信号组件均是基于`State`中已经声明的`computed`计算属性创建的。也支持**动态创建一个计算属性，然后再基于此创建信号组件**。
:::

动态创建信号组件，也就是说不需要预先在`State`中声明`computed`属性。

```tsx | pure

  $(
    // 自定义渲染函数，入参是`AsyncComputedValue`
    ({value})=>{
        return <>
            💸💸{value}💸💸
        </>
  },
  // 创建一个计算属性的getter函数，入参是`state`
  (state)=>{
    return state.order.price * state.order.count   // getter
  })
```

以下是一个动态创建信号组件的示例：

```tsx
import { createStore,computed,delay } from '@autostorejs/react';
import { Button,ColorBlock } from "components"

const { state ,signal, $ } = createStore({
  order:{
    price:100,
    count:1
  }
})

export default () => {

  return <div>
      <ColorBlock name="Price">{$('order.price')}</ColorBlock>
      <ColorBlock name="Count">{$('order.count')}</ColorBlock>
      <ColorBlock name="Total">{$(({value})=>{
        return <>
            💸💸{value}💸💸
        </>
      },(scope)=>{
        return scope.order.price * scope.order.count   // getter
      })}</ColorBlock>
      <Button onClick={()=>state.order.count++}>Count++</Button>
    </div>
}
```




:::warning{title=注意🌝} 
您可能已经注意到了，当前页面的渲染色块组件都不会变化⚡。这就是信号组件细粒度更新的魅力所在，状态变化时，组件的渲染仅限制在信号组件内部。
:::
