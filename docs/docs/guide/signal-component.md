---
group:
  title: 信号组件
order: 1  
demo:
  tocDepth: 5
toc: content
---

# 信号组件

当创建了`AutoStore`后，可以使用`$`或`signal`来创建信号组件。

## 同步信号组件

使用`$('<状态路径>')`创建一个信号组件（即一个`ReactNode`组件），当指定的状态数据变化时，该信号组件会自动触发局部更新。

```tsx 
/**
* title: 信号组件
* description: `$`是`signal`的简写 
*/
import { createStore } from '@autostorejs/react';
import { Button,ColorBlock } from "components"

const { state ,signal, $ } = createStore({
  user:{
    age:18
  }  
})

export default () => {

  return <div>
      {/* 引入Signal机制，可以局部更新Age */}
      <ColorBlock>Age ReactNode :{$('user.age')}</ColorBlock>
      <ColorBlock>Age ReactNode :{signal('user.age')}</ColorBlock>
      {/* 当直接更新Age时，仅在组件当重新渲染时更新 */}
      <ColorBlock>Age :{state.user.age}</ColorBlock>
      <Button onClick={()=>state.user.age=state.user.age+1}>+Age</Button>
    </div>
}
```

## 组合同步信号组件

使用`$((state)=>{.....})`创建一个组合信号组件，当函数内部依赖的的状态数据变化时，该信号组件会自动触发局部更新。

```tsx
/**
* title: 信号组件
* description: 以上当我们单击`Change FirstName`或`Change LastName`时，`FullName`会自动更新，但是色块的颜色不会变化，并且右则的`Render Count`数字也不会变化，也就是`ColorBlock`没有重新渲染。

*/
import { createStore } from '@autostorejs/react';
import { Button,ColorBlock } from "components"

const { state ,signal, $ } = createStore({
  user:{
    firstName:"张",
    lastName:"三"
  }
})

export default () => {

  return <div>
      {/* 引入Signal机制，可以局部更新Age */}
      <ColorBlock>FirstName :{$('user.firstName')}</ColorBlock>
      <ColorBlock>LastName :{signal('user.lastName')}</ColorBlock>
      {/* 当直接更新Age时，仅在组件当重新渲染时更新 */}
      <ColorBlock>FullName :{$(state=>state.user.firstName + ' ' + state.user.lastName)}</ColorBlock>
      <Button onClick={()=>state.user.firstName=state.user.firstName+'.'}>Change FirstName</Button>
      <Button onClick={()=>state.user.lastName=state.user.lastName+'.'}>Change LastName</Button>
    </div>
}
```

:::info{title=提醒}
以上当我们单击`Change FirstName`或`Change LastName`时，`FullName`会自动更新，但是色块的颜色不会变化，并且右则的`Render Count`数字也不会变化，也就是`ColorBlock`没有重新渲染。
:::


## 异步信号组件

根据`AutoStore`的设计，当在状态中声明了一个异步计算属性时，`AutoStore`会自动创建一个异步数据对象，该对象包含了`loading`、`error`、`result`等属性。

此时如果使用`$('<异步计算属性的路径>')`创建一个信号组件时

- 会自动返回该订阅异步计算属性的`resut`值
- 会自动订阅异步计算属性的`result`变更事件
- 如果显示的订阅了`loading`、`error`等属性，则需要显示全路径订阅，如`$('user.age.loading')`


```tsx
/**
* title: 信号组件
* description: 通过`state.age=n`直接写状态时，需要使用`{$('age')}`来创建一个信号组件,内部会订阅`age`的变更事件，用来触发局部更新。
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
      {/* 引入Signal机制，可以局部更新Age */}
      <ColorBlock name="Price">{$('order.price')}</ColorBlock>
      <ColorBlock name="Count">{$('order.count')}</ColorBlock>
      <ColorBlock name="Total">{$('order.total.value')}</ColorBlock>
      <Button onClick={()=>state.order.count = state.order.count + 1}>+Count</Button>
    </div>
}
```
