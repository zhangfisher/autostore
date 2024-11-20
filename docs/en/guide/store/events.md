 
# event
use `createStore` or `useStore` created `AutoStore` after the object instance, the instance provides two events triggers:

- **Example event trigger** the
- **Status event trigger** 

## Store event

 `AutoStore` the object instance itself is an event trigger, which provides some events to monitor the life cycle, state changes, and calculation attributes that monitor the instance.

```ts
class AutoStore<State extends Dict> extends EventEmitter<StoreEvents>{

}
export type StoreEvents = {
    // 响应对象创建后
    'load'              : AutoStore<any>;                               
    // 响应对象销毁后
    'unload'            : AutoStore<any>                                
    // 当计算对象创建时
    'computed:created'  : ComputedObject                                
    // 当计算函数执行成功时
    'computed:done'     : {id:string,path:string[],value:any,computedObject:ComputedObject}          
    // 当计算函数执行出错时
    'computed:error'    : {id:string,path:string[],error:any,computedObject:ComputedObject}           
    // 当计算函数被取消时
    'computed:cancel'   : {id:string,path:string[],reason:'timeout' | 'abort' | 'reentry' | 'error',computedObject:ComputedObject}       
    // 当watch对象创建时
    'watch:created'     : WatchObject
    // 当watch对象执行成功时
    'watch:done'        : {value:any,watchObject:WatchObject}
    // 当watch对象执行出错时
    'watch:error'       : {error:any,watchObject:WatchObject}
}; 

```

### method

 `AutoStore` it provides some ways to monitor and trigger events:

|method|illustrate|
|: ---:|  --- |
|`on`|Listening incident|
|`onAny`|Subscribe to all events|
|`once`|Only monitor once|
|`off`|Subscribe to cancel the monitoring event|
|`offAll`|Cancel all subscriptions|
|`emit`|Trigger event|
|`wait`|Waiting event trigger|

#### on

Subscribe to the event, return one `EventListener` used to cancel subscriptions.

```ts
export type EventListener = { off:()=>void }
on<T extends keyof Events>(
    type: T, 
    handler: EventHandler<T,Events[T]>,
    prepend ?:boolean
):EventListener
on<P=any>(
    type: '**', 
    handler: EventHandler<keyof Events,P>,
    prepend ?:boolean
):EventListener
```

- `type`: Event type, it can be a specific event name, or it can be `**`, Express all incidents.
- `handler`: Event processing function.
- `prepend`: Whether to insert the head of the event subscription queue, the subscription queue is a array,`prepend` for `true` I will insert it on the head,`false` insert at the tail. This can make the execution order of the event processing function change.

#### onany
Subscribe to all events and return one `EventListener` used to cancel subscriptions.

```ts
onAny(handler:EventHandler<string,any>):EventHandler
```

- `onAny(handler)` equivalent `on('**',handler)` 

#### once

Subscribe only once, and the subscription will be automatically canceled after the incident is triggered.

```ts
once<T extends  keyof Events>(
    type: T, 
    handler: EventHandler<T,Events[T]>
) :EventListener
```

#### OFF

Cancel the subscription event.

```ts
off<T extends  keyof Events>(
    type: T, 
    handler?: EventHandler<T,Events[T]> | undefined
)
```

#### Office

Cancel all subscriptions.

```ts
offAll()
```

#### emit

Trigger an event.

```ts
emit<T extends keyof Events>(type:T,payload:Events[T])
```

#### wait

Waiting for the event to trigger.

```ts
wait<T extends  keyof Events >(
    filter:(type:T,payload:Events[T])=>boolean | undefined | void,
    timeout?:number
):Promise<Events[T]>
wait<T extends  keyof Events>(
    type:T,
    timeout?:number
):Promise<Events[T]>
```

- `filter`: Filter, should be returned `true` time to trigger, should return `undefined` time to trigger, should return `void` do not trigger.
- `timeout`: Timeout time, unit in milliseconds.

```ts
// 等待load事件触发
await store.wait('load')
// 等待computed:done事件触发
await store.wait('computed:done',2000)

```

### event

 `AutoStore` provided the following events:

#### load

when `AutoStore` the object instance is triggered after creation.

```ts
store.on('load',(store:AutoStore)=>{
    console.log('store loaded:',store)
})
```

#### unloaded

Deepen `store.destory()` destroy `AutoStore` triggered after the object instance.

```ts
store.on('unload',(store:AutoStore)=>{
    console.log('store loaded:',store)
})
```
#### Computed: Created

Triggered when the calculation attribute object is created.

```ts
store.on('computed:created',(computedObject:ComputedObject)=>{
    console.log('computedObject created:',computedObject)
})
```
#### computed: done

