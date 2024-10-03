---
group:
  title: 信号组件
order: 3  
demo:
  tocDepth: 5
toc: content
---

# 状态信号组件

将状态数据封装为信号组件，当状态数据变化时，自动触发信号组件的重新渲染。

> 只需要指定状态数库的路径或者提供一个返回状态数据的函数即可。

```ts | pure
interface SignalComponentType<State extends Dict>{
    (selector: string):React.ReactNode
    <Value=any>(selector: (state:ComputedState<State>)=>Value):React.ReactNode 
}
```

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
    lastName:"三"
  }
})

export default () => {
  return <div>
      <ColorBlock name="FirstName">{$('user.firstName')}</ColorBlock>
      <ColorBlock name="LastName">{$('user.lastName')}</ColorBlock>
      <ColorBlock>FullName :{$(state=>state.user.firstName + ' ' + state.user.lastName)}</ColorBlock>
      <Button onClick={()=>state.user.firstName=state.user.firstName+'❤️'}>Change FirstName</Button>
      <Button onClick={()=>state.user.lastName=state.user.lastName+'.'}>Change LastName</Button>
    </div>
}
```
 

## 异步计算信号组件

当使用`$('<状态路径>')`将**状态数据直接直接封装为信号组件**时，如果状态数据是异步数据对象`AsyncComputedValue`时，该对象包含了`loading`、`error`、`value`等属性。
有
 

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

- 当路径指定的是一个异步计算属性时，创建的信号组件时会自动添加`value`属性。因此，以上`$('order.total')`和`$('order.total.value')`是等价的。


:::warning{title=注意} 
- `$('order.count')`和`$('order.total.value')`是等价的，创建信号组件时，如果发现目标是`AsyncComputedValue`则自动添加`value`。
- 您可能已经注意到了，当前页面的渲染色块组件都不会变化⚡。这就是信号组件细粒度更新的魅力所在，状态变化时，组件的渲染被限制在信号组件内部。
:::
