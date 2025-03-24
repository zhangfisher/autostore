# Scope

The `Calculation scope` refers to the first parameter passed to the computation function `Getter`.

When creating a `Store` in `@autostorejs/react`, you can configure the `scope` parameter to specify the first parameter of the computed property function, as follows:

```ts {20}
export enum ObserverScopeRef{
  Root    = 'root',                   // Points to the root object of State
  Current = 'current',                // Points to the object where the computed property is located
  Parent  = 'parent',                 // Points to the parent object of where the computed property is located
  Depends = 'depends'                 // Points to the dependency array of async computation, only effective in async computation
  Self    = 'self'                    // Points to itself, default value   
}

// Specifies the context of computation functions in Store. If it's a string, it represents a specific key of the current object
// If it's string[], it represents the complete path of the current Store object
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

- The `scope` parameter type is `ComputedScope`, which can be an `ObserverScopeRef` enumeration value, a string, a string array, or a function.
- The default value of the `scope` parameter is `ObserverScopeRef.Current`, which refers to the object where the computed property is located.

## Specifying Scope

The `computed` function's `Getter` can specify `scope` parameters by default, as follows:

- **Default Value**

By default, `scope` points to the object where the computation function is located. As in the above example, `scope` points to the `user` object where `fullName` is located.

- **Global Specification**

You can specify the default global `scope` for computed properties when creating the `Store` by passing the `scope` parameter, as follows:

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
  scope: ObserverScopeRef.Root  // Default scope for all computed properties points to the state root
} )
```

- **Local Specification**

You can also specify the local `scope` for a computed property, as follows:

```tsx  {6,9}
const store = createStore( {
  user:{
    firstName:"Zhang",
    lastName:"Fisher",
    fullName: computed((scope)=>{
      //  scope points to root
      return scope.user.firstName+scope.user.lastName
    },{
      scope: ObserverScopeRef.Root   // Specifies scope only for the current computed property
    })
  }
} )
```

## Scope Types

### Current

By default, when `scope==ObserverScopeRef.Current`, the computation function's `scope` points to the object where the computation function is located.

```tsx  {16}
import { ObserverScopeRef,useStore } from '@autostorejs/react'; 
import { ColorBlock } from "x-react-components"  

export default ()=>{

  const { state } = useStore({
    user:{
      firstName:"Zhang",
      lastName:"Fisher",
      fullName: function(scope){
        // scope points to user object  
        return scope.firstName+scope.lastName 
      }
    }},{
    // Specifies that the default context of computed properties points to the current object where the computation function is located
    scope: ()=>ObserverScopeRef.Current
  })
  return <div> 
    <ColorBlock name="FullName">{state.user.fullName}</ColorBlock>
  </div>
}
```

- In the code above, the `fullName` function's `scope` points to the `user` object, which is `state.user`.

:::warning Note
`scope==ObserverScopeRef.Current` is the default value and generally doesn't need to be specified. The above is just an example.
:::

### Root

`@autostorejs/react` will make the computation function's `scope` point to `ObserverScopeRef.Root`, which is the current `State` root object, as follows:

```tsx   {15}
import { useStore,ObserverScopeRef } from '@autostorejs/react'; 
import { ColorBlock } from "x-react-components"  

export default ()=>{
  
  const { state } = useStore({
    user:{
      firstName:"Zhang",
      lastName:"Fisher",
      fullName: function(scope){ 
        // scope points to root object  
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

When `scope==ObserverScopeRef.Parent`, it points to the parent object of where the computation function is located.

```tsx  {10-11,17}
import { createStore,ObserverScopeRef } from '@autostorejs/react'; 
import { ColorBlock } from "x-react-components"  

const { state } = createStore({
  parent:{
    user:{
      firstName:"Zhang",
      lastName:"Fisher",
      fullName: function(scope){
        // scope points to user object's parent, which is parent
        return scope.user.firstName+scope.user.lastName
      }
    }
  }
} ,{
  // Specifies that the default context of computed properties points to the parent object of where the computation function is located
    scope: ObserverScopeRef.Parent,
})

export default ()=>{ 
  return <div> 
    <ColorBlock name='FullName'>{state.parent.user.fullName}</ColorBlock>
  </div>
}
```

### String

When `store.options.scope == <string>`, `<string>` represents an absolute path.

```tsx  {9-10,17}
import { createStore } from '@autostorejs/react'; 
import { ColorBlock } from "x-react-components"  

const { state } = createStore({
  user:{
    firstName:"Zhang",
    lastName:"Fisher",
    fullName: function(scope){
      // this points to user.address.city
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

:::warning Note
When using `scope === <string>`, it uses absolute paths with `.` as the path separator, such as `user.address.city`.
:::

### String Array

```tsx  {9-10,17}
import { createStore } from '@autostorejs/react'; 
import { ColorBlock } from "x-react-components"  

const { state } = createStore({
  user:{
    firstName:"Zhang",
    lastName:"Fisher",
    fullName: function(scope){
      // this points to user.address['main.city']
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

:::warning Note
When the state path includes `.` characters, you can use a string array to specify the path to avoid ambiguity.
:::

### Depends

When `scope==ObserverScopeRef.Depends`, it points to the values of the computation function's dependencies.

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
      ['user.firstName','user.lastName'],  // Declare dependencies
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

:::warning Note
**`ObserverScopeRef.Depends` only takes effect in asynchronous computation, and asynchronous computation must specify dependencies using the `computed` function**
:::