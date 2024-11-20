# about

 `AutoStore` provides an unparalleled calculation attribute implementation method, supports synchronous computing attributes and asynchronous computing attributes, and has abundant computing review, timeout, loading, errors and other states.

## Basic principle

:::warning reminder
 **`AutoStore`Realize the most unique calculation attribute implementation of flowers and wood -connecting wood** you can directly declare the calculation attribute in the state. Then calculate the results of the presentation of the statement.
:::

 ![](./images/store.drawio.png) 

 **The basic process is as follows:** 

1. First directly `State` the calculation of the attribute function in the statement, such as `total=computed(scope)=>scope.price*scope.count`.
2. Call `createStore` create `AutoStore` time, can use it `Proxy` acting `State` object, used to intercept the right `State` the read and write operation of the object, establish a state -changing event release/subscription mechanism.
3. Then scan the whole during initialization `State` data, if it is `function` or `ObserverDescriptorBuilder` object (that is,`computed` and `watch` the encapsulation function) will be created `ComputedObject` or `WatchObject`, And then dependent on subscription events.
3. `ComputedObject` it will be collected according to the status context and dependence, and the event changes are changed.
3. when `State` when the data changes in China, the recalculation of the calculation attribute will be automatically triggered, and the calculation results are assigned to `State` the corresponding attribute in the middle.

In the figure above, be `price` and `count` when changing, it will automatically trigger `total` calculate the calculation result to assign the calculation results to `total` property. So, when we visit `state.total` at this time, it is calculating the result, not a function.

 **The above is`@autostorejs/react`The process principle of calculating the process of moving flowers and wood** 


## Synchronous calculation

The process of synchronizing the attribute to the flowers and the wood is as follows:

```tsx  
const state = {
  order:{
    price:10,
    count:1,
    total:computed((scope)=>{
      return scope.price*scope.count
    })
  }
}
```

At this time `total` it is an ordinary function,`typeof(state.total)==='function'`.

```tsx  
const { state } = createStore({
  order:{
    price:10,
    count:1,
    total:computed((scope)=>{
      return scope.price*scope.count
    })
  }
})
```
run `createStore` will scan the entire object later, if you find it `computed` state, then:

1. `createStore` will context according to the status and context and `computed` function creates a `SyncComputedObject` object, preserve `store.comnutedObjects` in.
2. Run a synchronous calculation function to collect dependencies, and then write the return value `state.total`,at this time `typeof(state.total)==='number'`.

## Asynchronous calculation

The process of asynchronous computing attributes moving flowers and flowers is as follows:

```tsx  
const state = {
  order:{
    price:10,
    count:1,
    total:computed(async (scope)=>{
      return scope.price*scope.count
    },['./price','./count'])
  }
}
```

At this time `total` it is an ordinary function,`typeof(state.total)==='function'`.

```tsx  
const { state } = createStore({
  order:{
    price:10,
    count:1,
    total:computed(async (scope)=>{
      return scope.price*scope.count
    },['./price','./count'])
  }
})
```

run `createStore` will scan the entire object later, if you find it `computed` state, then:


1. according to `computed` state the combination of the state of the context to create one `AsyncComputedObject` object, preserve `store.comnutedObjects` in.
2. Will `state.total` replace `AsyncComputedValue`.

```ts
state.total={
  value:10,
  loading:true,
  error:null,
  timeout:0,
  retry:0
  progress,
  run,
  cancel  
}
```

For more introduction, please refer to [Asynchronous calculation](./async).