# EventTransport

`EventEmitterTransport` 是基于事件发射器的传输器，用于在同一进程内通过任意实现了 `IEventEmitter` 接口的事件系统进行通信。

所有 `transport` 共享同一个 `emitter`，通过不同的事件名称区分信道，支持自定义接收和发送事件名称。

## 基本用法

```typescript
import { EventEmitter } from "events";
import { AutoStoreSyncer, EventEmitterTransport } from "@autostorejs/syncer";

const emitter = new EventEmitter();

// Store1 的 transport
// 监听 store2-channel，发送到 store1-channel
const transport1 = new EventEmitterTransport({
    emitter: emitter,
    localEventName: "store2-channel",
    remoteEventName: "store1-channel",
});

// Store2 的 transport
// 监听 store1-channel，发送到 store2-channel
const transport2 = new EventEmitterTransport({
    emitter: emitter,
    localEventName: "store1-channel",
    remoteEventName: "store2-channel",
});

const store1 = new AutoStore({ count: 0 });
const store2 = new AutoStore({ count: 0 });

const syncer1 = new AutoStoreSyncer(store1, { transport: transport1 });
const syncer2 = new AutoStoreSyncer(store2, { transport: transport2 });

transport1.connect();
transport2.connect();

store1.count = 100;
console.log(store2.count); // 100
```

<demo react="syncer/transports/eventTransport.tsx" />

演示用 30 行实现了一个 mitt 形态的最小事件总线，两个 `EventEmitterTransport` 以交叉的事件名接入：`Store1` 监听 `ch-2` 发送 `ch-1`，`Store2` 恰好相反。任一侧修改状态，消息经共享 emitter 路由到对端，两侧实时同步。

:::warning 提示
两个 `transport` 的 `localEventName` 与 `remoteEventName` 必须**交叉对应**：一方的监听事件应是另一方的发送事件，否则消息无法互通。
:::

## 配置选项

```typescript
interface EventEmitterTransportOptions {
    /** 共享的事件发射器 */
    emitter: IEventEmitter;
    /** 用于接收的本地订阅事件名称，默认 'local-transport' */
    localEventName?: string;
    /** 远程发送事件名称，默认 'remote-transport' */
    remoteEventName?: string;
    /** 是否自动建立连接，默认 false */
    autoConnect?: boolean;
}
```

## IEventEmitter 接口

`emitter` 只需要实现 `on`/`off`/`emit` 三个方法，因此可以接入 `Node.js EventEmitter`、`mitt` 或任何自定义事件总线：

```typescript
interface IEventEmitter {
    on(event: string, listener: (...args: any[]) => void): this;
    off(event: string, listener: (...args: any[]) => void): this;
    emit(event: string, ...args: any[]): boolean;
}
```

## 使用场景

- **同一进程内多 Store 同步**：与 `LocalTransport` 类似，但共享一个事件总线
- **接入既有事件系统**：应用已有全局事件总线（如基于 `mitt`）时无需额外创建信道
- **Node.js 环境**：`Node.js EventEmitter` 可直接使用
- **测试**：以事件为粒度观察和注入同步消息

## 与 LocalTransport 的区别

| 传输器               | 连接方式                     | 适用场景                     |
| -------------------- | ---------------------------- | ---------------------------- |
| `LocalTransport`     | 两个实例互相引用（点对点）   | 两个 Store 一对一同步        |
| `EventEmitterTransport` | 共享同一个 `emitter`，按事件名路由 | 多个 Store 通过事件总线通信 |

## 事件与 API

继承 `AutoStoreSyncTransportBase` 全部能力：

- `connect()` / `disconnect()` - 连接生命周期
- `send(operate)` - 发送操作
- `addReceiver(id, callback)` / `removeReceiver(id)` - receiver 管理
- 事件：`connect`、`disconnect`、`operate`（需 `debug`）、`error`、`timeout`
