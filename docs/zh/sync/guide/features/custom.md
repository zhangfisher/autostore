# 自定义开发

`@autostorejs/syncer` 的架构分为两层，均支持自定义扩展：

- **Syncer（同步器）**：负责监听 `store` 变化、生成操作、应用远程操作
- **Transport（传输器）**：负责在本地与远程之间传递消息

```
Store ──► Syncer ──► Transport ════通信信道════ Transport ──► Syncer ──► Store
```

大多数场景只需要**自定义 Transport**（比如基于 `WebSocket`、`HTTP` 轮询、`RTC` 的信道），Syncer 逻辑可以直接复用。

## 自定义 Transport

继承 `AutoStoreSyncTransportBase`，实现三个钩子即可：

```typescript
import { AutoStoreSyncTransportBase } from "@autostorejs/syncer";
import type { StateRemoteOperate } from "@autostorejs/syncer";

interface WebSocketTransportOptions {
    url: string;
    autoConnect?: boolean;
}

export class WebSocketTransport extends AutoStoreSyncTransportBase<WebSocketTransportOptions> {
    private ws?: WebSocket;

    /**
     * 调用 connect() 时触发
     * 在此建立连接，连接成功返回 true 或 Promise<boolean>
     */
    onConnect(): boolean | Promise<boolean> {
        this.ws = new WebSocket(this.options.url);
        this.ws.onmessage = (event) => {
            // 收到消息后必须调用 onReceiveOperate 分发给 receiver
            this.onReceiveOperate(JSON.parse(event.data));
        };
        return new Promise((resolve) => {
            this.ws!.onopen = () => resolve(true);
            this.ws!.onerror = () => resolve(false);
        });
    }

    /**
     * 断开连接时触发
     */
    onDisconnect() {
        this.ws?.close();
        this.ws = undefined;
    }

    /**
     * 发送操作时触发
     */
    onSendOperate(operate: StateRemoteOperate) {
        this.ws?.send(JSON.stringify(operate));
    }
}
```

使用自定义 Transport：

```typescript
const transport = new WebSocketTransport({ url: "ws://localhost:8080" });

const syncer = new AutoStoreSyncer(store, {
    transport,
    mode: "both",
});
```

### 基类能力

继承 `AutoStoreSyncTransportBase` 后自动获得：

| 能力             | 说明                                                     |
| ---------------- | -------------------------------------------------------- |
| 事件系统         | `connect`/`disconnect`/`operate`/`error`/`timeout` 事件  |
| receiver 注册    | `addReceiver(id, callback)` / `removeReceiver(id)`       |
| 心跳检测         | 配置 `heartbeat` 选项后自动启用 `ping/pong` 检测         |
| 连接状态管理     | `connected` 属性、`connect()` / `disconnect()` 生命周期  |

:::warning 提示
子类收到消息后必须调用 `this.onReceiveOperate(operate)`，它负责心跳应答、消息校验并分发给所有注册的 receiver。
:::

### 心跳检测

配置 `heartbeat` 选项（毫秒）即可自动启用心跳：

```typescript
const transport = new WebSocketTransport({
    url: "ws://localhost:8080",
    heartbeat: 5000, // 5 秒心跳间隔
});

// 超时后会自动断开并触发 timeout 事件
transport.on("timeout", () => {
    console.log("连接超时，已自动断开");
});
```

详见[心跳检测](./heartbeat.md)。

## 自定义 Syncer

如果同步策略本身需要定制（比如冲突消解、批量合并），可以继承 `AutoStoreSyncerBase`：

```typescript
import { AutoStoreSyncerBase } from "@autostorejs/syncer";

class MySyncer extends AutoStoreSyncerBase {
    start() {
        if (this.syncing) return;
        try {
            this._syncing = true;
            // 启动逻辑：watch store、注册 receiver 等
        } finally {
            this.emit("start", undefined, true);
        }
    }
    stop() {
        if (!this.syncing) return;
        try {
            // 清理逻辑
        } finally {
            this.emit("stop", undefined, true);
            this._syncing = false;
        }
    }
    toString() {
        return "MySyncer";
    }
}
```

大多数情况下应继承 `AutoStoreSyncer` 而非基类，这样只需覆盖需要定制的私有流程，路径映射、过滤、缓存等能力全部保留。参考内置实现：

- `AutoStoreWorkerSyncer` —— 继承 `AutoStoreSyncer`，仅替换默认 Transport
- `AutoStoreBroadcastChannelSyncer` —— 同上，适配 BroadcastChannel

## 组合示例：Syncer + Transport

内置的 `AutoStoreWorkerSyncer` 展示了标准的组合模式——构造函数中创建 Transport，再透传其余选项：

```typescript
export class AutoStoreWorkerSyncer extends AutoStoreSyncer {
    constructor(store, worker, options) {
        const transport = new WorkerTransport({ worker });
        super(store, { ...options, transport });
    }
}
```

自定义 Transport 配合 `AutoStoreSyncer` 使用时，`mode`/`direction`/`local`/`remote`/`filter`/`pathMap` 等选项均正常生效，无需额外处理。

<demo react="syncer/features/custom.tsx" />

演示实现了一个「延迟投递传输器」：继承 `AutoStoreSyncTransportBase` 只实现 `onConnect` / `onDisconnect` / `onSendOperate` 三个钩子，消息延迟 800ms 才投递到对端。点击 `count++` 可直观观察到左侧立即变化、右侧延迟更新——这正是传输层可插拔的体现，换用 `WebSocket` 等真实信道时 Syncer 侧代码完全不变。
