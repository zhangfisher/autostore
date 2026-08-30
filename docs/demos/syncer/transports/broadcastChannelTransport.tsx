// BroadcastChannelTransport：手动创建 transport 接入 BroadcastChannel 频道
import { createStore } from '@autostorejs/react';
import { AutoStoreSyncer, BroadcastChannelTransport } from '@autostorejs/syncer';
import React from 'react';
import { Button, Layout, JsonView, Box } from 'x-react-components';

const CHANNEL = 'transport-demo-channel';

// 同一页面内两个「上下文」接入同一频道，即模拟多标签页通信
function createContext() {
    const store = createStore({ count: 0, items: [] as string[] });
    const transport = new BroadcastChannelTransport({ channelName: CHANNEL });
    new AutoStoreSyncer(store, { transport, mode: 'none', direction: 'both' });
    transport.connect();
    return store;
}

const ctxA = createContext();
const ctxB = createContext();

export default () => {
    const [stateA] = ctxA.useReactive();
    const [stateB] = ctxB.useReactive();

    return (
        <div>
            <Layout>
                <Box title="上下文 A">
                    <JsonView data={stateA} />
                </Box>
                <Box title="上下文 B">
                    <JsonView data={stateB} />
                </Box>
            </Layout>
            <Layout>
                <Button onClick={() => (ctxA.state.count = ctxA.state.count + 1)}>A count++</Button>
                <Button
                    onClick={() => {
                        ctxA.state.items = [...ctxA.state.items, `A-${ctxA.state.items.length + 1}`];
                    }}>
                    A 添加 item
                </Button>
                <Button onClick={() => (ctxB.state.count = ctxB.state.count - 1)}>B count--</Button>
            </Layout>
            <Box title="说明">
                <ul style={{ padding: '8px 8px 8px 24px', lineHeight: '1.8em' }}>
                    <li>相同 channelName 的浏览上下文（标签页/iframe/窗口）互相通信</li>
                    <li>真实跨标签页场景：在其他标签页打开本文档同名页面即可互通</li>
                    <li>传输数据必须可结构化克隆（不支持函数、Proxy 等）</li>
                </ul>
            </Box>
        </div>
    );
};
