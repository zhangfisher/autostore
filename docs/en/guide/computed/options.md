# Computed Options
## about

It is recommended to use both synchronous or asynchronous computing attributes `computed` function to declare.

 `computed` function support `ComputedOptions` configuration parameters can control the behavior of calculating the attribute by configuration parameters.

 `computed` it is a function that is used to declare a calculation attribute. The function signature statement is as follows:

```ts {5,10}
function computed<Value = any, Scope = any>(
    getter: AsyncComputedGetter<Value,Scope>,
    depends: ComputedDepends,
    options?: ComputedOptions<Value,Scope>
): ComputedDescriptorBuilder<Value,Scope>;
function computed<Value = any, Scope = any >(
    getter: ComputedGetter<Value,Scope>,
    options?: SyncComputedOptions<Value,Scope>
): ComputedDescriptorBuilder<Value,Scope>;

```


## Option

 `computed` support the following calculation configuration parameters:

### ID

 **type** :  `string` 

Create a computing attribute object `ComputedObject` the only identification of the time, if it is not specified
- use `computed` the path name is as a logo, such as `user.fullName`.
- Dynamic `ComputedObject` A unique identification will be automatically generated.

Of course, you can pass `id` parameters to specify the unique identification.

### Immediant

 **type** :  `boolean | 'auto'` 
 **default value** the `'auto'` 

Is the calculation function immediately run once when the asynchronous calculation attribute is initialized `getter` the value is as follows:
|Value|illustrate|
|: ---:| --- |
|`true`|Immediately execute once when creating asynchronous calculations|
|`false`|Do not execute once when creating asynchronous calculations, and only execute when relying on changes in the future|
|`auto`|when `initial==undefined` it will be executed once immediately, and the other values ​​will not be executed once immediately|


### initial

 **type**: You can specify through generic parameters `Value` 
 **default value**: Undefined

As the initial value of the calculation attribute.

### scope

 **type** :  `ComputedScope` 
 **default value** besides `Current` 

Specify the first parameter of the calculation function, if it is not specified, the default is `Current` essence For details [Computedscope](./scope.md).

### enable

 **type** :  `boolean` 
 **default value** the `true` 

Calculate the switch, should `enable=false` computing will not be executed from time to time.
It can also pass `store.computedObjects.get(<id>).enable=<true/false>` to uniformly control the switch of the calculation attribute.

### async

 **type** :  `boolean` 
 **default value** the `undefined` 
    
By default,`computed` the function will pass `typeof(fn)=="async function"` to determine whether it is an asynchronous computing function to determine how to create synchronous or asynchronous computing attributes.
But return `Promise` or `Babel` in the case of transcoding and other cases, when judging the failure, you need to specify manually `async=true` 


### depends

 **type** :  `ComputedDepends` 

Must -fill dependencies are used for dependent items specified by asynchronous computing attributes. For details [ComputedDeppends](./deps.md).### group

 **type** :  `string` 

It is used to group the calculation attribute for easy management. For example, you can pass `store.computedObjects.runGroup("a"])` let's run the calculation function of the specified grouping.

refer to [Manually](./run.md).

### objectify

 **type** :  `boolean` 
 **default value** the `true` 

Whether to create `computedObject` the object is saved `store.computedObjects` middle.
Will `objectify=false`,exist `React` when creating a computing property in the component, do not save the calculation attribute to `store.computedObjects` middle. In order to automatically release it when the component is destroyed.


### Timeout

 **type** :  `number | [number,number]` 
 **default value** the `0` 

Used to control the timeout of the asynchronous function.

- The timeout time, when the calculation function executes exceeds the specified time, it will trigger timeout errors.
- if `Timeout = [timeout time, countdown time separation]`, For example: [1000, 10] Represents `1000ms` timeout, update every 100ms `timeout` value, achieve the effect of countdown.

For details [Overtime](./async#超时处理).


### norentry

 **type** :  `boolean` 
 **default value** the `false` 

The calculation function cannot be repeated, that is, the same calculation function will not be executed again during the execution process.


### AbortController

 **type** :  `()=>AbortController | undefine` 

Provide a custom `AbortController` used to replace the default `AbortController`, Used to pass to the asynchronous calculation function so that the asynchronous calculation can be canceled.

For details [Asynchronous computing-cancellation](./async#取消).


### Retry

 **type** :  `number` 
 **default value** the `0` 

Used to control the number of times after the failure of asynchronous computing.

- default `retry=0` it means that the retry control is not enabled.
- `retry=3` express up to the most `3` submitted interval is `0`, Add the first `1` second execution, a total of execution `4` second-rate
- `retry=[3,1000]` express up to the most `3` submitted interval is `1000ms`, Add the first `1` second execution, a total of execution `4` second-rate
- Repeat data can pass `AsyncComputedValue.retry` obtain
- Triggered to re -examine when the first execution fails, at this time `AsyncComputedValue.retry=3`, Then try every time `-1`, Until it is for `0` stop reviewing time

For details [Repeat](./async#重试).

### Extras

 **type** : `any` 

Extra parameters are used to pass to the calculation function. You can pass in the calculation function `extras` parameter acquisition.

```ts
import { createStore,computed } from '@autostorejs/react';
const store = createStore({
    firstName:"Zhang",
    lastName:"Fisher",
    fullName: computed(async (user,{extras})=>{
      return user.firstName+user.lastName + `${count}` 
    },["./firstName","./lastName"],{extras:{count:0}})
  }
})
```

### onerror

 **type** : `(error:Error)=>void` 

When performing calculations `getter` the callback when the function is wrong

### ONDONE

 **type** :  `(args:{id:string,error:Error | undefined,timeout:boolean ,abort:boolean ,path:string[] | undefined,scope:Scope,value:any}):void` 

The callback when the calculation function is executed

## Heavy load option

Use `<AsyncComputedValue>.run(<RuntimeComputedOptions>)` or `store.computedObjects.run(<RuntimeComputedOptions>)` when running the calculation function manually, it allows some options to overload.

```ts
type RuntimeComputedOptions = ComputedOptions & {
    first?  : boolean                           
    operate?: StateOperate                 
} 
```

:::warning Note
- Call `run` methods The options were allowed when manually executing the calculation function, but the heavy load was not allowed `id`,`depends`,`scope` wait for key options.
- The heavy load of the calculation option is only effective at the current runtime and will not affect the configuration during the statement.
:::