When the calculation function is executed successfully, it is triggered.

```ts
store.on('computed:done',({id,path,value,computedObject}:any)=>{
    console.log('computedObject done:',id,path,value,computedObject)
})
```

#### computed: error

Triggered when the calculation function executes errors.

```ts
store.on('computed:error',({id,path,error,computedObject}:any)=>{
    console.log('computedObject error:',id,path,error,computedObject)
})
```

#### Computed: Cancel

When the asynchronous computing function is canceled.

```ts
store.on('computed:cancel',({id,path,reason,computedObject}:any)=>{
    console.log('computedObject cancel:',id,path,reason,computedObject)
})
```
- `reason` it is the reason for calculating the cancellation, the value:`timeout`|`abort`|`reentry`|`error` 

#### Watch: Created

when `watch` triggered when the object was created.

```ts
store.on('watch:created',(watchObject:WatchObject)=>{
    console.log('watchObject created:',watchObject)
})
```

#### Watch: Done

when `watch` the function is triggered when the function executes.

```ts
store.on('watch:done',({value,watchObject}:any)=>{
    console.log('watchObject done:',value,watchObject)
})
```

#### Watch: error

when `watch` the function is triggered when an error is performed.

```ts
store.on('watch:error',({error,watchObject}:any)=>{
    console.log('watchObject error:',error,watchObject)
})
```

## State change event

 `AutoStore` object instance provides a state change event trigger `operates`, Reading and writing changes to monitor the state.

 **When the read and write state, the corresponding event will be triggered,`store.operates`It is an ordinary event trigger object that can pass`operates`of`on/once/onAny/wait`Method subscription event. so`AutoStore`All dependent collection and event response are based`store.operates`Realized.** 


### Trigger status read and write event

When read and write operations on the status, it will be in `operates` trigger name is `<State path>` event.

```ts
const store = createStore({
  user:{
    name:'tom',
    age:18
  }
})

```

 **For example:** 

- **Read operation:**  `console.log(store.state.user.name)` the

Trigger name is `user.name` event. Equivalent to `store.operates.emit('user.name',<operate>)`.

- **Writing operation:**  `store.state.user.name='jack'` the

Trigger name is `user.name` event. Equivalent to `store.operates.emit('user.name',<operate>)`.

### Event operation parameters

 `operates` the parameters of the trigger event are one `StateOperate` object, read and write operations used to describe status.

```ts
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

type BatchChangeEvent= '__batch_update__'
type StateChangeEvents = Record<string,StateOperate>

type StateOperateType = 'get' | 'set' | 'delete'      // 用于对象
                            | 'insert' | 'update' | 'remove'  // 用于数组  
                            | 'batch'      // 批量操作
```

 **`StateOperate`The object contains the following attributes:** 

|Attribute|type|illustrate|
|: ---:|: ---:| --- |
|`type`|`StateOperateType`|Operation type, value `get`,`set`,`delete`,`insert`,`update`,`remove`,`batch` essence|
|`path`|`string[]`|Status path.|
|`value`|`Value`|Status value.|
|`indexs`|`number[]`|Index during array operation.|
|`oldValue`|`Value`|Old value.|
|`parentPath`|`string[]`|Father's path.|
|`parent`|`Parent`|Father.|
|`reply`|`boolean`|Whether to play back.|

- `type`: Operation type,`get` indicates reading operation,`set` indicates writing operation,`delete` explain the deletion operation,`insert` indicates insert operation,`update` express the update operation,`remove` explain the deletion operation,`batch` represents batch operations.
- `insert`,`update`,`remove` it is used to represent the insertion, update, and deletion of the array. Provide during operation `indexs` the attribute is used to represent the index of operation.
- `get`,`set`,`delete` it is used to represent the reading, writing, and deleting operation of the object.
- `batch` used to represent batch operations.
- `get` represents all reading operations


### Monitoring state operation

To monitor the status read and write operation, you can pass `operates` of `on/once/onAny/wait` method subscription event.

```ts
const store = createStore({
  user:{
    name:'tom',
    age:18
  }
})
```

- **Surveillance User.Name operation** 

 `store.operates.on('user.name',(operate:StateOperate)=>{...})` 

- **Surveying all operations** 

 `store.operates.onAny((operate:StateOperate)=>{...})` 

- **Use a compatriots** 

support `*` passing the match, you can listen to everything `user` operation.

 `store.operates.on('user.*',(operate:StateOperate)=>{...})` 


:::warning reminder
 `AutoStore` all dependent collection and event response are based `store.operates` realize, so `store.operates` it is a very important event trigger object.
:::
