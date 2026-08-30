// 快速入门：SwitchSyncer 实现 N-N 同步
// SharedWorker 内管理多个独立 store（counter-store / chat-store），
// 客户端用 peers 指定与哪个 store 同步，消息按 operate.id 自动路由。
// 四面板对照：本页两个本地 store + 服务端两个 store（实时上报），点击「在新窗口打开」可接入更多客户端观察 N-N
import { createStore, computed } from '@autostorejs/react';
import { AutoStoreWorkerSyncer } from '@autostorejs/syncer';
import React, { useEffect, useState } from 'react';
import { Button, Layout, JsonView, Box, List } from 'x-react-components';
import { SHARED_WORKER_URL } from '../shared-worker-url';

const worker = new SharedWorker(SHARED_WORKER_URL);
// 必须先声明接入的频道，再创建 syncer（syncer 构造即发初始 $pull，声明在后会被服务端丢弃）
worker.port.start();
worker.port.postMessage({ __channel: 'switch' });

// 本页同时持有两个本地 store，分别对接 SharedWorker 内的不同 store
const counterStore = createStore({
    count: 0,
    doubleCount: computed((scope: any) => scope.count * 2),
});
const chatStore = createStore({ messages: [] as string[] });

const logs: string[] = [];
const log = (msg: string) => logs.push(`${new Date().toLocaleTimeString()}  ${msg}`);

// counter 同步：peers 指定对接服务端的 counter-store，消息按 operate.id 路由
const counterSyncer = new AutoStoreWorkerSyncer(counterStore, worker, {
    id: 'counter-store',
    peers: ['counter-store'],
    mode: 'both',
    immediate: true,
    debug: true,
});
counterSyncer.on('localOperate', (op: any) => {
    if ((op.flags || 0) < 0) return;
    log(`▶ counter-store  ${op.type} ${op.path.join('.')}  ──►  路由到 counter-store`);
});
counterSyncer.on('remoteOperate', (op: any) => {
    log(`◀ counter-store  ${op.type} ${op.path.join('.')}  ◄──  来自 counter-store`);
});
// chat 同步：对接 chat-store，与 counter-store 互不干扰
const chatSyncer = new AutoStoreWorkerSyncer(chatStore, worker, {
    id: 'chat-store',
    peers: ['chat-store'],
    mode: 'both',
    immediate: true,
    debug: true,
});
chatSyncer.on('localOperate', (op: any) => {
    if ((op.flags || 0) < 0) return;
    log(`▶ chat-store  ${op.type} ${op.path.join('.')}  ──►  路由到 chat-store`);
});
chatSyncer.on('remoteOperate', (op: any) => {
    log(`◀ chat-store  ${op.type} ${op.path.join('.')}  ◄──  来自 chat-store`);
});

export default () => {
    const [counter] = counterStore.useReactive();
    const [chat] = chatStore.useReactive();
    // 服务端两个 store 的实时快照（SharedWorker 通过独立消息上报）
    const [serverSnap, setServerSnap] = useState<any>({
        'counter-store': { count: 0, doubleCount: 0 },
        'chat-store': { messages: [] },
    });
    const [, force] = useState(0);

    useEffect(() => {
        const listener = (e: MessageEvent) => {
            if (e.data && e.data.__serverSnapshot) {
                setServerSnap(e.data.__serverSnapshot);
                force((n) => n + 1);
            }
        };
        worker.port.addEventListener('message', listener);
        return () => worker.port.removeEventListener('message', listener);
    }, []);

    return (
        <div>
            <Layout>
                <Box title="本页 counterStore（peers: counter-store）">
                    <JsonView data={counter} />
                </Box>
                <Box title="本页 chatStore（peers: chat-store）">
                    <JsonView data={chat} />
                </Box>
            </Layout>
            <Layout>
                <Box title="服务端 counter-store（SharedWorker 内，实时上报）">
                    <JsonView data={serverSnap['counter-store']} />
                </Box>
                <Box title="服务端 chat-store（SharedWorker 内，实时上报）">
                    <JsonView data={serverSnap['chat-store']} />
                </Box>
            </Layout>
            <Layout>
                <Button onClick={() => (counterStore.state.count = counterStore.state.count + 1)}>counter.count++（只进 counter-store）</Button>
                <Button
                    onClick={() => {
                        chatStore.state.messages = [...chatStore.state.messages, `消息 #${chat.messages.length + 1}`];
                    }}>
                    chat 发送消息（只进 chat-store）
                </Button>
                <Button
                    onClick={() => {
                        window.open(window.location.href, '_blank', 'width=480,height=520');
                    }}>
                    在新窗口打开（再开一个客户端）
                </Button>
                <Button
                    onClick={() => {
                        logs.length = 0;
                        force((n) => n + 1);
                    }}>
                    清空日志
                </Button>
            </Layout>
            <Box title="路由日志（消息按 operate.id 在两个 store 间自动分流）">
                <List items={logs.slice(-8)} />
            </Box>
        </div>
    );
};
