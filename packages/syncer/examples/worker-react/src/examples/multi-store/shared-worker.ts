/**
 * 多 Store 同步示例 - SharedWorker 代码
 *
 * 使用 AutoStoreSwitchSyncer 管理多个独立的 AutoStore
 * 实现浏览器页签与 SharedWorker 之间的 N-N 状态同步
 *
 * ╔═══════════════════════════════════════════════════════════════════╗
 * ║                    AutoStoreSwitchSyncer 架构                      ║
 * ╠═══════════════════════════════════════════════════════════════════╣
 * ║  SharedWorker                                                       ║
 * ║  ┌─────────────────────────────────────────────────────────────┐   ║
 * ║  │ AutoStoreSwitchSyncer                                       │   ║
 * ║  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │   ║
 * ║  │  │Counter Store │  │  Todo Store  │  │  User Store  │      │   ║
 * ║  │  │  (计数器)    │  │  (待办事项)  │  │  (用户信息)  │      │   ║
 * ║  │  └──────────────┘  └──────────────┘  └──────────────┘      │   ║
 * ║  └─────────────────────────────────────────────────────────────┘   ║
 * ╚═══════════════════════════════════════════════════════════════════╝
 *                              ↕ (消息路由)
 * ╔═══════════════════════════════════════════════════════════════════╗
 * ║  浏览器页签1/2/3/...                                              ║
 * ║  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          ║
 * ║  │LocalCounter  │  │ LocalTodo    │  │  LocalUser   │          ║
 * ║  │    Store     │  │   Store      │  │    Store     │          ║
 * ║  └──────────────┘  └──────────────┘  └──────────────┘          ║
 * ╚═══════════════════════════════════════════════════════════════════╝
 */

import { AutoStoreSwitchSyncer } from "@autostorejs/syncer";
import { WorkerTransport } from "@autostorejs/syncer";
import { counterStore, todoStore, userStore } from "./stores";

// 创建 AutoStoreSwitchSyncer，管理多个 store
const switchSyncer = new AutoStoreSwitchSyncer(
    [counterStore, todoStore, userStore],
    {
        autostart: true,
    }
);

// 将 switchSyncer 挂载到全局，方便调试
(globalThis as any).switchSyncer = switchSyncer;
(globalThis as any).counterStore = counterStore;
(globalThis as any).todoStore = todoStore;
(globalThis as any).userStore = userStore;

console.log(
    "[MultiStore SharedWorker] AutoStoreSwitchSyncer 已启动",
    switchSyncer.toString()
);
console.log("[MultiStore SharedWorker] 管理的 stores:", switchSyncer.getStoreIds());

// 监听来自页签的连接
(self as any).addEventListener("connect", (event: any) => {
    const port = event.ports[0] as MessagePort;

    console.log(
        "[MultiStore SharedWorker] 收到新连接，正在初始化 transport..."
    );

    // 启动端口
    port.start();

    // 创建 transport
    const transport = new WorkerTransport({
        worker: port,
        autoConnect: true,
    });

    // 监听 transport 连接事件
    transport.once("connect", () => {
        console.log(
            "[MultiStore SharedWorker] Transport 已连接，添加到 switchSyncer"
        );

        // 将 transport 添加到 switchSyncer
        // switchSyncer 会自动根据消息的 id 字段路由到对应的 store
        switchSyncer.addTransport(transport);

        console.log(
            "[MultiStore SharedWorker] Transport 已添加，当前可同步的 stores:",
            switchSyncer.getStoreIds().join(", ")
        );
    });

    // 监听 transport 断开事件
    transport.on("disconnect", () => {
        console.log("[MultiStore SharedWorker] Transport 已断开连接");
        switchSyncer.removeTransport(transport.id);
    });

    // 监听错误
    transport.on("error", (error: Error) => {
        console.error("[MultiStore SharedWorker] Transport 错误:", error);
    });
});

console.log(
    "[MultiStore SharedWorker] 等待浏览器页签连接... (可以打开多个页签测试同步)"
);
