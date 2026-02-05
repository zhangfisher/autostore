# 状态同步

`@autostorejs/syncer` 为 AutoStore 提供了完整的状态同步解决方案，支持多种场景下的数据同步。

## 概述

`@autostorejs/syncer` 提供了以下核心功能：

- **本地同步** - 同一应用内多个 AutoStore 之间的状态同步
- **跨页面同步** - 基于 BroadcastChannel API 的跨标签页状态同步
- **Worker 同步** - 与 Web Worker/SharedWorker 之间的状态同步
- **广播模式** - 一对多的状态广播场景
- **交换模式** - SharedWorker 中管理多个 Store 的 N 对 N 同步
- **心跳检测** - 自动检测连接状态，处理断线重连
- **路径映射** - 灵活的状态路径转换机制
- **过滤同步** - 精确控制需要同步的数据

::: tip 提示
同步功能由 `@autostorejs/syncer` 提供，只需导入即可启用 `store.sync()` 和 `store.clone()` 方法。
:::

## 快速入门

### 场景 1: 两个 Store 之间同步

实现同一应用内两个 AutoStore 之间的数据双向同步。当一个 Store 的状态发生变化时，另一个 Store 会自动更新，保持数据一致性。

**第 1 步：导入 syncer 包**

```ts
import '@autostorejs/syncer';
import { AutoStore } from 'autostore';
```

**第 2 步：创建两个 Store**

```ts
const store1 = new AutoStore({
    order: {
        name: 'fisher',
        price: 2,
        count: 3,
        total: (scope) => scope.price * scope.count,
    },
});

const store2 = new AutoStore({
    myorder: {},
});
```

**第 3 步：建立同步**

```ts
// 将 store1.state.order 同步到 store2.state.myorder
const syncer = store1.sync(store2, {
    local: 'order',    // 源路径（store1 的路径）
    remote: 'myorder'  // 目标路径（store2 的路径）
});

// 现在 store1.order 的变化会自动同步到 store2.myorder
store1.state.order.price = 10;
console.log(store2.state.myorder.price); // 10
```

### 场景 2: 跨标签页同步

实现多个浏览器标签页之间的状态同步。基于浏览器的 BroadcastChannel API，当任一标签页修改状态时，其他所有打开同一频道的标签页都会自动更新。适用于多标签页协同工作、实时数据共享等场景。

**第 1 步：导入 BroadcastChannel 同步器**

```ts
import { AutoStoreBroadcastChannelSyncer } from '@autostorejs/syncer';
import { AutoStore } from 'autostore';
```

**第 2 步：创建 Store 和同步器**

```ts
const store = new AutoStore({
    count: 0,
    user: { name: 'Alice' }
});

// 创建 BroadcastChannel 同步器
const syncer = new AutoStoreBroadcastChannelSyncer(
    store,
    'my-app-channel'  // 频道名称
);
```

**第 3 步：打开多个标签页**

```ts
// 所有打开同一频道的标签页状态会自动同步
store.state.count++;  // 会在所有标签页中同步
```

### 场景 3: 与 SharedWorker 同步

实现多个浏览器标签页与 SharedWorker 之间的状态同步。SharedWorker 作为中心服务器，可以管理多个独立的状态树，每个标签页可以选择性地同步特定的状态。适用于多租户应用、复杂状态管理、需要后台服务的场景。

**第 1 步：创建 SharedWorker 端代码**

```ts
// worker.ts
import { AutoStoreSwitchSyncer } from '@autostorejs/syncer';
import { WorkerTransport } from '@autostorejs/syncer';
import { AutoStore } from 'autostore';

// 创建多个 store
const userStore = new AutoStore({ user: { name: 'Alice' } }, { id: 'user-store' });
const cartStore = new AutoStore({ cart: [] }, { id: 'cart-store' });

// 创建 Switch 同步器管理多个 store
const switchSyncer = new AutoStoreSwitchSyncer([userStore, cartStore]);

// 监听连接
self.addEventListener('connect', (event) => {
    const port = event.ports[0];
    port.start();

    const transport = new WorkerTransport({
        worker: port,
        autoConnect: true,
    });

    switchSyncer.addTransport(transport);
});
```

