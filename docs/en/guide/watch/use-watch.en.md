# usewatch
## about

 `useWatch` the function is used to listen to `store` the object changes and returns a value as the calculation state. When the component is destroyed, the subscription is automatically canceled, which is essentially `store.watch` packaging.

 `useWatch` the signature of the function is as follows:

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

- How to use and `store.watch` consistent, just `useWatch` the function will automatically cancel the subscription when the component is destroyed.
- `getter` the function can return a value `React` state


## Basic usage

Same `diray` the detection function is implemented as follows:

<demo react ="watch/useWatchDirty.tsx"/>


- `useWatch` the created listening will automatically cancel the subscription when the component is destroyed, and the subscription is not required manually.
- `useWatch` will not create `WatchObject`.
- `useWatch` of `getter` the function can return a value as a value `React` status, this state will be in `selector` the direction of the state is updated automatically after changes.
- If not specified `selector`, Will listen to `store` all changes in the object.


:::warning reminder
 `useWatch` the subscription will be automatically canceled when the component is destroyed, and the subscription is not required manually.
:::