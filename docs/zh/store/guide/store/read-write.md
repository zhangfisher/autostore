# 读写状态

## 引言

当创建好`AutoStore`实例后就可以存取状态。

`store.state`返回的是一个响应式`Proxy`对象，直接读写会触发内部的依赖收集和事件响应。

```ts
const store = new AutoStore({
    age: 18,
});
// 直接更新Age会触发响应和依赖收集
store.state.age = 100; // [!code ++]
```

## 指南

### 静默更新

对状态进行读取时，会触发相应的`StateOperateType`类型的事件，如`get`或`set`等。

在某些场景下，我们可能不希望触发这些事件，可以使用`silentUpdate`方法。

```tsx
store.silentUpdate(() => {
    store.state.age = 100;
});
```

### 批量更新

一般情况下，更新多个状态时会触发多个更新事件。在`React`场景中，为了优化渲染，我们可能希望一次性更新多个状态，只触发一次渲染。此时就可以使用`batchUpdate`方法。

```tsx
store.batchUpdate(() => {
    store.state.age = 100;
    store.state.name = 'Fisher';
});
```

关于更多的批量更新的技术细节见[批量更新](../store/batchUpdate.md)。

### 静默读取

正常访问状态时会触发`get`事件，如果不希望触发`get`事件，可以使用`peep`方法。

```tsx
store.peep((state) => {
    return state.age;
});
// 读取age不会触发get事件
store.peep('age'); // 100
```

以上方法不会触发`get <age>`事件。

### update

`update`方法用来更新状态，其函数签名如下：

```tsx
type UpdateOptions = {
    /**
     * 执行批量更新操作，期间不会触发事件，等更新函数执行后再触发batch事件
     *  =false 不执行批量更新操作
     *  =true  执行批量更新操作，批量更新事件名称为__batch_update__
     *  <string> 执行批量更新操作，批量更新事件名称为指定的字符串
     */
    batch?: boolean | string;
    /**
     * 执行更新操作时，静默，不会触发任何事件
     *
     */
    silent?: boolean;
    /**
     *
     * 更新时执行校验的模式
     * - none    不进行校验，即不执行校验函数
     * - pass    校验失败时放行，即进行更新
     * - ignore  校验失败时忽略更新操作，不进行更新
     * - throw   校验失败时抛出异常 (默认)
     *
     *
     */
    validate?: 'none' | 'pass' | 'throw' | 'ignore';
    /**
     * 执行读取操作时，不会触发GET事件
     * 即偷听
     */
    peep?: boolean;
    /**
     * 在批量更新结束后，会自动回放update(()=>{...})之间的所有操作事件
     * 然后再触发一个__batch_update__事件
     *
     * @description
     *
     * =true 默认会回放所有操作事件
     * =false 不会回放操作事件,仅会触发__batch_update__事件
     */
    reply?: boolean;
    /**
     * 额外的更新标识
     * 用在执行更新操作时传递额外的标识
     *
     * store.update(()=>{...},{flags:8})
     *
     * 在update期间触发的事件operate中会包含此值，可以通过operate.flags获取到此值
     *
     */
    flags?: number;
}
update(fn:(state:ComputedState<State>)=>void,options?:UpdateOptions)
```

-   `batchUpdate`仅是`update((state)=>{....},{batch:true})`的快捷方式。
-   `silentUpdate`仅是`update((state)=>{....},{silent:true})`的快捷方式。
