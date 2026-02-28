# 心跳检测

心跳检测功能用于监控连接状态，当连接超时自动断开并清理资源。

## 启用心跳检测

```typescript
import { AutoStore } from 'autostore'
import { AutoStoreBroadcastSyncer, WorkerTransport } from '@autostorejs/syncer'

// 在广播器中启用心跳检测
const broadcaster = new AutoStoreBroadcastSyncer(store, {
  heartbeat: 3000  // 3秒心跳间隔
})

// 添加传输器
const transport = new WorkerTransport({
  worker: port,
  autoConnect: true
})

// 广播器会自动为每个传输器启用心跳检测
broadcaster.addTransport(transport)
```

## 在传输器中直接使用

```typescript
import { WorkerTransport } from '@autostorejs/syncer'

const transport = new WorkerTransport({
  worker: worker,
  heartbeat: 5000  // 5秒心跳间隔
})

await transport.connect()

// 当心跳超时时，会触发 timeout 事件
transport.on('timeout', () => {
  console.log('连接超时，已自动断开')
})
```

## 心跳机制

心跳检测通过以下方式工作：

1. **定时发送 ping**：每个心跳间隔发送一个 `$ping` 消息
2. **等待 pong 响应**：收到 `$ping` 后，对端会立即回复 `$pong`
3. **超时检测**：如果在规定时间内没有收到 `$pong`，则认为连接超时
4. **自动断开**：超时后自动断开连接并触发 `timeout` 事件

```typescript
// 内部实现原理
transport.on('connect', () => {
  // 启动定时器，定期发送 ping
  setInterval(() => {
    transport.send({ type: '$ping', value: Date.now() })
  }, heartbeatInterval)
})

transport.onReceive((operate) => {
  if (operate.type === '$ping') {
    // 收到 ping，立即回复 pong
    transport.send({ type: '$pong', value: operate.value })
  } else if (operate.type === '$pong') {
    // 收到 pong，更新最后活跃时间
    lastActiveTime = Date.now()
  }
})
```

## 配置选项

```typescript
interface AutoStoreSyncTransportOptions {
  /**
   * 心跳间隔（毫秒）
   * 默认：3000（3秒）
   * 设置为 0 或不设置则禁用心跳检测
   */
  heartbeat?: number
}
```

## 事件监听

```typescript
transport.on('timeout', () => {
  console.log('连接超时')
})

transport.on('disconnect', () => {
  console.log('连接已断开')
})

transport.on('error', (error) => {
  console.error('连接错误:', error)
})
```

## 在 AutoStoreBroadcastSyncer 中使用

广播器会自动管理所有连接的传输器的心跳：

```typescript
const broadcaster = new AutoStoreBroadcastSyncer(store, {
  heartbeat: 3000  // 为所有传输器设置心跳
})

broadcaster.on('timeout', (transportId) => {
  console.log(`客户端 ${transportId} 心跳超时，已移除`)
})
```

## 注意事项

1. **网络延迟**：心跳间隔应大于网络延迟和响应时间
2. **性能影响**：过短的心跳间隔会增加网络流量
3. **合理设置**：根据应用场景设置合适的心跳间隔

## 心跳间隔建议

| 应用场景 | 建议心跳间隔 |
|---------|-------------|
| 局域网 | 3000-5000ms |
| 互联网应用 | 10000-30000ms |
| 移动网络 | 30000-60000ms |
| 实时应用 | 1000-3000ms |

## 完整示例

```typescript
import { AutoStore } from 'autostore'
import { AutoStoreBroadcastSyncer, WorkerTransport } from '@autostorejs/syncer'

// 创建主 store
const store = new AutoStore({
  count: 0,
  clients: []
})

// 创建广播器，启用心跳检测
const broadcaster = new AutoStoreBroadcastSyncer(store, {
  autostart: true,
  heartbeat: 3000  // 3秒心跳检测
})

// 监听客户端超时
broadcaster.on('timeout', (transport) => {
  console.log(`客户端 ${transport.id} 超时断开`)
})

// 监听连接事件
self.addEventListener('connect', (event) => {
  const port = event.ports[0]
  port.start()

  const transport = new WorkerTransport({
    worker: port,
    autoConnect: true
  })

  broadcaster.addTransport(transport)
  console.log(`客户端 ${transport.id} 已连接`)
})
```