**第 2 步：创建页面端代码**

```ts
// main.ts
import { AutoStoreWorkerSyncer } from '@autostorejs/syncer';
import { AutoStore } from 'autostore';

const worker = new SharedWorker(new URL('./worker.ts', import.meta.url), {
    type: 'module',
});

// 创建本地 store
const localStore = new AutoStore({ user: { name: 'Bob' } });

// 创建同步器，指定要与 SharedWorker 中的哪个 store 同步
const syncer = new AutoStoreWorkerSyncer(localStore, worker, {
    peers: ['user-store'],  // 指定目标 store
    mode: 'pull',            // 从 SharedWorker 拉取数据
    immediate: true,         // 连接后立即同步
});
```

## 指南

### 同步方向

同步方向决定了数据如何在不同 Store 之间流动：

```ts
const store1 = new AutoStore({ data: { value: 1 } });
const store2 = new AutoStore({ data: { value: 2 } });

// 双向同步（默认）
const syncer1 = store1.sync(store2, { direction: 'both' });
// store1 ↔ store2：任一方变化都会同步到另一方

// 仅前向同步
const syncer2 = store1.sync(store2, { direction: 'forward' });
// store1 → store2：只有 store1 的变化会同步到 store2

// 仅后向同步
const syncer3 = store1.sync(store2, { direction: 'backward' });
// store1 ← store2：只有 store2 的变化会同步到 store1
```

### 局部同步

通过 `local` 和 `remote` 选项指定同步的路径：

```ts
const store1 = new AutoStore({
    order: {
        price: 100,
        count: 2,
        total: (scope) => scope.price * scope.count,
    },
    user: {
        name: 'Alice',
    },
});

const store2 = new AutoStore({
    myorder: {},
});

// 将 store1.state.order 同步到 store2.state.myorder
store1.sync(store2, {
    local: 'order',    // store1 的源路径
    remote: 'myorder'  // store2 的目标路径
});
```

### 过滤同步

使用 `filter` 选项精确控制需要同步的数据：

```ts
const store1 = new AutoStore({
    data: {
        a: 1,
        b: 2,
        c: 3,
        d: 4,
    },
});

const store2 = new AutoStore({
    data: {},
});

// 只同步 a 和 c
store1.sync(store2, {
    filter: (path, value) => {
        // path 是路径数组，如 ['data', 'a']
        // value 是要同步的值
        return path[1] === 'a' || path[1] === 'c';
    },
});
```

### 路径映射

通过 `pathMap` 实现复杂的路径转换：

```ts
const fromStore = new AutoStore({
    order: {
        a: 1,
        b: 2,
        c: 3,
    },
});

const toStore = new AutoStore({
    myorder: {},
});

fromStore.sync(toStore, {
    to: 'myorder',
    pathMap: {
        // 接收到远程更新时，将路径映射到本地
        toLocal: (path, value) => {
            // 将 ['order.a'] 转换为 ['order', 'a']
            if (typeof value !== 'object') {
                return path[0].split('.');
            }
        },
        // 发送到远程时，将本地路径映射到远程
        toRemote: (path, value) => {
            // 将 ['order', 'a'] 转换为 ['order.a']
            if (typeof value !== 'object') {
                return [path.join('.')];
            }
        },
    },
});

// 同步后
// fromStore.state.order.a = 1
// toStore.state.myorder['order.a'] = 1
```

### 克隆 Store

`clone()` 方法创建一个 Store 的副本，并可选择是否保持同步：

```ts
const originalStore = new AutoStore({
    user: {
        name: 'Alice',
        age: 25,
    },
});

// 完全克隆，不同步
const clonedStore1 = originalStore.clone({ sync: 'none' });
// 或
const clonedStore2 = originalStore.clone();

// 克隆并保持双向同步
const clonedStore3 = originalStore.clone({ sync: 'both' });

// 克隆指定路径，前向同步
const clonedStore4 = originalStore.clone({
    entry: 'user',
    sync: 'forward',
});
```

