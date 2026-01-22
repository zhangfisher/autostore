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
    messageCount: (scope:any ) => scope.messages.length,
});

// 创建同步管理器
const syncManager = new AutoStoreSyncManager(store, {
    autoBroadcast: true,
    syncerOptions: {
        immediate: true, // 首次连接时推送当前状态
    },
});

// 监听来自页签的连接
(self as any).addEventListener('connect', (event: any) => {
    const port = event.ports[0];

    // 创建 transport 并连接
    const transport = new WorkerTransport({
        worker: port,
        id: `client-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    });

    syncManager.connect(transport);

    console.log('[SharedWorker] 新客户端已连接，当前连接数:', syncManager.clientCount);
});

// 模拟服务器端定时更新（可选）
setInterval(() => {
    // 每隔 5 秒增加计数（模拟服务器推送）
    store.update((state) => {
        state.count++;
    });
}, 2000);

console.log('[SharedWorker] AutoStore Sync Manager 已启动');
