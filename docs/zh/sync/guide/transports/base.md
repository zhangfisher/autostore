# Transport 基类

`AutoStoreSyncTransportBase` 是所有传输器的基类，定义了传输层的连接生命周期、receiver 机制、事件系统与心跳检测。自定义传输器时继承此基类，详见[自定义开发](../features/custom.md)。

## 架构职责

```
Syncer ──send(operate)──► Transport ──信道──► 对端 Transport ──receiver──► 对端 Syncer
```

- `Transport` 不理解 `store`，只负责传递 `StateRemoteOperate` 消息
- `Syncer` 通过 `addReceiver(id, callback)` 注册回调，由 `Transport` 在收到消息时分发

## 配置选项

```typescript
interface AutoStoreSyncTransportOptions {
    /** 启用调试模式，接收到每一条消息时触发 operate 事件 */
    debug?: boolean;
    /** 是否自动建立连接，默认 false（保持向后兼容） */
    autoConnect?: boolean;
    /** 心跳间隔（毫秒），启用后自动进行 ping/pong 检测 */
    heartbeat?: number;
}
```

## 连接生命周期

```typescript
const transport = new LocalTransport(() => peerTransport);

transport.connect();    // 建立连接，触发 connect 事件
// ...
transport.disconnect(); // 断开连接，触发 disconnect 事件
```

- `connect()` 会调用子类的 `onConnect()` 钩子；支持 `Promise` 异步连接（如 `WebSocket`）
- `connected` 属性标识当前连接状态
- `connect` 事件使用 **retain（保留）机制**：晚注册的监听器也能收到已触发的 `connect` 事件

子类需要实现的钩子：

| 钩子                | 说明                                       |
| ------------------- | ------------------------------------------ |
| `onConnect()`       | 建立连接，返回 `boolean` 或 `Promise`      |
| `onDisconnect()`    | 销毁连接                                   |
| `onSendOperate()`   | 发送操作到对端                             |

收到消息时子类必须调用 `this.onReceiveOperate(operate)`，由基类完成心跳应答、消息校验与 receiver 分发。

## Receiver 机制

`Syncer` 通过 receiver 接收远程操作：

```typescript
// 注册：返回带 off() 的订阅对象
const subscriber = transport.addReceiver("my-syncer-id", (operate) => {
    console.log("收到操作:", operate.type, operate.path);
});

// 移除
subscriber.off();
// 或
transport.removeReceiver("my-syncer-id");
```

一个 `Transport` 可以注册多个 `receiver`（按 `id` 区分），每条消息会分发给所有 `receiver`，由它们自行决定是否处理。`1-N` 场景（如 `AutoStoreBroadcastSyncer`）即基于此机制。

<demo react="syncer/features/custom.tsx" />

上面的演示通过继承 `AutoStoreSyncTransportBase` 实现自定义传输器，自动获得了事件系统与 receiver 分发能力——`Syncer` 侧代码与使用内置传输器时完全一致。

## 心跳检测

配置 `heartbeat` 选项后自动启用：

```typescript
const transport = new WorkerTransport({
    worker: port,
    heartbeat: 3000, // 3 秒心跳间隔
});
```

1. 每个心跳间隔发送一条 `$ping` 消息
2. 对端收到 `$ping` 自动回复 `$pong`
3. 超时未收到 `$pong` 则自动 `disconnect()` 并触发 `timeout` 事件

详见[心跳检测](../features/heartbeat.md)。

<demo html="syncer/features/heartbeat.html" />

上面的演示完整展示了基类内置的心跳能力：无需子类编写任何心跳代码，仅配置 `heartbeat` 选项后，`$ping`/`$pong` 的发送、应答与超时断开全部由 `AutoStoreSyncTransportBase` 自动完成。

## 事件

| 事件         | 说明                               |
| ------------ | ---------------------------------- |
| `connect`    | 连接建立时触发（retain 保留）      |
| `disconnect` | 连接断开时触发                     |
| `operate`    | 接收到消息时触发（需开启 `debug`） |
| `error`      | 发生错误时触发                     |
| `timeout`    | 心跳超时，连接可能已断开           |

## API

| 成员                                       | 说明                                  |
| ------------------------------------------ | ------------------------------------- |
| `connect()`                                | 建立连接                              |
| `disconnect()`                             | 断开连接                              |
| `send(operate)`                            | 发送操作（未连接时抛出错误）          |
| `addReceiver(id, callback)`                | 注册 receiver，返回订阅对象           |
| `removeReceiver(id)`                       | 移除 receiver                         |
| `connected`                                | 当前连接状态                          |
| `id`                                       | 传输器自增唯一标识（用于 flags 标记） |
| `heartbeat`                                | 心跳检测器实例（启用时存在）          |
| `startHeartbeat()` / `stopHeartbeat()`     | 手动控制心跳检测                      |
