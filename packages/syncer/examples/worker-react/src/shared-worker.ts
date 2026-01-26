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
    messageCount: (scope:any) => scope.messages.length,
    // 数组示例：待办事项列表
    todos: [] as Array<{ id: number; text: string; completed: boolean }>,
    // 对象示例：用户信息
    user: {
        name: '张三',
        age: 30,
        email: 'zhangsan@example.com',
        address: {
            city: '北京',
            district: '朝阳区',
            detail: '某某街道123号',
        },
    },
}, {
    id: 'shared-worker-store', // 指定固定的 store ID
});

// 将 store 挂载到全局，方便调试
(globalThis as any).store = store;

// 创建同步广播器
const broadcaster = new AutoStoreBroadcaster(store, {
    autoBroadcast: true,
});

// 将 broadcaster 挂载到全局，方便调试
(globalThis as any).broadcaster = broadcaster;

// 监听 count 变化，用于调试
store.watch('count', ({ value }) => {
    console.log('[SharedWorker] count 变化:', value);
});

console.log('[SharedWorker] AutoStore Broadcaster 已启动');

// 监听来自页签的连接
(self as any).addEventListener('connect', (event: any) => {
    const port = event.ports[0];

    console.log('[SharedWorker] 收到新连接，正在初始化...');

    // 启动端口（SharedWorker 中的 MessagePort 需要显式启动）
    port.start();

    // 创建 transport
    const transport = new WorkerTransport({
        worker: port,
        id: `client-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    });

    // 先连接 transport，然后再连接到 syncManager
    transport.connect().then(() => {
        console.log('[SharedWorker] transport 已连接');

        // 连接到 broadcaster
        broadcaster.connect(transport);

        console.log('[SharedWorker] 客户端已连接，当前连接数:', broadcaster.clientCount);
    });
});
