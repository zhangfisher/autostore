// 快速入门：与 WebWorker 同步
// 主线程与 Worker 线程各持有一个 Store 双向同步：
// - 主线程改 count → 同步到 Worker → Worker 计算并写回 result = count * 2 → 再同步回主线程
// - Worker 通过独立的 postMessage 通道实时上报内部状态快照，双面板对照观察两侧变化
// - 开启 debug 后 syncer 提供 localOperate / remoteOperate 事件，用于渲染数据流动日志
import { createStore } from '@autostorejs/react';
import { AutoStoreWorkerSyncer } from '@autostorejs/syncer';
import React, { useEffect, useState } from 'react';
import { Button, Layout, JsonView, Box, List } from 'x-react-components';

// Worker 内联源码：加载文档站点的 iife 产物在 Worker 内构建全局环境，避免模块路径问题
// 注意：Blob Worker 的 base 是 blob: scheme，importScripts 不能用站内根相对路径，
// 必须用 new URL(path, origin) 解析出绝对 URL，否则抛 "The URL is invalid" SyntaxError
const workerCode = `
    importScripts(
        new URL('/autostore/autostore.js', self.location.origin).href,
        new URL('/autostore/syncer.js', self.location.origin).href
    );
    const { AutoStore } = AutoStoreSpaces;
    const { AutoStoreWorkerSyncer } = AutoStoreSyncer;
    // Worker 线程的 store：监听主线程变化，计算后写回（写回会同步到主线程）
    const store = new AutoStore({ count: 0, result: 0 });
    new AutoStoreWorkerSyncer(store, self, { mode: 'both', immediate: true });
    store.watch(() => {
        store.state.result = store.state.count * 2;
    });
    // 状态变化后向主线程上报内部快照（自定义消息形状，与同步协议互不干扰）
    // 主线程发来 __reportSnapshot 时也重发一次，用于组件挂载晚于首次变化的场景
    let lastSnap = '';
    const report = () => {
        const snap = { count: store.state.count, result: store.state.result };
        const key = JSON.stringify(snap);
        if (key !== lastSnap) {
            lastSnap = key;
            postMessage({ __workerSnapshot: snap });
        }
    };
    store.watch(report);
    self.addEventListener('message', (e) => {
        if (e.data && e.data.__reportSnapshot) report();
    });
`;

const workerUrl = URL.createObjectURL(new Blob([workerCode], { type: 'application/javascript' }));
const worker = new Worker(workerUrl);

const store = createStore({ count: 0, result: 0 });

const logs: string[] = [];
const log = (msg: string) => logs.push(`${new Date().toLocaleTimeString()}  ${msg}`);

// 主线程：与 Worker 双向同步，开启 debug 以获得 localOperate / remoteOperate 事件
const syncer = new AutoStoreWorkerSyncer(store, worker, {
    mode: 'both',
    immediate: true,
    debug: true,
});
// 发送：本地写操作即将同步到 Worker（flags < 0 的是远程应用回来的写入，跳过避免日志重复）
syncer.on('localOperate', (op: any) => {
    if ((op.flags || 0) < 0) return;
    log(`▶ 发送  ${op.type} ${op.path.join('.')} = ${JSON.stringify(op.value)}  ──►  Worker`);
});
// 接收：来自 Worker 的写操作已应用到主线程（result 的写回在这里可见）
syncer.on('remoteOperate', (op: any) => {
    log(`◀ 接收  ${op.type} ${op.path.join('.')} = ${JSON.stringify(op.value)}  ◄──  Worker`);
});

export default () => {
    const [state] = store.useReactive();
    const [snapshot, setSnapshot] = useState({ count: 0, result: 0 });
    const [, force] = useState(0);

    // 监听 Worker 上报的内部状态快照（与同步协议并行的自定义通道，WorkerTransport 会自动忽略此类消息）
    useEffect(() => {
        const listener = (e: MessageEvent) => {
            if (e.data && e.data.__workerSnapshot) {
                setSnapshot(e.data.__workerSnapshot);
                force((n) => n + 1);
            }
        };
        worker.addEventListener('message', listener);
        // 挂载后主动请求一次快照：worker 与 syncer 在模块顶层创建，首次变化可能早于本组件挂载
        worker.postMessage({ __reportSnapshot: true });
        return () => worker.removeEventListener('message', listener);
    }, []);

    return (
        <div>
            <Layout>
                <Box title="主线程 Store（本页）">
                    <JsonView data={state} />
                </Box>
                <Box title="Worker 线程 Store（实时上报）">
                    <JsonView data={snapshot} />
                </Box>
            </Layout>
            <Layout>
                <Button onClick={() => (store.state.count = store.state.count + 1)}>count++（同步到 Worker）</Button>
                <Button onClick={() => (store.state.result = 999)}>主线程改 result = 999（会被 Worker 改回）</Button>
                <Button
                    onClick={() => {
                        store.state.count = 0;
                        store.state.result = 0;
                    }}>
                    重置
                </Button>
                <Button
                    onClick={() => {
                        logs.length = 0;
                        force((n) => n + 1);
                    }}>
                    清空日志
                </Button>
            </Layout>
            <Box title="数据流动日志">
                <List items={logs.slice(-8)} />
            </Box>
        </div>
    );
};
