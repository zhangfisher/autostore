/**
 * SharedWorker 示例 - 服务端代码
 *
 * 运行在 SharedWorker 中，管理一个中心化的 AutoStore
 * 与多个浏览器页签进行同步
 */

import { AutoStore } from "autostore";
import { AutoStoreBroadcaster } from "@autostorejs/syncer";
import { WorkerTransport } from "@autostorejs/syncer";

// 创建主 store
const store = new AutoStore({
    count: 0,
    messages: [] as string[],
    // 计算属性：消息总数
    messageCount: (scope) => scope.messages.length,
});

// 创建同步广播器
const broadcaster = new AutoStoreBroadcaster(store, {
    autostart: true,
    syncerOptions: {
        immediate: true, // 首次连接时推送当前状态
    },
});

console.log("[SharedWorker] AutoStore Broadcaster 已启动");

// 监听来自页签的连接
(self as any).addEventListener("connect", (event: any) => {
    const port = event.ports[0];

    console.log("[SharedWorker] 收到新连接，正在初始化...");

    // 创建 transport 并连接
    const transport = new WorkerTransport({
        worker: port,
        id: `client-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    });

    broadcaster.addTransport(transport);

    console.log("[SharedWorker] 客户端已连接，当前连接数:", broadcaster.clientCount);
});

// 模拟服务器端定时更新（可选）
let count = 0;
setInterval(() => {
    count++;
    console.log("[SharedWorker] 正在更新计数:", count);

    // 每隔 5 秒增加计数（模拟服务器推送）
    store.update((state) => {
        state.count = count;
    });

    console.log("[SharedWorker] 计数已更新，当前值:", store.state.count);
}, 5000);

console.log("[SharedWorker] 定时器已启动，每 5 秒更新一次计数");
