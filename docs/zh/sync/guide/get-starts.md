# 快速入门

## 同一进程内同步

最简单的场景是在同一进程内的两个 Store 之间同步，使用 `store.sync()` 方法：

```typescript
import { AutoStore } from "autostore";

// 创建两个 store
const store1 = new AutoStore({ count: 0 });
const store2 = new AutoStore({ count: 0 });

// 使用 sync 方法建立双向同步
const syncer = store1.sync(store2);

// 修改任一 store，另一个会自动同步
store1.count = 100;
console.log(store2.count); // 100

store2.count = 200;
console.log(store1.count); // 200
```

## 跨标签页同步

使用 `BroadcastChannelTransport` 实现跨标签页同步：

```typescript
import { AutoStore } from "autostore";
import { AutoStoreSyncer, BroadcastChannelTransport } from "@autostorejs/syncer";

// 在两个标签页中运行相同的代码
const transport = new BroadcastChannelTransport({
    channelName: "my-store-channel",
});

const store = new AutoStore({ count: 0 });

const syncer = new AutoStoreSyncer(store, {
    transport,
    mode: "both", // 双向同步
});

// 在任一标签页修改状态，其他标签页会自动同步
store.count = 100;
```

## 与 WebWorker 同步

- **主线程代码**

```typescript
import { AutoStore } from "autostore";
import { AutoStoreWorkerSyncer } from "@autostorejs/syncer";

const worker = new Worker("./worker.js", { type: "module" });

const store = new AutoStore({
    count: 0,
    result: 0,
});

const syncer = new AutoStoreWorkerSyncer(store, worker, {
    mode: "both",
    immediate: true,
});

// 修改状态会同步到 Worker
store.count = 100;
```

- **Worker 代码 (worker.js)**

```typescript
import { AutoStore } from "autostore";
import { AutoStoreWorkerSyncer } from "@autostorejs/syncer";

const store = new AutoStore({
    count: 0,
    result: 0,
});

const syncer = new AutoStoreWorkerSyncer(store, self, {
    mode: "both",
});

// 监听主线程的变化
store.watch(() => {
    store.result = store.count * 2;
});
```

## 与 SharedWorker 同步

- **主线程代码**

```typescript
import { AutoStore } from "autostore";
import { AutoStoreWorkerSyncer } from "@autostorejs/syncer";

const worker = new SharedWorker("./worker.js", {
    type: "module",
    name: "my-worker",
});

const store = new AutoStore({
    count: 0,
    messages: [] as string[],
});

const syncer = new AutoStoreWorkerSyncer(store, worker, {
    mode: "pull",
    direction: "backward", // 只接收服务端更新
    immediate: true,
});
```

- **SharedWorker 代码 (worker.js)**

```typescript
import { AutoStore } from "autostore";
import { AutoStoreWorkerSyncer } from "@autostorejs/syncer";

const store = new AutoStore({
    count: 0,
    messages: [] as string[],
});

const syncer = new AutoStoreWorkerSyncer(store, self, {
    mode: "push",
});

// 服务端主动推送更新
setInterval(() => {
    store.count++;
}, 5000);
```

## 使用 BroadcastSyncer 实现 1-N 同步

- **SharedWorker 服务端代码**

```typescript
import { AutoStore } from "autostore";
import { AutoStoreBroadcastSyncer, WorkerTransport } from "@autostorejs/syncer";

const store = new AutoStore({
    count: 0,
    messages: [] as string[],
});

// 创建广播器
const broadcaster = new AutoStoreBroadcastSyncer(store, {
    autostart: true,
    heartbeat: 3000,
});

// 监听客户端连接
self.addEventListener("connect", (event) => {
    const port = event.ports[0];
    port.start();

    const transport = new WorkerTransport({
        worker: port,
        autoConnect: true,
    });

    broadcaster.addTransport(transport);
});

// 服务端主动推送
setInterval(() => {
    store.count++;
}, 5000);
```

- **客户端代码**

```typescript
import { AutoStore } from "autostore";
import { AutoStoreWorkerSyncer } from "@autostorejs/syncer";

const worker = new SharedWorker("./worker.js");

const store = new AutoStore({
    count: 0,
    messages: [] as string[],
});

const syncer = new AutoStoreWorkerSyncer(store, worker, {
    mode: "pull",
    immediate: true,
    direction: "backward",
});
```

## 使用 SwitchSyncer 实现 N-N 同步

- **SharedWorker 代码**

```typescript
import { AutoStore } from "autostore";
import { AutoStoreSwitchSyncer, WorkerTransport } from "@autostorejs/syncer";

// 创建多个独立的 store
const userStore = new AutoStore(
    {
        user: { name: "Alice", age: 30 },
    },
    { id: "user-store" },
);

const productStore = new AutoStore(
    {
        products: [] as Array<{ id: string; name: string }>,
    },
    { id: "product-store" },
);

// 创建 SwitchSyncer
const switchSyncer = new AutoStoreSwitchSyncer([userStore, productStore]);

self.addEventListener("connect", (event) => {
    const port = event.ports[0];
    port.start();

    const transport = new WorkerTransport({
        worker: port,
        autoConnect: true,
    });

    switchSyncer.addTransport(transport);
});
```

- **客户端代码**

```typescript
import { AutoStore } from "autostore";
import { AutoStoreWorkerSyncer } from "@autostorejs/syncer";

const worker = new SharedWorker("./worker.js");

// 只同步用户信息
const userStore = new AutoStore({
    user: { name: "Bob" },
});

const userSyncer = new AutoStoreWorkerSyncer(userStore, worker, {
    peers: ["user-store"], // 指定要同步的 store
    mode: "both",
    immediate: true,
});

// 只同步产品列表
const productStore = new AutoStore({
    products: [],
});

const productSyncer = new AutoStoreWorkerSyncer(productStore, worker, {
    peers: ["product-store"],
    mode: "both",
    immediate: true,
});
```