### 控制同步

使用 `start()` 和 `stop()` 方法控制同步状态：

```ts
const store1 = new AutoStore({ data: {} });
const store2 = new AutoStore({ data: {} });

const syncer = store1.sync(store2, { autostart: false });

// 开始同步
syncer.start();

// 停止同步
syncer.stop();
```

### 同步模式

`mode` 选项控制初始化时的同步行为：

```ts
const store1 = new AutoStore({ data: { value: 1 } });
const store2 = new AutoStore({ data: { value: 2 } });

// push 模式：双方都向对方推送，会导致状态合并
store1.sync(store2, { mode: 'push' });
// 结果：store1.data 和 store2.data 都会包含两者的数据

// pull 模式：从对方拉取数据
store1.sync(store2, { mode: 'pull' });
// store1 会拉取 store2 的数据

// none 模式：不执行初始同步，只同步后续变更
store1.sync(store2, { mode: 'none' });
```

### Peers 过滤

`peers` 选项用于指定接受哪些来源的同步操作：

```ts
const store1 = new AutoStore({ id: 'store-1', data: {} });
const store2 = new AutoStore({ id: 'store-2', data: {} });
const store3 = new AutoStore({ id: 'store-3', data: {} });

// store1 只接受来自 store-2 的操作
store1.sync(store2, {
    peers: ['store-2'],  // 只接受 store-2 的操作
});

// 接受所有来源（默认）
store1.sync(store3, {
    peers: ['*'],  // 接受所有来源
});
```

### 心跳检测

心跳检测用于自动检测连接状态：

```ts
import { AutoStoreBroadcastChannelSyncer } from '@autostorejs/syncer';

const syncer = new AutoStoreBroadcastChannelSyncer(store, 'channel-name', {
    // Transport 层的心跳配置
    // 在 BroadcastChannelSyncer 内部会设置到 transport 上
});

// 当心跳超时时，会自动触发 disconnect 事件
syncer.transport.on('timeout', () => {
    console.log('连接超时');
});
```

### 缓存机制

当 Transport 不可用时，操作会被缓存到内存中：

```ts
const store1 = new AutoStore({ data: {} });
const store2 = new AutoStore({ data: {} });

const syncer = store1.sync(store2, {
    maxCacheSize: 100,  // 最大缓存数量，默认 100
});

// 当 transport 不可用时，操作会被缓存
// 当 transport 可用时，调用 flush() 发送缓存
syncer.flush();
```

### 开发自定义同步器

通过继承 `AutoStoreSyncTransportBase` 可以轻松开发自定义 Transport，实现基于 WebSocket、HTTP 等协议的状态同步。

#### 场景：WebSocket 同步

实现浏览器端的 AutoStore 与服务器端的 AutoStore 通过 WebSocket 进行双向同步。

**第 1 步：创建 WebSocket Transport**

```ts
// websocket-transport.ts
import { AutoStoreSyncTransportBase } from '@autostorejs/syncer';
import type { StateRemoteOperate } from '@autostorejs/syncer';

export type WebSocketTransportOptions = {
    url: string;              // WebSocket 服务器地址
    autoConnect?: boolean;    // 是否自动连接
    heartbeat?: number;       // 心跳间隔（毫秒）
};

export class WebSocketTransport extends AutoStoreSyncTransportBase<WebSocketTransportOptions> {
    private ws?: WebSocket;
    private messageHandler?: (event: MessageEvent) => void;

    /**
     * 建立 WebSocket 连接
     */
    protected onConnect(): boolean {
        try {
            this.ws = new WebSocket(this.options.url);

            // 监听连接打开
            this.ws.addEventListener('open', () => {
                // 连接成功，触发 connect 事件
                this.emit('connect', undefined, true);
            });

            // 监听消息
            this.messageHandler = (event: MessageEvent) => {
                this.onReceiveOperate(JSON.parse(event.data));
            };
            this.ws.addEventListener('message', this.messageHandler);

            // 监听错误
            this.ws.addEventListener('error', (error) => {
                this.emit('error', error as Error);
            });

            // 监听关闭
            this.ws.addEventListener('close', () => {
                this.connected = false;
                this.emit('disconnect', undefined, true);
            });

            return true;
        } catch (error) {
            this.emit('error', error as Error);
            return false;
        }
    }

    /**
     * 断开 WebSocket 连接
     */
    protected onDisconnect(): void {
        if (this.ws) {
            if (this.messageHandler) {
                this.ws.removeEventListener('message', this.messageHandler);
                this.messageHandler = undefined;
            }
            this.ws.close();
            this.ws = undefined;
        }
    }

    /**
     * 发送操作到 WebSocket
     */
    protected onSendOperate(operate: StateRemoteOperate): void {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify(operate));
        }
    }
}
```

