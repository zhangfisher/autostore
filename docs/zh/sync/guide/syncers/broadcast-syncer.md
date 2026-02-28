# AutoStoreBroadcastSyncer

`AutoStoreBroadcastSyncer` 是一个广播同步器，用于在 SharedWorker 中管理一个主 Store 与多个客户端 Store 之间的 1-N 同步。

## 架构说明

```
┌─────────────────────────────────────────────────────────────┐
│                     SharedWorker                             │
│  ┌─────────────────────────────────────────────────────┐    │
│  │          AutoStoreBroadcastSyncer                    │    │
│  │  ┌──────────────────────────────────────────────┐   │    │
│  │  │  MainStore (count: 0, messages: [])          │   │    │
│  │  └──────────────────────────────────────────────┘   │    │
│  │                                                       │    │
│  │  • 广播状态变化到多个客户端                            │    │
│  │  • 处理客户端连接/断开                                 │    │
│  │  • 使用 flags 防止循环更新                            │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                          │
                          │ WorkerTransport
                          │
        ┌─────────────────┼─────────────────┐
        │                 │                 │
        ▼                 ▼                 ▼
   ┌─────────┐      ┌─────────┐      ┌─────────┐
   │ 页签 1  │      │ 页签 2  │      │ 页签 3  │
   │AutoStore│      │AutoStore│      │AutoStore│
   │  +      │      │  +      │      │  +      │
   │Syncer   │      │Syncer   │      │Syncer   │
   └─────────┘      └─────────┘      └─────────┘
```

## SharedWorker 服务端代码

```typescript
import { AutoStore } from 'autostore'
import { AutoStoreBroadcastSyncer, WorkerTransport } from '@autostorejs/syncer'

// 创建主 Store
const store = new AutoStore({
  count: 0,
  messages: [],
  messageCount: (scope) => scope.messages.length
})

// 创建广播同步器
const broadcaster = new AutoStoreBroadcastSyncer(store, {
  autostart: true,
  heartbeat: 3000  // 3秒心跳检测
})

// 监听客户端连接
self.addEventListener('connect', (event) => {
  const port = event.ports[0]
  port.start()

  // 创建传输器
  const transport = new WorkerTransport({
    worker: port,
    autoConnect: true
  })

  // 添加到广播器
  broadcaster.addTransport(transport)
})

// 可选：服务端主动推送更新
setInterval(() => {
  store.count++
}, 5000)  // 每5秒递增计数器
```

## 客户端代码

```typescript
import { AutoStore } from 'autostore'
import { AutoStoreWorkerSyncer } from '@autostorejs/syncer'

// 创建 SharedWorker
const worker = new SharedWorker('./worker.js', {
  type: 'module',
  name: 'my-worker'
})

// 创建本地 Store
const store = new AutoStore({
  count: 0,
  messages: []
})

// 创建 Worker 同步器
const syncer = new AutoStoreWorkerSyncer(store, worker, {
  mode: 'pull',
  immediate: true,
  direction: 'backward'  // 只接收服务端更新
})

// 监听服务端的更新
store.watch(() => {
  console.log('count:', store.count)
  console.log('messages:', store.messages)
})
```

## 配置选项

### AutoStoreBroadcasterOptions

```typescript
interface AutoStoreBroadcasterOptions {
  /**
   * 是否自动启动广播（默认：true）
   */
  autostart?: boolean

  /**
   * 心跳间隔（毫秒）
   * 默认：3000（3秒）
   */
  heartbeat?: number
}
```

## API

### 属性

- `store: AutoStore` - 主 Store
- `transports: Map<number, AutoStoreSyncTransportBase>` - 连接的客户端传输器
- `syncing: boolean` - 是否正在广播

### 方法

- `addTransport(transport)` - 添加客户端连接
- `removeTransport(id)` - 移除客户端连接
- `broadcast(operate)` - 广播操作到所有客户端
- `sendTo(clientId, operate)` - 发送操作到指定客户端
- `start()` - 启动广播
- `stop()` - 停止广播
- `destroy()` - 销毁广播器

### 事件

- `start` - 广播启动时触发
- `stop` - 广播停止时触发
- `error` - 发生错误时触发

## 核心机制

### flags 防止循环更新

广播器使用 `operate.flags` 字段（负数 transport.id）标记操作来源，在广播时排除源端，从而避免循环更新：

```
场景1：客户端触发更新（避免循环）

① Store1 变化 → 通过 Transport1 发送到 Transport11
② Transport11 更新 MainStore 时设置 operate.flags = -Transport11.id
③ MainStore 触发 StateOperate 事件（包含 flags = -Transport11.id）
④ 广播器识别 flags，排除 Transport11，将操作转发给其他客户端

✓ 结果：Store1 的变化同步到其他 Store，但不会回传给自己
```

```
场景2：MainStore 本地变化（广播到所有客户端）

① MainStore 直接修改（不经过任何 Transport）
② 触发的 StateOperate 中 operate.flags 不等于任何 -transport.id
③ 广播器将变化广播给所有 Transport

✓ 结果：MainStore 的本地变化同步到所有客户端 Store
```

## 使用场景

- **多标签页协同编辑**：在 SharedWorker 中管理共享状态
- **实时协作应用**：多个客户端同步同一份数据
- **服务端推送**：服务端主动推送更新到所有客户端
- **状态中心化**：将多个客户端的状态集中管理

## 注意事项

1. **浏览器兼容性**：SharedWorker 在某些浏览器（如 Firefox）中默认禁用
2. **CORS**：确保 SharedWorker 脚本与页面同源
3. **心跳检测**：客户端断开时会自动清理资源
4. **调试**：可以使用浏览器的开发者工具查看 SharedWorker 的控制台输出

## 完整示例

参考 [packages/syncer/examples/worker-react](https://github.com/zhangfisher/autostore/tree/main/packages/syncer/examples/worker-react) 中的完整示例。
