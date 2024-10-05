---
group:
  title: 计算属性
  order: 2
order: 4  
demo:
  tocDepth: 5
toc: content
---

# 作用域
 

`计算作用域`指的是传递给计算函数`Getter`的第一个参数。

`@autostorejs/react`在创建`Store`时，支持配置`scope`参数来指定计算属性函数的第一个参数，如下：

```ts | pure {17}
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
      //  scope指向user
    },["user.firstName","user.lastName"])
  }
} )

``` 

- `scope`参数的类型是`ComputedScope`，可以是`ObserverScopeRef`枚举值，也可以是字符串或字符串数组，也可以是一个函数。
- `scope`参数的默认值是`ObserverScopeRef.Current`，即指向计算属性所在的对象。

## 指定Scope

默认情况下`computed`的计算函数`Getter`可以指定`scope`参数，如下：

- **默认值**

默认情况下，`scope`指向计算函数所在的对象。如上例中，`scope`指向`fullName`所在的`user`对象。


- **全局指定**

可以在创建`Store`时，通过`scope`参数来全局指定计算属性的默认`scope`，如下：

```tsx | pure  {6,11}
const store = createStore( {
  user:{
    firstName:"Zhang",
    lastName:"Fisher",
    fullName: computed((scope)=>{
      //  scope指向root
      return scope.user.firstName+scope.user.lastName
    })
  }
},{
  scope: ObserverScopeRef.Root  // 所有计算属性的默认scope指向状态根
} )

```
- **局部指定**

也可以局部指定计算属性的`scope`，如下：

```tsx | pure  {6,9}
const store = createStore( {
  user:{
    firstName:"Zhang",
    lastName:"Fisher",
    fullName: computed((scope)=>{
      //  scope指向root
      return scope.user.firstName+scope.user.lastName
    },{
      scope: ObserverScopeRef.Root   // 仅指定当前计算属性的scope
    })
  }
} )
```

## 取值范围

### Current

默认情况下，`scope==ObserverScopeRef.Current`时，计算函数的`scope`指向计算函数所在的对象。

```tsx  
/**
 * title: ObserverScopeRef.Current
 * description: scope===user
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
 * description: scope===<ROOT>
 */
import { useStore,ObserverScopeRef } from '@autostorejs/react'; 
import { ColorBlock } from "components" 

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
    <ColorBlock name='FullName'>{state.user.fullName}</ColorBlock>
  </div> 
}
``` 

### Parent

当`scope==ObserverScopeRef.Parent`时，指向计算函数所在的对象的父对象。

```tsx   
/**
 * title: ObserverScopeRef.Parent
 * description: scope===parent
 */
import { createStore,ObserverScopeRef } from '@autostorejs/react'; 
import { ColorBlock } from "components" 

const { state } = createStore({
  parent:{
    user:{
      firstName:"Zhang",
      lastName:"Fisher",
      fullName: function(scope){
        // scope指向user对象的父对象，即parent
        return scope.user.firstName+scope.user.lastName
      }
    }
  }
} ,{
  // 指定计算属性的默认上下文指向计算函数所有的当前对象
  scope: ObserverScopeRef.Parent,
})

export default ()=>{ 
  return <div> 
    <ColorBlock name='FullName'>{state.parent.user.fullName}</ColorBlock>
  </div>
}
```


### 字符串

当`store.options.scope==<字符串>`时，此时`<字符串>`就是指向绝对路径。

```tsx
/**
 * title: <字符串>
 * description: scope===user.address.city
 */
import { createStore } from '@autostorejs/react'; 
import { ColorBlock } from "components" 

const { state } = createStore({
  user:{
    firstName:"Zhang",
    lastName:"Fisher",
    fullName: function(scope){
      // this指向user.address.city
      return scope
    },
    address:{
      city:"Quanzhou",
    }
  }
},{
  scope: 'user.address.city'
})

export default ()=>{ 
  return <div> 
    <ColorBlock name='FullName'>{state.user.fullName}</ColorBlock>
  </div>
}

```

:::warning{title=提醒}
`scope===<字符串>`时使用的是绝对路径，采用`.`作为路径分隔符，如`user.address.city`。
:::

### 字符串数组 

```tsx  
/**
 * title: <字符串数组 >
 * description:  scope===user.address['main.city']
 */
import { createStore } from '@autostorejs/react'; 
import { ColorBlock } from "components" 

const { state } = createStore({
  user:{
    firstName:"Zhang",
    lastName:"Fisher",
    fullName: function(scope){
      // this指向user.address['main.city']
      return scope
    },
    address:{
      'main.city':"Quanzhou",
    }
  }
},{
  scope: ['user','address','main.city']
})

export default ()=>{ 
  return <div> 
    <ColorBlock name='FullName'>{state.user.fullName}</ColorBlock>
  </div>
}
```

:::warning{title=提醒}
当状态路径中包含`.`字符时，可以使用字符串数组来指定路径,避免产生歧义。
:::


### Depends

当`scope==ObserverScopeRef.Depends`时，指向计算函数的依赖项的值。

 
```tsx
/**
 * title: <字符串数组>
 * description: scope==[firstName,lastName]
 */
import { createStore,computed,ObserverScopeRef  } from '@autostorejs/react'; 
import { ColorBlock } from "components" 

const { state } = createStore({
  user:{
    firstName:"Zhang",
    lastName:"Fisher",
    fullName: computed(async (deps)=>{ 
      return deps[0] + deps[1]
    },      
      ['user.firstName','user.lastName'],  // 声明依赖
    {      
      async:true,
      scope:ObserverScopeRef.Depends
    }) 
  }
} )

export default ()=>{ 
  return <div> 
    <ColorBlock name='FullName'>{state.user.fullName.value}</ColorBlock>
  </div>
}

```  
   
:::warn
**`ObserverScopeRef.Depends`仅在异步计算时生效,而异步计算必须通过computed函数来指定依赖**
:::