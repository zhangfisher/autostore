// 快速入门：与 SharedWorker 同步
// SharedWorker 服务端持有权威状态并每秒递增推送；本页作为客户端只接收更新（backward）
// 服务端通过独立消息向本页上报内部状态快照，双面板对照观察两侧变化
import { createStore } from '@autostorejs/react';
import { AutoStoreWorkerSyncer } from '@autostorejs/syncer';
import React, { useEffect, useState } from 'react';
import { Button, Layout, JsonView, Box } from 'x-react-components';
import { SHARED_WORKER_URL } from '../shared-worker-url';

const worker = new SharedWorker(SHARED_WORKER_URL);

const store = createStore({ count: 0, serverTime: '' });
// 客户端：只接收服务端更新
new AutoStoreWorkerSyncer(store, worker, {
    mode: 'pull',
    direction: 'backward',
    immediate: true,
});

export default () => {
    const [state] = store.useReactive();
    const [snapshot, setSnapshot] = useState({ count: 0, serverTime: '' });

    // 监听服务端上报的内部状态快照（自定义消息形状，WorkerTransport 会自动忽略，与同步协议互不干扰）
    useEffect(() => {
        const listener = (e: MessageEvent) => {
            if (e.data && e.data.__serverSnapshot) {
                setSnapshot(e.data.__serverSnapshot);
            }
        };
        worker.port.addEventListener('message', listener);
        return () => worker.port.removeEventListener('message', listener);
    }, []);

    return (
        <div>
            <Layout>
                <Box title="客户端 Store（本页，backward 只接收）">
                    <JsonView data={state} />
                </Box>
                <Box title="服务端 Store（SharedWorker 内，实时上报）">
                    <JsonView data={snapshot} />
                </Box>
            </Layout>
            <Layout>
                <Button
                    onClick={() => {
                        // 本地修改不会同步到服务端（backward 单向），下次推送会被覆盖
                        store.state.count = store.state.count + 100;
                    }}>
                    本地 count += 100（会被下次推送覆盖）
                </Button>
            </Layout>
        </div>
    );
};
