# useWatch

## 关于

`useWatch`函数用来侦听`store`对象的变化并返回一个值作为计算状态,当组件销毁自动取消订阅，本质上是对`store.watch`的封装。

`useWatch`函数签名如下：

```ts  
export type UseWatchGetter<Value,DependValue> = (operate:StateOperate<DependValue>)=>Value | undefined | Promise<Value | undefined>
export type UseWatchSetter<Value> = (value:Value)=>void
export type UseWatchOptions<Value> = WatchListenerOptions & { 
    initial?:Value         // 提供初始值    
}

export interface UseWatchType<State extends Dict> {
    <Value=any,DependValue=any>(
        selector: ObjectKeyPaths<ComputedState<State>>,
        getter:UseWatchGetter<Value,DependValue>,
        options?:UseWatchOptions<Value>
    ): [Value,UseWatchSetter<Value>]
    <Value=any,DependValue=any>(
        selector: string[],
        getter:UseWatchGetter<Value,DependValue>,
        options?:UseWatchOptions<Value>
    ): [Value,UseWatchSetter<Value>]
    <Value=any,DependValue=any>(
        getter:UseWatchGetter<Value,DependValue>,
        options?:UseWatchOptions<Value>
    ): [Value,UseWatchSetter<Value>]
}
```

- 使用方法与`store.watch`一致，只是`useWatch`函数会在组件销毁时自动取消订阅。
- `getter`函数可以返回一个值作`React`状态


## 基本用法

同样的`diray`检测功能实现如下:

<demo react="watch/useWatchDirty.tsx"/>


- `useWatch`创建的侦听会在组件销毁时自动取消订阅，不需要手动取消订阅。
- `useWatch`不会创建`WatchObject`.
- `useWatch`的`getter`函数可以返回一个值作为`React`状态，该状态会在`selector`所指向的状态变化后自动更新。
- 如果没有指定`selector`，则会侦听`store`对象的所有变化。


:::warning 提示
`useWatch`会在组件销毁时自动取消订阅，不需要手动取消订阅。
:::