# 同步

`AutoStore`内置同步机制，可以方便的实现两个`AutoStore`之间的数据同步。

## 使用方法

### 完全同步

将`store1`的`state`同步到`store2`的`state`中。

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

:::warning 提示
同步是双向的。
:::

### 部分同步

将`store1.state.order`同步到`store2.state.myorder`中。

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

## 指南

### 同步配置

`sync`方法可以接受一个配置对象，配置对象可以有以下属性：

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| `from` | `string` | 当前`store`的`state`的路径 |
| `to` | `string` | 目标`store`的`state`的路径 |
| `direction` | `'both' \| 'forward' \| 'backward'`  | 同步方向,`both`=双向，`forward`=前向同步，`backward`=后向同步 |
| `filter` | `(operate:StateOperate)=>boolean` | 过滤函数，返回`true`表示同步，返回`false`表示不同步 |
| `immediate` | `boolean` | 是否立即同步,默认为`true`，即初始化时马上执行一次同步 |

### 同步方向

默认情况下，同步是双向的。

```ts {5,8,11}
const store1 = new AutoStore({...})
const store2 = new AutoStore({...})

// 默认双向同步
store1.sync(store2)

// 复制store1的变更到store2
store1.sync(store2,{direction:'forward'})

// 复制store2的变更到store1
store1.sync(store2,{direction:'backward'})

```

### 局部同步

通过`form`和`to`属性同步状态的局部，而不是全同步。

```ts
const store1 = new AutoStore({...})
const store2 = new AutoStore({...})

// 完全同步
store1.sync(store2)

// 将store1.state.order同步到store2.state
store1.sync(store2,{from:"order"})

// 将store1.state.order同步到store2.state.myorder
store1.sync(store2,{from:"order",to:"myorder"})

// 将store1.state同步到store2.state.myorder
store1.sync(store2,{to:"myorder"})

```



### 过滤同步

默认情况下，会对`from`路径下的所有数据进行同步，可以额外通过`filter`函数过滤。

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

// 完全同步，
store1.sync(store2,{
    filter:(operate)=>operate.path[0]==='order'
})
```

- `filter`可以返回`true`表示同步，返回`false`表示不同步。
- `operate`对象是`StateOperate`类型，包含了更新信息，类型如下：

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

### 克隆同步

`AutoStore`提供一个`Clone`方法，可以克隆一个`store`，克隆的`store`与原`store`是相互独立的，但是`state`是同步的。

```ts

// 完全克隆，但不同步
const store1 = new AutoStore({...})
const store2 = store1.clone({...<AutoStore Options>...})

// 完全克隆，但不同步
const store2 = store1.clone()
const store2 = store1.clone({sync:'none'})

// 完全克隆，但双向同步
const store2 = store1.clone({sync:'both'})

// 完全克隆，前向同步
const store2 = store1.clone({sync:'farward'})

// 完全克隆，前向同步
const store2 = store1.clone({sync:'backward'})

// 克隆store1.state.<path>，前向同步
const store2 = store1.clone({
    entry:"<path>",
    sync:'backward'
})


```

- 执行`clone`方法后，默认不会同步。

### 打开/关闭同步

同步可以通过`on`和`off`方法来打开和关闭同步。

```ts
const store1 = new AutoStore({...})
const store2 = new AutoStore({...})

const syncer = store1.sync(store2)

// 关闭同步
syncer.off()

// 打开同步
syncer.on()

```


### 远程同步

远程同步可以实现将本地的`AutoStore`与远程的`AutoStore`进行同步。比如将浏览器的`AutoStore`与`WebWorker`的`AutoStore`进行同步。

远程同步需要通过安装`@autostore/syncer`来实现。

#### 使用方法

以下是`@autostore/syncer`的简单使用示例,实现`worker`与`browser`之间的同步。

- **第1步：开发一个`Transport`用来进行传输更新操作，实现`IAutoStoreSyncTransport`接口。**

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

需要实现`IAutoStoreSyncTransport`接口，接口定义如下：

```ts
export interface IAutoStoreSyncTransport {
    // 如果为false，表示当前不可用，更新操作会被暂时写入缓存
    ready: boolean                  
    // 发送更新操作
    send(operate: StateRemoteOperate): void
    // 接收更新操作
    receive(callback: (operate: StateRemoteOperate) => void): void
}
```

- **第2步：配置本地`AutoStore`**

这里本地`AutoStore`需要配置`syncer`，并指定`transport`。

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

- **第3步：远程`AutoStore`**

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

#### 控制同步操作

开始和停止同步。

```ts
const syncer = new AutoStoreSyncer(workerStore,{
    transport: new WorkerTransport(self),
    autostart: true
})

// 开始同步
syncer.start()

// 停止同步
syncer.stop()

```

#### 同步缓存

默认情况下，当`transport`不可用时,即`transport.ready=false`，更新操作会被暂时写入缓存。

当`transport`可用时，应该调用`syncer.flush()`，将缓存中的更新操作发送到远程`AutoStore`。

```ts {5}
const syncer = new AutoStoreSyncer(workerStore,{
    transport: new WorkerTransport(self)
})

syncer.flush()

```

- **注意**，`transport`是否可用，是由`Transport`自己决定。当可用状态切换时，应当调用`syncer.flush()`。
- 当`transport`不可用时,更新操作会被暂时写入缓存，缓存大小由`maxCacheSize`控制，默认为`100`。

#### 同步映射

支持通过`entry`和`remoteEntry`来控制两个`AutoStore`之间的同步映射关系。    

```ts {3-4}
new AutoStoreSyncer(localStore,{
    transport:localTransport,
    entry:["order"],
    remoteEntry:["remoteOrder"]
})
```

以上代表要将`localStore`中的`order`映射到`remoteStore`中的`remoteOrder`。

#### 同步参数

| 参数 | 类型 | 默认值 |  说明 |
| :---: | :---:  | :---: | --- | 
| `autostart` | `boolean` | `true` | 是否自动开始同步 |
| `maxCacheSize` | `number` | `100` | 缓存大小 |
| `entry` | `string[]` | `[]` | 同步映射关系 |
| `remoteEntry` | `string[]` | `[]` | 同步映射关系 |
| `immediate` | `boolean` | `false` | 是否立即同步 |
| `onSend` | `(operate:StateRemoteOperate) => boolean` || 发送更新操作回调，返回`false`表示不发送 |
| `onReceive` | `(operate:StateRemoteOperate) => boolean`|| 接收更新操作回调，返回`false`表示接收  |


```ts
type StateRemoteOperate {
    type      : StateOperateType,
    path      : string[],
    value     : Value,
    indexs    : number[],               
    flags     : number 
} 
```


## 示例

<demo react="store/syncStore.tsx"/>