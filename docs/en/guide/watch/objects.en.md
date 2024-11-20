# Monitoring object
## about

as `ComputedObject` the same, all in the state directly use `watch` any declaration will create a correspondence `WatchObject` object.

pass `Store.watchObjects` you can access all the statements `WatchObject` objects can perform related dynamic removal/disable and other operations.

The following is a simple example of dirty prosecution of the form data:

<demo react ="watch/watchDirty.tsx"/>
 

## Dynamic creation monitoring object

same `computed` the same, not in the state declaration `watch` you can also use it `store.watchObjects.create` dynamic creation monitoring object

 `create` the method signature is as follows:

```ts
  create<Value=any,DependValue=any>(
    getter:WatchGetter<Value,DependValue>,
    filter?:WatchDependFilter<DependValue>,
    options?:Omit<WatchOptions<Value>,'filter'>
):WatchObject<Value>   
```

The example is as follows:

```ts {11-16}
import { createStore } from '@autostorejs/react';

const store = createStore({
  user:{
    firstName:"Zhang",
    lastName:"Fisher" 
  }
})


const obj = store.watchObjects.create((user)=>user.firstName+user.lastName)
 
const obj = store.watchObjects.create(
  (user)=>user.firstName+user.lastName,  // 计算函数
  ['./firstName','./lastName'],                // ❌ 不支持相对依赖
  ['user.firstName','user.lastName'],          // ✅ 使用绝对依赖
  {...options....}                             // 参数
)

``` **Compared with the statement of monitoring objects in the state when dynamic creation of monitoring objects, there is the following differences** the

- Dynamic creation monitoring objects do not exist in the context of the state, referring to the dependence when dependence is not used, and can only use absolute dependence, that is,`./`,`./`,`PARENT` the dependencies are invalid.
- Dynamic creation of monitoring objects `associated=false` 
- The function of dynamic creation monitoring objects is basically the same as the function created in the state, but the calculation result is not stored in the state, but is stored in the monitoring object. Can pass `obj.value` to get the calculation results.
 


## Manually execute

same `ComputedObject` same,`WatchObject` you can also execute manually, pass `store.watchObjects.get("<id>").run()` let's execute the monitoring function.
 