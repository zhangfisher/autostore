# 状态信号组件

## 关于

将状态数据封装为信号组件，当状态数据变化时，自动触发信号组件的重新渲染。

![](./images/signal-from-state.drawio.png)```ts 
interface SignalComponentType<State extends Dict>{
    // 指定状态数据路径
    (selector: string):React.ReactNode   
    // 返回状态数据的函数
    (selector: (state:ComputedState<State>)=>React.ReactNode):React.ReactNode 
}
```

:::info 提示
只需要指定状态数库的路径或者提供一个返回状态数据的函数即可。
:::


## 同步信号组件

使用`$('<状态路径>')`将**状态数据直接直接封装为信号组件**，当状态数据变化时，自动触发信号组件的重新渲染。

<demo react="signals/signalStateBase.tsx"/>

:::warning 注意
当更新`Age`时，整个色块不会变化重新渲染⚡。
:::

## 组合同步信号组件

使用`$((state)=>{.....})`将多个状态数据组合创建为一个信号组件，当依赖的状态数据变化时，该信号组件会自动触发重新渲染。

<demo react="signals/signalComboState.tsx"/>

## 异步计算信号组件

当使用`$('<状态路径>')`将**状态数据直接直接封装为信号组件**时，如果状态数据是异步数据对象`AsyncComputedValue`时，该对象包含了`loading`、`error`、`value`等属性。
 
<demo react="signals/signalAsyncState.tsx"/>
 

- 当路径指定的是一个异步计算属性时，创建的信号组件时会自动添加`value`属性。因此，以上`$('order.total')`和`$('order.total.value')`是等价的。


:::warning 注意 
- `$('order.count')`和`$('order.total.value')`是等价的，创建信号组件时，如果发现目标是`AsyncComputedValue`则自动添加`value`。
- 您可能已经注意到了，当前页面的渲染色块组件都不会变化⚡。这就是信号组件细粒度更新的魅力所在，状态变化时，组件的渲染被限制在信号组件内部。
:::
