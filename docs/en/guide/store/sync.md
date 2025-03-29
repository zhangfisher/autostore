# Synchronization

`AutoStore` has a built-in synchronization mechanism that enables easy data synchronization between two `AutoStore` instances.

## Usage

### Complete Synchronization

Synchronize the `state` of `store1` to the `state` of `store2`.

```ts {12}
const store1 = new AutoStore({
    order:{
        name:"fisher",
        price:2,
        count:3,
        total: computed((order)=>order.price*order.count)
    }            
})

const store2 = new AutoStore<typeof store1.state.order>()

store1.sync(store2)

```

:::warning Note
Synchronization is bidirectional.
:::

### Partial Synchronization

Synchronize `store1.state.order` to `store2.state.myorder`.

```ts {14}
const store1 = new AutoStore({
    order:{
        name:"fisher",
        price:2,
        count:3,
        total: computed((order)=>order.price*order.count)
    }            
})

const store2 = new AutoStore<typeof store1.state.order>({
    myorder:{
    }
})
store1.sync(store2,{from:'order',to:'myorder'})
```

## Guide

### Sync Configuration

The `sync` method can accept a configuration object with the following properties:

| Property | Type | Description |
| --- | --- | --- |
| `from` | `string` | Path in the current store's `state` |
| `to` | `string` | Path in the target store's `state` |
| `direction` | `'both' \| 'forward' \| 'backward'`  | Sync direction, `both`=bidirectional, `forward`=forward sync, `backward`=backward sync |
| `filter` | `(operate:StateOperate)=>boolean` | Filter function, returns `true` to sync, `false` to not sync |
| `immediate` | `boolean` | Whether to sync immediately, defaults to `true`, meaning sync is executed once during initialization |

### Sync Direction

By default, synchronization is bidirectional.

```ts {5,8,11}
const store1 = new AutoStore({...})
const store2 = new AutoStore({...})

// Default bidirectional sync
store1.sync(store2)

// Copy changes from store1 to store2
store1.sync(store2,{direction:'forward'})

// Copy changes from store2 to store1
store1.sync(store2,{direction:'backward'})

```

### Partial Sync

Sync parts of the state using `from` and `to` properties instead of complete synchronization.

```ts
const store1 = new AutoStore({...})
const store2 = new AutoStore({...})

// Complete sync
store1.sync(store2)

// Sync store1.state.order to store2.state
store1.sync(store2,{from:"order"})

// Sync store1.state.order to store2.state.myorder
store1.sync(store2,{from:"order",to:"myorder"})

// Sync store1.state to store2.state.myorder
store1.sync(store2,{to:"myorder"})

```

### Filter Sync

By default, all data under the `from` path will be synchronized. You can use a `filter` function for additional filtering.

```ts {13}
const store1 = new AutoStore({
    order:{
        a:1,
        b:2,
        c:3,
        d:4
    }            
})
const store2 = new AutoStore({...})

// Complete sync
store1.sync(store2,{
    filter:(operate)=>operate.path[0]==='order'
})
```

- `filter` can return `true` to sync or `false` to not sync.
- The `operate` object is of type `StateOperate`, containing update information with the following type:

```ts
export type StateOperate<Value=any,Parent=any> = {
    type       : StateOperateType,
    path       : string[],
    value      : Value,
    indexs?    : number[],                
    oldValue?  : Value,
    parentPath?: string[],
    parent?    : Parent,     
    reply?     : boolean      
    flags?     : number | symbol         
}
```

### Clone Sync

`AutoStore` provides a `Clone` method that can clone a store. The cloned store is independent of the original store, but their `state`s are synchronized.

```ts

// Complete clone, no sync
const store1 = new AutoStore({...})
const store2 = store1.clone({...<AutoStore Options>...})

// Complete clone, no sync
const store2 = store1.clone()
const store2 = store1.clone({sync:'none'})

// Complete clone with bidirectional sync
const store2 = store1.clone({sync:'both'})

// Complete clone with forward sync
const store2 = store1.clone({sync:'farward'})

// Complete clone with backward sync
const store2 = store1.clone({sync:'backward'})

// Clone store1.state.<path> with backward sync
const store2 = store1.clone({
    entry:"<path>",
    sync:'backward'
})

```

- By default, synchronization is not enabled after executing the `clone` method.

### Enable/Disable Sync

Synchronization can be enabled and disabled using the `on` and `off` methods.

```ts
const store1 = new AutoStore({...})
const store2 = new AutoStore({...})

const syncer = store1.sync(store2)

// Disable sync
syncer.off()

// Enable sync
syncer.on()

```

