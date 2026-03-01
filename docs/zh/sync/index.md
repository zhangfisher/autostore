# 同步

`@autostorejs/syncer` 为 `AutoStore` 提供了强大的状态同步能力，支持多种同步场景和通信方式。

## 特性

- **多种同步模式**：支持 1-1、1-N、N-N 同步
- **灵活的传输层**：支持本地、BroadcastChannel、WebWorker、SharedWorker
- **双向同步**：支持双向、单向同步
- **路径映射**：支持本地和远程路径映射
- **过滤器**：支持同步数据过滤
- **心跳检测**：支持连接心跳检测，自动断开超时连接
- **操作缓存**：支持离线操作缓存，连接后自动同步

## 快速开始

```bash
npm install @autostorejs/syncer
```

## 使用场景

| 场景                         | 推荐方案                    | 说明                               |
| ---------------------------- | --------------------------- | ---------------------------------- |
| 同一进程内同步               | `store.sync()`              | 使用 `store.sync()` 方法           |
| 跨标签页同步                 | `BroadcastChannelTransport` | 使用 `BroadcastChannel API`        |
| 主线程与 `Worker` 同步       | `WorkerTransport`           | 使用 `WebWorker` 或 `SharedWorker` |
| 一主多从同步                 | `AutoStoreBroadcastSyncer`  | 一个主 `Store` 与多个客户端同步    |
| `SharedWorker` 多 Store 同步 | `AutoStoreSwitchSyncer`     | 在 `SharedWorker` 中管理多个 Store |
