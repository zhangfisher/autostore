# State

## 引言

当创建好`AutoStore`实例后就可以存取状态。

- **使用`useReactive`**

用来在组件中访问和更新`Store`的状态数据，更新时会导致重新渲染。

- **直接读写`store.state`**

`store.state`返回的是一个响应式对象`reactive`，其实质是通过`Proxy`实现的。
当读写`store.state`时，会触发内部的依赖收集，相关计算属性的运行，配合`signal`机制可以自动触发组件的细粒度重新渲染。

## useReactive

`Store`对象提供了`useReactive`方法，用来在组件中访问和更新`Store`的状态数据。

### 函数签名

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

### 基础使用

其使用方式与`React`的`useState`方法类似，返回一个`state`和`setState`的元组。

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

**简单示例如下：**

<demo react="store/useReactiveBase.tsx" />

:::warning
- 当更新`Age`时会重新渲染整个组件,其行为与`React`的`useState`类似。
- 在早期版本中，`useReactive`叫`useState`，其API设计尽可能保持与`React`的`useState`一致，减少用户的学习成本。但是很快发现`useState`与`React`内置名称冲突，导致需要进行重命名，所以后续版本中更名为`useReactive`。
:::


### getter & setter

`useReactive`还可以接受`getter` 和`setter`两个函数参数，用来获取和设置`State`中的组合属性。

- `getter`：用来获取`State`中的组合属性。
- `setter`：用来设置`State`中的组合属性。

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


:::warning 提示
- useReactive<`string`,`[string,string]`>可以指定`getter`和`setter`的泛型类型，这样在使用时会有更好的代码提示。
- useReactive(`<path string>`)能自动类型推断，但是`getter`和`setter`需要手动指定泛型类型。
:::

**简单示例如下：**

<demo react="store/useReactiveGetSet.tsx" />


:::warning 提示
`useReactive`还有一个别名`useState`，但是由于`useState`与`React`内置名称相同，使用时经常需要重命名，所以在`AutoStore`中使用`useReactive`来代替。
:::


## useAsyncReactive

如果状态是一个异步计算属性，也可以使用`useAsyncReactive`来处理。

`useAsyncReactive`返回是一个`AsyncComputedValue`对象，其包含了异步计算属性的状态信息。

<demo react="computed/asyncReactiveBase.tsx" />

更多异步计算的特性见[异步计算属性](/guide/computed/async.md)。

## 直接读写

除了使用`useReactive`方法读写状态外，`sotre.state`返回的是一个响应式`Proxy`对象，可以直接读写也会触发内部的依赖收集和事件响应。


```ts
const { state , $ } = createStore({
  age:18
})

// 直接更新Age也会触发响应和依赖收集，但是不会触发重新渲染整个组件
state.age=100  // [!code ++]

```

**特殊注意：**

- 直接修改状态`state.age=100`会触发内部的依赖收集和事件响应，但是不会触发重新渲染整个组件。因为`state`是一个响应式对象（即经过`proxy`处理过的对象），对其的读写会触发内部的依赖收集和事件响应。但是并没有通知`React`组件，所以不会触发组件的重新渲染。
- 如果要让直接读写状态时触发重新渲染，就需要对`state`进行包装，让状态变化时通知`React`组件重新渲染。这需要使用：
  - 使用`useReactive`
  - 使用`signal`信号组件

无论是使用`useReactive`或`信号组件`均原理均是会拦截`state`读写事件，然后通知`React`组件重新渲染。

**简单演示如下：**

<demo react="store/readWriteState.tsx" />


:::warning
此例中更新`Age`时并不会重新渲染整个组件,而只会渲染`$('age')`，这就是信号组件的功能，其可以提供细粒度的更新渲染。
`$('age')`本质上返回的是一个经过`React.memo`包装的`ReactNode`。
:::



## 静默更新

对状态进行读取时，会触发相应的`StateOperateType`类型的事件，如`get`或`set`等。

在某些场景下，我们可能不希望触发这些事件，可以使用`silentUpdate`方法。

```tsx
store.silentUpdate(()=>{
  store.state.age=100
})
```

## 批量更新

一般情况下，更新多个状态时会触发多个更新事件。在`React`场景中，为了优化渲染，我们可能希望一次性更新多个状态，只触发一次渲染。此时就可以使用`batchUpdate`方法。

```tsx
store.batchUpdate(()=>{
  store.state.age=100
  store.state.name="Fisher"
})
```

关于更多的批量更新的技术细节见[批量更新](/guide/store/batchUpdate.md)。

## 静默读取

正常访问状态时会触发`get`事件，如果不希望触发`get`事件，可以使用`peep`方法。

```tsx
store.peep((state)=>{
  return state.age
})
// 读取age不会触发get事件
store.peep("age") // 100
```

以上方法不会触发`get <age>`事件。


## update

`update`方法用来更新状态，其函数签名如下：

```tsx
type UpdateOptions = {
    batch?:boolean | string,         
    silent?:boolean,        
    peep?:boolean           
    reply?:boolean
}
update(fn:(state:ComputedState<State>)=>void,options?:UpdateOptions)
```

- `batchUpdate`仅是`update((state)=>{....},{batch:true})`的快捷方式。
- `silentUpdate`仅是`update((state)=>{....},{silent:true})`的快捷方式。


## 小结

- 更新`Store`的状态可以不需要使用`useReactive`返回的`setXXXXX`,直接使用`state.xxxx=xxx`即可更新状态触发响应。
- 如果要提供细粒度的更新，可以使用`signal`机制，通过`$`方法创建一个信号组件，用来触发局部更新。


