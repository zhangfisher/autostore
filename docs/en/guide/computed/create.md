# create
use `computed` function creates calculation properties.

```ts

// sync computed
function computed<Value = any, Scope = any >(
    getter: ComputedGetter<Value,Scope>,  // 计算函数
    options?: SyncComputedOptions<Value,Scope>
):Value;
// async computed
function computed<Value = any, Scope = any>(
   getter: AsyncComputedGetter<Value,Scope>, // 计算函数
   depends: ComputedDepends,       // 指定依赖
   options?: ComputedOptions<Value,Scope>
): ComputedDescriptorBuilder<Value,Scope>;
```## Declaration of the calculation property in the state

Declarize the calculation attribute directly in the state.

### Synchronous calculation attribute

use `computed(<getter>,<options>)` function declaration synchronization calculation attributes.

```tsx  {5-8}
const store = createStore({
  order:{
    price:100,
    count:3,
    // 1. Quickly create, automatically collect dependencies
    total1:(order)=>order.price * order.count,
    // 2. Use the computed function to create
    total2:computed((order)=>order.price * order.count),
  }
})
```

The following is an example of a synchronous calculation attribute:

<demo react ="computed/createSyncBase.tsx"/>
 

For more details, please refer to [Synchronous calculation attribute](./sync.md) 

:::warning reminder
The dependency collection of the synchronous calculation attribute is automatic, the basic method is to execute once at the initialization, and then pass the internal internal `proxy` intercepting access to collect dependence.
:::

### Asynchronous calculation attribute

use `computed(<getter>,<depends>,<options>)` function declares asynchronous computing attributes.

```typescript {5-12}
const store = createStore({
  user:{
    firstName:"Zhang",
    lastName:"Fisher",
    fullName:async (user)=>user.firstName+user.lastName
    fullName:computed(async (user，args)=>{
        user.firstName+user.lastName,
      },
      ['./firstName','./lastName'],
      {...options....})
  }
})


```

For more details, please refer to [Asynchronous calculation attribute](./async.md) 


:::warning reminder
Asynchronous computing attributes need to be passed `computed` functions to specify dependencies.
:::


## Dynamic creation calculation object

You can also declare in the state `computed` instead `store.computedObjects.create` dynamic creation calculation attributes.

 `create` the signature of the method is as follows:

```typescript
// create synchronous computed object
function create<Value = any, Scope = any>(
  getter: ComputedGetter<Value,Scope>,
  options?: SyncComputedOptions<Value,Scope>
):SyncComputedObject<Value,Scope>
// create asynchronous computed object
function create<Value = any, Scope = any>(
  getter: AsyncComputedGetter<Value,Scope>,
  depends: ComputedDepends,options?: ComputedOptions<Value,Scope>
): AsyncComputedObject<Value,Scope>    
// create computed object
function create<Value = any, Scope = any>(
  descriptor:ComputedDescriptor<Value,Scope>
): AsyncComputedObject<Value,Scope> | SyncComputedObject<Value,Scope>    
   
```

Three methods of dynamic creation of calculation attributes:

### Dynamic creation synchronous calculation

```ts  
import { createStore } from '@autostorejs/react';

const store = createStore({
  order:{
    price:100,
    count:3,
  }
})

const totalObj = store.computedObjects.create((order)=>order.price * order.count)

```

### Dynamic creation asynchronous calculation

```ts {11,12}
import { createStore } from '@autostorejs/react'; 

const store = createStore({
  order:{
    price:100,
    count:3,
  }
})

store.computedObjects.create(async (order)=>order.price * order.count,
  ['order.price','order.count']     //  ✅  use absolute dependence
  ['./price','./count']             // ❌  not support relative dependence
)
```


### Created with computed

The above two methods are also used inside `computed` created, the equivalent effect:

```ts 

// 同步计算
store.computedObjects.create(computed((order)=>order.price * order.count))

//  异步计算
store.computedObjects.create(computed(async (order)=>order.price * order.count,
  ['order.price','order.count'] //  ✅ use absolute dependence
  ['./price','./count']  // ❌ not support relative dependence
))
```

use `computed` you can make more configurations, such as `options` wait.
 

## summary

 **Compared with the computing attribute in the state when the calculation attribute is dynamically created, there is the following differences** the

- Dynamic creation calculation attributes do not have the context of the state, referring to the relative dependence when dependence, only absolute dependencies, that is,`./`,`./`,`PARENT` the dependencies are invalid.
- Dynamic creation calculation object `associated=true` 
- The function of the dynamic creation object is basically the same as the function created in the state, but the calculation result is not stored in the state, but is stored in the calculation object. Can pass `obj.value` to get the calculation results.

For more details, please refer to [Dynamic creation calculation object](./objects.md) 


:::warning reminder
use `computed(<getter>,<depends>,<options>)` when creating the calculation attribute, it involves:
- - `getter`: Calculate function, execute when relying on update. For details [Calculation function](./getter.md) 
- - `depends`: Dependence, see for details [rely](./deps.md) 
- - `options`: Various control options, see for details [Option](./options.md) 
:::