# State
## introduction

Create `AutoStore` after the example, you can access the status.

- **use`useReactive`** 

Used to access and update in components `Store` status data will lead to re -rendering when updating.

- **Directly read and write`store.state`** 

 `store.state` the response object returns `reactive` the essence is through `Proxy` realized.
Read and write `store.state` at this time, it will trigger the internal dependence collection, the operation of the relevant calculation attribute, cooperate `signal` the mechanism can automatically trigger the fine particle size of the component.

## useReactive

 `Store` object provides `useReactive` methods to access and update in components `Store` status data.

### Function signature

```ts
export interface UseReactiveType<State extends Dict> {
    <Path extends StatePaths<State> = StatePaths<State>>(selector: Path): UseReactiveResult<GetTypeByPath<ComputedState<State>,Path> ,State>
    <Path extends StatePaths<State> = StatePaths<State>>(selector: Path,async:boolean): UseReactiveResult<AsyncComputedValue<GetTypeByPath<State,Path>> ,State>
    <Value=any>(selector: string[]): UseReactiveResult<Value,State>
    <Value=any>(selector: ObjectKeyPaths<ComputedState<State>>,async:boolean): UseReactiveResult<AsyncComputedValue<Value>,State>
    <Value=any,SetValue=any>(getter: UseReactiveGetter<Value,State>,setter?:UseReactiveSetter<SetValue,State>): UseStateComposeResult<Value,SetValue,State>
    (): UseReactiveResult<State,State>
}
```

### Basic use

The way of use and `React` of `useState` method similar, return one `state` and `setState` the meta -group.

```tsx twoslash
import { createStore } from "@autostorejs/react" 
const { state,useReactive,$ } = createStore({
  user:{
    firstName:"Zhang",
    lastName:"Fisher",
    age:18,
  }
})
// 使用方式1 ： 能age自动推断类型
const [age,setAge] = useReactive('user.age')  

// 使用方式2  不能自动推断类型
const [firstName,setFirstName] = useReactive(['user','firstName'])  

```   

 **Simple examples are as follows:** 

<demo react ="store/useReactiveBase.tsx"/>

:::warning
- Be updated `Age` the entire component will be rendered again, and its behavior and `React` of `useState` similar.
- In the early version,`useReactive` call `useState`, Its API design is maintained as much as possible `React` of `useState` consistent, reduce user learning costs. But soon discover `useState` and `React` the built -in name conflict leads to renamed it, so the subsequent version is renamed `useReactive`.
:::


### Getter & Setter

 `useReactive` acceptable `getter` and `setter` two function parameters, used to get and set `State` the combined attribute in the middle.

- `getter`: Used to get `State` the combined attribute in the middle.
- `setter`: Used to set `State` the combined attribute in the middle.

```tsx 
 
const { useReactive,state,$ } = createStore( {
  firstName:"Zhang",
  lastName:"Fisher",
  fullName:(state)=>state.firstName+state.lastName,
})

const [fullName,setFullName] = useReactive<string,[string,string]>(
    (state)=>state.fullName,       // getter
    ([first,last],state)=>{        // setter
      state.firstName=first
      state.lastName=last
    }
)

// 修改firstName和lastName
setFullName(["Hello","Voerkai18n❤️"]) // [!code ++]

``` 


:::warning reminder
- Usereactive <`string`,`[string,string]`> You can specify `getter` and `setter` the generic type, so that there will be better code prompts when used.
- Usereactive (`<path string>`) Can automatically infer, but `getter` and `setter` you need to manually specify the generic type.
:::

 **Simple examples are as follows:** 

<demo react ="store/useReactiveGetSet.tsx"/>


:::warning reminder
 `useReactive` there is also an alias `useState`, But due to `useState` and `React` the built -in name is the same, and it often needs to be renamed when used, so `AutoStore` use `useReactive` come instead.
:::


## useasyncream

If the state is an asynchronous calculation attribute, it can also be used `useAsyncReactive` come to handle.

 `useAsyncReactive` return is a `AsyncComputedValue` the object contains the status information of the asynchronous calculation attribute.

<demo react ="computed/asyncReactiveBase.tsx"/>

See more about the characteristics of more asynchronous computing [Asynchronous calculation attribute](../computed/async.md).

## Directly read and write

Except `useReactive` method read and write,`sotre.state` return is a response type `Proxy` objects can directly read and write and trigger internal dependence collection and event response.


```ts
const { state , $ } = createStore({
  age:18
})

// 直接更新Age也会触发响应和依赖收集，但是不会触发重新渲染整个组件
state.age=100  // [!code ++]

```

 **Special attention:** 

- Directly modify the status `state.age=100` it will trigger internal dependency collection and event response, but it will not trigger the re -rendering the entire component. because `state` it is a response object (that is, pass by `proxy` the processing objects) will trigger the internal dependence collection and event response to its read and write. But there is no notice `React` components, so it will not trigger the re -rendering of the component.
- If you want to trigger a re -rendering when you want direct reading and writing state, you need to `state` package to let the state change `React` the component is re -rendered. This needs to be used:
  - 使用 `useReactive` 
  - 使用 `signal` signal component

Whether it is used `useReactive` or `Signal component` the principle of the balance is intercepted `state` read and write events, and then notify `React` the component is re -rendered.

 **The simple demonstration is as follows:** 

<demo react ="store/readWriteState.tsx"/>


:::warning
Update in this example `Age` it will not render the entire component, but only render `$('age')` this is the function of the signal component, which can provide fine -grained rendering.
 `$('age')` in essence, a passing is `React.memo` packed `ReactNode`.
:::## Silent update

When reading the state, it will trigger the corresponding `StateOperateType` types, such as `get` or `set` wait.

In some scenarios, we may not want to trigger these events, we can use `silentUpdate` method.

```tsx
store.silentUpdate(()=>{
  store.state.age=100
})
```

## Batch update

Under normal circumstances, multiple update events are triggered when updating multiple states. exist `React` in the scene, in order to optimize the rendering, we may want to update multiple states at one time and only trigger once. You can use it at this time `batchUpdate` method.

```tsx
store.batchUpdate(()=>{
  store.state.age=100
  store.state.name="Fisher" 
})
```

For more batch update technical details [Batch update](../store/batchUpdate.md).

## Read silently

It will be triggered when the normal access state `get` incidents, if you don't want to trigger `get` event, can be used `peep` method.

```tsx
store.peep((state)=>{
  return state.age
})
// 读取age不会触发get事件
store.peep("age") // 100
```

The above method will not be triggered `get <age>` event.


## update

 `update` the method is used to update the status, the function signature is as follows:

```tsx
type UpdateOptions = {
    batch?:boolean | string,         
    silent?:boolean,        
    peep?:boolean           
    reply?:boolean
}
update(fn:(state:ComputedState<State>)=>void,options?:UpdateOptions)
```

- `batchUpdate` only `update((state)=>{....},{batch:true})` shortcurring.
- `silentUpdate` only `update((state)=>{....},{silent:true})` shortcurring.


## summary

- renew `Store` the state can not be used `useReactive` return `setXXXXX` used directly `state.xxxx=xxx` you can update the state to trigger the response.
- If you want to provide fine -grained updates, you can use it `signal` mechanism, pass `$` methods Create a signal component to trigger local updates.

