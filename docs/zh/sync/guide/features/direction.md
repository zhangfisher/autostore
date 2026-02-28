# 同步方向

同步方向控制数据在两个 Store 之间的流动方向，支持单向和双向同步。

## 方向类型

### both - 双向同步（默认）

两个 Store 之间的数据会互相同步：

```typescript
const syncer = store1.sync(store2, {
  direction: 'both'  // 或不指定，使用默认值
})

// store1 的变化会同步到 store2
store1.count = 100
console.log(store2.count) // 100

// store2 的变化也会同步到 store1
store2.user.name = 'Bob'
console.log(store1.user.name) // 'Bob'
```

### forward - 仅前向同步

数据只从本地 Store 同步到远程 Store：

```typescript
const syncer = store1.sync(store2, {
  direction: 'forward'
})

// store1 的变化会同步到 store2
store1.count = 100
console.log(store2.count) // 100

// store2 的变化不会同步到 store1
store2.user.name = 'Bob'
console.log(store1.user.name) // undefined（保持原值）
```

### backward - 仅后向同步

数据只从远程 Store 同步到本地 Store：

```typescript
const syncer = store1.sync(store2, {
  direction: 'backward'
})

// store1 的变化不会同步到 store2
store1.count = 100
console.log(store2.count) // 0（保持原值）

// store2 的变化会同步到 store1
store2.user.name = 'Bob'
console.log(store1.user.name) // 'Bob'
```

## 与 mode 的区别

`direction` 和 `mode` 是两个不同的概念：

- `mode`：控制初始同步时的行为（push/pull/both/none）
- `direction`：控制后续同步的方向（both/forward/backward）

```typescript
const syncer = store1.sync(store2, {
  mode: 'push',        // 启动时推送本地状态到远程
  direction: 'backward' // 但后续只接收远程的更新
})

// 启动时：store1 的数据会推送到 store2
// 运行时：只有 store2 的变化会同步到 store1
```

## 使用场景

### 只读客户端

客户端只接收服务端的更新，不上报本地变化：

```typescript
const syncer = clientStore.sync(serverStore, {
  mode: 'pull',        // 启动时拉取服务端状态
  direction: 'backward' // 后续只接收服务端更新
})
```

### 只发送客户端

客户端只发送数据到服务端，不接收服务端的更新：

```typescript
const syncer = clientStore.sync(serverStore, {
  mode: 'push',        // 启动时推送到服务端
  direction: 'forward' // 后续只发送本地更新
})
```

### 数据收集器

从多个客户端收集数据到一个中心服务器：

```typescript
// 客户端
const syncer = clientStore.sync(serverStore, {
  direction: 'forward'  // 只发送，不接收
})

// 服务端接收所有客户端的数据
```

### 状态镜像

创建一个远程状态的本地镜像：

```typescript
const syncer = localMirror.sync(remoteSource, {
  mode: 'pull',
  direction: 'backward',  // 只接收远程更新
  immediate: true
})
```

## 动态改变方向

可以在运行时动态改变同步方向：

```typescript
const syncer = store1.sync(store2, {
  direction: 'both'
})

// 暂停前向同步，只接收更新
syncer.options.direction = 'backward'

// 恢复双向同步
syncer.options.direction = 'both'
```

## 注意事项

1. **单向同步**：使用单向同步时，另一端的变化不会被同步
2. **数据一致性**：单向同步可能导致两个 Store 的数据不一致
3. **冲突处理**：双向同步时需要注意处理可能的冲突

## 完整示例

```typescript
import { AutoStore } from 'autostore'
import { AutoStoreWorkerSyncer } from '@autostorejs/syncer'

// 客户端：只接收服务端更新
const worker = new SharedWorker('./worker.js')
const store = new AutoStore({ count: 0 })

const syncer = new AutoStoreWorkerSyncer(store, worker, {
  mode: 'pull',
  direction: 'backward',  // 只接收服务端更新
  immediate: true
})

// 客户端的变化不会同步到服务端
store.count = 100  // 只是本地变化，不会同步
```