**第 2 步：浏览器端使用**

```ts
// browser.ts
import { AutoStore } from 'autostore';
import { AutoStoreSyncer } from '@autostorejs/syncer';
import { WebSocketTransport } from './websocket-transport';

const store = new AutoStore({
    user: { name: 'Alice', age: 25 },
    count: 0,
});

// 创建 WebSocket Transport
const transport = new WebSocketTransport({
    url: 'ws://localhost:8080',
    autoConnect: false,
    heartbeat: 3000,  // 3秒心跳
});

// 连接 WebSocket
await transport.connect();

// 创建同步器
const syncer = new AutoStoreSyncer(store, {
    transport,
    mode: 'pull',        // 从服务器拉取初始状态
    immediate: true,     // 连接后立即同步
    direction: 'both',   // 双向同步
});

// 监听连接状态
transport.on('connect', () => {
    console.log('已连接到服务器');
});

transport.on('disconnect', () => {
    console.log('与服务器断开连接');
});

transport.on('error', (error) => {
    console.error('连接错误:', error);
});

// 现在可以修改状态，会自动同步到服务器
store.state.count++;
```

**第 3 步：服务器端使用（Node.js + ws）**

```ts
// server.ts
import { AutoStore } from 'autostore';
import { AutoStoreSyncer } from '@autostorejs/syncer';
import { WebSocket } from 'ws';
import { WebSocketTransport } from './websocket-transport';

const store = new AutoStore({
    user: { name: 'Server', age: 30 },
    count: 0,
});

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws: WebSocket) => {
    console.log('客户端已连接');

    // 创建适配 WebSocket 的 Transport
    // 注意：ws 库的 WebSocket 实现与浏览器略有不同
    const transport = new WebSocketTransport({
        url: 'custom',  // 已有连接，不需要 url
    });

    // 手动连接（覆盖 onConnect）
    transport.connected = true;
    transport.emit('connect', undefined, true);

    // 手动处理消息接收
    ws.on('message', (data: string) => {
        const operate = JSON.parse(data);
        transport.onReceiveOperate(operate);
    });

    // 重写发送方法
    transport.on('send', (operate: any) => {
        ws.send(JSON.stringify(operate));
    } as any);

    // 创建同步器
    const syncer = new AutoStoreSyncer(store, {
        transport,
        direction: 'both',
    });

    // 监听断开
    ws.on('close', () => {
        syncer.stop();
        transport.disconnect();
        console.log('客户端已断开');
    });
});
```

#### 核心要点

开发自定义 Transport 需要实现以下方法：

```ts
class MyTransport extends AutoStoreSyncTransportBase {

    // 1. 建立连接
    protected onConnect(): boolean | Promise<boolean> {
        // 初始化连接
        // 绑定消息监听器
        // 返回 true 表示成功
        return true;
    }

    // 2. 断开连接
    protected onDisconnect(): void {
        // 清理资源
        // 移除监听器
    }

    // 3. 发送操作
    protected onSendOperate(operate: StateRemoteOperate): void {
        // 将 operate 发送到远程
        // 例如: ws.send(JSON.stringify(operate))
    }

    // 4. 接收操作（在 onConnect 中调用）
    protected onReceiveOperate(operate: StateRemoteOperate): boolean {
        // 调用父类方法，自动分发给所有 receivers
        return super.onReceiveOperate(operate);
    }
}
```

