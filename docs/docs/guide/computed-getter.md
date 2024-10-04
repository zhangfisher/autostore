---
group:
  title: 计算属性
  order: 2
order: 3  
demo:
  tocDepth: 5
toc: content
---

# 计算函数
  

无论是同步计算属性还是异步计算属性，都需要指定一个`Getter`函数，用于计算属性的计算逻辑，**该函数的返回值就是计算属性的值**。

同步计算属性和异步计算属的`Getter`函数签名不是一样的，如下：

## 函数签名

- **同步计算属性的Getter函数签名如下：**

```ts | pure
type ComputedGetter<Value = any, Scope = any> = (scope:Scope)=>Value
```

- **异步计算属性的Getter函数签名如下：**

```ts | pure
type AsyncComputedGetter<Value,Scope=any,P extends Dict = Dict> = (
    scope:Scope,
    args:Required<AsyncComputedGetterArgs> & P) => Promise<Value>
```

## 执行计算函数




- 同步计算属性和异步计算属的`Getter`函数的第一个参数`scope`，用来指定计算函数的作用域。
- 异步计算属性的`Getter`函数的第二个参数`args`，用来指定异步计算的参数，如`retry`、`timeout`、`loading`、`error`等属性，可以进行更多的控制。


## 作用域 - Scope

`计算作用域`指的是传递给计算函数`Getter`的第一个参数

`@autostorejs/react`在创建`Store`时，支持配置`scope`参数来指定计算属性函数的第一个参数，如下：

```ts | pure {7-9}
export enum ObserverScopeRef{
  Root    = 'root',                   // 指向State根对象
  Current = 'current',                // 指向计算属性所在的对象
  Parent  = 'parent',                 // 指向计算属性所在对象的父对象
  Depends = 'depends'                 // 指向异步计算的依赖数组，仅在异步计算时生效
  Self    = 'self'                    // 指向自身，默认值   
}

// 指定Store中计算函数的上下文,如果是字符串代表是当前对象的指定键，如果是string[]，则代表是当前Store对象的完整路径
export type ComputedScope  =  ObserverScopeRef | string | string[] | ((state:any)=>string | string[] | ObserverScopeRef)
 
const store = createStore( {
  user:{
    firstName:"Zhang",
    lastName:"Fisher",
    fullName: computed((scope)=>{
      // ...
    },["user.firstName","user.lastName"])
  }
} )

``` 

### Current

默认情况下，`scope==ObserverScopeRef.Current`时，计算函数的`scope`指向计算函数所在的对象。

```tsx  
/**
 * title: ObserverScopeRef.Current
 * description: store.options.scope==ObserverScopeRef.Current,
 */
import { ObserverScopeRef,useStore } from '@autostorejs/react'; 
import { ColorBlock } from "components" 

export default ()=>{

  const { state } = useStore({
    user:{
      firstName:"Zhang",
      lastName:"Fisher",
      fullName: function(scope){
        // scope指向user对象  
        return scope.firstName+scope.lastName 
      }
    }},{
    // 指定计算属性的默认上下文指向计算函数所有的当前对象
    scope: ()=>ObserverScopeRef.Current
  })
  return <div> 
    <ColorBlock name="FullName">{state.user.fullName}</ColorBlock>
  </div>
}
```

- 上面代码中，`fullName`函数的`scope`指向所在的`user`对象，即`state.user`。


:::warning{title=注意🌝}
`scope==ObserverScopeRef.Current`是默认值，一般不需要指定，以上仅仅是示例。
:::

### Root

`@autostorejs/react`会将计算属函数的`scope`指向`ObserverScopeRef.Root`，即当前的`State`根对象，如下：

```tsx  
/**
 * title: ObserverScopeRef.Root
 * description: store.options.scope==ObserverScopeRef.Root,
 */
import { useStore,ObserverScopeRef } from '@autostorejs/react'; 
  
export default ()=>{
  
  const { state } = useStore({
    user:{
      firstName:"Zhang",
      lastName:"Fisher",
      fullName: function(scope){ 
        // scope指向root对象  
        return scope.user.firstName+scope.user.lastName 
      }
    }},{
    scope: ObserverScopeRef.Root
  })
  return <div> 
    <div>FullName:{state.user.fullName}</div>
  </div> 
}
``` 

