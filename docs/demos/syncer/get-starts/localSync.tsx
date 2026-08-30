// 快速入门：同一进程内两个 Store 双向同步（store.sync）
import { createStore } from '@autostorejs/react';
import '@autostorejs/syncer';
import React from 'react';
import { Button, Layout, JsonView, Box } from 'x-react-components';

// 两个独立创建的 store，初始状态各不相同
const store1 = createStore({ count: 0, user: { name: 'Alice' } });
const store2 = createStore({ count: 0, user: { name: 'Bob' } });

// 一行代码建立双向同步，内部自动创建 LocalTransport
store1.sync(store2);

export default () => {
    const [state1] = store1.useReactive();
    const [state2] = store2.useReactive();

    return (
        <div>
            <Layout>
                <Box title="Store 1">
                    <JsonView data={state1} />
                </Box>
                <Box title="Store 2">
                    <JsonView data={state2} />
                </Box>
            </Layout>
            <Layout>
                <Button onClick={() => (store1.state.count = store1.state.count + 1)}>Store1 count++</Button>
                <Button onClick={() => (store1.state.user.name += '!')}>Store1 user.name += '!</Button>
            </Layout>
            <Layout>
                <Button onClick={() => (store2.state.count = store2.state.count + 1)}>Store2 count++</Button>
                <Button onClick={() => (store2.state.user.name += '~')}>Store2 user.name += '~'</Button>
            </Layout>
        </div>
    );
};
