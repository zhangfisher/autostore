// WorkerTransport：手动创建 transport 并配合 AutoStoreSyncer 使用
import { createStore } from '@autostorejs/react';
import { AutoStoreSyncer, WorkerTransport } from '@autostorejs/syncer';
import React from 'react';
import { Button, Layout, JsonView, Box } from 'x-react-components';

// Worker 内联源码：加载 iife 产物后创建 Worker 端 transport + syncer
// 注意：Blob Worker 的 base 是 blob: scheme，importScripts 必须用绝对 URL（见 new URL 解析）
const workerCode = `
    importScripts(
        new URL('/autostore/autostore.js', self.location.origin).href,
        new URL('/autostore/syncer.js', self.location.origin).href
    );
    const { AutoStore } = AutoStoreSpaces;
    const { AutoStoreSyncer, WorkerTransport } = AutoStoreSyncer;
    const store = new AutoStore({ count: 0, result: 0 });
    // Worker 端：手动创建 WorkerTransport（self 即 Worker 全局对象）
    const transport = new WorkerTransport({ worker: self });
    new AutoStoreSyncer(store, { transport, mode: 'both' });
    transport.connect();
    store.watch(() => {
        store.state.result = store.state.count * 3;
    });
`;
const workerUrl = URL.createObjectURL(new Blob([workerCode], { type: 'application/javascript' }));
const worker = new Worker(workerUrl);

// 主线程：手动创建 transport（区别于 AutoStoreWorkerSyncer 的自动封装）
const transport = new WorkerTransport({ worker });
const store = createStore({ count: 0, result: 0 });
new AutoStoreSyncer(store, { transport, mode: 'both', immediate: true });
transport.connect();

export default () => {
    const [state] = store.useReactive();

    return (
        <div>
            <Layout>
                <Box title="主线程 Store">
                    <JsonView data={state} />
                </Box>
                <Box title="说明">
                    <ul style={{ padding: '8px 8px 8px 24px', lineHeight: '1.8em' }}>
                        <li>WorkerTransport({'{ worker }'}) 封装 postMessage / message 通信</li>
                        <li>connect() 后自动监听 worker 的 message 事件</li>
                        <li>Worker 端以 self 作为 worker 参数创建对端 transport</li>
                        <li>Worker 内计算 result = count * 3 并写回主线程</li>
                    </ul>
                </Box>
            </Layout>
            <Layout>
                <Button onClick={() => (store.state.count = store.state.count + 1)}>count++</Button>
                <Button onClick={() => transport.disconnect()}>断开 transport</Button>
                <Button onClick={() => transport.connect()}>重连 transport</Button>
            </Layout>
        </div>
    );
};