#### 注意事项

1. **消息序列化**：WebSocket 传输的是字符串，需要使用 `JSON.stringify()` 和 `JSON.parse()`
2. **连接状态管理**：正确设置 `this.connected`，触发 `connect` 和 `disconnect` 事件
3. **错误处理**：使用 `this.emit('error', error)` 触发错误事件
4. **心跳检测**：通过 `heartbeat` 选项启用，框架会自动处理 `$ping` 和 `$pong`
5. **服务器端适配**：不同环境（Node.js、浏览器）的 WebSocket 实现可能不同，需要适当调整

## 参考

### 同步器

#### AutoStoreSyncer

基础同步器，用于两个 AutoStore 之间的同步。

```ts
import '@autostorejs/syncer';

const store1 = new AutoStore({ data: {} });
const store2 = new AutoStore({ data: {} });

const syncer = store1.sync(store2, {
    // 同步方向
    direction: 'both',      // 'both' | 'forward' | 'backward'

    // 同步模式
    mode: 'push',           // 'push' | 'pull' | 'none' | 'both'

    // 路径配置
    local: 'path',          // 本地路径（string | string[]）
    remote: 'path',         // 远程路径（string | string[]）

    // 过滤
    filter: (path, value) => true,

    // 路径映射
    pathMap: {
        toLocal: (path, value) => path,
        toRemote: (path, value) => path,
    },

    // 初始同步
    immediate: true,        // 是否立即同步

    // 缓存
    maxCacheSize: 100,

    // Peers 过滤
    peers: ['*'],           // 接受所有来源

    // 钩子
    onSend: (operate) => true,      // 返回 false 阻止发送
    onReceive: (operate) => true,   // 返回 false 阻止接收

    // 调试
    debug: false,          // 启用调试事件
});

// 方法
syncer.start();            // 开始同步
syncer.stop();             // 停止同步
syncer.push();             // 推送本地状态到远程
syncer.pull();             // 从远程拉取状态
syncer.flush();            // 发送缓存的操作

// 事件
syncer.on('start', () => {});
syncer.on('stop', () => {});
syncer.on('error', (err) => {});
syncer.on('syncing', (id) => {});  // 完成首次同步
syncer.on('remoteOperate', (op) => {});  // debug=true 时
syncer.on('localOperate', (op) => {});   // debug=true 时
```

#### AutoStoreBroadcastChannelSyncer

基于 BroadcastChannel 的跨页面同步器。

```ts
import { AutoStoreBroadcastChannelSyncer } from '@autostorejs/syncer';

const syncer = new AutoStoreBroadcastChannelSyncer(
    store,
    'channel-name',  // 频道名称
    {
        mode: 'pull',              // 默认: pull
        immediate: true,           // 默认: true
        direction: 'both',         // 默认: both
        peers: ['remote-store-id'],
        // ... 其他选项同 AutoStoreSyncer
    }
);
```

**特性：**
- 点对点通信，所有页面平等
- 默认使用 `pull` 模式避免状态覆盖
- 新页面从已有页面拉取状态
- 后续变更自动同步到所有页面

#### AutoStoreWorkerSyncer

基于 Worker/SharedWorker 的同步器。

```ts
import { AutoStoreWorkerSyncer } from '@autostorejs/syncer';

const worker = new SharedWorker('./worker.ts', { type: 'module' });

const syncer = new AutoStoreWorkerSyncer(
    store,
    worker,  // Worker 或 SharedWorker 实例
    {
        peers: ['remote-store-id'],  // 目标 store 的 id
        mode: 'pull',
        immediate: true,
        direction: 'both',
        // ... 其他选项
    }
);
```

**特性：**
- 自动处理 SharedWorker 的 `port.start()`
- 使用 `peers` 指定目标 store
- 与 AutoStoreSwitchSyncer 配合实现多 Store 管理

