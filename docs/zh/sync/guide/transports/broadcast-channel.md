# BroadcastChannelTransport

`BroadcastChannelTransport` 是基于浏览器 BroadcastChannel API 的传输器，用于在同源的不同浏览上下文（多个标签页、iframe、窗口）之间进行通信。

## 基本用法

```typescript
import { AutoStore } from 'autostore'
import { AutoStoreSyncer, BroadcastChannelTransport } from '@autostorejs/syncer'

// 创建传输器
const transport = new BroadcastChannelTransport({
  channelName: 'my-store-channel'
})

// 连接
await transport.connect()

// 创建 store
const store = new AutoStore({
  count: 0,
  user: { name: 'Alice' }
})

// 创建同步器
const syncer = new AutoStoreSyncer(store, {
  transport,
  mode: 'both',
  immediate: true
})

// 在另一个标签页中运行相同的代码
// 修改任一标签页的状态，其他标签页会自动同步
store.count = 100
```

## 配置选项

```typescript
interface BroadcastChannelTransportOptions {
  /**
   * 频道名称
   * 所有使用相同频道名称的浏览上下文可以互相通信
   */
  channelName: string

  /**
   * 是否自动建立连接
   * 默认：false（保持向后兼容）
   */
  autoConnect?: boolean
}
```

## 多标签页同步示例

**标签页 A：**

```typescript
import { AutoStore } from 'autostore'
import { AutoStoreSyncer, BroadcastChannelTransport } from '@autostorejs/syncer'

const transport = new BroadcastChannelTransport({
  channelName: 'shared-store'
})

const store = new AutoStore({
  count: 0,
  items: [] as string[]
})

const syncer = new AutoStoreSyncer(store, {
  transport,
  mode: 'both'
})

// 操作
store.count++
store.items.push('Item A')
```

**标签页 B：**

```typescript
import { AutoStore } from 'autostore'
import { AutoStoreSyncer, BroadcastChannelTransport } from '@autostorejs/syncer'

const transport = new BroadcastChannelTransport({
  channelName: 'shared-store'  // 相同的频道名称
})

const store = new AutoStore({
  count: 0,
  items: [] as string[]
})

const syncer = new AutoStoreSyncer(store, {
  transport,
  mode: 'both'
})

// 会自动接收到标签页 A 的更新
console.log(store.count)  // 1
console.log(store.items)  // ['Item A']
```

## 使用场景

- **多标签页状态同步**：在多个标签页之间共享状态
- **跨 iframe 通信**：主页面与 iframe 之间的状态同步
- **跨窗口通信**：主窗口与弹出窗口之间的状态同步

## 浏览器兼容性

BroadcastChannel API 在以下浏览器中可用：

- Chrome 54+
- Firefox 38+
- Safari 15.4+
- Edge 79+

## 注意事项

1. **同源限制**：所有浏览上下文必须同源
2. **频道名称**：使用相同的频道名称才能通信
3. **序列化**：传输的数据必须可序列化（使用结构化克隆算法）
4. **生命周期**：当所有浏览上下文都关闭时，频道会被销毁

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

## 完整示例

参考 [packages/syncer/examples/worker-react/src/examples/broadcast-channel](https://github.com/zhangfisher/autostore/tree/main/packages/syncer/examples/worker-react/src/examples/broadcast-channel) 中的完整示例。
