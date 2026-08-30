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

<demo react="syncer/get-starts/localSync.tsx" />

上例演示了两个 `Store` 的实时双向同步：左右两个面板分别展示两个 `Store` 的当前状态，在任一侧修改数据，另一侧立即更新。

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

<demo react="syncer/get-starts/broadcastChannelSync.tsx" />

点击演示中的「在新窗口打开」会启动第二个页面，两个窗口运行相同的代码并接入同一频道，任一窗口修改状态另一窗口实时同步；后打开的窗口会自动拉取最新状态。

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

<demo react="syncer/get-starts/workerSync.tsx" />

演示中主线程与 `Worker` 线程各持有一个 `Store` 并双向同步：点击 `count++` 后，`Worker` 监听到变化计算 `result = count * 2` 并写回。左右双面板分别实时展示主线程与 `Worker` 内部的状态（`Worker` 通过独立消息上报快照），底部日志记录每一次跨线程的数据流动。

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

<demo react="syncer/get-starts/sharedWorkerSync.tsx" />

演示中 `SharedWorker` 内的 `Store` 每秒递增 `count` 并推送给客户端；客户端使用 `direction: 'backward'` 只接收不发送。左侧是本页客户端 `Store`，右侧实时展示 `SharedWorker` 内的服务端 `Store`——本地修改 `count` 后会被下一次推送覆盖，两侧对照即可直观看到单向同步的语义。

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

<demo react="syncer/get-starts/broadcast1toN.tsx" />

演示了 `1-N` 广播：`SharedWorker` 内的 `AutoStoreBroadcastSyncer` 管理主 `Store`，任一客户端（本页或点击「在新窗口打开」的其他窗口）的修改都会先到达服务端主 `Store`，再广播给所有其他客户端。左右双面板分别展示本页客户端 `Store` 与服务端主 `Store` 的实时状态，`messageCount` 等计算属性在服务端原位计算并同步到各客户端。

:::warning 提示
声明接入频道的消息（`__channel`）必须先于创建 syncer 发送：syncer 构造时会立即发送初始 `$pull`，若声明在后，服务端分流器尚未将该端口注册到广播器，初始拉取会被丢弃。
:::

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

<demo react="syncer/get-starts/switchNN.tsx" />

演示了 `N-N` 交换同步：本页同时持有 `counterStore` 与 `chatStore` 两个本地 `Store`，分别通过 `peers` 选项对接 `SharedWorker` 内的 `counter-store` 与 `chat-store`。两个信道互不干扰——`count` 的变化只会在 `counterStore` 间流转，`chatStore` 完全不受影响。
