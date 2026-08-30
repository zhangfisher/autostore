// LocalTransport：手动创建本地传输器（store.sync 内部即此实现）
import { createStore } from '@autostorejs/react';
import { AutoStoreSyncer, LocalTransport } from '@autostorejs/syncer';
import React from 'react';
import { Button, Layout, JsonView, Box } from 'x-react-components';

// 两个 transport 互相引用对方（延迟求值避免变量未初始化）
let transport1: LocalTransport, transport2: LocalTransport;
transport1 = new LocalTransport(() => transport2);
transport2 = new LocalTransport(() => transport1);

const store1 = createStore({ count: 0 });
const store2 = createStore({ count: 0 });

// 两侧各自创建 syncer 并指定 transport
new AutoStoreSyncer(store1, { transport: transport1, mode: 'none', direction: 'both' });
new AutoStoreSyncer(store2, { transport: transport2, mode: 'none', direction: 'both' });
transport1.connect();
transport2.connect();

export default () => {
    const [state1] = store1.useReactive();
    const [state2] = store2.useReactive();

    return (
        <div>
            <Layout>
                <Box title="Store1 -- transport1">
                    <JsonView data={state1} />
                </Box>
                <Box title="Store2 -- transport2">
                    <JsonView data={state2} />
                </Box>
            </Layout>
            <Layout>
                <Button onClick={() => (store1.state.count = store1.state.count + 1)}>Store1 count++</Button>
                <Button onClick={() => (store2.state.count = store2.state.count + 1)}>Store2 count++</Button>
            </Layout>
            <Box title="说明">
                <ul style={{ padding: '8px 8px 8px 24px', lineHeight: '1.8em' }}>
                    <li>store1.sync(store2) 内部等价于本例的手动 transport + syncer 写法</li>
                    <li>LocalTransport 适用于同进程内两个 Store 的一对一同步</li>
                </ul>
            </Box>
        </div>
    );
};
