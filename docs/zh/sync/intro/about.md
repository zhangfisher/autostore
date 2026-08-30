# 关于

`@autostorejs/syncer` 是 `AutoStore` 官方提供的状态同步包，用于在多个 `AutoStore` 之间保持数据一致。它将「状态同步」这一通用需求从业务代码中剥离出来：你只需要声明**谁和谁同步、同步哪些路径、朝哪个方向流动**，同步器会自动监听状态变化、生成操作（`Operate`）、通过通信信道传递并应用到对端 `Store`。

无论是同一进程内的两个 `Store`、跨浏览器标签页、主线程与 `Worker`，还是 `SharedWorker` 中的一主多从/多信道交换，都可以用同一套 API 完成。

## 架构

`@autostorejs/syncer` 采用**两层架构**，职责清晰分离：

```
Store ──► Syncer ──► Transport ════通信信道════ Transport ──► Syncer ──► Store
```

- **Syncer（同步器）**：负责监听 `Store` 变化、生成操作、应用远程操作，承载同步模式、路径映射、过滤等业务语义
- **Transport（传输器）**：负责在本地与远程之间传递消息，屏蔽底层通信细节（本地调用、`Worker`、`BroadcastChannel` 等）

两层均可独立替换与扩展。大多数场景只需**自定义 Transport**（比如基于 `WebSocket`、`HTTP` 轮询、`RTC` 的信道），Syncer 逻辑可直接复用，详见[自定义开发](../guide/features/custom.md)。

## 核心能力

### 多种同步器

| 同步器                            | 拓扑  | 说明                                                      |
| --------------------------------- | ----- | --------------------------------------------------------- |
| `AutoStoreSyncer`                 | `1-1` | 最基本的同步器，两个 `Store` 之间建立同步关系             |
| `AutoStoreWorkerSyncer`           | `1-1` | 主线程与 `WebWorker` / `SharedWorker` 之间的同步          |
| `AutoStoreBroadcastSyncer`        | `1-N` | 一个主 `Store` 与多个客户端同步，常部署在 `SharedWorker`  |
| `AutoStoreBroadcastChannelSyncer` | `N-N` | 基于 `BroadcastChannel API` 的跨标签页同步                |
| `AutoStoreSwitchSyncer`           | `N-N` | 在 `SharedWorker` 中管理多个 `Store`，按 `peers` 交换数据 |

此外，导入包后会为 `AutoStore` 注册两个实例方法，覆盖最常见的同进程场景：

- `store.sync()`：与另一个 `Store` 建立同步
- `store.clone()`：克隆 `Store`，可选保持同步（`none` / `forward` / `both`）

### 多种传输器

| 传输器                      | 信道                   | 适用场景               |
| --------------------------- | ---------------------- | ---------------------- |
| `LocalTransport`            | 本地调用               | 同一进程内同步（默认） |
| `WorkerTransport`           | `postMessage`          | 主线程与 `Worker` 通信 |
| `BroadcastChannelTransport` | `BroadcastChannel API` | 跨浏览器标签页同步     |
| `EventEmitterTransport`     | 事件发射器             | 任意基于事件的信道     |

## 特性

- **多种同步模式**：`mode` 支持 `push` / `pull` / `both`，`direction` 支持 `forward` / `backward` / `both`，精确控制数据流动
- **路径映射**：通过 `local` / `remote` 或 `pathMap` 在不同状态结构之间映射同步，支持嵌套与扁平化结构互转
- **过滤器**：通过 `filter` 精确控制哪些路径参与同步，轻松实现敏感字段过滤
- **同步钩子**：`onSend` / `onReceive` 在操作发送前/接收后拦截，可修改或阻止操作
- **心跳检测**：自动监控连接状态，超时自动断开并清理资源
- **离线缓存**：传输层不可用时缓存操作，连接恢复后自动 `flush`，不丢失离线修改
- **自定义扩展**：继承 `AutoStoreSyncTransportBase` 实现三个钩子即可接入 `WebSocket` 等任意信道
- **双版本发布**：提供标准版与 `Lite` 版两个入口，按需引入控制包体积

## 使用场景

| 场景                         | 推荐方案                    | 说明                               |
| ---------------------------- | --------------------------- | ---------------------------------- |
| 同一进程内同步               | `store.sync()`              | 使用 `store.sync()` 方法           |
| 跨标签页同步                 | `BroadcastChannelTransport` | 使用 `BroadcastChannel API`        |
| 主线程与 `Worker` 同步       | `WorkerTransport`           | 使用 `WebWorker` 或 `SharedWorker` |
| 一主多从同步                 | `AutoStoreBroadcastSyncer`  | 一个主 `Store` 与多个客户端同步    |
| `SharedWorker` 多 Store 同步 | `AutoStoreSwitchSyncer`     | 在 `SharedWorker` 中管理多个 Store |

## 下一步

- [安装](../intro/install.md)：了解标准版与 `Lite` 版的差异
- [快速入门](../guide/get-starts.md)：从同进程同步到 `N-N` 交换的完整示例
- [同步器](../guide/syncers/syncer.md)：各类同步器的详细用法
- [传输器](../guide/transports/local.md)：各类传输器的详细用法
