# 调试模式

同步器与传输层均提供 `debug` 选项，开启后会触发调试事件，方便观察同步过程中的每一个操作。

## Syncer 调试

在同步器选项中开启 `debug`：

```typescript
const syncer = store1.sync(store2, {
    debug: true,
});

// 本地 store 的写操作（无论是否被发送）
syncer.on("localOperate", (operate) => {
    console.log("[本地操作]", operate.type, operate.path, operate.value);
});

// 从远程接收到的操作（无论是否被应用）
syncer.on("remoteOperate", (operate) => {
    console.log("[远程操作]", operate.type, operate.path, operate.value);
});
```

<demo react="syncer/features/debug.tsx" />

演示中开启了 `debug: true`：在任一侧修改状态后，下方流水实时输出 `localOperate`（本地写操作）与 `remoteOperate`（接收到的远程操作）的完整信息，包括操作类型、路径与值，可用于排查循环同步、验证过滤与路径映射是否生效。

| 事件            | 触发时机                 | 参数              |
| --------------- | ------------------------ | ----------------- |
| `localOperate`  | 本地 `store` 发生写操作  | `StateOperate`    |
| `remoteOperate` | 接收到远程操作           | `StateRemoteOperate` |

:::warning 提示
`localOperate`/`remoteOperate` 事件仅在 `debug: true` 时触发，避免生产环境的性能损耗。
:::

## Transport 调试

在传输器选项中开启 `debug`，会在接收到每一条消息时触发 `operate` 事件：

```typescript
import { LocalTransport } from "@autostorejs/syncer";

let transport1: LocalTransport, transport2: LocalTransport;
transport1 = new LocalTransport(() => transport2, { debug: true });
transport2 = new LocalTransport(() => transport1, { debug: true });

transport1.on("operate", (operate) => {
    console.log("[收到消息]", operate);
});

transport1.connect();
transport2.connect();
```

## 其他事件

同步器与传输器还提供以下事件用于监控同步生命周期：

| 事件         | 来源             | 说明                               |
| ------------ | ---------------- | ---------------------------------- |
| `start`      | Syncer           | 同步启动时触发                     |
| `stop`       | Syncer           | 同步停止时触发                     |
| `syncing`    | Syncer           | 首次全量同步完成时触发（参数为对方 id） |
| `error`      | Syncer/Transport | 发生错误时触发                     |
| `connect`    | Transport        | 连接建立时触发                     |
| `disconnect` | Transport        | 连接断开时触发                     |
| `timeout`    | Transport        | 心跳超时（连接可能已断开）         |

## 排查循环同步

如果出现状态「自己同步自己」导致的死循环，可以结合调试事件观察 `operate.id` 与 `operate.flags`：

```typescript
syncer.on("remoteOperate", (operate) => {
    // id 应为对方 syncer 的 id，若等于本地 id 说明收到了自己发的消息
    console.log("来源:", operate.id, "本地:", syncer.id);
});
```

内部机制：同步器使用 `flags` 标记操作来源——远程写入本地时使用负数 `flags`，本地监听到该操作后不会再转发，从而防止循环更新。