#### AutoStoreBroadcastSyncer

广播器，用于管理一个主 Store 与多个客户端之间的同步（1 对 N）。

```ts
import { AutoStoreBroadcastSyncer } from '@autostorejs/syncer';
import { WorkerTransport } from '@autostorejs/syncer';

// 在 SharedWorker 中创建主 Store
const mainStore = new AutoStore({
    count: 0,
    messages: [],
});

const broadcaster = new AutoStoreBroadcastSyncer(mainStore, {
    autostart: true,     // 自动开始广播
    heartbeat: 3000,     // 心跳间隔
});

// 监听客户端连接
self.addEventListener('connect', (event) => {
    const port = event.ports[0];
    const transport = new WorkerTransport({
        worker: port,
        autoConnect: true,
    });

    broadcaster.addTransport(transport);
});

// 方法
broadcaster.start();                    // 开始广播
broadcaster.stop();                     // 停止广播
broadcaster.addTransport(transport);    // 添加客户端
broadcaster.removeTransport(id);        // 移除客户端
broadcaster.broadcast(operate);         // 广播操作
broadcaster.sendTo(clientId, operate);  // 发送给指定客户端
broadcaster.destroy();                  // 销毁广播器
```

**架构：**
```
客户端1 ──┐
客户端2 ──┼──→ Broadcaster → MainStore
客户端3 ──┘
```

#### AutoStoreSwitchSyncer

交换器，用于在 SharedWorker 中管理多个 Store 的 N 对 N 同步。

```ts
import { AutoStoreSwitchSyncer } from '@autostorejs/syncer';
import { WorkerTransport } from '@autostorejs/syncer';

// 创建多个 store
const store1 = new AutoStore({ user: {} }, { id: 'user-store' });
const store2 = new AutoStore({ cart: [] }, { id: 'cart-store' });

// 创建 Switch 同步器
const switchSyncer = new AutoStoreSwitchSyncer([store1, store2], {
    autostart: true,
    debug: false,
});

// 监听连接
self.addEventListener('connect', (event) => {
    const port = event.ports[0];
    const transport = new WorkerTransport({
        worker: port,
        autoConnect: true,
    });

    switchSyncer.addTransport(transport);
});

// 方法
switchSyncer.add(store);              // 添加 store
switchSyncer.remove(storeId);         // 移除 store
switchSyncer.getStore(storeId);       // 获取 store
switchSyncer.getStoreIds();           // 获取所有 store id
switchSyncer.addTransport(transport); // 添加传输器
switchSyncer.removeTransport(id);     // 移除传输器
switchSyncer.start();                 // 启动同步
switchSyncer.stop();                  // 停止同步
switchSyncer.destroy();               // 销毁
```

**架构：**
```
SharedWorker:
  Store1 (id: 'user-store')  ←→  Transport1 → 页签1
  Store2 (id: 'cart-store')  ←→  Transport2 → 页签2
```

### Transport

#### AutoStoreSyncTransportBase

Transport 基类，定义了传输层的接口。

```ts
interface TransportEvents {
    connect: void;        // 连接建立
    disconnect: void;     // 连接断开
    operate: StateRemoteOperate;  // 接收到操作
    error: Error;         // 发生错误
    timeout: void;        // 心跳超时
}

interface TransportOptions {
    debug?: boolean;      // 调试模式
    autoConnect?: boolean; // 自动连接
    heartbeat?: number;   // 心跳间隔
}
```

#### WorkerTransport

基于 Web Worker 的传输器。

```ts
import { WorkerTransport } from '@autostorejs/syncer';

const transport = new WorkerTransport({
    worker: worker,        // Worker 或 SharedWorker 实例
    id: 'main-thread',
    autoConnect: false,
    debug: false,
});

// 连接
await transport.connect();

// 发送操作
transport.send({
    id: 'store-id',
    type: 'set',
    path: ['data'],
    value: { key: 'value' },
    flags: 0,
});

// 断开连接
transport.disconnect();

// 事件
transport.on('connect', () => {});
transport.on('disconnect', () => {});
transport.on('error', (err) => {});
transport.on('timeout', () => {});

// 添加接收器
transport.addReceiver('receiver-id', (operate) => {
    console.log('收到操作:', operate);
});
```

