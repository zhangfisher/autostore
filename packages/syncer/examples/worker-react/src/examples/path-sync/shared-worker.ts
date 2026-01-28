/**
 * 路径指定同步示例 - SharedWorker 代码
 *
 * 运行在 SharedWorker 中，管理一个中心化的 AutoStore
 * 支持路径指定的选择性同步
 */

import { AutoStoreBroadcastSyncer } from "@autostorejs/syncer";
import { WorkerTransport } from "@autostorejs/syncer";
import { store } from "./store";

// 将 store 挂载到全局，方便调试
(globalThis as any).store = store;

// 创建同步广播器
const broadcaster = new AutoStoreBroadcastSyncer(store, {
    autostart: true,
});

// 将 broadcaster 挂载到全局，方便调试
(globalThis as any).broadcaster = broadcaster;

console.log("[PathSync SharedWorker] AutoStore Broadcaster 已启动");

// 监听来自页签的连接
(self as any).addEventListener("connect", (event: any) => {
    const port = event.ports[0] as MessagePort;

    console.log("[PathSync SharedWorker] 收到新连接，正在初始化...");

    // 启动端口
    port.start();

    // 创建 transport
    const transport = new WorkerTransport({
        worker: port,
        autoConnect: true,
    });

    transport.once("connect", () => {
        console.log("[PathSync SharedWorker] transport 已连接");
        broadcaster.addTransport(transport);
        console.log(
            "[PathSync SharedWorker] 客户端已连接，当前连接数:",
            broadcaster.transports.size,
        );
    });
});
