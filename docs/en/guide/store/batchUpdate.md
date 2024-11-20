# 批量更新

一般情况下，更新多个状态时会触发多个`set`事件。在`React`场景中，为了优化渲染，我们可能希望一次性更新多个状态，只触发一次渲染。

`AutoStore`内置`批量更新机制`,以下介绍其工作机制，以及如何使用。

## 工作机制

```ts
const sore = new AutoStore({
    name:"Fisher"
    age:18
})
```

1. 首先当执行`store.state.name='Wang'`和`store.state.age=20`时，会触发两次`set`事件。

```tsx
{
    "type":"set",
    "path":["name"],
    "value":"Wang"
}
{
    "type":"set",
    "path":["age"],
    "value":20
}
```

2. 正常情况下，`set`事件会触发`React`组件的重新渲染，但是如果我们希望一次性更新多个状态，只触发一次渲染，此时使用`batchUpdate`方法。

```tsx
store.batchUpdate(state=>{
    store.state.name='Wang'
    store.state.age=20
})
```

- `batchUpdate`方法会设置`store._batching`为`true`，然后执行`store.state.name='Wang'`和`store.state.age=20`，q这导致触发两次`set`事件。
- 但是由于`store._batching=true`，所以两次`set`事件会被拦截收集到`store._batchOperates`中。
- 执行`state`的更新操作后，再将`store.batching`设置为`false`。
- 重点来了：此时做了两个操作：
    - 将`store._batchOperates`中的所有`set`事件设置`reply=true`，**代表这是一批量更新操作后的事件回放**。这样可以保证正常订阅者可以收到`set`事件，而批量更新优化时，可以通过判定`reply=true`来忽略此事件。
    ```ts {5,11}
    {
        "type":"set",
        "path":["name"],
        "value":"Wang",
        "reply":true
    }
    {
        "type":"set",
        "path":["age"],
        "value":20,
        "reply":true
    }
    ```
    - 然后将`store._batchOperates`中的所有`set`事件合并一个`batch`类型的事件,如下

    ```ts
    {
        "type":"batch",
        "path":["__batch_update__"],
        "value":[
            {
                "type":"set",
                "path":["name"],
                "value":"Wang",
                "reply":true
            },
            {
                "type":"set",
                "path":["age"],
                "value":20,
                "reply":true
            }
        ]
    }
    ```

3. 按照以上原理，当执行批量更新操作时：

```ts
store.batchUpdate(state=>{
    store.state.name='Wang'
    store.state.age=20
})
```

就会触发三个事件，如下:

```ts
    // 回放事件
    {
        "type":"set",
        "path":["name"],
        "value":"Wang",
        "reply":true
    }
    // 回放事件
    {
        "type":"set",
        "path":["age"],
        "value":20,
        "reply":true
    }
    // 合并批量事件
    {
        "type":"batch",
        "path":["__batch_update__"],
        "value":[
            {
                "type":"set",
                "path":["name"],
                "value":"Wang",
                "reply":true
            },
            {
                "type":"set",
                "path":["age"],
                "value":20,
                "reply":true
            }
        ]
    }
``` 

优化渲染时就只需要:`忽略批量更新后的回放事件`和`响应批量更新后的合并后的batch事件`，如下：

```tsx
    store.watch((operate)=>{
        if(operate.reply) return  // 是批量更新后的回放事件，忽略
        if(operate.type==='batch'){ 
            // 此时触发一次渲染
        }
    })
```