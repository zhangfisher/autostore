// 快速入门：跨标签页同步（BroadcastChannelSyncer）
// 点击「打开新窗口」会启动两个页面运行相同代码，状态在窗口间自动同步
import { createStore } from '@autostorejs/react';
import { AutoStoreBroadcastChannelSyncer } from '@autostorejs/syncer';
import React from 'react';
import { Button, Layout, JsonView, Box } from 'x-react-components';

const CHANNEL = 'autostore-demo-channel';

const store = createStore({ count: 0, user: { name: 'Alice' } });
// 所有使用相同频道名的页面自动互相同步
new AutoStoreBroadcastChannelSyncer(store, CHANNEL);

export default () => {
    const [state] = store.useReactive();

    return (
        <div>
            <Layout>
                <Box title="当前页面 Store">
                    <JsonView data={state} />
                </Box>
                <Box title="说明">
                    <div style={{ padding: '8px', lineHeight: '1.8em' }}>
                        <p>1. 点击「在新窗口打开」启动第二个页面</p>
                        <p>2. 在任一窗口修改状态，另一个窗口实时同步</p>
                        <p>3. 后打开的窗口会自动拉取最新状态（pull 模式）</p>
                    </div>
                </Box>
            </Layout>
            <Layout>
                <Button onClick={() => (store.state.count = store.state.count + 1)}>count++</Button>
                <Button onClick={() => (store.state.user.name += '!')}>user.name += '!</Button>
                <Button
                    onClick={() => {
                        window.open(window.location.href, '_blank', 'width=480,height=420');
                    }}>
                    在新窗口打开
                </Button>
            </Layout>
        </div>
    );
};
