# State monitoring
Except `store.watch` come and listen to the state, you can also declare inside the state `watch` functions to monitor changes in status data.

## Working principle

 `@autostorejs/react` provide `watch` function, used in `state` state a monitoring object, and then the return value of the monitoring function is written into the path where the statement is located.

 ![](./images/signal-watch.drawio.png) 


 `watch` the basic features of the function are as follows:

- In any position in the state, use `watch(...)` let's declare a listener object.
- exist `createStore` after execution, scan the status data. If a value is found, it is `watch(...)` then create one `WatchObject` object, use it to monitor `State` data change.
- Created `WatchObject` the object will be preserved `Store` objective `watchObjects` object
- When the monitoring data changes, the call will be called `WatchObject` objective `getter` the function, and then write the return result to the statement `watch(...)` location.## Basic usage

 `watch` the signature of the function is as follows:

```ts
// 监听filter过滤后的
function watch<Value=any, DependValue=any>(
  getter:WatchGetter<Value,DependValue>,
  filter?:WatchDependFilter<DependValue>,
  options?:Omit<WatchOptions<Value>,'filter'>
):WatchDescriptorBuilder<Value>
// 监听全部
function watch<Value=any, DependValue=any>(
  getter:WatchGetter<Value,DependValue>,
  options?:Omit<WatchOptions<Value>,'filter'>
):WatchDescriptorBuilder<Value>
```
 
  

 **`watch`The function is basically used as follows:** 

<demo react ="watch/watchBase.tsx"/>

In the above example, we use it `watch` achieve `computed` similar features:

- `watch` the first parameter of the function is `getter` functions, responsible for calculating new values ​​when dependent changes.`getter` the return value of the function will be written `watch` the position where the function is located.
- `watch` the second parameter of the function is a filter function that calls this method when the state changes. If it returns `true` only execute `getter` 
- `initial` properties are used for configuration `watch` location where the function is `total` the initial value.

 
## Monitoring function

 `watch` of `getter` the parameter can only be one **Synchronous function** the signature is as follows:

```typescript
type WatchGetter<Value=any,DependValue= any> = (
    // 传入发生变化的路径和值
    scope: {path:string[],value:DependValue},
    // 创建的watchObject对象
    watchObject : WatchObject<Value>
)=>Exclude<any,Promise<any>> | undefined

```

## Monitoring parameter

 `watch` support the following parameters

```ts 
interface WatchOptions<Value=any> extends ObserverOptions<Value>  { 
    async?  : false                        
    filter : WatchDependFilter<Value>     
}
```

- `initial`: Used to specify a default value
- `id`: It is used to specify a unique identification, and at the same time as the creation `WatchObject` of `key` you can pass `store.watchObjects.get(<id>)` come to visit.


## Dynamic dependence

 `computed` the dependence of the calculation function is generally certain, and `watch` the dependencies of the function can be dynamic. This is more suitable for some scenes that need dynamic listening.

For example, in the above example, we dynamically listen to `orders[].count` change to calculate `total` essence and `computed` the dependence of the function is static, and once the statement is declared, it will not change.

The following is the form `validate` simple example of detection:

```tsx
const store = createStore({
      a:{
          validate:true
      },
      b:{
          validate:true
      },            
      c:{
          validate:true,
          c1:{
              validate:true
          }
      },
      validate:watch<boolean,boolean>(({path,value},watchObj)=>{   
          if(typeof(value) === 'boolean'){
              const srcKey = path.join('.')
              if(value){
                  delete watchObj.cache[srcKey]
              }else{
                  watchObj.cache[srcKey] = value
              }
          }
          // 由于cache里面只记录validate=false的值，所以如果cache不为空则代表有字段的validate=false
          return Object.keys(watchObj.cache).length==0

      },
      (path)=>path[path.length-1]=='validate', // 只侦听validate字段的值变化
      {initial:true,id:"x"})
  })  
```


 **illustrate:** 

- In the above example, we need to realize one `validate` the entire form of the field of the field is valid, when any object in the state `validate` the fields are `false` then, then `validate=false` otherwise `true`.
- The problem now is `validate` it may be in a complex nested object and may be dynamic. At this time, we cannot use `computed` calculate, because `computed` the dependence is static.
- It is used at this time `watch` at the time of the function, we declare one `watch` function to monitor all paths `path[path.length-1]=='validate'` the changes in fields can be.
- - 关于 `WatchObject` introduction, you can refer to [Listening object](./objects.md).