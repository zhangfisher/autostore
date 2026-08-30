# WorkerSyncer

`AutoStoreWorkerSyncer` 是专门用于实现主线程与`WebWorker/SharedWorker`之间`的同步。

## 基本用法

### 与普通 Worker 同步

**主线程代码：**

```typescript
import { AutoStore } from "autostore";
import { AutoStoreWorkerSyncer } from "@autostorejs/syncer";

const worker = new Worker("./worker.js", { type: "module" });

const store = new AutoStore({
    count: 0,
    user: { name: "Alice" },
});

const syncer = new AutoStoreWorkerSyncer(store, worker, {
    mode: "pull",
    immediate: true,
    direction: "both",
});
```

**Worker 代码 (worker.js)：**

```typescript
import { AutoStore } from "autostore";
import { AutoStoreWorkerSyncer } from "@autostorejs/syncer";

const store = new AutoStore({
    count: 0,
    user: { name: "Bob" },
});

// self 就是 Worker 全局对象
const syncer = new AutoStoreWorkerSyncer(store, self, {
    mode: "push",
});
```

<demo react="syncer/get-starts/workerSync.tsx" />

演示中主线程与 `Worker` 内各持一个 `Store` 双向同步：主线程点击 `count++` 后状态同步到 `Worker`，`Worker` 内计算 `result = count * 2` 写回，主线程面板实时显示回写结果——一次修改可以看到双向的数据流动。

### 与 SharedWorker 同步

**主线程代码：**

```typescript
import { AutoStore } from "autostore";
import { AutoStoreWorkerSyncer } from "@autostorejs/syncer";

const worker = new SharedWorker("./worker.js", {
    type: "module",
    name: "my-worker",
});

const store = new AutoStore({
    count: 0,
    messages: [],
});

const syncer = new AutoStoreWorkerSyncer(store, worker, {
    mode: "pull",
    immediate: true,
    direction: "backward", // 只接收服务端更新
});
```

**SharedWorker 代码 (worker.js)：**

```typescript
import { AutoStore } from "autostore";
import { AutoStoreWorkerSyncer } from "@autostorejs/syncer";

const store = new AutoStore({
    count: 0,
    messages: [],
});

const syncer = new AutoStoreWorkerSyncer(store, self, {
    mode: "push",
});
```

<demo react="syncer/get-starts/sharedWorkerSync.tsx" />

演示中 `SharedWorker` 内的 `Store` 作为权威数据源每秒递增推送，客户端以 `direction: 'backward'` 只接收更新；同一浏览器的其他标签页会连接到同一个 `SharedWorker`，因此能看到完全相同的值。

## 完整示例

参考 [packages/syncer/examples/worker-react](https://github.com/zhangfisher/autostore/tree/main/packages/syncer/examples/worker-react) 中的完整示例。
