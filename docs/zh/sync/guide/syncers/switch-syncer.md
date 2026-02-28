# AutoStoreSwitchSyncer

`AutoStoreSwitchSyncer` 是一个交换同步器，用于在 SharedWorker 中管理多个独立的 AutoStore，实现 N-N 的状态同步。

## 架构说明

```
SharedWorker 端（使用 AutoStoreSwitchSyncer）
┌─────────────────────────────────────────────────────────────┐
│  AutoStoreSwitchSyncer                                      │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ Store1 (id: 'store1')                               │    │
│  │   - watch 监听变化 → 广播到订阅了 'store1' 的 transports  │    │
│  └─────────────────────────────────────────────────────┘    │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ Store2 (id: 'store2')                               │    │
│  │   - watch 监听变化 → 广播到订阅了 'store2' 的 transports  │    │
│  └─────────────────────────────────────────────────────┘    │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ Store3 (id: 'store3')                               │    │
│  │   - watch 监听变化 → 广播到订阅了 'store3' 的 transports  │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
│  Transport 映射:                                           │
│  Transport1 → 订阅 ['store1', 'store2', 'store3']           │
│  Transport2 → 订阅 ['store1', 'store2']                   │
│  Transport3 → 订阅 ['store1']                             │
└─────────────────────────────────────────────────────────────┘
                              ↕ (消息路由)
     浏览器页签端（使用 AutoStoreWorkerSyncer）
┌─────────────────────────────────────────────────────────────┐
│  页签1                                                      │
│  ├→ syncer1: peers=['store1'] ──→ SharedWorker的Store1     │
│  ├→ syncer2: peers=['store2'] ──→ SharedWorker的Store2     │
│  └→ syncer3: peers=['store3'] ──→ SharedWorker的Store3     │
└─────────────────────────────────────────────────────────────┘
```

## SharedWorker 服务端代码

```typescript
import { AutoStore } from 'autostore'
import { AutoStoreSwitchSyncer, WorkerTransport } from '@autostorejs/syncer'

// 创建多个独立的 store
const store1 = new AutoStore({
  user: { name: 'Alice', age: 30 }
}, { id: 'store1' })

const store2 = new AutoStore({
  products: [] as Array<{id: string, name: string}>
}, { id: 'store2' })

const store3 = new AutoStore({
  cart: [] as Array<{productId: string, quantity: number}>
}, { id: 'store3' })

// 创建 SwitchSyncer
const switchSyncer = new AutoStoreSwitchSyncer(
  [store1, store2, store3],
  { autostart: true }
)

// 动态添加新的 store
const store4 = new AutoStore({
  orders: []
}, { id: 'store4' })
switchSyncer.add(store4)

// 监听来自页签的连接
self.addEventListener('connect', (event) => {
  const port = event.ports[0]
  port.start()

  const transport = new WorkerTransport({
    worker: port,
    autoConnect: true,
  })

  // 添加传输器，switch 会自动路由消息到对应的 store
  switchSyncer.addTransport(transport)
})

// 可以直接操作任一 store，变化会自动广播到订阅了该 store 的客户端
store1.user.name = 'Bob'  // 会同步到所有订阅了 store1 的客户端
```

## 客户端代码

```typescript
import { AutoStore } from 'autostore'
import { AutoStoreWorkerSyncer } from '@autostorejs/syncer'

const worker = new SharedWorker('./worker.js', {
  type: 'module',
  name: 'my-worker'
})

// 创建本地 store
const storeA = new AutoStore({
  user: { name: 'Bob' }
}, { id: 'local-store-a' })

const storeB = new AutoStore({
  products: []
}, { id: 'local-store-b' })

// 创建 syncer1，与 SharedWorker 中的 store1 同步
const syncer1 = new AutoStoreWorkerSyncer(storeA, worker, {
  mode: 'both',
  peers: ['store1'],  // 指定要与 SharedWorker 中的 store1 同步
  immediate: true
})

// 创建 syncer2，与 SharedWorker 中的 store2 同步
const syncer2 = new AutoStoreWorkerSyncer(storeB, worker, {
  mode: 'both',
  peers: ['store2'],  // 指定要与 SharedWorker 中的 store2 同步
  immediate: true
})

// 修改本地 store，会同步到 SharedWorker 中对应的 store
storeA.user.name = 'Charlie'  // 同步到 SharedWorker 的 store1
```

