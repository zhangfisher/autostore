/**
 * SharedWorker 示例 - 服务端代码
 *
 * 运行在 SharedWorker 中，管理一个中心化的 AutoStore
 * 与多个浏览器页签进行同步
 */

import { AutoStore } from 'autostore';
import { AutoStoreBroadcaster } from '@autostorejs/syncer';
import { WorkerTransport } from '@autostorejs/syncer/transports/worker';

// 创建主 store
const store = new AutoStore({
    count: 0,
    messages: [] as string[],
    // 计算属性：消息总数
    messageCount: (scope:any ) => scope.messages.length,
});

// 创建同步广播器
const broadcaster = new AutoStoreBroadcaster(store, {
    autoBroadcast: true
});

// 监听来自页签的连接
(self as any).addEventListener('connect', (event: any) => {
    const port = event.ports[0];

    // 创建 transport 并连接
    const transport = new WorkerTransport({
        worker: port,
        id: `client-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    });

    // 手动绑定消息监听，避免事件监听器冲突
    port.addEventListener('message', (event: MessageEvent) => {
        if (transport.handleRemoteOperate(event)) {
            return; // 是状态操作消息，已被处理
        }
        // 处理其他类型的消息
        console.log('[SharedWorker] 收到其他消息:', event.data);
    });

    broadcaster.connect(transport);

    console.log('[SharedWorker] 新客户端已连接，当前连接数:', broadcaster.clientCount);
});

console.log('[SharedWorker] AutoStore Broadcaster 已启动');
