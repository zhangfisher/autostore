// Peers 过滤：只接受指定来源 syncer 的操作（1-N/N-N 场景）
import { createStore } from '@autostorejs/react';
import { AutoStoreSyncer, LocalTransport } from '@autostorejs/syncer';
import React from 'react';
import { Button, Layout, JsonView, Box } from 'x-react-components';

// 一个共享的「服务端」store 与三个客户端 store 通过同一事件总线式的本地传输器相连
const hub = createStore({ value: '' });
const clientA = createStore({ id: 'A', value: '' });
const clientB = createStore({ id: 'B', value: '' });
const clientC = createStore({ id: 'C', value: '' });

// 手动构建 LocalTransport 对，演示 syncer 的 peers 选项
// hub 只接受来自 clientA 的操作（peers:['client-a']）
let tHub: LocalTransport, tA: LocalTransport, tB: LocalTransport, tC: LocalTransport;
tHub = new LocalTransport(() => undefined as any);
tA = new LocalTransport(() => tHub);
tB = new LocalTransport(() => tHub);
tC = new LocalTransport(() => tHub);

new AutoStoreSyncer(hub, {
    id: 'hub',
    transport: tHub,
    mode: 'none',
    peers: ['client-a'], // 只接受 client-a 的操作
});
new AutoStoreSyncer(clientA, { id: 'client-a', transport: tA, mode: 'none', peers: ['hub'] });
new AutoStoreSyncer(clientB, { id: 'client-b', transport: tB, mode: 'none', peers: ['hub'] });
new AutoStoreSyncer(clientC, { id: 'client-c', transport: tC, mode: 'none', peers: ['hub'] });

tHub.connect();
tA.connect();
tB.connect();
tC.connect();

export default () => {
    const [hubState] = hub.useReactive();
    const [aState] = clientA.useReactive();
    const [bState] = clientB.useReactive();
    const [cState] = clientC.useReactive();

    return (
        <div>
            <Layout>
                <Box title="hub（peers:['client-a']，只接受 A）">
                    <JsonView data={hubState} />
                </Box>
            </Layout>
            <Layout>
                <Box title="clientA">
                    <JsonView data={aState} />
                </Box>
                <Box title="clientB">
                    <JsonView data={bState} />
                </Box>
                <Box title="clientC">
                    <JsonView data={cState} />
                </Box>
            </Layout>
            <Layout>
                <Button onClick={() => (clientA.state.value = `A 的消息 ${Date.now() % 1000}`)}>A 发送（hub 接受）</Button>
                <Button onClick={() => (clientB.state.value = `B 的消息 ${Date.now() % 1000}`)}>B 发送（hub 拒绝）</Button>
                <Button onClick={() => (clientC.state.value = `C 的消息 ${Date.now() % 1000}`)}>C 发送（hub 拒绝）</Button>
            </Layout>
        </div>
    );
};
