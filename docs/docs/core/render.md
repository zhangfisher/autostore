---
group:
  title: 基础
  order: 1 
title: 组件渲染
order: 3 
demo:
  tocDepth: 5
---

## 介绍

当状态变化时将触发组件的重新渲染，`@speedform/reactive`可以提供更加细粒度的渲染。

##  Context

作为对比，我们先看一个传统的`Context`的渲染例子。

```tsx
import { createStore } from '@speedform/reactive';
import React,{createContext,useContext,useState} from "react"
import { Block } from "components"

const ctx = createContext({
  firstName:"Zhang",
  lastName:"Fisher",
  age:18
})

const Child = React.memo((props)=>{
    const context=useContext(ctx)
    return <Block name={`子组件:${props.name}`}>
      <span>Hello :{context.firstName}{' '}{context.lastName}</span> 
    </Block>
})
let count:number = 0
export default ()=>{
  const [user,setUser] = useState({
    firstName:"Zhang",
    lastName:"Fisher",
    age:18
  })
  return <ctx.Provider value={user}>
      <div>根组件</div>
      <div>Hello :{user.firstName}{' '}{user.lastName}</div>
      <div>Age :{user.age}</div>
      <button onClick={()=>{
        setUser({firstName:"Zhang",lastName:"Fisher",age:++count})
      }}>+Age</button>
      <Child name="A"/>
      <Child name="B"/>
    </ctx.Provider>
}

```

从上面的例子可看到，当更新`Context.age`时，所有的子组件不管是否有使用`Age`均会重新渲染，而这是不必要的，因为子组件并没有使用到`Context`的数据，为此我们一般需要使用`React.memo`或一些第三方库来进行优化渲染。

:::info
**最大的问题在于，当更新根Context时，所有的子组件都会重新渲染，这是不必要的，因为子组件并没有使用到根Context的数据。我们希望能实现更细粒度的渲染，只有当子组件使用到的数据发生变化时，才会重新渲染。**
::: 

## useState

使用`@speedform/reactive`的`useState`可以使**渲染颗粒度限定在组件范围**，只有使用到数据的组件才会重新渲染。

```tsx
import { createStore } from '@speedform/reactive';
import React,{createContext,useContext,useState} from "react"
import { Block } from "components"

const state = {
  firstName:"Zhang",
  lastName:"Fisher",
  age:18
}

const store = createStore(state)

const FirstName = React.memo((props)=>{
    const [state,setState] = store.useState()
    const {firstName} = state
    return <Block name={`子组件:FirstName`}>
      <span>Hello :{firstName}</span> 
    </Block>
})
const LastName = React.memo((props)=>{
    const [state,setState] = store.useState()
    const {lastName} = state
    return <Block name={`子组件:lastName`}>
      <span>Hello :{lastName}</span> 
    </Block>
})
let count=0
export default ()=>{ 
  const [state,setState] = store.useState()
  return <>
      <div>根组件</div>
      <div>Hello :{state.firstName}{' '}{state.lastName}</div>
      <div>Age {++count}:{state.age}</div>
      <button onClick={()=>setState(draft=>draft.age=draft.age+1)}>+Age</button>
      <button onClick={()=>setState(draft=>draft.firstName=draft.firstName+"r")}>Change FirstName</button>
      <FirstName/>
      <LastName/>
    </>
}

```

- 在上例中，当更新`Age`时，仅根组件会重新渲染，而`FirstName`和`LastName`不会重新渲染，因为它们并没有使用到`Age`。
- 当在根组件中更新`FirstName`时，仅`FirstName`会重新渲染。而`LastName`组件中没有`FirstName`，所以不会重新渲染。



## Signal
`@speedform/reactive`提供的`state`是一个响应式对象，配置`signal`机制可以直接进行读取**渲染颗粒度限定在组件范围**，只有使用到数据的组件才会重新渲染。

基于`Signal`,**渲染颗粒度可以是组件中的一个片段**，更加精细，更加高效。

```tsx
import { createStore } from '@speedform/reactive';
import React,{createContext,useContext,useState} from "react"
import { Block } from "components"

import { $ } from "helux"

const state = {
  firstName:"Zhang",
  lastName:"Fisher",
  age:18
}

const store = createStore(state)

const FirstName = React.memo((props)=>{
    return <Block name={`子组件:FirstName`}>
      <span>Hello :{store.state.firstName}{' '}{store.state.lastName}(没有使用Signal)</span> 
    </Block>
})
const LastName = React.memo((props)=>{
    return <Block name={`子组件:LastName`}>
      <span>Hello :{$(store.state.firstName)}{' '}{store.state.lastName}</span> 
    </Block>
})
let count=0
export default ()=>{ 

  return <>
      <div>根组件</div>
      <div>Hello :{store.state.firstName}{' '}{store.state.lastName}</div>
      <div>Age {++count}:{$(store.state.age)}</div>
      <button onClick={()=>store.state.age=store.state.age+1}>+Age</button>
      <button onClick={()=>store.state.firstName=store.state.firstName+"r"}>Change FirstName</button>
      <FirstName/>
      <LastName/>
    </>
}

```
- 在上例中，当更新`Age`时，仅根组件会重新渲染，而`FirstName`和`LastName`不会重新渲染，因为它们并没有使用到`Age`。
- 当更新`FirstName`时，仅`FirstName`会重新渲染。而`LastName`组件中虽然用到了`FirstName`，但是没有使用`$(FirstName)`，也就是使用信号，所以不会重新渲染。
- `store.state`是一个响应式对象`reactive`,本质上是一个`Proxy`对象来收集依赖。然后使用`$(<reactive>)`数据变更仅触发`$`符号区域内重渲染，从而实现最细粒度的渲染。
- 关于`Signal`机制的更多内容请参考[helux/Signal](https://heluxjs.github.io/helux/guide/signal)。
