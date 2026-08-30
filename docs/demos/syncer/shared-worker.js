/**
 * SharedWorker 服务端：
 * - demo 1（sharedWorkerSync）：单一 store，服务端定时递增 count 并推送给每个客户端，
 *   同时通过独立消息向客户端上报服务端状态快照（用于双面板对照展示）
 * - demo 2（broadcast1toN）：AutoStoreBroadcastSyncer 管理 1-N 广播，客户端可上推消息
 * - demo 3（switchNN）：AutoStoreSwitchSyncer 管理多个独立 store，按 operate.id 路由
 *
 * 通过 importScripts 加载文档站点的 iife 产物获得 AutoStore / AutoStoreSyncer 全局
 */
importScripts("/autostore/autostore.js", "/autostore/syncer.js");
const { AutoStore } = AutoStoreSpaces;
// 注意：syncer.js 的 iife 全局名就是 AutoStoreSyncer（var 声明），
// 不能再解构出同名的 const AutoStoreSyncer（重复声明 SyntaxError，SharedWorker 启动即崩且错误不可见）
const { AutoStoreBroadcastSyncer, AutoStoreSwitchSyncer, WorkerTransport } = AutoStoreSyncer;
const { AutoStoreSyncer: Syncer } = AutoStoreSyncer;

// ============ demo 1：单一 store，服务端定时推送 ============
const sharedStore = new AutoStore({ count: 0, serverTime: "" });
// demo 1 客户端端口集合（用于上报服务端状态快照）
const demo1Ports = new Set();
let lastSnap = "";
// 服务端状态变化后上报快照（自定义消息形状，与同步协议互不干扰；去重避免重复上报）
sharedStore.watch(() => {
    const snap = { count: sharedStore.state.count, serverTime: sharedStore.state.serverTime };
    const key = JSON.stringify(snap);
    if (key === lastSnap) return;
    lastSnap = key;
    demo1Ports.forEach((port) => port.postMessage({ __serverSnapshot: snap }));
});
setInterval(() => {
    sharedStore.state.count++;
    sharedStore.state.serverTime = new Date().toLocaleTimeString();
}, 1000);

// ============ demo 2：BroadcastSyncer 1-N ============
const broadcastStore = new AutoStore({
    count: 0,
    messages: [],
    // 消息总数在服务端主 Store 内原位计算，随状态一起同步到各客户端
    messageCount: (scope) => scope.messages.length,
});
const broadcaster = new AutoStoreBroadcastSyncer(broadcastStore, {
    autostart: true,
});
// 向 demo 2 客户端上报服务端主 Store 快照（自定义消息形状，与同步协议互不干扰；去重避免重复上报）
const demo2Ports = new Set();
let lastBroadcastSnap = "";
broadcastStore.watch(() => {
    const snap = broadcastStore.getSnap();
    const key = JSON.stringify(snap);
    if (key === lastBroadcastSnap) return;
    lastBroadcastSnap = key;
    demo2Ports.forEach((port) => port.postMessage({ __serverSnapshot: snap }));
});

// ============ demo 3：SwitchSyncer N-N（多个独立 store） ============
const counterStore = new AutoStore(
    { count: 0, doubleCount: (scope) => scope.count * 2 },
    { id: "counter-store" },
);
const chatStore = new AutoStore(
    { messages: [] },
    { id: "chat-store" },
);
const switchSyncer = new AutoStoreSwitchSyncer([counterStore, chatStore], {
    autostart: true,
});
// 向 switch 频道客户端上报服务端两个 store 的快照（自定义消息形状，与同步协议互不干扰；去重避免重复上报）
const demo3Ports = new Set();
let lastSwitchSnap = "";
const reportSwitch = () => {
    const snap = {
        "counter-store": counterStore.getSnap(),
        "chat-store": chatStore.getSnap(),
    };
    const key = JSON.stringify(snap);
    if (key === lastSwitchSnap) return;
    lastSwitchSnap = key;
    demo3Ports.forEach((port) => port.postMessage({ __serverSnapshot: snap }));
};
counterStore.watch(reportSwitch);
chatStore.watch(reportSwitch);

// 监听来自页签的连接，按首条消息的频道标记分流到对应的同步器
self.addEventListener("connect", (event) => {
    const port = event.ports[0];
    port.start();

    const transport = new WorkerTransport({ worker: port, autoConnect: true });
    let channel = null;
    let demo1Bound = false;
    port.addEventListener("message", (e) => {
        const data = e.data;
        if (data && data.__channel) {
            // 客户端声明接入的频道（首条消息）
            channel = data.__channel;
            if (channel === "broadcast") {
                broadcaster.addTransport(transport);
                demo2Ports.add(port);
            } else if (channel === "switch") {
                switchSyncer.addTransport(transport);
                demo3Ports.add(port);
            }
        } else if (!channel && !demo1Bound) {
            // 无频道标记的消息属于 demo 1 客户端：为该端口创建服务端推送 syncer
            // 注意：SharedWorkerGlobalScope 没有 postMessage/message，服务端 syncer 必须挂在 port 上而非 self
            demo1Bound = true;
            demo1Ports.add(port);
            new Syncer(sharedStore, {
                transport,
                mode: "push",
                direction: "forward",
            });
        }
    });
});
