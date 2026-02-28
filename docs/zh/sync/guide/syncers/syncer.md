# AutoStoreSyncer

`AutoStoreSyncer` 是最基本的同步器，用于在两个 AutoStore 之间建立 1-1 的同步关系。

## 基本用法

```typescript
import { AutoStore } from 'autostore'
import { AutoStoreSyncer, LocalTransport } from '@autostorejs/syncer'

// 创建两个 store
const store1 = new AutoStore({ count: 0, user: { name: 'Alice' } })
const store2 = new AutoStore({ count: 0, user: { name: 'Bob' } })

// 创建传输器
let transport1: LocalTransport, transport2: LocalTransport
transport1 = new LocalTransport(() => transport2)
transport2 = new LocalTransport(() => transport1)

// 创建同步器
const syncer1 = new AutoStoreSyncer(store1, { transport: transport1 })
const syncer2 = new AutoStoreSyncer(store2, {
  transport: transport2,
  mode: 'pull'  // 从远程拉取
})

// 启动同步
transport1.connect()
transport2.connect()
```

## 使用 store.sync() 方法

更简单的方式是使用 `store.sync()` 方法，它会自动创建传输器和同步器：

```typescript
const store1 = new AutoStore({ count: 0 })
const store2 = new AutoStore({ count: 0 })

// 使用 sync 方法建立同步
const syncer = store1.sync(store2, {
  mode: 'both',  // 双向同步
  immediate: true  // 立即同步
})

// 修改任一 store，另一个会自动同步
store1.count = 100
console.log(store2.count) // 100
```

## 配置选项

### AutoStoreSyncerOptions

```typescript
interface AutoStoreSyncerOptions {
  /**
   * 同步模式
   * - push: 将本地状态推送到远程
   * - pull: 从远程拉取状态
   * - both: 双向同步（默认）
   * - none: 不执行初始同步
   */
  mode?: 'push' | 'pull' | 'both' | 'none'

  /**
   * 同步器 ID，默认使用 store.id
   */
  id?: string

  /**
   * 本地路径
   * 可以是字符串（如 'user'）或数组（如 ['user', 'profile']）
   */
  local?: string[] | string

  /**
   * 远程路径
   */
  remote?: string[] | string

  /**
   * 传输层对象
   */
  transport?: AutoStoreSyncTransportBase

  /**
   * 是否自动启动同步（默认：true）
   */
  autostart?: boolean

  /**
   * 发送到远程之前的钩子
   * 返回 false 可以阻止发送
   */
  onSend?: (operate: StateRemoteOperate) => boolean | undefined

  /**
   * 接收到远程数据之后的钩子
   * 返回 false 可以阻止应用
   */
  onReceive?: (operate: StateRemoteOperate) => boolean | undefined

  /**
   * 是否立即执行一次同步
   */
  immediate?: boolean

  /**
   * 缓存的最大数量
   */
  maxCacheSize?: number

  /**
   * 同步方向
   * - both: 双向同步（默认）
   * - forward: 仅从本地同步到远程
   * - backward: 仅从远程同步到本地
   */
  direction?: 'both' | 'forward' | 'backward'

  /**
   * 过滤器
   * 返回 false 的路径不会被同步
   */
  filter?: (path: string[], value: any) => boolean

  /**
   * 路径映射
   */
  pathMap?: {
    toLocal?: (path: string[], value: any) => string[] | undefined
    toRemote?: (path: string[], value: any) => string[] | undefined
  }

  /**
   * 接受的 peers 列表
   * '*' 表示接受所有来源
   */
  peers?: string[]

  /**
   * 调试模式
   */
  debug?: boolean
}
```

## 同步模式详解

### push 模式

将本地状态推送到远程：

```typescript
const syncer = store1.sync(store2, {
  mode: 'push'
})

// store1 的变化会同步到 store2
store1.count = 100  // store2.count 也会变成 100
```

### pull 模式

从远程拉取状态：

```typescript
const syncer = store1.sync(store2, {
  mode: 'pull'
})

// store2 的变化会同步到 store1
store2.count = 100  // store1.count 也会变成 100
```

### both 模式

双向同步（默认）：

```typescript
const syncer = store1.sync(store2, {
  mode: 'both'
})

// 任一 store 的变化都会同步到另一个
store1.count = 100  // store2.count = 100
store2.user.name = 'Bob'  // store1.user.name = 'Bob'
```

## 同步方向

```typescript
// forward: 仅从本地同步到远程
const syncer = store1.sync(store2, {
  direction: 'forward'
})

// backward: 仅从远程同步到本地
const syncer = store1.sync(store2, {
  direction: 'backward'
})

// both: 双向同步（默认）
const syncer = store1.sync(store2, {
  direction: 'both'
})
```

## API

### 属性

- `store: AutoStore` - 关联的 store
- `id: string` - 同步器 ID
- `options: NormalizeAutoStoreSyncerOptions` - 配置选项
- `transport: AutoStoreSyncTransportBase` - 传输层对象
- `syncing: boolean` - 是否正在同步

### 方法

- `start()` - 启动同步
- `stop()` - 停止同步
- `push()` - 手动推送本地状态到远程
- `pull()` - 手动从远程拉取状态
- `flush()` - 刷新操作缓存

### 事件

- `start` - 同步启动时触发
- `stop` - 同步停止时触发
- `error` - 发生错误时触发
- `localOperate` - 本地操作时触发（需要开启 debug）
- `remoteOperate` - 远程操作时触发（需要开启 debug）

## 使用场景

- 同一进程内的多个 Store 同步
- 跨标签页的 Store 同步
- 主线程与 Worker 之间的 Store 同步
