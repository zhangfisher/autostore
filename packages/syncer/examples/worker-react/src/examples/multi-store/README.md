# 多 Store 同步示例

本示例演示如何使用 `AutoStoreSwitchSyncer` 实现 N-N 的状态同步。

## 📋 功能特性

- **多 Store 管理**：在 SharedWorker 中管理多个独立的 store（counter、todo、user）
- **按需同步**：每个页面可以创建多个本地 store，分别与 SharedWorker 中不同的 store 同步
- **自动路由**：SwitchSyncer 根据 `operate.id` 自动将消息路由到对应的 store
- **多页签协同**：打开多个页签，所有页签的状态会实时同步

## 🎯 使用场景

- **多租户应用**：每个租户有独立的状态
- **状态分区**：不同功能模块使用不同的 store
- **模块化应用**：将状态按业务逻辑拆分到不同的 store

## 🚀 运行示例

1. 启动开发服务器：
```bash
cd packages/syncer/examples/worker-react
bun run dev
```

2. 打开浏览器访问示例页面（需要打开多个页签来测试同步效果）

## 📁 文件结构

```
multi-store/
├── stores.ts           # 定义三个独立的 store
├── shared-worker.ts    # SharedWorker 代码，使用 AutoStoreSwitchSyncer
├── index.tsx          # React 组件，演示多 store 同步
└── README.md          # 本文件
```

## 💡 核心代码

### SharedWorker 端（shared-worker.ts）

```typescript
import { AutoStoreSwitchSyncer } from '@autostorejs/syncer';
import { WorkerTransport } from '@autostorejs/syncer';
import { counterStore, todoStore, userStore } from './stores';

// 创建 SwitchSyncer，管理多个 store
const switchSyncer = new AutoStoreSwitchSyncer([
    counterStore,
    todoStore,
    userStore
]);

// 监听来自页签的连接
self.addEventListener('connect', (event) => {
    const port = event.ports[0];
    port.start();

    const transport = new WorkerTransport({
        worker: port,
        autoConnect: true,
    });

    transport.once('connect', () => {
        // 将 transport 添加到 switchSyncer
        // 消息会自动路由到对应的 store
        switchSyncer.addTransport(transport);
    });
});
```

### 浏览器端（index.tsx）

```typescript
import { AutoStore } from 'autostore';
import { AutoStoreWorkerSyncer } from '@autostorejs/syncer';

const worker = new SharedWorker('./shared-worker.ts', {
    type: 'module',
});

// 创建本地 store
const counterStore = new AutoStore({ count: 0 }, { id: 'local-counter' });
const todoStore = new AutoStore({ todos: [] }, { id: 'local-todo' });
const userStore = new AutoStore({ user: {} }, { id: 'local-user' });

// 分别创建 syncer，使用 peers 选项指定要与哪个 store 同步
const counterSyncer = new AutoStoreWorkerSyncer(counterStore, worker, {
    peers: ['counter-store'],  // 与 SharedWorker 中的 counter-store 同步
});

const todoSyncer = new AutoStoreWorkerSyncer(todoStore, worker, {
    peers: ['todo-store'],  // 与 SharedWorker 中的 todo-store 同步
});

const userSyncer = new AutoStoreWorkerSyncer(userStore, worker, {
    peers: ['user-store'],  // 与 SharedWorker 中的 user-store 同步
});
```

## 🔑 关键概念

### AutoStoreSwitchSyncer

- **路由器角色**：管理多个 store，根据 `operate.id` 将消息路由到对应的 broadcaster
- **独立管理**：每个 store 有独立的 broadcaster，互不干扰
- **自动分发**：接收到 transport 连接后，自动将其添加到所有 broadcasters

### peers 选项

- `peers` 选项用于指定要与 SharedWorker 中的哪些 store 同步
- 可以指定多个 store id：`peers: ['store1', 'store2']`
- 使用 `'*'` 表示接受所有来源的消息

### operate.id

- `operate.id` 是目标 store 的唯一标识符
- SwitchSyncer 根据 `operate.id` 决定将消息路由到哪个 store
- 确保 store id 的唯一性和正确性非常重要

## 🎨 界面说明

示例包含三个独立的区域，每个对应一个 store：

1. **计数器 Store**：演示基础类型和计算属性的同步
2. **待办事项 Store**：演示数组操作的同步（增删改）
3. **用户信息 Store**：演示嵌套对象的同步

每个区域都有独立的操作按钮和实时状态显示。

## 📊 测试建议

1. 打开多个页签，观察状态同步效果
2. 在不同页签中操作不同的 store，验证独立性
3. 修改 SharedWorker 中的初始状态，观察同步效果
4. 查看控制台日志，了解消息路由过程

## 🔗 相关文档

- [AutoStoreSwitchSyncer API 文档](../../../../../src/syncers/switchSyncer.ts)
- [完整同步示例](../full-sync/)
- [路径同步示例](../path-sync/)
