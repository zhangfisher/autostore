---
title: 监视
group:
  title: 监视
  order: 3 
order: 0
demo:
  tocDepth: 5
toc: content
---

## 介绍

`@autostorejs/react`提供`watch`功能，用来监视`State`数据的变化,当所监视的数据发生时，可以执行侦听器函数。


提供三种使用`watch`的方式：

- 直接在`State`中声明`watch`函数,然后将侦听器返回值写入声明`watch`函数所在的位置。
- 调用`store.watch`函数，用来侦听`State`中的数据变化。
- 在组件中调用`store.useWatch`函数，用来侦听`store`对象的变化,当组件销毁自动取消订阅。


## 状态内侦听

`@autostorejs/react`提供了`watch`函数，用来在`state`声明来侦听`State`中的数据变化。

`watch`函数的基本特性如下：

- `watch`可以用来侦听整个`store`对象的变化，当侦听到变化时会执行侦听器函数。
- 侦听器函数只能是一个同步函数。
- 侦听器函数的返回值会写入`watch`函数所在的位置。 


### 基本用法

`watch`函数签名如下：

```typescript
function watch<Value = any,Result=Value>(
  listener:WatchListener<Value,Result>,
  on:WatchOptions['on'],
  options?:WatchOptions<Result>):WatchDescriptor<Value,Result>

  
export interface WatchOptions<R=any>{ 
    // 指定额外的过滤条件，如果返回true，才会触发listener的执行
    // 此函数会在表单中的每一个值发生变化时执行，如果返回true，则会触发listener的执行  
    // 由于此函数会在表单中的每一个值发生变化时均会执行，所以此函数应该尽量简单，不要有复杂的逻辑      
    // 如果大量的表单字段均需要监听，则可能会有性能问题
    // 一般在动态依赖时使用
    on?:(path:string[],value:any)=>boolean 
    initial?:R,  
    /**
     * 用来对表单内的watch进行分组，以便能按组进行enable或disable或其他操作
     */  
    group?:string
    /**
     *  启用或禁用watch，默认为true
     */
    enable?:boolean
}
 
```

`watch`函数基本使用如下：


```tsx 
import { createStore,watch } from '@autostorejs/react';
import { Divider,Field } from "x-react-components"

const book = {
  orders:[
    { bookName:"SpeedForm Quick-Start",
      price:100,
      count:1,
      total:(book)=>book.price*book.count
    },
    { bookName:"Helux",
      price:98,
      count:1,
      total:(book)=>book.price*book.count
    }
  ],  
  total: watch<true>((count)=>{
     return store.state.orders.reduce((total,book)=>total+book.count*book.price,0)
  },
  // 当price或count变化时，触发侦听器函数的执行
  (path:string[])=>{
      return path[path.length-1]==='count'
    },{    
    initial:198         // total的初始值
  })
}

const store = createStore({state:book},{singleton:false})
 
export default ()=>{
  const [state] = store.useState()
  return (<table>
      <thead>
        <tr>
          <th>BookName</th>
          <th>Price</th>
          <th>Count</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {state.orders.map((book,index)=>
          <tr key={index}>
            <td>{book.bookName}</td>
            <td>{book.price}</td>
            <td><input value={book.count} onChange={store.sync(to=>to.orders[index].count)}/></td>
            <td>{book.total}</td>
          </tr>
        )}
        <tr>
          <td colSpan={3}>Total</td>
          <td>{state.total}</td>
        </tr>
        </tbody>
    </table>)
}

```

> 注意：事实上以上示例更适合使用`计算属性`特性来实现，示例仅仅是演示其可以侦听动态依赖属性的特性


在以上例子中：

- `watch`函数的第一个参数是一个函数，用来侦听`State`中的数据变化。
- `watch`函数的第二个参数是一个对象，用来配置`watch`函数的行为。
- `on`属性用来配置`watch`函数的触发条件，传入的是发生变化的值所在的路径。
- `initial`属性用来配置`watch`函数所在位置的`total`的初始值。
- ``

### 侦听函数

`watch`的侦听函数只能是一个**同步函数**，签名如下：

```typescript
 type WatchListener<Value=any, Result= Value> = (value:Value,options:WatchListenerOptions<Result>)=>(Exclude<Result,Promise<any>> | undefined)

type WatchListenerOptions<Result=any> = {
  getSelfValue:()=>Result ,     // 返回当前watch所在位置的当前值
  selfPath:string[] ,           // 返回当前watch所在位置的路径
  fromPath:string[],         // 返回发生变化的值所在的路径
  getCache:()=>Dict             // 返回当前watch所在位置的缓存对象
}
```