**接口定义：**
```ts
interface IWorker {
    postMessage(message: any, transfer?: any[]): void;
    addEventListener(type: string, listener: (event: MessageEvent) => void): void;
    removeEventListener(type: string, listener: (event: MessageEvent) => void): void;
    terminate?: () => void;
    port?: {  // SharedWorker port
        start?: () => void;
        postMessage(message: any, transfer?: any[]): void;
        addEventListener(type: string, listener: (event: MessageEvent) => void): void;
        removeEventListener(type: string, listener: (event: MessageEvent) => void): void;
    };
}
```

#### BroadcastChannelTransport

基于 BroadcastChannel API 的传输器。

```ts
import { BroadcastChannelTransport } from '@autostorejs/syncer';

const transport = new BroadcastChannelTransport({
    channelName: 'my-channel',
    autoConnect: false,
});

// 连接
await transport.connect();

// 发送和接收同 WorkerTransport
transport.send(operate);
transport.addReceiver('id', callback);

// 断开
transport.disconnect();
```

#### LocalTransport

本地传输器，用于同一进程内的两个 Store 同步。

```ts
import { LocalTransport } from '@autostorejs/syncer';

// 创建相互连接的两个 transport
let transport1: LocalTransport;
let transport2: LocalTransport;

transport1 = new LocalTransport(() => transport2);
transport2 = new LocalTransport(() => transport1);

// 使用方式同其他 transport
```

### 类型定义

#### StateRemoteOperate

远程操作类型：

```ts
type StateRemoteOperate<Value = any> = {
    id: string;                          // 操作来源的 store id
    type: StateOperateType |             // 操作类型
          '$stop' | '$push' | '$pull' | // 同步指令
          '$update' | '$error' |
          '$ping' | '$pong';             // 心跳
    path: string[];                      // 操作路径
    value: Value;                        // 操作值
    indexs?: number[];                   // 数组索引
    parentPath?: string[];               // 父路径
    reply?: boolean;                     // 是否需要回复
    flags: number;                       // 标记位
};
```

#### AutoStoreSyncerOptions

同步器配置选项：

```ts
type AutoStoreSyncerOptions = {
    // 同步模式
    mode?: 'push' | 'pull' | 'none' | 'both';

    // 标识
    id?: string;

    // 路径配置
    local?: string[] | string;     // 本地路径
    remote?: string[] | string;    // 远程路径

    // Transport
    transport?: AutoStoreSyncTransportBase;

    // 控制选项
    autostart?: boolean;           // 自动开始
    immediate?: boolean;           // 立即同步

    // 同步方向
    direction?: 'both' | 'forward' | 'backward';

    // 过滤
    filter?: (path: string[], value: any) => boolean;

    // 缓存
    maxCacheSize?: number;

    // 钩子
    onSend?: (operate: StateRemoteOperate) => boolean | void;
    onReceive?: (operate: StateRemoteOperate) => boolean | void;

    // 路径映射
    pathMap?: {
        toLocal?: (path: string[], value: any) => string[] | undefined;
        toRemote?: (path: string[], value: any) => string[] | undefined;
    };

    // Peers 过滤
    peers?: string[];              // '*' 表示接受所有来源

    // 调试
    debug?: boolean;
};
```

## 示例

### 基本同步

<demo react="store/syncStore.tsx"/>

### 路径映射

<demo react="store/syncStoreWithPathMap.tsx"/>

### 路径映射（immediate=true）

<demo react="store/syncStoreWithPathMap2.tsx"/>

::: warning 注意
计算属性支持同步，但由于计算属性的函数无法被序列化，只会同步计算属性的值。如果计算属性依赖的值被修改，同步方的对应计算属性也会更新。
:::