### Parent

当`scope==ObserverScopeRef.Parent`时，指向计算函数所在的对象的父对象。

```tsx  | pure
/**
 * title: ObserverScopeRef.Parent
 * description: scope==ObserverScopeRef.Parent
 */
import { createStore,ObserverScopeRef } from '@autostorejs/react'; 
const state = {
  user:{
    firstName:"Zhang",
    lastName:"Fisher",
    fullName: function(scope){
      // scope指向user对象的父对象，即根
      return scope.user.firstName+scope.user.lastName
    }
  }
} 
const store = createStore(state,{
  // 指定计算属性的默认上下文指向计算函数所有的当前对象
  scope: ()=>ObserverScopeRef.Parent,
})

export default ()=>{
  const [state,setState] = store.useState()
  return <div> 
    <div>FullName:{state.user.fullName}</div>
  </div>
}
```


### 字符串

当`store.options.scope==<字符串>`时，此时`<字符串>`就是指向计算函数所在对象的键名称。

```tsx | pure
/**
 * title: <字符串>
 * description: store.options.scope==<字符串>
 */
import { createStore } from '@autostorejs/react'; 

const state = {
  user:{
    firstName:"Zhang",
    lastName:"Fisher",
    fullName: function(scope){
      // this指向user对象的firstName
      return scope
    },
    address:{
      city:"Quanzhou",
    }
  }
} 
const store = createStore(state,{
  scope: ()=>'firstName'
})

export default ()=>{
  const [state,setState] = store.useState()
  return <div> 
    <div>FullName:{state.user.fullName}</div>
  </div>
}

```

- `computedThis='firstName'`代表`this`指向`user.firstName`,也就是当前计算函数所在对象的`firstName`成员。
- `computedThis='address.city'`代表`this`指向`user.address.city`
- 总之，当`computedThis`是一个字符串时，代表是**当前计算函数所在对象的指定键名称**，并且这个键名称可以是多级的，如`address.city`。

### 字符串数组 

```tsx | pure
/**
 * title: <字符串数组>
 * description: scope==<字符串数组>
 */
import { createStore } from '@autostorejs/react'; 

const state = {
  user:{
    firstName:"Zhang",
    lastName:"Fisher",
    fullName: function(scope){ 
      return scope
    },
    address:{
      city:"Quanzhou",
    }
  }
} 
const store = createStore(state,{
  scope: ()=>['user','address','city']
})

export default ()=>{
  const [state,setState] = store.useState()
  return <div> 
    <div>FullName:{state.user.fullName}</div>
  </div>
}

```
`scope==<字符串数组>`与`scope==<字符串>`的区别在于:
- `scope==<字符串数组>`代表是以**根对象**为起点的完整路径，并且这个路径可以是多级的，如`['user','address','city']`。
- `scope==<字符串>`代表是以**当前计算函数所在对象**为起点的路径，并且这个键名称可以是多级的，如`address.city`。


### Depends

当`scope==ObserverScopeRef.Depends`时，计算函数的`this`指向计算函数的依赖项的值。

:::warn
**`ObserverScopeRef.Depends`仅在异步计算时生效,而异步计算必须通过computed函数来指定依赖**
:::
 
```tsx | pure
/**
 * title: <字符串数组>
 * description: scope==<字符串数组>
 */
import { createStore,computed,ObserverScopeRef  } from '@autostorejs/react'; 

const state = {
  user:{
    firstName:"Zhang",
    lastName:"Fisher",
    fullName: computed(async (deps)=>{ 
      return deps[0] + deps[1]
    },
      // 声明依赖
      ['user.firstName','user.lastName'], 
    {      
      async:true,
      scope:ObserverScopeRef.Depends
    }) 
  }
} 
const store = createStore(state)

export default ()=>{
  const [state,setState] = store.useState()
  return <div> 
    <div>FullName:{state.user.fullName.result}</div>
  </div>
}

```  
 
 
 

## 创建方式

`AutoStore`支持多种方式来创建计算属性，如下：

- **简单方式：直接在状态上声明普通的计算属性函数**
- **使用`computed`函数创建计算属性**
- **使用`store.computedObjects.create`创建计算属性**