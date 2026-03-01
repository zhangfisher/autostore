# WorkerTransport

`WorkerTransport` 是基于 Web Worker API 的传输器，用于主线程与 Worker 线程之间进行跨线程通信。

## 基本用法

### 主线程代码（自动监听模式 - 推荐）

```typescript
import { AutoStore } from 'autostore'
import { AutoStoreSyncer, WorkerTransport } from '@autostorejs/syncer'

// 创建 Worker
const worker = new Worker('./worker.js', { type: 'module' })

// 创建 transport
const transport = new WorkerTransport({
  worker: worker,
  id: 'main-thread'
})

// 连接 transport，会自动监听 worker 的 message 事件
await transport.connect()

// 创建 store 并同步
const store = new AutoStore({
  count: 0,
  user: { name: 'Alice' }
})

const syncer = new AutoStoreSyncer(store, { transport })

// 断开连接时
syncer.stop()
transport.disconnect()
```

### 主线程代码（手动监听模式）

```typescript
import { AutoStore } from 'autostore'
import { AutoStoreSyncer, WorkerTransport } from '@autostorejs/syncer'

const worker = new Worker('./worker.js', { type: 'module' })

const transport = new WorkerTransport({
  worker: worker,
  id: 'main-thread'
})

// 手动监听消息，可以和其他消息类型共存
worker.addEventListener('message', (event: MessageEvent) => {
  if (transport.receiveRemoteOperate(event)) {
    return  // 是状态操作消息，已被处理
  }
  // 处理其他类型的消息
  console.log('收到其他消息:', event.data)
})

const store = new AutoStore({
  count: 0,
  user: { name: 'Alice' }
})

const syncer = new AutoStoreSyncer(store, { transport })
```

### Worker 线程代码 (worker.js)

```typescript
import { AutoStore } from 'autostore'
import { AutoStoreSyncer, WorkerTransport } from '@autostorejs/syncer'

// 创建 transport（self 就是 Worker 全局对象）
const transport = new WorkerTransport({
  worker: self as any,
  id: 'worker-thread'
})

// 连接并自动监听
await transport.connect()

// 创建 store 并同步
const store = new AutoStore({
  count: 0,
  user: { name: 'Bob' }
})

const syncer = new AutoStoreSyncer(store, { transport })
```

## 配置选项

```typescript
interface WorkerTransportOptions {
  /**
   * 传输器唯一标识
   */
  id?: string

  /**
   * Worker 实例
   * 如果提供，transport 会使用该 worker 发送消息
   * 调用 connect() 后会自动监听 worker 的 message 事件
   */
  worker?: IWorker

  /**
   * 是否自动建立连接
   * 默认：false（保持向后兼容）
   */
  autoConnect?: boolean

  /**
   * 启用调试模式
   */
  debug?: boolean
}
```

## 与 SharedWorker 配合使用

### 主线程代码

```typescript
import { AutoStore } from 'autostore'
import { AutoStoreSyncer, WorkerTransport } from '@autostorejs/syncer'

const worker = new SharedWorker('./worker.js', {
  type: 'module',
  name: 'my-worker'
})

const transport = new WorkerTransport({
  worker: worker.port,  // 使用 port
  id: 'main-thread'
})

await transport.connect()

const store = new AutoStore({
  count: 0,
  messages: []
})

const syncer = new AutoStoreSyncer(store, {
  transport,
  mode: 'pull',
  direction: 'backward'
})
```

### SharedWorker 代码 (worker.js)

```typescript
import { AutoStore } from 'autostore'
import { AutoStoreSyncer, WorkerTransport } from '@autostorejs/syncer'

self.addEventListener('connect', (event) => {
  const port = event.ports[0]
  port.start()

  const transport = new WorkerTransport({
    worker: port,
    id: 'worker-thread'
  })

  transport.connect()

  const store = new AutoStore({
    count: 0,
    messages: []
  })

  const syncer = new AutoStoreSyncer(store, {
    transport,
    mode: 'push'
  })
})
```

## 使用 AutoStoreWorkerSyncer 简化代码

`AutoStoreWorkerSyncer` 自动处理 WorkerTransport 的创建和配置：

```typescript
import { AutoStore } from 'autostore'
import { AutoStoreWorkerSyncer } from '@autostorejs/syncer'

const worker = new Worker('./worker.js', { type: 'module' })

const store = new AutoStore({
  count: 0,
  user: { name: 'Alice' }
})

// 自动创建 WorkerTransport 并连接
const syncer = new AutoStoreWorkerSyncer(store, worker, {
  mode: 'both',
  immediate: true
})
```

## 使用场景

- **主线程与 Worker 通信**：将计算密集型任务放到 Worker
- **SharedWorker 状态共享**：多个标签页共享状态
- **与 BroadcastSyncer 配合**：在 SharedWorker 中管理多个客户端
- **与 SwitchSyncer 配合**：在 SharedWorker 中管理多个独立 store

## 注意事项

1. **Worker 脚本路径**：确保 Worker 脚本路径正确
2. **同源限制**：Worker 脚本必须与主页面同源
3. **序列化**：传输的数据必须可序列化（使用结构化克隆算法）
4. **SharedWorker.port.start()**：使用 SharedWorker 时需要手动调用 port.start()，或使用 AutoStoreWorkerSyncer 自动处理

## 事件

- `connect` - 连接建立时触发
- `disconnect` - 连接断开时触发
- `operate` - 接收到操作时触发（需要开启 debug）
- `error` - 发生错误时触发
- `timeout` - 心跳超时时触发

## API

- `connect()` - 建立连接
- `disconnect()` - 断开连接
- `send(operate)` - 发送操作
- `addReceiver(id, callback)` - 添加接收器
- `removeReceiver(id)` - 移除接收器
- `receiveRemoteOperate(event)` - 处理远程操作事件（手动监听模式）
