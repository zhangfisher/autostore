# Synchronous Computed 
## About
  
Synchronous computed properties are directly declared in the state. Essentially, they are regular functions that automatically trigger recalculation when data in the `State` changes, assigning the computed result to the corresponding property in the `State`.

## Creation Methods

### Quick Creation

You can directly declare regular synchronous computation functions in the `State`.

```ts {6-8}
import { createStore } from '@autostorejs/react';
const state = createStore({
  user:{
    firstName:"Zhang",
    lastName:"Fisher",
    fullName: (user)=>{
      return user.firstName+user.lastName
    } 
  }
})
```
- `fullName` is a synchronous computed property that depends on `firstName` and `lastName`. When either `firstName` or `lastName` changes, `fullName` will automatically recalculate.
- The first parameter (i.e., the `scope`) of `fullName` is specified by the `scope` parameter in `createStore`, which defaults to `ObserverScopeRef.Current`. Therefore, the first parameter of `fullName` is the `user` object.
- If the synchronous computation function is a regular function rather than an arrow function, the `this` context points to the `computedObject` created for the current computed property. See [Computed Objects](./objects) for details.
- Dependency collection for synchronous computed properties is automatic, requiring no manual specification.


<demo react="computed/syncBase.tsx" /> 


### Using `computed`

The standard way to create synchronous computed properties is using the `computed(<getter>,<options>)` function. By specifying `options`, you can have more flexible control over the behavior of computed properties.


```ts {6,8}
const state = {
  user:{
    firstName:"Zhang",
    lastName:"Fisher",
    fullName:computed<string>((state)=>{
      return state.user.firstName+state.user.lastName
    },{ 
      scope:ObserverScopeRef.Root               // First parameter of the computation function
    }) 
  }
} 
```

Since `computedScope` can be specified, the computation function can achieve relative computation.

<demo react="computed/syncBookOrder.tsx" />


- In the example above, calculating the subtotal of an order only requires ` {...,total:(book)=>book.price*book.count}`, which looks very concise.


## Configuration Parameters

When creating synchronous computed properties using `computed(<getter>,<options>)`, you can specify the following parameters:

| Parameter | Type | Default Value | Description | 
| --- | --- | --- | --- |
| `id` | `string` |  | Unique identifier for the computed property, used to find the computed property object in `computedObjects`. |
| `scope` | `ObserverScopeRef` | `ObserverScopeRef.Current` | The first parameter of the computation function, i.e., the `scope`. |
| `group` | `string` |  | Used to group computed property objects, allowing execution of a group of computed properties using `computedObjects.runGroup(name)`. |
| `objectify` | `boolean` | `true` | Whether to save the computed property object in `store.computedObjects` |