### Remote Sync

Remote synchronization allows synchronizing a local `AutoStore` with a remote `AutoStore`. For example, synchronizing a browser's `AutoStore` with a `WebWorker`'s `AutoStore`.

Remote synchronization requires installing `@autostore/syncer`.

#### Usage

Here's a simple example of using `@autostore/syncer` to implement synchronization between `worker` and `browser`.

- **Step 1: Develop a `Transport` to transmit update operations by implementing the `IAutoStoreSyncTransport` interface.**

```ts {3,8,11}
// transport.ts
export class WorkerTransport implements IAutoStoreSyncTransport{
    private _callback: (operate:StateRemoteOperate)=>void
    ready=true
    constructor(public worker) {
        this.worker.addEventListener('message', this.onReceive.bind(this))
    }
    send(operate:StateRemoteOperate) {
        this.worker.postMessage(operate) 
    }
    receive(callback: (operate:StateRemoteOperate) => void): void {
        this._callback = callback
    }
    onReceive(data: StateRemoteOperate) {
        this._callback(data)
    }
}
```

You need to implement the `IAutoStoreSyncTransport` interface, which is defined as:

```ts
export interface IAutoStoreSyncTransport {
    // If false, indicates currently unavailable, updates will be temporarily cached
    ready: boolean                  
    // Send update operation
    send(operate: StateRemoteOperate): void
    // Receive update operation
    receive(callback: (operate: StateRemoteOperate) => void): void
}
```

- **Step 2: Configure Local `AutoStore`**

The local `AutoStore` needs to be configured with `syncer` and specify the `transport`.

```ts {8-11}
// browser.ts
import {AutoStore} from '@autostore/core'
import { AutoStoreSyncer } from '@autostore/syncer'

const worker = new Worker('./worker.ts')
const browserStore = new AutoStore({...})

const syncer = new AutoStoreSyncer(browserStore,{
    transport: new WorkerTransport(worker),
    autostart: true
}) 
```

- **Step 3: Remote `AutoStore`**

```ts {8-11}
// worker.ts
import { AutoStore } from '@autostore/core'
import { AutoStoreSyncer } from '@autostore/syncer'
import { WorkerTransport } from './transport'

const workerStore = new AutoStore({...})

const syncer = new AutoStoreSyncer(workerStore,{
    transport: new WorkerTransport(self),
    autostart: true
})
```

#### Control Sync Operations

Start and stop synchronization.

```ts
const syncer = new AutoStoreSyncer(workerStore,{
    transport: new WorkerTransport(self),
    autostart: true
})

// Start sync
syncer.start()

// Stop sync
syncer.stop()

```

#### Sync Cache

By default, when `transport` is unavailable (i.e., `transport.ready=false`), update operations will be temporarily written to cache.

When `transport` becomes available, you should call `syncer.flush()` to send cached update operations to the remote `AutoStore`.

```ts {5}
const syncer = new AutoStoreSyncer(workerStore,{
    transport: new WorkerTransport(self)
})

syncer.flush()

```

- **Note** that the availability of `transport` is determined by the Transport itself. When the availability status changes, `syncer.flush()` should be called.
- When `transport` is unavailable, update operations will be temporarily cached. Cache size is controlled by `maxCacheSize`, defaulting to `100`.

#### Sync Mapping

Support controlling the synchronization mapping relationship between two `AutoStore`s through `entry` and `remoteEntry`.

```ts {3-4}
new AutoStoreSyncer(localStore,{
    transport:localTransport,
    entry:["order"],
    remoteEntry:["remoteOrder"]
})
```

This means mapping `order` in `localStore` to `remoteOrder` in `remoteStore`.

#### Sync Parameters

| Parameter | Type | Default | Description |
| :---: | :---: | :---: | --- |
| `autostart` | `boolean` | `true` | Whether to start sync automatically |
| `maxCacheSize` | `number` | `100` | Cache size |
| `entry` | `string[]` | `[]` | Sync mapping relationship |
| `remoteEntry` | `string[]` | `[]` | Sync mapping relationship |
| `immediate` | `boolean` | `false` | Whether to sync immediately |
| `onSend` | `(operate:StateRemoteOperate) => boolean` || Send update operation callback, return `false` to not send |
| `onReceive` | `(operate:StateRemoteOperate) => boolean` || Receive update operation callback, return `false` to not receive |

```ts
type StateRemoteOperate {
    type      : StateOperateType,
    path      : string[],
    value     : Value,
    indexs    : number[],               
    flags     : number 
} 
```

## Example

<demo react="store/syncStore.tsx"/>