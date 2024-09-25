---
title: State
order: 2  
demo:
  tocDepth: 5
group:
  title: 基础
  order: 1 

toc: content

---

## 介绍

当创建好`AutoStore`实例后就可以存取状态。

- **使用`useState`**

 用来在组件中访问和更新`Store`的状态数据，更新时会导致重新渲染。

- **直接读写`store.state`**

 `store.state`返回的是一个响应式对象`reactive`，其实质是通过`Proxy`实现的，当读写`store.state`时，会触发内部的依赖收集，相关计算属性的运行，配合`signal`机制可以自动触发组件的细粒度重新渲染。



## useState
 

`Store`对象提供了`useState`方法，用来在组件中访问和更新`Store`的状态数据。其使用方式与`React`的`useState`方法类似。


```tsx
import { createStore } from '@autostorejs/react';
import { Button,ColorBlock } from "components"
const { state,useState,$ } = createStore({
  firstName:"Zhang",
  lastName:"Fisher",
  age:18,
  fullName:(user)=>user.firstName+user.lastName
})

export default () => {
  const [age,setAge] = useState('age') 
  const [lastName,setLastName] = useState((state)=>state.lastName,(name,user)=>user.lastName=name) 

  return <div>    
      <ColorBlock>Fullname :{state.firstName}{' '}{lastName}</ColorBlock>
      <ColorBlock>Age :{age}</ColorBlock>
      <Button onClick={()=>setAge(age+1)}>+Age</Button>
      <Button onClick={()=>setLastName(lastName+'.')}>Change lastName</Button>
    </div>
}

``` 

:::warning{title=注意}
当更新`Age`时会重新渲染整个组件,其行为与`React`的`useState`类似。
:::


`useState`还可以接受`getter` 和`setter`两个函数参数，用来获取和设置`State`中的某个属性。


```tsx 
import { createStore } from '@autostorejs/react';
import { ColorBlock } from "components"
import { Button } from "components"

 
const store = createStore( {
  firstName:"Zhang",
  lastName:"Fisher",
  fullName:(state)=>state.firstName+state.lastName,
})


export default () => { 
  const [firstName,setFirstName] = store.useState((state)=>state.firstName,(value,state)=>state.firstName=value)
  const [fullName,setFullName] = store.useState<string,[string,string]>(
      (state)=>state.fullName,       // getter
      ([first,last],state)=>{        // 可选,setter
        state.firstName=first
        state.lastName=last
      }
  )
  return <div>
      <ColorBlock name="FullName" value={fullName}></ColorBlock>
      <Button onClick={()=>setFirstName(`<${firstName}>`)}>Change FirstName</Button>
      <Button onClick={()=>setFullName(["Hello","Voerkai18n"])}>Change FullName</Button>
    </div>
}

``` 


## 直接读写

除了使用`useState`方法读写状态外，`sotre.state`返回的是一个响应式`Proxy`对象，可以直接读写也会触发内部的依赖收集和事件响应。



```tsx
/**
* title: 直写状态
* description: 通过`state.age=n`直接写状态时，需要使用`{$('age')}`来创建一个信号组件，用来触发局部更新。
*/
import { createStore } from '@autostorejs/react';
import { Button,ColorBlock } from "components"

const { state , $ } = createStore({
  age:18
})

export default () => {

  return <div>
      {/* 引入Signal机制，可以局部更新Age */}
      <ColorBlock>Age+Signal :{$('age')}</ColorBlock>
      {/* 当直接更新Age时，仅在组件当重新渲染时更新 */}
      <ColorBlock>Age :{state.age}</ColorBlock>
      <Button onClick={()=>state.age=state.age+1}>+Age</Button>
    </div>
}

``` 

:::warning{title=注意}
此例中更新`Age`时并不会重新渲染整个组件,而只会渲染其`$('age')`，这就是信号组件的功能，其可以提供细粒度的更新渲染。
:::

## 小结

- 更新`Store`的状态可以不需要使用`useState`返回的`setXXXXX`,直接使用`state.xxxx=xxx`即可更新状态触发响应。
- 如果要提供细粒度的更新，可以使用`signal`机制，通过`$`方法创建一个信号组件，用来触发局部更新。


