# LocalTransport

`LocalTransport` 是本地传输器，用于在同一进程内的两个 Store 之间进行同步。

## 基本用法

```typescript
import { AutoStore } from 'autostore'
import { AutoStoreSyncer, LocalTransport } from '@autostorejs/syncer'

// 创建两个 transport，互相引用
let transport1: LocalTransport, transport2: LocalTransport

transport1 = new LocalTransport(() => transport2)
transport2 = new LocalTransport(() => transport1)

// 创建 store
const store1 = new AutoStore({ count: 0 })
const store2 = new AutoStore({ count: 0 })

// 创建同步器
const syncer1 = new AutoStoreSyncer(store1, { transport: transport1 })
const syncer2 = new AutoStoreSyncer(store2, { transport: transport2 })

// 连接
transport1.connect()
transport2.connect()

// 现在两个 store 会同步
store1.count = 100
console.log(store2.count) // 100
```

## 使用 store.sync()

更简单的方式是使用 `store.sync()` 方法，它会自动创建 LocalTransport：

```typescript
const store1 = new AutoStore({ count: 0 })
const store2 = new AutoStore({ count: 0 })

// sync 方法会自动创建 LocalTransport 并建立同步
const syncer = store1.sync(store2)

store1.count = 100
console.log(store2.count) // 100
```

## 配置选项

```typescript
interface AutoStoreSyncTransportOptions {
  /**
   * 启用调试模式
   * 开启后会在接收到每一条消息时触发 operate 事件
   */
  debug?: boolean

  /**
   * 是否自动建立连接
   * 默认：false（保持向后兼容）
   */
  autoConnect?: boolean

  /**
   * 心跳间隔（毫秒）
   */
  heartbeat?: number
}
```

## 启用调试模式

```typescript
const transport1 = new LocalTransport(() => transport2, { debug: true })
const transport2 = new LocalTransport(() => transport1, { debug: true })

// 监听 operate 事件
transport1.on('operate', (operate) => {
  console.log('收到操作:', operate)
})

transport1.connect()
transport2.connect()
```

## 自动连接

```typescript
// 启用自动连接，创建 transport 后自动调用 connect()
const transport1 = new LocalTransport(() => transport2, { autoConnect: true })
const transport2 = new LocalTransport(() => transport1, { autoConnect: true })
```

## 使用场景

- **同一进程内的多 Store 同步**：不同模块之间的状态共享
- **测试**：在单元测试中模拟同步场景
- **原型开发**：快速验证同步逻辑

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
