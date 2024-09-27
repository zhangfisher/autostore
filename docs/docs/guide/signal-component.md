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

`AutoStore`支持多种方式创建信号组件。

## 同步信号组件

使用`$('<状态路径>')`创建一个信号组件（即一个`ReactNode`组件），当指定的状态数据变化时，该信号组件会自动触发局部更新。

```tsx 
/**
* title: 信号组件
* description: `$`是`signal`的简写 
*/
import { createStore,delay,computed } from '@autostorejs/react';
import { Button,ColorBlock } from "components"

const { state ,signal, $ } = createStore({
  user:{
    age:18,
    remainingLife:computed(async (user)=>{
      await delay(1000) 
      return 100-user.age
    },['user.age'])
  }  
})

export default () => {

  return <div>
      {/* 引入Signal机制，可以局部更新Age */}
      <ColorBlock name="Age">{$('user.age')}</ColorBlock>
     <ColorBlock name="RemainingLife">{$('user.remainingLife')}&nbsp;&nbsp;-&nbsp;&nbsp;延迟更新</ColorBlock>
      {/* 当直接更新Age时，仅在组件当重新渲染时更新 */}
      <ColorBlock>Age :{state.user.age}</ColorBlock>
      <Button onClick={()=>state.user.age=state.user.age+1}>+Age</Button>
    </div>
}
```

- 上例中由于`user.remainingLife`是一个异步计算属性。

## 组合同步信号组件

使用`$((state)=>{.....})`创建一个组合信号组件，当函数内部依赖的的状态数据变化时，该信号组件会自动触发局部更新。

```tsx
/**
* title: 信号组件
* description: 以上当我们单击`Change FirstName`或`Change LastName`时，`FullName`会自动更新，但是色块的颜色不会变化，并且右则的`Render Count`数字也不会变化，也就是`ColorBlock`没有重新渲染。

*/
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
      <ColorBlock name="LastName">{signal('user.lastName')}</ColorBlock>
      <ColorBlock name="FullName">{$('user.fullName')}&nbsp;&nbsp;-&nbsp;&nbsp;延迟更新</ColorBlock>
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
      {/* 引入Signal机制，可以局部更新Age */}
      <ColorBlock name="Price">{$('order.price')}</ColorBlock>
      <ColorBlock name="Count">{$('order.count')}</ColorBlock>
      <ColorBlock name="Total">{$('order.total.value')}&nbsp;&nbsp;-&nbsp;&nbsp;延迟更新</ColorBlock>
      <Button onClick={()=>state.order.count = state.order.count + 1}>+Count</Button>
    </div>
}
```

## 同步信号自定义渲染
 
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

const { state ,signal, $ } = createStore({
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

以上的信号组件均是基于`State`中已经声明的`computed`属性创建的。

我们也可以动态创建信号组件，也就是说不需要预先在`State`中声明`computed`属性。

```tsx
import { createStore,computed,delay } from '@autostorejs/react';
import { Button,ColorBlock } from "components"

const { state ,signal, $ } = createStore({
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
您可能已经注意到了，当前页面的渲染色块组件都不会变化⚡。这就是信号组件细粒度更新的魅力所在，状态变化时，只有与之相关的组件会重新渲染，而其他组件不会重新渲染。
:::
