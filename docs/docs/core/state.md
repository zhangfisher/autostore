---
title: State
order: 2  
demo:
  tocDepth: 5
group:
  title: 基础
  order: 1 
---

## 介绍

`@autostorejs/react`提供了三种不同的方式来存取状态。

- `useState`: 用来在组件中访问和更新`Store`的状态数据，更新时会导致重新渲染。
- `store.state`: 直接读写`Store`的状态数据，`store.state`返回的是一个响应式对象`reactive`，其实质是通过`Proxy`实现的，当读写`store.state`时，会触发内部的依赖收集，相关计算属性的运行，配合`signal`机制可以自动触发组件的细粒度重新渲染。


## 读写状态

当创建好`Store`后,你可以在存取`State`用来驱动组件细粒度渲染。

`Store`对象提供了`useState`方法，用来在组件中访问和更新`Store`的状态数据。其使用方式与`React`的`useState`方法类似。


```tsx
import { createStore } from '@autostorejs/react';

const state = {
  firstName:"Zhang",
  lastName:"Fisher",
  age:18
}

const store = createStore(state)

export default () => {
  const [state,setState] = store.useState() 
  return <div>
      <div>Hello :{state.firstName}{' '}{state.lastName}</div>
      <div>Age :{state.age}</div>
      <button onClick={()=>setState(state=>state.age+=1)}>+Age</button>
    </div>
}

``` 

`useState`还可以接受`getter` 和`setter`两个函数参数，用来获取和设置`State`中的某个属性。


```tsx 
import { createStore } from '@autostorejs/react';
import { ColorBlock } from "components"

const state = {
  firstName:"Zhang",
  lastName:"Fisher",
  fullName:(state)=>state.firstName+state.lastName,
}
const store = createStore(state)

const FirstName = React.memo(()=>{
  const [first] = store.useState((state)=>state.firstName)
  return <ColorBlock name="FirstName" value={first}/>
})
const LastName = React.memo(()=>{
  const [last] = store.useState((state)=>state.lastName)
  return <ColorBlock name="LastName" value={last}></ColorBlock>
})

export default () => { 
  const [firstName,setFirstName] = store.useState((state)=>state.firstName,(state,firstName)=>state.firstName=firstName)
  const [fullName,setFullName] = store.useState<string,[string,string]>(
      (state)=>state.fullName,       // getter
      (state,[first,last])=>{        // 可选,setter
        state.firstName=first
        state.lastName=last
      }
  )
  return <div>
      <FirstName/>
      <LastName/> 
      <div>FullName :{fullName}</div>
      <button onClick={()=>setFirstName(firstName+'r')}>change FirstName</button>
      <button onClick={()=>setFullName(["Hello","Voerkai18n"])}>change FullName</button>
    </div>
}

``` 


## 响应式读写

除了使用`useState`方法读写状态外，`sotre.state`返回的是一个`reactive`响应式对象，你可以直接读写它的属性。

:::info
`响应式对象`指的是可以对该对象进行读取，其修改行为会触发内部的依赖收集，相关计算属性的运行，当然也会自动触发组件的重新渲染。
:::


```tsx
/**
* title: 读取状态
* description: 通过`store.state.firstName`直接读取状态,不通过`useState`方法
*/
import { createStore } from '@autostorejs/react';
 
const state = {
  firstName:"Zhang",
  lastName:"Fisher",
  age:18
}

const store = createStore(state)

export default () => {

  return <div>
      <div>Hello :{store.state.firstName}{' '}{store.state.lastName}</div>
      {/* 引入Signal机制，可以局部更新Age */}
      <div>Age+Signal :{$(store.state.age)}</div>
      {/* 当直接更新Age时，仅在组件当重新渲染时更新 */}
      <div>Age :{store.state.age}</div>
      <button onClick={()=>store.state.age=store.state.age+1}>+Age</button>
    </div>
}

``` 
