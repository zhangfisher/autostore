# Asynchronous calculation
## Instruction
 `AutoStore` provide a very powerful asynchronous computing attribute characteristics, use `computed` let's declare to create an asynchronous computing attribute.

:::warning reminder
all `computed(async (scope)=>{....})` the asynchronous calculation attributes of the declaration will be replaced by place `AsyncComputedValue` object.
:::

## Work inside

The basic method of creating asynchronous computing attributes is directly in `State` better Location `computed` declaration.

```tsx   {6-8}
import { computed } from "@autostorejs/react" 
const store = createStore({
  order:{
    price:10,
    count:1,
    total:computed(async (scope)=>{
      return scope.price*scope.count
    },['./price','./count'])
  }
})
```

- - `total` it is an asynchronous calculation attribute, and manually specify dependencies `./price` and `./count`(Relative path dependencies, see [Dependence](./deps).


<demo react ="computed/showAsyncValue.tsx"/>

 **Key point:** 

When we use `createStore` creating asynchronous computing attributes, there are two main things inside:

- **1. Replace the statement in place for it`AsyncComputedValue`** 

go through `createStore` after processing,`store.state.order.total` the value will be replaced with `AsyncComputedValue` the value of the type is:
```json
{   
   "loading":false,
   "timeout":0,
   "retry":0,
   "error":null,
   "value":10,
   "progress":0
}
```

When the dependencies of asynchronous computing changes, the re -calculation of the calculation attribute will be automatically triggered and updated `value` as well as `loading`,`error`,`progress` waiting. For details, please refer to the high -level characteristics below.

- **2. Create`AsyncComputedObject`Object** 

At the same time, a name will be created `Declaration of the path name` of `AsyncComputedObject` the object is preserved `store.computedObjects` middle.
Therefore, in the above example,`store.computedObjects.get("order.total")` that is `AsyncComputedObject` object.

## computed

 **`computed`It is an ordinary function that is used to declare the calculation attribute. The function signature of the function of asynchronous calculation attributes is as follows:** 

```ts 
function computed<Value = any, Scope = any>(
  getter: AsyncComputedGetter<Value,Scope>,
  depends: ComputedDepends,
  options?: ComputedOptions<Value,Scope>
):ComputedDescriptorBuilder<Value,Scope>;
```

 **Parameter description:** 

|Parameter|type|illustrate|
| --- | --- | --- |
|`getter`|`AsyncComputedGetter`|Asynchronous computing function|
|`depends`|`ComputedDepends`|Declare dependence|
|`options`|`ComputedOptions`|Related parameters of asynchronous computing attributes|

### Asynchronous computing function

 `getter` parameters (that is, asynchronous calculation function), the return value will be updated to the state `computed` for details, please refer to [introduce](./getter).

### Specify dependencies

- - `depends`: Rely on collecting, which is used to specify the state path dependent. See how to specify dependencies [Dependence](./deps).
- - `options`: Some options for asynchronous calculation attributes, please refer to [Option](./options).

### Configuration parameter

 `options` the parameter is a `ComputedOptions` the object is used to specify some options for calculating attributes. For details [Calculation option](./options).
 
## Basic usage

The creation of asynchronous computing attributes is used as the same as synchronous calculation `computed` come to declare, but the most important point is **Asynchronous computing needs to be explicitly specified dependencies**.

<demo react ="computed/asyncBase.tsx" 
When Title = "Modify FirstName or LastName, FullName will automatically re -calculate." 
/>


- above `fullName` it is an asynchronous calculation attribute, manually specify it depends on `user.firstName` and `./lastName`(Relative path).
- dependencies can use absolute paths or relative paths,use `.` as a path division,`./` refers to the current object,`../` refers to the object of the father, please refer to [Dependence](./deps).
- Modified in the input framework `firstName` or `lastName` hour,`fullName` it will automatically re -calculate.
- The results of the calculation attribute are stored in `state.user.fullName.value` middle.
- When the calculation attribute is being calculated,`state.user.fullName.loading` for `true` essence After the calculation is completed,`state.user.fullName.loading` for `false` 

## Advanced features 🔥

### Loading status

The loading status of the asynchronous calculation attribute is stored in `AsyncComputedValue` objective `loading` in attributes.

- when `loading=true` at that time, the asynchronous calculation is in progress.
- when `loading=false` at that time, the asynchronous calculation has been completed.

The following is an example of an asynchronous calculation loading state:

<demo react ="computed/asyncLoading.tsx"/>

- `useAsyncReactive` the state data used to return asynchronous computing attributes.


### Execution progress

The asynchronous computing attribute allows control to control the progress of calculation, and the execution progress is stored in `AsyncComputedValue` objective `progress` in the attribute,`progress` for `0-100` at the time, it represents the progress of asynchronous calculation. Developers can show the progress bar according to the progress value.

 **The method of use is as follows:** 

<demo react ="computed/asyncProgressbar.tsx" 
Title = "When adjusting the number of orders, Total will automatically recalculate." 
/>


- Deepen `getProgressbar` when the function is the function, the progress bar function can be activated, which can control the progress of the progress bar.
- `getProgressbar` the function returns a progress bar object. There are two methods of this object:`value` and `end`,`value` used to set the progress value,`end` used to end the progress bar.


### Overtime

Creation `computed` time can specify the timeout parameter (the unit is the `ms`),accomplish **Overtime** and **Countdown** function. The basic process is like this.

1. Specify `options.timeout = timeout` 
2. When the asynchronous calculation starts, it will start a timer and update `AsyncComputedValue` objective `timeout` property.
3. Triggered when timeout triggers `TIMEOUT` error, update the error to `AsyncComputedValue.error` in attributes.

<demo react ="computed/asyncTimeout.tsx"/>


### Countdown

exist `time out` will not update automatically in the function `timeout` attribute, you can pass `timeout = [timeout time, interval update time]` to enable the countdown function.

The basic process is as follows:

1. Specify `options.timoeut = [timeout time, interval update time]` 
2. When the asynchronous calculation starts, a timer will be activated and updated `AsyncComputedValue` objective `timeout` property.
3. Then every separate `Interval update time` update once `AsyncComputedValue.timoeut` 
4. Triggered when timeout triggers `TIMEOUT` error, update the error to `AsyncComputedValue.error` in attributes.


 **For example:`options.timoeut=[5*1000,5]`The timeout is 5 seconds, and it is updated every 1000MS`timeout`Attribute, countdown`5`Second-rate.** 

 
<demo react ="computed/asyncCountDown.tsx"/>


### Repeat

Creation `computed` you can specify the retry parameter to implement it **Repeat the error** function. The basic process is like this.

- Specify `options.retry = [Repeat number, retry interval ms]` 
- When the asynchronous calculation starts, it will be updated `AsyncComputedValue.retry` property.
- When an error is performed, it will be updated simultaneously `AsyncComputedValue.retry` the attribute is the number of retries.


<demo react ="computed/asyncRetry.tsx"/>
 
 **illustrate** 

- The number of retries is `0` do not try again. The number of retries is `N` during the actual execution `N+1` second-rate.
- Retry `error` it will be updated to the last error message.


### Cancel

Creation `computed` time can be passed in `abortSignal` parameter, this parameter returns one `AbortSignal`, Used to cancel the calculation operation.

The basic operation method is:

- exist `computed` transmission `abortSignal` parameter, this parameter is one `AbortSignal`, Can be used for subscription `abort` signal or passed to `fetch` or `axios` wait.
- You can call when cancel `AsyncComputedObject.cancel()` method to trigger one `AbortSignal` signal. As shown in the following example `state.order.total.cancel()` 
  
<demo react ="computed/asyncCancel.tsx"/>
  
 **Notice**  

- `abortSignal` the parameter is a `AbortSignal` object, can be used for subscription `abort` signal or passed to `fetch` or `axios` wait.
- **Pay attention** if you want the calculation function to be canceled, then call `AsyncComputedObject.cancel()` at this time, the calculation function should be received `abortSignal` when signal, actively end the exit calculation function. If the calculation function is not subscribed to `abort` signal, call `AsyncComputedObject.cancel()` it will not take effect.### Cannot be repeated

By default, the asynchronous computing function is executed whenever the dependencies change, and the asynchronous computing function will be repeatedly executed when continuously changing.

In the statement, you are allowed to specify `options.reentry=false` to prevent repeat, if you enter, you will only display a warning on the console.


## Brief asynchronous calculation

In most cases, asynchronous computing attributes should be used `computed` declaration, but you can also use an asynchronous function directly.

```ts   {5-7}
const order = {
    bookName:"ZhangFisher",
    price:100,
    count:3,
    total:async (order)=>{
      return order.price*order.count
    }
} 
```

The above simple asynchronous declaration method is equivalent to the following methods:

```tsx {7-9}
import { createStore,computed} from "@autostorejs/react" 

const store = createStore({
    bookName:"ZhangFisher",
    price:100,
    count:3,
    total:computed(async (order)=>{
      return order.price*order.count
    },[])  
}
 )
```

 **Not to use`computed`When performing asynchronous computing attribute declarations, you need to pay attention to the following points:** 

- default `scope` point `current`,Right now `total` object.
- Its dependence is empty, so it will not automatically collect dependencies, nor will it be automatically re -calculated. In other words `price` and `count` during the change,`total` it will not re -calculate automatically. However, it will be calculated automatically once at the first visit.
- If you need to re -calculate, you can execute manually `store.state.total.run()` or `store.computedObjects.get(<id>).run()`.## Precautions

- **When the asynchronous calculation function returns one`Promise`Problem** 

 `computed` internal use `isAsync` come to judge `getter` whether the function is an asynchronous function to adopt different processing logic.
But in the low version of the JS scene, this judgment may be incorrect.

For example `babel` translate the code to `es5` when waiting for the low version code, the asynchronous function may be translated into a synchronous function. At this time, it needs to be explicitly specified `options.async=true`.

```ts  {7}
const store = createStore({
    firstName:"Zhang",
    lastName:"Fisher",
    fullName: computed(async (user)=>{
      return user.firstName+user.lastName
    },["user.firstName","user.lastName"],{
      async:true
    })
  })
```

Different specification `computed(async ()=>{...},[...],{async:true})` in this way, it can be correctly identified as an asynchronous function. 