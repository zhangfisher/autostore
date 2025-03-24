# Global Watch

The `store.watch` method is used to globally monitor data changes in `State`. When the monitored data changes, a listener function can be executed.

## Watch Method

The signature of the `watch` method is as follows:

```ts
// Watch all
watch(listener:WatchListener,options?:WatchListenerOptions):Watcher
// Watch specified paths only
watch(paths:'*' | string | (string|string[])[],
    listener:WatchListener,options?:WatchListenerOptions
):Watcher
```

Returns `Watcher` type, used to cancel the watch.

```ts
type Watcher = { off:()=>void }
```

### Watch Listener

`WatchListener` is a function used to handle monitored data changes, with the following signature:

```ts
type WatchListener<Value=any,Parent=any> = 
        (operate:StateOperate<Value,Parent>)=>void

type StateOperate<Value=any,Parent=any> = {
    type       : StateOperateType,
    path       : string[],
    value      : Value,
    indexs?    : number[],                
    oldValue?  : Value,
    parentPath?: string[],
    parent?    : Parent,    
    reply?     : boolean               
} 
```

- When data changes are detected, `watch` will call the `WatchListener` function and pass a `StateOperate` object.
- The `StateOperate` object includes information such as the change type `type`, `path`, `value`, etc.

The properties of the `StateOperate` object are as follows:

| Property | Type | Description |
| :----------: | :------: | ------------------------------------------------------------ |
| `type` | `string` | State operation type, values: `get`,`set`,`delete`,`insert`,`update`,`remove`,`batch` |
| `path` | `string[]` | State path |
| `value` | `any` | Value |
| `indexs` | `number[]` | Array operation indices |
| `oldValue` | `any` | Old value |
| `parentPath` | `string[]` | Parent path |
| `parent` | `any` | Parent value |
| `reply` | `boolean` | Whether it's a replay during batch operations |

- `watch` can monitor state read and write operations, including `get`,`set`,`delete`,`insert`,`update`,`remove`,`batch` operations.
- `get`,`set`,`delete` are suitable for object value read/write
- `insert`,`update`,`remove` are suitable for array operations
- `batch` is suitable for batch operations, triggered when using `batchUpdate`, see [Batch Operations](../store/state)
- The `reply` parameter indicates whether the operation is an event replay during batch updates.

:::warning Note
The listener function must be synchronous
:::

### Watch Options

```ts  
type WatchListenerOptions = {
    once?    : boolean                                        
    operates?: '*' | 'read' | 'write' | StateOperateType[]     // Operation types to watch
    filter?  : (args:StateOperate)=>boolean                // Filter
}
```

| Property | Type | Description |
| :----------: | :------: | ------------------------------------------------------------ |
| `once` | `boolean` | Whether to watch only once |
| `operates` | `'*'\| 'read' \| 'write' \| StateOperateType[]` | Operation types to watch |
| `filter` | `(args:StateOperate)=>boolean` | Filter function, executes listener if returns `true` |

- The most important parameter of the watch function is `operates`, used to configure which operation types to watch. Can be `'*'`, `'read'`, `'write'`, or an array of operation types.
- Default `operates='write'`, watches all write operations.
- `operates='get'` watches all read operations.
- `operates='*'` watches all read/write/delete operations.
- `operates` can also be an array of operation types, like `['set','delete']`, watching `set` and `delete` operations.
- The `once` property configures whether to watch only once.
- The `filter` function filters watched operations, executes listener if returns `true`.

**Example:**

```tsx
store.watch((operate)=>{
    ....
},{
  operates:'write'
})
```

## Global Watching

Use `watch(listener,options?)` method to globally watch data changes in `State`. The listener function will execute for any state operation.

<demo react="watch/watchAll.tsx"/>

- Monitor all data changes through the `watch` method. When data changes, the listener function will execute.
- `watch.options` supports specifying which operation types to watch, like `watch(listener,{operates:['set','delete']})`.

## Local Watching

Besides global watching, you can also use `watch(paths,listener,options?)` method to **watch state data changes only at specified paths**.

<demo react="watch/watchByPath.tsx"/>
 
- You can watch multiple paths at once, like `watch(['order.price','order.count'],listener)`.
- You can even watch paths containing wildcards, like `watch('order.*'],listener)`.

## Array Watching

`watch` also supports array watching, like `watch('order.books',listener)`. When the `order.books` array changes, the listener function will execute.

The difference from normal watching is in the events #️⃣

- Array watch events have three types: `insert`, `update`, `remove`.
- Array member operation parameters have an additional `indexs` property to mark array indices.
- The `get` operation event also applies to arrays

<demo react="watch/watchArray.tsx"/>
 
## Dependency Collection

`AutoStore`'s dependency collection functionality is implemented based on the `watch` feature.

Here's the code for dependency collection during synchronous computed property initialization:

```ts
function collectDependencies(){
      let dependencies:string[][] = []       
      // 1. Watch all get operations
      const watcher = this.store.watch((event)=>{      
          // Save dependency paths
          dependencies.push(event.path)            
      },{operates:['get']})   
      // 2. Run the synchronous computed getter function once
      this.run({first:true})   
      // 3. End watching after dependency collection is complete
      watcher.off() 
      // .......
      return dependencies
}  
```

:::info
The `store.watch` method is used to globally monitor data changes in `State`, and computed properties are also implemented based on the `watch` method.
:::