## 配置选项

### AutoStoreSwitchSyncerOptions

```typescript
interface AutoStoreSwitchSyncerOptions {
  /**
   * 是否自动启动所有 store 的 watch
   * @default true
   */
  autostart?: boolean

  /**
   * 调试模式
   */
  debug?: boolean
}
```

## API

### 属性

- `stores: Map<string, AutoStore>` - 管理的 store 集合
- `syncing: boolean` - 是否正在同步

### 方法

- `add(store)` - 添加新的 store
- `remove(storeId)` - 移除 store
- `addTransport(transport)` - 添加传输器
- `removeTransport(transportId)` - 移除传输器
- `getStore(storeId)` - 获取指定 store
- `getStoreIds()` - 获取所有 store 的 id 列表
- `start()` - 启动同步器
- `stop()` - 停止同步器
- `destroy()` - 销毁管理器，清理所有资源

## 使用场景

### 多租户应用

每个租户有独立的状态树：

```typescript
// SharedWorker
const tenant1Store = new AutoStore({ ... }, { id: 'tenant1' })
const tenant2Store = new AutoStore({ ... }, { id: 'tenant2' })
const switchSyncer = new AutoStoreSwitchSyncer([tenant1Store, tenant2Store])

// 客户端
const syncer = new AutoStoreWorkerSyncer(localStore, worker, {
  peers: ['tenant1']  // 只同步租户1的数据
})
```

### 多标签页协同工作

每个标签页可以同步不同的状态：

```typescript
// 标签页1：同步用户信息和购物车
const syncer1 = new AutoStoreWorkerSyncer(userStore, worker, { peers: ['user-store'] })
const syncer2 = new AutoStoreWorkerSyncer(cartStore, worker, { peers: ['cart-store'] })

// 标签页2：只同步产品列表
const syncer3 = new AutoStoreWorkerSyncer(productStore, worker, { peers: ['product-store'] })
```

### 复杂应用的状态分区

不同功能模块使用不同的 store：

```typescript
// SharedWorker
const userStore = new AutoStore({ ... }, { id: 'user' })
const productStore = new AutoStore({ ... }, { id: 'product' })
const orderStore = new AutoStore({ ... }, { id: 'order' })
const switchSyncer = new AutoStoreSwitchSyncer([userStore, productStore, orderStore])

// 客户端可以按需订阅
```

## 核心机制

### 消息路由

SwitchSyncer 根据 `operate.id` 将消息路由到对应的 store：

1. 客户端发送消息时，`operate.id` 是目标 store 的 id
2. SwitchSyncer 接收到消息后，根据 id 找到对应的 store
3. 将操作应用到目标 store
4. Store 的 watch 触发，广播到其他订阅了该 store 的客户端

### 防止循环更新

使用 flags 机制标记操作来源（flags = transport.id），防止循环更新：

- 客户端操作发送到 SharedWorker，设置 flags = transport.id
- 操作应用到 store 后，watch 触发广播
- 广播时排除源 transport，避免循环

## 与 AutoStoreBroadcastSyncer 的区别

| 特性 | AutoStoreBroadcastSyncer | AutoStoreSwitchSyncer |
|------|--------------------------|----------------------|
| Store 数量 | 单个主 Store | 多个独立 Store |
| 使用场景 | 简单的 1-N 同步 | 复杂的 N-N 同步 |
| 消息路由 | 直接应用到主 Store | 根据 operate.id 路由 |
| 灵活性 | 较低 | 较高 |
| 复杂度 | 简单 | 复杂 |

## 完整示例

参考 [packages/syncer/examples/worker-react/src/examples/multi-store](https://github.com/zhangfisher/autostore/tree/main/packages/syncer/examples/worker-react/src/examples/multi-store) 中的完整示例。
