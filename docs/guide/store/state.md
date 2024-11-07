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
type UseStateResult<Value,State extends Dict>=[Value extends Dict ? ComputedState<Value> : Value,(value:Value | ((state:ComputedState<State>)=>void))=>void]
type UseStateGetter<Value,State extends Dict>= (state:ComputedState<State>)=>Value
type UseStateSetter<SetValue,State extends Dict>= (value:SetValue,state:ComputedState<State>)=>void


interface UseStateType<State extends Dict> {
    <Value=any>(selector: string): UseStateResult<Value,State>
    <Value=any>(selector: string[]): UseStateResult<Value,State>
    <Value=any>(selector: string,async:boolean): UseStateResult<AsyncComputedValue<Value>,State>
    <Value=any>(selector: string[],async:boolean): UseStateResult<AsyncComputedValue<Value>,State>
    <Value=any,SetValue=any>(getter: UseStateGetter<Value,State>,setter?:UseStateSetter<SetValue,State>): UseStateResult<Value,State>
    (): UseStateResult<State,State>
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
// 使用方式1
const [age,setAge] = useReactive<number>('user.age')  

// 使用方式2
const [firstName,setFirstName] = useReactive<string>(['user','firstName'])  

```   

**简单示例如下：**

<demo react="store/useReactiveBase.tsx" />

:::warning
当更新`Age`时会重新渲染整个组件,其行为与`React`的`useState`类似。
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
useReactive<`string`,`[string,string]`>可以指定`getter`和`setter`的泛型类型，这样在使用时会有更好的代码提示。
:::

**简单示例如下：**

<demo react="store/useReactiveGetSet.tsx" />


:::warning 提示
`useReactive`还有一个别名`useState`，但是由于`useState`与`React`内置名称相同，使用时经常需要重命名，所以在`AutoStore`中使用`useReactive`来代替。
:::


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


## useAsyncReactive

如果状态是一个异步计属性，也可以使用`useAsyncReactive`来处理。

详见[异步计算属性](/guide/computed/async.md)。

## 小结

- 更新`Store`的状态可以不需要使用`useReactive`返回的`setXXXXX`,直接使用`state.xxxx=xxx`即可更新状态触发响应。
- 如果要提供细粒度的更新，可以使用`signal`机制，通过`$`方法创建一个信号组件，用来触发局部更新。


