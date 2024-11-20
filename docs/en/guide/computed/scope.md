# Scope
 

 `Calculation scope` refers to the computing function passed to the calculation function `Getter` the first parameter.

 `@autostorejs/react` creation `Store` support configuration `scope` parameters to specify the first parameter of the calculating property function, as follows:

```ts {20}
export enum ObserverScopeRef{
  Root    = 'root',                   // 指向State根对象
  Current = 'current',                // 指向计算属性所在的对象
  Parent  = 'parent',                 // 指向计算属性所在对象的父对象
  Depends = 'depends'                 // 指向异步计算的依赖数组，仅在异步计算时生效
  Self    = 'self'                    // 指向自身，默认值   
}

// 指定Store中计算函数的上下文,如果是字符串代表是当前对象的指定键
// 如果是string[]，则代表是当前Store对象的完整路径
export type ComputedScope  =  ObserverScopeRef | string | string[] 
            | ((state:any)=>string | string[] | ObserverScopeRef)
 
const store = createStore( {
  user:{
    firstName:"Zhang",
    lastName:"Fisher",
    fullName: computed((scope)=>{
      //  scope = user
    },["user.firstName","user.lastName"])
  }
} )

``` 

- `scope` the type of the parameter is `ComputedScope`, It can be `ObserverScopeRef` the enumeration value can also be a string or string array, or a function.
- `scope` the default value of the parameter is `ObserverScopeRef.Current`, That is, the object where the calculation attribute is located.

## Specify scope

Under default `computed` calculating function `Getter` can specify `scope` parameters, as follows:

- **default value** 

By default,`scope` point to the object where the calculation function is located. As in the above example,`scope` point `fullName` where `user` object.


- **Global designation** 

Can be created `Store` time, pass `scope` parameters to specify the default of the calculation attribute global `scope`,as follows:

```tsx  {6,11}
const store = createStore( {
  user:{
    firstName:"Zhang",
    lastName:"Fisher",
    fullName: computed((scope)=>{
      //  scope = <root>
      return scope.user.firstName+scope.user.lastName
    })
  }
},{
  scope: ObserverScopeRef.Root  // 所有计算属性的默认scope指向状态根
} )

```
- **Local specification** 

You can also specify the computing attribute local `scope`,as follows:

```tsx  {6,9}
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

## Range

### Current

By default,`scope==ObserverScopeRef.Current` when, calculate the function `scope` point to the object where the calculation function is located.

```tsx  {16}
import { ObserverScopeRef,useStore } from '@autostorejs/react'; 
import { ColorBlock } from "x-react-components"  

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

- In the code above,`fullName` functional `scope` pointing `user` object, that is,`state.user`.


:::warning Note ar
 `scope==ObserverScopeRef.Current` the default value is generally not specified, the above is just an example.
:::

### Root

 `@autostorejs/react` will calculate the function function `scope` point `ObserverScopeRef.Root` the current `State` the root object is as follows:

```tsx   {15}
import { useStore,ObserverScopeRef } from '@autostorejs/react'; 
import { ColorBlock } from "x-react-components"  

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

when `scope==ObserverScopeRef.Parent` at the time, the father of the object of the calculation function is located.

```tsx  {10-11,17}
import { createStore,ObserverScopeRef } from '@autostorejs/react'; 
import { ColorBlock } from "x-react-components"  

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


### String

when `store.options.scope == <star>` at this time `<String>` it means the absolute path.

```tsx  {9-10,17}
import { createStore } from '@autostorejs/react'; 
import { ColorBlock } from "x-react-components"  

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

:::warning reminder
 `scope === < -string>` the absolute path is used when it is used, adopted `.` as a path separator, such as `user.address.city`.
:::

### String array

```tsx  {9-10,17}
import { createStore } from '@autostorejs/react'; 
import { ColorBlock } from "x-react-components"  

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

:::warning reminder
When the state path is included `.` when characters, you can use a string array to specify the path to avoid ambiguity.
:::


### Depends

when `scope==ObserverScopeRef.Depends` at the time, point to the value of the dependencies of the calculation function.

 
```tsx
import { createStore,computed,ObserverScopeRef  } from '@autostorejs/react'; 
import { ColorBlock } from "x-react-components"  

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
   
:::warning reminder
 **`ObserverScopeRef.Depends`It takes effect only when calculating asynchronous, and the asynchronous calculation must be passed`computed`Function to specify dependencies** 
:::