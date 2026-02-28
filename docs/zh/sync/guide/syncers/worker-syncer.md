# AutoStoreWorkerSyncer

`AutoStoreWorkerSyncer` 是专门用于与 WebWorker 或 SharedWorker 通信的同步器，简化了 WorkerTransport + AutoStoreSyncer 的使用。

## 基本用法

### 与普通 Worker 同步

**主线程代码：**

```typescript
import { AutoStore } from 'autostore'
import { AutoStoreWorkerSyncer } from '@autostorejs/syncer'

const worker = new Worker('./worker.js', { type: 'module' })

const store = new AutoStore({
  count: 0,
  user: { name: 'Alice' }
})

const syncer = new AutoStoreWorkerSyncer(store, worker, {
  mode: 'pull',
  immediate: true,
  direction: 'both'
})
```

**Worker 代码 (worker.js)：**

```typescript
import { AutoStore } from 'autostore'
import { AutoStoreWorkerSyncer } from '@autostorejs/syncer'

const store = new AutoStore({
  count: 0,
  user: { name: 'Bob' }
})

// self 就是 Worker 全局对象
const syncer = new AutoStoreWorkerSyncer(store, self, {
  mode: 'push'
})
```

### 与 SharedWorker 同步

**主线程代码：**

```typescript
import { AutoStore } from 'autostore'
import { AutoStoreWorkerSyncer } from '@autostorejs/syncer'

const worker = new SharedWorker('./worker.js', {
  type: 'module',
  name: 'my-worker'
})

const store = new AutoStore({
  count: 0,
  messages: []
})

const syncer = new AutoStoreWorkerSyncer(store, worker, {
  mode: 'pull',
  immediate: true,
  direction: 'backward'  // 只接收服务端更新
})
```

**SharedWorker 代码 (worker.js)：**

```typescript
import { AutoStore } from 'autostore'
import { AutoStoreWorkerSyncer } from '@autostorejs/syncer'

const store = new AutoStore({
  count: 0,
  messages: []
})

const syncer = new AutoStoreWorkerSyncer(store, self, {
  mode: 'push'
})
```

## 配置选项

### AutoStoreWorkerSyncerOptions

```typescript
interface AutoStoreWorkerSyncerOptions {
  /**
   * 同步模式
   * - push: 推送到远程
   * - pull: 从远程拉取
   * - both: 双向同步
   */
  mode?: 'push' | 'pull' | 'both'

  /**
   * 是否立即同步
   */
  immediate?: boolean

  /**
   * 同步方向
   * - both: 双向同步
   * - forward: 仅发送
   * - backward: 仅接收
   */
  direction?: 'both' | 'forward' | 'backward'

  /**
   * 要与之同步的远程 store 的 id 列表
   * 当使用 AutoStoreSwitchSyncer 时，指定 peers 可以路由到正确的 store
   */
  peers?: string[]

  /**
   * 本地路径
   */
  local?: string[] | string

  /**
   * 远程路径
   */
  remote?: string[] | string

  /**
   * 过滤器
   */
  filter?: (path: string[], value: any) => boolean

  /**
   * 路径映射
   */
  pathMap?: {
    toLocal?: (path: string[], value: any) => string[] | undefined
    toRemote?: (path: string[], value: any) => string[] | undefined
  }
}
```

## 使用 peers 与 AutoStoreSwitchSyncer 配合

当 SharedWorker 中使用 `AutoStoreSwitchSyncer` 管理多个 store 时，需要使用 `peers` 选项指定要同步的 store：

```typescript
// SharedWorker 代码
import { AutoStore } from 'autostore'
import { AutoStoreSwitchSyncer, WorkerTransport } from '@autostorejs/syncer'

const userStore = new AutoStore({
  user: { name: 'Alice', age: 30 }
}, { id: 'user-store' })

const productStore = new AutoStore({
  products: []
}, { id: 'product-store' })

const switchSyncer = new AutoStoreSwitchSyncer([userStore, productStore])

self.addEventListener('connect', (event) => {
  const port = event.ports[0]
  port.start()

  const transport = new WorkerTransport({
    worker: port,
    autoConnect: true,
  })

  switchSyncer.addTransport(transport)
})
```

```typescript
// 客户端代码
import { AutoStore } from 'autostore'
import { AutoStoreWorkerSyncer } from '@autostorejs/syncer'

const worker = new SharedWorker('./worker.js', {
  type: 'module',
  name: 'my-worker'
})

// 只同步用户信息
const userStore = new AutoStore({
  user: { name: 'Bob' }
})

const userSyncer = new AutoStoreWorkerSyncer(userStore, worker, {
  peers: ['user-store'],  // 指定要与 SharedWorker 中的 user-store 同步
  mode: 'both',
  immediate: true
})

// 只同步产品列表
const productStore = new AutoStore({
  products: []
})

const productSyncer = new AutoStoreWorkerSyncer(productStore, worker, {
  peers: ['product-store'],  // 指定要与 SharedWorker 中的 product-store 同步
  mode: 'both',
  immediate: true
})
```

## API

### 属性

- `worker: IWorker | ISharedWorker` - Worker 实例
- `actualWorker: IWorker` - 实际用于通信的 worker（SharedWorker 时返回 port）

继承自 `AutoStoreSyncer` 的所有属性和方法。

### 特殊行为

#### 自动处理 SharedWorker.port

对于 SharedWorker，`AutoStoreWorkerSyncer` 会自动调用 `port.start()`：

```typescript
const worker = new SharedWorker('./worker.js')
const syncer = new AutoStoreWorkerSyncer(store, worker)
// 自动调用 worker.port.start()
```

#### 自动修改 operate.id

当指定 `peers` 选项时，`AutoStoreWorkerSyncer` 会自动将发送消息的 `operate.id` 设置为第一个 peer 的值，这样 `AutoStoreSwitchSyncer` 可以正确路由消息。

## 使用场景

- **主线程与 Worker 通信**：将计算密集型任务放到 Worker
- **SharedWorker 状态共享**：多个标签页共享状态
- **与 SwitchSyncer 配合**：在 SharedWorker 中管理多个独立 store

## 完整示例

参考 [packages/syncer/examples/worker-react](https://github.com/zhangfisher/autostore/tree/main/packages/syncer/examples/worker-react) 中的完整示例。
