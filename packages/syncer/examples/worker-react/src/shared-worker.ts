/**
 * SharedWorker 示例 - 服务端代码
 *
 * 运行在 SharedWorker 中，管理一个中心化的 AutoStore
 * 与多个浏览器页签进行同步
 */

import { AutoStore } from 'autostore';
import { AutoStoreSyncManager } from '@autostorejs/syncer';
import { WorkerTransport } from '@autostorejs/syncer/transports/worker';

// 创建主 store
const store = new AutoStore({
    count: 0,
    messages: [] as string[],
    // 计算属性：消息总数
    messageCount: (scope) => scope.messages.length,
});

// 将 store 挂载到全局，方便调试
(globalThis as any).store = store;

// 创建同步管理器
const syncManager = new AutoStoreSyncManager(store, {
    autoBroadcast: true,
    syncerOptions: {
        immediate: false, // manager 端不需要立即同步，避免循环推送
    },
});

// 将 syncManager 挂载到全局，方便调试
(globalThis as any).syncManager = syncManager;

// 监听 count 变化，用于调试
store.watch('count', ({ value }) => {
    console.log('[SharedWorker] count 变化:', value);
});

console.log('[SharedWorker] AutoStore Sync Manager 已启动');

// 监听来自页签的连接
(self as any).addEventListener('connect', (event: any) => {
    const port = event.ports[0];

    console.log('[SharedWorker] 收到新连接，正在初始化...');

    // 启动端口（SharedWorker 中的 MessagePort 需要显式启动）
    port.start();

    // 创建 transport 并连接
    const transport = new WorkerTransport({
        worker: port,
        id: `client-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    });

    syncManager.connect(transport);

    console.log('[SharedWorker] 客户端已连接，当前连接数:', syncManager.clientCount);
    console.log('[SharedWorker] transport ready:', transport.ready);
});
