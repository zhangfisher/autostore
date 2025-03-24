# Batch Update

Generally, when updating multiple states, multiple `set` events will be triggered. In `React` scenarios, for rendering optimization, we might want to update multiple states at once, triggering only one render.

`AutoStore` has a built-in `batch update mechanism`. Below we'll introduce its working mechanism and how to use it.

## Working Mechanism

```ts
const sore = new AutoStore({
    name:"Fisher"
    age:18
})
```

1. First, when executing `store.state.name='Wang'` and `store.state.age=20`, two `set` events will be triggered.

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

2. Normally, `set` events will trigger `React` component re-rendering, but if we want to update multiple states at once and trigger only one render, we can use the `batchUpdate` method.

```tsx
store.batchUpdate(state=>{
    store.state.name='Wang'
    store.state.age=20
})
```

- The `batchUpdate` method sets `store._batching` to `true`, then executes `store.state.name='Wang'` and `store.state.age=20`, which triggers two `set` events.
- However, since `store._batching=true`, these two `set` events will be intercepted and collected in `store._batchOperates`.
- After executing the state updates, `store.batching` is set back to `false`.
- Here comes the key part: two operations are performed:
    - All `set` events in `store._batchOperates` are marked with `reply=true`, **indicating these are replay events after a batch update operation**. This ensures normal subscribers receive `set` events, while during batch update optimization, these events can be ignored by checking `reply=true`.
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
    - Then all `set` events in `store._batchOperates` are merged into one `batch` type event, as follows:

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

3. Following the above principle, when executing a batch update operation:

```ts
store.batchUpdate(state=>{
    store.state.name='Wang'
    store.state.age=20
})
```

Three events will be triggered, as follows:

```ts
    // Replay event
    {
        "type":"set",
        "path":["name"],
        "value":"Wang",
        "reply":true
    }
    // Replay event
    {
        "type":"set",
        "path":["age"],
        "value":20,
        "reply":true
    }
    // Merged batch event
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

For rendering optimization, you just need to: `ignore replay events after batch update` and `respond to the merged batch event after batch update`, as follows:

```tsx
    store.watch((operate)=>{
        if(operate.reply) return  // This is a replay event after batch update, ignore it
        if(operate.type==='batch'){ 
            // Trigger one render here
        }
    })
```