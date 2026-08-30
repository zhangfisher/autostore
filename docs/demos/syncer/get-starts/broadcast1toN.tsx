// 快速入门：BroadcastSyncer 实现 1-N 同步
// SharedWorker 内的广播器管理一个主 Store；每个标签页（客户端）与之同步
import { createStore } from '@autostorejs/react';
import { AutoStoreWorkerSyncer } from '@autostorejs/syncer';
import React, { useEffect, useState } from 'react';
import { Button, Layout, JsonView, Box } from 'x-react-components';
import { SHARED_WORKER_URL } from '../shared-worker-url';

const worker = new SharedWorker(SHARED_WORKER_URL);
// 必须先声明接入的频道，再创建 syncer：
// syncer 构造即发送初始 $pull，若声明在后，SharedWorker 分流时广播器尚未注册该端口，初始拉取会被丢弃
worker.port.start();
worker.port.postMessage({ __channel: 'broadcast' });

const store = createStore({
    count: 0,
    messages: [] as string[],
    // messageCount 由服务端主 Store 原位计算后随状态同步下来（本地定义为普通字段即可）
    messageCount: 0,
});

// 客户端 syncer：与服务端广播器双向同步
new AutoStoreWorkerSyncer(store, worker, {
    mode: 'pull',
    immediate: true,
    direction: 'both',
});

export default () => {
    const [state] = store.useReactive();
    // 服务端主 Store 的实时快照（广播器通过独立消息上报）
    const [snapshot, setSnapshot] = useState<any>(null);

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
                <Box title="客户端 Store（本页）">
                    <JsonView data={state} />
                </Box>
                <Box title="服务端主 Store（SharedWorker 内，实时上报）">
                    <JsonView data={snapshot ?? { 提示: '等待服务端上报...' }} />
                </Box>
            </Layout>
            <Layout>
                <Button onClick={() => (store.state.count = store.state.count + 1)}>count++（广播）</Button>
                <Button
                    onClick={() => {
                        store.state.messages = [...store.state.messages, `来自本页的消息 #${state.messageCount + 1}`];
                    }}>
                    发送消息（广播）
                </Button>
                <Button
                    onClick={() => {
                        window.open(window.location.href, '_blank', 'width=480,height=420');
                    }}>
                    在新窗口打开
                </Button>
            </Layout>
            <Box title="说明">
                <div style={{ padding: '8px', lineHeight: '1.8em' }}>
                    <p>1. 本页的修改上推到服务端主 Store，再广播给所有其他客户端</p>
                    <p>2. 服务端主 Store 的 messageCount 随 messages 长度原位计算并同步下来</p>
                    <p>3. 点击「在新窗口打开」再开一个客户端，观察 1-N 广播</p>
                </div>
            </Box>
        </div>
    );
};
