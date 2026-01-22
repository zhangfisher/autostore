# AutoStore SharedWorker 同步示例

这个示例演示了如何使用 `AutoStoreSyncManager` 和 `AutoStoreSyncer` 实现 SharedWorker 与多个浏览器页签之间的状态同步。

## 架构说明

```
┌─────────────────────────────────────────────────────────────┐
│                     SharedWorker                             │
│  ┌─────────────────────────────────────────────────────┐    │
│  │          AutoStore (服务端)                           │    │
│  │  ┌──────────────────────────────────────────────┐   │    │
│  │  │  count: 0                                     │   │    │
│  │  │  messages: []                                 │   │    │
│  │  │  messageCount: (scope) => ...                 │   │    │
│  │  └──────────────────────────────────────────────┘   │    │
│  └─────────────────────────────────────────────────────┘    │
│                          ▲                                   │
│                          │                                   │
│  ┌───────────────────────┼───────────────────────────────┐  │
│  │          AutoStoreSyncManager                         │  │
│  │  • 管理多个客户端连接                                  │  │
│  │  • 自动广播状态变化                                    │  │
│  │  • 处理客户端连接/断开                                 │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                          │
                          │ WorkerTransport
                          │
        ┌─────────────────┼─────────────────┐
        │                 │                 │
        ▼                 ▼                 ▼
   ┌─────────┐      ┌─────────┐      ┌─────────┐
   │ 页签 1  │      │ 页签 2  │      │ 页签 3  │
   │         │      │         │      │         │
   │AutoStore│      │AutoStore│      │AutoStore│
   │  +      │      │  +      │      │  +      │
   │Syncer   │      │Syncer   │      │Syncer   │
   └─────────┘      └─────────┘      └─────────┘
```

## 文件结构

```
packages/syncer/examples/
├── shared-worker/
│   └── worker.ts           # SharedWorker 服务端代码
│
└── worker-react/           # React 客户端示例
    ├── src/
    │   ├── App.tsx         # 主应用组件
    │   ├── main.tsx        # 入口文件
    │   └── index.css       # 样式文件
    ├── index.html          # HTML 模板
    ├── vite.config.ts      # Vite 配置
    ├── tsconfig.json       # TypeScript 配置
    └── package.json        # 依赖配置
```

## 运行示例

### 1. 安装依赖

```bash
# 在 syncer 目录下
cd packages/syncer

# 安装示例依赖
cd examples/worker-react
bun install
```

### 2. 启动开发服务器

```bash
bun run dev
```

### 3. 访问应用

打开浏览器访问 `http://localhost:3000`

**提示：打开多个页签可以看到状态同步效果！**

## 功能说明

### SharedWorker 服务端 ([`shared-worker/worker.ts`](shared-worker/worker.ts))

- 创建一个中心化的 `AutoStore` 实例
- 使用 `AutoStoreSyncManager` 管理多个客户端连接
- 监听 `connect` 事件处理新的页签连接
- 每隔 5 秒自动递增计数器，模拟服务端推送

### React 客户端 ([`worker-react/src/App.tsx`](worker-react/src/App.tsx))

- 创建本地 `AutoStore` 实例
- 使用 `WorkerTransport` 连接到 SharedWorker
- 创建 `AutoStoreSyncer` 进行状态同步
- 显示同步状态和日志

## 核心概念

### AutoStoreSyncManager

用于在 SharedWorker 中管理一个 AutoStore 与多个浏览器页签之间的同步：

```typescript
const store = new AutoStore({ count: 0, messages: [] });
const syncManager = new AutoStoreSyncManager(store);

// 监听连接
self.addEventListener('connect', (event) => {
    const port = event.ports[0];
    const transport = new WorkerTransport({ worker: port });
    syncManager.connect(transport);
});
```

### AutoStoreSyncer

用于在浏览器页签中与 SharedWorker 进行同步：

```typescript
const store = new AutoStore({ count: 0, messages: [] });
const sharedWorker = new SharedWorker('./worker.ts');

const transport = new WorkerTransport({
    worker: sharedWorker.port,
    id: 'tab-123'
});

const syncer = new AutoStoreSyncer(store, {
    transport,
    direction: 'backward', // 只接收服务端更新
    immediate: true,        // 首次连接时同步当前状态
});
```

## 配置选项

### AutoStoreSyncManagerOptions

- `autoBroadcast`: 是否自动广播状态变化（默认：true）
- `syncerOptions`: 创建每个客户端 syncer 时的默认选项

### AutoStoreSyncerOptions

- `direction`: 同步方向
  - `'both'`: 双向同步
  - `'forward'`: 仅发送
  - `'backward'`: 仅接收
- `immediate`: 是否在首次连接时进行同步
- `transport`: 传输层对象

## 扩展功能

### 双向同步

如果需要客户端也能发送更新到服务端，可以修改 `direction`：

```typescript
const syncer = new AutoStoreSyncer(store, {
    transport,
    direction: 'both',  // 双向同步
    immediate: true,
});
```

### 过滤同步路径

使用 `filter` 选项过滤需要同步的路径：

```typescript
const syncer = new AutoStoreSyncer(store, {
    transport,
    filter: (path, value) => {
        // 只同步 count 路径
        return path[0] === 'count';
    },
});
```

### 路径映射

使用 `pathMap` 进行路径转换：

```typescript
const syncer = new AutoStoreSyncer(store, {
    transport,
    pathMap: {
        toLocal: (path) => {
            // 将服务端的 remote.data 映射到本地的 data
            if (path[0] === 'remote') return path.slice(1);
            return path;
        },
        toRemote: (path) => {
            // 将本地的 data 映射到服务端的 remote.data
            return ['remote', ...path];
        },
    },
});
```

## 注意事项

1. **浏览器兼容性**：SharedWorker 在某些浏览器（如 Firefox）中默认禁用，需要在 `about:config` 中启用

2. **CORS**：确保 SharedWorker 脚本与页面同源，或正确配置 CORS

3. **调试**：可以使用浏览器的开发者工具查看 SharedWorker 的控制台输出

4. **内存管理**：当页签关闭时，syncer 会自动断开连接，SharedWorker 会清理对应的资源
