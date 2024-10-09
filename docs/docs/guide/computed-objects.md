---
group:
  title: 计算属性
  order: 2
title: 计算对象
order: 7 
demo:
  tocDepth: 5
toc: content
---


当使用`computed`创建好计算属性后，我们可以通过`store.computedObjects`来管理`store`内的所有计算属性。

通过`store.computedObjects`可以访问到所有的计算对象，`store.computedObjects`是一个`Map`对象。

```tsx

import { createStore,computed } from '@autostorejs/react';
import { Divider,ColorBlock,Button } from "x-react-components"

let count=0
const store = createStore({
  user:{
    firstName:"Zhang",
    lastName:"Fisher",
    fullName: (user)=>{
      return user.firstName+user.lastName + `${++count}`
    },
    fullName2: computed(async (user)=>{
      return user.firstName+user.lastName  + `${++count}`
    },["./firstName","./lastName"]) 
  }
} )

export default ()=>{
  const [state] = store.useState()

  return (<div>
    <ColorBlock name="FirstName">{state.user.firstName}</ColorBlock>
    <ColorBlock name="lastName">{state.user.lastName}</ColorBlock>
    <ColorBlock name="FullName"  value={state.user.fullName}/>
    <ColorBlock name="FullName2"  value={state.user.fullName2.value}/>
    <Divider/>
    <div>typeof(store.computedObjects)=={typeof(store.computedObjects)}</div>
    <div>store.computedObjects instanceof Map={String(store.computedObjects instanceof Map)}</div>
    <div>store.computedObjects.size={store.computedObjects.size}</div>
    <div>store.computedObjects.size={store.computedObjects.size}</div>
    <div>store.computedObjects.keys()={[...store.computedObjects.keys()].join(" , ")}</div>
    <Button onClick={()=>store.computedObjects.get("user.fullName").run()}>执行fullName计算函数</Button>
    <Button onClick={()=>store.computedObjects.get("user.fullName2").run()}>执行fullName2计算函数</Button>
    <Button onClick={()=>store.state.user.fullName2.run()}>执行fullName2计算函数</Button>
  </div>)
}

```

**说明**:

- 以上创建了一`fullName`和`fullName2`两个计算属性
- `store.computedObjects`是一个`Map`对象,可以通过`store.computedObjects.get("user.fullName")`来获取`fullName`的计算对象，该对象是一个`ComputedObject`实例。
- `ComputedObject`实例有一个`run`方法，可以手动执行计算函数。
- 对于异步计算即可以通过`store.computedObjects.get("user.fullName2").run()`来手动执行计算函数，也可以通过`store.state.user.fullName2.run()`手动执行计算函数。
- 而同步计算只能通过`store.computedObjects.get("user.fullName").run()`来手动执行计算函数。
- `ComputedObject`实例有一个`value`属性，可以获取计算函数的返回值。