- 当`State`中的数据发生变化时，会调用`watch`第二个参数指定的函数，如果返回`true`，则会调用执行侦听函数。
- 侦听函数的第一个入参是`value`，指的是发生变化的新值。显然，如果`watch`函数的依赖范围很广，则`value`类型也可能是不固定的。
- `getSelfValue`参数用来读取当前`watch`所在位置的当前值。
- `selfPath`参数用来读取当前`watch`所在位置的路径。
- `fromPath`参数用来读取发生变化的值所在的路径。
- `getCache`参数用来读取当前`watch`所在位置的缓存对象，供保存一些临时值。

### 缓存对象

侦听函数的`getCache`参数用来获取一个仅供当前侦听函数使用缓存对象`{}`，供保存一些临时值。

下面举个例子来说明其用途。

在`SpeedForm`中，每一个字段均有一个`validate`用来声明其验证结果，而整个表单根对象也有一个`validate`用来表示表单是否有效。当某个字段的`validate`发生变化时，我们需要重新计算整个表单的`validate`。

- 需要使用**动态依赖**，即侦听表单中的所有`validate`的值。注：如由于一个表单字段可能很多或者是动态生成的，所以其依赖是动态的。
- 需要使用**缓存对象**，用来记住表单编辑过程中所有字段的`validate`值，以便眼后计算整个表单的验证结果。

**我们可以使用`watch`函数来实现。**

```tsx | pure
const formState={
    validate:watch((value,{getCache,srcPath})=>{
      const cache = getCache()
      // 在cache中保存字段的validate值
      cache[srcPath.join('.')]=value
      // 整个表单的validate值是由所有字段的验证值进行计算而来的
      return Object.values(cache).every(validate=>validate)
    },
    // 动态依赖
    (path)=>path[path.length-1]==='validate',
    // 指定初始值
    {initial:true}
    )  
}
```
在进行表单验证时，我们可以使用`formState.validate`来获取整个表单的验证结果。




## 侦听状态

除了可以在`State`中声明`watch`函数外，我们还可以在`Store`对象中声明`watch`函数，用来侦听`State`中的数据变化。

```tsx 
import { createStore,computed,ObserverScopeRef } from "@autostorejs/react" 
import { useEffect,useState } from "react"
const user = {
  user:{
    firstName:"zhang",
    lastName:"fisher",
    fullName: computed(async ([first,last])=>{ 
      return first + last
    },[
      "user/firstName",
      "user/lastName"
    ],{   
      scope:ObserverScopeRef.Depends
    }) 
  } 
}

const store = createStore({state:user})


export default ()=>{
  const [state]=store.useState()
  const [watchKey,setWatchKey] = useState('')
  useEffect(()=>{
    const unwatch = store.watch((valuePaths:string[])=>{
      setWatchKey(valuePaths.map(p=>p.join("/")).join(","))
    },[
      "user/firstName",
      "user/lastName"
    ])
    return unwatch
  },[])

  return  (<div>
      <div>watch: {watchKey}</div>
      <div>firstName=<input value={state.user.firstName} onChange={store.sync(to=>to.user.firstName)}/></div>
      <div>lastName=<input value={state.user.lastName} onChange={store.sync(to=>to.user.lastName)}/></div>
      <div>fullName={state.user.fullName.result}</div> 
    </div>)
}

``` 
## 组件内侦听

在组件内侦听可以使用`store.useWatch`函数，用来侦听`store`对象的变化,当组件销毁自动取消订阅。
 
```tsx 
import { createStore,computed,ObserverScopeRef } from "@autostorejs/react" 
import { useEffect,useState } from "react"
const user = {
  user:{
    firstName:"zhang",
    lastName:"fisher",
    fullName: computed(async ([first,last])=>{ 
      return first + last
    },[
      "user/firstName",
      "user/lastName"
    ],{   
      scope:ObserverScopeRef.Depends
    }) 
  } 
}

const store = createStore({state:user})


export default ()=>{
  const [state]=store.useState()
  const [watchKey,setWatchKey] = useState('')
  const [watchPath,setWatchPath]=useState("user/firstName")
  const [watchValue,setWatchValue]=useState("")

  store.useWatch((value,path)=>{
      setWatchKey(path.join("/"))
      setWatchValue(value)
      return value
  },watchPath,{id:"use1"}) 



  return  (<div>
      <div>watch for: {watchPath}</div>
      <div>Watch value:{watchValue}</div>
      <div>firstName=<input value={state.user.firstName} onChange={store.sync(to=>to.user.firstName)}/></div>
      <div>lastName=<input value={state.user.lastName} onChange={store.sync(to=>to.user.lastName)}/></div>
      <div>fullName={state.user.fullName.result}</div> 
      <button onClick={()=>setWatchPath("user/firstName")}>watch firstName</button>
      <button onClick={()=>setWatchPath("user/lastName")}>watch lastName</button>      
    </div>)
}

```
  