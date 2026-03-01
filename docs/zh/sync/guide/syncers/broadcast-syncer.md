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
import { AutoStore } from "autostore";
import { AutoStoreBroadcastSyncer, WorkerTransport } from "@autostorejs/syncer";

// 创建主 Store
const store = new AutoStore({
    count: 0,
    messages: [],
    messageCount: (scope) => scope.messages.length,
});

// 创建广播同步器
const broadcaster = new AutoStoreBroadcastSyncer(store, {
    autostart: true,
    heartbeat: 3000, // 3秒心跳检测
});

// 监听客户端连接
self.addEventListener("connect", (event) => {
    const port = event.ports[0];
    port.start();

    // 创建传输器
    const transport = new WorkerTransport({
        worker: port,
        autoConnect: true,
    });

    // 添加到广播器
    broadcaster.addTransport(transport);
});

// 可选：服务端主动推送更新
setInterval(() => {
    store.count++;
}, 5000); // 每5秒递增计数器
```

## 客户端代码

```typescript
import { AutoStore } from "autostore";
import { AutoStoreWorkerSyncer } from "@autostorejs/syncer";

// 创建 SharedWorker
const worker = new SharedWorker("./worker.js", {
    type: "module",
    name: "my-worker",
});

// 创建本地 Store
const store = new AutoStore({
    count: 0,
    messages: [],
});

// 创建 Worker 同步器
const syncer = new AutoStoreWorkerSyncer(store, worker, {
    mode: "pull",
    immediate: true,
    direction: "backward", // 只接收服务端更新
});

// 监听服务端的更新
store.watch(() => {
    console.log("count:", store.count);
    console.log("messages:", store.messages);
});
```

## 完整示例

参考 [packages/syncer/examples/worker-react](https://github.com/zhangfisher/autostore/tree/main/packages/syncer/examples/worker-react) 中的完整示例。
